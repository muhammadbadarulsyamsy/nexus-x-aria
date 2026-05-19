# Publication Workflow Map v0.1

## Purpose

This document maps the safe publication workflow for NEXUS-X ARIA.

It is not an automation script and it does not submit anything anywhere.

## Workflow 1 — GitHub Repo Review

Use this when checking whether the repo is ready for visitors.

```text
README.md
→ Current Status
→ Live Links
→ Active Endpoints
→ Limitations
→ Safety Disclaimer
→ Documentation Files
```

Checklist:

```text
[ ] README top section is clear
[ ] Try Page link works
[ ] Examples link works
[ ] OpenAPI link works
[ ] Test Pack link works
[ ] disclaimer is visible
[ ] limitations are visible
```

## Workflow 2 — Dev.to Article Publication

Use this only if the user wants to publish manually.

```text
docs/devto-article-polished.md
→ docs/devto-pre-publish-review.md
→ docs/devto-do-not-share.md
→ docs/devto-manual-publishing-walkthrough.md
→ preview on Dev.to
→ publish manually only if safe
→ docs/devto-post-publish-notes.md
```

Stop if Dev.to or any related service asks for:

```text
billing
credit card
paid upgrade
password in chat
OTP in chat
cookie
API token
wallet connection
```

## Workflow 3 — Passive Directory Listing

Use this only after reviewing platform rules.

```text
docs/passive-listing-kit-v0.1.md
→ docs/listing-copy-short.md
→ docs/listing-copy-long.md
→ docs/directory-submission-draft.md
→ docs/platform-review-checklist-v0.1.md
→ docs/no-go-platforms-v0.1.md
→ submit manually only if safe
```

Do not use:

```text
RapidAPI
paid API marketplaces
payout-based platforms
spam groups
communities that ban promotion
```

## Workflow 4 — Claims Review

Use this before writing any public description.

```text
docs/allowed-claims.md
→ docs/do-not-use-yet.md
→ docs/devto-risk-notes.md
→ docs/platform-decision-notes.md
```

Safe wording:

```text
helps identify common risk signals
transparent heuristic scoring
educational and informational
may produce false positives and false negatives
```

Forbidden wording:

```text
guaranteed scam detection
protects your wallet
detects all phishing
financial advice
investment advice
certified security audit
```

## Workflow 5 — Future Runtime Update

Use this only if future coding/runtime changes are planned.

```text
docs/maintainer-checklist.md
→ update worker.js
→ update VERSION
→ update /health
→ update /openapi.json info.version
→ verify /test-pack
→ deploy Cloudflare
→ verify live
→ create GitHub release
→ update memory database
```

Do not create a runtime release for docs-only patches.

## Workflow 6 — Pause and Stabilize

Recommended when the repo already has many docs.

```text
stop
review repository
collect feedback
do not publish aggressively
do not monetize
do not add runtime features too quickly
```

This is currently the safest option after Publication Docs Index.
