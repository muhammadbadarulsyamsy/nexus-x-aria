# NEXUS-X ARIA

Transparent heuristic airdrop risk scoring API for Web3 projects.

NEXUS-X ARIA helps identify common airdrop risk signals from project metadata such as URL, description, required tasks, chain, token contract, and social links. It returns a risk score, risk level, verdict, red flags, safe actions, and a short summary.

> ARIA is an educational and informational MVP. It does not guarantee safety and is not financial advice.

---

## Current Status

| Item | Status |
|---|---|
| Runtime | `v0.1.9` |
| Deployment | Cloudflare Workers |
| Repository | Public |
| License | MIT |
| OpenAPI | Available |
| Try Page | Available |
| Examples Page | Available |
| Test Pack | 20/20 passed |
| Monetization | Not enabled |

---

## Live Links

| Resource | Link |
|---|---|
| Live API / Landing Page | https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev |
| Try Page | https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/try |
| Examples | https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/examples |
| Documentation | https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/docs |
| OpenAPI JSON | https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/openapi.json |
| Test Pack | https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/test-pack |
| Health Check | https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/health |
| Latest Release | https://github.com/muhammadbadarulsyamsy/nexus-x-aria/releases/tag/v0.1.9 |

---

## What ARIA Does

ARIA accepts airdrop or Web3 project metadata and returns a structured risk analysis.

It can help identify common risk signals such as:

- non-HTTPS URLs
- suspicious domain keywords
- wallet connection requests
- signing requests
- seed phrase, private key, recovery phrase, or mnemonic requests
- risky approval language
- promotional or urgency language
- missing token contract
- missing social links
- unknown chain
- selected Indonesian scam phrases

ARIA is intentionally transparent: the response includes red flags and safe actions so users can understand why a score was produced.

---

## Active Endpoints

| Endpoint | Method | Purpose |
|---|---:|---|
| `/` | `GET` | Landing page |
| `/health` | `GET` | Service status and version |
| `/demo` | `GET` | Demo analysis |
| `/try` | `GET` | Browser form for custom scoring |
| `/examples` | `GET` | Educational examples and false-positive notes |
| `/docs` | `GET` | HTML documentation |
| `/test-pack` | `GET` | Internal validation test pack |
| `/openapi.json` | `GET` | OpenAPI 3.0.1 specification |
| `/score-airdrop` | `POST` | Main scoring endpoint |

---

## Input Fields

`POST /score-airdrop` accepts JSON fields such as:

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

---

## Output Fields

ARIA returns fields such as:

```json
{
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
    "Avoid unlimited token approvals",
    "Read and understand any message before signing",
    "Do not share private keys or seed phrases"
  ],
  "summary": "The analysis yielded a risk score based on the provided input."
}
```

The exact score depends on the current rule set.

---

## Example Usage

### Browser

Use the Try Page:

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/try
```

### cURL

```bash
curl -s https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/score-airdrop \
  -H "Content-Type: application/json" \
  -d '{
    "project_name": "Example Airdrop",
    "official_url": "https://example-airdrop.com",
    "description": "Claim free tokens by connecting your wallet and signing a message.",
    "required_tasks": ["connect wallet", "sign message"],
    "chain": "Base",
    "token_contract": "",
    "social_links": ["https://twitter.com/example"]
  }'
```

---

## Version v0.1.9

v0.1.9 focuses on expanded examples and better public-facing explanation.

Added or improved:

- `/examples` page
- low, medium, high, and critical example cases
- Indonesian scam phrase examples
- zkSync false-positive case note
- approval warning false-positive note
- OpenAPI `/examples` path
- OpenAPI `info.version` fixed to `0.1.9`

Validation result:

```text
/health version: 0.1.9
/openapi.json info.version: 0.1.9
/test-pack tests: 20
passed:true: 20
passed:false: 0
```

---

## Documentation Files

Important repository documents:

| File | Purpose |
|---|---|
| `docs/api-usage.md` | API usage notes |
| `docs/examples.md` | Basic examples |
| `docs/examples-expanded.md` | Expanded example cases |
| `docs/scoring-rules.md` | Scoring rule notes |
| `docs/scoring-rules-v0.1.8.md` | v0.1.8 scoring notes |
| `docs/false-positive-cases.md` | False-positive notes |
| `docs/indonesian-scam-examples.md` | Indonesian scam examples |
| `docs/publication-kit-v0.2.md` | Passive publication text kit |
| `docs/devto-article-polished.md` | Polished educational article draft |
| `docs/passive-listing-checklist.md` | Passive listing safety checklist |
| `docs/maintainer-checklist.md` | Maintainer release checklist |
| `docs/allowed-claims.md` | Safe and forbidden claims |
| `docs/do-not-use-yet.md` | Actions to avoid for now |
| `SECURITY.md` | Security policy |
| `DISCLAIMER.md` | Disclaimer |
| `CHANGELOG.md` | Changelog |

---

## Safe Claims

Reasonable claims:

- ARIA provides heuristic airdrop risk scoring.
- ARIA helps identify common risk signals.
- ARIA is educational and informational.
- ARIA uses transparent rule-based scoring.
- ARIA includes a Try Page, examples, OpenAPI, and test pack.
- ARIA does not connect to wallets.
- ARIA does not request seed phrases or private keys.

Do not claim:

- guaranteed scam detection
- guaranteed wallet safety
- detects all phishing
- prevents all scams
- financial advice
- investment advice
- certified security audit
- enterprise-grade fraud prevention

---

## Limitations

ARIA is still an MVP.

Current limitations:

- heuristic-only scoring
- possible false positives
- possible false negatives
- no external reputation feed
- no blockchain explorer lookup
- no transaction simulation
- no account system
- no custom API key/rate limit system
- no monetization
- not a complete security product

---

## Safety Disclaimer

NEXUS-X ARIA provides heuristic analysis for educational and informational purposes only.

It does not guarantee safety, does not provide financial advice, and must not be treated as a complete security product.

Never enter or share:

- seed phrases
- private keys
- recovery phrases
- passwords
- OTPs
- cookies
- API keys
- wallet credentials

Always verify information independently before interacting with any Web3 project.

---

## Local Development Notes

This project currently uses a single-file Cloudflare Worker style.

Main runtime file:

```text
worker.js
```

Important note for Android/Termux workflow:

- Wrangler may not work in Termux Android.
- Current deployment workflow uses Cloudflare Dashboard paste/deploy.
- Docs-only patches do not require Cloudflare deploy.

---

## License

MIT License.
