const fs = require('fs');

// Load extracted ITE 11th Edition data
const extracted = JSON.parse(fs.readFileSync('data/ite_11th_primary.json', 'utf8'));

// Read database file
let dbContent = fs.readFileSync('assets/js/ite-database.js', 'utf8');

// Parse database object
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

console.log('=== UPDATING DATABASE WITH ITE 11th EDITION VALUES ===\n');

let updatesCount = 0;
const updates = [];

for (const [code, extData] of Object.entries(extracted)) {
  const dbData = ITE_DATABASE[code];
  if (!dbData) continue;

  let codeUpdates = [];

  // Update AM peak
  if (extData.am_peak && dbData.am_peak) {
    const ext = extData.am_peak;
    const db = dbData.am_peak;

    // Update rate if different
    if (ext.rate !== undefined && db.rate !== undefined) {
      const rateDiff = Math.abs(ext.rate - db.rate);
      if (rateDiff > 0.01) {
        db.rate = ext.rate;
        codeUpdates.push(`AM rate: ${db.rate} -> ${ext.rate}`);
      }
    }

    // Update entering/exiting if different
    if (ext.entering !== undefined && db.entering !== undefined) {
      if (ext.entering !== db.entering || ext.exiting !== db.exiting) {
        codeUpdates.push(`AM split: ${db.entering}/${db.exiting} -> ${ext.entering}/${ext.exiting}`);
        db.entering = ext.entering;
        db.exiting = ext.exiting;
      }
    }

    // Update r_squared
    if (ext.r_squared !== undefined && ext.r_squared !== null) {
      db.r_squared = ext.r_squared;
    }

    // Update sample_size
    if (ext.sample_size !== undefined) {
      db.sample_size = ext.sample_size;
    }
  }

  // Update PM peak
  if (extData.pm_peak && dbData.pm_peak) {
    const ext = extData.pm_peak;
    const db = dbData.pm_peak;

    // Update rate if different
    if (ext.rate !== undefined && db.rate !== undefined) {
      const rateDiff = Math.abs(ext.rate - db.rate);
      if (rateDiff > 0.01) {
        db.rate = ext.rate;
        codeUpdates.push(`PM rate: ${db.rate} -> ${ext.rate}`);
      }
    }

    // Update entering/exiting if different
    if (ext.entering !== undefined && db.entering !== undefined) {
      if (ext.entering !== db.entering || ext.exiting !== db.exiting) {
        codeUpdates.push(`PM split: ${db.entering}/${db.exiting} -> ${ext.entering}/${ext.exiting}`);
        db.entering = ext.entering;
        db.exiting = ext.exiting;
      }
    }

    // Update r_squared
    if (ext.r_squared !== undefined && ext.r_squared !== null) {
      db.r_squared = ext.r_squared;
    }

    // Update sample_size
    if (ext.sample_size !== undefined) {
      db.sample_size = ext.sample_size;
    }
  }

  // Update weekday if available
  if (extData.weekday && dbData.weekday) {
    const ext = extData.weekday;
    const db = dbData.weekday;

    if (ext.rate !== undefined && db.rate !== undefined) {
      const rateDiff = Math.abs(ext.rate - db.rate);
      if (rateDiff > 0.01) {
        codeUpdates.push(`Weekday rate: ${db.rate} -> ${ext.rate}`);
        db.rate = ext.rate;
      }
    }

    if (ext.r_squared !== undefined && ext.r_squared !== null) {
      db.r_squared = ext.r_squared;
    }

    if (ext.sample_size !== undefined) {
      db.sample_size = ext.sample_size;
    }
  }

  if (codeUpdates.length > 0) {
    updates.push({ code, updates: codeUpdates });
    updatesCount += codeUpdates.length;
  }
}

console.log(`Total updates to make: ${updatesCount} across ${updates.length} codes\n`);

// Show updates
updates.forEach(u => {
  console.log(`${u.code}:`);
  u.updates.forEach(upd => console.log(`  - ${upd}`));
});

// Generate new database content
function formatValue(val) {
  if (val === null) return 'null';
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'object') {
    if (val.type) {
      // equation object
      let eqStr = `{ type: "${val.type}"`;
      if (val.a !== undefined) eqStr += `, a: ${val.a}`;
      if (val.b !== undefined) eqStr += `, b: ${val.b}`;
      if (val.c !== undefined) eqStr += `, c: ${val.c}`;
      eqStr += ' }';
      return eqStr;
    }
  }
  return val;
}

function formatEntry(code, data) {
  let str = `  "${code}": {\n`;
  str += `    code: "${data.code}",\n`;
  str += `    name: "${data.name}",\n`;
  str += `    category: "${data.category}",\n`;
  str += `    unit: "${data.unit}",\n`;

  // Weekday
  if (data.weekday) {
    str += `    weekday: {\n`;
    str += `      rate: ${data.weekday.rate},\n`;
    str += `      equation: ${formatValue(data.weekday.equation)},\n`;
    str += `      r_squared: ${formatValue(data.weekday.r_squared)},\n`;
    str += `      sample_size: ${data.weekday.sample_size}\n`;
    str += `    },\n`;
  }

  // AM Peak
  if (data.am_peak) {
    str += `    am_peak: {\n`;
    str += `      rate: ${data.am_peak.rate},\n`;
    str += `      equation: ${formatValue(data.am_peak.equation)},\n`;
    str += `      r_squared: ${formatValue(data.am_peak.r_squared)},\n`;
    str += `      sample_size: ${data.am_peak.sample_size},\n`;
    str += `      entering: ${data.am_peak.entering},\n`;
    str += `      exiting: ${data.am_peak.exiting}\n`;
    str += `    },\n`;
  }

  // PM Peak
  if (data.pm_peak) {
    str += `    pm_peak: {\n`;
    str += `      rate: ${data.pm_peak.rate},\n`;
    str += `      equation: ${formatValue(data.pm_peak.equation)},\n`;
    str += `      r_squared: ${formatValue(data.pm_peak.r_squared)},\n`;
    str += `      sample_size: ${data.pm_peak.sample_size},\n`;
    str += `      entering: ${data.pm_peak.entering},\n`;
    str += `      exiting: ${data.pm_peak.exiting}\n`;
    str += `    },\n`;
  }

  str += `    source: "${data.source || 'ITE 11th Edition'}",\n`;
  str += `    page_ref: "${data.page_ref || ''}"\n`;
  str += `  }`;

  return str;
}

// Build new database
let newDbContent = 'const ITE_DATABASE = {\n';
const codes = Object.keys(ITE_DATABASE).sort((a, b) => parseInt(a) - parseInt(b));
codes.forEach((code, index) => {
  newDbContent += formatEntry(code, ITE_DATABASE[code]);
  if (index < codes.length - 1) newDbContent += ',';
  newDbContent += '\n';
});
newDbContent += '};\n';

// Write updated database
fs.writeFileSync('assets/js/ite-database.js', newDbContent);

console.log('\n=== DATABASE UPDATED ===');
console.log('Wrote updated database to assets/js/ite-database.js');

// Verify by running check-rates again
console.log('\n=== VERIFICATION ===');
// Re-read and parse updated database
let verifyContent = fs.readFileSync('assets/js/ite-database.js', 'utf8');
const verifyStart = verifyContent.indexOf('const ITE_DATABASE = {') + 'const ITE_DATABASE = '.length;
braceCount = 0;
let verifyEnd = verifyStart;
for (let i = verifyStart; i < verifyContent.length; i++) {
  if (verifyContent[i] === '{') braceCount++;
  if (verifyContent[i] === '}') braceCount--;
  if (braceCount === 0) { verifyEnd = i + 1; break; }
}
const verifyObjStr = verifyContent.substring(verifyStart, verifyEnd);
const VERIFY_DB = eval('(' + verifyObjStr + ')');

let remainingIssues = 0;
for (const [code, extData] of Object.entries(extracted)) {
  const dbData = VERIFY_DB[code];
  if (!dbData) continue;

  // Check AM peak
  if (extData.am_peak && dbData.am_peak) {
    const ext = extData.am_peak;
    const db = dbData.am_peak;

    if (ext.rate !== undefined && db.rate !== undefined) {
      const rateDiff = Math.abs(ext.rate - db.rate) / ext.rate * 100;
      if (rateDiff > 10) {
        console.log(`${code} AM rate still wrong: DB=${db.rate}, ITE=${ext.rate}`);
        remainingIssues++;
      }
    }

    if (ext.entering !== undefined && db.entering !== undefined) {
      const enterDiff = Math.abs(ext.entering - db.entering);
      if (enterDiff > 10) {
        console.log(`${code} AM split still wrong: DB=${db.entering}/${db.exiting}, ITE=${ext.entering}/${ext.exiting}`);
        remainingIssues++;
      }
    }
  }

  // Check PM peak
  if (extData.pm_peak && dbData.pm_peak) {
    const ext = extData.pm_peak;
    const db = dbData.pm_peak;

    if (ext.rate !== undefined && db.rate !== undefined) {
      const rateDiff = Math.abs(ext.rate - db.rate) / ext.rate * 100;
      if (rateDiff > 10) {
        console.log(`${code} PM rate still wrong: DB=${db.rate}, ITE=${ext.rate}`);
        remainingIssues++;
      }
    }

    if (ext.entering !== undefined && db.entering !== undefined) {
      const enterDiff = Math.abs(ext.entering - db.entering);
      if (enterDiff > 10) {
        console.log(`${code} PM split still wrong: DB=${db.entering}/${db.exiting}, ITE=${ext.entering}/${ext.exiting}`);
        remainingIssues++;
      }
    }
  }
}

if (remainingIssues === 0) {
  console.log('All rates now match ITE 11th Edition!');
} else {
  console.log(`\n${remainingIssues} issues remaining`);
}
