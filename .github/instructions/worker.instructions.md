# Root Cloudflare Worker AI Instructions

**Path Scope**: `worker/**/*`, `wrangler.jsonc`, `products/*/worker/**/*`, `products/*/wrangler.jsonc`  
**Domain**: Serverless edge infrastructure, SSO Ticket Broker, and Cloudflare R2 storage bindings.

---

## 1. Infrastructure Sensitivity & Scope
- Treat all Worker scripts and `wrangler.jsonc` files as **deployment-sensitive and security-sensitive infrastructure**.
- Do NOT alter Cloudflare bindings, environment variable declarations, custom domain routes, or Worker deployment topologies unless explicitly requested.
- Do NOT perform opportunistic code formatting or speculative refactoring in Worker scripts.

---

## 2. SSO Broker Security Architecture
The root Worker (`worker/index.ts`) hosts the centralized Single Sign-On (SSO) Broker for the entire 4TM ecosystem:
- **Origin Allowlists**: Strictly enforce origin matching against trusted 4TM subdomains (`4tm.io.vn`, `study.4tm.io.vn`, `ebook.4tm.io.vn`, `tools.4tm.io.vn`, `games.4tm.io.vn`, `apps.4tm.io.vn`).
- **Cryptographic Nonces**: Validate state nonces to prevent cross-site request forgery.
- **Replay & Expiry Protection**: Ensure SSO tickets are single-use and expire within their designated time window.
- **Service Role Secrecy**: The Worker uses `SUPABASE_SERVICE_ROLE_KEY` to mint magic links via GoTrue Admin API. Never expose or log this key.
- **Route Precedence**: Ensure all API routes (`/api/sso/*`, `/api/health`, `/api/r2/*`) are registered and handled before static SPA asset serving fallbacks.

---

## 3. Mandatory Verification
- Any modification to `worker/index.ts` or related SSO logic MUST be validated against the comprehensive test suite:
  ```bash
  npx tsx tests/sso_security.test.ts
  ```
- All 25+ SSO security tests (origin checks, replay attacks, concurrent redemption, secret absence) must PASS before considering any Worker change complete.
