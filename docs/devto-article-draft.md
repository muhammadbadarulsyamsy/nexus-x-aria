# Transparent Airdrop Risk Scoring: Building a Small Heuristic API Example

> Draft article for DEV Community or similar educational platforms.  
> This article should be published as education, not aggressive promotion.

## Introduction

Airdrops are common in Web3 communities, but not every airdrop campaign is safe. Some campaigns ask users to connect wallets, sign messages, approve token spending, or even enter recovery secrets. These signals can be dangerous, especially for beginners.

This article explains how a small heuristic API can help users understand common airdrop risk signals.

The example project is **NEXUS-X ARIA**, a transparent Airdrop Risk Intelligence API.

## What ARIA Does

ARIA accepts project metadata such as:

- project name
- official URL
- description
- required tasks
- blockchain chain
- token contract
- social links

It returns:

- risk score
- risk level
- verdict
- red flags
- safe actions
- summary

## Why Heuristics?

Heuristics are simple rules. They are not perfect, but they are useful for education and early warning.

For example:

- non-HTTPS URLs can increase risk
- wallet connection requests can increase risk
- signing requests can increase risk
- seed phrase/private key requests are critical red flags
- promotional urgency can increase risk
- missing social links or token contracts may increase uncertainty

## Example Risk Levels

### Low Risk

A project with HTTPS, known chain, token contract, social links, and no wallet/signing request may score low.

### Medium Risk

A project that asks for wallet connection and uses suspicious language may score medium.

### High Risk

A project that asks users to sign messages, has an unknown chain, missing token contract, and promotional domain language may score high.

### Critical Risk

A project asking for seed phrases, private keys, recovery phrases, or unlimited approvals should be treated as highly dangerous.

## False Positives Matter

A heuristic system can make mistakes.

For example, `zksyncproject.com` contains the substring `sync`. A naive detector might mark it suspicious because many scams use phrases like `sync wallet`.

ARIA fixed this by not treating generic `sync` as a domain-level risk keyword, while still detecting phrase-level risks such as `sync wallet`.

## Indonesian Scam Phrases

Scam patterns are not only in English. ARIA also detects Indonesian phrases such as:

- masukkan seed
- masukkan private key
- frasa pemulihan
- klaim sekarang
- hadiah eksklusif
- verifikasi dompet

## Try It

You can test ARIA from the browser:

https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/try

Examples:

https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/examples

OpenAPI:

https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/openapi.json

GitHub:

https://github.com/muhammadbadarulsyamsy/nexus-x-aria

## Limitations

ARIA is not a guarantee of safety. It does not query blockchain explorers, phishing databases, or domain reputation feeds. It is a transparent heuristic MVP for education and experimentation.

Users must do their own research and must never share private keys, seed phrases, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials.

## Conclusion

A transparent heuristic scoring API can help explain airdrop risk signals and teach safer Web3 behavior. It is not a complete security product, but it can be a useful educational layer and a foundation for future improvements.
