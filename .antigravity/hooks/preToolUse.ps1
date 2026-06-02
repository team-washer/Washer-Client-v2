# PreToolUse Hook for Antigravity (PowerShell)
# Check for dangerous patterns before executing PowerShell commands.

if (-not (Get-Command jq -ErrorAction SilentlyContinue)) {
    Write-Error "[EveryGSM Hook] Error: jq is required but not installed."
    exit 1
}

# Read stdin
$inputData = $input | Out-String
if ([string]::IsNullOrWhiteSpace($inputData)) {
    exit 0
}

$parsed = $inputData | ConvertFrom-Json
$toolName = $parsed.tool_name
$cwd = $parsed.cwd
$command = $parsed.tool_input.command

if ($toolName -ne "PowerShell") {
    exit 0
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$logFile = Join-Path $cwd ".antigravity/command.log"

$logDir = Split-Path $logFile
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

"[$timestamp] $command" | Out-File -Append -FilePath $logFile -Encoding utf8

$blockedPatterns = @(
    "rm\s+-Recurse\s+-Force\s+/",
    "sudo\s+rm",
    "git\s+reset\s+--hard",
    "git\s+checkout\s+--"
)

foreach ($pattern in $blockedPatterns) {
    if ($command -match $pattern) {
        Write-Error "[EveryGSM Hook] Blocked dangerous command: $command"
        exit 2
    }
}

exit 0
