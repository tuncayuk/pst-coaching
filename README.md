# PST Coaching — Agentic Dev Repo Template

This repository is a **reusable agentic development template** designed to turn **PRDs / EPICs / User Stories / Acceptance Criteria** into:

- validated artifacts (domain model, screen inventory, per-screen contracts)
- architecture decisions (ADRs)
- implementation slices (PR-sized plans)
- test plans and coverage mapping

It is designed to be executed from the terminal using **Codex CLI**.

## Quick start

1) Install Codex CLI (one-time):

```bash
npm i -g @openai/codex
# or
brew install --cask codex
```

2) From the repo root, run an agent:

```bash
./scripts/run-spec.sh
./scripts/run-ux.sh
./scripts/run-arch.sh
./scripts/run-impl.sh
./scripts/run-qa.sh
```

3) Validate artifacts:

```bash
./scripts/validate-artifacts.sh
```

## Inputs

- `artifacts/prd/PST_Mobile_PRD_Rev0.md`

## Outputs (high level)

- `artifacts/domain/*`
- `artifacts/ux/*`
- `artifacts/arch/*`
- `artifacts/impl/*`
- `artifacts/qa/*`

## Notes

- This template is intentionally **design-system-first** and **schema-driven**.
- Implementation work should only begin after `screen_inventory.json` and per-screen contracts exist.
