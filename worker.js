// NEXUS-X ARIA v0.1.9 – Cloudflare Workers single-file
// Scoring improvement release: tiered domain risk, broader scam phrase detection,
// Indonesian scam phrases, approval-warning context handling, expanded test pack.

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

const VERSION = "0.1.9";
const KNOWN_CHAINS = [
  "ethereum",
  "arbitrum",
  "polygon",
  "optimism",
  "base",
  "binance smart chain",
  "bsc",
  "solana",
  "aptos",
  "sui",
  "scroll",
  "avalanche",
  "sepolia",
  "zksync",
  "linea",
  "blast",
  "mantle",
  "starknet",
  "near",
  "ton"
];
const DOMAIN_KEYWORDS_HIGH = [
  "login",
  "verify",
  "wallet",
  "claimfree",
  "claim-wallet",
  "wallet-verify",
  "connect-wallet",
  "restore",
  "rectify"
];
const DOMAIN_KEYWORDS_MEDIUM = [
  "bonus",
  "giveaway",
  "free",
  "claim",
  "reward"
];
const DOMAIN_KEYWORDS_LOW = [
  "airdrop"
];
const RECOVERY_SECRET_PHRASES = [
  "seed phrase",
  "private key",
  "recovery phrase",
  "secret phrase",
  "mnemonic",
  "restore wallet",
  "import wallet",
  "masukkan seed",
  "masukkan private key",
  "frasa pemulihan",
  "kunci pribadi",
  "kata sandi dompet"
];
const WALLET_CONNECTION_PHRASES = [
  "connect wallet",
  "connect your wallet",
  "link wallet",
  "wallet connect",
  "hubungkan dompet",
  "sambungkan dompet"
];
const WALLET_VERIFICATION_PHRASES = [
  "verify wallet",
  "validate wallet",
  "wallet verification",
  "sync wallet",
  "rectify wallet",
  "verifikasi dompet",
  "validasi dompet",
  "sinkronkan dompet"
];
const SIGNING_PHRASES = [
  "sign message",
  "sign transaction",
  "sign a message",
  "sign to claim",
  "tanda tangani pesan",
  "tanda tangan transaksi"
];
const RISKY_APPROVAL_PHRASES = [
  "approve unlimited",
  "unlimited approval",
  "approve spending",
  "permit spending",
  "approve token spending",
  "set approval for all",
  "approve unlimited token spending"
];
const APPROVAL_WARNING_PHRASES = [
  "do not approve",
  "don't approve",
  "avoid approval",
  "never approve",
  "jangan approve",
  "jangan setujui",
  "hindari approval"
];
const PROMO_KEYWORDS = [
  "guaranteed",
  "urgent",
  "free tokens",
  "limited time",
  "100% safe",
  "claim now",
  "act now",
  "exclusive reward",
  "guaranteed reward",
  "gratis token",
  "klaim sekarang",
  "waktu terbatas",
  "aman 100%",
  "hadiah eksklusif"
];

const SAMPLE_INPUT = {
  "project_name": "Demo Airdrop",
  "official_url": "https://demo-airdrop.com",
  "description": "Claim free tokens by connecting your wallet and signing a message.",
  "required_tasks": [
    "connect wallet",
    "join Discord",
    "sign message"
  ],
  "chain": "Base",
  "token_contract": "",
  "social_links": [
    "https://twitter.com/demo",
    "https://discord.gg/demo"
  ]
};
const TEST_CASES = [
  {
    "id": "TC01",
    "name": "Low risk – Basic",
    "input": {
      "project_name": "Legit Airdrop",
      "official_url": "https://legitproject.com",
      "description": "Complete simple social tasks to earn loyalty points.",
      "required_tasks": [
        "follow Twitter",
        "join Discord"
      ],
      "chain": "Ethereum",
      "token_contract": "0x1234",
      "social_links": [
        "https://twitter.com/legit",
        "https://discord.gg/legit"
      ]
    },
    "expected_score_min": 0,
    "expected_score_max": 10,
    "expected_level": "low",
    "expected_flags": []
  },
  {
    "id": "TC02",
    "name": "Medium risk – Connect wallet & non-HTTPS",
    "input": {
      "project_name": "Wallet Connect Airdrop",
      "official_url": "http://walletairdrop.com",
      "description": "Connect your wallet to qualify.",
      "required_tasks": [
        "connect wallet"
      ],
      "chain": "Arbitrum",
      "token_contract": "0xABC",
      "social_links": [
        "https://twitter.com/airdrop"
      ]
    },
    "expected_score_min": 50,
    "expected_score_max": 60,
    "expected_level": "medium",
    "expected_flags": [
      "Official URL contains high-risk wallet or login keyword",
      "Official URL not HTTPS",
      "Requires wallet connection"
    ]
  },
  {
    "id": "TC03",
    "name": "High risk – Sign message & missing contract",
    "input": {
      "project_name": "Sign Message Airdrop",
      "official_url": "http://free-airdrop.com",
      "description": "Sign a message to prove eligibility.",
      "required_tasks": [
        "sign message"
      ],
      "chain": "UnknownChain",
      "token_contract": "",
      "social_links": [
        "https://twitter.com/freeairdrop"
      ]
    },
    "expected_score_min": 65,
    "expected_score_max": 75,
    "expected_level": "high",
    "expected_flags": [
      "Official URL contains promotional claim keyword",
      "Official URL not HTTPS",
      "Requires signing a message or transaction",
      "No token contract provided",
      "Blockchain chain is not widely recognized"
    ]
  },
  {
    "id": "TC04",
    "name": "Critical risk – Seed phrase & approvals",
    "input": {
      "project_name": "Phishing Airdrop",
      "official_url": "https://scamlogin-airdrop.com",
      "description": "Enter your seed phrase and approve unlimited token spending to claim.",
      "required_tasks": [
        "connect wallet",
        "sign message"
      ],
      "chain": "Ethereum",
      "token_contract": "",
      "social_links": []
    },
    "expected_score_min": 95,
    "expected_score_max": 100,
    "expected_level": "critical",
    "expected_flags": [
      "Official URL contains high-risk wallet or login keyword",
      "Description asks for wallet recovery secrets",
      "Requires wallet connection",
      "Requires signing a message or transaction",
      "Mentions risky token approvals or spending permissions",
      "No token contract provided",
      "No social links provided"
    ]
  },
  {
    "id": "TC05",
    "name": "Non-HTTPS only",
    "input": {
      "project_name": "HTTP Airdrop",
      "official_url": "http://project.com",
      "description": "Complete social tasks.",
      "required_tasks": [
        "follow Twitter"
      ],
      "chain": "Base",
      "token_contract": "0xDEF",
      "social_links": [
        "https://twitter.com/project"
      ]
    },
    "expected_score_min": 5,
    "expected_score_max": 15,
    "expected_level": "low",
    "expected_flags": [
      "Official URL not HTTPS"
    ]
  },
  {
    "id": "TC06",
    "name": "Missing official_url",
    "input": {
      "project_name": "No URL Airdrop",
      "official_url": "",
      "description": "Nothing suspicious here.",
      "required_tasks": [
        "join Discord"
      ],
      "chain": "Optimism",
      "token_contract": "0x123",
      "social_links": [
        "https://twitter.com/nourl"
      ]
    },
    "expected_score_min": 5,
    "expected_score_max": 15,
    "expected_level": "low",
    "expected_flags": [
      "Official URL missing"
    ]
  },
  {
    "id": "TC07",
    "name": "Missing social links",
    "input": {
      "project_name": "No Social Links",
      "official_url": "https://valid.com",
      "description": "Safe description.",
      "required_tasks": [
        "follow Twitter"
      ],
      "chain": "Ethereum",
      "token_contract": "0x987",
      "social_links": []
    },
    "expected_score_min": 5,
    "expected_score_max": 15,
    "expected_level": "low",
    "expected_flags": [
      "No social links provided"
    ]
  },
  {
    "id": "TC08",
    "name": "Unknown chain",
    "input": {
      "project_name": "Unknown Chain Drop",
      "official_url": "https://site.com",
      "description": "Safe.",
      "required_tasks": [
        "follow Twitter"
      ],
      "chain": "Klaytn",
      "token_contract": "0xABC",
      "social_links": [
        "https://twitter.com/site"
      ]
    },
    "expected_score_min": 0,
    "expected_score_max": 10,
    "expected_level": "low",
    "expected_flags": [
      "Blockchain chain is not widely recognized"
    ]
  },
  {
    "id": "TC09",
    "name": "Missing token contract",
    "input": {
      "project_name": "No Contract",
      "official_url": "https://site.com",
      "description": "Safe.",
      "required_tasks": [
        "follow Twitter"
      ],
      "chain": "Polygon",
      "token_contract": "",
      "social_links": [
        "https://twitter.com/site"
      ]
    },
    "expected_score_min": 10,
    "expected_score_max": 20,
    "expected_level": "low",
    "expected_flags": [
      "No token contract provided"
    ]
  },
  {
    "id": "TC10",
    "name": "Promotional language only",
    "input": {
      "project_name": "Promo Airdrop",
      "official_url": "https://promo.com",
      "description": "Get free tokens now! Limited time offer.",
      "required_tasks": [
        "join Discord"
      ],
      "chain": "Base",
      "token_contract": "0x1111",
      "social_links": [
        "https://twitter.com/promo"
      ]
    },
    "expected_score_min": 15,
    "expected_score_max": 25,
    "expected_level": "low",
    "expected_flags": [
      "Description contains promotional or urgency language"
    ]
  },
  {
    "id": "TC11",
    "name": "Risky approvals",
    "input": {
      "project_name": "Approval Airdrop",
      "official_url": "https://approval.com",
      "description": "Approve unlimited token spending to claim rewards.",
      "required_tasks": [
        "follow Twitter"
      ],
      "chain": "Arbitrum",
      "token_contract": "0x222",
      "social_links": [
        "https://twitter.com/approval"
      ]
    },
    "expected_score_min": 20,
    "expected_score_max": 30,
    "expected_level": "low",
    "expected_flags": [
      "Mentions risky token approvals or spending permissions"
    ]
  },
  {
    "id": "TC12",
    "name": "Legit airdrop domain only",
    "input": {
      "project_name": "Legit Airdrop Domain",
      "official_url": "https://project-airdrop.com",
      "description": "Complete simple community tasks for eligibility.",
      "required_tasks": [
        "follow Twitter"
      ],
      "chain": "Base",
      "token_contract": "0x333",
      "social_links": [
        "https://twitter.com/project"
      ]
    },
    "expected_score_min": 0,
    "expected_score_max": 10,
    "expected_level": "low",
    "expected_flags": [
      "Official URL contains airdrop keyword"
    ]
  },
  {
    "id": "TC13",
    "name": "High-risk wallet verification domain",
    "input": {
      "project_name": "Wallet Verify Claim",
      "official_url": "https://wallet-verify-claim.com",
      "description": "Verify wallet to access your reward allocation.",
      "required_tasks": [
        "join Telegram"
      ],
      "chain": "Base",
      "token_contract": "0x444",
      "social_links": [
        "https://twitter.com/verify"
      ]
    },
    "expected_score_min": 45,
    "expected_score_max": 55,
    "expected_level": "medium",
    "expected_flags": [
      "Official URL contains high-risk wallet or login keyword",
      "Mentions wallet verification or synchronization"
    ]
  },
  {
    "id": "TC14",
    "name": "Approval warning educational text",
    "input": {
      "project_name": "Education Page",
      "official_url": "https://education.com",
      "description": "Do not approve unlimited spending. Educational warning only.",
      "required_tasks": [
        "read guide"
      ],
      "chain": "Ethereum",
      "token_contract": "0x555",
      "social_links": [
        "https://twitter.com/education"
      ]
    },
    "expected_score_min": 0,
    "expected_score_max": 5,
    "expected_level": "low",
    "expected_flags": []
  },
  {
    "id": "TC15",
    "name": "Indonesian seed phrase scam",
    "input": {
      "project_name": "Klaim Token",
      "official_url": "https://valid.com",
      "description": "Masukkan seed phrase untuk klaim sekarang hadiah eksklusif.",
      "required_tasks": [
        "hubungkan dompet"
      ],
      "chain": "Base",
      "token_contract": "",
      "social_links": []
    },
    "expected_score_min": 95,
    "expected_score_max": 100,
    "expected_level": "critical",
    "expected_flags": [
      "Description asks for wallet recovery secrets",
      "Requires wallet connection",
      "Description contains promotional or urgency language",
      "No token contract provided",
      "No social links provided"
    ]
  },
  {
    "id": "TC16",
    "name": "Indonesian wallet verification scam",
    "input": {
      "project_name": "Verifikasi Hadiah",
      "official_url": "https://verifikasi-wallet.com",
      "description": "Verifikasi dompet untuk klaim sekarang hadiah eksklusif.",
      "required_tasks": [
        "join Telegram"
      ],
      "chain": "Base",
      "token_contract": "0x666",
      "social_links": [
        "https://twitter.com/verifikasi"
      ]
    },
    "expected_score_min": 65,
    "expected_score_max": 75,
    "expected_level": "high",
    "expected_flags": [
      "Official URL contains high-risk wallet or login keyword",
      "Mentions wallet verification or synchronization",
      "Description contains promotional or urgency language"
    ]
  },
  {
    "id": "TC17",
    "name": "Claim now urgency phrase",
    "input": {
      "project_name": "Urgency Airdrop",
      "official_url": "https://urgency.com",
      "description": "Claim now. Limited time reward.",
      "required_tasks": [
        "join Discord"
      ],
      "chain": "Base",
      "token_contract": "0x777",
      "social_links": [
        "https://twitter.com/urgency"
      ]
    },
    "expected_score_min": 15,
    "expected_score_max": 25,
    "expected_level": "low",
    "expected_flags": [
      "Description contains promotional or urgency language"
    ]
  },
  {
    "id": "TC18",
    "name": "Restore wallet phishing phrase",
    "input": {
      "project_name": "Restore Wallet Claim",
      "official_url": "https://restore-wallet.com",
      "description": "Restore wallet using your recovery phrase to claim.",
      "required_tasks": [
        "connect wallet"
      ],
      "chain": "Ethereum",
      "token_contract": "",
      "social_links": [
        "https://twitter.com/restore"
      ]
    },
    "expected_score_min": 95,
    "expected_score_max": 100,
    "expected_level": "critical",
    "expected_flags": [
      "Official URL contains high-risk wallet or login keyword",
      "Description asks for wallet recovery secrets",
      "Requires wallet connection",
      "No token contract provided"
    ]
  },
  {
    "id": "TC19",
    "name": "New known chain zkSync",
    "input": {
      "project_name": "zkSync Airdrop",
      "official_url": "https://zksyncproject.com",
      "description": "Complete simple social tasks.",
      "required_tasks": [
        "follow Twitter"
      ],
      "chain": "zkSync",
      "token_contract": "0x888",
      "social_links": [
        "https://twitter.com/zksyncproject"
      ]
    },
    "expected_score_min": 0,
    "expected_score_max": 5,
    "expected_level": "low",
    "expected_flags": []
  },
  {
    "id": "TC20",
    "name": "Invalid URL",
    "input": {
      "project_name": "Invalid URL Drop",
      "official_url": "not-a-url",
      "description": "Complete social tasks.",
      "required_tasks": [
        "follow Twitter"
      ],
      "chain": "Base",
      "token_contract": "0x999",
      "social_links": [
        "https://twitter.com/invalid"
      ]
    },
    "expected_score_min": 25,
    "expected_score_max": 35,
    "expected_level": "low",
    "expected_flags": [
      "Official URL not HTTPS",
      "Official URL is invalid or suspicious"
    ]
  }
];
const LANDING_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEXUS-X ARIA</title><style>body{font-family:Arial,sans-serif;margin:2rem;line-height:1.4;text-align:center}h1{color:#2c3e50;margin-bottom:.5em}h2{color:#34495e;margin-top:0}p{max-width:720px;margin:1rem auto}.links a{display:inline-block;margin:.5rem;padding:.55rem 1rem;background:#3498db;color:#fff;text-decoration:none;border-radius:4px}.links a:hover{background:#2980b9}footer{margin-top:2rem;font-size:.8rem;color:#555}</style></head><body><h1>NEXUS-X ARIA</h1><h2>Airdrop Risk Intelligence API</h2><p>Version ${VERSION} – transparent airdrop risk scoring for Web3 projects with improved heuristic detection and expanded examples.</p><div class="links"><a href="/try">Try It</a><a href="/demo">Demo</a><a href="/examples">Examples</a><a href="/docs">Docs</a><a href="/test-pack">Test Pack</a><a href="/openapi.json">OpenAPI Spec</a><a href="/health">Health</a></div><p>Endpoint <code>/score-airdrop</code> is available for technical integration via POST JSON.</p><footer>Disclaimer: analysis does not guarantee safety. Always do your own research. Never enter seed phrases, private keys, passwords, OTPs, or wallet credentials.</footer></body></html>`;
const DOCS_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEXUS-X ARIA Documentation</title><style>body{font-family:Arial,sans-serif;margin:2rem;line-height:1.5;max-width:850px}h1,h2{color:#2c3e50}pre{background:#f6f8fa;padding:1rem;overflow-x:auto;border-radius:4px}code{font-family:monospace}ul{padding-left:1.2rem}a{color:#2563eb}</style></head><body><h1>NEXUS-X ARIA</h1><p><strong>Version: ${VERSION}</strong></p><p><strong>Airdrop Risk Intelligence API</strong> – API ini menganalisis informasi airdrop/proyek Web3 dan mengembalikan skor risiko, level risiko, verdict, red flag, rekomendasi tindakan aman, serta ringkasan.</p><h2>Endpoint</h2><ul><li><strong>GET /</strong> – Landing.</li><li><strong>GET /health</strong> – Status dan versi.</li><li><strong>GET /demo</strong> – Demo internal.</li><li><strong>GET /try</strong> – Form browser untuk input custom.</li><li><strong>GET /examples</strong> – Contoh kasus low, medium, high, critical, false-positive fixes, dan scam Bahasa Indonesia.</li><li><strong>GET /docs</strong> – Dokumentasi HTML.</li><li><strong>GET /test-pack</strong> – Paket pengujian heuristik.</li><li><strong>GET /openapi.json</strong> – OpenAPI JSON.</li><li><strong>POST /score-airdrop</strong> – Endpoint scoring utama.</li></ul><h2>v0.1.9 Expanded Examples</h2><ul><li>Menambahkan halaman <a href="/examples">/examples</a>.</li><li>Menjelaskan contoh low, medium, high, dan critical risk.</li><li>Menjelaskan false-positive yang sudah diperbaiki, termasuk zkSync dan approval warning.</li><li>Menambahkan contoh scam Bahasa Indonesia untuk edukasi.</li><li>Scoring engine tetap sama seperti v0.1.8 hotfix; test pack tetap 20/20.</li></ul><h2>Try Page</h2><p>Coba analisis custom langsung dari browser: <a href="/try">/try</a></p><h2>OpenAPI</h2><p>Machine-readable OpenAPI specification tersedia di <code>/openapi.json</code>.</p><h2>Batasan MVP</h2><ul><li>Analisis berbasis heuristik sederhana dan dapat menghasilkan false positive/negative.</li><li>Tidak ada integrasi data eksternal atau basis data.</li><li>Semua endpoint publik tanpa autentikasi atau rate limit bawaan.</li></ul><h2>Disclaimer Keamanan</h2><p>Analisis ini bukan nasihat keuangan dan bukan jaminan keamanan. Jangan pernah membagikan private key, seed phrase, password, OTP, atau data rahasia lainnya.</p></body></html>`;
const EXAMPLES_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEXUS-X ARIA Examples</title><style>body{font-family:Arial,sans-serif;margin:2rem;line-height:1.55;max-width:950px}h1,h2,h3{color:#2c3e50}pre{background:#f6f8fa;padding:1rem;overflow-x:auto;border-radius:6px}code{font-family:monospace}.case{border:1px solid #ddd;border-radius:8px;padding:1rem;margin:1rem 0}.low{border-left:6px solid #2ecc71}.medium{border-left:6px solid #f1c40f}.high{border-left:6px solid #e67e22}.critical{border-left:6px solid #e74c3c}.note{background:#fff3cd;border:1px solid #ffeeba;padding:.8rem;border-radius:6px}.nav a{margin-right:.75rem}</style></head><body><div class="nav"><a href="/">Home</a><a href="/try">Try It</a><a href="/docs">Docs</a><a href="/test-pack">Test Pack</a></div><h1>NEXUS-X ARIA Examples</h1><p><strong>Version:</strong> ${VERSION}</p><p>Halaman ini menjelaskan contoh interpretasi hasil ARIA. Contoh ini bersifat edukatif, bukan jaminan keamanan.</p><div class="note"><strong>Safety note:</strong> Jangan pernah memasukkan private key, seed phrase, recovery phrase, password, OTP, cookie, API key, atau kredensial wallet.</div><div class="case low"><h2>1. Low Risk Example</h2><p>Contoh airdrop dengan HTTPS, chain dikenal, token contract tersedia, social links tersedia, dan tidak meminta connect wallet/sign message.</p><pre>{
  "project_name": "Legit Community Rewards",
  "official_url": "https://legitproject.com",
  "description": "Complete simple social tasks to earn loyalty points.",
  "required_tasks": ["follow Twitter", "join Discord"],
  "chain": "Ethereum",
  "token_contract": "0x1234",
  "social_links": ["https://twitter.com/legit"]
}</pre><p><strong>Interpretasi:</strong> Biasanya low risk karena tidak ada red flag besar.</p></div><div class="case medium"><h2>2. Medium Risk Example</h2><p>Contoh yang meminta wallet connection dan memakai domain/wallet keyword.</p><pre>{
  "project_name": "Wallet Verify Claim",
  "official_url": "https://wallet-verify-claim.com",
  "description": "Verify wallet to access your reward allocation.",
  "required_tasks": ["join Telegram"],
  "chain": "Base",
  "token_contract": "0x444",
  "social_links": ["https://twitter.com/verify"]
}</pre><p><strong>Interpretasi:</strong> Medium risk karena ada wallet verification dan domain high-risk keyword.</p></div><div class="case high"><h2>3. High Risk Example</h2><p>Contoh gabungan beberapa sinyal: sign message, domain claim/free, contract kosong, chain tidak dikenal.</p><pre>{
  "project_name": "Sign Message Airdrop",
  "official_url": "http://free-airdrop.com",
  "description": "Sign a message to prove eligibility.",
  "required_tasks": ["sign message"],
  "chain": "UnknownChain",
  "token_contract": "",
  "social_links": ["https://twitter.com/freeairdrop"]
}</pre><p><strong>Interpretasi:</strong> Banyak red flag sedang dapat mendorong skor ke high.</p></div><div class="case critical"><h2>4. Critical Risk Example</h2><p>Contoh sangat berbahaya karena meminta seed phrase/recovery secret atau approval berisiko.</p><pre>{
  "project_name": "Phishing Airdrop",
  "official_url": "https://scamlogin-airdrop.com",
  "description": "Enter your seed phrase and approve unlimited token spending to claim.",
  "required_tasks": ["connect wallet", "sign message"],
  "chain": "Ethereum",
  "token_contract": "",
  "social_links": []
}</pre><p><strong>Interpretasi:</strong> Critical. Permintaan seed phrase/private key harus dianggap bahaya besar.</p></div><div class="case critical"><h2>5. Indonesian Scam Example</h2><pre>{
  "project_name": "Klaim Token",
  "official_url": "https://valid.com",
  "description": "Masukkan seed phrase untuk klaim sekarang hadiah eksklusif.",
  "required_tasks": ["hubungkan dompet"],
  "chain": "Base",
  "token_contract": "",
  "social_links": []
}</pre><p><strong>Interpretasi:</strong> ARIA v0.1.8+ mulai mendeteksi frasa scam Bahasa Indonesia seperti <code>masukkan seed</code>, <code>klaim sekarang</code>, dan <code>hadiah eksklusif</code>.</p></div><div class="case low"><h2>6. False Positive Fixed: zkSync</h2><p>Kasus lama: <code>zksyncproject.com</code> mengandung substring <code>sync</code>, sehingga pernah salah kena high-risk domain flag.</p><p><strong>Perbaikan:</strong> keyword domain umum <code>sync</code> dihapus. Frasa berbahaya <code>sync wallet</code> tetap dideteksi di level teks.</p></div><div class="case low"><h2>7. False Positive Avoided: Approval Warning</h2><p>Kalimat seperti <code>Do not approve unlimited spending</code> adalah peringatan edukatif, bukan instruksi scam.</p><p><strong>Perbaikan:</strong> ARIA mengenali konteks warning seperti <code>do not approve</code>, <code>jangan approve</code>, dan <code>hindari approval</code>.</p></div><h2>Next Step</h2><p>Gunakan <a href="/try">/try</a> untuk mencoba contoh Anda sendiri.</p></body></html>`;
const TRY_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEXUS-X ARIA Try Page</title><style>body{font-family:Arial,sans-serif;margin:2rem;line-height:1.5;max-width:900px}h1,h2{color:#2c3e50}label{display:block;margin-top:1rem;font-weight:bold}input,textarea{width:100%;padding:.6rem;margin-top:.25rem;box-sizing:border-box;border:1px solid #ccc;border-radius:4px;font-family:Arial,sans-serif}textarea{min-height:90px}button{margin-top:1rem;padding:.7rem 1.2rem;border:0;border-radius:4px;background:#3498db;color:white;font-weight:bold;cursor:pointer}.warning{background:#fff3cd;border:1px solid #ffeeba;padding:.8rem;border-radius:4px}.result{margin-top:1.5rem;padding:1rem;border-radius:6px;background:#f6f8fa;white-space:pre-wrap}.small{color:#555;font-size:.9rem}.nav a{margin-right:.75rem}</style></head><body><div class="nav"><a href="/">Home</a><a href="/docs">Docs</a><a href="/demo">Demo</a><a href="/test-pack">Test Pack</a></div><h1>NEXUS-X ARIA Try Page</h1><p><strong>Version:</strong> ${VERSION}</p><div class="warning"><strong>Safety warning:</strong> Do not enter private keys, seed phrases, recovery phrases, passwords, OTPs, cookies, API keys, or wallet credentials. This tool provides heuristic analysis only and does not guarantee safety.</div><form id="aria-form"><label for="project_name">Project Name</label><input id="project_name" value="Example Airdrop" required><label for="official_url">Official URL</label><input id="official_url" value="https://example-airdrop.com"><label for="description">Description</label><textarea id="description" required>Claim free tokens by connecting your wallet and signing a message.</textarea><label for="required_tasks">Required Tasks</label><textarea id="required_tasks" required>connect wallet
join Discord
sign message</textarea><p class="small">One task per line, or separate with commas.</p><label for="chain">Chain</label><input id="chain" value="Base"><label for="token_contract">Token Contract</label><input id="token_contract" value=""><label for="social_links">Social Links</label><textarea id="social_links">https://twitter.com/example
https://discord.gg/example</textarea><p class="small">One link per line, or separate with commas.</p><button type="submit">Analyze Risk</button></form><h2>Result</h2><div id="result" class="result">Submit the form to see a risk analysis.</div><script>function splitList(value){return value.split(/\n|,/).map((item)=>item.trim()).filter(Boolean)}function renderResult(data){if(data.error){return 'Error: '+data.error}const lines=[];lines.push('Risk Score: '+data.risk_score);lines.push('Risk Level: '+data.risk_level);lines.push('Verdict: '+data.verdict);lines.push('');lines.push('Red Flags:');if(data.red_flags&&data.red_flags.length){data.red_flags.forEach((flag)=>lines.push('- '+flag))}else{lines.push('- None detected by current heuristics')}lines.push('');lines.push('Safe Actions:');if(data.safe_actions&&data.safe_actions.length){data.safe_actions.forEach((action)=>lines.push('- '+action))}lines.push('');lines.push('Summary:');lines.push(data.summary||'');return lines.join('\n')}document.getElementById('aria-form').addEventListener('submit',async(event)=>{event.preventDefault();const payload={project_name:document.getElementById('project_name').value.trim(),official_url:document.getElementById('official_url').value.trim(),description:document.getElementById('description').value.trim(),required_tasks:splitList(document.getElementById('required_tasks').value),chain:document.getElementById('chain').value.trim(),token_contract:document.getElementById('token_contract').value.trim(),social_links:splitList(document.getElementById('social_links').value)};const output=document.getElementById('result');output.textContent='Analyzing...';try{const response=await fetch('/score-airdrop',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await response.json();output.textContent=renderResult(data)}catch(error){output.textContent='Request failed: '+error.message}});</script></body></html>`;
const OPENAPI_SPEC = {
  "openapi": "3.0.1",
  "info": {
    "title": "NEXUS-X ARIA",
    "version": VERSION,
    "description": "Transparent airdrop risk scoring API for Web3 projects."
  },
  "servers": [
    {
      "url": "https://nexus-x-aria.muhammad-badarul-syamsy.workers.dev"
    }
  ],
  "paths": {
    "/": {
      "get": {
        "summary": "Landing page"
      }
    },
    "/health": {
      "get": {
        "summary": "Health check"
      }
    },
    "/demo": {
      "get": {
        "summary": "Demo risk analysis"
      }
    },
    "/try": {
      "get": {
        "summary": "Browser form for custom scoring"
      }
    },
    "/examples": {
      get: {
        summary: "Expanded examples",
        responses: {
          "200": {
            description: "Examples page",
            content: { "text/html": { schema: { type: "string" } } }
          }
        }
      }
    },
    "/docs": {
      "get": {
        "summary": "HTML documentation"
      }
    },
    "/test-pack": {
      "get": {
        "summary": "Internal validation test pack"
      }
    },
    "/openapi.json": {
      "get": {
        "summary": "OpenAPI specification"
      }
    },
    "/score-airdrop": {
      "post": {
        "summary": "Score an airdrop"
      }
    }
  }
};

async function handleRequest(request) {
  const { method } = request;
  const url = new URL(request.url);
  if (method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (method === "GET" && (url.pathname === "/" || url.pathname === "")) return htmlResponse(LANDING_HTML);
  if (method === "GET" && url.pathname === "/health") return jsonResponse({ status: "ok", service: "nexus-x-aria", version: VERSION });
  if (method === "GET" && url.pathname === "/demo") {
    const result = computeRisk(SAMPLE_INPUT);
    return jsonResponse({ demo: true, service: "nexus-x-aria", version: VERSION, sample_input: SAMPLE_INPUT, result });
  }
  if (method === "GET" && url.pathname === "/try") return htmlResponse(TRY_HTML);
  if (method === "GET" && url.pathname === "/examples") return htmlResponse(EXAMPLES_HTML);
  if (method === "GET" && url.pathname === "/docs") return htmlResponse(DOCS_HTML);
  if (method === "GET" && url.pathname === "/test-pack") {
    const results = TEST_CASES.map((tc) => {
      const result = computeRisk(tc.input);
      const passed = result.risk_score >= tc.expected_score_min &&
        result.risk_score <= tc.expected_score_max &&
        result.risk_level === tc.expected_level &&
        tc.expected_flags.every((flag) => result.red_flags.includes(flag));
      return { id: tc.id, name: tc.name, expected_score_min: tc.expected_score_min, expected_score_max: tc.expected_score_max, actual_score: result.risk_score, expected_level: tc.expected_level, actual_level: result.risk_level, expected_flags: tc.expected_flags, actual_flags: result.red_flags, passed };
    });
    return jsonResponse({ service: "nexus-x-aria", version: VERSION, tests: results });
  }
  if (method === "GET" && url.pathname === "/openapi.json") return jsonResponse(OPENAPI_SPEC);
  if (method === "POST" && url.pathname === "/score-airdrop") {
    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) return jsonError("Content-Type must be application/json", 415);
    const bodyText = await request.text();
    if (bodyText.length > 20000) return jsonError("Request body too large", 413);
    let data;
    try { data = JSON.parse(bodyText || "{}"); } catch (_e) { return jsonError("Invalid JSON payload", 400); }
    const requiredFields = ["project_name", "description", "required_tasks", "social_links"];
    for (const field of requiredFields) if (!(field in data)) return jsonError(`Missing required field: ${field}`, 400);
    if (!Array.isArray(data.required_tasks) || !Array.isArray(data.social_links)) return jsonError("Fields 'required_tasks' and 'social_links' must be arrays", 400);
    return jsonResponse(computeRisk(data));
  }
  return jsonResponse({ error: "Not found" }, 404);
}

function jsonResponse(data, status = 200) { return new Response(JSON.stringify(data), { status, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }); }
function htmlResponse(html, status = 200) { return new Response(html, { status, headers: { ...CORS_HEADERS, "Content-Type": "text/html; charset=utf-8" } }); }
function jsonError(message, status = 400) { return jsonResponse({ error: message }, status); }
function includesAny(text, phrases) { return phrases.some((phrase) => text.includes(phrase)); }

function computeRisk(input) {
  let score = 0;
  const redFlags = [];
  const tasksLower = (input.required_tasks || []).map((t) => String(t).toLowerCase());
  const desc = String(input.description || "").toLowerCase();
  const url = String(input.official_url || "");
  const chain = String(input.chain || "").toLowerCase();
  const combinedText = [desc, ...tasksLower].join(" ");

  if (!url) {
    score += 10; redFlags.push("Official URL missing");
  } else {
    if (!url.startsWith("https://")) { score += 10; redFlags.push("Official URL not HTTPS"); }
    try {
      const domain = new URL(url).hostname.toLowerCase();
      if (DOMAIN_KEYWORDS_HIGH.some((kw) => domain.includes(kw))) { score += 25; redFlags.push("Official URL contains high-risk wallet or login keyword"); }
      else if (DOMAIN_KEYWORDS_MEDIUM.some((kw) => domain.includes(kw))) { score += 15; redFlags.push("Official URL contains promotional claim keyword"); }
      else if (DOMAIN_KEYWORDS_LOW.some((kw) => domain.includes(kw))) { score += 5; redFlags.push("Official URL contains airdrop keyword"); }
    } catch (_e) { score += 20; redFlags.push("Official URL is invalid or suspicious"); }
  }

  if (includesAny(combinedText, RECOVERY_SECRET_PHRASES)) { score += 40; redFlags.push("Description asks for wallet recovery secrets"); }
  if (includesAny(combinedText, WALLET_CONNECTION_PHRASES)) { score += 20; redFlags.push("Requires wallet connection"); }
  if (includesAny(combinedText, WALLET_VERIFICATION_PHRASES)) { score += 25; redFlags.push("Mentions wallet verification or synchronization"); }
  if (includesAny(combinedText, SIGNING_PHRASES)) { score += 25; redFlags.push("Requires signing a message or transaction"); }
  const approvalWarning = includesAny(combinedText, APPROVAL_WARNING_PHRASES);
  const riskyApproval = includesAny(combinedText, RISKY_APPROVAL_PHRASES);
  if (riskyApproval && !approvalWarning) { score += 25; redFlags.push("Mentions risky token approvals or spending permissions"); }
  if (!input.token_contract || String(input.token_contract).trim() === "") { score += 15; redFlags.push("No token contract provided"); }
  if (!input.social_links || input.social_links.length === 0) { score += 10; redFlags.push("No social links provided"); }
  if (chain && !KNOWN_CHAINS.includes(chain)) { score += 5; redFlags.push("Blockchain chain is not widely recognized"); }
  if (includesAny(desc, PROMO_KEYWORDS)) { score += 20; redFlags.push("Description contains promotional or urgency language"); }
  if (score > 100) score = 100;
  let riskLevel, verdict;
  if (score <= 30) { riskLevel = "low"; verdict = "likely safe"; }
  else if (score <= 60) { riskLevel = "medium"; verdict = "caution"; }
  else if (score <= 80) { riskLevel = "high"; verdict = "avoid"; }
  else { riskLevel = "critical"; verdict = "avoid"; }
  const summary = `The analysis yielded a risk score of ${score}/100 with a ${riskLevel} risk level. ${redFlags.length} red flag(s) detected${redFlags.length ? ": " + redFlags.join(", ") : ""}. Proceed accordingly.`;
  return { risk_score: score, risk_level: riskLevel, verdict, red_flags: redFlags, safe_actions: ["Use a burner wallet for airdrops", "Verify official links through multiple credible sources", "Avoid unlimited token approvals", "Read and understand any message before signing", "Do not share private keys or seed phrases"], summary };
}

export default { fetch: handleRequest };
