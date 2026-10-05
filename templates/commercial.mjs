// Commercial property detail (/bat-dong-san-thuong-mai/<slug>/) — original template "single-commercial":
// back link, single banner, overview map image + "Vị trí", then one content image. No prose on the original.
import { esc } from '../scripts/tpl-helpers.mjs';

export const data = 'commercial.json';
export const out = (c) => `bat-dong-san-thuong-mai/${c.slug}/index.html`;
export const page = (c) => ({
  title: `${c.name} – Nam Long Group`,
  css: ['project-detail.css'],
  scripts: [],
  bodyClass: 'page-commercial-detail'
});

export const render = (c) => `<main id="main">
    <div class="back-link">
      <div class="container"><a href="/dau-tu-phat-trien-bat-dong-san-thuong-mai/">Mảng Đầu tư &amp; Phát triển Bất động sản Thương mại</a></div>
    </div>

    <section class="page-banner page-banner--single pd-banner" style="background-image:url('${esc(c.banner)}')">
      <div class="container">
        <div class="page-banner__inner" data-stagger>
          <h1 class="reveal">${esc(c.name)}</h1>
        </div>
      </div>
    </section>

    <section class="cd-overview">
      <div class="container">
        <div class="cd-overview__img"><img src="${esc(c.overview)}" alt="${esc(c.name)}"></div>
        <div class="cd-loc"><span>Vị trí:</span><span>${esc(c.location)}</span></div>
      </div>
    </section>

    <section class="cd-content">
      <div class="container" data-stagger>
        <p class="reveal"><img src="${esc(c.content)}" alt="${esc(c.name)}" width="${c.contentW}" height="${c.contentH}" loading="lazy"></p>
      </div>
    </section>
  </main>`;
