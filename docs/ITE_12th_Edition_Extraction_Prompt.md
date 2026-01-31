# ITE Trip Generation 12th Edition - Complete Data Extraction Prompt

## Purpose
This prompt is designed for use with Claude Code Chrome extension to extract ALL trip generation data from the ITETripGen web application (ITE Trip Generation Manual, 12th Edition).

---

## Extraction Prompt

```
OBJECTIVE: Extract ALL trip generation data from the ITETripGen web application (ITE Trip Generation Manual, 12th Edition) for every available land use code, trip type, time period, setting, and independent variable.

=== COMPLETE LAND USE CODES TO EXTRACT (176 codes) ===

PORT, FREIGHT, TERMINAL (000-099):
021, 030, 035, 090

INDUSTRIAL (100-199):
110, 130, 140, 150, 151, 154, 155, 156, 157, 160, 170, 175, 180, 190

RESIDENTIAL (200-299):
210, 215, 220, 221, 222, 223, 225, 226, 227, 230, 231, 232, 240, 251, 252, 253, 254, 255, 260, 265

LODGING (300-399):
310, 311, 312, 320, 330

RECREATIONAL (400-499):
411, 414, 416, 430, 431, 432, 433, 434, 435, 436, 437, 440, 445, 452, 453, 454, 462, 465, 466, 470, 473, 482, 488, 489, 490, 491, 492, 493, 494, 495

INSTITUTIONAL (500-599):
501, 520, 522, 525, 528, 530, 532, 534, 536, 538, 539, 540, 550, 560, 561, 562, 565, 566, 571, 575, 580, 590

MEDICAL (600-699):
610, 620, 630, 640, 650

OFFICE (700-799):
710, 712, 714, 715, 720, 730, 731, 732, 750, 760, 770

RETAIL (800-899):
810, 811, 812, 813, 814, 815, 816, 817, 820, 821, 822, 823, 840, 841, 842, 843, 848, 849, 850, 851, 857, 858, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 872, 875, 876, 879, 880, 881, 882, 890, 895, 897, 899

SERVICES (900-999):
911, 912, 918, 920, 926, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 941, 942, 943, 944, 945, 947, 948, 949, 955, 960, 970, 971, 975

=== EXTRACTION PARAMETERS ===

For EACH land use code, extract data for ALL available combinations of:

TRIP TYPES:
- Vehicle
- Person
- Pedestrian (Walk)
- Bicycle
- Transit
- Truck

TIME PERIODS:
- Weekday (Daily)
- Weekday AM Peak Hour of Adjacent Street Traffic
- Weekday AM Peak Hour of Generator
- Weekday PM Peak Hour of Adjacent Street Traffic
- Weekday PM Peak Hour of Generator
- Saturday Daily
- Saturday Peak Hour
- Sunday Daily
- Sunday Peak Hour

LOCATION SETTINGS:
- General Urban/Suburban
- Dense Multi-Use Urban
- Center City Core
- Rural

LAND USE SUBCATEGORIES:
- All Sites
- Close to Rail Transit
- Not Close to Rail Transit

INDEPENDENT VARIABLES (capture all available for each land use):
- 1000 Sq. Ft. GFA (Gross Floor Area)
- 1000 Sq. Ft. GLA (Gross Leasable Area)
- Dwelling Units
- Occupied Dwelling Units
- Beds
- Rooms
- Employees
- Students
- Acres
- Parking Spaces
- Fueling Positions
- Vehicle Service Positions
- Holes (golf)
- Screens (cinema)
- Seats
- VRU (Vehicle Rental Units)
- Any other IV specific to the land use

=== DATA FIELDS TO EXTRACT ===

For each combination, extract:

IDENTIFICATION:
- land_use_code (3-digit string: "210", "820", etc.)
- land_use_name (full name)
- land_use_group (category name)
- land_use_subcategory (All Sites, Close to Rail Transit, Not Close to Rail Transit)
- location_setting
- independent_variable (name and unit)
- time_period
- trip_type

STATISTICS:
- number_of_studies (sample size as integer)
- avg_iv_units (average independent variable value from studies)
- average_rate (trips per unit of IV)
- rate_range_low (minimum rate)
- rate_range_high (maximum rate)
- standard_deviation
- R_square_value (coefficient of determination, 0.00-1.00)

FITTED CURVE:
- fitted_curve_type (Linear, Logarithmic, Polynomial, etc.)
- fitted_curve_equation (full equation string: "T = 1.02x + 5.43" or "Ln(T) = 0.89Ln(X) + 2.14")

DIRECTIONAL DISTRIBUTION:
- entering_percent (% of trips entering)
- exiting_percent (% of trips exiting)

PASS-BY/DIVERTED (for retail land uses):
- pass_by_percent
- diverted_percent
- primary_percent

INTERNAL CAPTURE (if available):
- internal_capture_percent

=== OUTPUT JSON STRUCTURE ===

Output must be valid JSON matching this structure for tool compatibility:

{
  "metadata": {
    "source": "ITE Trip Generation Manual, 12th Edition",
    "extraction_date": "YYYY-MM-DD",
    "total_land_use_codes": 176
  },
  "data": {
    "[LAND_USE_CODE]": {
      "name": "[Land Use Name]",
      "group": "[Category]",
      "default_iv": "[Primary Independent Variable]",
      "vehicle": {
        "weekday": {
          "rate": [number],
          "entering": [percent as integer 0-100],
          "exiting": [percent as integer 0-100],
          "sample_size": [integer],
          "standard_deviation": [number or null],
          "fitted_curve_equation": "[string or null]",
          "R_square_value": [number 0-1 or null],
          "rate_range": {"low": [number], "high": [number]},
          "independent_variable": "[IV name]"
        },
        "am_peak": { ... },
        "pm_peak": { ... },
        "saturday": { ... },
        "sunday": { ... }
      },
      "person": {
        "weekday": { ... },
        "am_peak": { ... },
        "pm_peak": { ... }
      },
      "walk": {
        "am_peak": { ... },
        "pm_peak": { ... }
      },
      "bicycle": {
        "am_peak": { ... },
        "pm_peak": { ... }
      },
      "transit": {
        "am_peak": { ... },
        "pm_peak": { ... }
      },
      "walk_bike_transit": {
        "am_peak": { ... },
        "pm_peak": { ... }
      },
      "truck": {
        "weekday": { ... }
      },
      "settings": {
        "general_urban_suburban": { ... },
        "dense_multi_use_urban": { ... },
        "center_city_core": { ... },
        "rural": { ... }
      },
      "subcategories": {
        "all_sites": { ... },
        "close_to_rail": { ... },
        "not_close_to_rail": { ... }
      },
      "pass_by": {
        "percent": [number or null],
        "applicable": [boolean]
      },
      "alternative_ivs": {
        "[IV_NAME]": {
          "vehicle": { ... }
        }
      }
    }
  }
}

=== EXTRACTION INSTRUCTIONS ===

1. Navigate to ITETripGen web application
2. Set Data Source to "Trip Generation Manual, 12th Ed"
3. For each land use code in the complete list above:
   a. Select the land use code
   b. Iterate through ALL available settings (General Urban/Suburban, etc.)
   c. Iterate through ALL available subcategories
   d. Iterate through ALL available independent variables
   e. Iterate through ALL available time periods
   f. Iterate through ALL available trip types
   g. Record ALL data fields for each combination
   h. If data is unavailable for a combination, record as null (do not skip)

4. Handle missing data:
   - If no data exists for a trip type/time period combination, set to null
   - If fitted curve unavailable, set fitted_curve_equation and R_square_value to null
   - If directional distribution unavailable, default to entering: 50, exiting: 50

5. Data validation:
   - Verify entering + exiting percentages sum to 100
   - Verify rates are non-negative
   - Verify sample sizes are positive integers

=== PRIORITY ORDER ===

Extract in this priority:
1. Vehicle trips (all time periods, all settings)
2. Person trips (all time periods)
3. Walk/Bicycle/Transit trips (AM/PM peaks)
4. Truck trips (weekday)
5. Alternative independent variables
6. Pass-by/diverted trip data (retail codes 800-899)

=== NOTES ===

- This is ITE 12th Edition data (August 2025)
- Use input value of 1 unit for rate calculations where required
- Capture both "Peak Hour of Adjacent Street Traffic" and "Peak Hour of Generator" separately when available
- For retail, prioritize GLA over GFA as independent variable
- For residential, use Dwelling Units as primary IV
- For office, use 1000 Sq. Ft. GFA as primary IV
```

---

## Reference

- **Source**: ITE Trip Generation Manual, 12th Edition
- **Total Land Use Codes**: 176
- **Created**: 2026-01-31
- **Tool Compatibility**: Compatible with `/tool/data/` JSON structure
