#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const CONTRACTS_DIR = path.join(__dirname, '../artifacts/ux/screen_contracts');

const contracts = [
  {
    id: 'progress.fr_e6_01',
    title: 'Gelisim paneli',
    route: '/progress/dashboard',
    purpose: 'Implements FR-E6-01: Gelisim paneli — per-type progress metrics, streak, and accessibility.',
    entryPoints: ['home.dashboard', 'tab.progress'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      {
        name: 'subscriptionStatus',
        type: 'SubscriptionStatus',
        required: true,
        source: 'entitlement_cache'
      }
    ],
    dataDependencies: ['ContentProgress', 'Achievement', 'User'],
    uiStates: {
      loading: {
        description: 'Skeleton cards shown for weekly-summary, progress-map, and achievements sections.'
      },
      ready: {
        description:
          'Hero shows user name + streak count. Per-content-type progress section lists journey/workshop/module/ebook items with completion bars (AC-FR-E6-01-01). Streak chip + submission rate visible (AC-FR-E6-01-02). All progress values have accessibilityLabel for screen readers (AC-FR-E6-01-03). Quick-nav row links to EmotionalMap, Strengths, WeeklySummary, ReportExport sub-screens.'
      },
      empty: {
        description: 'Empty state explains no completed content yet; CTA navigates to Discover.'
      },
      error: {
        description: 'Error card with retry action; last cached snapshot shown if available.'
      },
      offline: {
        description: 'Last-synced progress shown; write actions (review) disabled with indicator.'
      }
    },
    analytics: {
      screenView: 'progress_dashboard_viewed',
      events: [
        'progress_dashboard_viewed',
        'progress_weekly_summary_tapped',
        'progress_emotional_map_tapped',
        'progress_strengths_tapped',
        'progress_report_export_tapped',
        'progress_achievement_tapped',
        'progress_review_tapped'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E6-01-01', 'AC-FR-E6-01-02', 'AC-FR-E6-01-03'],
    gates: ['auth']
  },
  {
    id: 'progress.fr_e6_02',
    title: 'Duygusal harita',
    route: '/progress/emotional-map',
    purpose:
      'Implements FR-E6-02: Duygusal harita — 14/30-day period selector, legend, disclaimer, color-blind support.',
    entryPoints: ['progress.dashboard'],
    inputs: [{ name: 'userId', type: 'uuid', required: true, source: 'session' }],
    dataDependencies: ['EmotionLog', 'ContentProgress'],
    uiStates: {
      loading: { description: 'Skeleton for period selector and mood grid.' },
      ready: {
        description:
          "Toggle row lets user switch between 14-day and 30-day views (AC-FR-E6-02-01). Legend card shows Sakin/Netlik/Gergin labels with color swatches AND pattern/icon fallbacks for color blindness (AC-FR-E6-02-04). Mood grid uses both color and icon to represent emotional state. Disclaimer banner reading 'Bu bir teshis degildir' always visible below the map (AC-FR-E6-02-03). Mood summary cards with percentages."
      },
      empty: { description: 'No data yet prompt with CTA to start daily practice.' },
      error: { description: 'Error card with retry.' },
      offline: { description: 'Last-synced emotion data shown; update disabled.' }
    },
    analytics: {
      screenView: 'progress_emotional_map_viewed',
      events: ['progress_emotional_map_viewed', 'progress_emotional_period_changed', 'progress_emotional_map_refreshed']
    },
    acceptanceCriteriaRefs: ['AC-FR-E6-02-01', 'AC-FR-E6-02-02', 'AC-FR-E6-02-03', 'AC-FR-E6-02-04'],
    gates: ['auth']
  },
  {
    id: 'progress.fr_e6_03',
    title: 'Guclu ve gelisim alanlari',
    route: '/progress/strengths',
    purpose:
      'Implements FR-E6-03: Guclu ve gelisim alanlari — separate cards, concrete suggestions, navigation to content.',
    entryPoints: ['progress.dashboard'],
    inputs: [{ name: 'userId', type: 'uuid', required: true, source: 'session' }],
    dataDependencies: ['ContentProgress', 'Achievement'],
    uiStates: {
      loading: { description: 'Skeleton cards for Guclu Alanlar and Gelisim Alanlari.' },
      ready: {
        description:
          "Two separate section cards: (1) Guclu Alanlar with strength scores and progress bars; (2) Gelisim Alanlari with development areas (AC-FR-E6-03-01). Each development item shows concrete suggestion text and a linked content title (AC-FR-E6-03-02). 'Onerileri Uygula' button on each suggestion navigates to the relevant content detail screen (AC-FR-E6-03-03)."
      },
      empty: { description: 'No analysis yet; prompt to complete more content.' },
      error: { description: 'Error card with retry.' },
      offline: { description: 'Last-synced strength data shown; suggestions still visible.' }
    },
    analytics: {
      screenView: 'progress_strengths_viewed',
      events: ['progress_strengths_viewed', 'progress_strength_suggestion_applied', 'progress_personal_plan_created']
    },
    acceptanceCriteriaRefs: ['AC-FR-E6-03-01', 'AC-FR-E6-03-02', 'AC-FR-E6-03-03'],
    gates: ['auth']
  },
  {
    id: 'progress.fr_e6_04',
    title: 'Haftalik ozet',
    route: '/progress/weekly-summary',
    purpose: 'Implements FR-E6-04: Haftalik ozet — positive trend, challenge area, suggestion, completed content list.',
    entryPoints: ['progress.dashboard'],
    inputs: [{ name: 'userId', type: 'uuid', required: true, source: 'session' }],
    dataDependencies: ['ContentProgress', 'EmotionLog'],
    uiStates: {
      loading: { description: 'Skeleton for stats bar and completed content list.' },
      ready: {
        description:
          'Weekly bar chart shows daily session counts. Trend card highlights positive trend area, challenge area, and one actionable suggestion (AC-FR-E6-04-01). Completed content list shows each finished item with type badge and completion date (AC-FR-E6-04-02).'
      },
      empty: {
        description:
          'Empty state shown when no content completed this week — with explanation message and CTA (AC-FR-E6-04-03).'
      },
      error: { description: 'Error card with retry.' },
      offline: { description: 'Last cached weekly data shown.' }
    },
    analytics: {
      screenView: 'progress_weekly_summary_viewed',
      events: [
        'progress_weekly_summary_viewed',
        'progress_weekly_completed_item_tapped',
        'progress_weekly_report_tapped'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E6-04-01', 'AC-FR-E6-04-02', 'AC-FR-E6-04-03'],
    gates: ['auth']
  },
  {
    id: 'progress.fr_e6_05',
    title: 'Icerik bitis degerlendirmesi',
    route: '/progress/completion-review',
    purpose:
      'Implements FR-E6-05: Icerik bitis degerlendirmesi — evaluation form after content, deferral, next suggestion.',
    entryPoints: ['content.journey_home', 'content.workshop_home', 'content.module_home'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'contentType', type: 'string', required: true, source: 'route_params' },
      { name: 'contentId', type: 'string', required: true, source: 'route_params' }
    ],
    dataDependencies: ['ContentProgress', 'CompletionReview'],
    uiStates: {
      loading: { description: 'Skeleton for evaluation form.' },
      ready: {
        description:
          "Evaluation form shown after completing a journey/workshop/module (AC-FR-E6-05-01). Star rating (1-5) and optional comment field. 'Daha Sonra' button defers the review (AC-FR-E6-05-02). On submit: answers saved and next content suggestion shown (AC-FR-E6-05-03)."
      },
      empty: { description: 'No pending review; show completed badge and navigation back.' },
      error: { description: 'Save error with retry.' },
      offline: { description: 'Review queued locally until online; UI shows queued state.' }
    },
    analytics: {
      screenView: 'progress_completion_review_viewed',
      events: [
        'progress_completion_review_viewed',
        'progress_completion_review_submitted',
        'progress_completion_review_deferred',
        'progress_completion_next_suggestion_tapped'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E6-05-01', 'AC-FR-E6-05-02', 'AC-FR-E6-05-03'],
    gates: ['auth']
  },
  {
    id: 'progress.fr_e6_06',
    title: 'Gelisim raporu (indir/paylas)',
    route: '/progress/report-export',
    purpose: 'Implements FR-E6-06: Gelisim raporu — summary metrics, PDF download, privacy consent before sharing.',
    entryPoints: ['progress.dashboard'],
    inputs: [{ name: 'userId', type: 'uuid', required: true, source: 'session' }],
    dataDependencies: ['ContentProgress', 'Achievement', 'EmotionLog'],
    uiStates: {
      loading: { description: 'Skeleton for report summary and export actions.' },
      ready: {
        description:
          "Report summary card shows total sessions, completed items, streak, and top themes (AC-FR-E6-06-01). 'Raporu Indir' downloads a PDF (AC-FR-E6-06-02). 'Paylas' shows privacy consent modal first (BR-09), then native share sheet (AC-FR-E6-06-03). Format selector chips (PDF/Ozet) available."
      },
      empty: { description: 'No data for report yet; CTA to complete content.' },
      error: { description: 'Export error with retry.' },
      offline: {
        description: 'Download and share disabled offline; report summary visible from cache.'
      }
    },
    analytics: {
      screenView: 'progress_report_export_viewed',
      events: [
        'progress_report_export_viewed',
        'progress_report_downloaded',
        'progress_report_shared',
        'progress_report_share_consent_shown',
        'progress_report_share_consent_accepted',
        'progress_report_share_consent_declined'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E6-06-01', 'AC-FR-E6-06-02', 'AC-FR-E6-06-03'],
    gates: ['auth']
  }
];

let written = 0;
for (const contract of contracts) {
  const fp = path.join(CONTRACTS_DIR, `${contract.id}.json`);
  fs.writeFileSync(fp, JSON.stringify(contract, null, 2) + '\n', 'utf8');
  written++;
  console.log(`Wrote ${contract.id} -> ${contract.route}`);
}
console.log(`\nDone: ${written}/${contracts.length} contracts written.`);
