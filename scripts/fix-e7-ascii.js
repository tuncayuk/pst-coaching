#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const BASE = '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/content';

const TR_MAP = [
  [/\u00fc/g, 'u'],
  [/\u00dc/g, 'U'],
  [/\u00f6/g, 'o'],
  [/\u00d6/g, 'O'],
  [/\u00e7/g, 'c'],
  [/\u00c7/g, 'C'],
  [/\u0131/g, 'i'],
  [/\u0130/g, 'I'],
  [/\u015f/g, 's'],
  [/\u015e/g, 'S'],
  [/\u011f/g, 'g'],
  [/\u011e/g, 'G'],
  [/\u00e2/g, 'a'],
  [/\u00e4/g, 'a'],
  [/\u00e0/g, 'a'],
  [/\u00e1/g, 'a']
];

const SCREENS = [
  'ContentEbookDetailScreen.tsx',
  'ContentEbookReaderScreen.tsx',
  'ContentEbookTocScreen.tsx',
  'ContentEbookHighlightsScreen.tsx',
  'ContentEbookSettingsScreen.tsx'
];

for (const screen of SCREENS) {
  const fp = path.join(BASE, screen);
  let content = fs.readFileSync(fp, 'utf8');
  for (const [pat, rep] of TR_MAP) {
    content = content.replace(pat, rep);
  }
  fs.writeFileSync(fp, content, 'utf8');
  console.log('Cleaned:', screen);
}
console.log('Done.');
