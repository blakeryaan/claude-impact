# Good Sh*t

A web platform that connects Melbourne customers with businesses doing good for the community.

Built in one day for the **Claude Impact Lab** hackathon (Melbourne, 23 May 2026).

> **Theme:** Community & citizen initiatives — *How might residents and communities drive their own solutions — from circular economy models to local resource sharing — that build resilience from the ground up?*

## The idea

Every business that contributes to the community earns **Heart Points** — a single, comparable score that turns invisible civic work into something Melburnians can see, follow, and reward.

The platform has three audiences:

- **Customers** browse, favourite, applaud and follow businesses they want to support.
- **Shops** self-publish their contributions and watch their impact climb the leaderboard.
- **Admins** (a City of Melbourne–style role) curate the directory and approve new listings.

## Features

| | |
|---|---|
| **Map** | Google Map of the City of Melbourne with ~25 contributing businesses pinned across the LGA. With the user's permission, the map centres on them and surfaces the nearest shops first. |
| **Heroes** | Editorial page highlighting award-winning businesses. |
| **Business Profile** | Logo, bio, contributions feed, total Heart Points, and a Glow-data callout showing how the business's SDG focus maps to what Melburnians actually prioritise. |
| **Leaderboard** | Top 10 businesses by Heart Points, with sparklines of contributions over time. |
| **Customer login** | Save favourites, applaud contributions, follow businesses, leave testimonials. |
| **Shop login** | Manage profile, post new contributions, view a private dashboard with rank and applause/follower counts. |
| **Admin** | Approve new shop applications, edit any business, moderate testimonials. |

## Why Melbourne — the evidence base

The committed [Glow / Global Market Signals SDG Awareness dataset](./SDG%20Awareness%20AU%20Combined%20%28gmsmarketsignals.com%29.csv) (n=12,268 Australians; n=2,492 Melbourne) gives the app its civic backbone:

- **29.1%** of Melburnians are aware of the UN Sustainable Development Goals (vs 18.4% in regional Victoria).
- **18.4%** of Melburnians have switched brand for social or environmental reasons in the last 3 months — the demand signal this platform turns into supply-side reputation.
- Top Melbourne SDG priorities: **Good Health (29.8%)**, **No Poverty (29.8%)**, **Clean Water (29.5%)**.

These numbers appear in-app on the Business Profile page sidebar, so the dataset visibly informs the product rather than just decorating the pitch.

## Tech stack

- **Frontend:** React + Vite + TypeScript + Tailwind — responsive web (mobile + desktop), no native build.
- **Backend:** Supabase — Postgres + Auth + Storage + Row Level Security. No custom server code.
- **Map:** Google Maps JavaScript API + the browser's Geolocation API for "nearby shops".
- **Hosting:** Static frontend on Vercel/Netlify; Supabase hosts the rest.

Two separate frontend login pages (`/login` for customers, `/shop/login` for shops) sit on top of the same Supabase Auth, with role-aware redirects and signup forms.

## Documents

- **[Design spec](./docs/superpowers/specs/2026-05-23-good-shit-design.md)** — schema, RLS sketch, page-by-page breakdown, MVP cut.
- **[Project context](./00_PROJECT_CONTEXT.md)** — hackathon brief, data sources, pre-computed Glow numbers.
- **[CLAUDE.md](./CLAUDE.md)** — guidance for future Claude Code sessions in this repo.

## Status

Day-of hackathon prototype. No production hardening, no thousands-of-users design — picks the simplest thing that demos well, with the Glow dataset doing the heavy lifting for the pitch.
