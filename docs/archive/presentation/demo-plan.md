# Demo Plan: AI-Assisted Development Workflow

## Overview

| | |
|---|---|
| **Duration** | 30-60 minutes |
| **Format** | Pre-built repo + live demo segments |
| **Tool** | Claude Code (CLI / VS Code) |
| **Project** | Angular 19 app with Material, Playwright E2E, GitLab CI/CD |

---

## Agenda

### 1. Intro — Project Context for AI (5-8 min)

**What to show:**
- Open Claude Code in terminal → show it automatically reads `CLAUDE.md`
- Walk through `CLAUDE.md` — conventions, commands, project structure
- Show `AGENTS.md` — instructions for subagents (Component Generator, Test Writer, Code Reviewer)
- Show `.claude/settings.json` — permissions, hooks
- Show `.claude/commands/` — custom slash commands

**Talking points:**
- "AI without context is like a new developer without onboarding"
- "CLAUDE.md is the onboarding doc for AI — it reads it at every session start"
- "AGENTS.md defines roles — each agent has its specialization"
- "Custom commands = reusable workflows the whole team can invoke"

**Wow moment:** Ask Claude Code "describe the architecture of this project" — it understands the stack thanks to context files.

---

### 2. Code Generation with AI (8-12 min)

**What to show:**
- Open `docs/ai-workflows.md` — show reusable prompts
- **Live demo:** Use `/project:generate-component notifications` to add a new component
- Show how Claude Code:
  - Creates a component with Angular Material
  - Adds lazy-loaded route
  - Adds sidenav link
  - Adds data-testid
- Compare: with CLAUDE.md (follows conventions) vs without (generic code)

**Talking points:**
- "Prompts in docs/ai-workflows.md are reusable recipes — the whole team can use them"
- "Custom commands via `/project:` make it even easier — zero copy-paste"
- "Patterns > instructions — 'follow dashboard pattern' works better than describing what to do"
- "AI generates code that matches project conventions, not generic boilerplate"

**Wow moment:** Generated component immediately fits the rest of the app — same style, same patterns.

---

### 3. Subagents and Parallelism (8-10 min)

**What to show:**
- **Explore agent:** "Find all components using signal() and show how they manage state"
- **Plan agent:** "Plan implementation of a notification system" — shows plan without writing code
- **Parallel agents:** Launch Explore + Plan simultaneously, show they work independently
- **Code review agent:** `/project:review` on current branch changes

**Talking points:**
- "Subagents are specialists — each has its scope and tools"
- "Explore agent searches the codebase without modifying files — safe discovery"
- "Parallel agents = faster work, less waiting"
- "Plan agent = alignment before coding, not after"

**Wow moment:** Two agents running in parallel, each with a different task, results in seconds.

**Demo commands:**
```
# Explore agent
"Use Explore agent: find all places where signal() and computed() are used"

# Plan agent
"Plan the implementation of a notifications component — use Plan mode"

# Parallel
"Run in parallel: Agent 1 check data-testid coverage, Agent 2 find potential accessibility issues"
```

---

### 4. E2E Tests with AI (5-8 min)

**What to show:**
- Walk through test structure: `e2e/pages/` (POM) + `e2e/tests/`
- Show a Page Object — how locators use data-testid
- Run `npx playwright test` → 27 tests, all green
- **Live demo:** `/project:write-tests notifications` for the newly added component
- Run `npx playwright test --ui` — interactive runner

**Talking points:**
- "Page Object Model = tests don't break on UI changes"
- "data-testid = selectors resilient to CSS/HTML refactoring"
- "AI generates tests based on existing patterns — consistent quality"
- "27 tests cover: navigation, dashboard, users (filter/sort/search), settings (validation)"

**Wow moment:** Run tests with `--ui`, show trace viewer with steps, screenshots and timeline.

---

### 5. Code Review and Quality (5-8 min)

**What to show:**
- **Live demo:** Make an intentional "bad change" (e.g., remove data-testid, use `any`)
- Run `/project:review` — it catches the problems
- Show hooks in `.claude/settings.json`:
  - `PreCommit` → auto lint
  - `PostEdit` → build verification
- Mention worktree isolation (review in an isolated directory)

**Talking points:**
- "AI code review = consistent checklist, zero ego"
- "Hooks are guardrails — automatic quality without manual effort"
- "Review checklist in AGENTS.md — same standards for AI and humans"

**Wow moment:** AI catches missing data-testid, usage of `any`, missing error handling — in seconds.

---

### 6. CI/CD Pipeline (3-5 min)

**What to show:**
- Walk through `.gitlab-ci.yml` — stages: install → lint → build → test:e2e
- Separate `test:e2e:mr` job for merge requests
- Artifacts: playwright-report, screenshots, JUnit XML
- How AI helped generate the pipeline

**Talking points:**
- "Pipeline generated with AI, optimized for Playwright"
- "test:e2e:mr = E2E on every merge request"
- "JUnit reporter = integration with GitLab test reports"

---

### 7. Q&A (5-10 min)

**Prepared answers for common questions:**

**"Will AI replace developers?"**
→ No. AI is a tool, not a replacement. It accelerates routine tasks — developers still make architectural decisions and review output.

**"How about generated code quality?"**
→ Context is key. CLAUDE.md + patterns in the repository = code that follows conventions. Without context, AI generates generic boilerplate.

**"Is this safe for production?"**
→ AI is an assistant, not an automation. Permissions in settings.json block destructive commands. Code review (human + AI) is still required.

**"How much time does it save?"**
→ Depends on the task. Generating boilerplate/tests: 5-10x faster. Debugging/architecture: marginal — experience matters more there.

---

## Pre-presentation Checklist

- [ ] `npx ng serve` — app runs on localhost:4200
- [ ] `npx playwright test` — 27/27 green
- [ ] `npx ng build` — build without errors
- [ ] Chrome installed (Playwright channel: 'chrome')
- [ ] Terminal with Claude Code ready
- [ ] Talking points reviewed
- [ ] Fallback scenarios reviewed

## Fallback Scenarios

| Problem | Solution |
|---------|----------|
| Claude Code unresponsive | Show CLAUDE.md and AGENTS.md as documentation — value is in the process, not the tool |
| Tests failing | Show playwright-report from last run (artifact) |
| Build broken | Have a pre-built `dist/` from an earlier build |
| Live demo stalls | Switch to reviewing existing code + start Q&A earlier |
| No internet | Everything works locally — Claude Code cached, tests offline |

---

## Repository Structure — What's Where

```
claude-app-1/
├── CLAUDE.md                    ← Project context for AI
├── AGENTS.md                    ← Subagent instructions
├── .claude/
│   ├── settings.json            ← Hooks, permissions
│   └── commands/                ← Custom slash commands
│       ├── generate-component.md
│       ├── write-tests.md
│       ├── review.md
│       ├── explore.md
│       ├── add-route.md
│       └── refactor.md
├── .gitlab-ci.yml               ← CI/CD pipeline
├── docs/
│   ├── demo-plan.md             ← THIS DOCUMENT
│   ├── ai-workflows.md          ← Reusable prompts
│   └── implementation-plan.md   ← Implementation plan
├── src/app/
│   ├── layout/                  ← Shell (sidenav + toolbar)
│   ├── dashboard/               ← Stat cards + chart + events
│   ├── users/                   ← Table with filtering/sorting
│   ├── settings/                ← Form with validation
│   └── app.routes.ts            ← Lazy-loaded routes
├── e2e/
│   ├── pages/                   ← Page Object Model
│   └── tests/                   ← 27 test specs
└── playwright.config.ts         ← Playwright config
```
