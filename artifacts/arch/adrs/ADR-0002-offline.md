# ADR-0002: Offline Strategy and Sync

## Status
Accepted

## Context
The PRD requires offline support for content, progress, and key library features. Screen contracts define offline states for every screen. The domain model includes downloads, progress, submissions, and entitlements that must remain consistent when connectivity is intermittent.

## Decision
- **Offline-first reads:** Persist content metadata, progress, favorites, collections, and settings in a local SQLite store.
- **Download manager:** Track download lifecycle in `Download` records; file assets stored in app storage.
- **Mutation queue:** Queue writes (progress updates, submissions, favorites) with idempotency keys; sync on reconnect.
- **Sync schedule:** Foreground sync on app resume and explicit user refresh; background sync when OS allows.
- **Conflict resolution:** Server authoritative for entitlements and subscription; last-write-wins for progress and settings using server timestamps; preserve local drafts for reflections.

## Trade-offs
- More complex data layer and migrations, but meets offline requirements across all screens.
- Sync delays may show stale progress until reconnection; mitigated by optimistic UI and local timestamps.
- Last-write-wins is simple but can discard concurrent edits; mitigated by limiting editable fields offline (primarily drafts and progress).

## Sync Strategy Details
- **Connectivity:** Use NetInfo to detect offline/online and pause retries when offline.
- **Prioritization:** Sync queue order: auth refresh → entitlements → downloads → progress/submissions → favorites/collections → settings.
- **Backoff:** Exponential retry for transient errors; do not retry 4xx except 401 with token refresh.
- **Day-cycle rules:** Respect local time for UI gating but reconcile with server on next sync to ensure authoritative unlock windows.

## Consequences
- Local DB schema must align with domain entities to avoid mapping drift.
- UI must clearly communicate offline state and pending sync actions (per design rules).
- QA should test cold-start offline flows for every tab and core detail screen.
