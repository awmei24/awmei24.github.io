# Handoff: "The Garden Almanac" — amanda wang mei personal site redesign

## Overview
A refreshed visual direction for **amandawangmei.com** (repo: `awmei24/awmei24.github.io`). The redesign keeps the site's existing information architecture (About · Work · Hobbies · Writing · Contact) and its cream + sage palette, but elevates the look into an **editorial "field-journal / almanac"** system: warm serif display type, monospace chapter numbering, hairline ruled indexes, and a set of playful, garden-themed interactive easter eggs.

This direction is **"1A — The Garden Almanac"** from the exploration canvas. It was chosen over two alternatives (a retro-web "Handmade Zine" and a "Studio Grid" portfolio).

### Reference screenshots
See the `screenshots/` folder:
- `screenshots/1A-desktop.png` — full desktop homepage.
- `screenshots/1A-hero-detail.png` — hero close-up (nav, name, arched portrait frame, action links).
- `screenshots/1A-mobile.png` — mobile adaptation (stacked hero, portrait below name, tap-through index).

The content (bio, projects, experience, hobbies, links) is **unchanged and factual** — it already lives in `src/lib/content.ts`. This handoff is about presentation and interaction, not new content.

---

## About the Design Files
The files in this bundle are **design references created in HTML** (a streaming "Design Component" prototype). They show the intended **look and behavior** — they are **not** production code to copy directly.

The target codebase already exists and its stack is:
- **React 18 + TypeScript + Vite**
- **Tailwind CSS v4** (tokens declared with `@theme` in `src/index.css`)
- **framer-motion** for animation
- **react-router-dom** for routing

The task is to **recreate this design in that existing environment**, using its established patterns (Tailwind utility classes with the CSS variables already defined, framer-motion `motion.*` components, the existing `Container` / `Section` / `FadeIn` / `PageTransition` helpers, and the `content.ts` data layer). Do **not** paste the HTML in directly and do **not** introduce a new styling system.

`Redesign Directions.dc.html` opens in a browser (it needs the sibling `support.js` to render). Only the section with the badge **`1A`** is in scope; `1B` and `1C` are shown for context.

---

## Fidelity
**High-fidelity.** Colors, typography, spacing, and layout are final and should be recreated faithfully. Exact hex values, fonts, and measurements are documented below. The image areas are intentional **placeholders** (labeled "portrait" / "project screenshot") — the developer should wire in Amanda's real photos and project screenshots (assets already exist in `src/assets/`; project screenshots to be supplied).

---

## Design Tokens

### Colors
Preserve the existing tokens and **add two warm accents** (terracotta clay, which nods to Amanda's ceramics, and a soft ochre used sparingly).

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FAF9F7` | primary background |
| `parchment` | `#F2EFEA` | panels, cards, alternating sections |
| `ink` | `#1F1F1F` | primary text, dark footer, index top-rule |
| `stone` | `#4B4B4B` | body / secondary text |
| `sage` | `#93A985` | primary accent, underlines, arrows |
| `sage-light` | `#BAC8B1` | borders, tag outlines, ambient marks |
| `clay` **(new)** | `#C46A4E` | headline accent word, chapter numbers, "contact" nav, project year |
| `ochre` **(new)** | `#E3B23C` | one small floating decoration; use very sparingly |
| `night` | `#141412` | dark-mode background (existing) |
| `night-raised` | `#1e1d1a` | dark-mode raised surfaces (existing) |

Add to `@theme` in `src/index.css`:
```css
--color-clay:  #C46A4E;
--color-ochre: #E3B23C;
```

### Typography
Three families (currently the site uses only Plus Jakarta Sans). Load via Google Fonts.

| Family | Usage | Weights |
|---|---|---|
| **Newsreader** (serif) | display headlines, section titles, chapter labels, italic taglines & pull-quotes | 300, 400, 500; italics 300/400 |
| **Space Mono** (monospace) | eyebrows, chapter numbers (01–05), tags, nav links, metadata, captions | 400, 700 |
| **Plus Jakarta Sans** (sans) | body copy, descriptions | 300, 400, 500 (existing) |

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap
```

Type scale used in the mock (desktop → mobile):
- Hero name: `88px / weight 300 / line-height .92 / letter-spacing -.02em` → mobile `52px`. Last word ("mei") is **italic + clay**.
- Hero tagline: Newsreader italic `27px` → `18px`, color `stone`.
- Section titles ("a few places to wander."): Newsreader `36px` weight 300; the second clause is **italic + stone**.
- Chapter label (about/work/…): Newsreader `24px` → `19px`.
- Chapter number: Space Mono `13px`, color `clay`.
- Eyebrow / labels: Space Mono `12px`, `letter-spacing .22em`, `uppercase`, color `sage`.
- Body: Plus Jakarta Sans `15px / line-height 1.75`, color `stone`.
- Project title: Newsreader `26px` weight 400; tagline Newsreader italic `16px`.

### Spacing, radius, shadow
- Section horizontal padding: `56px` desktop / `22px` mobile.
- Hero vertical padding: `72px` top / `64px` bottom.
- Section vertical rhythm: `56–64px`.
- Card radius: `18px`; portrait uses an **arched** radius `180px 180px 20px 20px` (top corners fully rounded, like a garden gate / seed packet).
- Card border: `1px solid parchment` (`#E4DFD6` for the browser-chrome variant).
- Card fill: `parchment` on cream, or cream on parchment sections.
- Hover lift (reuse existing `.hover-lift`): `translateY(-4px) rotate(0.5deg)` + soft shadow, spring easing `cubic-bezier(0.34,1.56,0.64,1)`.
- Ambient shadow on framed blocks: `0 30px 60px -24px rgba(31,31,31,.28)`.

### Ornaments
- Floral divider = a hairline rule with a centered `❋` glyph in `sage` (Newsreader). Reuse the existing `FloralDivider` component.
- Small floret badge: circle in `ochre` with `✿` in Newsreader italic.

---

## Screens / Views

The site keeps its existing pages/routes. This spec details the **Home** page in full (the primary redesign surface); the same system (serif titles, mono eyebrows, ruled indexes, clay accent, arched image frames) carries to About, Work, Hobbies, Writing, and Contact.

### Home (`/`) — `src/pages/HomePage.tsx`

**Purpose:** first impression; introduce Amanda, route to the five chapters, preview selected work.

**Layout (top → bottom):**

1. **Nav** (existing `Nav.tsx`, restyle)
   - Fixed, transparent → cream/blur on scroll (keep existing behavior).
   - Left: 22px sage circle logo dot + "amanda wang mei" in **Newsreader 18px**.
   - Right: nav links in **Space Mono 12px**, `letter-spacing .06em`, color `stone`; "contact" in `clay`. Links: about · work · hobbies · writing · contact.

2. **Hero** — 2-column grid `1.4fr / 1fr`, `gap 56px`, vertical center, `min-height ~92dvh`.
   - **Left column:**
     - Eyebrow: `los angeles, ca ✦ open to opportunities` (Space Mono, sage, uppercase, `.22em`).
     - Name: `amanda / wang mei` (Newsreader 300, 88px, `.92` line-height); "mei" italic + clay.
     - Tagline: *quietly building thoughtful things.* (Newsreader italic 27px, stone).
     - Sub: "designer & engineer turning raw data into things people actually understand — with ceramics, writing, and code on the side." (Plus Jakarta 15px, stone, max-width 440px).
     - Actions (Space Mono 13px): filled ink pill "view work ↓"; two sage-underlined text links "about me", "say hello".
   - **Right column:** arched portrait frame (`aspect 4/5`, radius `180px 180px 20px 20px`, `1.5px sage-light` border, parchment + diagonal-stripe placeholder). Ochre floret badge (`✿`) overlapping bottom-left. **This is where easter egg #1 (watering can + sprout) lives** — see Interactions.
   - Ambient botanicals (existing `Botanical` SVGs — `LeafSprig`, `Sprout`, `TinyMushroom`) float at low opacity in the corners (keep existing framer-motion entrance).
   - Scroll hint bottom-left (existing).

3. **Chapter index** — the signature "almanac" element. Full-width, cream.
   - Header row: `a few places to wander.` (Newsreader; "to wander." italic stone) on the left; Space Mono "index" label on the right.
   - A table-like list with a **1px ink top rule**, then five rows, each separated by a `1px #E4DFD6` hairline.
   - Row grid: `64px / 200px / 1fr / 30px` = [mono number] [serif label] [description] [→ arrow].
   - Rows (from `chapters` in content.ts):
     - `01  about` — who i am, where i've been, what i care about.
     - `02  work` — product and engineering case studies.
     - `03  hobbies` — a peek into how i spend my time outside of work.
     - `04  writing` — essays, notes, and half-formed thoughts.
     - `05  contact` — let's talk about something interesting.
   - Numbers in `clay`; arrows in `sage`. On row hover: background warms to `parchment`, arrow slides right `4px`, label color → sage (reuse hover-lift feel but as a row, no rotate).

4. **Selected work** — cream, `56px` padding.
   - Eyebrow "selected work" (Space Mono, sage).
   - 2-column card grid (`gap 24px`), from `projects.filter(p => p.featured)`:
     - **social energy tracker** — year `apr 2026` (clay, mono); title (Newsreader 26px); tagline *a tool for understanding your own social patterns over time.* (Newsreader italic); tags `ui/ux design`, `data analysis`, `self-reflection` as sage-light outlined mono pills.
     - **weather buddy** — `mar 2026`; *hyperlocal weather with mood-aware framing.*; tags `react`, `api`, `visual design`.
   - Cards: parchment fill, `18px` radius, `1px` border; apply `.hover-lift`.

5. **Footer** — ink (`#1F1F1F`) band, `36px` padding.
   - Left: link row in Space Mono 12px, `sage-light`: email · linkedin · github · instagram · substack (real URLs below).
   - Right: *designed & built in the garden ✦* (Newsreader italic, sage).

**Responsive (mobile ≤ 640px):**
- Nav collapses to the existing hamburger overlay.
- Hero becomes single column: eyebrow → name (52px) → tagline → **portrait drops below the name** (radius `24px`) → the chapter index.
- Chapter index becomes a compact tap-through ruled list (number + label per row; description can hide or wrap).
- Selected-work grid stacks to 1 column.

---

## Interactions & Behavior — Garden Easter Eggs

Nine interactive touches were selected. Build them **progressively enhanced** and **all gated behind `prefers-reduced-motion: no-preference`** (skip or reduce for users who opt out). Prefer framer-motion for spring/tween animation; use small dedicated components/hooks. Persist state where noted with `localStorage` (namespace keys like `awm:garden:*`).

### 1. Water the plant 🌱 (signature interaction)
- **What:** a small **sprout** sits at the base of the hero portrait, with a **watering can** icon resting nearby. The user drags the watering can over the sprout; while "pouring," animated water droplets fall and the sprout **grows and blooms** (scale + new leaves/flower) with a springy wobble.
- **Placement:** hero, bottom-left of the portrait cluster (near the existing ochre floret).
- **Mechanics:** pointer-drag (mouse + touch) on the can. Hit-test the can against the sprout's bounds; when overlapping, play the pour animation and advance growth. Growth can be staged (seedling → sprout → bloom) or single-shot.
- **Feedback:** on full bloom, a tiny message/tooltip like "🌿 thanks for tending" or a floret puff.
- **Persistence:** remember bloomed state in `localStorage` (`awm:garden:watered`) so it stays grown on return; offer a subtle "reset" (e.g. clicking the bloom) so it's replayable.
- **Reduced motion:** allow a single click on the can to grow the plant instantly with a fade, no drag/droplets.
- **A11y:** the can is focusable; Enter/Space triggers watering. `aria-label` on both can and plant; announce growth via `aria-live` politely.

### 2. Plant a garden as you scroll
- **What:** a persistent **garden strip** along the bottom edge. Each chapter/section the visitor scrolls into "sprouts" a new little plant in the strip, so by the footer a full row has grown (one plant per section: about, work, hobbies, writing, contact).
- **Mechanics:** `IntersectionObserver` (or framer-motion `whileInView`) per section; first time a section enters view, append/reveal its plant with a grow-in spring. Each section maps to a distinct botanical (reuse `LeafSprig`, `Sprout`, `TinyMushroom`, plus 2 new simple marks).
- **Persistence:** optional — reset per visit is fine (it's a scroll reward). If persisted, key `awm:garden:grown` (array of section ids).
- **Placement:** fixed bottom strip, low z-index, non-interactive, `sage`/`sage-light` tones, low opacity so it never competes with content.
- **Reduced motion:** plants appear (opacity) without the grow animation, or the strip is omitted.

### 3. Falling leaves / petals cursor trail
- **What:** subtle sage-toned leaf/petal particles gently trail the cursor and drift down.
- **Mechanics:** on `pointermove`, spawn a lightweight particle (throttled, e.g. every ~80ms; cap active particles ~12) that falls + fades over ~1.2s with slight sway/rotation. Use a single fixed overlay layer, `pointer-events:none`, GPU transforms only.
- **Tone:** `sage` / `sage-light`, small (10–16px), opacity ≤ .5 — ambient, never distracting.
- **Perf:** disable on touch devices (no hover); cap particle count; use `requestAnimationFrame`.
- **Reduced motion:** disabled entirely.

### 4. Living botanicals (sway on hover / breeze)
- **What:** the decorative botanical marks (hero corners, dividers, the ochre floret) **sway gently** as if in a breeze, and react on hover (a stronger wobble/tilt).
- **Mechanics:** ambient idle sway via framer-motion `animate={{ rotate: [-2,2,-2] }}` with slow `repeat: Infinity, ease: easeInOut` (extend the existing hero decoration animation). On hover, spring to a bigger tilt/scale. Vary duration per element (4–6s) so they're not in lockstep.
- **Reduced motion:** hold a static resting angle; no idle loop.

### 6. Hover-to-bloom links
- **What:** hovering a nav link or in-text link sprouts a tiny flower/leaf glyph at the link (or grows the existing sage underline into a small bloom at the end).
- **Mechanics:** extend the existing `.link-sage` animated underline. On hover, in addition to the underline growing (existing), fade/scale-in a small `sage` floret (`❋`) just after the text, or a leaf at the underline's leading edge. Keep it ~150–200ms, spring.
- **Scope:** nav links + hero action links + any inline links.
- **Reduced motion:** keep the underline, drop the bloom pop (or fade with no scale).

### 7. Secret "grow" word (Konami-style)
- **What:** typing a hidden word triggers a full-page bloom celebration.
- **Trigger:** listen for the typed sequence **`grow`** (also accept `ceramics` as a bonus). Track recent keystrokes in a ring buffer; match ignoring case; ignore when focus is in an input/textarea.
- **Payload:** a burst of petals/leaves across the viewport + a brief hidden note from Amanda (e.g. an italic Newsreader line: "you found the garden 🌿 — thanks for looking closely.") that fades in center-screen then out. Optionally nudge every on-page botanical to bloom at once.
- **Persistence:** none required (it's a repeatable delight); optionally set `awm:garden:secretFound` to show a tiny persistent sprout badge in the footer afterward.
- **Reduced motion:** show the note (fade only), skip the petal burst.
- **A11y:** purely additive; never traps focus; note is `aria-live`.

### 8. The pottery wheel (ceramics nod)
- **What:** a small **ceramic bowl / wheel** icon; clicking it spins a pottery wheel that "throws" a little pot shape (a nod to Amanda's ceramics hobby).
- **Placement:** near the Hobbies chapter row, or as a small fixed corner charm; alternatively on the Hobbies page hero.
- **Mechanics:** click → the wheel disc rotates (continuous spin while held/for a few seconds) and a pot silhouette morphs/rises (scale-y + subtle path/clip change). Ends in a finished little pot with a soft "done" settle. Repeatable.
- **Persistence:** none (playful, replayable).
- **Reduced motion:** click swaps directly to the finished pot with a fade; no spin.
- **A11y:** focusable button, `aria-label="throw a pot"`.

### 9. Idle critter
- **What:** if the visitor is idle for a while (~30–45s, no mouse/scroll/key), a small **snail** (or ladybug) slowly crawls across the bottom of the screen, then leaves.
- **Mechanics:** reset an idle timer on `mousemove`/`scroll`/`keydown`; on timeout, animate the critter from one edge to the other over ~10–15s along the bottom (or a section edge), then remove. Reappears after subsequent idle periods (throttle so it's rare/charming, not constant).
- **Tone:** small, `stone`/`sage`, low opacity, `pointer-events:none`.
- **Reduced motion:** disabled.

### 11. Rotating margin notes (almanac marginalia)
- **What:** small hand-written-feeling **italic asides** in the margin, like almanac marginalia, that **change each visit / rotate**. Content ideas: a seasonal note, "currently reading…", "on the wheel: a tea bowl", "today in LA it's ___", a tiny thought.
- **Mechanics:** a curated array of short strings (in a `marginNotes` array, ideally added to `content.ts` so Amanda can edit them). Pick one at random (or by day-of-year) on load; render in Newsreader italic, `stone`, small, in the hero or section margins. Optionally cross-fade to a new one every ~20s.
- **Placement:** left/right margin of the hero or beside the chapter index (there's already an italic margin quote pattern on the About page — reuse that treatment).
- **Reduced motion:** static single note, no cross-fade.

> **General easter-egg guidance:** keep them *quiet by default* — nothing should block reading, shift layout, or hurt performance. All particle/critter/trail layers are fixed, `pointer-events:none`, and capped. Everything must respect `prefers-reduced-motion`. Consider a single shared `useReducedMotion()` (framer-motion) check and a tiny `GardenContext` if state needs to be shared (e.g. "water the plant" unlocking the footer sprout badge).

---

## State Management
Mostly local component state + a few persisted flags. Suggested:

| State | Where | Trigger | Persist |
|---|---|---|---|
| `watered` (plant growth stage) | Hero / watering-can component | drag can over sprout (or click, reduced-motion) | `awm:garden:watered` |
| `grownSections` (scroll garden) | layout-level or `GardenContext` | section enters viewport | optional `awm:garden:grown` |
| `secretFound` | app-level | typing `grow`/`ceramics` | optional `awm:garden:secretFound` |
| `potThrown` | pottery-wheel component | click | none |
| `isIdle` | idle-critter hook | inactivity timer | none |
| `currentMarginNote` | margin-note component | load / interval | none |
| cursor particles | trail overlay | pointermove | none |

No data fetching required — all content is static in `src/lib/content.ts`. (Consider adding `marginNotes: string[]` there for easter egg #11.)

---

## Content & Assets

**Do not change the copy** — it's already correct in `src/lib/content.ts`:
- `bio` (name, tagline "quietly building thoughtful things.", location "los angeles, ca", 3 about paragraphs, `available: true`)
- `projects` (social energy tracker, weather buddy — both `featured`)
- `experience` (Terracotta Group; MIT B.S. Biological Engineering)
- `hobbies` (ceramics, dancing, writing)
- `posts` (substack updates)
- `chapters` (01–05 index)

**Real links (already in the codebase):**
- Email: `amandawangmei.design@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/amandawangmei/`
- GitHub: `https://github.com/awmei24/`
- Instagram: `https://www.instagram.com/amand.amei/`
- Bluesky: `https://bsky.app/profile/amandawangmei.bsky.social`
- Substack: `https://amandawangmei.substack.com`
- Résumé (Google Drive): existing link in `AboutPage.tsx`

**Assets:**
- Portrait images already exist: `src/assets/self.png`, `self (1).png`, `self_portrait.png`, and `about.jpg` (referenced by pages). Logo: `src/assets/logo.png` / `public/logo.png`.
- Image areas in the mock are **placeholders** — replace with the real portrait (arched frame) and real project screenshots (to be supplied by Amanda).
- New simple botanical SVG marks for easter eggs #2 (garden strip) can extend the existing `src/components/decorative/Botanical.tsx`. Keep them simple and hand-drawn in feel; avoid overly detailed illustration.

---

## Files in this bundle
- `README.md` — this document (self-sufficient spec).
- `screenshots/1A-desktop.png`, `screenshots/1A-hero-detail.png`, `screenshots/1A-mobile.png` — rendered references of the chosen direction.
- `Redesign Directions.dc.html` — the HTML design reference. Open in a browser (needs `support.js` beside it). Only the **`1A`** section is in scope; `1B`/`1C` are alternative directions shown for context.
- `support.js` — runtime required to render the `.dc.html` file.

## Implementation checklist (suggested order)
1. Add `clay` + `ochre` tokens and the Newsreader + Space Mono font links; set up the type styles.
2. Restyle `Nav`, `HomePage` hero, chapter index (the ruled almanac list), selected-work cards, and footer to match 1A.
3. Carry the system to About / Work / Hobbies / Writing / Contact (serif titles, mono eyebrows, clay accent, arched image frames).
4. Add a `useReducedMotion` gate + optional `GardenContext`.
5. Build easter eggs in priority order: **#1 water the plant** → **#2 scroll garden** → **#4 living botanicals** & **#6 hover-to-bloom** (cheap, extend existing) → **#3 cursor trail** → **#11 margin notes** → **#7 secret word** → **#8 pottery wheel** → **#9 idle critter**.
6. Swap placeholders for real portrait + project screenshots.
