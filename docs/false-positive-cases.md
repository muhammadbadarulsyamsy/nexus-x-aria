# False Positive Cases

This document records false-positive risks and fixes.

## zkSync False Positive

### Problem

The string `zksyncproject.com` contains the substring `sync`.

A previous v0.1.8 draft treated `sync` as a high-risk domain keyword, causing zkSync-related domains to be incorrectly flagged.

### Fix

The generic domain keyword `sync` was removed.

Phrase-level detection such as `sync wallet` remains active.

### Lesson

Avoid overly broad substring matching for domain risk. Prefer phrase-level checks for ambiguous terms.

## Approval Warning False Positive

### Problem

Text like `Do not approve unlimited spending` contains risky words but is actually a safety warning.

### Fix

Approval warning phrases such as `do not approve`, `jangan approve`, and `hindari approval` prevent the risky approval penalty.

### Lesson

Simple context handling can reduce false positives without adding external AI or databases.
