# API Usage Guide

NEXUS-X ARIA is a stateless API for transparent airdrop risk scoring.

## Endpoint Summary

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Public landing page |
| GET | `/health` | Service health and version |
| GET | `/demo` | Built-in sample analysis |
| GET | `/docs` | Human-readable HTML documentation |
| GET | `/test-pack` | Internal validation tests |
| GET | `/openapi.json` | OpenAPI 3.0.1 specification |
| POST | `/score-airdrop` | Main scoring endpoint |

## Main Endpoint

```text
POST /score-airdrop
```

Full URL:

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/score-airdrop
```

Required header:

```text
Content-Type: application/json
```

## Input Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `project_name` | string | yes | Name of the airdrop or Web3 project |
| `official_url` | string | no | Claimed official URL |
| `description` | string | yes | Human-readable description |
| `required_tasks` | array of strings | yes | Tasks required to participate |
| `chain` | string | no | Blockchain network name |
| `token_contract` | string | no | Token contract address, if known |
| `social_links` | array of strings | yes | Public social or community links |

## Output Fields

| Field | Type | Description |
|---|---|---|
| `risk_score` | number | Risk score from 0 to 100 |
| `risk_level` | string | `low`, `medium`, `high`, or `critical` |
| `verdict` | string | `likely safe`, `caution`, or `avoid` |
| `red_flags` | array | Risk indicators detected in the input |
| `safe_actions` | array | Recommended safety practices |
| `summary` | string | Human-readable summary |

## Current MVP Limits

- No authentication.
- No custom rate limiting.
- No external phishing or contract reputation feed.
- No blockchain explorer lookup.
- Heuristic scoring only.
- Possible false positives and false negatives.

## Recommended Usage

Use ARIA as a first-pass risk signal, not as a final security decision. Always verify official sources independently.
