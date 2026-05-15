import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly container: Locator;
  readonly pageTitle: Locator;
  readonly statsGrid: Locator;
  readonly activityChart: Locator;
  readonly eventsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('[data-testid="dashboard"]');
    this.pageTitle = page.locator('[data-testid="page-title"]');
    this.statsGrid = page.locator('[data-testid="stats-grid"]');
    this.activityChart = page.locator('[data-testid="activity-chart"]');
    this.eventsList = page.locator('[data-testid="events-list"]');
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  getStatCard(name: string) {
    return this.page.locator(`[data-testid="stat-${name}"]`);
  }

  getChartBar(index: number) {
    return this.page.locator(`[data-testid="chart-bar-${index}"]`);
  }

  getEventItems() {
    return this.page.locator('[data-testid="event-item"]');
  }
}
