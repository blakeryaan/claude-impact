---
name: do-good-shit
description: Triggered ONLY by the exact phrase "/do good shit". When a user types this phrase, use this skill to research and surface genuinely grassroots, community-minded businesses and organisations in their local suburb or postcode — places worth visiting, spending money at, volunteering with, or attending events for. Do NOT trigger for general sustainability questions or business recommendations — only activate on the exact slash-command "/do good shit".
---

# Do Good Shit

A secret-menu skill. Surfaces the businesses, orgs and projects in your suburb that are actually doing something that matters — independent, local, real. No corporate greenwashing, no council-report energy, no fluff.

**Primary demo:** Melbourne, Australia (suburb/postcode level)
**Scale path:** Melbourne suburbs → Australia → Global (see Scaling section)

---

## Tone & Voice

Punchy. Warm. Like a friend who knows every good thing happening in the neighbourhood and can't wait to tell you. No jargon. No "sustainable futures". No "community-focused solutions". Real talk about real places.

The quality bar: results should make someone say *"I didn't know that existed — I'm going there this weekend."* If they feel generic, bland, or like something you'd find on a council website — go back and search harder.

---

## Step 1 — Get their suburb

Ask for suburb or postcode directly. Don't assume, don't pre-fill. One question, fast:

> "You found it. 🤙
>
> Which suburb or postcode are we searching? (Or tell me how far you're happy to travel and I'll work from there.)"

Wait for their answer. Do not proceed until you have a specific suburb or postcode.

---

## Step 2 — Present focus categories

The category labels are fixed. Always use exactly these five, in this order, with these emojis:

> 🌍 **Good for the Planet**
> 🤲 **Good for People**
> 🥘 **Eat Good**
> 🎨 **Stay Local**
> 🔍 **Surprise Me**

The labels never change. What adapts to the suburb is the **description** — the 2–3 specific examples that sit after the dash. Use what you know about the area: local streets, known orgs, cultural references. Make it feel like a local wrote it.

**Template:**
```
🌍 Good for the Planet — [2–3 suburb-specific examples]
🤲 Good for People — [2–3 suburb-specific examples]
🥘 Eat Good — [2–3 suburb-specific examples]
🎨 Stay Local — [2–3 suburb-specific examples]
🔍 Surprise Me — cast the net wide, best of all of the above
```

**Examples of what this looks like done right:**

Frankston:
> 🌍 **Good for the Planet** — Westernport wetland groups, beach clean crews, Peninsula land care orgs
> 🤲 **Good for People** — mental health services on the strip, First Nations-led orgs on the Peninsula, youth employment programs
> 🥘 **Eat Good** — community gardens in Frankston South, food rescue near the foreshore, ethical seafood
> 🎨 **Stay Local** — Frankston Arts Centre community programs, independent music venues, local maker spaces
> 🔍 **Surprise Me** — cast the net wide, best of all of the above

Fitzroy:
> 🌍 **Good for the Planet** — repair cafés, zero-waste grocers, op shops that actually give back on Smith St
> 🤲 **Good for People** — social enterprises employing people doing it tough, community legal centres, training programs
> 🥘 **Eat Good** — urban farms, food co-ops, community fridges, hospitality with a purpose
> 🎨 **Stay Local** — independent galleries, First Nations cultural orgs, grassroots music studios
> 🔍 **Surprise Me** — cast the net wide, best of all of the above

Brunswick:
> 🌍 **Good for the Planet** — bulk food stores on Sydney Rd, repair shops, composting collectives
> 🤲 **Good for People** — multicultural community orgs, refugee employment programs, community language schools
> 🥘 **Eat Good** — Ceres Community Environment Park, community gardens, ethical produce markets
> 🎨 **Stay Local** — community radio, artist-run spaces, grassroots music and zine culture
> 🔍 **Surprise Me** — cast the net wide, best of all of the above

**Rules:**
- Labels are fixed — never rename or rephrase them
- Descriptions must be suburb-specific — generic descriptions are the failure state
- If you don't know the suburb well enough to write specific examples, say so and search first
- Each description: 2–3 examples, comma-separated, plain language, no jargon

Present as a clean formatted list. Ask them to pick one (or multiple, or Surprise Me). Wait for their answer.

---

## Step 3 — Research

Aim for depth. Find 5 strong candidates, verify all, present the best 3–5 in cards.

### Search strategy

**Round 1 — Discovery (4–5 searches)**

Use the suburb/postcode as the primary anchor. Search tight, then broaden if needed:

```
"[suburb]" OR "[postcode]" [focus keywords] grassroots community 2024 OR 2025
"[suburb]" social enterprise OR ethical business local independent
"[suburb]" [focus] volunteer OR events OR "open to the public"
"[suburb]" "not for profit" OR "community owned" OR cooperative OR "social enterprise"
"[suburb]" community garden OR food rescue OR repair café OR [other focus-specific terms]
```

If suburb returns thin results, broaden to the municipality or region (e.g. "Frankston" → "Mornington Peninsula", "Fitzroy" → "inner north Melbourne").

**Round 2 — Verify each candidate (web_fetch their site)**

For each promising candidate, fetch their actual website or a detailed profile. Confirm:
- Still actively operating
- Genuinely independent (not a franchise, not purely council-run unless community-licensed)
- Clear, specific community benefit — not vague marketing
- At least one concrete way a regular person can engage: buy, volunteer, attend, donate, refer

**Filtering rules — hard no if:**
- Part of a national or multinational chain
- Sustainability or social claims are marketing with zero substance
- No way for a regular person to engage
- Closed, dormant, or relocated out of area

**Target:** 5 candidates researched. Present the strongest 3–4 in cards. If a 5th is borderline-good, offer it via the expansion hatch.

---

## Step 4 — Present Results

Render results as a `visualize:show_widget` card layout using the DGS Visual Spec below. Cards stack vertically in chat. No artefact, no tabs — just the cards, then the map.

**Each card includes:**

1. **Name + category emoji** — bold, prominent
2. **Category label** — one of the five fixed labels in orange
3. **The one-liner** — what they do, plain English, max 2 sentences. Alive, not corporate.
4. **Why it matters** — the specific concrete good they create. A stat or a fact, not a vibe. E.g. "Kept 4 tonnes of food out of landfill this year" not "they care about the environment."
5. **How to get involved** — 2–3 specific actions drawn from what they actually offer:
   - 🛒 Shop / visit: [address or link]
   - 📅 Next event: [date/detail if found]
   - 🙋 Volunteer: [how to sign up]
   - 🤝 Support their partners: [partner org if relevant]
6. **Website** — shown as a clean URL, no https://
7. **Confidence flag** — if limited web presence or older info: ⚠️ *Worth calling ahead.*

After the cards, use `places_search` + `places_map_display_v0` to show all results on a map.

---

## Step 5 — Expansion hatch

After the map, always offer in plain text:

> **Want more?**
> - "Go deeper on [name]" — events, volunteer contacts, partner orgs
> - "Different focus" — try another category
> - "Broaden the search" — nearby suburbs or the wider area
> - "What else did you find?" — surface the 4th/5th candidate

---

## DGS Visual Spec

Every rendered widget must use this identity exactly.

### Palette
```
--dgs-black:   #1C1C1A   /* background */
--dgs-cream:   #F2EDE4   /* primary text */
--dgs-orange:  #E04E1E   /* accents, category tags, CTAs */
--dgs-grey:    #2E2E2C   /* card borders, secondary surfaces */
--dgs-muted:   #8A8880   /* secondary text */
```

### Typography
- **Headings:** `'Barlow Condensed', sans-serif` — weight 700–800, uppercase. Bold, tight, high-impact.
- **Body:** `'DM Sans', sans-serif` — weight 400–500. Clean, warm, readable.
- Load both from Google Fonts.

### Card anatomy
- Dark background (`--dgs-black`), cream text (`--dgs-cream`)
- Top-left: emoji (1.8rem) + orange category tag (Barlow Condensed, uppercase, bordered)
- Business name: Barlow Condensed 800, 1.3rem, cream, uppercase
- One-liner: DM Sans 400, 0.88rem, cream at 75% opacity
- Why it matters: DM Sans 500, 0.82rem, orange — stat or fact, prefixed with ↳
- How to engage: pill tags, `--dgs-grey` background, cream text, 0.75rem
- Website: muted, 0.72rem, no https://
- Confidence flag: ⚠️ amber, 0.72rem, inline

### Layout
- Cards stack vertically, full width
- 14px gap between cards
- Border: `1px solid --dgs-grey`, no shadows
- Grain texture overlay on background (CSS SVG filter, opacity ~0.45)
- Mobile-first

### UI copy tone
- Category tags: exactly as defined — "Good for the Planet", "Good for People", "Eat Good", "Stay Local"
- Confidence flag: "⚠️ Worth calling ahead to confirm they're still running."
- No corporate language anywhere in the UI

---

## Scaling path

**Current:** Melbourne suburb/postcode level. Category language adapts to what Claude knows about each suburb.

**Melbourne rollout:** As the pilot expands (Fitzroy → Brunswick → Footscray → St Kilda per the deck), the skill needs no changes — suburb-aware language adapts automatically.

**Australia:** Same structure. Broaden suburb → city if results are thin.

**Global:** 
- Use local-language search terms alongside English
- Adapt category language to local equivalents
- Flag when indexed results are thin: *"Results may be limited here — local directories in this region aren't well indexed. Here's what I found."*
- No structural rewrite needed — only search language and cultural framing localises.

