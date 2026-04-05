#!/usr/bin/env node
// update-e8-inventory.js — Updates all 8 EPIC-8 inventory entries with correct routes.
const fs = require("fs");
const path = require("path");

const INVENTORY_PATH = path.join(__dirname, "../artifacts/ux/screen_inventory.json");
const raw = JSON.parse(fs.readFileSync(INVENTORY_PATH, "utf8"));
const inventory = Array.isArray(raw) ? raw : (raw.screens || raw.items || []);

const ROUTE_MAP = {
  "workshop.fr_e8_01": "/workshop/landing",
  "workshop.fr_e8_02": "/workshop/phases",
  "workshop.fr_e8_03": "/workshop/section",
  "workshop.fr_e8_04": "/workshop/camp",
  "workshop.fr_e8_05": "/workshop/guide",
  "workshop.fr_e8_06": "/workshop/workbook",
  "workshop.fr_e8_07": "/workshop/followup",
  "workshop.fr_e8_08": "/workshop/completion",
};

let updated = 0;
for (const entry of inventory) {
  if (ROUTE_MAP[entry.id]) {
    entry.route = ROUTE_MAP[entry.id];
    updated++;
    console.log(`Updated ${entry.id}  route=${entry.route}`);
  }
}

fs.writeFileSync(INVENTORY_PATH, JSON.stringify(Array.isArray(raw) ? inventory : { ...raw, screens: inventory }, null, 2), "utf8");
console.log(`\nInventory entries updated: ${updated}/8`);
