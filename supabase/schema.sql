-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS guards).

-- ============================================================
-- 1. profiles — a public, queryable mirror of auth.users
--    auth.users itself is never exposed over the API, even to you;
--    this table is what your app (and you, via Table Editor) reads.
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are readable by everyone" on public.profiles;
create policy "profiles are readable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "users can update their own profile" on public.profiles;
create policy "users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));
  -- the role = ... check stops a user granting themselves admin via the API;
  -- only you, changing it directly in the Supabase dashboard, can do that.

-- Auto-create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper used by policies below: is the logged-in user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================
-- 2. articles — admin writes, everyone reads published posts
-- ============================================================
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,
  author_id uuid not null references public.profiles (id),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles enable row level security;

drop policy if exists "published articles are readable by everyone" on public.articles;
create policy "published articles are readable by everyone"
  on public.articles for select
  using (published = true or public.is_admin());

drop policy if exists "only admins can insert articles" on public.articles;
create policy "only admins can insert articles"
  on public.articles for insert
  with check (public.is_admin());

drop policy if exists "only admins can update articles" on public.articles;
create policy "only admins can update articles"
  on public.articles for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "only admins can delete articles" on public.articles;
create policy "only admins can delete articles"
  on public.articles for delete
  using (public.is_admin());

-- Keep updated_at current on every edit.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- 3. Make yourself admin (run this LAST, after you've signed up once)
-- ============================================================
-- update public.profiles set role = 'admin' where email = 'you@example.com';
