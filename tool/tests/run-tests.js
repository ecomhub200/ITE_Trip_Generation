#!/usr/bin/env node
/**
 * ITE Trip Generation Calculator - Node.js Test Runner
 * Run with: node run-tests.js
 */

const fs = require('fs');
const path = require('path');

// Load and parse database file
const dbPath = path.join(__dirname, '../assets/js/ite-database.js');
let dbContent = fs.readFileSync(dbPath, 'utf-8');
// Convert const to var for eval compatibility
dbContent = dbContent.replace(/^const /gm, 'var ');
eval(dbContent);

// Load and parse calculator file
const calcPath = path.join(__dirname, '../assets/js/calculator.js');
let calcContent = fs.readFileSync(calcPath, 'utf-8');
// Convert const to var for eval compatibility
calcContent = calcContent.replace(/^const /gm, 'var ');
calcContent = calcContent.replace(/^class /gm, 'var ITECalculator = class ');
eval(calcContent);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

// Test results
let passed = 0;
let failed = 0;
const failedTests = [];

function test(name, expected, actual, tolerance = 1) {
  let pass;
  if (typeof expected === 'string') {
    pass = expected === actual;
  } else if (typeof expected === 'boolean') {
    pass = expected === actual;
  } else {
    pass = Math.abs(expected - actual) <= tolerance;
  }

  if (pass) {
    passed++;
    console.log(`  ${colors.green}✓${colors.reset} ${name}`);
  } else {
    failed++;
    failedTests.push({ name, expected, actual });
    console.log(`  ${colors.red}✗ ${name}${colors.reset}`);
    console.log(`    Expected: ${expected}, Got: ${actual}`);
  }
  return pass;
}

function section(title) {
  console.log(`\n${colors.cyan}${colors.bold}━━━ ${title} ━━━${colors.reset}`);
}

// ====================================
// MAIN TEST EXECUTION
// ====================================
console.log(`
${colors.blue}${colors.bold}╔═══════════════════════════════════════════════════════════════╗
║     ITE TRIP GENERATION CALCULATOR - COMPREHENSIVE TESTS      ║
║         Validating against official ITETripGen data           ║
╚═══════════════════════════════════════════════════════════════╝${colors.reset}
`);

// ====================================
// TEST 1: ITE 210 Database Values
// ====================================
section('ITE 210 - Database Verification');

const ite210 = ITE_DATABASE["210"];
test('Unit is Dwelling Units', 'Dwelling Units', ite210.unit);
test('Weekday rate is 9.09', 9.09, ite210.weekday.rate, 0.01);
test('Equation coefficient (a) is 8.07', 8.07, ite210.weekday.equation.a, 0.01);
test('Equation intercept (b) is 265.45', 265.45, ite210.weekday.equation.b, 0.01);
test('R-squared is 0.94', 0.94, ite210.weekday.r_squared, 0.01);
test('Sample size is 155', 155, ite210.weekday.sample_size);

// ====================================
// TEST 2: ITE 210 Calculations (45 DU)
// ====================================
section('ITE 210 - Calculation Tests (45 DU)');

const result45 = calculator.calculate("210", 45);
console.log(`\n  ${colors.yellow}Reference from ITETripGen:${colors.reset}`);
console.log(`  Fitted Curve: 629 trips | Average Rate: 409 trips`);

// Manual verification
const manualFitted = 8.07 * 45 + 265.45;
console.log(`\n  ${colors.yellow}Manual calculation:${colors.reset}`);
console.log(`  T = 8.07(45) + 265.45 = ${manualFitted.toFixed(2)}`);

test('Calculator weekday trips (45 DU) = 629', 629, result45.weekday.trips, 1);
test('Uses Fitted Curve Equation method', 'Fitted Curve Equation', result45.weekday.method);

// ====================================
// TEST 3: Multiple Size Tests
// ====================================
section('ITE 210 - Multiple Sizes');

// 100 DU: T = 8.07(100) + 265.45 = 1072.45
const result100 = calculator.calculate("210", 100);
test('100 DU = 1072 trips', 1072, result100.weekday.trips, 1);

// 200 DU: T = 8.07(200) + 265.45 = 1879.45
const result200 = calculator.calculate("210", 200);
test('200 DU = 1879 trips', 1879, result200.weekday.trips, 1);

// 500 DU: T = 8.07(500) + 265.45 = 4300.45
const result500 = calculator.calculate("210", 500);
test('500 DU = 4300 trips', 4300, result500.weekday.trips, 1);

// 1000 DU: T = 8.07(1000) + 265.45 = 8335.45
const result1000 = calculator.calculate("210", 1000);
test('1000 DU = 8335 trips', 8335, result1000.weekday.trips, 1);

// ====================================
// TEST 4: Peak Hour Calculations
// ====================================
section('ITE 210 - Peak Hour Tests (100 DU)');

const peakResult = calculator.calculate("210", 100);

// AM Peak: T = 0.62(100) + 22.48 = 84.48
const expectedAM = Math.round(0.62 * 100 + 22.48);
test(`AM Peak trips = ${expectedAM}`, expectedAM, peakResult.amPeak.trips, 1);

// PM Peak: T = 0.82(100) + 33.06 = 115.06
const expectedPM = Math.round(0.82 * 100 + 33.06);
test(`PM Peak trips = ${expectedPM}`, expectedPM, peakResult.pmPeak.trips, 1);

// ====================================
// TEST 5: Directional Splits
// ====================================
section('Directional Split Verification');

test('AM entering + exiting = total',
     peakResult.amPeak.trips,
     peakResult.amPeak.entering + peakResult.amPeak.exiting, 1);

test('PM entering + exiting = total',
     peakResult.pmPeak.trips,
     peakResult.pmPeak.entering + peakResult.pmPeak.exiting, 1);

// ====================================
// TEST 6: Threshold Checks
// ====================================
section('Henrico County Threshold Checks');

const smallDev = calculator.calculate("210", 10);
test('10 DU passes all thresholds', 'PASS', smallDev.thresholds.overallStatus);

const medDev = calculator.calculate("210", 150);
if (medDev.weekday.trips > 1000 && medDev.weekday.trips < 4000) {
  test('150 DU triggers WARNING (>1000 trips)', 'WARNING', medDev.thresholds.overallStatus);
}

const largeDev = calculator.calculate("210", 500);
if (largeDev.weekday.trips >= 4000) {
  test('500 DU triggers TIA REQUIRED (>=4000)', 'TIA REQUIRED', largeDev.thresholds.overallStatus);
}

// ====================================
// TEST 7: Decision Tree Logic
// ====================================
section('Decision Tree (R² Method Selection)');

// ITE 210 has R² = 0.94 >= 0.75, should use Fitted Curve
test('R²=0.94 uses Fitted Curve', 'Fitted Curve Equation', result100.weekday.method);

// Check data quality assessment
test('Quality confidence is High', 'High', result100.quality.confidenceLevel);

// ====================================
// TEST 8: Edge Cases
// ====================================
section('Edge Cases');

const result1 = calculator.calculate("210", 1);
test('1 DU calculation succeeds', true, result1.success);

const invalidCode = calculator.calculate("999", 100);
test('Invalid ITE code returns error', false, invalidCode.success);

const zeroSize = calculator.calculate("210", 0);
test('Zero size returns error', false, zeroSize.success);

const negSize = calculator.calculate("210", -10);
test('Negative size returns error', false, negSize.success);

// ====================================
// TEST 9: Other ITE Codes
// ====================================
section('Other ITE Codes Quick Check');

const codes = ["220", "710", "820", "310", "520"];
codes.forEach(code => {
  const data = ITE_DATABASE[code];
  if (data) {
    const result = calculator.calculate(code, 100);
    test(`ITE ${code} calculates successfully`, true, result.success);
  }
});

// ====================================
// SUMMARY
// ====================================
console.log(`
${colors.blue}${colors.bold}╔═══════════════════════════════════════════════════════════════╗
║                        TEST SUMMARY                           ║
╚═══════════════════════════════════════════════════════════════╝${colors.reset}

  Total Tests: ${passed + failed}
  ${colors.green}Passed: ${passed}${colors.reset}
  ${colors.red}Failed: ${failed}${colors.reset}
  Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%
`);

if (failed > 0) {
  console.log(`${colors.red}${colors.bold}Failed Tests:${colors.reset}`);
  failedTests.forEach(t => {
    console.log(`  - ${t.name}: Expected ${t.expected}, Got ${t.actual}`);
  });
}

// Exit with appropriate code
process.exit(failed > 0 ? 1 : 0);
