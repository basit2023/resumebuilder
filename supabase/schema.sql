-- Run this in Supabase SQL Editor after creating a new project.
-- Enables RLS so each user only sees their own data.

create extension if not exists "pgcrypto";

-- profiles: 1-1 with auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  full_name text,
  plan text not null default 'free', -- 'free' | 'pro'
  stripe_customer_id text,
  created_at timestamptz default now()
);

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  title text not null default 'Untitled resume',
  template text not null default 'modern', -- modern | classic | compact
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);
create index if not exists resumes_user_id_idx on public.resumes(user_id);

create table if not exists public.review_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  resume_id uuid references public.resumes on delete set null,
  status text not null default 'pending', -- pending | in_review | delivered
  notes text,
  expert_feedback text,
  created_at timestamptz default now()
);

-- Auto-create a profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.review_requests enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "own resumes" on public.resumes;
create policy "own resumes" on public.resumes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own reviews" on public.review_requests;
create policy "own reviews" on public.review_requests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
