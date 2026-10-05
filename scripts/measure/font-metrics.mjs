// Compare glyph metrics of the original font (on namlongvn.com) and the clone font (localhost) at 100px
import { chromium } from 'playwright';
const b = await chromium.launch();
const probe = async (url, fams) => {
  const p = await b.newPage(); await p.goto(url); await p.waitForTimeout(3000);
  const r = await p.evaluate(async (fams) => {
    await document.fonts.ready;
    const c = document.createElement('canvas').getContext('2d'); const out = {};
    const sample = 'Tập đoàn Bất động sản tích hợp Lĩnh vực kinh doanh Những con số nổi bật 0123456789';
    for (const [name, fam] of fams) {
      c.font = `${fam.w} 100px ${fam.f}`;
      const x = c.measureText('x'), H = c.measureText('H'), s = c.measureText(sample);
      out[name] = { xHeight: Math.round(x.actualBoundingBoxAscent), capHeight: Math.round(H.actualBoundingBoxAscent), sampleWidth: Math.round(s.width) };
    }
    return out;
  }, fams);
  await p.close(); return r;
};
console.log('ORIGINAL', JSON.stringify(await probe('https://www.namlongvn.com/lien-he/', [['regular', { f: '"BT-BeauSans-Regular"', w: 400 }], ['medium', { f: '"BT-BeauSans-M"', w: 400 }], ['bold', { f: '"BT-BeauSans-B"', w: 400 }]])));
console.log('CLONE   ', JSON.stringify(await probe('http://localhost:5173/lien-he/', [['regular', { f: '"Be Vietnam Pro"', w: 400 }], ['medium', { f: '"Be Vietnam Pro"', w: 500 }], ['bold', { f: '"Be Vietnam Pro"', w: 700 }]])));
await b.close();
