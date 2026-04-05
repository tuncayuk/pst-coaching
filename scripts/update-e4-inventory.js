#!/usr/bin/env node
'use strict';
const fs = require('fs');
const INVENTORY_PATH = '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/artifacts/ux/screen_inventory.json';

const updates = {
  'discover.fr_e4_01': { route: '/discover', title: 'Kesfet Ana Ekrani' },
  'discover.fr_e4_02': { route: '/discover/assistant', title: 'Icerik Belirleme Asistani' },
  'discover.fr_e4_03': { route: '/discover/journeys', title: 'Yolculuk Katalogu ve Detayi' },
  'discover.fr_e4_04': { route: '/discover/workshops', title: 'Atolye Katalogu ve Detayi' },
  'discover.fr_e4_05': { route: '/discover/modules', title: 'Modul Katalogu ve Detayi' },
  'discover.fr_e4_06': { route: '/discover/ebooks', title: 'e-Kitap Katalogu ve Detayi' },
  'discover.fr_e4_07': { route: '/content/launch', title: 'Icerik Baslatma (Ortak Akis)' },
  'discover.fr_e4_08': {
    route: '/discover/guest',
    title: 'Misafir Goruntuleme ve Kayit Zorunlulugu'
  },
  'discover.fr_e4_09': {
    route: '/discover/demographics-gate',
    title: 'Icerik Turune Ozel Demografi Giris Noktalari'
  },
  'discover.fr_e4_10': { route: '/discover/ddl-test', title: 'Ilk Yolculukta DDL Testi' }
};

const inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));
let changed = 0;
for (const screen of inventory.screens) {
  const update = updates[screen.id];
  if (update) {
    screen.route = update.route;
    screen.title = update.title;
    changed++;
    console.log('Updated:', screen.id, '->', update.route);
  }
}
fs.writeFileSync(INVENTORY_PATH, JSON.stringify(inventory, null, 2) + '\n', 'utf8');
console.log(`\nDone: ${changed} entries updated`);
