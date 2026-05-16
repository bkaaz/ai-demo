# AI Workflows — Reusable Prompts

Ready-to-use prompts for Claude Code. Copy and paste, replace placeholders in `{{...}}`.

---

## 1. Generate a new component

```
Generate a new standalone Angular component "{{NAME}}" in src/app/{{NAME}}/:
- Use Angular Material: {{MATERIAL_COMPONENTS}}
- State with signal(): {{STATE_DESCRIPTION}}
- Template with @for/@if control flow
- data-testid on every interactive element
- SCSS with Material theming variables
- Responsive layout (mobile-first)

Use existing components in src/app/dashboard/ and src/app/users/ as reference.
```

### Usage example:
```
Generate a new standalone Angular component "notifications" in src/app/notifications/:
- Use Angular Material: mat-list, mat-badge, mat-icon-button
- State with signal(): notification list, unread count
- Template with @for/@if control flow
- data-testid on every interactive element
- SCSS with Material theming variables
- Responsive layout (mobile-first)
```

---

## 2. Generate E2E tests

```
Write Playwright E2E tests for the "{{NAME}}" component:

1. Create Page Object in e2e/pages/{{NAME}}.page.ts:
   - Locators from data-testid
   - Action methods (click, fill, navigate)
   - Getters for assertions

2. Create tests in e2e/tests/{{NAME}}.spec.ts:
   - {{LIST_OF_SCENARIOS}}
   - Use beforeEach with goto()
   - Test happy path + edge cases
   - Each test independent (no shared state)

Use e2e/pages/users.page.ts and e2e/tests/users.spec.ts as reference.
```

---

## 3. Code review

```
Review the current branch changes:

Checklist:
- [ ] Standalone components (no NgModules)
- [ ] Signals for state (not RxJS Subjects)
- [ ] data-testid on interactive elements
- [ ] Correct TypeScript types (no any)
- [ ] Error handling
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Responsive design
- [ ] No hardcoded strings

Report: critical > important > suggestions.
For each issue provide file:line and proposed fix.
```

---

## 4. Refactoring

```
Refactor {{FILE_OR_COMPONENT}}:

Goal: {{REFACTORING_GOAL}}

Rules:
- Preserve all data-testid attributes
- Don't change public component API without updating tests
- Run tests before AND after: npx playwright test
- Keep bundle size in mind (don't add unnecessary imports)
- Extract shared logic into utility functions

Show diff before and after.
```

---

## 5. Debugging

```
Debug the problem: {{PROBLEM_DESCRIPTION}}

Steps:
1. Reproduce the problem (describe how)
2. Find root cause (check logs, network, state)
3. Propose fix
4. Verify fix doesn't break existing tests

Context:
- File: {{FILE}}
- Expected behavior: {{EXPECTED}}
- Actual behavior: {{ACTUAL}}
```

---

## 6. Add a route (new page)

```
Add a new lazy-loaded route "{{NAME}}":

1. Create component in src/app/{{NAME}}/
2. Add route in app.routes.ts (lazy loadComponent)
3. Add link in layout sidenav (icon: {{ICON}})
4. Add data-testid="nav-{{NAME}}" on the link
5. Create basic Page Object and navigation test

Use existing routes in app.routes.ts as reference.
```

---

## 7. Subagent: Parallel Exploration

```
Run in parallel:

Agent 1 (Explore): Find all components using signal() and show how they manage state
Agent 2 (Explore): Check data-testid coverage — which interactive elements lack testid
Agent 3 (Plan): Plan implementation of {{NEW_FEATURE}}

Collect results and summarize in 5 bullet points.
```

---

## Tips

- **Context is key** — Claude Code reads CLAUDE.md automatically, so prompts can be shorter
- **Patterns > instructions** — "follow the pattern in X" works better than long descriptions
- **Incremental changes** — 3 small prompts beat 1 giant one
- **Tests as validation** — always end with "run npx playwright test"
- **Subagents for exploration** — use Explore agent before implementing
