# Scoring Rules v0.2.0

## Theme

```text
Explainable Scoring
```

v0.2.0 adds machine-readable scoring explanations.

## New Explanation Fields

```text
rule_hits
score_breakdown
input_quality
confidence_note
false_positive_notes
```

## Rule ID Examples

```text
NON_HTTPS_URL
HIGH_RISK_DOMAIN_KEYWORD
MEDIUM_RISK_DOMAIN_KEYWORD
LOW_RISK_AIRDROP_DOMAIN_KEYWORD
WALLET_CONNECT_REQUEST
WALLET_VERIFY_REQUEST
WALLET_SYNC_REQUEST
SIGN_MESSAGE_REQUEST
SEED_PHRASE_REQUEST
PRIVATE_KEY_REQUEST
SECRET_RECOVERY_REQUEST
RISKY_APPROVAL_REQUEST
EDUCATIONAL_APPROVAL_WARNING
PROMOTIONAL_URGENCY
INDONESIAN_SCAM_PHRASE
MISSING_TOKEN_CONTRACT
MISSING_SOCIAL_LINKS
UNKNOWN_CHAIN
KNOWN_CHAIN_DETECTED
```

## Important Notes

- Generic `sync` substring is not a domain-level penalty.
- `sync wallet` phrase is still risky.
- Educational approval warnings such as `Do not approve unlimited spending` are not treated as risky approval instructions.
- Seed phrase and private key requests are critical risks.
