// 404 page (served by Vercel automatically as /404.html; Apache/Nginx via ErrorDocument / error_page)
export const data = 'notfound.json';
export const out = () => '404.html';
export const page = () => ({ title: 'Không tìm thấy trang – Nam Long Group', css: [], scripts: [], bodyClass: 'page-404' });
export const render = () => `<main id="main">
    <section class="sub-section nf">
      <div class="container">
        <div class="nf__inner">
          <div class="nf__code reveal">404</div>
          <h1 class="section-title nf__title reveal" data-delay="2">Không tìm thấy trang</h1>
          <p class="nf__text reveal" data-delay="3">Trang bạn tìm có thể đã được di chuyển hoặc không tồn tại.</p>
          <div class="nf__actions reveal" data-delay="4"><a class="link-more" href="/">Về trang chủ</a><a class="link-more" href="/tin-tuc/">Tin tức</a><a class="link-more" href="/lien-he/">Liên hệ</a></div>
        </div>
      </div>
    </section>
  </main>`;
