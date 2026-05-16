# Claude Code — Interview Presentation Setup

## Demo Flow Overview

| Phase | Mode/Skill | Purpose |
|---|---|---|
| Task start | `/explore` | AI understands codebase |
| Planning | Plan mode (Shift+Tab) | Research → plan → approve |
| Design | `/generate-component` | Scaffolding from pattern |
| Implementation | acceptEdits or auto mode | AI codes freely |
| Quality | `/review` | AI code review |
| Testing | `/write-tests` | Test generation |
| CI/CD | commit + PR | Full integration |

---

## 1. Permission Modes

| Phase | Mode | How to switch |
|---|---|---|
| Exploration | `plan` | `Shift+Tab` or `--permission-mode plan` |
| Implementation | `acceptEdits` | `Shift+Tab` again |
| Full autonomy | `auto` | `Shift+Tab` (requires Max/Team/Enterprise plan) |

---

## 2. Demo Script

```
1. START SESSION
   claude --permission-mode plan

2. EXPLORE (plan mode)
   "Explain how the dashboard component works and what patterns it uses"

3. PLAN
   "I want to add a notifications panel to the dashboard.
    Interview me about requirements, then create a plan."
   → Claude asks questions via AskUserQuestion
   → Approve plan → Ctrl+G to edit in VS Code

4. IMPLEMENT (switch to acceptEdits with Shift+Tab)
   "Implement the notifications panel from your plan.
    Follow existing patterns in the dashboard component."
   → Claude generates component, adds route, updates layout

5. VERIFY
   "Run the E2E tests and fix any failures"
   → Tests run automatically (permissions pre-approved)

6. REVIEW
   /review
   → Shows AI code review with severity levels

7. COMMIT & PR
   "Commit with a descriptive message and create a PR"
   → Shows git integration
```

---

## 3. Key Features to Highlight

| Feature | What it shows |
|---|---|
| CLAUDE.md | Persistent project knowledge (onboarding docs for AI) |
| Skills | Reusable workflows that auto-trigger contextually |
| Subagents | Specialized workers with isolated context |
| Hooks | Deterministic automation (not advisory, guaranteed) |
| Plan mode | Research before code (discipline) |
| Permissions | Security-conscious AI usage |
| Checkpoints | Fearless experimentation with undo |

---

## 4. Useful Keyboard Shortcuts

- `Shift+Tab` — cycle permission modes (default → acceptEdits → plan)
- `Esc` — stop Claude mid-action (shows control)
- `Esc+Esc` or `/rewind` — checkpoint/undo
- `Ctrl+G` — open plan in text editor for editing
- `/clear` — reset context between demo sections

---

## 5. Recommended Permissions (settings.json)

Pre-approve common operations to avoid permission popups during demo:

```json
{
  "permissions": {
    "allow": [
      "Bash(npx ng *)",
      "Bash(npx playwright *)",
      "Bash(npm install *)",
      "Bash(npm run *)",
      "Bash(git status*)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git log *)",
      "Bash(git diff *)",
      "Bash(git branch *)",
      "Bash(git checkout *)",
      "Bash(gh pr *)",
      "Bash(gh issue *)",
      "Bash(find *)",
      "Bash(grep *)",
      "Bash(ls *)",
      "Read",
      "Edit",
      "Write"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force*)",
      "Bash(git reset --hard*)"
    ]
  }
}
```

---

## 6. Hooks — Automated Quality Enforcement

Add to `.claude/settings.json` for auto-linting after every edit:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx ng lint --fix",
            "args": ["${tool_input.file_path}"],
            "statusMessage": "Auto-linting..."
          }
        ]
      }
    ]
  }
}
```

---

## 7. Skills Configuration Tips

### User-invoked workflows (deploy, commit):
```yaml
---
disable-model-invocation: true
---
```

### Background knowledge (conventions):
```yaml
---
user-invocable: false
---
```

### Heavy research (runs in isolation):
```yaml
---
context: fork
agent: Explore
---
```

---

## 8. Subagents — Demo Patterns

After implementing a feature, show parallel AI work:
> "Use a subagent to review this code for security issues"

Key facts about subagents:
- Non-interactive (can't ask questions)
- Run in separate context (don't see conversation)
- Prompts must be self-contained
- Return only summary to main conversation

---

## 9. Complete Demo Flow (Step-by-Step)

### Phase 1: Task Start (show: CLAUDE.md, /explore)
```
"Explain how the dashboard component works and what patterns it uses"
```
- Claude reads CLAUDE.md automatically (project onboarding)
- Use `/explore` for deeper codebase analysis
- **Shows:** AI understands project context without manual explanation

### Phase 2: Planning (show: plan mode, AskUserQuestion)
```
Switch to plan mode: Shift+Tab
"I want to add a notifications panel to the dashboard.
 Interview me about requirements, then create a plan."
```
- Claude asks questions via AskUserQuestion tool
- Creates implementation plan
- Ctrl+G to open plan in VS Code editor
- **Shows:** AI researches before coding, collaborative planning

### Phase 3: Design (show: /generate-component skill)
```
Switch to acceptEdits: Shift+Tab
/generate-component notifications
```
- Claude scaffolds component following project patterns (signals, Material, data-testid)
- **Shows:** Reusable skills with project-specific templates

### Phase 4: Implementation (show: auto coding)
```
"Implement the notifications panel from your plan.
 Follow existing patterns in the dashboard component."
```
- Claude generates full component code
- **Shows:** AI follows existing patterns, writes production-quality code

### Phase 5: Testing (show: /write-tests, auto-approved Playwright)
```
/write-tests
"Run the E2E tests and fix any failures"
```
- Tests run without permission popup (pre-approved)
- **Shows:** Test generation + auto-execution + self-healing

### Phase 6: Code Review (show: /review skill OR @Code Reviewer agent)
```
/review
```
- Severity-ranked report (Critical/Important/Suggestion)
- **Shows:** AI quality gate before merge

### Phase 7: Commit & PR (show: git + GitHub integration)
```
"Commit with a descriptive message, create a feature branch, and open a PR"
```
- Claude: git add → commit → branch → push → gh pr create
- No permission popups (all pre-approved)
- **Shows:** Full git integration, PR creation from CLI

### Phase 8: CI/CD (show: GitHub Actions)
- Pipeline triggers automatically on PR
- Show Actions tab in browser with live status
- Status checks appear on PR (green/red)
- **Shows:** End-to-end automation, AI + CI/CD together

### Optional Bonus Demos (if time permits)
1. **Subagent parallel work:** "Use the Accessibility Auditor to check the new component"
2. **Checkpoint/undo:** Esc+Esc or `/rewind` to revert changes
3. **Hook demo:** Show prompt coaching feedback appearing on prompts
4. **`/compact` or `/clear`:** Context management between demo sections

---

## 10. Pre-Demo Checklist

- [ ] `git status` is clean (no uncommitted changes)
- [ ] `npx ng serve` works locally
- [ ] `npx ng lint` passes
- [ ] `gh auth status` is authenticated
- [ ] VS Code is open with the project
- [ ] Browser has GitHub repo open (Actions tab)
- [ ] Terminal font size large enough for presentation

---

## 11. Current Configuration Inventory

| Component | Count | Status |
|-----------|-------|--------|
| Skills | 7 (`/explore`, `/generate-component`, `/add-route`, `/write-tests`, `/review`, `/refactor`, `claude-guide`) | Ready |
| Agents | 3 (Accessibility Auditor, Code Reviewer, Design System Guardian) | Ready |
| Hooks | 1 (UserPromptSubmit prompt coaching) | Ready |
| Permissions | git, gh, Angular CLI, Playwright, file ops pre-approved | Ready |
| CI/CD | GitHub Actions (lint → build → test-e2e) | Ready |
| Docs | CLAUDE.md + PRESENTATION-SETUP.md + GITHUB-ACTIONS-GUIDE.md | Ready |

---

## 12. Presentation Tips

- Use `/clear` between demo sections — keeps context clean
- Use `Esc` to stop Claude mid-action if off-track (shows control)
- Use `/rewind` to show checkpoint/undo capability
- Use `@filename` to reference files directly in prompts
- Show `!`backtick`` dynamic context injection in skills
- Start fresh sessions for each major demo phase
- Use `/compact` if context gets heavy mid-demo
