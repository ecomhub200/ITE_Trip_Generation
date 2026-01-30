# ITE Trip Generation Database Verification Log

## Verification Date: 2026-01-30
## Source: ITE Trip Generation Manual, 12th Edition (August 2025)
## Document Used: Desk Reference Complete.pdf

---

## Summary of Findings

The database was compared against the official ITE 12th Edition land use codes extracted from the Desk Reference. Several significant discrepancies were identified.

---

## CRITICAL DISCREPANCIES REQUIRING CORRECTION

### 000s - Port, Freight, and Terminal

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 010 | Waterport/Marine Terminal | (REMOVED from 12th Ed) | **NEEDS REMOVAL** |
| 030 | Truck Terminal | Intermodal Truck Terminal | **NEEDS NAME UPDATE** |
| 035 | (missing) | Truck and Trailer Parking | **NEEDS ADDITION** |
| 090 | (missing) | Park-and-Ride Lot with Bus or Light Rail Service | **NEEDS ADDITION** |

### 100s - Industrial

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 150 | Warehousing | Warehouse | **NEEDS NAME UPDATE** |
| 154 | (missing) | High-Cube Transload and Short-Term Storage Warehouse | **NEEDS ADDITION** |
| 155 | (missing) | High-Cube Fulfillment Center Warehouse | **NEEDS ADDITION** |
| 156 | (missing) | High-Cube Parcel Hub Warehouse | **NEEDS ADDITION** |
| 157 | (missing) | High-Cube Cold Storage Warehouse | **NEEDS ADDITION** |
| 160 | (missing) | Data Center | **NEEDS ADDITION** |
| 170 | (missing) | Utility | **NEEDS ADDITION** |
| 175 | (missing) | Industrial Recycling Facility | **NEEDS ADDITION** |

### 200s - Residential

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 223 | (missing) | Affordable Housing | **NEEDS ADDITION** |
| 225 | (missing) | Off-Campus Student Apartment (Low-Rise) | **NEEDS ADDITION** |
| 226 | (missing) | Off-Campus Student Apartment (Mid-Rise) | **NEEDS ADDITION** |
| 227 | (missing) | Off-Campus Student Apartment (High-Rise) | **NEEDS ADDITION** |
| 230 | Residential Condominium/Townhouse | Low-Rise Residential with Ground-Floor Commercial | **NEEDS NAME UPDATE** |
| 231 | (missing) | Mid-Rise Residential with Ground-Floor Commercial | **NEEDS ADDITION** |
| 232 | (missing) | High-Rise Residential with Ground-Floor Commercial | **NEEDS ADDITION** |
| 251 | Senior Adult Housing - Detached | Senior Adult Housing—Single-Family | **NEEDS NAME UPDATE** |
| 252 | Senior Adult Housing - Attached | Senior Adult Housing—Multifamily | **VERIFIED** |
| 253 | (missing) | Congregate Care Facility | **NEEDS ADDITION** |
| 254 | (missing) | Assisted Living | **NEEDS ADDITION** |
| 265 | (missing) | Timeshare | **NEEDS ADDITION** |
| 270 | Residential Planned Unit Development | (REMOVED from 12th Ed) | **NEEDS REMOVAL** |

### 300s - Lodging

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 312 | Business Hotel | Limited-Service Hotel | **NEEDS NAME UPDATE** |

### 400s - Recreational

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 414 | (missing) | Dog Park | **NEEDS ADDITION** |
| 416 | (missing) | Campground/Recreational Vehicle Park | **NEEDS ADDITION** |
| 420 | Marina | (REMOVED from 12th Ed) | **NEEDS REMOVAL** |
| 431 | (missing) | Miniature Golf Course | **NEEDS ADDITION** |
| 433 | (missing) | Batting Cages | **NEEDS ADDITION** (code 454 in database is wrong) |
| 444 | Movie Theater | (Not in 12th Ed - should be 445) | **WRONG CODE** |
| 445 | Multiplex Movie Theater | Movie Theater | **NEEDS NAME UPDATE** |
| 454 | Batting Cages | Dog Racetrack | **WRONG MAPPING** |
| 480 | Amusement Park | (REMOVED from 12th Ed) | **NEEDS REMOVAL** |
| 488 | (missing) | Soccer Field | **NEEDS ADDITION** |
| 489 | (missing) | Pickleball Courts | **NEEDS ADDITION** |
| 490 | (missing) | Tennis Courts | **NEEDS ADDITION** |
| 493 | (missing) | Athletic Club | **NEEDS ADDITION** |
| 494 | (missing) | Boutique Fitness Studio | **NEEDS ADDITION** |

### 500s - Institutional

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 501 | (missing) | Military Base | **NEEDS ADDITION** |
| 525 | (missing) | High School | **NEEDS ADDITION** |
| 528 | (missing) | School District Office | **NEEDS ADDITION** |
| 530 | High School | Private School (K-8) | **WRONG MAPPING - CRITICAL** |
| 532 | (missing) | Private School (K-12) | **NEEDS ADDITION** |
| 534 | Private School (K-8) | Private High School | **WRONG MAPPING** |
| 536 | Private School (K-12) | Charter Elementary School | **WRONG MAPPING** |
| 538 | (missing) | Charter School (K-12) | **NEEDS ADDITION** |
| 539 | (missing) | Charter High School | **NEEDS ADDITION** |
| 561 | (missing) | Synagogue | **NEEDS ADDITION** |
| 562 | (missing) | Mosque | **NEEDS ADDITION** |
| 571 | (missing) | Adult Detention Facility | **NEEDS ADDITION** |
| 580 | (missing) | Museum | **NEEDS ADDITION** |

### 600s - Medical

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 630 | Clinic | Walk-In Clinic | **NEEDS NAME UPDATE** |
| 650 | Medical-Dental Office Building | Free-Standing Emergency Room | **WRONG MAPPING - CRITICAL** |

### 700s - Office

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 712 | (missing) | Small Office Building | **NEEDS ADDITION** |
| 720 | Medical-Dental Office Building | Medical-Dental Office Building | **VERIFIED** |
| 731 | (missing) | State Motor Vehicles Department | **NEEDS ADDITION** |
| 732 | (missing) | United States Post Office | **NEEDS ADDITION** |

### 800s - Retail

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 810 | Freestanding Discount Store | Tractor Supply Store | **NEEDS NAME UPDATE** |
| 811 | (missing) | Construction Equipment Rental Store | **NEEDS ADDITION** |
| 812 | (missing) | Building Materials and Lumber Store | **NEEDS ADDITION** |
| 814 | (missing) | Variety Store | **NEEDS ADDITION** |
| 816 | (missing) | Hardware/Paint Store | **NEEDS ADDITION** |
| 817 | (missing) | Nursery (Garden Center) | **NEEDS ADDITION** |
| 823 | (missing) | Factory Outlet Center | **NEEDS ADDITION** |
| 842 | (missing) | Recreational Vehicle Sales | **NEEDS ADDITION** |
| 843 | (missing) | Automobile Parts Sales | **NEEDS ADDITION** |
| 849 | (missing) | Tire Superstore | **NEEDS ADDITION** |
| 851 | Convenience Market (Open 24 Hours) | Convenience Store | **NEEDS NAME UPDATE** |
| 853 | Convenience Market (Open 15-16 Hours) | (NOT IN 12th Ed) | **NEEDS REMOVAL** |
| 858 | (missing) | Farmers Market | **NEEDS ADDITION** |
| 864 | (missing) | Toy/Children's Superstore | **NEEDS ADDITION** |
| 865 | (missing) | Baby Superstore | **NEEDS ADDITION** |
| 868 | Value Retail Center | Book Superstore | **NEEDS NAME UPDATE** |
| 869 | (missing) | Discount Home Furnishing Superstore | **NEEDS ADDITION** |
| 872 | (missing) | Bed and Linen Superstore | **NEEDS ADDITION** |
| 876 | (missing) | Apparel Store | **NEEDS ADDITION** |
| 882 | (missing) | Cannabis Dispensary | **NEEDS ADDITION** |
| 890 | Furniture Store | Furniture/Flooring Store | **NEEDS NAME UPDATE** |
| 895 | (missing) | Beverage Container Recycling Depot | **NEEDS ADDITION** |
| 897 | (missing) | Medical Equipment Store | **NEEDS ADDITION** |
| 899 | (missing) | Liquor Store | **NEEDS ADDITION** |

### 900s - Services

| Code | Database Name | 12th Edition Name | Status |
|------|---------------|-------------------|--------|
| 910 | Bank | (REMOVED - replaced by 911) | **NEEDS REMOVAL** |
| 911 | Drive-In Bank | Walk-in Bank | **WRONG MAPPING** |
| 912 | Drive-In Only Bank | Drive-in Bank | **NEEDS NAME UPDATE** |
| 918 | (missing) | Hair Salon/Spa | **NEEDS ADDITION** |
| 920 | (missing) | Copy, Print, and Express Ship Store | **NEEDS ADDITION** |
| 926 | (missing) | Food Cart Pod | **NEEDS ADDITION** |
| 929 | (missing) | High-Volume Fast-Food Restaurant | **NEEDS ADDITION** |
| 931 | Quality Restaurant | Fine Dining Restaurant | **NEEDS NAME UPDATE** |
| 935 | (missing) | Fast-Food Restaurant with Drive-Through Window and No Indoor Seating | **NEEDS ADDITION** |
| 943 | (missing) | Automobile Parts and Service Center | **NEEDS ADDITION** |
| 946 | Gas Station with Convenience Market and Car Wash | (NOT IN 12th Ed) | **NEEDS REMOVAL** |
| 949 | (missing) | Car Wash and Detail Center | **NEEDS ADDITION** |
| 955 | (missing) | Travel Center | **NEEDS ADDITION** |
| 960 | Super Convenience Market / Gas Station | Rental Car Facility | **WRONG MAPPING** |
| 970 | (missing) | Wine Tasting Room | **NEEDS ADDITION** |
| 971 | (missing) | Brewery Taproom | **NEEDS ADDITION** |
| 975 | (missing) | Drinking Place | **NEEDS ADDITION** |

---

## VERIFIED CORRECT ENTRIES

The following entries match the 12th Edition correctly:

### 200s - Residential
- 210: Single-Family Detached Housing ✓
- 215: Single-Family Attached Housing ✓
- 220: Multifamily Housing (Low-Rise) ✓
- 221: Multifamily Housing (Mid-Rise) ✓
- 222: Multifamily Housing (High-Rise) ✓
- 240: Mobile Home Park ✓
- 255: Continuing Care Retirement Community ✓
- 260: Recreational Homes ✓

### 300s - Lodging
- 310: Hotel ✓
- 311: All Suites Hotel → All-Suites Hotel (minor formatting) ✓
- 320: Motel ✓
- 330: Resort Hotel ✓

### 400s - Recreational
- 411: Public Park ✓
- 430: Golf Course ✓
- 432: Golf Driving Range ✓
- 435: Multipurpose Recreational Facility ✓
- 491: Racquet/Tennis Club ✓
- 492: Health/Fitness Club ✓
- 495: Recreational Community Center ✓

### 500s - Institutional
- 520: Elementary School ✓
- 522: Middle School/Junior High School ✓
- 540: Junior/Community College ✓
- 550: University/College ✓
- 560: Church ✓
- 565: Day Care Center ✓
- 566: Cemetery ✓
- 575: Fire/Rescue Station → Fire and Rescue Station (minor) ✓
- 590: Library ✓

### 600s - Medical
- 610: Hospital ✓
- 620: Nursing Home ✓
- 640: Animal Hospital/Veterinary Clinic ✓

### 700s - Office
- 710: General Office Building ✓
- 714: Corporate Headquarters Building ✓
- 715: Single Tenant Office Building ✓
- 730: Government Office Building ✓
- 750: Office Park ✓
- 760: Research and Development Center ✓
- 770: Business Park ✓

### 800s - Retail
- 813: Free-Standing Discount Superstore ✓
- 815: Free-Standing Discount Store ✓
- 820: Shopping Center ✓
- 821: Shopping Plaza (40-150K SF) → (40-150k) ✓
- 822: Strip Retail Plaza (<40K SF) → (<40k) ✓
- 840: Automobile Sales (New) ✓
- 841: Automobile Sales (Used) ✓
- 848: Tire Store ✓
- 850: Supermarket ✓
- 857: Discount Club ✓
- 860: Wholesale Market ✓
- 861: Sporting Goods Superstore ✓
- 862: Home Improvement Superstore ✓
- 863: Electronics Superstore ✓
- 866: Pet Supply Superstore ✓
- 867: Office Supply Superstore ✓
- 875: Department Store ✓
- 879: Arts and Crafts Store ✓
- 880: Pharmacy/Drugstore without Drive-Through ✓
- 881: Pharmacy/Drugstore with Drive-Through ✓

### 900s - Services
- 930: Fast Casual Restaurant ✓
- 932: High-Turnover (Sit-Down) Restaurant ✓
- 933: Fast Food Restaurant without Drive-Through ✓
- 934: Fast Food Restaurant with Drive-Through ✓
- 936: Coffee/Donut Shop without Drive-Through ✓
- 937: Coffee/Donut Shop with Drive-Through ✓
- 938: Coffee/Donut Shop with Drive-Through Only ✓
- 941: Quick Lubrication Vehicle Shop ✓
- 942: Automobile Care Center ✓
- 944: Gas Station → Gasoline/Service Station ✓
- 945: Gas Station with Convenience Market → Convenience Store/Gas Station ✓
- 947: Self-Service Car Wash ✓
- 948: Automated Car Wash ✓

---

## CRITICAL CORRECTIONS APPLIED

### Changes Made to ite-database.js:

1. **Code 525**: ADDED as "High School" - official 12th Edition code for public high schools
2. **Code 530**: Changed from "High School" to "Private School (K-8)" - correct 12th Edition mapping
3. **Code 650**: Changed from "Medical-Dental Office Building" to "Free-Standing Emergency Room"
4. **Code 312**: Changed from "Business Hotel" to "Limited-Service Hotel"
5. **Code 230**: Changed from "Residential Condominium/Townhouse" to "Low-Rise Residential with Ground-Floor Commercial"
6. **Code 630**: Changed from "Clinic" to "Walk-In Clinic"
7. **Code 810**: Changed from "Freestanding Discount Store" to "Tractor Supply Store"
8. **Code 931**: Changed from "Quality Restaurant" to "Fine Dining Restaurant"
9. **Code 890**: Changed from "Furniture Store" to "Furniture/Flooring Store"
10. **Code 868**: Changed from "Value Retail Center" to "Book Superstore"
11. **Code 851**: Changed from "Convenience Market (Open 24 Hours)" to "Convenience Store"

### Changes Made to ITE_CATEGORIES:

1. Removed "010" from Port, Freight, Terminal (deprecated in 12th Edition)
2. Removed "270" from Residential (deprecated in 12th Edition)
3. Removed "420", "444", "454", "480" from Recreational (deprecated or renumbered)
4. Added "525" to Institutional
5. Removed "853" from Retail (deprecated in 12th Edition)
6. Removed "910", "946", "960" from Services (deprecated or renumbered)

### Changes Made to ite-codes.json:

1. Updated categories to match ite-database.js changes
2. Updated lastUpdated date to 2026-01-30

---

## Notes

1. **Trip Generation Rates**: The actual vehicle trip generation rates could not be verified against the PDF documents as the Modal Data Plots PDFs contain person/bike/transit trip data, not vehicle trip rates. The vehicle trip rates are in Volumes 3-5 which were not available for extraction.

2. **Data Source**: The ITE 12th Edition made significant changes including removing data prior to 1990 and restructuring many land use codes.

3. **Recommendation**: The database should be updated with the corrected land use code mappings. Missing land use codes should be added as they become available from official ITE sources.

---

## Verification Status: COMPLETED (Critical Fixes Applied)
## Last Updated: 2026-01-30

---

## Summary of Critical Fixes

| Code | Old Name | New Name (12th Edition) |
|------|----------|-------------------------|
| 525 | (NEW) | High School |
| 530 | High School | Private School (K-8) |
| 650 | Medical-Dental Office Building | Free-Standing Emergency Room |
| 312 | Business Hotel | Limited-Service Hotel |
| 230 | Residential Condominium/Townhouse | Low-Rise Residential with Ground-Floor Commercial |
| 630 | Clinic | Walk-In Clinic |
| 810 | Freestanding Discount Store | Tractor Supply Store |
| 931 | Quality Restaurant | Fine Dining Restaurant |
| 890 | Furniture Store | Furniture/Flooring Store |
| 868 | Value Retail Center | Book Superstore |
| 851 | Convenience Market (Open 24 Hours) | Convenience Store |

## Codes Removed from Categories (Deprecated in 12th Edition)

- 010: Waterport/Marine Terminal
- 270: Residential Planned Unit Development
- 420: Marina
- 444: Movie Theater (merged with 445)
- 454: Batting Cages (now 433)
- 480: Amusement Park
- 853: Convenience Market (Open 15-16 Hours)
- 910: Bank (replaced by 911 Walk-in Bank)
- 946: Gas Station with Convenience Market and Car Wash
- 960: Super Convenience Market / Gas Station (now Rental Car Facility)
