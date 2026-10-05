import { chromium } from 'playwright';
const b = await chromium.launch();
for (const W of [390, 1024]) {
  const p = await b.newPage({ viewport: { width: W, height: 844 } });
  await p.goto('https://www.namlongvn.com/gioi-thieu/'); await p.waitForTimeout(3500);
  await p.evaluate(() => document.querySelector('#cookie-notice')?.remove());
  const snap = (label) => p.evaluate((label) => { const h = document.querySelector('#header'); const c = getComputedStyle(h); const f = document.querySelector('#fullpage'); return `${label}: y=${Math.round(scrollY)} cls="${h.className}" pos=${c.position} top=${c.top} tf=${c.transform} anim=${c.animationName}/${c.animationDuration} tr=${c.transition} hdrTop=${Math.round(h.getBoundingClientRect().top)} bodyPadT=${getComputedStyle(document.body).paddingTop} fullpageTop=${Math.round(f.getBoundingClientRect().top + scrollY)}`; }, label);
  console.log('## ' + W);
  await p.mouse.move(W / 2, 400);
  for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 150); await p.waitForTimeout(120); }
  await p.waitForTimeout(600); console.log(await snap('down 900'));
  await p.mouse.wheel(0, -40); await p.waitForTimeout(40); console.log(await snap('up +40ms'));
  await p.waitForTimeout(250); console.log(await snap('up +290ms'));
  await p.waitForTimeout(600); console.log(await snap('up +890ms'));
  await p.mouse.wheel(0, 200); await p.waitForTimeout(500); console.log(await snap('down again'));
  await p.evaluate(() => scrollTo(0, 30)); await p.waitForTimeout(500); console.log(await snap('near top y=30'));
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500); console.log(await snap('top'));
  await p.close();
  await new Promise(r => setTimeout(r, 5000));
}
await b.close();
