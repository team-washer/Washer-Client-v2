#!/bin/bash

# Degrade gracefully when jq is unavailable.
if ! command -v jq >/dev/null 2>&1; then
  exit 0
fi

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [[ "$TOOL_NAME" != "Edit" && "$TOOL_NAME" != "Write" ]]; then
  exit 0
fi

FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

case "$FILE_PATH" in
  *.ts | *.tsx | *.css | *.md | *.json)
    echo "[Washer Hook] File edited: $(basename "$FILE_PATH"). Consider running pnpm format and pnpm lint before final delivery." >&2
    ;;
esac

exit 0
