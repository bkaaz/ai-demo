Add a new lazy-loaded route "$ARGUMENTS" to the application.

Steps:
1. Create component in src/app/$ARGUMENTS/ (standalone, Material, signals, data-testid)
2. Add route in app.routes.ts as lazy loadComponent
3. Add link in src/app/layout/layout.component.ts navItems (pick a Material icon)
4. Create Page Object in e2e/pages/$ARGUMENTS.page.ts
5. Add navigation test in e2e/tests/navigation.spec.ts

After adding:
- `npx ng build` — verify compilation
- `npx playwright test e2e/tests/navigation.spec.ts` — verify navigation

Use existing routes in app.routes.ts and components in src/app/ as reference.
