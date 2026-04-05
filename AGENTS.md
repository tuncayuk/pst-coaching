# Agentic Development Rules (Global)

These rules apply to **all** agents.

## 1) Files are the interface

Agents must:

- **Read inputs from `artifacts/`** (and, for implementation, the codebase)
- **Write outputs to `artifacts/`** exactly as specified by their output schemas
- Avoid long prose in terminal output; prefer committing changes to files.

## 2) Determinism via contracts

Implementation is only allowed when a **screen contract** exists.

- A _screen_ must exist in `artifacts/ux/screen_inventory.json`.
- A _screen contract_ must exist in `artifacts/ux/screen_contracts/<screenId>.json`.

## 3) Design constraints

- Use one design system consistently: **Material 3 (default)**.
- Do not invent new interaction patterns per screen.
- Every screen must define: loading, empty, error, offline states.

## 4) Quality gates

After each agent run:

- Validate JSON files parse correctly.
- Keep diffs small and reviewable.
- For implementation changes: run lint/typecheck/tests.

## 5) Naming conventions

- Screen IDs: `section.feature` (e.g., `discover.catalog`, `library.ebook_detail`).
- Routes: kebab-case paths (e.g., `/discover`, `/library/ebooks/:id`).
- Analytics events: snake_case (e.g., `discover_viewed`).

## 6) Security & privacy (baseline)

- Never log secrets/tokens.
- Keep PII minimal.
- Make analytics opt-in if required by platform policy.
