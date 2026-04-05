#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const CONTRACTS_DIR = path.join(__dirname, '../artifacts/ux/screen_contracts');
const INVENTORY_PATH = path.join(__dirname, '../artifacts/ux/screen_inventory.json');

const E7_FR_AC = {
  'FR-E7-01': ['AC-FR-E7-01-01', 'AC-FR-E7-01-02', 'AC-FR-E7-01-03', 'AC-FR-E7-01-04'],
  'FR-E7-02': ['AC-FR-E7-02-01', 'AC-FR-E7-02-02', 'AC-FR-E7-02-03', 'AC-FR-E7-02-04'],
  'FR-E7-03': ['AC-FR-E7-03-01', 'AC-FR-E7-03-02', 'AC-FR-E7-03-03', 'AC-FR-E7-03-04'],
  'FR-E7-04': ['AC-FR-E7-04-01', 'AC-FR-E7-04-02', 'AC-FR-E7-04-03'],
  'FR-E7-05': ['AC-FR-E7-05-01', 'AC-FR-E7-05-02', 'AC-FR-E7-05-03', 'AC-FR-E7-05-04'],
  'FR-E7-06': ['AC-FR-E7-06-01', 'AC-FR-E7-06-02', 'AC-FR-E7-06-03', 'AC-FR-E7-06-04'],
  'FR-E7-07': ['AC-FR-E7-07-01', 'AC-FR-E7-07-02', 'AC-FR-E7-07-03', 'AC-FR-E7-07-04'],
  'FR-E7-08': ['AC-FR-E7-08-01', 'AC-FR-E7-08-02', 'AC-FR-E7-08-03', 'AC-FR-E7-08-04']
};

const E7_CONTRACT_IDS = [
  'reader.fr_e7_01',
  'reader.fr_e7_02',
  'reader.fr_e7_03',
  'reader.fr_e7_04',
  'reader.fr_e7_05',
  'reader.fr_e7_06',
  'reader.fr_e7_07',
  'reader.fr_e7_08'
];

const EXPECTED_ROUTES = {
  'reader.fr_e7_01': '/ebook/reader',
  'reader.fr_e7_02': '/ebook/navigation',
  'reader.fr_e7_03': '/ebook/settings',
  'reader.fr_e7_04': '/ebook/highlight-create',
  'reader.fr_e7_05': '/ebook/highlights',
  'reader.fr_e7_06': '/ebook/audio',
  'reader.fr_e7_07': '/ebook/progress',
  'reader.fr_e7_08': '/ebook/download'
};

const SCREENS = [
  'apps/mobile/screens/content/ContentEbookDetailScreen.tsx',
  'apps/mobile/screens/content/ContentEbookReaderScreen.tsx',
  'apps/mobile/screens/content/ContentEbookTocScreen.tsx',
  'apps/mobile/screens/content/ContentEbookHighlightsScreen.tsx',
  'apps/mobile/screens/content/ContentEbookSettingsScreen.tsx'
];

const TURKISH_RE = /[\u00C0-\u024F\u0130\u0131\u015E\u015F\u011E\u011F\u00D6\u00F6\u00DC\u00FC\u00E7\u00C7]/g;
const ROOT = path.join(__dirname, '..');

let pass = true;

// 1. JSON parse + route check
console.log('=== 1. JSON Parse + Route Check ===');
let jsonOk = 0;
for (const id of E7_CONTRACT_IDS) {
  const fp = path.join(CONTRACTS_DIR, `${id}.json`);
  try {
    const c = JSON.parse(fs.readFileSync(fp, 'utf8'));
    if (c.route !== EXPECTED_ROUTES[id]) {
      console.log(`FAIL route ${id}: got "${c.route}" want "${EXPECTED_ROUTES[id]}"`);
      pass = false;
    } else {
      jsonOk++;
    }
  } catch (e) {
    console.log(`FAIL parse ${id}: ${e.message}`);
    pass = false;
  }
}
console.log(`JSON: ${jsonOk}/${E7_CONTRACT_IDS.length} OK`);

// 2. FR/AC coverage check
console.log('\n=== 2. FR/AC Coverage Check ===');
let acTotal = 0;
let acFound = 0;
for (const [fr, acs] of Object.entries(E7_FR_AC)) {
  const contractId = 'reader.' + fr.toLowerCase().replace(/-/g, '_');
  const fp = path.join(CONTRACTS_DIR, `${contractId}.json`);
  let c;
  try {
    c = JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch (_) {
    console.log(`FAIL missing contract for ${fr}`);
    pass = false;
    acTotal += acs.length;
    continue;
  }
  const contractText = JSON.stringify(c);
  for (const ac of acs) {
    acTotal++;
    if (contractText.includes(ac)) {
      acFound++;
    } else {
      console.log(`FAIL missing AC ${ac} in ${contractId}`);
      pass = false;
    }
  }
}
console.log(`FR/AC: ${acFound}/${acTotal} found`);

// 3. Inventory routes
console.log('\n=== 3. Inventory Route Check ===');
let invOk = 0;
try {
  const inv = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));
  for (const [id, expectedRoute] of Object.entries(EXPECTED_ROUTES)) {
    const entry = inv.screens.find(s => s.id === id);
    if (!entry) {
      console.log(`FAIL inventory missing entry: ${id}`);
      pass = false;
    } else if (entry.route !== expectedRoute) {
      console.log(`FAIL inventory route ${id}: got "${entry.route}" want "${expectedRoute}"`);
      pass = false;
    } else {
      invOk++;
    }
  }
} catch (e) {
  console.log(`FAIL inventory parse: ${e.message}`);
  pass = false;
}
console.log(`Inventory: ${invOk}/${Object.keys(EXPECTED_ROUTES).length} OK`);

// 4. ASCII check
console.log('\n=== 4. ASCII Check on Screens ===');
let asciiOk = 0;
for (const rel of SCREENS) {
  const fp = path.join(ROOT, rel);
  try {
    const content = fs.readFileSync(fp, 'utf8');
    const matches = content.match(TURKISH_RE);
    if (matches && matches.length > 0) {
      const unique = [...new Set(matches)];
      console.log(`WARN non-ASCII in ${path.basename(fp)}: ${unique.join(' ')}`);
    } else {
      asciiOk++;
    }
  } catch (e) {
    console.log(`FAIL read ${path.basename(fp)}: ${e.message}`);
    pass = false;
  }
}
console.log(`ASCII: ${asciiOk}/${SCREENS.length} CLEAN`);

// Result
console.log('\n=== RESULT ===');
if (pass) {
  console.log('ALL PASS');
} else {
  console.log('SOME CHECKS FAILED');
  process.exit(1);
}
