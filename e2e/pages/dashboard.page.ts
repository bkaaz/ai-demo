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

  getStatCardTitle(name: string) {
    return this.getStatCard(name).locator('.stat-title');
  }

  getStatCardValue(name: string) {
    return this.getStatCard(name).locator('.stat-value');
  }

  getStatCardTrend(name: string) {
    return this.getStatCard(name).locator('.stat-trend');
  }

  getStatCardIcon(name: string) {
    return this.getStatCard(name).locator('.stat-icon');
  }

  getChartBar(index: number) {
    return this.page.locator(`[data-testid="chart-bar-${index}"]`);
  }

  async getChartBarHeight(index: number): Promise<number> {
    const bar = this.getChartBar(index);
    const style = await bar.getAttribute('style');
    const match = style?.match(/height:\s*([\d.]+)%/);
    return match ? parseFloat(match[1]) : 0;
  }

  getChartLabels() {
    return this.activityChart.locator('.chart-label');
  }

  getActivityChartTitle() {
    return this.activityChart.locator('mat-card-title');
  }

  getEventsListTitle() {
    return this.eventsList.locator('mat-card-title');
  }

  getEventItems() {
    return this.page.locator('[data-testid="event-item"]');
  }

  getEventMessage(index: number) {
    return this.getEventItems().nth(index).locator('[matlistitemtitle]');
  }

  getEventTimestamp(index: number) {
    return this.getEventItems().nth(index).locator('[matlistitemline]');
  }
}
