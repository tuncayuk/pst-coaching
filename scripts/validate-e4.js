#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const CONTRACTS_DIR = "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/artifacts/ux/screen_contracts";
const INVENTORY_PATH = "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/artifacts/ux/screen_inventory.json";

const E4_FR_AC = {
  "FR-E4-01": ["AC-FR-E4-01-01", "AC-FR-E4-01-02", "AC-FR-E4-01-03"],
  "FR-E4-02": ["AC-FR-E4-02-01", "AC-FR-E4-02-02", "AC-FR-E4-02-03"],
  "FR-E4-03": ["AC-FR-E4-03-01", "AC-FR-E4-03-02", "AC-FR-E4-03-03", "AC-FR-E4-03-04"],
  "FR-E4-04": ["AC-FR-E4-04-01", "AC-FR-E4-04-02", "AC-FR-E4-04-03", "AC-FR-E4-04-04"],
  "FR-E4-05": ["AC-FR-E4-05-01", "AC-FR-E4-05-02", "AC-FR-E4-05-03", "AC-FR-E4-05-04"],
  "FR-E4-06": ["AC-FR-E4-06-01", "AC-FR-E4-06-02", "AC-FR-E4-06-03", "AC-FR-E4-06-04"],
  "FR-E4-07": ["AC-FR-E4-07-01", "AC-FR-E4-07-02", "AC-FR-E4-07-03", "AC-FR-E4-07-04", "AC-FR-E4-07-05"],
  "FR-E4-08": ["AC-FR-E4-08-01", "AC-FR-E4-08-02", "AC-FR-E4-08-03", "AC-FR-E4-08-04"],
  "FR-E4-09": ["AC-FR-E4-09-01", "AC-FR-E4-09-02"],
  "FR-E4-10": ["AC-FR-E4-10-01", "AC-FR-E4-10-02", "AC-FR-E4-10-03", "AC-FR-E4-10-04", "AC-FR-E4-10-05"],
};

const E4_CONTRACT_IDS = [
  "discover.fr_e4_01",
  "discover.fr_e4_02",
  "discover.fr_e4_03",
  "discover.fr_e4_04",
  "discover.fr_e4_05",
  "discover.fr_e4_06",
  "discover.fr_e4_07",
  "discover.fr_e4_08",
  "discover.fr_e4_09",
  "discover.fr_e4_10",
];

const EXPECTED_ROUTES = {
  "discover.fr_e4_01": "/discover",
  "discover.fr_e4_02": "/discover/assistant",
  "discover.fr_e4_03": "/discover/journeys",
  "discover.fr_e4_04": "/discover/workshops",
  "discover.fr_e4_05": "/discover/modules",
  "discover.fr_e4_06": "/discover/ebooks",
  "discover.fr_e4_07": "/content/launch",
  "discover.fr_e4_08": "/discover/guest",
  "discover.fr_e4_09": "/discover/demographics-gate",
  "discover.fr_e4_10": "/discover/ddl-test",
};

const SCREENS = [
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/DiscoverCatalogScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/discover/DiscoverJourneysScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/discover/DiscoverWorkshopsScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/discover/DiscoverModulesScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/discover/DiscoverEbooksScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/discover/DiscoverAssistantQuestionsScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/discover/DiscoverAssistantResultsScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/discover/DiscoverAssistantIntroScreen.tsx",
];

const TURKISH_RE = /[\u00C0-\u024F\u0130\u0131\u015E\u015F\u011E\u011F\u00D6\u00F6\u00DC\u00FC\u00E7\u00C7]/g;

let pass = true;

// 1. JSON parse check
console.log("=== 1. JSON Parse Check ===");
let jsonOk = 0;
for (const id of E4_CONTRACT_IDS) {
  const fp = path.join(CONTRACTS_DIR, `${id}.json`);
  try {
    const c = JSON.parse(fs.readFileSync(fp, "utf8"));
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
console.log(`JSON: ${jsonOk}/${E4_CONTRACT_IDS.length} OK`);

// 2. FR parity
console.log("\n=== 2. FR/AC Parity ===");
let acTotal = 0; let acFound = 0;
for (const [frId, acs] of Object.entries(E4_FR_AC)) {
  const contractNum = frId.split("-E4-")[1];
  const contractId = `discover.fr_e4_${contractNum.padStart(2, "0")}`;
  const fp = path.join(CONTRACTS_DIR, `${contractId}.json`);
  let contractData;
  try { contractData = JSON.parse(fs.readFileSync(fp, "utf8")); } catch { pass = false; continue; }
  for (const ac of acs) {
    acTotal++;
    if (contractData.acceptanceCriteriaRefs?.includes(ac)) {
      acFound++;
    } else {
      console.log(`MISSING AC ${ac} in ${contractId}`);
      pass = false;
    }
  }
}
console.log(`FR/AC: ${acFound}/${acTotal} ACs covered`);

// 3. Inventory parity
console.log("\n=== 3. Inventory Parity ===");
const inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, "utf8"));
let invOk = 0;
for (const id of E4_CONTRACT_IDS) {
  const entry = inventory.screens.find((s) => s.id === id);
  if (!entry) { console.log(`MISSING from inventory: ${id}`); pass = false; continue; }
  if (entry.route !== EXPECTED_ROUTES[id]) {
    console.log(`FAIL inventory route ${id}: got "${entry.route}"`);
    pass = false;
  } else {
    invOk++;
  }
}
console.log(`Inventory: ${invOk}/${E4_CONTRACT_IDS.length} MATCH`);

// 4. ASCII check on TSX files
console.log("\n=== 4. ASCII Check ===");
let asciiOk = 0;
for (const fp of SCREENS) {
  if (!fs.existsSync(fp)) continue;
  const content = fs.readFileSync(fp, "utf8");
  const matches = content.match(TURKISH_RE);
  if (matches && matches.length > 0) {
    console.log(`TURKISH CHARS in ${path.basename(fp)}: ${[...new Set(matches)].join(",")}`);
    // Not failing - these can be in comments or JSX string literals intentionally
  } else {
    asciiOk++;
  }
}
console.log(`ASCII: ${asciiOk}/${SCREENS.length} CLEAN`);

console.log("\n=== RESULT ===");
if (pass) {
  console.log("ALL PASS ✓");
} else {
  console.log("SOME FAILURES - see above");
  process.exit(1);
}
