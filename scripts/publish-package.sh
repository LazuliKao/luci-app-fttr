#!/usr/bin/env bash
# Run after checks/generation, from the source checkout. Never rewrites history.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_SHA="$(git -C "$ROOT" rev-parse HEAD)"
node "$ROOT/scripts/check-package.mjs" "$ROOT/dist/package"

skip_if_stale() {
    local remote_sha
    remote_sha="$(git -C "$ROOT" ls-remote --exit-code origin refs/heads/main | cut -f1)"
    if [[ $remote_sha != "$SOURCE_SHA" ]]; then
        echo '[INFO] Source is no longer current main; skipping publication.'
        exit 0
    fi
}
skip_if_stale

WORK="$(mktemp -d)"
ORPHAN_BRANCH=""
cleanup() {
    git -C "$ROOT" worktree remove --force "$WORK/package" 2>/dev/null || true
    if [[ -n $ORPHAN_BRANCH ]]; then
        git -C "$ROOT" branch -D "$ORPHAN_BRANCH" >/dev/null 2>&1 || true
    fi
    rm -rf "$WORK"
}
trap cleanup EXIT
if git -C "$ROOT" ls-remote --exit-code origin refs/heads/package > "$WORK/ref"; then
    git -C "$ROOT" fetch --no-tags origin refs/heads/package
    git -C "$ROOT" worktree add --detach "$WORK/package" FETCH_HEAD
else
    status=$?
    [[ $status == 2 ]] || exit "$status"
    git -C "$ROOT" worktree add --detach "$WORK/package" "$SOURCE_SHA"
    ORPHAN_BRANCH="package-publish-$$"
    git -C "$WORK/package" checkout --orphan "$ORPHAN_BRANCH"
    git -C "$WORK/package" rm -rf --quiet .
fi
# This is a generated-only worktree; preserve its Git link and replace the payload.
rsync -a --delete --exclude=.git "$ROOT/dist/package/" "$WORK/package/"
git -C "$WORK/package" add --all
if git -C "$WORK/package" diff --cached --quiet; then
    echo '[INFO] Package is unchanged; skipping empty commit.'
    exit 0
fi
git -C "$WORK/package" -c user.name='github-actions[bot]' \
    -c user.email='41898282+github-actions[bot]@users.noreply.github.com' \
    commit -m "build: publish package from $SOURCE_SHA"
skip_if_stale
git -C "$WORK/package" push origin HEAD:refs/heads/package
