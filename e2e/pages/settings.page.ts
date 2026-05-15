import { Page, Locator } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly container: Locator;
  readonly pageTitle: Locator;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly notificationsToggle: Locator;
  readonly themeSelect: Locator;
  readonly saveButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('[data-testid="settings-page"]');
    this.pageTitle = page.locator('[data-testid="page-title"]');
    this.form = page.locator('[data-testid="settings-form"]');
    this.nameInput = page.locator('[data-testid="name-input"]');
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.notificationsToggle = page.locator('[data-testid="notifications-toggle"]');
    this.themeSelect = page.locator('[data-testid="theme-select"]');
    this.saveButton = page.locator('[data-testid="save-button"]');
    this.resetButton = page.locator('[data-testid="reset-button"]');
  }

  async goto() {
    await this.page.goto('/settings');
  }

  async fillName(value: string) {
    await this.nameInput.clear();
    await this.nameInput.fill(value);
  }

  async fillEmail(value: string) {
    await this.emailInput.clear();
    await this.emailInput.fill(value);
  }

  async selectTheme(theme: string) {
    await this.themeSelect.click();
    await this.page.locator('mat-option').filter({ hasText: theme }).click();
  }

  async toggleNotifications() {
    await this.notificationsToggle.click();
  }

  async save() {
    await this.saveButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }

  getError(testId: string) {
    return this.page.locator(`[data-testid="${testId}"]`);
  }
}
