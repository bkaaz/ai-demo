# Demo Plan: AI w pracy developera

## Przegląd

| | |
|---|---|
| **Czas** | 30-60 minut |
| **Format** | Gotowe repo + live demo fragmentów |
| **Narzędzie** | Claude Code (CLI / VS Code) |
| **Projekt** | Angular 19 app z Material, Playwright E2E, GitLab CI/CD |

---

## Agenda

### 1. Intro — Kontekst projektu dla AI (5-8 min)

**Co pokazać:**
- Otworzyć Claude Code w terminalu → pokazać że automatycznie wczytuje `CLAUDE.md`
- Przejść przez `CLAUDE.md` — konwencje, komendy, struktura projektu
- Pokazać `AGENTS.md` — instrukcje dla subagentów (Component Generator, Test Writer, Code Reviewer)
- Pokazać `.claude/settings.json` — permissions, hooks

**Talking points:**
- "AI bez kontekstu to jak nowy developer bez onboardingu"
- "CLAUDE.md to onboarding doc dla AI — czyta go przy każdej sesji"
- "AGENTS.md to jak role w zespole — każdy agent ma swoją specjalizację"

**Wow moment:** Zapytać Claude Code "opisz architekturę tego projektu" — pokaże że rozumie stack dzięki kontekstowi.

---

### 2. Generowanie kodu z AI (8-12 min)

**Co pokazać:**
- Otworzyć `docs/ai-workflows.md` — pokazać gotowe prompty
- **Live demo:** Użyć promptu #6 (dodanie route) aby dodać nową stronę "Reports"
- Pokazać jak Claude Code:
  - Tworzy komponent z Angular Material
  - Dodaje lazy-loaded route
  - Dodaje link w sidenavie
  - Dodaje data-testid
- Porównanie: z CLAUDE.md (zachowuje konwencje) vs bez (generic code)

**Talking points:**
- "Prompty w docs/ai-workflows.md to reużywalne recepty — cały zespół może z nich korzystać"
- "Wzorce > instrukcje — 'wzoruj się na dashboard' działa lepiej niż opisywanie co robić"
- "AI generuje kod zgodny z konwencjami projektu, nie generic boilerplate"

**Wow moment:** Wygenerowany komponent od razu pasuje do reszty apki — ten sam styl, te same wzorce.

---

### 3. Subagenty i równoległość (8-10 min)

**Co pokazać:**
- **Explore agent:** "Znajdź wszystkie komponenty używające signal() i pokaż jak zarządzają stanem"
- **Plan agent:** "Zaplanuj implementację systemu powiadomień" — pokaże plan bez pisania kodu
- **Równoległe agenty:** Odpalić Explore + Plan jednocześnie, pokazać że działają niezależnie
- **Code review agent:** "Zrób review zmian na aktualnym branchu"

**Talking points:**
- "Subagenty to specjaliści — każdy ma swój zakres i narzędzia"
- "Explore agent przeszukuje codebase bez zmieniania plików — bezpieczne discovery"
- "Równoległe agenty = szybsza praca, mniej czekania"
- "Plan agent = alignment przed kodowaniem, nie po"

**Wow moment:** Dwa agenty działające równolegle, każdy z innym zadaniem, wyniki w sekundy.

**Komendy do demonstracji:**
```
# Explore agent
"Użyj Explore agent: znajdź wszystkie miejsca gdzie używamy signal() i computed()"

# Plan agent
"Zaplanuj implementację komponentu notifications — użyj Plan mode"

# Parallel
"Uruchom równolegle: Agent 1 sprawdź pokrycie data-testid, Agent 2 znajdź potencjalne problemy z accessibility"
```

---

### 4. Testy E2E z AI (5-8 min)

**Co pokazać:**
- Przejść przez strukturę testów: `e2e/pages/` (POM) + `e2e/tests/`
- Pokazać Page Object — jak lokatory używają data-testid
- Odpalić `npx playwright test` → 27 testów, wszystkie zielone
- **Live demo:** Wygenerować test dla nowo dodanego komponentu "Reports"
- Odpalić `npx playwright test --ui` — interaktywny runner

**Talking points:**
- "Page Object Model = testy nie łamią się przy zmianach UI"
- "data-testid = selektory odporne na refaktoring CSS/HTML"
- "AI generuje testy bazując na istniejących wzorcach — spójna jakość"
- "27 testów pokrywa: nawigację, dashboard, users (filter/sort/search), settings (walidacja)"

**Wow moment:** Odpalić testy z `--ui`, pokazać trace viewer z krokami, screenshotami i timeline.

---

### 5. Code Review i jakość (5-8 min)

**Co pokazać:**
- **Live demo:** Zrobić celową "złą zmianę" (np. usunąć data-testid, użyć any)
- Poprosić Claude Code o review — pokaże problemy
- Pokazać hooki w `.claude/settings.json`:
  - `PreCommit` → auto lint
  - `PostEdit` → weryfikacja buildu
- Wspomnieć worktree isolation (review w izolowanym katalogu)

**Talking points:**
- "Code review z AI = consistent checklist, zero ego"
- "Hooki to guardrails — automatyczna jakość bez manual effort"
- "Review checklist w AGENTS.md — te same standardy dla AI i ludzi"

**Wow moment:** AI łapie brak data-testid, użycie `any`, brak error handlingu — w sekundy.

---

### 6. CI/CD pipeline (3-5 min)

**Co pokazać:**
- Przejść przez `.gitlab-ci.yml` — stages: install → lint → build → test:e2e
- Osobny job `test:e2e:mr` dla merge requestów
- Artefakty: playwright-report, screenshots, JUnit XML
- Jak AI pomogło wygenerować pipeline

**Talking points:**
- "Pipeline wygenerowany z AI, zoptymalizowany pod Playwright"
- "test:e2e:mr = E2E na każdym merge requeście"
- "JUnit reporter = integracja z GitLab test reports"

---

### 7. Q&A (5-10 min)

**Przygotowane odpowiedzi na częste pytania:**

**"Czy AI zastąpi developerów?"**
→ Nie. AI to narzędzie, nie zamiennik. Przyspiesza rutynowe zadania — developer nadal podejmuje decyzje architektoniczne i reviewuje output.

**"Jak z jakością generowanego kodu?"**
→ Kontekst jest kluczowy. CLAUDE.md + wzorce w repozytorium = kod zgodny z konwencjami. Bez kontekstu AI generuje generic boilerplate.

**"Czy to bezpieczne w produkcji?"**
→ AI to asystent, nie automat. Permissions w settings.json blokują destrukcyjne komendy. Code review (ludzki + AI) dalej jest wymagany.

**"Ile czasu to zaoszczędza?"**
→ Zależy od zadania. Generowanie boilerplate/testów: 5-10x szybciej. Debugging/architektura: marginalnie — tam liczy się doświadczenie.

---

## Checklist przed prezentacją

- [ ] `npx ng serve` — app działa na localhost:4200
- [ ] `npx playwright test` — 27/27 zielone
- [ ] `npx ng build` — build bez błędów
- [ ] Chrome zainstalowany (Playwright channel: 'chrome')
- [ ] Terminal z Claude Code gotowy
- [ ] Przejrzane talking points
- [ ] Fallback scenariusze przejrzane

## Fallback scenariusze

| Problem | Rozwiązanie |
|---------|-------------|
| Claude Code nie odpowiada | Pokazać CLAUDE.md i AGENTS.md jako dokumentację — wartość jest w procesie, nie w narzędziu |
| Testy nie przechodzą | Pokazać playwright-report z ostatniego runa (artefakt) |
| Build nie działa | Mieć gotowy `dist/` z wcześniejszego builda |
| Live demo się zacina | Przejść do przeglądu gotowego kodu + Q&A wcześniej |
| Brak internetu | Wszystko działa lokalnie — Claude Code cached, testy offline |

---

## Struktura repo — co gdzie jest

```
claude-app-1/
├── CLAUDE.md                    ← Kontekst projektu dla AI
├── AGENTS.md                    ← Instrukcje dla subagentów
├── .claude/settings.json        ← Hooki, permissions
├── .gitlab-ci.yml               ← CI/CD pipeline
├── docs/
│   ├── demo-plan.md             ← TEN DOKUMENT
│   ├── ai-workflows.md          ← Gotowe prompty
│   └── implementation-plan.md   ← Plan implementacji
├── src/app/
│   ├── layout/                  ← Shell (sidenav + toolbar)
│   ├── dashboard/               ← Stat cards + chart + events
│   ├── users/                   ← Tabela z filtrowaniem/sortowaniem
│   ├── settings/                ← Formularz z walidacją
│   └── app.routes.ts            ← Lazy-loaded routes
├── e2e/
│   ├── pages/                   ← Page Object Model
│   └── tests/                   ← 27 test specs
└── playwright.config.ts         ← Playwright config
```
