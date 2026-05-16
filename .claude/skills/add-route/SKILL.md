---
name: add-route
description: Add a new lazy-loaded route with component, page object, and navigation test.
disable-model-invocation: true
allowed-tools: Bash(npx ng build*) Bash(npx playwright test*)
---

Add a new lazy-loaded route "$ARGUMENTS" to the application.

## Current state

Current routes:
!`cat src/app/app.routes.ts`

Current nav items:
!`grep -A 5 'navItems' src/app/layout/layout.component.ts`

## Steps

1. Create component in `src/app/$ARGUMENTS/` (standalone, Material, signals, data-testid)
2. Add route in `app.routes.ts` as lazy `loadComponent` — match the existing pattern
3. Add link in `src/app/layout/layout.component.ts` `navItems` (pick a Material icon)
4. Create Page Object in `e2e/pages/$ARGUMENTS.page.ts`
5. Add navigation test in `e2e/tests/navigation.spec.ts`

## After adding

- `npx ng build` — verify compilation
- `npx playwright test e2e/tests/navigation.spec.ts` — verify navigation
