# Transparent Airdrop Risk Scoring: Building a Small Heuristic API for Web3 Safety Education

> This article is educational. It is not financial advice, investment advice, legal advice, or a guarantee of safety.

Airdrops are common in Web3. Some are simple community campaigns. Others can be risky.

A campaign may ask users to connect a wallet, sign a message, approve token spending, or visit a claim page. In the worst cases, scams may ask for a seed phrase, private key, or recovery phrase.

For beginners, these risks are not always obvious. A page can look professional and still contain dangerous instructions.

This is why I built a small educational experiment called **NEXUS-X ARIA**.

ARIA is not a complete security product. It is a transparent heuristic API that shows how common airdrop risk signals can be converted into a simple risk score.

## What ARIA Tries to Do

NEXUS-X ARIA takes basic airdrop or Web3 project metadata and returns a structured risk analysis.

Example input fields:

- project name
- official URL
- project description
- required tasks
- chain
- token contract
- social links

Example output fields:

- risk score
- risk level
- verdict
- red flags
- safe actions
- summary

The goal is simple: make risky signals easier to see.

## Why Use Heuristics?

A heuristic is a simple rule.

For example:

- a non-HTTPS URL may increase risk
- a request to connect a wallet may increase risk
- a request to sign a message may increase risk
- a missing token contract may increase uncertainty
- a request for a seed phrase or private key is a major red flag

Heuristics are not perfect. They can produce false positives and false negatives.

But they are useful for education because they are transparent. Users can see which signals caused the score to increase.

## Example Input

```json
{
  "project_name": "Example Airdrop",
  "official_url": "https://example-airdrop.com",
  "description": "Claim free tokens by connecting your wallet and signing a message.",
  "required_tasks": ["connect wallet", "sign message"],
  "chain": "Base",
  "token_contract": "",
  "social_links": ["https://twitter.com/example"]
}
```

## Example Output

The exact score depends on the current rule set, but the response may look like this:

```json
{
  "risk_score": 85,
  "risk_level": "critical",
  "verdict": "avoid",
  "red_flags": [
    "Requires wallet connection",
    "Requires signing a message or transaction",
    "No token contract provided",
    "Description contains promotional or urgency language"
  ],
  "safe_actions": [
    "Use a burner wallet for airdrops",
    "Verify official links through multiple credible sources",
    "Avoid unlimited token approvals",
    "Read and understand any message before signing",
    "Do not share private keys or seed phrases"
  ]
}
```

This does not mean the tool can prove whether a project is safe or unsafe. It only means the input contains signals that the current heuristic rules consider risky.

## Risk Signals ARIA Looks For

ARIA currently checks signals such as:

- missing official URL
- non-HTTPS official URL
- high-risk domain keywords
- promotional claim keywords
- wallet connection requests
- wallet verification or synchronization language
- signing requests
- seed phrase, private key, recovery phrase, or mnemonic requests
- risky token approval language
- promotional urgency
- missing token contract
- missing social links
- unknown chain

The system also includes Indonesian scam phrases such as:

- `masukkan seed`
- `masukkan private key`
- `frasa pemulihan`
- `verifikasi dompet`
- `klaim sekarang`
- `hadiah eksklusif`

This matters because scam language is not always in English.

## False Positives Matter

Heuristic systems can be wrong.

One example was a false positive related to `zkSync`.

A simple domain scanner might see the substring `sync` in `zksyncproject.com` and mark it suspicious because many scams use phrases like `sync wallet`.

That is too broad.

ARIA fixed this by removing generic `sync` as a domain-level risk keyword while still detecting phrase-level risks such as:

```text
sync wallet
```

This is an important lesson: a risk scoring system should not only add rules. It should also remove or refine rules that create bad false positives.

## Approval Warnings Need Context

Another issue is token approval language.

The phrase:

```text
approve unlimited spending
```

can be risky if it is an instruction.

But this sentence is different:

```text
Do not approve unlimited spending.
```

That is an educational warning, not a scam instruction.

ARIA handles this by recognizing warning phrases such as:

- `do not approve`
- `don't approve`
- `avoid approval`
- `jangan approve`
- `jangan setujui`
- `hindari approval`

This is still simple. It is not natural language understanding. But it reduces a basic false positive.

## Try It

You can inspect the live example here:

- Try Page: https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/try
- Examples: https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/examples
- OpenAPI: https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/openapi.json
- GitHub: https://github.com/muhammadbadarulsyamsy/nexus-x-aria

## Current Limitations

ARIA is still an MVP.

It does not:

- guarantee safety
- detect all scams
- query external domain reputation feeds
- query blockchain explorers
- simulate wallet transactions
- replace human due diligence
- provide financial or investment advice

It can produce false positives and false negatives.

## What I Learned

Building this small API showed that a transparent scoring system can be useful for education, but it must stay honest about its limits.

A small heuristic tool is not a complete security product. But it can help explain common risk signals and encourage safer habits.

The most important rule remains simple:

> Never share your seed phrase, private key, recovery phrase, password, OTP, cookie, API key, or wallet credentials.
