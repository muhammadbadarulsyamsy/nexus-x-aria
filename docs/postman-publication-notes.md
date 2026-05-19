# Postman Publication Notes v0.1

## Current Decision

Do not publish to Postman Public API Network yet.

For now, use Postman planning documents only.

## Use Now

Safe now:

```text
local planning
private collection draft later
manual import later
safe sample requests
no authentication
no secrets
```

## Use Later

Possible later:

```text
local Postman collection JSON
manual import into Postman
private workspace testing
public collection after review
```

## Avoid Now

Avoid:

```text
Postman Public API Network submission
team workspace setup
paid workspace
billing/card setup
API token automation
public workspace publishing
```

## Why Avoid Public Publishing Now

Reasons:

- ARIA is still MVP.
- There is no API key/rate limit model.
- Abuse controls are not mature.
- Public collection should be reviewed carefully.
- The project should avoid premature platform complexity.
- User prefers stop conditions around billing, upgrade, tokens, and credentials.

## Minimum Requirements Before Public Collection

Before public collection:

- [ ] Live API stable.
- [ ] `/health` returns expected version.
- [ ] `/test-pack` passes.
- [ ] OpenAPI version correct.
- [ ] Collection JSON inspected manually.
- [ ] No secrets.
- [ ] No private keys.
- [ ] No seed phrases.
- [ ] No tokens.
- [ ] Disclaimer included.
- [ ] User intentionally chooses to publish.

## Suggested Collection Description

```text
NEXUS-X ARIA is a transparent heuristic airdrop risk scoring API for educational and informational use. This collection provides safe sample requests for health, docs, examples, OpenAPI, test pack, demo, and airdrop scoring. ARIA does not guarantee safety and is not financial advice. Never enter seed phrases, private keys, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials.
```
