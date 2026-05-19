# Repo Review Scope Map v0.1

## Purpose

Define what Phase 8.2 reviews and what it does not change.

## In Scope

```text
README public accuracy
release link accuracy
docs index accuracy
publication docs safety
Postman docs safety
maintenance docs presence
repository metadata review guidance
```

## Out of Scope

```text
worker.js
package.json
Cloudflare deploy
runtime version bump
GitHub release creation
monetization setup
API key system
database integration
external reputation feed
```

## Current Canonical Status

```text
Runtime: v0.2.0
Release: https://github.com/muhammadbadarulsyamsy/nexus-x-aria/releases/tag/v0.2.0
Test pack: 25/25
Memory database: PROJECT_MEMORY_DATABASE.txt
Memory mode: append-only
```

## Review Logic

Use this distinction:

```text
current-facing docs = should align with v0.2.0
historical docs = may keep old version references
```

Examples of current-facing docs:

```text
README.md
docs/publication-docs-index.md
postman/README.md
docs/manual-monitoring-checklist.md
```

Examples of historical docs:

```text
docs/release-snapshot-v0.1.8.md
docs/release-snapshot-v0.1.9.md
docs/release-snapshot-v0.2.0.md
past release notes
```
