Generate a new standalone Angular component "$ARGUMENTS" in src/app/$ARGUMENTS/:

Requirements:
1. Standalone component (no NgModules)
2. Angular Material — pick appropriate components for the context
3. State with signal(), derived state with computed()
4. Template with @for/@if control flow (not *ngFor/*ngIf)
5. data-testid on EVERY interactive element
6. SCSS with responsive layout (mobile-first)
7. Add lazy-loaded route in app.routes.ts
8. Add link in layout sidenav (pick a Material icon)

Use existing components as reference — read src/app/dashboard/ and src/app/users/ first.

After generating:
- Run `npx ng build` to verify compilation
- List all data-testid attributes added (for future tests)
