#!/usr/bin/env node
// write-e11-contracts.js — Writes all 5 EPIC-11 contracts + updates inventory
const fs = require('fs');
const path = require('path');

const CONTRACTS_DIR = path.join(__dirname, '../artifacts/ux/screen_contracts');
const INVENTORY_PATH = path.join(__dirname, '../artifacts/ux/screen_inventory.json');

const ROUTES = {
  'modules.fr_e11_01': '/modules',
  'modules.fr_e11_02': '/modules/package',
  'modules.fr_e11_03': '/modules/package/exercise',
  'modules.fr_e11_04': '/modules/package/locked',
  'modules.fr_e11_05': '/modules/completion'
};

const CONTRACTS = [
  {
    id: 'modules.fr_e11_01',
    title: 'Modul ana ekrani',
    route: ROUTES['modules.fr_e11_01'],
    purpose:
      "Implements FR-E11-01: Module home screen with name, progress %, sorted packages with status, and 'Devam Et' CTA.",
    entryPoints: ['discover.modules', 'library.modules', 'home.continue'],
    inputs: [
      { name: 'id', type: 'uuid', required: true, source: 'route' },
      { name: 'state', type: 'ScreenState', required: false, source: 'route' }
    ],
    dataDependencies: ['Module', 'Package', 'ContentProgress', 'User'],
    uiStates: {
      loading: { description: 'Skeletons for progress bar and package list.' },
      ready: {
        description:
          "Module title, progress %, sorted package list with status badges, 'Devam Et' CTA to next active package."
      },
      empty: { description: 'No packages found for this module. CTA to library.' },
      error: { description: 'Error with retry CTA.' },
      offline: { description: 'Cached module shown offline; write actions disabled.' }
    },
    analytics: {
      screenView: 'module_home_viewed',
      events: ['module_home_viewed', 'package_tapped', 'continue_module_tapped']
    },
    acceptanceCriteriaRefs: ['AC-FR-E11-01-01', 'AC-FR-E11-01-02', 'AC-FR-E11-01-03'],
    gates: ['auth']
  },
  {
    id: 'modules.fr_e11_02',
    title: 'Paket detayi ve baslatma',
    route: ROUTES['modules.fr_e11_02'],
    purpose:
      'Implements FR-E11-02: Package detail with description, objectives, section list (reading+exercise), start CTA, and prereq lock (BR-04).',
    entryPoints: ['modules.fr_e11_01'],
    inputs: [
      { name: 'id', type: 'uuid', required: true, source: 'route' },
      { name: 'state', type: 'ScreenState', required: false, source: 'route' }
    ],
    dataDependencies: ['Package', 'ContentItem', 'ContentProgress', 'User'],
    uiStates: {
      loading: { description: 'Skeletons for header and section list.' },
      ready: {
        description: "Package description, objectives, section list with type badges, 'Paketi Basla' CTA."
      },
      empty: { description: 'No sections found. CTA back to module.' },
      error: { description: 'Error with retry CTA.' },
      offline: { description: 'Cached package shown; start CTA disabled.' }
    },
    analytics: {
      screenView: 'package_detail_viewed',
      events: ['package_detail_viewed', 'package_started', 'locked_package_viewed']
    },
    acceptanceCriteriaRefs: ['AC-FR-E11-02-01', 'AC-FR-E11-02-02', 'AC-FR-E11-02-03', 'AC-FR-E11-02-04'],
    gates: ['auth']
  },
  {
    id: 'modules.fr_e11_03',
    title: 'Paket ici okuma ve uygulama',
    route: ROUTES['modules.fr_e11_03'],
    purpose:
      'Implements FR-E11-03: In-package exercise with sequential steps, note-taking, and next-section CTA on completion.',
    entryPoints: ['modules.fr_e11_02'],
    inputs: [
      { name: 'id', type: 'uuid', required: true, source: 'route' },
      { name: 'state', type: 'ScreenState', required: false, source: 'route' }
    ],
    dataDependencies: ['ContentItem', 'ExerciseStep', 'ContentProgress', 'User'],
    uiStates: {
      loading: { description: 'Skeleton for exercise steps.' },
      ready: {
        description:
          "Exercise title, sequential step cards with check-off, per-step note input, progress bar, 'Sonraki Bolum' CTA on completion."
      },
      empty: { description: 'No steps. CTA back to package.' },
      error: { description: 'Error with retry CTA.' },
      offline: { description: 'Steps shown; note saving queued.' }
    },
    analytics: {
      screenView: 'exercise_viewed',
      events: ['exercise_viewed', 'exercise_step_completed', 'exercise_completed']
    },
    acceptanceCriteriaRefs: ['AC-FR-E11-03-01', 'AC-FR-E11-03-02', 'AC-FR-E11-03-03'],
    gates: ['auth']
  },
  {
    id: 'modules.fr_e11_04',
    title: 'Kilitli ilerleme (paket seviyesi)',
    route: ROUTES['modules.fr_e11_04'],
    purpose:
      'Implements FR-E11-04: Locked package view with prerequisite explanation (BR-04) and 08:00 countdown (BR-01) within ContentPackageDetailScreen.',
    entryPoints: ['modules.fr_e11_01'],
    inputs: [
      { name: 'id', type: 'uuid', required: true, source: 'route' },
      { name: 'state', type: 'ScreenState', required: false, source: 'route' }
    ],
    dataDependencies: ['Package', 'ContentProgress'],
    uiStates: {
      loading: { description: 'Skeleton for locked state.' },
      ready: {
        description: 'Lock icon, prerequisite package name, lock reason, countdown to 08:00 if BR-01 applies.'
      },
      empty: { description: 'Lock data unavailable. Back CTA.' },
      error: { description: 'Error with retry CTA.' },
      offline: { description: 'Locked state shown offline.' }
    },
    analytics: {
      screenView: 'locked_package_viewed',
      events: ['locked_package_viewed', 'go_to_prerequisite_tapped']
    },
    acceptanceCriteriaRefs: ['AC-FR-E11-04-01', 'AC-FR-E11-04-02', 'AC-FR-E11-04-03'],
    gates: ['auth']
  },
  {
    id: 'modules.fr_e11_05',
    title: 'Modul tamamlama ve sertifika',
    route: ROUTES['modules.fr_e11_05'],
    purpose:
      'Implements FR-E11-05: Module completion screen with certificate/badge, next module recommendation, and progress panel sync notice.',
    entryPoints: ['modules.fr_e11_02'],
    inputs: [
      { name: 'id', type: 'uuid', required: true, source: 'route' },
      { name: 'state', type: 'ScreenState', required: false, source: 'route' }
    ],
    dataDependencies: ['Achievement', 'Module', 'User'],
    uiStates: {
      loading: { description: 'Skeleton for certificate/badge area.' },
      ready: {
        description:
          'Congratulations header, badge icon, stats (packages/sections/time), next module recommendation card, share/home actions.'
      },
      empty: { description: 'Achievement not found. CTA back to library.' },
      error: { description: 'Error with retry CTA.' },
      offline: { description: 'Completion shown offline; share disabled.' }
    },
    analytics: {
      screenView: 'module_completion_viewed',
      events: ['module_completion_viewed', 'certificate_shared', 'next_module_tapped']
    },
    acceptanceCriteriaRefs: ['AC-FR-E11-05-01', 'AC-FR-E11-05-02', 'AC-FR-E11-05-03', 'AC-FR-E11-05-04'],
    gates: ['auth']
  }
];

// Write contracts
let written = 0;
for (const contract of CONTRACTS) {
  const filePath = path.join(CONTRACTS_DIR, `${contract.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(contract, null, 2), 'utf8');
  written++;
  console.log(`Wrote ${contract.id}.json  route=${contract.route}`);
}
console.log(`Contracts written: ${written}/${CONTRACTS.length}`);

// Update inventory
const inventoryFile = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));
const inventory = inventoryFile.screens || inventoryFile;
let updated = 0;
for (const entry of inventory) {
  if (ROUTES[entry.id]) {
    entry.route = ROUTES[entry.id];
    updated++;
    console.log(`Updated inventory ${entry.id}  route=${entry.route}`);
  }
}
fs.writeFileSync(INVENTORY_PATH, JSON.stringify(inventoryFile, null, 2), 'utf8');
console.log(`Inventory entries updated: ${updated}/${Object.keys(ROUTES).length}`);
