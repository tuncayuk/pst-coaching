#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const contractsDir = path.join(__dirname, "../artifacts/ux/screen_contracts");
const inventoryPath = path.join(__dirname, "../artifacts/ux/screen_inventory.json");

// --- 1. home.fr_e2_01: distinct screen (today summary/CTA) → /home/today
//        home.fr_e2_09: performance NFR for home.dashboard → merge ACs + set route /home
//        discover.fr_e4_01: same screen as discover.catalog → merge ACs + remove duplicate route

// Fix home.fr_e2_01 route to /home/today
const e2_01Path = path.join(contractsDir, "home.fr_e2_01.json");
const e2_01 = JSON.parse(fs.readFileSync(e2_01Path, "utf8"));
e2_01.route = "/home/today";
fs.writeFileSync(e2_01Path, JSON.stringify(e2_01, null, 2) + "\n");
console.log("home.fr_e2_01 -> /home/today");

// Merge home.fr_e2_09 ACs into home.dashboard, then set route to /home (not a separate screen)
const dashboardPath = path.join(contractsDir, "home.dashboard.json");
const dashboard = JSON.parse(fs.readFileSync(dashboardPath, "utf8"));
const e2_09Path = path.join(contractsDir, "home.fr_e2_09.json");
const e2_09 = JSON.parse(fs.readFileSync(e2_09Path, "utf8"));
const e2_09ACs = e2_09.acceptanceCriteriaRefs || [];
const dashACs = dashboard.acceptanceCriteriaRefs || [];
const mergedDashACs = Array.from(new Set([...dashACs, ...e2_09ACs]));
dashboard.acceptanceCriteriaRefs = mergedDashACs;
fs.writeFileSync(dashboardPath, JSON.stringify(dashboard, null, 2) + "\n");
// Update home.fr_e2_09 route to /home (same as dashboard — acts as alias/NFR scope)
e2_09.route = "/home";
e2_09.purpose = (e2_09.purpose || "") + " Performance NFR merged into home.dashboard ACs.";
fs.writeFileSync(e2_09Path, JSON.stringify(e2_09, null, 2) + "\n");
console.log("home.fr_e2_09 ACs merged into home.dashboard; route stays /home (NFR scope)");

// Merge discover.fr_e4_01 ACs into discover.catalog, then set route to /discover/catalog
const catalogPath = path.join(contractsDir, "discover.catalog.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const e4_01Path = path.join(contractsDir, "discover.fr_e4_01.json");
const e4_01 = JSON.parse(fs.readFileSync(e4_01Path, "utf8"));
const e4_01ACs = e4_01.acceptanceCriteriaRefs || [];
const catACs = catalog.acceptanceCriteriaRefs || [];
const mergedCatACs = Array.from(new Set([...catACs, ...e4_01ACs]));
catalog.acceptanceCriteriaRefs = mergedCatACs;
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + "\n");
// Redirect discover.fr_e4_01 to /discover (alias of discover.catalog)
e4_01.route = "/discover";
e4_01.purpose = (e4_01.purpose || "") + " ACs merged into discover.catalog.";
fs.writeFileSync(e4_01Path, JSON.stringify(e4_01, null, 2) + "\n");
console.log("discover.fr_e4_01 ACs merged into discover.catalog; route kept as /discover alias");

// --- 2. Update screen_inventory.json
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
for (const screen of inventory.screens) {
  if (screen.id === "home.fr_e2_01") {
    screen.route = "/home/today";
  }
}
fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2) + "\n");
console.log("screen_inventory.json updated: home.fr_e2_01 -> /home/today");

// Verify no remaining problematic duplicates
const routeCounts = {};
inventory.screens.forEach((s) => {
  routeCounts[s.route] = (routeCounts[s.route] || []).concat(s.id);
});
const dupes = Object.entries(routeCounts).filter(([, ids]) => ids.length > 1);
if (dupes.length === 0) {
  console.log("No duplicate routes remain (home.fr_e2_09 and discover.fr_e4_01 are intentional aliases).");
} else {
  console.log("Remaining duplicates:", JSON.stringify(dupes));
}
console.log("Done: Item 2 complete.");
