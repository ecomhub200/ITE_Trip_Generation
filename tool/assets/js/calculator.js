/**
 * ITE Trip Generation Calculator
 * Calculation engine for ITE trip generation analysis
 *
 * Based on ITE Trip Generation Manual, 12th Edition
 * Vehicle rates from 11th Edition, Modal data from 12th Edition
 * Implements decision tree from claude.md instructions
 */

class ITECalculator {
  constructor() {
    this.database = ITE_DATABASE;
    this.thresholds = HENRICO_THRESHOLDS;
    this.modalData = typeof ITE_MODAL_DATA !== 'undefined' ? ITE_MODAL_DATA : {};
    this.timeOfDayData = null;
    this.loadTimeOfDayData();
  }

  /**
   * Load time-of-day distribution data
   */
  async loadTimeOfDayData() {
    try {
      const response = await fetch('data/time-of-day.json');
      if (response.ok) {
        const data = await response.json();
        this.timeOfDayData = data.landUses;
        console.log(`Loaded time-of-day data for ${Object.keys(this.timeOfDayData).length} land uses`);
      }
    } catch (error) {
      console.warn('Could not load time-of-day data:', error);
    }
  }

  /**
   * Check if time-of-day data is available for a specific ITE code
   * @param {string} iteCode - The ITE land use code
   * @returns {boolean} True if time-of-day data exists
   */
  hasTimeOfDayData(iteCode) {
    return this.timeOfDayData && this.timeOfDayData[iteCode] &&
           this.timeOfDayData[iteCode].periods &&
           Object.keys(this.timeOfDayData[iteCode].periods).length > 0;
  }

  /**
   * Get available time periods for an ITE code
   * @param {string} iteCode - The ITE land use code
   * @returns {string[]} Array of available periods (e.g., ['weekday', 'saturday', 'sunday'])
   */
  getAvailablePeriods(iteCode) {
    if (!this.hasTimeOfDayData(iteCode)) return [];
    return Object.keys(this.timeOfDayData[iteCode].periods);
  }

  /**
   * Get hourly trip distribution for a specific ITE code and day type
   * @param {string} iteCode - The ITE land use code
   * @param {number} dailyTrips - Total daily trips
   * @param {string} dayType - 'weekday', 'saturday', or 'sunday'
   * @returns {object} Hourly distribution with trips for each hour
   */
  getHourlyDistribution(iteCode, dailyTrips, dayType = 'weekday') {
    if (!this.hasTimeOfDayData(iteCode)) {
      return this.getDefaultHourlyDistribution(dailyTrips);
    }

    const todData = this.timeOfDayData[iteCode];
    const periodData = todData.periods[dayType] || todData.periods['weekday'];

    if (!periodData || !periodData.hourly) {
      return this.getDefaultHourlyDistribution(dailyTrips);
    }

    const hourlyTrips = periodData.hourly.map(hour => ({
      hour: hour.hour,
      time: hour.time,
      totalPct: hour.total,
      enteringPct: hour.entering,
      exitingPct: hour.exiting,
      total: Math.round(dailyTrips * hour.total),
      entering: Math.round(dailyTrips * hour.entering),
      exiting: Math.round(dailyTrips * hour.exiting)
    }));

    // Find peak hours
    const peakHour = hourlyTrips.reduce((max, h) => h.total > max.total ? h : max, hourlyTrips[0]);
    const amPeak = hourlyTrips.filter(h => h.hour >= 6 && h.hour <= 9)
                              .reduce((max, h) => h.total > max.total ? h : max, hourlyTrips[7]);
    const pmPeak = hourlyTrips.filter(h => h.hour >= 15 && h.hour <= 18)
                              .reduce((max, h) => h.total > max.total ? h : max, hourlyTrips[16]);

    return {
      source: 'ITE Time-of-Day Data',
      dayType: dayType,
      dataSites: periodData.dataSites,
      setting: periodData.setting,
      hourly: hourlyTrips,
      peakHour: peakHour,
      amPeak: amPeak,
      pmPeak: pmPeak,
      totalTrips: dailyTrips
    };
  }

  /**
   * Get default hourly distribution when no time-of-day data is available
   * Uses typical patterns based on land use type
   */
  getDefaultHourlyDistribution(dailyTrips) {
    // Default distribution based on typical suburban patterns
    const defaultPcts = [
      0.01, 0.005, 0.005, 0.005, 0.01, 0.02,  // 12AM-6AM
      0.05, 0.08, 0.07, 0.05, 0.05, 0.05,     // 6AM-12PM
      0.06, 0.06, 0.06, 0.07, 0.08, 0.09,     // 12PM-6PM
      0.07, 0.05, 0.04, 0.03, 0.02, 0.015     // 6PM-12AM
    ];

    const timeSlots = [
      "12:00 - 1:00 AM", "1:00 - 2:00 AM", "2:00 - 3:00 AM", "3:00 - 4:00 AM",
      "4:00 - 5:00 AM", "5:00 - 6:00 AM", "6:00 - 7:00 AM", "7:00 - 8:00 AM",
      "8:00 - 9:00 AM", "9:00 - 10:00 AM", "10:00 - 11:00 AM", "11:00 - 12:00 PM",
      "12:00 - 1:00 PM", "1:00 - 2:00 PM", "2:00 - 3:00 PM", "3:00 - 4:00 PM",
      "4:00 - 5:00 PM", "5:00 - 6:00 PM", "6:00 - 7:00 PM", "7:00 - 8:00 PM",
      "8:00 - 9:00 PM", "9:00 - 10:00 PM", "10:00 - 11:00 PM", "11:00 - 12:00 AM"
    ];

    const hourlyTrips = defaultPcts.map((pct, i) => ({
      hour: i,
      time: timeSlots[i],
      totalPct: pct,
      enteringPct: pct * 0.5,
      exitingPct: pct * 0.5,
      total: Math.round(dailyTrips * pct),
      entering: Math.round(dailyTrips * pct * 0.5),
      exiting: Math.round(dailyTrips * pct * 0.5)
    }));

    return {
      source: 'Default Distribution (No ITE Time-of-Day Data)',
      dayType: 'weekday',
      dataSites: 0,
      setting: 'General',
      hourly: hourlyTrips,
      peakHour: hourlyTrips[17],
      amPeak: hourlyTrips[7],
      pmPeak: hourlyTrips[17],
      totalTrips: dailyTrips
    };
  }

  /**
   * Get trips for a specific hour
   * @param {string} iteCode - The ITE land use code
   * @param {number} dailyTrips - Total daily trips
   * @param {number} hour - Hour (0-23)
   * @param {string} dayType - 'weekday', 'saturday', or 'sunday'
   * @returns {object} Trip data for that hour
   */
  getTripsForHour(iteCode, dailyTrips, hour, dayType = 'weekday') {
    const distribution = this.getHourlyDistribution(iteCode, dailyTrips, dayType);
    return distribution.hourly[hour] || null;
  }

  /**
   * Get the actual peak hour from ITE data (more accurate than assuming 7-9 AM / 4-6 PM)
   * @param {string} iteCode - The ITE land use code
   * @param {number} dailyTrips - Total daily trips
   * @param {string} period - 'am' or 'pm'
   * @param {string} dayType - 'weekday', 'saturday', or 'sunday'
   */
  getActualPeakHour(iteCode, dailyTrips, period = 'pm', dayType = 'weekday') {
    const distribution = this.getHourlyDistribution(iteCode, dailyTrips, dayType);

    if (period === 'am') {
      return distribution.amPeak;
    } else if (period === 'pm') {
      return distribution.pmPeak;
    }
    return distribution.peakHour;
  }

  /**
   * Check if modal data is available for a land use code
   * @param {string} iteCode - The ITE land use code
   * @returns {boolean} True if modal data exists
   */
  hasModalData(iteCode) {
    return !!this.modalData[iteCode];
  }

  /**
   * Get available modes for a land use code
   * @param {string} iteCode - The ITE land use code
   * @returns {string[]} Array of available modes
   */
  getAvailableModes(iteCode) {
    const modes = ['vehicle']; // Always available from main database
    if (this.modalData[iteCode]) {
      const data = this.modalData[iteCode];
      if (data.person) modes.push('person');
      // For walk/bicycle/transit, also consider walk_bike_transit as fallback
      if (data.walk || data.walk_bike_transit) modes.push('walk');
      if (data.bicycle || data.walk_bike_transit) modes.push('bicycle');
      if (data.transit || data.walk_bike_transit) modes.push('transit');
    }
    return modes;
  }

  /**
   * Calculate trips for a specific modal type
   * @param {string} iteCode - The ITE land use code
   * @param {number} size - Development size
   * @param {string} modeType - Modal type (person, walk, bicycle, transit)
   * @returns {object} Modal trip results
   */
  calculateModal(iteCode, size, modeType) {
    const modalData = this.modalData[iteCode];

    if (!modalData) {
      return {
        available: false,
        modeType: modeType,
        error: `No modal data available for ITE code ${iteCode}`
      };
    }

    // Check if individual mode data exists
    let modeData = modalData[modeType];
    let usedFallback = false;

    // If individual mode not available, try to use walk_bike_transit as fallback
    // for walk, bicycle, or transit modes
    if (!modeData && ['walk', 'bicycle', 'transit'].includes(modeType) && modalData.walk_bike_transit) {
      modeData = modalData.walk_bike_transit;
      usedFallback = true;
    }

    if (!modeData) {
      return {
        available: false,
        modeType: modeType,
        error: `No ${modeType} data available for ITE code ${iteCode}`
      };
    }
    const result = {
      available: true,
      modeType: modeType,
      source: usedFallback ? 'ITE 12th Edition (Combined Walk/Bike/Transit)' : 'ITE 12th Edition Modal Data',
      usedCombinedFallback: usedFallback
    };

    // Calculate for each time period if available
    if (modeData.weekday) {
      result.weekday = this.calculateModalPeriod(modeData.weekday, size);
    }
    if (modeData.am_peak) {
      result.amPeak = this.calculateModalPeriod(modeData.am_peak, size);
    }
    if (modeData.pm_peak) {
      result.pmPeak = this.calculateModalPeriod(modeData.pm_peak, size);
    }

    return result;
  }

  /**
   * Calculate modal trips for a specific time period
   * @param {object} periodData - Period data (rate, entering, exiting, sample_size)
   * @param {number} size - Development size
   * @returns {object} Period trip results
   */
  calculateModalPeriod(periodData, size) {
    const trips = Math.round(periodData.rate * size);
    const entering = Math.round(trips * (periodData.entering / 100));
    const exiting = Math.round(trips * (periodData.exiting / 100));

    return {
      trips: trips,
      rate: periodData.rate,
      entering: entering,
      exiting: exiting,
      enteringPct: periodData.entering,
      exitingPct: periodData.exiting,
      sampleSize: periodData.sample_size,
      method: 'Average Rate'
    };
  }

  /**
   * Main calculation function
   * @param {string} iteCode - The ITE land use code
   * @param {number} size - The size/quantity of development
   * @param {string[]} modes - Array of modes to calculate (default: ['vehicle'])
   * @returns {object} Complete trip generation analysis
   */
  calculate(iteCode, size, modes = ['vehicle']) {
    const data = this.database[iteCode];

    if (!data) {
      return {
        success: false,
        error: `ITE Code ${iteCode} not found in database`
      };
    }

    if (!size || size <= 0) {
      return {
        success: false,
        error: "Size must be a positive number"
      };
    }

    // Calculate trips for each time period
    const weekdayResult = this.calculatePeriod(data.weekday, size, "weekday");
    const amPeakResult = this.calculatePeriod(data.am_peak, size, "am_peak", data.am_peak.entering, data.am_peak.exiting);
    const pmPeakResult = this.calculatePeriod(data.pm_peak, size, "pm_peak", data.pm_peak.entering, data.pm_peak.exiting);

    // Determine data quality
    const quality = this.assessDataQuality(data);

    // Check thresholds
    const thresholdCheck = this.checkThresholds(weekdayResult.trips, amPeakResult.trips, pmPeakResult.trips);

    // Get hourly distribution if available (for more accurate analysis)
    const hourlyDistribution = this.getHourlyDistribution(iteCode, weekdayResult.trips, 'weekday');
    const hasTimeOfDay = this.hasTimeOfDayData(iteCode);
    const availablePeriods = this.getAvailablePeriods(iteCode);

    // Calculate modal trips for non-vehicle modes
    const modalResults = {};
    const selectedModes = modes || ['vehicle'];
    const availableModalModes = this.getAvailableModes(iteCode);

    for (const mode of selectedModes) {
      if (mode === 'vehicle') {
        // Vehicle is already calculated above
        modalResults.vehicle = {
          available: true,
          modeType: 'vehicle',
          source: 'ITE 11th Edition',
          weekday: weekdayResult,
          amPeak: amPeakResult,
          pmPeak: pmPeakResult
        };
      } else if (availableModalModes.includes(mode)) {
        modalResults[mode] = this.calculateModal(iteCode, size, mode);
      } else {
        modalResults[mode] = {
          available: false,
          modeType: mode,
          error: `No ${mode} data available for ITE code ${iteCode}`
        };
      }
    }

    return {
      success: true,
      iteCode: data.code,
      landUseName: data.name,
      category: data.category,
      size: size,
      unit: data.unit,
      source: data.source,
      pageRef: data.page_ref,
      weekday: weekdayResult,
      amPeak: amPeakResult,
      pmPeak: pmPeakResult,
      quality: quality,
      thresholds: thresholdCheck,
      // Enhanced accuracy data from Time-of-Day distribution
      hourlyDistribution: hourlyDistribution,
      hasTimeOfDayData: hasTimeOfDay,
      availablePeriods: availablePeriods,
      // Multi-modal trip results
      selectedModes: selectedModes,
      availableModes: availableModalModes,
      modalResults: modalResults,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calculate trips for a specific time period
   * Implements smart method selection based on ITE guidance:
   * - Uses fitted curve when size is within study data range
   * - Falls back to average rate for small developments where fitted curve extrapolates poorly
   */
  calculatePeriod(periodData, size, periodType, enteringPct = 50, exitingPct = 50) {
    let trips, method, formula, caution = false;
    let methodReason = null;
    let alternativeResult = null;

    // Check if we should use fitted curve or average rate based on data range
    const shouldUseFittedCurve = this.shouldUseFittedCurve(periodData, size);

    // Decision tree with smart method selection
    if (periodData.r_squared >= this.thresholds.r_squared_good && periodData.equation && shouldUseFittedCurve.use) {
      // R² >= 0.75 AND Equation exists AND size is within reasonable range
      trips = this.useFittedCurve(periodData.equation, size);
      method = "Fitted Curve Equation";
      formula = this.getFormulaString(periodData.equation, size);

      // Calculate alternative (average rate) for comparison
      if (periodData.rate) {
        const altTrips = this.useAverageRate(periodData.rate, size);
        alternativeResult = {
          trips: Math.round(altTrips),
          method: "Average Rate",
          formula: `${size} x ${periodData.rate} = ${altTrips.toFixed(2)}`
        };
      }
    } else if (periodData.r_squared >= this.thresholds.r_squared_good && periodData.equation && !shouldUseFittedCurve.use) {
      // R² is good BUT size is outside data range - use average rate instead
      trips = this.useAverageRate(periodData.rate, size);
      method = "Average Rate";
      formula = `${size} x ${periodData.rate} = ${trips.toFixed(2)}`;
      methodReason = shouldUseFittedCurve.reason;
      caution = true;

      // Calculate what fitted curve would give for comparison
      const fittedTrips = this.useFittedCurve(periodData.equation, size);
      alternativeResult = {
        trips: Math.round(fittedTrips),
        method: "Fitted Curve Equation (not recommended)",
        formula: this.getFormulaString(periodData.equation, size),
        notRecommended: true,
        reason: shouldUseFittedCurve.reason
      };
    } else if (periodData.r_squared >= this.thresholds.r_squared_fair && periodData.equation) {
      // R² >= 0.50 AND Equation exists: USE Fitted Curve Equation with caution
      trips = this.useFittedCurve(periodData.equation, size);
      method = "Fitted Curve Equation (with caution)";
      formula = this.getFormulaString(periodData.equation, size);
      caution = true;
    } else if (periodData.rate) {
      // Use Average Rate
      trips = this.useAverageRate(periodData.rate, size);
      method = "Average Rate";
      formula = `${size} x ${periodData.rate} = ${trips.toFixed(2)}`;
    } else {
      // Insufficient data
      return {
        trips: null,
        method: "Insufficient Data",
        formula: null,
        entering: null,
        exiting: null,
        error: "Manual review needed"
      };
    }

    // Round trips (can't have fractional vehicle trips)
    trips = Math.round(trips);

    // Calculate directional splits
    const entering = Math.round(trips * (enteringPct / 100));
    const exiting = Math.round(trips * (exitingPct / 100));

    return {
      trips: trips,
      method: method,
      formula: formula,
      rate: periodData.rate,
      r_squared: periodData.r_squared,
      sample_size: periodData.sample_size,
      entering: entering,
      exiting: exiting,
      enteringPct: enteringPct,
      exitingPct: exitingPct,
      caution: caution,
      methodReason: methodReason,
      alternativeResult: alternativeResult,
      studyRange: periodData.study_range || null
    };
  }

  /**
   * Determine if fitted curve equation should be used based on development size
   * ITE guidance: Use average rate when size is well outside the study data range
   * or when fitted curve produces unrealistic results
   */
  shouldUseFittedCurve(periodData, size) {
    // If no equation exists, can't use fitted curve
    if (!periodData.equation) {
      return { use: false, reason: "No fitted curve equation available" };
    }

    // If no rate exists, must use fitted curve
    if (!periodData.rate) {
      return { use: true, reason: "Using fitted curve (no average rate available)" };
    }

    // Check study range if available
    if (periodData.study_range) {
      const { min, max, avg } = periodData.study_range;

      // If size is less than 10% of the minimum study size, use average rate
      if (size < min * 0.5) {
        return {
          use: false,
          reason: `Development size (${size}) is well below the study data range (min: ${min}). Average rate is more appropriate.`
        };
      }

      // If size is greater than 2x the maximum study size, use average rate
      if (size > max * 2) {
        return {
          use: false,
          reason: `Development size (${size}) is well above the study data range (max: ${max}). Average rate is more appropriate.`
        };
      }
    }

    // Calculate fitted curve result and check if it's unrealistic
    const fittedTrips = this.useFittedCurve(periodData.equation, size);
    const rateTrips = this.useAverageRate(periodData.rate, size);

    // If fitted curve gives > 2.5x the average rate result, it's likely extrapolating poorly
    if (fittedTrips > rateTrips * 2.5) {
      return {
        use: false,
        reason: `Fitted curve produces unrealistic results (${Math.round(fittedTrips)} trips vs ${Math.round(rateTrips)} using average rate). This occurs when extrapolating outside the study data range.`
      };
    }

    // If fitted curve gives < 0.4x the average rate result, also suspect
    if (fittedTrips < rateTrips * 0.4 && fittedTrips > 0) {
      return {
        use: false,
        reason: `Fitted curve produces unusually low results (${Math.round(fittedTrips)} trips vs ${Math.round(rateTrips)} using average rate). Average rate is more reliable here.`
      };
    }

    // If fitted curve produces negative trips, definitely use average rate
    if (fittedTrips < 0) {
      return {
        use: false,
        reason: `Fitted curve produces negative trips at this size. Using average rate instead.`
      };
    }

    // Default: use fitted curve
    return { use: true, reason: null };
  }

  /**
   * Calculate trips using fitted curve equation
   */
  useFittedCurve(equation, size) {
    if (!equation) return null;

    switch (equation.type) {
      case "linear":
        // T = a*X + b
        return equation.a * size + (equation.b || 0);

      case "log":
        // Ln(T) = a*Ln(X) + b
        // T = e^(a*ln(X) + b) = X^a * e^b
        if (size <= 0) return 0;
        return Math.exp(equation.a * Math.log(size) + equation.b);

      case "polynomial":
        // T = a*X^2 + b*X + c
        return equation.a * Math.pow(size, 2) + equation.b * size + (equation.c || 0);

      default:
        return null;
    }
  }

  /**
   * Calculate trips using average rate
   */
  useAverageRate(rate, size) {
    return rate * size;
  }

  /**
   * Generate formula string for display
   */
  getFormulaString(equation, size) {
    if (!equation) return null;

    switch (equation.type) {
      case "linear":
        const intercept = equation.b ? ` + ${equation.b}` : "";
        const result = equation.a * size + (equation.b || 0);
        return `T = ${equation.a}(${size})${intercept} = ${result.toFixed(2)}`;

      case "log":
        const logResult = Math.exp(equation.a * Math.log(size) + equation.b);
        return `Ln(T) = ${equation.a}*Ln(${size}) + ${equation.b} => T = ${logResult.toFixed(2)}`;

      default:
        return null;
    }
  }

  /**
   * Assess data quality based on sample size and R²
   */
  assessDataQuality(data) {
    const sampleSize = data.weekday.sample_size || 0;
    const rSquared = data.weekday.r_squared || 0;

    let sampleQuality, correlationQuality, confidenceLevel;

    // Sample size assessment
    if (sampleSize >= 30) {
      sampleQuality = "Good";
    } else if (sampleSize >= this.thresholds.sample_size_warning) {
      sampleQuality = "Adequate";
    } else if (sampleSize >= this.thresholds.sample_size_unreliable) {
      sampleQuality = "Low";
    } else {
      sampleQuality = "Very Unreliable";
    }

    // R² assessment
    if (rSquared >= this.thresholds.r_squared_good) {
      correlationQuality = "Good";
    } else if (rSquared >= this.thresholds.r_squared_fair) {
      correlationQuality = "Fair";
    } else if (rSquared >= this.thresholds.r_squared_poor) {
      correlationQuality = "Poor";
    } else if (rSquared > 0) {
      correlationQuality = "No Correlation";
    } else {
      correlationQuality = "N/A";
    }

    // Overall confidence
    if (sampleQuality === "Good" && correlationQuality === "Good") {
      confidenceLevel = "High";
    } else if (sampleQuality === "Very Unreliable" || correlationQuality === "No Correlation") {
      confidenceLevel = "Low";
    } else {
      confidenceLevel = "Medium";
    }

    return {
      sampleSize: sampleSize,
      sampleQuality: sampleQuality,
      rSquared: rSquared,
      correlationQuality: correlationQuality,
      confidenceLevel: confidenceLevel
    };
  }

  /**
   * Check against Henrico County thresholds
   */
  checkThresholds(weekdayTrips, amPeakTrips, pmPeakTrips) {
    const results = {
      peakHourWarning: false,
      dailyWarning: false,
      tiaRequired: false,
      overallStatus: "PASS",
      warnings: [],
      details: []
    };

    // Check AM peak
    if (amPeakTrips > this.thresholds.peak_hour_warning) {
      results.peakHourWarning = true;
      results.warnings.push(`AM Peak Hour (${amPeakTrips}) exceeds ${this.thresholds.peak_hour_warning} trips/hour`);
    }

    // Check PM peak
    if (pmPeakTrips > this.thresholds.peak_hour_warning) {
      results.peakHourWarning = true;
      results.warnings.push(`PM Peak Hour (${pmPeakTrips}) exceeds ${this.thresholds.peak_hour_warning} trips/hour`);
    }

    // Check daily trips
    if (weekdayTrips > this.thresholds.daily_warning) {
      results.dailyWarning = true;
      results.warnings.push(`Weekday Daily (${weekdayTrips}) exceeds ${this.thresholds.daily_warning} trips/day`);
    }

    // Check TIA requirement
    if (weekdayTrips >= this.thresholds.tia_required) {
      results.tiaRequired = true;
      results.warnings.push(`TIA Required: ${weekdayTrips} vpd >= ${this.thresholds.tia_required} vpd threshold`);
    }

    // Set overall status
    if (results.tiaRequired) {
      results.overallStatus = "TIA REQUIRED";
    } else if (results.warnings.length > 0) {
      results.overallStatus = "WARNING";
    }

    // Add threshold details
    results.details = [
      {
        threshold: "Peak Hour Warning",
        value: this.thresholds.peak_hour_warning,
        unit: "trips/hour",
        amPeak: amPeakTrips,
        pmPeak: pmPeakTrips,
        status: results.peakHourWarning ? "EXCEEDED" : "PASS"
      },
      {
        threshold: "Daily Warning",
        value: this.thresholds.daily_warning,
        unit: "trips/day",
        actual: weekdayTrips,
        status: results.dailyWarning ? "EXCEEDED" : "PASS"
      },
      {
        threshold: "TIA Required (County)",
        value: this.thresholds.tia_required,
        unit: "vpd",
        actual: weekdayTrips,
        status: results.tiaRequired ? "REQUIRED" : "NOT REQUIRED"
      },
      {
        threshold: "VDOT Threshold",
        value: this.thresholds.vdot_threshold,
        unit: "vpd",
        actual: weekdayTrips,
        status: weekdayTrips >= this.thresholds.vdot_threshold ? "EXCEEDED" : "PASS"
      }
    ];

    return results;
  }

  /**
   * Search for ITE codes by name or code
   */
  search(query) {
    const results = [];
    const searchTerm = query.toLowerCase();

    for (const [code, data] of Object.entries(this.database)) {
      if (
        code.includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm) ||
        data.category.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          code: code,
          name: data.name,
          category: data.category,
          unit: data.unit
        });
      }
    }

    return results.sort((a, b) => a.code.localeCompare(b.code));
  }

  /**
   * Get all ITE codes grouped by category
   */
  getByCategory() {
    const grouped = {};

    for (const [category, codes] of Object.entries(ITE_CATEGORIES)) {
      grouped[category] = codes.map(code => ({
        code: code,
        name: this.database[code]?.name || "Unknown",
        unit: this.database[code]?.unit || "Unknown"
      }));
    }

    return grouped;
  }

  /**
   * Get details for a specific ITE code
   */
  getDetails(iteCode) {
    return this.database[iteCode] || null;
  }

  /**
   * Generate executive summary text
   */
  generateExecutiveSummary(result, parcelId) {
    if (!result.success) {
      return `Error: ${result.error}`;
    }

    const unitText = result.unit.toLowerCase().includes("dwelling") ?
      `${result.size} residential units` :
      `${result.size.toLocaleString()} ${result.unit}`;

    const totalIn = Math.round((result.weekday.trips * 50) / 100);
    const totalOut = result.weekday.trips - totalIn;

    let summary = `For ${parcelId}, the following is the approximate number of new trips expected `;
    summary += `by the proposed development of ${unitText}: `;
    summary += `Total Weekday trips = ${result.weekday.trips.toLocaleString()} `;
    summary += `(${totalIn.toLocaleString()} in and ${totalOut.toLocaleString()} out).`;

    if (result.thresholds.warnings.length > 0) {
      summary += `\n\nWARNINGS:\n`;
      result.thresholds.warnings.forEach(warning => {
        summary += `- ${warning}\n`;
      });
    }

    return summary;
  }
}

// Create global calculator instance
const calculator = new ITECalculator();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ITECalculator, calculator };
}
