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

The Settings component now has multiple validators inline in the component file. Extract all validators (pattern, minLength, cross-field password match) into a shared `validators.ts` utility file. Make sure existing tests still pass after the refactor.
