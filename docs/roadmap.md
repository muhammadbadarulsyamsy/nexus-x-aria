# NEXUS-X ARIA Roadmap

This roadmap describes possible future directions for NEXUS-X ARIA. It is not a guarantee of delivery, monetization, or production readiness.

## Current Status: v0.1.5

ARIA v0.1.5 is a live MVP with:

- public landing page
- health check endpoint
- browser demo endpoint
- HTML documentation
- internal test pack
- OpenAPI JSON specification
- main `/score-airdrop` endpoint
- public GitHub repository

The current scoring engine is heuristic and rule-based.

## v0.1.x — Repository Polish and Usability

Goals:

- Add GitHub issue templates.
- Add contribution guidance.
- Improve repository metadata.
- Add clearer integration examples.
- Improve documentation around false positives and false negatives.
- Consider adding a browser-friendly `/try` page for custom input testing.

## v0.2.x — Scoring Quality Improvements

Goals:

- Add more test cases.
- Reduce obvious false positives.
- Improve suspicious-domain detection.
- Expand known-chain handling.
- Add safer text-pattern detection.
- Explore optional non-paid public data sources only after safety review.

Potential improvements:

- fuzzy keyword matching
- typosquatting hints
- better approval/permit context detection
- additional red flag categories

## v0.3.x — Abuse Protection and Operational Safety

Goals:

- Explore rate limiting.
- Review API key options.
- Add safer logging strategy, if needed.
- Add GitHub Actions for repository validation.
- Improve OpenAPI schemas.

Important: any API key, paid feature, or rate limit system must be reviewed before implementation.

## v0.4.x — Developer Experience

Goals:

- Add example integrations.
- Add `curl`, JavaScript `fetch`, and Python examples.
- Consider Swagger UI or an interactive documentation page.
- Improve repository structure if the single-file Worker becomes hard to maintain.

## v1.x — Maturity Review

Before any v1.x label, ARIA should have:

- stronger test coverage
- clearer false-positive handling
- abuse protection strategy
- reviewed legal/security disclaimers
- stable OpenAPI schema
- community feedback
- responsible publication strategy

## Not Planned Without Review

The following should not be added without a separate safety review:

- wallet connection
- transaction signing
- seed phrase handling
- private key handling
- paid external APIs
- aggressive marketing automation
- scraping-heavy systems
- financial advice features
