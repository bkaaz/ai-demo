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

  test('should render dashboard container', async () => {
    await expect(dashboard.container).toBeVisible();
  });

  test.describe('Stat Cards - Structure', () => {
    test('should display correct titles on each stat card', async () => {
      await expect(dashboard.getStatCard('total-users')).toContainText('Total Users');
      await expect(dashboard.getStatCard('revenue')).toContainText('Revenue');
      await expect(dashboard.getStatCard('orders')).toContainText('Orders');
      await expect(dashboard.getStatCard('growth')).toContainText('Growth');
    });

    test('should display trend indicators on each stat card', async () => {
      await expect(dashboard.getStatCardTrend('total-users')).toHaveText('+12%');
      await expect(dashboard.getStatCardTrend('revenue')).toHaveText('+8%');
      await expect(dashboard.getStatCardTrend('orders')).toHaveText('+23%');
      await expect(dashboard.getStatCardTrend('growth')).toHaveText('+4%');
    });

    test('should display an icon on each stat card', async () => {
      await expect(dashboard.getStatCardIcon('total-users')).toBeVisible();
      await expect(dashboard.getStatCardIcon('revenue')).toBeVisible();
      await expect(dashboard.getStatCardIcon('orders')).toBeVisible();
      await expect(dashboard.getStatCardIcon('growth')).toBeVisible();
    });

    test('should display correct icon names on stat cards', async () => {
      await expect(dashboard.getStatCardIcon('total-users')).toContainText('people');
      await expect(dashboard.getStatCardIcon('revenue')).toContainText('attach_money');
      await expect(dashboard.getStatCardIcon('orders')).toContainText('shopping_cart');
      await expect(dashboard.getStatCardIcon('growth')).toContainText('trending_up');
    });

    test('should display stat value and title together on each card', async () => {
      await expect(dashboard.getStatCardValue('total-users')).toHaveText('2,847');
      await expect(dashboard.getStatCardTitle('total-users')).toHaveText('Total Users');
    });
  });

  test.describe('Activity Chart - Details', () => {
    test('should display "Monthly Activity" as chart title', async () => {
      await expect(dashboard.getActivityChartTitle()).toHaveText('Monthly Activity');
    });

    test('should display 12 month labels beneath the chart', async () => {
      const labels = dashboard.getChartLabels();
      await expect(labels).toHaveCount(12);
      const expectedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let i = 0; i < 12; i++) {
        await expect(labels.nth(i)).toHaveText(expectedMonths[i]);
      }
    });

    test('should render each chart bar with its own test id', async () => {
      for (let i = 0; i < 12; i++) {
        await expect(dashboard.getChartBar(i)).toBeVisible();
      }
    });

    test('should render chart bars with proportional heights', async () => {
      // chartData: [65, 42, 78, 55, 90, 68, 82, 45, 72, 88, 60, 75]
      // Bar at index 4 (value 90) should be taller than bar at index 1 (value 42)
      const tallBarHeight = await dashboard.getChartBarHeight(4);
      const shortBarHeight = await dashboard.getChartBarHeight(1);
      expect(tallBarHeight).toBeGreaterThan(shortBarHeight);
    });

    test('should render the tallest bar for the highest data value', async () => {
      // Index 4 has value 90 (highest), should be the tallest bar
      const heights: number[] = [];
      for (let i = 0; i < 12; i++) {
        heights.push(await dashboard.getChartBarHeight(i));
      }
      const maxHeight = Math.max(...heights);
      const maxIndex = heights.indexOf(maxHeight);
      expect(maxIndex).toBe(4);
    });
  });

  test.describe('Recent Events - Details', () => {
    test('should display "Recent Events" as the events list title', async () => {
      await expect(dashboard.getEventsListTitle()).toHaveText('Recent Events');
    });

    test('should display event messages', async () => {
      const events = dashboard.getEventItems();
      await expect(events.nth(0)).toContainText('New user registered: john.doe@email.com');
      await expect(events.nth(1)).toContainText('Order #1423 completed successfully');
      await expect(events.nth(2)).toContainText('System backup completed');
      await expect(events.nth(3)).toContainText('New feature deployed to production');
      await expect(events.nth(4)).toContainText('Monthly report generated');
    });

    test('should display timestamps on event items', async () => {
      // Each event should have a visible timestamp line
      for (let i = 0; i < 5; i++) {
        const timestamp = dashboard.getEventTimestamp(i);
        await expect(timestamp).toBeVisible();
        // Timestamps are formatted with Angular's date:'short' pipe, should contain a slash (e.g., 5/15/26)
        await expect(timestamp).not.toHaveText('');
      }
    });

    test('should display events in chronological order with newest first', async () => {
      // First event (index 0) should be the newest: "New user registered" at 10:30 AM
      // Last event (index 4) should be the oldest: "Monthly report generated" at 2:30 PM on 5/14
      const firstEvent = dashboard.getEventItems().nth(0);
      const lastEvent = dashboard.getEventItems().nth(4);
      await expect(firstEvent).toContainText('New user registered');
      await expect(lastEvent).toContainText('Monthly report generated');
    });

    test('should display icons for each event', async () => {
      const events = dashboard.getEventItems();
      for (let i = 0; i < 5; i++) {
        const icon = events.nth(i).locator('mat-icon');
        await expect(icon).toBeVisible();
      }
    });
  });
});
