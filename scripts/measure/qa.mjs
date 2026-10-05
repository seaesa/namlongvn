// QA all built pages on localhost: JS errors, horizontal overflow, broken images, dead internal links
import { chromium } from 'playwright';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
// every static page under the project root (excluding tooling folders)
const skip = new Set(['assets', 'docs', 'node_modules', 'scripts', 'templates', 'data', '.playwright-mcp', 'dist', 'en']);
const routes = [];
(function walk(dir) {
  for (const n of readdirSync(dir)) {
    if (skip.has(n)) continue;
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (n === 'index.html') routes.push('/' + p.replace(/^\.\/?/, '').replace(/index\.html$/, ''));
  }
})('.');
routes.sort();
const quick = process.argv.includes('--quick');
const b = await chromium.launch();
const links = new Set();
for (const w of [1440, 390]) {
  for (const r of routes) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    const errs = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 120)));
    p.on('console', m => { if (m.type() === 'error' && !/favicon|vietstock|youtube|ERR_/.test(m.text())) errs.push(m.text().slice(0, 120)); });
    await p.goto('http://localhost:5173' + r, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(r === '/' ? 3500 : (quick ? 500 : 1200));
    await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } });
    await p.waitForTimeout(800);
    const info = await p.evaluate(() => ({
      sw: document.documentElement.scrollWidth, iw: innerWidth, h: document.documentElement.scrollHeight,
      broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getBoundingClientRect().width > 0).map(i => i.src.split('/').pop()).slice(0, 3),
      hidden: [...document.querySelectorAll('.reveal')].filter(e => !e.classList.contains('in')).length,
      links: [...document.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href').split('#')[0].split('?')[0])
    }));
    info.links.forEach(l => links.add(l));
    if (!quick || errs.length || info.sw > info.iw || info.broken.length || info.hidden) console.log(`${w} ${r.padEnd(48)} h=${info.h} overflow=${info.sw > info.iw} broken=${info.broken.join(',') || 0} unrevealed=${info.hidden} errors=${errs.length ? errs.join(' | ') : 0}`);
    await p.close();
  }
}
console.log('pages checked per width:', routes.length);
const dead = [...links].filter(l => l && !existsSync('.' + l + (l.endsWith('/') ? 'index.html' : '')));
console.log('dead internal links:', dead.length ? dead.join(', ') : 'none');
await b.close();
