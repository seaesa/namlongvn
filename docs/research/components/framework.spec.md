# Framework pillar pages + Swing for Dreams — measured spec

Measured on namlongvn.com at 1440 / 1280 / 1024 / 768 / 390 (Playwright, one browser session, 5s+ between loads).
References: `docs/design-references/pages/khung-*-{w}.png`, `swing-for-dreams-{w}.png`; clones: `clone-khung-*-{w}.png`, `clone-swing-for-dreams-{w}.png`.

## /khung-phat-trien-ben-vung/<slug>/ (template `templates/framework.mjs`, data `data/framework.json`, CSS `framework.css`)
- Back link `.back-link` → `/phat-trien-ben-vung/` (shared component).
- Banner: `.page-banner--single`, 450px (1200+), 460 (992–1199), 768/553 ratio (768–991), 390/242 (<768). h1 52.8/60 (48 at 992–1439, 32/39 mobile), tag 20/28 #ccc (1024: 27px lh, padding-right 137px; 768: 18/27; mobile 17/23, pr 40). Title block width = h1 width (tag wraps inside it). Tag bottom → banner bottom ≈ 37px (45 mobile).
- Content: section padding 60 (40 mobile); body margin-top 8, justify 16/24; paragraphs are generic placeholder; infographic image full width (1440/810 ratio), mb 20, wrapper mb 16.
- "Khám phá thêm…" section: padding 60 (40), mb 24; h2 37/44.4 bold (768: 32/38.4; mobile 40/46 −0.8); 2 cards (other two pillars, order as original), 24px under title, gutter 20px; card h 460 (1024: 370, 768: 460, 390: 320), radius 8, image scale(1.1) on hover over .5s; glass caption rgba(253,253,253,.2)+blur(8px), radius 16 16 8 8, min-h 100 (768: 120, 390: 110), padding 22.4/24/19.2; title 27/1.2 (1280: 24, 1024: 23, 768: 22 + mt10, 390: 14/22); arrow 30×15 top-right (mobile: bottom 15 / right 10 of the caption).
- Reveal: banner h1/tag stagger, body fade-up, title + cards stagger.

## /swing-for-dreams/ (static page, `swing.css`, `swing.js`)
- Banner: desktop image `banner-swing-for-dreams.jpg` ≥1200, `swing-for-dreams-tab.jpg` below; h1 52.8/60 (48 at 992–1439, 30/35 mobile); tag 2 lines 20/28 (1024 pr 30%; 768 18/27; mobile 14/21, mt 10).
- Intro: top offset 90 (70 mobile); title 50/60 bold (768: 45/54; mobile 36/46 −0.72); text 16/24 justify; full-width image.
- Tầm nhìn & Giá trị: slick 2-up, scroll 1, speed 600, autoplay 3000, linear, not infinite, no arrows; <480: 1-up + dots. Slide gutter 40; photo 380 (≤1199: 290) radius 8; glass name box min-h 90, name bold 24 (≤1199: 20), title 12px; quote 16/24 medium #252b37 justify with quote marks; 24px top / 60px bottom padding + 1px #d5d7da rule.
- Chắp cánh ước mơ: slick 4 centerMode (padding 0) infinite; <1100 3/3 dots; <800 2/2 dots; <500 1/1 centerMode 30px + dots. Card 460 (padding 10), inner radius 12; glass caption (school 14/18 #e9eaeb, name 20/24 medium, tag 14/20 bold, ↑ icon). Desktop hover (≥1200): card translateY(−30px), inner 440→500 (.45s), description (13/19.5, border-top #a4a7ae) fades in, max-h 170. Below 1200: tap toggles `.is-active` (desc max-h 125, × close button visible), hover scale(1.05). Section ends with 60px + rule.
- Thông tin chung: pink band #fdf3f2, 48px padding; 3 columns with 1px #d9d9d9 dividers; icon 45h; value bold 35/42 red (1280 32, 1024 29, 768 28, mobile 26); label 23/30 #717680 (1280 19.2, 1024 20/27, ≤991 17/23). Mobile: icon left, text right, stacked.
- Tiêu chí xét chọn: weights band (radius 32, padding 50/30; ≤991 40/10 r25; mobile 20/10) 60/30/10% medium 100/110 red (1280 88/96, 1024 90/90, 768 72/78, mobile 60/78 in 60/40 grid, horizontal dividers). No count-up on the original (its counter targets a missing `.count` element), so numbers are static. Criteria boxes: flex gap 20, active box = 2× width (.5s ease), hover makes a box active, its text appears after 500ms; no reset on mouseleave; arrow (30×19) hidden on the active box. ≤991: stacked list with all text visible, 1px rgba(152,34,31,.1) separators.
- Quy trình xét duyệt: slick ≥576 (3/3; <1100 2/2), list margin −40 with 4px timeline line at top 20 and 16px red dots; cards #f5f5f5 r16 min-h 170, date #717680, text 17.12 medium, number 85/95 red. <576 unslicked → vertical timeline (line left 10px, dots centered on the left). Step texts are placeholder; dates kept.
- "Nộp hồ sơ tại đây" button (red pill 18/23, padding 15/45) opens a popup: overlay rgba(0,0,0,.4)+blur(4) fade .3s, dialog 600 wide r32 p30 (mobile: calc(100%−20px), r12, p30/20). Step 1 (personal + education fields, underline inputs 20px padding, date field with calendar icon), step 2 (motivation textarea, attachment upload, consent). Hủy/× /overlay/Esc close; Tiếp tục validates required fields (red underline + error notice); submit is a static demo (shows a success notice, sends nothing).
- Contact box: 70px top padding, border-top, h6 uppercase #717680, h5 bold 20, email row with mail icon.

## Breakpoints used
1440/1200 (type scale), 1199/992, 991/768, 767, 575 (process list / popup), 499/479 (sliders).
