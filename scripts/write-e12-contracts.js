#!/usr/bin/env node
// write-e12-contracts.js — Updates EPIC-12 contracts with canonical routes + inventory
const fs = require("fs");
const path = require("path");

const CONTRACT_DIR = path.join(__dirname, "../artifacts/ux/screen_contracts");
const INVENTORY_FILE = path.join(__dirname, "../artifacts/ux/screen_inventory.json");

const ROUTES = {
  "coach.fr_e12_01": "/coach/dashboard",
  "coach.fr_e12_02": "/coach/client",
  "coach.fr_e12_03": "/coach/client/content",
  "coach.fr_e12_04": "/coach/feedback",
};

// Titles for inventory
const TITLES = {
  "coach.fr_e12_01": "Danisan listesi ve risk gostergeleri",
  "coach.fr_e12_02": "Danisan profili ve metrikler",
  "coach.fr_e12_03": "Icerik takibi",
  "coach.fr_e12_04": "Koc geri bildirim akisi",
};

const FR_MAP = {
  "coach.fr_e12_01": "FR-E12-01",
  "coach.fr_e12_02": "FR-E12-02",
  "coach.fr_e12_03": "FR-E12-03",
  "coach.fr_e12_04": "FR-E12-04",
};

const AC_MAP = {
  "coach.fr_e12_01": ["AC-FR-E12-01-01","AC-FR-E12-01-02","AC-FR-E12-01-03","AC-FR-E12-01-04"],
  "coach.fr_e12_02": ["AC-FR-E12-02-01","AC-FR-E12-02-02","AC-FR-E12-02-03","AC-FR-E12-02-04"],
  "coach.fr_e12_03": ["AC-FR-E12-03-01","AC-FR-E12-03-02","AC-FR-E12-03-03","AC-FR-E12-03-04"],
  "coach.fr_e12_04": ["AC-FR-E12-04-01","AC-FR-E12-04-02","AC-FR-E12-04-03","AC-FR-E12-04-04"],
};

const DATA_DEPS = {
  "coach.fr_e12_01": ["User","ContentProgress","CoachAssignment","UserSession"],
  "coach.fr_e12_02": ["User","ContentProgress","CoachAssignment","UserSession","Achievement"],
  "coach.fr_e12_03": ["User","ContentProgress","CoachAssignment","Journey","Workshop","Ebook","EbookProgress"],
  "coach.fr_e12_04": ["User","Comment","CoachAssignment"],
};

const PURPOSES = {
  "coach.fr_e12_01": "FR-E12-01: Danisan listesi ve risk gostergeleri",
  "coach.fr_e12_02": "FR-E12-02: Danisan profili ve metrikler",
  "coach.fr_e12_03": "FR-E12-03: Icerik takibi",
  "coach.fr_e12_04": "FR-E12-04: Koc geri bildirim akisi",
};

const ANALYTICS_EVENTS = {
  "coach.fr_e12_01": ["coach_dashboard_viewed","client_risk_filter_applied","client_profile_opened"],
  "coach.fr_e12_02": ["coach_client_profile_viewed","content_tracking_opened","feedback_compose_opened"],
  "coach.fr_e12_03": ["coach_content_tracking_viewed","content_item_drilled"],
  "coach.fr_e12_04": ["coach_feedback_viewed","feedback_draft_saved","feedback_submitted"],
};

// 1. Update contracts
let contractCount = 0;
for (const id of Object.keys(ROUTES)) {
  const fp = path.join(CONTRACT_DIR, id + ".json");
  const contract = {
    id,
    title: TITLES[id],
    route: ROUTES[id],
    purpose: "Implements " + PURPOSES[id] + ".",
    entryPoints: [id === "coach.fr_e12_01" ? "profile.overview" : "coach.dashboard"],
    inputs: [
      { name: "userId", type: "uuid", required: true, source: "session" },
      { name: "locale", type: "LanguageCode", required: true, source: "profile" },
      ...(id !== "coach.fr_e12_01"
        ? [{ name: "clientId", type: "uuid", required: true, source: "navigation" }]
        : []),
    ],
    dataDependencies: DATA_DEPS[id],
    uiStates: {
      loading: { description: "Skeleton placeholders shown while loading " + FR_MAP[id] + " data." },
      ready: { description: FR_MAP[id] + " flows are fully interactive with primary CTA available." },
      empty: { description: "Empty state explains why no data is available and points to next best action." },
      error: { description: "Error state is recoverable with user-safe messaging and a retry action." },
      offline: { description: "Offline state shows last synchronized data and queues write actions for later sync." },
    },
    analytics: {
      screenView: id.replace(/\./g, "_") + "_viewed",
      events: ANALYTICS_EVENTS[id],
    },
    acceptanceCriteriaRefs: AC_MAP[id],
    gates: ["auth", "coach_role"],
  };
  fs.writeFileSync(fp, JSON.stringify(contract, null, 2) + "\n", "utf8");
  console.log("Contract written: " + id + " -> " + ROUTES[id]);
  contractCount++;
}

// 2. Update inventory
const inv = JSON.parse(fs.readFileSync(INVENTORY_FILE, "utf8"));
let invCount = 0;
for (const screen of inv.screens) {
  if (ROUTES[screen.id]) {
    screen.route = ROUTES[screen.id];
    screen.title = TITLES[screen.id];
    invCount++;
    console.log("Inventory updated: " + screen.id + " -> " + ROUTES[screen.id]);
  }
}
fs.writeFileSync(INVENTORY_FILE, JSON.stringify(inv, null, 2) + "\n", "utf8");

console.log("\nContracts written: " + contractCount + "/4");
console.log("Inventory updated: " + invCount + "/4");
console.log(contractCount === 4 && invCount === 4 ? "ALL PASS" : "SOME FAILURES");
