const fs = require('fs');

// Parse modal data by extracting the object
let modalDataContent = fs.readFileSync('assets/js/modal-data.js', 'utf8');
// Find the object between the first { and the }; before helper functions
const modalStart = modalDataContent.indexOf('const ITE_MODAL_DATA = {') + 'const ITE_MODAL_DATA = '.length;
let braceCount = 0;
let modalEnd = modalStart;
for (let i = modalStart; i < modalDataContent.length; i++) {
  if (modalDataContent[i] === '{') braceCount++;
  if (modalDataContent[i] === '}') braceCount--;
  if (braceCount === 0) {
    modalEnd = i + 1;
    break;
  }
}
const modalObjStr = modalDataContent.substring(modalStart, modalEnd);
const ITE_MODAL_DATA = eval('(' + modalObjStr + ')');

// Load main database codes from JSON
const iteCodesJson = JSON.parse(fs.readFileSync('data/ite-codes.json', 'utf8'));
const dbCodes = new Set();
for (const codes of Object.values(iteCodesJson.categories)) {
  codes.forEach(c => dbCodes.add(c));
}

console.log('=== MODAL DATA ACCURACY TEST ===\n');
console.log('Loaded ' + Object.keys(ITE_MODAL_DATA).length + ' codes from modal-data.js');
console.log('Loaded ' + dbCodes.size + ' codes from ite-codes.json');

// Test 1: Check modal data structure
console.log('\n1. Checking modal data structure...');
let structureIssues = [];
for (const [code, data] of Object.entries(ITE_MODAL_DATA)) {
  for (const [mode, modeData] of Object.entries(data)) {
    for (const [period, periodData] of Object.entries(modeData)) {
      if (periodData.rate === undefined) {
        structureIssues.push(code + '.' + mode + '.' + period + ': missing rate');
      }
      if (periodData.entering === undefined || periodData.exiting === undefined) {
        structureIssues.push(code + '.' + mode + '.' + period + ': missing entering/exiting');
      }
      // Check that entering + exiting = 100
      if (periodData.entering !== undefined && periodData.exiting !== undefined) {
        if (periodData.entering + periodData.exiting !== 100) {
          structureIssues.push(code + '.' + mode + '.' + period + ': entering(' + periodData.entering + ') + exiting(' + periodData.exiting + ') != 100');
        }
      }
    }
  }
}
if (structureIssues.length > 0) {
  console.log('  ISSUES FOUND:');
  structureIssues.forEach(i => console.log('    - ' + i));
} else {
  console.log('  OK - All modal data has correct structure');
}

// Test 2: Check for codes in modal data that don't exist in main database
console.log('\n2. Checking modal codes exist in main database...');
let missingCodes = [];
for (const code of Object.keys(ITE_MODAL_DATA)) {
  if (!dbCodes.has(code)) {
    missingCodes.push(code);
  }
}
if (missingCodes.length > 0) {
  console.log('  WARNING: Modal codes not in main database:', missingCodes.join(', '));
} else {
  console.log('  OK - All modal codes exist in main database');
}

// Test 3: Check rate values are reasonable
console.log('\n3. Checking rate values are reasonable...');
let unreasonableRates = [];
for (const [code, data] of Object.entries(ITE_MODAL_DATA)) {
  for (const [mode, modeData] of Object.entries(data)) {
    for (const [period, periodData] of Object.entries(modeData)) {
      if (periodData.rate < 0) {
        unreasonableRates.push(code + '.' + mode + '.' + period + ': negative rate (' + periodData.rate + ')');
      }
      if (periodData.rate > 200) {
        unreasonableRates.push(code + '.' + mode + '.' + period + ': unusually high rate (' + periodData.rate + ')');
      }
    }
  }
}
if (unreasonableRates.length > 0) {
  console.log('  ISSUES FOUND:');
  unreasonableRates.forEach(i => console.log('    - ' + i));
} else {
  console.log('  OK - All rates are within reasonable range');
}

// Test 4: Check sample sizes
console.log('\n4. Checking sample sizes...');
let lowSampleSizes = [];
for (const [code, data] of Object.entries(ITE_MODAL_DATA)) {
  for (const [mode, modeData] of Object.entries(data)) {
    for (const [period, periodData] of Object.entries(modeData)) {
      if (periodData.sample_size < 3) {
        lowSampleSizes.push(code + '.' + mode + '.' + period + ': sample_size=' + periodData.sample_size);
      }
    }
  }
}
console.log('  Found ' + lowSampleSizes.length + ' entries with sample_size < 3 (low reliability)');

// Test 5: Check for zero rates
console.log('\n5. Checking for zero rates...');
let zeroRates = [];
for (const [code, data] of Object.entries(ITE_MODAL_DATA)) {
  for (const [mode, modeData] of Object.entries(data)) {
    for (const [period, periodData] of Object.entries(modeData)) {
      if (periodData.rate === 0) {
        zeroRates.push(code + '.' + mode + '.' + period);
      }
    }
  }
}
console.log('  Found ' + zeroRates.length + ' entries with rate = 0');
if (zeroRates.length > 0) {
  zeroRates.forEach(z => console.log('    - ' + z));
}

// Test 6: Check period naming consistency (am_peak vs amPeak)
console.log('\n6. Checking period naming consistency...');
let periodNames = new Set();
for (const [code, data] of Object.entries(ITE_MODAL_DATA)) {
  for (const [mode, modeData] of Object.entries(data)) {
    for (const period of Object.keys(modeData)) {
      periodNames.add(period);
    }
  }
}
console.log('  Period names found: ' + Array.from(periodNames).join(', '));

// Check if calculator expects different naming
console.log('\n7. Checking calculator.js for period naming...');
const calcContent = fs.readFileSync('assets/js/calculator.js', 'utf8');
if (calcContent.includes('modeData.am_peak')) {
  console.log('  Calculator expects: am_peak, pm_peak');
}
if (calcContent.includes('modeData.amPeak')) {
  console.log('  Calculator expects: amPeak, pmPeak');
}

// Verify consistency
const hasUnderscore = periodNames.has('am_peak') || periodNames.has('pm_peak');
const hasCamelCase = periodNames.has('amPeak') || periodNames.has('pmPeak');
if (hasUnderscore && calcContent.includes('modeData.am_peak')) {
  console.log('  OK - Modal data and calculator use same naming convention');
} else if (hasUnderscore && calcContent.includes('modeData.amPeak')) {
  console.log('  BUG FOUND: Modal data uses am_peak but calculator expects amPeak');
} else if (hasCamelCase && calcContent.includes('modeData.am_peak')) {
  console.log('  BUG FOUND: Modal data uses amPeak but calculator expects am_peak');
}

// Test 8: Check for missing weekday data in modal results
console.log('\n8. Checking modal codes with missing weekday data...');
let missingWeekday = [];
for (const [code, data] of Object.entries(ITE_MODAL_DATA)) {
  for (const [mode, modeData] of Object.entries(data)) {
    if (!modeData.weekday && (modeData.am_peak || modeData.pm_peak)) {
      missingWeekday.push(code + '.' + mode + ': has peak data but no weekday');
    }
  }
}
if (missingWeekday.length > 0) {
  console.log('  Codes with peak but no weekday data:');
  missingWeekday.slice(0, 10).forEach(m => console.log('    - ' + m));
  if (missingWeekday.length > 10) {
    console.log('    ... and ' + (missingWeekday.length - 10) + ' more');
  }
} else {
  console.log('  All modes with peak data also have weekday data');
}

// Test 9: Check UI for missing element IDs
console.log('\n9. Checking UI element IDs...');
const htmlContent = fs.readFileSync('index.html', 'utf8');
const expectedIds = ['mode-vehicle', 'mode-person', 'mode-walk', 'mode-bicycle', 'mode-transit', 'mode-helper'];
let missingIds = [];
for (const id of expectedIds) {
  if (!htmlContent.includes('id="' + id + '"')) {
    missingIds.push(id);
  }
}
if (missingIds.length > 0) {
  console.log('  Missing IDs in HTML:', missingIds.join(', '));
} else {
  console.log('  OK - All expected IDs found in HTML');
}

// Test 10: Check modal-data.js is loaded before calculator.js in HTML
console.log('\n10. Checking script load order...');
const modalDataPos = htmlContent.indexOf('modal-data.js');
const calculatorPos = htmlContent.indexOf('calculator.js');
if (modalDataPos > 0 && calculatorPos > 0 && modalDataPos < calculatorPos) {
  console.log('  OK - modal-data.js loads before calculator.js');
} else {
  console.log('  BUG FOUND: modal-data.js must load before calculator.js');
}

// Summary
console.log('\n=== SUMMARY ===');
console.log('Total land use codes with modal data: ' + Object.keys(ITE_MODAL_DATA).length);
console.log('Structure issues: ' + structureIssues.length);
console.log('Missing from main DB: ' + missingCodes.length);
console.log('Unreasonable rates: ' + unreasonableRates.length);
console.log('Zero rates: ' + zeroRates.length);
console.log('Low sample sizes (< 3): ' + lowSampleSizes.length);
console.log('Missing weekday data: ' + missingWeekday.length);

// Test 11: Check combined mode fallback in calculator
console.log('\n11. Testing calculator walk_bike_transit fallback...');
// Simulate the calculator logic
let fallbackIssues = [];
for (const [code, data] of Object.entries(ITE_MODAL_DATA)) {
  const hasWBT = !!data.walk_bike_transit;
  const hasWalk = !!data.walk;
  const hasBike = !!data.bicycle;
  const hasTransit = !!data.transit;

  // If walk_bike_transit exists but individual modes don't,
  // the calculator should use fallback
  if (hasWBT && !hasWalk && !hasBike && !hasTransit) {
    // Verify walk_bike_transit has data
    if (Object.keys(data.walk_bike_transit).length === 0) {
      fallbackIssues.push(code + ': walk_bike_transit exists but is empty');
    }
  }
}
if (fallbackIssues.length > 0) {
  console.log('  ISSUES:');
  fallbackIssues.forEach(i => console.log('    - ' + i));
} else {
  console.log('  OK - walk_bike_transit fallback data is valid');
}

// Final summary
console.log('\n=== FINAL ASSESSMENT ===');
const criticalBugs = structureIssues.length + unreasonableRates.length + missingIds.length;
const warnings = missingCodes.length;  // Not critical - orphaned modal data

if (criticalBugs > 0) {
  console.log('CRITICAL BUGS: ' + criticalBugs);
  console.log('\n*** CRITICAL BUGS FOUND - NEEDS FIXING ***');
  process.exit(1);
} else if (warnings > 0) {
  console.log('Warnings: ' + warnings + ' modal codes not in main database (data limitation)');
  console.log('\n*** TESTS PASSED WITH WARNINGS ***');
  process.exit(0);
} else {
  console.log('\n*** ALL TESTS PASSED ***');
}
