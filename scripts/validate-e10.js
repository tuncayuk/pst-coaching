#!/usr/bin/env node
// validate-e10.js
const fs = require("fs");
const path = require("path");

const BASE = path.join(__dirname, "..");
let pass = 0, fail = 0;

function check(label, cond, detail) {
  if (cond) { console.log("  PASS: " + label); pass++; }
  else { console.log("  FAIL: " + label + (detail ? " -- " + detail : "")); fail++; }
}

// 1. Contracts
console.log("\n=== Contracts ===");
const expectedContracts = [
  { id: "accessibility.fr_e10_01", route: "/accessibility",           acs: 3 },
  { id: "accessibility.fr_e10_02", route: "/accessibility/text-scale", acs: 3 },
  { id: "accessibility.fr_e10_03", route: "/accessibility/theme",      acs: 3 },
  { id: "accessibility.fr_e10_04", route: "/accessibility/screen-reader", acs: 4 },
];
for (const exp of expectedContracts) {
  const fp = path.join(BASE, "artifacts/ux/screen_contracts", exp.id + ".json");
  let c;
  try { c = JSON.parse(fs.readFileSync(fp, "utf8")); } catch { check(exp.id + " parseable", false); continue; }
  check(exp.id + " parseable", true);
  check(exp.id + " route=" + exp.route, c.route === exp.route, "got " + c.route);
  check(exp.id + " acs=" + exp.acs, (c.acceptanceCriteriaRefs || []).length === exp.acs, "got " + (c.acceptanceCriteriaRefs || []).length);
}

// 2. Inventory
console.log("\n=== Inventory ===");
const invRaw = JSON.parse(fs.readFileSync(path.join(BASE, "artifacts/ux/screen_inventory.json"), "utf8"));
const inv = invRaw.screens || invRaw;
for (const exp of expectedContracts) {
  const entry = inv.find(e => e.id === exp.id);
  check(exp.id + " in inventory", !!entry);
  if (entry) check(exp.id + " inventory route=" + exp.route, entry.route === exp.route, "got " + entry.route);
}

// 3. Screen files
console.log("\n=== Screen Files ===");
const screenFiles = [
  "ProfileAccessibilityScreen.tsx",
  "ProfileTextScaleScreen.tsx",
  "ProfileThemeScreen.tsx",
  "ProfileScreenReaderScreen.tsx",
];
for (const sf of screenFiles) {
  const fp = path.join(BASE, "apps/mobile/screens/profile", sf);
  const exists = fs.existsSync(fp);
  check(sf + " exists", exists);
  if (exists) {
    const content = fs.readFileSync(fp, "utf8");
    check(sf + " has exports", content.includes("export const Profile"));
    check(sf + " ASCII clean", !/[^\x00-\x7F]/.test(content), "non-ASCII detected");
  }
}

// 4. ProfileStack
console.log("\n=== ProfileStack ===");
const stackContent = fs.readFileSync(path.join(BASE, "apps/mobile/navigation/ProfileStack.tsx"), "utf8");
for (const name of ["ProfileTextScaleScreen", "ProfileThemeScreen", "ProfileScreenReaderScreen"]) {
  check("ProfileStack imports " + name, stackContent.includes(name));
}
check("ProfileStack param ProfileTextScale", stackContent.includes("ProfileTextScale:"));
check("ProfileStack param ProfileTheme", stackContent.includes("ProfileTheme:"));
check("ProfileStack param ProfileScreenReader", stackContent.includes("ProfileScreenReader:"));

// 5. Navigation back routes  
console.log("\n=== Navigation ===");
const acc = fs.readFileSync(path.join(BASE, "apps/mobile/screens/profile/ProfileAccessibilityScreen.tsx"), "utf8");
check("Hub navigates to ProfileTextScale", acc.includes("ProfileTextScale"));
check("Hub navigates to ProfileTheme", acc.includes("ProfileTheme"));
check("Hub navigates to ProfileScreenReader", acc.includes("ProfileScreenReader"));
const tscale = fs.readFileSync(path.join(BASE, "apps/mobile/screens/profile/ProfileTextScaleScreen.tsx"), "utf8");
check("TextScale has goBack", tscale.includes("goBack"));
const theme = fs.readFileSync(path.join(BASE, "apps/mobile/screens/profile/ProfileThemeScreen.tsx"), "utf8");
check("Theme has goBack", theme.includes("goBack"));
const sr = fs.readFileSync(path.join(BASE, "apps/mobile/screens/profile/ProfileScreenReaderScreen.tsx"), "utf8");
check("ScreenReader has goBack", sr.includes("goBack"));

// Summary
console.log("\n=== Summary ===");
console.log("PASS: " + pass + "  FAIL: " + fail);
process.exit(fail > 0 ? 1 : 0);
