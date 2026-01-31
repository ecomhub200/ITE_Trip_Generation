/**
 * Test script to verify directional distribution fixes
 * Run with: node test-directional-fix.js (from tool directory)
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('ITE Trip Generation - Directional Distribution Test');
console.log('='.repeat(60));

// Load JSON data files
const ite11thPrimary = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/ite_11th_primary.json')));
const ite11thExtracted = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/ite_11th_extracted.json')));

// Test data expectations
const expectedResidentialPattern = {
  am_peak: { moreExiting: true },  // People leaving for work
  pm_peak: { moreEntering: true }  // People returning from work
};

const residentialCodes = ['210', '215', '220', '221', '222'];

let passed = 0;
let failed = 0;

console.log('\n--- Testing ite_11th_primary.json ---\n');

for (const code of residentialCodes) {
  const data = ite11thPrimary[code];
  if (!data) {
    console.log(`[SKIP] Code ${code}: Not found in ite_11th_primary.json`);
    continue;
  }

  // Test AM Peak
  if (data.am_peak?.entering !== undefined && data.am_peak?.exiting !== undefined) {
    const amValid = data.am_peak.exiting > data.am_peak.entering;
    if (amValid) {
      console.log(`[PASS] ${code} AM Peak: ${data.am_peak.entering}% entering, ${data.am_peak.exiting}% exiting (more exiting - correct)`);
      passed++;
    } else {
      console.log(`[FAIL] ${code} AM Peak: ${data.am_peak.entering}% entering, ${data.am_peak.exiting}% exiting (should have more exiting!)`);
      failed++;
    }
  }

  // Test PM Peak
  if (data.pm_peak?.entering !== undefined && data.pm_peak?.exiting !== undefined) {
    const pmValid = data.pm_peak.entering > data.pm_peak.exiting;
    if (pmValid) {
      console.log(`[PASS] ${code} PM Peak: ${data.pm_peak.entering}% entering, ${data.pm_peak.exiting}% exiting (more entering - correct)`);
      passed++;
    } else {
      console.log(`[FAIL] ${code} PM Peak: ${data.pm_peak.entering}% entering, ${data.pm_peak.exiting}% exiting (should have more entering!)`);
      failed++;
    }
  }
}

console.log('\n--- Testing ite_11th_extracted.json ---\n');

for (const code of residentialCodes) {
  const data = ite11thExtracted[code];
  if (!data) {
    console.log(`[SKIP] Code ${code}: Not found in ite_11th_extracted.json`);
    continue;
  }

  // Test AM Peak
  if (data.am_peak?.entering !== undefined && data.am_peak?.exiting !== undefined) {
    const amValid = data.am_peak.exiting > data.am_peak.entering;
    if (amValid) {
      console.log(`[PASS] ${code} AM Peak: ${data.am_peak.entering}% entering, ${data.am_peak.exiting}% exiting (more exiting - correct)`);
      passed++;
    } else {
      console.log(`[FAIL] ${code} AM Peak: ${data.am_peak.entering}% entering, ${data.am_peak.exiting}% exiting (should have more exiting!)`);
      failed++;
    }
  }

  // Test PM Peak
  if (data.pm_peak?.entering !== undefined && data.pm_peak?.exiting !== undefined) {
    const pmValid = data.pm_peak.entering > data.pm_peak.exiting;
    if (pmValid) {
      console.log(`[PASS] ${code} PM Peak: ${data.pm_peak.entering}% entering, ${data.pm_peak.exiting}% exiting (more entering - correct)`);
      passed++;
    } else {
      console.log(`[FAIL] ${code} PM Peak: ${data.pm_peak.entering}% entering, ${data.pm_peak.exiting}% exiting (should have more entering!)`);
      failed++;
    }
  }
}

// Test Land Use 221 specifically
console.log('\n--- Specific Test for Land Use 221 (Multifamily Housing Mid-Rise) ---\n');

const lu221Primary = ite11thPrimary['221'];
const lu221Extracted = ite11thExtracted['221'];

console.log('ite_11th_primary.json:');
console.log(`  AM Peak: ${lu221Primary.am_peak.entering}% entering, ${lu221Primary.am_peak.exiting}% exiting`);
console.log(`  PM Peak: ${lu221Primary.pm_peak.entering}% entering, ${lu221Primary.pm_peak.exiting}% exiting`);

console.log('\nite_11th_extracted.json:');
console.log(`  AM Peak: ${lu221Extracted.am_peak.entering}% entering, ${lu221Extracted.am_peak.exiting}% exiting`);
console.log(`  PM Peak: ${lu221Extracted.pm_peak.entering}% entering, ${lu221Extracted.pm_peak.exiting}% exiting`);

// Summary
console.log('\n' + '='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log('='.repeat(60));

if (failed > 0) {
  console.log('\n!!! SOME TESTS FAILED - Please review the directional distributions !!!');
  process.exit(1);
} else {
  console.log('\nAll directional distribution tests passed!');
  process.exit(0);
}
