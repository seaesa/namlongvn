import { chromium } from 'playwright';
const b = await chromium.launch();
for (const W of [1440, 390]) {
  const p = await b.newPage({ viewport: { width: W, height: 844 } });
  await p.goto('https://www.namlongvn.com/gioi-thieu/'); await p.waitForTimeout(3500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const out = [];
  for (const y of [300, 1000, H - 1600, H - 1000, H - 844]) {
    await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(700);
    out.push(await p.evaluate(() => { const g = document.querySelector('.gotop'); const c = getComputedStyle(g); return `y=${Math.round(scrollY)} disp=${c.display} op=${c.opacity} bg=${c.backgroundColor} border=${c.borderColor} footerTop=${Math.round(document.querySelector('footer').getBoundingClientRect().top)}`; }));
  }
  console.log('## gotop ' + W + ' (H=' + H + ')\n  ' + out.join('\n  '));
  await p.close(); await new Promise(r => setTimeout(r, 5000));
}
// tablet menu
const p = await b.newPage({ viewport: { width: 1024, height: 844 } });
await p.goto('https://www.namlongvn.com/gioi-thieu/'); await p.waitForTimeout(3500);
await p.evaluate(() => document.querySelector('#cookie-notice')?.remove());
await p.click('.toggle-menu'); await p.waitForTimeout(900);
await p.screenshot({ path: 'docs/design-references/pages/orig-menu-1024.png' });
console.log('## tablet 1024 menu', await p.evaluate(() => { const q = s => document.querySelector(s); const f = (s, k) => { const e = q(s); if (!e) return s + ' n/a'; const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return s + ' box=' + [r.x, r.y, r.width, r.height].map(Math.round) + ' ' + k.map(x => x + '=' + c[x]).join(' '); };
  return ['\n  ' + f('.main-menu-wrap', ['transform', 'padding', 'width']), f('.overlay-mobile', ['display', 'backgroundColor', 'opacity']), f('.navi-head', ['padding']), f('.navi-head .lang', ['padding', 'margin', 'borderRadius']), f('.main-menu > li > a', ['fontSize', 'padding']), f('.bt-menu-mobile a', ['fontSize', 'padding'])].join('\n  ') + '\n  body=' + document.body.className + ' bodyOverflow=' + getComputedStyle(document.body).overflow; }));
await p.hover('.main-menu > li:nth-child(1) > a'); await p.waitForTimeout(700);
console.log('  hover sub height', await p.evaluate(() => document.querySelector('.main-menu > li:nth-child(1) .submenu').offsetHeight));
await p.click('.main-menu > li:nth-child(1) > a'); await p.waitForTimeout(700);
console.log('  click sub height', await p.evaluate(() => document.querySelector('.main-menu > li:nth-child(1) .submenu').offsetHeight + ' cls=' + document.querySelector('.main-menu > li:nth-child(1)').className.match(/open/)));
await p.screenshot({ path: 'docs/design-references/pages/orig-menu-1024-sub.png' });
await b.close();
