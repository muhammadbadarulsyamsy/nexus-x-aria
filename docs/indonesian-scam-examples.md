# Indonesian Scam Examples

NEXUS-X ARIA v0.1.8+ includes basic Indonesian scam phrase detection.

## Dangerous Recovery Secret Phrases

- masukkan seed
- masukkan private key
- frasa pemulihan
- kunci pribadi
- kata sandi dompet

## Wallet Interaction Phrases

- hubungkan dompet
- sambungkan dompet
- verifikasi dompet
- validasi dompet
- sinkronkan dompet

## Promotional / Urgency Phrases

- klaim sekarang
- gratis token
- waktu terbatas
- aman 100%
- hadiah eksklusif

## Example

```json
{
  "project_name": "Klaim Token",
  "official_url": "https://valid.com",
  "description": "Masukkan seed phrase untuk klaim sekarang hadiah eksklusif.",
  "required_tasks": ["hubungkan dompet"],
  "chain": "Base",
  "token_contract": "",
  "social_links": []
}
```

Expected interpretation: critical risk.
