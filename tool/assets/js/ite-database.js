/**
 * ITE Trip Generation Database
 * Based on ITE Trip Generation Manual, 12th Edition
 *
 * Auto-generated from vehicle_rates.json
 * Last Updated: 2026-02-01
 * Total Codes: 170
 */

const ITE_DATABASE = {
  "021": {
    code: "021",
    name: "Commercial Airport",
    category: "Terminal",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 1.21,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    pm_peak: {
      rate: 0.55,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "030": {
    code: "030",
    name: "Intermodal Truck Terminal",
    category: "Terminal",
    unit: "1000 Sq. Ft. GFA",
    am_peak: {
      rate: 1.97,
      equation: null,
      r_squared: null,
      entering: 47,
      exiting: 53
    },
    pm_peak: {
      rate: 1.87,
      equation: {"type": "linear", "a": 0.22, "b": 35.12},
      r_squared: 0.63,
      entering: 52,
      exiting: 48
    },
    source: "ITE 12th Edition"
  },
  "035": {
    code: "035",
    name: "Truck and Trailer Parking",
    category: "Terminal",
    unit: "Parking Spaces",
    weekday: {
      rate: 0.7,
      equation: null,
      r_squared: null,
      sample_size: 2
    },
    am_peak: {
      rate: 0.04,
      equation: null,
      r_squared: null,
      entering: 53,
      exiting: 47
    },
    pm_peak: {
      rate: 0.04,
      equation: null,
      r_squared: null,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition"
  },
  "090": {
    code: "090",
    name: "Park-and-Ride Lot with Bus or Light Rail Service",
    category: "Terminal",
    unit: "Parking Spaces",
    weekday: {
      rate: 1.65,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 0.55,
      equation: {"type": "logarithmic", "a": 0.99, "b": -0.68},
      r_squared: 0.86,
      entering: 78,
      exiting: 22
    },
    pm_peak: {
      rate: 0.47,
      equation: {"type": "linear", "a": 0.38, "b": 40.38},
      r_squared: 0.83,
      entering: 26,
      exiting: 74
    },
    source: "ITE 12th Edition"
  },
  "110": {
    code: "110",
    name: "General Light Industrial",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 3.6,
      equation: null,
      r_squared: null,
      sample_size: 27
    },
    am_peak: {
      rate: 0.48,
      equation: null,
      r_squared: null,
      entering: 86,
      exiting: 14
    },
    pm_peak: {
      rate: 0.49,
      equation: null,
      r_squared: null,
      entering: 24,
      exiting: 76
    },
    source: "ITE 12th Edition"
  },
  "130": {
    code: "130",
    name: "Industrial Park",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 2.68,
      equation: {"type": "linear", "a": 2.04, "b": 808.48},
      r_squared: 0.84,
      sample_size: 27
    },
    am_peak: {
      rate: 0.22,
      equation: {"type": "linear", "a": 0.14, "b": 125.84},
      r_squared: 0.68,
      entering: 77,
      exiting: 23
    },
    pm_peak: {
      rate: 0.23,
      equation: {"type": "linear", "a": 0.16, "b": 114.29},
      r_squared: 0.8,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition"
  },
  "140": {
    code: "140",
    name: "Manufacturing",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 4.27,
      equation: {"type": "logarithmic", "a": 0.68, "b": 2.81},
      r_squared: 0.5,
      sample_size: 36
    },
    am_peak: {
      rate: 0.51,
      equation: null,
      r_squared: null,
      entering: 75,
      exiting: 25
    },
    pm_peak: {
      rate: 0.63,
      equation: {"type": "linear", "a": 0.84, "b": -29.93},
      r_squared: 0.6,
      entering: 29,
      exiting: 71
    },
    source: "ITE 12th Edition"
  },
  "150": {
    code: "150",
    name: "Warehouse",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 1.38,
      equation: {"type": "linear", "a": 1.56, "b": -97.97},
      r_squared: 0.69,
      sample_size: 81
    },
    am_peak: {
      rate: 0.12,
      equation: {"type": "linear", "a": 0.1, "b": 13.43},
      r_squared: 0.62,
      entering: 77,
      exiting: 23
    },
    pm_peak: {
      rate: 0.15,
      equation: {"type": "linear", "a": 0.11, "b": 19.62},
      r_squared: 0.63,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition"
  },
  "151": {
    code: "151",
    name: "Mini-Warehouse",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 1.29,
      equation: null,
      r_squared: null,
      sample_size: 11
    },
    am_peak: {
      rate: 0.08,
      equation: null,
      r_squared: null,
      entering: 59,
      exiting: 41
    },
    pm_peak: {
      rate: 0.14,
      equation: null,
      r_squared: null,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition"
  },
  "154": {
    code: "154",
    name: "High-Cube Transload and Short-Term Storage Warehouse",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 1.4,
      equation: null,
      r_squared: null,
      sample_size: 91
    },
    am_peak: {
      rate: 0.08,
      equation: null,
      r_squared: null,
      entering: 77,
      exiting: 23
    },
    pm_peak: {
      rate: 0.1,
      equation: null,
      r_squared: null,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition"
  },
  "155": {
    code: "155",
    name: "High-Cube Fulfillment Center Warehouse - Non-Sort",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 1.77,
      equation: {"type": "linear", "a": 2.41, "b": -568.85},
      r_squared: 0.5,
      sample_size: 18
    },
    am_peak: {
      rate: 0.12,
      equation: null,
      r_squared: null,
      entering: 75,
      exiting: 25
    },
    pm_peak: {
      rate: 0.14,
      equation: null,
      r_squared: null,
      entering: 41,
      exiting: 59
    },
    source: "ITE 12th Edition"
  },
  "156": {
    code: "156",
    name: "High-Cube Parcel Hub Warehouse",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 4.85,
      equation: null,
      r_squared: null,
      sample_size: 11
    },
    am_peak: {
      rate: 0.38,
      equation: null,
      r_squared: null,
      entering: 57,
      exiting: 43
    },
    pm_peak: {
      rate: 0.36,
      equation: null,
      r_squared: null,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition"
  },
  "157": {
    code: "157",
    name: "High-Cube Cold Storage Warehouse",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 2.23,
      equation: {"type": "linear", "a": 2.86, "b": -354.32},
      r_squared: 0.79,
      sample_size: 6
    },
    am_peak: {
      rate: 0.11,
      equation: {"type": "linear", "a": 0.15, "b": -25.88},
      r_squared: 0.74,
      entering: 63,
      exiting: 37
    },
    pm_peak: {
      rate: 0.11,
      equation: {"type": "linear", "a": 0.16, "b": -28.91},
      r_squared: 0.84,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition"
  },
  "160": {
    code: "160",
    name: "Data Center",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 0.73,
      equation: {"type": "logarithmic", "a": 0.71, "b": 1.51},
      r_squared: 0.78,
      sample_size: 16
    },
    am_peak: {
      rate: 0.07,
      equation: {"type": "linear", "a": 0.05, "b": 9.87},
      r_squared: 0.53,
      entering: 71,
      exiting: 29
    },
    pm_peak: {
      rate: 0.05,
      equation: null,
      r_squared: null,
      entering: 19,
      exiting: 81
    },
    source: "ITE 12th Edition"
  },
  "170": {
    code: "170",
    name: "Utility",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 12.29,
      equation: {"type": "logarithmic", "a": 0.74, "b": 2.73},
      r_squared: 0.51,
      sample_size: 13
    },
    am_peak: {
      rate: 2.33,
      equation: null,
      r_squared: null,
      entering: 87,
      exiting: 13
    },
    pm_peak: {
      rate: 2.16,
      equation: {"type": "logarithmic", "a": 0.81, "b": 0.86},
      r_squared: 0.52,
      entering: 18,
      exiting: 82
    },
    source: "ITE 12th Edition"
  },
  "175": {
    code: "175",
    name: "Industrial Recycling Facility",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    source: "ITE 12th Edition"
  },
  "180": {
    code: "180",
    name: "Specialty Trade Contractor",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 9.82,
      equation: null,
      r_squared: null,
      sample_size: 20
    },
    am_peak: {
      rate: 1.66,
      equation: null,
      r_squared: null,
      entering: 74,
      exiting: 26
    },
    pm_peak: {
      rate: 1.93,
      equation: null,
      r_squared: null,
      entering: 32,
      exiting: 68
    },
    source: "ITE 12th Edition"
  },
  "190": {
    code: "190",
    name: "Cannabis Cultivation and Processing Facility",
    category: "Industrial",
    unit: "1000 Sq. Ft. GFA",
    am_peak: {
      rate: 0.65,
      equation: null,
      r_squared: null,
      entering: 54,
      exiting: 46
    },
    pm_peak: {
      rate: 0.64,
      equation: null,
      r_squared: null,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition"
  },
  "210": {
    code: "210",
    name: "Single-Family Detached Housing",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 9.09,
      equation: {"type": "linear", "a": 8.07, "b": 265.45},
      r_squared: 0.94,
      sample_size: 155
    },
    am_peak: {
      rate: 0.7,
      equation: {"type": "linear", "a": 0.67, "b": 5.59},
      r_squared: 0.89,
      entering: 27,
      exiting: 73
    },
    pm_peak: {
      rate: 0.93,
      equation: {"type": "logarithmic", "a": 0.92, "b": 0.33},
      r_squared: 0.9,
      entering: 62,
      exiting: 38
    },
    source: "ITE 12th Edition"
  },
  "215": {
    code: "215",
    name: "Single-Family Attached Housing",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 6.57,
      equation: {"type": "linear", "a": 6.53, "b": 3.25},
      r_squared: 0.91,
      sample_size: 11
    },
    am_peak: {
      rate: 0.47,
      equation: {"type": "linear", "a": 0.59, "b": -15.25},
      r_squared: 0.94,
      entering: 25,
      exiting: 75
    },
    pm_peak: {
      rate: 0.51,
      equation: {"type": "linear", "a": 0.57, "b": -7.84},
      r_squared: 0.92,
      entering: 57,
      exiting: 43
    },
    source: "ITE 12th Edition"
  },
  "220": {
    code: "220",
    name: "Multifamily Housing (Low-Rise)",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 6.21,
      equation: {"type": "linear", "a": 5.63, "b": 120.45},
      r_squared: 0.7,
      sample_size: 28
    },
    am_peak: {
      rate: 0.41,
      equation: {"type": "linear", "a": 0.35, "b": 12.93},
      r_squared: 0.81,
      entering: 24,
      exiting: 76
    },
    pm_peak: {
      rate: 0.52,
      equation: {"type": "linear", "a": 0.48, "b": 7.35},
      r_squared: 0.83,
      entering: 62,
      exiting: 38
    },
    source: "ITE 12th Edition"
  },
  "221": {
    code: "221",
    name: "Multifamily Housing (Mid-Rise)",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 4.46,
      equation: {"type": "linear", "a": 4.55, "b": -17.52},
      r_squared: 0.9,
      sample_size: 7
    },
    am_peak: {
      rate: 0.38,
      equation: {"type": "linear", "a": 0.42, "b": -7.77},
      r_squared: 0.87,
      entering: 23,
      exiting: 77
    },
    pm_peak: {
      rate: 0.38,
      equation: {"type": "linear", "a": 0.36, "b": 3.07},
      r_squared: 0.92,
      entering: 64,
      exiting: 36
    },
    source: "ITE 12th Edition"
  },
  "227": {
    code: "227",
    name: "Off-Campus Student Apartment (High-Rise) - Adjacent to Campus",
    category: "Residential",
    unit: "Bedrooms",
    am_peak: {
      rate: 0.01,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.04,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "232": {
    code: "232",
    name: "High-Rise Residential with Ground-Floor Commercial - GFA (1-25k)",
    category: "Residential",
    unit: "Dwelling Units",
    am_peak: {
      rate: 0.31,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.21,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "240": {
    code: "240",
    name: "Mobile Home Park",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 7.87,
      equation: {"type": "logarithmic", "a": 0.83, "b": 2.85},
      r_squared: 0.61,
      sample_size: 6
    },
    am_peak: {
      rate: 0.26,
      equation: null,
      r_squared: null,
      entering: 31,
      exiting: 69
    },
    pm_peak: {
      rate: 0.46,
      equation: null,
      r_squared: null,
      entering: 62,
      exiting: 38
    },
    source: "ITE 12th Edition"
  },
  "251": {
    code: "251",
    name: "Senior Adult Housing—Single-Family",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 4.16,
      equation: {"type": "logarithmic", "a": 0.8, "b": 2.71},
      r_squared: 0.88,
      sample_size: 17
    },
    am_peak: {
      rate: 0.24,
      equation: {"type": "logarithmic", "a": 0.71, "b": 0.4},
      r_squared: 0.85,
      entering: 34,
      exiting: 66
    },
    pm_peak: {
      rate: 0.29,
      equation: {"type": "logarithmic", "a": 0.79, "b": 0.15},
      r_squared: 0.86,
      entering: 61,
      exiting: 39
    },
    source: "ITE 12th Edition"
  },
  "252": {
    code: "252",
    name: "Senior Adult Housing—Multifamily",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 3.25,
      equation: {"type": "linear", "a": 2.97, "b": 23.07},
      r_squared: 0.98,
      sample_size: 6
    },
    am_peak: {
      rate: 0.19,
      equation: {"type": "linear", "a": 0.19, "b": 0.17},
      r_squared: 0.89,
      entering: 34,
      exiting: 66
    },
    pm_peak: {
      rate: 0.25,
      equation: {"type": "linear", "a": 0.25, "b": 0.03},
      r_squared: 0.84,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition"
  },
  "254": {
    code: "254",
    name: "Assisted Living",
    category: "Residential",
    unit: "Beds",
    weekday: {
      rate: 4.14,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 0.19,
      equation: null,
      r_squared: null,
      entering: 59,
      exiting: 41
    },
    pm_peak: {
      rate: 0.24,
      equation: null,
      r_squared: null,
      entering: 38,
      exiting: 62
    },
    source: "ITE 12th Edition"
  },
  "255": {
    code: "255",
    name: "Continuing Care Retirement Community",
    category: "Residential",
    unit: "Units",
    weekday: {
      rate: 2.52,
      equation: {"type": "linear", "a": 2.08, "b": 580.32},
      r_squared: 1,
      sample_size: 6
    },
    am_peak: {
      rate: 0.16,
      equation: {"type": "linear", "a": 0.12, "b": 32.69},
      r_squared: 0.96,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 0.19,
      equation: {"type": "linear", "a": 0.13, "b": 66.22},
      r_squared: 0.95,
      entering: 39,
      exiting: 61
    },
    source: "ITE 12th Edition"
  },
  "260": {
    code: "260",
    name: "Recreational Homes",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 3.68,
      equation: {"type": "logarithmic", "a": 0.96, "b": 1.57},
      r_squared: 0.96,
      sample_size: 5
    },
    am_peak: {
      rate: 0.24,
      equation: {"type": "linear", "a": 0.25, "b": -12.88},
      r_squared: 0.85,
      entering: 35,
      exiting: 65
    },
    pm_peak: {
      rate: 0.29,
      equation: {"type": "logarithmic", "a": 0.93, "b": -0.77},
      r_squared: 0.97,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition"
  },
  "265": {
    code: "265",
    name: "Timeshare",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 10.03,
      equation: {"type": "linear", "a": 9.48, "b": 38.04},
      r_squared: 0.79,
      sample_size: 12
    },
    am_peak: {
      rate: 0.48,
      equation: {"type": "linear", "a": 0.5, "b": -1.46},
      r_squared: 0.77,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.75,
      equation: {"type": "linear", "a": 0.72, "b": 1.96},
      r_squared: 0.83,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "310": {
    code: "310",
    name: "Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 5.84,
      equation: null,
      r_squared: null,
      sample_size: 2
    },
    am_peak: {
      rate: 0.34,
      equation: {"type": "linear", "a": 0.49, "b": -18.48},
      r_squared: 0.68,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 0.47,
      equation: {"type": "linear", "a": 0.85, "b": -55.22},
      r_squared: 0.64,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition"
  },
  "311": {
    code: "311",
    name: "All-Suites Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 4.4,
      equation: {"type": "linear", "a": 5.16, "b": -112.23},
      r_squared: 0.92,
      sample_size: 7
    },
    am_peak: {
      rate: 0.26,
      equation: {"type": "linear", "a": 0.33, "b": -9.86},
      r_squared: 0.9,
      entering: 51,
      exiting: 49
    },
    pm_peak: {
      rate: 0.34,
      equation: {"type": "linear", "a": 0.36, "b": -3.7},
      r_squared: 0.87,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition"
  },
  "312": {
    code: "312",
    name: "Limited-Service Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 4.02,
      equation: {"type": "linear", "a": 2.9, "b": 151.69},
      r_squared: 0.89,
      sample_size: 10
    },
    am_peak: {
      rate: 0.35,
      equation: {"type": "linear", "a": 0.3, "b": 6.9},
      r_squared: 0.65,
      entering: 39,
      exiting: 61
    },
    pm_peak: {
      rate: 0.31,
      equation: {"type": "linear", "a": 0.21, "b": 12.06},
      r_squared: 0.56,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition"
  },
  "320": {
    code: "320",
    name: "Motel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 3.35,
      equation: {"type": "linear", "a": 3.62, "b": -29.43},
      r_squared: 0.96,
      sample_size: 6
    },
    am_peak: {
      rate: 0.33,
      equation: {"type": "linear", "a": 0.32, "b": 0.48},
      r_squared: 0.76,
      entering: 39,
      exiting: 61
    },
    pm_peak: {
      rate: 0.37,
      equation: null,
      r_squared: null,
      entering: 54,
      exiting: 46
    },
    source: "ITE 12th Edition"
  },
  "330": {
    code: "330",
    name: "Resort Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 2.67,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 0.33,
      equation: null,
      r_squared: null,
      entering: 70,
      exiting: 30
    },
    pm_peak: {
      rate: 0.39,
      equation: null,
      r_squared: null,
      entering: 43,
      exiting: 57
    },
    source: "ITE 12th Edition"
  },
  "411": {
    code: "411",
    name: "Public Park",
    category: "Recreational",
    unit: "Acres",
    weekday: {
      rate: 0.78,
      equation: {"type": "linear", "a": 0.64, "b": 88.46},
      r_squared: 0.82,
      sample_size: 5
    },
    source: "ITE 12th Edition"
  },
  "414": {
    code: "414",
    name: "Dog Park",
    category: "Recreational",
    unit: "Acres",
    am_peak: {
      rate: 8,
      equation: null,
      r_squared: null,
      entering: 63,
      exiting: 37
    },
    pm_peak: {
      rate: 19.79,
      equation: null,
      r_squared: null,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition"
  },
  "416": {
    code: "416",
    name: "Campground/Recreational Vehicle Park",
    category: "Recreational",
    unit: "Campsites",
    weekday: {
      rate: 1.04,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 0.07,
      equation: null,
      r_squared: null,
      entering: 27,
      exiting: 73
    },
    pm_peak: {
      rate: 0.09,
      equation: null,
      r_squared: null,
      entering: 54,
      exiting: 46
    },
    source: "ITE 12th Edition"
  },
  "430": {
    code: "430",
    name: "Golf Course",
    category: "Recreational",
    unit: "Holes",
    weekday: {
      rate: 30.38,
      equation: {"type": "linear", "a": 34.93, "b": -102.33},
      r_squared: 0.72,
      sample_size: 4
    },
    am_peak: {
      rate: 1.68,
      equation: {"type": "linear", "a": 1.31, "b": 6.62},
      r_squared: 0.54,
      entering: 79,
      exiting: 21
    },
    pm_peak: {
      rate: 2.86,
      equation: {"type": "linear", "a": 1.4, "b": 27.46},
      r_squared: 0.51,
      entering: 54,
      exiting: 46
    },
    source: "ITE 12th Edition"
  },
  "431": {
    code: "431",
    name: "Miniature Golf Course",
    category: "Recreational",
    unit: "",
    source: "ITE 12th Edition"
  },
  "432": {
    code: "432",
    name: "Golf Driving Range",
    category: "Recreational",
    unit: "",
    source: "ITE 12th Edition"
  },
  "433": {
    code: "433",
    name: "Batting Cages",
    category: "Recreational",
    unit: "Cages",
    pm_peak: {
      rate: 2.22,
      equation: null,
      r_squared: null,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition"
  },
  "434": {
    code: "434",
    name: "Rock-Climbing Gym",
    category: "Recreational",
    unit: "1000 Sq. Ft. GFA",
    am_peak: {
      rate: 1.4,
      equation: null,
      r_squared: null,
      entering: 33,
      exiting: 67
    },
    pm_peak: {
      rate: 1.64,
      equation: null,
      r_squared: null,
      entering: 57,
      exiting: 43
    },
    source: "ITE 12th Edition"
  },
  "435": {
    code: "435",
    name: "Multipurpose Recreational Facility",
    category: "Recreational",
    unit: "1000 Sq. Ft. GFA",
    pm_peak: {
      rate: 3.44,
      equation: {"type": "logarithmic", "a": 0.96, "b": 1.38},
      r_squared: 0.92,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition"
  },
  "436": {
    code: "436",
    name: "Trampoline Park",
    category: "Recreational",
    unit: "1000 Sq. Ft. GFA",
    pm_peak: {
      rate: 1.5,
      equation: null,
      r_squared: null,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition"
  },
  "437": {
    code: "437",
    name: "Bowling Alley",
    category: "Recreational",
    unit: "Bowling Lanes",
    am_peak: {
      rate: 1.48,
      equation: null,
      r_squared: null,
      entering: 95,
      exiting: 5
    },
    pm_peak: {
      rate: 1.3,
      equation: {"type": "linear", "a": 2.75, "b": -43.0},
      r_squared: 0.69,
      entering: 65,
      exiting: 35
    },
    source: "ITE 12th Edition"
  },
  "440": {
    code: "440",
    name: "Adult Cabaret",
    category: "Recreational",
    unit: "1000 Sq. Ft. GFA",
    pm_peak: {
      rate: 2.93,
      equation: null,
      r_squared: null,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition"
  },
  "445": {
    code: "445",
    name: "Movie Theater",
    category: "Recreational",
    unit: "1000 Sq. Ft. GFA",
    pm_peak: {
      rate: 13.11,
      equation: null,
      r_squared: null,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition"
  },
  "452": {
    code: "452",
    name: "Horse Racetrack",
    category: "Recreational",
    unit: "Seats",
    weekday: {
      rate: 0.6,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    pm_peak: {
      rate: 0.06,
      equation: null,
      r_squared: null,
      entering: 66,
      exiting: 34
    },
    source: "ITE 12th Edition"
  },
  "453": {
    code: "453",
    name: "Automobile Racetrack",
    category: "Recreational",
    unit: "Attendees",
    source: "ITE 12th Edition"
  },
  "454": {
    code: "454",
    name: "Dog Racetrack",
    category: "Recreational",
    unit: "Attendees",
    pm_peak: {
      rate: 0.15,
      equation: null,
      r_squared: null,
      entering: 8,
      exiting: 92
    },
    source: "ITE 12th Edition"
  },
  "462": {
    code: "462",
    name: "Professional Baseball Stadium",
    category: "Recreational",
    unit: "Attendees",
    weekday: {
      rate: 1.24,
      equation: null,
      r_squared: null,
      sample_size: 2
    },
    am_peak: {
      rate: 0.02,
      equation: null,
      r_squared: null,
      entering: 75,
      exiting: 25
    },
    pm_peak: {
      rate: 0.15,
      equation: null,
      r_squared: null,
      entering: 12,
      exiting: 88
    },
    source: "ITE 12th Edition"
  },
  "465": {
    code: "465",
    name: "Ice Skating Rink",
    category: "Recreational",
    unit: "Rinks",
    weekday: {
      rate: 1.26,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 0.17,
      equation: null,
      r_squared: null,
      entering: 37,
      exiting: 63
    },
    pm_peak: {
      rate: 45.17,
      equation: null,
      r_squared: null,
      entering: 62,
      exiting: 38
    },
    source: "ITE 12th Edition"
  },
  "466": {
    code: "466",
    name: "Snow Ski Area",
    category: "Recreational",
    unit: "Lifts",
    am_peak: {
      rate: 24.63,
      equation: null,
      r_squared: null,
      entering: 97,
      exiting: 3
    },
    pm_peak: {
      rate: 33.77,
      equation: null,
      r_squared: null,
      entering: 12,
      exiting: 88
    },
    source: "ITE 12th Edition"
  },
  "470": {
    code: "470",
    name: "Bingo Hall",
    category: "Recreational",
    unit: "Seats",
    am_peak: {
      rate: 0.15,
      equation: null,
      r_squared: null,
      entering: 93,
      exiting: 7
    },
    pm_peak: {
      rate: 0.48,
      equation: null,
      r_squared: null,
      entering: 8,
      exiting: 92
    },
    source: "ITE 12th Edition"
  },
  "473": {
    code: "473",
    name: "Casino",
    category: "Recreational",
    unit: "Gaming Positions",
    weekday: {
      rate: 8.01,
      equation: null,
      r_squared: null,
      sample_size: 4
    },
    am_peak: {
      rate: 0.4,
      equation: {"type": "logarithmic", "a": 0.61, "b": 2.02},
      r_squared: 0.75,
      entering: 57,
      exiting: 43
    },
    pm_peak: {
      rate: 0.46,
      equation: {"type": "linear", "a": 0.4, "b": 101.04},
      r_squared: 0.79,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition"
  },
  "482": {
    code: "482",
    name: "Waterslide Park",
    category: "Recreational",
    unit: "Acres",
    weekday: {
      rate: 119.14,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 3.82,
      equation: null,
      r_squared: null,
      entering: 70,
      exiting: 30
    },
    pm_peak: {
      rate: 13.82,
      equation: null,
      r_squared: null,
      entering: 21,
      exiting: 79
    },
    source: "ITE 12th Edition"
  },
  "488": {
    code: "488",
    name: "Soccer Field",
    category: "Recreational",
    unit: "Fields",
    weekday: {
      rate: 71.33,
      equation: null,
      r_squared: null,
      sample_size: 3
    },
    am_peak: {
      rate: 0.99,
      equation: null,
      r_squared: null,
      entering: 61,
      exiting: 39
    },
    pm_peak: {
      rate: 16.43,
      equation: {"type": "linear", "a": 13.92, "b": 35.13},
      r_squared: 0.53,
      entering: 66,
      exiting: 34
    },
    source: "ITE 12th Edition"
  },
  "489": {
    code: "489",
    name: "Pickleball Courts",
    category: "Recreational",
    unit: "Courts",
    weekday: {
      rate: 39.22,
      equation: null,
      r_squared: null,
      sample_size: 3
    },
    am_peak: {
      rate: 1.93,
      equation: null,
      r_squared: null,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 4.39,
      equation: null,
      r_squared: null,
      entering: 61,
      exiting: 39
    },
    source: "ITE 12th Edition"
  },
  "490": {
    code: "490",
    name: "Tennis Courts",
    category: "Recreational",
    unit: "Courts",
    weekday: {
      rate: 30.32,
      equation: null,
      r_squared: null,
      sample_size: 2
    },
    pm_peak: {
      rate: 4.21,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "491": {
    code: "491",
    name: "Racquet/Tennis Club",
    category: "Recreational",
    unit: "Courts",
    weekday: {
      rate: 27.71,
      equation: null,
      r_squared: null,
      sample_size: 2
    },
    pm_peak: {
      rate: 3.82,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "492": {
    code: "492",
    name: "Health/Fitness Club",
    category: "Recreational",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 30.02,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 1.79,
      equation: {"type": "logarithmic", "a": 0.68, "b": 1.7},
      r_squared: 0.55,
      entering: 51,
      exiting: 49
    },
    pm_peak: {
      rate: 3.77,
      equation: {"type": "logarithmic", "a": 0.79, "b": 2.02},
      r_squared: 0.65,
      entering: 57,
      exiting: 43
    },
    source: "ITE 12th Edition"
  },
  "493": {
    code: "493",
    name: "Athletic Club",
    category: "Recreational",
    unit: "1000 Sq. Ft. GFA",
    am_peak: {
      rate: 1.96,
      equation: null,
      r_squared: null,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 3.38,
      equation: null,
      r_squared: null,
      entering: 63,
      exiting: 37
    },
    source: "ITE 12th Edition"
  },
  "494": {
    code: "494",
    name: "Boutique Fitness Studio",
    category: "Recreational",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 41.14,
      equation: null,
      r_squared: null,
      sample_size: 2
    },
    am_peak: {
      rate: 11.69,
      equation: null,
      r_squared: null,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 8,
      equation: null,
      r_squared: null,
      entering: 82,
      exiting: 18
    },
    source: "ITE 12th Edition"
  },
  "495": {
    code: "495",
    name: "Recreational Community Center",
    category: "Recreational",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 28.82,
      equation: {"type": "logarithmic", "a": 0.98, "b": 3.42},
      r_squared: 0.74,
      sample_size: 4
    },
    am_peak: {
      rate: 2.02,
      equation: {"type": "logarithmic", "a": 0.53, "b": 2.88},
      r_squared: 0.56,
      entering: 66,
      exiting: 34
    },
    pm_peak: {
      rate: 2.89,
      equation: {"type": "logarithmic", "a": 0.8, "b": 1.94},
      r_squared: 0.58,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition"
  },
  "501": {
    code: "501",
    name: "Military Base",
    category: "Institutional",
    unit: "Employees",
    am_peak: {
      rate: 0.32,
      equation: null,
      r_squared: null,
      entering: 88,
      exiting: 12
    },
    pm_peak: {
      rate: 0.3,
      equation: null,
      r_squared: null,
      entering: 25,
      exiting: 75
    },
    source: "ITE 12th Edition"
  },
  "520": {
    code: "520",
    name: "Elementary School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 2.27,
      equation: null,
      r_squared: null,
      sample_size: 16
    },
    am_peak: {
      rate: 0.73,
      equation: null,
      r_squared: null,
      entering: 54,
      exiting: 46
    },
    pm_peak: {
      rate: 0.16,
      equation: null,
      r_squared: null,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition"
  },
  "522": {
    code: "522",
    name: "Middle School/Junior High School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 2.09,
      equation: {"type": "logarithmic", "a": 0.97, "b": 0.97},
      r_squared: 0.79,
      sample_size: 13
    },
    am_peak: {
      rate: 0.66,
      equation: null,
      r_squared: null,
      entering: 54,
      exiting: 46
    },
    pm_peak: {
      rate: 0.15,
      equation: null,
      r_squared: null,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition"
  },
  "525": {
    code: "525",
    name: "High School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.94,
      equation: null,
      r_squared: null,
      sample_size: 31
    },
    am_peak: {
      rate: 0.52,
      equation: {"type": "logarithmic", "a": 0.67, "b": 1.73},
      r_squared: 0.52,
      entering: 68,
      exiting: 32
    },
    pm_peak: {
      rate: 0.15,
      equation: null,
      r_squared: null,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition"
  },
  "528": {
    code: "528",
    name: "School District Office",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 0.05,
      equation: {"type": "logarithmic", "a": 0.92, "b": -2.41},
      r_squared: 0.83,
      sample_size: 11
    },
    am_peak: {
      rate: 2.36,
      equation: {"type": "linear", "a": 2.5, "b": -2.81},
      r_squared: 0.76,
      entering: 76,
      exiting: 24
    },
    pm_peak: {
      rate: 2.04,
      equation: {"type": "linear", "a": 2.19, "b": -2.81},
      r_squared: 0.61,
      entering: 17,
      exiting: 83
    },
    source: "ITE 12th Edition"
  },
  "530": {
    code: "530",
    name: "Private School (K-8)",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 4.11,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 1.01,
      equation: {"type": "linear", "a": 1.11, "b": -40.99},
      r_squared: 0.92,
      entering: 56,
      exiting: 44
    },
    pm_peak: {
      rate: 0.26,
      equation: null,
      r_squared: null,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition"
  },
  "532": {
    code: "532",
    name: "Private School (K-12)",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.74,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 0.76,
      equation: {"type": "linear", "a": 0.78, "b": -16.91},
      r_squared: 0.96,
      entering: 64,
      exiting: 36
    },
    pm_peak: {
      rate: 0.19,
      equation: null,
      r_squared: null,
      entering: 43,
      exiting: 57
    },
    source: "ITE 12th Edition"
  },
  "534": {
    code: "534",
    name: "Private High School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 2.17,
      equation: null,
      r_squared: null,
      sample_size: 3
    },
    am_peak: {
      rate: 0.66,
      equation: {"type": "linear", "a": 0.35, "b": 133.66},
      r_squared: 0.61,
      entering: 59,
      exiting: 41
    },
    pm_peak: {
      rate: 0.19,
      equation: null,
      r_squared: null,
      entering: 39,
      exiting: 61
    },
    source: "ITE 12th Edition"
  },
  "536": {
    code: "536",
    name: "Charter Elementary School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.85,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 1.04,
      equation: {"type": "linear", "a": 1.05, "b": -2.46},
      r_squared: 0.86,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 0.16,
      equation: null,
      r_squared: null,
      entering: 35,
      exiting: 65
    },
    source: "ITE 12th Edition"
  },
  "538": {
    code: "538",
    name: "Charter School (K-12)",
    category: "Institutional",
    unit: "Students",
    am_peak: {
      rate: 0.83,
      equation: null,
      r_squared: null,
      entering: 51,
      exiting: 49
    },
    pm_peak: {
      rate: 0.6,
      equation: {"type": "linear", "a": 0.82, "b": -225.96},
      r_squared: 0.8,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "539": {
    code: "539",
    name: "Charter High School",
    category: "Institutional",
    unit: "Students",
    am_peak: {
      rate: 0.94,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.55,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "540": {
    code: "540",
    name: "Junior/Community College",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.15,
      equation: {"type": "logarithmic", "a": 0.67, "b": 3.27},
      r_squared: 0.7,
      sample_size: 12
    },
    am_peak: {
      rate: 0.11,
      equation: {"type": "logarithmic", "a": 0.52, "b": 2.34},
      r_squared: 0.71,
      entering: 81,
      exiting: 19
    },
    pm_peak: {
      rate: 0.11,
      equation: {"type": "logarithmic", "a": 0.68, "b": 0.81},
      r_squared: 0.75,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition"
  },
  "550": {
    code: "550",
    name: "University/College",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.46,
      equation: {"type": "linear", "a": 1.42, "b": 454.2},
      r_squared: 0.97,
      sample_size: 4
    },
    am_peak: {
      rate: 0.15,
      equation: {"type": "linear", "a": 0.17, "b": -553.48},
      r_squared: 0.87,
      entering: 78,
      exiting: 22
    },
    pm_peak: {
      rate: 0.15,
      equation: {"type": "linear", "a": 0.16, "b": -252.56},
      r_squared: 0.93,
      entering: 32,
      exiting: 68
    },
    source: "ITE 12th Edition"
  },
  "560": {
    code: "560",
    name: "Church",
    category: "Institutional",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 6.78,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 0.37,
      equation: null,
      r_squared: null,
      entering: 62,
      exiting: 38
    },
    pm_peak: {
      rate: 0.43,
      equation: {"type": "linear", "a": 0.37, "b": 2.59},
      r_squared: 0.99,
      entering: 41,
      exiting: 59
    },
    source: "ITE 12th Edition"
  },
  "561": {
    code: "561",
    name: "Synagogue",
    category: "Institutional",
    unit: "Member Families",
    source: "ITE 12th Edition"
  },
  "562": {
    code: "562",
    name: "Mosque",
    category: "Institutional",
    unit: "1000 Sq. Ft. GFA",
    source: "ITE 12th Edition"
  },
  "565": {
    code: "565",
    name: "Day Care Center",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 3.79,
      equation: {"type": "linear", "a": 3.86, "b": -8.02},
      r_squared: 0.76,
      sample_size: 7
    },
    am_peak: {
      rate: 0.79,
      equation: {"type": "linear", "a": 0.65, "b": 8.9},
      r_squared: 0.69,
      entering: 53,
      exiting: 47
    },
    pm_peak: {
      rate: 0.79,
      equation: {"type": "linear", "a": 0.6, "b": 12.86},
      r_squared: 0.57,
      entering: 47,
      exiting: 53
    },
    source: "ITE 12th Edition"
  },
  "566": {
    code: "566",
    name: "Cemetery",
    category: "Institutional",
    unit: "Employees",
    weekday: {
      rate: 51.75,
      equation: {"type": "linear", "a": 84.6, "b": -164.25},
      r_squared: 0.98,
      sample_size: 4
    },
    am_peak: {
      rate: 1.25,
      equation: null,
      r_squared: null,
      entering: 70,
      exiting: 30
    },
    pm_peak: {
      rate: 3.81,
      equation: null,
      r_squared: null,
      entering: 35,
      exiting: 65
    },
    source: "ITE 12th Edition"
  },
  "571": {
    code: "571",
    name: "Adult Detention Facility",
    category: "Institutional",
    unit: "Beds",
    weekday: {
      rate: 0.98,
      equation: {"type": "linear", "a": 0.31, "b": 342.44},
      r_squared: 0.71,
      sample_size: 9
    },
    am_peak: {
      rate: 0.1,
      equation: {"type": "linear", "a": 0.06, "b": 23.01},
      r_squared: 0.6,
      entering: 56,
      exiting: 44
    },
    pm_peak: {
      rate: 0.08,
      equation: {"type": "linear", "a": 0.05, "b": 13.11},
      r_squared: 0.77,
      entering: 14,
      exiting: 86
    },
    source: "ITE 12th Edition"
  },
  "575": {
    code: "575",
    name: "Fire and Rescue Station",
    category: "Institutional",
    unit: "1000 Sq. Ft. GFA",
    pm_peak: {
      rate: 0.48,
      equation: null,
      r_squared: null,
      entering: 29,
      exiting: 71
    },
    source: "ITE 12th Edition"
  },
  "580": {
    code: "580",
    name: "Museum",
    category: "Institutional",
    unit: "1000 Sq. Ft. GFA",
    am_peak: {
      rate: 0.28,
      equation: null,
      r_squared: null,
      entering: 86,
      exiting: 14
    },
    pm_peak: {
      rate: 0.18,
      equation: null,
      r_squared: null,
      entering: 16,
      exiting: 84
    },
    source: "ITE 12th Edition"
  },
  "590": {
    code: "590",
    name: "Library",
    category: "Institutional",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 72.05,
      equation: {"type": "logarithmic", "a": 0.99, "b": 4.28},
      r_squared: 0.97,
      sample_size: 6
    },
    am_peak: {
      rate: 1.08,
      equation: null,
      r_squared: null,
      entering: 71,
      exiting: 29
    },
    pm_peak: {
      rate: 8.56,
      equation: {"type": "linear", "a": 8.9, "b": -5.11},
      r_squared: 0.77,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition"
  },
  "610": {
    code: "610",
    name: "Hospital",
    category: "Medical",
    unit: "Beds",
    weekday: {
      rate: 23.87,
      equation: null,
      r_squared: null,
      sample_size: 3
    },
    am_peak: {
      rate: 1.79,
      equation: null,
      r_squared: null,
      entering: 72,
      exiting: 28
    },
    pm_peak: {
      rate: 1.69,
      equation: null,
      r_squared: null,
      entering: 33,
      exiting: 67
    },
    source: "ITE 12th Edition"
  },
  "620": {
    code: "620",
    name: "Nursing Home",
    category: "Medical",
    unit: "Beds",
    weekday: {
      rate: 3.06,
      equation: null,
      r_squared: null,
      sample_size: 3
    },
    am_peak: {
      rate: 0.17,
      equation: null,
      r_squared: null,
      entering: 72,
      exiting: 28
    },
    pm_peak: {
      rate: 0.22,
      equation: null,
      r_squared: null,
      entering: 33,
      exiting: 67
    },
    source: "ITE 12th Edition"
  },
  "630": {
    code: "630",
    name: "Walk-In Clinic",
    category: "Medical",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 37.6,
      equation: {"type": "linear", "a": 35.86, "b": 34.88},
      r_squared: 0.76,
      sample_size: 9
    },
    am_peak: {
      rate: 2.75,
      equation: {"type": "linear", "a": 2.19, "b": 8.68},
      r_squared: 0.98,
      entering: 81,
      exiting: 19
    },
    pm_peak: {
      rate: 3.67,
      equation: {"type": "linear", "a": 3.53, "b": 2.9},
      r_squared: 0.71,
      entering: 29,
      exiting: 71
    },
    source: "ITE 12th Edition"
  },
  "640": {
    code: "640",
    name: "Animal Hospital/Veterinary Clinic",
    category: "Medical",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 21.5,
      equation: null,
      r_squared: null,
      sample_size: 6
    },
    am_peak: {
      rate: 3.64,
      equation: {"type": "linear", "a": 4.07, "b": -2.48},
      r_squared: 0.74,
      entering: 67,
      exiting: 33
    },
    pm_peak: {
      rate: 3.53,
      equation: {"type": "linear", "a": 4.75, "b": -6.96},
      r_squared: 0.82,
      entering: 40,
      exiting: 60
    },
    source: "ITE 12th Edition"
  },
  "650": {
    code: "650",
    name: "Free-Standing Emergency Room",
    category: "Medical",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 24.94,
      equation: null,
      r_squared: null,
      sample_size: 4
    },
    am_peak: {
      rate: 1.12,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 1.52,
      equation: null,
      r_squared: null,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition"
  },
  "710": {
    code: "710",
    name: "General Office Building",
    category: "Office",
    unit: "",
    source: "ITE 12th Edition"
  },
  "712": {
    code: "712",
    name: "Small Office Building",
    category: "Office",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 14.39,
      equation: null,
      r_squared: null,
      sample_size: 21
    },
    am_peak: {
      rate: 1.64,
      equation: null,
      r_squared: null,
      entering: 83,
      exiting: 17
    },
    pm_peak: {
      rate: 2.16,
      equation: null,
      r_squared: null,
      entering: 34,
      exiting: 66
    },
    source: "ITE 12th Edition"
  },
  "714": {
    code: "714",
    name: "Corporate Headquarters Building",
    category: "Office",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 11.17,
      equation: null,
      r_squared: null,
      sample_size: 3
    },
    am_peak: {
      rate: 1.9,
      equation: {"type": "linear", "a": 1.93, "b": -9.01},
      r_squared: 0.6,
      entering: 95,
      exiting: 5
    },
    pm_peak: {
      rate: 1.6,
      equation: {"type": "linear", "a": 1.71, "b": -30.7},
      r_squared: 0.6,
      entering: 8,
      exiting: 92
    },
    source: "ITE 12th Edition"
  },
  "715": {
    code: "715",
    name: "Single Tenant Office Building",
    category: "Office",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 12.3,
      equation: null,
      r_squared: null,
      sample_size: 3
    },
    am_peak: {
      rate: 2.01,
      equation: {"type": "linear", "a": 2.22, "b": -30.81},
      r_squared: 0.94,
      entering: 89,
      exiting: 11
    },
    pm_peak: {
      rate: 1.8,
      equation: {"type": "linear", "a": 1.99, "b": -28.75},
      r_squared: 0.93,
      entering: 15,
      exiting: 85
    },
    source: "ITE 12th Edition"
  },
  "720": {
    code: "720",
    name: "Medical-Dental Office Building - Stand-Alone",
    category: "Office",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 34.03,
      equation: {"type": "linear", "a": 40.6, "b": -75.15},
      r_squared: 0.95,
      sample_size: 16
    },
    am_peak: {
      rate: 3.21,
      equation: {"type": "logarithmic", "a": 0.9, "b": 1.33},
      r_squared: 0.8,
      entering: 78,
      exiting: 22
    },
    pm_peak: {
      rate: 3.42,
      equation: {"type": "linear", "a": 3.7, "b": -5.75},
      r_squared: 0.76,
      entering: 30,
      exiting: 70
    },
    source: "ITE 12th Edition"
  },
  "730": {
    code: "730",
    name: "Government Office Building",
    category: "Office",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 22.59,
      equation: null,
      r_squared: null,
      sample_size: 7
    },
    am_peak: {
      rate: 3.34,
      equation: null,
      r_squared: null,
      entering: 75,
      exiting: 25
    },
    pm_peak: {
      rate: 1.71,
      equation: {"type": "logarithmic", "a": 0.97, "b": 0.62},
      r_squared: 0.73,
      entering: 25,
      exiting: 75
    },
    source: "ITE 12th Edition"
  },
  "731": {
    code: "731",
    name: "State Motor Vehicles Department",
    category: "Office",
    unit: "Daily Customers",
    weekday: {
      rate: 11.21,
      equation: null,
      r_squared: null,
      sample_size: 1
    },
    am_peak: {
      rate: 0.2,
      equation: null,
      r_squared: null,
      entering: 56,
      exiting: 44
    },
    pm_peak: {
      rate: 0.2,
      equation: null,
      r_squared: null,
      entering: 39,
      exiting: 61
    },
    source: "ITE 12th Edition"
  },
  "732": {
    code: "732",
    name: "United States Post Office",
    category: "Office",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 319.08,
      equation: null,
      r_squared: null,
      sample_size: 2
    },
    am_peak: {
      rate: 22.71,
      equation: {"type": "linear", "a": 19.03, "b": 25.66},
      r_squared: 0.96,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 16.73,
      equation: {"type": "logarithmic", "a": 0.45, "b": 4.5},
      r_squared: 0.63,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition"
  },
  "750": {
    code: "750",
    name: "Office Park",
    category: "Office",
    unit: "1000 Sq. Ft. GFA",
    am_peak: {
      rate: 1.03,
      equation: {"type": "logarithmic", "a": 0.91, "b": 0.67},
      r_squared: 0.89,
      entering: 89,
      exiting: 11
    },
    pm_peak: {
      rate: 1.21,
      equation: {"type": "linear", "a": 1.4, "b": -251.41},
      r_squared: 1,
      entering: 15,
      exiting: 85
    },
    source: "ITE 12th Edition"
  },
  "770": {
    code: "770",
    name: "Business Park",
    category: "Office",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 9.97,
      equation: {"type": "linear", "a": 9.97, "b": 0.84},
      r_squared: 0.99,
      sample_size: 4
    },
    am_peak: {
      rate: 0.93,
      equation: {"type": "linear", "a": 1.04, "b": -29.56},
      r_squared: 0.85,
      entering: 82,
      exiting: 18
    },
    pm_peak: {
      rate: 0.79,
      equation: {"type": "linear", "a": 0.81, "b": -4.84},
      r_squared: 0.88,
      entering: 29,
      exiting: 71
    },
    source: "ITE 12th Edition"
  },
  "810": {
    code: "810",
    name: "Tractor Supply Store",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    pm_peak: {
      rate: 1.4,
      equation: null,
      r_squared: null,
      entering: 47,
      exiting: 53
    },
    source: "ITE 12th Edition"
  },
  "811": {
    code: "811",
    name: "Construction Equipment Rental Store",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    pm_peak: {
      rate: 0.99,
      equation: null,
      r_squared: null,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition"
  },
  "812": {
    code: "812",
    name: "Building Materials and Lumber Store",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 11.7,
      equation: null,
      r_squared: null,
      sample_size: 9
    },
    am_peak: {
      rate: 1.25,
      equation: {"type": "linear", "a": 0.89, "b": 7.07},
      r_squared: 0.54,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 1.59,
      equation: null,
      r_squared: null,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition"
  },
  "813": {
    code: "813",
    name: "Free-Standing Discount Superstore",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 50.52,
      equation: null,
      r_squared: null,
      sample_size: 72
    },
    am_peak: {
      rate: 1.88,
      equation: null,
      r_squared: null,
      entering: 56,
      exiting: 44
    },
    pm_peak: {
      rate: 4.32,
      equation: null,
      r_squared: null,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition"
  },
  "815": {
    code: "815",
    name: "Free-Standing Discount Store",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 53.87,
      equation: {"type": "logarithmic", "a": 0.77, "b": 5.05},
      r_squared: 0.83,
      sample_size: 21
    },
    am_peak: {
      rate: 1.18,
      equation: {"type": "logarithmic", "a": 0.84, "b": 0.74},
      r_squared: 0.64,
      entering: 70,
      exiting: 30
    },
    pm_peak: {
      rate: 4.86,
      equation: {"type": "logarithmic", "a": 0.84, "b": 2.3},
      r_squared: 0.59,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "816": {
    code: "816",
    name: "Hardware/Paint Store",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 8.07,
      equation: null,
      r_squared: null,
      sample_size: 4
    },
    am_peak: {
      rate: 0.92,
      equation: {"type": "linear", "a": 0.75, "b": 1.92},
      r_squared: 0.62,
      entering: 54,
      exiting: 46
    },
    pm_peak: {
      rate: 2.98,
      equation: null,
      r_squared: null,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition"
  },
  "817": {
    code: "817",
    name: "Nursery (Garden Center)",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    pm_peak: {
      rate: 6.58,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "820": {
    code: "820",
    name: "Shopping Center (>150k)",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "822": {
    code: "822",
    name: "Strip Retail Plaza (&lt;40k)",
    category: "Retail",
    unit: "1000 Sq. Ft. GLA",
    weekday: {
      rate: 54.45,
      equation: {"type": "linear", "a": 42.2, "b": 229.68},
      r_squared: 0.96,
      sample_size: 4
    },
    am_peak: {
      rate: 3.93,
      equation: null,
      r_squared: null,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 6.29,
      equation: {"type": "logarithmic", "a": 0.68, "b": 2.77},
      r_squared: 0.54,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition"
  },
  "823": {
    code: "823",
    name: "Factory Outlet Center",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 26.59,
      equation: null,
      r_squared: null,
      sample_size: 11
    },
    am_peak: {
      rate: 0.67,
      equation: null,
      r_squared: null,
      entering: 73,
      exiting: 27
    },
    pm_peak: {
      rate: 2.29,
      equation: {"type": "logarithmic", "a": 0.43, "b": 3.68},
      r_squared: 0.56,
      entering: 47,
      exiting: 53
    },
    source: "ITE 12th Edition"
  },
  "841": {
    code: "841",
    name: "Automobile Sales (Used)",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 27.06,
      equation: null,
      r_squared: null,
      sample_size: 14
    },
    am_peak: {
      rate: 2.13,
      equation: null,
      r_squared: null,
      entering: 76,
      exiting: 24
    },
    pm_peak: {
      rate: 3.75,
      equation: null,
      r_squared: null,
      entering: 47,
      exiting: 53
    },
    source: "ITE 12th Edition"
  },
  "842": {
    code: "842",
    name: "Recreational Vehicle Sales",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 5,
      equation: null,
      r_squared: null,
      sample_size: 5
    },
    am_peak: {
      rate: 0.46,
      equation: null,
      r_squared: null,
      entering: 85,
      exiting: 15
    },
    pm_peak: {
      rate: 0.77,
      equation: null,
      r_squared: null,
      entering: 31,
      exiting: 69
    },
    source: "ITE 12th Edition"
  },
  "848": {
    code: "848",
    name: "Tire Store",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 28.54,
      equation: null,
      r_squared: null,
      sample_size: 12
    },
    am_peak: {
      rate: 2.69,
      equation: null,
      r_squared: null,
      entering: 64,
      exiting: 36
    },
    pm_peak: {
      rate: 3.85,
      equation: null,
      r_squared: null,
      entering: 43,
      exiting: 57
    },
    source: "ITE 12th Edition"
  },
  "849": {
    code: "849",
    name: "Tire Superstore",
    category: "Retail",
    unit: "1000 Sq. Ft. GFA",
    weekday: {
      rate: 20.37,
      equation: null,
      r_squared: null,
      sample_size: 12
    },
    am_peak: {
      rate: 1.34,
      equation: null,
      r_squared: null,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 2.11,
      equation: null,
      r_squared: null,
      entering: 47,
      exiting: 53
    },
    source: "ITE 12th Edition"
  },
  "850": {
    code: "850",
    name: "Supermarket",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "851": {
    code: "851",
    name: "Convenience Store",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "857": {
    code: "857",
    name: "Discount Club",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "858": {
    code: "858",
    name: "Farmers Market",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "860": {
    code: "860",
    name: "Wholesale Market",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "861": {
    code: "861",
    name: "Sporting Goods Superstore",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "862": {
    code: "862",
    name: "Home Improvement Superstore",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "863": {
    code: "863",
    name: "Electronics Superstore",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "864": {
    code: "864",
    name: "Toy/Children's Superstore",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "865": {
    code: "865",
    name: "Baby Superstore",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "866": {
    code: "866",
    name: "Pet Supply Superstore",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "867": {
    code: "867",
    name: "Office Supply Superstore",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "868": {
    code: "868",
    name: "Book Superstore",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "869": {
    code: "869",
    name: "Discount Home Furnishing Superstore",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "872": {
    code: "872",
    name: "Bed and Linen Superstore",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "875": {
    code: "875",
    name: "Department Store",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "876": {
    code: "876",
    name: "Apparel Store",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "879": {
    code: "879",
    name: "Arts and Crafts Store",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "880": {
    code: "880",
    name: "Pharmacy/Drugstore without Drive-Through Window",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "881": {
    code: "881",
    name: "Pharmacy/Drugstore with Drive-Through Window",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "882": {
    code: "882",
    name: "Cannabis Dispensary",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "890": {
    code: "890",
    name: "Furniture/Flooring Store",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "895": {
    code: "895",
    name: "Beverage Container Recycling Depot",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "897": {
    code: "897",
    name: "Medical Equipment Store",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "899": {
    code: "899",
    name: "Liquor Store",
    category: "Retail",
    unit: "",
    source: "ITE 12th Edition"
  },
  "911": {
    code: "911",
    name: "Walk-in Bank",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "912": {
    code: "912",
    name: "Drive-in Bank",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "918": {
    code: "918",
    name: "Hair Salon/Spa",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "920": {
    code: "920",
    name: "Copy, Print, and Express Ship Store",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "926": {
    code: "926",
    name: "Food Cart Pod",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "929": {
    code: "929",
    name: "High-Volume Fast-Food Restaurant",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "930": {
    code: "930",
    name: "Fast Casual Restaurant",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "931": {
    code: "931",
    name: "Fine Dining Restaurant",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "932": {
    code: "932",
    name: "High-Turnover (Sit-Down) Restaurant",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "933": {
    code: "933",
    name: "Fast-Food Restaurant without Drive-Through Window",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "934": {
    code: "934",
    name: "Fast-Food Restaurant with Drive-Through Window",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "935": {
    code: "935",
    name: "Fast-Food Restaurant with Drive-Through Window and No Indoor Seating",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "936": {
    code: "936",
    name: "Coffee/Donut Shop without Drive-Through Window",
    category: "Services",
    unit: "",
    source: "ITE 12th Edition"
  },
  "937": {
    code: "937",
    name: "Coffee/Donut Shop with Drive-Through Window",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "938": {
    code: "938",
    name: "Coffee/Donut Shop with Drive-Through Window and No Indoor Seating",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "941": {
    code: "941",
    name: "Quick Lubrication Vehicle Shop",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "942": {
    code: "942",
    name: "Automobile Care Center",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "943": {
    code: "943",
    name: "Automobile Parts and Service Center",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "944": {
    code: "944",
    name: "Gasoline/Service Station",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "945": {
    code: "945",
    name: "Convenience Store/Gas Station",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "947": {
    code: "947",
    name: "Self-Service Car Wash",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "948": {
    code: "948",
    name: "Automated Car Wash",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "949": {
    code: "949",
    name: "Car Wash and Detail Center",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "955": {
    code: "955",
    name: "Travel Center",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "960": {
    code: "960",
    name: "Rental Car Facility",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "970": {
    code: "970",
    name: "Wine Tasting Room",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "971": {
    code: "971",
    name: "Brewery Taproom",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
  "975": {
    code: "975",
    name: "Drinking Place",
    category: "Unknown",
    unit: "",
    source: "ITE 12th Edition"
  },
};
