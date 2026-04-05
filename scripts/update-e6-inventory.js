#!/usr/bin/env node
'use strict';
const fs = require('fs');
const INVENTORY_PATH = require('path').join(__dirname, '../artifacts/ux/screen_inventory.json');

const updates = {
  'progress.fr_e6_01': { route: '/progress/dashboard', title: 'Gelisim paneli' },
  'progress.fr_e6_02': { route: '/progress/emotional-map', title: 'Duygusal harita' },
  'progress.fr_e6_03': { route: '/progress/strengths', title: 'Guclu ve gelisim alanlari' },
  'progress.fr_e6_04': { route: '/progress/weekly-summary', title: 'Haftalik ozet' },
  'progress.fr_e6_05': {
    route: '/progress/completion-review',
    title: 'Icerik bitis degerlendirmesi'
  },
  'progress.fr_e6_06': { route: '/progress/report-export', title: 'Gelisim raporu (indir/paylas)' }
};

const inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));
let updated = 0;

for (const screen of inventory.screens) {
  if (updates[screen.id]) {
    const u = updates[screen.id];
    const prevRoute = screen.route;
    screen.route = u.route;
    screen.title = u.title;
    updated++;
    console.log(`Updated ${screen.id}: ${prevRoute} -> ${u.route}`);
  }
}

fs.writeFileSync(INVENTORY_PATH, JSON.stringify(inventory, null, 2) + '\n', 'utf8');
console.log(`\nDone: ${updated} entries updated.`);
