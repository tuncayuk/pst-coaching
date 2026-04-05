#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const contractsDir = path.join(__dirname, "../artifacts/ux/screen_contracts");

const inputs = [
  { name: "userId", type: "uuid", required: true, source: "session" },
  {
    name: "subscriptionStatus",
    type: "SubscriptionStatus",
    required: true,
    source: "entitlement_cache",
  },
  { name: "locale", type: "LanguageCode", required: true, source: "profile" },
];

const uiStates = {
  loading: { description: "Skeleton placeholders are shown while loading data." },
  ready: { description: "Screen is fully interactive with all actions enabled." },
  empty: {
    description:
      "Empty state explains why no data is available and points to next best action.",
  },
  error: {
    description:
      "Error state is recoverable with user-safe messaging and a retry action.",
  },
  offline: {
    description:
      "Offline state shows last synchronized data and queues write actions for later sync.",
  },
};

const contracts = [
  {
    id: "notifications.fr_e17_01",
    title: "Bildirim listesi ve okunma yonetimi",
    route: "/notifications",
    purpose: "Implements FR-E17-01: Bildirim listesi ve okunma yonetimi.",
    entryPoints: ["home.dashboard"],
    dataDependencies: ["Notification", "NotificationBadge"],
    analytics: {
      screenView: "notification_list_viewed",
      events: [
        "notification_list_viewed",
        "notification_mark_read",
        "notification_bulk_read",
        "notification_cleared",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E17-01-01",
      "AC-FR-E17-01-02",
      "AC-FR-E17-01-03",
      "AC-FR-E17-01-04",
    ],
  },
  {
    id: "notifications.fr_e17_02",
    title: "Bildirim detayi ve hedefe gecis",
    route: "/notifications/detail",
    purpose: "Implements FR-E17-02: Bildirim detayi ve hedefe gecis.",
    entryPoints: ["notifications.fr_e17_01"],
    dataDependencies: ["Notification", "Content"],
    analytics: {
      screenView: "notification_detail_viewed",
      events: [
        "notification_detail_viewed",
        "notification_cta_tapped",
        "notification_deep_linked",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E17-02-01",
      "AC-FR-E17-02-02",
      "AC-FR-E17-02-03",
      "AC-FR-E17-02-04",
    ],
  },
  {
    id: "notifications.fr_e17_03",
    title: "Bildirim ayarlari ve sessiz saatler",
    route: "/notifications/settings",
    purpose: "Implements FR-E17-03: Bildirim ayarlari ve sessiz saatler.",
    entryPoints: ["profile.settings"],
    dataDependencies: ["NotificationPreference"],
    analytics: {
      screenView: "notification_settings_viewed",
      events: [
        "notification_settings_viewed",
        "notification_type_toggled",
        "quiet_hours_updated",
        "notification_frequency_changed",
        "notification_sound_toggled",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E17-03-01",
      "AC-FR-E17-03-02",
      "AC-FR-E17-03-03",
      "AC-FR-E17-03-04",
    ],
  },
  {
    id: "notifications.fr_e17_04",
    title: "Hatirlatici planlama ve tip bazli zamanlama",
    route: "/notifications/reminders",
    purpose:
      "Implements FR-E17-04: Hatirlatici planlama ve tip bazli zamanlama.",
    entryPoints: ["profile.settings"],
    dataDependencies: ["ReminderSetting"],
    analytics: {
      screenView: "reminder_planner_viewed",
      events: [
        "reminder_planner_viewed",
        "reminder_time_added",
        "reminder_time_removed",
        "reminder_type_toggled",
      ],
    },
    acceptanceCriteriaRefs: [
      "AC-FR-E17-04-01",
      "AC-FR-E17-04-02",
      "AC-FR-E17-04-03",
      "AC-FR-E17-04-04",
    ],
  },
];

for (const c of contracts) {
  const obj = {
    id: c.id,
    title: c.title,
    route: c.route,
    purpose: c.purpose,
    entryPoints: c.entryPoints,
    inputs,
    dataDependencies: c.dataDependencies,
    uiStates,
    analytics: c.analytics,
    acceptanceCriteriaRefs: c.acceptanceCriteriaRefs,
    gates: ["auth", "subscription"],
  };
  const filePath = path.join(contractsDir, c.id + ".json");
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + "\n");
  console.log("Written:", c.id, "->", c.route);
}

console.log("Done: 4 contracts updated.");
