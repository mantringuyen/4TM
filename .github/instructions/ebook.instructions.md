# Ebook — 4TM AI Instructions

**Path Scope**: `products/ebook/**/*`  
**Product**: Ebook — 4TM (`ebook.4tm.io.vn`)  
**Domain**: Structured digital technical publications and reader interface.

---

## 1. Product Boundaries & Isolation
- Changes targeting `products/ebook/` must not modify other product directories unless explicitly requested.
- Keep the Ebook application strictly focused on technical publications, catalog navigation, and reading experiences.
- Do not introduce interactive coding engines, LMS grading, or unrelated Study features into this product.

---

## 2. Publication Architecture & Data Model
- Preserve the structured taxonomy of the technical library:
  - **Topics**: `python`, `sql`, `html`, `css`, `javascript`, `excel`, `powerbi`, `ai`.
  - **Archetypes**: `Handbook`, `Definitions`, `Tips`, `Practical Guides`, `Common Errors`, `Best Practices`, `Patterns / Recipes`.
  - **Hierarchies**: `Book` $\to$ `Chapter` $\to$ `Section`.
- Data files in `products/ebook/src/data/` define the structured content. Do NOT convert this static publication library into a generic blog engine, dynamic CMS, or markdown scraper.
- Maintain structured section types: `codeBlock`, `diagram`, `comparisonTable`, `commonMistakes`, `practicalScenario`, `bestPractices`, and `keyTakeaways`.

---

## 3. Reader Experience & i18n
- Preserve typography primitives (`EditorialPrimitives.tsx`, `ChapterOpener.tsx`, `PublicationFrontMatter.tsx`, `ReaderView.tsx`).
- Preserve font sizing controls, reading progress tracking, table of contents drawer, and dark/light contrast.
- Maintain bilingual translation schemas (`en` / `vi`) for all book titles, summaries, section content, comparison rows, and mistake explanations.
- Preserve ad display logic via `shared/AdSlot.tsx` and respect user `ad_free` entitlements.
