# Just Do Good Sh*t — UI & Brand Guidelines

A civic brand platform for Melbourne CBD. This document covers everything you need to build the platform UI, marketing collateral, and physical signage in a consistent voice.

> **Aesthetic in one line:** Bold Melbourne street poster — heavy condensed display type on warm cream paper, with one hot coral accent doing all the heavy lifting.

---

## 1. Voice & Tone

The name does most of the work. The voice should sound like a Melbourne local talking, not a council brochure or a startup pitch.

| Do | Don't |
|---|---|
| Direct, plainspoken, a bit cheeky | Charity-speak, "thoughts and prayers" energy |
| Short sentences. Confidence. | Long, hedged sentences |
| Honest about the problem | Sanitising the problem |
| Specific (names, places, amounts) | Vague "communities" and "stakeholders" |
| Imperative occasionally — "Just do it" | Corporate jargon, MBA-speak |

The asterisk in **Sh*t** stays. Always. It's the brand mark. Don't soften to "Stuff" or expand to the full word.

---

## 2. Colour Palette

**Light backgrounds only.** The platform lives on warm cream paper. Dark surfaces are used sparingly for individual cards, badges, or pull-quotes — never as a default canvas.

### Core palette

| Token | Hex | OKLCH | Use |
|---|---|---|---|
| `--paper` | `#F2EDE3` | `oklch(94% 0.014 75)` | Default page background |
| `--paper-2` | `#E8E0D0` | `oklch(89% 0.022 80)` | Secondary surfaces, cards, placeholders |
| `--ink` | `#1C1A17` | `oklch(20% 0.005 60)` | All primary text, rules, borders |
| `--ink-2` | `#2A2722` | `oklch(25% 0.006 60)` | Body copy on cream when ink feels too heavy |
| `--muted` | `#6B655A` | `oklch(48% 0.012 75)` | Captions, page numbers, metadata |
| `--coral` | `#E84E1B` | `oklch(63% 0.21 38)` | The one accent. Use it like punctuation. |

### Accent rules

- **One accent at a time.** Coral is the only accent. Resist adding a "secondary brand colour" — the palette's strength is its restraint.
- Coral is used for: the asterisk in the wordmark, key emphasised words in body copy, eyebrow labels, the circular badge ring, leaderboard rank "1", live impact counters, and a single CTA per screen.
- Never coral-on-coral. Never coral text on coral fill. Coral always sits on cream or ink.

### Dark surfaces (sparing use)

When a card or callout needs to feel weighty (a closing line, a hero stat, a single feature spotlight), invert: `--ink` background with `--paper` text and `--coral` accents. **No page-level dark mode.** The platform is a cream paper product.

---

## 3. Typography

Three faces. Each has one job. Don't mix them up.

### Faces

| Family | Role | Source |
|---|---|---|
| **Anton** | Display — all titles, the wordmark, numbers, anything you want loud | Google Fonts |
| **Space Grotesk** | Body — paragraphs, lists, UI labels, buttons | Google Fonts |
| **Instrument Serif (italic)** | Emotional / narrative moments — the human story, quotes, taglines | Google Fonts |
| JetBrains Mono | Supporting — eyebrows, metadata, page numbers, code | Google Fonts |

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type scale (platform UI, screen 1280–1920px wide)

| Token | Size | Use |
|---|---|---|
| `--type-display` | 160–240px | Wordmark, hero numbers, big single statements |
| `--type-title` | 64–96px | Section headers, page titles |
| `--type-subtitle` | 44–60px | Sub-headers, callouts |
| `--type-body` | 28–32px (deck) · 16–18px (web/app) | Body copy |
| `--type-small` | 24–26px (deck) · 13–14px (web/app) | Metadata, captions |

### Rules

- **Anton is always uppercase or sentence-case headlines, never paragraph copy.** Tight letter-spacing (`-0.015em`), tight line-height (`0.86–0.98`).
- **Italic serif is reserved for narrative.** Don't use it as a generic "fancy" style. It's the voice of the human story — Jamie's story, customer quotes, taglines.
- **Mono is for labels above titles** ("EYEBROW · LIKE · THIS · IN COLOR") and metadata at the bottom of cards. 0.10–0.18em letter-spacing, uppercase.
- **One italic emphasis per paragraph max.** It's a spice, not a sauce.

---

## 4. The Circular Badge

The brand mark. A physical and digital object — it appears on shopfronts, menus, websites, and social profiles.

```
Specs:
- Perfect circle, 2px stroke in --ink (or --paper on dark)
- Core text "DO / GOOD / SH*T" stacked, centred, Anton 44px @ 220px badge
- The * in "SH*T" is coral
- Optional rim text in JetBrains Mono uppercase (only at print sizes ≥ 80mm — too small on screen)
- Renews annually; year discreet at bottom of rim
```

### Where it appears

- Shopfront sticker (window decal, 100mm diameter)
- Business profile header on the platform
- Menu corner / receipt footer
- Social profile picture for participating businesses
- Award medals (gold/silver/bronze coral variants for Hero Award tiers)

---

## 5. Layout Principles

### Grid

- **Web/app:** 12-column, 1280px max content width, 24px gutter
- **Marketing/posters:** 16:9 cream canvas, generous edge padding (110px at 1920×1080)
- **Mobile:** single column, 20px edge padding

### Whitespace

Generous. The deck uses `--pad-x: 110px` and `--pad-y: 90px` on every slide. Web should feel similarly breathable — when in doubt, more padding. Cream paper needs room to breathe; cluttered cream feels like a flyer.

### Hierarchy pattern (repeats everywhere)

```
[eyebrow in mono, coral]            ← small, uppercase context label
[Anton title, ink]                  ← the headline, large
[Instrument Serif italic, muted]    ← optional narrative line
[body copy or content blocks]       ← actual content
```

This four-tier pattern repeats on every screen and every slide. Don't invent new hierarchy patterns — extend this one.

---

## 6. Components

### Buttons

- **Primary** — coral fill, ink text, no border, 100px border-radius (full pill), Anton or Space Grotesk Bold uppercase, 18–20px
- **Secondary** — transparent fill, 2px ink border, ink text, same pill shape
- **Tertiary** — text-only with underline on hover, ink colour

Always one primary per screen. Coral CTAs compete with each other — pick the winner.

### Cards

- 2px solid `--ink` border, 14–16px border-radius, `--paper` background, 24–32px internal padding
- No drop shadows. The border carries the weight.
- Card header pattern: mono tag → Anton h4 → Space Grotesk body
- Hover (web): subtle 4px translateY upward, no shadow change

### Form inputs

- 2px `--ink` border, no fill (transparent on `--paper`), 12px radius, 16–18px padding
- Focus: border becomes coral, 2px → 3px
- Label in JetBrains Mono uppercase above the field
- Error states: coral border, coral helper text below

### Lists & bullets

- Prefer numbered (`01`, `02`, `03` in mono, coral, with leading zero) over bulleted
- Vertical dividers between items: 1px `rgba(28,26,23,0.18)` (ink at 18% opacity)
- Generous row padding (16–24px)

### Tables

- No vertical lines. Horizontal 1px ink-18% dividers only.
- Header row: Anton small caps or JetBrains Mono uppercase, ink colour
- Numeric columns right-aligned with tabular figures (`font-variant-numeric: tabular-nums`)

### Impact counters

The platform's signature element — live numbers showing collective contribution.

- Number in Anton, 96–160px, coral colour
- Label below in JetBrains Mono uppercase, ink colour, 0.14em letter-spacing
- Animate count-up on view (300–600ms ease-out)

### Leaderboard rows

- Rank in Anton 48px (coral for #1, ink for #2–10, muted for #11+)
- Business name in Anton 32px
- Contribution metric on the right in tabular mono
- 2px ink horizontal divider below each row

### Map markers

- Circular pin in coral fill, 2px ink border, 32px diameter
- Selected: 48px, coral fill stays, ink ring expands to 4px
- Filter chips above map: pill-shaped, mono uppercase labels

---

## 7. Imagery

### Photography

- Documentary, on-the-ground, Melbourne-CBD-specific. Not stock photography.
- Subjects: real businesses, real laneways, real people (with consent and proper attribution)
- Treatment: natural light, warm tones, no heavy filters. Should sit comfortably next to the cream paper.
- Crop tight. Faces close. Hands at work. Steam from coffee. Dogs.

### Iconography

- Use line icons at 1.5–2px stroke weight, ink colour, never filled
- Recommended set: [Lucide](https://lucide.dev) or [Phosphor](https://phosphoricons.com) (regular weight)
- Glyph variants in Anton (★ ▲ ◐ ◉ ◇) are acceptable for feature labels when icons would feel too literal

### Illustration

- Avoid AI illustration entirely. If a moment needs imagery and you can't shoot it, commission a Melbourne illustrator (laneway poster aesthetic — bold, flat, two-colour ideal).

---

## 8. Motion

Restrained. Mostly used to confirm impact, not to decorate.

- **Standard ease:** `cubic-bezier(0.4, 0.0, 0.2, 1)`, 240ms
- **Slow ease (counters, big reveals):** `cubic-bezier(0.2, 0.0, 0.0, 1)`, 600ms
- **Hover transitions:** 160ms
- **Page transitions:** 280ms cross-fade or slide-up
- No bounce. No spring. No parallax.

Impact counters animate count-up. Coral underlines draw in on hover. That's about it.

---

## 9. Accessibility Floor

- Minimum body text: 16px on web, 24px on slides/posters
- Coral on cream: contrast ratio 4.6:1 — passes AA for large text, NOT for small body copy. **Never set body copy in coral.** Coral is for emphasis words and headings only.
- Coral on ink: contrast ratio 7.1:1 — passes AAA. Safe everywhere.
- Ink on cream: contrast ratio 14.8:1 — passes AAA. Default body combination.
- All interactive elements: minimum 44×44px hit target
- Focus states: 3px coral outline, 2px offset

---

## 10. File & Naming Conventions

- CSS variables exactly as specified above (kebab-case, `--paper`, `--ink`, etc.)
- Component class names: BEM-ish or utility-first, doesn't matter — pick one and stick with it
- The wordmark in code: `Just Do Good Sh*t` (asterisk preserved) or `JDGS` as short reference
- Never use the asterisk-replaced variant. If a platform/store rejects the asterisk in a name field, use `Just Do Good Sht` — never `Just Do Good Stuff`.

---

## 11. Quick-Reference CSS Variables

Drop this into your stylesheet root:

```css
:root {
  /* colour */
  --paper:     #F2EDE3;
  --paper-2:   #E8E0D0;
  --ink:       #1C1A17;
  --ink-2:     #2A2722;
  --muted:     #6B655A;
  --coral:     #E84E1B;

  /* type (web/app — scale up ~2x for posters/slides) */
  --type-display:  120px;
  --type-title:    56px;
  --type-subtitle: 36px;
  --type-body:     17px;
  --type-small:    14px;

  /* spacing */
  --pad-x: 32px;
  --pad-y: 40px;
  --gap-title: 32px;
  --gap-item:  16px;

  /* radius */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-pill: 100px;

  /* motion */
  --ease-std: cubic-bezier(0.4, 0.0, 0.2, 1);
  --dur-fast: 160ms;
  --dur-std:  240ms;
  --dur-slow: 600ms;
}
```

---

## 12. What This Brand Isn't

Useful to be explicit about. The platform is **not**:

- A charity (don't use halos, hands-joined imagery, or "help us help them" framing)
- A council program (no civic-blue, no gov.au stiffness, no Roboto)
- A startup (no gradient logos, no "we're on a mission to disrupt", no abstract geometric mascots)
- A food rescue org dressed up (we coordinate with them, we don't replicate their visual identity)

It's a Melbourne street-poster brand on a digital platform. If a screen could plausibly live as a printed A2 poster taped to a Brunswick laneway wall, it's on-brand.

---

*Prepared for the Just Do Good Sh*t platform build — Claude Impact Lab × City of Melbourne, May 2026.*
