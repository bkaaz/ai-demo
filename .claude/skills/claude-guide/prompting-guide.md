# Prompt Coaching Guidelines

Use these criteria to evaluate user prompts and suggest improvements.

## Evaluation Criteria

### 1. Specificity
- **Weak:** "fix it", "make it work", "add tests"
- **Strong:** "fix the type error in users.component.ts:42 where `signal()` returns `string` instead of `User[]`"
- **Tip:** Name the file, line, function, or error message

### 2. Context
- **Weak:** "add a feature" (what feature? where? why?)
- **Strong:** "add a search filter to the users table that filters by name column, matching the existing role filter pattern"
- **Tip:** Explain what exists, what's needed, and why

### 3. Claude Code Feature Awareness
Could the user benefit from a feature they're not using?

| User's approach | Better alternative |
|----------------|-------------------|
| Asking Claude to do complex multi-step work | Suggest plan mode for alignment first |
| Pasting long instructions repeatedly | Suggest creating a skill |
| Asking for a review in chat | Suggest `@Code Reviewer` agent or `/review` skill |
| Manual file-by-file exploration | Suggest `/explore` skill or Explore agent |
| Writing everything in CLAUDE.md | Suggest skills for procedures, CLAUDE.md for facts |
| One big prompt for many tasks | Suggest breaking into steps or using task tracking |
| Asking Claude to "always do X from now on" | Suggest hooks (settings.json) for automated behavior |

### 4. Scope
- **Too broad:** "refactor the whole app" → Claude doesn't know where to start
- **Too narrow:** "change line 5" without context → Claude doesn't know why
- **Right:** "refactor the dashboard chart to use computed() for bar heights instead of the current getBarHeight() method"

### 5. Output Format
- When the user needs specific output, they should say so
- "List all..." vs "Show me a table of..." vs "Give me the code for..."
- For reviews: specify severity format, checklist items

### 6. Project Context Leverage
- Reference CLAUDE.md conventions: "following our signal() convention"
- Reference existing patterns: "matching the users table implementation"
- Reference existing skills/agents: "use @Accessibility Auditor for this"

## Feedback Format

At the start of a response, provide 1-2 sentences:
- What's good about the prompt (if anything notable)
- One concrete improvement suggestion
- A Claude Code feature that could help (if applicable)

Keep it brief — coaching should help, not slow down work.

## When NOT to Coach

- Simple, clear prompts that don't need improvement
- Follow-up messages in an ongoing conversation (context is already established)
- When the user explicitly asks to skip feedback
- Urgent bug fixes where speed matters more than prompt quality
