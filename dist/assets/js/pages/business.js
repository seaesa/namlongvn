/* Business pages: gallery slider, featured cards slider, stat count-up */
(function ($) {
  'use strict';

  /* ---------- Gallery (.sbusiness on the original): 2 per view, autoplay 3s ---------- */
  $('.js-biz-gallery').slick({
    slidesToShow: 2, slidesToScroll: 2,
    autoplay: true, autoplaySpeed: 3000, speed: 500, cssEase: 'linear',
    dots: true, arrows: false, infinite: true, pauseOnHover: true,
    responsive: [
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  });

  /* ---------- Featured commercial cards (.s-featured): 4/3/2/1, no autoplay ---------- */
  $('.js-featured').slick({
    slidesToShow: 4, slidesToScroll: 4,
    autoplay: false, speed: 500, cssEase: 'linear',
    dots: true, arrows: true, infinite: true,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } }
    ]
  });

  /* ---------- Count-up of the land-bank figures when the row scrolls into view ---------- */
  function countUp(el) {
    var to = parseInt(el.getAttribute('data-to'), 10), start = null, dur = 2000;
    el.textContent = '0';
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var stats = document.querySelector('.js-stats');
  if (stats && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.js-count').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    io.observe(stats);
  }
})(jQuery);
