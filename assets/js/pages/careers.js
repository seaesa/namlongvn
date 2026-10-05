/* Tuyển dụng: core-values hover/carousel, sliders, CTA → jobs tab, job search + pagination, job modal */
(function ($) {
  'use strict';

  var $win = $(window);

  /* ---------- Core values ----------
     ≥1200: flex row, hovered box becomes active (flex 2) and shows its text; leaving the row resets to the first.
     <1200: slick carousel (2 per view ≥768, 1 below), dots, no autoplay; click toggles .is-active. */
  var $values = $('.js-values'), $boxes = $values.find('.value-box');
  function resetValues() { $boxes.removeClass('is-active').first().addClass('is-active'); }
  $boxes.on('mouseenter', function () {
    if (window.innerWidth < 1200) return;
    $boxes.removeClass('is-active'); $(this).addClass('is-active');
  });
  $values.on('mouseleave', function () { if (window.innerWidth >= 1200) resetValues(); });
  $boxes.on('click', function () {
    if (window.innerWidth >= 1200) return;
    $boxes.not(this).removeClass('is-active');
    $(this).toggleClass('is-active');
  });
  function syncValues() {
    var w = window.innerWidth;
    if (w < 1200) {
      if (!$values.hasClass('slick-initialized')) {
        $values.addClass('cr-dots').slick({
          slidesToShow: w >= 768 ? 2 : 1, slidesToScroll: 1,
          arrows: false, dots: true, infinite: false, autoplay: false, speed: 500,
          responsive: [{ breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }]
        });
      }
    } else if ($values.hasClass('slick-initialized')) {
      $values.slick('unslick').removeClass('cr-dots');
      resetValues();
    }
  }
  syncValues();
  var rt;
  $win.on('resize', function () { clearTimeout(rt); rt = setTimeout(syncValues, 250); });

  /* ---------- Workplace: 2 per view (1 <800), autoplay 3s, linear, infinite ---------- */
  $('.js-workplace').addClass('cr-dots').slick({
    slidesToShow: 2, slidesToScroll: 2, autoplay: true, autoplaySpeed: 3000, speed: 500, cssEase: 'linear',
    infinite: true, arrows: false, dots: true,
    responsive: [{ breakpoint: 800, settings: { slidesToShow: 1, slidesToScroll: 1 } }]
  });

  /* ---------- Benefits: 4/3/2/1 (bp 1100/992/576), autoplay 3s, not infinite ---------- */
  var $benefits = $('.js-benefits');
  $benefits.addClass('cr-dots').slick({
    slidesToShow: 4, slidesToScroll: 4, autoplay: true, autoplaySpeed: 3000, speed: 500,
    infinite: false, arrows: false, dots: true,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1, autoplay: false } }
    ]
  });
  // hovering one card shrinks the others to 92%
  $benefits.on('mouseenter', '.benefit-card', function () {
    $benefits.find('.benefit-card').not(this).css('transform', 'scale(0.92)');
    $(this).css('transform', 'scale(1)');
  }).on('mouseleave', function () { $benefits.find('.benefit-card').css('transform', ''); });

  /* ---------- Awards: 5/4/3/2/1 (bp 1100/800/480/365), speed 600 linear, autoplay 3s ---------- */
  $('.js-awards').addClass('cr-dots').slick({
    slidesToShow: 5, slidesToScroll: 5, autoplay: true, autoplaySpeed: 3000, speed: 600, cssEase: 'linear',
    infinite: false, arrows: false, dots: true,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 365, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  });

  /* ---------- Tabs: open jobs tab from #position / ?tab=job, and from the CTA ---------- */
  var $jobsPill = $('.careers__pills .pill[data-target="position"]');
  // after main.js has bound the global pill handler (jQuery ready fires after every body script)
  $(function () {
    if (location.hash === '#position' || new URLSearchParams(location.search).get('tab') === 'job') {
      $jobsPill.trigger('click');
    }
  });
  $('.js-to-jobs').on('click', function (e) {
    e.preventDefault();
    $jobsPill.trigger('click');
    setTimeout(function () {
      $('html, body').animate({ scrollTop: $('.careers__pills').offset().top - 30 }, 400);
    }, 200);
  });

  /* ---------- Jobs: 12 per page, search on submit (title / company / location) ---------- */
  var PER_PAGE = 12;
  var $jobs = $('.js-jobs'), $pager = $('.js-pager'), $nums = $pager.find('.pager__nums');
  var all = $jobs.find('.job-card').toArray(), list = all.slice(), page = 1;

  function render() {
    var pages = Math.ceil(list.length / PER_PAGE), start = (page - 1) * PER_PAGE;
    $(all).addClass('is-hidden');
    $(list.slice(start, start + PER_PAGE)).removeClass('is-hidden');
    $jobs.find('.jobs__empty').remove();
    if (!list.length) $jobs.append('<p class="jobs__empty">Không tìm thấy vị trí tuyển dụng nào.</p>');
    $pager.toggleClass('is-hidden', pages <= 1);
    $nums.empty();
    for (var i = 1; i <= pages; i++) {
      $nums.append('<button type="button" class="pager__num' + (i === page ? ' is-active' : '') + '" data-page="' + i + '">' + i + '</button>');
    }
    $pager.find('.pager__prev').prop('disabled', page === 1);
    $pager.find('.pager__next').prop('disabled', page >= pages);
  }
  function go(p) {
    var pages = Math.ceil(list.length / PER_PAGE);
    if (p < 1 || p > pages || p === page) return;
    page = p; render();
  }
  $nums.on('click', '.pager__num', function () { go(+$(this).data('page')); });
  $pager.find('.pager__prev').on('click', function () { go(page - 1); });
  $pager.find('.pager__next').on('click', function () { go(page + 1); });

  $('.js-job-search').on('submit', function (e) {
    e.preventDefault();
    var q = $(this).find('input').val().toLowerCase().trim();
    list = !q ? all.slice() : all.filter(function (el) {
      var d = el.dataset;
      return (d.title || '').indexOf(q) > -1 || (d.office || '').indexOf(q) > -1 || (d.location || '').indexOf(q) > -1;
    });
    page = 1; render();
  });
  render();

  /* ---------- Job detail modal ---------- */
  var $modal = $('#job-modal'), lastFocus = null;
  function openJob(card) {
    var $c = $(card);
    $modal.find('.job-modal__title').text($c.find('.job-card__title span').text());
    $modal.find('.job-modal__info').html($c.find('.job-card__info').html());
    lastFocus = document.activeElement;
    $modal.addClass('is-open').attr('aria-hidden', 'false');
    $('body').addClass('no-scroll');
    $modal.find('.job-modal__close').trigger('focus');
  }
  function closeJob() {
    if (!$modal.hasClass('is-open')) return;
    $modal.removeClass('is-open').attr('aria-hidden', 'true');
    $('body').removeClass('no-scroll');
    if (lastFocus) lastFocus.focus();
  }
  $jobs.on('click', '.js-job-open', function () { openJob($(this).closest('.job-card')); });
  $modal.on('click', '.js-job-close', closeJob);
  $(document).on('keydown', function (e) { if (e.key === 'Escape') closeJob(); });
})(jQuery);
