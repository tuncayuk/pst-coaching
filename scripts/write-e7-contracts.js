#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const CONTRACTS_DIR = path.join(__dirname, "../artifacts/ux/screen_contracts");

const contracts = [
  {
    id: "reader.fr_e7_01",
    title: "e-Kitap okuyucu acilisi",
    route: "/ebook/reader",
    purpose: "Implements FR-E7-01: Son okunan sayfa otomatik acilis, kitap basligı ve sayfa bilgisi, TOC erisim, cevrimdisi okuma.",
    entryPoints: ["library.ebooks", "discover.ebooks", "content.ebook_detail"],
    inputs: [
      { name: "ebookId", type: "string", required: true, source: "route_param" },
      { name: "chapterId", type: "string", required: false, source: "route_param" },
      { name: "subscriptionStatus", type: "SubscriptionStatus", required: true, source: "entitlement_cache" },
    ],
    dataDependencies: ["Ebook", "EbookChapter", "ContentProgress", "EbookProgress", "ReadingSettings"],
    uiStates: {
      loading: { description: "Skeleton placeholder for chapter content while loading." },
      ready: { description: "Reader shows chapter title, page range, reading progress bar. Last-read chapter auto-opens (AC-FR-E7-01-01). Chapter title + current page / total pages visible (AC-FR-E7-01-02). TOC button in floating toolbar (AC-FR-E7-01-03). Offline badge when downloaded (AC-FR-E7-01-04)." },
      empty: { description: "Empty state if no chapters available; CTA back to ebook detail." },
      error: { description: "Error card with retry; last cached chapter shown if available." },
      offline: { description: "Downloaded content shown; OfflineNotice banner; write queued." },
    },
    analytics: {
      screenView: "ebook_reader_viewed",
      events: ["ebook_reader_viewed", "ebook_chapter_opened", "ebook_toc_opened", "ebook_settings_opened", "ebook_highlight_created", "ebook_audio_started"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E7-01-01", "AC-FR-E7-01-02", "AC-FR-E7-01-03", "AC-FR-E7-01-04"],
    gates: ["auth", "subscription"],
  },
  {
    id: "reader.fr_e7_02",
    title: "Sayfa navigasyonu",
    route: "/ebook/navigation",
    purpose: "Implements FR-E7-02: Kaydirma/sayfa cevirme, sayfa numarasina atlama, TOC'dan bolume atlama, ilerleme cubugu.",
    entryPoints: ["ebook.reader"],
    inputs: [
      { name: "ebookId", type: "string", required: true, source: "route_param" },
      { name: "chapterId", type: "string", required: false, source: "route_param" },
    ],
    dataDependencies: ["EbookChapter", "EbookProgress"],
    uiStates: {
      loading: { description: "Skeleton for TOC list." },
      ready: { description: "TOC sheet lists all chapters. Tap to navigate (AC-FR-E7-02-03). Jump-to-page input available (AC-FR-E7-02-02). Progress bar at top (AC-FR-E7-02-04). Navigation between chapters supported (AC-FR-E7-02-01)." },
      empty: { description: "No chapters found; back to reader." },
      error: { description: "Error with retry." },
      offline: { description: "Last synced TOC shown." },
    },
    analytics: {
      screenView: "ebook_toc_viewed",
      events: ["ebook_toc_viewed", "ebook_chapter_selected", "ebook_page_jumped"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E7-02-01", "AC-FR-E7-02-02", "AC-FR-E7-02-03", "AC-FR-E7-02-04"],
    gates: ["auth"],
  },
  {
    id: "reader.fr_e7_03",
    title: "Okuma ayarlari",
    route: "/ebook/settings",
    purpose: "Implements FR-E7-03: Font boyutu slider, arka plan rengi secimi (Beyaz/Sepia/Koyu), satir araligi, ayarlar saklama.",
    entryPoints: ["ebook.reader"],
    inputs: [
      { name: "userId", type: "uuid", required: true, source: "session" },
    ],
    dataDependencies: ["ReadingSettings"],
    uiStates: {
      loading: { description: "Skeleton for settings panel." },
      ready: { description: "Font size slider (AC-FR-E7-03-01). Background: Beyaz/Sepia/Koyu chips (AC-FR-E7-03-02). Line height selector (AC-FR-E7-03-03). Preview text paragraph updates live. Settings auto-save (AC-FR-E7-03-04)." },
      empty: { description: "Default settings applied if none found." },
      error: { description: "Error loading settings; defaults applied." },
      offline: { description: "Last saved settings shown; save queued." },
    },
    analytics: {
      screenView: "ebook_settings_viewed",
      events: ["ebook_settings_viewed", "ebook_font_changed", "ebook_bg_changed", "ebook_line_height_changed"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E7-03-01", "AC-FR-E7-03-02", "AC-FR-E7-03-03", "AC-FR-E7-03-04"],
    gates: ["auth"],
  },
  {
    id: "reader.fr_e7_04",
    title: "Metin vurgulama ve not",
    route: "/ebook/highlight-create",
    purpose: "Implements FR-E7-04: Metin seciminde renk secenekleri, not ekleme otomatik kaydetme (BR-12), vurgu favorilere ekleme.",
    entryPoints: ["ebook.reader"],
    inputs: [
      { name: "ebookId", type: "string", required: true, source: "route_param" },
      { name: "chapterId", type: "string", required: false, source: "route_param" },
    ],
    dataDependencies: ["Highlight", "Note", "FavoriteItem"],
    uiStates: {
      loading: { description: "Overlay loading while saving." },
      ready: { description: "Color picker shows on (simulated) text selection (AC-FR-E7-04-01). Note field with auto-save (AC-FR-E7-04-02, BR-12). Add-to-favorites toggle (AC-FR-E7-04-03)." },
      empty: { description: "No selection active; idle state." },
      error: { description: "Save error with retry." },
      offline: { description: "Highlight queued for sync; visual indicator shown." },
    },
    analytics: {
      screenView: "ebook_highlight_panel_viewed",
      events: ["ebook_highlight_color_selected", "ebook_note_added", "ebook_highlight_favorited"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E7-04-01", "AC-FR-E7-04-02", "AC-FR-E7-04-03"],
    gates: ["auth"],
  },
  {
    id: "reader.fr_e7_05",
    title: "Vurgularim ve notlarim listesi",
    route: "/ebook/highlights",
    purpose: "Implements FR-E7-05: Kitaba ozel vurgu/not listesi, dokunarak sayfa gitme, not duzenleme, disa aktarma.",
    entryPoints: ["ebook.reader", "ebook.detail"],
    inputs: [
      { name: "ebookId", type: "string", required: true, source: "route_param" },
    ],
    dataDependencies: ["Highlight", "Note", "FavoriteItem"],
    uiStates: {
      loading: { description: "Skeleton list items while loading highlights." },
      ready: { description: "Color-coded highlight list per ebook (AC-FR-E7-05-01). Tap card navigates to reader at that chapter (AC-FR-E7-05-02). Note field editable (AC-FR-E7-05-03). Export (PDF/metin) with privacy consent (AC-FR-E7-05-04, BR-09). Add-to-favorites (AC-FR-E7-04-03)." },
      empty: { description: "Empty illustration; CTA to start reading and highlight." },
      error: { description: "Error with retry." },
      offline: { description: "Cached highlights shown; edits queued." },
    },
    analytics: {
      screenView: "ebook_highlights_viewed",
      events: ["ebook_highlights_viewed", "ebook_highlight_tapped", "ebook_note_edited", "ebook_highlights_exported"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E7-05-01", "AC-FR-E7-05-02", "AC-FR-E7-05-03", "AC-FR-E7-05-04"],
    gates: ["auth"],
  },
  {
    id: "reader.fr_e7_06",
    title: "Sesli kitap destegi",
    route: "/ebook/audio",
    purpose: "Implements FR-E7-06: Sesli versiyon Play butonu (varsa), metin senkron takip, hiz ayari, arka planda calisma.",
    entryPoints: ["ebook.reader"],
    inputs: [
      { name: "ebookId", type: "string", required: true, source: "route_param" },
      { name: "chapterId", type: "string", required: false, source: "route_param" },
    ],
    dataDependencies: ["Ebook", "EbookChapter"],
    uiStates: {
      loading: { description: "Audio player skeleton." },
      ready: { description: "Play button visible when has_audio=true; hidden otherwise (AC-FR-E7-06-01). Current sentence/paragraph highlighted in sync (AC-FR-E7-06-02). Speed chips: 0.75x/1x/1.25x (AC-FR-E7-06-03). Background play session hint (AC-FR-E7-06-04)." },
      empty: { description: "Audio not available message." },
      error: { description: "Playback error with retry." },
      offline: { description: "Downloaded audio plays; non-downloaded shows locked." },
    },
    analytics: {
      screenView: "ebook_audio_viewed",
      events: ["ebook_audio_play_tapped", "ebook_audio_speed_changed", "ebook_audio_background_started"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E7-06-01", "AC-FR-E7-06-02", "AC-FR-E7-06-03", "AC-FR-E7-06-04"],
    gates: ["auth", "subscription"],
  },
  {
    id: "reader.fr_e7_07",
    title: "Okuma ilerlemesi",
    route: "/ebook/progress",
    purpose: "Implements FR-E7-07: Ilerleme yüzdesi, kalan süre tahmini, tamamlanma rozeti/sertifikasi, Gelisim paneli yansimasi.",
    entryPoints: ["library.ebooks", "ebook.detail"],
    inputs: [
      { name: "ebookId", type: "string", required: true, source: "route_param" },
      { name: "userId", type: "uuid", required: true, source: "session" },
    ],
    dataDependencies: ["ContentProgress", "EbookProgress", "Achievement"],
    uiStates: {
      loading: { description: "Skeleton progress bars." },
      ready: { description: "Progress percentage (AC-FR-E7-07-01). Estimated remaining time (AC-FR-E7-07-02). Completion badge/certificate CTA when finished (AC-FR-E7-07-03). Progress reflected in ProgressDashboard (AC-FR-E7-07-04)." },
      empty: { description: "No reading started yet; CTA to begin reading." },
      error: { description: "Error loading progress; retry." },
      offline: { description: "Last synced progress shown." },
    },
    analytics: {
      screenView: "ebook_progress_viewed",
      events: ["ebook_progress_viewed", "ebook_completion_badge_claimed", "ebook_reading_started"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E7-07-01", "AC-FR-E7-07-02", "AC-FR-E7-07-03", "AC-FR-E7-07-04"],
    gates: ["auth"],
  },
  {
    id: "reader.fr_e7_08",
    title: "Cevrimdisi indirme",
    route: "/ebook/download",
    purpose: "Implements FR-E7-08: Indirme butonu detayda, indirme durumu (ilerleme/tamamlandi/hata), depolama uyarisi, gorsel isaretleme.",
    entryPoints: ["library.ebooks", "ebook.detail", "discover.ebooks"],
    inputs: [
      { name: "ebookId", type: "string", required: true, source: "route_param" },
      { name: "userId", type: "uuid", required: true, source: "session" },
    ],
    dataDependencies: ["Ebook", "Download"],
    uiStates: {
      loading: { description: "Download status checking." },
      ready: { description: "Download button in ebook detail (AC-FR-E7-08-01). Download progress/completed/error states shown (AC-FR-E7-08-02). Low storage warning (AC-FR-E7-08-03). Downloaded ebooks show checkmark (AC-FR-E7-08-04)." },
      empty: { description: "No downloads yet; CTA to find content." },
      error: { description: "Download failed; retry option." },
      offline: { description: "Downloaded content accessible; pending downloads paused." },
    },
    analytics: {
      screenView: "ebook_download_viewed",
      events: ["ebook_download_started", "ebook_download_completed", "ebook_download_error"],
    },
    acceptanceCriteriaRefs: ["AC-FR-E7-08-01", "AC-FR-E7-08-02", "AC-FR-E7-08-03", "AC-FR-E7-08-04"],
    gates: ["auth"],
  },
];

let written = 0;
for (const c of contracts) {
  const fp = path.join(CONTRACTS_DIR, `${c.id}.json`);
  fs.writeFileSync(fp, JSON.stringify(c, null, 2), "utf8");
  console.log(`Wrote ${c.id} -> ${c.route}`);
  written++;
}
console.log(`\nDone: ${written}/${contracts.length} contracts written.`);
