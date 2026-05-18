---
name: Feature Request
about: Suggest a safe improvement for NEXUS-X ARIA
labels: enhancement
---

# Feature Request

Thank you for suggesting an improvement.

NEXUS-X ARIA is an early-stage heuristic API. Please keep suggestions focused on transparent scoring, safer documentation, validation, testing, or passive integration.

## Feature Summary

Describe the feature in one or two sentences:

## Problem It Solves

What limitation or user need does this address?

## Proposed Behavior

What should ARIA do?

## Example Input / Output

If relevant, provide a non-sensitive example:

```json
{
  "project_name": "Example",
  "official_url": "https://example.com",
  "description": "",
  "required_tasks": [],
  "chain": "",
  "token_contract": "",
  "social_links": []
}
```

## Safety Considerations

- Does this require external APIs?
- Does this require storing data?
- Does this introduce API keys or secrets?
- Could this increase false positives or false negatives?

## Non-goals

NEXUS-X ARIA should not request private keys, seed phrases, wallet passwords, OTPs, cookies, login tokens, or other sensitive credentials.
