# NEXUS-X ARIA v0.2.0 — Explainable Scoring Runtime Snapshot

## Status

Runtime target:

```text
v0.2.0
```

This release upgrades the scoring response with explainability fields.

## Main Runtime Changes

Added to `/score-airdrop` response:

```text
rule_hits
score_breakdown
input_quality
confidence_note
false_positive_notes
```

Existing response fields remain:

```text
risk_score
risk_level
verdict
red_flags
safe_actions
summary
```

## Test Pack

Target:

```text
25 tests
passed:false = 0
```

New tests cover:

```text
score_breakdown exists
rule_hits include wallet/signing rules
input_quality detects missing token_contract
educational approval warning creates false_positive_notes
confidence_note exists
```

## OpenAPI

`/openapi.json` must report:

```text
info.version = 0.2.0
```

Response schema must include the new explainability fields.

## Deployment Requirement

This patch changes `worker.js`.

Cloudflare Dashboard deploy is required after commit/push.

## Safety

NEXUS-X ARIA remains heuristic-only.

It does not guarantee safety, does not provide financial advice, and may produce false positives or false negatives.
