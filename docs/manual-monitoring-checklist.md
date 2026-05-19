# Manual Monitoring Checklist

No paid monitoring tool is required.

## Quick Checks

```text
[ ] Open /health.
[ ] Open /test-pack.
[ ] Open /openapi.json.
[ ] Send one safe fake POST /score-airdrop request.
[ ] Check latest GitHub release.
[ ] Check README does not overclaim safety.
```

## Expected v0.2.0 State

```text
/health version = 0.2.0
/test-pack total = 25
/test-pack passed:true = 25
/test-pack passed:false = 0
/openapi.json info.version = 0.2.0
```

## Do Not Use Real Secrets

Never enter:

```text
private keys
seed phrases
recovery phrases
passwords
OTPs
cookies
API keys
wallet credentials
```

## Feedback Review

If someone reports a false positive or false negative:

```text
[ ] remove sensitive data
[ ] reproduce with safe example
[ ] add/update test case before scoring changes
[ ] do not promise guaranteed detection
```

## Stop Conditions

Stop and ask before continuing if any platform asks for:

```text
billing
card
upgrade
paid plan
API token
secret
password
OTP
cookie
wallet connection
private key
seed phrase
```
