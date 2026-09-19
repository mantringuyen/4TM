---
name: 4tm-architecture
description: Understand and safely navigate the 4TM monorepo architecture, product boundaries, plain shared modules, and infrastructure constraints.
---

# 4TM Architecture Skill

## Purpose
Guide AI agents in understanding the structural layout of the 4TM repository, respecting strict product isolation, managing plain shared primitives in `/shared`, and assessing the blast radius of any change before editing code.

---

## When to Use
- Before initiating any code modification across `src/`, `products/`, `shared/`, `worker/`, or configuration files.
- When evaluating whether a proposed task is local to a single product, shared across multiple products, or touching deployment infrastructure.
- When determining import dependencies and avoiding cross-product leakage.

---

## Monorepo Layout & Topology

```text
4TM/
├── src/                 # Ecosystem Root Portal (4tm.io.vn)
├── products/            # Independent product workspaces (each with package.json & vite.config.ts)
│   ├── study/           # Study — 4TM (study.4tm.io.vn) - Interactive LMS & code execution
│   ├── ebook/           # Ebook — 4TM (ebook.4tm.io.vn) - 54 structured technical publications
│   ├── tools/           # Tools — 4TM (tools.4tm.io.vn) - Client-side developer utilities
│   ├── games/           # Games — 4TM (games.4tm.io.vn) - Web showcase & catalog
│   └── apps/            # Apps — 4TM (apps.4tm.io.vn) - Web showcase & catalog
├── shared/              # Plain TypeScript source primitives (resolved via @shared alias)
├── worker/              # Root Cloudflare Worker hosting the SSO Ticket Broker
├── supabase/migrations/ # Root database schema migrations
├── tests/               # Standalone TypeScript test suites (executed via tsx)
└── wrangler.jsonc       # Root Cloudflare Workers deployment configuration
```

### External Repository Boundaries
- **`4TM-games`**: Standalone game development workspace. Its source code and engines MUST remain in its external repository.
- **`4TM-apps`**: Standalone application development workspace. Its source code MUST remain in its external repository.
- `products/games/` and `products/apps/` in this repository are **web showcases and launchers only**.

---

## Operational 7-Step Architectural Protocol

AI agents must execute this decision loop before applying edits:

```
1. Identify Target Path
       ↓
2. Map Dependencies
       ↓
3. Check Cross-Product Impact
       ↓
4. Determine Change Risk
       ↓
5. Make Smallest Safe Change
       ↓
6. Verify Affected Scope
       ↓
7. Report Diffs & Residual Risks
```

### Step 1: Identify Target Path
- Determine the exact product root (e.g., `products/study/` vs `products/ebook/`).
- Confirm that the requested feature belongs strictly within that product's domain.

### Step 2: Map Dependencies & Direction
- **Allowed Import Direction**:
  - `products/<name>/src` $\longrightarrow$ `shared/` (via `@shared/*` alias)
  - `src/` $\longrightarrow$ `shared/` (via `@shared/*` alias)
- **Forbidden Import Direction**:
  - `products/study` $\centernot\longrightarrow$ `products/ebook` (NEVER cross-import between products)
  - `shared/` $\centernot\longrightarrow$ `products/*` (Shared code must never depend on any product)

### Step 3: Check Cross-Product Impact
- If modifying `shared/`, identify all consuming products (`study`, `ebook`, `tools`, `games`, `apps`, and `src/`).
- If a task is product-specific, do NOT modify `shared/` unless the feature is a reusable primitive explicitly requested across the ecosystem.

### Step 4: Determine Change Risk Level
- **LOW**: Product-local UI text, localized styling, translations, isolated view components.
- **MEDIUM**: Product routing changes, new shared UI primitives, client data layer updates.
- **HIGH**: Modifications to `shared/sso.ts`, `worker/index.ts`, `supabase/migrations/`, authentication state, or `wrangler.jsonc`.

### Step 5: Make the Smallest Safe Change
- Do not perform speculative refactoring or rewrite entire modules to fix isolated bugs.
- Preserve existing component props and function signatures whenever possible.

### Step 6: Verify Affected Scope
- Run typechecking (`tsc --noEmit`) for the modified workspace.
- Run relevant regression or security tests when touching shared code, tools, or workers.

### Step 7: Report Diffs & Residual Risks
- Explicitly state modified file paths, lines changed, tests executed, and any remaining limitations.
