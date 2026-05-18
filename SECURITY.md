# Security Policy

## Supported Version

| Version | Status |
|---|---|
| v0.1.5 | Current MVP |

---

## Sensitive Information

Do not submit sensitive information to this project.

Never send:

- private keys
- seed phrases
- recovery phrases
- wallet passwords
- exchange passwords
- OTP codes
- login cookies
- API keys
- personal identity documents
- confidential business data

NEXUS-X ARIA does not need any of the above to operate.

---

## Safe Reporting

If you discover a security issue, report it responsibly.

Recommended reporting method after this repository is public:

1. Use GitHub Security Advisory if enabled.
2. If Security Advisory is not enabled, open a minimal issue that says a security concern exists, but do not include exploit details or sensitive information publicly.
3. Share technical details only through a private channel approved by the repository owner.

Do not publish exploit steps publicly before the maintainer has reviewed the issue.

---

## Scope

Security issues may include:

- accidental exposure of secrets
- unsafe request handling
- incorrect CORS behavior
- unexpected data leakage
- denial-of-service concerns
- misleading security claims
- scoring behavior that could create harmful assumptions

---

## Out of Scope

The following are currently out of scope for this MVP:

- guaranteed scam detection
- blockchain transaction validation
- smart contract auditing
- wallet security auditing
- phishing database integration
- real-time on-chain monitoring
- paid API abuse prevention
- user account security

---

## MVP Limitations

ARIA v0.1.5 uses heuristic rules only. It does not query blockchain explorers, contract reputation databases, phishing feeds, or external intelligence services.

The API may produce false positives or false negatives. Users must verify results independently.
