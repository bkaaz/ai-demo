# Agent Instructions

This file provides context and rules for AI agents (Claude Code subagents) working on this project.

## Custom Agents (`.claude/agents/`)

Full agent personas with distinct expertise areas. Each agent is a conversational specialist — it asks questions, makes decisions, and explains reasoning. Unlike one-shot commands (`/generate-component`), agents maintain context throughout the session.

| Agent | File | Specialty |
|-------|------|-----------|
| UI Component Architect | `ui-architect.md` | Designs and builds components with full system awareness |
| E2E Test Engineer | `e2e-test-engineer.md` | Writes and debugs Playwright tests strategically |
| Code Reviewer | `code-reviewer.md` | Interactive review with tradeoff discussion |
| Design System Guardian | `design-system.md` | Visual consistency — theme, spacing, typography |
| Accessibility Auditor | `accessibility-auditor.md` | WCAG 2.1 AA compliance audits |

### Agents vs Commands

- **Commands** (`.claude/commands/`) — one-shot recipes invoked with `/command-name args`. Execute a script and produce output.
- **Agents** (`.claude/agents/`) — persistent personas you converse with. They reason, ask questions, and exercise judgment across a session.

---

## Component Generator Agent

### Role
Generate new Angular standalone components following project patterns.

### Rules
- Always use standalone components (no NgModules)
- Import Angular Material modules directly in the component
- Add `data-testid` to every interactive element
- Use Angular `signal()` for state, `computed()` for derived values
- Follow existing file naming: `feature-name.component.{ts,html,scss}`
- Use `@for` and `@if` control flow (not *ngFor/*ngIf)

### Example prompt
```
Generate a new standalone component "notifications" with:
- A list of notifications using mat-list
- Badge count using signal()
- Mark as read functionality
- data-testid on all interactive elements
```

---

## Test Writer Agent

### Role
Write Playwright E2E tests following the Page Object Model pattern.

### Rules
- Create Page Object class in `e2e/pages/` first
- Use `data-testid` selectors exclusively
- Group tests by feature in `e2e/tests/`
- Test both happy path and edge cases
- Use descriptive test names: "should [action] when [condition]"
- Keep tests independent (no shared state between tests)

### Example prompt
```
Write E2E tests for the notifications component:
- Page Object in e2e/pages/notifications.page.ts
- Tests: list renders, mark as read, badge updates, empty state
```

---

## Code Reviewer Agent

### Role
Review code changes for quality, patterns, and potential issues.

### Checklist
- [ ] Standalone components (no NgModules)
- [ ] Signals used for state (not RxJS Subjects for local state)
- [ ] data-testid on interactive elements
- [ ] No hardcoded strings (use constants or i18n)
- [ ] Proper TypeScript types (no `any`)
- [ ] Error handling for user-facing operations
- [ ] Accessibility: ARIA labels, keyboard navigation
- [ ] Responsive design considerations

### Example prompt
```
Review the changes on current branch:
- Check for pattern violations
- Suggest improvements
- Verify test coverage for new features
```

---

## Refactoring Agent

### Role
Refactor code while preserving behavior and test coverage.

### Rules
- Run E2E tests before AND after refactoring
- Preserve all `data-testid` attributes
- Don't change component public API without updating tests
- Extract shared logic into utility functions, not services (for simplicity)
- Keep bundle size in mind (avoid unnecessary imports)

---

## General Rules for All Agents

1. **Read CLAUDE.md first** — it has project conventions and commands
2. **Check existing patterns** — look at similar components before creating new ones
3. **Run tests after changes** — `npx playwright test` must pass
4. **Don't add unnecessary dependencies** — use what's already available
5. **Keep it simple** — this is a demo app, prefer clarity over cleverness
