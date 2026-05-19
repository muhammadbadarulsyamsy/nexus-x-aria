const VERSION = "0.2.0";
const SERVICE = "nexus-x-aria";

const CONFIDENCE_NOTE =
  "This result is based on heuristic text and metadata analysis only. It may contain false positives or false negatives.";

const KNOWN_CHAINS = [
  "ethereum",
  "base",
  "optimism",
  "arbitrum",
  "polygon",
  "bnb",
  "bsc",
  "solana",
  "avalanche",
  "zksync",
  "zk sync",
  "linea",
  "scroll",
  "starknet",
  "blast",
  "mantle",
  "near",
  "aptos",
  "sui"
];

const DEFAULT_SAFE_ACTIONS = [
  "Verify official links through multiple credible sources.",
  "Use a burner wallet for airdrop testing.",
  "Read every wallet message before signing.",
  "Avoid unlimited token approvals unless you fully understand the risk.",
  "Never share private keys, seed phrases, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials."
];

const SAMPLE_INPUT = {
  project_name: "Example Airdrop",
  official_url: "https://example-airdrop.com",
  description: "Claim free tokens by connecting your wallet and signing a message.",
  required_tasks: ["connect wallet", "sign message"],
  chain: "Base",
  token_contract: "",
  social_links: ["https://twitter.com/example"]
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });
}

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "access-control-allow-origin": "*"
    }
  });
}

function textOf(value) {
  if (Array.isArray(value)) return value.join(" ");
  if (value === null || value === undefined) return "";
  return String(value);
}

function normalizeInput(raw) {
  const input = raw && typeof raw === "object" ? raw : {};
  const project_name = textOf(input.project_name).trim();
  const official_url = textOf(input.official_url).trim();
  const description = textOf(input.description).trim();
  const required_tasks = Array.isArray(input.required_tasks)
    ? input.required_tasks.map((x) => textOf(x).trim()).filter(Boolean)
    : textOf(input.required_tasks).trim()
      ? [textOf(input.required_tasks).trim()]
      : [];
  const chain = textOf(input.chain).trim();
  const token_contract = textOf(input.token_contract).trim();
  const social_links = Array.isArray(input.social_links)
    ? input.social_links.map((x) => textOf(x).trim()).filter(Boolean)
    : textOf(input.social_links).trim()
      ? [textOf(input.social_links).trim()]
      : [];

  const combinedText = [
    project_name,
    official_url,
    description,
    required_tasks.join(" "),
    chain,
    token_contract,
    social_links.join(" ")
  ].join(" ").toLowerCase();

  return {
    project_name,
    official_url,
    description,
    required_tasks,
    chain,
    token_contract,
    social_links,
    combinedText
  };
}

function containsAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function parseHost(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch (_) {
    return "";
  }
}

function getRiskLevel(score) {
  if (score >= 75) return "critical";
  if (score >= 50) return "high";
  if (score >= 25) return "medium";
  return "low";
}

function getVerdict(score) {
  if (score >= 75) return "avoid";
  if (score >= 50) return "high_risk";
  if (score >= 25) return "caution";
  return "likely_safe";
}

function buildInputQuality(input) {
  const missing = [];
  if (!input.project_name) missing.push("project_name");
  if (!input.official_url) missing.push("official_url");
  if (!input.description) missing.push("description");
  if (!input.required_tasks.length) missing.push("required_tasks");
  if (!input.chain) missing.push("chain");
  if (!input.token_contract) missing.push("token_contract");
  if (!input.social_links.length) missing.push("social_links");

  const notes = missing.map((field) => {
    if (field === "token_contract") return "The score may be less reliable because token_contract is missing.";
    if (field === "social_links") return "Missing social links may reduce confidence in project legitimacy.";
    return `Missing ${field} may reduce analysis quality.`;
  });

  let level = "complete";
  if (missing.length >= 4) level = "weak";
  else if (missing.length >= 2) level = "partial";
  else if (missing.length === 1) level = "partial";

  return { level, missing_fields: missing, notes };
}

function scoreAirdrop(rawInput) {
  const input = normalizeInput(rawInput);
  const text = input.combinedText;
  const host = parseHost(input.official_url);

  let riskScore = 0;
  const redFlags = [];
  const safeActions = [...DEFAULT_SAFE_ACTIONS];
  const ruleHits = [];
  const scoreBreakdown = [];
  const falsePositiveNotes = [];

  function addSignal(rule_id, category, points, severity, reason, red_flag) {
    if (!ruleHits.includes(rule_id)) ruleHits.push(rule_id);
    if (points > 0) {
      riskScore += points;
      scoreBreakdown.push({ rule_id, category, points, severity, reason });
    }
    if (red_flag && !redFlags.includes(red_flag)) redFlags.push(red_flag);
  }

  if (!input.project_name) {
    addSignal(
      "MISSING_PROJECT_NAME",
      "input_quality",
      5,
      "low",
      "Project name is missing.",
      "Project name is missing"
    );
  }

  if (!input.official_url) {
    addSignal(
      "MISSING_OFFICIAL_URL",
      "url_security",
      15,
      "medium",
      "Official URL is missing.",
      "Official URL is missing"
    );
  } else if (!input.official_url.toLowerCase().startsWith("https://")) {
    addSignal(
      "NON_HTTPS_URL",
      "url_security",
      25,
      "medium",
      "Official URL does not use HTTPS.",
      "Official URL does not use HTTPS"
    );
  }

  if (host) {
    if (containsAny(host, ["wallet", "login", "validate", "validation", "secure", "verify"])) {
      addSignal(
        "HIGH_RISK_DOMAIN_KEYWORD",
        "domain_risk",
        25,
        "high",
        "Official URL contains high-risk wallet, login, verify, or security keyword.",
        "Official URL contains high-risk wallet, login, verify, or security keyword"
      );
    }

    if (containsAny(host, ["claim", "reward", "bonus", "gift"])) {
      addSignal(
        "MEDIUM_RISK_DOMAIN_KEYWORD",
        "domain_risk",
        10,
        "medium",
        "Official URL contains promotional claim or reward keyword.",
        "Official URL contains promotional claim or reward keyword"
      );
    }

    if (host.includes("airdrop")) {
      addSignal(
        "LOW_RISK_AIRDROP_DOMAIN_KEYWORD",
        "domain_risk",
        5,
        "low",
        "Official URL contains airdrop keyword.",
        "Official URL contains airdrop keyword"
      );
    }

    if (host.includes("zksync")) {
      if (!ruleHits.includes("KNOWN_CHAIN_DETECTED")) ruleHits.push("KNOWN_CHAIN_DETECTED");
      falsePositiveNotes.push(
        "Known zkSync-related term detected; generic sync substring was not treated as a domain risk by itself."
      );
    }
  }

  if (containsAny(text, ["connect wallet", "connect your wallet", "hubungkan wallet", "hubungkan dompet", "koneksi dompet"])) {
    addSignal(
      "WALLET_CONNECT_REQUEST",
      "wallet_request",
      20,
      "medium",
      "Project asks users to connect a wallet.",
      "Requires wallet connection"
    );
  }

  if (containsAny(text, ["verify wallet", "wallet verification", "verifikasi wallet", "verifikasi dompet"])) {
    addSignal(
      "WALLET_VERIFY_REQUEST",
      "wallet_request",
      25,
      "high",
      "Project asks users to verify a wallet.",
      "Requests wallet verification"
    );
  }

  if (containsAny(text, ["sync wallet", "synchronize wallet", "sinkronkan wallet", "sinkronkan dompet"])) {
    addSignal(
      "WALLET_SYNC_REQUEST",
      "wallet_request",
      25,
      "high",
      "Project asks users to sync a wallet.",
      "Requests wallet synchronization"
    );
  }

  if (containsAny(text, ["sign message", "sign a message", "sign transaction", "signature request", "tanda tangan pesan", "menandatangani pesan"])) {
    addSignal(
      "SIGN_MESSAGE_REQUEST",
      "signing_request",
      30,
      "high",
      "Project asks users to sign a message or transaction.",
      "Requires signing a message or transaction"
    );
  }

  const educationalSecretWarning = containsAny(text, [
    "do not share private key",
    "do not share private keys",
    "do not share seed phrase",
    "do not share seed phrases",
    "never share private key",
    "never share private keys",
    "never share seed phrase",
    "never share seed phrases",
    "jangan bagikan private key",
    "jangan bagikan seed phrase",
    "jangan pernah bagikan private key",
    "jangan pernah bagikan seed phrase"
  ]);

  if (educationalSecretWarning) {
    if (!ruleHits.includes("EDUCATIONAL_SECRET_WARNING")) ruleHits.push("EDUCATIONAL_SECRET_WARNING");
    falsePositiveNotes.push(
      "Educational wallet secret warning detected; private-key or seed-phrase language was not penalized as a credential request."
    );
  } else {
    if (containsAny(text, ["seed phrase", "mnemonic", "recovery phrase", "secret recovery phrase", "frasa pemulihan", "masukkan seed"])) {
      addSignal(
        "SEED_PHRASE_REQUEST",
        "secret_request",
        85,
        "critical",
        "Project asks for seed phrase, mnemonic, or recovery phrase.",
        "Requests seed phrase, mnemonic, or recovery phrase"
      );
    }

    if (containsAny(text, ["private key", "kunci privat", "masukkan private key"])) {
      addSignal(
        "PRIVATE_KEY_REQUEST",
        "secret_request",
        85,
        "critical",
        "Project asks for private key.",
        "Requests private key"
      );
    }

    if (containsAny(text, ["recovery secret", "secret phrase"])) {
      addSignal(
        "SECRET_RECOVERY_REQUEST",
        "secret_request",
        80,
        "critical",
        "Project asks for recovery secret phrase.",
        "Requests wallet recovery secret"
      );
    }
  }

  const approvalLanguage = containsAny(text, [
    "approve unlimited",
    "unlimited approval",
    "set approval for all",
    "approve all tokens",
    "approve spending",
    "setujui semua",
    "approve semua"
  ]);
  const educationalApprovalWarning = containsAny(text, [
    "do not approve",
    "don't approve",
    "dont approve",
    "avoid approval",
    "avoid unlimited approval",
    "jangan approve",
    "jangan setujui",
    "hindari approval"
  ]);

  if (approvalLanguage && educationalApprovalWarning) {
    if (!ruleHits.includes("EDUCATIONAL_APPROVAL_WARNING")) ruleHits.push("EDUCATIONAL_APPROVAL_WARNING");
    falsePositiveNotes.push(
      "Educational approval warning detected; approval language was not penalized as risky instruction."
    );
  } else if (approvalLanguage) {
    addSignal(
      "RISKY_APPROVAL_REQUEST",
      "approval_risk",
      35,
      "high",
      "Project asks for broad or unlimited token approval.",
      "Requests broad or unlimited token approval"
    );
  }

  if (containsAny(text, ["claim now", "limited time", "urgent", "act fast", "exclusive reward", "hadiah eksklusif", "klaim sekarang", "segera klaim"])) {
    addSignal(
      "PROMOTIONAL_URGENCY",
      "promotional_language",
      10,
      "medium",
      "Project uses urgency or promotional claim language.",
      "Uses urgency or promotional language"
    );
  }

  if (containsAny(text, ["masukkan seed", "masukkan private key", "frasa pemulihan", "verifikasi dompet", "klaim sekarang", "hadiah eksklusif"])) {
    addSignal(
      "INDONESIAN_SCAM_PHRASE",
      "promotional_language",
      20,
      "high",
      "Input contains Indonesian scam-like phrase.",
      "Contains Indonesian scam-like phrase"
    );
  }

  if (!input.token_contract) {
    addSignal(
      "MISSING_TOKEN_CONTRACT",
      "token_metadata",
      10,
      "low",
      "Token contract is missing.",
      "No token contract provided"
    );
  }

  if (!input.social_links.length) {
    addSignal(
      "MISSING_SOCIAL_LINKS",
      "social_proof",
      10,
      "low",
      "Social links are missing.",
      "No social links provided"
    );
  }

  if (!input.chain) {
    addSignal(
      "UNKNOWN_CHAIN",
      "chain_metadata",
      5,
      "low",
      "Chain is missing.",
      "Chain is missing or unknown"
    );
  } else {
    const chainLower = input.chain.toLowerCase();
    const known = KNOWN_CHAINS.some((chain) => chainLower.includes(chain));
    if (known) {
      if (!ruleHits.includes("KNOWN_CHAIN_DETECTED")) ruleHits.push("KNOWN_CHAIN_DETECTED");
    } else {
      addSignal(
        "UNKNOWN_CHAIN",
        "chain_metadata",
        10,
        "low",
        "Chain is not in the known chain list.",
        "Unknown or unsupported chain"
      );
    }
  }

  const inputQuality = buildInputQuality(input);
  const finalScore = Math.max(0, Math.min(100, riskScore));
  const riskLevel = getRiskLevel(finalScore);

  return {
    service: SERVICE,
    version: VERSION,
    risk_score: finalScore,
    risk_level: riskLevel,
    verdict: getVerdict(finalScore),
    red_flags: redFlags,
    safe_actions: safeActions,
    summary:
      redFlags.length === 0
        ? "No major heuristic red flags were detected in the provided input."
        : `The analysis detected ${redFlags.length} heuristic risk signal(s).`,
    rule_hits: ruleHits,
    score_breakdown: scoreBreakdown,
    input_quality: inputQuality,
    confidence_note: CONFIDENCE_NOTE,
    false_positive_notes: falsePositiveNotes
  };
}

function scoreMatches(result, min, max, level) {
  return result.risk_score >= min && result.risk_score <= max && result.risk_level === level;
}

function hasRules(result, rules) {
  return rules.every((rule) => result.rule_hits.includes(rule));
}

function runTestPack() {
  const tests = [
    {
      id: "TC01",
      name: "Legit low-risk project",
      input: {
        project_name: "Legit Community Rewards",
        official_url: "https://legit.example.com",
        description: "Community rewards information page with educational safety notes.",
        required_tasks: ["read docs"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/legit"]
      },
      check: (r) => scoreMatches(r, 0, 10, "low")
    },
    {
      id: "TC02",
      name: "Non-HTTPS URL",
      input: {
        project_name: "HTTP Claim",
        official_url: "http://example.com",
        description: "Simple claim page.",
        required_tasks: ["read page"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/example"]
      },
      check: (r) => hasRules(r, ["NON_HTTPS_URL"]) && scoreMatches(r, 20, 40, "medium")
    },
    {
      id: "TC03",
      name: "Wallet connect request",
      input: {
        project_name: "Wallet Claim",
        official_url: "https://wallet-claim.example.com",
        description: "Connect wallet to check eligibility.",
        required_tasks: ["connect wallet"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/example"]
      },
      check: (r) => hasRules(r, ["WALLET_CONNECT_REQUEST"]) && r.risk_level === "high"
    },
    {
      id: "TC04",
      name: "Sign message request",
      input: {
        project_name: "Sign Message Airdrop",
        official_url: "https://example-airdrop.com",
        description: "Claim free tokens by connecting your wallet and signing a message.",
        required_tasks: ["connect wallet", "sign message"],
        chain: "Base",
        token_contract: "",
        social_links: ["https://twitter.com/example"]
      },
      check: (r) => hasRules(r, ["WALLET_CONNECT_REQUEST", "SIGN_MESSAGE_REQUEST"]) && r.risk_level === "high"
    },
    {
      id: "TC05",
      name: "Seed phrase request",
      input: {
        project_name: "Seed Claim",
        official_url: "https://claim.example.com",
        description: "Enter your seed phrase to claim.",
        required_tasks: ["seed phrase"],
        chain: "Base",
        token_contract: "",
        social_links: []
      },
      check: (r) => hasRules(r, ["SEED_PHRASE_REQUEST"]) && r.risk_level === "critical"
    },
    {
      id: "TC06",
      name: "Private key request",
      input: {
        project_name: "Private Key Claim",
        official_url: "https://claim.example.com",
        description: "Masukkan private key untuk klaim.",
        required_tasks: ["private key"],
        chain: "Base",
        token_contract: "",
        social_links: []
      },
      check: (r) => hasRules(r, ["PRIVATE_KEY_REQUEST"]) && r.risk_level === "critical"
    },
    {
      id: "TC07",
      name: "Recovery phrase request",
      input: {
        project_name: "Recovery Claim",
        official_url: "https://claim.example.com",
        description: "Enter recovery phrase to verify.",
        required_tasks: ["recovery phrase"],
        chain: "Base",
        token_contract: "",
        social_links: []
      },
      check: (r) => hasRules(r, ["SEED_PHRASE_REQUEST"]) && r.risk_level === "critical"
    },
    {
      id: "TC08",
      name: "Risky approval request",
      input: {
        project_name: "Approval Claim",
        official_url: "https://claim.example.com",
        description: "Connect wallet and approve unlimited spending.",
        required_tasks: ["connect wallet", "approve unlimited spending"],
        chain: "Base",
        token_contract: "",
        social_links: ["https://twitter.com/example"]
      },
      check: (r) => hasRules(r, ["RISKY_APPROVAL_REQUEST"]) && r.risk_level === "critical"
    },
    {
      id: "TC09",
      name: "Educational approval warning",
      input: {
        project_name: "Safety Education",
        official_url: "https://safety.example.com",
        description: "Do not approve unlimited spending. This is an educational warning.",
        required_tasks: ["read safety guide"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/safety"]
      },
      check: (r) => r.false_positive_notes.length > 0 && !r.rule_hits.includes("RISKY_APPROVAL_REQUEST")
    },
    {
      id: "TC10",
      name: "zkSync false-positive protection",
      input: {
        project_name: "zkSync Project",
        official_url: "https://zksyncproject.com",
        description: "Educational zkSync ecosystem project.",
        required_tasks: ["read docs"],
        chain: "zkSync",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/zksync"]
      },
      check: (r) => r.risk_level === "low" && r.false_positive_notes.length > 0
    },
    {
      id: "TC11",
      name: "Unknown chain",
      input: {
        project_name: "Unknown Chain Drop",
        official_url: "https://unknown.example.com",
        description: "Airdrop on a new chain.",
        required_tasks: ["read docs"],
        chain: "MysteryChain",
        token_contract: "",
        social_links: []
      },
      check: (r) => hasRules(r, ["UNKNOWN_CHAIN"]) && r.risk_level === "medium"
    },
    {
      id: "TC12",
      name: "Missing official URL",
      input: {
        project_name: "Missing URL",
        official_url: "",
        description: "Project has no official URL.",
        required_tasks: ["read docs"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/example"]
      },
      check: (r) => hasRules(r, ["MISSING_OFFICIAL_URL"]) && r.risk_level === "low"
    },
    {
      id: "TC13",
      name: "High-risk domain keyword",
      input: {
        project_name: "Wallet Login",
        official_url: "https://wallet-login-verify.example.com",
        description: "Check eligibility.",
        required_tasks: ["read docs"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/example"]
      },
      check: (r) => hasRules(r, ["HIGH_RISK_DOMAIN_KEYWORD"]) && r.risk_level === "medium"
    },
    {
      id: "TC14",
      name: "Indonesian scam phrase",
      input: {
        project_name: "Klaim Token",
        official_url: "https://klaim.example.com",
        description: "Klaim sekarang dan masukkan seed untuk hadiah eksklusif.",
        required_tasks: ["masukkan seed"],
        chain: "Base",
        token_contract: "",
        social_links: []
      },
      check: (r) => hasRules(r, ["INDONESIAN_SCAM_PHRASE", "SEED_PHRASE_REQUEST"]) && r.risk_level === "critical"
    },
    {
      id: "TC15",
      name: "Promotional urgency",
      input: {
        project_name: "Limited Reward",
        official_url: "https://reward.example.com",
        description: "Claim now for a limited time community reward.",
        required_tasks: ["read announcement"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/example"]
      },
      check: (r) => hasRules(r, ["PROMOTIONAL_URGENCY"]) && r.risk_level === "low"
    },
    {
      id: "TC16",
      name: "Missing token and social links",
      input: {
        project_name: "Sparse Project",
        official_url: "https://sparse.example.com",
        description: "Minimal information page.",
        required_tasks: ["read docs"],
        chain: "Base",
        token_contract: "",
        social_links: []
      },
      check: (r) => hasRules(r, ["MISSING_TOKEN_CONTRACT", "MISSING_SOCIAL_LINKS"]) && r.risk_level === "low"
    },
    {
      id: "TC17",
      name: "Wallet verification",
      input: {
        project_name: "Verify Wallet Claim",
        official_url: "https://verify.example.com",
        description: "Verify wallet to claim.",
        required_tasks: ["verify wallet"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/example"]
      },
      check: (r) => hasRules(r, ["WALLET_VERIFY_REQUEST", "HIGH_RISK_DOMAIN_KEYWORD"]) && r.risk_level === "high"
    },
    {
      id: "TC18",
      name: "Wallet sync phrase",
      input: {
        project_name: "Wallet Sync",
        official_url: "https://example.com",
        description: "Sync wallet to activate claim.",
        required_tasks: ["sync wallet"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/example"]
      },
      check: (r) => hasRules(r, ["WALLET_SYNC_REQUEST"]) && r.risk_level === "medium"
    },
    {
      id: "TC19",
      name: "New known chain zkSync",
      input: {
        project_name: "zkSync Airdrop Education",
        official_url: "https://zksyncproject.com",
        description: "Education-only project information.",
        required_tasks: ["read docs"],
        chain: "zkSync",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/zksync"]
      },
      check: (r) => r.risk_level === "low" && !r.rule_hits.includes("WALLET_SYNC_REQUEST")
    },
    {
      id: "TC20",
      name: "No wallet request with safety docs",
      input: {
        project_name: "Safety Docs",
        official_url: "https://docs.example.com",
        description: "Do not share private keys or seed phrases. Read safety docs only.",
        required_tasks: ["read docs"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/docs"]
      },
      check: (r) => r.risk_level === "low" && !r.rule_hits.includes("PRIVATE_KEY_REQUEST")
    },
    {
      id: "TC21",
      name: "score_breakdown exists",
      input: SAMPLE_INPUT,
      check: (r) => Array.isArray(r.score_breakdown) && r.score_breakdown.length > 0
    },
    {
      id: "TC22",
      name: "rule_hits include wallet and signing",
      input: SAMPLE_INPUT,
      check: (r) => hasRules(r, ["WALLET_CONNECT_REQUEST", "SIGN_MESSAGE_REQUEST"])
    },
    {
      id: "TC23",
      name: "input_quality detects missing token_contract",
      input: SAMPLE_INPUT,
      check: (r) =>
        r.input_quality &&
        Array.isArray(r.input_quality.missing_fields) &&
        r.input_quality.missing_fields.includes("token_contract")
    },
    {
      id: "TC24",
      name: "false_positive_notes for educational approval",
      input: {
        project_name: "Approval Safety",
        official_url: "https://safety.example.com",
        description: "Do not approve unlimited spending.",
        required_tasks: ["read docs"],
        chain: "Base",
        token_contract: "0x1234567890abcdef",
        social_links: ["https://twitter.com/safety"]
      },
      check: (r) => r.false_positive_notes.length > 0 && !r.rule_hits.includes("RISKY_APPROVAL_REQUEST")
    },
    {
      id: "TC25",
      name: "confidence_note exists",
      input: SAMPLE_INPUT,
      check: (r) =>
        typeof r.confidence_note === "string" &&
        r.confidence_note.toLowerCase().includes("heuristic") &&
        r.confidence_note.toLowerCase().includes("false positives")
    }
  ];

  return tests.map((test) => {
    const result = scoreAirdrop(test.input);
    let passed = false;
    try {
      passed = Boolean(test.check(result));
    } catch (_) {
      passed = false;
    }

    return {
      id: test.id,
      name: test.name,
      passed,
      actual_score: result.risk_score,
      actual_level: result.risk_level,
      actual_rule_hits: result.rule_hits,
      actual_flags: result.red_flags
    };
  });
}

const LANDING_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEXUS-X ARIA</title><style>body{font-family:Arial,sans-serif;margin:2rem;line-height:1.5;text-align:center}a{display:inline-block;margin:.4rem;padding:.55rem .9rem;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px}footer{margin-top:2rem;color:#555;font-size:.9rem}</style></head><body><h1>NEXUS-X ARIA</h1><h2>Airdrop Risk Intelligence API</h2><p>Version ${VERSION} — Explainable Scoring for transparent heuristic airdrop risk analysis.</p><p><a href="/try">Try It</a><a href="/examples">Examples</a><a href="/docs">Docs</a><a href="/test-pack">Test Pack</a><a href="/openapi.json">OpenAPI</a><a href="/health">Health</a></p><footer>Heuristic analysis only. Not financial advice. Not a guarantee of safety.</footer></body></html>`;

const DOCS_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEXUS-X ARIA Docs</title><style>body{font-family:Arial,sans-serif;margin:2rem;line-height:1.55;max-width:900px}pre{background:#f6f8fa;padding:1rem;overflow-x:auto;border-radius:6px}code{font-family:monospace}a{color:#2563eb}</style></head><body><h1>NEXUS-X ARIA Documentation</h1><p><strong>Version:</strong> ${VERSION}</p><p>NEXUS-X ARIA provides transparent heuristic airdrop risk scoring.</p><h2>Active Endpoints</h2><ul><li>GET /</li><li>GET /health</li><li>GET /demo</li><li>GET /try</li><li>GET /examples</li><li>GET /docs</li><li>GET /test-pack</li><li>GET /openapi.json</li><li>POST /score-airdrop</li></ul><h2>v0.2.0 Explainable Scoring</h2><p>The scoring response now includes <code>rule_hits</code>, <code>score_breakdown</code>, <code>input_quality</code>, <code>confidence_note</code>, and <code>false_positive_notes</code>.</p><h2>Safety</h2><p>Never enter seed phrases, private keys, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials.</p></body></html>`;

const EXAMPLES_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEXUS-X ARIA Examples</title><style>body{font-family:Arial,sans-serif;margin:2rem;line-height:1.55;max-width:950px}.case{border:1px solid #ddd;border-radius:8px;padding:1rem;margin:1rem 0}pre{background:#f6f8fa;padding:1rem;overflow-x:auto;border-radius:6px}</style></head><body><h1>NEXUS-X ARIA Examples</h1><p><strong>Version:</strong> ${VERSION}</p><p>Examples are educational and do not guarantee safety.</p><div class="case"><h2>Low Risk Example</h2><pre>{"project_name":"Legit Community Rewards","official_url":"https://legit.example.com","required_tasks":["read docs"],"chain":"Base"}</pre></div><div class="case"><h2>High Risk Example</h2><pre>{"project_name":"Sign Message Airdrop","description":"Claim by connecting wallet and signing a message."}</pre></div><div class="case"><h2>Critical Risk Example</h2><pre>{"project_name":"Phishing Airdrop","description":"Enter your seed phrase to claim."}</pre></div><div class="case"><h2>False Positive Fixed: zkSync</h2><p>Generic sync substring is not treated as a domain risk by itself.</p></div><div class="case"><h2>False Positive Avoided: Approval Warning</h2><p>Educational warnings like “Do not approve unlimited spending” are not treated as risky approval instructions.</p></div></body></html>`;

const TRY_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEXUS-X ARIA Try Page</title><style>body{font-family:Arial,sans-serif;margin:2rem;line-height:1.5;max-width:900px}label{display:block;margin-top:1rem;font-weight:bold}input,textarea{width:100%;padding:.65rem;border:1px solid #ccc;border-radius:6px}textarea{min-height:90px}button{margin-top:1rem;padding:.75rem 1.1rem;border:0;border-radius:6px;background:#2563eb;color:#fff;font-weight:bold}.warning{background:#fff3cd;border:1px solid #ffeeba;padding:1rem;border-radius:6px}.result{white-space:pre-wrap;background:#f6f8fa;padding:1rem;border-radius:6px;margin-top:1rem}</style></head><body><h1>NEXUS-X ARIA Try Page</h1><p><strong>Version:</strong> ${VERSION}</p><div class="warning"><strong>Safety warning:</strong> Do not enter private keys, seed phrases, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials.</div><form id="f"><label>Project Name</label><input id="project_name" value="Example Airdrop"><label>Official URL</label><input id="official_url" value="https://example-airdrop.com"><label>Description</label><textarea id="description">Claim free tokens by connecting your wallet and signing a message.</textarea><label>Required Tasks, one per line</label><textarea id="required_tasks">connect wallet
sign message</textarea><label>Chain</label><input id="chain" value="Base"><label>Token Contract</label><input id="token_contract" value=""><label>Social Links, one per line</label><textarea id="social_links">https://twitter.com/example</textarea><button type="submit">Analyze</button></form><div id="result" class="result">Result will appear here.</div><script>document.getElementById("f").addEventListener("submit",async(e)=>{e.preventDefault();const payload={project_name:project_name.value,official_url:official_url.value,description:description.value,required_tasks:required_tasks.value.split("\\n").filter(Boolean),chain:chain.value,token_contract:token_contract.value,social_links:social_links.value.split("\\n").filter(Boolean)};const res=await fetch("/score-airdrop",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});document.getElementById("result").textContent=JSON.stringify(await res.json(),null,2);});</script></body></html>`;

function getOpenApiSpec() {
  return {
    openapi: "3.0.1",
    info: {
      title: "NEXUS-X ARIA API",
      version: VERSION,
      description: "Transparent heuristic airdrop risk scoring API with explainable scoring."
    },
    servers: [
      { url: "https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev" }
    ],
    paths: {
      "/": { get: { summary: "Landing page", responses: { "200": { description: "HTML landing page" } } } },
      "/health": { get: { summary: "Health check", responses: { "200": { description: "Service health" } } } },
      "/demo": { get: { summary: "Demo analysis", responses: { "200": { description: "Demo JSON response" } } } },
      "/try": { get: { summary: "Browser try page", responses: { "200": { description: "HTML try page" } } } },
      "/examples": { get: { summary: "Examples page", responses: { "200": { description: "HTML examples page" } } } },
      "/docs": { get: { summary: "Documentation page", responses: { "200": { description: "HTML docs page" } } } },
      "/test-pack": { get: { summary: "Internal test pack", responses: { "200": { description: "Test pack results" } } } },
      "/openapi.json": { get: { summary: "OpenAPI specification", responses: { "200": { description: "OpenAPI JSON" } } } },
      "/score-airdrop": {
        post: {
          summary: "Score airdrop risk",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ScoreRequest" },
                example: SAMPLE_INPUT
              }
            }
          },
          responses: {
            "200": {
              description: "Risk score response",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ScoreResponse" }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        ScoreRequest: {
          type: "object",
          properties: {
            project_name: { type: "string" },
            official_url: { type: "string" },
            description: { type: "string" },
            required_tasks: { type: "array", items: { type: "string" } },
            chain: { type: "string" },
            token_contract: { type: "string" },
            social_links: { type: "array", items: { type: "string" } }
          }
        },
        ScoreBreakdownItem: {
          type: "object",
          properties: {
            rule_id: { type: "string" },
            category: { type: "string" },
            points: { type: "number" },
            severity: { type: "string", enum: ["low", "medium", "high", "critical"] },
            reason: { type: "string" }
          }
        },
        InputQuality: {
          type: "object",
          properties: {
            level: { type: "string", enum: ["complete", "partial", "weak"] },
            missing_fields: { type: "array", items: { type: "string" } },
            notes: { type: "array", items: { type: "string" } }
          }
        },
        ScoreResponse: {
          type: "object",
          properties: {
            service: { type: "string" },
            version: { type: "string" },
            risk_score: { type: "number" },
            risk_level: { type: "string", enum: ["low", "medium", "high", "critical"] },
            verdict: { type: "string" },
            red_flags: { type: "array", items: { type: "string" } },
            safe_actions: { type: "array", items: { type: "string" } },
            summary: { type: "string" },
            rule_hits: { type: "array", items: { type: "string" } },
            score_breakdown: { type: "array", items: { $ref: "#/components/schemas/ScoreBreakdownItem" } },
            input_quality: { $ref: "#/components/schemas/InputQuality" },
            confidence_note: { type: "string" },
            false_positive_notes: { type: "array", items: { type: "string" } }
          }
        }
      }
    }
  };
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") return jsonResponse({ ok: true });

  if (method === "GET" && url.pathname === "/") return htmlResponse(LANDING_HTML);
  if (method === "GET" && url.pathname === "/health") {
    return jsonResponse({ status: "ok", service: SERVICE, version: VERSION });
  }
  if (method === "GET" && url.pathname === "/demo") {
    return jsonResponse({ demo: true, service: SERVICE, version: VERSION, sample_input: SAMPLE_INPUT, result: scoreAirdrop(SAMPLE_INPUT) });
  }
  if (method === "GET" && url.pathname === "/try") return htmlResponse(TRY_HTML);
  if (method === "GET" && url.pathname === "/examples") return htmlResponse(EXAMPLES_HTML);
  if (method === "GET" && url.pathname === "/docs") return htmlResponse(DOCS_HTML);
  if (method === "GET" && url.pathname === "/test-pack") {
    const results = runTestPack();
    return jsonResponse({
      service: SERVICE,
      version: VERSION,
      tests: results,
      total: results.length,
      passed: results.filter((t) => t.passed).length,
      failed: results.filter((t) => !t.passed).length
    });
  }
  if (method === "GET" && url.pathname === "/openapi.json") return jsonResponse(getOpenApiSpec());

  if (method === "POST" && url.pathname === "/score-airdrop") {
    let payload = {};
    try {
      payload = await request.json();
    } catch (_) {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }
    return jsonResponse(scoreAirdrop(payload));
  }

  return jsonResponse({ error: "Not found", service: SERVICE, version: VERSION }, 404);
}

export default {
  async fetch(request) {
    return handleRequest(request);
  }
};