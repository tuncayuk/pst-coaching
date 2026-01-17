# ADR-0001: Foundation Libraries

## Status
Accepted

## Context
The app must implement a multi-tab navigation structure with modal/sheet flows, provide offline support, use Material 3, support i18n (tr/en/es), and capture analytics while minimizing PII. The solution must align with screen contracts and domain entities.

## Decision
1) **Navigation:** React Navigation v6 with Bottom Tabs + Native Stack.
2) **State management:** TanStack Query for server state and caching; Zustand for UI state.
3) **Networking:** Axios with shared interceptors for auth, retry/backoff, and telemetry hooks.
4) **Caching & persistence:** SQLite-backed local store (WatermelonDB or similar) for offline reads and persisted query cache.
5) **i18n:** `react-i18next` with language files for tr/en/es; device language as default with in-app override.

## Trade-offs
- React Navigation provides deep link and modal/sheet support but adds native dependency complexity.
- TanStack Query + Zustand is two libs, yet separates server data from transient UI state cleanly.
- Axios adds dependency vs `fetch`, but gives consistent interceptors and error handling.
- SQLite persistence adds migration overhead but is required for robust offline content and progress.
- `react-i18next` adds setup cost but supports pluralization and runtime language switches.

## Consequences
- Teams must maintain DB migrations and sync logic.
- UI components should use a unified `screenId` and `route` mapping to drive analytics and error reporting.
- i18n keys must be stable to avoid analytics drift and QA confusion.

## Alternatives Considered
- **React Navigation + Redux Toolkit:** More opinionated global state; heavier boilerplate.
- **MMKV-only caching:** Fast but not suitable for complex offline relational data.
- **`i18n-js`:** Simpler but weaker for runtime language switching and pluralization.
