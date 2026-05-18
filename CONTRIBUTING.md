# Contributing to NEXUS-X ARIA

Thank you for your interest in improving NEXUS-X ARIA.

ARIA is an early-stage, transparent heuristic API for airdrop and Web3 risk scoring. Contributions should improve clarity, safety, documentation, test coverage, or scoring quality without overpromising security guarantees.

## Contribution Principles

- Be transparent about limitations.
- Do not claim ARIA guarantees safety.
- Do not add code that asks for private keys, seed phrases, wallet passwords, OTPs, cookies, login tokens, or API secrets from users.
- Prefer small, reviewable changes.
- Keep security disclaimers clear.
- Avoid aggressive marketing or spam-oriented changes.

## Good First Contributions

Useful contribution areas include:

- Improving README clarity.
- Adding safe examples for `/score-airdrop`.
- Adding more test cases for `/test-pack`.
- Reporting false positives or false negatives.
- Improving heuristic wording.
- Improving OpenAPI schema details.
- Adding documentation for safe usage.

## Scoring Rule Changes

Before changing scoring rules, explain:

1. What risk signal is being added or changed.
2. Why the signal matters.
3. Possible false positives.
4. Possible false negatives.
5. Example inputs and expected outputs.

Scoring changes should be paired with test cases whenever possible.

## Security and Sensitive Data

Never include:

- private keys
- seed phrases
- recovery phrases
- passwords
- OTPs
- login cookies
- API keys
- exchange credentials
- personal identity documents

If you believe there is a security issue, follow `SECURITY.md`.

## Local Development

The current MVP is a single-file Cloudflare Worker (`worker.js`). The live service is deployed separately on Cloudflare Workers.

At this stage, repository contributions should not assume access to the owner's Cloudflare account.

## Pull Requests

If pull requests are enabled later, keep them focused and include:

- a short summary
- reason for the change
- safety considerations
- test notes

## Non-goals for the Current MVP

The current MVP does not aim to provide:

- guaranteed scam detection
- financial advice
- wallet security auditing
- smart contract auditing
- real-time on-chain monitoring
- paid API access

These may be reviewed only in later phases after safety and abuse risks are assessed.
