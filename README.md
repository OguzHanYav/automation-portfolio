# Bugfixes, Mehrsprachigkeit (DE/EN/TR) & CRM mit Supabase-Backend

## Versionsverlauf dieses Projekts
1. Ursprüngliche Angular-Dateien: Bugfixes + i18n (DE/EN/TR).
2. Interaktive CRM-Demo mit In-Memory-Daten (Kanban-Board, Formular).
3. **Diese Version**: CRM-Demo an echtes Supabase-Backend angebunden,
   inkl. automatischem E-Mail- (Resend) und WhatsApp-Versand (Twilio) bei
   neuem Lead — komplett ohne Login nutzbar.

## Einbau
Dateien 1:1 in dein bestehendes Angular-Projekt kopieren (`src/app/...`
entspricht hier `app/...`, `src/environments/...` entspricht `environments/...`).
Neu benötigtes npm-Paket:
```bash
npm i @supabase/supabase-js
```

## Setup-Reihenfolge

1. **SQL-Migrationen ausführen** (in dieser Reihenfolge, im Supabase SQL
   Editor oder per `supabase db push`):
   - `supabase/migrations/0001_leads_schema.sql` — Tabelle `leads`,
     Indizes, `updated_at`-Trigger, Realtime, **restriktive**
     Baseline-RLS (nur `authenticated`).
   - `supabase/migrations/0003_open_access_no_login.sql` — öffnet
     zusätzlich SELECT + UPDATE für `anon`, damit alles ohne Login
     funktioniert (INSERT ist bereits in 0001 für `anon` erlaubt).

   *(Bewusst zwei Dateien statt einer: 0001 ist die "seriöse" Baseline,
   0003 die für dich gewählte Öffnung — falls du später doch Supabase
   Auth einführst, kannst du 0003 einfach nicht mehr ausführen bzw. die
   Policies wieder entfernen, ohne 0001 anfassen zu müssen.)*

2. **Environment-Werte eintragen**: `environments/environment.ts` (Prod)
   und `environments/environment.development.ts` (lokal) mit deiner
   Supabase-URL und dem `anon`-Key füllen. Diese Werte sind bewusst nicht
   geheim — der Zugriffsschutz läuft über RLS, nicht über Geheimhaltung
   des Keys (der landet ohnehin im Browser-Bundle).

3. **Edge Function deployen** (statt einer Vercel-API-Route, da Angular
   keinen eigenen Server mitbringt):
   ```bash
   supabase functions deploy lead-created --no-verify-jwt
   supabase secrets set \
     RESEND_API_KEY=re_xxx \
     RESEND_FROM_EMAIL="CRM Demo <onboarding@resend.dev>" \
     TWILIO_ACCOUNT_SID=ACxxx \
     TWILIO_AUTH_TOKEN=xxx \
     TWILIO_WHATSAPP_FROM=whatsapp:+14155238886 \
     LEAD_WEBHOOK_SECRET=$(openssl rand -hex 32)
   ```
   `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` müssen NICHT gesetzt
   werden — die stellt die Edge-Function-Runtime automatisch bereit.

4. **Database Webhook einrichten** (Supabase Dashboard → *Database* →
   *Webhooks* → *Create a new hook*):
   - Table: `leads`, Events: `Insert`, Type: `HTTP Request`
   - URL: `https://<project-ref>.supabase.co/functions/v1/lead-created`
   - Header: `x-webhook-secret: <derselbe Wert wie LEAD_WEBHOOK_SECRET>`

5. **Resend**: Account anlegen, `RESEND_API_KEY` erzeugen. Zum Testen
   funktioniert `onboarding@resend.dev` als Absender ohne eigene Domain.

6. **Twilio (WhatsApp)**: Account anlegen, `TWILIO_ACCOUNT_SID` +
   `TWILIO_AUTH_TOKEN` übernehmen. Zum Testen die **WhatsApp Sandbox**
   aktivieren (Twilio Console → *Messaging* → *Try it out*) — die
   Zielnummer muss vorher per WhatsApp dem Sandbox beitreten ("join
   `<code>`"). Für den Produktivbetrieb einen eigenen WhatsApp Business
   Sender beantragen.

## Zugriffsmodell — bewusst ohne Login

Wie besprochen: **jeder** (anon key) darf Leads anlegen, lesen und durch
die Pipeline verschieben (INSERT/SELECT/UPDATE). Das ist in
`0003_open_access_no_login.sql` explizit so dokumentiert und
kommentiert, inklusive kurzer Erinnerung, dass damit Name/E-Mail/Telefon
aller Leads für jeden mit Zugriff auf die Seite sichtbar sind — für eine
Demo/Vorführung mit Test-Daten unkritisch, bei echten Kundendaten später
per Supabase Auth nachrüstbar.

**DELETE ist weiterhin nicht für `anon` freigegeben** (nur
`authenticated`/service role). Das bedeutet: Der "Lead löschen"-Button im
Detail-Drawer (`lead-detail.component.ts`) ist im aktuellen Zustand ohne
Login **nicht funktionsfähig** — der Request wird von RLS abgelehnt und
landet nur als `console.error`, ohne Fehlermeldung im UI. Drei Optionen:
- So lassen (Löschen bewusst nur für später mit Login).
- Auch DELETE für `anon` öffnen (auskommentierte Policy liegt bereits in
  `0003_open_access_no_login.sql`, einfach einkommentieren).
- Button aus `lead-detail.component.ts` entfernen, falls nicht gewünscht.

Sag Bescheid, welche Variante du willst — ich passe es entsprechend an.

## Architektur

```
Formular (anon key, kein Login)
        │  INSERT INTO leads (status default 'NEW')
        ▼
   Supabase Postgres ──── Database Webhook (INSERT auf "leads")
        │                            │
        │ Realtime                  ▼
        ▼                 Supabase Edge Function "lead-created"
  Pipeline-Board (live,           │        │
  ebenfalls ohne Login)      Resend (E-Mail)  Twilio (WhatsApp)
                                   │
                        lead_notifications (Audit-Log)
```

Der Versand läuft serverseitig in der Edge Function, komplett unabhängig
vom Insert-Request des Formulars — ein langsamer/fehlschlagender E-Mail-
oder WhatsApp-Versand blockiert oder verzögert nie das Speichern des
Leads. Beide Kanäle laufen zudem unabhängig voneinander
(`Promise.allSettled`), jeder Versuch wird in `lead_notifications`
protokolliert.

## Dateien in diesem Paket

```
supabase/migrations/0001_leads_schema.sql          Tabellen, Indizes, Trigger, Realtime, Baseline-RLS
supabase/migrations/0003_open_access_no_login.sql  Öffnet SELECT/UPDATE für anon (kein Login)
supabase/functions/lead-created/index.ts           Edge Function: E-Mail + WhatsApp + Logging

app/supabase/supabase.types.ts     TypeScript-Typen (Database, Lead)
app/supabase/supabase.service.ts   Angular-Service mit dem Supabase-Client (anon key)
app/crm/leads.service.ts           State-Management: fetch, Realtime-Subscription, create/move/deleteLead
app/crm/components/                lead-card, pipeline-board, lead-list, lead-form, lead-detail
app/pages/crm/crm.component.ts     Seite: verbindet alles, Board/Liste-Umschalter

environments/environment.ts                 Supabase-URL + anon key (Production)
environments/environment.development.ts     dito, für `ng serve`
```

## Frühere Bugfixes (weiterhin gültig)
- Projekt-Detailseite reagiert jetzt auf Routenwechsel (paramMap-Subscription).
- `<html lang>` und Seitentitel reagieren auf die gewählte Sprache.
- `@for`-Tracking auf `$index` umgestellt, wo Duplikate möglich sind.
- **Wichtig, falls du selbst weitere `i18n.list(...)`-Aufrufe ergänzt**:
  niemals `i18n.list<Typ>(...)` mit Generics in Angular-Templates
  schreiben — das `<...>` wird als HTML-Tag fehlinterpretiert und bringt
  `@for`/`@if`-Blöcke durcheinander (NG5002).
