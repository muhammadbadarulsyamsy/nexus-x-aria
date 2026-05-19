# Regression Checklist for v0.2.x

Use this checklist before and after any runtime change.

## Before Runtime Change

```text
[ ] Confirm why runtime must change.
[ ] Confirm change is not monetization, marketplace, API key, database, or external API.
[ ] Confirm no credential is needed.
[ ] Confirm test impact is understood.
[ ] Confirm rollback path is simple.
```

## Local Checks

```text
[ ] const VERSION matches target version.
[ ] package.json version matches target version if version changes.
[ ] worker.js syntax check passes.
[ ] test IDs are expected count.
[ ] no private key included.
[ ] no seed phrase included.
[ ] no API token included.
[ ] no cookie included.
[ ] no password included.
```

## Live Checks After Deploy

```text
[ ] /health returns expected version.
[ ] /test-pack returns expected version.
[ ] /test-pack has expected test count.
[ ] passed:false is 0.
[ ] /openapi.json info.version matches runtime.
[ ] /openapi.json includes expected schema fields.
[ ] /score-airdrop returns expected fields.
[ ] /try loads.
[ ] /examples loads.
[ ] Git status is clean.
```

## Current v0.2.0 Baseline

```text
expected version: 0.2.0
expected tests: 25
expected passed:true: 25
expected passed:false: 0
```

Expected explainable fields:

```text
rule_hits
score_breakdown
input_quality
confidence_note
false_positive_notes
```

## Release Rule

Never create a GitHub runtime release unless live validation passes.
