# Giới thiệu (/gioi-thieu/) — measured spec

Measured on the live page at 1440/1280/1024/768/390 (computed styles, slick options, jQuery handlers).

## Sections (1440: y / height)
banner 90/660 · #s-vision 750/580 · #s-values 1330/520 · #s-our-business 1850/682 · #s-legacy 2532/~1201 (depends on the current year's awards) · #s-directors 1158 · #s-management 1096 · #s-partnerships 308. All sections padding 60 (40 below 768); 1px #d5d7da line 60px under each block (business: hidden below 992).

## Vision
Grid col-3 / col-9. Item grid 18%/82% (17/83 at 1200–1365), padding 20 0 (first item 10 top), border-bottom 1px. Number 30px/24 500 red, padding-top 9 (1.875vw at 1200–1365). Text 24px/38 ink. ≤480: one column, gap 10, 24px/33; ≤420: 20.8px/27.2.
Toggle arrow (22–24×40, top 25, right 20; top 5 at 768–979; top 10 h30 ≤480) shown only below 992. Click: slideToggle(400) on the body + rotate(90deg).

## Values
Desktop (≥1200): title col 17% (19% at 1200–1365), boxes right-aligned, gap 24. Box 288×400 (224 at 1200–1365), open box 328 (320); #f5f5f5, radius 12, padding 24. Icon 38×39 mb 8; title 24px/28.8 500 red mb 16; desc 16px/25.6 #414651, shown only on the open box (slideUp 0.3s: translateY 10→0 + fade). Long arrow at right 20 / bottom 25 on closed boxes (fades 0.4s). Hovering a box (mouseover) opens it instantly; leaving the row re-opens the first box.
Below 1200: slick: 2 per view (1 below 600), autoplay 3000, speed 500, infinite, no arrows/dots; slide padding 0 15, list margin 0 -15; box min-height 368 (992–1199) / 408; ≤480 list padding-right 80 (peek), box padding 20, min-height 375, desc 14/24.

## Core business
Title + intro (2 lines) + grid 50/50 mt 40. Image box 410 (336 at 1200–1365, 400 below), radius 8; two stacked images cross-fade (opacity 0.5s). Hover a line: swap to its image; leaving the list: back to the first line's image. List centered vertically, pl 24; items 20px 500 ink, padding 20 0, border-bottom; arrow 20×20 right 10 top 22, on hover (≥1200) red + left/right loop animation 1s. Below 992: image above the title (full width), list full width.

## Journey (slick)
Years: slidesToShow 6 (4 <800, 1 <480 + list padding-right 60), focusOnSelect, infinite false, speed 500, no swipe, asNavFor content. Track padding-bottom 30; line 2px #ddd at bottom 25. Year 25px grey #717680, padding 10 0 40 5; current 50px 700 red. Dot 12px #a4a7ae (current 24px red) at left 20 / bottom -10 (-15).
Content: 1 slide, adaptiveHeight, infinite false, arrows (40px circles, border 1px ink, top 10), padding-top 80, asNavFor years. Each year: inner slick (dots, adaptiveHeight, no swipe); image 50% (pr 24) height 400 / 304 (1200–1365) / 320 (992–1199) / 460 (<992) / 260 (≤480), text 50% (pl 24) #535862, bullets 25px indent mb 9.6. Awards: "Thành tựu và giải thưởng" 18px 500 red; slick 5/5 (4/4 ≤1100, 3/3 ≤800, 2/2 ≤480, 1/1 ≤365), autoplay 3000, speed 1000 linear, infinite; image box 147 tall, caption 14px/24 #252b37.

## Board / management
Pills (shared) margin 40 0 30. Grid 4 cols ≥992, 3 cols ≥576, 2 cols below; gap 44×20. Card 410 tall (390 at 1200–1439, 330 <1200, 300 <768), padding-top 25, radius 8, blue-grey gradient; img zoom 1.1 over 0.5s on hover (≥1200). Info panel: glass (rgba(16,17,18,.5) + blur 8), radius 20 20 0 0, padding 15 15 10, min-height 120 (143 at 992–1199, 138 at 768–979); name 700 white with a white arrow; role 13px/20.8, 3-line clamp. ≤480: info below the image, dark text, image 260 (230 ≤420, 190 ≤365).
Clicking a card opens a modal: backdrop black .8 (fade .15s), dialog 930 wide (slides down 50px over 0.3s), white with radius 8; image column 360×465 on the gradient; text column pl 40, max-height 465 scrollable; name 30/36 700 #414651, role 16/24 #535862. Close: X top-right, Esc, backdrop click. ≤480 full-screen stacked. Bios are placeholder text.

## Partners
CSS marquee (translateX 0→-50%, ~73px/s), pauses while a logo is hovered. Logo slot width = 100vw/7 − 70 (≥800), /3 (500–799), /2 (<500), margin 0 35, padding 15 0; img max-height 80, grayscale → color on hover (0.4s).

## Anchors
#s-vision, #s-legacy, #s-directors, #s-management: no scroll offset on the original (static header ≥1200); html scroll-behavior smooth.
