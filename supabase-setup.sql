-- Run this in your Supabase project: SQL Editor → New Query → paste → Run

-- 1. Create the progress table
create table if not exists public.progress (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  state       jsonb not null default '[]'::jsonb,
  active_week integer not null default 0,
  updated_at  timestamptz not null default now()
);

-- 2. Enable Row Level Security so users can only read/write their own row
alter table public.progress enable row level security;

create policy "Users can read own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can upsert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.progress for update
  using (auth.uid() = user_id);
