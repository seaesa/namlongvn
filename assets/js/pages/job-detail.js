/* Job detail: accordion sections, CV apply popup (client-side validation only — nothing is sent) */
(function ($) {
  'use strict';

  /* ---------- Accordion: each head toggles its own body independently (slideToggle 400ms), arrow rotates -90° ---------- */
  $('.js-acc').on('click', function () {
    var $h = $(this), open = $h.attr('aria-expanded') !== 'true';
    $h.attr('aria-expanded', String(open));
    $('#' + $h.attr('aria-controls')).stop(true).slideToggle(400);
  });

  /* ---------- Apply popup ---------- */
  var $popup = $('.apply-popup'), $overlay = $('.apply-overlay'), $form = $('.js-apply-form');
  var $ok = $popup.find('.apply-notif--ok'), $err = $popup.find('.apply-notif--err');
  var $file = $form.find('.js-file'), $fileName = $form.find('.js-file-name'), lastFocus = null, okTimer;
  var EMPTY_FILE = 'Chưa có file được chọn', MAX = 5 * 1024 * 1024;

  function open(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    $overlay.add($popup).prop('hidden', false).addClass('is-open');
    $('body').addClass('no-scroll');
    $form.find('input[name="name"]').trigger('focus');
  }
  function close() {
    if ($popup.prop('hidden')) return;
    $overlay.add($popup).prop('hidden', true).removeClass('is-open');
    $('body').removeClass('no-scroll');
    $err.prop('hidden', true);
    if (lastFocus) lastFocus.focus();
  }
  $('.js-apply-open').on('click', open);
  $(document).on('click', '.js-apply-close', close);
  $(document).on('keydown', function (e) { if (e.key === 'Escape') close(); });
  $popup.on('click', '.js-notif-close', function () { $err.prop('hidden', true); });

  /* File field: styled button opens the native picker, name shown next to it */
  $form.on('click', '.js-file-btn', function () { $file.trigger('click'); });
  $file.on('change', function () {
    var f = this.files && this.files[0];
    $fileName.text(f ? f.name : EMPTY_FILE).attr('title', f ? f.name : '');
    $form.find('.apply-file').removeClass('is-invalid');
  });

  function validate() {
    var bad = [];
    var name = $.trim($form.find('[name="name"]').val());
    var phone = $.trim($form.find('[name="phone"]').val());
    var email = $.trim($form.find('[name="email"]').val());
    var f = $file[0].files && $file[0].files[0];
    if (!name) bad.push($form.find('[name="name"]'));
    if (!/^[+\d][\d\s.-]{7,14}$/.test(phone)) bad.push($form.find('[name="phone"]'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad.push($form.find('[name="email"]'));
    if (!f || f.size > MAX || !/\.(pdf|docx?|jpe?g|png)$/i.test(f.name)) bad.push($form.find('.apply-file'));
    if (!$form.find('[name="consent"]').prop('checked')) bad.push($form.find('.apply-consent'));
    return bad;
  }
  $form.on('input change', '.is-invalid, .is-invalid input', function () {
    $(this).closest('.is-invalid').addBack('.is-invalid').removeClass('is-invalid');
  });

  $form.on('submit', function (e) {
    e.preventDefault();
    $form.find('.is-invalid').removeClass('is-invalid');
    var bad = validate();
    clearTimeout(okTimer);
    if (bad.length) {
      $.each(bad, function (_, $el) { $el.addClass('is-invalid'); });
      $ok.prop('hidden', true);
      $err.prop('hidden', false);
      bad[0].is('input') ? bad[0].trigger('focus') : bad[0].find('button, input').first().trigger('focus');
      return;
    }
    $err.prop('hidden', true);
    $ok.prop('hidden', false);
    this.reset();
    $fileName.text(EMPTY_FILE).attr('title', '');
    okTimer = setTimeout(function () { $ok.prop('hidden', true); close(); }, 4000);
  });
})(jQuery);
