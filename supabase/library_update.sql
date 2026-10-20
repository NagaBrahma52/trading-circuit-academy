-- Run this AFTER schema.sql, in the same SQL Editor.
-- Upgrades `articles` into a block-based "Digital Library" (headings,
-- paragraphs, images, quotes, lists) and sets up image storage.
-- Safe to re-run.

-- ============================================================
-- 1. Article content becomes a list of typed blocks (jsonb),
--    plus an optional cover image. The old `content` text column
--    is kept for backward compatibility but no longer required.
-- ============================================================
alter table public.articles
  add column if not exists cover_image_url text,
  add column if not exists blocks jsonb not null default '[]'::jsonb;

alter table public.articles
  alter column content drop not null;

-- Example of a `blocks` value, for reference:
-- [
--   { "id": "1", "type": "heading",   "text": "Why structure beats signals" },
--   { "id": "2", "type": "paragraph", "text": "..." },
--   { "id": "3", "type": "image",     "url": "https://.../cover.jpg", "caption": "Weekly range" },
--   { "id": "4", "type": "quote",     "text": "..." },
--   { "id": "5", "type": "list",      "items": ["Point one", "Point two"] },
--   { "id": "6", "type": "divider" }
-- ]

-- ============================================================
-- 2. Storage bucket for article images
-- ============================================================
insert into storage.buckets (id, name, public)
values ('library-images', 'library-images', true)
on conflict (id) do nothing;

drop policy if exists "library images are publicly readable" on storage.objects;
create policy "library images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'library-images');

drop policy if exists "only admins can upload library images" on storage.objects;
create policy "only admins can upload library images"
  on storage.objects for insert
  with check (bucket_id = 'library-images' and public.is_admin());

drop policy if exists "only admins can update library images" on storage.objects;
create policy "only admins can update library images"
  on storage.objects for update
  using (bucket_id = 'library-images' and public.is_admin());

drop policy if exists "only admins can delete library images" on storage.objects;
create policy "only admins can delete library images"
  on storage.objects for delete
  using (bucket_id = 'library-images' and public.is_admin());
