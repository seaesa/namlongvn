// Prints animation delay of every .w-anima grouped by its .ani-up parent (after full scroll)
import { chromium } from 'playwright';
const [url] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url); await p.waitForTimeout(3000);
await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } });
await p.waitForTimeout(1000);
console.log(await p.evaluate(() => [...document.querySelectorAll('.ani-up')].slice(0, 12).map(g => (g.className.split(' ').slice(0,3).join('.')) + ' :: ' + [...g.querySelectorAll('.w-anima')].slice(0, 8).map(e => (e.className.split(' ')[0] || e.tagName) + '@' + getComputedStyle(e).animationDelay + '/' + getComputedStyle(e).animationName).join('  ')).join('\n')));
await b.close();
