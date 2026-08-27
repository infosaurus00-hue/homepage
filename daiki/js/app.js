/* ============================================================
   峠大輝 パーソナルLP ─ 挙動
   - スクロール表示（fade + translateY）
   - ヘッダーの背景切り替え
   - ストーリータイムラインの進行ライン
   - 実績数字のカウントアップ
   - スマホ固定CTAの表示制御
   - CTAクリックの計測（GA4）
   すべて prefers-reduced-motion に対応。
   ============================================================ */
(function () {
  'use strict';

  var CONFIG = window.__LP_CONFIG__ || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- スクロール表示 ---------- */
  function initReveal() {
    var targets = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* ---------- ヘッダー ---------- */
  function initHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;
    return function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
  }

  /* ---------- タイムライン ---------- */
  function initTimeline() {
    var timeline = document.getElementById('timeline');
    if (!timeline) return;
    var progress = timeline.querySelector('.timeline__progress');
    var items = timeline.querySelectorAll('.timeline__item');

    return function () {
      var rect = timeline.getBoundingClientRect();
      var anchor = window.innerHeight * 0.62;
      var ratio = (anchor - rect.top) / Math.max(rect.height, 1);
      if (ratio < 0) ratio = 0;
      if (ratio > 1) ratio = 1;
      if (progress) progress.style.setProperty('--p', ratio.toFixed(4));

      Array.prototype.forEach.call(items, function (item) {
        var top = item.getBoundingClientRect().top;
        item.classList.toggle('is-active', top < anchor);
      });
    };
  }

  /* ---------- 数字のカウントアップ ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;
    if (!('IntersectionObserver' in window) || reduceMotion) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          animate(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    Array.prototype.forEach.call(counters, function (el) { io.observe(el); });

    function animate(el) {
      var target = parseInt(el.getAttribute('data-count-to'), 10);
      var suffix = el.getAttribute('data-count-suffix') || '';
      var final = el.textContent;
      var duration = 700;
      var start = null;

      function step(now) {
        if (start === null) start = now;
        var t = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        if (t >= 1) {
          el.textContent = final;
          return;
        }
        el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
        window.requestAnimationFrame(step);
      }
      el.textContent = '0' + suffix;
      window.requestAnimationFrame(step);
    }
  }

  /* ---------- スマホ固定CTA ---------- */
  function initStickyCta() {
    var bar = document.getElementById('sticky-cta');
    var hero = document.querySelector('.hero');
    var final = document.getElementById('final');
    if (!bar || !hero) return;
    bar.hidden = false;

    return function () {
      var pastHero = hero.getBoundingClientRect().bottom < 0;
      var finalNear = final ? final.getBoundingClientRect().top < window.innerHeight * 0.92 : false;
      bar.classList.toggle('is-visible', pastHero && !finalNear);
    };
  }

  /* ---------- CTAクリック計測 ---------- */
  function initAnalytics() {
    var eventName = CONFIG.ctaEvent || 'personal_lp_cta_click';
    document.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('[data-cta]') : null;
      if (!link) return;
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
          location: link.getAttribute('data-cta'),
          link_url: link.getAttribute('href'),
        });
      }
    });
  }

  /* ---------- スクロール処理をまとめて rAF で回す ---------- */
  function initScroll(handlers) {
    var active = handlers.filter(Boolean);
    if (!active.length) return;
    var ticking = false;
    function run() {
      active.forEach(function (fn) { fn(); });
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(run);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    run();
  }

  initReveal();
  initCounters();
  initAnalytics();
  initScroll([initHeader(), initTimeline(), initStickyCta()]);
})();
