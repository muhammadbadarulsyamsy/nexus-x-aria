# NEXUS-X ARIA Release Snapshot v0.1.7

## Release Name

NEXUS-X ARIA Release Snapshot v0.1.7 — Browser Try Page

## Version

0.1.7

## Runtime Change

This release adds a browser-accessible `/try` page.

The `/try` page lets users test custom airdrop risk inputs directly from a browser without Postman, curl, Termux, or external tools.

## New Endpoint

- `GET /try` — HTML form for custom airdrop risk scoring.

## Retained Endpoints

- `GET /`
- `GET /health`
- `GET /demo`
- `GET /docs`
- `GET /test-pack`
- `GET /openapi.json`
- `POST /score-airdrop`
- `OPTIONS`

## Safety Notes

The `/try` page includes a warning not to enter private keys, seed phrases, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials.

NEXUS-X ARIA remains a heuristic analysis tool. It does not guarantee safety and is not financial advice.

## Implementation Notes

- Still single-file Cloudflare Worker.
- No database.
- No external API.
- No API key.
- No secret.
- No VPS.
- No scoring logic changes.
- Existing 11 test cases are retained.

## Validation Targets

After deployment:

- `/health` returns version `0.1.7`.
- `/try` opens an HTML form.
- The Analyze Risk button submits to `/score-airdrop`.
- Results render in the browser.
- `/test-pack` still returns 11 tests.
- All test-pack items return `passed: true`.
- `/openapi.json` includes `/try`.

## Status

Ready for controlled deployment review.
