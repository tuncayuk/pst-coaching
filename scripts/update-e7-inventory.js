#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const INVENTORY_PATH = path.join(__dirname, "../artifacts/ux/screen_inventory.json");

const UPDATES = {
  "reader.fr_e7_01": { route: "/ebook/reader", title: "e-Kitap okuyucu acilisi" },
  "reader.fr_e7_02": { route: "/ebook/navigation", title: "Sayfa navigasyonu" },
  "reader.fr_e7_03": { route: "/ebook/settings", title: "Okuma ayarlari" },
  "reader.fr_e7_04": { route: "/ebook/highlight-create", title: "Metin vurgulama ve not" },
  "reader.fr_e7_05": { route: "/ebook/highlights", title: "Vurgularim ve notlarim" },
  "reader.fr_e7_06": { route: "/ebook/audio", title: "Sesli kitap destegi" },
  "reader.fr_e7_07": { route: "/ebook/progress", title: "Okuma ilerlemesi" },
  "reader.fr_e7_08": { route: "/ebook/download", title: "Cevrimdisi indirme" },
};

const inv = JSON.parse(fs.readFileSync(INVENTORY_PATH, "utf8"));
let updated = 0;
for (const screen of inv.screens) {
  if (UPDATES[screen.id]) {
    const prev = screen.route;
    screen.route = UPDATES[screen.id].route;
    screen.title = UPDATES[screen.id].title;
    console.log(`Updated ${screen.id}: ${prev} -> ${screen.route}`);
    updated++;
  }
}
fs.writeFileSync(INVENTORY_PATH, JSON.stringify(inv, null, 2), "utf8");
console.log(`\nDone: ${updated} entries updated.`);
