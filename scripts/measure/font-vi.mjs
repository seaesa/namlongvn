// Does each candidate render Vietnamese glyphs itself (vs falling back)? Compare widths against two different fallbacks.
import { chromium } from 'playwright';
const fams = ['Instrument Sans', 'Figtree', 'Hanken Grotesk', 'Red Hat Display', 'Public Sans', 'Plus Jakarta Sans', 'Be Vietnam Pro'];
const b = await chromium.launch(); const p = await b.newPage();
const url = 'https://fonts.googleapis.com/css2?' + fams.map(f => 'family=' + f.replace(/ /g, '+') + ':wght@400;700').join('&') + '&display=block';
const text = 'ộ ữ ặ ẫ ỹ ệ ờ ạ đ Ư';
await p.setContent(`<link rel="stylesheet" href="${url}">${fams.map(f => `<p style="font-family:'${f}'">${text}</p>`).join('')}`);
await p.waitForTimeout(6000);
console.log(await p.evaluate(async ({ fams, text }) => {
  await document.fonts.ready;
  const c = document.createElement('canvas').getContext('2d');
  return fams.map(f => {
    const glyphs = [...text.replace(/ /g, '')];
    const missing = glyphs.filter(g => { c.font = `100px "${f}", monospace`; const a = c.measureText(g).width; c.font = `100px "${f}", serif`; const b2 = c.measureText(g).width; return a !== b2; });
    return f.padEnd(18) + (missing.length ? 'MISSING ' + missing.join('') : 'full Vietnamese');
  }).join('\n');
}, { fams, text }));
await b.close();
