#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROMPT_FILE="$1"

# OpenAI CLI non-interactive mode. PROMPT can be read from stdin via '-'.
# Reference: https://platform.openai.com/docs/api-reference/completions/create

openai api completions.create \
  --model "code-davinci-002" \
  --prompt "$(cat "$PROMPT_FILE")" \
  --temperature 0 \
  --max-tokens 1024 \
  --stop "\n" 
