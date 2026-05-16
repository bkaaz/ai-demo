Angular 19 Application
4 components: Layout (sidenav + toolbar), Dashboard (stat cards + activity chart + events), Users (table with filtering/sorting/search), Settings (form with reactive forms validation)
Standalone components, Angular signals, lazy-loaded routes, Angular Material
Playwright E2E — 27 tests, all passing
Page Object Model in e2e/pages/
Tests cover: navigation (6), dashboard (5), users with filtering/sorting (8), settings with validation (8)
data-testid on all interactive elements
GitLab CI/CD (.gitlab-ci.yml)
Pipeline: install → lint → build → test:unit → test:e2e
Separate test:e2e:mr job triggered on merge requests
Artifacts: playwright-report, screenshots, JUnit XML
AI Workflow Documentation
CLAUDE.md — project conventions, commands, patterns
AGENTS.md — subagent instructions and roles
.claude/commands/ — custom slash commands (generate-component, write-tests, review, explore, add-route, refactor)
docs/ai-workflows.md — reusable prompts for generating components, tests, refactoring
Notes
GitLab remote — repo doesn't have a remote yet. Need to add git remote add origin <URL> and push
Budget warning — initial bundle (518 KB) exceeds default limit of 500 KB. Not relevant for POC
Unit tests — pipeline has test:unit job, but no Karma/Jest config. CI job gracefully skips
