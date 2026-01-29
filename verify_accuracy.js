/**
 * ITE Trip Generation Accuracy Verification Script
 *
 * Run this in the browser console or with Node.js to verify
 * the tool matches ITE TripGen official values.
 *
 * Usage: Open tool/index.html in browser, then paste this in console
 */

function verifyAccuracy() {
  console.log("=" .repeat(60));
  console.log("ITE TRIP GENERATION - ACCURACY VERIFICATION");
  console.log("=" .repeat(60));

  // Test cases from official ITE TripGen
  const testCases = [
    {
      code: "210",
      name: "Single-Family Detached Housing",
      size: 15,
      unit: "DU",
      expected: {
        avgRate: 136,
        fittedCurve: 387,
        rate: 9.09,
        rSquared: 0.94,
        sampleSize: 155
      }
    },
    {
      code: "210",
      name: "Single-Family Detached Housing",
      size: 100,
      unit: "DU",
      expected: {
        avgRate: 909,
        fittedCurve: 1072,
        rate: 9.09,
        rSquared: 0.94,
        sampleSize: 155
      }
    },
    {
      code: "210",
      name: "Single-Family Detached Housing",
      size: 261, // Average study size
      unit: "DU",
      expected: {
        avgRate: 2372,
        fittedCurve: 2372,
        rate: 9.09,
        rSquared: 0.94,
        sampleSize: 155
      }
    }
  ];

  let allPassed = true;

  testCases.forEach((test, i) => {
    console.log(`\nTest ${i + 1}: Code ${test.code} - ${test.size} ${test.unit}`);
    console.log("-".repeat(50));

    if (typeof ITE_DATABASE === 'undefined') {
      console.log("ERROR: ITE_DATABASE not loaded");
      return;
    }

    const data = ITE_DATABASE[test.code];
    if (!data) {
      console.log(`ERROR: Code ${test.code} not found`);
      allPassed = false;
      return;
    }

    // Check rate
    const rateMatch = data.weekday.rate === test.expected.rate;
    console.log(`Rate: ${data.weekday.rate} (expected ${test.expected.rate}) ${rateMatch ? '✓' : '✗'}`);

    // Check R²
    const r2Match = data.weekday.r_squared === test.expected.rSquared;
    console.log(`R²: ${data.weekday.r_squared} (expected ${test.expected.rSquared}) ${r2Match ? '✓' : '✗'}`);

    // Check sample size
    const ssMatch = data.weekday.sample_size === test.expected.sampleSize;
    console.log(`Sample Size: ${data.weekday.sample_size} (expected ${test.expected.sampleSize}) ${ssMatch ? '✓' : '✗'}`);

    // Calculate trips
    const avgRateTrips = Math.round(data.weekday.rate * test.size);
    const eq = data.weekday.equation;
    const fittedTrips = Math.round(eq.a * test.size + (eq.b || 0));

    const avgMatch = avgRateTrips === test.expected.avgRate;
    console.log(`Avg Rate Trips: ${avgRateTrips} (expected ${test.expected.avgRate}) ${avgMatch ? '✓' : '✗'}`);

    const fittedMatch = Math.abs(fittedTrips - test.expected.fittedCurve) <= 1; // Allow 1 trip rounding
    console.log(`Fitted Curve Trips: ${fittedTrips} (expected ${test.expected.fittedCurve}) ${fittedMatch ? '✓' : '✗'}`);

    if (!rateMatch || !r2Match || !ssMatch || !avgMatch || !fittedMatch) {
      allPassed = false;
    }
  });

  console.log("\n" + "=".repeat(60));
  if (allPassed) {
    console.log("✓ ALL TESTS PASSED - Tool matches ITE TripGen!");
  } else {
    console.log("✗ SOME TESTS FAILED - Review the output above");
  }
  console.log("=".repeat(60));

  return allPassed;
}

// Auto-run if in browser with ITE_DATABASE loaded
if (typeof ITE_DATABASE !== 'undefined') {
  verifyAccuracy();
} else {
  console.log("Load this script in the browser after opening tool/index.html");
  console.log("Then run: verifyAccuracy()");
}
