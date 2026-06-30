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
  readonly phoneInput: Locator;
  readonly bioInput: Locator;
  readonly bioCounter: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
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
    this.phoneInput = page.locator('[data-testid="phone-input"]');
    this.bioInput = page.locator('[data-testid="bio-input"]');
    this.bioCounter = page.locator('[data-testid="bio-counter"]');
    this.newPasswordInput = page.locator('[data-testid="new-password-input"]');
    this.confirmPasswordInput = page.locator('[data-testid="confirm-password-input"]');
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

  async fillPhone(value: string) {
    await this.phoneInput.clear();
    await this.phoneInput.fill(value);
  }

  async fillBio(value: string) {
    await this.bioInput.clear();
    await this.bioInput.fill(value);
  }

  async fillNewPassword(value: string) {
    await this.newPasswordInput.clear();
    await this.newPasswordInput.fill(value);
  }

  async fillConfirmPassword(value: string) {
    await this.confirmPasswordInput.clear();
    await this.confirmPasswordInput.fill(value);
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
