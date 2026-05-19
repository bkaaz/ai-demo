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

## Task 3: E2E Test Gap Analysis

Analyze the existing E2E test coverage in `e2e/tests/` and compare it against all interactive features in the application components (`src/app/`).

Deliver:
1. A coverage matrix — which user-facing interactions are tested vs untested
2. A prioritized list of the most important missing E2E scenarios, ranked by user impact
3. For each missing scenario, a one-line test description and which spec file it belongs to

Focus on real user flows and interactions, not implementation details.

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
