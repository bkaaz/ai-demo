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

  test('should show phone pattern error for invalid input', async () => {
    await settings.fillPhone('abc');
    await settings.phoneInput.blur();
    await settings.save();
    await expect(settings.getError('phone-pattern-error')).toBeVisible();
  });

  test('should not show phone pattern error for valid input', async () => {
    await settings.fillPhone('+48123456789');
    await settings.phoneInput.blur();
    await expect(settings.getError('phone-pattern-error')).not.toBeVisible();
  });

  test('should display bio character counter', async () => {
    await expect(settings.bioCharCounter).toContainText('0/200');
  });

  test('should update bio character counter when typing', async () => {
    await settings.fillBio('Hello');
    await expect(settings.bioCharCounter).toContainText('5/200');
  });

  test('should show password minlength error', async () => {
    await settings.fillNewPassword('short');
    await settings.newPasswordInput.blur();
    await settings.save();
    await expect(settings.getError('new-password-minlength-error')).toBeVisible();
  });

  test('should show password mismatch error when passwords differ', async () => {
    await settings.fillNewPassword('password123');
    await settings.fillConfirmPassword('different456');
    await settings.confirmPasswordInput.blur();
    await expect(settings.getError('confirm-password-mismatch-error')).toBeVisible();
  });

  test('should not show mismatch error when passwords match', async () => {
    await settings.fillNewPassword('samepassword');
    await settings.fillConfirmPassword('samepassword');
    await settings.confirmPasswordInput.blur();
    await expect(settings.getError('confirm-password-mismatch-error')).not.toBeVisible();
  });

  test('should save successfully when password fields are empty', async () => {
    await settings.fillName('Jane Doe');
    await settings.save();
    const snackbar = settings.page.locator('mat-snack-bar-container');
    await expect(snackbar).toContainText('Settings saved successfully');
  });
});
