# Current Version Reference Map v0.1

## Canonical Runtime

```text
Current released runtime: v0.2.0
Latest release: https://github.com/muhammadbadarulsyamsy/nexus-x-aria/releases/tag/v0.2.0
```

## Canonical Endpoint Baseline

```text
GET /health
GET /test-pack
GET /openapi.json
GET /try
GET /examples
GET /docs
POST /score-airdrop
```

## Canonical Test Pack Baseline

```text
total tests: 25
passed:true: 25
passed:false: 0
```

## Canonical OpenAPI Baseline

```text
openapi: 3.0.1
info.version: 0.2.0
```

## Canonical Score Response Fields

Existing fields:

```text
risk_score
risk_level
verdict
red_flags
safe_actions
summary
```

Explainable scoring fields added in v0.2.0:

```text
rule_hits
score_breakdown
input_quality
confidence_note
false_positive_notes
```

## Canonical Safety Text

NEXUS-X ARIA is:

```text
heuristic-only
educational
informational
not financial advice
not a security guarantee
not a wallet tool
```

Users must never enter:

```text
private keys
seed phrases
recovery phrases
passwords
OTPs
cookies
API keys
wallet credentials
```

## Current Docs That Should Align

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

## Historical Docs That May Keep Old Versions

```text
docs/release-snapshot-v0.1.8.md
docs/release-snapshot-v0.1.9.md
docs/release-snapshot-v0.2.0.md
release notes
changelog history
```
