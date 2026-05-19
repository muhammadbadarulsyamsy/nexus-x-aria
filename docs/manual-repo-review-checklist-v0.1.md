# Phase 8.2 — Manual Repo Review Checklist v0.1

## Purpose

This checklist guides a manual review of the NEXUS-X ARIA repository after the v0.2.0 release and Phase 8 stability docs.

This is a docs-only/checklist-only milestone.

## Current Baseline

```text
Current runtime: v0.2.0
Latest release: v0.2.0
Test pack baseline: 25 tests, 25 passed, 0 failed
```

## Review Areas

```text
repository identity
README accuracy
release links
runtime status
docs index
safety/disclaimer language
Postman local collection notes
publication docs
issue templates
maintenance docs
```

## Manual Review Checklist

### 1. Repository Front Page

```text
[ ] Repository name is correct.
[ ] Repository description is accurate.
[ ] Homepage/live API URL is correct.
[ ] Topics are relevant.
[ ] README starts clearly.
[ ] README current runtime is v0.2.0.
[ ] README latest release points to v0.2.0.
```

### 2. Runtime Links

```text
[ ] /health opens.
[ ] /docs opens.
[ ] /try opens.
[ ] /examples opens.
[ ] /test-pack opens.
[ ] /openapi.json opens.
```

### 3. Release Status

```text
[ ] GitHub release v0.2.0 exists.
[ ] Release is not draft.
[ ] Release is not prerelease.
[ ] Release notes mention explainable scoring.
[ ] Release notes mention 25/25 validation.
```

### 4. Documentation Accuracy

```text
[ ] Current docs do not say v0.1.9 is latest.
[ ] Current docs do not say test pack is 20 tests.
[ ] Historical docs are not incorrectly rewritten.
[ ] Explainable fields are documented where current response is described.
```

### 5. Safety Claims

```text
[ ] No guarantee of safety.
[ ] No financial advice claim.
[ ] No wallet protection claim.
[ ] No request for private key.
[ ] No request for seed phrase.
[ ] No request for password.
[ ] No request for OTP.
[ ] No request for cookies.
[ ] No request for API keys.
```

### 6. Publication Readiness

```text
[ ] Dev.to docs remain manual-only.
[ ] Postman docs remain local/private by default.
[ ] Passive listing docs do not push monetization.
[ ] No paid marketplace step is required.
```

### 7. Maintenance Readiness

```text
[ ] Phase 8 stability docs exist.
[ ] Regression checklist exists.
[ ] Incident response lite exists.
[ ] v0.2.1 release gate exists.
[ ] Append-only memory rule exists.
```

## Done Criteria

```text
[ ] This checklist is committed.
[ ] worker.js unchanged.
[ ] package.json unchanged.
[ ] No Cloudflare deploy.
[ ] No runtime release.
[ ] Repo clean after commit.
[ ] PROJECT_MEMORY_DATABASE.txt updated append-only after user log confirms commit/push.
```
