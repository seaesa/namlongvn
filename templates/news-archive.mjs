// Category archives: /tin-tuc-chung/ (+ /tin-tuc-chung/page/N/) and /thong-cao-bao-chi/ (+ /page/N/).
// data/news-archive.json lists one entry per archive page ({ cat, page }); the cards come from data/news.json.
// The original's category URLs currently return a WordPress fatal error (HTTP 500), so the layout reuses the
// /tin-tuc/ list design (banner, title, 3-column grid, pagination, contact box) with real links for pagination.
import { readFileSync } from 'node:fs';
import { esc, each } from '../scripts/tpl-helpers.mjs';
import { card } from './news.mjs';

export const data = 'news-archive.json';
export const PER_PAGE = 6;
export const CATS = {
  general: { slug: 'tin-tuc-chung', name: 'Tin tức chung', tab: 'cat-50' },
  press: { slug: 'thong-cao-bao-chi', name: 'Thông cáo báo chí', tab: 'cat-56' },
};
const NEWS = JSON.parse(readFileSync(new URL('../data/news.json', import.meta.url), 'utf8'));
const list = (cat) => NEWS.filter((n) => n.cats.includes(cat));
const base = (cat) => `/${CATS[cat].slug}/`;
const href = (cat, n) => (n === 1 ? base(cat) : `${base(cat)}page/${n}/`);

export const out = (p) => `${CATS[p.cat].slug}/${p.page > 1 ? `page/${p.page}/` : ''}index.html`;
export const shell = 'tin-tuc/index.html';
export const page = (p) => ({
  title: `${CATS[p.cat].name}${p.page > 1 ? ` – Trang ${p.page}` : ''} – Nam Long Group`,
  css: ['news.css'],
  scripts: ['pages/news.js'],
  bodyClass: 'page-news-archive',
});

// Same window as the /tin-tuc/ pager: current±2, "…", first/last page
function pager(cat, cur, total) {
  if (total < 2) return '';
  const a = (n, label, cls = '', aria = '') => `<a class="news-pager__btn${cls}" href="${href(cat, n)}"${aria}>${label}</a>`;
  const off = (label, cls = '', aria = '') => `<span class="news-pager__btn${cls}" aria-disabled="true"${aria}>${label}</span>`;
  let h = cur > 1 ? a(cur - 1, '&lt;', ' news-pager__btn--prev', ' aria-label="Trang trước"') : off('&lt;', ' news-pager__btn--prev', ' aria-label="Trang trước"');
  const from = Math.max(1, cur - 2), to = Math.min(total, cur + 2);
  if (from > 1) { h += a(1, '1'); if (from > 2) h += off('...'); }
  for (let i = from; i <= to; i++) h += i === cur ? `<span class="news-pager__btn is-active" aria-current="page">${i}</span>` : a(i, String(i));
  if (to < total) { if (to < total - 1) h += off('...'); h += a(total, String(total)); }
  h += cur < total ? a(cur + 1, '&gt;', ' news-pager__btn--next', ' aria-label="Trang sau"') : off('&gt;', ' news-pager__btn--next', ' aria-label="Trang sau"');
  return `<nav class="news-pager" aria-label="Phân trang">${h}</nav>`;
}

export const render = (p, all) => {
  const items = list(p.cat), total = Math.ceil(items.length / PER_PAGE);
  const declared = all.filter((x) => x.cat === p.cat).length;
  if (declared !== total) throw new Error(`news-archive.json: ${p.cat} declares ${declared} page(s) but news.json needs ${total}`);
  const slice = items.slice((p.page - 1) * PER_PAGE, p.page * PER_PAGE);
  const c = CATS[p.cat];
  return `<main id="main">
    <!-- Banner -->
    <section class="page-banner news-banner">
      <div class="container">
        <div class="page-banner__inner">
          <h1 class="reveal">Cập nhật thông tin <br>mới nhất từ Nam Long</h1>
        </div>
      </div>
    </section>

    <section class="news-list news-archive">
      <div class="container">
        <div class="news-list__head">
          <h2 class="news-list__title reveal">${esc(c.name)}</h2>
        </div>
        <div class="news-archive__cats reveal">
          ${each(Object.entries(CATS), ([k, v]) => `<a class="news-tab${k === p.cat ? ' is-active' : ''}" href="/${v.slug}/"${k === p.cat ? ' aria-current="page"' : ''}>${esc(v.name)}</a>`)}
          <a class="news-tab" href="/tin-tuc/?active_tab=cat-media">Thư viện Ảnh &amp; Video</a>
        </div>

        <div class="news-archive__body reveal" data-delay="2">
          <div class="news-grid">
          ${each(slice, (it) => card(it))}
          </div>
          ${pager(p.cat, p.page, total)}
        </div>

        <!-- Contact -->
        <div class="news-contact reveal">
          <h6>THÔNG TIN LIÊN HỆ</h6>
          <h5>Mọi yêu cầu liên hệ về báo chí, hợp tác thương hiệu hoặc hỗ trợ truyền thông, vui lòng gửi về:</h5>
          <div class="news-contact__info">
            <div class="news-contact__email">Email: <a href="mailto:corpcomms@namlongvn.com">corpcomms@namlongvn.com</a></div>
          </div>
        </div>
      </div>
    </section>
  </main>`;
};
