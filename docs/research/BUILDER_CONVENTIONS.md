# Builder conventions — Nam Long clone (HTML/CSS/JS)

Project root: `/Users/hai/Workspaces/projects/namlongvn`. Local server already running: `http://localhost:5173/` (serves project root).
Original site: `https://www.namlongvn.com/`.

## IMPORTANT — the site is now plain static HTML (no build step)
The `src/` folder and `scripts/build.mjs` no longer exist. Each page is a finished file `<slug>/index.html` at the project root that already contains the shared `<head>`, header and footer. Page-specific CSS/JS live in `assets/css/pages/` and `assets/js/pages/`. Edit static pages directly (only the files you are assigned).

### Repeated page types → template + data
For pages that repeat (project details, job details, news details, archives…) do NOT hand-write each file. Create:
- `templates/<name>.mjs` exporting `data`, `out(item)`, `page(item)` → `{ title, css: [...], scripts: [...], bodyClass }`, `render(item, all)` → the `<main id="main">…</main>` markup (optionally `shell` = path of the static page whose head/header/footer to reuse; default `lien-he/index.html`). Import `esc`/`each` from `../scripts/tpl-helpers.mjs`.
- `data/<name>.json` — array of items (facts only + your own placeholder prose).
- Generate with `node scripts/generate.mjs <name>`; output is static HTML at `out(item)`. Commit the generated files.
- URLs: clean `/slug/` only — every link you write must be `/path/` (never `index.html` or `.html`).

### Rate limiting (namlongvn.com is behind Cloudflare)
Several agents work in parallel. Use ONE Playwright browser for your whole session, wait ≥5s between page loads, and on a 429/"Access denied" title back off 60s. For N similar detail pages, measure the template on 2–3 representative pages; collect the per-item facts with as few loads as possible (e.g. read them from listing pages or JSON endpoints the page already calls).

## (Legacy notes below refer to the old build layout; the measurement / fidelity / text rules still apply)
## Files you own (one page = three files)
- `src/pages/<name>.html` — page body only (everything that goes inside `<main id="main">…</main>`), first line is the meta comment:
  `<!-- @page title="… – Nam Long Group" out="gioi-thieu/index.html" css="gioi-thieu.css" scripts="pages/gioi-thieu.js" -->`
  The body must be wrapped as `<main id="main"> … </main>`.
- `assets/css/pages/<name>.css` — page-specific CSS.
- `assets/js/pages/<name>.js` — page-specific JS (jQuery 3.7.1 + Slick 1.8.1 are already loaded globally before it; `main.js` loads after it).
- Build: `node scripts/build.mjs` (writes `<out>`). Rebuild after every edit, then view `http://localhost:5173/<route>/`.

**Do NOT edit** `assets/css/style.css`, `assets/js/main.js`, `src/partials/*`, `scripts/build.mjs`, or other agents' pages. If you need a shared change, describe it in your final report instead.

## What already exists (reuse, don't re-create)
- Header (mega menu, mobile menu, search), footer, preloader, cookie notice, go-top — injected by the build.
- Design tokens in `:root`: `--red #98221f`, `--ink #181d27`, `--text #212529`, `--menu #252b37`, `--muted #717680`, `--line #d5d7da`, `--grey-bg #f5f5f5`, `--ease cubic-bezier(.65,0,.35,1)`, `--t: .5s var(--ease)`, icons `--i-arrow-red`, `--i-arrow-long`, `--i-arrow-long-w`, `--i-prev`, `--i-next`, `--i-prev-w`, `--i-next-w`, `--i-plus`, `--i-minus`, `--i-back`, `--i-search`.
- Font: "Be Vietnam Pro" (400/500/700) replaces the original's commercial BT-BeauSans. Map original families: `BT-BeauSans-Regular` → 400, `BT-BeauSans-M` → 500, `BT-BeauSans-B` → 700 (ignore the original's computed font-weight; the family name encodes weight).
- Layout: `.container` (responsive widths identical to the original). Body font 16px/24px; 15px at 1200–1439px.
- Shared components (see bottom of `assets/css/style.css`):
  - `.page-banner` (+ `.page-banner--single`) with `.page-banner__inner`, `h1`, `.page-banner__tag` — original `.banner-page`. Set the background image inline: `style="background-image:url('https://www.namlongvn.com/…')"`.
  - `.back-link` — original `.back-page` (link above single banners).
  - `.sub-section` (60px / 40px mobile vertical padding), `.rule-b` (1px full-width line under a block), `.lead-text` (original `.d-business`).
  - `.section-title` (37px bold, 40px/46px −0.8px letter-spacing on mobile), `.section-head` + `.link-more` ("Xem thêm" with arrow), `.news-card`, `.field-card`, slick arrows/dots (`.dots-red` wrapper class gives red dots).
  - Pill tabs: `<div class="pills" data-tabs><button class="pill is-active" data-target="paneA">…</button>…</div>` + `<div class="tab-pane is-active" id="paneA">…</div>` — click handling is global.
- Scroll reveal (same as original css3-animate-it): add class `reveal` to an element; it fades up 20px over 1s when its `main > section` (or `[data-stagger]` group) top enters the viewport. Delays: `data-delay="2|3|4"` → .2/.3/.4s (default .1s). For the original `.ani-up` groups put `data-stagger` on the group and `reveal` on its direct children: children get 0.4s + 0.2s × index automatically.

## Fidelity rules
1. Measure, don't guess: use `node scripts/measure/measure.mjs <url> <width> "<selector>" …` (computed styles + box, ::before/::after) and `node scripts/measure/anim.mjs <url>` (stagger delays). Measure at 1440, 1280, 1024, 768 and 390.
2. Behaviors: scroll first, then hover, then click. Record slick options with a Playwright script (`jQuery('.x')[0].slick.options`) and replicate them (slidesToShow/Scroll, speed, autoplay, responsive breakpoints, fade, infinite, dots/arrows). Replicate hover transitions (durations/easing), tabs, accordions, dropdowns, modals, sticky elements, count-ups, marquees.
3. Write all CSS/JS yourself. Never copy the original site's HTML source, stylesheets or scripts (reading computed values is fine). Use your own class names (BEM-ish, like the existing code).
4. Images/logos: hotlink the original absolute URLs (`https://www.namlongvn.com/wp-content/...`). Do not download them. Icons: draw small inline SVGs (data URIs) yourself.
5. **Text content rule (important):**
   - Keep verbatim only short items: headings, menu/tab/button labels, names and job titles of people, project names and locations, numbers/stats, dates, single-line news headlines, contact details.
   - Any longer prose (paragraphs, descriptions, bios, timeline entries, award blurbs, article bodies, legal/policy text, report descriptions) must NOT be copied or closely paraphrased. Replace it with your own short, generic Vietnamese placeholder text (1–2 sentences) on the same topic, keeping roughly the visual footprint (number of lines) so layout matches.
   - Detail pages (news articles, project descriptions, job descriptions, framework/program pages): keep title, date, facts (location, area, scale, status, product lines, salary/location/deadline, image URLs). The body/description must be your own short generic placeholder text (e.g. "Nội dung minh họa cho bản clone…") — never the original's sentences, not even reworded. Reproduce the typography and layout, not the words. English pages follow the same rule in English.
   - Long lists (e.g. 36 projects, 36 job posts) — keep the item names/locations (facts), but you may cap repeated cards at a sensible number only if the original paginates them; otherwise include all.
6. Responsive: match breakpoints of the original exactly (check 1199/1200, 991/992, 767/768, 499/500, 479/480).
7. Before finishing: `node scripts/build.mjs`, load the page at 1440 and 390 with Playwright, confirm no console errors, no horizontal scroll (`document.documentElement.scrollWidth === innerWidth`), and compare screenshots against the original side by side. Save screenshots into `docs/design-references/pages/clone-<name>-<width>.png`.
8. Write a short spec of what you measured to `docs/research/components/<name>.spec.md` (key values, behaviors, breakpoints).

## Final report (keep it short)
Files created, behaviors implemented, remaining known differences, and any shared-file change you need.
