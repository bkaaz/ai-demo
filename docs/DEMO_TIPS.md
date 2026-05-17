# Demo Tips (step by step)

## 1. Project context (3-5 min)

1. Open `CLAUDE.md` — walk through what it contains
2. Open `.claude/skills/` — show one skill file, explain specialized roles
3. Open `.claude/settings.json` — show permissions and hooks
4. Message: "AI without context writes generic code. With context — it follows project conventions."

## 2. Settings form — Task 1 (15-20 min)

1. Open `DEMO_TASKS.md`, copy Task 1
2. Paste into Claude Code — let AI enter plan mode
3. Review the plan with audience, approve it
4. While AI implements, point out:
   - It reads existing code first
   - Follows same patterns (standalone, signals, data-testid)
   - Writes a cross-field validator (non-trivial logic)
5. Ask AI to write/update tests
6. Run `npx ng test` — unit tests pass
7. Run `npx playwright test` — e2e tests pass
8. Ask AI for a UI screenshot — show result

## 3. Dashboard UI — Task 2 (5-8 min)

1. Copy Task 2 from `DEMO_TASKS.md` (has mockup reference)
2. Paste — AI implements directly (no plan mode, simple task)
3. Point out: AI reads mockup and translates visual to code
4. `npx playwright test` — nothing broken
5. UI screenshot — compare with mockup

## 4. Refactor — Task 3 (3-5 min)

1. Copy Task 3 from `DEMO_TASKS.md`
2. Paste — AI extracts validators into a shared file
3. Point out: AI preserves behavior, improves structure
4. `npx ng test` — tests still pass (no behavior change)

## 5. Wrap-up (5 min)

Key takeaways:
1. **Context** — CLAUDE.md = onboarding doc for AI
2. **Plan → Code → Test** — full cycle in one session
3. **Quality** — conventions, types, tests are not an afterthought
4. **Verification** — tests + visual verification = confidence
