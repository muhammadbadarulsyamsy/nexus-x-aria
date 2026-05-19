# Scoring Rules v0.1.8

NEXUS-X ARIA v0.1.8 improves the previous heuristic scoring rules.

## Risk Level Mapping

| Score | Level | Verdict |
|---:|---|---|
| 0–30 | low | likely safe |
| 31–60 | medium | caution |
| 61–80 | high | avoid |
| 81–100 | critical | avoid |

## Domain Risk

| Domain signal | Score | Flag |
|---|---:|---|
| High-risk wallet/login keyword | +25 | Official URL contains high-risk wallet or login keyword |
| Promotional claim keyword | +15 | Official URL contains promotional claim keyword |
| Airdrop keyword only | +5 | Official URL contains airdrop keyword |
| Invalid URL | +20 | Official URL is invalid or suspicious |
| Non-HTTPS URL | +10 | Official URL not HTTPS |
| Missing URL | +10 | Official URL missing |

## Text Risk

| Text signal | Score | Flag |
|---|---:|---|
| Wallet recovery secret request | +40 | Description asks for wallet recovery secrets |
| Wallet connection | +20 | Requires wallet connection |
| Wallet verification/synchronization | +25 | Mentions wallet verification or synchronization |
| Signing request | +25 | Requires signing a message or transaction |
| Risky token approval | +25 | Mentions risky token approvals or spending permissions |
| Promotional or urgency language | +20 | Description contains promotional or urgency language |

## Context Improvement

Approval warnings such as `do not approve`, `don't approve`, `jangan approve`, and `jangan setujui` prevent the risky approval penalty from being added.

## Known Limitations

The scoring is still heuristic and may produce false positives or false negatives. It does not use external threat intelligence, blockchain explorer data, or domain reputation feeds.
