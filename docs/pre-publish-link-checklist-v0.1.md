# Pre-Publish Link Checklist v0.1

Before posting, verify the public links.

## Required Links

```text
[ ] GitHub repo link works.
[ ] /health works.
[ ] /try works.
[ ] /examples works.
[ ] /docs works.
[ ] /openapi.json works.
[ ] /test-pack works.
```

## Expected Runtime

```text
runtime version: 0.2.0
test pack: 25 tests
passed:true: 25
passed:false: 0
```

## Suggested Link Set for Article

```text
GitHub repository:
Live try page:
Examples page:
OpenAPI spec:
Release v0.2.0:
```

## Do Not Include

```text
private key
seed phrase
recovery phrase
password
OTP
cookie
API key
wallet credential
Cloudflare credentials
GitHub token
```

## If Any Link Fails

Do not publish yet.

Check whether the issue is:

```text
typo in link
Cloudflare Worker down
wrong endpoint
old runtime
network issue
```

Do not change runtime unless there is a real bug.
