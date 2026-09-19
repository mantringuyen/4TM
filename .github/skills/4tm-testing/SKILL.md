---
name: 4tm-testing
description: Standardized testing, verification, typechecking, and regression reporting protocol for the 4TM repository.
---

# 4TM Testing & Verification Skill

## Purpose
Establish a disciplined, repeatable verification process for AI coding agents to test code changes, catch regressions early, ensure type safety, and report outcomes with absolute integrity.

---

## When to Use
- After modifying any TypeScript, React, SQL, or Worker file across `src/`, `products/`, `shared/`, or `worker/`.
- When verifying security-critical SSO flows, user entitlements, or ad policies.
- Before reporting task completion to users or maintainers.

---

## 1. Testing Hierarchy & Verification Categories

The repository uses four distinct validation layers:

| Layer | Verification Method | Execution Command | When to Run |
| :--- | :--- | :--- | :--- |
| **1. Static & Typecheck** | Typechecking / Linter (Inspect `package.json`) | `npx tsc --noEmit` (or `npm run lint` if defined) | **Mandatory** on every TypeScript/React change |
| **2. Security Tests** | Node assertions via `tsx` | `npx tsx tests/sso_security.test.ts` | When modifying `worker/`, `shared/sso.ts`, or SSO flows |
| **3. Policy & Ad Tests** | Node assertions via `tsx` | `npx tsx tests/registration_and_ad_qa.test.ts` | When modifying `shared/systemSettings.ts`, `AdSlot.tsx`, or migrations |
| **4. Functional Regression** | Node assertions via `tsx` | `npx tsx tests/phase1_qa_regression.test.ts` | When modifying `products/tools/`, converters, or formatting logic |

*(Note: Browser/E2E automation such as Playwright is scheduled for Phase 3 and is NOT yet installed).*

---

## 2. Path-to-Test Mapping Matrix

Determine required test suites based on changed file paths:

```text
Changed Paths                             Required Test Commands
────────────────────────────────────────────────────────────────────────────────
shared/sso.ts                     ──►     npx tsx tests/sso_security.test.ts
worker/**/*                       ──►     npx tsx tests/sso_security.test.ts
shared/systemSettings.ts          ──►     npx tsx tests/registration_and_ad_qa.test.ts
shared/AdSlot.tsx                 ──►     npx tsx tests/registration_and_ad_qa.test.ts
supabase/migrations/**/*          ──►     npx tsx tests/registration_and_ad_qa.test.ts
products/tools/**/*               ──►     npx tsx tests/phase1_qa_regression.test.ts
Any *.ts / *.tsx file             ──►     npx tsc --noEmit (and npm run lint if script exists)
```

---

## 3. Strict Verification Rules

1. **TypeScript Verification Rules**:
   - Inspect `package.json` before choosing the verification command.
   - Run the repository's actual lint command if one exists.
   - Run the repository's canonical TypeScript typecheck command when applicable, such as `npx tsc --noEmit`.
   - Do not describe `npm run lint` as equivalent to `tsc --noEmit` unless the repository explicitly defines it that way.
   - Never invent a command that is not present or supported by the repository.

2. **Truthful Reporting Rule**:
   - Never claim a test passed (`PASS`) unless the test command was physically executed and returned exit code 0.
   - If a test was not run due to environment constraints or documentation-only tasks, report explicitly: `NOT RUN` with the exact reason.

3. **Diff & Blast Radius Inspection**:
   - Before completing a task, inspect the git status or diff to verify that **zero unintended files** in other products were touched.

4. **Maximum 3-Attempt Fix Loop**:
   - If a test or typecheck fails after a code change, analyze the exact error output and apply a targeted fix.
   - If the error persists after **3 consecutive fix attempts**, STOP the automated loop and report the exact blocker:
     ```text
     Command: <command>
     Exact Error: <log>
     File: <file>
     Line: <line>
     Root Cause: <root cause>
     Attempted Fixes: <attempts 1, 2, 3>
     Current Blocker: <blocker description>
     ```
