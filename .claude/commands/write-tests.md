Write Playwright E2E tests for the "$ARGUMENTS" component.

Step 1 — Page Object (e2e/pages/$ARGUMENTS.page.ts):
- Locators ONLY from data-testid (read the component HTML to find them)
- Action methods: navigate, click, fill, select
- Getters for assertions

Step 2 — Tests (e2e/tests/$ARGUMENTS.spec.ts):
- beforeEach with goto()
- Test both happy path + edge cases
- Each test independent (no shared state)
- Naming: "should [action] when [condition]"

Use e2e/pages/users.page.ts and e2e/tests/users.spec.ts as reference.

After writing, run: `npx playwright test e2e/tests/$ARGUMENTS.spec.ts --reporter=line`
Show result — how many tests pass/fail.
