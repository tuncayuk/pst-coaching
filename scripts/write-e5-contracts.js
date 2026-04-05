#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const CONTRACTS_DIR = path.join(__dirname, '../artifacts/ux/screen_contracts');

const contracts = [
  {
    id: 'reading.fr_e5_01',
    title: 'Gunun icerigini okuma',
    route: '/content/reading',
    purpose: 'Implements FR-E5-01: Daily reading with progress tracking and accessibility controls.',
    entryPoints: ['content.journey_day', 'home.dashboard'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'contentItemId', type: 'string', required: true, source: 'route_params' },
      {
        name: 'subscriptionStatus',
        type: 'SubscriptionStatus',
        required: true,
        source: 'entitlement_cache'
      }
    ],
    dataDependencies: ['ContentProgress', 'ContentItem', 'FavoriteItem'],
    uiStates: {
      loading: { description: 'Skeleton placeholders shown while reading content loads.' },
      ready: {
        description:
          'Sticky header shows day number and 23:59 deadline chip. Progress bar updates as user scrolls. Audio bar has play/pause and 3-speed selector (0.75x/1x/1.25x). Highlight toolbar offers Vurgula/Not Ekle/Favoriye Kaydet. Font size toggle cycles small/medium/large.'
      },
      empty: { description: 'Empty state explains content is unavailable with a back CTA.' },
      error: { description: 'Error state with retry action.' },
      offline: {
        description: 'Offline state shows cached content; audio and submit actions disabled.'
      }
    },
    analytics: {
      screenView: 'content_reading_viewed',
      events: [
        'content_reading_viewed',
        'content_reading_progress_updated',
        'content_audio_toggled',
        'content_audio_speed_changed',
        'content_highlight_created',
        'content_note_added',
        'content_favorited',
        'content_font_size_changed',
        'content_reading_completed'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E5-01-01', 'AC-FR-E5-01-02', 'AC-FR-E5-01-03', 'AC-FR-E5-01-04'],
    gates: ['auth']
  },
  {
    id: 'reading.fr_e5_02',
    title: 'Sesli okuma',
    route: '/content/audio',
    purpose: 'Implements FR-E5-02: Audio reading mode with speed controls and text highlight sync.',
    entryPoints: ['content.reading'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'contentItemId', type: 'string', required: true, source: 'route_params' }
    ],
    dataDependencies: ['ContentItem', 'AudioTrack'],
    uiStates: {
      loading: { description: 'Audio player initializing; spinner shown.' },
      ready: {
        description:
          'Play/pause button active. Speed selector shows 0.75x/1x/1.25x options. Current-word highlight syncs with playback position. Background audio continues when app is backgrounded.'
      },
      empty: { description: 'No audio track available; fallback to reading mode.' },
      error: { description: 'Audio load error with retry.' },
      offline: { description: 'Audio disabled offline; reading mode available from cache.' }
    },
    analytics: {
      screenView: 'content_audio_viewed',
      events: [
        'content_audio_viewed',
        'content_audio_play_started',
        'content_audio_paused',
        'content_audio_speed_changed',
        'content_audio_completed'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E5-02-01', 'AC-FR-E5-02-02', 'AC-FR-E5-02-03', 'AC-FR-E5-02-04'],
    gates: ['auth']
  },
  {
    id: 'reading.fr_e5_03',
    title: 'Altini cizme ve not alma',
    route: '/content/highlights',
    purpose: 'Implements FR-E5-03: Text highlighting, note taking, and favorites within reading.',
    entryPoints: ['content.reading'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'contentItemId', type: 'string', required: true, source: 'route_params' }
    ],
    dataDependencies: ['Highlight', 'Note', 'FavoriteItem'],
    uiStates: {
      loading: { description: 'Loading existing highlights and notes.' },
      ready: {
        description:
          'Long-press or toolbar tap reveals Vurgula/Not Ekle/Favoriye Kaydet options. Highlights persist per BR-12 offline storage rule. Source attribution shown on each highlight card.'
      },
      empty: { description: 'No highlights yet; prompt user to long-press text.' },
      error: { description: 'Save error with retry.' },
      offline: {
        description: 'New highlights queued for sync; existing highlights shown from cache.'
      }
    },
    analytics: {
      screenView: 'content_highlights_viewed',
      events: [
        'content_highlights_viewed',
        'content_highlight_created',
        'content_highlight_deleted',
        'content_note_created',
        'content_favorited'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E5-03-01', 'AC-FR-E5-03-02', 'AC-FR-E5-03-03', 'AC-FR-E5-03-04'],
    gates: ['auth']
  },
  {
    id: 'reading.fr_e5_04',
    title: 'Yorum yazma ve teslim',
    route: '/content/comment',
    purpose: 'Implements FR-E5-04: Guided comment writing with auto-save, word counter, deadline enforcement.',
    entryPoints: ['content.exercise', 'content.reading'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'contentItemId', type: 'string', required: true, source: 'route_params' }
    ],
    dataDependencies: ['CommentDraft', 'CommentSubmission'],
    uiStates: {
      loading: { description: 'Comment form and guiding questions loading.' },
      ready: {
        description:
          'Two guiding questions with multiline inputs. Word counter updates live. Draft auto-saves 1.5s after last keystroke with a brief indicator. Warning banner appears after 23:00. Submit disabled after 23:59. Emotion chip selector (single-select). Proceeds to preview with answers passed as params.'
      },
      empty: { description: 'No comment template; back CTA to content.' },
      error: { description: 'Draft save error with retry.' },
      offline: { description: 'Draft saved locally; submit queued until online.' }
    },
    analytics: {
      screenView: 'content_comment_viewed',
      events: [
        'content_comment_viewed',
        'content_comment_draft_autosaved',
        'content_comment_word_count_updated',
        'content_comment_late_warning_shown',
        'content_comment_deadline_blocked',
        'content_comment_preview_opened'
      ]
    },
    acceptanceCriteriaRefs: [
      'AC-FR-E5-04-01',
      'AC-FR-E5-04-02',
      'AC-FR-E5-04-03',
      'AC-FR-E5-04-04',
      'AC-FR-E5-04-05',
      'AC-FR-E5-04-06',
      'AC-FR-E5-04-07'
    ],
    gates: ['auth']
  },
  {
    id: 'reading.fr_e5_05',
    title: 'Kilitli ilerleme (08:00 kurali)',
    route: '/content/locked',
    purpose: 'Implements FR-E5-05: 08:00 lock gate with countdown and auto-unlock for daily content.',
    entryPoints: ['content.journey_day'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'journeyId', type: 'string', required: true, source: 'route_params' },
      { name: 'dayNumber', type: 'number', required: false, source: 'route_params' }
    ],
    dataDependencies: ['JourneyDay', 'ContentProgress'],
    uiStates: {
      loading: { description: 'Loading day schedule and lock status.' },
      ready: {
        description:
          'Content items listed with navigation. 08:00 and 23:59 deadline chips shown. Today completed banner displayed when all items done. When current hour < 8, locked state shows countdown to 08:00 and hides content list.'
      },
      empty: { description: 'No content scheduled for this day.' },
      error: { description: 'Load error with retry.' },
      offline: {
        description: 'Last-synced day content shown; lock state evaluated from device clock.'
      }
    },
    analytics: {
      screenView: 'content_locked_viewed',
      events: [
        'content_locked_viewed',
        'content_locked_shown',
        'content_locked_countdown_displayed',
        'content_day_completed'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E5-05-01', 'AC-FR-E5-05-02', 'AC-FR-E5-05-03'],
    gates: ['auth']
  },
  {
    id: 'reading.fr_e5_06',
    title: 'Uygulama/egzersiz tamamlama',
    route: '/content/exercise',
    purpose: 'Implements FR-E5-06: Step-by-step exercise with ordered unlock and progress save.',
    entryPoints: ['content.reading'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'contentItemId', type: 'string', required: true, source: 'route_params' }
    ],
    dataDependencies: ['ExerciseProgress', 'ContentProgress'],
    uiStates: {
      loading: { description: 'Exercise steps loading.' },
      ready: {
        description:
          "Steps displayed in ordered list. Only the active step has a 'Bu Adimi Tamamla' button. Completing a step unlocks the next. Progress fraction shown in header bar. When all steps done, celebration card appears with progress-saved message and CTA to comment screen."
      },
      empty: { description: 'No exercise steps for this item; back CTA.' },
      error: { description: 'Load error with retry.' },
      offline: { description: 'Steps shown from cache; completion queued for sync.' }
    },
    analytics: {
      screenView: 'content_exercise_viewed',
      events: [
        'content_exercise_viewed',
        'content_exercise_step_completed',
        'content_exercise_all_steps_completed',
        'content_exercise_progress_saved'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E5-06-01', 'AC-FR-E5-06-02', 'AC-FR-E5-06-03'],
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
