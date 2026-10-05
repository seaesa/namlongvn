// Usage: node scripts/measure/measure.mjs <url> <width> "<sel1>" "<sel2>" ...
// Prints computed styles (non-default subset) + box for the first match of each selector,
// plus ::before/::after when they render. Scrolls the page first so lazy/animated content settles.
import { chromium } from 'playwright';
const [url, width, ...sels] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width) || 1440, height: 900 } });
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(3000);
await page.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
await page.waitForTimeout(1500);
const out = await page.evaluate((sels) => {
  const P = ['display','position','top','right','bottom','left','zIndex','width','height','maxWidth','minHeight','margin','padding','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','textTransform','textAlign','backgroundColor','backgroundImage','backgroundSize','backgroundPosition','border','borderTop','borderRight','borderBottom','borderLeft','borderRadius','boxShadow','opacity','transform','transition','animation','overflow','objectFit','gap','gridTemplateColumns','justifyContent','alignItems','flexDirection','flexWrap','cursor','textDecoration','whiteSpace','filter','backdropFilter','content'];
  const skip = new Set(['auto','none','normal','0px','static','rgba(0, 0, 0, 0)','visible','start','0px none rgb(33, 37, 41)','all 0s ease 0s','row','nowrap','fill']);
  const fmt = (c) => P.filter(p => c[p] && !skip.has(c[p]) && !/^0px none/.test(c[p]) && !(p === 'opacity' && c[p] === '1')).map(p => p + ': ' + c[p]).join('; ');
  return sels.map(s => {
    const e = document.querySelector(s);
    if (!e) return '## ' + s + '\n  (not found)';
    const r = e.getBoundingClientRect();
    let t = '## ' + s + '  [count ' + document.querySelectorAll(s).length + '] box ' + [r.x, r.y + scrollY, r.width, r.height].map(Math.round).join(',') + '\n  ' + fmt(getComputedStyle(e));
    for (const p of ['::before', '::after']) { const c = getComputedStyle(e, p); if (c.content && c.content !== 'none') t += '\n  ' + p + ' ' + fmt(c); }
    return t;
  }).join('\n');
}, sels);
console.log(out);
await browser.close();
