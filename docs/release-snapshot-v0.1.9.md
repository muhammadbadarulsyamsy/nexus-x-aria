# NEXUS-X ARIA Release Snapshot v0.1.9

## Release Name

NEXUS-X ARIA Release Snapshot v0.1.9 — Expanded Examples & False Positive Cases

## Version

0.1.9

## Runtime Change

This release adds a browser-accessible `/examples` page and expanded example documentation.

## Main Changes

- Added `GET /examples`.
- Added Examples link to the landing page.
- Updated `/docs` to mention `/examples`.
- Updated `/openapi.json` to include `/examples`.
- Added expanded example documentation to the repository.
- Added false-positive case notes.
- Added Indonesian scam examples.

## Scoring Status

The scoring engine remains based on v0.1.8 hotfix rules. No major scoring change is introduced in v0.1.9.

## Validation Targets

After deployment:

- `/health` returns version `0.1.9`.
- `/examples` opens successfully.
- `/` shows the Examples link.
- `/docs` mentions `/examples`.
- `/openapi.json` includes `/examples`.
- `/try` still works.
- `/test-pack` returns 20 tests with 20 passed and 0 failed.

## Safety Notes

NEXUS-X ARIA remains a heuristic risk analysis tool. It does not guarantee safety and is not financial advice.
