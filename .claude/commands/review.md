Perform a code review of changes on the current branch.

Check `git diff` and `git diff --cached` to see all changes.

Checklist (by priority):

**Critical:**
- [ ] No security vulnerabilities (XSS, injection)
- [ ] No hardcoded secrets/credentials
- [ ] Correct TypeScript types (no `any`, no unnecessary type assertions)

**Important:**
- [ ] Standalone components (no NgModules)
- [ ] Signals for local state (not RxJS Subjects)
- [ ] data-testid on new interactive elements
- [ ] Error handling for user-facing operations
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Responsive design

**Suggestions:**
- [ ] Naming conventions (PascalCase components, camelCase methods)
- [ ] DRY — any duplicated code to extract
- [ ] Performance — unnecessary re-renders, heavy operations in templates

Output format:
```
🔴 CRITICAL: [file:line] description + proposed fix
🟡 IMPORTANT: [file:line] description + proposed fix
🔵 SUGGESTION: [file:line] description
```

End with: summary in 2-3 sentences.
