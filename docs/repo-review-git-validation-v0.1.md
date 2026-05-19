# Repo Review Git Validation v0.1

## Purpose

Define Git checks for Phase 8.2.

## Expected Files

```text
docs/manual-repo-review-checklist-v0.1.md
docs/repo-review-scope-map-v0.1.md
docs/repo-public-safety-review-v0.1.md
docs/repo-review-findings-template-v0.1.md
docs/repo-review-git-validation-v0.1.md
phase-8.2-manual-repo-review-manifest-v0.1.json
```

## Required Git Checks

```text
[ ] git status --short shows only Phase 8.2 files before commit.
[ ] worker.js is not modified.
[ ] package.json is not modified.
[ ] commit succeeds.
[ ] push succeeds.
[ ] final git status is clean.
```

## Recommended Commit Message

```text
Add Phase 8.2 manual repo review checklist
```

## No Runtime Validation Required

Because Phase 8.2 is docs-only:

```text
no Cloudflare deploy
no worker clipboard copy
no GitHub runtime release
no live endpoint validation required
```

## Database Update Rule

After user log confirms commit/push and repo clean:

```text
append LOG-0007 to PROJECT_MEMORY_DATABASE.txt
do not create memory database from zero
do not create PROJECT_MEMORY_DATABASE_CURRENT.txt
```
