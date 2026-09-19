# Study — 4TM AI Instructions

**Path Scope**: `products/study/**/*`  
**Product**: Study — 4TM (`study.4tm.io.vn`)  
**Domain**: Interactive programming education, curriculum management, and sandboxed code execution.

---

## 1. Product Boundaries & Isolation
- Changes targeting `products/study/` must not alter other products (`products/ebook/`, `products/tools/`, etc.) unless explicitly required.
- Maintain the established LMS view hierarchy (`home`, `courses`, `course-detail`, `lesson`, `exercises`, `challenge`, `quiz`, `project`, `playground`, `paths`, `dashboard`).
- Do not redesign the LMS layout or user flows unless explicitly instructed.

---

## 2. Technical Architecture & Execution Engines
- **Browser-First Execution**: Preserve in-browser evaluation architectures:
  - Monaco Editor (`@monaco-editor/react`) for code editing.
  - `sql.js` (WebAssembly SQLite) for relational database execution.
  - Web Workers / sandboxed iframes for JavaScript, HTML/CSS, and Python runners.
  - Dedicated engine evaluators for Excel and Power BI DAX.
- **Backend & Cloud Integrations**:
  - Supabase Auth & Postgres for student progress, enrollments, notes, and mastery metrics.
  - Cloudflare R2 worker endpoints (`products/study/worker/`) for asset streaming and presigned media uploads.
  - Google GenAI SDK (`@google/genai`) for AI code review and contextual hints.
- Do not swap or replace execution engines, dependencies, or backend bindings without explicit authorization.

---

## 3. Content, Curriculum & i18n
- Preserve the curriculum taxonomy across the 8 technical paths (`python`, `sql`, `html`, `css`, `javascript`, `excel`, `powerbi`, `ai`) and 3 tiers (`basic`, `intermediate`, `advanced`).
- Maintain dual-language support (`en` and `vi`) across all lessons, quiz questions, exercise descriptions, and UI strings.
- Never hardcode user-facing copy in components without translation keys.

---

## 4. Quality & Error Reporting
- Respect and follow all guidelines in `products/study/AGENTS.md` when diagnosing or reporting QA errors.
- Verify lesson completion, quiz scoring, and authentication state transitions whenever core services are touched.
