-- Tabelle fuer Login + Cloud-Sync von Fokus.
-- Einmal im Supabase-Dashboard unter "SQL Editor" ausfuehren.
-- Pro Konto und localStorage-Key (pomo_settings, pomo_sessions, ...) eine Zeile.

create table if not exists user_data (
  user_id uuid references auth.users on delete cascade,
  key text,
  value jsonb,
  updated_at timestamptz default now(),
  primary key (user_id, key)
);

-- Row-Level-Security: Jede Person sieht und aendert nur ihre eigenen Zeilen.
alter table user_data enable row level security;

drop policy if exists "own rows" on user_data;
create policy "own rows" on user_data
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
