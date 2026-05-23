-- supabase/schema.sql
create extension if not exists "uuid-ossp";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('customer','shop','admin')),
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table businesses (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references profiles(id) on delete set null,
  name text not null,
  logo text,
  bio text,
  lat double precision not null,
  lng double precision not null,
  sdg_focus text[] default '{}',
  is_hero boolean default false,
  awards text[] default '{}',
  approved boolean default false,
  created_at timestamptz default now()
);
create index on businesses (approved);
create index on businesses (owner_id);

create table contributions (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references businesses(id) on delete cascade,
  date date not null,
  description text not null,
  heart_points integer not null check (heart_points >= 0),
  created_at timestamptz default now()
);
create index on contributions (business_id);

create table favorites (
  user_id uuid not null references profiles(id) on delete cascade,
  business_id uuid not null references businesses(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, business_id)
);

create table applause (
  user_id uuid not null references profiles(id) on delete cascade,
  contribution_id uuid not null references contributions(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, contribution_id)
);

create table follows (
  user_id uuid not null references profiles(id) on delete cascade,
  business_id uuid not null references businesses(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, business_id)
);

create table testimonials (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  business_id uuid not null references businesses(id) on delete cascade,
  body text not null check (length(body) <= 500),
  created_at timestamptz default now()
);
create index on testimonials (business_id);

-- View: total Heart Points per business
create or replace view business_heart_points as
select b.id as business_id,
       coalesce(sum(c.heart_points), 0)::int as heart_points,
       count(c.id)::int as contribution_count
from businesses b
left join contributions c on c.business_id = b.id
group by b.id;
