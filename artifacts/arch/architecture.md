# PST Coaching Mobile Architecture (React Native)

## Overview
This architecture implements the screen contracts in `artifacts/ux/screen_contracts/` using a Material 3 design system and the domain model in `artifacts/domain/domain_model.json`. It prioritizes offline access, WCAG 2.1 AA accessibility, and analytics with minimal PII, and enforces time-window rules from `artifacts/domain/state_machines.json`.

## Architecture Layers
- **Presentation:** Contract-driven screens keyed by `screenId`, each supporting loading/empty/error/offline states defined in `artifacts/ux/screen_inventory.json`.
- **Domain:** Entity models and state machines (progression, day cycle, entitlement gating).
- **Data:** API clients, cache, local DB, and offline mutation queue.
- **Platform services:** Secure storage, file downloads, notifications, and telemetry.

## Navigation
- **Library:** React Navigation v6.
- **Structure:** Bottom tab navigator for `Ana Sayfa`, `Kesfet`, `Kutuphane`, `Gelisim`, `Profil` (per `artifacts/ux/screen_inventory.json`), with nested native stacks for detail/flow screens.
- **Presentation:** Use native stack for stack routes; modal and sheet presentation for `modal` and `sheet` screen types defined in contracts.
- **Routing:** Kebab-case routes from `screen_inventory.json`; enforce gates (e.g., `subscription_active_or_trial`, `plan_owner_only`) via route guards.
- **Deep links:** Map to screen IDs and entity IDs with validation and entitlement checks.
- **Screen states:** Each screen implements explicit UI branches for loading/empty/error/offline to meet contract requirements.

Trade-off: React Navigation adds native dependencies and some complexity, but provides mature patterns for nested stacks, modals, and deep links required by the contracts.

## State Management & Data Flow
- **Server state:** TanStack Query for fetching/caching content, progress, entitlements, and lists. Queries map to domain entities by ID for predictable updates.
- **Client/UI state:** Zustand for lightweight view state (filters, toggles, UI drafts).
- **Forms:** React Hook Form for reflection inputs, submission drafts, and profile settings.
- **Normalization:** Persist server entities in a local store keyed by ID; derive screens via selectors for predictable offline behavior.
- **Rules engine:** UI gating for content progression and day-cycle windows uses state machines (locked/available/in_progress/completed; 08:00 unlock and 23:59 cutoff).

Trade-off: Using both Zustand and TanStack Query adds two libraries, but keeps UI state simple while giving robust caching and retries for server state.

## Data & Networking
- **Transport:** Axios with a shared client (base URL, auth headers, request/response logging with redaction).
- **Retry & backoff:** Centralized policy for transient errors; respects offline detection to avoid retry storms.
- **Auth:** Token storage in secure storage; session refresh handled centrally.
- **Entitlements:** Server-validated entitlements drive access gates (see `subscription_entitlement_gating` state machine).
- **i18n:** `react-i18next` with cached language choice for tr/en/es; language selection persists offline and syncs on reconnect.

Trade-off: Axios introduces extra dependency versus `fetch`, but provides consistent interceptors and error handling to unify telemetry and auth flows.

## Offline & Storage
- **Local DB:** SQLite via WatermelonDB (or similar) for offline-first reads of content metadata, progress, downloads, and user settings.
- **File storage:** Content downloads stored in platform file storage with `Download` entity tracking.
- **Sync:** Background sync to reconcile local changes (progress, submissions, favorites) when connectivity returns.
- **Queue:** Offline mutation queue with idempotency keys to avoid duplicates.
- **Conflict resolution:** Last-write-wins using server timestamps for progress and settings; server authoritative for entitlements.
- **Offline UI:** Respect screen contract offline states and provide clear "last synced" indicators for cached data where helpful.

Trade-off: A local DB increases complexity and migration overhead, but is required for a reliable offline experience across the breadth of content screens.

## Feature Flagging (Phase 2)
- **Strategy:** Remote config endpoint returning flags scoped by platform, app version, and user role. Cache locally with TTL and default fallback values.
- **Types:** Boolean gates for new screens, content types, and experiments; percentage rollout supported by server-side bucketing.
- **Fail-safe:** If remote config fails, fall back to baked-in defaults to avoid blocking access.
- **Governance:** Flags for AI assistant, community features, and gamification (Phase 2) are off by default and require explicit enablement.

Trade-off: A custom remote config endpoint avoids vendor lock-in but requires backend support. For Phase 2, optional integration with LaunchDarkly or Firebase Remote Config can reduce backend effort at the cost of vendor dependency.

## Telemetry & Error Handling
- **Analytics:** Central analytics client with `snake_case` events. Queue events locally while offline and flush on reconnect. No PII beyond user ID and coarse metadata; allow opt-in per platform policy.
- **Error tracking:** Sentry for crashes and non-fatal exceptions; attach screen ID, route, and feature flags for debugging. Redact tokens and freeform text fields (reflections).
- **Error boundaries:** Per-stack error boundaries to prevent app-wide crashes; fall back to contract error states where applicable.
- **User feedback:** Screen-level error states follow `artifacts/ux/design_rules.md` with retry actions and draft preservation.

Trade-off: Telemetry adds overhead and privacy risk; mitigated by opt-in gating where required and strict redaction.

## Accessibility
- **WCAG AA:** Enforce contrast, minimum touch targets, and accessible labels on icons and media.
- **Dynamic type:** Respect system text size and user `AccessibilitySettings`.
- **Reduce motion:** Disable non-essential animations when `reduce_motion` is enabled.

## Testing & Quality Gates
- **Unit tests:** State selectors, mutation queue, sync and conflict resolution logic.
- **Integration tests:** Navigation gating and offline flows.
- **JSON validation:** Ensure artifacts JSON remains valid after edits.
