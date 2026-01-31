/**
 * ITE Trip Generation Modal Data
 * Source: ITE Trip Generation Manual, 12th Edition - Modal Data Plots
 * Contains person, pedestrian, bicycle, and transit trip rates
 * Last Updated: 2026-01-30
 */

const ITE_MODAL_DATA = {
  "215": {
    person: {
      am_peak: { rate: 0.52, entering: 25, exiting: 75, sample_size: 6 },
      pm_peak: { rate: 0.79, entering: 57, exiting: 43, sample_size: 6 },
    },
    walk_bike_transit: {
      am_peak: { rate: 0.11, entering: 25, exiting: 75, sample_size: 7 },
      pm_peak: { rate: 0.18, entering: 62, exiting: 38, sample_size: 7 },
    },
    walk: {
      am_peak: { rate: 0.11, entering: 21, exiting: 79, sample_size: 7 },
      pm_peak: { rate: 0.16, entering: 66, exiting: 34, sample_size: 7 },
    },
    bicycle: {
      am_peak: { rate: 0.01, entering: 75, exiting: 25, sample_size: 6 },
      pm_peak: { rate: 0.03, entering: 38, exiting: 62, sample_size: 6 },
    },
  },
  "220": {
    person: {
      am_peak: { rate: 0.38, entering: 22, exiting: 78, sample_size: 6 },
      pm_peak: { rate: 0.54, entering: 63, exiting: 37, sample_size: 8 },
    },
    walk_bike_transit: {
      am_peak: { rate: 0.03, entering: 57, exiting: 43, sample_size: 8 },
      pm_peak: { rate: 0.03, entering: 50, exiting: 50, sample_size: 10 },
    },
    walk: {
      am_peak: { rate: 0.03, entering: 57, exiting: 43, sample_size: 8 },
      pm_peak: { rate: 0.03, entering: 67, exiting: 33, sample_size: 10 },
    },
    bicycle: {
      am_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 6 },
      pm_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 8 },
    },
    transit: {
      am_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 5 },
      pm_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 7 },
    },
  },
  "221": {
    person: {
      weekday: { rate: 4.9, entering: 50, exiting: 50, sample_size: 1 },
      am_peak: { rate: 0.58, entering: 40, exiting: 60, sample_size: 5 },
      pm_peak: { rate: 0.7, entering: 72, exiting: 28, sample_size: 5 },
    },
    walk_bike_transit: {
      am_peak: { rate: 0.13, entering: 36, exiting: 64, sample_size: 5 },
      pm_peak: { rate: 0.12, entering: 58, exiting: 42, sample_size: 5 },
    },
    walk: {
      am_peak: { rate: 0.12, entering: 43, exiting: 57, sample_size: 5 },
      pm_peak: { rate: 0.12, entering: 59, exiting: 41, sample_size: 5 },
    },
    bicycle: {
      am_peak: { rate: 0.01, entering: 25, exiting: 75, sample_size: 5 },
      pm_peak: { rate: 0.0, entering: 33, exiting: 67, sample_size: 5 },
    },
    transit: {
      am_peak: { rate: 0.02, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 0.01, entering: 50, exiting: 50, sample_size: 1 },
    },
  },
  "222": {
    person: {
      am_peak: { rate: 0.38, entering: 21, exiting: 79, sample_size: 1 },
      pm_peak: { rate: 0.41, entering: 58, exiting: 42, sample_size: 1 },
    },
    walk_bike_transit: {
      am_peak: { rate: 0.17, entering: 11, exiting: 89, sample_size: 1 },
      pm_peak: { rate: 0.15, entering: 66, exiting: 34, sample_size: 1 },
    },
    walk: {
      am_peak: { rate: 0.16, entering: 10, exiting: 90, sample_size: 1 },
      pm_peak: { rate: 0.14, entering: 68, exiting: 32, sample_size: 1 },
    },
    bicycle: {
      am_peak: { rate: 0.01, entering: 29, exiting: 71, sample_size: 1 },
      pm_peak: { rate: 0.01, entering: 20, exiting: 80, sample_size: 1 },
    },
  },
  "223": {
    person: {
      am_peak: { rate: 0.88, entering: 50, exiting: 50, sample_size: 2 },
    },
  },
  "225": {
    walk: {
      am_peak: { rate: 0.15, entering: 19, exiting: 81, sample_size: 1 },
      pm_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 1 },
    },
  },
  "226": {
    walk: {
      am_peak: { rate: 0.16, entering: 12, exiting: 88, sample_size: 1 },
      pm_peak: { rate: 0.3, entering: 51, exiting: 49, sample_size: 1 },
    },
  },
  "230": {
    person: {
      weekday: { rate: 5.29, entering: 50, exiting: 50, sample_size: 2 },
      am_peak: { rate: 2.17, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 1.9, entering: 50, exiting: 50, sample_size: 1 },
    },
    walk_bike_transit: {
      am_peak: { rate: 1.27, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 1.28, entering: 50, exiting: 50, sample_size: 1 },
    },
    walk: {
      am_peak: { rate: 0.33, entering: 41, exiting: 59, sample_size: 1 },
      pm_peak: { rate: 0.53, entering: 55, exiting: 45, sample_size: 1 },
    },
    bicycle: {
      am_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 1 },
    },
    transit: {
      am_peak: { rate: 0.92, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 0.79, entering: 50, exiting: 50, sample_size: 1 },
    },
  },
  "231": {
    walk_bike_transit: {
      am_peak: { rate: 0.41, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 0.75, entering: 50, exiting: 50, sample_size: 1 },
    },
    walk: {
      am_peak: { rate: 0.16, entering: 31, exiting: 69, sample_size: 1 },
      pm_peak: { rate: 0.3, entering: 59, exiting: 41, sample_size: 1 },
    },
    bicycle: {
      am_peak: { rate: 0.01, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 0.01, entering: 50, exiting: 50, sample_size: 1 },
    },
    transit: {
      am_peak: { rate: 0.24, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 0.44, entering: 50, exiting: 50, sample_size: 1 },
    },
  },
  "253": {
    person: {
      pm_peak: { rate: 0.44, entering: 61, exiting: 39, sample_size: 1 },
    },
    walk_bike_transit: {
      pm_peak: { rate: 0.03, entering: 50, exiting: 50, sample_size: 1 },
    },
  },
  "710": {
    person: {
      weekday: { rate: 14.87, entering: 50, exiting: 50, sample_size: 1 },
      am_peak: { rate: 0.45, entering: 88, exiting: 12, sample_size: 7 },
      pm_peak: { rate: 0.47, entering: 15, exiting: 85, sample_size: 7 },
    },
    walk_bike_transit: {
      am_peak: { rate: 0.05, entering: 50, exiting: 50, sample_size: 7 },
      pm_peak: { rate: 0.05, entering: 50, exiting: 50, sample_size: 7 },
    },
    walk: {
      am_peak: { rate: 0.01, entering: 50, exiting: 50, sample_size: 7 },
      pm_peak: { rate: 0.01, entering: 50, exiting: 50, sample_size: 7 },
    },
    bicycle: {
      am_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 7 },
      pm_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 7 },
    },
    transit: {
      am_peak: { rate: 0.04, entering: 50, exiting: 50, sample_size: 7 },
      pm_peak: { rate: 0.04, entering: 50, exiting: 50, sample_size: 7 },
    },
  },
  "760": {
    person: {
      am_peak: { rate: 0.62, entering: 69, exiting: 31, sample_size: 9 },
      pm_peak: { rate: 0.61, entering: 34, exiting: 66, sample_size: 9 },
    },
    walk_bike_transit: {
      am_peak: { rate: 0.06, entering: 50, exiting: 50, sample_size: 9 },
      pm_peak: { rate: 0.07, entering: 50, exiting: 50, sample_size: 9 },
    },
    walk: {
      am_peak: { rate: 0.05, entering: 50, exiting: 50, sample_size: 9 },
      pm_peak: { rate: 0.07, entering: 50, exiting: 50, sample_size: 9 },
    },
  },
  "814": {
    person: {
      weekday: { rate: 148.88, entering: 50, exiting: 50, sample_size: 4 },
      am_peak: { rate: 5.28, entering: 53, exiting: 47, sample_size: 4 },
      pm_peak: { rate: 14.66, entering: 49, exiting: 51, sample_size: 4 },
    },
    walk_bike_transit: {
      weekday: { rate: 62.25, entering: 50, exiting: 50, sample_size: 4 },
      am_peak: { rate: 2.76, entering: 55, exiting: 45, sample_size: 4 },
      pm_peak: { rate: 4.72, entering: 50, exiting: 50, sample_size: 10 },
    },
    walk: {
      weekday: { rate: 52.96, entering: 50, exiting: 50, sample_size: 4 },
      am_peak: { rate: 2.61, entering: 54, exiting: 46, sample_size: 4 },
      pm_peak: { rate: 5.37, entering: 49, exiting: 51, sample_size: 4 },
    },
    bicycle: {
      weekday: { rate: 9.29, entering: 50, exiting: 50, sample_size: 4 },
      am_peak: { rate: 0.15, entering: 60, exiting: 40, sample_size: 4 },
      pm_peak: { rate: 0.9, entering: 52, exiting: 48, sample_size: 4 },
    },
    transit: {
      weekday: { rate: 0.0, entering: 50, exiting: 50, sample_size: 4 },
      am_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 4 },
      pm_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 4 },
    },
  },
  "821": {
    person: {
      pm_peak: { rate: 16.52, entering: 50, exiting: 50, sample_size: 1 },
    },
    walk_bike_transit: {
      pm_peak: { rate: 0.04, entering: 50, exiting: 50, sample_size: 1 },
    },
    walk: {
      pm_peak: { rate: 0.02, entering: 50, exiting: 50, sample_size: 1 },
    },
    bicycle: {
      pm_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 1 },
    },
    transit: {
      pm_peak: { rate: 0.02, entering: 50, exiting: 50, sample_size: 1 },
    },
  },
  "840": {
    person: {
      am_peak: { rate: 1.03, entering: 63, exiting: 37, sample_size: 2 },
      pm_peak: { rate: 2.23, entering: 53, exiting: 47, sample_size: 2 },
    },
  },
  "843": {
    person: {
      pm_peak: { rate: 4.97, entering: 42, exiting: 58, sample_size: 3 },
    },
    walk_bike_transit: {
      pm_peak: { rate: 0.03, entering: 50, exiting: 50, sample_size: 3 },
    },
  },
  "850": {
    person: {
      weekday: { rate: 154.54, entering: 50, exiting: 50, sample_size: 5 },
      pm_peak: { rate: 13.96, entering: 49, exiting: 51, sample_size: 5 },
    },
    walk_bike_transit: {
      weekday: { rate: 1.66, entering: 50, exiting: 50, sample_size: 5 },
      am_peak: { rate: 1.11, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 0.38, entering: 50, exiting: 50, sample_size: 6 },
    },
    walk: {
      weekday: { rate: 1.12, entering: 50, exiting: 50, sample_size: 5 },
      am_peak: { rate: 1.02, entering: 67, exiting: 33, sample_size: 2 },
      pm_peak: { rate: 0.44, entering: 58, exiting: 42, sample_size: 7 },
    },
    bicycle: {
      weekday: { rate: 0.55, entering: 50, exiting: 50, sample_size: 5 },
      am_peak: { rate: 0.6, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 0.18, entering: 58, exiting: 42, sample_size: 6 },
    },
    transit: {
      weekday: { rate: 0.0, entering: 50, exiting: 50, sample_size: 5 },
      pm_peak: { rate: 0.0, entering: 50, exiting: 50, sample_size: 5 },
    },
  },
  "851": {
    person: {
      am_peak: { rate: 46.5, entering: 56, exiting: 44, sample_size: 1 },
    },
    walk_bike_transit: {
      am_peak: { rate: 7.0, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 8.02, entering: 50, exiting: 50, sample_size: 3 },
    },
    walk: {
      am_peak: { rate: 7.0, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 6.66, entering: 50, exiting: 50, sample_size: 3 },
    },
  },
  "861": {
    person: {
      weekday: { rate: 27.72, entering: 50, exiting: 50, sample_size: 5 },
      pm_peak: { rate: 3.01, entering: 50, exiting: 50, sample_size: 5 },
    },
    walk_bike_transit: {
      weekday: { rate: 1.11, entering: 50, exiting: 50, sample_size: 5 },
      pm_peak: { rate: 0.13, entering: 50, exiting: 50, sample_size: 5 },
    },
    walk: {
      weekday: { rate: 1.02, entering: 50, exiting: 50, sample_size: 5 },
      am_peak: { rate: 0.21, entering: 72, exiting: 28, sample_size: 1 },
      pm_peak: { rate: 0.36, entering: 50, exiting: 50, sample_size: 6 },
    },
    bicycle: {
      weekday: { rate: 0.06, entering: 50, exiting: 50, sample_size: 5 },
      am_peak: { rate: 0.03, entering: 50, exiting: 50, sample_size: 1 },
      pm_peak: { rate: 0.04, entering: 50, exiting: 50, sample_size: 6 },
    },
    transit: {
      weekday: { rate: 0.03, entering: 50, exiting: 50, sample_size: 5 },
      pm_peak: { rate: 0.01, entering: 50, exiting: 50, sample_size: 5 },
    },
  },
  "862": {
    person: {
      am_peak: { rate: 2.68, entering: 56, exiting: 44, sample_size: 3 },
      pm_peak: { rate: 3.78, entering: 50, exiting: 50, sample_size: 3 },
    },
    walk_bike_transit: {
      am_peak: { rate: 0.06, entering: 50, exiting: 50, sample_size: 3 },
      pm_peak: { rate: 0.19, entering: 50, exiting: 50, sample_size: 3 },
    },
    walk: {
      am_peak: { rate: 0.04, entering: 50, exiting: 50, sample_size: 3 },
      pm_peak: { rate: 0.18, entering: 50, exiting: 50, sample_size: 3 },
    },
  },
  "881": {
    walk_bike_transit: {
      pm_peak: { rate: 0.79, entering: 52, exiting: 48, sample_size: 5 },
    },
  },
  "899": {
    person: {
      pm_peak: { rate: 11.09, entering: 50, exiting: 50, sample_size: 3 },
    },
  },
}; 

// Helper function to get modal data for a land use code
function getModalData(code, tripType, period) {
  if (!ITE_MODAL_DATA[code]) return null;
  if (!ITE_MODAL_DATA[code][tripType]) return null;
  return ITE_MODAL_DATA[code][tripType][period] || null;
}

// Check if modal data is available for a land use code
function hasModalData(code) {
  return !!ITE_MODAL_DATA[code];
}

// Get available trip types for a land use code
function getAvailableModes(code) {
  const modes = ['vehicle']; // Always available from main database
  if (ITE_MODAL_DATA[code]) {
    if (ITE_MODAL_DATA[code].person) modes.push('person');
    if (ITE_MODAL_DATA[code].walk) modes.push('walk');
    if (ITE_MODAL_DATA[code].bicycle) modes.push('bicycle');
    if (ITE_MODAL_DATA[code].transit) modes.push('transit');
    if (ITE_MODAL_DATA[code].walk_bike_transit) modes.push('walk_bike_transit');
  }
  return modes;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ITE_MODAL_DATA, getModalData, hasModalData, getAvailableModes };
}
