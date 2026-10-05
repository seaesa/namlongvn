/* Quan hệ nhà đầu tư — tabs, year selects, financial slider, document lists,
   sticky in-page nav with scroll-spy. Data comes from investor-data.js. */
(function ($) {
  'use strict';

  var D = window.INVESTOR_DATA || {};
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  /* ---------- Generic tabs: [data-inv-tabs] > button[data-pane] ---------- */
  function showPane(pane) {
    $(pane).siblings('.inv-pane').removeClass('is-active is-shown');
    $(pane).addClass('is-active');
    requestAnimationFrame(function () { $(pane).addClass('is-shown'); });
  }
  $(document).on('click', '[data-inv-tabs] > button', function () {
    var $b = $(this);
    $b.addClass('is-active').siblings().removeClass('is-active');
    showPane(document.getElementById($b.data('pane')));
  });
  $('.inv-pane.is-active').addClass('is-shown');

  /* ---------- Select (custom dropdown) ---------- */
  // opts: [{v, t}] ; onChange(value)
  function makeSelect(host, opts, value, onChange) {
    var cur = opts.filter(function (o) { return o.v === value; })[0] || opts[0];
    host.innerHTML = '<button type="button" class="inv-select__btn" aria-haspopup="listbox"><span>' + esc(cur ? cur.t : '') + '</span></button>' +
      '<div class="inv-select__menu" role="listbox">' + opts.map(function (o) {
        return '<button type="button" data-v="' + esc(o.v) + '">' + esc(o.t) + '</button>';
      }).join('') + '</div>';
    host._value = cur ? cur.v : null;
    $(host).off('.sel')
      .on('click.sel', '.inv-select__btn', function (e) {
        e.stopPropagation();
        var open = !host.classList.contains('is-open');
        $('.inv-select.is-open').removeClass('is-open');
        host.classList.toggle('is-open', open);
      })
      .on('click.sel', '.inv-select__menu button', function () {
        var v = this.getAttribute('data-v');
        host._value = v;
        host.querySelector('.inv-select__btn span').textContent = this.textContent;
        host.classList.remove('is-open');
        onChange(v);
      });
  }
  $(document).on('click', function () { $('.inv-select.is-open').removeClass('is-open'); });

  /* ---------- Trading statistics (Tuần / Tháng / Quý / Năm) ---------- */
  function renderTrading(period) {
    var t = (D.trading || {})[period];
    if (!t) return;
    $('#invDateStart').val(t.dates[0]);
    $('#invDateEnd').val(t.dates[1]);
    var b = document.querySelectorAll('#tradingPrices b');
    t.prices.forEach(function (p, i) { if (b[i]) b[i].textContent = p; });
    $('#tradingResult').text(t.result);
    $('#tradingSummary').html(t.summary.map(function (s) {
      return '<div class="inv-row"><span>' + esc(s[0]) + '</span><b' + (s[2] ? ' class="is-' + s[2] + '"' : '') + '>' + esc(s[1]) + '</b></div>';
    }).join(''));
  }
  $('#tradingTabs').on('click', 'button', function () {
    $(this).addClass('is-active').siblings().removeClass('is-active');
    renderTrading($(this).data('period'));
  });
  renderTrading('week');

  /* ---------- Monthly / quarterly / annual statistics ---------- */
  function statRows(values) {
    if (!values) return '<div class="inv-empty">Không có dữ liệu</div>';
    return D.statLabels.map(function (l, i) {
      return '<div class="inv-row"><span>' + esc(l) + '</span><b>' + esc(values[i]) + '</b></div>';
    }).join('');
  }
  var stat = { monthly: { year: null, month: '1' }, quarterly: { year: null, quarter: '1' }, annual: { year: null } };
  function renderStat(kind) {
    var s = stat[kind], key = kind === 'monthly' ? s.year + '-' + s.month : kind === 'quarterly' ? s.year + '-' + s.quarter : s.year;
    $('[data-stat-out="' + kind + '"]').html(statRows(D[kind].rows[key]));
  }
  function yearOpts(list) { return list.map(function (y) { return { v: y, t: y }; }); }
  var range = function (n, label) { var a = []; for (var i = 1; i <= n; i++) a.push({ v: String(i), t: label + ' ' + i }); return a; };
  $('[data-stat]').each(function () {
    var kind = this.getAttribute('data-stat'), key = this.getAttribute('data-key');
    var opts = key === 'year' ? yearOpts(D[kind].years) : key === 'month' ? range(12, 'Tháng') : range(4, 'Quý');
    if (key === 'year') stat[kind].year = D[kind].years[0];
    makeSelect(this, opts, stat[kind][key], function (v) { stat[kind][key] = v; renderStat(kind); });
  });
  ['monthly', 'quarterly', 'annual'].forEach(renderStat);

  /* ---------- Financial information ---------- */
  var fin = { cat: 'income', period: 'quarterly', group: 0, mobile: 1 };
  function renderFin() {
    var data = (D.fin || {})[fin.cat + '-' + fin.period], out = document.getElementById('finOut');
    if (!out) return;
    if (!data || !data.cols.length) {
      out.innerHTML = '<p class="inv-fin__none">Không có dữ liệu theo Năm cho mục này.</p>';
      return;
    }
    var groups = [];
    for (var i = 0; i < data.cols.length; i += 4) groups.push(data.cols.slice(i, i + 4));
    fin.group = 0;
    var html = '<div class="inv-fgrid"><div class="inv-fgrid__labels">' +
      data.labels.map(function (l) { return '<div class="inv-fgrid__label">' + esc(l) + '</div>'; }).join('') +
      '</div><div class="inv-fgrid__slider"><div class="inv-fgrid__viewport">' +
      groups.map(function (g, gi) {
        return '<div class="inv-fgrid__track' + (gi === 0 ? ' is-active' : '') + '">' + g.map(function (c) {
          return '<div class="inv-fgrid__col"><div class="inv-fgrid__head">' + esc(c[0]) + '</div>' +
            c.slice(1).map(function (v) { return '<div class="inv-fgrid__val">' + esc(v) + '</div>'; }).join('') + '</div>';
        }).join('') + '</div>';
      }).join('') +
      '</div><button type="button" class="inv-fgrid__nav inv-fgrid__nav--prev" aria-label="Kỳ trước" disabled></button>' +
      '<button type="button" class="inv-fgrid__nav inv-fgrid__nav--next" aria-label="Kỳ sau"' + (groups.length < 2 ? ' disabled' : '') + '></button></div></div>' +
      '<div class="inv-fin__mobile"><div class="inv-select" id="finMobileSelect"></div>' +
      '<small class="inv-fin__mobile-unit">Đơn vị: triệu đồng</small><div class="inv-fin__list" id="finMobileList"></div></div>';
    out.innerHTML = html;
    var tracks = out.querySelectorAll('.inv-fgrid__track'), prev = out.querySelector('.inv-fgrid__nav--prev'), next = out.querySelector('.inv-fgrid__nav--next');
    function go(d) {
      var n = Math.max(0, Math.min(groups.length - 1, fin.group + d));
      if (n === fin.group) return;
      tracks[fin.group].classList.remove('is-active');
      tracks[n].classList.add('is-active');
      fin.group = n;
      prev.disabled = n === 0;
      next.disabled = n === groups.length - 1;
    }
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    // mobile: one period at a time, picked from a select
    function mobileList(idx) {
      var c = data.cols[idx];
      document.getElementById('finMobileList').innerHTML = data.labels.map(function (l, i) {
        return '<div class="inv-listing__row"><span>' + esc(l) + '</span><b>' + esc(c[i + 1]) + '</b></div>';
      }).join('');
    }
    makeSelect(document.getElementById('finMobileSelect'), data.cols.map(function (c, i) { return { v: String(i), t: c[0] }; }), '0', function (v) { mobileList(+v); });
    mobileList(0);
  }
  $('#finCategory').on('click', 'button', function () {
    $(this).addClass('is-active').siblings().removeClass('is-active');
    fin.cat = $(this).data('cat');
    renderFin();
  });
  $('#finPeriod').on('click', 'button', function () {
    $(this).addClass('is-active').siblings().removeClass('is-active');
    fin.period = $(this).data('period');
    renderFin();
  });
  renderFin();

  /* ---------- Document lists ---------- */
  function docItems(items) {
    return items.map(function (it) {
      return '<div class="inv-doc"><p class="inv-doc__title"><a href="' + esc(it[1]) + '" target="_blank" rel="noopener">' + esc(it[0]) + '</a></p>' +
        '<div class="inv-doc__meta"><a class="inv-doc__pdf" href="' + esc(it[1]) + '" target="_blank" rel="noopener">PDF</a>' +
        '<div class="inv-doc__date">' + esc(it[2]) + '</div></div></div>';
    }).join('');
  }
  $('[data-docs]').each(function () {
    var d = (D.docs || {})[this.getAttribute('data-docs')];
    if (!d) return;
    var host = this;
    host.innerHTML = '<div class="inv-select"></div><div class="inv-doclist"></div>';
    var list = host.querySelector('.inv-doclist');
    var show = function (y) { list.innerHTML = docItems(d.lists[y] || []); list.scrollTop = 0; };
    makeSelect(host.querySelector('.inv-select'), yearOpts(d.years), d.years[0], show);
    show(d.years[0]);
  });
  $('[data-report]').each(function () {
    var d = (D.docs || {})[this.getAttribute('data-report')];
    if (!d) return;
    var f = d.featured;
    this.innerHTML = '<a class="inv-report__cover" href="' + esc(f[1]) + '" target="_blank" rel="noopener">' +
      '<img src="' + esc(f[3]) + '" alt="' + esc(f[0]) + '" loading="lazy"><span class="inv-report__badge">PDF</span>' +
      '<div class="inv-report__info"><span>' + esc(f[2]) + '</span><h3>' + esc(f[0]) + '</h3></div></a>' +
      '<div class="inv-report__list"><div class="inv-doclist">' + docItems(d.items) + '</div></div>';
  });

  /* ---------- In-page nav: sticky, scroll-spy, smooth scroll ----------
     Measured on the original: the bar turns position:fixed (top 0) once the page
     scrolls past it (its wrapper collapses), the link of the last section whose
     top is at/above the bar's bottom gets red, clicks scroll so the section top
     lands right under the bar; on narrow screens the active link is centred. */
  var wrap = document.getElementById('invNavWrap'), nav = document.getElementById('invNav');
  if (!wrap || !nav) return;
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var activeIdx = -1;

  function wrapTop() { return wrap.getBoundingClientRect().top + window.scrollY; }
  function update() {
    var sticky = window.scrollY >= wrapTop();
    nav.classList.toggle('is-sticky', sticky);
    var h = nav.offsetHeight, idx = -1;
    targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= h + 10) idx = i; });
    if (idx !== activeIdx) {
      activeIdx = idx;
      links.forEach(function (a, i) { a.classList.toggle('is-active', i === idx); });
      if (idx > -1 && nav.scrollWidth > nav.clientWidth) {
        var r = links[idx].getBoundingClientRect(), nr = nav.getBoundingClientRect();
        nav.scrollTo({ left: nav.scrollLeft + (r.left - nr.left) + r.width / 2 - nav.clientWidth / 2, behavior: 'smooth' });
      }
    }
  }
  $(window).on('scroll resize', update);
  update();

  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      var t = targets[i];
      if (!t) return;
      e.preventDefault();
      var h = nav.offsetHeight;
      var y = t.getBoundingClientRect().top + window.scrollY - h;
      if (!nav.classList.contains('is-sticky')) y -= h; // wrapper collapses once the bar sticks
      window.scrollTo({ top: Math.ceil(y), behavior: 'smooth' });
    });
  });
})(jQuery);
