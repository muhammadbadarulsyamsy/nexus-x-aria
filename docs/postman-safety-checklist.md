# Postman Safety Checklist v0.1

Use this before creating, importing, exporting, or publishing any Postman collection for NEXUS-X ARIA.

## Collection Content

- [ ] No private key.
- [ ] No seed phrase.
- [ ] No recovery phrase.
- [ ] No password.
- [ ] No OTP.
- [ ] No cookie.
- [ ] No GitHub token.
- [ ] No Cloudflare token.
- [ ] No Postman API token.
- [ ] No billing data.
- [ ] No wallet credential.
- [ ] No real sensitive user data.

## Environment Variables

Allowed:

```text
base_url
```

Not allowed:

```text
api_key
token
secret
private_key
seed_phrase
password
cookie
```

## Request Safety

- [ ] `POST /score-airdrop` uses fake example data only.
- [ ] Sample does not ask users to enter real secrets.
- [ ] Disclaimer is visible in collection description or docs.
- [ ] Collection does not claim guaranteed scam detection.
- [ ] Collection does not claim wallet protection.
- [ ] Collection does not provide financial advice.

## Platform Safety

Stop if Postman asks for:

- [ ] billing
- [ ] credit card
- [ ] paid upgrade
- [ ] API token
- [ ] secret
- [ ] wallet connection
- [ ] cookie
- [ ] password outside normal login
- [ ] OTP outside normal login

## Publication Safety

Before any public sharing:

- [ ] Review every request.
- [ ] Review every environment variable.
- [ ] Export collection and inspect JSON.
- [ ] Confirm no secrets.
- [ ] Confirm no exaggerated claims.
- [ ] Confirm base URL is correct.
- [ ] Confirm `/health` works.
- [ ] Confirm `/test-pack` has 0 failed tests.
- [ ] Publish manually only if user intentionally decides to.

## Current Recommendation

```text
Use private/local collection only.
Do not publish to Postman Public API Network yet.
```
