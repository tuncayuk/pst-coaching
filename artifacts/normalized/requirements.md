# Normalized Requirements

## Phase 1 (MVP)

### Global and navigation
- App is fully in-app for all content types; no external documents are required.
- Tab bar contains: Ana Sayfa, Kesfet, Kutuphane, Gelisim, Profil.
- Language selection supports TR/EN/ES; selection persists offline and syncs.
- Analytics are supported (per app blueprint).

### Accounts and security
- Sign up via email or phone with OTP verification and format validation.
- Sign in via email/phone + password; failed attempts trigger temporary lock.
- Password reset via email/phone verification and password policy enforcement.
- Logout clears tokens and requires re-auth for protected areas.
- Session expiry and background re-auth prompts are enforced.
- Subscription status and role are synced on login.

### Subscription and seats
- Plans: Individual (1), Family (5), Group (10) with full library access.
- Plan badges show status: active, trial, canceled.
- Student discount (50%) available for Individual only; requires verification and yearly re-verify.
- Add-ons: AI Package, Coaching School, Extra Seat +5, Extra Seat +10; Extra Seat add-ons only for Family/Group.
- Plan owners can manage plan, cancel, change, and manage seats; members cannot purchase add-ons.
- Seat management includes invite/remove and capacity display; suggest add-on when full.
- Payments use Apple/Google purchase flows and server-side validation.
- Purchase history view and restore purchases are available.

### Home (Ana Sayfa)
- Today summary shows target, remaining time until 23:59, and a single Continue CTA.
- Continue resumes last active step (journey/workshop/e-book).
- Subscription badge and add-on statuses shown; restricted access explains why.
- Quick navigation cards for content types; paywall when access is restricted.
- "Vicdandan Karaktere" intro card with detail view; cache for offline.
- Global search across all content types with categorized results.
- Active content summary (max 3) with progress and locked indicators.
- Daily reminder default at 20:00; only after permission; suppressed after submission.
- Performance: skeleton loading, critical cards first, per-card retry on error.

### Discovery and catalog (Kesfet)
- Central discovery with segmented types: Yolculuk, Atolye, Modul, e-Kitap.
- Content assistant flow (goal/time/preference) with 1 main + 2 alternatives; can skip.
- Each catalog supports listing, filtering, sorting, and detail views.
- Detail pages show description, duration, and component counts.
- Start content flow captures daily goal and displays time rules; allows reminder setup.

### Reading and interaction
- Reading view shows day/section number, target, and 23:59 deadline.
- Audio playback with speed control and synced highlighting where available.
- Highlighting and notes with persistence; saved to favorites.
- Guided reflection questions with draft autosave and word counter.
- Submission preview; submit before 23:59; after submit, comment is locked.
- After completion, next day remains locked until 08:00.
- Exercises show steps, completion tracking, and progression.

### Progress and reporting (Gelisim)
- Progress dashboard by content type; streak and completion metrics.
- Emotional map with 14/30 day views, legend, and "not a diagnosis" notice.
- Strengths and growth areas with actionable recommendations.
- Weekly summary with trends and completed content list.
- Completion survey at end of content; can defer.
- Report export to PDF with privacy consent.

### e-Kitap reader
- Resume last page; show title and current/total pages; TOC accessible.
- Page navigation (scroll/page turn), jump to page/TOC; progress bar.
- Reader settings: font size, background (white/sepia/dark), line spacing; persist across books.
- Highlights/notes with per-book list and edit; exportable.
- Optional audio playback; background playback and speed control.
- Reading progress with percent and remaining time; badge/certificate on completion.
- Offline download with status and storage warnings; mark downloaded items.

### Atolye experience
- Workshop overview with progress and next step CTA; show locked sections.
- Reading and exercise sections with highlighting, notes, and optional audio.
- Guided questions, draft autosave, submit to complete section; 23:59 rule applies.
- Progress details with section states and ETA.
- Completion flow with summary and badge/certificate; next content suggestion.

### Favorites and archive
- Cross-type favorites list with type labels and empty-state CTA.
- Favorite detail shows source and allows edit; deep link to source content.
- Collections for grouping; add/remove and undo delete.
- Search/filter by title, note text, and type.
- Share/export with privacy warning and scope selection; PDF export.
- Offline access for downloaded items with auto-sync when online.

### Accessibility
- Accessibility settings include text size, high contrast, reduce motion, and theme.
- Settings apply immediately, persist offline, and apply across content types.
- Screen reader labeling, focus order, and readable error messaging.
- Color-blind support via icons/patterns.

### Module and package system
- Module overview shows progress and ordered package list with state labels.
- Package detail shows description, goals, and section list; start CTA.
- Locked progression: cannot start next package until previous completed.
- Module completion yields certificate and suggestions.

## Phase 2 (Enhancements)
- Coach panel: client list, profiles, content tracking, coach feedback.
- Community: group reading and book club with shared progress views.
- Gamification features.
- AI assistant (RAG) using only system content with source citations.
- Expanded reminders/notifications (beyond Phase 1 daily reminder).
- Video content library.

## Cross-cutting constraints
- Time rules: new day unlock at 08:00; submission deadline at 23:59.
- Locked progression: next step/package locked until current is completed.
- Offline support: cached summaries, downloads, offline reading, and sync on reconnect.
- Accessibility: WCAG 2.1 AA compliance for all screens.
- Privacy: consent required for sharing/export; keep PII minimal.
- Subscription gating: access restricted by plan status and add-on entitlements.
- Server-side validation for purchases and entitlement sync.
