# Postman Local Collection Notes v0.1

## Status

This patch adds a local Postman collection JSON file for NEXUS-X ARIA.

It does not:

- log in to Postman
- require a Postman API token
- publish to Postman
- submit to Postman Public API Network
- change `worker.js`
- deploy Cloudflare
- create a runtime release

## Collection File

```text
postman/nexus-x-aria.postman_collection.json
```

## Safety Position

The collection is safe/local by default.

It contains:

- one `base_url` variable
- safe example request data
- public ARIA endpoints

It does not contain:

- private keys
- seed phrases
- recovery phrases
- passwords
- OTPs
- cookies
- API keys
- GitHub tokens
- Cloudflare tokens
- Postman tokens
- wallet credentials

## Validation Goals

After applying this patch, verify:

```text
[✓] JSON is valid
[✓] collection name exists
[✓] base_url exists
[✓] /score-airdrop exists
[✓] worker.js unchanged
[✓] README.md unchanged
[✓] repo clean after commit
```

## Current Recommendation

Use this collection locally/private only.

Do not publish publicly yet.
