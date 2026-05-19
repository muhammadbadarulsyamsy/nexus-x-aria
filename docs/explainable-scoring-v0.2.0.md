# NEXUS-X ARIA v0.2.0 — Explainable Scoring Design

## Purpose

NEXUS-X ARIA v0.2.0 is planned as an explainability-focused runtime update.

The goal is to make scoring results easier to understand, audit, debug, and improve without adding monetization, authentication, database dependencies, external APIs, or marketplace integrations.

This is a design document only.

It does not change runtime behavior.

## Version Theme

```text
NEXUS-X ARIA v0.2.0 — Explainable Scoring
```

## Current Baseline

Current runtime:

```text
v0.1.9
```

Current stable response fields:

```text
risk_score
risk_level
verdict
red_flags
safe_actions
summary
```

v0.2.0 keeps those fields and adds explainability fields.

## Proposed New Response Fields

```text
rule_hits
score_breakdown
input_quality
confidence_note
false_positive_notes
```

## Backward Compatibility

Existing fields must remain:

```text
risk_score
risk_level
verdict
red_flags
safe_actions
summary
```

New fields are additive.

Older consumers should still be able to use the response by ignoring unknown fields.

## Proposed Response Shape

```json
{
  "service": "nexus-x-aria",
  "version": "0.2.0",
  "risk_score": 85,
  "risk_level": "critical",
  "verdict": "avoid",
  "red_flags": [
    "Requires wallet connection",
    "Requires signing a message or transaction",
    "No token contract provided"
  ],
  "safe_actions": [
    "Use a burner wallet for airdrops",
    "Verify official links through multiple credible sources",
    "Do not share private keys or seed phrases"
  ],
  "summary": "The project contains multiple high-risk airdrop signals.",
  "rule_hits": [
    "WALLET_CONNECT_REQUEST",
    "SIGN_MESSAGE_REQUEST",
    "MISSING_TOKEN_CONTRACT"
  ],
  "score_breakdown": [
    {
      "rule_id": "WALLET_CONNECT_REQUEST",
      "category": "wallet_request",
      "points": 20,
      "severity": "medium",
      "reason": "Required tasks mention wallet connection."
    },
    {
      "rule_id": "SIGN_MESSAGE_REQUEST",
      "category": "signing_request",
      "points": 30,
      "severity": "high",
      "reason": "Required tasks mention signing a message."
    }
  ],
  "input_quality": {
    "level": "partial",
    "missing_fields": [
      "token_contract"
    ],
    "notes": [
      "The score may be less reliable because token_contract is missing."
    ]
  },
  "confidence_note": "This result is based on heuristic text and metadata analysis only. It may contain false positives or false negatives.",
  "false_positive_notes": []
}
```

## rule_hits

`rule_hits` is an array of stable rule IDs triggered during analysis.

Example:

```json
"rule_hits": [
  "NON_HTTPS_URL",
  "WALLET_CONNECT_REQUEST",
  "SIGN_MESSAGE_REQUEST",
  "MISSING_TOKEN_CONTRACT"
]
```

Purpose:

- easier debugging
- easier test assertions
- easier false-positive review
- developer-friendly integration

## score_breakdown

`score_breakdown` explains how points were added.

Each item should include:

```text
rule_id
category
points
severity
reason
```

Example:

```json
{
  "rule_id": "SIGN_MESSAGE_REQUEST",
  "category": "signing_request",
  "points": 30,
  "severity": "high",
  "reason": "Required tasks mention signing a message."
}
```

Severity values:

```text
low
medium
high
critical
```

Suggested categories:

```text
url_security
domain_risk
wallet_request
signing_request
secret_request
approval_risk
social_proof
token_metadata
chain_metadata
promotional_language
input_quality
```

## input_quality

`input_quality` describes whether the submitted metadata is complete enough for analysis.

Example:

```json
{
  "level": "partial",
  "missing_fields": [
    "token_contract",
    "social_links"
  ],
  "notes": [
    "Missing token contract reduces analysis reliability.",
    "Missing social links may increase uncertainty."
  ]
}
```

Levels:

```text
complete
partial
weak
```

Suggested important fields:

```text
project_name
official_url
description
required_tasks
chain
token_contract
social_links
```

## confidence_note

`confidence_note` is a fixed safety note included in every scoring response.

Recommended text:

```text
This result is based on heuristic text and metadata analysis only. It may contain false positives or false negatives.
```

Purpose:

- keeps API honest
- makes limitations visible in integrations
- avoids overclaiming safety

## false_positive_notes

`false_positive_notes` explains when ARIA deliberately avoids penalizing a pattern due to context.

Example:

```json
"false_positive_notes": [
  "Educational approval warning detected; approval language was not penalized as risky instruction."
]
```

Possible notes:

```text
Educational approval warning detected.
Known chain-related term detected.
Generic sync substring was not treated as a domain risk by itself.
```

## Rule IDs

Recommended stable rule IDs:

```text
MISSING_PROJECT_NAME
MISSING_OFFICIAL_URL
NON_HTTPS_URL
HIGH_RISK_DOMAIN_KEYWORD
MEDIUM_RISK_DOMAIN_KEYWORD
LOW_RISK_AIRDROP_DOMAIN_KEYWORD
WALLET_CONNECT_REQUEST
WALLET_VERIFY_REQUEST
WALLET_SYNC_REQUEST
SIGN_MESSAGE_REQUEST
SECRET_RECOVERY_REQUEST
PRIVATE_KEY_REQUEST
SEED_PHRASE_REQUEST
RISKY_APPROVAL_REQUEST
EDUCATIONAL_APPROVAL_WARNING
PROMOTIONAL_URGENCY
MISSING_TOKEN_CONTRACT
MISSING_SOCIAL_LINKS
UNKNOWN_CHAIN
KNOWN_CHAIN_DETECTED
INDONESIAN_SCAM_PHRASE
```

## Recommended Internal Helper

When implementing, use one helper concept:

```text
addSignal(rule_id, category, points, severity, reason, red_flag)
```

Each signal should update:

```text
risk_score
rule_hits
score_breakdown
red_flags
```

This reduces mismatch between score, explanation, and test results.

## Not Included in v0.2.0

Do not add:

```text
API key
login
database
external scam feed
blockchain explorer API
wallet simulation
monetization
RapidAPI
Postman public publish
paid rate limit
```

## Definition of Done

v0.2.0 should be considered done only when:

```text
[ ] /health returns 0.2.0
[ ] /score-airdrop returns new fields
[ ] /test-pack returns 25 tests
[ ] passed:false is 0
[ ] /openapi.json info.version is 0.2.0
[ ] OpenAPI response schema includes new fields
[ ] /try still works
[ ] /examples still works
[ ] GitHub commit is clean
[ ] Cloudflare deploy succeeds
[ ] GitHub release v0.2.0 is created
[ ] Memory Database v1.0 is created
```
