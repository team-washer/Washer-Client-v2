# PostToolUse Hook for Antigravity (PowerShell)

$inputData = $input | Out-String
if ([string]::IsNullOrWhiteSpace($inputData)) {
    exit 0
}

$parsed = $inputData | ConvertFrom-Json
$toolName = $parsed.tool_name
$filePath = $parsed.tool_input.file_path

if ($toolName -ne "Edit" -and $toolName -ne "Write") {
    exit 0
}

if ($filePath -match '\.(ts|tsx|css|md|json)$') {
    $fileName = Split-Path $filePath -Leaf
    Write-Host "[EveryGSM Hook] File edited: $fileName. Consider running pnpm format:check and pnpm lint before final delivery." -ForegroundColor Yellow
}

exit 0
