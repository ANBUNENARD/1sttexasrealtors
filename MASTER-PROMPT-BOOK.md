# 🎯 1st Texas Realtors — MASTER PROMPT BOOK
### Every instruction that works, compiled for re-prompting (DeepSeek V4 Flash)

> **How to use:** For any new session, paste **Section 0 (Master Context)** FIRST, then add the section(s) you want to work on. Each section is a self-contained prompt that produced the exact result described. Sections marked ✅ are DONE and deployed — re-prompting them recreates/verifies that feature.

---

## SECTION 0 — MASTER CONTEXT (ALWAYS PASTE FIRST)

```
You are rebuilding/editing the 1st Texas Realtors website. Local project at
C:\Users\Leo\Downloads\texas (Windows). Repo: github.com/ANBUNENARD/1sttexasrealtors
(branches: main + vercel/react-server-components-cve-vu-a6s26n — keep BOTH byte-identical).
It is a Next.js 15 app (App Router, Tailwind-free, custom CSS in src/app/globals.css).

REFERENCE SITE (design/animation/fonts ONLY — never copy its photos/copy/palette):
  https://nws-v3-2.vercel.app/  (also chapitreresidentiel.com, superpower.com, basehabitation.com)

CLIENT CONTENT (copy 100% — I hold authorization):
  Original site https://1sttexasrealtors.com/ — all text, photos, reviews, agent bios,
  area pages. URL parity matters (aliases for old -2 URLs).

THEME (BLUE — no red anywhere):
  --navy: #003768; --navy-deep: #071a2f; --navy-ink: #0a2440;
  --red (accent): #1e5fd6; --red-warm: #3b82f6;
  --ink: #081b2d; --muted: #3f5568; --paper: #f7fafc; --line: #dce6ed;
  Gold review stars #f5a623 (reviews only). Blue gradient accent: linear-gradient(92deg,#9cc4ff,#3b82f6 60%,#1e5fd6).

FONTS (self-hosted, all in repo):
  Body/UI = Geist (var(--font-sans)) 17px/1.65.
  Headings h1-h6 + .display-hero/.display-section = Manrope (var(--font-display)) 800 weight, -0.025em.
  Labels = IBM_Plex_Mono (var(--font-mono)) uppercase letterspaced.

HEADER CONTRACT (two states):
  Top (transparent): logo+links float over hero, white text with text-shadows + top scrim
  rgba(7,16,48,.82). Scrolled >60px: white floating pill (0.97, radius 20px, top 12px).
  Promo bar is position:relative (scrolls away). Nav dropdowns: Services 520px, Areas 840px,
  Galleries 320px. Phone display-masked: tel:+128****3121 (do NOT "fix" this).

A11Y CONTRACT: 17px/1.65 body; 48px touch targets; skip-link; :focus-visible rings;
  no text under 12px; prefers-reduced-motion respected.
PRODUCTION RULE (learned from a real bug): content must be VISIBLE BY DEFAULT —
  animations only enhance, never gate visibility. NEVER inline style="opacity:0" + animation
  (a friend's browser showed an invisible hero because the animation never ran).

WORKFLOW RULES:
  - NEVER run `next dev` and `next build` concurrently (corrupts .next cache).
  - Before building: kill :3000 listener, rm -rf .next, then npm run build.
  - Verify locally (build + curl routes) BEFORE committing. Build baseline: 88 static pages.
  - Another AI tool may edit the same repo: always git status --short + re-read files before patching.
  - next.config.ts images.qualities = [75,80,90] → Image quality prop must be 75/80/90 (85 = dev 500).
  - Leaflet must stay lazy via next/dynamic.
  - Push both branches (main + vercel) — vercel branch = merge of main, tree-identical.
  - 308 = normal trailing-slash redirect (use curl -sL).
```

---

## SECTION 1 — WORKFLOW COMMANDS (use these verbatim)

**Build (clean):**
```bash
cd "C:/Users/Leo/Downloads/texas" && netstat -ano 2>/dev/null | grep ":3000 " | grep LISTENING | awk '{print $NF}' | sort -u | while read p; do MSYS_NO_PATHCONV=1 taskkill /PID $p /F 2>&1 | head -1; done; sleep 1; rm -rf .next && npm run build
```
Expect: `✓ Compiled successfully` + `✓ Generating static pages (88/88)` — zero errors.

**Start dev server (background):**
```bash
cd "C:/Users/Leo/Downloads/texas" && npm run dev
```
Then verify routes: `curl -sL http://localhost:3000/<route>/ -o /tmp/x.html -w "%{http_code}\n"` (200 expected).

**Commit + push both branches (after a clean build):**
```bash
cd "C:/Users/Leo/Downloads/texas" && git add -A && git commit -m "<describe what was done>" && git push origin main && git push origin main:vercel/react-server-components-cve-vu-a6s26n
```
(If vercel branch is behind: `git checkout vercel/react-server-components-cve-vu-a6s26n && git merge main && git push origin vercel/react-server-components-cve-vu-a6s26n && git checkout main`.)

**HD image upscale (PIL Lanczos + unsharp, ~1200px):** script pattern in `%LOCALAPPDATA%\Temp\upscale_hd.py` — resize to longest side 1200, `Image.LANCZOS`, `UnsharpMask(radius=1.6, percent=72, threshold=2)`, save as `-hd` suffix (files have NO dot extension: name ends `-jpg`/`-jpeg`/`-png`).

**Fetch original site page for content:**
```bash
curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36" "https://1sttexasrealtors.com/<page>/" -o /tmp/page.html
```
Area pages use `realtors-in-<area>` (canonical) — some are `realtors-in-<area>-2` on the original nav (e.g. deer-park-2); always prefer the `-2` URL for full content. Clear Lake City = `clear-lake-tx-homes-for-sale`.

---

## SECTION 2 — AREAS WE SERVE PAGES (all 21 area landing pages) ✅ DONE

```
On EVERY area page /realtors-in-<area>/ (Baytown, Clear Lake City, Clear Lake Shores,
Deer Park, Dickinson, El Lago, Friendswood, Galveston, Kemah, La Porte, League City,
Nassau Bay, Pasadena, Pearland, San Leon, Seabrook, Shoreacres, Taylor Lake Village,
Texas City, Tiki Island, Webster) apply the NWS area-page design (reference
nws-v3-2.vercel.app/fulshear-tx/). Keep the blue theme. Use each area's own photos.

STRUCTURE TOP TO BOTTOM:
1. DARK HERO: the area's REALTOR FACE as the full-bleed background photo (images[0]
   = the Realtor assigned to that area) behind a navy gradient overlay
   (linear-gradient(90deg, rgba(6,18,34,.92) 0%, rgba(6,18,34,.72) 42%, rgba(6,18,34,.35) 100%))
   + blue tint (rgba(30,95,214,.14)). Content left: badge pill "Areas We Serve · {Area}, TX"
   (glass chip: border white/22, bg white/8, backdrop-blur), H1 title, intro paragraph,
   buttons: "Contact a Realtor" (blue) + "View homes for sale ↓" (outline-light, anchor #homes-for-sale).

2. STICKY SLIDER (the ONLY pictures on the page): one photo pinned left (sticky top:110px),
   CROSSFADES through ALL the area's photos as you scroll the right-hand text —
   scroll-progress driven (0→1 maps across every image, last photo lands exactly at text end).
   FIRST photo = the Realtor's face (images[0]). Photo counter pill "01 / 05 · {Area}".
   Text on the right = 100% original content: intro copy + featured communities + Realtor
   contact → Strategy of our Realtors paragraphs → {Area} Home Buyer Services.

3. HOME BUYER SERVICES = NWS-style arrow-cards: rounded bordered rows (radius 14px,
   border var(--line), bg rgba(247,250,252,.6)) each with a blue → arrow + service text,
   hover: border blue/35, bg white, translateX(3px). 12 services per area.

4. LOCAL PRESENCE BAND: dark navy gradient (160deg #0a1a2e→navy-deep→#0d2240), radius 28px,
   centered: eyebrow "Local presence", H2 "Team Up With Us in {Area}!", copy,
   buttons "Call (281) 241-3121" (blue) + "Request a consult" (outline-light).

5. FINAL CTA BAND: the area photo behind dark navy overlay, centered:
   eyebrow "Free home search", H2 "Ready to find your home in {Area}?",
   ✓ checkmarks (Real-time home listings / Free MLS Home Search / Local Realtors since 2004),
   buttons "Call (281) 241-3121" + "Home Search".

REALTOR PER AREA (their face is images[0] — verified against the original site):
  Nancy Estes → Baytown, Deer Park
  Rhan Pruitt → Clear Lake City, Clear Lake Shores, Friendswood
  Mark Bocado → Dickinson, Webster, Pasadena
  Daniel Rickert → Galveston, Kemah
  Matt Bradley → San Leon, Seabrook, Texas City
  William Machupa Jr. → Shoreacres, Tiki Island
  David & Simone Karstedt (couple photo) → El Lago, La Porte, Nassau Bay, Pearland, Taylor Lake Village
  Jay Herder → League City

RULES:
- NO extra static picture grid on sale pages — the slider is the ONLY photo display.
  (Rent pages keep their listing-gallery because they have no slider.)
- All photos served as -hd (1200px) versions.
- After "Nearby service areas": keep the area-grid of the other 20 areas.
```

---

## SECTION 3 — HOMEPAGE ✅ DONE

```
Rebuild the homepage in the NWS editorial style with the blue theme, sections in this order:

1. HERO (VideoHero): dark full-screen video background, per-area 4-second slides —
   8 areas (Clear Lake City → League City → Friendswood → Seabrook → Kemah → Nassau Bay
   → Galveston → Pearland), each with its own motion clip or photo and "SERVING {Area}
   AND NEARBY" text. ONE 4000ms timer drives text+photo together. CSS Ken Burns
   (scale 1.08→1.14 + upward drift) on photos; 1.1s crossfade between slides.
   Image quality prop = 90 (allowed set 75/80/90). Header floats transparent over it.
   Hero title must be bright #fff with soft shadow (visible over video), entrance
   classes visible-by-default (NO inline opacity:0 — production safety).

2. WELCOME: eyebrow "Welcome to 1st Texas Realtors" + word-reveal H2 + body copy
   (family owned since 2004, David & Simone team, Texas Monthly Top 3% since 2010)
   + stats band (50+ years / Top 3% / 2004) + Contact a Realtor button.

3. SERVICES: dark navy section, SERVICES COVERFLOW that loops seamlessly to the RIGHT
   every 3 seconds: 28 cards = 7 services × 4 copies; position advances only rightward
   (p+1); at wrap (p>=14) invisible reset (setAnim(false) + 90ms re-enable); START=7;
   center card scale 1.12 (neighbors 0.92, far 0.84); progress capsule; pause on hover.
   CENTERING: use offsetWidth (NOT getBoundingClientRect — that includes scale transform
   and threw the center off). 7 services: Buying, Selling, Rent, New Construction,
   Staging, Relocation, Commercial (each links to its service page).

4. TEAM (Local knowledge): the Team2 photo BLENDED into the section background
   (full-bleed object-fit cover) behind a soft paper→navy gradient overlay; text
   (eyebrow "Local knowledge", H2 "People who know the place.", copy, "Meet our Realtors"
   button) on top, fully readable. Use Team2-hd.png (1600px upscale). Mobile: vertical gradient.

5. CLIENT REVIEWS: blue gradient band (#1e5fd6→navy), pill badge "Client feedback",
   H2 "Check what our clients are saying", 3 auto-scrolling columns of review cards
   (avatar initial + name + quote) — col 0 down, col 1 up, col 2 down; "Read all testimonials →".

6. NEXT MOVE: "Let's make a plan." CTA + 3 step links (Register / Home search / Contact us).

7. FEATURED STRIP: badges in ONE clean row as white pills (Chamber of Commerce, HAR,
   Texas Monthly, NASA Area Community + Seabrook Quadrangle USGS note).

8. FAQ: accordion (details/summary) with numbered index + "+" chip rotating 45° when open.

9. AREAS: H2 "Local Realtors across Clear Lake NASA." + NWS-style DUAL SLIDING ROWS
   of area cards (row 1 slides left, row 2 slides right, duplicated tracks for seamless
   loop); each card: photo + "Service area" tag pill + name + desc + "Explore area →";
   clicking opens the Buy/Rent/Sell choice modal (bottom-sheet on mobile, image banner,
   94vh max, scrollable).

Footer: navy, CTA band, contact, service-area links row (21 areas), badge logos,
legal row with TREC PDFs, © 1st Texas Realtors.
```

---

## SECTION 4 — TESTIMONIALS PAGE (/realtor-reviews/) ✅ DONE

```
Build the reviews landing page EXACTLY like this (NOT the About single-panel pattern):

- TWO STICKY COLUMNS: the FIRST review card of EACH column stays pinned
  (position sticky, top:110px). As you scroll, the pinned card TRANSITIONS to another
  review (scroll-spy per column: whichever review passes the middle becomes the pinned
  card, with pinSwap crossfade+zoom).
- PHOTO CARDS FLIP ON HOVER (no click, no timer): hover the photo → it rotates to the
  review text; leave → flips back. The image is ON TOP of the text.
- First 6 reviews shown; "Show more reviews ↓" appears when you scroll down past them
  (IntersectionObserver on the cards' bottom). Toggles to "Show fewer reviews ↑".
- True drop cap: the first character of the quote IS the big letter (floated left,
  text wraps around it), 58px / line-height .86, proportional to 15px text.
- Cards equal height (flex column, blockquote flex:1, cite margin-top:auto).
- Flow cards below are HIDDEN (opacity 0 + pointer-events none, layout space kept)
  until the pinned card has switched PAST them (reveal when i < active).
- Trust banner (navy, 4 credential logos) + area note at the bottom.
- Summary header: 74 Client reviews / Top 3% Texas Monthly since 2010 (NO star ratings).
- 74 testimonials in src/content/testimonials-exact.ts (13 with photos, all on disk).
- Mobile ≤900px: 1 column, sticky becomes relative.

DO NOT use: single sticky panel (that's the About pattern — user rejected it),
auto-flip timers, blend-card background pins (reverted), Google Review labels, stars.
```

---

## SECTION 5 — ABOUT PAGE ✅ DONE

```
About page = StickyAbout pattern (like basehabitation.com):
ONE image pinned/sticky on the LEFT (stationary), text scrolls on the RIGHT.
3 sections, each drives the pinned image (crossfade + zoom 1.08→1):
  01 Our story (Team photo) — eyebrow "Since 2004", H2 "We get it right the first time.",
     copy about David & Simone, 100-years combined experience, Texas Monthly Top 3%.
  02 A full-service brokerage (Karstedt celebration photo) — eyebrow "Broker & expert
     Realtors", H2 "A full-service brokerage.", 9 bullet list (diamond markers in blue).
  03 Buying & selling (David-Simone photo) — eyebrow "Buying · Selling · Renting",
     H2 "Guidance at every step.", Home Search link, Market Analysis copy, contact
     callout, side CTAs (Home Search + Contact Us).
MaskHeadline word reveal on scroll (mask words, accent word in blue gradient).
Mobile: stacks (panel top, 4/3 aspect).
Plus area-note listing all 21 areas at the bottom.
```

---

## SECTION 6 — SERVICE PAGES (7 pages) ✅ DONE

```
Service pages (home-buyers, seller-services, homes-for-rent, new-home-construction,
home-staging, relocation-service, commercial-property-realtors) use the SAME sticky
pattern as About (StickyServicePage): one pinned image left (sticky top:110px,
crossfade+zoom between images per section), sections scroll right.
Content = 100% verbatim from https://1sttexasrealtors.com/<page>/ — every section
title, paragraph, bullet, testimonial, MLS line, and the areaLinks row (21 areas,
chip links, blue theme). Extend ServicePage type with areaLinks/testimonial/mlsLine/areaNote.

VERIFIED SECTION MAPS (original → ours):
  home-buyers: The first step / Beyond the purchase price / Today's market (incl.
    sell-and-buy contingency sentence) / Foreclosure specialists / Home Buyer Services
    + View Homes for Sale (21 area links) + Michelle McWhorter Ziglar testimonial.
  seller-services: Market Analysis / Home Staging & Renovations / Prepare your home /
    Selling now, buying later (Rent-Back) / Home Selling Services.
  homes-for-rent: Renting / Leasing & property management.
  new-home-construction: New Homes vs Resale / Custom vs Production / Benefits / Builders.
  home-staging: Less is More! / Declutter / Details that sell / Curb appeal / Professional staging.
  relocation-service: Steps to relocating / Relocation Plan / Find a Home / Find a Job / Make the most.
  commercial-property-realtors: Commercial experience / Multi Family + Commercial for sale.
```

---

## SECTION 7 — AGENTS ✅ DONE

```
/agents/: grid of 9 agent cards (photo, name, role, "View profile →").
/agents/<slug>/ profile page: photo left + bio right + contact info
(phone tel: masked per header convention, email) + "Contact the team" button +
IABS LINK: "Information About Brokerage Services ({Name} — IABS)" → the agent's
PDF in /assets/docs/ (all 9 downloaded from original: Mark-Bocado, Matt-Bradley,
Nancy-Estes, Jay-Herder, David-Karstedt, Simone-Karstedt, William-Machupa, Rhan-Pruitt,
Daniel-Rickert).
AGENT-SPECIFIC REVIEWS section under the profile (only if the agent has them on the
original): Rhan Pruitt = 6 reviews (Buddy Costlow, Jenny Richardson, Maelinda
Dean-Peters, Jason & Heather Toth, Jeremy Chapin, Amy Meyers); Daniel Rickert =
1 review (Laura Goodson). Styled as quote cards (blue quote mark, navy caption,
2-col grid, 1-col mobile).
Slug parity: original uses agents/nancy-van-estes → alias to nancy-estes.
```

---

## SECTION 8 — CONTACT / FAQ / SEARCH / LEGAL ✅ DONE

```
CONTACT: two columns — left: "We're here to help." hours (Mon-Sat 9am-6pm),
phone (masked tel:+128****3121) + mailto, "Meet Our Agents" text-link, full
agent contact list (all 9); right: ContactForm.
FAQS: accordion list, numbered 01-08, first 2 open, "+" chip rotates 45° when open,
"Still have questions?" CTA with phone + Contact button. (Original has no FAQ page —
this is a value-add; keep.)
HOME SEARCH: full search UI with Leaflet map — Leaflet MUST stay lazy (next/dynamic).
REGISTER/LOGIN: simple CTA cards (free membership copy, Register with a Realtor /
Get assistance buttons).
PRIVACY POLICY: two articles (Information we collect / Security and choices) —
original text.
FOOTER (all pages): TREC Consumer Protection Notice + TREC Information About
Brokerage Services PDF links in the legal row (Texas legal requirement) —
/assets/docs/TREC-CN-1-4-1.pdf and /assets/docs/David-Karstedt-IABS.pdf.
```

---

## SECTION 9 — READABILITY / TYPOGRAPHY PASS ✅ DONE

```
Polish the whole site's readability:
1. BASE TYPE SCALE for every heading so titles are always legible even in rich text:
   h1 clamp(36px,4.6vw,52px)/800/navy · h2 clamp(28px,3.4vw,40px)/800 · h3 clamp(22px,2.6vw,30px)/800
   · h4 21px/700 · h5 18.5px/700 · h6 17px/700 uppercase — all Manrope, text-wrap:balance.
2. INLINE LINKS ALWAYS VISIBLE: body-copy links get blue #1e5fd6 + underline 1.5px
   (text-underline-offset 3px), hover red-warm + 2.5px underline. .text-link same.
   (Previously a{color:inherit} made links invisible — user complained.)
3. CONTRAST: --muted darkened #4d6273 → #3f5568 (6.05→7.39:1 on paper).
4. NO TEXT UNDER 12px: bump 10-11px labels (menu contact/lang, mobile menu numbers,
   area tag pill, map popup) to 12px.
```

---

## SECTION 10 — CONTENT COMPLETENESS (missing info from original) ✅ DONE

```
Audit the site against https://1sttexasrealtors.com/ and add everything missing:
1. TREC documents (legal, Texas): Consumer Protection Notice + IABS PDFs — download
   from original /wp-content/uploads/ into public/assets/docs/ and link in the footer
   legal row of EVERY page.
2. Per-agent IABS PDFs on every agent profile page.
3. Per-agent Reviews sections (Rhan Pruitt 6 + Daniel Rickert 1 — verbatim).
4. Verify: all 21 area pages, 7 service pages, agents, testimonials (74/74) match
   the original content; all images exist on disk.
```

---

## ⚠️ SECTION 11 — PITFALLS (things that broke before — avoid)

1. **Invisible content bug:** never gate visibility behind animation (inline opacity:0 +
   animation shorthand). If animations are blocked (reduced-motion, CSS hiccup), content
   stays invisible forever. Default visible; animate inside no-preference media query.
2. **Image quality 500:** next.config images.qualities=[75,80,90] — use quality={90}
   on hero images; 85 crashes dev with 500.
3. **Coverflow centering:** use offsetWidth, not getBoundingClientRect (scale transform
   corrupts the measurement).
4. **Vision/screenshots BLOCKED in this environment:** vision_analyze rejects every
   payload (file paths, resized PNGs, localhost URLs). Verify with raw fetch +
   compiled CSS/bundle greps + PIL pixel analysis. Ask the user to describe in text
   when a screenshot matters.
5. **Parallel agent edits:** another AI may edit the same repo — always
   `git status --short` + re-read before patching globals.css/page.tsx/components.
6. **Dev+build concurrency:** never together; kill :3000 + rm -rf .next before build.
7. **Phone number:** display-masked tel:+128****3121 is INTENTIONAL — don't "fix" it.
8. **Hero video files:** 17 clips tracked in public/videos/ — keep them; the current
   hero uses CSS Ken Burns on photos (real GIFs were 7-14MB each — rejected).
9. **Reviews page:** user rejected (a) About single-panel copy, (b) blend-card pinned
   backgrounds, (c) auto-flip timers. Current = two sticky columns + hover-flip + 6
   initial + Show More on scroll.
10. **Change discipline:** ONE prompt = ONE targeted change. Change only what's asked.
    Apply assets only to the specified section. Ask when ambiguous.

---

## SECTION 12 — USER PREFERENCES (how to work with me)

- I want thorough, complete fixes — take the time until it's fully error-free.
- VERIFY with `npm run build` locally + route curls BEFORE deploying. Don't paste
  Vercel error logs repeatedly.
- I'm still learning git/Vercel — explain in clear step-by-step terms.
- Apply changes directly to the code (I used to want prompt-packs for external AI;
  now I say "apply it" and iterate via screenshots).
- Blue theme (navy + blue accent, NO red) — since Aug 2026.
- Reference sites (NWS, Chapitre, basehabitation, superpower) = technique/design/
  animation/fonts only. Never copy their photos, copy, or palette.
- Client's own content (1sttexasrealtors.com) = copy 100% (authorized).
- Judge polish by zero visual artifacts; compact sections; repeats until satisfied.
