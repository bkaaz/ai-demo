Refactor: $ARGUMENTS

Rules:
1. BEFORE refactoring, run tests: `npx playwright test --reporter=line`
2. Preserve ALL data-testid attributes (tests depend on them)
3. Don't change public component API without updating tests
4. Don't add new dependencies

Approach:
- Read the current code
- Plan changes (explain what you intend BEFORE starting)
- Apply changes incrementally
- AFTER refactoring, run tests again

Show:
- What changed (brief description)
- Test results before and after
- Whether bundle size changed
