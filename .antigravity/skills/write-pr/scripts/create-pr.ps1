param(
    [Parameter(Mandatory=$true)]
    [string]$Title,
    [Parameter(Mandatory=$true)]
    [string]$BodyFile,
    [string]$Labels = ""
)

if (-not (Test-Path $BodyFile)) {
    Write-Error "ERROR: Body file not found: $BodyFile"
    exit 1
}

$currentBranch = (git branch --show-current).Trim()
$base = ""

$baseJson = gh pr view --json baseRefName -q .baseRefName 2>$null
if ($LASTEXITCODE -eq 0 -and -not [string]::IsNullOrEmpty($baseJson)) {
    $base = $baseJson.Trim()
}

if ([string]::IsNullOrEmpty($base)) {
    switch -Wildcard ($currentBranch) {
        "main" { $base = "main" }
        "master" { $base = "main" }
        "develop" { $base = "main" }
        default { $base = "develop" }
    }
}

$argsList = @("pr", "create", "--title", $Title, "--body-file", $BodyFile, "--base", $base)

if (-not [string]::IsNullOrEmpty($Labels)) {
    $labelArray = $Labels -split ","
    foreach ($label in $labelArray) {
        $trimmed = $label.Trim()
        if (-not [string]::IsNullOrEmpty($trimmed)) {
            $argsList += "--label"
            $argsList += $trimmed
        }
    }
}

Write-Host "Creating PR..."
Write-Host "  Title : $Title"
Write-Host "  Base  : $base"
if (-not [string]::IsNullOrEmpty($Labels)) {
    Write-Host "  Labels: $Labels"
}
Write-Host ""

# Run gh pr create
gh $argsList
