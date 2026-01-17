#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROMPT_FILE="$1"

# Codex CLI non-interactive mode. PROMPT can be read from stdin via '-'.
# Reference: codex exec options: https://developers.openai.com/codex/cli/reference/

codex exec \
  --cd "$ROOT_DIR" \
  --full-auto \
  --color never \
  - < "$PROMPT_FILE"
