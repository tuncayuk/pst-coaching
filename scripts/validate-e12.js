#!/usr/bin/env node
// validate-e12.js — Validate EPIC-12 contracts, inventory, screens
const fs = require("fs");
const path = require("path");

const EXPECTED = {
  "coach.fr_e12_01": { route: "/coach/dashboard",         screen: "CoachDashboardScreen.tsx",        ac: 4 },
  "coach.fr_e12_02": { route: "/coach/client",            screen: "CoachClientProfileScreen.tsx",    ac: 4 },
  "coach.fr_e12_03": { route: "/coach/client/content",    screen: "CoachContentTrackingScreen.tsx",  ac: 4 },
  "coach.fr_e12_04": { route: "/coach/feedback",          screen: "CoachFeedbackScreen.tsx",         ac: 4 },
};

const CONTRACT_DIR = path.join(__dirname, "../artifacts/ux/screen_contracts");
const INV_FILE     = path.join(__dirname, "../artifacts/ux/screen_inventory.json");
const SCREEN_DIR   = path.join(__dirname, "../apps/mobile/screens/coach");

let passed = 0, failed = 0;
function pass(msg)  { console.log("  PASS  " + msg); passed++;  }
function fail(msg)  { console.log("  FAIL  " + msg); failed++;  }

// 1. Contracts
console.log("\n[Contracts]");
for (const [id, cfg] of Object.entries(EXPECTED)) {
  const fp = path.join(CONTRACT_DIR, id + ".json");
  try {
    const c = JSON.parse(fs.readFileSync(fp, "utf8"));
    if (c.route === cfg.route) pass(id + " -> " + cfg.route);
    else fail(id + " route mismatch: got " + c.route);
    if (c.acceptanceCriteriaRefs?.length === cfg.ac) pass(id + " ACs: " + cfg.ac + "/" + cfg.ac);
    else fail(id + " ACs: expected " + cfg.ac + " got " + (c.acceptanceCriteriaRefs?.length ?? 0));
  } catch { fail(id + " parse error"); }
}

// 2. Inventory
console.log("\n[Inventory]");
const inv = JSON.parse(fs.readFileSync(INV_FILE, "utf8"));
for (const [id, cfg] of Object.entries(EXPECTED)) {
  const s = inv.screens.find((x) => x.id === id);
  if (s && s.route === cfg.route) pass(id + " -> " + cfg.route);
  else fail(id + " -> " + (s?.route ?? "not found"));
}

// 3. Screens
console.log("\n[Screens]");
for (const [id, cfg] of Object.entries(EXPECTED)) {
  const fp = path.join(SCREEN_DIR, cfg.screen);
  if (!fs.existsSync(fp)) { fail(cfg.screen + " missing"); continue; }
  const txt = fs.readFileSync(fp, "utf8");
  if (!/export (const|function)/.test(txt)) { fail(cfg.screen + " no export"); continue; }
  const nonAscii = txt.split("").some(c => c.charCodeAt(0) > 127);
  if (nonAscii) { fail(cfg.screen + " has non-ASCII chars"); continue; }
  pass(cfg.screen);
}

// 4. CoachStack
console.log("\n[CoachStack]");
const stackFile = path.join(__dirname, "../apps/mobile/navigation/CoachStack.tsx");
if (fs.existsSync(stackFile)) {
  const stack = fs.readFileSync(stackFile, "utf8");
  const screens = ["CoachDashboard","CoachClientProfile","CoachContentTracking","CoachFeedback"];
  screens.forEach(s => {
    if (stack.includes(s)) pass("CoachStack has " + s);
    else fail("CoachStack missing " + s);
  });
} else { fail("CoachStack.tsx not found"); }

// 5. App.tsx registration
console.log("\n[App.tsx]");
const appFile = path.join(__dirname, "../apps/mobile/App.tsx");
const app = fs.readFileSync(appFile, "utf8");
if (app.includes("CoachStack")) pass("App.tsx imports CoachStack");
else fail("App.tsx missing CoachStack import");
if (app.includes("name=\"Coach\"")) pass("App.tsx registers Coach screen");
else fail("App.tsx missing Coach screen");

// 6. mockSelectors
console.log("\n[mockSelectors]");
const selFile = path.join(__dirname, "../apps/mobile/data/mockSelectors.ts");
const sel = fs.readFileSync(selFile, "utf8");
["getCoachAssignments","getClientsForCoach","getCommentsForClient","getSessionsForUser"].forEach(fn => {
  if (sel.includes(fn)) pass("mockSelectors exports " + fn);
  else fail("mockSelectors missing " + fn);
});

// Summary
console.log("\n" + "=".repeat(40));
console.log("  Passed: " + passed + "  Failed: " + failed);
console.log(failed === 0 ? "  ALL PASS" : "  SOME FAILURES");
process.exit(failed > 0 ? 1 : 0);
