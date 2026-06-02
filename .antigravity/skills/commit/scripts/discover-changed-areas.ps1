param(
    [string]$Mode = "auto"
)

$files = @()
switch ($Mode) {
    "staged" {
        $files = git diff --staged --name-only --diff-filter=ACMRD
    }
    "unstaged" {
        $files = git diff --name-only --diff-filter=ACMRD
    }
    "auto" {
        $files = git diff --staged --name-only --diff-filter=ACMRD
        if ($files.Count -eq 0 -or [string]::IsNullOrEmpty([string]$files)) {
            $files = git diff --name-only --diff-filter=ACMRD
        }
    }
    Default {
        Write-Error "Usage: discover-changed-areas.ps1 [auto|staged|unstaged]"
        exit 1
    }
}

if ($files.Count -eq 0 -or [string]::IsNullOrEmpty([string]$files)) {
    Write-Output "none"
    exit 0
}

# Clean file strings
$fileList = @()
if ($files -is [string]) {
    $fileList = @($files)
} else {
    $fileList = $files
}

$areas = @()
foreach ($file in $fileList) {
    $trimmedFile = $file.Trim()
    if ([string]::IsNullOrEmpty($trimmedFile)) { continue }
    
    if ($trimmedFile -like "src/app/*") { $areas += "app" }
    elseif ($trimmedFile -like "src/views/*") { $areas += "views" }
    elseif ($trimmedFile -like "src/widgets/*") { $areas += "widgets" }
    elseif ($trimmedFile -like "src/features/*") { $areas += "features" }
    elseif ($trimmedFile -like "src/entities/*") { $areas += "entities" }
    elseif ($trimmedFile -like "src/shared/*") { $areas += "shared" }
    elseif ($trimmedFile -like ".antigravity/*") { $areas += "harness" }
    elseif ($trimmedFile -like ".github/*") { $areas += "ci" }
    elseif ($trimmedFile -match "^(README|CLAUDE|AGENTS|ANTIGRAVITY|docs/)") { $areas += "docs" }
    elseif ($trimmedFile -match "^(package\.json|pnpm-lock\.yaml|tsconfig|eslint|next\.config|postcss|\.prettier|\.editorconfig)") { $areas += "config" }
    else { $areas += "global" }
}

$areas | Sort-Object -Unique
