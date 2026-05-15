# AI Workflows — Reusable Prompts

Gotowe prompty do użycia z Claude Code. Kopiuj i wklej, podmień placeholdery w `{{...}}`.

---

## 1. Generowanie nowego komponentu

```
Wygeneruj nowy standalone Angular component "{{NAZWA}}" w src/app/{{NAZWA}}/:
- Użyj Angular Material: {{MATERIAL_COMPONENTS}}
- Stan z signal(): {{OPIS_STANU}}
- Template z @for/@if control flow
- data-testid na każdym interaktywnym elemencie
- SCSS ze zmiennymi Material theming
- Responsywny layout (mobile-first)

Wzoruj się na istniejących komponentach w src/app/dashboard/ i src/app/users/.
```

### Przykład użycia:
```
Wygeneruj nowy standalone Angular component "notifications" w src/app/notifications/:
- Użyj Angular Material: mat-list, mat-badge, mat-icon-button
- Stan z signal(): lista powiadomień, count nieprzeczytanych
- Template z @for/@if control flow
- data-testid na każdym interaktywnym elemencie
- SCSS ze zmiennymi Material theming
- Responsywny layout (mobile-first)
```

---

## 2. Generowanie testów E2E

```
Napisz testy Playwright E2E dla komponentu {{NAZWA}}:

1. Stwórz Page Object w e2e/pages/{{NAZWA}}.page.ts:
   - Lokatory z data-testid
   - Metody akcji (click, fill, navigate)
   - Gettery dla asercji

2. Stwórz testy w e2e/tests/{{NAZWA}}.spec.ts:
   - {{LISTA_SCENARIUSZY}}
   - Użyj beforeEach z goto()
   - Testuj happy path + edge cases
   - Każdy test niezależny (brak shared state)

Wzoruj się na e2e/pages/users.page.ts i e2e/tests/users.spec.ts.
```

---

## 3. Code Review

```
Zrób code review aktualnych zmian na branchu:

Checklist:
- [ ] Standalone components (bez NgModules)
- [ ] Signals do stanu (nie RxJS Subjects)
- [ ] data-testid na interaktywnych elementach
- [ ] Poprawne typy TypeScript (brak any)
- [ ] Error handling
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Responsive design
- [ ] Brak hardcoded strings

Zgłoś: krytyczne > ważne > sugestie.
Dla każdego issue podaj plik:linia i proponowany fix.
```

---

## 4. Refaktoring

```
Zrefaktoruj {{PLIK_LUB_KOMPONENT}}:

Cel: {{CEL_REFAKTORINGU}}

Zasady:
- Zachowaj wszystkie data-testid
- Nie zmieniaj publicznego API komponentu
- Uruchom testy przed i po: npx playwright test
- Zachowaj bundle size (nie dodawaj importów)
- Wyciągnij shared logic do utility functions

Pokaż diff przed i po.
```

---

## 5. Debugging

```
Zdebuguj problem: {{OPIS_PROBLEMU}}

Kroki:
1. Odtwórz problem (opisz jak)
2. Znajdź root cause (sprawdź logi, network, stan)
3. Zaproponuj fix
4. Sprawdź czy fix nie psuje istniejących testów

Kontekst:
- Plik: {{PLIK}}
- Oczekiwane zachowanie: {{OCZEKIWANE}}
- Aktualne zachowanie: {{AKTUALNE}}
```

---

## 6. Dodanie route (nowa strona)

```
Dodaj nowy lazy-loaded route "{{NAZWA}}":

1. Stwórz komponent w src/app/{{NAZWA}}/
2. Dodaj route w app.routes.ts (lazy loadComponent)
3. Dodaj link w layout sidenav (icon: {{ICON}})
4. Dodaj data-testid="nav-{{NAZWA}}" na link
5. Stwórz basic Page Object i test nawigacji

Wzoruj się na istniejących routes w app.routes.ts.
```

---

## 7. Subagent: Parallel Exploration

```
Uruchom równolegle:

Agent 1 (Explore): Znajdź wszystkie komponenty używające signal() i pokaż jak zarządzają stanem
Agent 2 (Explore): Sprawdź pokrycie data-testid — które interaktywne elementy nie mają testid
Agent 3 (Plan): Zaplanuj implementację {{NOWY_FEATURE}}

Zbierz wyniki i podsumuj w 5 punktach.
```

---

## Tips

- **Kontekst jest kluczowy** — Claude Code automatycznie czyta CLAUDE.md, więc prompty mogą być krótsze
- **Wzorce > instrukcje** — "wzoruj się na X" działa lepiej niż długie opisy
- **Inkrementalne zmiany** — lepiej 3 małe prompty niż 1 wielki
- **Testy jako walidacja** — zawsze kończ "uruchom npx playwright test"
- **Subagenty do eksploracji** — użyj Explore agent zanim zaczniesz implementować
