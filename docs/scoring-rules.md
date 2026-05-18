# Scoring Rules

NEXUS-X ARIA v0.1.5 uses transparent heuristic scoring.

The score starts at `0`, then penalty points are added when risk signals are detected. The final score is capped at `100`.

## Current Rules

| Condition | Score Impact | Red Flag |
|---|---:|---|
| Missing official URL | +10 | `Official URL missing` |
| Official URL is not HTTPS | +10 | `Official URL not HTTPS` |
| Suspicious domain keyword | +20 | `Official URL contains suspicious domain` |
| Description asks for seed phrase / private key / recovery phrase | +30 | `Description asks for seed phrase or private key` |
| Required task includes connect wallet | +20 | `Requires wallet connection` |
| Required task includes sign message / sign transaction | +25 | `Requires signing a message or transaction` |
| Description mentions approve / permit / unlimited approval | +20 | `Description mentions token approvals or unlimited permissions` |
| Missing token contract | +15 | `No token contract provided` |
| Missing social links | +10 | `No social links provided` |
| Chain is not recognized | +5 | `Blockchain chain is not widely recognized` |
| Promotional or unrealistic language | +20 | `Description contains promotional or unrealistic language` |

## Known Weaknesses

- A legitimate domain containing `airdrop` may receive a suspicious-domain penalty.
- A warning such as “do not approve unlimited spending” may still trigger an approval red flag.
- New chains may be penalized until added to the known chain list.
- Scam text in other languages may not be detected.
- Obfuscated terms may bypass keyword detection.

## v0.2 Improvement Direction

- tiered domain keyword severity
- better context handling for approval-related text
- expanded phrase detection
- more Indonesian-language scam phrases
- more test cases
- reduced false positives for common legitimate terms
