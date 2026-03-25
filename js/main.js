/* ============================================================
   Salesaurus Main JS
   共通ヘッダー・フッター・共通機能
   ============================================================ */

/* ---- サービスアイコンマップ ---- */
const SERVICE_ICON_MAP = {
  'apo-yoro':      '<i class="fas fa-phone-alt"></i>',
  'sales-pilot':   '<i class="fas fa-compass"></i>',
  'bpo-cso-rental':'<i class="fas fa-handshake"></i>',
  'support':       '<i class="fas fa-layer-group"></i>',
};
function getServiceIcon(id) {
  return SERVICE_ICON_MAP[id] || '<i class="fas fa-circle"></i>';
}

/* ---- ヘッダー生成 ---- */
function renderHeader() {
  const cfg = SITE_CONFIG;
  const currentPath = window.location.pathname;

  const navIconMap = {
    '/services/apo-yoro/':    '<i class="fas fa-phone-alt"></i>',
    '/services/sales-pilot/': '<i class="fas fa-compass"></i>',
    '/services/bpo-cso-rental/': '<i class="fas fa-handshake"></i>',
    '/services/support/':     '<i class="fas fa-layer-group"></i>',
  };

  const serviceLinks = cfg.nav.services.map(s => `
    <a href="${SITE_BASE}${s.url}">
      <span class="dd-icon">${navIconMap[s.url] || '<i class="fas fa-circle"></i>'}</span>
      <span>${s.name}<span class="dd-desc">${s.type}</span></span>
    </a>`).join('');

  const companyLinks = cfg.nav.company.map(c => `
    <a href="${SITE_BASE}${c.url}">${c.name}</a>`).join('');

  const html = `
  <header id="site-header">
    <div class="container">
      <div class="header-inner">
        <a href="${SITE_BASE}/" class="header-logo">
          <img src="${SITE_BASE}/images/logo.png" alt="Salesaurus" class="header-logo-img">
        </a>
        <nav class="header-nav">
          <div class="nav-item">
            <a href="${SITE_BASE}/services/" class="nav-link ${currentPath.startsWith('/services') ? 'active' : ''}">
              サービス <span class="nav-arrow">▼</span>
            </a>
            <div class="nav-dropdown">
              <div class="nav-dropdown-group">主力サービス</div>
              ${serviceLinks}
            </div>
          </div>
          <div class="nav-item">
            <a href="${SITE_BASE}/case/" class="nav-link ${currentPath.startsWith('/case') ? 'active' : ''}">導入事例</a>
          </div>
          <div class="nav-item">
            <a href="${SITE_BASE}/blog/" class="nav-link ${currentPath.startsWith('/blog') ? 'active' : ''}">ブログ</a>
          </div>
          <div class="nav-item">
            <a href="${SITE_BASE}/flow/" class="nav-link ${currentPath.startsWith('/flow') ? 'active' : ''}">導入の流れ</a>
          </div>
          <div class="nav-item">
            <a href="${SITE_BASE}/company/" class="nav-link ${currentPath.startsWith('/company') || currentPath.startsWith('/message') || currentPath.startsWith('/faq') ? 'active' : ''}">
              会社情報 <span class="nav-arrow">▼</span>
            </a>
            <div class="nav-dropdown">
              ${companyLinks}
            </div>
          </div>
          <div class="nav-item">
            <a href="${SITE_BASE}/recruit/" class="nav-link ${currentPath.startsWith('/recruit') ? 'active' : ''}">採用</a>
          </div>
        </nav>
        <div class="header-cta">
          <a href="${cfg.lineUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-line">LINE相談</a>
          <a href="${SITE_BASE}${cfg.contactFormUrl}" class="btn btn-sm btn-primary">お問い合わせ</a>
        </div>
        <button class="hamburger" id="hamburger" aria-label="メニュー">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-nav" id="mobile-nav">
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">サービス</div>
      ${cfg.nav.services.map(s => `<a href="${SITE_BASE}${s.url}">${navIconMap[s.url] || ''} ${s.name} ｜ ${s.type}</a>`).join('')}
    </div>
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">コンテンツ</div>
      <a href="${SITE_BASE}/clients/">取引実績</a>
      <a href="${SITE_BASE}/case/">導入事例</a>
      <a href="${SITE_BASE}/blog/">ブログ</a>
      <a href="${SITE_BASE}/news/">お知らせ</a>
      <a href="${SITE_BASE}/flow/">導入の流れ</a>
      <a href="${SITE_BASE}/faq/">よくある質問</a>
    </div>
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">会社情報</div>
      <a href="${SITE_BASE}/company/">会社概要</a>
      <a href="${SITE_BASE}/message/">代表メッセージ</a>
      <a href="${SITE_BASE}/recruit/">採用情報</a>
    </div>
    <div class="mobile-nav-cta">
      <a href="${cfg.lineUrl}" target="_blank" rel="noopener" class="btn btn-line btn-block"><i class="fab fa-line"></i> LINEで相談する</a>
      <a href="${SITE_BASE}${cfg.contactFormUrl}" class="btn btn-primary btn-block"><i class="fas fa-envelope"></i> お問い合わせ</a>
    </div>
  </div>`;

  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) placeholder.outerHTML = html;
}

/* ---- フッター生成 ---- */
function renderFooter() {
  const cfg = SITE_CONFIG;
  const html = `
  <footer id="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="${SITE_BASE}/images/logo.png" alt="Salesaurus" class="footer-logo-img">
          </div>
          <p class="footer-tagline">${cfg.tagline}<br>営業代行・営業コンサル・BPOで<br>御社の営業成果を最大化します。</p>
          <div class="footer-contact-info">
            <div><i class="fas fa-map-marker-alt"></i> ${cfg.address}</div>
            <div><i class="fas fa-envelope"></i> ${cfg.email}</div>
          </div>
          <div style="margin-top:20px;display:flex;gap:10px;">
            <a href="${cfg.lineUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-line"><i class="fab fa-line"></i> LINE相談</a>
            <a href="${SITE_BASE}${cfg.contactFormUrl}" class="btn btn-sm btn-outline-white">お問い合わせ</a>
          </div>
        </div>
        <div class="footer-nav-grid">
          <div class="footer-nav-col">
            <h4>サービス</h4>
            ${cfg.services.map(s => `<a href="${SITE_BASE}${s.url}">${s.name}｜${s.type}</a>`).join('')}
            <a href="${SITE_BASE}/services/support/">補完サービス</a>
            <a href="${SITE_BASE}/flow/">導入の流れ</a>
          </div>
          <div class="footer-nav-col">
            <h4>コンテンツ</h4>
            <a href="${SITE_BASE}/clients/">取引実績</a>
            <a href="${SITE_BASE}/case/">導入事例</a>
            <a href="${SITE_BASE}/blog/">ブログ</a>
            <a href="${SITE_BASE}/news/">お知らせ</a>
            <a href="${SITE_BASE}/faq/">よくある質問</a>
          </div>
          <div class="footer-nav-col">
            <h4>会社情報</h4>
            <a href="${SITE_BASE}/company/">会社概要</a>
            <a href="${SITE_BASE}/message/">代表メッセージ</a>
            <a href="${SITE_BASE}/recruit/">採用情報</a>
            <a href="${SITE_BASE}/contact/">お問い合わせ</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>${cfg.copyright}</div>
        <div class="footer-bottom-links">
          <a href="${SITE_BASE}/privacy-policy/">プライバシーポリシー</a>
        </div>
      </div>
    </div>
  </footer>`;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) placeholder.outerHTML = html;
}

/* ---- パンくず生成 ---- */
function renderBreadcrumb(items) {
  // items: [{label:'', url:''}, ...]
  const breadcrumbItems = [{ label: 'ホーム', url: `${SITE_BASE}/` }, ...items];
  const html = `
  <div class="breadcrumb-wrap">
    <div class="container">
      <nav class="breadcrumb" aria-label="パンくず">
        ${breadcrumbItems.map((item, i) => {
          if (i === breadcrumbItems.length - 1) {
            return `<span>${item.label}</span>`;
          }
          return `<a href="${item.url}">${item.label}</a><span class="breadcrumb-sep">›</span>`;
        }).join('')}
      </nav>
    </div>
  </div>`;
  const placeholder = document.getElementById('breadcrumb-placeholder');
  if (placeholder) placeholder.outerHTML = html;
}

/* ---- ハンバーガーメニュー ---- */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
  // 外側クリックで閉じる
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- FAQ アコーディオン ---- */
function initFaq() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      item.classList.toggle('open');
    });
  });
}

/* ---- カテゴリフィルター ---- */
function initCategoryFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('[data-cat-item]').forEach(item => {
        if (cat === 'all' || item.dataset.catItem === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ---- 日付フォーマット ---- */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
}

/* ---- サービスバッジHTML生成 ---- */
function serviceToHtml(serviceId) {
  const s = SITE_CONFIG.services.find(sv => sv.id === serviceId);
  if (!s) return '';
  return `<span class="badge ${s.badgeClass}">${s.name}</span>`;
}

/* ---- お問い合わせCTAブロック ---- */
function renderContactCTA(ctaText = 'まずはお気軽にご相談ください') {
  return `
  <div class="detail-cta">
    <h3>${ctaText}</h3>
    <p>初回相談は無料です。現状の課題を整理するところからお手伝いします。</p>
    <div class="detail-cta-buttons">
      <a href="${SITE_BASE}/contact/" class="btn btn-primary btn-lg"><i class="fas fa-envelope"></i> お問い合わせ</a>
      <a href="${SITE_CONFIG.lineUrl}" target="_blank" rel="noopener" class="btn btn-line btn-lg"><i class="fab fa-line"></i> LINEで相談する</a>
    </div>
  </div>`;
}

/* ---- セールス航海士LP CTAブロック ---- */
function renderSalesPilotCTA(ctaText = 'まずはお気軽にご相談ください') {
  return `
  <div class="detail-cta">
    <h3>${ctaText}</h3>
    <p>初回相談は無料です。営業設計の課題を一緒に整理しましょう。</p>
    <div class="detail-cta-buttons">
      <a href="${SITE_BASE}/lp/sales-pilot/" class="btn btn-primary btn-lg"><i class="fas fa-ship"></i> セールス航海士について詳しく見る</a>
      <a href="${SITE_CONFIG.lineUrl}" target="_blank" rel="noopener" class="btn btn-line btn-lg"><i class="fab fa-line"></i> LINEで相談する</a>
    </div>
  </div>`;
}

/* ---- 関連サービスサイドバー ---- */
function renderServiceSidebar() {
  const links = SITE_CONFIG.services.map(s => `
    <a href="${SITE_BASE}${s.url}" class="sidebar-service-link">
      <span class="sidebar-service-icon">${getServiceIcon(s.id)}</span>
      <span>
        <span class="sidebar-service-name">${s.name}</span>
        <span class="sidebar-service-type">${s.type}</span>
      </span>
    </a>`).join('');
  return `
  <div class="sidebar-card">
    <div class="sidebar-card-title">サービス一覧</div>
    ${links}
  </div>
  <div class="sidebar-card">
    <div class="sidebar-card-title">お問い合わせ</div>
    <p style="font-size:13px;color:#666;margin-bottom:16px;">無料相談・資料請求はこちらから</p>
    <a href="${SITE_BASE}/contact/" class="btn btn-primary btn-block" style="margin-bottom:10px;">お問い合わせ</a>
    <a href="${SITE_CONFIG.lineUrl}" target="_blank" rel="noopener" class="btn btn-line btn-block"><i class="fab fa-line"></i> LINEで相談</a>
  </div>`;
}

/* ---- 初期化 ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initHamburger();
  initFaq();
  initCategoryFilter();
});
