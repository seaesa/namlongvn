// Probe mobile/tablet header + menu behaviours on the original or the clone.
// usage: node scripts/measure/mobile-menu-probe.mjs orig|clone <width>
import { chromium } from 'playwright';
const [which, W] = process.argv.slice(2);
const ORIG = which === 'orig';
const base = ORIG ? 'https://www.namlongvn.com' : 'http://localhost:5173';
const S = ORIG
  ? { header: '#header', burger: '.toggle-menu', panel: '.main-menu-wrap', sub: '.main-menu > li:nth-child(1)', subA: '.main-menu > li:nth-child(1) > a', interest: '.bt-menu-mobile a, .bottom-menu.bt-menu-mobile', search: '.toggle-menu-container .search_form', searchBox: '#search', gotop: '.gotop', overlay: '.overlay-mobile' }
  : { header: '#siteHeader', burger: '.js-toggle-menu', panel: '.nav-panel', sub: '.menu__item.has-sub', subA: '.menu__item.has-sub > a', interest: '.nav-panel__interest-mobile a', search: '.nav-bar__tools-mobile .icon-search', searchBox: '#search', gotop: '#gotop', overlay: '.nav-panel' };
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +W, height: 844 }, hasTouch: false });
const p = await ctx.newPage();
await p.goto(base + '/gioi-thieu/'); await p.waitForTimeout(3500);
await p.evaluate(() => { document.querySelector('#cookie-notice, #cookie')?.remove(); });
const st = (sel, props) => p.evaluate(({ sel, props }) => { const e = document.querySelector(sel); if (!e) return 'n/a'; const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return props.map(k => k + '=' + c[k]).join(' ') + ` box=${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.width)},${Math.round(r.height)}`; }, { sel, props });
const log = (k, v) => console.log(k.padEnd(28), v);

// 1. header while scrolling down / up
await p.mouse.wheel(0, 900); await p.waitForTimeout(900);
log('header after scroll down', await st(S.header, ['position', 'top', 'transform', 'boxShadow']));
log('gotop after scroll down', await st(S.gotop, ['display', 'opacity', 'visibility', 'position', 'right', 'bottom', 'backgroundColor', 'borderColor']));
await p.mouse.wheel(0, -300); await p.waitForTimeout(900);
log('header after scroll up', await st(S.header, ['position', 'top', 'transform', 'boxShadow']));
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);

// 2. open menu: scroll lock + panel
log('panel closed', await st(S.panel, ['position', 'left', 'transform', 'transition', 'visibility', 'opacity']));
await p.click(S.burger); await p.waitForTimeout(150);
log('panel @150ms', await st(S.panel, ['left', 'transform', 'opacity']));
await p.waitForTimeout(900);
log('panel open', await st(S.panel, ['left', 'transform', 'overflowY', 'height', 'zIndex']));
log('html/body overflow', await p.evaluate(() => getComputedStyle(document.documentElement).overflow + ' / ' + getComputedStyle(document.body).overflow + ' | html.cls=' + document.documentElement.className + ' body.cls=' + document.body.className));
const y0 = await p.evaluate(() => scrollY);
await p.mouse.move(+W / 2, 600); await p.mouse.wheel(0, 600); await p.waitForTimeout(600);
log('scroll lock (page y before/after wheel)', y0 + ' -> ' + await p.evaluate(() => scrollY));
log('header when open', await st(S.header, ['position', 'top', 'zIndex', 'backgroundColor']));

// 3. sub menu: hover then click
await p.hover(S.subA); await p.waitForTimeout(700);
log('sub after hover', await p.evaluate((s) => { const li = document.querySelector(s); const m = li.querySelector('.submenu, .mega'); return 'li.cls=' + li.className.replace(/menu-item[\w-]*/g, '').trim() + ' subH=' + (m ? m.offsetHeight : 'n/a'); }, S.sub));
await p.click(S.subA); await p.waitForTimeout(700);
log('sub after click', await p.evaluate((s) => { const li = document.querySelector(s); const m = li.querySelector('.submenu, .mega'); return 'li.cls=' + li.className.replace(/menu-item[\w-]*/g, '').trim() + ' subH=' + (m ? m.offsetHeight : 'n/a') + ' url=' + location.pathname; }, S.sub));

// 4. interest bar
const hasInterest = await p.$(S.interest);
if (hasInterest) { await p.click(S.interest).catch(() => {}); await p.waitForTimeout(900);
  log('interest open', await p.evaluate(() => { const m = document.querySelector('.menu-interest, .interest'); if (!m) return 'n/a'; const c = getComputedStyle(m); const r = m.getBoundingClientRect(); return `display=${c.display} pos=${c.position} box=${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.width)},${Math.round(r.height)} body=${document.body.className}`; }));
  await p.screenshot({ path: `docs/design-references/pages/${which}-interest-${W}.png` });
}
// 5. close via burger, then check scroll restored
await p.goto(base + '/gioi-thieu/'); await p.waitForTimeout(2500);
await p.evaluate(() => { document.querySelector('#cookie-notice, #cookie')?.remove(); });
await p.click(S.burger); await p.waitForTimeout(800); await p.click(S.burger); await p.waitForTimeout(800);
await p.mouse.wheel(0, 500); await p.waitForTimeout(500);
log('after close, wheel scrolls', String(await p.evaluate(() => scrollY)));
// 6. search icon (mobile)
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
await p.click(S.search); await p.waitForTimeout(900);
log('search open', await st(S.searchBox, ['display', 'position', 'height', 'zIndex']) + ' url=' + await p.evaluate(() => location.pathname + location.hash));
await p.screenshot({ path: `docs/design-references/pages/${which}-search-${W}.png` });
await b.close();
