/**
 * ITE Trip Generation Calculator - Comprehensive Test Suite
 *
 * This file tests all calculation logic against known ITE tool outputs
 * Run in browser console or Node.js to verify accuracy
 */

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

// Helper function to run a test
function runTest(name, expected, actual, tolerance = 1) {
  const passed = Math.abs(expected - actual) <= tolerance;
  testResults.tests.push({
    name,
    expected,
    actual,
    difference: actual - expected,
    passed,
    tolerance
  });
  if (passed) {
    testResults.passed++;
    console.log(`✓ PASS: ${name} (Expected: ${expected}, Got: ${actual})`);
  } else {
    testResults.failed++;
    console.log(`✗ FAIL: ${name} (Expected: ${expected}, Got: ${actual}, Diff: ${actual - expected})`);
  }
  return passed;
}

// Helper function to calculate fitted curve manually
function calcLinear(a, b, x) {
  return a * x + b;
}

function calcLog(a, b, x) {
  return Math.exp(a * Math.log(x) + b);
}

// ============================================
// TEST SUITE 1: ITE 210 - Single-Family Detached Housing
// Reference: Official ITETripGen Web App (Dwelling Units)
// ============================================
function testITE210() {
  console.log('\n========================================');
  console.log('TEST SUITE 1: ITE 210 - Single-Family Detached Housing');
  console.log('========================================');

  const ite210 = ITE_DATABASE["210"];

  // Verify database values
  console.log('\n--- Database Values Check ---');
  runTest('ITE 210 Unit', 'Dwelling Units', ite210.unit === 'Dwelling Units' ? 'Dwelling Units' : ite210.unit, 0);
  runTest('ITE 210 Weekday Rate', 9.09, ite210.weekday.rate, 0.01);
  runTest('ITE 210 Equation Coefficient (a)', 8.07, ite210.weekday.equation.a, 0.01);
  runTest('ITE 210 Equation Intercept (b)', 265.45, ite210.weekday.equation.b, 0.01);
  runTest('ITE 210 R-Squared', 0.94, ite210.weekday.r_squared, 0.01);
  runTest('ITE 210 Sample Size', 155, ite210.weekday.sample_size, 0);

  // Test calculation for 45 Dwelling Units (from ITE tool screenshot)
  console.log('\n--- Calculation Test: 45 Dwelling Units ---');
  console.log('Reference: ITETripGen shows Fitted Curve: 629, Average Rate: 409');

  // Manual calculation
  const size = 45;
  const fittedCurveManual = calcLinear(8.07, 265.45, size);
  const avgRateManual = 9.09 * size;

  runTest('Manual Fitted Curve (45 DU)', 629, Math.round(fittedCurveManual), 1);
  runTest('Manual Average Rate (45 DU)', 409, Math.round(avgRateManual), 1);

  // Calculator class test
  const result = calculator.calculate("210", 45);
  if (result.success) {
    runTest('Calculator Weekday Trips (45 DU)', 629, result.weekday.trips, 1);
    runTest('Calculator Method', 'Fitted Curve Equation', result.weekday.method === 'Fitted Curve Equation' ? 'Fitted Curve Equation' : result.weekday.method, 0);

    // R² is 0.94 which is >= 0.75, so should use fitted curve
    console.log(`Calculator used: ${result.weekday.method}`);
    console.log(`Formula: ${result.weekday.formula}`);
  } else {
    console.log(`✗ Calculator failed: ${result.error}`);
    testResults.failed++;
  }

  // Test different sizes
  console.log('\n--- Multiple Size Tests ---');

  // 100 DU: T = 8.07(100) + 265.45 = 807 + 265.45 = 1072.45
  const result100 = calculator.calculate("210", 100);
  runTest('100 DU Fitted Curve', 1072, result100.weekday.trips, 1);

  // 200 DU: T = 8.07(200) + 265.45 = 1614 + 265.45 = 1879.45
  const result200 = calculator.calculate("210", 200);
  runTest('200 DU Fitted Curve', 1879, result200.weekday.trips, 1);

  // 500 DU: T = 8.07(500) + 265.45 = 4035 + 265.45 = 4300.45
  const result500 = calculator.calculate("210", 500);
  runTest('500 DU Fitted Curve', 4300, result500.weekday.trips, 1);
}

// ============================================
// TEST SUITE 2: ITE 220 - Multifamily Housing (Low-Rise)
// ============================================
function testITE220() {
  console.log('\n========================================');
  console.log('TEST SUITE 2: ITE 220 - Multifamily Housing (Low-Rise)');
  console.log('========================================');

  const ite220 = ITE_DATABASE["220"];

  console.log('\n--- Database Values ---');
  console.log(`Unit: ${ite220.unit}`);
  console.log(`Weekday Rate: ${ite220.weekday.rate}`);
  console.log(`R²: ${ite220.weekday.r_squared}`);
  console.log(`Equation: ${ite220.weekday.equation ? JSON.stringify(ite220.weekday.equation) : 'None'}`);

  // Test calculation
  const result = calculator.calculate("220", 100);
  if (result.success) {
    console.log(`\n100 DU Calculation:`);
    console.log(`  Method: ${result.weekday.method}`);
    console.log(`  Trips: ${result.weekday.trips}`);
    console.log(`  Formula: ${result.weekday.formula}`);

    // Expected with rate 7.32: 100 * 7.32 = 732
    const expected = Math.round(100 * ite220.weekday.rate);
    runTest('220 - 100 DU Trips', expected, result.weekday.trips, 5);
  }
}

// ============================================
// TEST SUITE 3: ITE 710 - General Office Building
// ============================================
function testITE710() {
  console.log('\n========================================');
  console.log('TEST SUITE 3: ITE 710 - General Office Building');
  console.log('========================================');

  const ite710 = ITE_DATABASE["710"];

  console.log('\n--- Database Values ---');
  console.log(`Unit: ${ite710.unit}`);
  console.log(`Weekday Rate: ${ite710.weekday.rate}`);
  console.log(`R²: ${ite710.weekday.r_squared}`);
  console.log(`Equation: ${JSON.stringify(ite710.weekday.equation)}`);

  // Test calculation for 50 KSF
  const result = calculator.calculate("710", 50);
  if (result.success) {
    console.log(`\n50 KSF Calculation:`);
    console.log(`  Method: ${result.weekday.method}`);
    console.log(`  Trips: ${result.weekday.trips}`);
    console.log(`  Formula: ${result.weekday.formula}`);

    // If using log equation: Ln(T) = 0.80*Ln(50) + 1.55
    if (ite710.weekday.equation && ite710.weekday.equation.type === 'log') {
      const expected = Math.round(calcLog(ite710.weekday.equation.a, ite710.weekday.equation.b, 50));
      runTest('710 - 50 KSF Fitted Curve', expected, result.weekday.trips, 5);
    }
  }
}

// ============================================
// TEST SUITE 4: ITE 820 - Shopping Center
// ============================================
function testITE820() {
  console.log('\n========================================');
  console.log('TEST SUITE 4: ITE 820 - Shopping Center');
  console.log('========================================');

  const ite820 = ITE_DATABASE["820"];

  console.log('\n--- Database Values ---');
  console.log(`Unit: ${ite820.unit}`);
  console.log(`Weekday Rate: ${ite820.weekday.rate}`);
  console.log(`R²: ${ite820.weekday.r_squared}`);
  console.log(`Equation: ${JSON.stringify(ite820.weekday.equation)}`);

  // Test calculation for 100 KSF GLA
  const result = calculator.calculate("820", 100);
  if (result.success) {
    console.log(`\n100 KSF Calculation:`);
    console.log(`  Method: ${result.weekday.method}`);
    console.log(`  Trips: ${result.weekday.trips}`);
    console.log(`  Formula: ${result.weekday.formula}`);

    // If using log equation
    if (ite820.weekday.equation && ite820.weekday.equation.type === 'log') {
      const expected = Math.round(calcLog(ite820.weekday.equation.a, ite820.weekday.equation.b, 100));
      runTest('820 - 100 KSF Fitted Curve', expected, result.weekday.trips, 10);
    }
  }
}

// ============================================
// TEST SUITE 5: Decision Tree Logic
// ============================================
function testDecisionTree() {
  console.log('\n========================================');
  console.log('TEST SUITE 5: Decision Tree Logic (R² Thresholds)');
  console.log('========================================');

  // Test that high R² uses fitted curve
  console.log('\n--- High R² (≥0.75) should use Fitted Curve ---');
  const result210 = calculator.calculate("210", 100);
  runTest('ITE 210 (R²=0.94) uses Fitted Curve',
          'Fitted Curve Equation',
          result210.weekday.method,
          0);

  // Find a code with lower R² to test average rate fallback
  console.log('\n--- Checking method selection across codes ---');
  for (const code of ["210", "220", "710", "820", "310", "520"]) {
    const data = ITE_DATABASE[code];
    if (data) {
      const result = calculator.calculate(code, 100);
      const r2 = data.weekday.r_squared;
      const hasEq = data.weekday.equation !== null;
      console.log(`${code}: R²=${r2}, HasEq=${hasEq} → Method: ${result.weekday.method}`);
    }
  }
}

// ============================================
// TEST SUITE 6: Threshold Checks
// ============================================
function testThresholds() {
  console.log('\n========================================');
  console.log('TEST SUITE 6: Henrico County Threshold Checks');
  console.log('========================================');

  // Test under all thresholds (small development)
  console.log('\n--- Small Development (should PASS) ---');
  const smallResult = calculator.calculate("210", 10);
  console.log(`10 DU: ${smallResult.weekday.trips} trips`);
  console.log(`Status: ${smallResult.thresholds.overallStatus}`);
  runTest('Small dev passes thresholds', 'PASS', smallResult.thresholds.overallStatus, 0);

  // Test TIA threshold (>= 4000 vpd)
  console.log('\n--- Large Development (should trigger TIA) ---');
  const largeResult = calculator.calculate("210", 500);
  console.log(`500 DU: ${largeResult.weekday.trips} trips`);
  console.log(`Status: ${largeResult.thresholds.overallStatus}`);
  if (largeResult.weekday.trips >= 4000) {
    runTest('Large dev triggers TIA', 'TIA REQUIRED', largeResult.thresholds.overallStatus, 0);
  }

  // Test daily warning (> 1000)
  console.log('\n--- Medium Development (>1000 daily) ---');
  const medResult = calculator.calculate("210", 120);
  console.log(`120 DU: ${medResult.weekday.trips} trips`);
  console.log(`Status: ${medResult.thresholds.overallStatus}`);
  if (medResult.weekday.trips > 1000 && medResult.weekday.trips < 4000) {
    runTest('Medium dev triggers WARNING', 'WARNING', medResult.thresholds.overallStatus, 0);
  }
}

// ============================================
// TEST SUITE 7: Directional Splits
// ============================================
function testDirectionalSplits() {
  console.log('\n========================================');
  console.log('TEST SUITE 7: Directional Splits');
  console.log('========================================');

  const result = calculator.calculate("210", 100);

  console.log('\n--- AM Peak Directional Split ---');
  console.log(`Total AM: ${result.amPeak.trips}`);
  console.log(`Entering: ${result.amPeak.entering} (${result.amPeak.enteringPct}%)`);
  console.log(`Exiting: ${result.amPeak.exiting} (${result.amPeak.exitingPct}%)`);

  // Verify entering + exiting = total
  const amTotal = result.amPeak.entering + result.amPeak.exiting;
  runTest('AM Peak: entering + exiting = total', result.amPeak.trips, amTotal, 1);

  console.log('\n--- PM Peak Directional Split ---');
  console.log(`Total PM: ${result.pmPeak.trips}`);
  console.log(`Entering: ${result.pmPeak.entering} (${result.pmPeak.enteringPct}%)`);
  console.log(`Exiting: ${result.pmPeak.exiting} (${result.pmPeak.exitingPct}%)`);

  const pmTotal = result.pmPeak.entering + result.pmPeak.exiting;
  runTest('PM Peak: entering + exiting = total', result.pmPeak.trips, pmTotal, 1);
}

// ============================================
// TEST SUITE 8: Edge Cases
// ============================================
function testEdgeCases() {
  console.log('\n========================================');
  console.log('TEST SUITE 8: Edge Cases');
  console.log('========================================');

  // Test with size = 1
  console.log('\n--- Minimum Size (1 unit) ---');
  const result1 = calculator.calculate("210", 1);
  console.log(`1 DU: ${result1.weekday.trips} trips`);
  runTest('1 DU calculation succeeds', true, result1.success, 0);

  // Test with invalid code
  console.log('\n--- Invalid ITE Code ---');
  const invalidResult = calculator.calculate("999", 100);
  runTest('Invalid code returns error', false, invalidResult.success, 0);

  // Test with zero size
  console.log('\n--- Zero Size ---');
  const zeroResult = calculator.calculate("210", 0);
  runTest('Zero size returns error', false, zeroResult.success, 0);

  // Test with negative size
  console.log('\n--- Negative Size ---');
  const negResult = calculator.calculate("210", -10);
  runTest('Negative size returns error', false, negResult.success, 0);
}

// ============================================
// RUN ALL TESTS
// ============================================
function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║    ITE TRIP GENERATION CALCULATOR - TEST SUITE             ║');
  console.log('║    Testing against official ITETripGen Web App data        ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  testITE210();
  testITE220();
  testITE710();
  testITE820();
  testDecisionTree();
  testThresholds();
  testDirectionalSplits();
  testEdgeCases();

  // Summary
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    TEST SUMMARY                             ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`Total Tests: ${testResults.passed + testResults.failed}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);

  if (testResults.failed > 0) {
    console.log('\n--- Failed Tests ---');
    testResults.tests.filter(t => !t.passed).forEach(t => {
      console.log(`  ${t.name}: Expected ${t.expected}, Got ${t.actual}`);
    });
  }

  return testResults;
}

// Auto-run if in browser
if (typeof window !== 'undefined' && typeof calculator !== 'undefined') {
  console.log('Test suite loaded. Run runAllTests() to execute all tests.');
}
