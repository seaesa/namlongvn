# Project detail + commercial detail

Originals: `/khu-do-thi-nha-o/<slug>/` (35 pages), `/bat-dong-san-thuong-mai/<slug>/` (4 pages).
Measured on Izumi City (large township with docs and sub-projects), EHome 1 (small, no website, no docs or subs) and Mizuki Park commercial, at 1440/1280/1024/768/390.
Facts were collected with one plain HTML fetch per page, about 6 s apart, then parsed offline. The WP REST API (`/wp-json/wp/v2/project`) has no ACF fields.

## Files
- `templates/project.mjs` + `data/projects.json`: generates `khu-do-thi-nha-o/<slug>/index.html`
- `templates/commercial.mjs` + `data/commercial.json`: generates `bat-dong-san-thuong-mai/<slug>/index.html` (a different, simpler template)
- `assets/css/pages/project-detail.css` (both page types) and `assets/js/pages/project-detail.js`. Project pages also load `projects.css` for `.proj-card`, `.feat-slider` and `.u-line`.

## Project page structure (original → clone)
1. `.back-page` → `.back-link` "Dự án" → `/phat-trien-khu-do-thi-nha-o/`
2. `.banner-page-single` → `.page-banner--single.pd-banner`. Heights: 450 (≥1200), 460 (992–1199), aspect 768/553 (768–991), 390/242 (<768). h1 is 52.8/60 (48 between 1024 and 1439), 32/39 on mobile, auto width, 20px above the bottom (30px on mobile).
3. Main section, padding 60 (40 on mobile):
   - `.d-business` → `.pd-lead`: 20/29 justified, p mb16, block mb24. Placeholder text.
   - `.project-info` table → `.pd-info`. Rows: Dòng sản phẩm, Vị trí, Quy mô dự án, Tiến độ, Website dự án (only when the project has a site). Cells: padding 16/0, border-bottom 1px #d5d7da. First column 45%, #414651. The website link uses `.link-more`: hover moves the arrow right 10→0; it is 14px on mobile.
   - `.sbusiness` gallery → `.pd-gallery`. Slick: 2/2, speed 500, linear, autoplay 3000, pauseOnHover, dots, no arrows, infinite; below 480px 1/1. Slides are padded 0 10 and images have radius 8. Image heights: 390 / 336 (1200–1439) / 310 (992–1199) / 250 (768–991) / 230 (<768). Red dots sit 25px below the images (15px on mobile).
   - `.exp-business` → `.pd-body`, margin 50/0/30. Long text is replaced with placeholder. Short planning-stat lines ("+ Mảng xanh: 20ha"…) are kept as facts.
4. `.s-project-legal` → `.pd-legal` (only when the project has documents):
   - Padding 60/40, with a 1px #d5d7da line 60px above the content. The title is 37px bold (40/46 and −0.8px letter-spacing on mobile).
   - Each `.pd-doc` has padding 16/0 and a 1px #e1e4e8 bottom border. The title is 17.6/24 bold #252b37 (18/25 on mobile). The "PDF" link is red 500 weight, followed by a 24px circle-arrow icon at left 40px that moves 6px right on hover.
   - The first 3 documents show. "Xem thêm" (`.u-line`, mt48) reveals all of them and stays visible, as on the original.
   - On mobile (≤767) an arrow button sits at top 10 / right 20 (24×31). It is rotated 90° when open and 180° when collapsed, and `slideToggle`s the list.
5. `.tb_block` "Phân khu" → `.pd-subs`, padding-bottom 60/40. It uses the same cards and slick options as the listing's featured slider (4 slides, then 3 below 1100, 2 below 800, and 1 below 480 with no arrows). Cards are 430px tall at every width. A single dot is hidden.

## Commercial page
The page has a back link ("Mảng Đầu tư & Phát triển Bất động sản Thương mại") and the same banner. Then:
- Section with pt 60/40: the overview image at full container width, then `.cd-loc`, a grid with 30%/60% columns and pt16 holding "Vị trí:" and the location.
- Section with padding 16/0/60 (40 on mobile): one content image (the largest srcset entry up to 2048 px).

There is no prose on the original commercial pages.

## Other
- The header marks "Dự án" as current from `project-detail.js`, because `main.js` only matches URL prefixes.
- Sub-project cards link to the local `/khu-do-thi-nha-o/<slug>/`.
