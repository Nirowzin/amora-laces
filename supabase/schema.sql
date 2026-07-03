-- Enable extension for UUID generation
create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  slug text not null unique,
  name text not null,
  category text not null,
  material text not null,
  colors text[] not null default '{}',
  lengths text[] not null default '{}',
  price numeric(12,2) not null,
  promo_price numeric(12,2),
  short_description text not null,
  description text not null,
  specifications text[] not null default '{}',
  images text[] not null default '{}',
  videos text[] not null default '{}',
  is_new boolean not null default false,
  is_premium boolean not null default false,
  is_on_sale boolean not null default false,
  is_featured boolean not null default false,
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  whatsapp_number text not null,
  instagram_url text,
  logo_url text,
  hero_title text,
  hero_subtitle text,
  primary_color text default '#101010',
  accent_color text default '#c45b7a',
  gold_color text default '#d4a56b',
  updated_at timestamptz not null default now()
);

-- Row level security
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.site_settings enable row level security;

-- Public read policies for storefront
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  to anon, authenticated
  using (true);

drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "settings_public_read" on public.site_settings;
create policy "settings_public_read"
  on public.site_settings for select
  to anon, authenticated
  using (true);

-- Admin write policies (authenticated users)
drop policy if exists "products_auth_write" on public.products;
create policy "products_auth_write"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "categories_auth_write" on public.categories;
create policy "categories_auth_write"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "settings_auth_write" on public.site_settings;
create policy "settings_auth_write"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);
