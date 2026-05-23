# Good Sh*t — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a one-day hackathon prototype of Good Sh*t — a Melbourne community-impact platform with Google Maps, 25 seeded businesses, three roles (customer/shop/admin), Heart Points scoring, and Supabase-backed auth + persistence.

**Architecture:** React + Vite + TypeScript + Tailwind SPA at the repo root. Supabase (Postgres + Auth + Storage + RLS) is the entire backend — no custom server code. Google Maps JS API renders the map; browser Geolocation drives the "Nearby" rail. All authorisation lives in RLS policies, not application code.

**Tech Stack:** React 18, Vite 5, TypeScript 5, Tailwind 3, React Router 6, `@supabase/supabase-js` v2, `@react-google-maps/api`, Vitest. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full design.

**Pragmatic note:** This is a 1-day prototype. TDD applies to pure logic (haversine, Heart Points totals, RLS validation). UI components are smoke-tested in the browser, not unit-tested. Frequent commits at the boundary of each task.

---

## File structure

After Task 0, the repo root looks like:

```
ARCHITECTURE.md            # design spec
CLAUDE.md                  # session guidance
IMPLEMENTATION.md          # this file
README.md
00_PROJECT_CONTEXT.md
SDG Awareness AU Combined (gmsmarketsignals.com).csv
index.html
package.json
tsconfig.json
vite.config.ts
tailwind.config.js
postcss.config.js
.env.local                 # gitignored, holds VITE_* secrets
.env.example               # committed template
.gitignore
supabase/
  schema.sql               # tables
  rls.sql                  # row-level security policies
  seed.sql                 # 25 Melbourne businesses + contributions
src/
  main.tsx
  App.tsx
  index.css                # tailwind base + custom tokens
  types.ts                 # shared TS types matching the schema
  lib/
    supabase.ts            # Supabase client singleton
    haversine.ts           # distance helper for "Nearby"
    haversine.test.ts
    format.ts              # Heart Points / date formatters
    glow.ts                # Melbourne SDG priority %s (static)
  hooks/
    useAuth.ts             # session + role
    useGeolocation.ts
  components/
    Layout.tsx             # nav + Outlet
    BusinessCard.tsx
    HeartPointsBadge.tsx
    ApplaudButton.tsx
    FavoriteButton.tsx
    FollowButton.tsx
    LoginPromptDialog.tsx
    SDGCallout.tsx
  pages/
    Map.tsx
    Profile.tsx
    Heroes.tsx
    Leaderboard.tsx
    Login.tsx              # customer
    Signup.tsx              # customer
    Favorites.tsx
    Feed.tsx               # following feed (stretch)
    shop/
      Login.tsx
      Signup.tsx           # apply-to-be-listed
      Dashboard.tsx
      ShopProfile.tsx
      Contributions.tsx
    Admin.tsx
```

Each file has one responsibility. Pages compose components; components consume hooks; hooks talk to `lib/supabase.ts`. RLS does authorisation.

---

## Task 0: Project scaffold

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `tailwind.config.js`, `postcss.config.js`, `.env.example`, `.env.local`, `.gitignore`, `src/main.tsx`, `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Scaffold Vite + React + TS at the repo root**

Run from `/Users/r.fu/Projects/claude-impact`:

```bash
npm create vite@5 -- --template react-ts .
```

If prompted that the directory is not empty, answer "Ignore files and continue". This produces `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, and `public/`.

- [ ] **Step 2: Install runtime + dev dependencies**

```bash
npm install react-router-dom @supabase/supabase-js @react-google-maps/api
npm install -D tailwindcss postcss autoprefixer vitest @types/node
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tailwind**

Replace `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        heart: {
          50: '#fff1f1',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

Replace `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { height: 100%; }
body { @apply bg-stone-50 text-stone-900 font-sans antialiased; }
```

- [ ] **Step 4: Add path alias `@/` → `src/`**

Edit `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

Edit `tsconfig.json` — add to `compilerOptions`:

```json
"baseUrl": ".",
"paths": { "@/*": ["src/*"] }
```

- [ ] **Step 5: Create `.env.example` and `.env.local`**

`.env.example` (committed):

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
VITE_GOOGLE_MAPS_API_KEY=YOUR-MAPS-KEY
```

`.env.local` (gitignored — leave keys empty until Task 1):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GOOGLE_MAPS_API_KEY=
```

Append to `.gitignore`:

```
.env.local
.env.*.local
```

- [ ] **Step 6: Replace `src/App.tsx` and `src/main.tsx` with empty shells**

`src/App.tsx`:

```tsx
export default function App() {
  return <div className="p-8 text-2xl">Good Sh*t — scaffold ready</div>;
}
```

`src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 7: Verify the scaffold runs**

```bash
npm run dev
```

Expected: Vite prints a local URL (e.g. `http://localhost:5173`). Open it. Page reads "Good Sh*t — scaffold ready". Stop the server (Ctrl-C).

- [ ] **Step 8: Add Vitest config and run it**

Append to `vite.config.ts` (inside `defineConfig`):

```ts
test: { environment: 'node' },
```

Add a `test` script to `package.json` scripts:

```json
"test": "vitest run"
```

Run `npm test`. Expected: "No test files found" — that's fine; we have no tests yet.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + TS + Tailwind"
```

---

## Task 1: Supabase backend (schema, RLS, seed)

**Files:**
- Create: `supabase/schema.sql`, `supabase/rls.sql`, `supabase/seed.sql`, `src/lib/supabase.ts`, `src/types.ts`

External: a fresh Supabase project (free tier).

- [ ] **Step 1: Create the Supabase project**

Go to [supabase.com/dashboard](https://supabase.com/dashboard) → "New project". Name: `good-shit`. Region: `Southeast Asia (Singapore)` (closest to AU). Note the project URL and anon key from Settings → API. Paste them into `.env.local`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJh...
```

- [ ] **Step 2: Write `supabase/schema.sql`**

```sql
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
```

Paste this into Supabase Dashboard → SQL Editor → Run.

- [ ] **Step 3: Write `supabase/rls.sql`**

```sql
-- supabase/rls.sql
alter table profiles      enable row level security;
alter table businesses    enable row level security;
alter table contributions enable row level security;
alter table favorites     enable row level security;
alter table applause      enable row level security;
alter table follows       enable row level security;
alter table testimonials  enable row level security;

-- helper: is current user an admin?
create or replace function public.is_admin() returns boolean
language sql stable security definer as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

-- profiles
create policy "profiles readable by anyone" on profiles for select using (true);
create policy "own profile update"          on profiles for update using (auth.uid() = id);
create policy "admin profile update"        on profiles for update using (public.is_admin());
create policy "self-insert profile"         on profiles for insert with check (auth.uid() = id);

-- businesses
create policy "approved businesses public"  on businesses for select using (approved or auth.uid() = owner_id or public.is_admin());
create policy "owner updates business"      on businesses for update using (auth.uid() = owner_id);
create policy "admin updates business"      on businesses for update using (public.is_admin());
create policy "admin inserts business"      on businesses for insert with check (public.is_admin());
create policy "shop signup business"        on businesses for insert with check (auth.uid() = owner_id);
create policy "admin deletes business"      on businesses for delete using (public.is_admin());

-- contributions
create policy "contributions public"        on contributions for select using (true);
create policy "owner manages contributions" on contributions for all
  using (exists (select 1 from businesses b where b.id = business_id and b.owner_id = auth.uid()))
  with check (exists (select 1 from businesses b where b.id = business_id and b.owner_id = auth.uid()));
create policy "admin manages contributions" on contributions for all using (public.is_admin()) with check (public.is_admin());

-- favorites / applause / follows: per-user own rows
create policy "own favorites"  on favorites  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own applause"   on applause   for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own follows"    on follows    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- testimonials
create policy "testimonials readable" on testimonials for select using (true);
create policy "auth insert testimonial" on testimonials for insert with check (auth.uid() = user_id);
create policy "author or admin deletes" on testimonials for delete using (auth.uid() = user_id or public.is_admin());
```

Paste into SQL Editor → Run.

- [ ] **Step 4: Write `supabase/seed.sql` (25 real Melbourne businesses)**

Researcher's note: use real Melbourne businesses known for community / social-enterprise work. Pre-approved on seed. Contribution counts fabricated.

```sql
-- supabase/seed.sql
-- 25 Melbourne businesses spread across the CoM LGA.
-- Logos are simple text-mark placeholders; replace with real assets later.
-- Lat/lngs are approximate to public addresses.

insert into businesses (id, name, logo, bio, lat, lng, sdg_focus, is_hero, awards, approved) values
('11111111-1111-1111-1111-111111111101', 'STREAT', '/logos/streat.svg',           'Hospitality social enterprise training disadvantaged young Melburnians.', -37.8085, 144.9633, '{No poverty,Decent work and economic growth,Reduced inequalities}', true,  '{B-Corp,Telstra Business Award}', true),
('11111111-1111-1111-1111-111111111102', 'Lentil as Anything', '/logos/lentil.svg', 'Pay-as-you-feel restaurant supporting food security and refugee employment.', -37.7986, 144.9789, '{Zero hunger,Reduced inequalities}', true,  '{Victorian Multicultural Award}', true),
('11111111-1111-1111-1111-111111111103', 'Kinfolk Cafe', '/logos/kinfolk.svg',     'Volunteer-run cafe; 100% of profits to four charity partners.', -37.8136, 144.9583, '{No poverty,Good health}', true,  '{The Age Good Food Guide}', true),
('11111111-1111-1111-1111-111111111104', 'The Social Studio', '/logos/social-studio.svg', 'Fashion school + manufacturer employing people from refugee backgrounds.', -37.8067, 144.9886, '{Decent work and economic growth,Reduced inequalities,Responsible consumption and production}', true,  '{Australian Fashion Laureate}', true),
('11111111-1111-1111-1111-111111111105', 'Long Street Coffee', '/logos/long-st.svg', 'Cafe employing and training new arrivals to Australia.', -37.7920, 144.9690, '{Decent work and economic growth,Reduced inequalities}', false, '{}', true),
('11111111-1111-1111-1111-111111111106', 'Free to Feed', '/logos/free-to-feed.svg', 'Cooking experiences led by refugees and people seeking asylum.', -37.7977, 144.9858, '{Reduced inequalities,Decent work and economic growth}', false, '{}', true),
('11111111-1111-1111-1111-111111111107', 'Patagonia Melbourne', '/logos/patagonia.svg', 'Outdoor brand donating 1% for the planet; runs local repair days.', -37.8158, 144.9659, '{Climate action,Responsible consumption and production}', false, '{B-Corp}', true),
('11111111-1111-1111-1111-111111111108', 'Aesop Collins Street', '/logos/aesop.svg', 'Skincare brand investing in community arts and literary programs.', -37.8166, 144.9686, '{Quality education,Sustainable cities and communities}', false, '{B-Corp}', true),
('11111111-1111-1111-1111-111111111109', 'KeepCup', '/logos/keepcup.svg',            'Reusable cup pioneer; offsets and donates a slice of every sale.', -37.8074, 144.9869, '{Responsible consumption and production,Climate action}', false, '{B-Corp}', true),
('11111111-1111-1111-1111-111111111110', 'Who Gives A Crap', '/logos/wgac.svg',     '50% of profits to clean water and sanitation projects.', -37.8004, 144.9947, '{Clean water and sanitation,Good health}', true,  '{B-Corp}', true),
('11111111-1111-1111-1111-111111111111', 'Brotherhood Books', '/logos/brotherhood.svg', 'Online bookshop funding the Brotherhood of St Laurence anti-poverty programs.', -37.7837, 144.9700, '{No poverty,Quality education}', false, '{}', true),
('11111111-1111-1111-1111-111111111112', 'Sacred Heart Mission Op Shop', '/logos/shm.svg', 'Retail proceeds fund crisis support and homelessness services.', -37.8623, 144.9870, '{No poverty,Sustainable cities and communities}', false, '{}', true),
('11111111-1111-1111-1111-111111111113', 'Friends of the Earth Food Co-op', '/logos/foe.svg', 'Bulk-foods co-op; reduces packaging and supports ethical producers.', -37.7984, 144.9710, '{Responsible consumption and production,Zero hunger}', false, '{}', true),
('11111111-1111-1111-1111-111111111114', 'Outland Denim Melbourne', '/logos/outland.svg', 'Ethical denim; employs survivors of human trafficking.', -37.8146, 144.9700, '{Decent work and economic growth,Gender equality}', false, '{B-Corp}', true),
('11111111-1111-1111-1111-111111111115', 'The Big Issue Vendor (CBD)', '/logos/bigissue.svg', 'Magazine sold by people experiencing homelessness; vendors keep half the cover price.', -37.8136, 144.9631, '{No poverty,Decent work and economic growth}', true,  '{Order of Australia (organisation)}', true),
('11111111-1111-1111-1111-111111111116', 'Carlton Neighbourhood Learning Centre', '/logos/cnlc.svg', 'Adult learning + community programs for migrants and seniors.', -37.8030, 144.9657, '{Quality education,Reduced inequalities}', false, '{}', true),
('11111111-1111-1111-1111-111111111117', 'Cathedral Coffee', '/logos/cathedral.svg', 'CBD cafe routing profits to homelessness outreach.', -37.8156, 144.9678, '{No poverty,Good health}', false, '{}', true),
('11111111-1111-1111-1111-111111111118', 'Etiko Footwear', '/logos/etiko.svg',      'Fair-trade, vegan footwear; B-Corp; carbon-neutral.', -37.7990, 144.9670, '{Decent work and economic growth,Climate action,Responsible consumption and production}', false, '{B-Corp,Fairtrade}', true),
('11111111-1111-1111-1111-111111111119', 'Hairspace', '/logos/hairspace.svg',       'Salon offering free cuts for people experiencing homelessness monthly.', -37.7951, 144.9712, '{No poverty,Good health}', false, '{}', true),
('11111111-1111-1111-1111-111111111120', 'Good Cycles', '/logos/goodcycles.svg',    'Bike shop / social enterprise; employment pathways for at-risk youth.', -37.8210, 144.9530, '{Decent work and economic growth,Sustainable cities and communities}', false, '{}', true),
('11111111-1111-1111-1111-111111111121', 'Slow Beer Co.', '/logos/slowbeer.svg',    'Carbon-neutral brewery donating to Melbourne waterways restoration.', -37.7945, 144.9620, '{Climate action,Life below water}', false, '{}', true),
('11111111-1111-1111-1111-111111111122', 'Replate Cafe', '/logos/replate.svg',      'Surplus-food cafe partnering with OzHarvest.', -37.8120, 144.9710, '{Zero hunger,Responsible consumption and production}', false, '{}', true),
('11111111-1111-1111-1111-111111111123', 'Working Heritage Bookshop', '/logos/wh.svg', 'Proceeds fund heritage-building restoration around Melbourne.', -37.8132, 144.9665, '{Sustainable cities and communities}', false, '{}', true),
('11111111-1111-1111-1111-111111111124', 'Bowery to Williamstown', '/logos/bowery.svg', 'Coastal cafe donating 5% of sales to local marine cleanup.', -37.8650, 144.9000, '{Life below water,Climate action}', false, '{}', true),
('11111111-1111-1111-1111-111111111125', 'Melbourne Period Project', '/logos/mpp.svg', 'Distributes free period products through cafes and community centres.', -37.8060, 144.9620, '{Gender equality,Good health,Reduced inequalities}', false, '{}', true);

-- contributions: 3-8 per business, fabricated but plausible
insert into contributions (business_id, date, description, heart_points) values
  -- STREAT
  ('11111111-1111-1111-1111-111111111101', '2026-04-12', 'Trained 12 young people through hospitality programme', 120),
  ('11111111-1111-1111-1111-111111111101', '2026-03-02', '$8,400 raised at Open Day toward youth scholarships',  84),
  ('11111111-1111-1111-1111-111111111101', '2026-02-14', 'Provided 200 free meals to community partners',         40),
  -- Lentil as Anything
  ('11111111-1111-1111-1111-111111111102', '2026-04-30', 'Served 1,400 pay-as-you-feel meals this month',         140),
  ('11111111-1111-1111-1111-111111111102', '2026-03-15', 'Hosted refugee employment forum',                       30),
  ('11111111-1111-1111-1111-111111111102', '2026-01-09', 'Donated kitchen time for a homelessness charity dinner',45),
  -- Kinfolk
  ('11111111-1111-1111-1111-111111111103', '2026-04-22', '$6,200 donated to four charity partners',                62),
  ('11111111-1111-1111-1111-111111111103', '2026-02-20', 'Hosted 38 volunteer shifts',                             38),
  -- Social Studio
  ('11111111-1111-1111-1111-111111111104', '2026-04-18', 'Manufactured 600 garments locally, all ethical labour', 90),
  ('11111111-1111-1111-1111-111111111104', '2026-03-08', 'Free fashion workshop for new arrivals',                25),
  -- Long Street Coffee
  ('11111111-1111-1111-1111-111111111105', '2026-04-10', '4 trainees graduated barista program',                  40),
  ('11111111-1111-1111-1111-111111111105', '2026-02-28', 'Free coffee day for community workers',                 12),
  -- Free to Feed
  ('11111111-1111-1111-1111-111111111106', '2026-04-25', '12 cooking experiences led by refugee chefs',            60),
  -- Patagonia
  ('11111111-1111-1111-1111-111111111107', '2026-04-15', 'Repair day diverted 80 jackets from landfill',           48),
  ('11111111-1111-1111-1111-111111111107', '2026-03-22', '$3,500 donated to Yarra Riverkeeper',                   35),
  -- Aesop
  ('11111111-1111-1111-1111-111111111108', '2026-04-08', 'Sponsored Wheeler Centre literary programme',           50),
  -- KeepCup
  ('11111111-1111-1111-1111-111111111109', '2026-04-20', 'Estimated 1.2M disposable cups avoided via sales',     120),
  -- Who Gives A Crap
  ('11111111-1111-1111-1111-111111111110', '2026-04-28', '$220,000 globally to clean water (April share)',       200),
  ('11111111-1111-1111-1111-111111111110', '2026-03-30', 'Carbon-neutral certification renewed',                  40),
  ('11111111-1111-1111-1111-111111111110', '2026-02-14', 'Sponsored World Water Day event in Melbourne',          30),
  -- Brotherhood Books
  ('11111111-1111-1111-1111-111111111111', '2026-04-19', '$4,100 raised for BSL anti-poverty programs',           41),
  -- Sacred Heart Op Shop
  ('11111111-1111-1111-1111-111111111112', '2026-04-26', '8,500 garments rehomed; revenue to crisis support',     85),
  -- FoE Co-op
  ('11111111-1111-1111-1111-111111111113', '2026-04-21', 'Avoided ~430kg of packaging via bulk sales',            43),
  -- Outland Denim
  ('11111111-1111-1111-1111-111111111114', '2026-04-14', '6 graduates of trafficking-survivor employment program',60),
  -- Big Issue
  ('11111111-1111-1111-1111-111111111115', '2026-04-30', '$18,200 paid to CBD vendors this month',                182),
  ('11111111-1111-1111-1111-111111111115', '2026-03-31', '$16,800 paid to CBD vendors',                           168),
  -- Carlton NLC
  ('11111111-1111-1111-1111-111111111116', '2026-04-15', '34 migrants attended free English classes',             34),
  -- Cathedral Coffee
  ('11111111-1111-1111-1111-111111111117', '2026-04-22', '$2,400 routed to homelessness outreach',                24),
  -- Etiko
  ('11111111-1111-1111-1111-111111111118', '2026-04-17', '900 fair-trade pairs sold this month',                  45),
  -- Hairspace
  ('11111111-1111-1111-1111-111111111119', '2026-04-05', 'Free cuts day: 28 people served',                       28),
  -- Good Cycles
  ('11111111-1111-1111-1111-111111111120', '2026-04-13', '5 at-risk youth started bike-mechanic traineeships',    50),
  -- Slow Beer Co.
  ('11111111-1111-1111-1111-111111111121', '2026-04-23', '$1,800 donated to Yarra waterway restoration',          18),
  -- Replate
  ('11111111-1111-1111-1111-111111111122', '2026-04-29', 'Rescued 320kg of surplus produce',                      32),
  -- Working Heritage
  ('11111111-1111-1111-1111-111111111123', '2026-04-11', '$3,000 to Royal Arcade restoration fund',               30),
  -- Bowery
  ('11111111-1111-1111-1111-111111111124', '2026-04-27', '12 volunteers, 80kg of beach litter removed',           24),
  -- Melbourne Period Project
  ('11111111-1111-1111-1111-111111111125', '2026-04-24', '3,200 period products distributed to 18 sites',         64);
```

Paste into SQL Editor → Run.

- [ ] **Step 5: Write `src/types.ts`**

```ts
export type Role = 'customer' | 'shop' | 'admin';

export type Profile = {
  id: string;
  role: Role;
  display_name: string | null;
  avatar_url: string | null;
};

export type Business = {
  id: string;
  owner_id: string | null;
  name: string;
  logo: string | null;
  bio: string | null;
  lat: number;
  lng: number;
  sdg_focus: string[];
  is_hero: boolean;
  awards: string[];
  approved: boolean;
};

export type Contribution = {
  id: string;
  business_id: string;
  date: string;
  description: string;
  heart_points: number;
};

export type BusinessWithPoints = Business & {
  heart_points: number;
  contribution_count: number;
};
```

- [ ] **Step 6: Write `src/lib/supabase.ts`**

```ts
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!url || !anon) throw new Error('Supabase env vars missing');

export const supabase = createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true },
});
```

- [ ] **Step 7: Smoke-test the Supabase connection**

Add to `src/App.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function App() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    supabase.from('businesses').select('id', { count: 'exact', head: true })
      .then(({ count }) => setCount(count ?? 0));
  }, []);
  return <div className="p-8 text-2xl">Businesses seeded: {count ?? '...'}</div>;
}
```

Run `npm run dev`. Expected: page shows "Businesses seeded: 25". Stop the server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: supabase schema, RLS, seed of 25 Melbourne businesses"
```

---

## Task 2: Pure-logic utilities (TDD)

**Files:**
- Create: `src/lib/haversine.ts`, `src/lib/haversine.test.ts`, `src/lib/format.ts`, `src/lib/glow.ts`

- [ ] **Step 1: Write the failing haversine test**

`src/lib/haversine.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { haversineKm } from './haversine';

describe('haversineKm', () => {
  it('returns 0 for the same point', () => {
    expect(haversineKm(-37.8136, 144.9631, -37.8136, 144.9631)).toBeCloseTo(0, 3);
  });
  it('matches a known Melbourne distance (CBD → Williamstown ~8km)', () => {
    const d = haversineKm(-37.8136, 144.9631, -37.8650, 144.9000);
    expect(d).toBeGreaterThan(7);
    expect(d).toBeLessThan(9);
  });
  it('is symmetric', () => {
    const a = haversineKm(-37.81, 144.96, -37.79, 144.97);
    const b = haversineKm(-37.79, 144.97, -37.81, 144.96);
    expect(a).toBeCloseTo(b, 6);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL, "Cannot find module './haversine'".

- [ ] **Step 3: Write `src/lib/haversine.ts`**

```ts
const R_KM = 6371;
const toRad = (d: number) => (d * Math.PI) / 180;

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R_KM * Math.asin(Math.sqrt(a));
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: 3 tests pass.

- [ ] **Step 5: Write `src/lib/format.ts`**

```ts
export function formatHeartPoints(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}
```

- [ ] **Step 6: Write `src/lib/glow.ts` (Melbourne SDG priority %s from `00_PROJECT_CONTEXT.md`)**

```ts
// Melbourne SDG priority rankings (% in personal top 3, n=2,492). Source: Glow / Global Market Signals.
// See 00_PROJECT_CONTEXT.md.
export const MELBOURNE_SDG_PRIORITY: Record<string, number> = {
  'Good health': 29.8,
  'No poverty': 29.8,
  'Clean water and sanitation': 29.5,
  'Zero hunger': 26.4,
  'Climate action': 22.2,
  'Affordable and clean energy': 22.1,
  'Quality education': 18.1,
  'Peace, justice and strong institutions': 17.5,
  'Decent work and economic growth': 14.6,
  'Gender equality': 11.9,
  'Sustainable cities and communities': 11.4,
  'Life below water': 9.8,
  'Life on land': 9.7,
  'Responsible consumption and production': 8.1,
  'Reduced inequalities': 7.2,
  'Industry, innovation, and infrastructure': 5.6,
  'Partnerships for the goals': 2.7,
};

export const MELBOURNE_SDG_AWARENESS_PCT = 29.1;       // % aware of SDGs
export const MELBOURNE_BRAND_SWITCH_PCT  = 18.4;       // % switched brand in last 3 months
export const MELBOURNE_N = 2492;
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: haversine + Heart Points + date formatters + Glow constants"
```

---

## Task 3: Layout, routing, auth hook

**Files:**
- Create: `src/hooks/useAuth.ts`, `src/components/Layout.tsx`, page stubs for every route
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/hooks/useAuth.ts`**

```ts
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setProfile(null); return; }
    supabase.from('profiles').select('*').eq('id', session.user.id).single()
      .then(({ data }) => setProfile((data as Profile) ?? null));
  }, [session?.user.id]);

  return { session, profile, loading };
}
```

- [ ] **Step 2: Create page stubs**

For each path below, create a file exporting a default React component that returns `<div className="p-8">PAGE_NAME</div>`.

```
src/pages/Map.tsx
src/pages/Profile.tsx
src/pages/Heroes.tsx
src/pages/Leaderboard.tsx
src/pages/Login.tsx
src/pages/Signup.tsx
src/pages/Favorites.tsx
src/pages/shop/Login.tsx
src/pages/shop/Signup.tsx
src/pages/shop/Dashboard.tsx
src/pages/shop/ShopProfile.tsx
src/pages/shop/Contributions.tsx
src/pages/Admin.tsx
```

Example (`src/pages/Map.tsx`):

```tsx
export default function MapPage() {
  return <div className="p-8 text-2xl">Map</div>;
}
```

(Vary the label per page.)

- [ ] **Step 3: Create `src/components/Layout.tsx`**

```tsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

export default function Layout() {
  const { session, profile } = useAuth();
  const loc = useLocation();
  const navLink = (to: string, label: string) => (
    <Link to={to}
      className={`px-3 py-1 rounded-md text-sm ${loc.pathname === to ? 'bg-heart-500 text-white' : 'hover:bg-stone-200'}`}>
      {label}
    </Link>
  );
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b bg-white">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link to="/" className="font-bold text-xl text-heart-600 mr-4">Good Sh*t</Link>
          {navLink('/', 'Map')}
          {navLink('/heroes', 'Heroes')}
          {navLink('/leaderboard', 'Leaderboard')}
          <div className="ml-auto flex items-center gap-2">
            {session ? (
              <>
                <span className="text-sm text-stone-600">{profile?.display_name ?? session.user.email}</span>
                {profile?.role === 'shop' && navLink('/shop/dashboard', 'My shop')}
                {profile?.role === 'admin' && navLink('/admin', 'Admin')}
                <button onClick={() => supabase.auth.signOut()} className="text-sm text-stone-600 hover:underline">Sign out</button>
              </>
            ) : (
              <>
                {navLink('/login', 'Customer login')}
                {navLink('/shop/login', 'Shop login')}
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-1"><Outlet /></main>
    </div>
  );
}
```

- [ ] **Step 4: Replace `src/App.tsx` with the full router**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import MapPage from '@/pages/Map';
import Profile from '@/pages/Profile';
import Heroes from '@/pages/Heroes';
import Leaderboard from '@/pages/Leaderboard';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Favorites from '@/pages/Favorites';
import ShopLogin from '@/pages/shop/Login';
import ShopSignup from '@/pages/shop/Signup';
import ShopDashboard from '@/pages/shop/Dashboard';
import ShopProfile from '@/pages/shop/ShopProfile';
import ShopContributions from '@/pages/shop/Contributions';
import Admin from '@/pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MapPage />} />
          <Route path="/heroes" element={<Heroes />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/business/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/me/favorites" element={<Favorites />} />
          <Route path="/shop/login" element={<ShopLogin />} />
          <Route path="/shop/signup" element={<ShopSignup />} />
          <Route path="/shop/dashboard" element={<ShopDashboard />} />
          <Route path="/shop/profile" element={<ShopProfile />} />
          <Route path="/shop/contributions" element={<ShopContributions />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 5: Smoke-test the routes**

`npm run dev`. Click "Map", "Heroes", "Leaderboard" in the nav. Each page renders its label. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: layout, router, auth hook, page stubs"
```

---

## Task 4: Map page (Google Maps + Geolocation + Nearby rail)

**Files:**
- Create: `src/hooks/useGeolocation.ts`, `src/components/BusinessCard.tsx`, `src/components/HeartPointsBadge.tsx`
- Modify: `src/pages/Map.tsx`

External: a Google Maps API key with the Maps JavaScript API enabled and HTTP referrer restricted to your dev host. Paste into `.env.local` as `VITE_GOOGLE_MAPS_API_KEY`.

- [ ] **Step 1: Create `src/hooks/useGeolocation.ts`**

```ts
import { useEffect, useState } from 'react';

export type Coords = { lat: number; lng: number };

export function useGeolocation(): { coords: Coords | null; denied: boolean } {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) { setDenied(true); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setDenied(true),
      { timeout: 8000 },
    );
  }, []);

  return { coords, denied };
}
```

- [ ] **Step 2: Create `src/components/HeartPointsBadge.tsx`**

```tsx
import { formatHeartPoints } from '@/lib/format';

export default function HeartPointsBadge({ points }: { points: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-heart-50 text-heart-600 px-2 py-0.5 text-sm font-medium">
      <span aria-hidden>♥</span> {formatHeartPoints(points)}
    </span>
  );
}
```

- [ ] **Step 3: Create `src/components/BusinessCard.tsx`**

```tsx
import { Link } from 'react-router-dom';
import type { BusinessWithPoints } from '@/types';
import HeartPointsBadge from './HeartPointsBadge';

export default function BusinessCard({ b, distanceKm }: { b: BusinessWithPoints; distanceKm?: number }) {
  return (
    <Link to={`/business/${b.id}`} className="block bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-600">
          {b.name.slice(0, 1)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{b.name}</div>
          <div className="flex gap-2 mt-1">
            <HeartPointsBadge points={b.heart_points} />
            {distanceKm !== undefined && (
              <span className="text-xs text-stone-500 self-center">{distanceKm.toFixed(1)} km</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Rewrite `src/pages/Map.tsx` with the Google Map + Nearby rail**

```tsx
import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { supabase } from '@/lib/supabase';
import { useGeolocation } from '@/hooks/useGeolocation';
import { haversineKm } from '@/lib/haversine';
import BusinessCard from '@/components/BusinessCard';
import type { BusinessWithPoints } from '@/types';

const MELBOURNE_CBD = { lat: -37.8136, lng: 144.9631 };
const mapKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapPage() {
  const [businesses, setBusinesses] = useState<BusinessWithPoints[]>([]);
  const [selected, setSelected] = useState<BusinessWithPoints | null>(null);
  const { coords, denied } = useGeolocation();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('businesses')
        .select('*, business_heart_points!inner(heart_points, contribution_count)')
        .eq('approved', true);
      if (!data) return;
      setBusinesses(
        data.map((row: any) => ({
          ...row,
          heart_points: row.business_heart_points.heart_points,
          contribution_count: row.business_heart_points.contribution_count,
        })),
      );
    })();
  }, []);

  const centre = coords ?? MELBOURNE_CBD;
  const nearby = useMemo(() => {
    if (!coords) return [];
    return businesses
      .map((b) => ({ b, d: haversineKm(coords.lat, coords.lng, b.lat, b.lng) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 5);
  }, [coords, businesses]);

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-[2fr_1fr] gap-4">
      <div className="h-[70vh] rounded-xl overflow-hidden shadow">
        <LoadScript googleMapsApiKey={mapKey}>
          <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={centre} zoom={13}>
            {coords && (
              <Marker position={coords} icon={{ path: google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: '#2563eb', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2 }} />
            )}
            {businesses.map((b) => (
              <Marker key={b.id} position={{ lat: b.lat, lng: b.lng }} onClick={() => setSelected(b)} />
            ))}
            {selected && (
              <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
                <div style={{ maxWidth: 220 }}>
                  <strong>{selected.name}</strong>
                  <div>♥ {selected.heart_points}</div>
                  <a href={`/business/${selected.id}`}>View profile →</a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      <aside>
        <h2 className="font-semibold mb-2">{coords ? 'Nearby' : denied ? 'All businesses' : 'Locating...'}</h2>
        <div className="space-y-2">
          {(coords ? nearby.map((n) => ({ b: n.b, d: n.d })) : businesses.slice(0, 10).map((b) => ({ b, d: undefined as number | undefined })))
            .map(({ b, d }) => (
              <BusinessCard key={b.id} b={b} distanceKm={d} />
            ))}
        </div>
      </aside>
    </div>
  );
}
```

- [ ] **Step 5: Smoke-test the map**

`npm run dev`. Browser prompts for location. Allow it: the map centres on you, the user pin shows in blue, 25 business pins appear, the "Nearby" sidebar lists the 5 closest. Click a pin → InfoWindow with name, Heart Points, "View profile" link. Deny location: sidebar shows "All businesses" and lists first 10. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Map page with Google Maps + geolocation + Nearby rail"
```

---

## Task 5: Business Profile page

**Files:**
- Create: `src/components/SDGCallout.tsx`
- Modify: `src/pages/Profile.tsx`

- [ ] **Step 1: Create `src/components/SDGCallout.tsx`**

```tsx
import { MELBOURNE_SDG_PRIORITY, MELBOURNE_N } from '@/lib/glow';

export default function SDGCallout({ sdg }: { sdg: string }) {
  const pct = MELBOURNE_SDG_PRIORITY[sdg];
  if (pct === undefined) return null;
  return (
    <div className="rounded-lg border-l-4 border-heart-500 bg-heart-50 p-3 text-sm">
      <strong>{pct}%</strong> of Melburnians rank <em>{sdg}</em> in their top 3 SDG priorities.
      <div className="text-xs text-stone-500 mt-1">Source: Glow / GMS, n={MELBOURNE_N.toLocaleString()}</div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/pages/Profile.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Business, Contribution } from '@/types';
import HeartPointsBadge from '@/components/HeartPointsBadge';
import SDGCallout from '@/components/SDGCallout';
import { formatDate } from '@/lib/format';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [contribs, setContribs] = useState<Contribution[]>([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (!id) return;
    supabase.from('businesses').select('*').eq('id', id).single()
      .then(({ data }) => setBusiness(data as Business | null));
    supabase.from('contributions').select('*').eq('business_id', id).order('date', { ascending: false })
      .then(({ data }) => {
        setContribs((data as Contribution[]) ?? []);
        setPoints((data ?? []).reduce((s, c: any) => s + c.heart_points, 0));
      });
  }, [id]);

  if (!business) return <div className="p-8">Loading…</div>;
  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-[2fr_1fr] gap-6">
      <article>
        <header className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center text-3xl font-bold text-stone-600">
            {business.name.slice(0, 1)}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <div className="mt-1"><HeartPointsBadge points={points} /></div>
          </div>
        </header>
        <p className="text-stone-700 mb-6">{business.bio}</p>
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm"><div className="text-2xl font-bold">{points}</div><div className="text-xs text-stone-500">Heart Points</div></div>
          <div className="bg-white rounded-lg p-3 shadow-sm"><div className="text-2xl font-bold">{contribs.length}</div><div className="text-xs text-stone-500">Contributions</div></div>
          <div className="bg-white rounded-lg p-3 shadow-sm"><div className="text-2xl font-bold">{business.sdg_focus[0] ?? '—'}</div><div className="text-xs text-stone-500">Top SDG focus</div></div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Contributions</h2>
        <ol className="space-y-2">
          {contribs.map((c) => (
            <li key={c.id} className="bg-white rounded-lg p-3 shadow-sm flex justify-between items-start">
              <div>
                <div className="text-sm text-stone-500">{formatDate(c.date)}</div>
                <div>{c.description}</div>
              </div>
              <HeartPointsBadge points={c.heart_points} />
            </li>
          ))}
        </ol>
      </article>
      <aside className="space-y-3">
        <h3 className="font-semibold">Why this matters in Melbourne</h3>
        {business.sdg_focus.map((sdg) => <SDGCallout key={sdg} sdg={sdg} />)}
      </aside>
    </div>
  );
}
```

- [ ] **Step 3: Smoke-test the profile**

`npm run dev`. Click a pin on the map → "View profile". Page shows banner, total Heart Points, stat strip, contributions feed, and SDG callouts citing the Glow %. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Business Profile page with Glow SDG callouts"
```

---

## Task 6: Heroes + Leaderboard pages

**Files:**
- Modify: `src/pages/Heroes.tsx`, `src/pages/Leaderboard.tsx`

- [ ] **Step 1: Rewrite `src/pages/Heroes.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Business } from '@/types';

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<Business[]>([]);
  useEffect(() => {
    supabase.from('businesses').select('*').eq('approved', true).eq('is_hero', true)
      .then(({ data }) => setHeroes((data as Business[]) ?? []));
  }, []);
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-1">Heroes</h1>
      <p className="text-stone-600 mb-6">Award-winning Melbourne businesses driving real community impact.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes.map((b) => (
          <Link key={b.id} to={`/business/${b.id}`} className="block bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
            <div className="w-12 h-12 bg-heart-50 text-heart-600 rounded-full flex items-center justify-center font-bold mb-3">{b.name.slice(0,1)}</div>
            <h2 className="font-semibold text-lg">{b.name}</h2>
            <p className="text-sm text-stone-600 mt-1 line-clamp-2">{b.bio}</p>
            <div className="text-xs text-stone-500 mt-2">{b.awards.join(' · ')}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/pages/Leaderboard.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import HeartPointsBadge from '@/components/HeartPointsBadge';
import type { BusinessWithPoints } from '@/types';

export default function LeaderboardPage() {
  const [top, setTop] = useState<BusinessWithPoints[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('businesses')
        .select('*, business_heart_points!inner(heart_points, contribution_count)')
        .eq('approved', true);
      if (!data) return;
      const rows: BusinessWithPoints[] = data.map((r: any) => ({
        ...r,
        heart_points: r.business_heart_points.heart_points,
        contribution_count: r.business_heart_points.contribution_count,
      }));
      rows.sort((a, b) => b.heart_points - a.heart_points);
      setTop(rows.slice(0, 10));
    })();
  }, []);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-1">Leaderboard</h1>
      <p className="text-stone-600 mb-6">Top 10 by Heart Points.</p>
      <ol className="space-y-2">
        {top.map((b, i) => (
          <li key={b.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
            <div className="text-2xl font-bold w-8 text-stone-400">{i + 1}</div>
            <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-600">{b.name.slice(0,1)}</div>
            <Link to={`/business/${b.id}`} className="flex-1 font-semibold hover:underline">{b.name}</Link>
            <HeartPointsBadge points={b.heart_points} />
          </li>
        ))}
      </ol>
    </div>
  );
}
```

- [ ] **Step 3: Smoke-test**

`npm run dev`. Visit `/heroes` — grid of 5-7 hero businesses. Visit `/leaderboard` — top 10 sorted by Heart Points. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Heroes and Leaderboard pages"
```

---

## Task 7: Customer auth + Favorite + Applaud

**Files:**
- Create: `src/components/LoginPromptDialog.tsx`, `src/components/FavoriteButton.tsx`, `src/components/ApplaudButton.tsx`
- Modify: `src/pages/Login.tsx`, `src/pages/Signup.tsx`, `src/pages/Favorites.tsx`, `src/pages/Profile.tsx`

- [ ] **Step 1: Implement `src/pages/Signup.tsx` (customer)**

```tsx
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setErr(error.message);
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, role: 'customer', display_name: name });
      nav('/');
    }
  }
  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Sign up</h1>
      <input className="w-full border rounded p-2" placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button className="w-full bg-heart-500 text-white rounded p-2 font-semibold">Create account</button>
    </form>
  );
}
```

- [ ] **Step 2: Implement `src/pages/Login.tsx` (customer)**

```tsx
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setErr(error.message);
    nav('/');
  }
  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Customer login</h1>
      <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button className="w-full bg-heart-500 text-white rounded p-2 font-semibold">Sign in</button>
      <div className="text-sm text-stone-600">No account? <Link to="/signup" className="underline">Sign up</Link></div>
      <div className="text-sm text-stone-600">Running a shop? <Link to="/shop/login" className="underline">Shop login</Link></div>
    </form>
  );
}
```

- [ ] **Step 3: Create `src/components/LoginPromptDialog.tsx`**

```tsx
import { Link } from 'react-router-dom';

export default function LoginPromptDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-2">Sign in to continue</h2>
        <p className="text-sm text-stone-600 mb-4">Save favourites, applaud contributions, and follow businesses you care about.</p>
        <div className="flex gap-2">
          <Link to="/login" className="flex-1 bg-heart-500 text-white rounded p-2 text-center font-semibold">Sign in</Link>
          <Link to="/signup" className="flex-1 border rounded p-2 text-center font-semibold">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/FavoriteButton.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import LoginPromptDialog from './LoginPromptDialog';

export default function FavoriteButton({ businessId }: { businessId: string }) {
  const { session } = useAuth();
  const [on, setOn] = useState(false);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    if (!session) { setOn(false); return; }
    supabase.from('favorites').select('user_id').eq('user_id', session.user.id).eq('business_id', businessId).maybeSingle()
      .then(({ data }) => setOn(!!data));
  }, [session?.user.id, businessId]);

  async function toggle() {
    if (!session) { setPrompt(true); return; }
    if (on) {
      await supabase.from('favorites').delete().eq('user_id', session.user.id).eq('business_id', businessId);
      setOn(false);
    } else {
      await supabase.from('favorites').insert({ user_id: session.user.id, business_id: businessId });
      setOn(true);
    }
  }
  return (
    <>
      <button onClick={toggle} className={`rounded-full px-3 py-1 text-sm border ${on ? 'bg-heart-500 text-white border-heart-500' : 'bg-white hover:bg-stone-100'}`}>
        {on ? '★ Favourited' : '☆ Favourite'}
      </button>
      {prompt && <LoginPromptDialog onClose={() => setPrompt(false)} />}
    </>
  );
}
```

- [ ] **Step 5: Create `src/components/ApplaudButton.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import LoginPromptDialog from './LoginPromptDialog';

export default function ApplaudButton({ contributionId }: { contributionId: string }) {
  const { session } = useAuth();
  const [on, setOn] = useState(false);
  const [count, setCount] = useState(0);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    supabase.from('applause').select('user_id', { count: 'exact', head: true }).eq('contribution_id', contributionId)
      .then(({ count }) => setCount(count ?? 0));
    if (!session) { setOn(false); return; }
    supabase.from('applause').select('user_id').eq('user_id', session.user.id).eq('contribution_id', contributionId).maybeSingle()
      .then(({ data }) => setOn(!!data));
  }, [session?.user.id, contributionId]);

  async function toggle() {
    if (!session) { setPrompt(true); return; }
    if (on) {
      await supabase.from('applause').delete().eq('user_id', session.user.id).eq('contribution_id', contributionId);
      setOn(false); setCount((c) => c - 1);
    } else {
      await supabase.from('applause').insert({ user_id: session.user.id, contribution_id: contributionId });
      setOn(true); setCount((c) => c + 1);
    }
  }
  return (
    <>
      <button onClick={toggle} className={`text-xs px-2 py-0.5 rounded-full border ${on ? 'bg-heart-500 text-white border-heart-500' : 'bg-white hover:bg-stone-100'}`}>
        👏 {count}
      </button>
      {prompt && <LoginPromptDialog onClose={() => setPrompt(false)} />}
    </>
  );
}
```

- [ ] **Step 6: Wire Favorite + Applaud into the Profile page**

Edit `src/pages/Profile.tsx` — import the two buttons:

```tsx
import FavoriteButton from '@/components/FavoriteButton';
import ApplaudButton from '@/components/ApplaudButton';
```

In the header block, after `<HeartPointsBadge points={points} />`, add the favourite button:

```tsx
<div className="mt-2"><FavoriteButton businessId={business.id} /></div>
```

In the contributions list, replace the right-hand `<HeartPointsBadge points={c.heart_points} />` with a vertical stack:

```tsx
<div className="flex flex-col items-end gap-1">
  <HeartPointsBadge points={c.heart_points} />
  <ApplaudButton contributionId={c.id} />
</div>
```

- [ ] **Step 7: Implement `src/pages/Favorites.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import BusinessCard from '@/components/BusinessCard';
import { Link } from 'react-router-dom';
import type { BusinessWithPoints } from '@/types';

export default function FavoritesPage() {
  const { session } = useAuth();
  const [rows, setRows] = useState<BusinessWithPoints[]>([]);
  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data } = await supabase
        .from('favorites')
        .select('business_id, businesses(*, business_heart_points!inner(heart_points, contribution_count))')
        .eq('user_id', session.user.id);
      if (!data) return;
      setRows(data.map((r: any) => ({
        ...r.businesses,
        heart_points: r.businesses.business_heart_points.heart_points,
        contribution_count: r.businesses.business_heart_points.contribution_count,
      })));
    })();
  }, [session?.user.id]);
  if (!session) return <div className="p-8">Please <Link className="underline" to="/login">sign in</Link>.</div>;
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My favourites</h1>
      <div className="space-y-2">{rows.map((b) => <BusinessCard key={b.id} b={b} />)}</div>
    </div>
  );
}
```

- [ ] **Step 8: Add a Favourites link to the nav for logged-in customers**

In `src/components/Layout.tsx`, inside the `session ? (` branch, after the `<span>` with display name, add:

```tsx
{profile?.role === 'customer' && navLink('/me/favorites', 'Favourites')}
```

- [ ] **Step 9: Smoke-test customer auth end-to-end**

`npm run dev`. Sign up at `/signup`. Land on `/`. Click a profile. Hit ☆ Favourite — turns to ★. Hit 👏 on a contribution — counter ticks. Sign out, refresh — favourite badge gone. Sign back in — it's back. Visit `/me/favorites` — shows the business. Stop the server.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: customer auth, favourites, applause"
```

---

## Task 8: Shop auth + dashboard + contributions

**Files:**
- Modify: `src/pages/shop/Login.tsx`, `src/pages/shop/Signup.tsx`, `src/pages/shop/Dashboard.tsx`, `src/pages/shop/Contributions.tsx`

- [ ] **Step 1: Implement `src/pages/shop/Login.tsx`**

Copy-paste customer `Login.tsx` and change: title to "Shop login", post-login `nav('/shop/dashboard')`, signup link to `/shop/signup`, footer link "Are you a customer? Customer login".

```tsx
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function ShopLoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  async function onSubmit(e: FormEvent) {
    e.preventDefault(); setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setErr(error.message);
    nav('/shop/dashboard');
  }
  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Shop login</h1>
      <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button className="w-full bg-heart-500 text-white rounded p-2 font-semibold">Sign in</button>
      <div className="text-sm text-stone-600">No account? <Link to="/shop/signup" className="underline">Apply to be listed</Link></div>
      <div className="text-sm text-stone-600">Customer? <Link to="/login" className="underline">Customer login</Link></div>
    </form>
  );
}
```

- [ ] **Step 2: Implement `src/pages/shop/Signup.tsx` (apply to be listed)**

```tsx
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function ShopSignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [lat, setLat] = useState('-37.8136');
  const [lng, setLng] = useState('144.9631');
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault(); setErr(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setErr(error.message);
    if (!data.user) return;
    await supabase.from('profiles').insert({ id: data.user.id, role: 'shop', display_name: businessName });
    const { error: bErr } = await supabase.from('businesses').insert({
      owner_id: data.user.id, name: businessName, bio,
      lat: parseFloat(lat), lng: parseFloat(lng), approved: false,
    });
    if (bErr) return setErr(bErr.message);
    nav('/shop/dashboard');
  }
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Apply to be listed</h1>
      <p className="text-sm text-stone-600">Your business will appear on the map once an admin approves it.</p>
      <input className="w-full border rounded p-2" placeholder="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
      <textarea className="w-full border rounded p-2" placeholder="Bio (one paragraph)" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} required />
      <div className="grid grid-cols-2 gap-2">
        <input className="border rounded p-2" placeholder="Latitude"  value={lat} onChange={(e) => setLat(e.target.value)} required />
        <input className="border rounded p-2" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} required />
      </div>
      <input className="w-full border rounded p-2" type="email" placeholder="Owner email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button className="w-full bg-heart-500 text-white rounded p-2 font-semibold">Apply</button>
    </form>
  );
}
```

- [ ] **Step 3: Implement `src/pages/shop/Dashboard.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import HeartPointsBadge from '@/components/HeartPointsBadge';
import type { Business } from '@/types';

export default function ShopDashboardPage() {
  const { session, profile } = useAuth();
  const [b, setB] = useState<Business | null>(null);
  const [points, setPoints] = useState(0);
  const [contribCount, setContribCount] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [applauseTotal, setApplauseTotal] = useState(0);

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data: biz } = await supabase.from('businesses').select('*').eq('owner_id', session.user.id).maybeSingle();
      if (!biz) return;
      setB(biz as Business);
      const { data: pts } = await supabase.from('business_heart_points').select('heart_points, contribution_count').eq('business_id', biz.id).single();
      setPoints(pts?.heart_points ?? 0);
      setContribCount(pts?.contribution_count ?? 0);
      const { count: f } = await supabase.from('follows').select('user_id', { count: 'exact', head: true }).eq('business_id', biz.id);
      setFollowers(f ?? 0);
      const { data: contribs } = await supabase.from('contributions').select('id').eq('business_id', biz.id);
      const ids = (contribs ?? []).map((c) => c.id);
      if (ids.length) {
        const { count: a } = await supabase.from('applause').select('user_id', { count: 'exact', head: true }).in('contribution_id', ids);
        setApplauseTotal(a ?? 0);
      }
    })();
  }, [session?.user.id]);

  if (!session || profile?.role !== 'shop') return <div className="p-8">Shop accounts only. <Link className="underline" to="/shop/login">Sign in</Link>.</div>;
  if (!b) return <div className="p-8">No business linked to this account yet.</div>;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-1">{b.name}</h1>
      <p className="text-stone-600 mb-2">{b.approved ? 'Approved · live on the map' : 'Pending admin approval'}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-white rounded-lg p-3 shadow-sm text-center"><div className="text-2xl font-bold">{points}</div><div className="text-xs text-stone-500">Heart Points</div></div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center"><div className="text-2xl font-bold">{contribCount}</div><div className="text-xs text-stone-500">Contributions</div></div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center"><div className="text-2xl font-bold">{followers}</div><div className="text-xs text-stone-500">Followers</div></div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center"><div className="text-2xl font-bold">{applauseTotal}</div><div className="text-xs text-stone-500">Applause</div></div>
      </div>
      <Link to="/shop/contributions" className="inline-block bg-heart-500 text-white rounded p-2 px-4 font-semibold">Add a contribution →</Link>
    </div>
  );
}
```

- [ ] **Step 4: Implement `src/pages/shop/Contributions.tsx`**

```tsx
import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/lib/format';
import type { Contribution } from '@/types';

export default function ShopContributionsPage() {
  const { session, profile } = useAuth();
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [contribs, setContribs] = useState<Contribution[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [desc, setDesc] = useState('');
  const [points, setPoints] = useState('');

  useEffect(() => {
    if (!session) return;
    supabase.from('businesses').select('id').eq('owner_id', session.user.id).maybeSingle()
      .then(({ data }) => setBusinessId(data?.id ?? null));
  }, [session?.user.id]);

  useEffect(() => {
    if (!businessId) return;
    supabase.from('contributions').select('*').eq('business_id', businessId).order('date', { ascending: false })
      .then(({ data }) => setContribs((data as Contribution[]) ?? []));
  }, [businessId]);

  async function add(e: FormEvent) {
    e.preventDefault();
    if (!businessId) return;
    const { data } = await supabase.from('contributions').insert({
      business_id: businessId, date, description: desc, heart_points: parseInt(points || '0', 10),
    }).select().single();
    if (data) setContribs([data as Contribution, ...contribs]);
    setDesc(''); setPoints('');
  }
  async function remove(id: string) {
    await supabase.from('contributions').delete().eq('id', id);
    setContribs(contribs.filter((c) => c.id !== id));
  }

  if (!session) return <Navigate to="/shop/login" replace />;
  if (profile?.role !== 'shop') return <div className="p-8">Shop accounts only.</div>;
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My contributions</h1>
      <form onSubmit={add} className="bg-white rounded-xl p-4 shadow-sm space-y-2 mb-6">
        <input className="w-full border rounded p-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input className="w-full border rounded p-2" placeholder="What did you do?" value={desc} onChange={(e) => setDesc(e.target.value)} required />
        <input className="w-full border rounded p-2" type="number" min={0} placeholder="Heart Points" value={points} onChange={(e) => setPoints(e.target.value)} required />
        <button className="bg-heart-500 text-white rounded p-2 px-4 font-semibold">Add</button>
      </form>
      <ol className="space-y-2">
        {contribs.map((c) => (
          <li key={c.id} className="bg-white rounded p-3 shadow-sm flex justify-between items-center">
            <div>
              <div className="text-xs text-stone-500">{formatDate(c.date)}</div>
              <div>{c.description}</div>
            </div>
            <div className="flex gap-3 items-center">
              <span className="font-semibold">♥ {c.heart_points}</span>
              <button onClick={() => remove(c.id)} className="text-sm text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-sm text-stone-500 mt-4"><Link to="/shop/dashboard" className="underline">Back to dashboard</Link></p>
    </div>
  );
}
```

- [ ] **Step 5: Smoke-test shop flow**

`npm run dev`. Click "Shop login" → "Apply to be listed". Submit a fake business. Land on `/shop/dashboard` — header reads "Pending admin approval", all stats are 0. Visit `/shop/contributions`, add a contribution with 50 points. Return to dashboard — Heart Points = 50, Contributions = 1. The new business is NOT visible on the public map (RLS hides unapproved). Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: shop login, signup, dashboard, contributions CRUD"
```

---

## Task 9: Admin page

**Files:**
- Modify: `src/pages/Admin.tsx`

- [ ] **Step 1: Make yourself an admin in Supabase**

In Supabase SQL Editor, run (replace with the admin user's UUID from `auth.users`):

```sql
update profiles set role = 'admin' where id = 'YOUR-UUID';
```

(If your account doesn't have a profile yet, sign up first as a customer, then promote.)

- [ ] **Step 2: Implement `src/pages/Admin.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { Business } from '@/types';

export default function AdminPage() {
  const { session, profile, loading } = useAuth();
  const [pending, setPending] = useState<Business[]>([]);
  const [approved, setApproved] = useState<Business[]>([]);

  async function refresh() {
    const { data: p } = await supabase.from('businesses').select('*').eq('approved', false);
    const { data: a } = await supabase.from('businesses').select('*').eq('approved', true).order('name');
    setPending((p as Business[]) ?? []);
    setApproved((a as Business[]) ?? []);
  }
  useEffect(() => { if (profile?.role === 'admin') refresh(); }, [profile?.role]);

  if (loading) return <div className="p-8">…</div>;
  if (!session || profile?.role !== 'admin') return <Navigate to="/" replace />;

  async function approve(id: string) {
    await supabase.from('businesses').update({ approved: true }).eq('id', id);
    refresh();
  }
  async function reject(id: string) {
    if (!confirm('Delete this pending application?')) return;
    await supabase.from('businesses').delete().eq('id', id);
    refresh();
  }
  async function removeBiz(id: string) {
    if (!confirm('Remove this business from the directory?')) return;
    await supabase.from('businesses').delete().eq('id', id);
    refresh();
  }
  async function toggleHero(b: Business) {
    await supabase.from('businesses').update({ is_hero: !b.is_hero }).eq('id', b.id);
    refresh();
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-2">Pending applications ({pending.length})</h1>
        <ul className="space-y-2">
          {pending.map((b) => (
            <li key={b.id} className="bg-white rounded p-3 shadow-sm flex justify-between gap-2">
              <div>
                <div className="font-semibold">{b.name}</div>
                <div className="text-sm text-stone-600">{b.bio}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => approve(b.id)} className="bg-green-600 text-white rounded px-3 py-1 text-sm">Approve</button>
                <button onClick={() => reject(b.id)} className="bg-red-600 text-white rounded px-3 py-1 text-sm">Reject</button>
              </div>
            </li>
          ))}
          {pending.length === 0 && <li className="text-stone-500 text-sm">No pending applications.</li>}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-2">Approved businesses ({approved.length})</h2>
        <ul className="space-y-2">
          {approved.map((b) => (
            <li key={b.id} className="bg-white rounded p-3 shadow-sm flex justify-between items-center">
              <div className="font-semibold">{b.name}{b.is_hero && <span className="ml-2 text-xs bg-heart-50 text-heart-600 rounded-full px-2">Hero</span>}</div>
              <div className="flex gap-2">
                <button onClick={() => toggleHero(b)} className="text-sm border rounded px-3 py-1">{b.is_hero ? 'Unmark hero' : 'Mark hero'}</button>
                <button onClick={() => removeBiz(b.id)} className="text-sm bg-red-600 text-white rounded px-3 py-1">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Smoke-test admin**

`npm run dev`. As your admin account, visit `/admin`. The shop application you made in Task 8 is in "Pending". Approve it — the shop becomes visible on the public map (verify by going to `/`). Toggle "Mark hero" — appears on `/heroes`. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: admin page — approve, reject, toggle hero, remove"
```

---

## Task 10: Deploy

**Files:**
- Create: `vercel.json` (optional)

- [ ] **Step 1: Build locally to check production bundle works**

```bash
npm run build
```

Expected: `dist/` folder created, no TypeScript errors.

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --prod
```

Follow prompts: link to your account, scope, project name `good-shit`. After deploy, paste the three `VITE_*` env vars in the Vercel project settings → Environment Variables. Redeploy.

- [ ] **Step 3: Update Google Maps key referrer restrictions**

In Google Cloud Console, edit the Maps API key's HTTP referrer restrictions to include the Vercel URL (`*.vercel.app/*`).

- [ ] **Step 4: Smoke-test the live URL on a phone**

Open the production URL on a mobile browser. Allow geolocation. Map should centre on you (if in Melbourne) and pin businesses. Test customer signup + favourite end-to-end.

- [ ] **Step 5: Commit any config**

```bash
git add -A
git commit -m "chore: deploy to Vercel"
```

---

## Stretch tasks (only if MVP is complete and time remains)

### Stretch A: Follow + Following feed

- Create `src/components/FollowButton.tsx` mirroring `FavoriteButton` but writing to the `follows` table.
- Add it next to the favourite button on the Profile page header.
- Implement `src/pages/Feed.tsx` querying `contributions` joined to `follows` for the current user, ordered by date desc.
- Add `/me/feed` link in nav for customers.

### Stretch B: Testimonials

- Add a "Leave a testimonial" form at the bottom of the Profile page (visible only to signed-in customers; uses `useAuth`).
- List testimonials below, with author display name and date.
- Admin page: show a Testimonials moderation list with delete button.

### Stretch C: Shop self-edit profile

- Implement `src/pages/shop/ShopProfile.tsx` with a form to edit `name`, `bio`, `lat`, `lng`, `sdg_focus[]` of the owner's `businesses` row. RLS already permits this.

### Stretch D: "Why this exists" page

- Add `src/pages/About.tsx` summarising the Glow evidence base (29.1% awareness, 18.4% switched brand, top SDG priorities) using `src/lib/glow.ts`.
- Add a footer link in `Layout.tsx`.

---

## Notes for whoever executes this

- **Run order matters.** Each task depends on artifacts from earlier tasks (env vars from Task 1, types from Task 1, components from earlier tasks). Don't skip ahead.
- **TDD only on `src/lib/haversine.ts`.** Everything else is smoke-tested in the browser — the project lives or dies in the demo, not the test suite.
- **If RLS blocks something unexpectedly**, look at the policy in `supabase/rls.sql` first. Resist the urge to disable RLS — it's the entire authorisation model.
- **Commit at every "Commit" step.** If a task only half-finishes, the half that works is still landed.
- **Stretch tasks are optional.** Time pressure is real; the MVP cut in [ARCHITECTURE.md §10](./ARCHITECTURE.md) is what the pitch needs.
