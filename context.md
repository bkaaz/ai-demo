Aplikacja Angular 18
4 komponenty: Layout (sidenav + toolbar), Dashboard (stat cards + activity chart + events), Users (tabela z filtrowaniem/sortowaniem/wyszukiwaniem), Settings (formularz z walidacją reactive forms)
Standalone components, Angular signals, lazy-loaded routes, Angular Material
Playwright E2E — 27 testów, wszystkie przechodzą ✅
Page Object Model w e2e/pages/
Testy pokrywają: nawigację (6), dashboard (5), users z filtrowaniem/sortowaniem (8), settings z walidacją (8)
data-testid na wszystkich interaktywnych elementach
GitLab CI/CD (.gitlab-ci.yml)
Pipeline: install → lint → build → test:unit → test:e2e
Osobny job test:e2e:mr uruchamiany na merge requestach
Artefakty: playwright-report, screenshots, JUnit XML
AI Workflow Documentation
AGENTS.md — konwencje projektu, komendy, wzorce
docs/ai-workflows.md — gotowe prompty do generowania komponentów, testów, refaktoryzacji
Co wymaga uwagi
GitLab remote — repo nie ma jeszcze remote. Trzeba dodać git remote add origin <URL> i push
Budget warning — initial bundle (575 KB) przekracza domyślny limit 512 KB. Dla POC to nieistotne
Unit testy — pipeline ma job test:unit, ale brak konfiguracji Karma/Jest. CI job gracefully skips