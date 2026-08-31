# Bugfixes, Mehrsprachigkeit (DE/EN/TR) & CRM-Demo

## Einbau
Diese Dateien spiegeln deine bestehende Ordnerstruktur unter `src/app/`.
Ersetze deine aktuellen Dateien 1:1 durch diese. `package.json` und
`angular.json` wurden nicht verändert/benötigt — es kommen keine neuen
npm-Pakete dazu, alles läuft mit reinem Angular (Signals, `effect()`,
`takeUntilDestroyed()`, natives Drag & Drop).

⚠️ `data/projects.ts` war in deinem ursprünglichen Upload nicht enthalten,
wurde aber von mehreren Komponenten importiert. Sie wurde mit 3 Beispiel-
Case-Studies neu aufgebaut — bitte mit deinen echten Projekten ersetzen.

## Bugfixes (aus den ursprünglichen Dateien)
1. Projekt-Detailseite aktualisierte sich nicht beim Wechsel zwischen zwei
   Case Studies (`route.snapshot.paramMap` statt Subscription) → behoben.
2. Kein dynamisches `<html lang>` / kein reaktiver Seitentitel → behoben.
3. `@for`-Tracking über Textwerte konnte bei Duplikaten Probleme machen
   → auf `track $index` umgestellt.
4. Kontaktformular prüfte im Code nur die Consent-Checkbox → erweitert.
5. `NG5002`-Compile-Fehler: Angular-Templates unterstützen **keine**
   TypeScript-Generics in Methodenaufrufen wie `i18n.list<string>(...)`.
   Der `<...>`-Teil wird als HTML-Tag fehlinterpretiert und bringt die
   `@for`/`@if`-Blockzählung durcheinander. Überall entfernt — betrifft
   dich auch, falls du selbst neue `i18n.list(...)`-Aufrufe ergänzt:
   **niemals Generics in Template-Ausdrücken verwenden.**

## Mehrsprachigkeit (DE/EN/TR)
- `app/i18n/translations.ts`: Wörterbuch pro Sprache.
- `app/i18n/language.service.ts`: aktuelle Sprache als Signal, `t('pfad')`
  für Strings, `list('pfad')` für Listen/Objekte, aktualisiert `<html lang>`
  und `localStorage`. Sprachumschalter (DE/EN/TR) sitzt in der Navbar.

## Neu: Interaktive CRM-Demo (`/demo`)
Eine vollständig im Browser laufende Demo (kein Backend, Daten leben nur
im Arbeitsspeicher via Angular Signals — Reset bei Seiten-Reload, dafür
gibt es `crm.reset()` im Service für einen "Zurücksetzen"-Button, falls
gewünscht). Erreichbar über den Navbar-Link "CRM Demo" und den Hero-Button
auf der Startseite.

**Umgesetzte Funktionen (wie angefragt):**
- **Lead erstellen** (`+ Neuer Lead`): Modal mit Name, E-Mail, Telefon,
  Firma, Quelle, geschätztem Wert, optionaler Erstnotiz.
- **Lead-Liste**: Tabellenansicht mit Name, Firma, Stage, Wert, Quelle,
  Erstellungsdatum, klickbar für Details.
- **Lead-Details**: Seitliches Drawer-Panel mit Kontaktdaten, Quelle, Wert,
  Datum, Stage-Wechsel-Buttons, Notizen-Verlauf + neue Notiz hinzufügen,
  Lead löschen (mit Bestätigung).
- **Pipeline-Verschiebung**: Kanban-Board mit den Spalten Neuer Lead →
  Kontaktiert → Gebucht → Abgeschlossen → Follow-up → Verloren.
  Leads lassen sich per **Drag & Drop** zwischen Spalten ziehen, oder über
  die ←/→-Pfeile direkt auf der Karte (funktioniert auch ohne Maus/auf
  Touch-Geräten zuverlässig — Drag & Drop ist die "Wow-Optik" für die
  Kundenvorführung, die Pfeile sind der robuste Fallback).

**Struktur:**
```
app/crm-demo/
  crm-demo.model.ts        Typen (Lead, PipelineStage, ...)
  crm-demo.service.ts      In-Memory-State (Signals), Seed-Daten
  components/
    lead-card.component.ts
    pipeline-board.component.ts
    lead-list.component.ts
    lead-form.component.ts
    lead-detail.component.ts
app/pages/crm-demo/
  crm-demo.component.ts    Seite: verbindet alles, Board/Liste-Umschalter
```

Alle Texte sind über dieselbe `LanguageService`-Struktur mehrsprachig
(Abschnitt `crm` in `translations.ts`).

## Nächste sinnvolle Schritte
- Echte Projektdaten in `data/projects.ts` eintragen.
- Falls gewünscht: „Zurücksetzen“-Button im UI ergänzen, der
  `crm.reset()` aufruft (Service-Methode existiert bereits).
- Meta-Description/OG-Tags könnten ebenfalls sprachabhängig gemacht werden.
