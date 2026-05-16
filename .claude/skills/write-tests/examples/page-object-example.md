# Page Object Pattern Reference

Canonical example from `e2e/pages/users.page.ts`:

```typescript
import { Page, Locator } from '@playwright/test';

export class UsersPage {
  readonly page: Page;
  readonly container: Locator;
  readonly pageTitle: Locator;
  readonly searchInput: Locator;
  readonly roleFilter: Locator;
  readonly table: Locator;
  readonly paginator: Locator;
  readonly emptyState: Locator;
  readonly sortName: Locator;
  readonly sortEmail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('[data-testid="users-page"]');
    this.pageTitle = page.locator('[data-testid="page-title"]');
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.roleFilter = page.locator('[data-testid="role-filter"]');
    this.table = page.locator('[data-testid="users-table"]');
    this.paginator = page.locator('[data-testid="paginator"]');
    this.emptyState = page.locator('[data-testid="empty-state"]');
    this.sortName = page.locator('[data-testid="sort-name"]');
    this.sortEmail = page.locator('[data-testid="sort-email"]');
  }

  async goto() {
    await this.page.goto('/users');
  }

  async search(text: string) {
    await this.searchInput.fill(text);
  }

  async filterByRole(role: string) {
    await this.roleFilter.click();
    await this.page.locator('mat-option').filter({ hasText: role }).click();
  }

  getRows() {
    return this.page.locator('[data-testid="user-row"]');
  }

  async getRowCount() {
    return this.getRows().count();
  }
}
```

## Conventions

1. ALL locators use `[data-testid="..."]` — never CSS classes or tag names
2. Locators declared as `readonly` class properties in constructor
3. `goto()` method for navigation
4. Action methods are `async` and named as verbs (search, filter, sort)
5. Getter methods return Locators for the test to assert on
6. One Page Object per feature/page
