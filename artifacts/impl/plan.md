# Implementation Plan (PR-sized slices)

## 1) App shell + tab navigation

- Objective: Bootstrap a React Native shell with Material 3 theming and bottom tabs; implement production-ready screens for the 5 tab routes (home.dashboard, discover.catalog, library.overview, progress.dashboard, profile.overview) using their screen contracts.
- Files touched: `apps/mobile/App.tsx`, `apps/mobile/screens/*`.
- Tests to add: Basic navigation smoke test (renders tabs, can switch), snapshot or screen rendering test for each tab screen state.
- Acceptance checks: App boots, bottom tabs visible with 5 labels, each tab renders loading/ready/empty/error/offline states per contract with real UI components (no placeholders), no runtime errors.

## 2) Auth + onboarding stack shell

- Objective: Add stack navigation for onboarding + auth flows and implement production-ready screens for onboarding.language_select, onboarding.welcome, auth.login, auth.register, auth.otp_verify, auth.password_reset, auth.session_timeout using their screen contracts.
- Files touched: `apps/mobile/navigation/AuthStack.tsx`, `apps/mobile/screens/auth/*`, `apps/mobile/screens/onboarding/*`.
- Tests to add: Navigation route coverage for each auth/onboarding screen; UI state tests per contract.
- Acceptance checks: Routes register without conflicts, modal screen for session timeout presents correctly, and UI states match contracts with real components.

## 3) Home + discover stacks

- Objective: Wire stack routes for home.search, home.search*results, home.vicdandan_karaktere_detail, home.active_content_list, plus discover.assistant*_ and discover._ list screens, implementing production-ready UIs from screen contracts.
- Files touched: `apps/mobile/navigation/HomeStack.tsx`, `apps/mobile/navigation/DiscoverStack.tsx`, `apps/mobile/screens/home/*`, `apps/mobile/screens/discover/*`.
- Tests to add: Route registration tests; UI state tests for each screen per contract.
- Acceptance checks: Tab → stack navigation works; each screen shows defined UI states with real components.

## 4) Content detail + reader flows

- Objective: Add content.\* screens (detail, reader, toc sheet, highlights, comments, review prompt) and stack + sheet presentation rules, implementing production-ready UIs from screen contracts.
- Files touched: `apps/mobile/navigation/ContentStack.tsx`, `apps/mobile/screens/content/*`.
- Tests to add: Sheet presentation test for paywall/toc/review prompt; route param typing tests; UI state tests per contract.
- Acceptance checks: All content routes register; sheet routes present modally; offline state renders when forced using real UI components.

## 5) Library + progress gated flows

- Objective: Implement library._ and progress._ routes, add entitlement gate hook and paywall fallback route (content.paywall), and implement production-ready UIs from screen contracts.
- Files touched: `apps/mobile/navigation/LibraryStack.tsx`, `apps/mobile/navigation/ProgressStack.tsx`, `apps/mobile/screens/library/*`, `apps/mobile/screens/progress/*`, `apps/mobile/navigation/guards.ts`.
- Tests to add: Gate logic unit tests (trial/active vs none), paywall routing test; UI state tests per contract.
- Acceptance checks: Gated screens redirect to paywall when entitlement missing; otherwise render contract-based UI with real components.

## 6) Profile + subscription stack

- Objective: Add profile.\* screens (settings, account, subscription, checkout, add-ons, seat management, payment history, restore purchases, student discount, logout confirm) with production-ready UIs from screen contracts and sheet presentation for logout.
- Files touched: `apps/mobile/navigation/ProfileStack.tsx`, `apps/mobile/screens/profile/*`.
- Tests to add: Route registration tests; sheet presentation test for logout confirm; UI state tests per contract.
- Acceptance checks: Profile routes render with real components; modal/sheet presentation matches contract types.

## 7) Data layer baseline + offline banner

- Objective: Establish app state store, TanStack Query baseline, offline banner, and mock data toggles wired to artifacts/mock/mock_data.json.
- Files touched: `apps/mobile/state/*`, `apps/mobile/data/*`, `apps/mobile/components/OfflineBanner.tsx`, `apps/mobile/config/mockData.ts`.
- Tests to add: Store selectors test, offline banner visibility test, mock data toggle test.
- Acceptance checks: Offline banner shows when connection false; mock data renders without network; loading/empty/error states follow contract copy.

## 8) Analytics + instrumentation

- Objective: Add screen view events and CTA tap events per contract, with opt-in enforcement and privacy scrubbing.
- Files touched: `apps/mobile/analytics/*`, `apps/mobile/navigation/analytics.ts`.
- Tests to add: Event payload unit tests; opt-in guard test.
- Acceptance checks: Screen view events fire once per screen focus; no PII in payloads.
