# 4TM Shared

Plain shared source directory across the **4TM** monorepo.

`shared/` is a plain source directory (not an npm package or workspace package) providing common components, design tokens, and utilities directly to products in this repository via the `@shared` alias.

## Scope & Architectural Boundaries

`shared/` is the single source of truth for cross-product primitives across:
- **4TM Ecosystem** (`4tm.io.vn`)
- **Study — 4TM** (`study.4tm.io.vn`)
- **Games — 4TM** (`games.4tm.io.vn`)
- **Apps — 4TM** (`apps.4tm.io.vn`)
- **Ebook — 4TM** (`ebook.4tm.io.vn`)
- **Tools — 4TM** (`tools.4tm.io.vn`)

### Allowed Cross-Product Modules
- Ecosystem Branding & Brand Configuration (`BrandLogo`, `BRAND_CONFIG`)
- Navigation Primitives (`ProductSwitcher`)
- Theme Primitives (`ThemeProvider`, `useTheme`, `ThemeSelector`, design tokens)
- Common UI Primitives (`Avatar`, `Badge`, etc.)
- Common types, utilities, auth/storage connectors

### Architectural Prohibitions
`shared/` is NOT a deployable product and has no domain. It MUST NOT contain:
- Study lesson/course logic
- Games engine or gameplay logic
- Apps-specific business logic
- Ebook technical content
- Tools-specific functionality
