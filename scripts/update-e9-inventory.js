#!/usr/bin/env node
// update-e9-inventory.js — Updates all 6 EPIC-9 inventory entries with correct routes.
const fs = require('fs');
const path = require('path');

const INVENTORY_PATH = path.join(__dirname, '../artifacts/ux/screen_inventory.json');
const raw = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));
const inventory = Array.isArray(raw) ? raw : raw.screens || raw.items || [];

const ROUTE_MAP = {
  'favorites.fr_e9_01': '/favorites',
  'favorites.fr_e9_02': '/favorites/detail',
  'favorites.fr_e9_03': '/favorites/collections',
  'favorites.fr_e9_04': '/favorites/collection-detail',
  'favorites.fr_e9_05': '/favorites/export',
  'favorites.fr_e9_06': '/favorites/downloads'
};

let updated = 0;
for (const entry of inventory) {
  if (ROUTE_MAP[entry.id]) {
    entry.route = ROUTE_MAP[entry.id];
    updated++;
    console.log(`Updated ${entry.id}  route=${entry.route}`);
  }
}

fs.writeFileSync(
  INVENTORY_PATH,
  JSON.stringify(Array.isArray(raw) ? inventory : { ...raw, screens: inventory }, null, 2),
  'utf8'
);
console.log(`\nInventory entries updated: ${updated}/6`);
