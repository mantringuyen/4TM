# 4TM Playwright E2E Testing Harness

This directory contains End-to-End (E2E) browser verification suites for the **4TM Web Ecosystem**.

---

## Directory Structure

```text
tests/e2e/
├── smoke/
│   └── portal.spec.ts    # Lightweight smoke test verifying portal root load & branding
└── README.md             # E2E test execution documentation
```

---

## Prerequisites & Browser Installation

Before running browser tests locally or in CI, install the required Playwright browser binary:

```bash
# Install Chromium browser binary
npx playwright install chromium
```

---

## Running Tests

### 1. Run All E2E Tests
```bash
npm run test:e2e
# or directly:
npx playwright test
```

### 2. Run Smoke Tests Only
```bash
npx playwright test tests/e2e/smoke/
```

### 3. Run in Headed Mode (Visual Inspection)
```bash
npx playwright test --headed
```

### 4. Run in Debug Mode (Playwright Inspector)
```bash
npx playwright test --debug
```

### 5. View Test Report
```bash
npx playwright show-report
```

---

## Configuration & Base URL

The base URL is configured dynamically in `playwright.config.ts`:

- **Default**: `http://localhost:3000` (automatically starts `npm run dev` via `webServer` if not already running)
- **Custom Environment**: Provide the `PLAYWRIGHT_TEST_BASE_URL` or `BASE_URL` variable:
  ```bash
  PLAYWRIGHT_TEST_BASE_URL=https://4tm.io.vn npx playwright test
  ```
