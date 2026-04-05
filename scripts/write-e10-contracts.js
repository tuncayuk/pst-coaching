#!/usr/bin/env node
// write-e10-contracts.js — Writes all 4 EPIC-10 contracts + updates inventory
const fs = require("fs");
const path = require("path");

const CONTRACTS_DIR = path.join(__dirname, "../artifacts/ux/screen_contracts");
const INVENTORY_PATH = path.join(__dirname, "../artifacts/ux/screen_inventory.json");

// Canonical routes for EPIC-10
const ROUTES = {
  "accessibility.fr_e10_01": "/accessibility",
  "accessibility.fr_e10_02": "/accessibility/text-scale",
  "accessibility.fr_e10_03": "/accessibility/theme",
  "accessibility.fr_e10_04": "/accessibility/screen-reader",
};

const CONTRACTS = [
  {
    id: "accessibility.fr_e10_01",
    title: "Erisilebilirlik ayarlari",
    route: ROUTES["accessibility.fr_e10_01"],
    purpose: "Implements FR-E10-01: Erisilebilirlik ayarlari hub - metin boyutu, yuksek kontrast, hareket azaltma.",
    entryPoints: ["profile.accessibility"],
    inputs: [
      { name: "userId", type: "uuid", required: true, source: "session" },
      { name: "subscriptionStatus", type: "SubscriptionStatus", required: true, source: "entitlement_cache" },
      { name: "locale", type: "LanguageCode", required: true, source: "profile" },
    ],
    dataDependencies: ["AccessibilitySettings", "User"],
    uiStates: {
      loading: { description: "Skeleton placeholders shown while loading accessibility settings." },
      ready: { description: "All toggles interactive: high contrast, reduce motion. Navigation to text-scale, theme, screen-reader sub-screens." },
      empty: { description: "Default settings displayed with reset CTA." },
      error: { description: "Error state recoverable with retry action." },
      offline: { description: "Cached settings shown; writes queued for sync." },
    },
    analytics: {
      screenView: "accessibility_settings_viewed",
      events: ["accessibility_settings_viewed", "accessibility_toggle_changed"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E10-01-01", "AC-FR-E10-01-02", "AC-FR-E10-01-03"],
    gates: ["auth"],
  },
  {
    id: "accessibility.fr_e10_02",
    title: "Metin buyutme",
    route: ROUTES["accessibility.fr_e10_02"],
    purpose: "Implements FR-E10-02: Metin buyutme - slider/step selector with live preview.",
    entryPoints: ["profile.accessibility", "accessibility.fr_e10_01"],
    inputs: [
      { name: "userId", type: "uuid", required: true, source: "session" },
      { name: "currentTextSize", type: "string", required: false, source: "accessibility_settings" },
    ],
    dataDependencies: ["AccessibilitySettings"],
    uiStates: {
      loading: { description: "Skeleton shown while loading current text size setting." },
      ready: { description: "Step selector (5 levels) with live preview paragraph. Save button persists choice." },
      empty: { description: "Default Medium size pre-selected." },
      error: { description: "Error state with retry CTA." },
      offline: { description: "Last saved size shown; changes queued for sync." },
    },
    analytics: {
      screenView: "text_scale_viewed",
      events: ["text_scale_viewed", "text_scale_changed"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E10-02-01", "AC-FR-E10-02-02", "AC-FR-E10-02-03"],
    gates: ["auth"],
  },
  {
    id: "accessibility.fr_e10_03",
    title: "Yuksek kontrast ve tema",
    route: ROUTES["accessibility.fr_e10_03"],
    purpose: "Implements FR-E10-03: Tema secimi (Acik/Koyu/Sistem), yuksek kontrast 7:1, renk koru deseni.",
    entryPoints: ["profile.accessibility", "accessibility.fr_e10_01"],
    inputs: [
      { name: "userId", type: "uuid", required: true, source: "session" },
      { name: "currentTheme", type: "string", required: false, source: "accessibility_settings" },
    ],
    dataDependencies: ["AccessibilitySettings"],
    uiStates: {
      loading: { description: "Skeleton shown while loading theme and contrast settings." },
      ready: { description: "Theme radio group (Acik/Koyu/Sistem), high contrast toggle, color blindness mode chips." },
      empty: { description: "Default System theme shown." },
      error: { description: "Error state with retry CTA." },
      offline: { description: "Last saved theme shown; changes queued for sync." },
    },
    analytics: {
      screenView: "theme_settings_viewed",
      events: ["theme_settings_viewed", "theme_changed", "high_contrast_toggled", "color_blind_mode_changed"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E10-03-01", "AC-FR-E10-03-02", "AC-FR-E10-03-03"],
    gates: ["auth"],
  },
  {
    id: "accessibility.fr_e10_04",
    title: "Ekran okuyucu uyumu",
    route: ROUTES["accessibility.fr_e10_04"],
    purpose: "Implements FR-E10-04: Ekran okuyucu uyumu - etiket durumu, odak sirasi, form etiketleri, gorsel alternatifleri.",
    entryPoints: ["profile.accessibility", "accessibility.fr_e10_01"],
    inputs: [
      { name: "userId", type: "uuid", required: true, source: "session" },
    ],
    dataDependencies: ["AccessibilitySettings"],
    uiStates: {
      loading: { description: "Skeleton shown while loading screen reader compatibility status." },
      ready: { description: "Feature checklist with status indicators. Tips and toggle for enhanced screen reader mode." },
      empty: { description: "Default state with all features shown as supported." },
      error: { description: "Error state with retry CTA." },
      offline: { description: "Cached status shown offline." },
    },
    analytics: {
      screenView: "screen_reader_settings_viewed",
      events: ["screen_reader_settings_viewed", "screen_reader_mode_toggled"],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E10-04-01",
      "AC-FR-E10-04-02",
      "AC-FR-E10-04-03",
      "AC-FR-E10-04-04",
    ],
    gates: ["auth"],
  },
];

// Write contracts
let written = 0;
for (const contract of CONTRACTS) {
  const filePath = path.join(CONTRACTS_DIR, `${contract.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(contract, null, 2), "utf8");
  written++;
  console.log(`Wrote ${contract.id}.json  route=${contract.route}`);
}
console.log(`Contracts written: ${written}/${CONTRACTS.length}`);

// Update inventory
const inventoryFile = JSON.parse(fs.readFileSync(INVENTORY_PATH, "utf8"));
const inventory = inventoryFile.screens ?? inventoryFile;
let updated = 0;
for (const entry of inventory) {
  if (ROUTES[entry.id]) {
    entry.route = ROUTES[entry.id];
    updated++;
    console.log(`Updated inventory ${entry.id}  route=${entry.route}`);
  }
}
fs.writeFileSync(INVENTORY_PATH, JSON.stringify(inventoryFile, null, 2), "utf8");
console.log(`Inventory entries updated: ${updated}/${Object.keys(ROUTES).length}`);
