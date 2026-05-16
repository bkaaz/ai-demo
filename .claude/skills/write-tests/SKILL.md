---
name: write-tests
description: Generate Playwright E2E tests with page objects for an Angular component.
disable-model-invocation: true
allowed-tools: Bash(npx playwright test*)
---

Write Playwright E2E tests for the "$ARGUMENTS" component.

## Existing test files

Page objects:
!`ls e2e/pages/`

Test files:
!`ls e2e/tests/`

## Step 1 — Page Object (`e2e/pages/$ARGUMENTS.page.ts`)

- Locators ONLY from `data-testid` (read the component HTML to find them)
- Action methods: navigate, click, fill, select
- Getters for assertions
- Follow the pattern in [examples/page-object-example.md](examples/page-object-example.md)

## Step 2 — Tests (`e2e/tests/$ARGUMENTS.spec.ts`)

- `beforeEach` with `goto()`
- Test both happy path + edge cases
- Each test independent (no shared state)
- Naming: "should [action] when [condition]"

## After writing

Run: `npx playwright test e2e/tests/$ARGUMENTS.spec.ts --reporter=line`

Show result — how many tests pass/fail.
