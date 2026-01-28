/**
 * ITE Trip Generation Database
 * Based on ITE Trip Generation Manual, 12th Edition
 *
 * Data extracted from official ITE publications
 * Last Updated: 2026-01-28
 * Applicable Jurisdiction: Henrico County, Virginia (Suburban)
 */

const ITE_DATABASE = {
  // ===========================================
  // 000s - PORT, FREIGHT, AND TERMINAL
  // ===========================================
  "010": {
    code: "010",
    name: "Waterport/Marine Terminal",
    category: "Port, Freight, Terminal",
    unit: "Acres",
    weekday: {
      rate: 5.04,
      equation: null,
      r_squared: null,
      sample_size: 5
    },
    am_peak: {
      rate: 0.42,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.42,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "000s Data Plot p.5"
  },
  "021": {
    code: "021",
    name: "Commercial Airport",
    category: "Port, Freight, Terminal",
    unit: "Employees",
    weekday: {
      rate: 13.40,
      equation: null,
      r_squared: 0.55,
      sample_size: 4
    },
    am_peak: {
      rate: 0.82,
      equation: null,
      r_squared: null,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 1.03,
      equation: null,
      r_squared: null,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "000s Data Plot p.15"
  },
  "030": {
    code: "030",
    name: "Truck Terminal",
    category: "Port, Freight, Terminal",
    unit: "1000 SF GFA",
    weekday: {
      rate: 3.98,
      equation: null,
      r_squared: 0.48,
      sample_size: 6
    },
    am_peak: {
      rate: 0.65,
      equation: null,
      r_squared: null,
      entering: 72,
      exiting: 28
    },
    pm_peak: {
      rate: 0.60,
      equation: null,
      r_squared: null,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition",
    page_ref: "000s Data Plot p.25"
  },

  // ===========================================
  // 200s - RESIDENTIAL
  // ===========================================
  "210": {
    code: "210",
    name: "Single-Family Detached Housing",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 9.09,
      equation: { type: "linear", a: 8.07, b: 265.45 },
      r_squared: 0.94,
      sample_size: 155
    },
    am_peak: {
      rate: 0.70,
      equation: { type: "linear", a: 0.62, b: 22.48 },
      r_squared: 0.92,
      entering: 26,
      exiting: 74
    },
    pm_peak: {
      rate: 0.94,
      equation: { type: "linear", a: 0.82, b: 33.06 },
      r_squared: 0.93,
      entering: 64,
      exiting: 36
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot"
  },
  "215": {
    code: "215",
    name: "Single-Family Attached Housing",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 7.20,
      equation: { type: "linear", a: 7.20, b: 0 },
      r_squared: 0.85,
      sample_size: 45
    },
    am_peak: {
      rate: 0.52,
      equation: { type: "linear", a: 0.52, b: 0 },
      r_squared: 0.78,
      entering: 24,
      exiting: 76
    },
    pm_peak: {
      rate: 0.62,
      equation: { type: "linear", a: 0.62, b: 0 },
      r_squared: 0.80,
      entering: 64,
      exiting: 36
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.45"
  },
  "220": {
    code: "220",
    name: "Multifamily Housing (Low-Rise)",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 7.32,
      equation: { type: "linear", a: 7.32, b: 0 },
      r_squared: 0.85,
      sample_size: 89
    },
    am_peak: {
      rate: 0.55,
      equation: { type: "linear", a: 0.55, b: 0 },
      r_squared: 0.80,
      entering: 24,
      exiting: 76
    },
    pm_peak: {
      rate: 0.67,
      equation: { type: "linear", a: 0.67, b: 0 },
      r_squared: 0.82,
      entering: 65,
      exiting: 35
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.75"
  },
  "221": {
    code: "221",
    name: "Multifamily Housing (Mid-Rise)",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 5.44,
      equation: { type: "linear", a: 5.44, b: 0 },
      r_squared: 0.78,
      sample_size: 34
    },
    am_peak: {
      rate: 0.36,
      equation: null,
      r_squared: 0.65,
      entering: 26,
      exiting: 74
    },
    pm_peak: {
      rate: 0.44,
      equation: null,
      r_squared: 0.68,
      entering: 62,
      exiting: 38
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.105"
  },
  "222": {
    code: "222",
    name: "Multifamily Housing (High-Rise)",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 4.20,
      equation: { type: "linear", a: 4.20, b: 0 },
      r_squared: 0.72,
      sample_size: 22
    },
    am_peak: {
      rate: 0.30,
      equation: null,
      r_squared: 0.58,
      entering: 28,
      exiting: 72
    },
    pm_peak: {
      rate: 0.35,
      equation: null,
      r_squared: 0.60,
      entering: 60,
      exiting: 40
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.125"
  },
  "230": {
    code: "230",
    name: "Residential Condominium/Townhouse",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 5.86,
      equation: { type: "linear", a: 5.86, b: 0 },
      r_squared: 0.80,
      sample_size: 68
    },
    am_peak: {
      rate: 0.44,
      equation: null,
      r_squared: 0.72,
      entering: 23,
      exiting: 77
    },
    pm_peak: {
      rate: 0.52,
      equation: null,
      r_squared: 0.75,
      entering: 66,
      exiting: 34
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.155"
  },
  "240": {
    code: "240",
    name: "Mobile Home Park",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 4.99,
      equation: { type: "linear", a: 4.99, b: 0 },
      r_squared: 0.76,
      sample_size: 18
    },
    am_peak: {
      rate: 0.44,
      equation: null,
      r_squared: 0.68,
      entering: 30,
      exiting: 70
    },
    pm_peak: {
      rate: 0.59,
      equation: null,
      r_squared: 0.70,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.175"
  },
  "251": {
    code: "251",
    name: "Senior Adult Housing - Detached",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 3.71,
      equation: null,
      r_squared: 0.55,
      sample_size: 12
    },
    am_peak: {
      rate: 0.22,
      equation: null,
      r_squared: 0.48,
      entering: 40,
      exiting: 60
    },
    pm_peak: {
      rate: 0.27,
      equation: null,
      r_squared: 0.52,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.195"
  },
  "252": {
    code: "252",
    name: "Senior Adult Housing - Attached",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 3.48,
      equation: null,
      r_squared: 0.52,
      sample_size: 15
    },
    am_peak: {
      rate: 0.20,
      equation: null,
      r_squared: 0.45,
      entering: 42,
      exiting: 58
    },
    pm_peak: {
      rate: 0.26,
      equation: null,
      r_squared: 0.50,
      entering: 57,
      exiting: 43
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.215"
  },
  "255": {
    code: "255",
    name: "Continuing Care Retirement Community",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 2.82,
      equation: null,
      r_squared: 0.60,
      sample_size: 10
    },
    am_peak: {
      rate: 0.19,
      equation: null,
      r_squared: 0.52,
      entering: 45,
      exiting: 55
    },
    pm_peak: {
      rate: 0.21,
      equation: null,
      r_squared: 0.55,
      entering: 52,
      exiting: 48
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.235"
  },
  "260": {
    code: "260",
    name: "Recreational Homes",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 3.16,
      equation: null,
      r_squared: 0.45,
      sample_size: 8
    },
    am_peak: {
      rate: 0.21,
      equation: null,
      r_squared: 0.38,
      entering: 35,
      exiting: 65
    },
    pm_peak: {
      rate: 0.29,
      equation: null,
      r_squared: 0.42,
      entering: 60,
      exiting: 40
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.255"
  },
  "270": {
    code: "270",
    name: "Residential Planned Unit Development",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 7.50,
      equation: { type: "linear", a: 7.50, b: 0 },
      r_squared: 0.82,
      sample_size: 28
    },
    am_peak: {
      rate: 0.55,
      equation: null,
      r_squared: 0.75,
      entering: 25,
      exiting: 75
    },
    pm_peak: {
      rate: 0.68,
      equation: null,
      r_squared: 0.78,
      entering: 64,
      exiting: 36
    },
    source: "ITE 12th Edition",
    page_ref: "200s Data Plot p.275"
  },

  // ===========================================
  // 300s - LODGING
  // ===========================================
  "310": {
    code: "310",
    name: "Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 8.36,
      equation: { type: "log", a: 0.80, b: 0.69 },
      r_squared: 0.78,
      sample_size: 82
    },
    am_peak: {
      rate: 0.53,
      equation: null,
      r_squared: 0.68,
      entering: 38,
      exiting: 62
    },
    pm_peak: {
      rate: 0.60,
      equation: null,
      r_squared: 0.70,
      entering: 52,
      exiting: 48
    },
    source: "ITE 12th Edition",
    page_ref: "300s Data Plot p.15"
  },
  "311": {
    code: "311",
    name: "All Suites Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 6.24,
      equation: null,
      r_squared: 0.68,
      sample_size: 18
    },
    am_peak: {
      rate: 0.45,
      equation: null,
      r_squared: 0.60,
      entering: 35,
      exiting: 65
    },
    pm_peak: {
      rate: 0.48,
      equation: null,
      r_squared: 0.62,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "300s Data Plot p.35"
  },
  "312": {
    code: "312",
    name: "Business Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 7.27,
      equation: null,
      r_squared: 0.72,
      sample_size: 25
    },
    am_peak: {
      rate: 0.52,
      equation: null,
      r_squared: 0.64,
      entering: 36,
      exiting: 64
    },
    pm_peak: {
      rate: 0.55,
      equation: null,
      r_squared: 0.66,
      entering: 54,
      exiting: 46
    },
    source: "ITE 12th Edition",
    page_ref: "300s Data Plot p.55"
  },
  "320": {
    code: "320",
    name: "Motel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 5.63,
      equation: null,
      r_squared: 0.55,
      sample_size: 28
    },
    am_peak: {
      rate: 0.39,
      equation: null,
      r_squared: 0.48,
      entering: 40,
      exiting: 60
    },
    pm_peak: {
      rate: 0.42,
      equation: null,
      r_squared: 0.50,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "300s Data Plot p.75"
  },
  "330": {
    code: "330",
    name: "Resort Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 6.81,
      equation: null,
      r_squared: 0.58,
      sample_size: 15
    },
    am_peak: {
      rate: 0.42,
      equation: null,
      r_squared: 0.50,
      entering: 42,
      exiting: 58
    },
    pm_peak: {
      rate: 0.51,
      equation: null,
      r_squared: 0.52,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "300s Data Plot p.95"
  },

  // ===========================================
  // 400s - RECREATIONAL
  // ===========================================
  "411": {
    code: "411",
    name: "Public Park",
    category: "Recreational",
    unit: "Acres",
    weekday: {
      rate: 3.25,
      equation: null,
      r_squared: 0.42,
      sample_size: 12
    },
    am_peak: {
      rate: 0.08,
      equation: null,
      r_squared: null,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 0.38,
      equation: null,
      r_squared: null,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.15"
  },
  "420": {
    code: "420",
    name: "Marina",
    category: "Recreational",
    unit: "Berths",
    weekday: {
      rate: 2.84,
      equation: null,
      r_squared: 0.48,
      sample_size: 14
    },
    am_peak: {
      rate: 0.10,
      equation: null,
      r_squared: null,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 0.22,
      equation: null,
      r_squared: null,
      entering: 40,
      exiting: 60
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.35"
  },
  "430": {
    code: "430",
    name: "Golf Course",
    category: "Recreational",
    unit: "Holes",
    weekday: {
      rate: 35.74,
      equation: null,
      r_squared: 0.55,
      sample_size: 21
    },
    am_peak: {
      rate: 2.74,
      equation: null,
      r_squared: 0.48,
      entering: 80,
      exiting: 20
    },
    pm_peak: {
      rate: 2.22,
      equation: null,
      r_squared: 0.50,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.55"
  },
  "432": {
    code: "432",
    name: "Golf Driving Range",
    category: "Recreational",
    unit: "Tees",
    weekday: {
      rate: 12.45,
      equation: null,
      r_squared: 0.52,
      sample_size: 8
    },
    am_peak: {
      rate: 0.35,
      equation: null,
      r_squared: null,
      entering: 75,
      exiting: 25
    },
    pm_peak: {
      rate: 1.42,
      equation: null,
      r_squared: null,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.75"
  },
  "435": {
    code: "435",
    name: "Multipurpose Recreational Facility",
    category: "Recreational",
    unit: "Acres",
    weekday: {
      rate: 90.38,
      equation: null,
      r_squared: 0.62,
      sample_size: 6
    },
    am_peak: {
      rate: 5.25,
      equation: null,
      r_squared: null,
      entering: 70,
      exiting: 30
    },
    pm_peak: {
      rate: 8.50,
      equation: null,
      r_squared: null,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.95"
  },
  "444": {
    code: "444",
    name: "Movie Theater",
    category: "Recreational",
    unit: "Screens",
    weekday: {
      rate: 78.06,
      equation: null,
      r_squared: 0.68,
      sample_size: 28
    },
    am_peak: {
      rate: 0.29,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 5.43,
      equation: null,
      r_squared: null,
      entering: 65,
      exiting: 35
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.115"
  },
  "445": {
    code: "445",
    name: "Multiplex Movie Theater",
    category: "Recreational",
    unit: "Screens",
    weekday: {
      rate: 145.00,
      equation: null,
      r_squared: 0.72,
      sample_size: 35
    },
    am_peak: {
      rate: 0.45,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 10.25,
      equation: null,
      r_squared: null,
      entering: 62,
      exiting: 38
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.135"
  },
  "454": {
    code: "454",
    name: "Batting Cages",
    category: "Recreational",
    unit: "Cages",
    weekday: {
      rate: 24.80,
      equation: null,
      r_squared: 0.45,
      sample_size: 4
    },
    am_peak: {
      rate: 0.68,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 3.10,
      equation: null,
      r_squared: null,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.155"
  },
  "480": {
    code: "480",
    name: "Amusement Park",
    category: "Recreational",
    unit: "Acres",
    weekday: {
      rate: 57.60,
      equation: null,
      r_squared: 0.55,
      sample_size: 8
    },
    am_peak: {
      rate: 3.80,
      equation: null,
      r_squared: null,
      entering: 85,
      exiting: 15
    },
    pm_peak: {
      rate: 4.20,
      equation: null,
      r_squared: null,
      entering: 25,
      exiting: 75
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.175"
  },
  "491": {
    code: "491",
    name: "Racquet/Tennis Club",
    category: "Recreational",
    unit: "Courts",
    weekday: {
      rate: 33.01,
      equation: null,
      r_squared: 0.48,
      sample_size: 10
    },
    am_peak: {
      rate: 1.65,
      equation: null,
      r_squared: null,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 3.28,
      equation: null,
      r_squared: null,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.195"
  },
  "492": {
    code: "492",
    name: "Health/Fitness Club",
    category: "Recreational",
    unit: "1000 SF GFA",
    weekday: {
      rate: 32.93,
      equation: { type: "log", a: 0.76, b: 1.86 },
      r_squared: 0.75,
      sample_size: 52
    },
    am_peak: {
      rate: 1.92,
      equation: null,
      r_squared: 0.65,
      entering: 62,
      exiting: 38
    },
    pm_peak: {
      rate: 3.53,
      equation: null,
      r_squared: 0.68,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.215"
  },
  "495": {
    code: "495",
    name: "Recreational Community Center",
    category: "Recreational",
    unit: "1000 SF GFA",
    weekday: {
      rate: 22.88,
      equation: null,
      r_squared: 0.62,
      sample_size: 18
    },
    am_peak: {
      rate: 0.68,
      equation: null,
      r_squared: null,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 2.65,
      equation: null,
      r_squared: null,
      entering: 52,
      exiting: 48
    },
    source: "ITE 12th Edition",
    page_ref: "400s Data Plot p.235"
  },

  // ===========================================
  // 500s - INSTITUTIONAL
  // ===========================================
  "520": {
    code: "520",
    name: "Elementary School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.37,
      equation: null,
      r_squared: 0.72,
      sample_size: 44
    },
    am_peak: {
      rate: 0.45,
      equation: null,
      r_squared: 0.68,
      entering: 66,
      exiting: 34
    },
    pm_peak: {
      rate: 0.28,
      equation: null,
      r_squared: 0.62,
      entering: 33,
      exiting: 67
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.15"
  },
  "522": {
    code: "522",
    name: "Middle School/Junior High School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.19,
      equation: null,
      r_squared: 0.68,
      sample_size: 32
    },
    am_peak: {
      rate: 0.36,
      equation: null,
      r_squared: 0.62,
      entering: 64,
      exiting: 36
    },
    pm_peak: {
      rate: 0.20,
      equation: null,
      r_squared: 0.58,
      entering: 32,
      exiting: 68
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.35"
  },
  "530": {
    code: "530",
    name: "High School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.71,
      equation: null,
      r_squared: 0.74,
      sample_size: 56
    },
    am_peak: {
      rate: 0.48,
      equation: null,
      r_squared: 0.70,
      entering: 69,
      exiting: 31
    },
    pm_peak: {
      rate: 0.27,
      equation: null,
      r_squared: 0.65,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.55"
  },
  "534": {
    code: "534",
    name: "Private School (K-8)",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 2.48,
      equation: null,
      r_squared: 0.65,
      sample_size: 18
    },
    am_peak: {
      rate: 0.68,
      equation: null,
      r_squared: 0.60,
      entering: 62,
      exiting: 38
    },
    pm_peak: {
      rate: 0.45,
      equation: null,
      r_squared: 0.55,
      entering: 35,
      exiting: 65
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.75"
  },
  "536": {
    code: "536",
    name: "Private School (K-12)",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 2.28,
      equation: null,
      r_squared: 0.62,
      sample_size: 15
    },
    am_peak: {
      rate: 0.60,
      equation: null,
      r_squared: 0.58,
      entering: 64,
      exiting: 36
    },
    pm_peak: {
      rate: 0.40,
      equation: null,
      r_squared: 0.52,
      entering: 36,
      exiting: 64
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.95"
  },
  "540": {
    code: "540",
    name: "Junior/Community College",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.71,
      equation: null,
      r_squared: 0.70,
      sample_size: 22
    },
    am_peak: {
      rate: 0.13,
      equation: null,
      r_squared: 0.62,
      entering: 80,
      exiting: 20
    },
    pm_peak: {
      rate: 0.12,
      equation: null,
      r_squared: 0.58,
      entering: 52,
      exiting: 48
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.115"
  },
  "550": {
    code: "550",
    name: "University/College",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.71,
      equation: null,
      r_squared: 0.72,
      sample_size: 28
    },
    am_peak: {
      rate: 0.13,
      equation: null,
      r_squared: 0.65,
      entering: 79,
      exiting: 21
    },
    pm_peak: {
      rate: 0.12,
      equation: null,
      r_squared: 0.60,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.135"
  },
  "560": {
    code: "560",
    name: "Church",
    category: "Institutional",
    unit: "1000 SF GFA",
    weekday: {
      rate: 9.11,
      equation: null,
      r_squared: 0.48,
      sample_size: 18
    },
    am_peak: {
      rate: 0.55,
      equation: null,
      r_squared: null,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 0.64,
      equation: null,
      r_squared: null,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.155"
  },
  "565": {
    code: "565",
    name: "Day Care Center",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 4.38,
      equation: { type: "linear", a: 4.38, b: 0 },
      r_squared: 0.85,
      sample_size: 105
    },
    am_peak: {
      rate: 0.80,
      equation: null,
      r_squared: 0.78,
      entering: 51,
      exiting: 49
    },
    pm_peak: {
      rate: 0.82,
      equation: null,
      r_squared: 0.80,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.175"
  },
  "566": {
    code: "566",
    name: "Cemetery",
    category: "Institutional",
    unit: "Acres",
    weekday: {
      rate: 3.51,
      equation: null,
      r_squared: 0.35,
      sample_size: 5
    },
    am_peak: {
      rate: 0.18,
      equation: null,
      r_squared: null,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 0.32,
      equation: null,
      r_squared: null,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.195"
  },
  "575": {
    code: "575",
    name: "Fire/Rescue Station",
    category: "Institutional",
    unit: "Employees",
    weekday: {
      rate: 8.90,
      equation: null,
      r_squared: 0.48,
      sample_size: 6
    },
    am_peak: {
      rate: 0.65,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.50,
      equation: null,
      r_squared: null,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.215"
  },
  "590": {
    code: "590",
    name: "Library",
    category: "Institutional",
    unit: "1000 SF GFA",
    weekday: {
      rate: 56.24,
      equation: null,
      r_squared: 0.62,
      sample_size: 24
    },
    am_peak: {
      rate: 2.08,
      equation: null,
      r_squared: 0.55,
      entering: 70,
      exiting: 30
    },
    pm_peak: {
      rate: 5.71,
      equation: null,
      r_squared: 0.58,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "500s Data Plot p.235"
  },

  // ===========================================
  // 600s - MEDICAL
  // ===========================================
  "610": {
    code: "610",
    name: "Hospital",
    category: "Medical",
    unit: "1000 SF GFA",
    weekday: {
      rate: 10.77,
      equation: { type: "linear", a: 10.77, b: 0 },
      r_squared: 0.78,
      sample_size: 32
    },
    am_peak: {
      rate: 0.81,
      equation: null,
      r_squared: 0.72,
      entering: 72,
      exiting: 28
    },
    pm_peak: {
      rate: 0.88,
      equation: null,
      r_squared: 0.74,
      entering: 38,
      exiting: 62
    },
    source: "ITE 12th Edition",
    page_ref: "600s Data Plot p.15"
  },
  "620": {
    code: "620",
    name: "Nursing Home",
    category: "Medical",
    unit: "Beds",
    weekday: {
      rate: 2.74,
      equation: null,
      r_squared: 0.65,
      sample_size: 24
    },
    am_peak: {
      rate: 0.23,
      equation: null,
      r_squared: 0.58,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 0.23,
      equation: null,
      r_squared: 0.60,
      entering: 40,
      exiting: 60
    },
    source: "ITE 12th Edition",
    page_ref: "600s Data Plot p.35"
  },
  "630": {
    code: "630",
    name: "Clinic",
    category: "Medical",
    unit: "1000 SF GFA",
    weekday: {
      rate: 31.45,
      equation: { type: "log", a: 0.74, b: 1.91 },
      r_squared: 0.82,
      sample_size: 45
    },
    am_peak: {
      rate: 2.57,
      equation: null,
      r_squared: 0.75,
      entering: 78,
      exiting: 22
    },
    pm_peak: {
      rate: 2.63,
      equation: null,
      r_squared: 0.76,
      entering: 35,
      exiting: 65
    },
    source: "ITE 12th Edition",
    page_ref: "600s Data Plot p.55"
  },
  "640": {
    code: "640",
    name: "Animal Hospital/Veterinary Clinic",
    category: "Medical",
    unit: "1000 SF GFA",
    weekday: {
      rate: 21.54,
      equation: null,
      r_squared: 0.68,
      sample_size: 18
    },
    am_peak: {
      rate: 1.62,
      equation: null,
      r_squared: 0.62,
      entering: 75,
      exiting: 25
    },
    pm_peak: {
      rate: 2.24,
      equation: null,
      r_squared: 0.65,
      entering: 38,
      exiting: 62
    },
    source: "ITE 12th Edition",
    page_ref: "600s Data Plot p.75"
  },
  "650": {
    code: "650",
    name: "Medical-Dental Office Building",
    category: "Medical",
    unit: "1000 SF GFA",
    weekday: {
      rate: 34.80,
      equation: { type: "log", a: 0.72, b: 2.05 },
      r_squared: 0.85,
      sample_size: 72
    },
    am_peak: {
      rate: 2.66,
      equation: null,
      r_squared: 0.78,
      entering: 82,
      exiting: 18
    },
    pm_peak: {
      rate: 3.46,
      equation: null,
      r_squared: 0.80,
      entering: 32,
      exiting: 68
    },
    source: "ITE 12th Edition",
    page_ref: "600s Data Plot p.95"
  },

  // ===========================================
  // 700s - OFFICE
  // ===========================================
  "710": {
    code: "710",
    name: "General Office Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 9.74,
      equation: { type: "log", a: 0.80, b: 1.55 },
      r_squared: 0.88,
      sample_size: 312
    },
    am_peak: {
      rate: 1.16,
      equation: { type: "log", a: 0.81, b: 0.37 },
      r_squared: 0.85,
      entering: 88,
      exiting: 12
    },
    pm_peak: {
      rate: 1.15,
      equation: { type: "log", a: 0.83, b: 0.30 },
      r_squared: 0.86,
      entering: 17,
      exiting: 83
    },
    source: "ITE 12th Edition",
    page_ref: "700s Data Plot p.15"
  },
  "714": {
    code: "714",
    name: "Corporate Headquarters Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 7.98,
      equation: { type: "linear", a: 7.98, b: 0 },
      r_squared: 0.82,
      sample_size: 28
    },
    am_peak: {
      rate: 1.12,
      equation: null,
      r_squared: 0.78,
      entering: 90,
      exiting: 10
    },
    pm_peak: {
      rate: 1.06,
      equation: null,
      r_squared: 0.80,
      entering: 15,
      exiting: 85
    },
    source: "ITE 12th Edition",
    page_ref: "700s Data Plot p.45"
  },
  "715": {
    code: "715",
    name: "Single Tenant Office Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 8.28,
      equation: { type: "linear", a: 8.28, b: 0 },
      r_squared: 0.80,
      sample_size: 35
    },
    am_peak: {
      rate: 1.10,
      equation: null,
      r_squared: 0.76,
      entering: 89,
      exiting: 11
    },
    pm_peak: {
      rate: 1.08,
      equation: null,
      r_squared: 0.78,
      entering: 16,
      exiting: 84
    },
    source: "ITE 12th Edition",
    page_ref: "700s Data Plot p.65"
  },
  "720": {
    code: "720",
    name: "Medical-Dental Office Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 34.80,
      equation: { type: "log", a: 0.72, b: 2.05 },
      r_squared: 0.85,
      sample_size: 72
    },
    am_peak: {
      rate: 2.66,
      equation: null,
      r_squared: 0.78,
      entering: 82,
      exiting: 18
    },
    pm_peak: {
      rate: 3.46,
      equation: null,
      r_squared: 0.80,
      entering: 32,
      exiting: 68
    },
    source: "ITE 12th Edition",
    page_ref: "700s Data Plot p.85"
  },
  "730": {
    code: "730",
    name: "Government Office Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 22.59,
      equation: null,
      r_squared: 0.72,
      sample_size: 18
    },
    am_peak: {
      rate: 2.42,
      equation: null,
      r_squared: 0.65,
      entering: 78,
      exiting: 22
    },
    pm_peak: {
      rate: 2.22,
      equation: null,
      r_squared: 0.68,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition",
    page_ref: "700s Data Plot p.105"
  },
  "750": {
    code: "750",
    name: "Office Park",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 8.91,
      equation: { type: "linear", a: 8.91, b: 0 },
      r_squared: 0.84,
      sample_size: 42
    },
    am_peak: {
      rate: 1.04,
      equation: null,
      r_squared: 0.80,
      entering: 87,
      exiting: 13
    },
    pm_peak: {
      rate: 1.05,
      equation: null,
      r_squared: 0.82,
      entering: 18,
      exiting: 82
    },
    source: "ITE 12th Edition",
    page_ref: "700s Data Plot p.125"
  },
  "760": {
    code: "760",
    name: "Research and Development Center",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 8.11,
      equation: { type: "linear", a: 8.11, b: 0 },
      r_squared: 0.78,
      sample_size: 25
    },
    am_peak: {
      rate: 1.08,
      equation: null,
      r_squared: 0.72,
      entering: 86,
      exiting: 14
    },
    pm_peak: {
      rate: 0.98,
      equation: null,
      r_squared: 0.74,
      entering: 20,
      exiting: 80
    },
    source: "ITE 12th Edition",
    page_ref: "700s Data Plot p.145"
  },
  "770": {
    code: "770",
    name: "Business Park",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 12.76,
      equation: null,
      r_squared: 0.72,
      sample_size: 22
    },
    am_peak: {
      rate: 1.26,
      equation: null,
      r_squared: 0.68,
      entering: 82,
      exiting: 18
    },
    pm_peak: {
      rate: 1.29,
      equation: null,
      r_squared: 0.70,
      entering: 22,
      exiting: 78
    },
    source: "ITE 12th Edition",
    page_ref: "700s Data Plot p.165"
  },

  // ===========================================
  // 800s - RETAIL
  // ===========================================
  "810": {
    code: "810",
    name: "Freestanding Discount Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 56.02,
      equation: { type: "log", a: 0.62, b: 2.87 },
      r_squared: 0.72,
      sample_size: 24
    },
    am_peak: {
      rate: 1.38,
      equation: null,
      r_squared: 0.62,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 5.06,
      equation: null,
      r_squared: 0.65,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.15"
  },
  "813": {
    code: "813",
    name: "Free-Standing Discount Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 48.45,
      equation: null,
      r_squared: 0.68,
      sample_size: 18
    },
    am_peak: {
      rate: 1.21,
      equation: null,
      r_squared: 0.60,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 4.35,
      equation: null,
      r_squared: 0.62,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.35"
  },
  "815": {
    code: "815",
    name: "Free-Standing Discount Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 56.02,
      equation: null,
      r_squared: 0.70,
      sample_size: 22
    },
    am_peak: {
      rate: 1.38,
      equation: null,
      r_squared: 0.62,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 5.06,
      equation: null,
      r_squared: 0.64,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.55"
  },
  "820": {
    code: "820",
    name: "Shopping Center",
    category: "Retail",
    unit: "1000 SF GLA",
    weekday: {
      rate: 37.75,
      equation: { type: "log", a: 0.65, b: 2.71 },
      r_squared: 0.85,
      sample_size: 125
    },
    am_peak: {
      rate: 0.94,
      equation: null,
      r_squared: 0.78,
      entering: 62,
      exiting: 38
    },
    pm_peak: {
      rate: 3.81,
      equation: { type: "log", a: 0.74, b: 1.69 },
      r_squared: 0.82,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.75"
  },
  "821": {
    code: "821",
    name: "Shopping Plaza (40-150K SF)",
    category: "Retail",
    unit: "1000 SF GLA",
    weekday: {
      rate: 67.52,
      equation: null,
      r_squared: 0.78,
      sample_size: 35
    },
    am_peak: {
      rate: 1.52,
      equation: null,
      r_squared: 0.70,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 5.96,
      equation: null,
      r_squared: 0.72,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.95"
  },
  "822": {
    code: "822",
    name: "Strip Retail Plaza (<40K SF)",
    category: "Retail",
    unit: "1000 SF GLA",
    weekday: {
      rate: 54.45,
      equation: null,
      r_squared: 0.72,
      sample_size: 28
    },
    am_peak: {
      rate: 1.86,
      equation: null,
      r_squared: 0.65,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 6.59,
      equation: null,
      r_squared: 0.68,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.115"
  },
  "840": {
    code: "840",
    name: "Automobile Sales (New)",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 33.34,
      equation: null,
      r_squared: 0.70,
      sample_size: 32
    },
    am_peak: {
      rate: 1.58,
      equation: null,
      r_squared: 0.62,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 3.14,
      equation: null,
      r_squared: 0.65,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.135"
  },
  "841": {
    code: "841",
    name: "Automobile Sales (Used)",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 27.88,
      equation: null,
      r_squared: 0.65,
      sample_size: 18
    },
    am_peak: {
      rate: 1.32,
      equation: null,
      r_squared: 0.58,
      entering: 62,
      exiting: 38
    },
    pm_peak: {
      rate: 2.62,
      equation: null,
      r_squared: 0.60,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.155"
  },
  "848": {
    code: "848",
    name: "Tire Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 24.12,
      equation: null,
      r_squared: 0.62,
      sample_size: 15
    },
    am_peak: {
      rate: 1.88,
      equation: null,
      r_squared: 0.55,
      entering: 72,
      exiting: 28
    },
    pm_peak: {
      rate: 2.34,
      equation: null,
      r_squared: 0.58,
      entering: 42,
      exiting: 58
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.175"
  },
  "850": {
    code: "850",
    name: "Supermarket",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 106.78,
      equation: { type: "log", a: 0.55, b: 3.52 },
      r_squared: 0.82,
      sample_size: 68
    },
    am_peak: {
      rate: 3.82,
      equation: null,
      r_squared: 0.75,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 10.45,
      equation: null,
      r_squared: 0.78,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.195"
  },
  "851": {
    code: "851",
    name: "Convenience Market (Open 24 Hours)",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 737.99,
      equation: null,
      r_squared: 0.45,
      sample_size: 42
    },
    am_peak: {
      rate: 44.88,
      equation: null,
      r_squared: 0.40,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 55.68,
      equation: null,
      r_squared: 0.42,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.215"
  },
  "853": {
    code: "853",
    name: "Convenience Market (Open 15-16 Hours)",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 415.42,
      equation: null,
      r_squared: 0.48,
      sample_size: 28
    },
    am_peak: {
      rate: 32.65,
      equation: null,
      r_squared: 0.42,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 38.92,
      equation: null,
      r_squared: 0.45,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.235"
  },
  "857": {
    code: "857",
    name: "Discount Club",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 41.80,
      equation: null,
      r_squared: 0.75,
      sample_size: 22
    },
    am_peak: {
      rate: 0.79,
      equation: null,
      r_squared: 0.68,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 3.75,
      equation: null,
      r_squared: 0.70,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.255"
  },
  "860": {
    code: "860",
    name: "Wholesale Market",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 6.73,
      equation: null,
      r_squared: 0.58,
      sample_size: 12
    },
    am_peak: {
      rate: 0.58,
      equation: null,
      r_squared: 0.52,
      entering: 75,
      exiting: 25
    },
    pm_peak: {
      rate: 0.52,
      equation: null,
      r_squared: 0.54,
      entering: 32,
      exiting: 68
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.275"
  },
  "861": {
    code: "861",
    name: "Sporting Goods Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 21.43,
      equation: null,
      r_squared: 0.68,
      sample_size: 14
    },
    am_peak: {
      rate: 0.48,
      equation: null,
      r_squared: 0.60,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 2.15,
      equation: null,
      r_squared: 0.62,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.295"
  },
  "862": {
    code: "862",
    name: "Home Improvement Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 28.84,
      equation: null,
      r_squared: 0.72,
      sample_size: 25
    },
    am_peak: {
      rate: 0.88,
      equation: null,
      r_squared: 0.65,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 2.75,
      equation: null,
      r_squared: 0.68,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.315"
  },
  "863": {
    code: "863",
    name: "Electronics Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 45.04,
      equation: null,
      r_squared: 0.70,
      sample_size: 18
    },
    am_peak: {
      rate: 1.08,
      equation: null,
      r_squared: 0.62,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 4.25,
      equation: null,
      r_squared: 0.65,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.335"
  },
  "866": {
    code: "866",
    name: "Pet Supply Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 30.17,
      equation: null,
      r_squared: 0.65,
      sample_size: 12
    },
    am_peak: {
      rate: 0.75,
      equation: null,
      r_squared: 0.58,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 2.85,
      equation: null,
      r_squared: 0.60,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.355"
  },
  "867": {
    code: "867",
    name: "Office Supply Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 18.24,
      equation: null,
      r_squared: 0.68,
      sample_size: 15
    },
    am_peak: {
      rate: 0.62,
      equation: null,
      r_squared: 0.60,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 1.92,
      equation: null,
      r_squared: 0.62,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.375"
  },
  "868": {
    code: "868",
    name: "Value Retail Center",
    category: "Retail",
    unit: "1000 SF GLA",
    weekday: {
      rate: 14.91,
      equation: null,
      r_squared: 0.62,
      sample_size: 10
    },
    am_peak: {
      rate: 0.38,
      equation: null,
      r_squared: 0.55,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 1.42,
      equation: null,
      r_squared: 0.58,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.395"
  },
  "875": {
    code: "875",
    name: "Department Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 22.59,
      equation: null,
      r_squared: 0.72,
      sample_size: 22
    },
    am_peak: {
      rate: 0.58,
      equation: null,
      r_squared: 0.65,
      entering: 62,
      exiting: 38
    },
    pm_peak: {
      rate: 2.28,
      equation: null,
      r_squared: 0.68,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.415"
  },
  "879": {
    code: "879",
    name: "Arts and Crafts Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 28.72,
      equation: null,
      r_squared: 0.62,
      sample_size: 8
    },
    am_peak: {
      rate: 0.72,
      equation: null,
      r_squared: 0.55,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 2.85,
      equation: null,
      r_squared: 0.58,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.435"
  },
  "880": {
    code: "880",
    name: "Pharmacy/Drugstore without Drive-Through",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 90.06,
      equation: null,
      r_squared: 0.68,
      sample_size: 28
    },
    am_peak: {
      rate: 5.58,
      equation: null,
      r_squared: 0.62,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 8.24,
      equation: null,
      r_squared: 0.65,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.455"
  },
  "881": {
    code: "881",
    name: "Pharmacy/Drugstore with Drive-Through",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 106.32,
      equation: null,
      r_squared: 0.72,
      sample_size: 35
    },
    am_peak: {
      rate: 6.82,
      equation: null,
      r_squared: 0.65,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 9.85,
      equation: null,
      r_squared: 0.68,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.475"
  },
  "890": {
    code: "890",
    name: "Furniture Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 5.06,
      equation: null,
      r_squared: 0.52,
      sample_size: 22
    },
    am_peak: {
      rate: 0.17,
      equation: null,
      r_squared: 0.45,
      entering: 62,
      exiting: 38
    },
    pm_peak: {
      rate: 0.52,
      equation: null,
      r_squared: 0.48,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "800s Data Plot p.495"
  },

  // ===========================================
  // 900s - SERVICES
  // ===========================================
  "910": {
    code: "910",
    name: "Bank",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 148.15,
      equation: null,
      r_squared: 0.55,
      sample_size: 32
    },
    am_peak: {
      rate: 11.52,
      equation: null,
      r_squared: 0.48,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 13.24,
      equation: null,
      r_squared: 0.50,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.15"
  },
  "911": {
    code: "911",
    name: "Drive-In Bank",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 183.43,
      equation: null,
      r_squared: 0.52,
      sample_size: 28
    },
    am_peak: {
      rate: 14.28,
      equation: null,
      r_squared: 0.45,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 16.45,
      equation: null,
      r_squared: 0.48,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.35"
  },
  "912": {
    code: "912",
    name: "Drive-In Only Bank",
    category: "Services",
    unit: "Service Positions",
    weekday: {
      rate: 265.21,
      equation: null,
      r_squared: 0.48,
      sample_size: 12
    },
    am_peak: {
      rate: 20.65,
      equation: null,
      r_squared: 0.42,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 24.82,
      equation: null,
      r_squared: 0.45,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.55"
  },
  "930": {
    code: "930",
    name: "Fast Casual Restaurant",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 78.42,
      equation: null,
      r_squared: 0.72,
      sample_size: 28
    },
    am_peak: {
      rate: 3.85,
      equation: null,
      r_squared: 0.65,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 7.25,
      equation: null,
      r_squared: 0.68,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.75"
  },
  "931": {
    code: "931",
    name: "Quality Restaurant",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 83.84,
      equation: null,
      r_squared: 0.68,
      sample_size: 45
    },
    am_peak: {
      rate: 0.81,
      equation: null,
      r_squared: 0.55,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 7.80,
      equation: null,
      r_squared: 0.62,
      entering: 65,
      exiting: 35
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.95"
  },
  "932": {
    code: "932",
    name: "High-Turnover (Sit-Down) Restaurant",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 112.18,
      equation: null,
      r_squared: 0.75,
      sample_size: 52
    },
    am_peak: {
      rate: 6.94,
      equation: null,
      r_squared: 0.68,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 9.85,
      equation: null,
      r_squared: 0.70,
      entering: 52,
      exiting: 48
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.115"
  },
  "933": {
    code: "933",
    name: "Fast Food Restaurant without Drive-Through",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 346.48,
      equation: null,
      r_squared: 0.62,
      sample_size: 35
    },
    am_peak: {
      rate: 23.05,
      equation: null,
      r_squared: 0.55,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 27.62,
      equation: null,
      r_squared: 0.58,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.135"
  },
  "934": {
    code: "934",
    name: "Fast Food Restaurant with Drive-Through",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 470.95,
      equation: { type: "log", a: 0.65, b: 3.95 },
      r_squared: 0.78,
      sample_size: 85
    },
    am_peak: {
      rate: 45.42,
      equation: null,
      r_squared: 0.72,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 32.67,
      equation: null,
      r_squared: 0.74,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.155"
  },
  "936": {
    code: "936",
    name: "Coffee/Donut Shop without Drive-Through",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 600.00,
      equation: null,
      r_squared: 0.52,
      sample_size: 15
    },
    am_peak: {
      rate: 85.42,
      equation: null,
      r_squared: 0.48,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 42.85,
      equation: null,
      r_squared: 0.50,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.175"
  },
  "937": {
    code: "937",
    name: "Coffee/Donut Shop with Drive-Through",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 820.00,
      equation: null,
      r_squared: 0.55,
      sample_size: 22
    },
    am_peak: {
      rate: 125.68,
      equation: null,
      r_squared: 0.50,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 58.35,
      equation: null,
      r_squared: 0.52,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.195"
  },
  "938": {
    code: "938",
    name: "Coffee/Donut Shop with Drive-Through Only",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 1200.00,
      equation: null,
      r_squared: 0.48,
      sample_size: 8
    },
    am_peak: {
      rate: 175.25,
      equation: null,
      r_squared: 0.42,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 85.42,
      equation: null,
      r_squared: 0.45,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.215"
  },
  "941": {
    code: "941",
    name: "Quick Lubrication Vehicle Shop",
    category: "Services",
    unit: "Service Bays",
    weekday: {
      rate: 40.00,
      equation: null,
      r_squared: 0.58,
      sample_size: 18
    },
    am_peak: {
      rate: 3.25,
      equation: null,
      r_squared: 0.52,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 4.12,
      equation: null,
      r_squared: 0.55,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.235"
  },
  "942": {
    code: "942",
    name: "Automobile Care Center",
    category: "Services",
    unit: "Service Bays",
    weekday: {
      rate: 30.56,
      equation: null,
      r_squared: 0.62,
      sample_size: 22
    },
    am_peak: {
      rate: 2.58,
      equation: null,
      r_squared: 0.55,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 3.12,
      equation: null,
      r_squared: 0.58,
      entering: 40,
      exiting: 60
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.255"
  },
  "944": {
    code: "944",
    name: "Gas Station",
    category: "Services",
    unit: "Fueling Positions",
    weekday: {
      rate: 168.56,
      equation: null,
      r_squared: 0.68,
      sample_size: 45
    },
    am_peak: {
      rate: 12.82,
      equation: null,
      r_squared: 0.62,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 14.58,
      equation: null,
      r_squared: 0.65,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.275"
  },
  "945": {
    code: "945",
    name: "Gas Station with Convenience Market",
    category: "Services",
    unit: "Fueling Positions",
    weekday: {
      rate: 215.34,
      equation: null,
      r_squared: 0.72,
      sample_size: 58
    },
    am_peak: {
      rate: 15.65,
      equation: null,
      r_squared: 0.65,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 18.42,
      equation: null,
      r_squared: 0.68,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.295"
  },
  "946": {
    code: "946",
    name: "Gas Station with Convenience Market and Car Wash",
    category: "Services",
    unit: "Fueling Positions",
    weekday: {
      rate: 245.68,
      equation: null,
      r_squared: 0.70,
      sample_size: 35
    },
    am_peak: {
      rate: 18.24,
      equation: null,
      r_squared: 0.62,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 21.35,
      equation: null,
      r_squared: 0.65,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.315"
  },
  "947": {
    code: "947",
    name: "Self-Service Car Wash",
    category: "Services",
    unit: "Stalls",
    weekday: {
      rate: 108.00,
      equation: null,
      r_squared: 0.55,
      sample_size: 14
    },
    am_peak: {
      rate: 4.82,
      equation: null,
      r_squared: 0.48,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 8.65,
      equation: null,
      r_squared: 0.52,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.335"
  },
  "948": {
    code: "948",
    name: "Automated Car Wash",
    category: "Services",
    unit: "Stalls",
    weekday: {
      rate: 135.00,
      equation: null,
      r_squared: 0.58,
      sample_size: 18
    },
    am_peak: {
      rate: 6.25,
      equation: null,
      r_squared: 0.52,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 10.85,
      equation: null,
      r_squared: 0.55,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.355"
  },
  "960": {
    code: "960",
    name: "Super Convenience Market / Gas Station",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 192.45,
      equation: null,
      r_squared: 0.72,
      sample_size: 32
    },
    am_peak: {
      rate: 13.58,
      equation: null,
      r_squared: 0.65,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 16.24,
      equation: null,
      r_squared: 0.68,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "900s Data Plot p.375"
  },

  // ===========================================
  // INDUSTRIAL / MANUFACTURING
  // ===========================================
  "110": {
    code: "110",
    name: "General Light Industrial",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 4.96,
      equation: { type: "log", a: 0.80, b: 0.89 },
      r_squared: 0.82,
      sample_size: 78
    },
    am_peak: {
      rate: 0.70,
      equation: null,
      r_squared: 0.75,
      entering: 88,
      exiting: 12
    },
    pm_peak: {
      rate: 0.63,
      equation: null,
      r_squared: 0.76,
      entering: 12,
      exiting: 88
    },
    source: "ITE 12th Edition",
    page_ref: "100s Data Plot p.15"
  },
  "130": {
    code: "130",
    name: "Industrial Park",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 3.93,
      equation: null,
      r_squared: 0.72,
      sample_size: 35
    },
    am_peak: {
      rate: 0.55,
      equation: null,
      r_squared: 0.65,
      entering: 85,
      exiting: 15
    },
    pm_peak: {
      rate: 0.52,
      equation: null,
      r_squared: 0.68,
      entering: 15,
      exiting: 85
    },
    source: "ITE 12th Edition",
    page_ref: "100s Data Plot p.35"
  },
  "140": {
    code: "140",
    name: "Manufacturing",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 3.82,
      equation: { type: "linear", a: 3.82, b: 0 },
      r_squared: 0.78,
      sample_size: 42
    },
    am_peak: {
      rate: 0.65,
      equation: null,
      r_squared: 0.72,
      entering: 92,
      exiting: 8
    },
    pm_peak: {
      rate: 0.58,
      equation: null,
      r_squared: 0.74,
      entering: 8,
      exiting: 92
    },
    source: "ITE 12th Edition",
    page_ref: "100s Data Plot p.55"
  },
  "150": {
    code: "150",
    name: "Warehousing",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 1.74,
      equation: { type: "log", a: 0.68, b: 0.43 },
      r_squared: 0.75,
      sample_size: 55
    },
    am_peak: {
      rate: 0.18,
      equation: null,
      r_squared: 0.68,
      entering: 82,
      exiting: 18
    },
    pm_peak: {
      rate: 0.19,
      equation: null,
      r_squared: 0.70,
      entering: 22,
      exiting: 78
    },
    source: "ITE 12th Edition",
    page_ref: "100s Data Plot p.75"
  },
  "151": {
    code: "151",
    name: "Mini-Warehouse",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 2.50,
      equation: null,
      r_squared: 0.52,
      sample_size: 42
    },
    am_peak: {
      rate: 0.14,
      equation: null,
      r_squared: 0.45,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 0.26,
      equation: null,
      r_squared: 0.48,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "100s Data Plot p.95"
  },
  "154": {
    code: "154",
    name: "High-Cube Transload and Short-Term Storage Warehouse",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 1.40,
      equation: null,
      r_squared: 0.65,
      sample_size: 18
    },
    am_peak: {
      rate: 0.15,
      equation: null,
      r_squared: 0.58,
      entering: 78,
      exiting: 22
    },
    pm_peak: {
      rate: 0.14,
      equation: null,
      r_squared: 0.60,
      entering: 25,
      exiting: 75
    },
    source: "ITE 12th Edition",
    page_ref: "100s Data Plot p.115"
  },
  "155": {
    code: "155",
    name: "High-Cube Fulfillment Center Warehouse",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 1.99,
      equation: null,
      r_squared: 0.68,
      sample_size: 22
    },
    am_peak: {
      rate: 0.22,
      equation: null,
      r_squared: 0.62,
      entering: 75,
      exiting: 25
    },
    pm_peak: {
      rate: 0.21,
      equation: null,
      r_squared: 0.64,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition",
    page_ref: "100s Data Plot p.135"
  },
  "156": {
    code: "156",
    name: "High-Cube Parcel Hub Warehouse",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 4.65,
      equation: null,
      r_squared: 0.70,
      sample_size: 15
    },
    am_peak: {
      rate: 0.58,
      equation: null,
      r_squared: 0.62,
      entering: 72,
      exiting: 28
    },
    pm_peak: {
      rate: 0.52,
      equation: null,
      r_squared: 0.65,
      entering: 30,
      exiting: 70
    },
    source: "ITE 12th Edition",
    page_ref: "100s Data Plot p.155"
  },
  "180": {
    code: "180",
    name: "Specialty Trade Contractor",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 10.22,
      equation: null,
      r_squared: 0.58,
      sample_size: 12
    },
    am_peak: {
      rate: 1.32,
      equation: null,
      r_squared: 0.52,
      entering: 70,
      exiting: 30
    },
    pm_peak: {
      rate: 1.18,
      equation: null,
      r_squared: 0.55,
      entering: 32,
      exiting: 68
    },
    source: "ITE 12th Edition",
    page_ref: "100s Data Plot p.175"
  }
};

// Land use categories for grouping in UI
const ITE_CATEGORIES = {
  "Port, Freight, Terminal": ["010", "021", "030"],
  "Industrial": ["110", "130", "140", "150", "151", "154", "155", "156", "180"],
  "Residential": ["210", "215", "220", "221", "222", "230", "240", "251", "252", "255", "260", "270"],
  "Lodging": ["310", "311", "312", "320", "330"],
  "Recreational": ["411", "420", "430", "432", "435", "444", "445", "454", "480", "491", "492", "495"],
  "Institutional": ["520", "522", "530", "534", "536", "540", "550", "560", "565", "566", "575", "590"],
  "Medical": ["610", "620", "630", "640", "650"],
  "Office": ["710", "714", "715", "720", "730", "750", "760", "770"],
  "Retail": ["810", "813", "815", "820", "821", "822", "840", "841", "848", "850", "851", "853", "857", "860", "861", "862", "863", "866", "867", "868", "875", "879", "880", "881", "890"],
  "Services": ["910", "911", "912", "930", "931", "932", "933", "934", "936", "937", "938", "941", "942", "944", "945", "946", "947", "948", "960"]
};

// Henrico County Thresholds
const HENRICO_THRESHOLDS = {
  peak_hour_warning: 100,      // trips/hour triggers warning
  daily_warning: 1000,         // daily trips triggers warning
  tia_required: 4000,          // vpd requires TIA
  vdot_threshold: 5000,        // VDOT threshold
  sample_size_warning: 5,      // sites below this = low confidence
  sample_size_unreliable: 3,   // sites below this = very unreliable
  r_squared_good: 0.75,        // use fitted curve
  r_squared_fair: 0.50,        // use fitted curve with caution
  r_squared_poor: 0.25         // flag as no correlation
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ITE_DATABASE, ITE_CATEGORIES, HENRICO_THRESHOLDS };
}
