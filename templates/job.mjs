// Job detail pages: /vi-tri-tuyen-dung/<slug>/ (original .sing-page job template)
import { esc, each } from '../scripts/tpl-helpers.mjs';

export const data = 'jobs.json';
export const out = (job) => `vi-tri-tuyen-dung/${job.slug}/index.html`;
export const shell = 'tuyen-dung/index.html';
export const page = (job) => ({
  title: `${job.title} – Nam Long Group`,
  css: ['job-detail.css'],
  scripts: ['pages/job-detail.js'],
  bodyClass: 'page-job',
});

const section = (s) => `
          <div class="job-acc__item">
            <button type="button" class="job-acc__head js-acc" aria-expanded="false" aria-controls="${esc(s.id)}"><h2>${esc(s.heading)}</h2></button>
            <div class="job-acc__body" id="${esc(s.id)}">
              ${each(s.paragraphs, (p) => `<p>${esc(p)}</p>`)}${s.items ? `<ul>${each(s.items, (li) => `<li>${esc(li)}</li>`)}</ul>` : ''}
            </div>
          </div>`;

export const render = (job) => `<main id="main">
    <div class="back-link">
      <div class="container"><a href="/tuyen-dung/">Tuyển dụng</a></div>
    </div>

    <section class="job-single">
      <div class="container">
        <header class="job-head reveal">
          <h1 class="job-head__title">${esc(job.title)}</h1>
          <p>Công ty: ${esc(job.company)}</p>
          <p>Địa điểm: ${esc(job.location)}</p>
          <p class="job-head__date">Ngày đăng tuyển: ${esc(job.posted)}</p>
        </header>
        <div class="job-acc reveal" data-delay="2">${each(job.sections, section)}
        </div>
        <div class="job-apply reveal" data-delay="3">
          <a href="#apply" class="job-btn js-apply-open">Ứng tuyển ngay</a>
        </div>
      </div>
    </section>

    <section class="job-cta">
      <h2 class="job-cta__title reveal">Khám phá cơ hội nghề nghiệp tại Nam Long!</h2>
      <div class="reveal" data-delay="2"><a href="/tuyen-dung/#position" class="job-btn">Xem thêm</a></div>
    </section>

    <div class="apply-overlay js-apply-close" hidden></div>
    <div class="apply-popup" id="apply" role="dialog" aria-modal="true" aria-labelledby="apply-title" hidden>
      <div class="apply-notif apply-notif--ok" role="status" hidden>
        <strong><span class="apply-notif__icon" aria-hidden="true"></span>Gửi hồ sơ thành công</strong>
        Nội dung minh họa: hồ sơ đã được ghi nhận trong bản clone (không có dữ liệu nào được gửi đi).
      </div>
      <div class="apply-notif apply-notif--err" role="alert" hidden>
        <button type="button" class="apply-notif__close js-notif-close" aria-label="Đóng"></button>
        <strong>Hồ sơ chưa hoàn tất – Không thể tiếp tục</strong>
        Vui lòng điền các trường bắt buộc và tải CV lên trước khi gửi.
      </div>
      <h2 id="apply-title">Gửi hồ sơ ứng tuyển</h2>
      <p class="apply-popup__lead">Điền thông tin bên dưới để Nam Long hiểu rõ hơn về bạn!</p>
      <form class="apply-form js-apply-form" novalidate>
        <input type="hidden" name="job-position" value="${esc(job.title)}">
        <input class="apply-form__field" type="text" name="name" placeholder="Họ và tên*" aria-label="Họ và tên" required>
        <input class="apply-form__field" type="tel" name="phone" placeholder="Số điện thoại*" aria-label="Số điện thoại" required>
        <input class="apply-form__field" type="email" name="email" placeholder="Email*" aria-label="Email" required>
        <label class="apply-form__label" for="apply-cv-${esc(job.slug)}">Tải CV lên</label>
        <div class="apply-file">
          <button type="button" class="apply-file__btn js-file-btn">Chọn tệp</button>
          <span class="apply-file__name js-file-name">Chưa có file được chọn</span>
          <span class="apply-file__hint">Dung lượng tối đa: 5MB</span>
          <input class="apply-file__input js-file" id="apply-cv-${esc(job.slug)}" type="file" name="cv" accept=".pdf,.doc,.docx,.jpg,.png" required>
        </div>
        <textarea class="apply-form__field apply-form__area" name="message" rows="3" maxlength="2000" placeholder="Thông tin khác (link portfolio, thông tin cá nhân, v.v.)" aria-label="Thông tin khác"></textarea>
        <label class="apply-consent">
          <input type="checkbox" name="consent" checked>
          <span>Bằng cách gửi hồ sơ, bạn đồng ý với <a href="/chinh-sach-bao-mat-du-lieu-ca-nhan/" target="_blank">Chính sách bảo vệ dữ liệu cá nhân</a>.</span>
        </label>
        <div class="apply-actions">
          <button type="button" class="apply-actions__cancel js-apply-close">Bỏ qua</button>
          <button type="submit" class="apply-actions__submit">Ứng tuyển</button>
        </div>
      </form>
    </div>
  </main>`;
