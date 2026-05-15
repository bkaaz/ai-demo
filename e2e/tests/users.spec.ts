import { test, expect } from '@playwright/test';
import { UsersPage } from '../pages/users.page';

test.describe('Users', () => {
  let users: UsersPage;

  test.beforeEach(async ({ page }) => {
    users = new UsersPage(page);
    await users.goto();
  });

  test('should display users table', async () => {
    await expect(users.table).toBeVisible();
    await expect(users.pageTitle).toHaveText('Users');
  });

  test('should sort by name', async () => {
    await users.sortByName();
    const firstRow = users.getRows().first();
    await expect(firstRow).toContainText('Alice Johnson');
  });

  test('should sort by email', async () => {
    await users.sortByEmail();
    const firstRow = users.getRows().first();
    await expect(firstRow).toContainText('alice@example.com');
  });

  test('should filter by Admin role', async () => {
    await users.filterByRole('Admin');
    const rows = users.getRows();
    const count = await rows.count();
    expect(count).toBeLessThanOrEqual(5);
    for (let i = 0; i < count; i++) {
      await expect(rows.nth(i)).toContainText('Admin');
    }
  });

  test('should search by name', async () => {
    await users.search('Alice');
    await expect(users.getRows()).toHaveCount(1);
    await expect(users.getRows().first()).toContainText('Alice Johnson');
  });

  test('should paginate results', async () => {
    await expect(users.paginator).toBeVisible();
    const initialRows = await users.getRowCount();
    expect(initialRows).toBe(5);
  });

  test('should combine filter and search', async () => {
    await users.filterByRole('Editor');
    await users.search('Bob');
    await expect(users.getRows()).toHaveCount(1);
    await expect(users.getRows().first()).toContainText('Bob Smith');
  });

  test('should show empty state for no results', async () => {
    await users.search('nonexistentuserxyz');
    await expect(users.emptyState).toBeVisible();
    await expect(users.emptyState).toContainText('No users found');
  });
});
