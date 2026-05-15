import { test, expect } from '@playwright/test';
import { SettingsPage } from '../pages/settings.page';

test.describe('Settings', () => {
  let settings: SettingsPage;

  test.beforeEach(async ({ page }) => {
    settings = new SettingsPage(page);
    await settings.goto();
  });

  test('should display settings form', async () => {
    await expect(settings.form).toBeVisible();
    await expect(settings.pageTitle).toHaveText('Settings');
  });

  test('should show required validation for name', async () => {
    await settings.fillName('');
    await settings.nameInput.blur();
    await settings.save();
    await expect(settings.getError('name-required-error')).toBeVisible();
  });

  test('should show email validation error', async () => {
    await settings.fillEmail('invalid-email');
    await settings.emailInput.blur();
    await settings.save();
    await expect(settings.getError('email-pattern-error')).toBeVisible();
  });

  test('should show min length validation for name', async () => {
    await settings.fillName('AB');
    await settings.nameInput.blur();
    await settings.save();
    await expect(settings.getError('name-minlength-error')).toBeVisible();
  });

  test('should save settings successfully', async ({ page }) => {
    await settings.fillName('Jane Doe');
    await settings.fillEmail('jane@example.com');
    await settings.save();
    const snackbar = page.locator('mat-snack-bar-container');
    await expect(snackbar).toContainText('Settings saved successfully');
  });

  test('should toggle notifications', async () => {
    const toggle = settings.notificationsToggle;
    await expect(toggle).toBeVisible();
    const button = toggle.locator('button[role="switch"]');
    await expect(button).toHaveAttribute('aria-checked', 'true');
    await settings.toggleNotifications();
    await expect(button).toHaveAttribute('aria-checked', 'false');
  });

  test('should change theme', async () => {
    await settings.selectTheme('Dark');
    await expect(settings.themeSelect).toContainText('Dark');
  });

  test('should reset form to defaults', async () => {
    await settings.fillName('Changed Name');
    await settings.fillEmail('changed@test.com');
    await settings.reset();
    await expect(settings.nameInput).toHaveValue('John Doe');
    await expect(settings.emailInput).toHaveValue('john@example.com');
  });
});
