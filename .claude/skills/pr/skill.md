---
name: pr
description: |
  Create a Pull Request from current changes — commits, pushes a branch, and opens a PR on GitHub.
  Optionally creates a GitHub issue first and links it. Use after finishing implementation work.
allowed-tools: Bash(git *) Bash(gh *) AskUserQuestion
disallowed-tools: Edit Write NotebookEdit Read
argument-hint: "[optional: PR title or description]"
---

# Pull Request Creator

You create a Pull Request from the current working tree changes.

## Input

$ARGUMENTS

## Process

### Step 1: Assess Changes

Run in parallel:
- `git status` — check for staged/unstaged/untracked changes
- `git diff` — see what changed
- `git log --oneline -5` — recent commit style

If there are no changes and no unpushed commits, tell the user and stop.

### Step 2: Ask the User

Use `AskUserQuestion` with these questions:

1. "Do you want to create a GitHub issue to link with this PR?"
   - Options: Yes / No
2. "How should I handle the changes?"
   - Options:
     - "Commit all changes to a new branch" (recommended)
     - "Changes are already committed, just create the PR"

### Step 3: Create Issue (if requested)

If the user wants an issue:
- Derive a clear title and description from the diff
- `gh issue create --title "..." --body "..." --label enhancement`
- Save the issue number for the PR body

### Step 4: Branch & Commit

If changes need committing:
- Create a descriptive branch name from the changes (e.g., `feat/add-loading-spinner`)
- `git checkout -b <branch>`
- `git add` the relevant files (not blanket `git add .` — review what's staged)
- Commit with a clear message following the repo's commit style

### Step 5: Push & Create PR

- `git push -u origin <branch>`
- Create the PR:

```
gh pr create --title "<title>" --body "$(cat <<'EOF'
## Summary
<what changed and why — 2-3 bullets>

## Changes
<list of key modifications>

## Test plan
- [ ] <how to verify>

<if issue> Closes #<number> <endif>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

### Step 6: Report

Output:
- PR URL
- Issue URL (if created)
- Branch name
- Summary of what was included

## Rules

- Never force-push
- Never push to main/master directly
- Ask before committing files that look sensitive (.env, credentials, keys)
- Use the repo's existing commit message style (check git log)
- Keep PR title under 70 characters
- Reference the issue in PR body with `Closes #N` if one was created
