# Phát triển Khu đô thị & Nhà ở — measured spec

Route `/phat-trien-khu-do-thi-nha-o/` · files `src/pages/phat-trien-khu-do-thi-nha-o.html`, `assets/css/pages/projects.css`, `assets/js/pages/projects.js`.

## Layout (1440 / 1280 / 1024 / 768 / 390)
- Banner height 660 / 480 / 528 / 528 / 810 (differs from shared 560/460/aspect-ratio). h1 52.8/56 → 48/56 (1200–1439, 992–1199) → 52.8/56 (768) → 36/47.
- Lead `.p-detail-single.pb-2`: padding 60 0 8 (40 top ≤480); lead-text shared, 17px ≤480.
- Blocks `.section.pt-0.s-bottom`: padding-bottom 100 (60 ≤480). Title 37px (32px 768–979, 40/46 ≤767, 36 ≤380); `<br>` hidden except ≤480.
- Project card: radius 8, image height 430 (440 ≥1440, 464 at 992–1199 & 768–979, 480 ≤480, 410 ≤380). Glass panel bottom: min-height 192 (160 at 768–979 & ≤767, 192 ≤480), padding 16/15, radius 16 16 8 8, bg rgba(16,17,18,.5)+white 20% layer, blur 8px. Status pill 12px/24, pad 3/15, radius 28, green rgba(52,161,16,.6) / red rgba(177,31,27,.6) when ongoing; 10.4px 1140–1365; pad 3/9 lh16 992–1199. Name 17px 500 lh1.2 (16 at 1140–1365, 20.8 ≤480, 17.6 ≤380); mobile name variant ≤767. small .875em/18 #f5f5f5. Long white arrow 24×12 (32×17 ≤480).
- Hover ≥1200: image scale 1.1 (.5s), arrow left-right loop 1s.
- Featured slick: 4/4, speed 500, linear, infinite, dots+arrows, no autoplay; ≤1100 3/3, ≤800 2/2, ≤480 1/1 no arrows + list padding-right 70. Arrows top calc(50% - 20px). Dots relative +15px, grey / red active, single dot hidden. "Khu dân cư" tab has 1 project (Akari City).
- Product lines slick: 4/4, autoplay 3000, speed 500, no dots/arrows; ≤1100 3/3, ≤800 2/2, ≤480 1/1 + dots. Card radius 10, img 390 (440 at 992–1199, 480 ≤480, 410 ≤380). Overlay 72px → 152px on hover ≥1200 (height .5s ease-in-out, text max-height .45s / opacity+translate .3s .1s, up-arrow fades). Always expanded <1200: 152 (992–1199), 140 (≤991), 160 (≤380).
- Filters: 4 dropdowns col-6 / col-lg-3 (≥992), toggle 12px 0 padding, 1px #d5d7da bottom border, grey label + 9×16 chevron. Menu abs, top 100%, inset 10px, margin-top -2, pad 8 0, 1px rgba(0,0,0,.176) border, radius 4, max-h 250; items 7px 16px, hover #f1f1f1.
- "Bỏ chọn tất cả" / "Xem thêm": 17px 500 red with 1px red underline, grey line grows over it on hover (.5s).
- Grid: margin-top 48, gutters 20, col-12 / col-sm-6 / col-lg-3, item margin-bottom 16. First 8 shown, 27 hidden until "Xem thêm".
- Bottom `.section.news`: empty on the original (content commented out) → 100px (60px ≤480) spacer only.

## Behaviour (from original custom.js, reimplemented)
- One value per dropdown (single select), AND across dropdowns; picking an option sets the label text (label stays grey), closes menu. Opening one closes the others. Original filters server-side (REST); clone filters client-side from data attributes captured via the same API: `data-region`, `data-type` (khu-do-thi / khu-dan-cu; Solaria Rise & The Pearl have none), `data-product` (multi), `data-status` (completed / ongoing; no project is "upcoming" → "Không tìm thấy dự án").
- Filtered results show every match (no "Xem thêm"). Clear-all resets labels and restores the initial 8 + "Xem thêm".
- Preloader is not shown on the original sub-pages (custom.js hides it unless homepage).
