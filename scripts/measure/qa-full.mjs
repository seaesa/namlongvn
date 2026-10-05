// Full release QA on the local clone: every static page at several widths.
// Reports: JS errors, failed local requests, horizontal overflow, broken images, elements sticking out
// of the viewport, text clipped inside its box, suspicious strings, missing <title>.
import { chromium } from 'playwright';
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const widths = (process.argv[2] || '1440,1024,768,390').split(',').map(Number);
const skip = new Set(['assets', 'docs', 'node_modules', 'scripts', 'templates', 'data', '.playwright-mcp', 'dist', 'en']);
const routes = [];
(function walk(d) { for (const n of readdirSync(d)) { if (skip.has(n)) continue; const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n === 'index.html') routes.push('/' + p.replace(/^\.\/?/, '').replace(/index\.html$/, '')); } })('.');
routes.sort();
const b = await chromium.launch();
const issues = [];
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  for (const r of routes) {
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push('JS: ' + e.message.slice(0, 100)));
    p.on('requestfailed', q => { if (q.url().startsWith('http://localhost')) errs.push('REQ FAIL ' + q.url().replace('http://localhost:5173', '')); });
    p.on('response', q => { if (q.url().startsWith('http://localhost') && q.status() >= 400) errs.push(q.status() + ' ' + q.url().replace('http://localhost:5173', '')); });
    await p.goto('http://localhost:5173' + r, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(r === '/' ? 3200 : 700);
    await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 450) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } scrollTo(0, H); await new Promise(r => setTimeout(r, 300)); });
    await p.waitForTimeout(1300);
    const info = await p.evaluate(() => {
      const out = [];
      const vw = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth > innerWidth) out.push('H-OVERFLOW ' + document.documentElement.scrollWidth);
      if (!document.title.trim()) out.push('NO TITLE');
      const main = document.querySelector('main');
      const visible = (e) => { const c = getComputedStyle(e); if (c.display === 'none' || c.visibility === 'hidden') return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !e.closest('.slick-slide:not(.slick-active), .tab-pane:not(.is-active), [aria-hidden="true"], .mega, .nav-panel, .interest, .search, .modal, [hidden]'); };
      // broken images that are actually displayed
      [...document.images].filter(i => i.complete && i.naturalWidth === 0 && visible(i)).slice(0, 3).forEach(i => out.push('BROKEN IMG ' + i.src.split('/').slice(-2).join('/')));
      if (main) {
        // reveal elements still hidden
        const hidden = [...main.querySelectorAll('.reveal:not(.in)')].filter(visible);
        if (hidden.length) out.push('UNREVEALED ' + hidden.length + ' e.g. ' + (hidden[0].className + '').slice(0, 40));
        // elements sticking out of the viewport (excluding sliders/marquees which overflow by design)
        const els = [...main.querySelectorAll('h1,h2,h3,h4,h5,p,a,button,img,li,span,div')].filter(visible).filter(e => !e.closest('.slick-list, .slick-track, .commit__viewport, .figures__viewport, [class*="marquee"], .pills, .stock-nav, .tabs, [class*="scroll"], table, .table, [class*="table"]'));
        let out1 = 0; let ex = '';
        for (const e of els) { const r = e.getBoundingClientRect(); if (r.right > vw + 1 || r.left < -1) { out1++; if (!ex) ex = e.tagName + '.' + (e.className + '').split(' ')[0] + ' L' + Math.round(r.left) + ' R' + Math.round(r.right); } }
        if (out1) out.push('OUTSIDE-VIEWPORT ' + out1 + ' e.g. ' + ex);
        // clipped text: text element whose content is wider/taller than its box while overflow hidden
        let clip = 0; let exc = '';
        for (const e of main.querySelectorAll('h1,h2,h3,h4,h5,p,a,span,li,button')) { if (!visible(e)) continue; const c = getComputedStyle(e); if ((c.overflow === 'hidden' || c.overflowX === 'hidden') && c.textOverflow !== 'ellipsis' && !c.webkitLineClamp?.match(/\d/) && (e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 4) && e.textContent.trim()) { clip++; if (!exc) exc = e.tagName + '.' + (e.className + '').split(' ')[0] + ' "' + e.textContent.trim().slice(0, 30) + '"'; } }
        if (clip) out.push('CLIPPED-TEXT ' + clip + ' e.g. ' + exc);
        const txt = main.innerText;
        for (const bad of ['undefined', 'NaN', '[object', '{{', '}}', 'TODO', 'lorem', 'Lorem', 'null ']) if (txt.includes(bad)) out.push('BAD-STRING "' + bad + '"');
        if (!main.querySelector('h1')) out.push('NO-H1');
      }
      return out;
    });
    const all = [...errs, ...info];
    if (all.length) issues.push(`${w} ${r} :: ${all.join(' | ')}`);
    await p.close();
  }
  await ctx.close();
  console.log(`width ${w} done (${routes.length} pages)`);
}
await b.close();
writeFileSync('docs/research/qa-report.txt', issues.join('\n') + '\n');
console.log(issues.length ? issues.join('\n') : 'NO ISSUES');
