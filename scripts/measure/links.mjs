// Collect link targets of the remaining page types from the original (one browser, throttled)
import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const visit = async (u) => { await p.goto('https://www.namlongvn.com' + u, { waitUntil: 'load' }); await p.waitForTimeout(2500); if ((await p.title()).includes('Access denied')) { console.log('BLOCKED', u); await p.waitForTimeout(60000); return visit(u); } };
const hrefs = (sel) => p.evaluate((sel) => [...new Set([...document.querySelectorAll(sel)].map(a => a.href.split('#')[0]))], sel);
await visit('/phat-trien-khu-do-thi-nha-o/');
console.log('PROJECT CARDS:', (await hrefs('.result-proj a, .s-featured a, .box-featured a')).join('\n  '));
await p.waitForTimeout(3000); await visit('/tuyen-dung/');
console.log('JOBS:', (await hrefs('#recruits-container a, .job-card a')).slice(0, 6).join('\n  '), '... total', (await hrefs('#recruits-container a, .job-card a')).length);
await p.waitForTimeout(3000); await visit('/tin-tuc/');
console.log('NEWS LIST LINKS:', (await hrefs('.tab-content a, .nav-tabs a, .pagination a, .page-numbers a')).filter(h => !h.includes('wp-content')).slice(0, 15).join('\n  '));
await p.waitForTimeout(3000); await visit('/en/homepage/');
console.log('EN MENU:', (await hrefs('#header a, footer a')).filter(h => h.includes('namlongvn.com')).join('\n  '));
await b.close();
