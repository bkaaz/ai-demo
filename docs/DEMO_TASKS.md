# Demo Tasks

---

## Task 1: Extend Settings form

Extend the Settings form with new fields:
1. Phone number — with format validation (pattern: digits, optionally +48 prefix)
2. Bio — textarea with maxLength(200) and a live character counter
3. "Change Password" section — two fields (new password, confirm password)
   with a cross-field validator checking that passwords match
   and minLength(8) validation on the password

Keep all existing fields. Add data-testid attributes to new elements.

---

## Task 2: Dashboard colorful stat cards

Implement colorful stat cards on the Dashboard to match the mockup at [docs/mockup-dashboard-redesign.png](mockup-dashboard-redesign.png).

Key changes from the mockup:
- Each stat card has a pastel background matching its icon color
- Icons are inside rounded square containers with solid color fill and white icon
- Card titles are uppercase with letter-spacing
- Chart bars use a purple gradient instead of blue
- Chart bars have more rounded corners

Existing icon colors: Blue (#1976d2), Green (#388e3c), Orange (#f57c00), Purple (#7b1fa2)

---

## Task 3: Refactor Settings validators

The Settings component uses inline Angular validators directly in the component file. Refactor validation into a shared utility:

1. Create `src/app/shared/validators.ts` exporting:
   - `requiredValidator` — wraps `Validators.required`
   - `minLengthValidator(length: number)` — wraps `Validators.minLength`
   - `emailValidator` — wraps `Validators.email`
2. Update `settings.component.ts` to import and use validators from the new utility instead of referencing `Validators.*` directly.
3. All existing unit tests must still pass (`npm test`).

---

## Task 4: GitHub workflow — Issue → Branch → PR → Review

Demonstrate the full GitHub workflow using Claude Code:

1. **Create an issue** — "Add a loading spinner to the Users table while data is being fetched"
   - Assign appropriate labels (enhancement, UI)
   - Include acceptance criteria in the description

2. **Implement the fix on a new branch** — Claude creates a branch, implements the spinner, commits

3. **Create a Pull Request** — with summary, test plan, and a reference to the issue

4. **Review the PR** — use `/review` to get AI feedback on the changes

This task showcases: `gh` CLI integration, branch workflow, PR creation with structured descriptions, and automated code review.
