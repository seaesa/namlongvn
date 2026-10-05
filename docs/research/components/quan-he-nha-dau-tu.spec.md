# Quan hệ nhà đầu tư — measured spec

Source: https://www.namlongvn.com/quan-he-nha-dau-tu/ (measured in one session at 1440/1280/1024/768/390).

## Layout
- Banner `.page-banner.inv-banner`: 660 / 480 (1200–1439) / 528 (768–1199) / 810 (≤767). Image: desktop `banner-investor-relations.jpg`, ≤1199 `investor-relations-ipad.jpg`, ≤767 `investor-relations-mobile.jpg`. Tag at 992–1199 has padding-right 294px, 20/27; 768–991 18/27.
- Section `.p-detail` padding 60 (40 ≤767). Block separators `.b-top-stock`: margin-top 60, padding-top 50, border-top 1px #d5d7da (≤767: 50/30).
- Kicker 25/30 M #414651 (≤767 18/21.6, mt 50). Title 37/44.4 B (≤991 32/38.4, ≤767 30/46 ls −0.6).
- Box titles (`.box-title`): 28.8/34.56 (≥1440), 25.6/30.72 (1200–1439), 29/34.8 (992–1199), 24/32 (768–991), 40/45 pr 30 (≤767). The financial-pane title and "Chi cổ tức" are 24px on mobile.
- Stock price 80/112 B #98272b (60/84 ≤767), arrow 45×45 at right −50, centred. Status pill bg #f9bebc, radius 30, padding 5 10.
- Detail cards bg #f5f5f5, radius 8, padding 20 15, gap 40 (30 ≤767), 1px divider at right −20. Up #0eab69, down #98221f. Flex gap 60; stacked ≤1199 (mb 20).
- Average tables: white, 1px #e0e0e0, radius 8, padding 10 20; rows 11px 0 with 1px #d5d7da; value B 18 (up #2e7d32).
- Pills: padding 8 12 (6 13 in disclosure), radius 30, gap 14 (li margin 0 7), active bg #98221f. Text tabs: M 16, #535862, active red, padding-right 15.
- Price box: #f7f7f7, radius 8, padding 20 30, margin 30 0; divider 1px #d5d7da.
- Dropdown: button M 16, padding-bottom 13, border-bottom; chevron 8×17. Menu: white, radius 6, padding 8 0, max-height 250 scroll, no shadow, 2px below; item padding 10 15, hover #f5f5f5. Year dropdown max-width 48% (50% ≤1199, 100% ≤767). Month/quarter selects 215px (160 ≤767), mr 30 + gap 16.
- Financial grid: columns 48/52 (≥1440), 43/57 (1200–1439), 52/48 (992–1199); label rows 42/43px, 14.4px; values B right; 4 periods per page, fade 0.4s; triangle arrows 12×14 at top 15 (prev left −10, disabled opacity .5). ≤991: period select + bordered list.
- Doc lists: max-height 350 scroll; row flex, padding 16 0, border #e1e4e8; title B 17.6/24 (16.8 at 1200–1439, 17 at 992–1199, 18/25 ≤767 stacked); meta 224px, gap 48; PDF M red with 24px circle arrow at left 40 (hover ≥1200: movelr 1s infinite); date 15px #535862.
- Annual report / newsletter: cover 350 tall, radius 8, PDF pill top/left 20, info overlay radius 16 16 0 0 at the bottom, hover scale 1.1 (0.5s); list on the right, gap 40.

## Behaviour
- `#stock-nav-menu`: bg #fafafa, radius 8; height 69 (≥1200), 44 (768–1199), 63 (≤767); grid 4 cols ≥992, horizontal scroll ≤991 (nowrap). Separators 1px #d9d9d9, 60% high, none on the last item.
- Sticky: becomes `position:fixed; top:0` once scrollY ≥ its offset; the wrapper collapses (no placeholder). The site header is NOT sticky on this page at any width.
- Scroll-spy: the active link (red + 0.4px text-shadow) belongs to the last section whose top is ≤ nav height (about 70–100px threshold). Nothing is active above the first section.
- Clicking a link smooth-scrolls so the target top lands at the nav height (69/44/63). ≤767: the active link is centred in the scrolling nav.
- Trading tabs Tuần/Tháng/Quý/Năm switch the date range (week 28/09–05/10/2026, month 05/09, quarter 05/07, year 05/10/2025) and the data.
- Stats tabs: monthly (year + month), quarterly (year + quarter), annual (year; option order as on the original).
