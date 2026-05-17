# Demo Plan — Claude Code AI Workflow

| | |
|---|---|
| **Audience** | Technical team (developers) |
| **Duration** | 35-45 min |
| **Format** | Semi-scripted — planned steps, executed live with AI |
| **Focus** | Plan → Code → Tests, Code quality, AI interaction |

---

## Flow

### 1. Project context (3-5 min)
Show `CLAUDE.md`, skills, `settings.json` — how AI gets project context.
Mention agents (`.claude/agents/`) — specialized autonomous sub-agents: Accessibility Auditor, Code Reviewer, Design System Guardian. "Same codebase context, but each agent has a focused role."
"AI without context writes generic code. With context — it follows project conventions."

### 2. Settings form — Task 1 (15-20 min)
Main task. Paste from [DEMO_TASKS.md](DEMO_TASKS.md). AI enters plan mode → review plan with audience → approve → AI implements → run unit + e2e tests → UI screenshot.
Highlight: plan mode, cross-field validator, tests as part of implementation, data-testid from conventions.

### 3. Dashboard UI — Task 2 (5-8 min)
Quick visual task with [mockup reference](mockup-dashboard-redesign.png). No plan mode needed — AI adapts to complexity. Run tests → screenshot vs mockup.

### 4. Refactor — Task 3 (3-5 min)
Extract validators into a shared utility. Shows AI reasoning about code structure, not just generating new code. Run tests — behavior unchanged.

### 5. GitHub workflow — Task 4 (5-8 min)
Full cycle: create issue → branch → implement → PR → review. Shows AI as a workflow tool, not just code generator.
Highlight: `gh` CLI usage, structured PR descriptions, `/review` skill for automated code review.

### 6. Wrap-up + Q&A (5 min)
Context matters. Plan → Code → Test in one session. Quality is not an afterthought. Tests + visual verification = confidence. AI integrates with your existing workflow (GitHub, PRs, reviews).

---

Tasks: [DEMO_TASKS.md](DEMO_TASKS.md) | Tips: [DEMO_TIPS.md](DEMO_TIPS.md)

## Pre-demo checklist

- [ ] `npx ng serve` on :4200
- [ ] `npx ng test` — pass
- [ ] `npx playwright test` — 27/27 green
- [ ] Claude Code ready in VS Code
- [ ] Clean git state
- [ ] Terminal visible

## Fallback

| Problem | Plan B |
|---------|--------|
| AI unavailable | Show CLAUDE.md + skills as documentation |
| Tests failing | Playwright report, trace viewer |
| Running long | Skip Task 3 (refactor), jump to Task 4 (workflow) |
| Extra time left | Pick a quick task from the list below |

## Quick backup tasks (2-3 min each)

Use these if you finish early, skip a task, or need a quick win between main tasks.

1. **Add a tooltip** — "Add a tooltip to each dashboard stat card showing the date of last update". One component, one Material directive, instant visual result.
2. **Fix a bug** — "The Users table shows 'No data' text when the filter matches nothing. Add a proper empty state with an icon and message." Small template change, good for showing AI reasoning.
3. **Add a badge** — "Add a notification badge to the Dashboard nav item in the sidenav showing the number of recent events." One-liner with MatBadge, visible immediately.
4. **Accessibility check** — Run the Accessibility Auditor agent. Shows autonomous sub-agent in action, produces a report with concrete fixes.
