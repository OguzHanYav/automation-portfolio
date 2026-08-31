-- =========================================================
-- 0001_leads_schema.sql
-- CRM Pipeline: leads table, indexes, updated_at trigger,
-- Realtime publication, and baseline Row Level Security policies.
--
-- Diese Datei ist bewusst restriktiv (authenticated-only fuer
-- select/update/delete). Die Oeffnung fuer den Login-losen Angular-Zugriff
-- passiert additiv in 0003_open_access_no_login.sql - so bleibt die
-- Historie nachvollziehbar und es entstehen keine doppelten Policy-Namen.
--
-- Run this in the Supabase SQL editor or via `supabase db push`.
-- =========================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------
-- 1) Table
-- ---------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  status text not null default 'NEW',
  notes text,
  constraint leads_status_check check (status in ('NEW', 'IN_PROGRESS', 'WON', 'LOST'))
);

comment on table public.leads is 'CRM pipeline leads.';
comment on column public.leads.phone is 'E.164 format erwartet, z. B. +491511234567 - noetig fuer WhatsApp.';

-- ---------------------------------------------------------
-- 2) Indexes
-- ---------------------------------------------------------
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ---------------------------------------------------------
-- 3) updated_at trigger
-- ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 4) Realtime
-- ---------------------------------------------------------
alter publication supabase_realtime add table public.leads;

-- ---------------------------------------------------------
-- 5) Row Level Security - Basislinie
-- ---------------------------------------------------------
alter table public.leads enable row level security;

create policy "Anyone can create a lead"
on public.leads
for insert
to anon, authenticated
with check (true);

create policy "Authenticated users can read leads"
on public.leads
for select
to authenticated
using (true);

create policy "Authenticated users can update leads"
on public.leads
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete leads"
on public.leads
for delete
to authenticated
using (true);

-- ---------------------------------------------------------
-- 6) Notification audit log
-- ---------------------------------------------------------
create table if not exists public.lead_notifications (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  channel text not null check (channel in ('email', 'whatsapp')),
  status text not null check (status in ('sent', 'failed')),
  error text,
  created_at timestamptz not null default now()
);

create index if not exists lead_notifications_lead_id_idx on public.lead_notifications (lead_id);

alter table public.lead_notifications enable row level security;

create policy "Authenticated users can read notifications"
on public.lead_notifications
for select
to authenticated
using (true);
