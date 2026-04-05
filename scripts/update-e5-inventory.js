#!/usr/bin/env node
'use strict';
const fs = require('fs');
const INVENTORY_PATH = require('path').join(__dirname, '../artifacts/ux/screen_inventory.json');

const updates = {
  'reading.fr_e5_01': { route: '/content/reading', title: 'Gunun icerigini okuma' },
  'reading.fr_e5_02': { route: '/content/audio', title: 'Sesli okuma' },
  'reading.fr_e5_03': { route: '/content/highlights', title: 'Altini cizme ve not alma' },
  'reading.fr_e5_04': { route: '/content/comment', title: 'Yorum yazma ve teslim' },
  'reading.fr_e5_05': { route: '/content/locked', title: 'Kilitli ilerleme (08:00 kurali)' },
  'reading.fr_e5_06': { route: '/content/exercise', title: 'Uygulama/egzersiz tamamlama' }
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
    console.log(`Updated ${screen.id}: route ${prevRoute} -> ${u.route}`);
  }
}

fs.writeFileSync(INVENTORY_PATH, JSON.stringify(inventory, null, 2) + '\n', 'utf8');
console.log(`\nDone: ${updated} entries updated.`);
