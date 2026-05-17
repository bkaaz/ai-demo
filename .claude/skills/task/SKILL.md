---
name: task
description: |
  Plan implementation of a business task (Jira ticket, user story, feature request).
  Researches the codebase systematically and produces a step-by-step implementation plan.
  Use when you paste a task description and want to plan before coding.
allowed-tools: Read Bash(find *) Bash(grep *) Bash(git log *) Bash(git diff *) Agent
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
- **Scope** — rough estimate of which areas of the app are affected

### Phase 2: Research Codebase

Spawn an **Explore subagent** (Agent tool with `subagent_type="Explore"`, breadth: `"very thorough"`) to research the codebase. The prompt should include keywords from the task and ask it to find:

1. **Project structure** — app structure, routes, available Material modules
2. **Related files** — which components, services, or modules are relevant?
3. **Existing patterns** — how does similar functionality work in this app?
4. **Reusable code** — utilities, helpers, types that already exist and should be reused
5. **Test patterns** — how are similar features tested? (check `e2e/`)

Use the returned findings summary in Phase 3 — do NOT re-explore the same files yourself.

### Phase 3: Create Implementation Plan

Produce numbered steps. Each step must include:
- Which file to create or modify (full path)
- What specifically to do in that file
- Which existing patterns/utilities to reuse

### Phase 4: Identify Risks & Test Plan

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
