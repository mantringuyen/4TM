# 4TM Repository AI Instructions

These instructions govern all AI coding agents, Copilot assistants, and automated engineering tools working in the **4TM repository** (`mantringuyen/4TM`).

---

## 1. 4TM Identity

- **Master Brand**: `4TM` is the ecosystem master brand.
- **Product Naming Convention**: Strictly follow `Product Name — 4TM`.
  - *Examples*: `Study — 4TM`, `Ebook — 4TM`, `Tools — 4TM`, `Games — 4TM`, `Apps — 4TM`, `Xếp Gạch — 4TM`.
- Do NOT use "4TM Games" or "4TM Apps" as product titles unless required by existing technical identifiers (e.g., repository names).
- Do NOT introduce competing branding, slogans, or modified brand names.

---

## 2. Repository Architecture

```text
4TM/
├── src/                 # 4TM ecosystem portal (4tm.io.vn)
├── products/            # Product workspace sub-applications
│   ├── study/           # Study — 4TM (study.4tm.io.vn)
│   ├── ebook/           # Ebook — 4TM (ebook.4tm.io.vn)
│   ├── tools/           # Tools — 4TM (tools.4tm.io.vn)
│   ├── games/           # Games — 4TM Showcase (games.4tm.io.vn)
│   └── apps/            # Apps — 4TM Showcase (apps.4tm.io.vn)
├── shared/              # Plain shared source primitives (reused across all products)
├── worker/              # Root Cloudflare Worker & SSO Token Broker
├── supabase/            # Root database migrations
├── tests/               # Automated regression & security test suites
└── public/              # Static public assets
```

**External Repositories Boundary**:
- `4TM-games` is an **external** game engine development repository.
- `4TM-apps` is an **external** standalone application development repository.
- Do NOT merge or move source code from `4TM-games` or `4TM-apps` into this monorepo.
- `products/games` and `products/apps` in this repository are **web showcases and catalogs only**.

---

## 3. Product Isolation

- Respect product boundaries strictly.
- When a task targets `products/study/`, do NOT edit `products/ebook/`, `products/tools/`, `products/games/`, or `products/apps/`.
- The same isolation applies to every product directory.
- Cross-product or shared changes are allowed only when:
  - Explicitly requested by the user, or
  - Technically required by an explicitly requested architecture change.
- AI agents must always explain the cross-product impact before making such changes.

---

## 4. Shared Folder Governance (`shared/`)

- `shared/` is a plain source folder, resolved via `@shared` Vite aliases.
- **Do NOT convert `shared/` into an npm package.**
- **Do NOT create a separate shared repository.**
- **Do NOT duplicate shared components into individual products.**
- Key shared modules:
  - `BrandLogo.tsx`: Unified branding and typography.
  - `ProductSwitcher.tsx`: Global cross-product navigation menu.
  - `theme.tsx` & `tokens.ts`: Global theme context and design tokens.
  - `components.tsx`: Standard UI primitives.
  - `sso.ts`: Single Sign-On state machines and cryptographic validation.
  - `systemSettings.ts`: Ad logic and registration state management.
  - `AdSlot.tsx`: Global ad container component.
- Avoid placing product-specific business logic in `shared/`.
- Treat changes to `shared/` as ecosystem-wide changes that can affect the root portal and multiple products.

---

## 5. Technology Stack

- **Frontend**: React 19, Tailwind CSS v4 (`@tailwindcss/vite`), Motion.
- **Languages & Types**: TypeScript 5.8.x in strict mode.
- **Build & Dev**: Vite 6, Bun/pnpm-compatible monorepo workspace.
- **Local Server**: Node.js + Express 4 with `tsx` runner where applicable.
- **Edge Deployment**: Cloudflare Workers (`wrangler` with static assets).
- **Database & Auth**: Supabase Postgres & Supabase Auth.
- **Storage**: Cloudflare R2 (configured in Study).
- **Interactive Engines**: Monaco Editor, `sql.js` (WebAssembly SQLite) in Study.
- **Internationalization**: Custom dual-language (`en` / `vi`) dictionary model.
- Do NOT replace or swap core technologies without explicit instruction.

---

## 6. Development Principles

- **Inspect First**: Always inspect existing code before writing or editing.
- **Reuse Primitives**: Leverage existing components, hooks, and utilities.
- **Smallest Safe Change**: Avoid unnecessary refactoring or speculative abstractions.
- **Preserve Behavior**: Do not modify existing user-facing behavior unless explicitly instructed.
- **Zero Hallucinated Dependencies**: Do not introduce new npm packages unless strictly necessary.

---

## 7. TypeScript Rules

- Preserve strict type safety across all files.
- Avoid `any` unless explicitly justified by runtime dynamics.
- Do NOT suppress compiler diagnostics using `@ts-ignore` or `@ts-nocheck`.
- Prefer existing project interfaces in `types.ts` and `shared/`.
- Inspect `package.json` before running scripts; run `npm run lint` only if that script exists and is the project's actual lint command.
- Always run the repository's canonical TypeScript typecheck command, such as `tsc --noEmit`, when applicable after modifications.

---

## 8. UI & UX Standards

- Reuse existing `shared/` UI primitives and design tokens.
- Preserve dark and light theme support and contrast standards.
- Ensure full mobile responsiveness and touch-target accessibility ($\ge 44\text{px}$).
- Ban generic AI clichés (no purple-to-blue gradient overlays, no arbitrary glassmorphism glow effects).
- Do not redesign existing layouts unless explicitly requested.

---

## 9. Branding Standards

- Preserve official 4TM logos, color tokens, and product naming conventions.
- Maintain consistent visual hierarchy in `BrandLogo.tsx` and `ProductSwitcher.tsx`.
- Never generate unapproved alternate logos or competing brand prefixes.

---

## 10. Internationalization (i18n)

- The 4TM ecosystem supports **English (`en`)** and **Vietnamese (`vi`)**.
- Never hardcode user-facing strings in components; use the respective product's translation dictionaries.
- When adding or editing user-facing copy, provide translations for **both EN and VI**.
- Do NOT translate code syntax, programming keywords, API routes, or technical identifiers.

---

## 11. Testing & Verification Rules

Before marking any task complete:
1. Inspect the modified files and their callers.
2. Run the repository's relevant test command(s) (such as `npm test` if that script exists, or specific product/security test scripts when applicable).
3. Run the canonical TypeScript typecheck command (e.g., `tsc --noEmit`).
4. Verify that unrelated products were not affected.

- **Integrity Rule**: Never claim PASS or that a test passed unless the command was actually executed.
- If a test cannot be executed in the current environment, report `NOT RUN` and state the exact reason.

---

## 12. Security Rules

- **Confidential Credentials**: Never commit or log `SUPABASE_SERVICE_ROLE_KEY`, Cloudflare R2 secrets, or Gemini API keys.
- **Server/Client Separation**: Never expose service-role keys to browser client bundles. Never prefix private secrets with `VITE_`.
- **SSO Integrity**: Never bypass origin allowlists, state nonces, or URL fragment scrubbing in `shared/sso.ts` or `worker/index.ts`.

---

## 13. Database & Migrations

- Inspect existing SQL files in `supabase/migrations/` and `products/study/supabase/migrations/` before proposing changes.
- Never delete or rewrite existing migrations in place. Always create new timestamped migration files.
- Enforce strict Row Level Security (RLS) policies on all tables and functions.

---

## 14. Cloudflare Worker Deployment Rules

- Treat `wrangler.jsonc`, `products/*/wrangler.jsonc`, `worker/`, and `products/*/worker/` as deployment-sensitive files.
- Do not modify Worker routes, bindings, or configurations unless explicitly instructed.
- Ensure API routes are mounted prior to static SPA asset fallbacks.

---

## 15. Single Sign-On (SSO) Rules

- The root Worker (`worker/index.ts`) operates as the ecosystem's centralized SSO Broker.
- Security-critical components:
  - `shared/sso.ts`
  - `worker/index.ts`
  - `src/services/ssoIssuer.ts`
- Any modification to SSO files requires comprehensive verification against `tests/sso_security.test.ts`.

---

## 16. AI Agent Execution Order

All AI agents must follow this sequential execution cycle:

$$\text{UNDERSTAND} \longrightarrow \text{INSPECT} \longrightarrow \text{PLAN} \longrightarrow \text{MODIFY} \longrightarrow \text{TEST} \longrightarrow \text{REPORT}$$

- **Before modifying**: Read relevant files, check dependencies, and identify cross-product impact.
- **After modifying**: Run typechecks/tests, review diffs, and report concrete changes.

---

## 17. Scope Control

- Confine all changes strictly to the target product or module requested by the user.
- If working on `products/ebook/`, do NOT perform opportunistic cleanups in `products/study/` or `shared/`.
- If unrelated bugs or syntax issues are discovered during a task, report them in the summary rather than fixing them silently.

---

## 18. Structured Failure Reporting

Never output vague failure statements. Always format diagnostics using this structure:

```text
Command: <executed command>
Exact Error: <error output log>
File: <file path>
Line: <line number>
Root Cause: <technical explanation>
Impact: <scope of breakage>
Attempted Fix: <description of fix>
Result: <outcome of fix attempt>
```

*Max Retry Limit*: Stop and ask for guidance after 3 unsuccessful automated fix attempts.

---

## 19. Change Risk Classification

- **LOW RISK**: Isolated UI text, styling tweaks, localized component adjustments, translation updates.
- **MEDIUM RISK**: Product route additions, shared UI component changes, data schema modifications, client service updates.
- **HIGH RISK**: `shared/sso.ts`, root Worker endpoints, Supabase RLS migrations, authentication flows, Cloudflare `wrangler.jsonc` configurations.
- *High-risk changes require explicit architectural justification and regression testing.*

---

## 20. Current AI Team Status

The repository is currently operating in:

$$\textbf{AI TEAM PHASE 1 — GLOBAL INSTRUCTIONS}$$

- **Codebase Architecture Audit**: COMPLETE
- **Global Copilot Instructions (`.github/copilot-instructions.md`)**: COMPLETE (Phase 1, Step 1)
- **Path-Specific Instructions**: NOT YET CREATED (Phase 1, Step 2)
- **Custom 4TM Skills**: NOT YET CREATED (Phase 2)
- **Playwright Test Harness**: NOT YET INSTALLED (Phase 3)
- **AI Reviewer / Fixer Agents**: NOT YET CREATED (Phase 4 & 5)
- **GitHub Actions Workflows**: NOT YET CREATED (Phase 6)
- **Automated Deployment**: NOT YET ENABLED (Phase 7)
