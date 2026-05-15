# AI Demo App — Project Context

## Stack
- Angular 19 (standalone components, signals)
- Angular Material (Azure Blue theme)
- SCSS styles
- Playwright E2E tests

## Architecture
- 4 feature components: Dashboard, Users, Settings + Layout shell
- Lazy-loaded routes via `loadComponent()`
- Angular `signal()` for reactive state (no RxJS Subjects)
- Reactive Forms with validation in Settings
- `data-testid` attributes on all interactive elements

## Commands
```bash
npx ng serve              # Dev server (port 4200)
npx ng build              # Production build
npx ng lint               # ESLint
npx playwright test       # E2E tests (27 tests)
npx playwright test --ui  # Interactive test runner
```

## Project Structure
```
src/app/
├── layout/       # Shell: sidenav + toolbar + router-outlet
├── dashboard/    # Stat cards, activity chart, events list
├── users/        # MatTable with sort, filter, search, pagination
├── settings/     # Reactive form with validation + snackbar
└── app.routes.ts # Lazy-loaded route definitions
e2e/
├── pages/        # Page Object Model classes
└── tests/        # Test specs (navigation, dashboard, users, settings)
```

## Conventions
- Standalone components (no NgModules)
- One component per file (template/style can be inline for small components)
- `data-testid` for test selectors (never CSS classes or DOM structure)
- Signals for component state, computed() for derived values
- Material components for all UI elements
- Page Object Model pattern for E2E tests

## Testing
- Playwright with system Chrome (`channel: 'chrome'`)
- Page Object Model in `e2e/pages/`
- Tests grouped by feature in `e2e/tests/`
- JUnit XML reporter for CI integration
- Screenshots on failure

## CI/CD
- GitLab CI with stages: install → lint → build → test:e2e
- Artifacts: playwright-report/, test-results/junit.xml
