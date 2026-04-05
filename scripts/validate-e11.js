#!/usr/bin/env node
// validate-e11.js — Validate EPIC-11 artifacts: contracts, inventory, screen files
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const contractIds = [
  'modules.fr_e11_01',
  'modules.fr_e11_02',
  'modules.fr_e11_03',
  'modules.fr_e11_04',
  'modules.fr_e11_05'
];

const expectedRoutes = {
  'modules.fr_e11_01': '/modules',
  'modules.fr_e11_02': '/modules/package',
  'modules.fr_e11_03': '/modules/package/exercise',
  'modules.fr_e11_04': '/modules/package/locked',
  'modules.fr_e11_05': '/modules/completion'
};

const screenFiles = [
  'apps/mobile/screens/content/ContentModuleHomeScreen.tsx',
  'apps/mobile/screens/content/ContentPackageDetailScreen.tsx',
  'apps/mobile/screens/content/ContentExerciseScreen.tsx',
  'apps/mobile/screens/content/ContentAchievementScreen.tsx'
];

let pass = 0;
let fail = 0;

function ok(msg) {
  console.log('  PASS  ' + msg);
  pass++;
}
function ko(msg) {
  console.log('  FAIL  ' + msg);
  fail++;
}

// 1. Contracts
console.log('\n[Contracts]');
contractIds.forEach(id => {
  const fp = path.join(ROOT, 'artifacts/ux/screen_contracts', id + '.json');
  try {
    const c = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const route = c.route || (c.navigation && c.navigation.route);
    if (route === expectedRoutes[id]) {
      ok(id + ' -> ' + route);
    } else {
      ko(id + ' route=' + route + ' expected=' + expectedRoutes[id]);
    }
  } catch (e) {
    ko(id + ' (parse error: ' + e.message + ')');
  }
});

// 2. Inventory
console.log('\n[Inventory]');
try {
  const inv = JSON.parse(fs.readFileSync(path.join(ROOT, 'artifacts/ux/screen_inventory.json'), 'utf8'));
  const screens = inv.screens || [];
  contractIds.forEach(sid => {
    const s = screens.find(x => x.id === sid);
    if (!s) {
      ko(sid + ' not found');
      return;
    }
    if (s.route && !s.route.includes('/fr-e11')) {
      ok(sid + ' -> ' + s.route);
    } else {
      ko(sid + ' stale route: ' + s.route);
    }
  });
} catch (e) {
  ko('screen_inventory.json parse error: ' + e.message);
}

// 3. Screens
console.log('\n[Screens]');
screenFiles.forEach(fp => {
  const abs = path.join(ROOT, fp);
  const name = path.basename(fp);
  if (!fs.existsSync(abs)) {
    ko(name + ' (missing)');
    return;
  }
  const txt = fs.readFileSync(abs, 'utf8');
  const hasExport = /export (const|function|default) /.test(txt);
  const nonAscii = txt.split('').some(c => c.charCodeAt(0) > 127);
  if (!hasExport) {
    ko(name + ' (no export)');
    return;
  }
  if (nonAscii) {
    ko(name + ' (non-ASCII chars)');
    return;
  }
  ok(name);
});

// Summary
console.log('\n' + '='.repeat(40));
console.log('  Passed: ' + pass + '  Failed: ' + fail);
if (fail === 0) {
  console.log('  ALL PASS');
} else {
  console.log('  FIX FAILURES ABOVE');
  process.exit(1);
}
