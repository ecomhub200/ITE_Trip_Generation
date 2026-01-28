/**
 * ITE Trip Generation Tool - IndexedDB Storage
 * Handles persistent storage of analysis results
 */

const ITEStorage = {
  DB_NAME: 'ITETripGenerationDB',
  DB_VERSION: 1,
  STORE_NAME: 'analyses',
  db: null,

  /**
   * Initialize the IndexedDB database
   * @returns {Promise} Resolves when database is ready
   */
  async init() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log('IndexedDB initialized successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create analyses object store
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const store = db.createObjectStore(this.STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true
          });

          // Create indexes for searching/filtering
          store.createIndex('parcelId', 'parcelId', { unique: false });
          store.createIndex('iteCode', 'iteCode', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('parcelType', 'parcelType', { unique: false });

          console.log('IndexedDB object store created');
        }
      };
    });
  },

  /**
   * Save an analysis result to IndexedDB
   * @param {Object} analysis - The analysis result to save
   * @returns {Promise<number>} The ID of the saved analysis
   */
  async saveAnalysis(analysis) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      // Add metadata
      const record = {
        ...analysis,
        savedAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };

      const request = store.add(record);

      request.onsuccess = (event) => {
        console.log('Analysis saved with ID:', event.target.result);
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Error saving analysis:', event.target.error);
        reject(event.target.error);
      };
    });
  },

  /**
   * Get all saved analyses
   * @returns {Promise<Array>} Array of all saved analyses
   */
  async getAllAnalyses() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.getAll();

      request.onsuccess = (event) => {
        // Sort by savedAt descending (newest first)
        const results = event.target.result.sort((a, b) =>
          new Date(b.savedAt) - new Date(a.savedAt)
        );
        resolve(results);
      };

      request.onerror = (event) => {
        console.error('Error getting analyses:', event.target.error);
        reject(event.target.error);
      };
    });
  },

  /**
   * Get a single analysis by ID
   * @param {number} id - The analysis ID
   * @returns {Promise<Object>} The analysis object
   */
  async getAnalysis(id) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.get(id);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Error getting analysis:', event.target.error);
        reject(event.target.error);
      };
    });
  },

  /**
   * Update an existing analysis
   * @param {Object} analysis - The analysis object with ID
   * @returns {Promise<number>} The ID of the updated analysis
   */
  async updateAnalysis(analysis) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      analysis.lastModified = new Date().toISOString();
      const request = store.put(analysis);

      request.onsuccess = (event) => {
        console.log('Analysis updated:', event.target.result);
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Error updating analysis:', event.target.error);
        reject(event.target.error);
      };
    });
  },

  /**
   * Delete an analysis by ID
   * @param {number} id - The analysis ID to delete
   * @returns {Promise<void>}
   */
  async deleteAnalysis(id) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log('Analysis deleted:', id);
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error deleting analysis:', event.target.error);
        reject(event.target.error);
      };
    });
  },

  /**
   * Delete all analyses
   * @returns {Promise<void>}
   */
  async clearAllAnalyses() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        console.log('All analyses cleared');
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error clearing analyses:', event.target.error);
        reject(event.target.error);
      };
    });
  },

  /**
   * Search analyses by parcel ID or ITE code
   * @param {string} query - Search query
   * @returns {Promise<Array>} Matching analyses
   */
  async searchAnalyses(query) {
    const allAnalyses = await this.getAllAnalyses();
    const lowerQuery = query.toLowerCase();

    return allAnalyses.filter(analysis =>
      analysis.parcelId?.toLowerCase().includes(lowerQuery) ||
      analysis.iteCode?.toLowerCase().includes(lowerQuery) ||
      analysis.landUseName?.toLowerCase().includes(lowerQuery) ||
      analysis.devName?.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get analyses count
   * @returns {Promise<number>} Number of saved analyses
   */
  async getCount() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.count();

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Error counting analyses:', event.target.error);
        reject(event.target.error);
      };
    });
  },

  /**
   * Format date for display
   * @param {string} isoString - ISO date string
   * @returns {string} Formatted date string
   */
  formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  ITEStorage.init().catch(err => {
    console.warn('IndexedDB initialization failed:', err);
  });
});
