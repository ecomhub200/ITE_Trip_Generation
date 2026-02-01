# ITE Trip Generation Data Accuracy Verification Prompt

## Chrome Extension Instructions for Systematic Data Validation

**Version:** 1.0
**Last Updated:** 2026-02-01
**Purpose:** Verify accuracy of ITE Trip Generation tool data against official ITE TripGen web application

---

## OVERVIEW

You are a data accuracy verification assistant. Your task is to systematically compare the ITE Trip Generation tool's database values against the official ITE TripGen web application (https://itetripgen.org) to identify discrepancies, missing data, and errors.

**Critical Context:**
- The tool is used by Henrico County, Virginia for traffic impact analysis
- Inaccurate data can lead to incorrect traffic studies and planning decisions
- The primary setting is "General Urban/Suburban" (Henrico's default)
- Data should reflect ITE Trip Generation Manual, 12th Edition

---

## VERIFICATION METHODOLOGY

### Step 1: Access ITE TripGen Application
Navigate to the official ITE TripGen web application. You should see the trip generation lookup interface.

### Step 2: Select Land Use Code
For each land use code being verified:
1. Search for the land use code (e.g., "210" or "Single-Family Detached Housing")
2. Select the code from the results list
3. Note the **exact official name** as displayed

### Step 3: Configure Settings
Set the following parameters to match the tool's default configuration:
- **Setting:** General Urban/Suburban
- **Subcategory:** All Sites (default first check, then verify other subcategories)
- **Trip Type:** Start with Vehicle, then check Person, Walk, Bicycle, Transit, Truck
- **Independent Variable:** Primary variable first, then alternatives

### Step 4: Record Data for Each Time Period
For each trip type and setting combination, record:
- Weekday
- Weekday AM Peak Hour (of adjacent street traffic)
- Weekday PM Peak Hour (of adjacent street traffic)
- Saturday (if available)
- Sunday (if available)

### Step 5: Document All Statistical Fields
For each time period, extract:
- Number of Studies (sample size)
- Average Rate
- Rate Range (Low)
- Rate Range (High)
- Standard Deviation
- Fitted Curve Equation (**CRITICAL: Include full equation with intercept**)
- R² Value
- Entering Percentage
- Exiting Percentage
- Data Plot Points (if visible)

---

## DATA FIELDS TO VERIFY

### A. Land Use Code Identification
| Field | Verification Check |
|-------|-------------------|
| Code Number | Must match 3-digit ITE code exactly |
| Official Name | Must match 12th Edition name verbatim |
| Category/Group | Must be correctly assigned to code range |
| Status | Confirm code is active (not deprecated) in 12th Edition |

### B. Trip Rate Data (Per Time Period)
| Field | Verification Check | Priority |
|-------|-------------------|----------|
| Average Rate | Match to 2 decimal places | CRITICAL |
| Fitted Curve Equation | Full equation including intercept term | CRITICAL |
| R² Value | Match to 2 decimal places | HIGH |
| Number of Studies | Exact match | HIGH |
| Standard Deviation | Match to 2 decimal places | MEDIUM |
| Rate Range Low | Match to 2 decimal places | MEDIUM |
| Rate Range High | Match to 2 decimal places | MEDIUM |
| Entering % | Match to nearest integer | HIGH |
| Exiting % | Match to nearest integer | HIGH |

### C. Fitted Curve Equation Verification
**CRITICAL:** The fitted curve equation is the most common source of accuracy issues.

**Correct Format Examples:**
```
Linear:      T = 8.07(X) + 265.45
Logarithmic: Ln(T) = 0.82Ln(X) + 2.46
```

**Common Errors to Identify:**
- Missing intercept (b value)
- Wrong coefficient (a value)
- Wrong equation type (Linear vs. Logarithmic)
- Missing parentheses or formatting issues
- Truncated decimal precision

### D. Setting and Subcategory Verification
| Setting | Description |
|---------|-------------|
| General Urban/Suburban | Default for Henrico County - VERIFY FIRST |
| Dense Multi-Use Urban | Secondary priority |
| Center City Core | Tertiary priority |
| Rural | If applicable to code |

| Subcategory | Description |
|-------------|-------------|
| All Sites | Default - VERIFY FIRST |
| Close to Rail Transit | If available |
| Not Close to Rail Transit | If available |

---

## VERIFICATION OUTPUT FORMAT

For each land use code verified, generate a structured report:

```json
{
  "verification_date": "2026-02-01",
  "verified_by": "Claude Chrome Extension",
  "land_use_code": "210",
  "official_name": "Single-Family Detached Housing",
  "database_name": "Single-Family Detached Housing",
  "name_match": true,
  "code_status": "ACTIVE",

  "settings_verified": [
    {
      "setting": "General Urban/Suburban",
      "subcategory": "All Sites",
      "trip_type": "Vehicle",
      "independent_variable": "Dwelling Units",

      "periods": {
        "weekday": {
          "database_values": {
            "average_rate": 9.43,
            "fitted_curve": "T = 9.43(X)",
            "r_squared": 0.92,
            "num_studies": 350,
            "entering_pct": 50,
            "exiting_pct": 50
          },
          "official_values": {
            "average_rate": 9.09,
            "fitted_curve": "T = 8.07(X) + 265.45",
            "r_squared": 0.87,
            "num_studies": 155,
            "entering_pct": 50,
            "exiting_pct": 50
          },
          "discrepancies": [
            {
              "field": "average_rate",
              "database": 9.43,
              "official": 9.09,
              "variance": 0.34,
              "variance_pct": 3.74,
              "severity": "MEDIUM"
            },
            {
              "field": "fitted_curve",
              "database": "T = 9.43(X)",
              "official": "T = 8.07(X) + 265.45",
              "issue": "Missing intercept term",
              "severity": "CRITICAL"
            },
            {
              "field": "num_studies",
              "database": 350,
              "official": 155,
              "variance": 195,
              "severity": "HIGH"
            }
          ]
        },
        "weekday_am_peak": { ... },
        "weekday_pm_peak": { ... }
      }
    }
  ],

  "overall_accuracy_score": 65,
  "critical_issues": 2,
  "high_issues": 1,
  "medium_issues": 1,
  "recommendations": [
    "Update fitted curve equation to include intercept term",
    "Verify sample size with official ITE source",
    "Recalculate average rate from official data"
  ]
}
```

---

## DISCREPANCY SEVERITY CLASSIFICATION

### CRITICAL (Must Fix Immediately)
- Fitted curve equation missing intercept
- Wrong equation type (Linear vs. Logarithmic)
- Average rate difference > 10%
- Coefficient difference > 10%
- Wrong independent variable unit
- Deprecated code still in database
- Missing code that exists in 12th Edition

### HIGH (Should Fix Soon)
- Average rate difference 5-10%
- R² value difference > 0.10
- Sample size significant difference (> 50%)
- Wrong land use name
- Wrong category assignment
- Entering/Exiting split mismatch

### MEDIUM (Should Review)
- Average rate difference 2-5%
- Standard deviation difference > 20%
- Rate range mismatch
- R² difference 0.05-0.10
- Missing time period data

### LOW (Monitor)
- Minor naming variations (capitalization, punctuation)
- Decimal precision differences (< 2%)
- Missing weekend data (Saturday/Sunday)
- Optional field not populated

---

## PRIORITY VERIFICATION ORDER

### Tier 1: High-Usage Residential Codes (Verify First)
| Code | Name | Justification |
|------|------|---------------|
| 210 | Single-Family Detached Housing | Most common residential |
| 220 | Multifamily Housing (Low-Rise) | Common apartment type |
| 221 | Multifamily Housing (Mid-Rise) | Urban apartments |
| 222 | Multifamily Housing (High-Rise) | High-density development |
| 215 | Single-Family Attached Housing | Townhouses |
| 230 | Mid-Rise Residential with 1st-Floor Commercial | Mixed use |
| 240 | Mobile Home Park | Manufactured housing |
| 251 | Senior Adult Housing - Detached | Age-restricted |
| 252 | Senior Adult Housing - Attached | Age-restricted |

### Tier 2: Commercial/Office Codes
| Code | Name | Justification |
|------|------|---------------|
| 710 | General Office Building | Standard office |
| 714 | Corporate Headquarters Building | Large employers |
| 715 | Single-Tenant Office Building | Common office type |
| 720 | Medical-Dental Office Building | Healthcare offices |
| 750 | Office Park | Multi-building developments |
| 760 | Research and Development Center | Tech employment |
| 770 | Business Park | Mixed office/light industrial |

### Tier 3: Retail Codes
| Code | Name | Justification |
|------|------|---------------|
| 820 | Shopping Center | Most common retail |
| 850 | Supermarket | High trip generator |
| 857 | Discount Club | Warehouse retail |
| 860 | Wholesale Market | Large format retail |
| 861 | Sporting Goods Superstore | Big box retail |
| 862 | Home Improvement Superstore | High traffic retail |
| 863 | Electronics Superstore | Specialty retail |
| 880 | Pharmacy/Drugstore with Drive-Through | Convenience retail |
| 899 | Regional Shopping Center | Major retail center |

### Tier 4: Institutional/Medical
| Code | Name | Justification |
|------|------|---------------|
| 520 | Elementary School | Education |
| 522 | Middle School/Junior High School | Education |
| 525 | High School | Education |
| 530 | Private School (K-8) | Private education |
| 536 | Private School (K-12) | Private education |
| 540 | Junior/Community College | Higher education |
| 550 | University/College | Major institutions |
| 610 | Hospital | Major medical |
| 620 | Nursing Home | Senior care |
| 630 | Clinic | Walk-in medical |

### Tier 5: Industrial/Special Uses
| Code | Name | Justification |
|------|------|---------------|
| 110 | General Light Industrial | Manufacturing |
| 130 | Industrial Park | Business/industrial |
| 140 | Manufacturing | Production facilities |
| 150 | Warehousing | Distribution |
| 151 | Mini-Warehouse | Self-storage |
| 155 | High-Cube Fulfillment Center Warehouse | E-commerce |
| 156 | High-Cube Cold Storage Warehouse | Cold chain |
| 310 | Hotel | Hospitality |
| 320 | Motel | Hospitality |

---

## SPECIFIC VERIFICATION CHECKS

### Check 1: Fitted Curve Equation Completeness
For each land use code:
1. Extract the official fitted curve equation from ITE TripGen
2. Verify the equation includes:
   - Coefficient (a value)
   - Variable designation (X)
   - Intercept (b value) - **CRITICAL: Often missing!**
   - Equation type indicator (Linear vs. Ln)
3. Compare with database equation
4. Flag any missing components

**Example Check:**
```
Official: T = 8.07(X) + 265.45
Database: T = 9.43(X)
Issue: Missing intercept (+265.45), Wrong coefficient (8.07 vs 9.43)
Severity: CRITICAL
```

### Check 2: Average Rate Calculation Validation
1. Record the official average rate
2. Calculate: (Official - Database) / Official × 100
3. Flag if variance exceeds thresholds:
   - > 10%: CRITICAL
   - 5-10%: HIGH
   - 2-5%: MEDIUM

### Check 3: Sample Size Verification
1. Record official "Number of Studies" value
2. Compare with database sample size
3. Large discrepancies indicate potential data source issues

### Check 4: R² Value Correlation
1. Record official R² value
2. Compare with database R²
3. Verify calculation method choice is appropriate:
   - R² ≥ 0.75: Use fitted curve
   - R² 0.50-0.75: Use fitted curve with caution
   - R² < 0.50: Use average rate only

### Check 5: Directional Split Verification
1. Verify Entering + Exiting = 100%
2. Compare percentages with official values
3. Flag mismatches (common for peak hour data)

### Check 6: Independent Variable Confirmation
1. Verify correct unit of measurement:
   - Dwelling Units (residential)
   - 1000 Sq. Ft. GFA (commercial)
   - Employees (office)
   - Rooms (hotels)
   - Students (schools)
2. Check for alternative IVs available in ITE TripGen

### Check 7: Time Period Completeness
Verify all applicable time periods are present:
- [ ] Weekday
- [ ] Weekday AM Peak Hour
- [ ] Weekday PM Peak Hour
- [ ] Saturday (if available in ITE)
- [ ] Sunday (if available in ITE)

---

## DEPRECATED CODES TO FLAG

The following codes from ITE 11th Edition are **DEPRECATED** in 12th Edition and should be removed from the database:

| Code | Former Name | Status |
|------|-------------|--------|
| 010 | Waterport/Marine Terminal | DEPRECATED |
| 270 | Residential Planned Unit Development | DEPRECATED |
| 420 | Golf Course | DEPRECATED |
| 444 | Movie Theater | DEPRECATED - Merged to 445 |
| 454 | Bowling Alley | DEPRECATED |
| 480 | Amusement Park | DEPRECATED |
| 853 | Convenience Store with Gasoline Pumps | DEPRECATED - Use 945 |
| 910 | Bank/Savings | DEPRECATED |
| 946 | Gasoline/Service Station with Convenience Market | DEPRECATED |
| 960 | Super Convenience Store/Gas Station | DEPRECATED |

**Action:** If any of these codes exist in the database, flag for removal.

---

## MISSING CODES TO ADD

The following codes exist in ITE 12th Edition but may be missing from the database:

### Residential
- 223: Affordable Housing
- 225: Off-Campus Student Apartment
- 226: Military Family Housing
- 227: Recreational Vehicle Park
- 231: Low-Rise Residential with 1st-Floor Commercial
- 232: High-Rise Residential with 1st-Floor Commercial
- 253: Congregate Care Facility (Assisted Living)
- 254: Independent Living Facility
- 265: Timeshare

### Commercial/Retail
- 812: Building Materials and Lumber Store
- 814: Variety Store
- 816: Hardware/Paint Store
- 875: Department Store
- 879: Arts and Crafts Store

### Institutional
- 539: Charter School

### Services
- 926: Food Truck Pod
- 928: Coffee/Donut Shop without Drive-Through
- 929: Coffee/Donut Shop with Drive-Through
- 938: Sit-Down Restaurant (Low-Turnover)
- 939: Sit-Down Restaurant (High-Turnover)

**Action:** Flag these codes as "MISSING - ADD TO DATABASE" if not present.

---

## QUALITY ASSURANCE CHECKLIST

Before completing verification for each code, confirm:

- [ ] Official name matches exactly (case-sensitive)
- [ ] All time periods checked (Weekday, AM Peak, PM Peak)
- [ ] Vehicle trip data verified
- [ ] Fitted curve equation complete with intercept
- [ ] R² value recorded and verified
- [ ] Sample size verified
- [ ] Entering/Exiting percentages sum to 100%
- [ ] Rate ranges (low/high) captured
- [ ] Standard deviation recorded (where available)
- [ ] Alternative independent variables noted
- [ ] Subcategory variants documented
- [ ] Modal data checked (if verifying Walk, Bike, Transit)

---

## REPORTING FORMAT

### Summary Statistics
After verifying a batch of codes, provide:

```
VERIFICATION SUMMARY
====================
Date: 2026-02-01
Codes Verified: 25

Accuracy Overview:
- Perfect Match (100%): 5 codes
- Minor Issues (90-99%): 8 codes
- Moderate Issues (75-89%): 7 codes
- Major Issues (50-74%): 3 codes
- Critical Issues (<50%): 2 codes

Issue Breakdown:
- CRITICAL issues: 4
- HIGH issues: 12
- MEDIUM issues: 18
- LOW issues: 25

Top Issues by Type:
1. Missing fitted curve intercept: 8 occurrences
2. Average rate mismatch: 6 occurrences
3. Sample size discrepancy: 5 occurrences
4. Wrong code name: 3 occurrences
```

### Detailed Findings
For each code with issues, provide:
1. Code number and name
2. Issue description
3. Database value vs. Official value
4. Severity rating
5. Recommended correction

---

## NOTES FOR VERIFICATION

1. **Always verify against the web application** - PDF documents may have different pagination or formatting

2. **Check multiple settings** - Some codes have different rates for Dense Urban vs. General Urban/Suburban

3. **Document page/screen references** - Note where each data point was found for future verification

4. **Handle "Not Available" gracefully** - If ITE TripGen shows "N/A" for a field, document it rather than assuming error

5. **Verify pass-by trip data** - For retail codes (800-899), also check pass-by trip percentages

6. **Check for data updates** - ITE periodically updates rates; verify against the most current data

7. **Modal data secondary** - Prioritize Vehicle trip verification; modal data (Walk, Bike, Transit) is supplementary

8. **Preserve precision** - Record values to the precision shown in ITE TripGen (usually 2 decimal places)

---

## ERROR CORRECTION WORKFLOW

When discrepancies are found:

1. **Document the discrepancy** using the format above
2. **Calculate the impact** - How much would calculations differ?
3. **Recommend the fix** - Provide the correct value
4. **Note the source** - Reference where the correct value was found
5. **Prioritize** - Assign severity for fix ordering

---

## SAMPLE VERIFICATION SESSION

**Verifying Code 210 - Single-Family Detached Housing**

```
1. Navigate to ITE TripGen
2. Search: "210" or "Single-Family"
3. Select: Single-Family Detached Housing (210)
4. Set: General Urban/Suburban, All Sites, Vehicle, Dwelling Units

WEEKDAY DATA:
- Number of Studies: 155
- Average Rate: 9.09 trips/DU
- Rate Range: 4.00 - 21.85
- Standard Deviation: 3.45
- Fitted Curve: T = 8.07(X) + 265.45
- R²: 0.87
- Entering: 50%
- Exiting: 50%

COMPARE TO DATABASE:
- Number of Studies: 350 ❌ (Discrepancy: +195)
- Average Rate: 9.43 ❌ (Discrepancy: +0.34)
- Fitted Curve: T = 9.43(X) ❌ (Missing intercept)
- R²: 0.92 ❌ (Discrepancy: +0.05)

FINDINGS:
- CRITICAL: Fitted curve missing intercept (+265.45)
- HIGH: Sample size significantly inflated
- MEDIUM: Average rate overestimated by 3.7%
- MEDIUM: R² value slightly different

RECOMMENDED CORRECTIONS:
1. Update fitted_curve to: "T = 8.07(X) + 265.45"
2. Update num_studies to: 155
3. Update average_rate to: 9.09
4. Update r_squared to: 0.87
```

---

## CONCLUSION

This verification prompt enables systematic comparison of the ITE Trip Generation tool's database against official ITE TripGen data. By following this methodology, all 176 land use codes can be verified for accuracy, with clear prioritization and issue classification to guide correction efforts.

**Key Focus Areas:**
1. Fitted curve equation completeness (especially intercept terms)
2. Average rate accuracy
3. Sample size verification
4. R² value correlation
5. Land use code naming and status

Regular verification ensures the tool provides accurate traffic impact analyses for Henrico County planning decisions.

---

*End of Data Accuracy Verification Prompt*
