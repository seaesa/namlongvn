// Side-by-side visual: original BT-BeauSans (rendered on namlongvn.com) vs candidate fonts (cap height matched to 0.76em)
import { chromium } from 'playwright';
const lines = [['Lĩnh vực kinh doanh', 37, 'B', 700], ['Tập đoàn Bất động sản tích hợp', 55, 'M', 500], ['Giới thiệu  Lĩnh vực kinh doanh  Dự án  Quan hệ nhà đầu tư', 13.28, 'Regular', 400], ['Thúc đẩy tăng trưởng bền vững, lấy con người làm trung tâm.', 16, 'Regular', 400], ['33.000+ Gia đình', 40, 'M', 500]];
const b = await chromium.launch();
const block = (fam, wMap) => lines.map(([t, s, k, w]) => `<div style="font-family:${wMap ? wMap(k) : `'${fam}'`};font-weight:${wMap ? 400 : w};font-size:${s}px;line-height:1.25;color:#181d27;white-space:nowrap">${t}</div>`).join('');
// original
let p = await b.newPage({ viewport: { width: 1100, height: 330 } });
await p.goto('https://www.namlongvn.com/lien-he/'); await p.waitForTimeout(3000);
await p.evaluate((html) => { document.body.innerHTML = '<div style="padding:16px;background:#fff">' + html + '<div style="font:12px monospace;color:#c00;margin-top:8px">ORIGINAL — BT-BeauSans</div></div>'; }, block(null, (k) => `'BT-BeauSans-${k}'`));
await p.waitForTimeout(800); await p.screenshot({ path: 'docs/design-references/font-original.png' }); await p.close();
for (const fam of ['Be Vietnam Pro', 'Plus Jakarta Sans', 'Hanken Grotesk', 'Public Sans']) {
  p = await b.newPage({ viewport: { width: 1100, height: 330 } });
  await p.setContent(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${fam.replace(/ /g, '+')}:wght@400;500;700&display=block"><div style="padding:16px;background:#fff;font-size-adjust:cap-height 0.76">${block(fam)}<div style="font:12px monospace;color:#c00;margin-top:8px;font-size-adjust:none">${fam} (cap-height matched)</div></div>`);
  await p.waitForTimeout(3500); await p.screenshot({ path: `docs/design-references/font-${fam.replace(/ /g, '-').toLowerCase()}.png` }); await p.close();
}
await b.close();
