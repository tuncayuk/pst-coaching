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
- **App state (client):** Zustand for light-weight app state (session, settings, connectivity, feature flags).
- **Server state:** TanStack Query (React Query) for data fetching, caching, invalidation, and offline retries.
- **Derived state:** selectors on top of normalized local DB and cached query data.
- **Why:** Keeps UI simple, reduces boilerplate, supports optimistic updates, and works well with offline cache.

### Data Layer
- **Networking:** Axios + typed API client. Standard interceptors for auth, refresh, and error mapping.
- **Local persistence:**
  - **SQLite (react-native-quick-sqlite or expo-sqlite):** primary local store for content (journeys, modules, packages, workshops, ebooks), progress, and downloads metadata.
  - **MMKV:** fast key-value for small settings (language, accessibility, session tokens, flags).
- **File storage:** react-native-blob-util or expo-file-system for e-book files and media.
- **Cache strategy:**
  - List/detail queries seed from SQLite if available, then refresh in background.
  - E-book reading uses local file + metadata to avoid network dependency.

### Offline Strategy (high level)
- **Offline-first:** render cached content and progress state when offline.
- **Write actions:** queue writes (progress updates, comments, highlights, favorites) for later sync. UI shows pending state and sync banner.
- **Conflict resolution:** last-write-wins for progress + comments with server timestamp reconciliation.

### Security and Privacy
- **Tokens:** stored in secure storage (Keychain/Keystore). Do not persist raw credentials.
- **PII:** minimal analytics events; scrub content text from telemetry.
- **Consent:** export/share flows require explicit consent per PRD.

### Accessibility
- **Dynamic Type:** honor system font size; allow larger text without clipping.
- **Reduce Motion:** use accessibility settings to minimize animations.
- **High Contrast:** theme supports high-contrast palette for Material 3.

## Feature Flagging Strategy (Phase 2)
- **Provider:** Firebase Remote Config (or equivalent) with local override for QA.
- **Flag layers:**
  - Remote defaults from config service.
  - User/device overrides stored in MMKV (debug only).
  - Rollout targeting by user role (coach vs member), plan type, and locale.
- **Use cases:** AI assistant, coaching panel, community features, video content.
- **Fail-safe:** flags default to disabled; no crashes if config fetch fails.

## Telemetry and Error Handling
- **Crash + performance:** Sentry (RN SDK) with release tagging and source maps.
- **Analytics:** Segment or Firebase Analytics, events aligned to PRD (snake_case). Opt-in if platform policy requires.
- **Event conventions:**
  - Screen view: `{screen}_viewed`
  - CTA taps: `{screen}_{cta}_tapped`
  - Content lifecycle: `content_started`, `content_completed`, `comment_submitted`
- **Error UX:**
  - Map API errors to user-friendly copy and retry actions.
  - Surface network/offline banners globally.
  - Log errors with context (screen, action, request id), exclude content body/PII.

## Data Ownership and Sync Flow
- **Source of truth:** server for subscriptions, entitlements, user profile.
- **Local source of truth:** content catalogs and reading assets, once downloaded.
- **Sync triggers:**
  - App foreground
  - Pull-to-refresh
  - Connectivity regained
  - Explicit retry action

## Trade-offs
- **Zustand + React Query** keeps implementation lean but requires discipline to avoid state duplication.
- **SQLite + file storage** supports offline reading but adds migration and storage management overhead.
- **Remote Config** keeps Phase 2 features gated but introduces dependency on third-party service.

## Implementation Notes
- Enforce the screen contracts and loading/empty/error/offline states for every screen.
- Centralize entitlement checks and content gating to avoid duplicated logic.
- Use the domain model identifiers as canonical IDs in routes and caching keys.
