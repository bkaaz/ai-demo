# Implementation Plan: POC — AI-Assisted Development

## Context

The goal is to prepare a complete repo with an Angular 19 application that serves as a POC for a presentation (30-60 min). The presentation demonstrates how AI (Claude Code) supports a developer's daily workflow — from scaffolding, through tests, code review, to CI/CD. The repo contains full demo documentation, AI workflow configurations, and a presentation agenda document.

---

## Phase 1: Angular Application Scaffold

**Files:** `package.json`, `angular.json`, `tsconfig.json`, `src/`

1. `ng new claude-app-1 --standalone --style=scss --routing --skip-git`
2. Add Angular Material (`ng add @angular/material`)
3. Directory structure:
   ```
   src/app/
   ├── layout/          # Layout component (sidenav + toolbar)
   ├── dashboard/       # Dashboard (stat cards + chart + events)
   ├── users/           # Users table (filter/sort/search)
   ├── settings/        # Settings form (reactive forms + validation)
   └── app.routes.ts    # Lazy-loaded routes
   ```

### Components

**Layout** — Application shell
- Sidenav with Angular Material (`mat-sidenav`)
- Toolbar with title and menu toggle
- `<router-outlet>` in content area
- Responsive — sidenav mode `over` on mobile

**Dashboard** — Home page
- 4 stat cards (users, revenue, orders, growth) with `mat-card`
- Activity chart (simple CSS/SVG bar chart — no external lib)
- Recent events list
- Angular `signal()` for data

**Users** — Data table
- `mat-table` with `MatSort` and `MatPaginator`
- Filter by role (dropdown `mat-select`)
- Text search (`mat-form-field` input)
- Mock data (15 users)
- `data-testid` on all interactive elements

**Settings** — Form
- Reactive Forms with `FormBuilder`
- Fields: name, email, notifications toggle, theme select
- Validation: required, email pattern, min length
- Display validation errors
- Save button with `mat-snackbar` confirmation

### Routing (lazy-loaded)

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/...') },
  { path: 'users', loadComponent: () => import('./users/...') },
  { path: 'settings', loadComponent: () => import('./settings/...') },
];
```

---

## Phase 2: E2E Tests (Playwright)

**Files:** `e2e/`, `playwright.config.ts`

1. Install Playwright
2. Page Object Model in `e2e/pages/`:
   - `layout.page.ts` — navigation, sidenav
   - `dashboard.page.ts` — stat cards, chart
   - `users.page.ts` — table, filters, search
   - `settings.page.ts` — form, validation
3. 27 tests in `e2e/tests/`:
   - **Navigation (6):** routing, sidenav toggle, active link, page titles, back navigation, deep link
   - **Dashboard (5):** stat cards render, values present, chart visible, events list, responsive
   - **Users (8):** table renders, sort by name, sort by email, filter by role, search, pagination, combined filter+search, empty state
   - **Settings (8):** form renders, required validation, email validation, min length, save success, toggle state, theme select, form reset

---

## Phase 3: AI Workflow Configuration

### 3a. `CLAUDE.md` — Project context

- Conventions: Angular 19 standalone, Material, signals, Playwright POM
- Commands: ng serve, npx playwright test, ng build
- Patterns: lazy-loaded routes, reactive forms, material theming

### 3b. `AGENTS.md` — Subagent instructions

- Sections: Component Generator, Test Writer, Code Reviewer
- Each agent with clear scope, allowed/forbidden actions
- Usage examples

### 3c. `.claude/settings.json` — Hooks and permissions

```json
{
  "permissions": {
    "allow": ["Bash(npx ng serve*)", "Bash(npx playwright test*)", ...],
    "deny": ["Bash(rm -rf *)", "Bash(git push --force*)", ...]
  },
  "hooks": {
    "PreCommit": [{ "command": "npx ng lint --fix" }],
    "PostEdit": [{ "command": "npx ng build --configuration=development" }]
  }
}
```

### 3d. `.claude/commands/` — Custom slash commands

- `generate-component.md` — Generate a full component
- `write-tests.md` — Write POM + E2E tests
- `review.md` — Code review with checklist
- `explore.md` — Read-only codebase exploration
- `add-route.md` — Add new page end-to-end
- `refactor.md` — Refactor with tests before/after

### 3e. `docs/ai-workflows.md` — Reusable prompts

Prompt templates for:
1. Component generation
2. E2E test generation
3. Code review
4. Refactoring
5. Debugging

---

## Phase 4: CI/CD (GitLab)

**File:** `.gitlab-ci.yml`

- Stages: install → lint → build → test:unit → test:e2e
- Separate `test:e2e:mr` job for merge requests
- Artifacts: playwright-report/, test-results/junit.xml

---

## Phase 5: Presentation Document

**File:** `docs/demo-plan.md`

### Agenda (30-60 min)

| # | Section | Time | What to show |
|---|---------|------|--------------|
| 1 | Intro — Project context for AI | 5-8 min | CLAUDE.md, AGENTS.md, .claude/settings.json, commands/ |
| 2 | Code generation | 8-12 min | Live: add feature, compare with/without context |
| 3 | Subagents and parallelism | 8-10 min | Explore, Plan, parallel agents |
| 4 | E2E tests with AI | 5-8 min | 27 tests, POM, live test generation |
| 5 | Code review and quality | 5-8 min | Review with worktree, hooks |
| 6 | CI/CD pipeline | 3-5 min | .gitlab-ci.yml, artifacts |
| 7 | Q&A | 5-10 min | — |

---

## Implementation Order

| Step | What | Dependencies |
|------|------|--------------|
| 1 | Scaffold Angular + Material | — |
| 2 | Layout component (shell) | 1 |
| 3 | Dashboard component | 2 |
| 4 | Users component | 2 |
| 5 | Settings component | 2 |
| 6 | Routing + lazy loading | 2-5 |
| 7 | Playwright setup + POM | 1 |
| 8 | E2E tests (27) | 6, 7 |
| 9 | CLAUDE.md + AGENTS.md | 1 |
| 10 | .claude/settings.json + commands/ | 9 |
| 11 | docs/ai-workflows.md | 9 |
| 12 | .gitlab-ci.yml | 1 |
| 13 | docs/demo-plan.md | 1-12 |
| 14 | Verification — tests pass, app works | 1-13 |

---

## Verification

1. `ng serve` — app starts, navigation works, all 4 views render correctly
2. `npx playwright test` — all 27 tests pass
3. `ng build` — production build without errors
4. Review `docs/demo-plan.md` — agenda complete, talking points sensible
5. Check `CLAUDE.md`, `AGENTS.md`, `docs/ai-workflows.md` — content consistent with code
6. Check `.gitlab-ci.yml` — valid pipeline configuration
