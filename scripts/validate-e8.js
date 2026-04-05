#!/usr/bin/env node
// validate-e8.js — Full validation for EPIC-8: JSON parse, routes, FR/AC parity, inventory, ASCII
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTRACTS_DIR = path.join(ROOT, 'artifacts/ux/screen_contracts');
const INVENTORY_PATH = path.join(ROOT, 'artifacts/ux/screen_inventory.json');
const SCREENS_DIR = path.join(ROOT, 'apps/mobile/screens/content');

// ── 1. JSON parse + route check ──────────────────────────────────────────
console.log('=== 1. JSON Parse + Route Check ===');
const EXPECTED_ROUTES = {
  'workshop.fr_e8_01': '/workshop/landing',
  'workshop.fr_e8_02': '/workshop/phases',
  'workshop.fr_e8_03': '/workshop/section',
  'workshop.fr_e8_04': '/workshop/camp',
  'workshop.fr_e8_05': '/workshop/guide',
  'workshop.fr_e8_06': '/workshop/workbook',
  'workshop.fr_e8_07': '/workshop/followup',
  'workshop.fr_e8_08': '/workshop/completion'
};
let jsonOk = 0;
let jsonFail = 0;
for (const [id, expectedRoute] of Object.entries(EXPECTED_ROUTES)) {
  const file = path.join(CONTRACTS_DIR, `${id}.json`);
  try {
    const contract = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (contract.route !== expectedRoute) {
      console.error(`  FAIL ${id}: route=${contract.route} expected=${expectedRoute}`);
      jsonFail++;
    } else {
      jsonOk++;
    }
  } catch (e) {
    console.error(`  FAIL ${id}: ${e.message}`);
    jsonFail++;
  }
}
console.log(`JSON: ${jsonOk}/8 OK${jsonFail ? '  FAIL: ' + jsonFail : ''}`);

// ── 2. FR/AC coverage in contract acceptanceCriteriaRefs ─────────────────
console.log('\n=== 2. FR/AC Coverage Check ===');
const EXPECTED_ACS = [
  'AC-FR-E8-01-01',
  'AC-FR-E8-01-02',
  'AC-FR-E8-01-03',
  'AC-FR-E8-01-04',
  'AC-FR-E8-02-01',
  'AC-FR-E8-02-02',
  'AC-FR-E8-02-03',
  'AC-FR-E8-02-04',
  'AC-FR-E8-03-01',
  'AC-FR-E8-03-02',
  'AC-FR-E8-03-03',
  'AC-FR-E8-03-04',
  'AC-FR-E8-04-01',
  'AC-FR-E8-04-02',
  'AC-FR-E8-04-03',
  'AC-FR-E8-04-04',
  'AC-FR-E8-05-01',
  'AC-FR-E8-05-02',
  'AC-FR-E8-05-03',
  'AC-FR-E8-05-04',
  'AC-FR-E8-06-01',
  'AC-FR-E8-06-02',
  'AC-FR-E8-06-03',
  'AC-FR-E8-06-04',
  'AC-FR-E8-07-01',
  'AC-FR-E8-07-02',
  'AC-FR-E8-07-03',
  'AC-FR-E8-07-04',
  'AC-FR-E8-08-01',
  'AC-FR-E8-08-02',
  'AC-FR-E8-08-03',
  'AC-FR-E8-08-04'
];
// Collect all ACs from all contracts
const allContractACs = new Set();
for (const id of Object.keys(EXPECTED_ROUTES)) {
  try {
    const c = JSON.parse(fs.readFileSync(path.join(CONTRACTS_DIR, `${id}.json`), 'utf8'));
    (c.acceptanceCriteriaRefs || []).forEach(ac => allContractACs.add(ac));
  } catch (_) {}
}
// Check presence in screen source files
const SCREEN_FILES = [
  'ContentWorkshopDetailScreen.tsx',
  'ContentWorkshopHomeScreen.tsx',
  'ContentWorkshopSectionScreen.tsx',
  'ContentWorkshopCampScreen.tsx',
  'ContentWorkshopGuideScreen.tsx',
  'ContentWorkshopWorkbookScreen.tsx',
  'ContentWorkshopFollowUpScreen.tsx',
  'ContentWorkshopCompletionScreen.tsx'
];
const allScreenContent = SCREEN_FILES.map(f => {
  try {
    return fs.readFileSync(path.join(SCREENS_DIR, f), 'utf8');
  } catch (_) {
    return '';
  }
}).join('\n');

let acFound = 0;
let acMissing = [];
for (const ac of EXPECTED_ACS) {
  if (allScreenContent.includes(ac) || allContractACs.has(ac)) {
    acFound++;
  } else {
    acMissing.push(ac);
  }
}
if (acMissing.length > 0) {
  acMissing.forEach(ac => console.error(`  MISSING in screens+contracts: ${ac}`));
}
console.log(
  `FR/AC: ${acFound}/${EXPECTED_ACS.length} found${acMissing.length ? '  MISSING: ' + acMissing.length : ''}`
);

// ── 3. Inventory route check ─────────────────────────────────────────────
console.log('\n=== 3. Inventory Route Check ===');
const rawInv = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));
const inventory = Array.isArray(rawInv) ? rawInv : rawInv.screens || rawInv.items || [];
let invOk = 0;
let invFail = 0;
for (const [id, expectedRoute] of Object.entries(EXPECTED_ROUTES)) {
  const entry = inventory.find(e => e.id === id);
  if (!entry) {
    console.error(`  FAIL ${id}: not found in inventory`);
    invFail++;
  } else if (entry.route !== expectedRoute) {
    console.error(`  FAIL ${id}: route=${entry.route} expected=${expectedRoute}`);
    invFail++;
  } else {
    invOk++;
  }
}
console.log(`Inventory: ${invOk}/8 OK${invFail ? '  FAIL: ' + invFail : ''}`);

// ── 4. ASCII check on screen files ───────────────────────────────────────
console.log('\n=== 4. ASCII Check on Screens ===');
let asciiClean = 0;
let asciiDirty = 0;
for (const filename of SCREEN_FILES) {
  const content = fs.readFileSync(path.join(SCREENS_DIR, filename), 'utf8');
  const nonAscii = content.match(/[^\x00-\x7F]/g);
  if (nonAscii && nonAscii.length > 0) {
    console.warn(
      `  WARN ${filename}: ${nonAscii.length} non-ASCII chars (${[...new Set(nonAscii)].slice(0, 10).join('')})`
    );
    asciiDirty++;
  } else {
    asciiClean++;
  }
}
console.log(`ASCII: ${asciiClean}/${SCREEN_FILES.length} CLEAN${asciiDirty ? '  WARN: ' + asciiDirty : ''}`);

// ── 5. Screen file existence check ───────────────────────────────────────
console.log('\n=== 5. Screen File Existence ===');
let filesOk = 0;
for (const filename of SCREEN_FILES) {
  if (fs.existsSync(path.join(SCREENS_DIR, filename))) {
    filesOk++;
  } else {
    console.error(`  MISSING: ${filename}`);
  }
}
console.log(`Files: ${filesOk}/${SCREEN_FILES.length} exist`);

// ── Result ────────────────────────────────────────────────────────────────
console.log('\n=== RESULT ===');
const allPass =
  jsonFail === 0 && acMissing.length === 0 && invFail === 0 && asciiDirty === 0 && filesOk === SCREEN_FILES.length;
if (allPass) {
  console.log('ALL PASS');
} else {
  console.log('SOME CHECKS FAILED — review output above');
  process.exit(1);
}
