/* ============================================================
   トップページ専用モーション（css/motion.css とセット）
   - html.mo は <head> のインラインscriptが付与（動きを減らす設定の人には付かない）
   - ここが読み込まれなかった場合は head 側が3.5秒後に html.mo を外し、静的表示に戻す
   ============================================================ */
window.__moReady = true;

document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;
  var MO = root.classList.contains('mo');
  var canHover = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---- 課題チェックリスト（動きの設定に関係なく有効：UIとしての機能） ---- */
  initProblemChecklist();

  if (!MO) return;

  /* ---- 見出しを行ごとに分割（<br>単位） ---- */
  $$('.hero h1, .page-hero h1, .service-hero h1, .section-title, .final-cta h2, .mid-cta-text h3').forEach(function (el) {
    var parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(function (p, i) {
      return '<span class="mo-line"><span class="mo-line-in" style="--i:' + i + '">' + p.trim() + '</span></span>';
    }).join('');
    el.classList.add('mo-split');
  });
  var heroH1 = document.querySelector('.hero h1');
  if (heroH1) heroH1.style.setProperty('--d', '.3s');

  /* ---- 下層ページの見出しエリア（ページ最上部なので読み込み時に再生） ---- */
  var subHeroH1 = $$('.page-hero h1, .service-hero h1');
  subHeroH1.forEach(function (h) {
    h.style.setProperty('--d', '.15s');
    requestAnimationFrame(function () { requestAnimationFrame(function () { h.classList.add('is-in'); }); });
  });

  /* ---- ヒーロー：文字ブロック／約束カードが見えたら再生（上のCM動画で押し下げられているため） ---- */
  var heroEl = document.querySelector('.hero');
  function playHeroText(el) {
    el.classList.add('is-play');
    if (heroEl) heroEl.classList.add('is-play');
    if (heroH1) heroH1.classList.add('is-in');
  }
  var heroParts = [[document.querySelector('.hero-text'), .6, playHeroText],
                   [document.querySelector('.hero-image'), .75, function (el) { el.classList.add('is-play'); }]];
  heroParts.forEach(function (part) {
    var el = part[0];
    if (!el) return;
    if (!('IntersectionObserver' in window)) { part[2](el); return; }
    var hio = new IntersectionObserver(function (es) {
      // 要素が画面より高い場合でも、画面の大半を占めていれば再生する
      var e = es[0], r = e.intersectionRect.height;
      if (e.intersectionRatio >= part[1] || r >= window.innerHeight * .5) { part[2](el); hio.disconnect(); }
    }, { threshold: [0, .15, .3, .45, .6, .75, 1] });
    hio.observe(el);
  });

  /* ---- 本文・補足は控えめに浮上、カード群は順番に ---- */
  $$('.section-desc, .problem-lead, .problem-bridge, .problem-count, .client-notes, .proof-voice, .results-note, ' +
     '.company-intro-content p, .company-intro-content .media-link, .recruit-teaser-content p, .final-cta p, .line-cta-area, ' +
     '.mid-cta-text p, .view-all-wrap')
    .forEach(function (el) { el.setAttribute('data-mo', 'up'); });
  $$('.service-cards, #top-case-container, #top-blog-container, #top-news-container, .recruit-points, .final-cta-buttons, .faq-list')
    .forEach(function (el) { el.setAttribute('data-mo', 'stagger'); });
  // 下層ページ：同じ部品が並ぶ箇所（課題・提供内容・手順・理由・カード一覧など）は親ごと順番に出す
  $$('.issue-item, .menu-item, .service-reason-item, .proc-step, .flow-item, .method-card, .product-item, ' +
     '.client-logo-item, .post-card, .support-service, .recruit-figure, .reason-card, .clients-stat, .target-item')
    .forEach(function (item) {
      var parent = item.parentElement;
      if (!parent || parent.hasAttribute('data-mo') || parent.closest('.reasons-section, [data-mo]')) return;
      parent.setAttribute('data-mo', 'stagger');
    });

  /* ---- 遅延（--i / --d）の割り振り ---- */
  $$('.stats-bar-item').forEach(setIndex);
  $$('.pm-stage').forEach(setIndex);
  $$('.pm-covrow').forEach(function (row, i) {
    $$('.pm-covlabel, .pm-covbar', row).forEach(function (el) { el.style.setProperty('--i', i); });
  });
  $$('.pm-covbar').forEach(function (bar) {
    bar.innerHTML = '<span class="mo-bartext">' + bar.innerHTML + '</span>';
  });
  $$('.reasons-section .reason-card').forEach(function (el, i) { el.style.setProperty('--d', (i % 2) * .12 + 's'); });
  $$('.kpi').forEach(function (el, i) { el.style.setProperty('--d', i * .15 + 's'); });

  /* ---- スクロールで1度だけ is-in を付ける ---- */
  var targets = $$('.mo-split, .section-label, [data-mo], .stats-bar, .process-map, .steps-row, ' +
                   '.reasons-section .reason-card, .kpi, .founder-figure, .mo-count')
    .filter(function (el) { return el !== heroH1 && subHeroH1.indexOf(el) === -1; });
  if (!('IntersectionObserver' in window)) {
    targets.forEach(reveal);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        reveal(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  function reveal(el) {
    if (el.getAttribute('data-mo') === 'stagger') {
      // 数が多い一覧で最後の要素が待たされすぎないよう、遅延は8個目で頭打ち
      Array.prototype.forEach.call(el.children, function (c, i) { c.style.setProperty('--i', Math.min(i, 8)); });
    }
    if (el.classList.contains('mo-count')) { countUp(el); return; }
    el.classList.add('is-in');
  }

  /* ---- 数字のカウントアップ（最短日数はカウントダウン） ---- */
  $$('.mo-count').forEach(function (el) {
    var len = Math.max(String(el.dataset.to).length, String(el.dataset.from || 0).length);
    el.style.display = 'inline-block';
    el.style.minWidth = len + 'ch';
    el.style.textAlign = 'right';
    el.textContent = el.dataset.from || '0';
  });
  function countUp(el) {
    var from = Number(el.dataset.from || 0), to = Number(el.dataset.to);
    var kpi = el.closest('.kpi');
    var delay = kpi ? parseFloat(kpi.style.getPropertyValue('--d')) * 1000 + 700 : 250;
    var item = el.closest('.stats-bar-item');
    if (item) delay = Number(item.style.getPropertyValue('--i')) * 100 + 250;
    var dur = 1600, start = null;
    setTimeout(function () {
      requestAnimationFrame(function step(t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(from + (to - from) * eased).toLocaleString('ja-JP');
        if (p < 1) requestAnimationFrame(step);
      });
    }, delay);
  }

  /* ---- ループ演出は画面内にあるときだけ動かす（省電力） ---- */
  if ('IntersectionObserver' in window) {
    var loopIo = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('is-vis', e.isIntersecting); });
    });
    $$('.mid-cta, .final-cta').forEach(function (el) { loopIo.observe(el); });
  } else {
    $$('.mid-cta, .final-cta').forEach(function (el) { el.classList.add('is-vis'); });
  }

  /* ---- スクロール進捗バー＋ヘッダーの状態 ---- */
  var bar = document.createElement('div');
  bar.className = 'mo-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var header = document.getElementById('site-header');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- FAQ：開く高さを中身に合わせる ---- */
  function measureFaq() {
    $$('.faq-answer').forEach(function (a) { a.style.setProperty('--h', a.scrollHeight + 40 + 'px'); });
  }
  measureFaq();
  window.addEventListener('resize', measureFaq);

  if (!canHover) return;

  /* ---- 以下はマウス操作の端末だけ ---- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var glow = document.createElement('div');
    glow.className = 'hero-glow';
    glow.setAttribute('aria-hidden', 'true');
    hero.insertBefore(glow, hero.firstChild);
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      hero.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
  }

  // 約束カードの傾き（登場アニメの終了後に有効化。アニメの transform がインラインより優先されるため）
  var proof = document.querySelector('.hero-proof');
  var proofArea = document.querySelector('.hero-image');
  if (proof && proofArea) {
    proof.addEventListener('animationend', function () {
      proof.style.animation = 'none';
      proof.classList.add('is-tilt');
    }, { once: true });
    proofArea.addEventListener('mousemove', function (e) {
      if (!proof.classList.contains('is-tilt')) return;
      var r = proof.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      proof.style.transform = 'rotateY(' + (x * 7).toFixed(2) + 'deg) rotateX(' + (-y * 7).toFixed(2) + 'deg)';
    });
    proofArea.addEventListener('mouseleave', function () { proof.style.transform = ''; });
  }

  // ヒーローCTAがマウスに少し吸い付く
  $$('.hero-cta .btn, .final-cta-buttons .btn').forEach(function (btn) {
    btn.classList.add('is-magnet');
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      btn.style.transform = 'translate(' + (x * .18).toFixed(1) + 'px,' + (y * .3).toFixed(1) + 'px)';
    });
    btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
  });

  // サービスカードの見出し面に光が追従
  $$('.service-card').forEach(function (card) {
    var head = card.querySelector('.service-card-header');
    if (!head) return;
    card.addEventListener('mousemove', function (e) {
      var r = head.getBoundingClientRect();
      head.style.setProperty('--cx', (e.clientX - r.left) + 'px');
      head.style.setProperty('--cy', (e.clientY - r.top) + 'px');
    });
  });

  function setIndex(el, i) { el.style.setProperty('--i', i); }
});

/* ---- 課題チェックリスト：自分で当てはまるものにチェック ---- */
function initProblemChecklist() {
  var list = document.querySelector('.problem-list');
  if (!list) return;
  var items = Array.prototype.slice.call(list.children);
  var total = items.length;
  list.classList.add('is-interactive');
  list.setAttribute('role', 'group');
  list.setAttribute('aria-label', '当てはまる課題を選ぶ');

  var counter = document.createElement('div');
  counter.className = 'problem-count';
  counter.setAttribute('aria-live', 'polite');
  counter.innerHTML = '<span class="problem-meter" aria-hidden="true"><i></i></span><span class="problem-count-text"></span>';
  list.parentNode.insertBefore(counter, list.nextSibling);
  var text = counter.querySelector('.problem-count-text');
  var meter = counter.querySelector('.problem-meter i');
  var bridge = document.querySelector('.problem-bridge');
  var verb = window.matchMedia && matchMedia('(hover: hover)').matches ? 'クリック' : 'タップ';

  function update() {
    var n = items.filter(function (li) { return li.classList.contains('is-checked'); }).length;
    meter.style.setProperty('--p', n / total);
    text.innerHTML = n === 0
      ? '当てはまるものを' + verb + 'してチェック'
      : '<b>' + n + '</b> / ' + total + ' 個 当てはまりました';
    if (bridge) bridge.classList.toggle('is-hot', n > 0);
  }
  items.forEach(function (li) {
    li.setAttribute('role', 'checkbox');
    li.setAttribute('aria-checked', 'false');
    li.tabIndex = 0;
    function toggle() {
      var on = li.classList.toggle('is-checked');
      li.setAttribute('aria-checked', on ? 'true' : 'false');
      update();
    }
    li.addEventListener('click', toggle);
    li.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    });
  });
  update();

  // 画面に入ったら、最初の1つを光らせて「押せる」ことを知らせる
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { list.classList.add('is-hint'); io.disconnect(); }
    }, { threshold: .5 });
    io.observe(list);
  }
}
