/* Swing for Dreams — sliders, criteria accordion, scholar cards, application popup
   (slick options read from the original's instances) */
(function ($) {
  'use strict';

  /* Tầm nhìn & Giá trị: 2 per view, autoplay, 1 per view + dots < 480px */
  $('.js-sw-voices').slick({
    slidesToShow: 2, slidesToScroll: 1, speed: 600, autoplay: true, autoplaySpeed: 3000,
    cssEase: 'linear', infinite: false, arrows: false, dots: false,
    responsive: [{ breakpoint: 480, settings: { slidesToShow: 1, dots: true } }]
  });

  /* Chắp cánh ước mơ: 4 (center) → 3 → 2 → 1 with 30px peek */
  $('.js-sw-dreams').slick({
    slidesToShow: 4, slidesToScroll: 4, arrows: false, dots: false, infinite: true,
    centerMode: true, centerPadding: '0px',
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 3, slidesToScroll: 3, dots: true, centerMode: false } },
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2, dots: true, centerMode: false } },
      { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, centerMode: true, centerPadding: '30px' } }
    ]
  });

  /* scholar card: tap toggles the expanded text, × closes it */
  $(document).on('click', '.sw-scholar__inner', function () {
    $(this).closest('.sw-scholar').toggleClass('is-active');
  });
  $(document).on('click', '.sw-scholar__close', function (e) {
    e.stopPropagation();
    $(this).closest('.sw-scholar').removeClass('is-active');
  });

  /* Tiêu chí xét chọn: hovered box widens; its text appears after the 0.5s width transition */
  var critTimer;
  $('.js-sw-crit .sw-crit__item').on('mouseenter', function () {
    var $item = $(this);
    if ($item.hasClass('is-active') || window.innerWidth < 992) return;
    clearTimeout(critTimer);
    $('.js-sw-crit .sw-crit__item').removeClass('is-active').find('.sw-crit__desc').removeClass('is-shown');
    $item.addClass('is-active');
    critTimer = setTimeout(function () { $item.find('.sw-crit__desc').addClass('is-shown'); }, 500);
  });
  $('.js-sw-crit .sw-crit__item.is-active .sw-crit__desc').addClass('is-shown');

  /* Quy trình xét duyệt: slider from 576px, plain vertical list below */
  var $steps = $('.js-sw-steps');
  function initSteps() {
    if (window.innerWidth >= 576) {
      if (!$steps.hasClass('slick-initialized')) {
        $steps.slick({
          slidesToShow: 3, slidesToScroll: 3, dots: false, arrows: false, infinite: false,
          responsive: [
            { breakpoint: 1100, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 992, settings: { slidesToShow: 2 } }
          ]
        });
      }
    } else if ($steps.hasClass('slick-initialized')) {
      $steps.slick('unslick');
    }
  }
  initSteps();
  $(window).on('resize', initSteps);

  /* Popup form (static demo — nothing is sent) */
  var $overlay = $('.sw-overlay'), $popup = $('.sw-popup');
  function showStep(n) {
    $popup.find('.sw-form__step').removeClass('is-active').filter('[data-step="' + n + '"]').addClass('is-active');
  }
  function open(e) {
    if (e) e.preventDefault();
    $popup.find('.is-error').removeClass('is-error');
    $popup.find('.sw-notice').attr('hidden', true);
    showStep(1);
    $overlay.add($popup).removeAttr('hidden');
    requestAnimationFrame(function () { $overlay.add($popup).addClass('is-open'); });
  }
  function close() {
    $overlay.add($popup).removeClass('is-open');
    setTimeout(function () { $overlay.add($popup).attr('hidden', true); }, 300);
  }
  function validate($scope) {
    var ok = true;
    $scope.find('[required]').each(function () {
      var bad = !this.value.trim() || (this.type === 'email' && !/^\S+@\S+\.\S+$/.test(this.value));
      var $t = this.type === 'date' ? $(this).closest('.sw-field--date') : $(this);
      $t.toggleClass('is-error', bad);
      if (bad) ok = false;
    });
    $popup.find('.sw-notice--err').attr('hidden', ok ? true : null);
    return ok;
  }
  $('.js-sw-open').on('click', open);
  $(document).on('click', '.js-sw-close', close);
  $(document).on('keydown', function (e) { if (e.key === 'Escape' && !$popup.is('[hidden]')) close(); });
  $popup.on('click', '.sw-notice__x', function () { $(this).closest('.sw-notice').attr('hidden', true); });
  $popup.on('click', '.js-sw-next', function () { if (validate($popup.find('[data-step="1"]'))) showStep(2); });
  $popup.on('click', '.js-sw-prev', function () { $popup.find('.sw-notice').attr('hidden', true); showStep(1); });
  $popup.on('change', '#sw-dob', function () { $(this).toggleClass('has-value', !!this.value); });
  $popup.on('click', '.sw-file__btn', function () { $popup.find('.sw-file__input').trigger('click'); });
  $popup.on('change', '.sw-file__input', function () {
    $popup.find('.sw-file__name').text(this.files && this.files[0] ? this.files[0].name : 'Chưa có tệp nào được chọn');
  });
  $popup.find('form').on('submit', function (e) {
    e.preventDefault();
    if (!validate($popup.find('[data-step="2"]'))) return;
    this.reset();
    $popup.find('.sw-file__name').text('Chưa có tệp nào được chọn');
    $popup.find('.sw-notice--ok').removeAttr('hidden');
    showStep(1);
  });
})(jQuery);
