# NEXUS-X ARIA Postman Collection

This folder contains a local Postman collection for NEXUS-X ARIA.

## File

```text
postman/nexus-x-aria.postman_collection.json
```

## Purpose

The collection helps users test ARIA endpoints manually in Postman.

It is local/private by default.

It is not published to Postman Public API Network.

## Included Requests

```text
GET /
GET /health
GET /demo
GET /try
GET /examples
GET /docs
GET /test-pack
GET /openapi.json
POST /score-airdrop
```

## Variable

The collection uses one safe variable:

```text
base_url = https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev
```

No token, API key, password, cookie, private key, seed phrase, or wallet credential is required.

## Import Notes

To use manually:

1. Open Postman.
2. Choose Import.
3. Select `postman/nexus-x-aria.postman_collection.json`.
4. Keep it private/local unless intentionally reviewed for public sharing.

Do not share credentials with anyone.
Do not publish publicly until the collection is reviewed.
