#!/usr/bin/env node
// write-e8-contracts.js — Writes all 8 EPIC-8 screen contracts with correct routes and FR/AC refs.
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../artifacts/ux/screen_contracts');

const CONTRACTS = [
  {
    id: 'workshop.fr_e8_01',
    title: 'Atolye landing ve yapi ozeti',
    route: '/workshop/landing',
    fr: 'FR-E8-01',
    purpose:
      'Implements FR-E8-01: Atolye landing ekrani, baslik, tema, donusum hedefi, hedef kitle, sure, referanslar ve rol bazli CTA.',
    entryPoints: ['discover.workshops', 'library.workshops'],
    gates: ['auth'],
    analytics: {
      screenView: 'workshop_landing_viewed',
      events: ['workshop_landing_viewed', 'workshop_started', 'workshop_resumed']
    },
    acs: ['AC-FR-E8-01-01', 'AC-FR-E8-01-02', 'AC-FR-E8-01-03', 'AC-FR-E8-01-04'],
    dataDeps: ['Workshop', 'ContentProgress', 'UserRole']
  },
  {
    id: 'workshop.fr_e8_02',
    title: 'Asama navigasyonu ve ilerleme modeli',
    route: '/workshop/phases',
    fr: 'FR-E8-02',
    purpose:
      'Implements FR-E8-02: Asama listesi/zaman cizelgesi, tip bazli etiketler, kilit durumu ve Devam Et aksiyonu.',
    entryPoints: ['workshop.landing'],
    gates: ['auth'],
    analytics: {
      screenView: 'workshop_phases_viewed',
      events: ['workshop_phases_viewed', 'workshop_phase_tapped', 'workshop_resumed']
    },
    acs: ['AC-FR-E8-02-01', 'AC-FR-E8-02-02', 'AC-FR-E8-02-03', 'AC-FR-E8-02-04'],
    dataDeps: ['Workshop', 'WorkshopStage', 'ContentProgress']
  },
  {
    id: 'workshop.fr_e8_03',
    title: 'Asama icerik ekrani',
    route: '/workshop/section',
    fr: 'FR-E8-03',
    purpose: 'Implements FR-E8-03: Yapilandirilmis icerik bloklari, vurgulama/not/favori ve asama sonunda gecis.',
    entryPoints: ['workshop.phases'],
    gates: ['auth'],
    analytics: {
      screenView: 'workshop_section_viewed',
      events: ['workshop_section_viewed', 'workshop_section_completed', 'highlight_created', 'note_saved']
    },
    acs: ['AC-FR-E8-03-01', 'AC-FR-E8-03-02', 'AC-FR-E8-03-03', 'AC-FR-E8-03-04'],
    dataDeps: ['Workshop', 'WorkshopStage', 'ContentBlock', 'Highlight', 'Note', 'Favorite']
  },
  {
    id: 'workshop.fr_e8_04',
    title: '3 gunluk kamp ve oturum plani',
    route: '/workshop/camp',
    fr: 'FR-E8-04',
    purpose: 'Implements FR-E8-04: Gun 1/2/3 sekmeleri, sabah/ogle/aksam oturumu kartlari ve oturum tamamlama.',
    entryPoints: ['workshop.phases'],
    gates: ['auth', 'subscription'],
    analytics: {
      screenView: 'workshop_camp_viewed',
      events: ['workshop_camp_viewed', 'workshop_session_started', 'workshop_session_completed']
    },
    acs: ['AC-FR-E8-04-01', 'AC-FR-E8-04-02', 'AC-FR-E8-04-03', 'AC-FR-E8-04-04'],
    dataDeps: ['Workshop', 'WorkshopCampDay', 'WorkshopSession', 'ContentProgress']
  },
  {
    id: 'workshop.fr_e8_05',
    title: 'Egitmen rehberi ve facilitator mode',
    route: '/workshop/guide',
    fr: 'FR-E8-05',
    purpose: 'Implements FR-E8-05: Dakika/dakika akis, cumle onerileri, facilitator mode ve cevrimdisi erisim.',
    entryPoints: ['workshop.landing', 'workshop.phases'],
    gates: ['auth'],
    analytics: {
      screenView: 'workshop_guide_viewed',
      events: ['workshop_guide_viewed', 'facilitator_mode_toggled', 'guide_section_jumped']
    },
    acs: ['AC-FR-E8-05-01', 'AC-FR-E8-05-02', 'AC-FR-E8-05-03', 'AC-FR-E8-05-04'],
    dataDeps: ['Workshop', 'FacilitatorGuide', 'GuideSection', 'Download']
  },
  {
    id: 'workshop.fr_e8_06',
    title: 'Katilimci defteri ve calisma kagitlari',
    route: '/workshop/workbook',
    fr: 'FR-E8-06',
    purpose:
      'Implements FR-E8-06: Yapilandirilmis calisma kagitlari, otomatik kayit, devam et ve gizlilik onayi ile disari aktarim.',
    entryPoints: ['workshop.phases', 'workshop.section'],
    gates: ['auth'],
    analytics: {
      screenView: 'workshop_workbook_viewed',
      events: ['workshop_workbook_viewed', 'workbook_entry_saved', 'workbook_exported']
    },
    acs: ['AC-FR-E8-06-01', 'AC-FR-E8-06-02', 'AC-FR-E8-06-03', 'AC-FR-E8-06-04'],
    dataDeps: ['Workshop', 'WorkbookEntry', 'ContentProgress']
  },
  {
    id: 'workshop.fr_e8_07',
    title: 'Takip plani ve davranis surekliligi',
    route: '/workshop/followup',
    fr: 'FR-E8-07',
    purpose:
      'Implements FR-E8-07: 72 saatlik toparlanma, 3 haftalik takip, 30 gunluk plan, niyet/cumleler/adimlar ve hatirlatici.',
    entryPoints: ['workshop.completion', 'workshop.phases'],
    gates: ['auth', 'subscription'],
    analytics: {
      screenView: 'workshop_followup_viewed',
      events: ['workshop_followup_viewed', 'followup_plan_saved', 'followup_reminder_set']
    },
    acs: ['AC-FR-E8-07-01', 'AC-FR-E8-07-02', 'AC-FR-E8-07-03', 'AC-FR-E8-07-04'],
    dataDeps: ['Workshop', 'FollowUpPlan', 'Reminder', 'ContentProgress']
  },
  {
    id: 'workshop.fr_e8_08',
    title: 'Atolye tamamlama ve arsivleme',
    route: '/workshop/completion',
    fr: 'FR-E8-08',
    purpose: 'Implements FR-E8-08: Tamamlama durumu, ozet, sertifika/rozet ve arsive ekleme.',
    entryPoints: ['workshop.phases', 'library.workshops'],
    gates: ['auth'],
    analytics: {
      screenView: 'workshop_completion_viewed',
      events: ['workshop_completion_viewed', 'workshop_completed', 'certificate_shared']
    },
    acs: ['AC-FR-E8-08-01', 'AC-FR-E8-08-02', 'AC-FR-E8-08-03', 'AC-FR-E8-08-04'],
    dataDeps: ['Workshop', 'ContentProgress', 'Achievement', 'FollowUpPlan']
  }
];

const SHARED_INPUTS = [
  { name: 'userId', type: 'uuid', required: true, source: 'session' },
  { name: 'workshopId', type: 'uuid', required: true, source: 'route_param' },
  {
    name: 'subscriptionStatus',
    type: 'SubscriptionStatus',
    required: true,
    source: 'entitlement_cache'
  },
  { name: 'locale', type: 'LanguageCode', required: true, source: 'profile' }
];

let written = 0;
for (const c of CONTRACTS) {
  const contract = {
    id: c.id,
    title: c.title,
    route: c.route,
    purpose: c.purpose,
    entryPoints: c.entryPoints,
    inputs: SHARED_INPUTS,
    dataDependencies: c.dataDeps,
    uiStates: {
      loading: { description: `Skeleton placeholders shown while loading ${c.fr} data.` },
      ready: {
        description: `${c.fr} flows fully interactive; primary CTA available when prerequisites met.`
      },
      empty: {
        description: 'Empty state explains why no data is available and offers next best action.'
      },
      error: {
        description: 'Error state is recoverable with user-safe messaging and retry action.'
      },
      offline: {
        description: 'Offline state shows last synchronized data; write actions queued for later sync.'
      }
    },
    analytics: c.analytics,
    acceptanceCriteriaRefs: c.acs,
    gates: c.gates
  };
  const outPath = path.join(DIR, `${c.id}.json`);
  fs.writeFileSync(outPath, JSON.stringify(contract, null, 2), 'utf8');
  written++;
  console.log(`Wrote ${c.id}.json  route=${c.route}`);
}

console.log(`\nContracts written: ${written}/${CONTRACTS.length}`);
