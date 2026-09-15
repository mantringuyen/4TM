# Project Guidelines & Rules

## Mandatory Error Reporting & QA Diagnostic Rule

Whenever ANY command, tool action, build step, test, installation, deployment check, or verification fails:

1. Never report only "1 error", "2 errors", "failed", or a generic summary.
2. Report the EXACT failed command.
3. Report the COMPLETE relevant error message/output.
4. Report the exit code.
5. Identify the root cause when determinable.
6. Classify the failure as:
   - REAL ISSUE — requires a fix
   - DIAGNOSTIC/EXPLORATORY FAILURE — harmless and does not require a fix
   - ENVIRONMENT/TOOLING ISSUE — external to application code
   - UNKNOWN — insufficient evidence
7. Explain whether the failure affects:
   - installation
   - compilation
   - production build
   - runtime
   - deployment
   - application functionality
8. Never hide, omit, or silently ignore a failed command.
9. If multiple commands fail, report EACH failure separately.
10. Do not count the same underlying failure multiple times.
11. Distinguish warnings from errors.
12. If a command is intentionally exploratory and fails because the expected condition does not exist, explicitly say so.
13. Before declaring PASS, verify that all required verification commands actually completed successfully.
14. If any required verification fails, the final status must be FAIL until it is fixed or explicitly determined to be an external/non-blocking issue.

### When Fixing an Issue
- Explain the root cause before changing files when practical.
- Make the smallest necessary change.
- Do not create unrelated changes.
- Re-run the failed verification after the fix.
- Re-run the relevant regression checks.

---

## Required Final Report Format for Every Task

### A. Overall Status: PASS / FAIL / PASS WITH NON-BLOCKING ISSUE

### B. Issues Found
For EACH issue:
- Severity: (Critical / High / Medium / Low)
- Classification: (REAL ISSUE / DIAGNOSTIC/EXPLORATORY FAILURE / ENVIRONMENT/TOOLING ISSUE / UNKNOWN)
- Exact command
- Exact error
- Exit code
- Root cause
- Impact: (installation / compilation / production build / runtime / deployment / application functionality)
- Fix applied (if any)
- Verification after fix

### C. Files Changed
- Exact path
- What changed
- Why it changed

### D. Verification
For every verification command:
- Command
- Result
- Exit code

### E. Remaining Issues
- State "None" only after confirming there are no unresolved issues.
- Otherwise list every remaining issue with its exact error.

### F. Final Confirmation
Explicitly confirm:
- Whether application source code was changed
- Whether package.json changed
- Whether lockfiles changed
- Whether @4tm/shared changed
- Whether LMS content/business logic changed
- Whether production build passed
- Whether runtime health check passed
