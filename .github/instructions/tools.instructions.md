# Tools — 4TM AI Instructions

**Path Scope**: `products/tools/**/*`  
**Product**: Tools — 4TM (`tools.4tm.io.vn`)  
**Domain**: Privacy-first, client-side developer and data utilities.

---

## 1. Product Boundaries & Isolation
- Changes targeting `products/tools/` must not alter other products (`products/study/`, `products/ebook/`, etc.) unless explicitly requested.
- Keep the tool suite isolated, lightweight, and focused purely on developer utilities.
- Do not introduce unrelated Study courses, Ebook publications, or gaming elements into this product.

---

## 2. Execution Architecture & Privacy
- **Client-Side Execution**: Maintain 100% in-browser transformation and computation.
- Do NOT introduce backend proxy endpoints or server-side data processing for operations that can run securely in the browser.
- **Zero Credential Exposure**: Never expose API keys, credentials, or private tokens inside utility inputs, outputs, or default states.
- Preserve tool modularity: each utility (e.g., `DataConverter`, `TextCaseConverter`, `SqlFormatter`, `EncoderDecoder`, `CssGenerator`, `QrGenerator`) should remain self-contained.

---

## 3. UX, i18n & Verification
- Preserve existing tool navigation, input/output panel splits, format selectors, and copy-to-clipboard actions.
- Maintain dual-language (`en` / `vi`) labels, placeholders, tooltips, and documentation snippets.
- Verify converter inputs, edge cases (e.g., invalid JSON/YAML/SQL formatting), and error alert banners when updating tool logic.
- Validate regression behavior against `tests/phase1_qa_regression.test.ts` when modifying data conversion or routing modules.
