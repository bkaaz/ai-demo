# Agent Instructions

This file provides context and rules for AI agents (Claude Code subagents) working on this project.

## Custom Agents (`.claude/agents/`)

Autonomous specialists that run independently and return structured reports. Unlike commands (`/generate-component`), agents analyze broader scope and apply expert judgment — but they work without user interaction.

| Agent | File | Specialty |
|-------|------|-----------|
| Code Reviewer | `code-reviewer.md` | Analyzes code quality, types, patterns, and produces severity-ranked report |
| Design System Guardian | `design-system.md` | Audits visual consistency — theme, spacing, typography across all components |
| Accessibility Auditor | `accessibility-auditor.md` | WCAG 2.1 AA compliance audit with actionable fixes |

### Agents vs Commands

- **Commands** (`.claude/commands/`) — one-shot recipes invoked with `/command-name args`. Clear input → output. Best for: generating code, running checks, transforming files.
- **Agents** (`.claude/agents/`) — autonomous experts invoked with `@AgentName`. They scan, analyze, and return comprehensive reports. Best for: audits, reviews, consistency checks that require judgment.

### When to use which

| Need | Use |
|------|-----|
| Generate a component | `/generate-component notifications` |
| Write E2E tests | `/write-tests clock` |
| Quick diff review | `/review` |
| Deep code review with reasoning | `@Code Reviewer` |
| Full accessibility audit | `@Accessibility Auditor` |
| Check visual consistency | `@Design System Guardian` |

---

## General Rules for All Agents

1. **Read CLAUDE.md first** — it has project conventions and commands
2. **Check existing patterns** — look at similar components before creating new ones
3. **Run tests after changes** — `npx playwright test` must pass
4. **Don't add unnecessary dependencies** — use what's already available
5. **Keep it simple** — this is a demo app, prefer clarity over cleverness

---

## Component Generator (reference for `/generate-component`)

### Rules
- Always use standalone components (no NgModules)
- Import Angular Material modules directly in the component
- Add `data-testid` to every interactive element
- Use Angular `signal()` for state, `computed()` for derived values
- Follow existing file naming: `feature-name.component.{ts,html,scss}`
- Use `@for` and `@if` control flow (not *ngFor/*ngIf)

---

## Test Writer (reference for `/write-tests`)

### Rules
- Create Page Object class in `e2e/pages/` first
- Use `data-testid` selectors exclusively
- Group tests by feature in `e2e/tests/`
- Test both happy path and edge cases
- Use descriptive test names: "should [action] when [condition]"
- Keep tests independent (no shared state between tests)

---

## Refactoring (reference for `/refactor`)

### Rules
- Run E2E tests before AND after refactoring
- Preserve all `data-testid` attributes
- Don't change component public API without updating tests
- Extract shared logic into utility functions, not services (for simplicity)
- Keep bundle size in mind (avoid unnecessary imports)
