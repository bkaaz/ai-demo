# GitHub Actions — Learning Guide

## Context
CI/CD walkthrough of the project's `ci.yml` — concept by concept, mapped to general CI/CD terminology.

---

## 1. File Location & Trigger (lines 1–7)

```yaml
name: CI                    # Display name in GitHub UI

on:                         # WHEN does this pipeline run?
  push:
    branches: [main]        # On every push to main
  pull_request:
    branches: [main]        # On every PR targeting main
```

**Concept mapping:**
- `on:` = trigger rules (like GitLab's `rules:` or Jenkins' `triggers {}`)
- Other triggers exist: `workflow_dispatch` (manual), `schedule` (cron), `release`, etc.

---

## 2. Jobs = Pipeline Stages (lines 9–58)

```yaml
jobs:
  lint:        # Job 1 — runs in parallel with build by default
  build:       # Job 2 — runs in parallel with lint
  test-e2e:    # Job 3 — waits for build (explicit dependency)
    needs: [build]
```

**Key difference from GitLab:**
- GitLab: stages run sequentially, jobs within a stage run in parallel
- GitHub: ALL jobs run in parallel by default, use `needs:` to create dependencies

**Execution graph:**
```
lint ──────────────┐
                   ├──→ (both finish independently)
build ─────────────┤
       │
       └─ needs ──→ test-e2e
```

---

## 3. Runner (runs-on)

```yaml
runs-on: ubuntu-latest    # VM image for this job
```

**Concept mapping:**
- = GitLab's `image:` / Jenkins' `agent { label 'linux' }`
- Options: `ubuntu-latest`, `ubuntu-22.04`, `macos-latest`, `windows-latest`
- Each job gets a FRESH VM — no shared state between jobs (unlike GitLab services)

---

## 4. Steps = Job Commands

```yaml
steps:
  - uses: actions/checkout@v4          # Reusable action (like a plugin)
  - uses: actions/setup-node@v4        # Another action
    with:
      node-version: 22
      cache: npm
  - run: npm ci                        # Shell command (like script: in GitLab)
  - run: npx ng lint
```

**Two types of steps:**
| Type | Syntax | What it is |
|------|--------|-----------|
| Action | `uses: owner/repo@version` | Reusable plugin from GitHub Marketplace |
| Command | `run: <shell command>` | Inline shell (bash by default) |

**Common actions you'll see everywhere:**
- `actions/checkout@v4` — clones the repo (REQUIRED, not automatic like GitLab)
- `actions/setup-node@v4` — installs Node + caches dependencies
- `actions/upload-artifact@v4` — saves files between jobs or for download

---

## 5. Dependencies Between Jobs (needs)

```yaml
test-e2e:
  needs: [build]     # Won't start until "build" job succeeds
```

- Without `needs:`, jobs run in parallel
- If a needed job fails, dependent jobs are skipped
- Can depend on multiple: `needs: [build, lint]`

---

## 6. Artifacts

```yaml
- uses: actions/upload-artifact@v4
  if: always()                    # Upload even on failure!
  with:
    name: playwright-report
    path: |
      playwright-report/
      test-results/
    retention-days: 7
```

**Concept mapping:**
- = GitLab's `artifacts:` block
- `if: always()` = GitLab's `when: always` (upload even when tests fail — critical for debugging)
- Artifacts are downloadable from the GitHub Actions UI

---

## 7. Caching (built into setup-node)

```yaml
- uses: actions/setup-node@v4
  with:
    cache: npm          # Automatically caches node_modules based on package-lock.json
```

This replaces GitLab's explicit `cache:` block. The action handles cache key generation from the lockfile automatically.

---

## 8. Conditional Steps (if)

```yaml
- uses: actions/upload-artifact@v4
  if: always()          # Run regardless of previous step status
```

Other conditions:
- `if: failure()` — only on failure
- `if: github.event_name == 'pull_request'` — only on PRs
- `if: contains(github.event.head_commit.message, '[skip ci]')` — pattern matching

---

## 9. Comparison Cheat Sheet

| Concept | GitLab CI | GitHub Actions |
|---------|-----------|---------------|
| Config file | `.gitlab-ci.yml` | `.github/workflows/*.yml` |
| Pipeline unit | stage → job | job (parallel by default) |
| Dependencies | stages order | `needs: [job]` |
| Container | `image:` | `runs-on:` (VM) or `container:` |
| Commands | `script:` | `run:` |
| Plugins | n/a (scripts) | `uses: action@version` |
| Artifacts | `artifacts: paths:` | `actions/upload-artifact` |
| Cache | `cache: key:` | `actions/cache` or built into setup-* |
| Secrets | CI/CD Variables | `${{ secrets.NAME }}` |
| Manual trigger | `when: manual` | `workflow_dispatch` |
| MR-only | `rules: - if: $CI_MERGE_REQUEST_IID` | `on: pull_request` |

---

## 10. Useful CLI Commands

```bash
gh run list                  # List recent workflow runs
gh run view <id>             # See job details and logs
gh run watch <id>            # Live-stream a running pipeline
gh run rerun <id>            # Re-trigger a failed run
```
