# Changelog

All notable changes to NEXUS-X ARIA are documented here.

---

## v0.1.5 — OpenAPI Specification

Status: Live and validated.

### Added

- `GET /openapi.json`
- OpenAPI 3.0.1 machine-readable specification
- Link to `/openapi.json` from landing page
- Link to `/openapi.json` from `/docs`

### Existing endpoints retained

- `GET /`
- `GET /health`
- `GET /demo`
- `GET /docs`
- `GET /test-pack`
- `POST /score-airdrop`
- `OPTIONS`

### Notes

- No scoring logic changes.
- No database, API key, secret, VPS, GitHub dependency, or terminal required for runtime.

---

## v0.1.4 — Test Pack Endpoint

Status: Live and validated.

### Added

- `GET /test-pack`
- 11 internal scoring validation test cases
- Each test returns:
  - id
  - name
  - expected score range
  - actual score
  - expected level
  - actual level
  - expected flags
  - actual flags
  - passed status

### Notes

- All 11 tests passed during validation.
- No scoring logic changes.

---

## v0.1.3 — Landing Page

Status: Live and validated.

### Added

- `GET /`
- Public landing page for the base URL
- Links to demo, docs, health check, and technical API endpoint information

### Notes

- Root URL no longer returns `Not found`.

---

## v0.1.2 — Documentation Endpoint

Status: Live and validated.

### Added

- `GET /docs`
- Lightweight HTML documentation page
- Endpoint summary
- Example request and response
- Output explanation
- MVP limitations
- Security disclaimer
- Roadmap summary

---

## v0.1.1 — Demo Endpoint

Status: Live and validated.

### Added

- `GET /demo`
- Browser-friendly scoring demo using internal sample input

### Purpose

Allows human operators to test scoring directly from a mobile browser without Postman, curl, terminal, or additional apps.

---

## v0.1.0 — Initial MVP

Status: Live and validated.

### Added

- `GET /health`
- `POST /score-airdrop`
- `OPTIONS` CORS support
- Request body size limit
- Basic input validation
- Transparent heuristic scoring
- JSON output with:
  - risk_score
  - risk_level
  - verdict
  - red_flags
  - safe_actions
  - summary
