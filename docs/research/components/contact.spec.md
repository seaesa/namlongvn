# Liên hệ — /lien-he/

## Banner
- Same template as the sustainability page: images swap at 768/1200, height 660/480/528/810. There's no tag line.
- h1 "Liên hệ với <br>chúng tôi". The br shows only at <768.

## Head office (`.contact-section`)
- Section padding 60 (40 at <768). Block margin-bottom 40 (24 at <768). It's a flex item, so the last p's mb 10 counts (flow-root in the clone).
- Title: BT-B 37/44.4 (≥992), 32/38.4 (768–991), 40/46 −0.8px (<768), mb 20.
- Paragraphs: mb 10, labels in BT-B. At <768 the city span becomes a block.
- Social row: margin 30 0 10, 24px red circles with white glyphs, 38px pitch. Hover shows no visible change (the original's hover layer is empty).
- "Xem vị trí trên bản đồ": BT-M red, with a 24px circle-arrow at right −35. At <768 it's 14px with margin-top 19.2.
- <768: a 1px #d5d7da line follows, with margin-top 48.

## Branch accordion (`.brand-ot .branch-toggle`)
- Items have border-bottom #d5d7da (none on the last). Header is flex space-between, padding 35 0 (25 at <768), BT-M 37px (32 at <768), line-height 24, colour #181d27, red on hover (0.5s ease).
- Arrow: 40×40 box with a long black arrow, right aligned. It doesn't rotate when open.
- Body: hidden, padding-bottom 15, colour #444, p mb 10.
- Click uses jQuery slideToggle at 400ms (swing). Measured on the original: +26px at 100ms, full 184px by about 500ms. Only one office is open at a time: opening one closes the other. Clicking an open one closes it.
- No contact form on the page.
