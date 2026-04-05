#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const CONTRACTS_DIR = '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/artifacts/ux/screen_contracts';
const INVENTORY_PATH = '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/artifacts/ux/screen_inventory.json';

const E6_FR_AC = {
  'FR-E6-01': ['AC-FR-E6-01-01', 'AC-FR-E6-01-02', 'AC-FR-E6-01-03'],
  'FR-E6-02': ['AC-FR-E6-02-01', 'AC-FR-E6-02-02', 'AC-FR-E6-02-03', 'AC-FR-E6-02-04'],
  'FR-E6-03': ['AC-FR-E6-03-01', 'AC-FR-E6-03-02', 'AC-FR-E6-03-03'],
  'FR-E6-04': ['AC-FR-E6-04-01', 'AC-FR-E6-04-02', 'AC-FR-E6-04-03'],
  'FR-E6-05': ['AC-FR-E6-05-01', 'AC-FR-E6-05-02', 'AC-FR-E6-05-03'],
  'FR-E6-06': ['AC-FR-E6-06-01', 'AC-FR-E6-06-02', 'AC-FR-E6-06-03']
};

const E6_CONTRACT_IDS = [
  'progress.fr_e6_01',
  'progress.fr_e6_02',
  'progress.fr_e6_03',
  'progress.fr_e6_04',
  'progress.fr_e6_05',
  'progress.fr_e6_06'
];

const EXPECTED_ROUTES = {
  'progress.fr_e6_01': '/progress/dashboard',
  'progress.fr_e6_02': '/progress/emotional-map',
  'progress.fr_e6_03': '/progress/strengths',
  'progress.fr_e6_04': '/progress/weekly-summary',
  'progress.fr_e6_05': '/progress/completion-review',
  'progress.fr_e6_06': '/progress/report-export'
};

const SCREENS = [
  '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/progress/ProgressDashboardScreen.tsx',
  '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/progress/ProgressEmotionalMapScreen.tsx',
  '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/progress/ProgressStrengthsScreen.tsx',
  '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/progress/ProgressWeeklySummaryScreen.tsx',
  '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/progress/ProgressReportExportScreen.tsx',
  '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/progress/ProgressCompletionReviewScreen.tsx'
];

const TURKISH_RE = /[\u00C0-\u024F\u0130\u0131\u015E\u015F\u011E\u011F\u00D6\u00F6\u00DC\u00FC\u00E7\u00C7]/g;

let pass = true;

// 1. JSON parse + route check
console.log('=== 1. JSON Parse + Route Check ===');
let jsonOk = 0;
for (const id of E6_CONTRACT_IDS) {
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
console.log(`JSON: ${jsonOk}/${E6_CONTRACT_IDS.length} OK`);

// 2. FR/AC coverage check
console.log('\n=== 2. FR/AC Coverage Check ===');
let acTotal = 0;
let acFound = 0;
for (const [fr, acs] of Object.entries(E6_FR_AC)) {
  const contractId = 'progress.' + fr.toLowerCase().replace(/-/g, '_');
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

// 4. ASCII check on screen files
console.log('\n=== 4. ASCII Check on Screens ===');
let asciiOk = 0;
for (const fp of SCREENS) {
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
