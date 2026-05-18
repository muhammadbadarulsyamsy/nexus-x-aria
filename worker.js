// NEXUS-X ARIA v0.1.7 – Cloudflare Workers single-file
// Adds GET /try browser form for custom airdrop risk scoring.
// Provides GET /, /health, /demo, /docs, /try, /test-pack, /openapi.json, POST /score-airdrop and OPTIONS.
// Risk scoring heuristics remain unchanged from v0.1.5.

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

const VERSION = "0.1.7";

const KNOWN_CHAINS = [
  "ethereum", "arbitrum", "polygon", "optimism", "base",
  "binance smart chain", "bsc", "solana", "aptos", "sui",
  "scroll", "avalanche", "sepolia"
];

const SUSPICIOUS_DOMAIN_KEYWORDS = [
  "login", "airdrop", "claimfree", "bonus", "giveaway", "free"
];

const PROMO_KEYWORDS = [
  "guaranteed", "urgent", "free tokens", "limited time", "100% safe"
];

const SAMPLE_INPUT = {
  project_name: "Demo Airdrop",
  official_url: "https://demo-airdrop.com",
  description: "Claim free tokens by connecting your wallet and signing a message.",
  required_tasks: ["connect wallet", "join Discord", "sign message"],
  chain: "Base",
  token_contract: "",
  social_links: ["https://twitter.com/demo", "https://discord.gg/demo"]
};

const TEST_CASES = [
  {
    id: "TC01",
    name: "Low risk – Basic",
    input: {
      project_name: "Legit Airdrop",
      official_url: "https://legitproject.com",
      description: "Complete simple social tasks to earn loyalty points.",
      required_tasks: ["follow Twitter", "join Discord"],
      chain: "Ethereum",
      token_contract: "0x1234",
      social_links: ["https://twitter.com/legit", "https://discord.gg/legit"]
    },
    expected_score_min: 0,
    expected_score_max: 10,
    expected_level: "low",
    expected_flags: []
  },
  {
    id: "TC02",
    name: "Medium risk – Connect wallet & non-HTTPS",
    input: {
      project_name: "Wallet Connect Airdrop",
      official_url: "http://walletairdrop.com",
      description: "Connect your wallet to qualify.",
      required_tasks: ["connect wallet"],
      chain: "Arbitrum",
      token_contract: "0xABC",
      social_links: ["https://twitter.com/airdrop"]
    },
    expected_score_min: 45,
    expected_score_max: 55,
    expected_level: "medium",
    expected_flags: [
      "Official URL not HTTPS",
      "Official URL contains suspicious domain",
      "Requires wallet connection"
    ]
  },
  {
    id: "TC03",
    name: "High risk – Sign message & missing contract",
    input: {
      project_name: "Sign Message Airdrop",
      official_url: "http://free-airdrop.com",
      description: "Sign a message to prove eligibility.",
      required_tasks: ["sign message"],
      chain: "UnknownChain",
      token_contract: "",
      social_links: ["https://twitter.com/freeairdrop"]
    },
    expected_score_min: 70,
    expected_score_max: 80,
    expected_level: "high",
    expected_flags: [
      "Official URL contains suspicious domain",
      "Official URL not HTTPS",
      "Requires signing a message or transaction",
      "No token contract provided",
      "Blockchain chain is not widely recognized"
    ]
  },
  {
    id: "TC04",
    name: "Critical risk – Seed phrase & approvals",
    input: {
      project_name: "Phishing Airdrop",
      official_url: "https://scamlogin-airdrop.com",
      description: "Enter your seed phrase and approve unlimited token spending to claim.",
      required_tasks: ["connect wallet", "sign message"],
      chain: "Ethereum",
      token_contract: "",
      social_links: []
    },
    expected_score_min: 95,
    expected_score_max: 100,
    expected_level: "critical",
    expected_flags: [
      "Official URL contains suspicious domain",
      "Description asks for seed phrase or private key",
      "Requires wallet connection",
      "Requires signing a message or transaction",
      "Description mentions token approvals or unlimited permissions",
      "No token contract provided",
      "No social links provided"
    ]
  },
  {
    id: "TC05",
    name: "Non-HTTPS only",
    input: {
      project_name: "HTTP Airdrop",
      official_url: "http://project.com",
      description: "Complete social tasks.",
      required_tasks: ["follow Twitter"],
      chain: "Base",
      token_contract: "0xDEF",
      social_links: ["https://twitter.com/project"]
    },
    expected_score_min: 5,
    expected_score_max: 15,
    expected_level: "low",
    expected_flags: ["Official URL not HTTPS"]
  },
  {
    id: "TC06",
    name: "Missing official_url",
    input: {
      project_name: "No URL Airdrop",
      official_url: "",
      description: "Nothing suspicious here.",
      required_tasks: ["join Discord"],
      chain: "Optimism",
      token_contract: "0x123",
      social_links: ["https://twitter.com/nourl"]
    },
    expected_score_min: 5,
    expected_score_max: 15,
    expected_level: "low",
    expected_flags: ["Official URL missing"]
  },
  {
    id: "TC07",
    name: "Missing social links",
    input: {
      project_name: "No Social Links",
      official_url: "https://valid.com",
      description: "Safe description.",
      required_tasks: ["follow Twitter"],
      chain: "Ethereum",
      token_contract: "0x987",
      social_links: []
    },
    expected_score_min: 5,
    expected_score_max: 15,
    expected_level: "low",
    expected_flags: ["No social links provided"]
  },
  {
    id: "TC08",
    name: "Unknown chain",
    input: {
      project_name: "Unknown Chain Drop",
      official_url: "https://site.com",
      description: "Safe.",
      required_tasks: ["follow Twitter"],
      chain: "Klaytn",
      token_contract: "0xABC",
      social_links: ["https://twitter.com/site"]
    },
    expected_score_min: 0,
    expected_score_max: 10,
    expected_level: "low",
    expected_flags: ["Blockchain chain is not widely recognized"]
  },
  {
    id: "TC09",
    name: "Missing token contract",
    input: {
      project_name: "No Contract",
      official_url: "https://site.com",
      description: "Safe.",
      required_tasks: ["follow Twitter"],
      chain: "Polygon",
      token_contract: "",
      social_links: ["https://twitter.com/site"]
    },
    expected_score_min: 10,
    expected_score_max: 20,
    expected_level: "low",
    expected_flags: ["No token contract provided"]
  },
  {
    id: "TC10",
    name: "Promotional language only",
    input: {
      project_name: "Promo Airdrop",
      official_url: "https://promo.com",
      description: "Get free tokens now! Limited time offer.",
      required_tasks: ["join Discord"],
      chain: "Base",
      token_contract: "0x1111",
      social_links: ["https://twitter.com/promo"]
    },
    expected_score_min: 15,
    expected_score_max: 25,
    expected_level: "low",
    expected_flags: ["Description contains promotional or unrealistic language"]
  },
  {
    id: "TC11",
    name: "Approvals/unlimited",
    input: {
      project_name: "Approval Airdrop",
      official_url: "https://approval.com",
      description: "Approve unlimited token spending to claim rewards.",
      required_tasks: ["follow Twitter"],
      chain: "Arbitrum",
      token_contract: "0x222",
      social_links: ["https://twitter.com/approval"]
    },
    expected_score_min: 15,
    expected_score_max: 25,
    expected_level: "low",
    expected_flags: ["Description mentions token approvals or unlimited permissions"]
  }
];

const DOCS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NEXUS-X ARIA Documentation</title>
<style>
  body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.5; max-width: 800px; }
  h1, h2 { color: #2c3e50; }
  pre { background: #f6f8fa; padding: 1rem; overflow-x: auto; border-radius: 4px; }
  code { font-family: monospace; }
  ul { padding-left: 1.2rem; }
  a { color: #2563eb; }
</style>
</head>
<body>
<h1>NEXUS-X ARIA</h1>
<p><strong>Version: ${VERSION}</strong></p>
<p><strong>Airdrop Risk Intelligence API</strong> – API ini menganalisis informasi airdrop/proyek Web3 dan mengembalikan skor risiko, level risiko, verdict, red flag, rekomendasi tindakan aman, serta ringkasan.</p>

<h2>Base URL</h2>
<p><code>https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev</code></p>

<h2>Endpoint</h2>
<ul>
<li><strong>GET /</strong> – Halaman landing sederhana.</li>
<li><strong>GET /health</strong> – Mengembalikan status API dan versi.</li>
<li><strong>GET /demo</strong> – Menjalankan analisis risiko dengan contoh input internal.</li>
<li><strong>GET /try</strong> – Browser form untuk mencoba input airdrop custom.</li>
<li><strong>GET /docs</strong> – Dokumentasi HTML ini.</li>
<li><strong>GET /test-pack</strong> – Menjalankan paket pengujian heuristik otomatis.</li>
<li><strong>GET /openapi.json</strong> – Mengembalikan spesifikasi OpenAPI JSON.</li>
<li><strong>POST /score-airdrop</strong> – Menerima JSON airdrop dan mengembalikan hasil analisis.</li>
</ul>

<h2>Try Page</h2>
<p>Coba analisis custom langsung dari browser: <a href="/try">/try</a></p>

<h2>OpenAPI</h2>
<p>Machine-readable OpenAPI specification tersedia di <code>/openapi.json</code>.</p>

<h2>Contoh Request</h2>
<pre><code>POST /score-airdrop HTTP/1.1
Host: nexus-x-aria.muhammad-badarul-syamsy.workers.dev
Content-Type: application/json

{
  "project_name": "Example Airdrop",
  "official_url": "https://example-airdrop.com",
  "description": "Claim free tokens by connecting your wallet and signing a message.",
  "required_tasks": ["connect wallet", "join Discord", "sign message"],
  "chain": "Base",
  "token_contract": "",
  "social_links": ["https://twitter.com/example", "https://discord.gg/example"]
}</code></pre>

<h2>Penjelasan Output</h2>
<ul>
<li><strong>risk_score</strong>: Nilai 0–100 yang merepresentasikan tingkat risiko.</li>
<li><strong>risk_level</strong>: low, medium, high, atau critical.</li>
<li><strong>verdict</strong>: likely safe, caution, atau avoid.</li>
<li><strong>red_flags</strong>: indikator risiko yang ditemukan.</li>
<li><strong>safe_actions</strong>: rekomendasi keamanan umum.</li>
<li><strong>summary</strong>: ringkasan hasil analisis.</li>
</ul>

<h2>Batasan MVP</h2>
<ul>
<li>Analisis berbasis heuristik sederhana dan dapat menghasilkan false positive/negative.</li>
<li>Tidak ada integrasi data eksternal atau basis data.</li>
<li>Semua endpoint publik tanpa autentikasi atau rate limit bawaan.</li>
</ul>

<h2>Disclaimer Keamanan</h2>
<p>Analisis ini bukan nasihat keuangan dan bukan jaminan keamanan. Jangan pernah membagikan private key, seed phrase, password, OTP, atau data rahasia lainnya.</p>

<h2>Roadmap Singkat</h2>
<ul>
<li><strong>v0.2.x</strong>: peningkatan heuristik dan reputasi data setelah review.</li>
<li><strong>v0.3.x</strong>: rate limit, API key opsional, dan logging dasar.</li>
<li><strong>v1.x</strong>: model scoring lebih matang dan review monetisasi.</li>
</ul>
</body></html>`;

const LANDING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NEXUS-X ARIA</title>
<style>
  body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.4; text-align: center; }
  h1 { color: #2c3e50; margin-bottom: 0.5em; }
  h2 { color: #34495e; margin-top: 0; }
  p { max-width: 650px; margin: 1rem auto; }
  .links a { display: inline-block; margin: 0.5rem; padding: 0.55rem 1rem; background: #3498db; color: #fff; text-decoration: none; border-radius: 4px; }
  .links a:hover { background: #2980b9; }
  footer { margin-top: 2rem; font-size: 0.8rem; color: #555; }
</style>
</head>
<body>
<h1>NEXUS-X ARIA</h1>
<h2>Airdrop Risk Intelligence API</h2>
<p>Version ${VERSION} – transparent airdrop risk scoring for Web3 projects.</p>
<div class="links">
  <a href="/try">Try It</a>
  <a href="/demo">Demo</a>
  <a href="/docs">Docs</a>
  <a href="/test-pack">Test Pack</a>
  <a href="/openapi.json">OpenAPI Spec</a>
  <a href="/health">Health</a>
</div>
<p>Endpoint <code>/score-airdrop</code> is available for technical integration via POST JSON.</p>
<footer>Disclaimer: analysis does not guarantee safety. Always do your own research. Never enter seed phrases, private keys, passwords, OTPs, or wallet credentials.</footer>
</body></html>`;

const TRY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NEXUS-X ARIA Try Page</title>
<style>
  body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.5; max-width: 900px; }
  h1, h2 { color: #2c3e50; }
  label { display: block; margin-top: 1rem; font-weight: bold; }
  input, textarea { width: 100%; padding: 0.6rem; margin-top: 0.25rem; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; font-family: Arial, sans-serif; }
  textarea { min-height: 90px; }
  button { margin-top: 1rem; padding: 0.7rem 1.2rem; border: 0; border-radius: 4px; background: #3498db; color: white; font-weight: bold; cursor: pointer; }
  button:hover { background: #2980b9; }
  .warning { background: #fff3cd; border: 1px solid #ffeeba; padding: 0.8rem; border-radius: 4px; }
  .result { margin-top: 1.5rem; padding: 1rem; border-radius: 6px; background: #f6f8fa; white-space: pre-wrap; }
  .small { color: #555; font-size: 0.9rem; }
  .nav a { margin-right: 0.75rem; }
</style>
</head>
<body>
<div class="nav">
  <a href="/">Home</a>
  <a href="/docs">Docs</a>
  <a href="/demo">Demo</a>
  <a href="/test-pack">Test Pack</a>
</div>

<h1>NEXUS-X ARIA Try Page</h1>
<p><strong>Version:</strong> ${VERSION}</p>

<div class="warning">
  <strong>Safety warning:</strong> Do not enter private keys, seed phrases, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials.
  This tool provides heuristic analysis only and does not guarantee safety.
</div>

<form id="aria-form">
  <label for="project_name">Project Name</label>
  <input id="project_name" value="Example Airdrop" required>

  <label for="official_url">Official URL</label>
  <input id="official_url" value="https://example-airdrop.com">

  <label for="description">Description</label>
  <textarea id="description" required>Claim free tokens by connecting your wallet and signing a message.</textarea>

  <label for="required_tasks">Required Tasks</label>
  <textarea id="required_tasks" required>connect wallet
join Discord
sign message</textarea>
  <p class="small">One task per line, or separate with commas.</p>

  <label for="chain">Chain</label>
  <input id="chain" value="Base">

  <label for="token_contract">Token Contract</label>
  <input id="token_contract" value="">

  <label for="social_links">Social Links</label>
  <textarea id="social_links">https://twitter.com/example
https://discord.gg/example</textarea>
  <p class="small">One link per line, or separate with commas.</p>

  <button type="submit">Analyze Risk</button>
</form>

<h2>Result</h2>
<div id="result" class="result">Submit the form to see a risk analysis.</div>

<script>
function splitList(value) {
  return value
    .split(/\\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderResult(data) {
  if (data.error) {
    return "Error: " + data.error;
  }

  const lines = [];
  lines.push("Risk Score: " + data.risk_score);
  lines.push("Risk Level: " + data.risk_level);
  lines.push("Verdict: " + data.verdict);
  lines.push("");

  lines.push("Red Flags:");
  if (data.red_flags && data.red_flags.length) {
    data.red_flags.forEach((flag) => lines.push("- " + flag));
  } else {
    lines.push("- None detected by current heuristics");
  }

  lines.push("");
  lines.push("Safe Actions:");
  if (data.safe_actions && data.safe_actions.length) {
    data.safe_actions.forEach((action) => lines.push("- " + action));
  }

  lines.push("");
  lines.push("Summary:");
  lines.push(data.summary || "");

  return lines.join("\\n");
}

document.getElementById("aria-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    project_name: document.getElementById("project_name").value.trim(),
    official_url: document.getElementById("official_url").value.trim(),
    description: document.getElementById("description").value.trim(),
    required_tasks: splitList(document.getElementById("required_tasks").value),
    chain: document.getElementById("chain").value.trim(),
    token_contract: document.getElementById("token_contract").value.trim(),
    social_links: splitList(document.getElementById("social_links").value)
  };

  const output = document.getElementById("result");
  output.textContent = "Analyzing...";

  try {
    const response = await fetch("/score-airdrop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    output.textContent = renderResult(data);
  } catch (error) {
    output.textContent = "Request failed: " + error.message;
  }
});
</script>
</body>
</html>`;

const OPENAPI_SPEC = {
  openapi: "3.0.1",
  info: {
    title: "NEXUS-X ARIA",
    version: VERSION,
    description: "Transparent airdrop risk scoring API for Web3 projects."
  },
  servers: [
    {
      url: "https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev"
    }
  ],
  paths: {
    "/": {
      get: {
        summary: "Landing page",
        responses: {
          "200": {
            description: "Public landing page",
            content: { "text/html": { schema: { type: "string" } } }
          }
        }
      }
    },
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "Service status and version",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    service: { type: "string" },
                    version: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/demo": {
      get: {
        summary: "Demo risk analysis",
        responses: {
          "200": {
            description: "Demo analysis result",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/try": {
      get: {
        summary: "Browser form for custom scoring",
        responses: {
          "200": {
            description: "Interactive HTML try page",
            content: { "text/html": { schema: { type: "string" } } }
          }
        }
      }
    },
    "/docs": {
      get: {
        summary: "HTML documentation",
        responses: {
          "200": {
            description: "Documentation page",
            content: { "text/html": { schema: { type: "string" } } }
          }
        }
      }
    },
    "/test-pack": {
      get: {
        summary: "Internal validation test pack",
        responses: {
          "200": {
            description: "Test pack results",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/openapi.json": {
      get: {
        summary: "OpenAPI specification",
        responses: {
          "200": {
            description: "OpenAPI JSON document",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/score-airdrop": {
      post: {
        summary: "Score an airdrop",
        description: "Analyzes airdrop metadata and returns risk score, risk level, verdict, red flags, safety actions, and summary.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["project_name", "description", "required_tasks", "social_links"],
                properties: {
                  project_name: { type: "string" },
                  official_url: { type: "string" },
                  description: { type: "string" },
                  required_tasks: { type: "array", items: { type: "string" } },
                  chain: { type: "string" },
                  token_contract: { type: "string" },
                  social_links: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Risk scoring response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    risk_score: { type: "number" },
                    risk_level: { type: "string" },
                    verdict: { type: "string" },
                    red_flags: { type: "array", items: { type: "string" } },
                    safe_actions: { type: "array", items: { type: "string" } },
                    summary: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

async function handleRequest(request) {
  const { method } = request;
  const url = new URL(request.url);

  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (method === "GET" && (url.pathname === "/" || url.pathname === "")) {
    return new Response(LANDING_HTML, {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "text/html; charset=utf-8" }
    });
  }

  if (method === "GET" && url.pathname === "/health") {
    return new Response(JSON.stringify({
      status: "ok",
      service: "nexus-x-aria",
      version: VERSION
    }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }

  if (method === "GET" && url.pathname === "/demo") {
    const result = computeRisk(SAMPLE_INPUT);
    return new Response(JSON.stringify({
      demo: true,
      service: "nexus-x-aria",
      version: VERSION,
      sample_input: SAMPLE_INPUT,
      result: result
    }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }

  if (method === "GET" && url.pathname === "/try") {
    return new Response(TRY_HTML, {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "text/html; charset=utf-8" }
    });
  }

  if (method === "GET" && url.pathname === "/docs") {
    return new Response(DOCS_HTML, {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "text/html; charset=utf-8" }
    });
  }

  if (method === "GET" && url.pathname === "/test-pack") {
    const results = TEST_CASES.map((tc) => {
      const result = computeRisk(tc.input);
      const passed =
        result.risk_score >= tc.expected_score_min &&
        result.risk_score <= tc.expected_score_max &&
        result.risk_level === tc.expected_level &&
        tc.expected_flags.every((flag) => result.red_flags.includes(flag));

      return {
        id: tc.id,
        name: tc.name,
        expected_score_min: tc.expected_score_min,
        expected_score_max: tc.expected_score_max,
        actual_score: result.risk_score,
        expected_level: tc.expected_level,
        actual_level: result.risk_level,
        expected_flags: tc.expected_flags,
        actual_flags: result.red_flags,
        passed: passed
      };
    });

    return new Response(JSON.stringify({
      service: "nexus-x-aria",
      version: VERSION,
      tests: results
    }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }

  if (method === "GET" && url.pathname === "/openapi.json") {
    return new Response(JSON.stringify(OPENAPI_SPEC), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }

  if (method === "POST" && url.pathname === "/score-airdrop") {
    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonError("Content-Type must be application/json", 415);
    }

    const bodyText = await request.text();

    if (bodyText.length > 20000) {
      return jsonError("Request body too large", 413);
    }

    let data;
    try {
      data = JSON.parse(bodyText || "{}");
    } catch (_e) {
      return jsonError("Invalid JSON payload", 400);
    }

    const requiredFields = ["project_name", "description", "required_tasks", "social_links"];
    for (const field of requiredFields) {
      if (!(field in data)) {
        return jsonError(`Missing required field: ${field}`, 400);
      }
    }

    if (!Array.isArray(data.required_tasks) || !Array.isArray(data.social_links)) {
      return jsonError("Fields 'required_tasks' and 'social_links' must be arrays", 400);
    }

    const result = computeRisk(data);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
  });
}

function jsonError(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
  });
}

function computeRisk(input) {
  let score = 0;
  const redFlags = [];

  const tasksLower = (input.required_tasks || []).map((t) => String(t).toLowerCase());
  const desc = String(input.description || "").toLowerCase();
  const url = String(input.official_url || "");
  const chain = String(input.chain || "").toLowerCase();

  if (!url) {
    score += 10;
    redFlags.push("Official URL missing");
  } else {
    if (!url.startsWith("https://")) {
      score += 10;
      redFlags.push("Official URL not HTTPS");
    }

    try {
      const domain = new URL(url).hostname.toLowerCase();
      if (SUSPICIOUS_DOMAIN_KEYWORDS.some((kw) => domain.includes(kw))) {
        score += 20;
        redFlags.push("Official URL contains suspicious domain");
      }
    } catch (_e) {
      score += 20;
      redFlags.push("Official URL contains suspicious domain");
    }
  }

  if (desc.includes("seed phrase") || desc.includes("private key") || desc.includes("recovery phrase")) {
    score += 30;
    redFlags.push("Description asks for seed phrase or private key");
  }

  if (tasksLower.some((t) => t.includes("connect wallet"))) {
    score += 20;
    redFlags.push("Requires wallet connection");
  }

  if (tasksLower.some((t) => t.includes("sign message") || t.includes("sign transaction"))) {
    score += 25;
    redFlags.push("Requires signing a message or transaction");
  }

  if (desc.includes("approve") || desc.includes("permit") || desc.includes("unlimited approval")) {
    score += 20;
    redFlags.push("Description mentions token approvals or unlimited permissions");
  }

  if (!input.token_contract || String(input.token_contract).trim() === "") {
    score += 15;
    redFlags.push("No token contract provided");
  }

  if (!input.social_links || input.social_links.length === 0) {
    score += 10;
    redFlags.push("No social links provided");
  }

  if (chain && !KNOWN_CHAINS.includes(chain)) {
    score += 5;
    redFlags.push("Blockchain chain is not widely recognized");
  }

  if (PROMO_KEYWORDS.some((kw) => desc.includes(kw))) {
    score += 20;
    redFlags.push("Description contains promotional or unrealistic language");
  }

  if (score > 100) score = 100;

  let riskLevel;
  let verdict;

  if (score <= 30) {
    riskLevel = "low";
    verdict = "likely safe";
  } else if (score <= 60) {
    riskLevel = "medium";
    verdict = "caution";
  } else if (score <= 80) {
    riskLevel = "high";
    verdict = "avoid";
  } else {
    riskLevel = "critical";
    verdict = "avoid";
  }

  const summary = `The analysis yielded a risk score of ${score}/100 with a ${riskLevel} risk level. ${redFlags.length} red flag(s) detected${redFlags.length ? ": " + redFlags.join(", ") : ""}. Proceed accordingly.`;

  return {
    risk_score: score,
    risk_level: riskLevel,
    verdict: verdict,
    red_flags: redFlags,
    safe_actions: [
      "Use a burner wallet for airdrops",
      "Verify official links through multiple credible sources",
      "Avoid unlimited token approvals",
      "Read and understand any message before signing",
      "Do not share private keys or seed phrases"
    ],
    summary: summary
  };
}

export default {
  fetch: handleRequest
};
