# NEXUS-X ARIA Examples

Base URL:

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev
```

## Health Check

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "nexus-x-aria",
  "version": "0.1.5"
}
```

## Demo Endpoint

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/demo
```

## Test Pack

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/test-pack
```

The test pack should return 11 internal tests with `passed: true`.

## OpenAPI Specification

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/openapi.json
```

## Score an Airdrop with curl

```bash
curl -X POST "https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/score-airdrop" \
  -H "Content-Type: application/json" \
  -d '{
    "project_name": "Example Airdrop",
    "official_url": "https://example-airdrop.com",
    "description": "Claim free tokens by connecting your wallet and signing a message.",
    "required_tasks": ["connect wallet", "join Discord", "sign message"],
    "chain": "Base",
    "token_contract": "",
    "social_links": [
      "https://twitter.com/example",
      "https://discord.gg/example"
    ]
  }'
```

## Score an Airdrop with JavaScript fetch

```javascript
const response = await fetch("https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev/score-airdrop", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    project_name: "Example Airdrop",
    official_url: "https://example-airdrop.com",
    description: "Claim free tokens by connecting your wallet and signing a message.",
    required_tasks: ["connect wallet", "join Discord", "sign message"],
    chain: "Base",
    token_contract: "",
    social_links: [
      "https://twitter.com/example",
      "https://discord.gg/example"
    ]
  })
});

const result = await response.json();
console.log(result);
```

## Safety Note

Do not submit private keys, seed phrases, recovery phrases, passwords, OTPs, cookies, API keys, or other sensitive credentials.
