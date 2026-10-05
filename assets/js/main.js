/* Nam Long homepage clone — interactions */
(function ($) {
  'use strict';

  /* ---------- Clean URLs: /slug/index.html -> /slug/ (and /index.html -> /) ---------- */
  if (/\/index\.html$/.test(location.pathname) && window.history && history.replaceState) {
    history.replaceState(null, '', location.pathname.replace(/index\.html$/, '') + location.search + location.hash);
  }

  var $body = $('body');
  var $win = $(window);
  var isDesktop = function () { return window.innerWidth >= 1200; };

  /* ---------- Preloader ----------
     Measured on the original: logo shown centred (150px) until window load,
     held ~1.5s, then flies (0.8s) to the header logo spot at scale(headerW/150);
     the overlay is then removed and the real header logo revealed. */
  var preloader = document.getElementById('preloader');
  var preLogo = preloader.querySelector('.preloader__logo');
  var isHome = !!document.querySelector('.hero');
  if (!isHome) { preloader.style.display = 'none'; $body.removeClass('is-loading'); }
  requestAnimationFrame(function () { preloader.classList.add('show-logo'); });

  function finalLogo() {
    var logos = document.querySelectorAll('.js-final-logo');
    for (var i = 0; i < logos.length; i++) {
      if (logos[i].getBoundingClientRect().width > 0) return logos[i];
    }
    return null;
  }

  $win.on('load', function () {
    initReveal();
    if (!isHome) return;
    setTimeout(function () {
      var target = finalLogo();
      if (target && window.scrollY < 100) {
        var a = preLogo.getBoundingClientRect(), b = target.getBoundingClientRect();
        var scale = b.width / a.width;
        var dx = (b.left + b.width / 2) - (a.left + a.width / 2);
        var dy = (b.top + b.height / 2) - (a.top + a.height / 2);
        preLogo.style.transition = 'transform 0.8s';
        preLogo.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0) scale(' + scale + ')';
      }
      setTimeout(function () {
        preloader.classList.add('hidden');
        preloader.style.display = 'none';
        $body.removeClass('is-loading');
      }, 800);
    }, 1500);
  });

  /* ---------- Scroll reveal ----------
     Like css3-animate-it: every .reveal inside a section starts together
     (each with its own delay) once the section's top edge enters the viewport. */
  function initReveal() {
    // stagger groups (.ani-up on the original): children get 0.4s + 0.2s * index
    document.querySelectorAll('[data-stagger]').forEach(function (g) {
      var base = parseFloat(g.getAttribute('data-stagger')) || 0.4;
      g.querySelectorAll(':scope > .reveal, :scope .reveal-item').forEach(function (el, i) {
        el.style.animationDelay = (base + 0.2 * i).toFixed(1) + 's';
      });
    });
    var groups = document.querySelectorAll('main > section, main > .reveal-group, [data-stagger], .footer');
    var pending = Array.prototype.slice.call(groups);
    function check() {
      var vh = window.innerHeight;
      pending = pending.filter(function (sec) {
        if (sec.getBoundingClientRect().top < vh) {
          sec.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
          return false;
        }
        return true;
      });
      if (!pending.length) $win.off('scroll.reveal resize.reveal');
    }
    $win.on('scroll.reveal resize.reveal', check);
    check();
  }

  /* ---------- Active menu item (rules measured on the original) ----------
     - exact page of a top-level item -> that item is highlighted (red; green for "Phát triển bền vững")
     - /phat-trien-khu-do-thi-nha-o/ and every /khu-do-thi-nha-o/<slug>/ -> "Dự án"
     - other sub/detail pages -> no top-level item; a matching mega-menu link is marked instead
     Paths are compared by their ending, so it also works when the site is served from a sub-folder. */
  (function () {
    var path = decodeURI(location.pathname).replace(/index\.html$/, '');
    if (!/\/$/.test(path)) path += '/';
    var clean = function (href) { return (href || '').split('#')[0].split('?')[0]; };
    var isPage = function (href) { href = clean(href); return href && href !== '/' && path.slice(-href.length) === href; };
    $('.menu > .menu__item > a').each(function () {
      var href = clean(this.getAttribute('href'));
      var hit = isPage(href) || (href === '/phat-trien-khu-do-thi-nha-o/' && /\/khu-do-thi-nha-o\/[^/]+\/$/.test(path));
      if (hit) $(this).addClass('is-current').parent().addClass('is-current');
    });
    $('.mega__links a').each(function () {
      if (!/#/.test(this.getAttribute('href') || '') && isPage(this.getAttribute('href'))) $(this).addClass('is-current');
    });
  })();

  /* ---------- Desktop mega menu: backdrop ---------- */
  $('.menu__item.has-sub').on('mouseenter', function () {
    if (isDesktop() && !$body.hasClass('interest-open')) $body.addClass('mega-open');
  }).on('mouseleave', function () {
    $body.removeClass('mega-open');
  });

  /* ---------- "Tìm kiếm theo nhu cầu" ---------- */
  $('.js-open-interest').on('click', function (e) {
    e.preventDefault();
    $body.removeClass('mega-open').addClass('interest-open');
  });
  $('.js-close-interest').on('click', function () { $body.removeClass('interest-open'); });
  $('#siteHeader').on('mouseleave', function () {
    if (isDesktop()) $body.removeClass('interest-open');
  });
  $('.menu-backdrop').on('click', function () { $body.removeClass('interest-open mega-open'); });
  $('.interest__tab').on('mouseenter click', function () {
    var target = $(this).data('target');
    $(this).addClass('is-active').siblings().removeClass('is-active');
    $('.interest__pane').removeClass('is-active').filter('#' + target).addClass('is-active');
  });

  /* ---------- Mobile menu ---------- */
  $('.js-toggle-menu').on('click', function () {
    $body.toggleClass('menu-open no-scroll');
    if (!$body.hasClass('menu-open')) $body.removeClass('interest-open');
  });
  // < 768 with a mouse: hovering a parent opens its sub-list (closes on leave),
  // like the original. Tap / click toggles it on every width below 1200.
  function openSub($li) {
    $li.siblings('.is-open').removeClass('is-open').children('.mega').stop(true).slideUp(300);
    $li.addClass('is-open').children('.mega').stop(true).slideDown(300);
  }
  function closeSub($li) {
    $li.removeClass('is-open').children('.mega').stop(true).slideUp(300);
  }
  var canHover = window.matchMedia('(hover: hover)').matches;
  $('.menu__item.has-sub').on('mouseenter', function () {
    if (canHover && window.innerWidth < 768) openSub($(this));
  }).on('mouseleave', function () {
    if (canHover && window.innerWidth < 768) closeSub($(this));
  });
  $('.menu__item.has-sub > a').on('click', function (e) {
    if (isDesktop()) return;
    e.preventDefault();
    var $li = $(this).parent();
    if (canHover && window.innerWidth < 768) { openSub($li); return; }
    $li.hasClass('is-open') ? closeSub($li) : openSub($li);
  });
  $win.on('resize', function () {
    if (isDesktop()) {
      $body.removeClass('menu-open no-scroll');
      $('.menu__item.has-sub').removeClass('is-open').children('.mega').removeAttr('style');
    }
  });

  /* ---------- Site search ----------
     Header form submits to /?s=… (like the original). On / (or /en/homepage/) with ?s=
     the page content is replaced by a results view built from /assets/js/search-index.js. */
  $(document).on('submit', '.search__form', function (e) {
    e.preventDefault();
    var q = $.trim($(this).find('input').val());
    if (q) location.href = (document.documentElement.lang === 'en' ? '/en/' : '/') + '?s=' + encodeURIComponent(q);
  });
  var searchQuery = new URLSearchParams(location.search).get('s');
  if (searchQuery !== null && /^\/(en\/(homepage\/)?)?$/.test(location.pathname)) renderSearchPage(searchQuery);

  function renderSearchPage(q) {
    var en = document.documentElement.lang === 'en';
    var T = en
      ? { ph: 'What are you looking for?', found: function (n, q) { return n + ' results found for “' + q + '”'; }, none: 'No results found.', google: function (q) { return 'Search <b>' + q + '</b> on Google'; } }
      : { ph: 'Bạn muốn tìm kiếm điều gì?', found: function (n, q) { return 'Có ' + n + ' kết quả được tìm thấy với “' + q + '”'; }, none: 'Không tìm thấy kết quả phù hợp.', google: function (q) { return 'Tìm kiếm <b>' + q + '</b> trên Google'; } };
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var norm = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };
    var PER = 6, page = 1, results = [];
    var main = document.getElementById('main');
    document.getElementById('preloader').style.display = 'none';
    $body.removeClass('is-loading').addClass('page-search');
    main.innerHTML = '<section class="search-page"><div class="container"><div class="search-page__inner">' +
      '<form class="search-page__form" action="' + (en ? '/en/' : '/') + '"><input class="search-page__input" type="search" name="s" placeholder="' + T.ph + '" value="' + esc(q) + '"><button type="button" class="search-page__reset" aria-label="Clear"></button></form>' +
      '<div class="search-page__count reveal in"></div><div class="search-page__list reveal in" data-delay="2"></div>' +
      '<a class="search-page__google" target="_blank" rel="noopener" href="https://www.google.com/search?q=site%3Anamlongvn.com+' + encodeURIComponent(q) + '">' + T.google(esc(q)) + '</a>' +
      '<div class="search-pager"></div></div></div></section>';
    $(main).on('click', '.search-page__reset', function () { $(main).find('.search-page__input').val('').trigger('focus'); });

    function draw() {
      var list = main.querySelector('.search-page__list'), pager = main.querySelector('.search-pager');
      main.querySelector('.search-page__count').textContent = T.found(results.length, q);
      var nq = norm(q).trim();
      var mark = function (text) {
        if (!nq) return esc(text);
        var i = norm(text).indexOf(nq);
        return i < 0 ? esc(text) : esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + nq.length)) + '</mark>' + esc(text.slice(i + nq.length));
      };
      list.innerHTML = results.length ? results.slice((page - 1) * PER, page * PER).map(function (r) {
        return '<div class="search-result"><h3><a href="' + r.url + '">' + mark(r.title) + '</a></h3>' + (r.excerpt ? '<p>' + mark(r.excerpt) + '</p>' : '') + '</div>';
      }).join('') : '<div class="search-page__empty">' + T.none + '</div>';
      var pages = Math.ceil(results.length / PER), html = '';
      if (pages > 1) {
        html += '<button data-p="' + (page - 1) + '"' + (page === 1 ? ' disabled' : '') + ' aria-label="prev">&lsaquo;</button>';
        for (var i = 1; i <= pages; i++) {
          if (i === 1 || i === pages || Math.abs(i - page) <= 1) html += '<button data-p="' + i + '"' + (i === page ? ' class="is-active"' : '') + '>' + i + '</button>';
          else if (Math.abs(i - page) === 2) html += '<span>…</span>';
        }
        html += '<button data-p="' + (page + 1) + '"' + (page === pages ? ' disabled' : '') + ' aria-label="next">&rsaquo;</button>';
      }
      pager.innerHTML = html;
    }
    $(main).on('click', '.search-pager button', function () { page = +this.getAttribute('data-p'); draw(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

    var s = document.createElement('script');
    s.src = '/assets/js/search-index.js';
    s.onload = function () {
      var nq = norm(q).trim(), words = nq.split(/\s+/).filter(Boolean);
      results = (window.SEARCH_INDEX || []).filter(function (r) {
        if (r.lang !== (en ? 'en' : 'vi')) return false;
        var hay = norm(r.title + ' ' + r.excerpt + ' ' + (r.keywords || ''));
        return words.length && words.every(function (w) { return hay.indexOf(w) > -1; });
      }).sort(function (a, b) { return (norm(b.title).indexOf(nq) > -1) - (norm(a.title).indexOf(nq) > -1); });
      draw();
    };
    s.onerror = function () { results = []; draw(); };
    document.head.appendChild(s);
  }

  /* ---------- Search overlay ---------- */
  $('.js-open-search').on('click', function (e) {
    e.preventDefault();
    var open = !$body.hasClass('search-open');
    $body.toggleClass('search-open', open).removeClass('menu-open no-scroll interest-open');
    $('.js-open-search').toggleClass('is-close', open);
    window.scrollTo(0, 0);
    if (open) setTimeout(function () { $('.search__input').trigger('focus'); }, 300);
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $body.removeClass('search-open interest-open menu-open no-scroll mega-open');
      $('.js-open-search').removeClass('is-close');
    }
  });

  /* ---------- Sticky header on tablet/mobile (hide on scroll down, show on up) ---------- */
  var lastY = 0;
  var header = document.getElementById('siteHeader');
  function onScroll() {
    var y = window.scrollY;
    if (!isDesktop() && !$body.hasClass('menu-open')) {
      header.classList.toggle('is-stuck', y > 10);
      header.classList.toggle('is-hidden', y > 200 && y > lastY);
    } else {
      header.classList.remove('is-hidden', 'is-stuck');
    }
    lastY = y;
    updateGotop(y);
  }
  $win.on('scroll', onScroll);

  /* ---------- Go top ---------- */
  var gotop = document.getElementById('gotop');
  var footer = document.querySelector('.footer');
  function updateGotop(y) {
    gotop.classList.toggle('show', y > 600);
    // white outline over the red footer, filled red elsewhere
    var overFooter = footer.getBoundingClientRect().top < window.innerHeight - 40;
    gotop.classList.toggle('on-light', !overFooter);
  }
  gotop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- Hero (fade, autoplay 12s) ---------- */
  $('.js-hero').slick({
    fade: true, speed: 600, cssEase: 'linear',
    autoplay: true, autoplaySpeed: 12000, pauseOnHover: false,
    dots: true, arrows: false, infinite: true,
    initialSlide: 0
  });

  /* ---------- Business fields carousel ---------- */
  $('.js-business').addClass('dots-red').slick({
    slidesToShow: 4, slidesToScroll: 3,
    autoplay: true, autoplaySpeed: 3000, speed: 600, cssEase: 'linear',
    dots: true, arrows: true, infinite: true, pauseOnHover: true,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } }
    ]
  });

  /* ---------- News carousel ---------- */
  $('.js-news').addClass('dots-red').slick({
    slidesToShow: 3, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 3000, speed: 600, cssEase: 'linear',
    dots: false, arrows: false, infinite: true, pauseOnHover: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 1, dots: true } }
    ]
  });

  /* ---------- Key figures: continuous marquee (>=500px), list below ---------- */
  var figTrack = document.querySelector('.figures__track');
  if (figTrack) (function () {
  var figOriginals = Array.prototype.slice.call(figTrack.children);
  figOriginals.forEach(function (n) {
    var c = n.cloneNode(true); c.classList.add('is-clone'); c.setAttribute('aria-hidden', 'true');
    figTrack.appendChild(c);
  });
  var figX = 0, figPaused = false, figLast = 0;
  var FIG_SPEED = 90; // px per second
  function figLoop(t) {
    var dt = figLast ? (t - figLast) / 1000 : 0; figLast = t;
    if (window.innerWidth >= 500) {
      if (!figPaused) figX -= FIG_SPEED * dt;
      var half = figTrack.scrollWidth / 2;
      if (-figX >= half) figX += half;
      figTrack.style.transform = 'translate3d(' + figX + 'px,0,0)';
    }
    requestAnimationFrame(figLoop);
  }
  requestAnimationFrame(figLoop);
  $('.js-figures').on('mouseenter', function () { figPaused = true; }).on('mouseleave', function () { figPaused = false; });

  })();

  /* ---------- Count-up numbers when visible ---------- */
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function countUp(el) {
    var to = parseInt(el.getAttribute('data-to'), 10), start = null, dur = 2000;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.js-count').forEach(countUp);
        cio.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    if (document.querySelector('.figures')) cio.observe(document.querySelector('.figures'));
  }

  /* ---------- Commitments: CSS marquee (duplicate set so -50% loops seamlessly) ---------- */
  var commit = document.querySelector('.js-commit');
  if (commit) (function () {
  Array.prototype.slice.call(commit.children).forEach(function (n) {
    var c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); commit.appendChild(c);
  });
  function setCommitSpeed() {
    var half = commit.scrollWidth / 2;
    commit.style.setProperty('--marquee-dur', (half / 98).toFixed(2) + 's'); // ~98px/s like the original
  }
  setCommitSpeed();
  $win.on('resize', setCommitSpeed);

  })();

  /* ---------- Cookie notice ---------- */
  var cookie = document.getElementById('cookie');
  var stored = null;
  try { stored = localStorage.getItem('nl-cookie'); } catch (e) {}
  if (stored) cookie.style.display = 'none';
  $('.cookie__btn').on('click', function () {
    try { localStorage.setItem('nl-cookie', $(this).data('cookie')); } catch (e) {}
    cookie.classList.add('is-hidden');
    setTimeout(function () { cookie.style.display = 'none'; }, 500);
  });

  /* ---------- Pill tabs: [data-tabs] > .pill[data-target] ; panes .tab-pane#id ---------- */
  $(document).on('click', '[data-tabs] .pill', function () {
    var $btn = $(this), id = $btn.data('target');
    $btn.addClass('is-active').siblings().removeClass('is-active');
    var $pane = $('#' + id);
    $pane.siblings('.tab-pane').removeClass('is-active is-shown');
    $pane.addClass('is-active');
    requestAnimationFrame(function () { $pane.addClass('is-shown'); $pane.find('.slick-initialized').slick('setPosition'); });
  });
  $('.tab-pane.is-active').addClass('is-shown');

  window.NL = { isDesktop: isDesktop };
  onScroll();
})(jQuery);
