-- =========================================================
-- 0003_open_access_no_login.sql
--
-- Das Angular-Projekt hat kein Login. Kunden UND der Betreiber greifen
-- über denselben anon key zu. Ergänzt die Policies aus
-- 0001_leads_schema.sql um öffentliches Lesen und Status-Ändern.
--
-- Sicherheitshinweis (bewusste Entscheidung, hier nur einmal notiert):
-- Jede/r mit dem anon key (steht öffentlich im Browser-Bundle) kann damit
-- Name/E-Mail/Telefon aller Leads sehen. Für eine Demo/Vorführung mit
-- Test-Daten unkritisch — bei echten Kundendaten später per Supabase Auth
-- nachrüsten (siehe README, Abschnitt "Später: Login nachrüsten").
-- =========================================================

create policy "Anyone can read leads"
on public.leads
for select
to anon
using (true);

create policy "Anyone can update lead status"
on public.leads
for update
to anon
using (true)
with check (true);

-- Löschen bleibt bewusst nur für "authenticated" (bzw. den service role
-- key) erlaubt, damit ein Klick auf der Kundenseite nicht versehentlich
-- Datensätze endgültig entfernt. Falls auch das ohne Login gehen soll:
--
-- create policy "Anyone can delete leads"
-- on public.leads for delete to anon using (true);
