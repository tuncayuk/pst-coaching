# PST Coaching - React Native Architecture

## Overview
This architecture supports the screen contracts and PRD requirements for offline-first behavior, accessibility (WCAG 2.1 AA), and analytics. It is optimized for content-heavy flows (journeys, modules, workshops, e-books) with stable navigation and local caching.

## Proposed React Native Architecture

### Navigation
- **Library:** React Navigation (native-stack + bottom-tabs) with react-native-screens.
- **Structure:**
  - Root: AuthStack / AppTabs gated by session.
  - AppTabs: Ana Sayfa, Kesfet, Kutuphane, Gelisim, Profil.
  - Each tab hosts a Stack navigator for detail screens.
  - Modals/Sheets: use React Navigation modal presentation; Bottom sheets via @gorhom/bottom-sheet for paywall, review, report export, TOC.
- **Route guards:** subscription and role gates enforced in a single navigation guard (reads session + entitlement state). Paywall sheet is the fallback route.

### State Management
- **App state (client):** Redux Toolkit for app state (session, settings, connectivity).
- **Server state:** TanStack Query (@tanstack/react-query) for GraphQL data fetching, caching, invalidation, and offline-aware retries.
- **Derived state:** selectors on top of normalized local DB and cached query data.
- **Why:** Keeps UI simple, reduces boilerplate, supports optimistic updates, and works well with caching.

### Data Layer
- **Networking:** urql client with typed schema/codegen. Use fetch + auth/error/retry only; omit cacheExchange so TanStack Query owns caching.
- **API layer:** AWS AppSync for queries and mutations.
- **Mock data:** when `useMock=true`, route all data access through local fixtures in `artifacts/mock/mock_data.json` and skip network calls.
- **Local persistence:**
  - **SQLite (react-native-quick-sqlite or expo-sqlite):** primary local store for content (journeys, modules, packages, workshops, ebooks), progress, and downloads metadata.
  - **MMKV:** fast key-value for small settings (language, accessibility, session tokens).
- **File storage:** react-native-blob-util or expo-file-system for e-book files and media.
- **Cache strategy:**
  - List/detail queries seed from SQLite if available, then refresh in background.
  - E-book reading uses local file + metadata to avoid network dependency.

### Offline Strategy (high level)
- **Offline-first:** render cached content and progress state when offline.
- **Write actions:** queue writes (progress updates, comments, highlights, favorites) for later sync. Store in a SQLite outbox table with exponential backoff retries; move to a dead-letter table after 10 failed attempts, surface via per-screen error-state retry actions in affected screens (no new screen), prune oldest rows after 30 days or 20,000 entries, and cap storage at 50 MB. UI shows pending state and sync banner.
- **Conflict resolution:** AppSync conflict resolution set to last-write-wins (LWW) for progress + comments with server timestamp reconciliation; source of truth is AppSync IaC configuration in `infra/` (CloudFormation/Amplify).

### Security and Privacy
- **Tokens:** stored in secure storage (Keychain/Keystore). Do not persist raw credentials.
- **Auth provider:** AWS Cognito for user authentication and session management.
- **PII:** minimal analytics events; scrub content text from telemetry.
- **Consent:** export/share flows require explicit consent per PRD.

### Accessibility
- **Dynamic Type:** honor system font size; allow larger text without clipping.
- **Reduce Motion:** use accessibility settings to minimize animations.
- **High Contrast:** theme supports high-contrast palette for Material 3.

## Telemetry and Error Handling
- **Crash + performance:** Sentry (RN SDK) with release tagging and source maps.
- **Analytics pipeline:** production telemetry must flow to Grafana Cloud (grafana.net) ingestion (via Grafana Alloy / OpenTelemetry), then into ClickHouse for storage and Grafana dashboards/alerting.
- **Non-prod exception:** direct HTTP batching from the app to ClickHouse is allowed for non-prod/testing only.
- **Event conventions:**
  - Screen view: `{screen}_viewed`
  - CTA taps: `{screen}_{cta}_tapped`
  - Content lifecycle: `content_started`, `content_completed`, `comment_submitted`
- **Error UX:**
  - Map API errors to user-friendly copy and retry actions.
  - Surface network/offline banners globally.
  - Log errors with context (screen, action, request id), exclude content body/PII.
  - Telemetry events stored in ClickHouse are strictly de-identified; analytics is opt-in if platform policy requires.

## Data Ownership and Sync Flow
- **Source of truth:** server for subscriptions, entitlements, user profile.
- **Local cached copy:** content catalogs and reading assets, once downloaded.
- **Sync triggers:**
  - App foreground
  - Pull-to-refresh
  - Connectivity regained (auto-retry)
  - Explicit retry action from per-screen error-state actions

## Trade-offs
- **Redux Toolkit + TanStack Query** keeps data flow consistent but adds some boilerplate and requires discipline to avoid state duplication.
- **SQLite + file storage** supports offline reading but adds migration and storage management overhead.

## Implementation Notes
- Enforce the screen contracts and loading/empty/error/offline states for every screen.
- Centralize entitlement checks and content gating to avoid duplicated logic.
- Use the domain model identifiers as canonical IDs in routes and caching keys.
