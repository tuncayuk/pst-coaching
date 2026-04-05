#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const CONTRACTS_DIR = path.join(__dirname, "../artifacts/ux/screen_contracts");

const contracts = [
  {
    id: "discover.fr_e4_01",
    title: "Kesfet Ana Ekrani",
    route: "/discover",
    purpose: "Implements FR-E4-01: Content discovery hub with content-type tabs, assistant CTA, and featured content sections.",
    entryPoints: ["bottom_tab.discover"],
    dataDependencies: ["Journey", "Workshop", "Module", "Ebook", "Subscription"],
    uiStates: {
      loading: { description: "Skeleton placeholders shown while loading catalog data." },
      ready: { description: "Tab bar, assistant CTA, featured journey cards and ebook row rendered. Active tab highlighted. Guest badge shown for unauthenticated users." },
      empty: { description: "Empty state with notification opt-in CTA." },
      error: { description: "Error state with retry action." },
      offline: { description: "Cached catalog shown with offline notice banner." },
    },
    analytics: {
      screenView: "discover_catalog_viewed",
      events: [
        "discover_catalog_viewed",
        "discover_tab_tapped",
        "discover_assistant_cta_tapped",
        "discover_journey_card_tapped",
        "discover_ebook_card_tapped",
        "discover_paywall_triggered",
      ],
    },
    acceptanceCriteriaRefs: ["AC-FR-E4-01-01", "AC-FR-E4-01-02", "AC-FR-E4-01-03"],
    gates: [],
  },
  {
    id: "discover.fr_e4_02",
    title: "Icerik Belirleme Asistani",
    route: "/discover/assistant",
    purpose: "Implements FR-E4-02: Step-by-step content assistant with 3 questions (goal, duration, preference) producing 1 primary + 2 alternative recommendations.",
    entryPoints: ["discover.fr_e4_01"],
    dataDependencies: ["Journey", "Workshop", "Module", "Ebook"],
    uiStates: {
      loading: { description: "Skeleton cards while loading question set." },
      ready: { description: "3-step form: goal radio, duration buttons, preference buttons. Progress pill shows X/3. 'Oneri Al' navigates to results. 'Atla' navigates to catalog." },
      empty: { description: "Error state with retry when questions cannot load." },
      error: { description: "Error state with retry action." },
      offline: { description: "Form disabled with offline notice." },
    },
    analytics: {
      screenView: "discover_assistant_viewed",
      events: [
        "discover_assistant_viewed",
        "discover_assistant_goal_selected",
        "discover_assistant_duration_selected",
        "discover_assistant_preference_selected",
        "discover_assistant_submitted",
        "discover_assistant_skipped",
      ],
    },
    acceptanceCriteriaRefs: ["AC-FR-E4-02-01", "AC-FR-E4-02-02", "AC-FR-E4-02-03"],
    gates: [],
  },
  {
    id: "discover.fr_e4_03",
    title: "Yolculuk Katalogu ve Detayi",
    route: "/discover/journeys",
    purpose: "Implements FR-E4-03: Journey catalog with sort (Tumu/Onerilen/Populer/Yeni), level filter (Baslangic/Orta/Ileri), favorites toggle, and Yolculugu Baslat CTA.",
    entryPoints: ["discover.fr_e4_01"],
    dataDependencies: ["Journey", "Package"],
    uiStates: {
      loading: { description: "Skeleton cards while loading journeys." },
      ready: { description: "Sort chips + level filter chips + journey cards. Card shows: title, duration, level, daily_target, content count chips (Modul/Atolye/Kitap), heart-favorites toggle, 'Yolculugu Baslat' CTA. Empty-filter state shown when filter yields 0 results." },
      empty: { description: "Empty state with notification opt-in CTA." },
      error: { description: "Error state with retry action." },
      offline: { description: "Cached journeys shown with sort/filter disabled." },
    },
    analytics: {
      screenView: "discover_journeys_viewed",
      events: [
        "discover_journeys_viewed",
        "discover_journeys_sort_changed",
        "discover_journeys_level_filtered",
        "discover_journey_favorite_toggled",
        "discover_journey_start_tapped",
        "discover_journey_card_tapped",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E4-03-01",
      "AC-FR-E4-03-02",
      "AC-FR-E4-03-03",
      "AC-FR-E4-03-04",
    ],
    gates: [],
  },
  {
    id: "discover.fr_e4_04",
    title: "Atolye Katalogu ve Detayi",
    route: "/discover/workshops",
    purpose: "Implements FR-E4-04: Workshop catalog with sort, type filter (Kamp/Rehber/Calisma-Kitabi), showing tema, hedef kitle, sure, oturum sayisi, and type badges.",
    entryPoints: ["discover.fr_e4_01"],
    dataDependencies: ["Workshop"],
    uiStates: {
      loading: { description: "Skeleton cards while loading workshops." },
      ready: { description: "Sort chips + type filter chips + workshop cards. Card shows: title, duration, age target, session count, type badge (Kamp/Rehber/Calisma Kitabi), 'Detaylari Gor' button. Empty-filter state when filter yields 0." },
      empty: { description: "Empty state with notification opt-in." },
      error: { description: "Error state with retry action." },
      offline: { description: "Cached workshops shown with filters disabled." },
    },
    analytics: {
      screenView: "discover_workshops_viewed",
      events: [
        "discover_workshops_viewed",
        "discover_workshops_sort_changed",
        "discover_workshops_type_filtered",
        "discover_workshop_card_tapped",
        "discover_workshop_detail_tapped",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E4-04-01",
      "AC-FR-E4-04-02",
      "AC-FR-E4-04-03",
      "AC-FR-E4-04-04",
    ],
    gates: [],
  },
  {
    id: "discover.fr_e4_05",
    title: "Modul Katalogu ve Detayi",
    route: "/discover/modules",
    purpose: "Implements FR-E4-05: Module catalog with sort, topic filter (Gelisim/Maneviyat/Denge), package count, preview package list with descriptions, and Modulu Baslat CTA.",
    entryPoints: ["discover.fr_e4_01"],
    dataDependencies: ["Module", "Package"],
    uiStates: {
      loading: { description: "Skeleton cards while loading modules." },
      ready: { description: "Sort chips + topic filter chips + module cards. Card shows: title, description, package count chip, top-2 package preview with index badges and short descriptions, 'Modulu Baslat' CTA. Empty-filter state when filter yields 0." },
      empty: { description: "Empty state with notification opt-in." },
      error: { description: "Error state with retry action." },
      offline: { description: "Cached modules shown with filters disabled." },
    },
    analytics: {
      screenView: "discover_modules_viewed",
      events: [
        "discover_modules_viewed",
        "discover_modules_sort_changed",
        "discover_modules_topic_filtered",
        "discover_module_card_tapped",
        "discover_module_start_tapped",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E4-05-01",
      "AC-FR-E4-05-02",
      "AC-FR-E4-05-03",
      "AC-FR-E4-05-04",
    ],
    gates: [],
  },
  {
    id: "discover.fr_e4_06",
    title: "e-Kitap Katalogu ve Detayi",
    route: "/discover/ebooks",
    purpose: "Implements FR-E4-06: eBook catalog with sort, category filter, cover grid, page count + reading time, featured badge, and Okumaya Basla CTA in detail.",
    entryPoints: ["discover.fr_e4_01"],
    dataDependencies: ["Ebook"],
    uiStates: {
      loading: { description: "Skeleton placeholders shown while loading ebooks." },
      ready: { description: "Sort chips + category filter chips + 2-column cover grid. Each item shows: colored cover, title, category, page/reading-time meta. Featured badge on featured items. Empty-filter state when filter yields 0." },
      empty: { description: "Empty state with notification opt-in." },
      error: { description: "Error state with retry action." },
      offline: { description: "Cached ebook grid shown with filters disabled." },
    },
    analytics: {
      screenView: "discover_ebooks_viewed",
      events: [
        "discover_ebooks_viewed",
        "discover_ebooks_sort_changed",
        "discover_ebooks_category_filtered",
        "discover_ebook_card_tapped",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E4-06-01",
      "AC-FR-E4-06-02",
      "AC-FR-E4-06-03",
      "AC-FR-E4-06-04",
    ],
    gates: [],
  },
  {
    id: "discover.fr_e4_07",
    title: "Icerik Baslatma (Ortak Akis)",
    route: "/content/launch",
    purpose: "Implements FR-E4-07: Content launch gate sequence (Auth → Subscription → Add-on → Demographics → DDL), planning options, time rules, psychological safety notice, and activation.",
    entryPoints: ["discover.fr_e4_03", "discover.fr_e4_04", "discover.fr_e4_05", "discover.fr_e4_06"],
    dataDependencies: ["Journey", "Workshop", "Subscription", "UserProfile"],
    uiStates: {
      loading: { description: "Gate check in progress — spinner shown." },
      ready: { description: "Gate sequence evaluated. Planning options presented per content type. Time rules shown. Psychological safety notice (BR-11) shown. 'Basla' activates content." },
      empty: { description: "No content to launch." },
      error: { description: "Error state with retry action." },
      offline: { description: "Launch blocked offline with informative message." },
    },
    analytics: {
      screenView: "content_launch_viewed",
      events: [
        "content_launch_viewed",
        "content_launch_gate_auth_triggered",
        "content_launch_gate_subscription_triggered",
        "content_launch_gate_demographics_triggered",
        "content_launch_gate_ddl_triggered",
        "content_launch_confirmed",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E4-07-01",
      "AC-FR-E4-07-02",
      "AC-FR-E4-07-03",
      "AC-FR-E4-07-04",
      "AC-FR-E4-07-05",
    ],
    gates: ["auth", "subscription", "demographics", "ddl_test"],
  },
  {
    id: "discover.fr_e4_08",
    title: "Misafir Goruntulemе ve Kayit Zorunlulugu",
    route: "/discover/guest",
    purpose: "Implements FR-E4-08: Guest users can browse all catalog/detail screens. Free content tagged. Start actions redirect to registration. Post-registration free content unlocked.",
    entryPoints: ["bottom_tab.discover"],
    dataDependencies: ["Ebook", "Journey", "Subscription"],
    uiStates: {
      loading: { description: "Loading guest entitlement check." },
      ready: { description: "Catalog visible. Free badge rendered on free items. Start/read taps redirect to registration flow." },
      empty: { description: "Empty catalog state." },
      error: { description: "Error state with retry action." },
      offline: { description: "Offline cached view with guest notice." },
    },
    analytics: {
      screenView: "discover_guest_viewed",
      events: [
        "discover_guest_viewed",
        "discover_guest_start_tapped",
        "discover_guest_registration_triggered",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E4-08-01",
      "AC-FR-E4-08-02",
      "AC-FR-E4-08-03",
      "AC-FR-E4-08-04",
    ],
    gates: [],
  },
  {
    id: "discover.fr_e4_09",
    title: "Icerik Turune Ozel Demografi Giris Noktalari",
    route: "/discover/demographics-gate",
    purpose: "Implements FR-E4-09: Demographics gate referenced from all content types, delegating to FR-E1-08 (BR-06). No independent demographic rule defined here.",
    entryPoints: ["discover.fr_e4_03", "discover.fr_e4_04", "discover.fr_e4_05", "discover.fr_e4_06"],
    dataDependencies: ["UserProfile"],
    uiStates: {
      loading: { description: "Checking demographics completion status." },
      ready: { description: "Delegates to FR-E1-08 demographics screen. No additional UI beyond gate check." },
      empty: { description: "Not applicable." },
      error: { description: "Gate check error with retry." },
      offline: { description: "Gate deferred until online." },
    },
    analytics: {
      screenView: "discover_demographics_gate_viewed",
      events: [
        "discover_demographics_gate_viewed",
        "discover_demographics_gate_passed",
        "discover_demographics_gate_blocked",
      ],
    },
    acceptanceCriteriaRefs: ["AC-FR-E4-09-01", "AC-FR-E4-09-02"],
    gates: ["demographics"],
  },
  {
    id: "discover.fr_e4_10",
    title: "Ilk Yolculukta DDL Testi",
    route: "/discover/ddl-test",
    purpose: "Implements FR-E4-10: DDL test gate on first journey start. Test required before launch. Results saved to profile. Not repeated if previously completed.",
    entryPoints: ["discover.fr_e4_03"],
    dataDependencies: ["UserProfile", "DDLTest"],
    uiStates: {
      loading: { description: "Checking DDL completion status." },
      ready: { description: "DDL test presented. Journey blocked until test completed. If previously completed, gate passes immediately." },
      empty: { description: "Not applicable." },
      error: { description: "Test load error with retry." },
      offline: { description: "Test deferred until online." },
    },
    analytics: {
      screenView: "ddl_test_viewed",
      events: [
        "ddl_test_viewed",
        "ddl_test_started",
        "ddl_test_completed",
        "ddl_test_abandoned",
        "ddl_test_skipped_already_done",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E4-10-01",
      "AC-FR-E4-10-02",
      "AC-FR-E4-10-03",
      "AC-FR-E4-10-04",
      "AC-FR-E4-10-05",
    ],
    gates: ["ddl_test"],
  },
];

let written = 0;
let errors = 0;
for (const contract of contracts) {
  const filePath = path.join(CONTRACTS_DIR, `${contract.id}.json`);
  const payload = {
    id: contract.id,
    title: contract.title,
    route: contract.route,
    purpose: contract.purpose,
    entryPoints: contract.entryPoints,
    inputs: [
      { name: "userId", type: "uuid", required: false, source: "session" },
      { name: "subscriptionStatus", type: "SubscriptionStatus", required: false, source: "entitlement_cache" },
      { name: "locale", type: "LanguageCode", required: true, source: "profile" },
    ],
    dataDependencies: contract.dataDependencies,
    uiStates: contract.uiStates,
    analytics: contract.analytics,
    acceptanceCriteriaRefs: contract.acceptanceCriteriaRefs,
    gates: contract.gates,
  };
  try {
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2) + "\n", "utf8");
    console.log("OK:", path.basename(filePath));
    written++;
  } catch (e) {
    console.error("ERR:", filePath, e.message);
    errors++;
  }
}
console.log(`\nDone: ${written} written, ${errors} errors`);
