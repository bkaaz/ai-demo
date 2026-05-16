---
name: review
description: Code review of current branch changes — checks security, TypeScript types, Angular patterns, accessibility. Produces a severity-ranked report. Use when the user asks to review code, check changes, or wants feedback before merging.
allowed-tools: Bash(npx ng lint*)
---

Perform a code review of changes on the current branch.

## Changes to review

Staged changes:
!`git diff --cached`

Unstaged changes:
!`git diff`

## Checklist (by priority)

### Critical (block merge)
- [ ] No security vulnerabilities (XSS via `innerHTML`, injection)
- [ ] No hardcoded secrets/credentials
- [ ] Correct TypeScript types (no `any`, no unnecessary type assertions)

### Important (should fix)
- [ ] Standalone components (no NgModules)
- [ ] Signals for local state (not RxJS Subjects)
- [ ] `@for`/`@if` control flow (not `*ngFor`/`*ngIf`)
- [ ] `data-testid` on new interactive elements
- [ ] Error handling for user-facing operations
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Responsive design

### Suggestions
- [ ] Naming conventions (PascalCase components, camelCase methods)
- [ ] DRY — any duplicated code to extract
- [ ] Performance — unnecessary re-renders, heavy operations in templates

## Output format

For each finding:
```
CRITICAL: [file:line] description + proposed fix
IMPORTANT: [file:line] description + proposed fix
SUGGESTION: [file:line] description
```

End with: summary in 2-3 sentences.
