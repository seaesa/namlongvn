# Tuyển dụng (/tuyen-dung/) — measured spec

Files: `src/pages/tuyen-dung.html`, `assets/css/pages/careers.css`, `assets/js/pages/careers.js`.

## Banner (.no-des-banner)
- Images: desktop `banner-careers-2.jpg`, ≤1199 `careers-ipad.jpg`, ≤767 `careers-mobile.jpg` (bottom-dark gradient; ::before top 30% ≤991).
- Height 660 (≥1440) / 480 (1200–1439) / 528 (768–1199) / 810 (≤767, padding 40). h1 52.8/56 → 48/56 (≤1439) → 52.8/56 (≤991) → 32/47 (≤767).

## Tabs
- Pills: 29px M, lh 24, padding 10 20 13, radius 30, gap 10, margin-bottom 30. 19.2px at 1200–1439, 27px at 992–1199, 16px ≤767.
- `#position` hash or `?tab=job` opens the jobs tab. CTA "Xem thêm" opens the jobs tab, then after 200ms animates scroll to pills − 30px (400ms).

## Core values
- Block: flex column gap 40, padding 60 0 (40 0 60 ≤767). Title 37px B lh 44.4; lead 20/30.
- ≥1200: row of 3 boxes, gap 24, height 370; active box flex 2 (560 vs 304 at 1440). Box bg #f5f5f5, r12, p24; title 24/28.8 M red; text #414651 shown only on active (fade .4s); inactive boxes show long arrow bottom-right (r20 b25, 30×19). Hover sets active; leaving the row resets to the first.
- <1200: slick, 2 per view (≥768) / 1, scroll 1, dots, no autoplay, not infinite, slide padding 0 15 (list margin −15); <500 list padding-right 70, slide padding 0 10. All texts visible; click toggles active. ≤767 box p20, title 33/39.6, text 14px.

## Sliders (slick options read from the live page)
- Workplace: 2/2, autoplay 3000, speed 500, linear, infinite, dots; <800 1/1. Img 598×390 r8. Slider margin 40 0 30.
- Benefits: 4/4, autoplay 3000, not infinite, dots; 1100→3/3, 992→2/2, 576→1/1 (no autoplay, list padding-right 70). Card bg #f5f5f5 r8 p20, min-height 485 (≥1200) / 398 / 350 (≤991). Head icon 40 + 20px M red; text 16/25.6 #535862 justify. Hover (desktop): other cards scale .92, hovered margin −10 0 & padding 34 20, icon scale 1.1, text #252b37 (.3s).
- Awards: 5/5, speed 600 linear, autoplay 3000, not infinite, dots (hidden at 5 slides); 1100→4, 800→3, 480→2, 365→1.
- Dots: 4px bullets #e9eaeb / red active, row 24px shifted down 25px.

## Other blocks
- Why: 2 cols ≥992 (title 37px, 32px ≤991, 40/46 ≤767), YouTube embed 16:9 margin-top 20.
- Award: title 30/36 (36 ≤991), desc max-width 54% / 80% (1200–1439) / 68% (992–1199) / 100%, margin-bottom 50; label 18px M red.
- CTA: margin-top 100, full-bleed #f9f0ef, h2 43.2/60 M red (36 ≤991, lh 44 ≤767), button red pill 18px M, padding 15 45.

## Jobs tab
- Search 300×44 bg #f5f5f5 r8, 14px, icon left 10; ≥992 absolutely placed at the pill row's right edge (top −90px); ≤991 full width in flow. Filter runs on submit (Enter) only: lowercase match on title / company / location.
- Grid 3 cols (2 ≤991, 1 ≤767), gap 20, margin 50 0. Card bg #f5f5f5 r8 padding 0 20 20; title 18.4 B lh 24 #252b37 min-h 48 + arrow; info border-top #d5d7da, rows flex space-between, #535862.
- Pagination: 12 per page (36 jobs → 3 pages); prev/next chevrons + numbers, 32×32 r4 border #d5d7da, active/hover red; disabled opacity .4 not-allowed; hidden if ≤1 page; empty state "Không tìm thấy vị trí tuyển dụng nào.". The original does not scroll when the page changes.
- Card click: the original goes to `/vi-tri-tuyen-dung/<slug>/`; the clone opens a modal with placeholder text instead (Esc, overlay or × closes it).
