# Postman Collection Planning v0.1

## Purpose

This document plans a future Postman collection for NEXUS-X ARIA.

This is planning only.

It does not create a Postman account, does not log in to Postman, does not publish to Postman, does not require a Postman API token, and does not change the Cloudflare Worker runtime.

## Current API Status

```text
NEXUS-X ARIA runtime: v0.1.9
Status: live
OpenAPI: 3.0.1
Test pack: 20/20 passed
```

Base URL:

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev
```

OpenAPI:

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/openapi.json
```

## Collection Goal

A Postman collection should help users test ARIA endpoints safely.

Primary goals:

- make endpoint testing easier
- provide safe sample requests
- avoid credentials
- avoid wallet data
- avoid private keys or seed phrases
- keep ARIA positioned as an educational heuristic API

## Proposed Collection Name

```text
NEXUS-X ARIA — Airdrop Risk Intelligence API
```

## Proposed Environment Variable

Use one safe environment variable:

```text
base_url = https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev
```

Do not use:

```text
api_key
token
secret
private_key
seed_phrase
password
cookie
```

ARIA currently does not require authentication.

## Proposed Folder Structure

```text
NEXUS-X ARIA
├── Status
│   └── GET /health
├── Documentation
│   ├── GET /
│   ├── GET /docs
│   ├── GET /examples
│   └── GET /openapi.json
├── Demo and Testing
│   ├── GET /demo
│   └── GET /test-pack
└── Scoring
    └── POST /score-airdrop
```

## Proposed Requests

Include these requests:

| Request | Method | Path | Purpose |
|---|---:|---|---|
| Health Check | GET | `/health` | Check service status/version |
| Landing Page | GET | `/` | View landing page |
| HTML Docs | GET | `/docs` | View documentation |
| Examples | GET | `/examples` | View example cases |
| OpenAPI | GET | `/openapi.json` | View OpenAPI spec |
| Demo | GET | `/demo` | Run demo analysis |
| Test Pack | GET | `/test-pack` | Validate internal tests |
| Score Airdrop | POST | `/score-airdrop` | Main scoring endpoint |

## Safe POST Example

Use this as the main safe sample input:

```json
{
  "project_name": "Example Airdrop",
  "official_url": "https://example-airdrop.com",
  "description": "Claim free tokens by connecting your wallet and signing a message.",
  "required_tasks": ["connect wallet", "sign message"],
  "chain": "Base",
  "token_contract": "",
  "social_links": ["https://twitter.com/example"]
}
```

## Safety Notes for Collection

The collection must not contain:

- real wallet addresses tied to personal identity
- private keys
- seed phrases
- recovery phrases
- passwords
- OTPs
- cookies
- API keys
- GitHub tokens
- Cloudflare tokens
- Postman API tokens

## Publication Position

Use locally/private first.

Public publishing can be considered later only after:

- collection is reviewed
- no secrets are present
- disclaimer is included
- endpoint links are correct
- no billing/upgrade/token requirement appears
- user intentionally chooses to publish manually

## Stop Conditions

Stop if Postman or any related platform asks for:

```text
billing
credit card
paid upgrade
API token
secret
private key
seed phrase
password
OTP
cookie
wallet connection
```

## Current Recommendation

For now:

```text
Plan only.
Do not publish.
Do not create public workspace.
Do not add API tokens.
```

A future phase may create a local Postman collection JSON file that can be imported manually.
