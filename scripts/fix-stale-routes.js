#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const contractsDir = path.join(__dirname, "../artifacts/ux/screen_contracts");
const inventoryPath = path.join(__dirname, "../artifacts/ux/screen_inventory.json");

// Canonical route map for all 29 stale screens
const routeMap = {
  // EPIC-1: Auth + Onboarding
  "auth.fr_e1_01": "/onboarding/language",
  "auth.fr_e1_02": "/auth/register",
  "auth.fr_e1_03": "/auth/login",
  "auth.fr_e1_04": "/auth/password-reset",
  "auth.fr_e1_05": "/auth/session",
  "auth.fr_e1_06": "/auth/subscription-gate",
  "auth.fr_e1_07": "/auth/biometric",
  "auth.fr_e1_08": "/auth/demographics",
  "auth.fr_e1_09": "/auth/guest",
  // EPIC-13: Collaborative Reading
  "collab.fr_e13_01": "/collab/groups",
  "collab.fr_e13_02": "/collab/groups/create",
  "collab.fr_e13_03": "/collab/groups/detail",
  "collab.fr_e13_04": "/collab/groups/progress",
  // EPIC-14: Book Club
  "bookclub.fr_e14_01": "/book-club",
  "bookclub.fr_e14_02": "/book-club/create",
  "bookclub.fr_e14_03": "/book-club/detail",
  "bookclub.fr_e14_04": "/book-club/discussion",
  // EPIC-15: Gamification
  "gamification.fr_e15_01": "/gamification/achievements",
  "gamification.fr_e15_02": "/gamification/badge-detail",
  "gamification.fr_e15_03": "/gamification/levels",
  "gamification.fr_e15_04": "/gamification/leaderboard",
  // EPIC-16: AI Assistant
  "assistant.fr_e16_01": "/assistant/chat",
  "assistant.fr_e16_02": "/assistant/rag-response",
  "assistant.fr_e16_03": "/assistant/sources",
  "assistant.fr_e16_04": "/assistant/insights",
  // EPIC-18: Video
  "video.fr_e18_01": "/video/catalog",
  "video.fr_e18_02": "/video/player",
  "video.fr_e18_03": "/video/accessibility",
  "video.fr_e18_04": "/video/progress",
};

// 1. Update contracts
let contractsUpdated = 0;
for (const [id, route] of Object.entries(routeMap)) {
  const filePath = path.join(contractsDir, id + ".json");
  if (!fs.existsSync(filePath)) {
    console.warn("MISSING contract:", id);
    continue;
  }
  const contract = JSON.parse(fs.readFileSync(filePath, "utf8"));
  contract.route = route;
  fs.writeFileSync(filePath, JSON.stringify(contract, null, 2) + "\n");
  contractsUpdated++;
}
console.log(`Updated ${contractsUpdated} contracts.`);

// 2. Update screen_inventory.json
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
let inventoryUpdated = 0;
for (const screen of inventory.screens) {
  if (routeMap[screen.id]) {
    screen.route = routeMap[screen.id];
    inventoryUpdated++;
  }
}
fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2) + "\n");
console.log(`Updated ${inventoryUpdated} inventory entries.`);
console.log("Done: Item 1 complete.");
