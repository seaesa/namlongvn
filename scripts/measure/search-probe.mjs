import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.namlongvn.com/?s=Akari'); await p.waitForTimeout(3500);
await p.evaluate(() => document.querySelector('#cookie-notice')?.remove());
await p.screenshot({ path: 'docs/design-references/pages/search-akari-1440.png', fullPage: true });
console.log(await p.evaluate(() => {
  const root = document.querySelector('#fullpage') || document.querySelector('main') || document.body;
  const o = (el, d) => { if (d > 6 || ['SCRIPT','STYLE','svg','NOSCRIPT'].includes(el.tagName)) return ''; const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').trim(); let s = '  '.repeat(d) + el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).slice(0,3).join('.') : '') + (own ? ' "' + own.slice(0, 50) + '"' : '') + (el.tagName === 'A' ? ' ->' + el.getAttribute('href') : '') + '\n'; [...el.children].slice(0, 6).forEach(k => s += o(k, d + 1)); return s; };
  return 'body=' + document.body.className + '\n' + o(root, 0);
}));
await b.close();
