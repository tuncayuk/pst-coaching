#!/usr/bin/env node
// ascii-fix-e10.js — Replaces non-ASCII characters in EPIC-10 screen files
const fs = require('fs');
const path = require('path');

const PROFILE_DIR = path.join(__dirname, '../apps/mobile/screens/profile');
const FILES = [
  'ProfileAccessibilityScreen.tsx',
  'ProfileTextScaleScreen.tsx',
  'ProfileThemeScreen.tsx',
  'ProfileScreenReaderScreen.tsx'
];

// Map of Unicode → ASCII replacement
const REPLACEMENTS = [
  // Right single angle quotation (›)
  ['\u203A', '>'],
  // Middle dot (·)
  ['\u00B7', '-'],
  // Em dash (—)
  ['\u2014', '-'],
  // En dash (–)
  ['\u2013', '-'],
  // Unicode geometric symbols used as visual icons
  ['\u25C8', '[D]'], // ◈ deuteranopia
  ['\u25C9', '[P]'], // ◉ protanopia
  ['\u25CE', '[T]'], // ◎ tritanopia
  ['\u25CF', '[N]'], // ● normal
  // Turkish specific characters
  ['\u00FC', 'u'], // ü → u
  ['\u00DC', 'U'], // Ü → U
  ['\u00F6', 'o'], // ö → o
  ['\u00D6', 'O'], // Ö → O
  ['\u00E7', 'c'], // ç → c
  ['\u00C7', 'C'], // Ç → C
  ['\u015F', 's'], // ş → s
  ['\u015E', 'S'], // Ş → S
  ['\u011F', 'g'], // ğ → g
  ['\u011E', 'G'], // Ğ → G
  ['\u0131', 'i'], // ı → i  (Turkish undotted i)
  ['\u0130', 'I'], // İ → I  (Turkish dotted I)
  ['\u00E2', 'a'], // â → a
  ['\u00EE', 'i'] // î → i
];

let totalFixed = 0;
for (const filename of FILES) {
  const fp = path.join(PROFILE_DIR, filename);
  if (!fs.existsSync(fp)) {
    console.log(`SKIP (missing): ${filename}`);
    continue;
  }
  let content = fs.readFileSync(fp, 'utf8');
  let fileFixed = 0;
  for (const [from, to] of REPLACEMENTS) {
    const re = new RegExp(from, 'g');
    const before = content;
    content = content.replace(re, to);
    if (content !== before) {
      const count = (before.match(re) || []).length;
      fileFixed += count;
    }
  }
  fs.writeFileSync(fp, content, 'utf8');
  totalFixed += fileFixed;
  console.log(`${filename}: ${fileFixed} replacements`);
}
console.log(`\nTotal replacements: ${totalFixed}`);
