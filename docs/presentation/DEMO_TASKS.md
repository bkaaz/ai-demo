# Demo Tasks

Business tasks for demo presentation. Copy any task description below and run `/task` to start planning.

---

## APP-101: Add user data export for compliance

**Description:**
Our compliance team flagged that admins currently have no way to export user data from the system. This is a blocker for the upcoming GDPR audit scheduled for Q3. We need a simple export mechanism that lets admins download user records as a CSV file.

The export should respect whatever filters are currently active — if an admin has filtered by role or searched for a name, the export should only contain the visible results. This prevents accidental export of the full dataset, which is also a compliance concern.

**Acceptance Criteria:**
- [ ] "Export CSV" button is visible above the users table
- [ ] Clicking the button downloads a .csv file
- [ ] The exported file contains only the currently filtered/visible rows
- [ ] File includes columns: Name, Email, Role, Status
- [ ] Button is disabled when the table is empty (no results)

**Notes:**
- No backend needed — this is a client-side export from already-loaded data
- File naming convention: `users-export-YYYY-MM-DD.csv`

---

## APP-102: Real-time notification center

**Description:**
Product received feedback from multiple enterprise clients that the app feels "disconnected" — users perform actions but get no feedback unless they navigate away and come back. We need a notification center that surfaces recent system events.

The notification bell should live in the top toolbar. Clicking it opens a dropdown panel showing recent events (new user registrations, status changes, etc.). Unread notifications should show a badge count on the bell icon.

**Acceptance Criteria:**
- [ ] Bell icon in the toolbar with unread count badge
- [ ] Clicking the bell opens a dropdown/panel with notifications list
- [ ] Each notification shows: icon, message, timestamp (relative, e.g. "5 min ago")
- [ ] Notifications can be marked as read (individually or "mark all read")
- [ ] Panel shows empty state when no notifications exist
- [ ] Maximum 20 notifications displayed (most recent first)

**Notes:**
- For now, use the existing activity events from the dashboard as the notification source
- No WebSocket needed yet — poll or use existing data
- Consider reusing the events list pattern from the dashboard component

---

## APP-103: Dark mode support — client escalation

**Description:**
Three enterprise clients have escalated through their account managers that the lack of dark mode is a dealbreaker for their engineering teams who work in low-light environments. The theme toggle already exists in Settings (Light / Dark / System) but it's non-functional — selecting a theme doesn't change anything.

We need to wire up the existing toggle so it actually switches the Angular Material theme across the entire application. The selection must persist across sessions.

**Acceptance Criteria:**
- [ ] Selecting "Dark" in Settings switches the entire app to a dark color scheme
- [ ] Selecting "Light" reverts to the current (default) theme
- [ ] Selecting "System" follows the OS preference (prefers-color-scheme)
- [ ] Theme choice persists in localStorage — survives page reload
- [ ] All Material components render correctly in both themes (no broken contrast)
- [ ] Sidenav, toolbar, cards, tables, and forms all respect the theme

**Notes:**
- Angular Material supports theming via CSS custom properties or prebuilt themes
- The toggle UI already exists in the Settings component — only the implementation is missing
- Test with Chrome DevTools "prefers-color-scheme" emulation for System mode

---

## Demo Tips

- Run `/task [paste task description]` to show the planning workflow
- After the plan is ready, say "implement it" to show execution
- Run `npx playwright test` after implementation to show nothing broke
- Frame it as: "This just came in from the product owner, let's handle it"
- Start with APP-101 (simpler) or APP-102 (more impressive visually)
