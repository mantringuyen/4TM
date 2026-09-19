import { test, expect } from '@playwright/test';

/**
 * 4TM Root Portal Smoke Test
 * Verifies that the primary entry point loads successfully with core branding and navigation.
 */
test.describe('4TM Ecosystem Portal — Smoke Test', () => {
  test('should load the homepage and render core 4TM branding and navigation', async ({ page }) => {
    // 1. Navigate to the configured base URL
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);

    // 2. Verify meaningful document title containing 4TM
    await expect(page).toHaveTitle(/4TM/i);

    // 3. Verify main header / navigation contains 4TM brand logo
    const header = page.locator('header, nav').first();
    await expect(header).toBeVisible();
    await expect(header).toContainText(/4TM/i);

    // 4. Verify main content container renders
    const root = page.locator('#root');
    await expect(root).toBeVisible();
  });
});
