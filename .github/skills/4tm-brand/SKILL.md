---
name: 4tm-brand
description: Enforce official 4TM ecosystem branding, typography, naming conventions, and UI design standards.
---

# 4TM Brand & Visual Identity Skill

## Purpose
Ensure consistent, accessible, and high-craft visual identity across the 4TM ecosystem, preventing visual drift, branding fragmentation, and generic AI design patterns.

---

## When to Use
- When creating, modifying, or styling user interfaces in any product (`study`, `ebook`, `tools`, `games`, `apps`) or the root portal (`src/`).
- When referencing product titles, badges, logos, navigation switchers, or headers.
- When configuring theme palettes, dark/light modes, or responsive layouts.

---

## 1. Ecosystem Naming Conventions

- **Master Brand**: `4TM`
- **Product Title Rule**: `Product Name — 4TM` (using an em-dash `—` with surrounding spaces).
  - ✅ `Study — 4TM`
  - ✅ `Ebook — 4TM`
  - ✅ `Tools — 4TM`
  - ✅ `Games — 4TM`
  - ✅ `Apps — 4TM`
  - ✅ `Xếp Gạch — 4TM`
  - ❌ `4TM Study` or `4TM Games` (do not prefix product titles with 4TM)
  - ❌ `Study4TM` or `Study-4TM` (do not omit spaces or use hyphens)

---

## 2. Shared Brand Primitives

Always reuse existing shared components in `shared/` rather than creating custom SVG or typography implementations:

1. **`BrandLogo.tsx`**: Canonical SVG logo mark and responsive brand typography.
   - Supports `variant="portal"`, `variant="study"`, `variant="ebook"`, `variant="tools"`, `variant="games"`, `variant="apps"`.
   - Supports size presets (`sm`, `md`, `lg`).
2. **`ProductSwitcher.tsx`**: Standardized ecosystem switcher for seamless cross-subdomain navigation.
3. **`tokens.ts`**: Centralized source for brand color palettes, semantic background/foreground tokens, and elevation borders.
4. **`theme.tsx`**: Context provider managing persistent `dark` / `light` theme states.

---

## 3. Visual Craft & Anti-Slop Guidelines

Reject generic, unpolished AI design tropes:

| Anti-Pattern (Forbidden) | 4TM Standard (Required) |
| :--- | :--- |
| Purple-to-blue gradient hero backgrounds | Subtle neutral backgrounds with crisp structural borders (`border-border`) |
| Arbitrary glowing drop-shadows / glassmorphism blur | Crisp mathematical borders (1px) and clean z-index elevation |
| Over-rounded containers (e.g. `rounded-3xl` on data cards) | Subtle, intentional corner radii (`rounded-xl` or `rounded-lg`) |
| Unstyled primary action buttons | Styled button primitives from `shared/components.tsx` with clear hover/focus states |
| Low-contrast text on colored cards | Strict WCAG AA contrast (minimum 4.5:1 ratio for body copy) |
| Hardcoded hex colors (`#1e293b`) | Tailwind semantic token classes (`bg-background`, `text-foreground`, `bg-muted`) |

---

## 4. UI Prioritization Hierarchy

When building or updating UI components, follow this order of priority:
1. **Existing Shared Primitives**: Check `shared/components.tsx`, `shared/BrandLogo.tsx`, `shared/tokens.ts`.
2. **Product-Local Visual Language**: Match the typography, density, and layout style already established in the target product.
3. **Ecosystem Consistency**: Ensure responsive behavior (minimum 44px touch targets on mobile) and dark/light mode compatibility.
4. **Minimal Visual Footprint**: Do NOT redesign an entire view when asked to add or fix a feature.
