# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A one-day hackathon scratch repo for the **Claude Impact Lab, Melbourne (23 May 2026)**. Goal: prototype "Good Sh*t", a web app connecting Melbourne customers with businesses that contribute to community good. See [README.md](README.md) for the product brief and [00_PROJECT_CONTEXT.md](00_PROJECT_CONTEXT.md) for the full hackathon context (theme, judging criteria, data sources).

Important constraints baked into the brief:
- **One-day build.** Prototype-quality is the goal. Do not introduce production infrastructure (auth servers, CI/CD, complex state libs) unless the feature requires it.
- **No scaling concerns.** "No need to worry about scaling for thousands of users" — pick the simplest thing that demos well.
- **Melbourne-specific.** Judging criterion: "Puts Melbourne on the map — uses what Melbourne is uniquely famous for." Hardcoded Melbourne lat/lng, CoM datasets, and local context are encouraged.
- **Equity must show up** and the City of Melbourne must plausibly adopt it — keep those visible in any feature decisions.

## Tech stack

Decided in [docs/superpowers/specs/2026-05-23-good-shit-design.md](docs/superpowers/specs/2026-05-23-good-shit-design.md):

- **Frontend:** React + Vite + TypeScript + Tailwind + React Router. Responsive web only (no native build).
- **Backend:** Supabase (Postgres + Auth + Storage + Row Level Security). No custom server code.
- **Map:** Google Maps JS API via `@react-google-maps/api`, plus browser Geolocation for "nearby shops". Requires `VITE_GOOGLE_MAPS_API_KEY` with HTTP referrer restrictions.
- **State:** Supabase JS client + plain React hooks. No React Query / Redux unless duplication forces it.

Three roles enforced by RLS, not application code: `customer`, `shop`, `admin`. Two separate frontend login pages (`/login` and `/shop/login`) share the same Supabase Auth.

`TECH_STACK.md` is a leftover placeholder — the design spec is the source of truth.

## Data assets

### Glow SDG Awareness CSV (already committed)

`SDG Awareness AU Combined (gmsmarketsignals.com).csv` — 12,268 Australian respondents across 3 waves (Jul 2025 – Mar 2026), 27 columns. Melbourne subset is n=2,492. See [00_PROJECT_CONTEXT.md](00_PROJECT_CONTEXT.md#L42-L70) for full schema, location breakdown, and pre-computed SDG priority rankings.

Pre-computed Melbourne headline numbers worth pulling into the UI (already in [00_PROJECT_CONTEXT.md](00_PROJECT_CONTEXT.md#L135-L196)):
- 29.1% of Melburnians are SDG-aware (vs 18.4% regional Vic).
- Top 3 Melbourne SDG priorities: Good Health (29.8%), No Poverty (29.8%), Clean Water (29.5%).
- 18.4% of Melburnians have switched brand in the last 3 months for social/environmental reasons — this is the core "demand signal" justifying the app.

Use these numbers verbatim where possible — they're the evidence base judges will look for.

### Melbourne Open Data (not yet downloaded)

[00_PROJECT_CONTEXT.md](00_PROJECT_CONTEXT.md#L73-L123) lists direct CSV export URLs for City of Melbourne datasets: pedestrian counts, urban forest trees (80k+), microclimate sensors, drinking fountains. Fetch on demand via the export URLs — do not bulk-download.

## Working in this repo

- The repo is currently a content/planning scratchpad. When implementing the actual app, treat all current files as inputs (data + spec), not code to modify.
- Always preserve `00_PROJECT_CONTEXT.md` and `README.md` — they are the source of truth for what's being built and why.
- The Glow CSV filename contains spaces and parentheses; quote it in shell commands.
