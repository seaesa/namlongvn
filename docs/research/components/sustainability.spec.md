# Phát triển bền vững — /phat-trien-ben-vung/

Measured on the live site at 1440 / 1280 / 1024 / 768 / 390 (viewport height 900).

## Banner (`.banner-page`, shared `.page-banner` + `.banner-alt`)
- Background swaps by breakpoint: `-mobile.jpg` (<768), `-ipad.jpg` (768–1199), desktop (≥1200). Done with CSS vars `--bg-m/--bg-t/--bg-d`.
- Height: 660 (≥1440), 480 (1200–1439), 528 (768–1199), 810 (<768). The 1200–1439 and 768–1199 values differ from the shared `.page-banner`, so they're overridden in the page CSS.
- h1 is 52.8/56, 48/56 (992–1439), 52.8/56 (768–991), 36/47 (<768). The `<br>` shows only at ≥768.
- Tag: 20/28 #ccc; 20/27 + padding-right 294 (992–1199); 18/27 (768–991); 17/23 + pr 40 (<768).

## Section rhythm
- `.s-bottom`: padding 60/0 (40 at <768). The report section has padding-top 24 and bottom 0. The contact section has top 0 and bottom 60/40.
- Title `.title.fs-36`: BT-B 37/44.4 (≥992), 36/43.2 (768–991), 36/46 −0.72px (<768), mb 20. Titles 1 and 3 have a `<br>` that shows only at <768.
- Vertical spacing depends on collapsing margins: title mb 20 collapses with slider mt 40, and with report mt 30. Impact slider margin −60 0 30 overlaps the title.

## Khung phát triển (`.s-featured`) — slick options
`{slidesToShow:3, slidesToScroll:3, speed:500, autoplay:true, autoplaySpeed:3000, cssEase:'linear', infinite:true, dots:false, arrows:false, pauseOnHover:true, responsive:[{800:{2,2,dots:true}},{480:{1,1,dots:true}}]}`
- slick-list margin 0 −10px; slides padding 0 10. At <480 slick-list padding-right is 80 (peek).
- Card radius 8, height 520 / 420 (992–1199) / 470 (768–991) / 390 (<768).
- Caption is absolutely positioned at the bottom. Height 173/152/148/136, padding 22.4 24 19.2, radius 16 16 8 8, rgba(16,17,18,.5) + white 20% overlay, backdrop blur 8px.
- h3 is BT-M at 27 / 24 / 23 / 22 / 20.8px with line-height 1.2. It has padding-right for the white long arrow (30×15, top 10).
- Hover: the image scales to 1.1 over 0.5s.
- Dots: relative, top 15, red 4px bullets (opacity .25 → 1 when active).

## Đóng góp nổi bật (`.s-impact`) — slick: fade, 1 slide, infinite false, autoplay 3000, speed 500, dots true (none render with 1 slide)
- Slide is a 2-column grid. Text column padding 50 50 0 0. small is 15px #414651. h3 is BT-M 24/28.8 #414651 with margin 10 0 15. Then p and "Xem thêm" (link-more).
- Image height 420 / 352 / 310 (768–1199) / 480 (<768), radius 8, hover scale 1.1.
- <768: the text becomes an overlay at the bottom of the image. Padding 15 15 10, radius 16 16 8 8, dark + blur background, white text, h3 36/43.2, p 14px, "Xem thêm" hidden.

## Báo cáo (`.sust-report`)
- Flex layout with gap 35.2 (30 at <992) and margin 30 0. Left cover height 360 / 350 / 224 (<768), radius 8.
- PDF pill: white, 90×32, radius 20, top/left 20. Red BT-M text plus a 24px circle-arrow icon on the right.
- Info bar: absolute bottom, padding 20 25 (16 at <768), radius 16 16 0 0, blur. Date 14/24 #d5d7da (12/18 at <768). Title BT-B 20/24 (20/30 at <768).
- Doc rows: flex space-between, gap 32/16, pb 10, mb 20, border-bottom #d5d7da. h4 is BT-B 17.6/21.12 #252b37 (18/21.6 at <768, rows wrap). Meta: PDF link 75×24 with icon, date 15px #535862 (14.24 at 1200–1439).
- `#more-content` (3-column grid) is display:none and empty on the original. There is no "xem thêm" toggle, so it's kept hidden.

## Contact box
- Margin-top 50, padding-top 70. h6 is BT-M 16/19.2 #717680 with mb 8. h5 is BT-B 20/24 #000 with margin 15 0 25.
- Info block has border-top and padding 20 0. Email row has padding-left 30 and a 20px mail icon.
