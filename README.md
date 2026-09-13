# 4TM Web Ecosystem

Monorepo for the **4TM** web ecosystem (`mantringuyen/4TM`), managed using Bun workspaces.

---

## Directory Structure

```text
4TM/
├── main/                 # 4tm.io.vn — Main portal
├── study/                # study.4tm.io.vn — Study platform
├── games/                # games.4tm.io.vn — Games showcase website
├── apps/                 # apps.4tm.io.vn — Apps showcase website
├── ebook/                # ebook.4tm.io.vn — Ebook platform
├── tools/                # tools.4tm.io.vn — Web tools platform & active tools
│
├── packages/             # Shared libraries & packages
│   ├── shared/           # Common utilities and UI helpers
│   ├── auth/             # Shared authentication logic
│   ├── i18n/             # Localization and translation resources
│   ├── types/            # Shared TypeScript type definitions
│   └── config/           # Shared configurations (ESLint, Tailwind, etc.)
│
└── services/             # Backend & API services
    └── api/              # Backend/API service code
```

---

## Architecture Rules & Guidelines

1. **Independent Web Products**:
   - `main`, `study`, `games`, `apps`, `ebook`, and `tools` are separate web applications/products.
   - `tools` hosts actual web tools, not merely a landing page.

2. **External Repositories**:
   - `games` is strictly the games showcase website. Game source code resides in the dedicated repository: [`mantringuyen/4TM-games`](https://github.com/mantringuyen/4TM-games).
   - `apps` is strictly the apps showcase website. App source code resides in the dedicated repository: [`mantringuyen/4TM-apps`](https://github.com/mantringuyen/4TM-apps).
   - `4TM-games` and `4TM-apps` are external repositories and must **not** be placed inside this monorepo.

3. **Shared Code & Services**:
   - Reusable cross-application code belongs in `packages/`.
   - Backend service logic belongs in `services/api/`.

4. **Package Management & Dependencies**:
   - Managed via **Bun workspaces**.
   - Internal dependencies between workspace packages must use the `workspace:*` protocol.
   - External registry publications via GitHub Packages or `npm.pkg.github.com` are not used.

---

## Workspace Configuration

Workspaces are configured in the root `package.json`:

```json
{
  "name": "4tm",
  "private": true,
  "workspaces": [
    "main",
    "study",
    "games",
    "apps",
    "ebook",
    "tools",
    "packages/*",
    "services/*"
  ]
}
```
