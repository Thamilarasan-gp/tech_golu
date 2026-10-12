-- ==============================================================================
-- SMART GOLU - SUPABASE POSTGRESQL & REALTIME SETUP SCRIPT
-- ==============================================================================
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create table public.golu_state if it does not already exist
create table if not exists public.golu_state (
  id integer primary key check (id = 1),
  doll_id integer not null check (doll_id between 1 and 8),
  updated_at timestamptz not null default now()
);

-- 2. Insert initial state row (Doll 1 = Lord Ganesha) if not present
insert into public.golu_state (id, doll_id, updated_at)
values (1, 1, now())
on conflict (id) do update set
  updated_at = now();

-- 3. Enable Row Level Security (RLS)
alter table public.golu_state enable row level security;

-- 4. Create Policy allowing anyone (public / anonymous / authenticated) to read the live state
do $$
begin
  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' 
    and tablename = 'golu_state' 
    and policyname = 'Allow public reading'
  ) then
    create policy "Allow public reading"
    on public.golu_state
    for select
    to anon, authenticated
    using (true);
  end if;
end
$$;

-- 5. Add table to Supabase Realtime publication for WebSocket change broadcasts
-- This allows browser clients to listen to UPDATE events instantly without polling
do $$
begin
  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' 
    and schemaname = 'public' 
    and tablename = 'golu_state'
  ) then
    alter publication supabase_realtime add table public.golu_state;
  end if;
end
$$;

-- 6. Set REPLICA IDENTITY FULL to ensure updated records deliver full payload over Realtime
alter table public.golu_state replica identity full;

-- Verify setup
select * from public.golu_state;
