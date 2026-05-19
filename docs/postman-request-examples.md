# Postman Request Examples v0.1

## Base URL

Use this variable:

```text
{{base_url}}
```

Value:

```text
https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev
```

## GET /health

Method:

```text
GET
```

URL:

```text
{{base_url}}/health
```

Expected purpose:

```text
Check service status and runtime version.
```

Expected type of response:

```json
{
  "status": "ok",
  "service": "nexus-x-aria",
  "version": "0.1.9"
}
```

## GET /demo

Method:

```text
GET
```

URL:

```text
{{base_url}}/demo
```

Expected purpose:

```text
Run built-in demo analysis.
```

## GET /examples

Method:

```text
GET
```

URL:

```text
{{base_url}}/examples
```

Expected purpose:

```text
View educational examples and false-positive notes.
```

## GET /test-pack

Method:

```text
GET
```

URL:

```text
{{base_url}}/test-pack
```

Expected purpose:

```text
Run internal validation test pack.
```

Expected validation:

```text
20 tests
passed:false = 0
```

## GET /openapi.json

Method:

```text
GET
```

URL:

```text
{{base_url}}/openapi.json
```

Expected purpose:

```text
View OpenAPI 3.0.1 specification.
```

Expected validation:

```text
openapi: 3.0.1
info.version: 0.1.9
paths include /examples
```

## POST /score-airdrop

Method:

```text
POST
```

URL:

```text
{{base_url}}/score-airdrop
```

Headers:

```text
Content-Type: application/json
```

Body:

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

Expected purpose:

```text
Analyze airdrop metadata and return risk score, risk level, verdict, red flags, safe actions, and summary.
```

## Do Not Use These in Examples

Never use:

```text
real seed phrase
real private key
real recovery phrase
real password
real OTP
real cookie
real API key
real wallet credential
```
