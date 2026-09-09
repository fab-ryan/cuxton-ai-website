-- ═══════════════════════════════════════════════════════════════════
--  CUXTON AI — Supabase schema
--
--  Run this once in the Supabase SQL editor (or `supabase db push`).
--  It is written to be idempotent, so it is safe to re-run.
--
--  Model
--    profiles          admin accounts, mirrored from auth.users
--    insights          editorial posts surfaced on the public site
--    contacts          submissions from the public /contact form
--    contact_replies   responses sent back to a contact, with email status
-- ═══════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ── Shared trigger: keep updated_at honest ────────────────────────
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ═══════════════════════════════════════════════════════════════════
--  profiles
-- ═══════════════════════════════════════════════════════════════════
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text,
  role       text not null default 'viewer' check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now()
);

-- Every auth user gets a profile. Role defaults to 'viewer', which grants
-- nothing — an account only becomes useful once promoted to 'admin' by hand.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- SECURITY DEFINER so the check itself is not subject to RLS on profiles,
-- which would otherwise recurse when a profiles policy calls it.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;


-- ═══════════════════════════════════════════════════════════════════
--  insights
-- ═══════════════════════════════════════════════════════════════════
create table if not exists public.insights (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  tag           text not null default 'Architecture',
  excerpt       text not null default '',
  body          text not null default '',
  cover_image   text,
  read_minutes  int,
  status        text not null default 'draft' check (status in ('draft', 'published')),
  published_at  timestamptz,
  author_id     uuid references public.profiles (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- The rich-text document produced by the editor, in Tiptap's JSON shape.
-- `body` is kept alongside it as the plain-text rendition, which is what
-- excerpts, reading time and search read. Added separately so re-running
-- this file upgrades an existing project rather than failing.
alter table public.insights add column if not exists body_json jsonb;

create index if not exists insights_status_published_at_idx
  on public.insights (status, published_at desc);

drop trigger if exists insights_touch_updated_at on public.insights;
create trigger insights_touch_updated_at
  before update on public.insights
  for each row execute function public.touch_updated_at();

-- Stamp published_at the first time a post goes live, clear it on unpublish.
create or replace function public.sync_insight_published_at()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  elsif new.status = 'draft' then
    new.published_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists insights_sync_published_at on public.insights;
create trigger insights_sync_published_at
  before insert or update on public.insights
  for each row execute function public.sync_insight_published_at();


-- ═══════════════════════════════════════════════════════════════════
--  contacts
-- ═══════════════════════════════════════════════════════════════════
create table if not exists public.contacts (
  id             uuid primary key default gen_random_uuid(),
  first_name     text not null,
  last_name      text not null,
  email          text not null,
  organisation   text,
  role           text,
  sector         text,
  team_size      text,
  message        text not null,
  topics         text[] not null default '{}',
  status         text not null default 'new'
                 check (status in ('new', 'in_review', 'responded', 'archived')),
  internal_notes text not null default '',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists contacts_status_created_at_idx
  on public.contacts (status, created_at desc);

drop trigger if exists contacts_touch_updated_at on public.contacts;
create trigger contacts_touch_updated_at
  before update on public.contacts
  for each row execute function public.touch_updated_at();


-- ═══════════════════════════════════════════════════════════════════
--  contact_replies
-- ═══════════════════════════════════════════════════════════════════
create table if not exists public.contact_replies (
  id                  uuid primary key default gen_random_uuid(),
  contact_id          uuid not null references public.contacts (id) on delete cascade,
  author_id           uuid references public.profiles (id) on delete set null,
  subject             text not null,
  body                text not null,
  email_status        text not null default 'pending'
                      check (email_status in ('pending', 'sent', 'failed')),
  email_error         text,
  provider_message_id text,
  created_at          timestamptz not null default now()
);

create index if not exists contact_replies_contact_id_idx
  on public.contact_replies (contact_id, created_at desc);


-- ═══════════════════════════════════════════════════════════════════
--  Row Level Security
--
--  The dashboard talks to Postgres straight from the browser with the
--  anon key, so these policies are the only thing standing between a
--  visitor and the data. Nothing here trusts the client.
-- ═══════════════════════════════════════════════════════════════════
alter table public.profiles        enable row level security;
alter table public.insights        enable row level security;
alter table public.contacts        enable row level security;
alter table public.contact_replies enable row level security;

-- ── profiles ──
drop policy if exists "own profile readable" on public.profiles;
create policy "own profile readable" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- ── insights ──
-- Anyone, signed in or not, may read published posts. Drafts stay invisible.
drop policy if exists "published insights are public" on public.insights;
create policy "published insights are public" on public.insights
  for select using (status = 'published' or public.is_admin());

drop policy if exists "admins manage insights" on public.insights;
create policy "admins manage insights" on public.insights
  for all using (public.is_admin()) with check (public.is_admin());

-- ── contacts ──
-- The public form posts with the anon key, so anonymous INSERT is required.
-- Reading them back is admin-only.
--
-- The WITH CHECK is deliberately narrow. A permissive `true` would let
-- anyone posting straight at the REST API file an enquiry as already
-- "archived", or plant text in the internal_notes an admin later reads.
-- Column defaults are applied before this runs, so the real form — which
-- sends neither column — satisfies it.
drop policy if exists "anyone may submit a contact" on public.contacts;
create policy "anyone may submit a contact" on public.contacts
  for insert to anon, authenticated
  with check (
    status = 'new'
    and internal_notes = ''
    and char_length(first_name) between 1 and 100
    and char_length(last_name) between 1 and 100
    and char_length(email) between 3 and 320
    and char_length(message) between 1 and 5000
    and coalesce(char_length(organisation), 0) <= 200
    and coalesce(char_length(role), 0) <= 200
    and coalesce(array_length(topics, 1), 0) <= 20
  );

drop policy if exists "admins read contacts" on public.contacts;
create policy "admins read contacts" on public.contacts
  for select using (public.is_admin());

drop policy if exists "admins update contacts" on public.contacts;
create policy "admins update contacts" on public.contacts
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete contacts" on public.contacts;
create policy "admins delete contacts" on public.contacts
  for delete using (public.is_admin());

-- ── contact_replies ──
-- Written by the send-contact-reply Edge Function (service role, which
-- bypasses RLS); admins read them to render the thread.
drop policy if exists "admins read replies" on public.contact_replies;
create policy "admins read replies" on public.contact_replies
  for select using (public.is_admin());


-- ═══════════════════════════════════════════════════════════════════
--  Storage: insight-media
--
--  Cover photos and in-article images. The bucket is public-read because
--  the marketing site is a static export served from a CDN with no
--  session — every visitor must be able to fetch the file directly.
--  Writing is admin-only.
-- ═══════════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'insight-media',
  'insight-media',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- SVG is deliberately absent from the list above: it can carry script, and
-- these files are served from the same origin as the site.

drop policy if exists "insight media is publicly readable" on storage.objects;
create policy "insight media is publicly readable" on storage.objects
  for select using (bucket_id = 'insight-media');

drop policy if exists "admins upload insight media" on storage.objects;
create policy "admins upload insight media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'insight-media' and public.is_admin());

drop policy if exists "admins replace insight media" on storage.objects;
create policy "admins replace insight media" on storage.objects
  for update to authenticated
  using (bucket_id = 'insight-media' and public.is_admin())
  with check (bucket_id = 'insight-media' and public.is_admin());

drop policy if exists "admins delete insight media" on storage.objects;
create policy "admins delete insight media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'insight-media' and public.is_admin());


-- ═══════════════════════════════════════════════════════════════════
--  Promote your first admin — replace the address, then run:
--
--    update public.profiles set role = 'admin' where email = 'you@cuxtonai.com';
-- ═══════════════════════════════════════════════════════════════════
