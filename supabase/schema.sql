-- ============================================================
-- Makers Mill — Vendor Portal Database Schema
-- Run this in the Supabase SQL editor after creating your project.
-- ============================================================

-- ── Profiles (extends auth.users) ───────────────────────────
create table public.profiles (
  id      uuid references auth.users on delete cascade primary key,
  role    text not null default 'vendor' check (role in ('vendor', 'admin')),
  created_at timestamptz default now()
);

-- ── Vendors ─────────────────────────────────────────────────
create table public.vendors (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles(id) on delete cascade unique,
  slug          text unique not null,
  name          text not null,
  tagline       text,
  description   text,
  logo_url      text,
  banner_url    text,
  contact_email text,
  phone         text,
  website       text,
  instagram     text,
  status        text not null default 'pending'
                  check (status in ('pending', 'active', 'suspended')),
  featured      boolean default false,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Vendor Hours ─────────────────────────────────────────────
create table public.vendor_hours (
  id           uuid primary key default gen_random_uuid(),
  vendor_id    uuid references public.vendors(id) on delete cascade,
  day_of_week  integer not null check (day_of_week between 0 and 6),
  open_time    time,
  close_time   time,
  closed       boolean default false,
  unique(vendor_id, day_of_week)
);

-- ── Products ─────────────────────────────────────────────────
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  vendor_id   uuid references public.vendors(id) on delete cascade,
  name        text not null,
  description text,
  price       integer not null default 0,
  category    text,
  stock_qty   integer,
  status      text not null default 'draft'
                check (status in ('published', 'draft')),
  sort_order  integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Product Images ───────────────────────────────────────────
create table public.product_images (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid references public.products(id) on delete cascade,
  url         text not null,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

-- ── Vendor Applications ──────────────────────────────────────
create table public.vendor_applications (
  id               uuid primary key default gen_random_uuid(),
  business_name    text not null,
  applicant_email  text not null,
  applicant_name   text,
  phone            text,
  description      text,
  goods_type       text,
  submitted_at     timestamptz default now(),
  reviewed_at      timestamptz,
  reviewed_by      uuid references public.profiles(id),
  decision         text default 'pending'
                     check (decision in ('pending', 'approved', 'rejected')),
  rejection_reason text
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles           enable row level security;
alter table public.vendors            enable row level security;
alter table public.vendor_hours       enable row level security;
alter table public.products           enable row level security;
alter table public.product_images     enable row level security;
alter table public.vendor_applications enable row level security;

-- Security-definer function: reads caller's role without triggering RLS on profiles
-- (avoids infinite recursion when policies on other tables check this)
create or replace function public.get_my_role()
returns text as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer stable;

-- ── Profiles policies ────────────────────────────────────────
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.get_my_role() = 'admin');

-- ── Vendor policies ──────────────────────────────────────────
create policy "Public can view active vendors"
  on public.vendors for select
  using (status = 'active');

create policy "Vendors can view own record"
  on public.vendors for select
  using (user_id = auth.uid());

create policy "Vendors can update own record"
  on public.vendors for update
  using (user_id = auth.uid());

create policy "Vendors can insert own record"
  on public.vendors for insert
  with check (user_id = auth.uid());

create policy "Admins can do anything with vendors"
  on public.vendors for all
  using (public.get_my_role() = 'admin');

-- ── Vendor hours policies ────────────────────────────────────
create policy "Public can view vendor hours"
  on public.vendor_hours for select
  using (true);

create policy "Vendors can manage own hours"
  on public.vendor_hours for all
  using (exists (
    select 1 from public.vendors where id = vendor_id and user_id = auth.uid()
  ));

create policy "Admins can manage all hours"
  on public.vendor_hours for all
  using (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

-- ── Product policies ─────────────────────────────────────────
create policy "Public can view published products"
  on public.products for select
  using (
    status = 'published' and
    exists (select 1 from public.vendors where id = vendor_id and status = 'active')
  );

create policy "Vendors can manage own products"
  on public.products for all
  using (exists (
    select 1 from public.vendors where id = vendor_id and user_id = auth.uid()
  ));

create policy "Admins can manage all products"
  on public.products for all
  using (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

-- ── Product image policies ───────────────────────────────────
create policy "Public can view images of published products"
  on public.product_images for select
  using (exists (
    select 1 from public.products p
    join public.vendors v on v.id = p.vendor_id
    where p.id = product_id and p.status = 'published' and v.status = 'active'
  ));

create policy "Vendors can manage own product images"
  on public.product_images for all
  using (exists (
    select 1 from public.products p
    join public.vendors v on v.id = p.vendor_id
    where p.id = product_id and v.user_id = auth.uid()
  ));

create policy "Admins can manage all product images"
  on public.product_images for all
  using (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

-- ── Application policies ─────────────────────────────────────
create policy "Anyone can submit application"
  on public.vendor_applications for insert
  with check (true);

create policy "Admins can view all applications"
  on public.vendor_applications for select
  using (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

create policy "Admins can update applications"
  on public.vendor_applications for update
  using (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

-- ============================================================
-- Triggers
-- ============================================================

-- Auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'vendor')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at on vendors and products
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger vendors_updated_at
  before update on public.vendors
  for each row execute procedure public.handle_updated_at();

create trigger products_updated_at
  before update on public.products
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- Storage buckets (run after enabling Storage in Supabase dashboard)
-- ============================================================

-- insert into storage.buckets (id, name, public) values ('vendor-assets', 'vendor-assets', true);
-- insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);
