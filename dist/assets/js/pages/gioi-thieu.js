/* Giới thiệu (/gioi-thieu/) — page interactions */
(function ($) {
  'use strict';

  var $win = $(window);
  var isDesktop = function () { return window.innerWidth >= 1200; };

  /* ---------- Collapse toggle (< 992px): slide the section body 400ms, rotate the arrow ---------- */
  $('.fold__toggle').on('click', function () {
    var $btn = $(this);
    $btn.closest('.fold').find('.fold__body').stop(true, true).slideToggle(400, function () {
      $(this).find('.slick-initialized').slick('setPosition');
    });
    $btn.toggleClass('is-rotated');
    $btn.closest('section').find('.reveal').addClass('in');
  });
  $win.on('resize', function () {
    if (window.innerWidth >= 992) { $('.fold__body').css('display', ''); $('.fold__toggle').removeClass('is-rotated'); }
  });

  /* ---------- Core values ----------
     >= 1200: hovering a box makes it the open one; leaving the row re-opens the first.
     <  1200: slick carousel (2 per view, 1 below 600px), autoplay, infinite. */
  var $values = $('.values');
  var $boxes = $values.find('.value-box');
  $boxes.on('mouseover', function () {
    if (!isDesktop()) return;
    $boxes.removeClass('is-active');
    $(this).addClass('is-active');
  });
  $values.on('mouseleave', function () {
    if (!isDesktop()) return;
    $boxes.removeClass('is-active').first().addClass('is-active');
  });
  function valuesMode() {
    if (!isDesktop() && !$values.hasClass('slick-initialized')) {
      $values.slick({
        slidesToShow: 2, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000, speed: 500,
        infinite: true, dots: false, arrows: false,
        responsive: [{ breakpoint: 600, settings: { slidesToShow: 1 } }]
      });
    } else if (isDesktop() && $values.hasClass('slick-initialized')) {
      $values.slick('unslick');
      $boxes.removeClass('is-active').first().addClass('is-active');
    }
  }
  valuesMode();
  $win.on('resize', valuesMode);

  /* ---------- Core business: hover a line to cross-fade the image (0.5s) ---------- */
  var $bizBox = $('.js-biz-img');
  var $bizImgs = $bizBox.find('img');
  var bizCurrent = $bizImgs.filter('.is-active').attr('src');
  function showBiz(src) {
    if (!src || src === bizCurrent) return;
    var $on = $bizImgs.filter('.is-active'), $off = $bizImgs.not('.is-active');
    $off.attr('src', src).addClass('is-active');
    $on.removeClass('is-active');
    bizCurrent = src;
  }
  var $bizItems = $('.js-biz-list li');
  $bizItems.each(function () { var i = new Image(); i.src = $(this).data('image'); });
  $bizItems.on('mouseenter', function () { showBiz($(this).data('image')); });
  $('.js-biz-list').on('mouseleave', function () { showBiz($bizItems.first().data('image')); });

  /* ---------- Development journey ----------
     Year strip (6 per view; 4 < 800; 1 < 480) and the content slider are linked with asNavFor.
     Each year holds its own dotted inner slider and an autoplaying awards strip. */
  $('.js-legacy-inner').each(function () {
    var $s = $(this);
    $s.slick({
      slidesToShow: 1, slidesToScroll: 1, speed: 500, adaptiveHeight: true, infinite: false,
      dots: $s.children().length > 1, arrows: false, swipe: false, draggable: false, touchMove: false
    });
  });
  $('.js-awards').slick({
    slidesToShow: 5, slidesToScroll: 5, autoplay: true, autoplaySpeed: 3000, speed: 1000, cssEase: 'linear',
    infinite: true, dots: false, arrows: false, pauseOnHover: true,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 365, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  });
  $('.js-years').slick({
    slidesToShow: 6, slidesToScroll: 1, speed: 500, infinite: false, arrows: false, dots: false,
    focusOnSelect: true, swipe: false, draggable: false, touchMove: false, asNavFor: '.js-legacy',
    responsive: [
      { breakpoint: 800, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  });
  $('.js-legacy').slick({
    slidesToShow: 1, slidesToScroll: 1, speed: 500, infinite: false, adaptiveHeight: true,
    arrows: true, dots: false, swipe: false, draggable: false, touchMove: false, asNavFor: '.js-years'
  }).on('afterChange', function (e, slick, cur) {
    var $cur = $(slick.$slides[cur]);
    $cur.find('.slick-initialized').slick('setPosition');
  });

  /* ---------- Board member modal ---------- */
  var $modal = $('#boardModal');
  function openModal($card) {
    var name = $card.find('.board-card__name').text();
    $modal.find('.board-modal__img img').attr({ src: $card.find('img').attr('src'), alt: name });
    $modal.find('.board-modal__name').text(name);
    $modal.find('.board-modal__pos').text($card.find('small').text());
    $modal.find('.board-modal__desc').empty()
      .append($('<p><strong>Kinh nghiệm &amp; năng lực</strong></p>'))
      .append($('<p>').text($card.data('bio')))
      .append($('<p><strong>Vai trò hiện tại</strong></p>'))
      .append($('<ul>').append($('<li>').text($card.find('small').text())));
    $modal.attr('aria-hidden', 'false').addClass('is-open');
    $('body').addClass('modal-open');
    $modal[0].offsetWidth; // reflow so the fade/slide transition runs
    $modal.addClass('is-shown');
    $modal.find('.board-modal__info').scrollTop(0);
  }
  function closeModal() {
    $modal.removeClass('is-shown').attr('aria-hidden', 'true');
    setTimeout(function () { $modal.removeClass('is-open'); $('body').removeClass('modal-open'); }, 300);
  }
  $('.js-board').on('click', function () { openModal($(this)); });
  $modal.on('click', function (e) {
    if (e.target === this || $(e.target).closest('.js-modal-close').length || $(e.target).is('.board-modal__dialog')) closeModal();
  });
  $(document).on('keydown', function (e) { if (e.key === 'Escape' && $modal.hasClass('is-open')) closeModal(); });

  /* ---------- Strategic partners: CSS marquee (~73px/s), duplicate set for a seamless -50% loop ---------- */
  var track = document.querySelector('.js-partners');
  Array.prototype.slice.call(track.children).forEach(function (n) {
    var c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c);
  });
  function setPartnerSpeed() {
    track.style.setProperty('--marquee-dur', (track.scrollWidth / 2 / 73).toFixed(2) + 's');
  }
  setPartnerSpeed();
  $win.on('resize', setPartnerSpeed);

})(jQuery);
