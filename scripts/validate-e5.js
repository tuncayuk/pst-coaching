#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const CONTRACTS_DIR = "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/artifacts/ux/screen_contracts";
const INVENTORY_PATH = "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/artifacts/ux/screen_inventory.json";

const E5_FR_AC = {
  "FR-E5-01": ["AC-FR-E5-01-01", "AC-FR-E5-01-02", "AC-FR-E5-01-03", "AC-FR-E5-01-04"],
  "FR-E5-02": ["AC-FR-E5-02-01", "AC-FR-E5-02-02", "AC-FR-E5-02-03", "AC-FR-E5-02-04"],
  "FR-E5-03": ["AC-FR-E5-03-01", "AC-FR-E5-03-02", "AC-FR-E5-03-03", "AC-FR-E5-03-04"],
  "FR-E5-04": ["AC-FR-E5-04-01", "AC-FR-E5-04-02", "AC-FR-E5-04-03", "AC-FR-E5-04-04", "AC-FR-E5-04-05", "AC-FR-E5-04-06", "AC-FR-E5-04-07"],
  "FR-E5-05": ["AC-FR-E5-05-01", "AC-FR-E5-05-02", "AC-FR-E5-05-03"],
  "FR-E5-06": ["AC-FR-E5-06-01", "AC-FR-E5-06-02", "AC-FR-E5-06-03"],
};

const E5_CONTRACT_IDS = [
  "reading.fr_e5_01",
  "reading.fr_e5_02",
  "reading.fr_e5_03",
  "reading.fr_e5_04",
  "reading.fr_e5_05",
  "reading.fr_e5_06",
];

const EXPECTED_ROUTES = {
  "reading.fr_e5_01": "/content/reading",
  "reading.fr_e5_02": "/content/audio",
  "reading.fr_e5_03": "/content/highlights",
  "reading.fr_e5_04": "/content/comment",
  "reading.fr_e5_05": "/content/locked",
  "reading.fr_e5_06": "/content/exercise",
};

const SCREENS = [
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/content/ContentReadingScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/content/ContentExerciseScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/content/ContentCommentScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/content/ContentCommentPreviewScreen.tsx",
  "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/content/ContentJourneyDayScreen.tsx",
];

// Matches Turkish non-ASCII characters
const TURKISH_RE = /[\u00C0-\u024F\u0130\u0131\u015E\u015F\u011E\u011F\u00D6\u00F6\u00DC\u00FC\u00E7\u00C7]/g;

let pass = true;

// 1. JSON parse + route check
console.log("=== 1. JSON Parse + Route Check ===");
let jsonOk = 0;
for (const id of E5_CONTRACT_IDS) {
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
console.log(`JSON: ${jsonOk}/${E5_CONTRACT_IDS.length} OK`);

// 2. FR/AC coverage check
console.log("\n=== 2. FR/AC Coverage Check ===");
let acTotal = 0;
let acFound = 0;
for (const [fr, acs] of Object.entries(E5_FR_AC)) {
  const contractId = "reading." + fr.toLowerCase().replace(/-/g, "_");
  const fp = path.join(CONTRACTS_DIR, `${contractId}.json`);
  let c;
  try {
    c = JSON.parse(fs.readFileSync(fp, "utf8"));
  } catch (_) {
    console.log(`FAIL missing contract for ${fr}`);
    pass = false;
    continue;
  }
  const refs = c.acceptanceCriteriaRefs || [];
  for (const ac of acs) {
    acTotal++;
    if (refs.includes(ac)) {
      acFound++;
    } else {
      console.log(`FAIL missing AC ref ${ac} in ${contractId}`);
      pass = false;
    }
  }
}
console.log(`AC: ${acFound}/${acTotal} covered`);

// 3. Inventory parity
console.log("\n=== 3. Inventory Parity Check ===");
let invOk = 0;
const inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, "utf8"));
for (const id of E5_CONTRACT_IDS) {
  const entry = inventory.screens.find((s) => s.id === id);
  if (!entry) {
    console.log(`FAIL inventory missing entry ${id}`);
    pass = false;
    continue;
  }
  if (entry.route !== EXPECTED_ROUTES[id]) {
    console.log(`FAIL inventory route ${id}: got "${entry.route}" want "${EXPECTED_ROUTES[id]}"`);
    pass = false;
  } else {
    invOk++;
  }
}
console.log(`Inventory: ${invOk}/${E5_CONTRACT_IDS.length} match`);

// 4. ASCII check on TSX screen files
console.log("\n=== 4. ASCII Check ===");
let asciiOk = 0;
for (const fp of SCREENS) {
  const content = fs.readFileSync(fp, "utf8");
  const matches = content.match(TURKISH_RE);
  if (matches) {
    console.log(`FAIL ascii ${path.basename(fp)}: found chars [${[...new Set(matches)].join("")}]`);
    pass = false;
  } else {
    asciiOk++;
  }
}
console.log(`ASCII: ${asciiOk}/${SCREENS.length} CLEAN`);

// Summary
console.log("\n=== Summary ===");
if (pass) {
  console.log("ALL CHECKS PASSED");
} else {
  console.log("SOME CHECKS FAILED");
  process.exit(1);
}
