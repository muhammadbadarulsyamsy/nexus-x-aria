# NEXUS-X ARIA

**Transparent airdrop risk scoring**

NEXUS-X ARIA is a lightweight, serverless Airdrop Risk Intelligence API. It analyzes airdrop or Web3 project metadata and returns a transparent heuristic risk score, risk level, verdict, red flags, safe actions, and a human-readable summary.

> Current version: **v0.1.5**  
> Status: **Live MVP / passive publication ready**

---

## Base URL

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev
```

---

## What ARIA Does

ARIA accepts structured information about an airdrop or Web3 project, including:

- project name
- official URL
- description
- required tasks
- blockchain chain
- token contract
- social links

It then applies transparent heuristic scoring rules to detect risk signals such as:

- missing or non-HTTPS URLs
- suspicious domain keywords
- requests to connect a wallet
- requests to sign messages or transactions
- requests for seed phrase, recovery phrase, or private key
- token approval / permit / unlimited approval language
- missing token contract
- missing social links
- unknown chain
- promotional language such as “free tokens”, “urgent”, or “guaranteed”

ARIA does **not** connect to wallets, sign transactions, trade, mine, store secrets, or manage funds.

---

## Endpoint List

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Public landing page |
| GET | `/health` | Health check and version status |
| GET | `/demo` | Browser-friendly sample scoring result |
| GET | `/docs` | HTML documentation page |
| GET | `/test-pack` | Runs 11 internal scoring validation tests |
| GET | `/openapi.json` | Machine-readable OpenAPI 3.0.1 specification |
| POST | `/score-airdrop` | Main risk scoring API endpoint |

---

## Quick Start

### 1. Check API health

Open in browser:

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "nexus-x-aria",
  "version": "0.1.5"
}
```

### 2. Try the demo

Open in browser:

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/demo
```

This returns a built-in sample input and scoring result.

### 3. View the documentation

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/docs
```

### 4. View the OpenAPI spec

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/openapi.json
```

---

## Example Request

`POST /score-airdrop`

```http
POST /score-airdrop HTTP/1.1
Host: nexus-x-aria.muhammad-badarul-syamsy.workers.dev
Content-Type: application/json
```

```json
{
  "project_name": "Example Airdrop",
  "official_url": "https://example-airdrop.com",
  "description": "Claim free tokens by connecting your wallet and signing a message.",
  "required_tasks": ["connect wallet", "join Discord", "sign message"],
  "chain": "Base",
  "token_contract": "",
  "social_links": [
    "https://twitter.com/example",
    "https://discord.gg/example"
  ]
}
```

---

## Example Response

```json
{
  "risk_score": 100,
  "risk_level": "critical",
  "verdict": "avoid",
  "red_flags": [
    "Official URL contains suspicious domain",
    "Requires wallet connection",
    "Requires signing a message or transaction",
    "No token contract provided",
    "Description contains promotional or unrealistic language"
  ],
  "safe_actions": [
    "Use a burner wallet for airdrops",
    "Verify official links through multiple credible sources",
    "Avoid unlimited token approvals",
    "Read and understand any message before signing",
    "Do not share private keys or seed phrases"
  ],
  "summary": "The analysis yielded a risk score of 100/100 with a critical risk level. 5 red flag(s) detected: Official URL contains suspicious domain, Requires wallet connection, Requires signing a message or transaction, No token contract provided, Description contains promotional or unrealistic language. Proceed accordingly."
}
```

---

## Output Fields

| Field | Meaning |
|---|---|
| `risk_score` | Numeric score from 0 to 100. Higher means more risk signals were detected. |
| `risk_level` | Risk category: `low`, `medium`, `high`, or `critical`. |
| `verdict` | Short recommendation: `likely safe`, `caution`, or `avoid`. |
| `red_flags` | Specific risk indicators detected in the input. |
| `safe_actions` | Recommended safety practices. |
| `summary` | Human-readable summary of the result. |

---

## Safety Disclaimer

NEXUS-X ARIA provides heuristic risk analysis for informational and educational purposes only.

It is **not** financial advice, investment advice, legal advice, or a guarantee of safety. A low score does not prove that an airdrop is safe, and a high score does not prove malicious intent.

Always verify official sources, use caution, and never share private keys, seed phrases, recovery phrases, passwords, OTPs, cookies, or login tokens.

---

## MVP Limitations

ARIA v0.1.5 is an MVP and has important limitations:

- scoring is heuristic and rule-based
- no external blockchain explorer is queried
- no contract reputation database is used
- no phishing database is used
- no authentication or custom rate limit is implemented yet
- unknown chains may be penalized even if legitimate
- domain keyword matching can create false positives
- results may include false positives or false negatives

---

## Infrastructure Status

Current deployment:

- Cloudflare Workers
- single-file JavaScript Worker
- no database
- no API key
- no secret
- no VPS
- no GitHub dependency required for runtime
- no terminal required for the current live deployment

---

## Roadmap

### v0.2.x

- Improve heuristic scoring
- Add more test cases
- Refine false-positive handling
- Explore external reputation data only after safety review

### v0.3.x

- Consider rate limiting
- Consider optional API key support
- Add clearer integration examples

### v1.x

- More mature scoring model
- Stronger documentation
- Marketplace readiness review
- Monetization review only after product validation

---

## Passive Distribution Note

This project is intended for passive publication through documentation, repositories, developer directories, and educational writing.

Do not use this project for spam, unsolicited direct messages, aggressive outbound sales, or misleading claims. The API does not guarantee airdrop safety and should be presented as a transparent heuristic tool only.
