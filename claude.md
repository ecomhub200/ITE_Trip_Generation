# ITE Trip Generation Analysis - Claude Instructions

## Overview
This project provides ITE (Institute of Transportation Engineers) Trip Generation analysis for Henrico County, Virginia. The analysis calculates vehicle trips for proposed developments and generates professional reports with threshold compliance checks.

---

## CRITICAL: Document Search Strategy to Avoid Context Limits

### Step 1: Always Start Here
Read this `claude.md` file first for all analysis parameters and instructions.

### Step 2: Document Hierarchy
**ONLY search the `Desk Reference Complete.pdf` FIRST** to identify:
- The ITE code (3-digit number)
- The land use category
- Basic trip generation rates

**Location:** `/docs/Trip Generation Module_12th_edition/Desk Reference Complete.pdf`

### Step 3: Targeted Document Search
Once you have the ITE code, **ONLY search the specific category file**:

| ITE Code Range | Search ONLY This File |
|----------------|----------------------|
| 000-199 | `000s - Port, Freight, and Terminal - Modal Data Plots.pdf` |
| 200-299 | `200s - Residential - Modal Data Plots.pdf` |
| 300-399 | `300s - Lodging - Modal Data Plots.pdf` |
| 400-499 | `400s - Recreational - Modal Data Plots.pdf` |
| 500-599 | `500s - Institutional - Modal Data Plots.pdf` |
| 600-699 | `600s - Medical - Modal Data Plots.pdf` |
| 700-799 | `700s - Office - Modal Data Plots.pdf` |
| 800-899 | `800s - Retail - Modal Data Plots.pdf` |
| 900-999 | `900s - Services - Modal Data Plots.pdf` |

**Data Plot Files Location:** `/docs/Trip_generation_data_plot/`

### Additional Reference Documents
| Document | Location | Purpose |
|----------|----------|---------|
| Chapter 6 - Description of Data Plot Pages | `/docs/Trip Generation Module_12th_edition/` | Understanding data plots |
| Chapter 8 - Approaches for Estimating Trip Generation | `/docs/Trip Generation Module_12th_edition/` | Calculation methodologies |
| How Do I Calculate Trip Generation with ITETripGen.pdf | `/docs/` | Tutorial guide |
| Land Uses with Modal Trip Generation Data Plots.pdf | `/docs/Trip_generation_data_plot/` | Index of land uses |

---

## EXTRACTING DATA FROM ITE PLOTS (Critical for Accuracy)

### What to Look For in Each Data Plot

**IMPORTANT:** Always find the **Person Trip type AM and PM**. Do NOT look for:
- Walk+Bike+Transit Trip
- Walk Trip
- Bike Trip

### Average Rate Box (Always Present)
- **Format:** `Average Rate: X.XX`
- **Location:** Above the graph
- **Use when:** R² < 0.50 or no equation exists

### Fitted Curve Equation (When R² ≥ 0.50)
- **Format:** `T = aX + b` or `Ln(T) = aLn(X) + b`
- **Location:** Below the graph
- **MORE ACCURATE** than average rate
- **Example:** `T = 9.43(X) + 15.32`

### Key Statistics to Extract
| Statistic | Description |
|-----------|-------------|
| Sample Size (N) | Number of study sites |
| R² value | Coefficient of determination |
| Standard Deviation | Data spread measure |
| Directional Split | % entering, % exiting |
| Time Period | Weekday, AM Peak, PM Peak |
| Independent Variable | Dwelling units, 1000 sq ft, etc. |

---

## Decision Tree for Trip Calculation

```
IF R² ≥ 0.75 AND Equation exists:
    USE: Fitted Curve Equation (MOST ACCURATE)
ELIF R² ≥ 0.50 AND Equation exists:
    USE: Fitted Curve Equation with caution note
ELIF Average Rate exists:
    USE: Weighted Average Rate
ELSE:
    FLAG: "Insufficient data - manual review needed"
```

---

## Trip Calculation Formulas

### Using Fitted Curve Equation
**Linear:** `T = a(X) + b`
- Where: T = trips, X = size, a = coefficient, b = intercept
- **Example:** 50 dwelling units, equation T = 9.43(X) + 15.32
- `T = 9.43(50) + 15.32 = 486.82 trips`

### Using Average Rate
**Formula:** `T = Rate × Size`
- **Example:** 50 dwelling units, rate = 9.43
- `T = 9.43 × 50 = 471.5 trips`

### Directional Splits (Extract from Plot)
| Time Period | Typical Residential | Note |
|-------------|---------------------|------|
| AM Peak | 25% entering, 75% exiting | Verify with actual plot data |
| PM Peak | 65% entering, 35% exiting | Verify with actual plot data |

**ALWAYS check the specific plot for actual percentages**

---

## Henrico County Thresholds (Automatic Warning Triggers)

| Condition | Threshold | Action |
|-----------|-----------|--------|
| AM or PM Peak Hour | > 100 trips/hour | Trigger Warning |
| Weekday Daily | > 1,000 trips | Trigger Warning |
| Sample Size | < 5 sites | Flag low confidence |
| R² Value | < 0.50 | Flag poor correlation |

### TIA (Traffic Impact Analysis) Requirements
- **County TIA Threshold:** 4,000 vpd (vehicles per day) or more
- **VDOT Threshold:** 5,000 vpd (Henrico uses the lower threshold)
- **Turn Lane Requirements:**
  - Left turn lane: Required on any 4-lane roadway (per DPW Design Manual)
  - Right turn lane: Development specific, at discretion

---

## REQUIRED OUTPUT FORMAT

### Analysis Output Structure
```
DEVELOPMENT: [Name/Type]
ITE CODE: [###] - [Land Use Name]
SIZE: [Number] [Units]
LOCATION: Henrico County (Suburban)

DATA SOURCE QUALITY:
├─ Sample Size: [N] sites
├─ R² Value: [0.XX] [Good/Fair/Poor]
├─ Method Used: [Fitted Curve/Average Rate]
└─ Confidence Level: [High/Medium/Low]

TRIP GENERATION SUMMARY:
├─ Weekday Daily: [X] trips
│   └─ Calculation: [Show formula used]
├─ AM Peak Hour: [X] trips
│   ├─ Entering: [X] ([%])
│   └─ Exiting: [X] ([%])
├─ PM Peak Hour: [X] trips
│   ├─ Entering: [X] ([%])
│   └─ Exiting: [X] ([%])
└─ Average Daily: [Weekday × 1.0 for suburban]

⚠️ THRESHOLD CHECK: [PASS/WARNING]
```

---

## REQUIRED DELIVERABLES

### 1. Summary Table
The table MUST include all of the following columns:

| Column | Sub-columns | Description |
|--------|-------------|-------------|
| Parcel Info | REZ#, PUP#, SIA# | Parcel identification numbers |
| Parcel Size | Zoning Code, Density | Size with zoning information |
| Development Name | - | Name of proposed development |
| ITE Code | - | 3-digit ITE land use code |
| **Trip Generation Summary** | | |
| | Weekday Daily Trips | Show calculation: `4 units × 9.43 trips/unit = 38 trips` |
| | AM Peak Entering | Number of entering trips |
| | AM Peak Exiting | Number of exiting trips |
| | PM Peak Entering | Number of entering trips |
| | PM Peak Exiting | Number of exiting trips |
| | Average Daily Trip | ADT value |
| Threshold Check | - | PASS or FAIL |
| Referenced ITE Page | - | Page number AND document name for verification |

### 2. Executive Summary Format
**Plain text format exactly like this:**

> For **REZ#[number]**, the following is the approximate number of new trips expected by the proposed development of **XX residential units**: Total Weekday trips = **170** (**85 in** and **85 out**).

For commercial/non-residential:
> For **REZ#[number]**, the following is the approximate number of new trips expected by the proposed development of **XX,XXX square feet**: Total Weekday trips = **XXX** (**XX in** and **XX out**).

### 3. Downloadable Excel File
- **File naming convention:** `POD_[YYYY-MM-DD].xlsx` (analysis date)
- Must contain the complete Summary Table
- Formatted for copy/paste to external Excel files

### 4. HTML Report Features
- ✅ Downloadable Excel file
- ✅ Visual threshold summary box
- ✅ Notes section with ITE rates used
- ✅ Professional gradient backgrounds
- ✅ Responsive design
- ✅ Print-ready for PDF export

---

## Fallback Rates (When Graph Data Unavailable)

Use these **memorized suburban rates** as fallback only. Flag as "Preliminary Estimate" when used.

| Code | Land Use (12th Edition) | Weekday Rate | AM Peak | PM Peak |
|------|--------------------------|--------------|---------|---------|
| 210 | Single-Family Detached Housing | 9.43/unit | 0.74/unit | 0.99/unit |
| 220 | Multifamily Housing (Low-Rise) | 7.32/unit | 0.55/unit | 0.67/unit |
| 710 | General Office Building | 9.74/1000sf | 1.15/1000sf | 1.14/1000sf |
| 820 | Shopping Center (>150k) | 37.75/1000sf | 0.94/1000sf | 3.81/1000sf |

---

## ITE Land Use Codes Reference (12th Edition)

### Port, Freight, and Terminal (000-099)
| Code | Land Use Name |
|------|---------------|
| 021 | Commercial Airport |
| 030 | Intermodal Truck Terminal |
| 035 | Parcel Hub Facility |
| 090 | Park-and-Ride Lot with Transit Service |

### Industrial/Agricultural (100-199)
| Code | Land Use Name |
|------|---------------|
| 110 | Light Industrial |
| 130 | Industrial Park |
| 140 | Manufacturing |
| 150 | Fulfillment Center (Sortable) |
| 151 | Mini-Warehouse |
| 154 | High-Cube Fulfillment Center Network Sortation |
| 155 | High-Cube Parcel Hub Logistics Terminal |
| 156 | High-Cube Short-Term Storage |
| 157 | High-Cube Cold Storage |
| 160 | Data Center |
| 170 | Utilities |
| 175 | Large-Scale Solar Facility |
| 180 | Specialty Trade Contractor |
| 190 | Non-Sortable Fulfillment Center |

### Residential (200-299)
| Code | Land Use Name |
|------|---------------|
| 210 | Single-Family Detached Housing |
| 215 | Single-Family Attached Housing |
| 220 | Multifamily Housing (Low-Rise) |
| 221 | Multifamily Housing (Mid-Rise) |
| 222 | Multifamily Housing (High-Rise) |
| 223 | Affordable Housing |
| 225 | Off-Campus Student Apartment (Low-Rise) |
| 226 | Off-Campus Student Apartment (Mid-Rise) |
| 227 | Off-Campus Student Apartment (High-Rise) |
| 230 | Low-Rise Residential with Ground-Floor Commercial |
| 231 | Mid-Rise Residential with Ground-Floor Commercial |
| 232 | High-Rise Residential with Ground-Floor Commercial |
| 240 | Mobile Home Park |
| 251 | Senior Adult Housing—Detached |
| 252 | Senior Adult Housing—Attached |
| 253 | Congregate Care Facility (Independent Living) |
| 254 | Assisted Living |
| 255 | Continuing Care Retirement Community |
| 260 | Recreational Homes |
| 265 | Timeshare |

### Lodging (300-399)
| Code | Land Use Name |
|------|---------------|
| 310 | Hotel |
| 311 | All Suites Hotel |
| 312 | Economy/Limited Service Hotel |
| 320 | Motel |
| 330 | Resort Hotel |

### Recreational (400-499)
| Code | Land Use Name |
|------|---------------|
| 411 | Public Park |
| 414 | Dog Park |
| 416 | Campground/RV Park |
| 430 | Golf Course |
| 431 | Miniature Golf Course |
| 432 | Golf Driving Range |
| 433 | Batting Cages |
| 434 | Rock Climbing Gym |
| 435 | Multipurpose Recreational Facility |
| 436 | Trampoline Park |
| 437 | Bowling Alley |
| 440 | Adult Cabaret |
| 445 | Multiplex Movie Theater |
| 452 | Horse Racetrack |
| 453 | Automobile Racetrack |
| 454 | Sports Stadium |
| 462 | Professional Sports Training Facility |
| 465 | Ice Skating Rink |
| 466 | Snow Ski Area |
| 470 | Bingo/Card Room/Off-Track Betting |
| 473 | Casino |
| 482 | Bingo Hall |
| 488 | Laser Tag |
| 489 | Escape Room |
| 490 | Tennis Courts |
| 491 | Racquet/Tennis Club |
| 492 | Health/Fitness Club |
| 493 | Athletic Club |
| 494 | Fitness/Yoga/Dance Studio |
| 495 | Recreational Community Center |

### Institutional (500-599)
| Code | Land Use Name |
|------|---------------|
| 501 | Military Base |
| 520 | Elementary School |
| 522 | Middle School/Junior High School |
| 525 | High School |
| 528 | School District Office |
| 530 | Private School (K-8) |
| 532 | Private School (K-12) |
| 534 | Private High School |
| 536 | Charter Elementary School |
| 538 | Charter Middle School |
| 539 | Charter High School |
| 540 | Junior/Community College |
| 550 | University/College |
| 560 | Church/Synagogue/Mosque |
| 561 | Synagogue |
| 562 | Mosque |
| 565 | Day Care Center |
| 566 | Cemetery |
| 571 | Prison |
| 575 | Fire Station |
| 580 | Museum |
| 590 | Library |

### Medical (600-699)
| Code | Land Use Name |
|------|---------------|
| 610 | Hospital |
| 620 | Medical-Dental Office Building |
| 630 | Outpatient Clinic |
| 640 | Animal Hospital/Veterinary Clinic |
| 650 | Free-Standing Emergency Room |

### Office (700-799)
| Code | Land Use Name |
|------|---------------|
| 710 | General Office Building |
| 712 | Small Office Building |
| 714 | Corporate Headquarters Building |
| 715 | Single Tenant Office Building |
| 720 | Medical-Dental Office Building |
| 730 | Government Office Building |
| 731 | State Motor Vehicles Department |
| 732 | United States Post Office |
| 750 | Office Park |
| 760 | Research and Development Center |
| 770 | Business Park |

### Retail (800-899)
| Code | Land Use Name |
|------|---------------|
| 810 | Enclosed Mall |
| 811 | Lifestyle/Town Center |
| 812 | Strip Retail Plaza (<40k) |
| 813 | Free-Standing Discount Superstore |
| 814 | Variety Store |
| 815 | Free-Standing Discount Store |
| 816 | Hardware/Paint Store |
| 817 | Nursery (Garden Center) |
| 818 | Shopping Center |
| 820 | Shopping Center (>150k) |
| 821 | Shopping Center (40-150k) |
| 822 | Strip Retail Plaza (40-150k) |
| 823 | Factory Outlet Center |
| 840 | Automobile Sales (New) |
| 841 | Automobile Sales (Used) |
| 842 | Recreational Vehicle Sales |
| 843 | Automobile Parts Sales |
| 848 | Tire Store |
| 849 | Tire Superstore |
| 850 | Supermarket |
| 851 | Convenience Market (Open 24 Hours) |
| 857 | Discount Club |
| 858 | Farmers Market |
| 860 | Wholesale Market |
| 861 | Sporting Goods Superstore |
| 862 | Home Improvement Superstore |
| 863 | Electronics Superstore |
| 864 | Toy/Children's Superstore |
| 865 | Baby Superstore |
| 866 | Pet Supply Superstore |
| 867 | Office Supply Superstore |
| 868 | Book Superstore |
| 869 | Discount Home Furnishing Superstore |
| 872 | Bed and Linen Superstore |
| 875 | Department Store |
| 876 | Apparel Store |
| 879 | Arts and Crafts Store |
| 880 | Pharmacy/Drugstore (no drive-through) |
| 881 | Pharmacy/Drugstore (with drive-through) |
| 882 | Cannabis Dispensary |
| 890 | Cell Phone Store |
| 895 | Copy, Print, and Express Ship Store |
| 897 | Medical Marijuana Dispensary |
| 899 | Smoke and Vape Store |

### Services (900-999)
| Code | Land Use Name |
|------|---------------|
| 911 | Walk-In Bank |
| 912 | Drive-In Bank |
| 918 | Hair Salon |
| 920 | Copy, Print, and Ship Store |
| 926 | Food Cart Pod |
| 929 | Medical/Dental Laboratory |
| 930 | Fast Casual Restaurant |
| 931 | Quality Restaurant |
| 932 | High-Turnover (Sit-Down) Restaurant |
| 933 | Fast Food Restaurant (no drive-through) |
| 934 | Fast Food Restaurant (with drive-through) |
| 935 | Fast Food Restaurant (with drive-through and no indoor seating) |
| 936 | Coffee/Donut Shop (no drive-through) |
| 937 | Coffee/Donut Shop (with drive-through) |
| 938 | Coffee/Donut Shop (with drive-through and no indoor seating) |
| 941 | Quick Lubrication Vehicle Shop |
| 942 | Automobile Care Center |
| 943 | Automobile Parts and Service Center |
| 944 | Gas/Service Station |
| 945 | Gas/Service Station (with Convenience Market) |
| 946 | Gas/Service Station (with Convenience Market and Car Wash) |
| 947 | Self-Service Car Wash |
| 948 | Automated Car Wash |
| 949 | Car Wash and Detail Center |
| 955 | Electric Vehicle Charging Station |
| 960 | Ghost Kitchen |
| 970 | Drinking Place (Bar) |
| 971 | Winery/Tasting Room |
| 975 | Drinking Place with Restaurant |

---

## Changes from 11th to 12th Edition

### New Land Uses Added
| Code | Land Use Name |
|------|---------------|
| 035 | Parcel Hub Facility |
| 175 | Large-Scale Solar Facility |
| 414 | Dog Park |
| 489 | Escape Room |
| 494 | Fitness/Yoga/Dance Studio |
| 539 | Charter High School |
| 929 | Medical/Dental Laboratory |
| 955 | Electric Vehicle Charging Station |
| 960 | Ghost Kitchen |

### Renamed Land Uses
| Code | Old Name (11th Ed) | New Name (12th Ed) |
|------|-------------------|-------------------|
| 150 | Warehouse | Fulfillment Center (Sortable) |
| 190 | Warehousing | Non-Sortable Fulfillment Center |
| 312 | Budget Hotel | Economy/Limited Service Hotel |
| 488 | Amusement Center | Laser Tag |
| 630 | Clinic | Outpatient Clinic |
| 882 | Marijuana Dispensary | Cannabis Dispensary |
| 890 | Furniture Store | Cell Phone Store |
| 918 | Hair Salon | Hair Salon (no change, but updated data) |

### Removed Land Uses
| Code | Land Use Name (Removed) |
|------|------------------------|
| 022 | General Aviation Airport |
| 270 | Residential Planned Unit Development |
| 420 | Marina |
| 480 | Amusement Park |
| 818 | Convenience Market |
| 950 | Truck Stop |

> **Note:** Always verify the land use code in the 12th Edition Desk Reference. If a code appears different than expected, check for renames or removals.

---

## Quality Control Checks

### Always Verify
- [ ] **Units Match:** Dwelling units vs. 1000 sq ft
- [ ] **Time Period:** Weekday vs. Weekend
- [ ] **Setting:** General Urban/Suburban (Henrico default: Suburban)
- [ ] **Trip Type:** Vehicle trips (not person trips)

### Red Flags to Report
| Condition | Action |
|-----------|--------|
| Sample size < 3 | Flag as "very unreliable" |
| R² < 0.25 | Flag as "no correlation" |
| Negative intercept for small developments | Flag for review |
| Rates significantly different from similar land uses | Flag for verification |

---

## Error Prevention Guidelines

1. **Never guess** equation coefficients
2. **Always state** data source quality
3. **Flag** when using fallback rates
4. **Document** calculation method used
5. **Keep top_k at 5 or less** per search query

> **Remember: Accuracy > Speed.** Better to acknowledge data limitations than provide incorrect calculations.

---

## Search Query Optimization

### Effective Queries for Document Search
- `ITE [code] average rate weekday`
- `ITE [code] fitted curve equation`
- `ITE [code] R squared coefficient`
- `ITE [code] directional distribution`
- `ITE [code] sample size`

### Text Patterns to Extract
- `Average Rate = X.XX`
- `Fitted Curve Equation: T =`
- `R² = 0.XX`
- `Directional Distribution: XX% entering, XX% exiting`
- `Number of Studies: XX`

---

## Project File Structure

```
/ITE_Trip_Generation/
├── claude.md                    # This file - Analysis instructions
├── docs/
│   ├── How Do I Calculate Trip Generation with ITETripGen.pdf
│   ├── TIA_Training_materials.pdf
│   ├── Trip Generation Module_12th_edition/
│   │   ├── Chapter 1 - Introduction.pdf
│   │   ├── Chapter 2 - Trip Generation Emerging Trends.pdf
│   │   ├── Chapter 3 - Changes Since the 11th Edition.pdf
│   │   ├── Chapter 4 - Definition of Terms.pdf
│   │   ├── Chapter 5 - Description of Database.pdf
│   │   ├── Chapter 6 - Description of Data Plot Pages and Reported Statistics.pdf
│   │   ├── Chapter 7 - Instructions.pdf
│   │   ├── Chapter 8 - Approaches for Estimating Trip Generation.pdf
│   │   ├── Chapter 9 - Procedure for Manual Updates.pdf
│   │   ├── Chapter 10 - List of Sources.pdf
│   │   └── Desk Reference Complete.pdf          # PRIMARY REFERENCE
│   └── Trip_generation_data_plot/
│       ├── 000s - Port, Freight, and Terminal - Modal Data Plots.pdf
│       ├── 200s - Residential - Modal Data Plots.pdf
│       ├── 300s - Lodging - Modal Data Plots.pdf
│       ├── 400s - Recreational - Modal Data Plots.pdf
│       ├── 500s - Institutional - Modal Data Plots.pdf
│       ├── 600s - Medical - Modal Data Plots.pdf
│       ├── 700s - Office - Modal Data Plots.pdf
│       ├── 800s - Retail - Modal Data Plots.pdf
│       ├── 900s - Services - Modal Data Plots.pdf
│       └── Land Uses with Modal Trip Generation Data Plots.pdf
```

---

## Quick Reference Card

### Calculation Example (Residential)
```
Development: 50-unit apartment complex
ITE Code: 220 (Apartments)
Rate: 7.32 trips/unit

Weekday Daily: 50 units × 7.32 trips/unit = 366 trips
AM Peak: 50 units × 0.55 trips/unit = 28 trips
  - Entering (25%): 7 trips
  - Exiting (75%): 21 trips
PM Peak: 50 units × 0.67 trips/unit = 34 trips
  - Entering (65%): 22 trips
  - Exiting (35%): 12 trips

Threshold Check: PASS (< 1,000 daily, < 100 peak)
TIA Required: NO (< 4,000 vpd)
```

### Calculation Example (Commercial)
```
Development: 10,000 SF retail space
ITE Code: 820 (Shopping Center)
Rate: 37.75 trips/1000 SF

Weekday Daily: 10 × 37.75 trips/1000sf = 378 trips
AM Peak: 10 × 0.94 trips/1000sf = 9 trips
  - Entering (62%): 6 trips
  - Exiting (38%): 3 trips
PM Peak: 10 × 3.81 trips/1000sf = 38 trips
  - Entering (48%): 18 trips
  - Exiting (52%): 20 trips

Threshold Check: PASS (< 1,000 daily, < 100 peak)
TIA Required: NO (< 4,000 vpd)
```

---

*Last Updated: 2026-01-28*
*ITE Trip Generation Manual: 12th Edition*
*Applicable Jurisdiction: Henrico County, Virginia*
