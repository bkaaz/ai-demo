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
npm start                 # Dev server (port 4200)
npm run build             # Production build
npm test                  # Unit tests (single run, headless)
npm run lint              # ESLint
npm run e2e               # E2E tests (27 tests)
npm run e2e:ui            # Interactive test runner
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

### Unit Tests (Karma + Jasmine)
- One `.spec.ts` per component in the same directory
- `TestBed.configureTestingModule` with standalone component + `NoopAnimationsModule`
- Mock injected services with `jasmine.createSpyObj`
- Run: `npm test` (single run, headless)
- Run with watch: `npm test -- --watch`

### E2E Tests (Playwright)
- Playwright with system Chrome (`channel: 'chrome'`)
- Page Object Model in `e2e/pages/`
- Tests grouped by feature in `e2e/tests/`
- JUnit XML reporter for CI integration
- Screenshots on failure

## CI/CD
- GitHub Actions (`.github/workflows/ci.yml`)
- Jobs: lint → build → test-e2e (e2e needs build)
- Artifacts: playwright-report/, test-results/ (7-day retention)

## UI Verification

After making changes to component templates, styles, or layout:
- Use Playwright MCP tools to verify the rendered result in the browser
- Navigate to the affected route and take a screenshot
- Save all screenshots to `.playwright-mcp/` directory (NEVER to project root)
- Confirm the UI renders correctly before reporting the task as complete
- If the dev server isn't running, start it with `npx ng serve --port 4200`
