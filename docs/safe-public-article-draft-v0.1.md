# Safe Public Article Draft v0.1

## Suggested Title Options

Option A:

```text
I built a lightweight API for explainable Web3 airdrop risk scoring
```

Option B:

```text
NEXUS-X ARIA: Transparent heuristic risk scoring for Web3 airdrop metadata
```

Option C:

```text
Building an explainable airdrop risk scoring API with Cloudflare Workers
```

Recommended:

```text
NEXUS-X ARIA: Transparent heuristic risk scoring for Web3 airdrop metadata
```

## Draft Article

```md
# NEXUS-X ARIA: Transparent heuristic risk scoring for Web3 airdrop metadata

I built NEXUS-X ARIA, a lightweight serverless API for reviewing common risk signals in Web3 airdrop metadata.

The goal is not to claim that an API can guarantee whether an airdrop is safe. Instead, ARIA surfaces common risk signals from project metadata and explains which heuristic rules were triggered.

ARIA returns:

- risk score
- risk level
- red flags
- safe actions
- rule hits
- score breakdown
- input quality notes
- confidence note
- false-positive notes

The project currently runs as a Cloudflare Worker and includes:

- live API endpoint
- browser try page
- examples page
- OpenAPI spec
- local Postman collection
- test pack
- GitHub release notes

## Why I built it

Airdrop pages and project metadata often include signals that users and developers should review carefully, such as wallet connection requests, message signing requests, missing token contract information, non-HTTPS URLs, or suspicious wording.

ARIA does not replace manual review. It is meant to provide a structured first-pass heuristic analysis.

## What makes it explainable

Instead of returning only a score, ARIA includes fields like:

- `rule_hits`
- `score_breakdown`
- `input_quality`
- `confidence_note`
- `false_positive_notes`

This makes it easier to see why the score changed and which risk signals were detected.

## Who it is for

ARIA is mainly built for:

- Web3 developers
- airdrop dashboard builders
- educators
- security education writers
- open-source builders

It is not a wallet app and does not connect to wallets.

## Safety note

NEXUS-X ARIA is heuristic-only. It does not guarantee safety, does not provide financial advice, and may produce false positives or false negatives.

Never enter private keys, seed phrases, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials.

## Links

- GitHub repository: [paste GitHub repo link here]
- Live demo / try page: [paste /try link here]
- OpenAPI spec: [paste /openapi.json link here]
- Examples page: [paste /examples link here]

## Feedback

I am looking for feedback from developers and educators:

- Is the API response useful?
- Are the explanations clear?
- What false positives or false negatives should be tested?
- Would this be useful as a building block for Web3 education or airdrop dashboards?
```

## Notes Before Publishing

Replace placeholder links before posting.

Do not include secrets.

Do not overclaim safety.

Do not say ARIA detects all scams.
```
