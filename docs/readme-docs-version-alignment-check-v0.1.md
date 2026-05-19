# Phase 8.1 — README/Docs Version Alignment Check v0.1

## Purpose

Phase 8.1 verifies that public-facing documentation is aligned with the latest released runtime:

```text
NEXUS-X ARIA v0.2.0
```

This is a docs-only audit milestone.

## Scope

This phase checks current public-facing documents for stale version references.

Focus:

```text
README.md
docs/publication-docs-index.md
docs/publication-workflow-map.md
postman/README.md
docs/postman-local-collection-notes.md
docs/devto-article-polished.md
docs/listing-copy-short.md
docs/listing-copy-long.md
```

## Non-Scope

Do not change:

```text
worker.js
package.json
Cloudflare runtime
OpenAPI runtime
GitHub release tags
```

Do not create:

```text
runtime release
Cloudflare deploy
API key system
database
paid integration
```

## Current Truth

Latest released runtime:

```text
v0.2.0
```

Latest release URL:

```text
https://github.com/muhammadbadarulsyamsy/nexus-x-aria/releases/tag/v0.2.0
```

Expected runtime baseline:

```text
/health version 0.2.0
/test-pack 25 tests
passed:true 25
passed:false 0
/openapi.json info.version 0.2.0
```

Expected explainable scoring fields:

```text
rule_hits
score_breakdown
input_quality
confidence_note
false_positive_notes
```

## Audit Rule

Historical documents may keep old versions.

Examples of historical documents:

```text
docs/release-snapshot-v0.1.8.md
docs/release-snapshot-v0.1.9.md
docs/release-snapshot-v0.2.0.md
```

Current public-facing documents should point to v0.2.0.

## What To Flag

Flag stale references in current docs:

```text
v0.1.5
v0.1.6
v0.1.7
v0.1.8
v0.1.9
11 tests
20 tests
latest release v0.1.9
old response fields only
```

## What Not To Flag

Do not flag old versions inside:

```text
release history
historical snapshots
changelog history
migration notes
past release notes
```

## Done Criteria

```text
[ ] audit docs committed
[ ] worker.js unchanged
[ ] package.json unchanged
[ ] repo clean
[ ] PROJECT_MEMORY_DATABASE.txt updated append-only after user confirms commit
```
