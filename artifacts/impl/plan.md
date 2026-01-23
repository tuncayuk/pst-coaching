# Implementation Plan (PR-sized slices)

## 1) App shell + tab navigation
- Objective: Bootstrap a minimal React Native shell with Material 3 theming, bottom tabs, and placeholder screens for the 5 tab routes (home.dashboard, discover.catalog, library.overview, progress.dashboard, profile.overview).
- Files touched: `artifacts/impl/app_shell/App.tsx`, `artifacts/impl/app_shell/screens/TabPlaceholderScreen.tsx`.
- Tests to add: Basic navigation smoke test (renders tabs, can switch), snapshot or screen rendering test for the placeholder state switcher.
- Acceptance checks: App boots, bottom tabs visible with 5 labels, each tab renders loading/ready/empty/error/offline placeholders, no runtime errors.

## 2) Auth + onboarding stack shell
- Objective: Add stack navigation for onboarding + auth flows and placeholder screens for onboarding.language_select, onboarding.welcome, auth.login, auth.register, auth.otp_verify, auth.password_reset, auth.session_timeout.
- Files touched: `artifacts/impl/app_shell/navigation/AuthStack.tsx`, `artifacts/impl/app_shell/screens/auth/*`, `artifacts/impl/app_shell/screens/onboarding/*`.
- Tests to add: Navigation route coverage for each auth/onboarding screen.
- Acceptance checks: Routes register without conflicts, modal screen for session timeout presents correctly.

## 3) Home + discover stacks
- Objective: Wire stack routes for home.search, home.search_results, home.vicdandan_karaktere_detail, home.active_content_list, plus discover.assistant_* and discover.* list screens with placeholders.
- Files touched: `artifacts/impl/app_shell/navigation/HomeStack.tsx`, `artifacts/impl/app_shell/navigation/DiscoverStack.tsx`, `artifacts/impl/app_shell/screens/home/*`, `artifacts/impl/app_shell/screens/discover/*`.
- Tests to add: Route registration tests; optional UI state snapshot for one screen per stack.
- Acceptance checks: Tab → stack navigation works; each screen shows defined UI states.

## 4) Content detail + reader flows
- Objective: Add content.* screens (detail, reader, toc sheet, highlights, comments, review prompt) and stack + sheet presentation rules.
- Files touched: `artifacts/impl/app_shell/navigation/ContentStack.tsx`, `artifacts/impl/app_shell/screens/content/*`.
- Tests to add: Sheet presentation test for paywall/toc/review prompt; route param typing tests.
- Acceptance checks: All content routes register; sheet routes present modally; offline state renders when forced.

## 5) Library + progress gated flows
- Objective: Implement library.* and progress.* routes, add entitlement gate hook and paywall fallback route (content.paywall).
- Files touched: `artifacts/impl/app_shell/navigation/LibraryStack.tsx`, `artifacts/impl/app_shell/navigation/ProgressStack.tsx`, `artifacts/impl/app_shell/screens/library/*`, `artifacts/impl/app_shell/screens/progress/*`, `artifacts/impl/app_shell/navigation/guards.ts`.
- Tests to add: Gate logic unit tests (trial/active vs none), paywall routing test.
- Acceptance checks: Gated screens redirect to paywall when entitlement missing; otherwise render placeholders.

## 6) Profile + subscription stack
- Objective: Add profile.* screens (settings, account, subscription, checkout, add-ons, seat management, payment history, restore purchases, student discount, logout confirm) with placeholders and sheet presentation for logout.
- Files touched: `artifacts/impl/app_shell/navigation/ProfileStack.tsx`, `artifacts/impl/app_shell/screens/profile/*`.
- Tests to add: Route registration tests; sheet presentation test for logout confirm.
- Acceptance checks: Profile routes render; modal/sheet presentation matches contract types.

## 7) Data layer baseline + offline banner
- Objective: Establish app state store, TanStack Query baseline, offline banner, and mock data toggles wired to artifacts/mock/mock_data.json.
- Files touched: `artifacts/impl/app_shell/state/*`, `artifacts/impl/app_shell/data/*`, `artifacts/impl/app_shell/components/OfflineBanner.tsx`, `artifacts/impl/app_shell/config/mockData.ts`.
- Tests to add: Store selectors test, offline banner visibility test, mock data toggle test.
- Acceptance checks: Offline banner shows when connection false; mock data renders without network; loading/empty/error states follow contract copy.

## 8) Analytics + instrumentation
- Objective: Add screen view events and CTA tap events per contract, with opt-in enforcement and privacy scrubbing.
- Files touched: `artifacts/impl/app_shell/analytics/*`, `artifacts/impl/app_shell/navigation/analytics.ts`.
- Tests to add: Event payload unit tests; opt-in guard test.
- Acceptance checks: Screen view events fire once per screen focus; no PII in payloads.
