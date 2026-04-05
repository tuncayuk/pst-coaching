#!/usr/bin/env node
// fix-e8-ascii.js — Removes/replaces all non-ASCII chars in EPIC-8 screen files.
const fs = require("fs");
const path = require("path");

const SCREENS_DIR = path.join(__dirname, "../apps/mobile/screens/content");

const SCREEN_FILES = [
  "ContentWorkshopDetailScreen.tsx",
  "ContentWorkshopHomeScreen.tsx",
  "ContentWorkshopSectionScreen.tsx",
  "ContentWorkshopCampScreen.tsx",
  "ContentWorkshopGuideScreen.tsx",
  "ContentWorkshopWorkbookScreen.tsx",
  "ContentWorkshopFollowUpScreen.tsx",
  "ContentWorkshopCompletionScreen.tsx",
];

// Map non-ASCII sequences to ASCII replacements
const REPLACEMENTS = [
  // Turkish characters
  [/ğ/g, "g"],
  [/Ğ/g, "G"],
  [/ş/g, "s"],
  [/Ş/g, "S"],
  [/ı/g, "i"],
  [/İ/g, "I"],
  [/ü/g, "u"],
  [/Ü/g, "U"],
  [/ö/g, "o"],
  [/Ö/g, "O"],
  [/ç/g, "c"],
  [/Ç/g, "C"],
  // Curly quotes → straight
  [/\u201C|\u201D/g, '"'],
  [/\u2018|\u2019/g, "'"],
  // Em dash, en dash
  [/\u2014/g, "--"],
  [/\u2013/g, "-"],
  // Bullet points
  [/\u2022/g, "*"],
  [/\u00B7/g, "*"],
  // Check mark
  [/✓/g, "OK"],
  // Trophy / medal emojis (replace with text equivalent)
  [/🏆/g, "[Kupa]"],
  [/🥇/g, "[Altin]"],
  [/🌱/g, "[Filiz]"],
  // Any remaining non-ASCII
  [/[^\x00-\x7F]/g, "?"],
];

let fixedCount = 0;
for (const filename of SCREEN_FILES) {
  const filePath = path.join(SCREENS_DIR, filename);
  let content = fs.readFileSync(filePath, "utf8");
  const before = content.length;
  for (const [pattern, replacement] of REPLACEMENTS) {
    content = content.replace(pattern, replacement);
  }
  fs.writeFileSync(filePath, content, "utf8");
  // Verify clean
  const remaining = content.match(/[^\x00-\x7F]/g);
  if (remaining) {
    console.warn(`WARN ${filename}: ${remaining.length} non-ASCII remain`);
  } else {
    fixedCount++;
    console.log(`CLEAN ${filename}`);
  }
}

console.log(`\nFixed: ${fixedCount}/${SCREEN_FILES.length} screens now ASCII clean`);
