/* Phát triển bền vững — sliders (options read from the original's slick instances) */
(function ($) {
  'use strict';

  /* Khung phát triển bền vững: 3 cards (static at >= 800px since all fit),
     2 per view with dots < 800px, 1 per view + 80px peek < 480px */
  $('.js-sus-frame').slick({
    slidesToShow: 3, slidesToScroll: 3,
    autoplay: true, autoplaySpeed: 3000, speed: 500, cssEase: 'linear',
    dots: false, arrows: false, infinite: true, pauseOnHover: true,
    responsive: [
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2, dots: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } }
    ]
  });

  /* Đóng góp nổi bật: fade slider */
  $('.js-impact').slick({
    slidesToShow: 1, slidesToScroll: 1, fade: true,
    autoplay: true, autoplaySpeed: 3000, speed: 500, cssEase: 'linear',
    dots: true, arrows: false, infinite: false, pauseOnHover: true
  });
})(jQuery);
