// Sustainability framework pillars: /khung-phat-trien-ben-vung/<slug>/
import { esc, each } from '../scripts/tpl-helpers.mjs';

export const data = 'framework.json';
export const shell = 'phat-trien-ben-vung/index.html';
export const out = (item) => `khung-phat-trien-ben-vung/${item.slug}/index.html`;
export const page = (item) => ({
  title: `${item.name} – Nam Long Group`,
  css: ['framework.css'],
  scripts: [],
  bodyClass: 'page-framework'
});

const card = (r) => `
            <div class="fw-related__item reveal-item reveal">
              <a class="fw-card" href="/khung-phat-trien-ben-vung/${r.slug}/">
                <img src="${esc(r.banner)}" alt="${esc(r.card)}">
                <div class="fw-card__info"><h3 class="fw-card__title">${esc(r.card)}</h3></div>
              </a>
            </div>`;

export const render = (item, all) => `<main id="main">
    <div class="back-link">
      <div class="container"><a href="/phat-trien-ben-vung/">Cam kết Phát triển Bền vững</a></div>
    </div>

    <section class="page-banner page-banner--single fw-banner" style="background-image:url('${esc(item.banner)}')">
      <div class="container">
        <div class="page-banner__inner" data-stagger>
          <h1 class="reveal">${item.title}</h1>
          <div class="page-banner__tag reveal">${esc(item.tag)}</div>
        </div>
      </div>
    </section>

    <section class="fw-content">
      <div class="container">
        <div class="fw-content__body reveal">
          ${each(item.paragraphs, (p) => `<p>${esc(p)}</p>`)}
          <figure class="fw-content__figure"><img src="${esc(item.image)}" alt="${esc(item.name)}"></figure>
        </div>
      </div>
    </section>

    <section class="fw-related">
      <div class="container" data-stagger>
        <h2 class="fw-related__title reveal">Khám phá thêm các trụ cột <br>phát triển bền vững khác</h2>
        <div class="fw-related__row">${each(item.related.map((s) => all.find((x) => x.slug === s)), card)}
        </div>
      </div>
    </section>
  </main>`;
