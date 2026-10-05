// Compare rendered text widths (inline range width) of the same strings: original vs clone, homepage at 1440 and 390
import { chromium } from 'playwright';
const pairs = [['.main-menu > li:nth-child(4) > a', '.menu > .menu__item:nth-child(4) > a', 'menu "Quan hệ nhà đầu tư"'],
  ['.about .h-two .title', '.business .section-title', 'title "Lĩnh vực kinh doanh"'],
  ['.news .title', '.news .section-title', 'title "Tin tức"'],
  ['.title-number', '.figures .section-title', 'title "Những con số nổi bật"'],
  ['.s-commitment .title', '.commit .section-title', 'title "Cam kết…"'],
  ['.s-news .slick-active h4', '.news__slider .slick-active .news-card h4', 'news card h4'],
  ['.d-company-f h3', '.footer__company h3', 'footer company name'],
  ['.menu-footer a:nth-child(4)', '.footer__menu a:nth-child(4)', 'footer link']];
const b = await chromium.launch();
const measure = async (url, idx, w) => {
  const p = await b.newPage({ viewport: { width: w, height: 900 } }); await p.goto(url); await p.waitForTimeout(3500);
  await p.evaluate(async () => { for (let y = 0; y < 4000; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } });
  await p.waitForTimeout(1200);
  const r = await p.evaluate(({ pairs, idx }) => pairs.map(pr => { const e = document.querySelector(pr[idx]); if (!e) return null; const rg = document.createRange(); rg.selectNodeContents(e); const rects = [...rg.getClientRects()]; const cap = parseFloat(getComputedStyle(e).fontSize); return { w: Math.round(Math.max(...rects.map(r => r.width))), lines: new Set(rects.map(r => Math.round(r.top))).size, fs: cap }; }), { pairs, idx });
  await p.close(); return r;
};
for (const w of [1440, 390]) {
  const a = await measure('https://www.namlongvn.com/', 0, w); await new Promise(r => setTimeout(r, 5000));
  const c = await measure('http://localhost:5173/', 1, w);
  console.log(`--- ${w}px  (text width orig → clone, lines)`);
  pairs.forEach((pr, i) => { if (!a[i] || !c[i]) return console.log(pr[2], 'missing'); const d = ((c[i].w / a[i].w - 1) * 100).toFixed(1); console.log(`${pr[2].padEnd(28)} ${a[i].w} → ${c[i].w} (${d > 0 ? '+' : ''}${d}%)  lines ${a[i].lines}→${c[i].lines}`); });
}
await b.close();
