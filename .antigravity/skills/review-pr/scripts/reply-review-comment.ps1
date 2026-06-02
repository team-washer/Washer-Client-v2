param(
    [Parameter(Mandatory=$true)]
    [string]$Repo,
    [Parameter(Mandatory=$true)]
    [string]$PrNumber,
    [Parameter(Mandatory=$true)]
    [string]$CommentId,
    [Parameter(Mandatory=$true)]
    [string]$Body
)

if ($Repo -notmatch "^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$") {
    Write-Error "ERROR: Invalid repo format: $Repo"
    exit 1
}

if ($PrNumber -notmatch "^[0-9]+$") {
    Write-Error "ERROR: Invalid PR number: $PrNumber"
    exit 1
}

if ($CommentId -notmatch "^[0-9]+$") {
    Write-Error "ERROR: Invalid comment id: $CommentId"
    exit 1
}

gh api "repos/$Repo/pulls/$PrNumber/comments/$CommentId/replies" -f body="$Body"
