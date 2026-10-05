/* Phát triển Khu đô thị & Nhà ở — sliders + client-side project filters */
(function ($) {
  'use strict';

  /* ---------- Featured projects (slick options read from the original) ---------- */
  $('.js-featured').slick({
    slidesToShow: 4, slidesToScroll: 4,
    speed: 500, cssEase: 'linear', infinite: true,
    dots: true, arrows: true, autoplay: false,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } }
    ]
  });

  /* ---------- Standard product lines ---------- */
  $('.js-lines').slick({
    slidesToShow: 4, slidesToScroll: 4,
    speed: 500, cssEase: 'linear', infinite: true,
    autoplay: true, autoplaySpeed: 3000, pauseOnHover: true,
    dots: false, arrows: false,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } }
    ]
  });

  /* ---------- Catalogue: single-select dropdown per facet, AND across facets ---------- */
  var $filters = $('.proj-filter');
  var $grid = $('.proj-grid');
  var $items = $grid.find('.proj-grid__item');
  var state = { region: '', type: '', product: '', status: '' };

  function closeAll($except) {
    $filters.not($except || $()).removeClass('is-open').find('.proj-filter__toggle').attr('aria-expanded', 'false');
  }

  function apply() {
    var active = Object.keys(state).filter(function (k) { return state[k]; });
    var shown = 0;
    $items.each(function () {
      var el = this;
      var ok = active.every(function (k) {
        return (' ' + (el.getAttribute('data-' + k) || '') + ' ').indexOf(' ' + state[k] + ' ') > -1;
      });
      el.classList.toggle('is-filtered-out', !ok);
      if (ok) shown++;
    });
    // filtered results list every match (no "Xem thêm"); clearing restores the initial 8 + "Xem thêm"
    $grid.toggleClass('is-filtering', active.length > 0);
    $grid.toggleClass('is-empty', shown === 0);
  }

  $filters.on('click', '.proj-filter__toggle', function (e) {
    e.stopPropagation();
    var $f = $(this).closest('.proj-filter');
    var open = !$f.hasClass('is-open');
    closeAll($f);
    $f.toggleClass('is-open', open);
    $(this).attr('aria-expanded', String(open));
  });

  $filters.on('click', '.proj-filter__menu button', function (e) {
    e.stopPropagation();
    var $f = $(this).closest('.proj-filter');
    state[$f.data('key')] = String($(this).data('value'));
    $f.find('.proj-filter__toggle span').text($(this).text());
    closeAll();
    apply();
  });

  $(document).on('click', function () { closeAll(); });
  $(document).on('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  $('.js-proj-clear').on('click', function (e) {
    e.preventDefault();
    Object.keys(state).forEach(function (k) { state[k] = ''; });
    $filters.each(function () {
      var $t = $(this).find('.proj-filter__toggle');
      $t.find('span').text($t.data('default'));
    });
    closeAll();
    $grid.removeClass('is-expanded');
    apply();
  });

  $('.js-proj-more').on('click', function (e) {
    e.preventDefault();
    $grid.addClass('is-expanded');
  });
})(jQuery);
