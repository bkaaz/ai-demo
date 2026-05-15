import { test, expect } from '@playwright/test';
import { LayoutPage } from '../pages/layout.page';

test.describe('Navigation', () => {
  let layout: LayoutPage;

  test.beforeEach(async ({ page }) => {
    layout = new LayoutPage(page);
    await layout.goto();
  });

  test('should redirect root to dashboard', async ({ page }) => {
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should display toolbar with app title', async () => {
    await expect(layout.toolbar).toBeVisible();
    await expect(layout.appTitle).toHaveText('AI Demo App');
  });

  test('should navigate to Users page', async ({ page }) => {
    await layout.navigateTo('users');
    await expect(page).toHaveURL(/\/users/);
    await expect(page.locator('[data-testid="page-title"]')).toHaveText('Users');
  });

  test('should navigate to Settings page', async ({ page }) => {
    await layout.navigateTo('settings');
    await expect(page).toHaveURL(/\/settings/);
    await expect(page.locator('[data-testid="page-title"]')).toHaveText('Settings');
  });

  test('should highlight active nav link', async () => {
    await layout.navigateTo('users');
    await expect(layout.navUsers).toHaveClass(/active-link/);
  });

  test('should load dashboard via deep link', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });
});
