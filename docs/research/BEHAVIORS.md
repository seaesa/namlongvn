# Behaviors (measured on namlongvn.com, 2026-10-05)

| Element | Trigger | Behavior | Clone |
|---|---|---|---|
| Preloader | page load | white overlay + logo, fades out (0.8s) | `.preloader.hidden` |
| Header ≥1200 | – | static (scrolls away), 90px tall | `.site-header` |
| Header <1200 | scroll | sticky, 73px (66px <768); hides on scroll down, shows on scroll up | `is-hidden` / `is-stuck` |
| Menu link | hover | color #252b37 → #98221f, 0.5s cubic-bezier(.65,0,.35,1) | ✓ |
| Mega menu (Giới thiệu, Lĩnh vực) | hover li ≥1200 | white full-width panel, 2-col grid, links fade/slide in staggered; page behind gets rgba(166,166,167,.8) + blur(5px) | `.mega`, `.menu-backdrop` |
| "Tìm kiếm theo nhu cầu" | click | interest panel with 2 tabs (Nhà đầu tư & Đối tác / Người mua nhà); closes on header mouseleave | `.interest` |
| Burger <1200 | click | panel slides in from right (0.4s), lines morph to X, items stagger in, red bottom CTA bar | `body.menu-open` |
| Submenu mobile | click parent | accordion (+ / −), parent turns red | `.is-open` |
| Search icon | click | full-page search with input + popular tags; icon becomes × | `body.search-open` |
| Hero | time | slick fade 600ms, autoplay 12s, 5 dots bottom-left; text fades up on active slide | ✓ |
| Business cards | time + click | slick 4/3/2/1 per view (bp 1100/800/480), scroll 3, autoplay 3s, arrows + dots, peek 80px on mobile | ✓ |
| Card hover ≥1200 | hover | image scale, arrow shifts right | ✓ |
| News | time | slick 3/2/1 (bp 992/500), autoplay 3s, dots on mobile | ✓ |
| Key figures | continuous | linear marquee, pauses on hover; <500px becomes a vertical list; numbers count up on view | rAF marquee |
| Commitments | continuous | CSS marquee ~98px/s, infinite | `@keyframes marquee` |
| Scroll reveal | viewport enter | fadeInUp 1s, delays .1/.2/.3s, once | IntersectionObserver |
| Go-top | scroll | circle button bottom-right, smooth scroll to top | ✓ |
| Cookie notice | load | floating card bottom (desktop) / bottom sheet (mobile) | localStorage |
