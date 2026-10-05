// Original vs clone: page height + y of every matching heading (h1–h3, matched by text). Throttled for Cloudflare.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const pages = ['/', '/gioi-thieu/', '/linh-vuc-kinh-doanh/', '/dau-tu-quan-ly-dau-tu/', '/phat-trien-nha-o-vua-tui-tien/', '/dich-vu-xay-dung/', '/dau-tu-phat-trien-bat-dong-san-thuong-mai/', '/phat-trien-khu-do-thi-nha-o/', '/quan-he-nha-dau-tu/', '/phat-trien-ben-vung/', '/tin-tuc/', '/tuyen-dung/', '/lien-he/', '/chinh-sach-bao-mat-du-lieu-ca-nhan/',
  '/khu-do-thi-nha-o/khu-do-thi-izumi-city/', '/khu-do-thi-nha-o/ehome-1/', '/bat-dong-san-thuong-mai/mizuki-park/', '/vi-tri-tuyen-dung/ke-toan-truong/', '/tin-tuc/tram-xanh-hut-khach-tai-nam-long-experience-2026/', '/khung-phat-trien-ben-vung/bao-ve-moi-truong/', '/swing-for-dreams/'];
const widths = (process.argv[2] || '1440,390').split(',').map(Number);
const b = await chromium.launch();
const norm = (s) => s.normalize('NFC').replace(/\s+/g, ' ').trim().toLowerCase();
async function grab(ctx, url, isOrig) {
  const p = await ctx.newPage();
  for (let attempt = 0; attempt < 3; attempt++) {
    await p.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(isOrig ? 3500 : 2500);
    if (!(await p.title()).includes('Access denied')) break;
    console.log('  blocked, backing off 60s'); await p.waitForTimeout(60000);
  }
  await p.evaluate(() => { document.querySelector('#cookie-notice, #cookie')?.remove(); });
  await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } scrollTo(0, 0); });
  await p.waitForTimeout(1200);
  const r = await p.evaluate(() => {
    const root = document.querySelector('#fullpage') || document.querySelector('main') || document.body;
    const hs = [...root.querySelectorAll('h1,h2,h3')].filter(h => { const c = getComputedStyle(h); const rr = h.getBoundingClientRect(); return c.display !== 'none' && c.visibility !== 'hidden' && rr.height > 0 && !h.closest('.slick-cloned, .slick-slide:not(.slick-active), .tab-pane:not(.active):not(.is-active), .modal'); })
      .map(h => ({ t: h.textContent, y: Math.round(h.getBoundingClientRect().top + scrollY), fs: getComputedStyle(h).fontSize }));
    const footer = document.querySelector('footer');
    return { H: document.documentElement.scrollHeight, footerY: Math.round(footer.getBoundingClientRect().top + scrollY), hs };
  });
  await p.close();
  return r;
}
const lines = [];
for (const w of widths) {
  const co = await b.newContext({ viewport: { width: w, height: 900 } });
  const cc = await b.newContext({ viewport: { width: w, height: 900 } });
  for (const path of pages) {
    const o = await grab(co, 'https://www.namlongvn.com' + path, true);
    const c = await grab(cc, 'http://localhost:5173' + path, false);
    const dH = c.footerY - o.footerY;
    const om = new Map(o.hs.map(h => [norm(h.t), h]));
    const diffs = [];
    let matched = 0;
    for (const h of c.hs) { const m = om.get(norm(h.t)); if (!m) continue; matched++; const d = h.y - m.y; if (Math.abs(d) > 40) diffs.push(`"${h.t.trim().slice(0, 28)}" ${m.y}→${h.y} (${d > 0 ? '+' : ''}${d})`); if (m.fs !== h.fs) diffs.push(`"${h.t.trim().slice(0, 20)}" font ${m.fs}→${h.fs}`); }
    const line = `${w} ${path.padEnd(58)} footerY ${o.footerY}→${c.footerY} (${dH > 0 ? '+' : ''}${dH}) headings matched ${matched}/${o.hs.length}${diffs.length ? '\n      ' + diffs.slice(0, 8).join('\n      ') : ''}`;
    console.log(line); lines.push(line);
    await new Promise(r => setTimeout(r, 5000));
  }
  await co.close(); await cc.close();
}
writeFileSync('docs/research/compare-report.txt', lines.join('\n') + '\n');
await b.close();
