# NEXUS-X ARIA Publication Kit v0.2

## Purpose

This kit provides safe, reusable publication assets for NEXUS-X ARIA.

It is intended for passive publication only:

- GitHub repository text
- educational articles
- developer directory descriptions
- documentation pages
- API listing drafts

It is not intended for aggressive promotion, direct messaging, spam, paid marketplace onboarding, or monetization.

## Current Product Status

- Product: NEXUS-X ARIA — Airdrop Risk Intelligence API
- Current runtime: v0.1.9
- Base URL: https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev
- GitHub: https://github.com/muhammadbadarulsyamsy/nexus-x-aria
- Latest release: https://github.com/muhammadbadarulsyamsy/nexus-x-aria/releases/tag/v0.1.9
- OpenAPI: https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/openapi.json
- Try Page: https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/try
- Examples: https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/examples

## One-line Description

NEXUS-X ARIA is a transparent heuristic airdrop risk scoring API for Web3 projects.

## Tagline

Transparent airdrop risk intelligence for safer Web3 exploration.

## Short Description

NEXUS-X ARIA is a lightweight serverless API that evaluates airdrop and Web3 project information using transparent heuristic rules. It returns a risk score, risk level, verdict, red flags, safety recommendations, and a summary. It includes a browser Try Page, examples page, OpenAPI specification, and internal test pack.

## Indonesian Short Description

NEXUS-X ARIA adalah API ringan berbasis heuristik untuk menilai risiko airdrop dan proyek Web3. API ini menghasilkan risk score, risk level, verdict, red flags, rekomendasi keamanan, dan ringkasan. ARIA memiliki Try Page, halaman contoh, OpenAPI, dan test-pack internal.

## Long Description

NEXUS-X ARIA is a small, transparent, serverless Airdrop Risk Intelligence API. It accepts airdrop or Web3 project metadata such as project name, official URL, description, required tasks, chain, token contract, and social links. Based on these inputs, ARIA applies heuristic rules to detect common risk signals.

The API can identify signs such as suspicious domain keywords, non-HTTPS URLs, wallet connection requirements, signing requests, wallet recovery secret requests, risky token approval language, promotional urgency, missing token contracts, missing social links, and unknown chains.

ARIA returns a structured JSON response containing a numeric risk score from 0 to 100, a risk level, a verdict, detected red flags, safe-action recommendations, and a concise summary. It also includes a `/try` page for browser-based testing, `/examples` for educational cases, `/test-pack` for self-validation, and `/openapi.json` for developer tools.

ARIA is not a guarantee of safety and is not financial advice. It is an educational and informational tool designed to demonstrate transparent risk scoring and safe Web3 awareness.

## Target Users

- Web3 learners who want to understand airdrop risk signals
- Developers building educational or safety tools
- Wallet or bot builders exploring risk-warning flows
- Security educators explaining common phishing patterns
- Researchers comparing heuristic false positives and false negatives
- API catalog reviewers evaluating small developer APIs

## Use Cases

1. Pre-check airdrop project metadata before interacting.
2. Educate users on common scam patterns.
3. Demonstrate transparent heuristic scoring.
4. Integrate basic risk scoring into prototype bots or dashboards.
5. Compare false-positive cases and improve scoring rules over time.
6. Provide a safe browser-based example through `/try`.
7. Share a documented open-source MVP for developer learning.

## Key Features

- Risk score from 0 to 100
- Risk level: low, medium, high, critical
- Verdict: likely safe, caution, avoid
- Red flag detection
- Safe action recommendations
- Browser Try Page
- Expanded examples page
- OpenAPI 3.0.1 specification
- Internal test pack with 20 tests
- Serverless Cloudflare Worker deployment
- No wallet connection
- No seed phrase/private key collection
- No database
- No paid dependency

## Limitations

- Heuristic-only scoring
- Possible false positives and false negatives
- No external domain reputation feed
- No blockchain explorer integration
- No wallet transaction simulation
- No rate limiting or API key system yet
- Not an enterprise-grade security product
- Not financial or investment advice
- Not a guarantee of safety

## Disclaimer

NEXUS-X ARIA provides heuristic risk analysis for educational and informational purposes only. It does not guarantee that a project is safe or unsafe. It is not financial advice, investment advice, legal advice, or a certified security audit. Users must verify information independently and must never share seed phrases, private keys, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials.

## Endpoint Summary

| Endpoint | Purpose |
|---|---|
| `GET /` | Landing page |
| `GET /health` | Service status and version |
| `GET /demo` | Demo analysis |
| `GET /try` | Browser form for custom scoring |
| `GET /examples` | Educational examples and false-positive notes |
| `GET /docs` | HTML documentation |
| `GET /test-pack` | Internal validation test pack |
| `GET /openapi.json` | OpenAPI specification |
| `POST /score-airdrop` | Main scoring endpoint |

## GitHub About Text

Transparent airdrop risk scoring API for Web3 projects. Serverless Cloudflare Worker with `/score-airdrop`, Try Page, examples, docs, test pack, and OpenAPI spec.

## Website / Directory Listing Text

NEXUS-X ARIA is a transparent heuristic airdrop risk scoring API for Web3 projects. Submit project metadata such as URL, description, tasks, chain, token contract, and social links to receive a risk score, risk level, verdict, red flags, safety actions, and summary. ARIA includes a browser Try Page, examples page, OpenAPI specification, and internal test pack.

This project is educational and informational. It does not guarantee safety and does not provide financial advice.
