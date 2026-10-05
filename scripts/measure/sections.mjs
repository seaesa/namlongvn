// Per-section height diff original vs clone (+ text-block char lengths inside sections that differ).
// usage: node scripts/measure/sections.mjs <width> <path> [<path>...]
import { chromium } from 'playwright';
const [W, ...paths] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +W, height: 900 } });
async function grab(url, orig) {
  const p = await ctx.newPage();
  for (let i = 0; i < 4; i++) { await p.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(() => {}); await p.waitForTimeout(3000); if (!(await p.title()).includes('Access denied')) break; console.log('  blocked, wait 90s'); await p.waitForTimeout(90000); }
  await p.evaluate(async () => { document.querySelector('#cookie-notice, #cookie')?.remove(); const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); } scrollTo(0, 0); });
  await p.waitForTimeout(1200);
  const r = await p.evaluate((orig) => {
    const root = orig ? document.querySelector('#fullpage') : document.querySelector('main');
    if (!root) return { secs: [], heads: [] };
    const secs = [...root.children].filter(e => e.getBoundingClientRect().height > 0).map(s => {
      const blocks = [...s.querySelectorAll('p, .des-banner, .tag-page, .page-banner__tag, .d-business, .lead-text, .des-ab-comp, .des-t, .section-desc, li')]
        .filter(e => e.children.length === 0 || e.tagName === 'P').filter(e => { const r = e.getBoundingClientRect(); return r.height > 0 && !e.closest('.slick-cloned'); })
        .map(e => e.textContent.replace(/\s+/g, ' ').trim().length).filter(n => n > 40);
      return { cls: (s.id ? '#' + s.id + ' ' : '') + (s.className + '').split(' ').slice(0, 3).join('.'), h: Math.round(s.getBoundingClientRect().height), blocks };
    });
    const heads = [...root.querySelectorAll('h1,h2,h3')].filter(h => h.getBoundingClientRect().height > 0 && !h.closest('.slick-cloned')).map(h => h.textContent.replace(/\s+/g, ' ').trim().slice(0, 40));
    return { secs, heads };
  }, orig);
  await p.close(); return r;
}
for (const path of paths) {
  const o = await grab('https://www.namlongvn.com' + path, true);
  const c = await grab('http://localhost:5173' + path, false);
  console.log(`\n### ${W} ${path}`);
  const n = Math.max(o.secs.length, c.secs.length);
  for (let i = 0; i < n; i++) {
    const a = o.secs[i], k = c.secs[i];
    const d = a && k ? k.h - a.h : null;
    console.log(`  [${i}] ${(a?.cls || '-').padEnd(40)} ${String(a?.h ?? '-').padStart(5)} → ${String(k?.h ?? '-').padStart(5)}  ${d === null ? '' : (Math.abs(d) > 4 ? 'Δ' + d : 'ok')}  ${(k?.cls || '').slice(0, 30)}`);
    if (d !== null && Math.abs(d) > 4) console.log(`        text blocks orig ${JSON.stringify(a.blocks)}  clone ${JSON.stringify(k.blocks)}`);
  }
  const ch = new Set(c.heads.map(h => h.toLowerCase()));
  const missing = o.heads.filter(h => !ch.has(h.toLowerCase()));
  if (missing.length) console.log('  headings missing in clone:', JSON.stringify(missing));
  await new Promise(r => setTimeout(r, 6000));
}
await b.close();
