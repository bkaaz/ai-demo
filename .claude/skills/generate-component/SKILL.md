---
name: generate-component
description: Generate a new standalone Angular 19 component with Material, signals, data-testid, SCSS, route, and nav link.
disable-model-invocation: true
allowed-tools: Bash(npx ng build*)
---

Generate a new standalone Angular component "$ARGUMENTS" in src/app/$ARGUMENTS/.

## Reference — read these first

Read `src/app/dashboard/dashboard.component.ts` and `src/app/users/users.component.ts` to match existing patterns.

Current components on disk:
!`find src/app -maxdepth 1 -type d`

Current routes:
!`cat src/app/app.routes.ts`

## Requirements

1. Standalone component (no NgModules)
2. Angular Material — pick appropriate components for the context
3. State with `signal()`, derived state with `computed()`
4. Template with `@for`/`@if` control flow (not `*ngFor`/`*ngIf`)
5. `data-testid` on EVERY interactive element
6. SCSS with responsive layout (mobile-first, breakpoint at 768px)
7. Add lazy-loaded route in `app.routes.ts` — match the existing pattern
8. Add link in `layout.component.ts` `navItems` array (pick a Material icon)

Follow the template in [component-template.md](component-template.md).

## After generating

- Run `npx ng build` to verify compilation
- List all `data-testid` attributes added (for future tests)
