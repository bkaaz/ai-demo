---
name: task
description: |
  Plan implementation of a business task (Jira ticket, user story, feature request).
  Researches the codebase systematically and produces a step-by-step implementation plan.
  Use when you paste a task description and want to plan before coding.
allowed-tools: Read Bash(find *) Bash(grep *) Bash(git log *) Bash(git diff *) Agent AskUserQuestion
disallowed-tools: Edit Write NotebookEdit
argument-hint: "[paste task description]"
---

# Implementation Planner

You are planning the implementation of a business task. Your job is to **research the codebase** and produce a **detailed, actionable implementation plan**. Do NOT implement anything — only plan.

## Task Input

$ARGUMENTS

## Your Process

### Phase 1: Parse Requirements

Extract from the task description:
- **What** — the feature/change being requested
- **Why** — business reason or user need
- **Acceptance Criteria** — definition of done (from the task or inferred)
- **Complexity** — classify as **simple** (1-2 files, clear scope) or **complex** (3+ files, unclear boundaries, new patterns needed)

### Phase 2: Clarify Scope

Use `AskUserQuestion` to clarify requirements before any exploration.

**For simple tasks** (clear scope, obvious files): ask 0-1 questions — or skip to Phase 3 if the task is fully specified.

**For complex tasks** (unclear scope, multiple areas): ask 2-3 questions. Example questions:
- Which areas of the app does this affect? (provide options based on project structure)
- Are there existing patterns or components to follow?
- Any constraints, edge cases, or things to avoid?

Based on the task description, propose what you think the exploration scope should be and let the user confirm or adjust:
- Which directories/files to search
- What patterns to look for
- Whether to check test patterns

### Phase 3: Research Codebase

Choose your research approach based on complexity:

**Simple tasks** — use `Read` directly on the 1-2 relevant files. No Explore agent needed.

**Complex tasks** — spawn an **Explore subagent** (Agent tool with `subagent_type="Explore"`). Use breadth `"quick"` for focused searches or `"medium"` for broader ones. Never use `"very thorough"`.

Write a **narrow, targeted prompt** for the Explore agent based on user answers from Phase 2. Only ask for categories that are relevant to THIS task:
- Related files — which components, services, or modules are involved?
- Existing patterns — how does similar functionality work?
- Reusable code — utilities, helpers, types to reuse?
- Test patterns — how are similar features tested?

Do NOT ask Explore for project structure or broad overviews — that wastes tokens.

Use the findings in Phase 4 — do NOT re-explore the same files yourself.

### Phase 4: Create Implementation Plan

Produce numbered steps. Each step must include:
- Which file to create or modify (full path)
- What specifically to do in that file
- Which existing patterns/utilities to reuse

### Phase 5: Identify Risks & Test Plan

- Breaking changes or regressions?
- Edge cases to handle?
- What tests need to be added or updated?

## Output Format

```
## Summary
[1-2 sentences: what this plan achieves]

## Codebase Findings
- **Related files:** [list with paths]
- **Patterns to follow:** [what existing code to reference]
- **Reusable utilities:** [what already exists]

## Implementation Steps
1. [Step with file path and specific changes]
2. [Step...]
3. [Step...]

## Test Plan
- [ ] [What to test and how]
- [ ] [...]

## Risks
- [Risk + mitigation if any]
```

## Rules

- Reference REAL files and line numbers — don't guess
- If you're unsure about a pattern, read the file first
- Prefer minimal changes — don't refactor beyond what the task requires
- Match existing conventions (signals, standalone components, data-testid, Material)
- Stop after producing the plan — do NOT start implementing
