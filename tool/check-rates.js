const fs = require('fs');

// Load extracted ITE 11th Edition data
const extracted = JSON.parse(fs.readFileSync('data/ite_11th_primary.json', 'utf8'));

// Parse database
let dbContent = fs.readFileSync('assets/js/ite-database.js', 'utf8');
const dbStart = dbContent.indexOf('const ITE_DATABASE = {') + 'const ITE_DATABASE = '.length;
let braceCount = 0;
let dbEnd = dbStart;
for (let i = dbStart; i < dbContent.length; i++) {
  if (dbContent[i] === '{') braceCount++;
  if (dbContent[i] === '}') braceCount--;
  if (braceCount === 0) { dbEnd = i + 1; break; }
}
const dbObjStr = dbContent.substring(dbStart, dbEnd);
const ITE_DATABASE = eval('(' + dbObjStr + ')');

console.log('=== RATE COMPARISON: Database vs ITE 11th Edition ===\n');

const issues = [];

for (const [code, extData] of Object.entries(extracted)) {
  const dbData = ITE_DATABASE[code];
  if (!dbData) continue;

  // Check AM peak
  if (extData.am_peak && dbData.am_peak) {
    const extAm = extData.am_peak;
    const dbAm = dbData.am_peak;

    // Check rate difference > 10%
    if (extAm.rate && dbAm.rate) {
      const rateDiff = Math.abs(extAm.rate - dbAm.rate) / extAm.rate * 100;
      if (rateDiff > 10) {
        issues.push({
          code: code,
          period: 'AM',
          field: 'rate',
          extracted: extAm.rate,
          database: dbAm.rate,
          diff: rateDiff.toFixed(1) + '%'
        });
      }
    }

    // Check directional split difference > 10%
    if (extAm.entering && dbAm.entering) {
      const enterDiff = Math.abs(extAm.entering - dbAm.entering);
      if (enterDiff > 10) {
        issues.push({
          code: code,
          period: 'AM',
          field: 'entering',
          extracted: extAm.entering + '/' + extAm.exiting,
          database: dbAm.entering + '/' + dbAm.exiting,
          diff: enterDiff + ' pts'
        });
      }
    }
  }

  // Check PM peak
  if (extData.pm_peak && dbData.pm_peak) {
    const extPm = extData.pm_peak;
    const dbPm = dbData.pm_peak;

    // Check rate difference > 10%
    if (extPm.rate && dbPm.rate) {
      const rateDiff = Math.abs(extPm.rate - dbPm.rate) / extPm.rate * 100;
      if (rateDiff > 10) {
        issues.push({
          code: code,
          period: 'PM',
          field: 'rate',
          extracted: extPm.rate,
          database: dbPm.rate,
          diff: rateDiff.toFixed(1) + '%'
        });
      }
    }

    // Check directional split difference > 10%
    if (extPm.entering && dbPm.entering) {
      const enterDiff = Math.abs(extPm.entering - dbPm.entering);
      if (enterDiff > 10) {
        issues.push({
          code: code,
          period: 'PM',
          field: 'entering',
          extracted: extPm.entering + '/' + extPm.exiting,
          database: dbPm.entering + '/' + dbPm.exiting,
          diff: enterDiff + ' pts'
        });
      }
    }
  }
}

if (issues.length > 0) {
  console.log('Found ' + issues.length + ' significant discrepancies:\n');
  issues.forEach(i => {
    console.log(`${i.code} ${i.period} ${i.field}: DB=${i.database}, ITE 11th=${i.extracted} (diff: ${i.diff})`);
  });
} else {
  console.log('No significant discrepancies found');
}
