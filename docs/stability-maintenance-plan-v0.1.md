# Phase 8 — Stability & Maintenance Plan v0.1

## Purpose

Phase 8 stabilizes NEXUS-X ARIA after the v0.2.0 Explainable Scoring release.

This is a docs-only milestone.

## Current Stable Runtime

```text
NEXUS-X ARIA v0.2.0
Release: https://github.com/muhammadbadarulsyamsy/nexus-x-aria/releases/tag/v0.2.0
```

## Scope

```text
regression discipline
manual monitoring
maintenance rules
incident response
release gate for v0.2.1
append-only project memory
```

## Non-Scope

```text
worker.js changes
package.json changes
Cloudflare deploy
GitHub runtime release
API keys
login system
database
external APIs
RapidAPI
monetization
paid marketplace
Postman public publishing
```

## Maintenance Goals

- Keep `/health` live.
- Keep `/test-pack` passing.
- Keep OpenAPI version aligned with runtime.
- Keep `/try` and `/examples` working.
- Keep public docs honest about limitations.
- Avoid paid infrastructure too early.
- Avoid collecting or requesting secrets.
- Keep project memory append-only.

## Stability Rule

Do not start v0.2.1 unless there is a clear bugfix, documented false positive, documented false negative, minor compatibility fix, or documentation alignment need.

## Done Criteria

```text
[ ] stability docs committed
[ ] worker.js unchanged
[ ] package.json unchanged
[ ] repo clean after commit
[ ] PROJECT_MEMORY_DATABASE.txt updated append-only after user confirms commit
```
