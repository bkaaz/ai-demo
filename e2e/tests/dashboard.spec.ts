import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('Dashboard', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('should display all stat cards', async () => {
    await expect(dashboard.statsGrid).toBeVisible();
    const cards = dashboard.statsGrid.locator('mat-card');
    await expect(cards).toHaveCount(4);
  });

  test('should show stat values', async () => {
    await expect(dashboard.getStatCard('total-users')).toContainText('2,847');
    await expect(dashboard.getStatCard('revenue')).toContainText('$48,295');
    await expect(dashboard.getStatCard('orders')).toContainText('1,423');
    await expect(dashboard.getStatCard('growth')).toContainText('18.2%');
  });

  test('should display activity chart', async () => {
    await expect(dashboard.activityChart).toBeVisible();
    const bars = dashboard.activityChart.locator('.chart-bar');
    await expect(bars).toHaveCount(12);
  });

  test('should display recent events list', async () => {
    await expect(dashboard.eventsList).toBeVisible();
    const events = dashboard.getEventItems();
    await expect(events).toHaveCount(5);
  });

  test('should display page title', async () => {
    await expect(dashboard.pageTitle).toHaveText('Dashboard');
  });
});
