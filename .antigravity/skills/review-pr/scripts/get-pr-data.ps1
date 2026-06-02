$prNumber = ""
$prNumberJson = gh pr view --json number -q .number 2>$null
if ($LASTEXITCODE -eq 0 -and -not [string]::IsNullOrEmpty($prNumberJson)) {
    $prNumber = $prNumberJson.Trim()
}

if ([string]::IsNullOrEmpty($prNumber)) {
    Write-Error "ERROR: No open PR found for current branch."
    exit 1
}

$repo = (gh repo view --json nameWithOwner -q .nameWithOwner).Trim()
$base = (gh pr view $prNumber --json baseRefName -q .baseRefName).Trim()

Write-Host "Fetching origin/$base..."
git fetch origin $base --quiet

if (-not (Test-Path .pr-tmp)) {
    New-Item -ItemType Directory -Path .pr-tmp -Force | Out-Null
}

$comments = gh api "repos/$repo/pulls/$prNumber/comments" --jq '[.[] | {id, path, line, body, user: .user.login}]'
$comments | Out-File -FilePath .pr-tmp/pr_comments.json -Encoding utf8

$commits = git log "origin/$base..HEAD" --pretty=format:"%H %h %s"
$commits | Out-File -FilePath .pr-tmp/pr_commits.txt -Encoding utf8

$changed = git diff "origin/$base...HEAD" --name-only
$changed | Out-File -FilePath .pr-tmp/pr_changed_files.txt -Encoding utf8

$diff = git diff "origin/$base...HEAD"
$diff | Out-File -FilePath .pr-tmp/pr_diff.txt -Encoding utf8

$meta = @"
PR_NUMBER=$prNumber
REPO=$repo
BASE=$base
"@
$meta | Out-File -FilePath .pr-tmp/pr_meta.env -Encoding utf8

$commentsCount = 0
if (Test-Path .pr-tmp/pr_comments.json) {
    try {
        $commentsJson = Get-Content -Raw .pr-tmp/pr_comments.json | ConvertFrom-Json
        if ($commentsJson) {
            $commentsCount = $commentsJson.Count
        }
    } catch {}
}

$changedFilesCount = 0
if (Test-Path .pr-tmp/pr_changed_files.txt) {
    $lines = Get-Content .pr-tmp/pr_changed_files.txt
    if ($lines) {
        $changedFilesCount = $lines.Count
    }
}

Write-Host "PR #$prNumber | Repo: $repo | Base: $base"
Write-Host "Comments: $commentsCount, Changed files: $changedFilesCount"
