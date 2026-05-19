# NEXUS-X ARIA Release Snapshot v0.1.8

## Release Name

NEXUS-X ARIA Release Snapshot v0.1.8 — Scoring Improvement

## Version

0.1.8

## Runtime Change

This release improves the heuristic scoring engine while keeping the same serverless Cloudflare Worker architecture.

## Main Improvements

- Domain keyword scoring is now tiered.
- The word `airdrop` in a domain is now a low-risk signal instead of a heavy penalty.
- Wallet verification and synchronization phrases are detected.
- Wallet recovery secret requests are more heavily penalized.
- Indonesian scam phrases are added.
- Risky token approval detection is more contextual.
- Educational warnings such as “do not approve unlimited spending” no longer trigger risky approval penalties.
- Known chains are expanded.
- Test pack expanded from 11 to 20 tests.

## Status

Ready for controlled deployment review.
