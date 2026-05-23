# Good Sh*t — Design Spec

**Date:** 23 May 2026
**Context:** Claude Impact Lab hackathon, Melbourne (one-day build).
**Sources:** [README.md](../../../README.md), [00_PROJECT_CONTEXT.md](../../../00_PROJECT_CONTEXT.md).

## 1. Purpose

A web app that surfaces Melbourne businesses contributing to community good, lets customers engage with their contributions, and lets shops self-publish their impact. The hackathon problem statement is "How might residents and communities drive their own solutions — from circular economy models to local resource sharing — that build resilience from the ground up?" This app answers it by making civic contribution legible and rewardable at the local level.

## 2. Audience & roles

| Role | Identifier | Read | Write |
|---|---|---|---|
| **Public** (no login) | — | Map, Profiles, Heroes, Leaderboard | nothing |
| **Customer** | `profiles.role = 'customer'` | Public + Favorites + Following feed | Favorites, applause, follows, testimonials |
| **Shop** | `profiles.role = 'shop'` + linked `businesses.owner_id` | Public + own Dashboard | Own business profile + own contributions |
| **Admin** | `profiles.role = 'admin'` | Everything + Admin Console | Anything; approves shop signups |

Two separate frontend login pages (`/login` for customers, `/shop/login` for shops). Both hit the same Supabase Auth backend; the post-login redirect and signup form differ.

## 3. Core mechanic — Heart Points

Every contribution a business makes carries a `heart_points` value. A business's total Heart Points is the sum of `heart_points` over their contributions. The Leaderboard ranks businesses by total Heart Points. Heart Points are derived (off-platform) from underlying activity such as dollars donated, volunteer hours, or items diverted from landfill — the app exposes only the unified score.

## 4. Pages and routes

### Public

| Route | Page | Notes |
|---|---|---|
| `/` | **Map** | Google Map of the City of Melbourne. Pins for all approved businesses. On load, prompt for the browser's geolocation permission; if granted, centre on the user, show their position, and surface a "Nearby" rail of the 5 closest businesses by haversine distance. If denied, fall back to a CBD centre (~-37.8136, 144.9631). Click a pin → card with logo, name, total Heart Points, "View profile". |
| `/heroes` | **Heroes** | Editorial grid of `is_hero = true` businesses. Each card shows logo, award name, latest contribution. |
| `/business/:id` | **Profile** | Hero banner (logo + name + total Heart Points). Bio. Stat strip (total Heart Points, # contributions, top SDG focus). Contributions feed. Glow-data sidebar callout per SDG focus area. Applaud / Favorite / Follow buttons (prompt login when anonymous). Testimonials section. |
| `/leaderboard` | **Leaderboard** | Top 10 businesses by total Heart Points. Rank, logo, name, points, sparkline of contributions over time. |

### Customer (logged-in customer)

| Route | Page |
|---|---|
| `/login` | Customer login (email/password + magic link). |
| `/signup` | Customer signup. |
| `/me/favorites` | Saved businesses. |
| `/me/feed` | Chronological feed of new contributions from followed businesses. |

### Shop (logged-in shop owner)

| Route | Page |
|---|---|
| `/shop/login` | Shop login. |
| `/shop/signup` | "Apply to be listed" — creates a shop profile + an unapproved business row. |
| `/shop/dashboard` | Total Heart Points, leaderboard rank over time, applause count, follower count. |
| `/shop/profile` | Edit name, logo, bio, SDG focus, lat/lng. |
| `/shop/contributions` | Add / edit / delete own contributions. |

### Admin

| Route | Page |
|---|---|
| `/admin` | Pending shop applications (approve / reject). All businesses (edit / delete). Testimonials moderation. |

## 5. Data model

```ts
// Postgres tables, all rows protected by RLS (see §6).

profiles {
  id            uuid  PK  references auth.users(id)
  role          text  CHECK in ('customer','shop','admin')
  display_name  text
  avatar_url    text  nullable
  created_at    timestamptz default now()
}

businesses {
  id          uuid PK
  owner_id    uuid references profiles(id)  nullable  -- null for admin-seeded
  name        text
  logo        text                          -- URL or Supabase Storage path
  bio         text
  lat         double precision
  lng         double precision
  sdg_focus   text[]                        -- e.g. ['Climate Action','Good Health']
  is_hero     boolean default false
  awards      text[] default '{}'
  approved    boolean default false
  created_at  timestamptz default now()
}

contributions {
  id            uuid PK
  business_id   uuid references businesses(id) on delete cascade
  date          date
  description   text
  heart_points  integer CHECK (heart_points >= 0)
  created_at    timestamptz default now()
}

favorites    { user_id uuid, business_id uuid,    PRIMARY KEY (user_id, business_id) }
applause     { user_id uuid, contribution_id uuid, PRIMARY KEY (user_id, contribution_id) }
follows      { user_id uuid, business_id uuid,    PRIMARY KEY (user_id, business_id) }

testimonials {
  id           uuid PK
  user_id      uuid references profiles(id)
  business_id  uuid references businesses(id) on delete cascade
  body         text  CHECK (length(body) <= 500)
  created_at   timestamptz default now()
}
```

Total Heart Points per business is computed via a view or a runtime aggregation; no denormalised column.

## 6. Authorisation (Supabase RLS sketch)

- `profiles`: row visible to anyone; only the owning user or admin may `UPDATE`. `role` is settable only by admin (or by `shop_signup` server function for the shop role).
- `businesses`: `SELECT` allowed when `approved = true` OR `auth.uid() = owner_id` OR caller is admin. `UPDATE` allowed for owner or admin. `INSERT` via `shop_signup` flow (inserts as `approved = false`) or by admin directly. `DELETE` admin only.
- `contributions`: `SELECT` open to anyone (business approval is checked at the business join). `INSERT/UPDATE/DELETE` allowed to the business owner or admin.
- `favorites`, `follows`, `applause`: caller can only read or modify their own rows.
- `testimonials`: anyone can `SELECT`. Authenticated customers can `INSERT`. `DELETE` allowed to author or admin.

## 7. Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + React Router 6. Responsive layout, mobile-first. PWA manifest optional.
- **Backend:** Supabase (Postgres + Auth + Storage + RLS). No custom server code.
- **Map:** Google Maps JavaScript API via `@react-google-maps/api`. Requires a `VITE_GOOGLE_MAPS_API_KEY` env var with HTTP referrer restrictions. Browser Geolocation API for the user's position; haversine distance to rank "Nearby" businesses.
- **State:** Supabase client + plain React hooks (`useState`, `useEffect`) for the MVP. No React Query, no Redux. Upgrade only if duplication or stale-data bugs appear.
- **Hosting:** Vercel or Netlify (static) for the frontend; Supabase hosts everything else.

## 8. Seed data

`scripts/seed.sql` inserts 25 real Melbourne businesses known for community contribution — cafes, social enterprises, B-Corps, awarded community contributors. Each gets:
- `approved = true`
- a plausible bio
- `sdg_focus` array tied to their real-world activity
- 3–10 fabricated but plausible contributions

`is_hero = true` on ~5 of them (the ones with notable awards).

Logos: prefer the business's actual public-facing logo where reuse is reasonable; otherwise generate a simple SVG mark from initials.

Lat/lngs spread across the City of Melbourne LGA.

## 9. Glow data integration

The Glow SDG awareness dataset is the evidence base for the pitch. Two surfaces use it:

1. **Profile page sidebar callout** — for each SDG in `sdg_focus`, show the Melbourne priority %  from [00_PROJECT_CONTEXT.md §Melbourne SDG Priority Rankings](../../../00_PROJECT_CONTEXT.md#L145-L165). Example: "29.8% of Melburnians rank Good Health in their top 3 SDG priorities (Glow, n=2,492)."
2. **"Why this exists" page (optional)** — a one-page summary citing the headline numbers: 29.1% Melbourne SDG awareness, 18.4% have switched brand for social/env reasons in the last 3 months.

These numbers come from the committed CSV — no live computation needed.

## 10. Build order and MVP cut

The full design above is ~2-3 engineer-days. For the one-day hackathon, build in this order; stop when time runs out.

### Must-have (target by mid-afternoon)
1. Vite + Tailwind + Router + Supabase client scaffold — 30 min
2. Supabase project, schema, RLS policies, seed of 25 businesses — 90 min
3. Map page + Profile page (read-only) — 60 min
4. Leaderboard + Heroes — 40 min
5. Customer auth + Favorite + Applause — 60 min
6. Shop login + Shop dashboard (read-only stats) + add-contribution form — 75 min
7. Admin page (approve, delete) — 45 min

### Stretch (only if ahead)
- Follow + Following feed
- Testimonials (need moderation surface)
- Shop signup "apply to be listed" flow (admin approval queue)
- Shop self-edit profile

### Drop first if time is tight
- Testimonials — highest moderation/UX cost, lowest demo value
- Following feed — favorites + applause already prove the social model
- Analytics graphs in the shop dashboard — single numbers are enough

## 11. Out of scope

- Payments / donation processing
- Identity verification of shops beyond admin approval
- Real-time updates (Supabase Realtime not used in MVP)
- Native iOS / Android apps (responsive web only)
- Internationalisation
- Analytics beyond what's shown on the shop dashboard
- A real Heart Points calculation engine (numbers are seeded / manually entered)

## 12. Judging criteria mapping

From [00_PROJECT_CONTEXT.md §What Judges Are Looking For](../../../00_PROJECT_CONTEXT.md#L21-L27):

| Criterion | How the design serves it |
|---|---|
| Real civic impact | Heart Points make community contribution legible and comparable; Leaderboard creates a reputational incentive. |
| Council could plausibly adopt it | Admin role + approval queue is the CoM operating model. Schema is publishable as an open dataset. |
| Equity must show up | SDG focus tags surface businesses contributing to No Poverty, Reduced Inequalities, etc. The Glow callout cites the Melbourne %s including the regional Vic comparison for equity context. |
| Melbourne uniqueness | Map of the CoM LGA, real Melbourne business names, Glow data Melbourne subset (n=2,492) as the evidence base. |
