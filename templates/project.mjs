// Project detail (/khu-do-thi-nha-o/<slug>/) — original template "single-project".
// Facts (name, product lines, location, scale, status, website, images, legal documents, sub-projects)
// come from data/projects.json; all prose is generic placeholder text (see BUILDER_CONVENTIONS text rule).
import { esc, each } from '../scripts/tpl-helpers.mjs';

export const data = 'projects.json';
export const out = (p) => `khu-do-thi-nha-o/${p.slug}/index.html`;
export const page = (p) => ({
  title: `${p.cardName} – Nam Long Group`,
  css: ['projects.css', 'project-detail.css'],
  scripts: ['pages/project-detail.js'],
  bodyClass: 'page-project-detail'
});

const DOCS_VISIBLE = 3;

const info = (p) => {
  const rows = [
    ['Dòng sản phẩm', esc(p.productLines)],
    ['Vị trí', esc(p.location)],
    ['Quy mô dự án', esc(p.scale)],
    ['Tiến độ', esc(p.status)]
  ];
  if (p.website) rows.push(['Website dự án', `<a class="link-more pd-info__link" href="${esc(p.website)}" target="_blank" rel="noopener">Xem thêm</a>`]);
  return `<table class="pd-info__table"><tbody>${each(rows, ([k, v]) => `
              <tr><td>${k}</td><td>${v}</td></tr>`)}
            </tbody></table>`;
};

const paras = (list) => each(list, (b) => b.fact ? `<p>${esc(b.fact)}</p>` : `<p>${esc(b.text)}</p>`);

const subCard = (s) => {
  const ongoing = !/hoàn thành/i.test(s.status);
  return `
              <div><a href="/khu-do-thi-nha-o/${esc(s.slug)}/" class="proj-card">
                <div class="proj-card__img"><img src="${esc(s.img)}" alt="${esc(s.name)}" loading="lazy"></div>
                <div class="proj-card__info">
                  <div class="proj-card__top"><span class="proj-card__status${ongoing ? ' is-ongoing' : ''}">${esc(s.status)}</span><span class="proj-card__logo"><img src="${esc(s.logo)}" alt="${esc(s.name)}" loading="lazy"></span></div>
                  <div class="proj-card__body">
                    <h3 class="proj-card__name">${esc(s.name)}</h3>
                    <small class="proj-card__loc">${esc(s.location)}</small>${s.parent ? `
                    <small class="proj-card__note">Một dự án thuộc khu đô thị <strong>${esc(s.parent)}</strong></small>` : ''}
                  </div>
                </div>
              </a></div>`;
};

export const render = (p) => `<main id="main">
    <div class="back-link">
      <div class="container"><a href="/phat-trien-khu-do-thi-nha-o/">Dự án</a></div>
    </div>

    <section class="page-banner page-banner--single pd-banner" style="background-image:url('${esc(p.banner)}')">
      <div class="container">
        <div class="page-banner__inner" data-stagger>
          <h1 class="reveal">${esc(p.name)}</h1>
        </div>
      </div>
    </section>

    <section class="sub-section pd-main">
      <div class="container" data-stagger>
        <div class="lead-text pd-lead reveal">${paras(p.lead)}</div>
        <div class="pd-info reveal">
          ${info(p)}
        </div>${p.gallery.length ? `
        <div class="pd-gallery reveal">
          <div class="pd-gallery__slider js-pd-gallery">${each(p.gallery, (src) => `
            <div class="pd-gallery__item"><img src="${esc(src)}" alt="${esc(p.name)}"></div>`)}
          </div>
        </div>` : ''}${p.body.length ? `
        <div class="pd-body reveal">${paras(p.body)}</div>` : ''}
      </div>
    </section>
${p.docs.length ? `
    <section class="sub-section pd-legal">
      <div class="container">
        <button type="button" class="pd-legal__toggle js-legal-toggle" aria-expanded="true" aria-label="Thu gọn / mở rộng"></button>
        <h2 class="section-title pd-legal__title reveal" data-delay="3">Pháp lý</h2>
        <div class="pd-legal__content js-legal-content">
          <div class="pd-docs${p.docs.length > DOCS_VISIBLE ? ' is-collapsed' : ''}" data-stagger>${each(p.docs, (d) => `
            <div class="pd-doc reveal">
              <p class="pd-doc__title">${esc(d.title)}</p>
              <a class="pd-doc__link" href="${esc(d.href)}" target="_blank" rel="noopener">PDF</a>
            </div>`)}
          </div>${p.docs.length > DOCS_VISIBLE ? `
          <div class="pd-legal__more reveal"><a href="#" class="u-line js-docs-more">Xem thêm</a></div>` : ''}
        </div>
      </div>
    </section>
` : ''}${p.subdivisions.length ? `
    <section class="pd-subs">
      <div class="container" data-stagger>
        <h2 class="section-title pd-subs__title reveal">Phân khu</h2>
        <div class="reveal">
          <div class="feat-slider js-pd-subs">${each(p.subdivisions, subCard)}
          </div>
        </div>
      </div>
    </section>
` : ''}  </main>`;
