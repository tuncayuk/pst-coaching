#!/usr/bin/env node
// write-e9-contracts.js — Writes all 6 EPIC-9 contracts with correct routes and FR/AC refs.
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../artifacts/ux/screen_contracts');

const CONTRACTS = [
  {
    id: 'favorites.fr_e9_01',
    title: 'Favoriler ana ekrani',
    route: '/favorites',
    fr: 'FR-E9-01',
    purpose: 'Implements FR-E9-01: Favoriler ana listesi — icerik turu etiketleri, arama ve filtreleme, bos durum.',
    entryPoints: ['library.overview', 'home.dashboard'],
    gates: ['auth', 'subscription'],
    analytics: {
      screenView: 'favorites_viewed',
      events: ['favorites_viewed', 'favorite_opened', 'favorite_filter_applied']
    },
    acs: ['AC-FR-E9-01-01', 'AC-FR-E9-01-02', 'AC-FR-E9-01-03'],
    dataDeps: ['Favorite', 'Journey', 'Workshop', 'Module', 'Ebook']
  },
  {
    id: 'favorites.fr_e9_02',
    title: 'Favori detayi',
    route: '/favorites/detail',
    fr: 'FR-E9-02',
    purpose: 'Implements FR-E9-02: Favori detayi — kaynak bilgisi, not duzenleme, kaynaga git navigasyonu.',
    entryPoints: ['favorites.list', 'favorites.collection_detail'],
    gates: ['auth', 'subscription'],
    analytics: {
      screenView: 'favorite_detail_viewed',
      events: ['favorite_detail_viewed', 'favorite_note_saved', 'favorite_source_opened']
    },
    acs: ['AC-FR-E9-02-01', 'AC-FR-E9-02-02', 'AC-FR-E9-02-03'],
    dataDeps: ['Favorite', 'Note', 'Journey', 'Workshop', 'Module', 'Ebook']
  },
  {
    id: 'favorites.fr_e9_03',
    title: 'Koleksiyonlar',
    route: '/favorites/collections',
    fr: 'FR-E9-03',
    purpose: 'Implements FR-E9-03: Koleksiyon olusturma/adlandirma, favorileri ekleme, geri alinabilir silme.',
    entryPoints: ['library.overview', 'favorites.list'],
    gates: ['auth', 'subscription'],
    analytics: {
      screenView: 'collections_viewed',
      events: ['collections_viewed', 'collection_created', 'collection_deleted', 'collection_delete_undone']
    },
    acs: ['AC-FR-E9-03-01', 'AC-FR-E9-03-02', 'AC-FR-E9-03-03'],
    dataDeps: ['Collection', 'CollectionItem', 'Favorite']
  },
  {
    id: 'favorites.fr_e9_04',
    title: 'Koleksiyon detayi ve arama',
    route: '/favorites/collection-detail',
    fr: 'FR-E9-04',
    purpose:
      'Implements FR-E9-04: Favorilerde ve koleksiyonda arama (baslik/not/kaynak), icerik turu filtresi, filtre temizleme.',
    entryPoints: ['favorites.collections'],
    gates: ['auth', 'subscription'],
    analytics: {
      screenView: 'collection_detail_viewed',
      events: ['collection_detail_viewed', 'favorites_searched', 'favorites_filter_applied', 'favorites_filter_cleared']
    },
    acs: ['AC-FR-E9-04-01', 'AC-FR-E9-04-02', 'AC-FR-E9-04-03'],
    dataDeps: ['Collection', 'CollectionItem', 'Favorite', 'Journey', 'Workshop', 'Module', 'Ebook', 'Note']
  },
  {
    id: 'favorites.fr_e9_05',
    title: 'Paylasim ve disa aktarma',
    route: '/favorites/export',
    fr: 'FR-E9-05',
    purpose: 'Implements FR-E9-05: Gizlilik uyarisi (BR-09), kapsam secimi (vurgu/vurgu+not), PDF aktarimi.',
    entryPoints: ['favorites.detail'],
    gates: ['auth', 'subscription'],
    analytics: {
      screenView: 'favorites_export_viewed',
      events: ['favorites_export_viewed', 'favorites_export_confirmed', 'favorites_export_cancelled']
    },
    acs: ['AC-FR-E9-05-01', 'AC-FR-E9-05-02', 'AC-FR-E9-05-03'],
    dataDeps: ['Favorite', 'Highlight', 'Note']
  },
  {
    id: 'favorites.fr_e9_06',
    title: 'Cevrimdisi erisim',
    route: '/favorites/downloads',
    fr: 'FR-E9-06',
    purpose:
      'Implements FR-E9-06: Indirilen favorileri cevrimdisi goruntuleme, otomatik senkronizasyon, depolama uyarisi.',
    entryPoints: ['library.overview', 'favorites.list'],
    gates: ['auth', 'subscription'],
    analytics: {
      screenView: 'downloads_viewed',
      events: ['downloads_viewed', 'download_opened', 'download_deleted', 'download_sync_triggered']
    },
    acs: ['AC-FR-E9-06-01', 'AC-FR-E9-06-02', 'AC-FR-E9-06-03'],
    dataDeps: ['Download', 'Ebook', 'Workshop']
  }
];

const SHARED_INPUTS = [
  { name: 'userId', type: 'uuid', required: true, source: 'session' },
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
      ready: { description: `${c.fr} flows fully interactive; primary CTA available.` },
      empty: {
        description: 'Empty state explains why no data is available and offers next best action.'
      },
      error: {
        description: 'Error state is recoverable with user-safe messaging and retry action.'
      },
      offline: { description: 'Offline state shows last synchronized data; write actions queued.' }
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
