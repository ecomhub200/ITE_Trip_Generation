/**
 * Segment Analysis Module with Overpass API Integration
 *
 * Provides functionality for analyzing road segments using OpenStreetMap data
 * via the Overpass API. Implements robust error handling, CORS management,
 * request caching, and fallback endpoints.
 */

class SegmentAnalysis {
  constructor() {
    // Overpass API endpoints (ordered by reliability)
    // Using HTTPS endpoints to avoid mixed-content issues
    this.overpassEndpoints = [
      'https://overpass-api.de/api/interpreter',
      'https://overpass.kumi.systems/api/interpreter',
      'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
      'https://overpass.openstreetmap.ru/api/interpreter'
    ];

    // Note: overpass.openstreetmap.fr has CORS issues, excluded from main list
    // z.overpass-api.de often returns 400 for complex queries

    // Cache configuration
    this.cache = new Map();
    this.cacheTTL = 15 * 60 * 1000; // 15 minutes in milliseconds

    // Request timeout
    this.requestTimeout = 60000; // 60 seconds

    // Retry configuration
    this.maxRetries = 3;
    this.retryDelays = [1000, 2000, 4000]; // Exponential backoff

    // Rate limiting
    this.lastRequestTime = 0;
    this.minRequestInterval = 1000; // 1 second between requests

    // Current state
    this.currentEndpointIndex = 0;
    this.abortController = null;
  }

  /**
   * Build a properly formatted Overpass QL query for road segments
   * Fixes common syntax issues that cause HTTP 400 errors
   *
   * @param {object} bounds - Bounding box {south, west, north, east}
   * @param {object} options - Query options
   * @returns {string} Formatted Overpass QL query
   */
  buildOverpassQuery(bounds, options = {}) {
    const {
      timeout = 30,
      maxElements = 10000,
      includeGeometry = true,
      roadTypes = ['motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'residential', 'unclassified']
    } = options;

    // Validate bounds
    if (!bounds || typeof bounds.south !== 'number' || typeof bounds.west !== 'number' ||
        typeof bounds.north !== 'number' || typeof bounds.east !== 'number') {
      throw new Error('Invalid bounding box. Required: {south, west, north, east}');
    }

    // Validate bounds are within valid ranges
    if (bounds.south < -90 || bounds.north > 90 || bounds.west < -180 || bounds.east > 180) {
      throw new Error('Bounding box coordinates out of valid range');
    }

    // Ensure south < north and west < east
    if (bounds.south >= bounds.north || bounds.west >= bounds.east) {
      throw new Error('Invalid bounding box: south must be < north, west must be < east');
    }

    const bbox = `${bounds.south},${bounds.west},${bounds.north},${bounds.east}`;

    // Build highway filter for road types
    const highwayFilter = roadTypes.map(type => `["highway"="${type}"]`).join('');

    // Build properly formatted Overpass QL query
    // IMPORTANT: Query syntax is critical - errors here cause HTTP 400
    const query = `
[out:json][timeout:${timeout}][maxsize:${maxElements * 1000}];
(
  way["highway"~"^(${roadTypes.join('|')})$"](${bbox});
);
out body;
>;
out skel qt;
`.trim();

    return query;
  }

  /**
   * Build query for fetching road centerline data
   * @param {object} bounds - Bounding box
   * @param {string} functionalClass - FHWA functional class filter (optional)
   * @returns {string} Overpass QL query
   */
  buildCenterlineQuery(bounds, functionalClass = null) {
    const bbox = `${bounds.south},${bounds.west},${bounds.north},${bounds.east}`;

    // Map FHWA functional classes to OSM highway types
    const classMapping = {
      'interstate': ['motorway'],
      'principal_arterial': ['trunk', 'primary'],
      'minor_arterial': ['secondary', 'tertiary'],
      'collector': ['residential', 'unclassified'],
      'local': ['residential', 'living_street', 'service']
    };

    let highwayTypes = ['motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'residential', 'unclassified'];

    if (functionalClass && classMapping[functionalClass]) {
      highwayTypes = classMapping[functionalClass];
    }

    const highwayRegex = `^(${highwayTypes.join('|')})$`;

    const query = `
[out:json][timeout:45][maxsize:50000000];
(
  way["highway"~"${highwayRegex}"](${bbox});
);
out geom;
`.trim();

    return query;
  }

  /**
   * Generate cache key for a query
   * @param {string} query - Overpass query
   * @returns {string} Cache key
   */
  getCacheKey(query) {
    // Simple hash function for cache key
    let hash = 0;
    for (let i = 0; i < query.length; i++) {
      const char = query.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `overpass_${hash}`;
  }

  /**
   * Check cache for existing data
   * @param {string} key - Cache key
   * @returns {object|null} Cached data or null
   */
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTTL) {
      console.log('[SegmentAnalysis] Cache hit for:', key);
      return cached.data;
    }
    if (cached) {
      this.cache.delete(key); // Remove expired entry
    }
    return null;
  }

  /**
   * Store data in cache
   * @param {string} key - Cache key
   * @param {object} data - Data to cache
   */
  setCache(key, data) {
    this.cache.set(key, {
      data: data,
      timestamp: Date.now()
    });

    // Clean old entries if cache is too large
    if (this.cache.size > 100) {
      const now = Date.now();
      for (const [k, v] of this.cache.entries()) {
        if (now - v.timestamp > this.cacheTTL) {
          this.cache.delete(k);
        }
      }
    }
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this.cache.clear();
    console.log('[SegmentAnalysis] Cache cleared');
  }

  /**
   * Rate limiting - wait if needed before making request
   */
  async rateLimit() {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    if (elapsed < this.minRequestInterval) {
      await this.delay(this.minRequestInterval - elapsed);
    }
    this.lastRequestTime = Date.now();
  }

  /**
   * Utility function for delays
   * @param {number} ms - Milliseconds to wait
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Execute Overpass query with a specific endpoint
   * @param {string} endpoint - API endpoint URL
   * @param {string} query - Overpass QL query
   * @returns {Promise<object>} Query results
   */
  async executeWithEndpoint(endpoint, query) {
    await this.rateLimit();

    this.abortController = new AbortController();
    const timeoutId = setTimeout(() => this.abortController.abort(), this.requestTimeout);

    try {
      console.log(`[SegmentAnalysis] Trying endpoint: ${endpoint}`);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: `data=${encodeURIComponent(query)}`,
        signal: this.abortController.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
      }

      const data = await response.json();
      console.log(`[SegmentAnalysis] Success from ${endpoint}, elements: ${data.elements?.length || 0}`);
      return data;

    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.requestTimeout / 1000}s`);
      }

      throw error;
    }
  }

  /**
   * Execute Overpass query with automatic fallback to alternative endpoints
   * @param {string} query - Overpass QL query
   * @returns {Promise<object>} Query results
   */
  async executeSegmentOverpassQuery(query) {
    // Check cache first
    const cacheKey = this.getCacheKey(query);
    const cachedResult = this.getFromCache(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const errors = [];

    // Try each endpoint with retries
    for (let endpointIndex = 0; endpointIndex < this.overpassEndpoints.length; endpointIndex++) {
      const endpoint = this.overpassEndpoints[endpointIndex];

      for (let retry = 0; retry < this.maxRetries; retry++) {
        try {
          const result = await this.executeWithEndpoint(endpoint, query);

          // Cache successful result
          this.setCache(cacheKey, result);

          // Move successful endpoint to front of list for future requests
          if (endpointIndex > 0) {
            this.overpassEndpoints.splice(endpointIndex, 1);
            this.overpassEndpoints.unshift(endpoint);
          }

          return result;

        } catch (error) {
          const errorMsg = `${endpoint} (attempt ${retry + 1}): ${error.message}`;
          console.warn(`[SegmentAnalysis] ${errorMsg}`);
          errors.push(errorMsg);

          // Check if error is retryable
          const isRetryable = this.isRetryableError(error);

          if (!isRetryable) {
            console.log(`[SegmentAnalysis] Non-retryable error, moving to next endpoint`);
            break; // Move to next endpoint
          }

          // Wait before retry with exponential backoff
          if (retry < this.maxRetries - 1) {
            await this.delay(this.retryDelays[retry] || 4000);
          }
        }
      }
    }

    // All endpoints failed
    const errorSummary = errors.slice(-4).join('\n');
    throw new Error(`All Overpass servers failed. Please try again later.\n\nRecent errors:\n${errorSummary}`);
  }

  /**
   * Check if an error is retryable
   * @param {Error} error - The error to check
   * @returns {boolean} True if the request should be retried
   */
  isRetryableError(error) {
    const message = error.message.toLowerCase();

    // HTTP 400 Bad Request - query syntax error, don't retry same endpoint
    if (message.includes('http 400')) {
      return false;
    }

    // HTTP 429 Too Many Requests - rate limited
    if (message.includes('http 429')) {
      return true;
    }

    // HTTP 503/504 - server overloaded
    if (message.includes('http 503') || message.includes('http 504')) {
      return true;
    }

    // Network errors - retry
    if (message.includes('network') || message.includes('timeout') || message.includes('abort')) {
      return true;
    }

    // CORS errors - don't retry same endpoint
    if (message.includes('cors') || message.includes('blocked')) {
      return false;
    }

    return true;
  }

  /**
   * Fetch OSM road centerline data for a given area
   * @param {object} bounds - Bounding box {south, west, north, east}
   * @param {string} functionalClass - Optional FHWA functional class filter
   * @returns {Promise<object>} Centerline data with processed segments
   */
  async fetchOSMCenterlineData(bounds, functionalClass = null) {
    console.log('[SegmentAnalysis] Fetching centerline data for bounds:', bounds);

    const query = this.buildCenterlineQuery(bounds, functionalClass);

    try {
      const rawData = await this.executeSegmentOverpassQuery(query);

      // Process raw OSM data into segment format
      const segments = this.processOSMSegments(rawData);

      console.log(`[SegmentAnalysis] Processed ${segments.length} road segments`);

      return {
        success: true,
        segments: segments,
        bounds: bounds,
        timestamp: new Date().toISOString(),
        source: 'OpenStreetMap via Overpass API'
      };

    } catch (error) {
      console.error('[SegmentAnalysis] Failed to fetch centerline data:', error);
      throw error;
    }
  }

  /**
   * Process raw OSM data into structured road segments
   * @param {object} osmData - Raw Overpass API response
   * @returns {Array} Processed segments with geometry and properties
   */
  processOSMSegments(osmData) {
    if (!osmData || !osmData.elements) {
      return [];
    }

    // Build node lookup table for geometry reconstruction
    const nodes = new Map();
    osmData.elements.forEach(element => {
      if (element.type === 'node') {
        nodes.set(element.id, { lat: element.lat, lon: element.lon });
      }
    });

    // Process ways into segments
    const segments = [];

    osmData.elements.forEach(element => {
      if (element.type === 'way' && element.tags && element.tags.highway) {
        // Extract geometry
        let geometry = [];

        if (element.geometry) {
          // Geometry already provided (out geom;)
          geometry = element.geometry.map(coord => [coord.lon, coord.lat]);
        } else if (element.nodes) {
          // Need to reconstruct from nodes
          geometry = element.nodes
            .map(nodeId => nodes.get(nodeId))
            .filter(node => node)
            .map(node => [node.lon, node.lat]);
        }

        if (geometry.length >= 2) {
          const segment = {
            id: element.id,
            osmId: `way/${element.id}`,
            name: element.tags.name || element.tags.ref || 'Unnamed Road',
            highway: element.tags.highway,
            functionalClass: this.mapHighwayToFHWAClass(element.tags.highway),
            geometry: geometry,
            length: this.calculateSegmentLength(geometry),
            properties: {
              surface: element.tags.surface,
              lanes: element.tags.lanes ? parseInt(element.tags.lanes) : null,
              maxspeed: element.tags.maxspeed,
              oneway: element.tags.oneway === 'yes',
              ref: element.tags.ref
            }
          };

          segments.push(segment);
        }
      }
    });

    return segments;
  }

  /**
   * Map OSM highway type to FHWA functional class
   * @param {string} highway - OSM highway tag value
   * @returns {string} FHWA functional class
   */
  mapHighwayToFHWAClass(highway) {
    const mapping = {
      'motorway': 'Interstate',
      'motorway_link': 'Interstate',
      'trunk': 'Principal Arterial - Other Freeways',
      'trunk_link': 'Principal Arterial - Other Freeways',
      'primary': 'Principal Arterial - Other',
      'primary_link': 'Principal Arterial - Other',
      'secondary': 'Minor Arterial',
      'secondary_link': 'Minor Arterial',
      'tertiary': 'Collector',
      'tertiary_link': 'Collector',
      'residential': 'Local',
      'unclassified': 'Local',
      'living_street': 'Local',
      'service': 'Local'
    };

    return mapping[highway] || 'Unknown';
  }

  /**
   * Calculate segment length in miles using Haversine formula
   * @param {Array} geometry - Array of [lon, lat] coordinates
   * @returns {number} Length in miles
   */
  calculateSegmentLength(geometry) {
    let totalLength = 0;

    for (let i = 0; i < geometry.length - 1; i++) {
      const [lon1, lat1] = geometry[i];
      const [lon2, lat2] = geometry[i + 1];
      totalLength += this.haversineDistance(lat1, lon1, lat2, lon2);
    }

    return totalLength;
  }

  /**
   * Calculate distance between two points using Haversine formula
   * @param {number} lat1 - Latitude of point 1
   * @param {number} lon1 - Longitude of point 1
   * @param {number} lat2 - Latitude of point 2
   * @param {number} lon2 - Longitude of point 2
   * @returns {number} Distance in miles
   */
  haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   * @param {number} deg - Degrees
   * @returns {number} Radians
   */
  toRad(deg) {
    return deg * (Math.PI / 180);
  }

  /**
   * Analyze over-represented road segments based on crash data
   * @param {object} options - Analysis options
   * @returns {Promise<object>} Analysis results
   */
  async analyzeOverRepSegments(options = {}) {
    const {
      bounds,
      crashData = [],
      minCrashes = 20,
      rateThreshold = 1.5,
      minSegmentLength = 0.25, // miles
      functionalClass = null,
      startDate = null,
      endDate = null
    } = options;

    if (!bounds) {
      throw new Error('Bounds are required for segment analysis');
    }

    console.log('[SegmentAnalysis] Starting over-represented segments analysis');
    console.log('[SegmentAnalysis] Options:', { minCrashes, rateThreshold, minSegmentLength });

    try {
      // Step 1: Fetch road network data
      const centerlineData = await this.fetchOSMCenterlineData(bounds, functionalClass);

      if (!centerlineData.success || centerlineData.segments.length === 0) {
        return {
          success: false,
          error: 'No road segments found in the specified area'
        };
      }

      // Step 2: Filter segments by minimum length
      const eligibleSegments = centerlineData.segments.filter(
        segment => segment.length >= minSegmentLength
      );

      console.log(`[SegmentAnalysis] ${eligibleSegments.length} segments meet minimum length requirement`);

      // Step 3: Calculate crash rates by functional class
      const classCrashRates = this.calculateClassCrashRates(eligibleSegments, crashData);

      // Step 4: Identify over-represented segments
      const overRepSegments = this.identifyOverRepSegments(
        eligibleSegments,
        crashData,
        classCrashRates,
        minCrashes,
        rateThreshold
      );

      // Step 5: Compile results
      const results = {
        success: true,
        timestamp: new Date().toISOString(),
        bounds: bounds,
        parameters: {
          minCrashes,
          rateThreshold,
          minSegmentLength,
          functionalClass,
          startDate,
          endDate
        },
        summary: {
          totalSegments: centerlineData.segments.length,
          eligibleSegments: eligibleSegments.length,
          totalMiles: eligibleSegments.reduce((sum, s) => sum + s.length, 0).toFixed(2),
          overRepresentedCount: overRepSegments.length,
          overRepresentedMiles: overRepSegments.reduce((sum, s) => sum + s.length, 0).toFixed(2)
        },
        classCrashRates: classCrashRates,
        overRepresentedSegments: overRepSegments.sort((a, b) => b.rateRatio - a.rateRatio)
      };

      console.log('[SegmentAnalysis] Analysis complete:', results.summary);

      return results;

    } catch (error) {
      console.error('[SegmentAnalysis] Analysis failed:', error);
      return {
        success: false,
        error: error.message,
        details: error.stack
      };
    }
  }

  /**
   * Calculate average crash rates by FHWA functional class
   * @param {Array} segments - Road segments
   * @param {Array} crashData - Crash records with location data
   * @returns {object} Crash rates by functional class
   */
  calculateClassCrashRates(segments, crashData) {
    const classTotals = {};

    // Initialize totals by class
    segments.forEach(segment => {
      const fc = segment.functionalClass;
      if (!classTotals[fc]) {
        classTotals[fc] = { totalMiles: 0, totalCrashes: 0, segmentCount: 0 };
      }
      classTotals[fc].totalMiles += segment.length;
      classTotals[fc].segmentCount++;
    });

    // Count crashes per segment and class
    if (crashData && crashData.length > 0) {
      crashData.forEach(crash => {
        // Match crash to nearest segment (simplified - in production would use spatial index)
        const nearestSegment = this.findNearestSegment(crash, segments);
        if (nearestSegment) {
          const fc = nearestSegment.functionalClass;
          classTotals[fc].totalCrashes++;
        }
      });
    }

    // Calculate rates
    const rates = {};
    for (const [fc, data] of Object.entries(classTotals)) {
      rates[fc] = {
        ...data,
        crashRate: data.totalMiles > 0 ? data.totalCrashes / data.totalMiles : 0
      };
    }

    return rates;
  }

  /**
   * Find nearest road segment to a crash location
   * @param {object} crash - Crash record with lat/lon
   * @param {Array} segments - Road segments
   * @returns {object|null} Nearest segment or null
   */
  findNearestSegment(crash, segments) {
    if (!crash.lat || !crash.lon) return null;

    let nearest = null;
    let minDist = Infinity;
    const maxSearchDist = 0.1; // 0.1 miles

    for (const segment of segments) {
      for (const [lon, lat] of segment.geometry) {
        const dist = this.haversineDistance(crash.lat, crash.lon, lat, lon);
        if (dist < minDist && dist <= maxSearchDist) {
          minDist = dist;
          nearest = segment;
        }
      }
    }

    return nearest;
  }

  /**
   * Identify over-represented segments
   * @param {Array} segments - Road segments
   * @param {Array} crashData - Crash records
   * @param {object} classCrashRates - Average rates by class
   * @param {number} minCrashes - Minimum crashes to be flagged
   * @param {number} rateThreshold - Rate ratio threshold
   * @returns {Array} Over-represented segments
   */
  identifyOverRepSegments(segments, crashData, classCrashRates, minCrashes, rateThreshold) {
    const overRep = [];

    // Count crashes per segment
    const segmentCrashes = new Map();
    segments.forEach(s => segmentCrashes.set(s.id, { segment: s, crashes: 0, crashList: [] }));

    if (crashData && crashData.length > 0) {
      crashData.forEach(crash => {
        const nearestSegment = this.findNearestSegment(crash, segments);
        if (nearestSegment && segmentCrashes.has(nearestSegment.id)) {
          const data = segmentCrashes.get(nearestSegment.id);
          data.crashes++;
          data.crashList.push(crash);
        }
      });
    }

    // Evaluate each segment
    for (const [segmentId, data] of segmentCrashes.entries()) {
      const segment = data.segment;
      const crashes = data.crashes;

      // Skip if below minimum crash threshold
      if (crashes < minCrashes) continue;

      // Calculate segment crash rate
      const segmentRate = segment.length > 0 ? crashes / segment.length : 0;

      // Get class average rate
      const classRate = classCrashRates[segment.functionalClass]?.crashRate || 0;

      // Calculate rate ratio
      const rateRatio = classRate > 0 ? segmentRate / classRate : 0;

      // Flag if over threshold
      if (rateRatio >= rateThreshold) {
        overRep.push({
          ...segment,
          crashes: crashes,
          segmentRate: segmentRate.toFixed(2),
          classRate: classRate.toFixed(2),
          rateRatio: rateRatio.toFixed(2),
          crashList: data.crashList
        });
      }
    }

    return overRep;
  }

  /**
   * Cancel any ongoing requests
   */
  cancelRequests() {
    if (this.abortController) {
      this.abortController.abort();
      console.log('[SegmentAnalysis] Requests cancelled');
    }
  }

  /**
   * Get current cache statistics
   * @returns {object} Cache stats
   */
  getCacheStats() {
    let validEntries = 0;
    const now = Date.now();

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp < this.cacheTTL) {
        validEntries++;
      }
    }

    return {
      totalEntries: this.cache.size,
      validEntries: validEntries,
      ttlMinutes: this.cacheTTL / 60000
    };
  }
}

// Create global instance
const segmentAnalysis = new SegmentAnalysis();

// Convenience functions for backward compatibility with error stack references
async function executeSegmentOverpassQuery(query) {
  return segmentAnalysis.executeSegmentOverpassQuery(query);
}

async function fetchOSMCenterlineData(bounds, functionalClass = null) {
  return segmentAnalysis.fetchOSMCenterlineData(bounds, functionalClass);
}

async function analyzeOverRepSegments(options) {
  return segmentAnalysis.analyzeOverRepSegments(options);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SegmentAnalysis,
    segmentAnalysis,
    executeSegmentOverpassQuery,
    fetchOSMCenterlineData,
    analyzeOverRepSegments
  };
}
