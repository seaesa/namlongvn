# News list (/tin-tuc/) + article detail — measured spec

## List
- Banner: 660 / 480 (1200–1439) / 528 (768–1199) / 810 (<768). Images: banner-news.jpg ≥1200, news-ipad.jpg 768–1199, news-mobile.jpg <768.
- `.s-search` padding 60px 0 (80px 0 40px <768). Head grid 70/30: `#tabTitle` 51.2/61.44 Bold, mb 20 (<768: 36/44, −0.72px, 1 col); search box right column.
- Search: input 44px, pad 10 10 10 40, 14px, bg #f5f5f5, r 8, icon at left 10. Dropdown abs top 44, max-h 300 scroll, r 6, shadow 0 4 8 rgba(0,0,0,.1); items pad 10, 14/24, border-bottom #eee, match in `<strong>` red bold. Original queries WP REST (smart-search); clone searches the bundled items (diacritics-insensitive, ≥2 chars). Mobile (<768) box moves below the tabs.
- Tabs `#newsTabs`: pills pad 8 12, r 30, 16/24, #252b37, active red bg; li margin 0 7; ul pb 32 + 1px #d5d7da bottom line; nowrap <1200. <768: horizontal scroller (pad 16 0 24, no line). `.js-rotating-tabs` (≤768): clicked tab's previous siblings move to the end, scroller reset to 0.
- Grid: 3 / 2 (<992) / 1 (<768) cols, gap 30 20 (15 20 mobile), mt 48 (30 mobile). Thumb h 240 / 200 (1200–1439) / 184 (992–1199) / 208 (768–991) / 232 (<768), r 8. Date 14 #717680; title 16/21 Bold (22 at 992–1199). Hover ≥1200: img scale 1.1 (0.5s), title red.
- Pagination: 6/page (media 7: 1 featured + 6). Buttons 32×32, 1px #d5d7da, r 4, #535862, Medium; active/hover red; disabled .4. Window: current±2, "…", last. URL `?paged_50|paged_56|paged_media=n&active_tab=cat-50|cat-56|cat-media` (clone re-renders client-side, same params).
- Media: featured grid 66/34, img 512 (432 ≤1439, 280 ≤991, 510 stacked <768), text pad 15 0 15 30, date 14, title 20/23 Bold; cards: date 12, title 16/23. Click → modal: overlay rgba(0,0,0,.8), white box 1080 r 10, text col 402 (pr 50), stage 604×402 r 8, 5 thumbs 90px (active red border), side circle arrows, close 16px top/right 16. YouTube items lazy iframe.
- Contact: mt 80, pt 24; h6 16 Medium #717680; h5 20/24 Bold #000 (m 15 0 20); info border-top, email with 20px icon pl 30.

## Detail
- Back link = shared `.back-link` (→ /tin-tuc/?active_tab=cat-50).
- Section pad 8 0 60 (40 mobile). Head: m 20 0 40, pad 0 90 40 (0 40 at <992; <768 m 0 0 25, pad 0 0 20) + 1px bottom line. Date #535862. h1 40/48 Bold; 40/55 (1200–1439), 45/50 (992–1199), 41/48 (768–991), 24/32 −0.48 (<768).
- Body pad 0 90 / 0 40 / 0. p mb 14.4. Links #0d6efd. Image pairs: 2-col table, td pad 1, img r 8; full images max 860 centered r 8; captions = centered italic paragraph.
- Footer: "Nguồn" Bold #252b37 + link/share icon buttons; mt 80 (50 mobile). Popovers abs top 24 + mt 10, pad 10 19.2, r 6, shadow 0 0 10 rgba(0,0,0,.2), fade/slide 10px 0.5s.
- "Tin tức khác": pad 16 0 48, mb 40; head grid 70/30, h2 37/44.4 (32 at 768–991, 40/46 −0.8 mobile); "Xem thêm" pr 35. Slick: 3 / scroll 1 / speed 600 linear / autoplay 3000 / pauseOnHover / infinite, no arrows; <500: 1 slide + dots (dots relative, top 15). Slide pad 0 10. Thumb 240/200/210/250.
