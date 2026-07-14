# Open Items

## Content still to write / assets to upload
- Margin notes (marginNotes in content.ts) — There are currently 5 placeholder notes; one literally says "currently reading: (add your book here)". Replace with your own.
- Project screenshots — the spec says these are "to be supplied." Both projects have no caseStudy.images, and the case studies themselves (overview/sections) are still unwritten, so /work/:id pages show the "check back soon" placeholder.
- Hobby photos — every ceramics and dancing item in content.ts has no image/images, so gallery cards show the leaf placeholder and the lightbox never has anything to open.
- Logo files — the nav now uses the spec's sage dot, so src/assets/logo.png is unused (safe to delete), but public/logo.png is still the favicon; supply a new one if you want it to match.
- Decide: the spec's footer link row includes substack but not bluesky; the contact page still lists bluesky. Tell me if you want them consistent.

## From the design audit (assets only you can supply)
- **Favicon-scale monogram** (audit 1.1) — the nav now renders the AWM mark at 36px, but the audit also asks for a simplified redraw (fewer strokes, thicker weight) for anywhere it appears below ~32px — e.g. the favicon. One drawing can't work at every size.
- **Plainer-background portrait** (audit 5.2) — the current hero photo is itself a detailed garden scene, which competes with the site's line-art garden motifs. Consider a portrait with a calmer background; the ambient botanicals have been moved off the photo's edge in the meantime.
- Note: the nav monogram (`public/logo.png`) sits in a light box that's visible over the dark contact page — worth exporting with a transparent background if that bothers you.

## Icons to hand-draw

All are currently code-drawn SVGs (thin strokes, `currentColor`) in
`src/components/decorative/Botanical.tsx` unless noted. Replacements should be
single-color line drawings that inherit `currentColor`, exported as SVG with the
same square-ish viewBox proportions, transparent background, no embedded raster.
They render from ~12px up to ~100px, so keep linework simple enough to survive small sizes.

### Botanical set (`Botanical.tsx`)
1. **LeafSprig** — a rounded leaf outline with a center vein and four side veins. The workhorse: hero corners on every page (home + all page headers), the accent hovering beside both portraits, empty gallery-card placeholder, contact-page corners, scroll-garden plant for "about". Shown at 36–100px.
2. **TinyMushroom** — a round-capped mushroom with three spots and a two-line stem. Ambient decoration on home hero, hobbies hero, contact page; scroll-garden plant for "hobbies". 32–60px.
3. **Sprout** — a single stem with two opposing leaves rising from a short ground line. Home hero ambient, About "experience" column accent, the empty-case-study placeholder on project pages, the tiny footer badge after finding the secret word, scroll-garden plant for "writing". 14–64px.
4. **SmallLeaf** — a simple single leaf with one vein. Appears on work-card hover (top corner) and as the falling cursor-trail particle. Rendered tiny (12–22px) — keep it one or two strokes.
5. **FloralDivider** — a 120×20 horizontal hairline rule with a small five-dot floret at center. Used as the section divider on about/writing/hobbies/project pages. Wide format; redraw at the same 6:1 ratio.
6. **Fern** — a curved frond with three pairs of leaflets. Scroll-garden plant for "work". ~22–36px.
7. **WildFlower** — a six-petal daisy on a stem with one leaf. Scroll-garden plant for "contact". ~22–36px.

### Easter-egg inline SVGs
8. **Watering can** (`garden/WaterThePlant.tsx`) — side-view can with arc handle and long spout; two animated droplet circles fall from the spout while pouring (keep the droplets as separate circle elements so the animation can target them). ~44px wide.
9. **Growing plant, 3 stages** (`garden/WaterThePlant.tsx`) — one drawing per growth stage, layered in a single 52×56 frame over a soil mound: (a) seedling nub with one tiny leaf, (b) taller stem with two leaves, (c) six-petal bloom on top. Stages b/c must sit above stage a without overlapping it awkwardly, since they reveal cumulatively.
10. **Pottery wheel + pot** (`garden/PotteryWheel.tsx`) — a flat wheel disc (ellipse) on a stand, with a pot silhouette (rim, belly) sitting on it. The pot and the disc must remain **separate groups** — the pot squash-stretches and the disc spins. ~56px.
11. **Snail** (`garden/IdleCritter.tsx`) — side-view snail: spiral shell, low body, two eye-stalk antennae. Crawls across the screen bottom at ~34px wide; drawn in low-opacity stone.

### Glyph "icons" (typed characters, optional to replace)
These are Unicode glyphs today; replacing them means swapping a character for a small inline SVG:
12. **❋ link bloom** (`index.css`, `.link-sage::after`) — pops in above link ends on hover. Currently a CSS `content` character; an SVG version would need a small markup change (background-image data-URI or a component). ~8px.
13. **✿ floret badge** (`garden/FloretBadge.tsx`) — the flower inside the ochre circle overlapping the portrait. ~20px.
14. **Petal burst set** (`garden/SecretBloom.tsx`) — ❋ / ✿ / 🍃 falling during the secret-word celebration; 3 small shapes, 14–26px.
15. **✦ sparkle separators** — hero eyebrow ("los angeles, ca ✦ open…"), hobbies section bullets, contact/footer sign-offs. Smallest and most typographic; fine to leave as text.
16. **✎ margin-note pencil** (`garden/MarginNote.tsx`) — prefix before the rotating marginalia line.

### Functional icons (out of scope unless you want a full set)
- → arrows (chapter index rows, buttons, lightbox prev/next), ✕ lightbox close, ▾ nav dropdown caret, résumé link arrow (`AboutPage.tsx`). These are UI affordances, not decoration — replace only if you want the hand-drawn feel everywhere.
