// Which header menu item is highlighted on each page type of the original (+ favicon links)
import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const urls = ['/gioi-thieu/', '/linh-vuc-kinh-doanh/', '/dau-tu-quan-ly-dau-tu/', '/phat-trien-khu-do-thi-nha-o/', '/khu-do-thi-nha-o/akari-city/', '/bat-dong-san-thuong-mai/mizuki-park/', '/quan-he-nha-dau-tu/', '/phat-trien-ben-vung/', '/khung-phat-trien-ben-vung/bao-ve-moi-truong/', '/swing-for-dreams/', '/tin-tuc/', '/tin-tuc/tram-xanh-hut-khach-tai-nam-long-experience-2026/', '/tuyen-dung/', '/vi-tri-tuyen-dung/ke-toan-truong/', '/lien-he/', '/chinh-sach-bao-mat-du-lieu-ca-nhan/'];
for (const [i, u] of urls.entries()) {
  if (i) await p.waitForTimeout(5000);
  await p.goto('https://www.namlongvn.com' + u); await p.waitForTimeout(2500);
  if ((await p.title()).includes('Access denied')) { console.log('BLOCKED', u); await p.waitForTimeout(60000); continue; }
  const r = await p.evaluate(() => {
    const items = [...document.querySelectorAll('#menu-header-menu-vie > li')].map(li => {
      const a = li.querySelector(':scope > a'); const c = getComputedStyle(a); const af = getComputedStyle(a, '::after'); const bf = getComputedStyle(a, '::before');
      return { t: a.textContent.trim(), cls: (li.className.match(/current[\w-]*|active[\w-]*/g) || []).join(' ') + ' ' + (a.className || ''), color: c.color, fw: c.fontFamily, bf: bf.content !== 'none' ? bf.width + '/' + bf.height + '/' + bf.backgroundColor + '/' + bf.bottom : '', af: af.content !== 'none' && !/ico-sustain/.test(af.backgroundImage) ? af.width + '/' + af.height + '/' + af.backgroundColor : '' };
    });
    const hi = items.filter(x => x.color !== 'rgb(37, 43, 55)' || x.cls.trim());
    return hi.map(x => `${x.t} [${x.cls.trim()}] color=${x.color} font=${x.fw} ${x.bf ? 'before=' + x.bf : ''} ${x.af ? 'after=' + x.af : ''}`).join(' || ') || '(none)';
  });
  console.log(u.padEnd(52), r);
  if (i === 0) console.log('FAVICONS', await p.evaluate(() => [...document.querySelectorAll('link[rel*="icon"], link[rel="manifest"], meta[name="msapplication-TileImage"]')].map(l => (l.rel || l.name) + ' ' + (l.sizes?.toString() || '') + ' ' + (l.href || l.content)).join('\n  ')));
}
await b.close();
