# Business pages spec (measured 2026-10-05)

Pages: `/linh-vuc-kinh-doanh/`, `/dau-tu-quan-ly-dau-tu/`, `/phat-trien-nha-o-vua-tui-tien/`, `/dich-vu-xay-dung/`, `/dau-tu-phat-trien-bat-dong-san-thuong-mai/`.
Files: `src/pages/<slug>.html`, `assets/css/pages/business.css`, `assets/js/pages/business.js`.

## Listing (.i-business → .biz-row)
- Banner 660 / 480 (1200–1439) / 528 (768–1199) / 810 (<768); bg desktop `banner-our-busines.jpg`, ≤1199 `-ipad`, ≤767 `-mobile`. Tag gets padding-right 30% at 992–1199.
- Section padding 60 (40 mobile). Row: flex, center-aligned, padding-bottom 55 + margin-bottom 55, 1px #d5d7da line at the bottom (container width −30, centered); last row padding-bottom 20, no line.
- Name col 1/3: h2 37/44.4 bold, mb 20; hover → red (0.5s ease). Body col 2/3: grid 1fr 1fr gap 20; image radius 8, height 280 / 224 / 240 (992–1199, grid 55%/45% gap 0) / 160 (768–991).
- Description padding-left 48 (35 at 768–991), p 20/29 #252b37 (17.6/24 at 1200–1439, 18/27 ≤991). "Xem thêm" red 500, arrow.
- Hover on image link: img scale(1.1), transition transform .5s.
- 768–991: row stacks (name 32/38.4, body padding-left 15, row mb 32). <768: name hidden (15px spacer), card 480 tall, text overlay at bottom (padding 20, radius 16 16 0 0, dark+white gradients, blur 8), title 18/25 bold white + long arrow, p 14/27 white.

## Single template (.back-page + .banner-page-single + .p-detail-single)
- Banner 450 (≥1200), 460 (992–1199), 768/553 aspect (768–991, gradient starts at 30%), 242 tall at 390 (h1 32/39). h1 bottom sits 40px above banner bottom (desktop), 50px on mobile.
- Lead `.d-business` 20/29, mb 48 (17.6/24, 18/27, 17/27 mobile).
- Slider `.sbusiness`: slick 2/2, autoplay 3000, speed 500, linear, dots, no arrows, infinite, pauseOnHover; <480 → 1/1. Slide gap 20 (padding 10, list margin −10). Image heights 390/336/310/250/230, radius 8. Dots: in-flow (top 25, 15 mobile), 10px li, inactive #e9eaeb, active #98221f.
- Empty `.exp-business` block: margin 50 0 30 (30 0 10 mobile), 16px tall.
- Reveal: banner h1 .4s; lead/slider/exp .4/.6/.8s.

## Commercial page
- Banner bg `2025/09/banner-BDS-thuong-mai-1.jpg` (ipad / mobile variants), 384 tall at 390.
- Stats: 4 cols, number 96px (88 at 1200–1439, 90 ≤991, 72/50 mobile) red 500 "39+ / 4+ / 26+ / 6+", unit "Héc-ta" 24px red, label 16px. <768: one per row, 2-col grid (number+unit left, label right 18px), padding 25 15, bottom line. Count-up on view (2s ease-out).
- Lead margin 24 0 50. Title 37/44.4 bold (32/38.4 ≤991, 40/46 mobile), then 70px gap (the original tab list is empty — no pills render).
- `.s-featured` slick: 4/4, no autoplay, speed 500, arrows + dots; 1100 → 3/3, 800 → 2/2, 480 → 1/1 no arrows + 70px right peek. Card height 440/430/464/480, radius 8; overlay min-height 192 (160 at 768–991), padding 16 15, radius 16 16 8 8, blur 8; status pill 12px on rgba(177,31,27,.6); logo max 100×43 (80 at 992–1199, 130 mobile); name 17/20.4 500, location 14/18 #f5f5f5, long arrow top-right. No hover effect measured on cards.
