# README/Docs Alignment Checklist v0.1

Use this checklist before editing public-facing docs.

## Version Checks

```text
[ ] Search README.md for v0.1.5.
[ ] Search README.md for v0.1.6.
[ ] Search README.md for v0.1.7.
[ ] Search README.md for v0.1.8.
[ ] Search README.md for v0.1.9.
[ ] Confirm current/latest version is v0.2.0.
```

## Test Count Checks

```text
[ ] Search for "11 tests".
[ ] Search for "20 tests".
[ ] Confirm current test pack says 25 tests.
```

## Explainable Fields Checks

```text
[ ] rule_hits documented.
[ ] score_breakdown documented.
[ ] input_quality documented.
[ ] confidence_note documented.
[ ] false_positive_notes documented.
```

## Safety Checks

```text
[ ] No financial advice claim.
[ ] No security guarantee claim.
[ ] No wallet protection claim.
[ ] No private key requested.
[ ] No seed phrase requested.
[ ] No API token requested.
[ ] No cookie requested.
```

## Historical Docs Rule

Do not rewrite historical snapshots unless there is a factual error.

Historical version references are allowed in:

```text
release snapshots
changelogs
past release notes
version history
```

## Commit Rule

If only audit docs are added:

```text
commit message: Add Phase 8.1 docs alignment check
```

If README/docs are patched later:

```text
commit message: Align public docs with v0.2.0
```
