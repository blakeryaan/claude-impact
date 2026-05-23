# Good Sh*t — Two-Developer Workflow

How to split the [IMPLEMENTATION.md](./IMPLEMENTATION.md) tasks across two developers on two branches with minimal merge conflict.

**Split principle:** one dev owns the **customer side** (public browsing + customer auth + applause/favourite), the other owns the **shop side** (shop auth + dashboard + contributions + admin moderation). The two sides touch disjoint files except for one shared file (`src/components/Layout.tsx`) which the foundation phase pre-wires for both roles so neither branch needs to edit it.

---

## Phase 0 — Foundation (sequential, one developer, ~2 hours)

One person — call them **Dev A** — does Tasks 0–3 of [IMPLEMENTATION.md](./IMPLEMENTATION.md) on `main`:

- [ ] Task 0: scaffold (Vite + Tailwind + Router + Supabase client + env)
- [ ] Task 1: Supabase backend (schema, RLS, seed)
- [ ] Task 2: pure-logic utilities (haversine, format, glow)
- [ ] Task 3: layout, routing, useAuth, page stubs

**Critical detail — apply this edit to Task 3 Step 3** so the customer branch doesn't have to touch `Layout.tsx` later. Inside the `session ? (...)` branch, before the sign-out button, include the Favourites link conditional alongside the role-specific ones:

```tsx
{profile?.role === 'customer' && navLink('/me/favorites', 'Favourites')}
{profile?.role === 'shop'     && navLink('/shop/dashboard', 'My shop')}
{profile?.role === 'admin'    && navLink('/admin', 'Admin')}
```

(IMPLEMENTATION.md Task 7 Step 8 originally added the customer line later. With this change, neither parallel branch needs to edit `Layout.tsx`.)

When Phase 0 is done, push `main`. Both developers branch from this point.

---

## Phase 1 — Parallel work (~3–4 hours each)

### Branch `customer/` — owned by Dev A

- [ ] Task 4: Map page (Google Maps + Geolocation + Nearby rail)
- [ ] Task 5: Business Profile page (with Glow SDG callouts)
- [ ] Task 6: Heroes + Leaderboard
- [ ] Task 7: Customer auth + Favourite + Applaud + Favourites page
  - **Skip Task 7 Step 8** (the Layout nav-link edit) — already done in Phase 0.

**Files Dev A owns on this branch:**
```
src/hooks/useGeolocation.ts
src/components/BusinessCard.tsx
src/components/HeartPointsBadge.tsx
src/components/SDGCallout.tsx
src/components/LoginPromptDialog.tsx
src/components/FavoriteButton.tsx
src/components/ApplaudButton.tsx
src/pages/Map.tsx
src/pages/Profile.tsx
src/pages/Heroes.tsx
src/pages/Leaderboard.tsx
src/pages/Login.tsx
src/pages/Signup.tsx
src/pages/Favorites.tsx
```

### Branch `shop/` — owned by Dev B

- [ ] Task 7b: Google Places enrichment (PlacesAutocomplete component + photo_url rendering on BusinessCard + Profile)
- [ ] Task 8: Shop login + signup + dashboard + contributions CRUD
- [ ] Task 9: Admin page

**Files Dev B owns on this branch:**
```
src/components/PlacesAutocomplete.tsx
src/pages/shop/Login.tsx
src/pages/shop/Signup.tsx
src/pages/shop/Dashboard.tsx
src/pages/shop/Contributions.tsx
src/pages/shop/ShopProfile.tsx      (stretch; only if Task 8 done)
src/pages/Admin.tsx
```

Task 7b also touches `BusinessCard.tsx` and `Profile.tsx` (to render `photo_url`). Those files are Dev A's. **Coordinate the photo_url render edit:** Dev A includes the `b.photo_url ? <img> : <fallback>` pattern in `BusinessCard.tsx` and `Profile.tsx` from the start (see Task 7b Steps 2-3). Dev B's PlacesAutocomplete just writes the column; no extra render code crosses the boundary.

Dev B also needs the components Dev A creates (`HeartPointsBadge`, etc.). To avoid blocking, **Dev B should create minimal local stubs of those components** at the start of their branch and replace them at merge time:

```tsx
// src/components/HeartPointsBadge.tsx (stub for shop branch only — will be replaced at merge)
export default function HeartPointsBadge({ points }: { points: number }) {
  return <span>♥ {points}</span>;
}
```

Once Dev A's customer branch merges to main, Dev B rebases or merges main into `shop/` — the stub is overwritten by the real component. The shop dashboard's UI keeps working both before and after.

### Shared, do-not-touch files

These are owned by the foundation (Phase 0). **Neither branch should edit them in Phase 1:**

- `src/App.tsx` — routes already declared
- `src/components/Layout.tsx` — nav already role-aware
- `src/hooks/useAuth.ts`
- `src/lib/supabase.ts`
- `src/lib/haversine.ts`, `format.ts`, `glow.ts`
- `src/types.ts`
- `supabase/*.sql`
- All config (`vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `package.json`)

If a Phase 1 task needs a change to any of these, **the change goes back to `main` as a separate small commit** — don't smuggle it through a feature branch.

### Supabase database — shared, no per-branch isolation

Both devs hit the same Supabase project. RLS protects rows by user. Conventions:

- Don't run destructive SQL (`drop`, `truncate`) without telling the other dev.
- Schema changes are rare. If you need one, write the migration into `supabase/schema.sql`, apply it via the Supabase SQL editor, and push the file. The other dev pulls and is up to date — no migration tool needed for a hackathon.

---

## Phase 2 — Integration (~30 min)

1. **Merge `customer/` to `main` first.** It's the bigger surface area; landing it first means less to reconcile.
   ```bash
   git checkout main && git merge --no-ff customer/
   git push origin main
   ```

2. **Dev B rebases `shop/` onto the new main**:
   ```bash
   git checkout shop/
   git pull --rebase origin main
   ```
   The component stubs Dev B made are overwritten by the real ones. Re-run the shop pages locally to confirm UI is still intact.

3. **Merge `shop/` to main**:
   ```bash
   git checkout main && git merge --no-ff shop/
   git push origin main
   ```

4. **Integration smoke test (10 min, one dev):**
   - As a customer, browse the map, favourite a hero, applaud a contribution.
   - As a shop, log in, see your business on the public map after admin approval.
   - As an admin, approve a pending shop, mark a business as hero.

5. **Deploy** (Task 10): one of the devs runs `npx vercel --prod`.

---

## What goes wrong, and how to recover

| Symptom | Cause | Fix |
|---|---|---|
| `customer/` branch reads from Supabase but rows are missing | Phase 0 seed not run | Re-run `supabase/seed.sql` in SQL editor |
| Shop branch can't render a Profile page link | `HeartPointsBadge` stub still in place after merge | Pull `main`; the real component overwrites the stub |
| Merge conflict in `Layout.tsx` | Someone edited it on a feature branch | Resolve to keep the foundation version (the role-aware conditional). Then move the offending edit into a separate `main` commit |
| RLS blocks a query Dev B expects to work | Wrong role on the test user | In Supabase SQL: `update profiles set role = 'admin' where id = '<uuid>';` |
| Google Maps shows grey tiles | API key referrer restriction excludes localhost | Add `http://localhost:*/*` to the key's restrictions in Google Cloud Console |

---

## Time budget (parallel, after Phase 0)

```
Dev A (customer):  Task 4 (1h) → Task 5 (0.5h) → Task 6 (0.5h) → Task 7 (1h)   = 3 hours
Dev B (shop):      Task 8 (1.5h) → Task 9 (0.75h) → buffer                       = 2.5 hours
```

Phase 0 (2h) + Phase 1 parallel (~3h wall time) + Phase 2 (0.5h) + Deploy (0.5h) ≈ **6 hours**. Stretch tasks (follow feed, testimonials, shop self-edit, "Why this exists" page) come out of remaining time and follow the same branching rules.
