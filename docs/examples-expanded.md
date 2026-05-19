# Expanded Examples

This document provides example inputs and expected interpretation for NEXUS-X ARIA.

## Low Risk Example

A project with HTTPS, known chain, token contract, social links, and no wallet/signature requirement should usually be low risk.

## Medium Risk Example

A project that uses wallet verification language or suspicious wallet-related domain keywords may become medium risk.

## High Risk Example

Multiple moderate signals such as sign message, missing contract, non-HTTPS URL, promotional domain, and unknown chain can produce high risk.

## Critical Risk Example

Any request for seed phrase, private key, recovery phrase, mnemonic, or wallet restore phrase should be treated as highly dangerous.

## Indonesian Scam Example

Example phrase:

```text
Masukkan seed phrase untuk klaim sekarang hadiah eksklusif.
```

This should trigger recovery secret and urgency/promo detection.

## Use /try

Use the live `/try` page to test custom examples from a browser.
