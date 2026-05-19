# Incident Response Lite

## Worker Unavailable

```text
[ ] Do not change code immediately.
[ ] Check Cloudflare Dashboard status.
[ ] Check last deploy.
[ ] Re-deploy last known good worker.js if needed.
[ ] Verify /health.
```

## Test Pack Failure

```text
[ ] Do not create release.
[ ] Inspect failed test IDs.
[ ] Identify whether scoring or test expectation is wrong.
[ ] Make smallest possible hotfix.
[ ] Commit + push.
[ ] Copy worker.js.
[ ] Deploy via Cloudflare Dashboard.
[ ] Verify passed:false 0.
```

## OpenAPI Version Mismatch

```text
[ ] Check whether OpenAPI uses VERSION constant.
[ ] Patch only version source if possible.
[ ] Verify /openapi.json again.
```

## False Positive Report

```text
[ ] Remove any sensitive data from report.
[ ] Reproduce with safe example.
[ ] Add test case.
[ ] Add false_positive_notes only when justified.
[ ] Avoid weakening critical secret detection.
```

## Secret Exposure Report

```text
[ ] Do not quote the secret.
[ ] Ask user to revoke/rotate the secret.
[ ] Delete or redact public exposure if possible.
[ ] Do not store the secret in docs or examples.
```

## Communication Rule

Always say ARIA is heuristic-only, not financial advice, and not a guarantee of safety.
