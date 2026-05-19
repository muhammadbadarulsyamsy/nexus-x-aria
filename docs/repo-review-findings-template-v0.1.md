# Repo Review Findings Template v0.1

Use this template when performing a manual repo review.

## Review Metadata

```text
Date:
Reviewer:
Repository:
Runtime baseline:
Latest release:
```

## Finding Format

```text
Finding ID:
Area:
Severity:
Status:
File/URL:
Observation:
Recommended action:
Runtime impact:
Needs Cloudflare deploy:
```

## Severity Levels

```text
low = typo or minor clarity issue
medium = outdated current-facing doc
high = misleading safety claim
critical = credential exposure or dangerous instruction
```

## Default Actions

For outdated current docs:

```text
patch docs only
no worker.js
no Cloudflare deploy
no runtime release
```

For misleading safety claims:

```text
remove/soften claim
add disclaimer
verify no overclaim remains
```

For credential exposure:

```text
do not quote secret
redact/remove if possible
tell user to revoke/rotate
do not store in memory database
```

## Findings

```text
No findings recorded yet.
```
