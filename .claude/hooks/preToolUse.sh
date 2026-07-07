#!/bin/bash

# Degrade gracefully when jq is unavailable: skip logging/blocking instead of failing every tool call.
if ! command -v jq >/dev/null 2>&1; then
  exit 0
fi

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [[ "$TOOL_NAME" != "Bash" ]]; then
  exit 0
fi

COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="$CWD/.claude/command.log"

mkdir -p "$(dirname "$LOG_FILE")"
echo "[$TIMESTAMP] $COMMAND" >> "$LOG_FILE"

BLOCKED_PATTERNS=(
  "rm -rf[[:space:]]*/"
  "sudo rm"
  "> /dev/"
  "dd if="
  "mkfs"
  "curl.*\\|[[:space:]]*sh"
  "wget.*\\|[[:space:]]*sh"
  "git reset --hard"
  "git checkout --"
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if [[ "$COMMAND" =~ $pattern ]]; then
    echo "[Washer Hook] Blocked dangerous command: $COMMAND" >&2
    exit 2
  fi
done

exit 0
