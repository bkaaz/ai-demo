import { Page, Locator } from '@playwright/test';

export class LayoutPage {
  readonly page: Page;
  readonly toolbar: Locator;
  readonly menuToggle: Locator;
  readonly appTitle: Locator;
  readonly sidenav: Locator;
  readonly navDashboard: Locator;
  readonly navUsers: Locator;
  readonly navSettings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toolbar = page.locator('[data-testid="toolbar"]');
    this.menuToggle = page.locator('[data-testid="menu-toggle"]');
    this.appTitle = page.locator('[data-testid="app-title"]');
    this.sidenav = page.locator('[data-testid="sidenav"]');
    this.navDashboard = page.locator('[data-testid="nav-dashboard"]');
    this.navUsers = page.locator('[data-testid="nav-users"]');
    this.navSettings = page.locator('[data-testid="nav-settings"]');
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async navigateTo(section: 'dashboard' | 'users' | 'settings') {
    const navItem = this.page.locator(`[data-testid="nav-${section}"]`);
    await navItem.click();
  }

  async toggleSidenav() {
    await this.menuToggle.click();
  }
}
