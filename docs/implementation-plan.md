# Plan implementacji: POC — AI w pracy developera

## Context

Celem jest przygotowanie gotowego repo z aplikacją Angular 18, które posłuży jako POC na prezentację (30-60 min). Prezentacja ma pokazać jak AI (Claude Code) wspiera codzienną pracę developera — od scaffoldingu, przez testy, code review, po CI/CD. Repo ma zawierać pełną dokumentację demo, gotowe konfiguracje AI workflow, oraz dokument z agendą prezentacji.

---

## Faza 1: Scaffold aplikacji Angular 18

**Pliki:** `package.json`, `angular.json`, `tsconfig.json`, `src/`

1. `ng new claude-app-1 --standalone --style=scss --routing --skip-git`
2. Dodanie Angular Material (`ng add @angular/material`)
3. Struktura katalogów:
   ```
   src/app/
   ├── layout/          # Layout component (sidenav + toolbar)
   ├── dashboard/       # Dashboard (stat cards + chart + events)
   ├── users/           # Users table (filter/sort/search)
   ├── settings/        # Settings form (reactive forms + walidacja)
   └── app.routes.ts    # Lazy-loaded routes
   ```

### Komponenty do zbudowania

**Layout** — shell aplikacji
- Sidenav z Angular Material (`mat-sidenav`)
- Toolbar z tytułem i menu toggle
- `<router-outlet>` w content area
- Responsywny — sidenav mode `over` na mobile

**Dashboard** — strona główna
- 4 stat cards (users, revenue, orders, growth) z `mat-card`
- Activity chart (prosty CSS/SVG bar chart — bez external lib)
- Recent events list
- Wykorzystanie Angular `signal()` do danych

**Users** — tabela z danymi
- `mat-table` z `MatSort` i `MatPaginator`
- Filtrowanie po roli (dropdown `mat-select`)
- Wyszukiwanie tekstowe (`mat-form-field` input)
- Mock data (10-15 userów)
- `data-testid` na wszystkich interaktywnych elementach

**Settings** — formularz
- Reactive Forms z `FormBuilder`
- Pola: name, email, notifications toggle, theme select
- Walidacja: required, email pattern, min length
- Wyświetlanie błędów walidacji
- Przycisk Save z `mat-snackbar` confirmation

### Routing (lazy-loaded)

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/...') },
  { path: 'users', loadComponent: () => import('./users/...') },
  { path: 'settings', loadComponent: () => import('./settings/...') },
];
```

---

## Faza 2: Testy E2E (Playwright)

**Pliki:** `e2e/`, `playwright.config.ts`

1. Instalacja Playwright
2. Page Object Model w `e2e/pages/`:
   - `layout.page.ts` — nawigacja, sidenav
   - `dashboard.page.ts` — stat cards, chart
   - `users.page.ts` — tabela, filtry, search
   - `settings.page.ts` — formularz, walidacja
3. 27 testów w `e2e/tests/`:
   - **Navigation (6):** routing, sidenav toggle, active link, page titles, back navigation, deep link
   - **Dashboard (5):** stat cards render, values present, chart visible, events list, responsive
   - **Users (8):** table renders, sort by name, sort by email, filter by role, search, pagination, combined filter+search, empty state
   - **Settings (8):** form renders, required validation, email validation, min length, save success, toggle state, theme select, form reset

---

## Faza 3: Konfiguracja AI Workflow

### 3a. `CLAUDE.md` — kontekst projektu

- Konwencje: Angular 18 standalone, Material, signals, Playwright POM
- Komendy: ng serve, npx playwright test, ng build
- Wzorce: lazy-loaded routes, reactive forms, material theming

### 3b. `AGENTS.md` — instrukcje dla subagentów

- Sekcje: Component Generator, Test Writer, Code Reviewer
- Każdy agent z jasnym scope, dozwolonymi/zabronionymi akcjami
- Przykłady użycia

### 3c. `.claude/settings.json` — hooki i uprawnienia

```json
{
  "permissions": {
    "allow": [
      "Bash(ng serve)", "Bash(ng build)", "Bash(ng lint)",
      "Bash(npx playwright test*)",
      "Bash(npm install*)", "Bash(npm run*)"
    ]
  },
  "hooks": {
    "preCommit": ["ng lint --fix"]
  }
}
```

### 3d. `docs/ai-workflows.md` — gotowe prompty

Recepty/prompty wielokrotnego użytku:
1. **Generowanie komponentu** — prompt template z placeholderami
2. **Generowanie testów E2E** — prompt do tworzenia testów Playwright
3. **Code review** — prompt do review z checklist
4. **Refaktoring** — prompt do refaktoryzacji z zachowaniem kontraktu
5. **Debugging** — prompt do analizy błędów

---

## Faza 4: CI/CD (GitLab)

**Plik:** `.gitlab-ci.yml`

- Stages: install → lint → build → test:unit → test:e2e
- Osobny job `test:e2e:mr` na merge requestach
- Artefakty: playwright-report/, screenshots/, junit.xml

---

## Faza 5: Dokument prezentacji

**Plik:** `docs/demo-plan.md`

### Agenda (30-60 min)

| # | Sekcja | Czas | Co pokazać |
|---|--------|------|------------|
| 1 | Intro — Kontekst projektu dla AI | 5-8 min | CLAUDE.md, AGENTS.md, .claude/settings.json |
| 2 | Generowanie kodu | 8-12 min | Live dodanie feature'a, porównanie z/bez kontekstu |
| 3 | Subagenty i równoległość | 8-10 min | Explore, Plan, równoległe agenty |
| 4 | Testy E2E z AI | 5-8 min | 27 testów, POM, live generowanie testu |
| 5 | Code Review i jakość | 5-8 min | Review z worktree, hooki |
| 6 | CI/CD pipeline | 3-5 min | .gitlab-ci.yml, artefakty |
| 7 | Q&A | 5-10 min | — |

---

## Kolejność implementacji

| Krok | Co | Zależności |
|------|----|-----------|
| 1 | Scaffold Angular + Material | — |
| 2 | Layout component (shell) | 1 |
| 3 | Dashboard component | 2 |
| 4 | Users component | 2 |
| 5 | Settings component | 2 |
| 6 | Routing + lazy loading | 2-5 |
| 7 | Playwright setup + POM | 1 |
| 8 | E2E testy (27) | 6, 7 |
| 9 | CLAUDE.md + AGENTS.md | 1 |
| 10 | .claude/settings.json (hooki) | 9 |
| 11 | docs/ai-workflows.md | 9 |
| 12 | .gitlab-ci.yml | 1 |
| 13 | docs/demo-plan.md | 1-12 |
| 14 | Weryfikacja — testy pass, app działa | 1-13 |

---

## Weryfikacja

1. `ng serve` — aplikacja uruchamia się, nawigacja działa, wszystkie 4 widoki renderują się poprawnie
2. `npx playwright test` — wszystkie 27 testów przechodzą
3. `ng build` — production build bez błędów
4. Przegląd `docs/demo-plan.md` — agenda kompletna, talking points sensowne
5. Sprawdzenie `CLAUDE.md`, `AGENTS.md`, `docs/ai-workflows.md` — treść spójna z kodem
6. Sprawdzenie `.gitlab-ci.yml` — poprawna konfiguracja pipeline
