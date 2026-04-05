# ADR-0002: Offline Strategy and Sync

## Status

Accepted

## Context

The PRD requires offline access for reading content and viewing progress. Users must be able to continue reading and writing notes/comments when connectivity is unavailable. The app must reconcile updates when back online without losing user work.

## Decision

Adopt an offline-first strategy with a local SQLite store and a queued-write sync pipeline.

### Offline Approach

- **Local-first reads:** Content lists, details, and e-book assets are read from SQLite + local file system when offline.
- **Write queue:** Progress updates, comments, highlights, favorites, and settings changes are written to a local queue (SQLite table) and marked as `pending_sync`.
- **Sync triggers:**
  - App foreground
  - Connectivity regained
  - Manual retry
- **Conflict resolution:** Last-write-wins using server timestamps. For comments and notes, prefer client edits if the local update is newer; log conflicts for diagnostics.
- **Partial availability:** If a content item is not cached, show offline empty state with a prompt to download when online.

### Download Strategy

- **Downloads:** User-initiated downloads for journeys, workshops, and e-books. Progress indicators tied to Download entity in domain model.
- **Eviction:** Least-recently-used eviction for large files with user confirmation before deletion if storage is low.

### UX Expectations

- **Offline banner** on all screens with write actions disabled where necessary.
- **Pending sync indicators** on items with unsynced changes.
- **Retry affordances** for failed uploads or downloads.

## Consequences

- Users can read and continue progress offline with minimal disruption.
- Additional complexity in data model and sync pipeline, plus schema migrations.
- Requires careful telemetry to track sync failures and conflicts.

## Alternatives Considered

- **Online-only with cached UI:** simpler but violates PRD offline requirements.
- **Full bidirectional sync engine:** more robust but overly complex for MVP scope.
