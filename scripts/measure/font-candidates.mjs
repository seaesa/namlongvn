// Rank Google fonts (Vietnamese subset) by closeness to the original BT-BeauSans metrics at 100px
import { chromium } from 'playwright';
const target = { regular: { cap: 76, x: 54, w: 4146 }, medium: { cap: 76, x: 54, w: 4201 }, bold: { cap: 76, x: 54, w: 4255 } };
const fams = ['Be Vietnam Pro', 'Lexend', 'Lexend Deca', 'Plus Jakarta Sans', 'Manrope', 'Inter', 'Sora', 'Outfit', 'Urbanist', 'Montserrat', 'Mulish', 'Nunito Sans', 'Albert Sans', 'Figtree', 'Onest', 'Red Hat Display', 'Archivo', 'Public Sans', 'Work Sans', 'Afacad', 'Hanken Grotesk', 'Kumbh Sans', 'Instrument Sans', 'Encode Sans', 'Josefin Sans'];
const b = await chromium.launch(); const p = await b.newPage();
const url = 'https://fonts.googleapis.com/css2?' + fams.map(f => 'family=' + f.replace(/ /g, '+') + ':wght@400;500;700').join('&') + '&subset=vietnamese&display=block';
await p.setContent(`<link rel="stylesheet" href="${url}"><div id="w">${fams.map(f => [400,500,700].map(w => `<span style="font-family:'${f}';font-weight:${w}">Tập đoàn Ạ</span>`).join('')).join('')}</div>`);
await p.waitForTimeout(6000);
const res = await p.evaluate(async ({ fams, target }) => {
  await document.fonts.ready;
  const c = document.createElement('canvas').getContext('2d');
  const sample = 'Tập đoàn Bất động sản tích hợp Lĩnh vực kinh doanh Những con số nổi bật 0123456789';
  return fams.map(f => {
    const m = {}; let score = 0;
    for (const [k, w] of [['regular', 400], ['medium', 500], ['bold', 700]]) {
      c.font = `${w} 100px "${f}"`;
      const cap = c.measureText('H').actualBoundingBoxAscent, x = c.measureText('x').actualBoundingBoxAscent, wd = c.measureText(sample).width;
      // scale so cap height matches the original, then compare the resulting width (what you'd see after size-adjust)
      const k2 = target[k].cap / cap, scaledW = wd * k2, xr = (x / cap) / (target[k].x / target[k].cap);
      m[k] = { cap: Math.round(cap), x: Math.round(x), w: Math.round(wd), widthAfterCapMatch: Math.round(scaledW) };
      score += Math.abs(scaledW / target[k].w - 1) * 100 + Math.abs(xr - 1) * 100;
    }
    return { f, score: +score.toFixed(1), loaded: document.fonts.check(`400 16px "${f}"`), m };
  }).sort((a, b) => a.score - b.score);
}, { fams, target });
for (const r of res.slice(0, 10)) console.log(`${r.f.padEnd(18)} score=${r.score} loaded=${r.loaded} regular=${JSON.stringify(r.m.regular)} bold=${JSON.stringify(r.m.bold)}`);
await b.close();
