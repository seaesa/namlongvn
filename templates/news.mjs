// News article detail: /tin-tuc/<slug>/  (data/news.json — facts only: slug, cats, date, title, thumb, images, source)
// The article body is the clone's own generic placeholder text (same structure for every item).
import { esc, each } from '../scripts/tpl-helpers.mjs';

export const data = 'news.json';
export const out = (it) => `tin-tuc/${it.slug}/index.html`;
export const shell = 'tin-tuc/index.html';
export const page = (it) => ({
  title: `${it.title} – Nam Long Group`,
  css: ['news.css'],
  scripts: ['pages/news.js'],
  bodyClass: 'page-news-detail',
});

const UP = 'https://www.namlongvn.com/wp-content/uploads/';
export const img = (p) => (/^https?:/.test(p) ? p : UP + p);
// full-size link target: strip WordPress' "-1024x683" size suffix
const full = (p) => img(p).replace(/-\d+x\d+(\.\w+)$/, '$1');

export const card = (it, extra = '') =>
  `<a href="/tin-tuc/${it.slug}/" class="news-card"${extra}>
            <div class="news-card__img"><img src="${esc(img(it.thumb))}" alt="${esc(it.title)}" loading="lazy"></div>
            <span class="news-card__date">${esc(it.date)}</span>
            <h4>${esc(it.title)}</h4>
          </a>`;

// Placeholder copy — generic, not taken from the original articles. Two variants alternate for a little variety.
const COPY = [
  {
    lead: (t) => `Nội dung minh họa cho bài viết “${t}” trong bản clone. Đoạn văn được viết riêng để giữ bố cục; vui lòng xem website Nam Long để đọc bài gốc.`,
    p1: 'Đoạn văn này mô tả chung về bối cảnh của tin tức: thời gian, địa điểm và những đơn vị liên quan. Văn bản chỉ mang tính minh họa và có thể thay thế bằng nội dung chính thức khi cần.',
    p2: 'Phần tiếp theo trình bày các điểm nổi bật dưới dạng câu văn ngắn, giúp người đọc nắm nhanh thông tin trước khi xem hình ảnh bên dưới.',
    h: 'Điểm nhấn chính',
    p3: 'Mục này dành cho các thông tin bổ sung như số liệu, hoạt động hoặc ý kiến chia sẻ. Trong bản clone, đây là đoạn văn mẫu có độ dài tương đương bài viết thực tế.',
    c1: 'Hình ảnh minh họa cho nội dung bài viết.',
    p4: 'Đoạn văn mẫu tiếp tục phần trình bày để giữ nhịp đọc giữa các hình ảnh. Nội dung này không phản ánh bài viết gốc.',
    c2: 'Hình ảnh tư liệu kèm theo bài viết.',
    end: 'Đoạn kết tóm tắt lại thông điệp chung của bài viết. Thông tin chi tiết vui lòng xem tại các kênh chính thức của <a href="/">Nam Long</a>.',
  },
  {
    lead: (t) => `Đây là văn bản mẫu thay cho nội dung bài viết “${t}”. Bản clone chỉ tái hiện bố cục và kiểu chữ; bài gốc có trên website Nam Long.`,
    p1: 'Đoạn mở rộng giới thiệu khái quát sự kiện hoặc thông tin được công bố, kèm theo các mốc thời gian và đối tượng liên quan. Đây không phải là nội dung gốc của bài viết.',
    p2: 'Các đoạn văn tiếp theo được viết ở dạng mẫu, giữ khoảng cách dòng, cỡ chữ và độ dài tương tự để trang hiển thị cân đối trên mọi kích thước màn hình.',
    h: 'Thông tin nổi bật',
    p3: 'Phần này có thể chứa trích dẫn, số liệu tổng hợp hoặc mô tả hoạt động. Trong bản clone, văn bản được giản lược để tập trung vào giao diện.',
    c1: 'Ảnh minh họa đi kèm nội dung.',
    p4: 'Đoạn văn mẫu nối tiếp giữa hai nhóm hình ảnh, giữ độ dài tương đương một đoạn văn thông thường của trang tin.',
    c2: 'Hình ảnh tư liệu của bài viết.',
    end: 'Đoạn kết minh họa khép lại bài viết. Để biết thêm thông tin, vui lòng liên hệ bộ phận truyền thông của <a href="/">Nam Long</a>.',
  },
];

function figures(it, t) {
  const im = it.images && it.images.length ? it.images : [it.thumb];
  let h = '';
  if (im.length >= 2) {
    h += `
          <div class="news-post__pair">
            ${each(im.slice(0, 2), (p) => `<a href="${esc(full(p))}"><img src="${esc(img(p))}" alt="${esc(t.c1)}" loading="lazy"></a>`)}
          </div>
          <p class="is-caption"><em>${t.c1}</em></p>`;
  }
  return h;
}
function figure(it, t) {
  const im = it.images && it.images.length ? it.images : [it.thumb];
  if (im.length === 2) return '';
  const p = im[im.length >= 3 ? 2 : 0];
  return `
          <p class="news-post__figure"><a href="${esc(full(p))}"><img src="${esc(img(p))}" alt="${esc(t.c2)}" loading="lazy"></a></p>
          <p class="is-caption"><em>${t.c2}</em></p>`;
}

export const render = (it, all) => {
  const t = COPY[all.indexOf(it) % COPY.length];
  // "Tin tức khác": the 4 latest general news, excluding the current one (as on the original)
  const others = all.filter((x) => x !== it && x.cats.includes('general')).slice(0, 4);
  return `<main id="main">
    <div class="back-link">
      <div class="container"><a href="/tin-tuc/?active_tab=cat-50">Tin tức chung</a></div>
    </div>

    <!-- Article -->
    <section class="news-post">
      <div class="container">
        <header class="news-post__head reveal">
          <span class="news-post__date">${esc(it.date)}</span>
          <h1>${esc(it.title)}</h1>
        </header>

        <article class="news-post__body reveal" data-delay="2">
          <p><strong>${esc(t.lead(it.title))}</strong></p>
          <p>${t.p1}</p>
          <p>${t.p2}</p>
          <p><strong>${t.h}</strong></p>
          <p>${t.p3}</p>${figures(it, t)}
          <p>${t.p4}</p>${figure(it, t)}
          <p>${t.end}</p>

          <div class="post-share">
            <div class="post-share__row">
              ${it.source ? `<span class="post-share__source">Nguồn: ${esc(it.source)}</span>` : ''}
              <button class="post-share__btn post-share__btn--link" type="button" title="Sao chép liên kết" aria-label="Sao chép liên kết" data-pop="sharePopLink"></button>
              <button class="post-share__btn post-share__btn--share" type="button" title="Chia sẻ bài viết" aria-label="Chia sẻ bài viết" data-pop="sharePopSocial"></button>
            </div>
            <div class="post-share__pop post-share__pop--link" id="sharePopLink">
              <input type="text" class="post-share__input" readonly aria-label="Liên kết bài viết">
              <button type="button" class="post-share__copy-btn">Sao chép</button>
            </div>
            <div class="post-share__pop post-share__pop--share" id="sharePopSocial">
              <p>Chia sẻ bài viết:</p>
              <div class="post-share__icons">
                <a class="is-fb" href="#" target="_blank" rel="noreferrer nofollow" aria-label="Facebook"></a>
                <a class="is-in" href="#" target="_blank" rel="noreferrer nofollow" aria-label="LinkedIn"></a>
                <a class="is-zalo" href="#" target="_blank" rel="noreferrer nofollow" aria-label="Zalo"></a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Other news -->
    <section class="news-other">
      <div class="container">
        <div class="section-head reveal">
          <h2 class="section-title">Tin tức khác</h2>
          <div class="section-head__more"><a class="link-more" href="/tin-tuc-chung/">Xem thêm</a></div>
        </div>
        <div class="news-other__slider js-news-other reveal" data-delay="2">
          ${each(others, (x) => `<div>${card(x)}</div>`)}
        </div>
      </div>
    </section>
  </main>`;
};
