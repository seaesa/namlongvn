/* Project detail — gallery slider, sub-project slider, legal documents "Xem thêm" + mobile collapse */
(function ($) {
  'use strict';

  /* Header: /khu-do-thi-nha-o/* belongs to the "Dự án" menu (main.js only matches by URL prefix) */
  $('.menu__item > a[href="/phat-trien-khu-do-thi-nha-o/"]').addClass('is-current').parent('.menu__item').addClass('is-current');

  /* Gallery (.sbusiness): options read from the original */
  $('.js-pd-gallery').slick({
    slidesToShow: 2, slidesToScroll: 2,
    speed: 500, cssEase: 'linear', infinite: true,
    autoplay: true, autoplaySpeed: 3000, pauseOnHover: true,
    dots: true, arrows: false,
    responsive: [{ breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }]
  });

  /* Sub-projects (.s-featured.subdivision): same options as the listing page's featured slider */
  $('.js-pd-subs').slick({
    slidesToShow: 4, slidesToScroll: 4,
    speed: 500, cssEase: 'linear', infinite: true,
    dots: true, arrows: true, autoplay: false,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } }
    ]
  });

  /* Legal documents: first 3 shown, "Xem thêm" reveals the rest (the link stays, like the original) */
  $('.js-docs-more').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.pd-legal').find('.pd-docs').removeClass('is-collapsed')
      .find('.reveal').addClass('in');
  });

  /* Mobile: arrow collapses / expands the documents block */
  $('.js-legal-toggle').on('click', function () {
    var $btn = $(this);
    var open = $btn.attr('aria-expanded') === 'true';
    $btn.attr('aria-expanded', open ? 'false' : 'true');
    $btn.closest('.pd-legal').find('.js-legal-content').stop(true).slideToggle(400);
  });
})(jQuery);
