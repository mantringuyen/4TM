# Shared Module AI Instructions

**Path Scope**: `shared/**/*`  
**Governing Context**: Plain source directory shared across the root portal (`src/`) and all sub-products (`products/*`).

---

## 1. Architecture & Packaging Rules
- `shared/` is a plain TypeScript source folder resolved via `@shared` Vite build aliases.
- **Do NOT convert `shared/` into an npm package.**
- **Do NOT create a separate shared git repository.**
- **Do NOT duplicate shared components into individual product folders.**
- Avoid placing product-specific business logic, routing, or domain state in `shared/`.

---

## 2. Core Modules & Ecosystem Impact
Any change in `shared/` is potentially an ecosystem-wide change that can affect the root portal and all 4TM products:
- `BrandLogo.tsx`: Canonical logo SVG and typography rendering for `4TM` and `Product Name — 4TM`.
- `ProductSwitcher.tsx`: Ecosystem cross-domain navigation menu.
- `theme.tsx` & `tokens.ts`: Global theme context (dark/light) and design token variables.
- `components.tsx`: Standard UI primitives (buttons, modals, badges, dropdowns, inputs).
- `sso.ts`: Client-side SSO ticket initiation, cryptographic state nonces, and URL scrubbing.
- `systemSettings.ts`: Global ad provider rules, public registration toggles, and user entitlement checks.
- `AdSlot.tsx`: Ad policy container component.

---

## 3. Modification & Verification Standards
- **Preserve Compatibility**: Keep component props and function signatures backward-compatible across all consuming products.
- **Security Verification**: Any modification to `shared/sso.ts` or `shared/systemSettings.ts` must be validated against `tests/sso_security.test.ts` and `tests/registration_and_ad_qa.test.ts`.
- **Pre-Change Impact Analysis**: State all consuming products that will be affected before modifying any shared module.
