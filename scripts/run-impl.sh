#!/usr/bin/env bash
set -euo pipefail

PROMPT_FILE="agents/04_impl/prompt.md"
PLAN_FILE="artifacts/impl/plan.md"

if [[ "${1-}" == "" ]]; then
  ./scripts/_codex_exec.sh "$PROMPT_FILE"
  exit 0
fi

if [[ ! -f "$PLAN_FILE" ]]; then
  echo "Missing $PLAN_FILE" >&2
  exit 1
fi

get_task_section() {
  local task_num="$1"
  awk -v n="$task_num" '
    $1=="##" && $2==(n")") {flag=1}
    $1=="##" && flag && $2!=(n")") {exit}
    flag {print}
  ' "$PLAN_FILE"
}

run_task() {
  local task_num="$1"
  local section
  section="$(get_task_section "$task_num")"
  if [[ -z "$section" ]]; then
    echo "Task $task_num not found in $PLAN_FILE" >&2
    exit 1
  fi
  local tmp_prompt
  tmp_prompt="$(mktemp)"
  cat "$PROMPT_FILE" > "$tmp_prompt"
  {
    echo ""
    echo "## Task Focus"
    echo "Implement task $task_num from $PLAN_FILE:"
    echo ""
    echo "$section"
  } >> "$tmp_prompt"
  ./scripts/_codex_exec.sh "$tmp_prompt"
  rm -f "$tmp_prompt"
}

if [[ "${1-}" == "all" ]]; then
  while read -r num; do
    run_task "$num"
  done < <(awk '/^## [0-9]+\)/ {gsub(/[)]/,"",$2); print $2}' "$PLAN_FILE")
  exit 0
fi

if [[ "${1-}" =~ ^[0-9]+$ ]]; then
  run_task "$1"
  exit 0
fi

echo "Usage: $0 [all|<task-number>]" >&2
exit 1
