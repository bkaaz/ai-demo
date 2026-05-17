---
name: verify-ui
description: Verify UI changes visually using Playwright MCP browser tools. Navigates to the app, takes screenshots, and validates the rendered output.
allowed-tools: mcp__playwright__*, Bash(npx ng serve*), Bash(lsof -i :4200*)
---

Verify the current UI state of the Angular app in the browser.

## Workflow

1. **Ensure dev server is running**
   - Check if port 4200 is already in use: `lsof -i :4200`
   - If not running, start: `npx ng serve --port 4200` (background)
   - Wait for server to be ready

2. **Navigate to the target page**
   - If $ARGUMENTS is provided, navigate to `http://localhost:4200/$ARGUMENTS`
   - If no arguments, navigate to `http://localhost:4200`

3. **Take a snapshot and screenshot**
   - Use `browser_snapshot` to get the accessibility tree (structure, content, interactive elements)
   - Use `browser_screenshot` with filename `.playwright-mcp/verify-<route>.png` (NEVER save screenshots to project root)

4. **Analyze the result**
   - Verify the page renders correctly (no errors, no blank content)
   - Check that key elements are visible and properly laid out
   - If checking after a code change: compare with expected behavior
   - Report any issues found (missing elements, broken layout, console errors)

5. **Report findings**
   - Summarize what was verified
   - Note any visual issues or discrepancies
   - Suggest fixes if problems found
