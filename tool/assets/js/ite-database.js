const ITE_DATABASE = {
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
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.42,
      equation: null,
      r_squared: null,
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 000s Modal Data Plots"
  },
  "021": {
    code: "021",
    name: "Commercial Airport",
    category: "Port, Freight, Terminal",
    unit: "Employees",
    weekday: {
      rate: 13.4,
      equation: null,
      r_squared: 0.55,
      sample_size: 4
    },
    am_peak: {
      rate: 0.82,
      equation: null,
      r_squared: null,
      sample_size: undefined,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 1.03,
      equation: null,
      r_squared: null,
      sample_size: undefined,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 000s Modal Data Plots"
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
      rate: 1.97,
      equation: null,
      r_squared: null,
      sample_size: 2,
      entering: 47,
      exiting: 53
    },
    pm_peak: {
      rate: 1.87,
      equation: null,
      r_squared: 0.63,
      sample_size: 4,
      entering: 52,
      exiting: 48
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 000s Modal Data Plots"
  },
  "110": {
    code: "110",
    name: "General Light Industrial",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 4.87,
      equation: { type: "log", a: 0.8, b: 0.89 },
      r_squared: 0.61,
      sample_size: 37
    },
    am_peak: {
      rate: 0.74,
      equation: null,
      r_squared: 0.66,
      sample_size: 41,
      entering: 88,
      exiting: 12
    },
    pm_peak: {
      rate: 0.65,
      equation: null,
      r_squared: 0.55,
      sample_size: 40,
      entering: 14,
      exiting: 86
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 100s Modal Data Plots"
  },
  "130": {
    code: "130",
    name: "Industrial Park",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 3.37,
      equation: null,
      r_squared: 0.58,
      sample_size: 27
    },
    am_peak: {
      rate: 0.34,
      equation: null,
      r_squared: 0.65,
      sample_size: 34,
      entering: 81,
      exiting: 19
    },
    pm_peak: {
      rate: 0.34,
      equation: null,
      r_squared: 0.68,
      sample_size: 35,
      entering: 22,
      exiting: 78
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 100s Modal Data Plots"
  },
  "140": {
    code: "140",
    name: "Manufacturing",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 39.53,
      equation: { type: "linear", a: 3.82, b: 0 },
      r_squared: 0.8,
      sample_size: 37
    },
    am_peak: {
      rate: 4.79,
      equation: null,
      r_squared: 0.73,
      sample_size: 32,
      entering: 86,
      exiting: 14
    },
    pm_peak: {
      rate: 4.99,
      equation: null,
      r_squared: 0.63,
      sample_size: 32,
      entering: 39,
      exiting: 61
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 100s Modal Data Plots"
  },
  "150": {
    code: "150",
    name: "Warehousing",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 1.71,
      equation: { type: "log", a: 0.68, b: 0.43 },
      r_squared: 0.92,
      sample_size: 31
    },
    am_peak: {
      rate: 0.18,
      equation: null,
      r_squared: 0.69,
      sample_size: 36,
      entering: 77,
      exiting: 23
    },
    pm_peak: {
      rate: 0.18,
      equation: null,
      r_squared: 0.65,
      sample_size: 49,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 100s Modal Data Plots"
  },
  "151": {
    code: "151",
    name: "Mini-Warehouse",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 1.65,
      equation: null,
      r_squared: 0.52,
      sample_size: 4
    },
    am_peak: {
      rate: 0.1,
      equation: null,
      r_squared: 0.52,
      sample_size: 8,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 0.17,
      equation: null,
      r_squared: 0.48,
      sample_size: 8,
      entering: 52,
      exiting: 48
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 100s Modal Data Plots"
  },
  "154": {
    code: "154",
    name: "High-Cube Transload and Short-Term Storage Warehouse",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 1.4,
      equation: null,
      r_squared: 0.65,
      sample_size: 91
    },
    am_peak: {
      rate: 0.08,
      equation: null,
      r_squared: 0.58,
      sample_size: 102,
      entering: 77,
      exiting: 23
    },
    pm_peak: {
      rate: 0.1,
      equation: null,
      r_squared: 0.6,
      sample_size: 103,
      entering: 28,
      exiting: 72
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 100s Modal Data Plots"
  },
  "155": {
    code: "155",
    name: "High-Cube Fulfillment Center Warehouse",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 6.44,
      equation: null,
      r_squared: 0.68,
      sample_size: 2
    },
    am_peak: {
      rate: 0.87,
      equation: null,
      r_squared: 0.62,
      sample_size: 3,
      entering: 81,
      exiting: 19
    },
    pm_peak: {
      rate: 1.2,
      equation: null,
      r_squared: 0.64,
      sample_size: 3,
      entering: 39,
      exiting: 61
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 100s Modal Data Plots"
  },
  "156": {
    code: "156",
    name: "High-Cube Parcel Hub Warehouse",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 4.63,
      equation: null,
      r_squared: 0.7,
      sample_size: 8
    },
    am_peak: {
      rate: 0.7,
      equation: null,
      r_squared: 0.93,
      sample_size: 4,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.64,
      equation: null,
      r_squared: 0.86,
      sample_size: 4,
      entering: 68,
      exiting: 32
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 100s Modal Data Plots"
  },
  "180": {
    code: "180",
    name: "Specialty Trade Contractor",
    category: "Industrial",
    unit: "1000 SF GFA",
    weekday: {
      rate: 9.82,
      equation: null,
      r_squared: 0.58,
      sample_size: 20
    },
    am_peak: {
      rate: 1.66,
      equation: null,
      r_squared: 0.52,
      sample_size: 20,
      entering: 74,
      exiting: 26
    },
    pm_peak: {
      rate: 1.93,
      equation: null,
      r_squared: 0.55,
      sample_size: 19,
      entering: 32,
      exiting: 68
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 100s Modal Data Plots"
  },
  "210": {
    code: "210",
    name: "Single-Family Detached Housing",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 9.43,
      equation: { type: "linear", a: 8.07, b: 265.45 },
      r_squared: 0.95,
      sample_size: 174
    },
    am_peak: {
      rate: 0.7,
      equation: { type: "linear", a: 0.7, b: 1.52 },
      r_squared: 0.9,
      sample_size: 192,
      entering: 26,
      exiting: 74
    },
    pm_peak: {
      rate: 0.94,
      equation: { type: "linear", a: 0.94, b: 1.86 },
      r_squared: 0.92,
      sample_size: 208,
      entering: 63,
      exiting: 37
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "215": {
    code: "215",
    name: "Single-Family Attached Housing",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 7.2,
      equation: { type: "linear", a: 7.2, b: 0 },
      r_squared: 0.94,
      sample_size: 22
    },
    am_peak: {
      rate: 0.48,
      equation: { type: "linear", a: 0.52, b: 0 },
      r_squared: 0.92,
      sample_size: 46,
      entering: 31,
      exiting: 69
    },
    pm_peak: {
      rate: 0.57,
      equation: { type: "linear", a: 0.62, b: 0 },
      r_squared: 0.91,
      sample_size: 51,
      entering: 57,
      exiting: 43
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "220": {
    code: "220",
    name: "Multifamily Housing (Low-Rise)",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 4.72,
      equation: { type: "linear", a: 7.32, b: 0 },
      r_squared: 0.93,
      sample_size: 9
    },
    am_peak: {
      rate: 0.38,
      equation: { type: "linear", a: 0.55, b: 0 },
      r_squared: 0.8,
      sample_size: 1,
      entering: 29,
      exiting: 71
    },
    pm_peak: {
      rate: 0.61,
      equation: { type: "linear", a: 0.67, b: 0 },
      r_squared: 0.82,
      sample_size: 1,
      entering: 60,
      exiting: 40
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "221": {
    code: "221",
    name: "Multifamily Housing (Mid-Rise)",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 4.75,
      equation: null,
      r_squared: null,
      sample_size: 2
    },
    am_peak: {
      rate: 0.32,
      equation: { type: "linear", a: 0.31, b: 1.06 },
      r_squared: 0.74,
      sample_size: 7,
      entering: 56,
      exiting: 44
    },
    pm_peak: {
      rate: 0.29,
      equation: { type: "linear", a: 0.29, b: -0.09 },
      r_squared: 0.89,
      sample_size: 7,
      entering: 43,
      exiting: 57
    },
    source: "ITE 11th Edition",
    page_ref: "ITE 11th Ed. Vol 2 - Residential"
  },
  "222": {
    code: "222",
    name: "Multifamily Housing (High-Rise)",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 3.96,
      equation: { type: "linear", a: 4.2, b: 0 },
      r_squared: 0.72,
      sample_size: 2
    },
    am_peak: {
      rate: 0.23,
      equation: null,
      r_squared: 0.58,
      sample_size: 3,
      entering: 33,
      exiting: 67
    },
    pm_peak: {
      rate: 0.26,
      equation: null,
      r_squared: 0.6,
      sample_size: 3,
      entering: 57,
      exiting: 43
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "230": {
    code: "230",
    name: "Low-Rise Residential with Ground-Floor Commercial",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 3.44,
      equation: { type: "linear", a: 5.86, b: 0 },
      r_squared: 0.8,
      sample_size: 1
    },
    am_peak: {
      rate: 0.44,
      equation: null,
      r_squared: 0.72,
      sample_size: 2,
      entering: 23,
      exiting: 77
    },
    pm_peak: {
      rate: 0.36,
      equation: null,
      r_squared: 0.75,
      sample_size: 2,
      entering: 71,
      exiting: 29
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "240": {
    code: "240",
    name: "Mobile Home Park",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 7.12,
      equation: { type: "linear", a: 4.99, b: 0 },
      r_squared: 0.61,
      sample_size: 13
    },
    am_peak: {
      rate: 0.39,
      equation: null,
      r_squared: 0.84,
      sample_size: 9,
      entering: 21,
      exiting: 79
    },
    pm_peak: {
      rate: 0.58,
      equation: null,
      r_squared: 0.91,
      sample_size: 9,
      entering: 62,
      exiting: 38
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "251": {
    code: "251",
    name: "Senior Adult Housing - Detached",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 4.31,
      equation: null,
      r_squared: 0.94,
      sample_size: 15
    },
    am_peak: {
      rate: 0.24,
      equation: null,
      r_squared: 0.88,
      sample_size: 34,
      entering: 33,
      exiting: 67
    },
    pm_peak: {
      rate: 0.3,
      equation: null,
      r_squared: 0.86,
      sample_size: 35,
      entering: 61,
      exiting: 39
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "252": {
    code: "252",
    name: "Senior Adult Housing - Attached",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 3.24,
      equation: null,
      r_squared: 0.99,
      sample_size: 6
    },
    am_peak: {
      rate: 0.2,
      equation: null,
      r_squared: 0.85,
      sample_size: 9,
      entering: 34,
      exiting: 66
    },
    pm_peak: {
      rate: 0.25,
      equation: null,
      r_squared: 0.84,
      sample_size: 9,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "255": {
    code: "255",
    name: "Continuing Care Retirement Community",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 2.47,
      equation: null,
      r_squared: 0.98,
      sample_size: 9
    },
    am_peak: {
      rate: 0.15,
      equation: null,
      r_squared: 0.95,
      sample_size: 15,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 0.19,
      equation: null,
      r_squared: 0.94,
      sample_size: 15,
      entering: 39,
      exiting: 61
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
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
      rate: 0.22,
      equation: null,
      r_squared: 0.95,
      sample_size: 6,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 1.11,
      equation: null,
      r_squared: 0.42,
      sample_size: 9,
      entering: 59,
      exiting: 41
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "270": {
    code: "270",
    name: "Residential Planned Unit Development",
    category: "Residential",
    unit: "Dwelling Units",
    weekday: {
      rate: 7.31,
      equation: { type: "linear", a: 7.5, b: 0 },
      r_squared: 0.94,
      sample_size: 8
    },
    am_peak: {
      rate: 0.57,
      equation: null,
      r_squared: 0.97,
      sample_size: 8,
      entering: 22,
      exiting: 78
    },
    pm_peak: {
      rate: 0.68,
      equation: null,
      r_squared: 0.97,
      sample_size: 8,
      entering: 65,
      exiting: 35
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 200s Modal Data Plots"
  },
  "310": {
    code: "310",
    name: "Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 12.23,
      equation: { type: "log", a: 0.8, b: 0.69 },
      r_squared: 0.78,
      sample_size: 2
    },
    am_peak: {
      rate: 0.62,
      equation: null,
      r_squared: 0.54,
      sample_size: 13,
      entering: 56,
      exiting: 44
    },
    pm_peak: {
      rate: 0.73,
      equation: null,
      r_squared: 0.59,
      sample_size: 16,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 300s Modal Data Plots"
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
      sample_size: 3
    },
    am_peak: {
      rate: 0.48,
      equation: null,
      r_squared: 0.6,
      sample_size: 4,
      entering: 67,
      exiting: 33
    },
    pm_peak: {
      rate: 0.52,
      equation: null,
      r_squared: 0.62,
      sample_size: 5,
      entering: 43,
      exiting: 57
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 300s Modal Data Plots"
  },
  "312": {
    code: "312",
    name: "Limited-Service Hotel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 5.08,
      equation: null,
      r_squared: 0.72,
      sample_size: 3
    },
    am_peak: {
      rate: 0.51,
      equation: null,
      r_squared: 0.7,
      sample_size: 7,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 0.41,
      equation: null,
      r_squared: 0.66,
      sample_size: 14,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 300s Modal Data Plots"
  },
  "320": {
    code: "320",
    name: "Motel",
    category: "Lodging",
    unit: "Rooms",
    weekday: {
      rate: 4.37,
      equation: null,
      r_squared: 0.55,
      sample_size: 2
    },
    am_peak: {
      rate: 0.49,
      equation: null,
      r_squared: 0.7,
      sample_size: 10,
      entering: 36,
      exiting: 64
    },
    pm_peak: {
      rate: 0.47,
      equation: null,
      r_squared: 0.5,
      sample_size: 13,
      entering: 53,
      exiting: 47
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 300s Modal Data Plots"
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
      rate: 0.37,
      equation: null,
      r_squared: 0.78,
      sample_size: 6,
      entering: 72,
      exiting: 28
    },
    pm_peak: {
      rate: 0.47,
      equation: null,
      r_squared: 0.91,
      sample_size: 9,
      entering: 43,
      exiting: 57
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 300s Modal Data Plots"
  },
  "411": {
    code: "411",
    name: "Public Park",
    category: "Recreational",
    unit: "Acres",
    weekday: {
      rate: 0.78,
      equation: null,
      r_squared: 0.82,
      sample_size: 5
    },
    am_peak: {
      rate: 0.02,
      equation: null,
      r_squared: null,
      sample_size: 5,
      entering: 59,
      exiting: 41
    },
    pm_peak: {
      rate: 0.11,
      equation: null,
      r_squared: 0.53,
      sample_size: 6,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
  },
  "420": {
    code: "420",
    name: "Marina",
    category: "Recreational",
    unit: "Berths",
    weekday: {
      rate: 2.41,
      equation: null,
      r_squared: 0.48,
      sample_size: 2
    },
    am_peak: {
      rate: 0.07,
      equation: null,
      r_squared: null,
      sample_size: 1,
      entering: 33,
      exiting: 67
    },
    pm_peak: {
      rate: 0.21,
      equation: null,
      r_squared: null,
      sample_size: 1,
      entering: 60,
      exiting: 40
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
  },
  "430": {
    code: "430",
    name: "Golf Course",
    category: "Recreational",
    unit: "Holes",
    weekday: {
      rate: 30.38,
      equation: null,
      r_squared: 0.72,
      sample_size: 4
    },
    am_peak: {
      rate: 1.76,
      equation: null,
      r_squared: 0.5,
      sample_size: 15,
      entering: 79,
      exiting: 21
    },
    pm_peak: {
      rate: 2.91,
      equation: null,
      r_squared: 0.5,
      sample_size: 14,
      entering: 53,
      exiting: 47
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
  },
  "432": {
    code: "432",
    name: "Golf Driving Range",
    category: "Recreational",
    unit: "Tees",
    weekday: {
      rate: 13.65,
      equation: null,
      r_squared: 0.52,
      sample_size: 1
    },
    am_peak: {
      rate: 0.4,
      equation: null,
      r_squared: null,
      sample_size: 1,
      entering: 61,
      exiting: 39
    },
    pm_peak: {
      rate: 1.25,
      equation: null,
      r_squared: null,
      sample_size: 7,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
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
      sample_size: undefined,
      entering: 70,
      exiting: 30
    },
    pm_peak: {
      rate: 3.58,
      equation: null,
      r_squared: null,
      sample_size: 3,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
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
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 5.43,
      equation: null,
      r_squared: null,
      sample_size: undefined,
      entering: 65,
      exiting: 35
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
  },
  "445": {
    code: "445",
    name: "Multiplex Movie Theater",
    category: "Recreational",
    unit: "Screens",
    weekday: {
      rate: 1.76,
      equation: null,
      r_squared: 0.72,
      sample_size: 1
    },
    am_peak: {
      rate: 0.45,
      equation: null,
      r_squared: null,
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.1,
      equation: null,
      r_squared: null,
      sample_size: 18,
      entering: 60,
      exiting: 40
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
  },
  "454": {
    code: "454",
    name: "Batting Cages",
    category: "Recreational",
    unit: "Cages",
    weekday: {
      rate: 24.8,
      equation: null,
      r_squared: 0.45,
      sample_size: 4
    },
    am_peak: {
      rate: 0.68,
      equation: null,
      r_squared: null,
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.15,
      equation: null,
      r_squared: null,
      sample_size: 1,
      entering: 8,
      exiting: 92
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
  },
  "480": {
    code: "480",
    name: "Amusement Park",
    category: "Recreational",
    unit: "Acres",
    weekday: {
      rate: 53.41,
      equation: null,
      r_squared: 0.55,
      sample_size: 1
    },
    am_peak: {
      rate: 0.21,
      equation: null,
      r_squared: null,
      sample_size: 1,
      entering: 88,
      exiting: 12
    },
    pm_peak: {
      rate: 3.95,
      equation: null,
      r_squared: null,
      sample_size: 1,
      entering: 61,
      exiting: 39
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
  },
  "491": {
    code: "491",
    name: "Racquet/Tennis Club",
    category: "Recreational",
    unit: "Courts",
    weekday: {
      rate: 27.71,
      equation: null,
      r_squared: 0.48,
      sample_size: 2
    },
    am_peak: {
      rate: 1.65,
      equation: null,
      r_squared: null,
      sample_size: undefined,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 3.82,
      equation: null,
      r_squared: null,
      sample_size: 2,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
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
      rate: 1.31,
      equation: null,
      r_squared: 0.65,
      sample_size: 6,
      entering: 51,
      exiting: 49
    },
    pm_peak: {
      rate: 3.45,
      equation: null,
      r_squared: 0.67,
      sample_size: 8,
      entering: 57,
      exiting: 43
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
  },
  "495": {
    code: "495",
    name: "Recreational Community Center",
    category: "Recreational",
    unit: "1000 SF GFA",
    weekday: {
      rate: 28.82,
      equation: null,
      r_squared: 0.74,
      sample_size: 4
    },
    am_peak: {
      rate: 18.35,
      equation: null,
      r_squared: null,
      sample_size: 2,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 23.06,
      equation: null,
      r_squared: null,
      sample_size: 2,
      entering: 44,
      exiting: 56
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 400s Modal Data Plots"
  },
  "520": {
    code: "520",
    name: "Elementary School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 2.27,
      equation: null,
      r_squared: 0.72,
      sample_size: 16
    },
    am_peak: {
      rate: 0.74,
      equation: null,
      r_squared: 0.68,
      sample_size: 44,
      entering: 54,
      exiting: 46
    },
    pm_peak: {
      rate: 0.16,
      equation: null,
      r_squared: 0.62,
      sample_size: 47,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "522": {
    code: "522",
    name: "Middle School/Junior High School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 2.1,
      equation: null,
      r_squared: 0.83,
      sample_size: 14
    },
    am_peak: {
      rate: 0.67,
      equation: null,
      r_squared: 0.62,
      sample_size: 23,
      entering: 54,
      exiting: 46
    },
    pm_peak: {
      rate: 0.15,
      equation: null,
      r_squared: 0.58,
      sample_size: 21,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "525": {
    code: "525",
    name: "High School",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.94,
      equation: null,
      r_squared: 0.74,
      sample_size: 31
    },
    am_peak: {
      rate: 0.52,
      equation: null,
      r_squared: 0.56,
      sample_size: 42,
      entering: 68,
      exiting: 32
    },
    pm_peak: {
      rate: 0.14,
      equation: null,
      r_squared: 0.65,
      sample_size: 41,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "530": {
    code: "530",
    name: "Private School (K-8)",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 4.11,
      equation: null,
      r_squared: 0.74,
      sample_size: 1
    },
    am_peak: {
      rate: 1.01,
      equation: null,
      r_squared: 0.92,
      sample_size: 14,
      entering: 56,
      exiting: 44
    },
    pm_peak: {
      rate: 0.26,
      equation: null,
      r_squared: 0.65,
      sample_size: 5,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "534": {
    code: "534",
    name: "Private School (K-8)",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 2.17,
      equation: null,
      r_squared: 0.65,
      sample_size: 3
    },
    am_peak: {
      rate: 0.66,
      equation: null,
      r_squared: 0.61,
      sample_size: 4,
      entering: 59,
      exiting: 41
    },
    pm_peak: {
      rate: 0.19,
      equation: null,
      r_squared: 0.55,
      sample_size: 3,
      entering: 39,
      exiting: 61
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "536": {
    code: "536",
    name: "Private School (K-12)",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.85,
      equation: null,
      r_squared: 0.62,
      sample_size: 1
    },
    am_peak: {
      rate: 1.04,
      equation: null,
      r_squared: 0.86,
      sample_size: 22,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 0.16,
      equation: null,
      r_squared: 0.52,
      sample_size: 5,
      entering: 35,
      exiting: 65
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "540": {
    code: "540",
    name: "Junior/Community College",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.15,
      equation: null,
      r_squared: 0.7,
      sample_size: 12
    },
    am_peak: {
      rate: 0.11,
      equation: null,
      r_squared: 0.8,
      sample_size: 13,
      entering: 81,
      exiting: 19
    },
    pm_peak: {
      rate: 0.12,
      equation: null,
      r_squared: 0.75,
      sample_size: 12,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "550": {
    code: "550",
    name: "University/College",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 1.56,
      equation: null,
      r_squared: 0.95,
      sample_size: 5
    },
    am_peak: {
      rate: 0.15,
      equation: null,
      r_squared: 0.85,
      sample_size: 7,
      entering: 78,
      exiting: 22
    },
    pm_peak: {
      rate: 0.15,
      equation: null,
      r_squared: 0.92,
      sample_size: 9,
      entering: 32,
      exiting: 68
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "560": {
    code: "560",
    name: "Church",
    category: "Institutional",
    unit: "1000 SF GFA",
    weekday: {
      rate: 0.9,
      equation: null,
      r_squared: 0.85,
      sample_size: 4
    },
    am_peak: {
      rate: 0.07,
      equation: null,
      r_squared: null,
      sample_size: 2,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 0.1,
      equation: null,
      r_squared: null,
      sample_size: 4,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "565": {
    code: "565",
    name: "Day Care Center",
    category: "Institutional",
    unit: "Students",
    weekday: {
      rate: 4.09,
      equation: { type: "linear", a: 4.38, b: 0 },
      r_squared: 0.72,
      sample_size: 14
    },
    am_peak: {
      rate: 0.78,
      equation: null,
      r_squared: 0.69,
      sample_size: 75,
      entering: 53,
      exiting: 47
    },
    pm_peak: {
      rate: 0.79,
      equation: null,
      r_squared: 0.57,
      sample_size: 75,
      entering: 47,
      exiting: 53
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "566": {
    code: "566",
    name: "Cemetery",
    category: "Institutional",
    unit: "Acres",
    weekday: {
      rate: 6.02,
      equation: null,
      r_squared: 0.86,
      sample_size: 5
    },
    am_peak: {
      rate: 0.18,
      equation: null,
      r_squared: 0.84,
      sample_size: 4,
      entering: 80,
      exiting: 20
    },
    pm_peak: {
      rate: 0.46,
      equation: null,
      r_squared: 0.58,
      sample_size: 4,
      entering: 31,
      exiting: 69
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "575": {
    code: "575",
    name: "Fire/Rescue Station",
    category: "Institutional",
    unit: "Employees",
    weekday: {
      rate: 8.9,
      equation: null,
      r_squared: 0.48,
      sample_size: 6
    },
    am_peak: {
      rate: 0.65,
      equation: null,
      r_squared: null,
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.48,
      equation: null,
      r_squared: null,
      sample_size: 3,
      entering: 29,
      exiting: 71
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "590": {
    code: "590",
    name: "Library",
    category: "Institutional",
    unit: "1000 SF GFA",
    weekday: {
      rate: 72.05,
      equation: null,
      r_squared: 0.97,
      sample_size: 6
    },
    am_peak: {
      rate: 1,
      equation: null,
      r_squared: 0.86,
      sample_size: 4,
      entering: 71,
      exiting: 29
    },
    pm_peak: {
      rate: 8.16,
      equation: null,
      r_squared: 0.75,
      sample_size: 9,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 500s Modal Data Plots"
  },
  "610": {
    code: "610",
    name: "Hospital",
    category: "Medical",
    unit: "1000 SF GFA",
    weekday: {
      rate: 10.77,
      equation: { type: "linear", a: 10.77, b: 0 },
      r_squared: 0.64,
      sample_size: 7
    },
    am_peak: {
      rate: 0.81,
      equation: null,
      r_squared: 0.72,
      sample_size: 19,
      entering: 67,
      exiting: 33
    },
    pm_peak: {
      rate: 0.86,
      equation: null,
      r_squared: 0.69,
      sample_size: 19,
      entering: 35,
      exiting: 65
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 600s Modal Data Plots"
  },
  "620": {
    code: "620",
    name: "Nursing Home",
    category: "Medical",
    unit: "Beds",
    weekday: {
      rate: 6.75,
      equation: null,
      r_squared: 0.61,
      sample_size: 9
    },
    am_peak: {
      rate: 0.55,
      equation: null,
      r_squared: 0.64,
      sample_size: 8,
      entering: 77,
      exiting: 23
    },
    pm_peak: {
      rate: 0.59,
      equation: null,
      r_squared: 0.52,
      sample_size: 8,
      entering: 41,
      exiting: 59
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 600s Modal Data Plots"
  },
  "630": {
    code: "630",
    name: "Walk-In Clinic",
    category: "Medical",
    unit: "1000 SF GFA",
    weekday: {
      rate: 37.6,
      equation: { type: "log", a: 0.74, b: 1.91 },
      r_squared: 0.76,
      sample_size: 9
    },
    am_peak: {
      rate: 2.75,
      equation: null,
      r_squared: 0.98,
      sample_size: 9,
      entering: 81,
      exiting: 19
    },
    pm_peak: {
      rate: 3.69,
      equation: null,
      r_squared: 0.72,
      sample_size: 11,
      entering: 30,
      exiting: 70
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 600s Modal Data Plots"
  },
  "640": {
    code: "640",
    name: "Animal Hospital/Veterinary Clinic",
    category: "Medical",
    unit: "1000 SF GFA",
    weekday: {
      rate: 21.5,
      equation: null,
      r_squared: 0.68,
      sample_size: 6
    },
    am_peak: {
      rate: 3.64,
      equation: null,
      r_squared: 0.74,
      sample_size: 8,
      entering: 67,
      exiting: 33
    },
    pm_peak: {
      rate: 3.53,
      equation: null,
      r_squared: 0.82,
      sample_size: 8,
      entering: 40,
      exiting: 60
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 600s Modal Data Plots"
  },
  "650": {
    code: "650",
    name: "Free-Standing Emergency Room",
    category: "Medical",
    unit: "1000 SF GFA",
    weekday: {
      rate: 24.94,
      equation: { type: "log", a: 0.72, b: 2.05 },
      r_squared: 0.85,
      sample_size: 4
    },
    am_peak: {
      rate: 1.12,
      equation: null,
      r_squared: 0.78,
      sample_size: 4,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 1.52,
      equation: null,
      r_squared: 0.8,
      sample_size: 4,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 600s Modal Data Plots"
  },
  "710": {
    code: "710",
    name: "General Office Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 10.84,
      equation: { type: "log", a: 0.8, b: 1.55 },
      r_squared: 0.78,
      sample_size: 59
    },
    am_peak: {
      rate: 1.52,
      equation: { type: "log", a: 0.81, b: 0.37 },
      r_squared: 0.78,
      sample_size: 221,
      entering: 88,
      exiting: 12
    },
    pm_peak: {
      rate: 1.44,
      equation: { type: "log", a: 0.83, b: 0.3 },
      r_squared: 0.77,
      sample_size: 232,
      entering: 17,
      exiting: 83
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 700s Modal Data Plots"
  },
  "714": {
    code: "714",
    name: "Corporate Headquarters Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 7.95,
      equation: { type: "linear", a: 7.98, b: 0 },
      r_squared: 0.81,
      sample_size: 7
    },
    am_peak: {
      rate: 1.45,
      equation: null,
      r_squared: 0.68,
      sample_size: 21,
      entering: 93,
      exiting: 7
    },
    pm_peak: {
      rate: 1.3,
      equation: null,
      r_squared: 0.7,
      sample_size: 21,
      entering: 9,
      exiting: 91
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 700s Modal Data Plots"
  },
  "715": {
    code: "715",
    name: "Single Tenant Office Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 13.07,
      equation: { type: "linear", a: 8.28, b: 0 },
      r_squared: 0.53,
      sample_size: 12
    },
    am_peak: {
      rate: 1.85,
      equation: null,
      r_squared: 0.84,
      sample_size: 41,
      entering: 89,
      exiting: 11
    },
    pm_peak: {
      rate: 1.76,
      equation: null,
      r_squared: 0.85,
      sample_size: 41,
      entering: 15,
      exiting: 85
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 700s Modal Data Plots"
  },
  "720": {
    code: "720",
    name: "Medical-Dental Office Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 31.86,
      equation: { type: "log", a: 0.72, b: 2.05 },
      r_squared: 0.99,
      sample_size: 6
    },
    am_peak: {
      rate: 2.68,
      equation: null,
      r_squared: 0.82,
      sample_size: 8,
      entering: 81,
      exiting: 19
    },
    pm_peak: {
      rate: 2.84,
      equation: null,
      r_squared: 0.92,
      sample_size: 10,
      entering: 25,
      exiting: 75
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 700s Modal Data Plots"
  },
  "730": {
    code: "730",
    name: "Government Office Building",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 3.99,
      equation: null,
      r_squared: 0.84,
      sample_size: 7
    },
    am_peak: {
      rate: 0.59,
      equation: null,
      r_squared: 0.66,
      sample_size: 7,
      entering: 75,
      exiting: 25
    },
    pm_peak: {
      rate: 0.38,
      equation: null,
      r_squared: 0.94,
      sample_size: 6,
      entering: 20,
      exiting: 80
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 700s Modal Data Plots"
  },
  "750": {
    code: "750",
    name: "Office Park",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 11.07,
      equation: { type: "linear", a: 8.91, b: 0 },
      r_squared: 0.93,
      sample_size: 10
    },
    am_peak: {
      rate: 1.33,
      equation: null,
      r_squared: 0.86,
      sample_size: 23,
      entering: 89,
      exiting: 11
    },
    pm_peak: {
      rate: 1.3,
      equation: null,
      r_squared: 0.97,
      sample_size: 20,
      entering: 14,
      exiting: 86
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 700s Modal Data Plots"
  },
  "760": {
    code: "760",
    name: "Research and Development Center",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 11.08,
      equation: { type: "linear", a: 8.11, b: 0 },
      r_squared: 0.89,
      sample_size: 22
    },
    am_peak: {
      rate: 1.03,
      equation: null,
      r_squared: 0.7,
      sample_size: 39,
      entering: 82,
      exiting: 18
    },
    pm_peak: {
      rate: 0.98,
      equation: null,
      r_squared: 0.7,
      sample_size: 39,
      entering: 16,
      exiting: 84
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 700s Modal Data Plots"
  },
  "770": {
    code: "770",
    name: "Business Park",
    category: "Office",
    unit: "1000 SF GFA",
    weekday: {
      rate: 12.44,
      equation: null,
      r_squared: 0.89,
      sample_size: 16
    },
    am_peak: {
      rate: 1.35,
      equation: null,
      r_squared: 0.8,
      sample_size: 21,
      entering: 85,
      exiting: 15
    },
    pm_peak: {
      rate: 1.22,
      equation: null,
      r_squared: 0.77,
      sample_size: 22,
      entering: 26,
      exiting: 74
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 700s Modal Data Plots"
  },
  "810": {
    code: "810",
    name: "Tractor Supply Store",
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
      sample_size: undefined,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 1.4,
      equation: null,
      r_squared: 0.65,
      sample_size: 7,
      entering: 47,
      exiting: 53
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "813": {
    code: "813",
    name: "Free-Standing Discount Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 50.52,
      equation: null,
      r_squared: 0.68,
      sample_size: 72
    },
    am_peak: {
      rate: 1.86,
      equation: null,
      r_squared: 0.6,
      sample_size: 72,
      entering: 56,
      exiting: 44
    },
    pm_peak: {
      rate: 4.33,
      equation: null,
      r_squared: 0.62,
      sample_size: 96,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "815": {
    code: "815",
    name: "Free-Standing Discount Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 53.87,
      equation: null,
      r_squared: 0.83,
      sample_size: 21
    },
    am_peak: {
      rate: 1.18,
      equation: null,
      r_squared: 0.64,
      sample_size: 10,
      entering: 70,
      exiting: 30
    },
    pm_peak: {
      rate: 4.86,
      equation: null,
      r_squared: 0.59,
      sample_size: 60,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "820": {
    code: "820",
    name: "Shopping Center",
    category: "Retail",
    unit: "1000 SF GLA",
    weekday: {
      rate: 37.01,
      equation: { type: "log", a: 0.65, b: 2.71 },
      r_squared: 0.6,
      sample_size: 108
    },
    am_peak: {
      rate: 0.84,
      equation: null,
      r_squared: 0.56,
      sample_size: 44,
      entering: 62,
      exiting: 38
    },
    pm_peak: {
      rate: 3.4,
      equation: { type: "log", a: 0.74, b: 1.69 },
      r_squared: 0.7,
      sample_size: 126,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
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
      sample_size: 7
    },
    am_peak: {
      rate: 1.73,
      equation: null,
      r_squared: 0.7,
      sample_size: 13,
      entering: 62,
      exiting: 38
    },
    pm_peak: {
      rate: 5.19,
      equation: null,
      r_squared: 0.72,
      sample_size: 42,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "822": {
    code: "822",
    name: "Strip Retail Plaza (<40K SF)",
    category: "Retail",
    unit: "1000 SF GLA",
    weekday: {
      rate: 54.45,
      equation: null,
      r_squared: 0.96,
      sample_size: 4
    },
    am_peak: {
      rate: 2.36,
      equation: null,
      r_squared: 0.57,
      sample_size: 5,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 6.59,
      equation: null,
      r_squared: 0.56,
      sample_size: 25,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "840": {
    code: "840",
    name: "Automobile Sales (New)",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 27.84,
      equation: null,
      r_squared: 0.8,
      sample_size: 18
    },
    am_peak: {
      rate: 2.03,
      equation: null,
      r_squared: 0.62,
      sample_size: 3,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 2.26,
      equation: null,
      r_squared: 0.65,
      sample_size: 3,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "841": {
    code: "841",
    name: "Automobile Sales (Used)",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 27.06,
      equation: null,
      r_squared: 0.65,
      sample_size: 14
    },
    am_peak: {
      rate: 2.13,
      equation: null,
      r_squared: 0.58,
      sample_size: 8,
      entering: 76,
      exiting: 24
    },
    pm_peak: {
      rate: 3.75,
      equation: null,
      r_squared: 0.6,
      sample_size: 14,
      entering: 47,
      exiting: 53
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "848": {
    code: "848",
    name: "Tire Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 27.69,
      equation: null,
      r_squared: 0.62,
      sample_size: 13
    },
    am_peak: {
      rate: 2.1,
      equation: null,
      r_squared: 0.55,
      sample_size: 9,
      entering: 64,
      exiting: 36
    },
    pm_peak: {
      rate: 3.42,
      equation: null,
      r_squared: 0.58,
      sample_size: 10,
      entering: 42,
      exiting: 58
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "850": {
    code: "850",
    name: "Supermarket",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 93.84,
      equation: { type: "log", a: 0.55, b: 3.52 },
      r_squared: 0.8,
      sample_size: 22
    },
    am_peak: {
      rate: 2.86,
      equation: null,
      r_squared: 0.75,
      sample_size: 34,
      entering: 59,
      exiting: 41
    },
    pm_peak: {
      rate: 8.95,
      equation: null,
      r_squared: 0.67,
      sample_size: 104,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "851": {
    code: "851",
    name: "Convenience Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 762.28,
      equation: null,
      r_squared: 0.53,
      sample_size: 8
    },
    am_peak: {
      rate: 62.54,
      equation: null,
      r_squared: 0.4,
      sample_size: 39,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 49.11,
      equation: null,
      r_squared: 0.42,
      sample_size: 39,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
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
      sample_size: undefined,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 38.92,
      equation: null,
      r_squared: 0.45,
      sample_size: undefined,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "857": {
    code: "857",
    name: "Discount Club",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 42.46,
      equation: null,
      r_squared: 0.75,
      sample_size: 20
    },
    am_peak: {
      rate: 0.8,
      equation: null,
      r_squared: 0.68,
      sample_size: 5,
      entering: 61,
      exiting: 39
    },
    pm_peak: {
      rate: 4.19,
      equation: null,
      r_squared: 0.7,
      sample_size: 32,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
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
      rate: 0.55,
      equation: null,
      r_squared: 0.52,
      sample_size: 1,
      entering: 67,
      exiting: 33
    },
    pm_peak: {
      rate: 1.76,
      equation: null,
      r_squared: 0.54,
      sample_size: 2,
      entering: 53,
      exiting: 47
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "861": {
    code: "861",
    name: "Sporting Goods Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 23.78,
      equation: null,
      r_squared: 0.79,
      sample_size: 8
    },
    am_peak: {
      rate: 0.77,
      equation: null,
      r_squared: 0.6,
      sample_size: 1,
      entering: 83,
      exiting: 17
    },
    pm_peak: {
      rate: 3.14,
      equation: null,
      r_squared: 0.62,
      sample_size: 1,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "862": {
    code: "862",
    name: "Home Improvement Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 30.74,
      equation: null,
      r_squared: 0.72,
      sample_size: 19
    },
    am_peak: {
      rate: 1.51,
      equation: null,
      r_squared: 0.65,
      sample_size: 51,
      entering: 57,
      exiting: 43
    },
    pm_peak: {
      rate: 2.29,
      equation: null,
      r_squared: 0.68,
      sample_size: 62,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "863": {
    code: "863",
    name: "Electronics Superstore",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 41.05,
      equation: null,
      r_squared: 0.8,
      sample_size: 5
    },
    am_peak: {
      rate: 0.27,
      equation: null,
      r_squared: 0.62,
      sample_size: 2,
      entering: 60,
      exiting: 40
    },
    pm_peak: {
      rate: 5.2,
      equation: null,
      r_squared: 0.65,
      sample_size: 2,
      entering: 48,
      exiting: 52
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
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
      sample_size: undefined,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 3.55,
      equation: null,
      r_squared: 0.6,
      sample_size: 5,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
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
      r_squared: 0.6,
      sample_size: undefined,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 2.77,
      equation: null,
      r_squared: 0.62,
      sample_size: 5,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "868": {
    code: "868",
    name: "Book Superstore",
    category: "Retail",
    unit: "1000 SF GLA",
    weekday: {
      rate: 143.6,
      equation: null,
      r_squared: 0.62,
      sample_size: 1
    },
    am_peak: {
      rate: 1.27,
      equation: null,
      r_squared: 0.55,
      sample_size: 1,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 15.83,
      equation: null,
      r_squared: 0.58,
      sample_size: 2,
      entering: 52,
      exiting: 48
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
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
      sample_size: 7,
      entering: 64,
      exiting: 36
    },
    pm_peak: {
      rate: 1.95,
      equation: null,
      r_squared: 0.68,
      sample_size: 16,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "879": {
    code: "879",
    name: "Arts and Crafts Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 56.55,
      equation: null,
      r_squared: 0.62,
      sample_size: 1
    },
    am_peak: {
      rate: 0.72,
      equation: null,
      r_squared: 0.55,
      sample_size: undefined,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 6.21,
      equation: null,
      r_squared: 0.58,
      sample_size: 2,
      entering: 46,
      exiting: 54
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "880": {
    code: "880",
    name: "Pharmacy/Drugstore without Drive-Through",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 90.08,
      equation: null,
      r_squared: 0.73,
      sample_size: 6
    },
    am_peak: {
      rate: 2.94,
      equation: null,
      r_squared: 0.89,
      sample_size: 7,
      entering: 65,
      exiting: 35
    },
    pm_peak: {
      rate: 8.51,
      equation: null,
      r_squared: 0.65,
      sample_size: 13,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "881": {
    code: "881",
    name: "Pharmacy/Drugstore with Drive-Through",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 108.4,
      equation: null,
      r_squared: 0.51,
      sample_size: 16
    },
    am_peak: {
      rate: 3.74,
      equation: null,
      r_squared: 0.65,
      sample_size: 21,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 10.25,
      equation: null,
      r_squared: 0.68,
      sample_size: 39,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
  "890": {
    code: "890",
    name: "Furniture/Flooring Store",
    category: "Retail",
    unit: "1000 SF GFA",
    weekday: {
      rate: 6.3,
      equation: null,
      r_squared: 0.67,
      sample_size: 19
    },
    am_peak: {
      rate: 0.26,
      equation: null,
      r_squared: 0.58,
      sample_size: 20,
      entering: 71,
      exiting: 29
    },
    pm_peak: {
      rate: 0.52,
      equation: null,
      r_squared: 0.52,
      sample_size: 26,
      entering: 47,
      exiting: 53
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 800s Modal Data Plots"
  },
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
      sample_size: undefined,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 13.24,
      equation: null,
      r_squared: 0.5,
      sample_size: undefined,
      entering: 45,
      exiting: 55
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
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
      sample_size: undefined,
      entering: 55,
      exiting: 45
    },
    pm_peak: {
      rate: 12.13,
      equation: null,
      r_squared: 0.48,
      sample_size: 3,
      entering: 44,
      exiting: 56
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "912": {
    code: "912",
    name: "Drive-In Only Bank",
    category: "Services",
    unit: "Service Positions",
    weekday: {
      rate: 125.03,
      equation: null,
      r_squared: 0.55,
      sample_size: 20
    },
    am_peak: {
      rate: 8.54,
      equation: null,
      r_squared: 0.59,
      sample_size: 36,
      entering: 61,
      exiting: 39
    },
    pm_peak: {
      rate: 27.07,
      equation: null,
      r_squared: 0.45,
      sample_size: 109,
      entering: 49,
      exiting: 51
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "930": {
    code: "930",
    name: "Fast Casual Restaurant",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 97.14,
      equation: null,
      r_squared: 0.72,
      sample_size: 1
    },
    am_peak: {
      rate: 1.43,
      equation: null,
      r_squared: 0.65,
      sample_size: 1,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 12.55,
      equation: null,
      r_squared: 0.65,
      sample_size: 15,
      entering: 55,
      exiting: 45
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "931": {
    code: "931",
    name: "Fine Dining Restaurant",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 2.6,
      equation: null,
      r_squared: 0.59,
      sample_size: 6
    },
    am_peak: {
      rate: 0.02,
      equation: null,
      r_squared: 0.55,
      sample_size: 5,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 0.28,
      equation: null,
      r_squared: 0.62,
      sample_size: 11,
      entering: 67,
      exiting: 33
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "932": {
    code: "932",
    name: "High-Turnover (Sit-Down) Restaurant",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 4.37,
      equation: null,
      r_squared: 0.75,
      sample_size: 1
    },
    am_peak: {
      rate: 0.45,
      equation: null,
      r_squared: 0.58,
      sample_size: 7,
      entering: 52,
      exiting: 48
    },
    pm_peak: {
      rate: 0.39,
      equation: null,
      r_squared: 0.7,
      sample_size: 14,
      entering: 57,
      exiting: 43
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "933": {
    code: "933",
    name: "Fast Food Restaurant without Drive-Through",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 42.12,
      equation: null,
      r_squared: 0.62,
      sample_size: 1
    },
    am_peak: {
      rate: 43.18,
      equation: null,
      r_squared: 0.55,
      sample_size: 3,
      entering: 58,
      exiting: 42
    },
    pm_peak: {
      rate: 33.21,
      equation: null,
      r_squared: 0.53,
      sample_size: 8,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "934": {
    code: "934",
    name: "Fast Food Restaurant with Drive-Through",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 19.52,
      equation: { type: "log", a: 0.65, b: 3.95 },
      r_squared: 0.78,
      sample_size: 10
    },
    am_peak: {
      rate: 0.12,
      equation: null,
      r_squared: 0.72,
      sample_size: 5,
      entering: 54,
      exiting: 46
    },
    pm_peak: {
      rate: 0.04,
      equation: null,
      r_squared: 0.74,
      sample_size: 14,
      entering: 53,
      exiting: 47
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "936": {
    code: "936",
    name: "Coffee/Donut Shop without Drive-Through",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 600,
      equation: null,
      r_squared: 0.52,
      sample_size: 15
    },
    am_peak: {
      rate: 10.79,
      equation: null,
      r_squared: 0.48,
      sample_size: 1,
      entering: 53,
      exiting: 47
    },
    pm_peak: {
      rate: 4.26,
      equation: null,
      r_squared: 0.5,
      sample_size: 1,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "937": {
    code: "937",
    name: "Coffee/Donut Shop with Drive-Through",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 533.57,
      equation: null,
      r_squared: 0.55,
      sample_size: 6
    },
    am_peak: {
      rate: 0.15,
      equation: null,
      r_squared: 0.5,
      sample_size: 10,
      entering: 51,
      exiting: 49
    },
    pm_peak: {
      rate: 0.06,
      equation: null,
      r_squared: 0.52,
      sample_size: 8,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "938": {
    code: "938",
    name: "Coffee/Donut Shop with Drive-Through Only",
    category: "Services",
    unit: "1000 SF GFA",
    weekday: {
      rate: 179,
      equation: null,
      r_squared: 0.48,
      sample_size: 8
    },
    am_peak: {
      rate: 39.81,
      equation: null,
      r_squared: 0.58,
      sample_size: 20,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 15.08,
      equation: null,
      r_squared: 0.45,
      sample_size: 8,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "941": {
    code: "941",
    name: "Quick Lubrication Vehicle Shop",
    category: "Services",
    unit: "Service Bays",
    weekday: {
      rate: 40,
      equation: null,
      r_squared: 0.58,
      sample_size: 1
    },
    am_peak: {
      rate: 3,
      equation: null,
      r_squared: 0.52,
      sample_size: 1,
      entering: 67,
      exiting: 33
    },
    pm_peak: {
      rate: 4.85,
      equation: null,
      r_squared: 0.55,
      sample_size: 10,
      entering: 56,
      exiting: 44
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
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
      rate: 1.52,
      equation: null,
      r_squared: 0.55,
      sample_size: 1,
      entering: 68,
      exiting: 32
    },
    pm_peak: {
      rate: 2.17,
      equation: null,
      r_squared: 0.58,
      sample_size: 1,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "944": {
    code: "944",
    name: "Gas Station",
    category: "Services",
    unit: "Fueling Positions",
    weekday: {
      rate: 172.01,
      equation: null,
      r_squared: 0.68,
      sample_size: 18
    },
    am_peak: {
      rate: 10.28,
      equation: null,
      r_squared: 0.62,
      sample_size: 53,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 13.91,
      equation: null,
      r_squared: 0.65,
      sample_size: 65,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "945": {
    code: "945",
    name: "Gas Station with Convenience Market",
    category: "Services",
    unit: "Fueling Positions",
    weekday: {
      rate: 345.75,
      equation: null,
      r_squared: 0.72,
      sample_size: 1
    },
    am_peak: {
      rate: 31.6,
      equation: null,
      r_squared: 0.65,
      sample_size: 29,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 26.9,
      equation: null,
      r_squared: 0.68,
      sample_size: 29,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "946": {
    code: "946",
    name: "Gas Station with Convenience Market and Car Wash",
    category: "Services",
    unit: "Fueling Positions",
    weekday: {
      rate: 245.68,
      equation: null,
      r_squared: 0.7,
      sample_size: 35
    },
    am_peak: {
      rate: 18.24,
      equation: null,
      r_squared: 0.62,
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 21.35,
      equation: null,
      r_squared: 0.65,
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "947": {
    code: "947",
    name: "Self-Service Car Wash",
    category: "Services",
    unit: "Stalls",
    weekday: {
      rate: 108,
      equation: null,
      r_squared: 0.55,
      sample_size: 1
    },
    am_peak: {
      rate: 4.82,
      equation: null,
      r_squared: 0.48,
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 5.54,
      equation: null,
      r_squared: 0.52,
      sample_size: 6,
      entering: 51,
      exiting: 49
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  },
  "948": {
    code: "948",
    name: "Automated Car Wash",
    category: "Services",
    unit: "Stalls",
    weekday: {
      rate: 135,
      equation: null,
      r_squared: 0.58,
      sample_size: 18
    },
    am_peak: {
      rate: 6.25,
      equation: null,
      r_squared: 0.52,
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 14.2,
      equation: null,
      r_squared: 0.55,
      sample_size: 1,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
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
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    pm_peak: {
      rate: 16.24,
      equation: null,
      r_squared: 0.68,
      sample_size: undefined,
      entering: 50,
      exiting: 50
    },
    source: "ITE 12th Edition",
    page_ref: "ITE 12th Ed. - 900s Modal Data Plots"
  }
};
