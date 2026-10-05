/* Liên hệ — branch accordion: one office open at a time, jQuery slide 400ms "swing"
   (timing measured on the original: ~15% open after 100ms, fully open at ~400ms) */
(function ($) {
  'use strict';

  $('.js-branches').on('click', '.branch__head', function () {
    var $item = $(this).closest('.branch');
    var open = !$item.hasClass('is-active');
    $item.siblings('.is-active').removeClass('is-active')
      .find('.branch__head').attr('aria-expanded', 'false').end()
      .children('.branch__body').stop(true).slideUp(400);
    $item.toggleClass('is-active', open);
    $(this).attr('aria-expanded', open ? 'true' : 'false');
    $item.children('.branch__body').stop(true)[open ? 'slideDown' : 'slideUp'](400);
  });
})(jQuery);
