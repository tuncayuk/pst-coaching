# PST Mobile - Normalized Requirements

Scope source: PRD v1.1 (Ocak 2026) + app_blueprint.yaml

## Phase 1 (MVP / Production)

### RQ-01 Content library and hierarchy
- Provide a PST content library that includes **Hazır Yolculuk**, **Modül**, **Paket**, **Atölye**, **e-Kitap**.
- Content hierarchy:
  - Yolculuk = Modüller + Atölyeler + e-Kitaplar
  - Modül = Paketler
  - Paket = Okumalar + Uygulamalar
  - Atölye = Okumalar + Uygulamalar
  - e-Kitap = Bölümler

### RQ-02 Tab navigation
- Provide 5-tab layout: Ana Sayfa, Keşfet, Kütüphane, Gelişim, Profil.
- Access rules: Kütüphane and Gelişim require **aktif abonelik**.

### RQ-03 Language and account
- Language selection TR/EN/ES at onboarding; changeable in Profile > Settings > Language.
- Language selection is persisted offline and synced.
- Registration via email or phone with OTP verification and attempt counter.
- Login with email/phone + password; failed attempts cause temporary lock.
- Password reset via email/phone verification; enforce password policy.
- Logout clears tokens and ends session; protected areas require re-auth.
- Session timeout and background re-auth are supported.
- On login, subscription status and role must be synchronized.

### RQ-04 Home (Ana Sayfa)
- Show Today summary with single “Devam Et” CTA to resume correct next step.
- Display subscription status badge (Aktif/Deneme/İptal) and add-on statuses.
- Provide content-area entry cards (Yolculuklar, Atölyeler, e-Kitaplar, Koçluk Okulu).
- Show “Vicdandan Karaktere” info card with detail screen.
- Global search entry that supports all content types and categorized results.
- Show up to 3 active content cards with progress + locked labels and “Tümünü Gör”.
- Performance: skeleton loading, prioritize critical cards, per-card retry on error.

### RQ-05 Discovery and catalog (Keşfet)
- Central discovery screen with segment tabs for Yolculuklar/Atölyeler/Modüller/e-Kitaplar.
- Content Assistant questionnaire (target/schedule/preferences) yields 1 main + 2 alternatives, with “Atla” to catalog.
- Catalog lists for each type with filters/sort (e.g., hedef/süre/seviye; önerilen/popüler/yeni).
- Detail screens for each content type with description, duration, included content list, and start CTA.
- Paywall shown when access is restricted by subscription.

### RQ-06 Subscription and seats
- Plan comparison: Bireysel (1), Aile (5), Grup (10) seats.
- In‑app purchase via Apple/Google; server-side validation required.
- Immediate entitlement activation and cross-device sync.
- Add-ons: AI Paketi, Koçluk Eğitimi, Ek Kişi +5, Ek Kişi +10.
- Add-ons are only manageable by plan owner; extra seats only for Aile/Grup.
- Student discount (50%) with verification and annual re-verify.
- Plan change/cancel with visibility of renewal date and seat utilization.
- Seat management: invite/remove users; show occupancy; suggest add-on when full.
- Restore purchases and payment history visibility.
- Cancel keeps access until period end; show effects clearly.

### RQ-07 Reading experience (general content)
- Reading view supports full-screen reading, progress tracking, and resume state.
- Text selection tools for highlight and note; notes persist and attach to source content.
- Guided comment flow with prompts, draft autosave, word count.
- Submission preview and submit; after submit comment is locked.
- 23:00 warning prior to submission deadline; 23:59 deadline enforcement.
- Locked progression enforced for sequential steps.

### RQ-08 Day-based progression rules
- After completing today’s content, next day remains locked.
- Next day unlocks at 08:00 with countdown visible.
- “Bugün tamamlandı” and locked messaging required.

### RQ-09 Atölye experience
- Atölye home shows progress, completed/remaining sections, and “Devam Et”.
- Reading sections with highlight/note and optional audio.
- Application/exercise sections with ordered steps and completion markers.
- Commenting with prompts and 23:59 rule.
- Completion shows stats and certificate/badge; suggest next content.

### RQ-10 Modül & Paket experience
- Module home shows progress and list of packages with status (completed/in progress/locked).
- Package detail lists sections; “Paketi Başlat” CTA.
- Packages enforce prerequisite completion; locked reason visible.
- Package reading and application sections with completion tracking.
- Module completion issues certificate/badge and suggests next module.

### RQ-11 e‑Kitap reader
- Open to last read page; show title + current/total pages; TOC access.
- Page navigation via scroll/flip, jump to page, jump via TOC.
- Reader settings: font size, background (white/sepia/dark), line spacing; persist across books.
- Highlight and notes within book; list all highlights/notes with jump to page; exportable.
- Audio playback when available with sync and speed control.
- Reading progress percent + estimated remaining time; completion badge/certificate.
- Offline download with download status and storage warning.

### RQ-12 Favorites and personal archive
- Favorites screen aggregates items from all content types with tags.
- Search and filtering by content type and text.
- Favorite detail shows source and allows editing notes.
- Collections: create, rename, add items, delete with undo.
- Share/export to PDF with privacy confirmation and scope selection.
- Offline access to saved items with sync when online.

### RQ-13 Growth & reporting
- Progress dashboard with content-type progress, completion rate, habit streak.
- Emotional map derived from comments, 14/30 day view, legend, “not diagnosis” note.
- Strengths & development areas with actionable recommendations.
- Weekly summary with trends, completed items, and empty-state explanation.
- End-of-content evaluation prompt; deferrable.
- Export report as PDF with privacy confirmation.

### RQ-14 Accessibility
- Accessibility settings: text size, high contrast, reduce motion.
- High contrast and color‑blind support (icons/patterns).
- Screen reader support (labels, focus order, form error reading).
- Conform to WCAG 2.1 AA.

### RQ-15 Notifications and reminders
- Daily reminder flow with permission rationale.
- Default reminder time 20:00; stop sending after comment submission.

## Phase 2 (Future)

### RQ-16 Coach panel
- Coach list of assigned clients with risk indicators.
- Client profile shows goals, content status, metrics.
- Content tracking across journeys/workshops/ebooks.
- Coach can send feedback to client.

### RQ-17 Community: Birlikte Okuma / Kitap Kulübü
- Group creation and content selection.
- Shared progress view for group members.
- Book club creation and discussion.

### RQ-18 AI Assistant (RAG)
- AI chat answers only from PST content library (no external knowledge).
- Responses include source references.
- AI analysis over user comments.

### RQ-19 Gamification
- Gamification features (details TBD in PRD).

### RQ-20 Reminders/notifications expansion
- Additional reminders and notifications beyond daily reminder (details TBD).

### RQ-21 Video content
- Video content support (details TBD).

## Cross-cutting constraints and rules

- **Offline support:** content, language, accessibility settings, favorites must be cached and synced on reconnect.
- **Mock mode:** when environment variable `useMock=true`, the app must use local mock data from `artifacts/mock/mock_data.json` and bypass network calls.
- **Time rules:** content unlocks daily at **08:00**; comment submission allowed until **23:59**; show **23:00** warning.
- **Locked progression:** a step cannot be accessed until prerequisite is completed.
- **Server-side purchase validation:** all store purchases validated server-side before entitlement.
- **Privacy & consent:** sharing/export requires explicit user consent.
- **Accessibility:** WCAG 2.1 AA baseline for all screens.
- **Platform IAP:** use Apple/Google purchase flows and restore purchases.
- **Analytics:** analytics enabled per blueprint; avoid logging sensitive data.
- **All content is in-app:** no external documents required for core content.
