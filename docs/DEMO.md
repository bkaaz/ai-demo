# Demo Plan — Claude Code AI Workflow

| | |
|---|---|
| **Audience** | Technical team (developers) |
| **Duration** | 35-45 min |
| **Format** | Semi-scripted — planned steps, executed live with AI |
| **Focus** | Plan → Code → Tests, Code quality, AI interaction |

---

## Agenda

1. Project context — CLAUDE.md, skills, agents
2. Full task lifecycle (`/task` → plan → code → test → `/pr`)
3. Visual task from mockup
4. E2E Test Gap Analysis
5. GitHub workflow — issue → `/task` from URL
6. Wrap-up + Q&A

---

## Flow

### 1. Project context (3-5 min)
Show `CLAUDE.md`, skills, `settings.json` — how AI gets project context.
Mention agents (`.claude/agents/`) — specialized autonomous sub-agents: Accessibility Auditor, Code Reviewer, Design System Guardian. "Same codebase context, but each agent has a focused role."
"AI without context writes generic code. With context — it follows project conventions."

### 2. Settings form — Task 1 (15-20 min)
Main task. Use `/task` skill with task content (not raw paste into plan mode). AI researches codebase → produces implementation plan → review plan with audience → approve → AI implements.
After implementation: show result in browser, run `/verify-ui` skill.
Then start review: review changes yourself + launch review sub-agent in background. Optionally run Accessibility Auditor sub-agent in parallel.
If everything looks good — commit on a new branch using `/pr` skill. Show PR in browser, show CI pipeline running.
Highlight: `/task` skill, plan mode, cross-field validator, sub-agents for review, `/pr` workflow.

### 3. Dashboard UI — Task 2 (5-8 min)
Quick visual task with [mockup reference](mockup-dashboard-redesign.png). Mention: ideally connect Figma via MCP, but using an image mockup here. Simple enough to go straight into plan mode — prompt "implement UI change based on the mockup image". Run `/verify-ui` skill to compare result. Commit or revert.

### 4. E2E Test Gap Analysis — Task 3 (3-5 min)
Different type of task — not building a feature, but analyzing existing test coverage. Run `/task` with task content. Show output: coverage matrix + prioritized gap list. Pick one gap and tell AI to implement it.
Highlight: AI as an analysis tool, not just a code generator.

### 5. GitHub workflow — Task 4 (5-8 min)
Create a GitHub issue from Task 4 content (using `gh` CLI). Show the issue in the browser. Then run `/task` with the issue URL — show that AI reads the issue and plans from it.
Highlight: `gh` CLI integration, AI reading directly from GitHub issues, workflow automation.

### 6. Wrap-up + Q&A (5 min)
Context matters. Plan → Code → Test in one session. Quality is not an afterthought. Tests + visual verification = confidence. AI integrates with your existing workflow (GitHub, PRs, reviews).

### Additional talking points (use during wait times or Q&A)
- **Angular official skills** — needed because the model doesn't know well new features like signals. Show them briefly.
- **Other available skills** — mention without deep-diving. Note: didn't install every frontend skill to avoid context bloat.
- **No official Anthropic frontend plugin** — this app uses Material Design, so the generic frontend plugin wasn't a fit.
- **Remote agents** — aware of agents that work remotely on GitHub/ONA, but hard to test with this demo project.
- **Worktree workflow** — during implementation wait times, show opening a parallel session with `claude --worktree some-issue` to fix a quick issue in isolation.

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
| Running long | Skip Task 3 (gap analysis), jump to Task 4 (workflow) |
| Extra time left | Pick a quick task from the list below |

## Quick backup tasks (2-3 min each)

Use these if you finish early, skip a task, or need a quick win between main tasks.

1. **Add a tooltip** — "Add a tooltip to each dashboard stat card showing the date of last update". One component, one Material directive, instant visual result.
2. **Fix a bug** — "The Users table shows 'No data' text when the filter matches nothing. Add a proper empty state with an icon and message." Small template change, good for showing AI reasoning.
3. **Add a badge** — "Add a notification badge to the Dashboard nav item in the sidenav showing the number of recent events." One-liner with MatBadge, visible immediately.
4. **Accessibility check** — Run the Accessibility Auditor agent. Shows autonomous sub-agent in action, produces a report with concrete fixes.
