#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python3 - <<'PY'
import json
from pathlib import Path

root = Path(__file__).resolve().parent

required = [
  root/"artifacts"/"prd"/"PST_Mobile_PRD_Rev1.md",
  root/"artifacts"/"prd"/"app_blueprint.yaml",
]
missing = [str(p) for p in required if not p.exists()]
if missing:
  raise SystemExit("Missing required input files:\n- " + "\n- ".join(missing))

# Validate JSON files: parse-only (schema validation is optional at v1)
json_paths = list((root/"artifacts").rglob("*.json"))
for p in json_paths:
  try:
    json.loads(p.read_text(encoding="utf-8"))
  except Exception as e:
    raise SystemExit(f"Invalid JSON: {p}\n{e}")

print(f"OK: {len(json_paths)} JSON files parsed successfully.")
PY
