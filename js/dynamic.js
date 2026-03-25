/* ============================================================
   Dynamic Page Renderer
   ブログ・事例・お知らせ・採用の一覧・詳細ページを動的生成
   ============================================================ */

/* ---- URLパラメータ取得 ---- */
function getParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/* ============================================================
   ブログ一覧ページ
   ============================================================ */
function renderBlogList() {
  const container = document.getElementById('blog-list-container');
  if (!container) return;

  const posts = BLOG_POSTS.filter(p => p.status === 'published');

  // カテゴリフィルターボタン
  const filterWrap = document.getElementById('blog-filter');
  if (filterWrap) {
    filterWrap.innerHTML = `
      <button class="filter-btn active" data-cat="all">すべて</button>
      ${BLOG_CATEGORIES.map(c => `<button class="filter-btn" data-cat="${c}">${c}</button>`).join('')}`;
    filterWrap.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        document.querySelectorAll('.post-card-wrap').forEach(item => {
          item.style.display = (cat === 'all' || item.dataset.catItem === cat) ? '' : 'none';
        });
      });
    });
  }

  if (posts.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-file-alt"></i></div><p>まだ記事がありません。</p></div>';
    return;
  }

  container.innerHTML = posts.map(post => {
    const isExternal = !!post.externalUrl;
    const href = isExternal ? post.externalUrl : `${SITE_BASE}/blog/detail/?slug=${post.slug}`;
    const targetAttr = isExternal ? 'target="_blank" rel="noopener"' : '';
    const externalBadge = isExternal ? '<span class="badge-external">note</span>' : '';
    return `
    <div class="post-card-wrap" data-cat-item="${post.category}">
      <a href="${href}" ${targetAttr} class="post-card">
        <div class="post-card-thumb">
          ${post.eyecatch ? `<img src="${post.eyecatch}" alt="${post.title}" loading="lazy">` : `<span class="thumb-icon">${post.eyecatchEmoji || '<i class="fas fa-file-alt"></i>'}</span>`}
          ${externalBadge}
        </div>
        <div class="post-card-body">
          <div class="post-card-meta">
            <span class="post-card-date">${formatDate(post.date)}</span>
            <span class="post-card-cat">${post.category}</span>
            ${isExternal ? '<span class="external-link-icon"><i class="fas fa-external-link-alt"></i></span>' : ''}
          </div>
          <div class="post-card-title">${post.title}</div>
          <div class="post-card-excerpt">${post.excerpt || ''}</div>
        </div>
        ${post.relatedService ? `<div class="post-card-footer"><div class="post-card-service">→ ${SITE_CONFIG.services.find(s=>s.id===post.relatedService)?.displayName || ''}</div></div>` : ''}
      </a>
    </div>`;
  }).join('');
}

/* ============================================================
   ブログ詳細ページ
   ============================================================ */
function renderBlogDetail() {
  const container = document.getElementById('blog-detail-container');
  if (!container) return;

  const slug = getParam('slug');
  const post = BLOG_POSTS.find(p => p.slug === slug && p.status === 'published');

  if (!post) {
    container.innerHTML = `<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-frown"></i></div><p>記事が見つかりませんでした。</p><a href="${SITE_BASE}/blog/" class="btn btn-primary" style="margin-top:20px">ブログ一覧へ</a></div>`;
    return;
  }

  // ページタイトル・メタ更新
  document.title = (post.seoTitle || post.title) + ' | 株式会社Salesaurus';
  document.querySelector('meta[name="description"]')?.setAttribute('content', post.metaDescription || '');

  // パンくず
  renderBreadcrumb([
    { label: 'ブログ', url: `${SITE_BASE}/blog/` },
    { label: post.title }
  ]);

  // 関連サービス
  const relService = post.relatedService ? SITE_CONFIG.services.find(s => s.id === post.relatedService) : null;

  container.innerHTML = `
  <section class="section">
    <div class="container">
      <div class="detail-layout">
        <main class="detail-main">
          <div class="detail-header">
            <div class="detail-meta">
              <span class="detail-date">${formatDate(post.date)}</span>
              <span class="badge badge-primary">${post.category}</span>
              ${relService ? `<span class="badge ${relService.badgeClass}">${relService.name}</span>` : ''}
            </div>
            <h1 class="detail-title">${post.title}</h1>
            ${post.lead ? `<div class="detail-lead">${post.lead}</div>` : ''}
          </div>
          ${post.eyecatch
            ? `<img src="${post.eyecatch}" alt="${post.title}" class="detail-thumb" loading="lazy">`
            : `<div class="detail-thumb-placeholder">${post.eyecatchEmoji || '<i class="fas fa-file-alt"></i>'}</div>`}
          <div class="detail-content">
            ${post.content}
          </div>
          ${post.relatedService === 'sales-pilot' ? renderSalesPilotCTA(post.ctaText || 'まずはお気軽にご相談ください') : renderContactCTA(post.ctaText || 'まずはお気軽にご相談ください')}
        </main>
        <aside class="detail-sidebar">
          ${renderServiceSidebar()}
          <div class="sidebar-card">
            <div class="sidebar-card-title">カテゴリ</div>
            ${BLOG_CATEGORIES.map(c => `<a href="${SITE_BASE}/blog/?cat=${encodeURIComponent(c)}" style="display:block;padding:8px;font-size:13px;color:var(--color-text-mid);border-bottom:1px solid var(--color-border-light);">${c}</a>`).join('')}
          </div>
        </aside>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   事例一覧ページ
   ============================================================ */
function renderCaseList() {
  const container = document.getElementById('case-list-container');
  if (!container) return;

  const cases = CASE_STUDIES.filter(c => c.status === 'published');

  // フィルターボタン
  const filterWrap = document.getElementById('case-filter');
  if (filterWrap) {
    filterWrap.innerHTML = `
      <button class="filter-btn active" data-cat="all">すべて</button>
      ${SITE_CONFIG.services.map(s => `<button class="filter-btn" data-cat="${s.id}">${s.name}</button>`).join('')}`;
    filterWrap.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        document.querySelectorAll('.case-card-wrap').forEach(item => {
          item.style.display = (cat === 'all' || item.dataset.serviceItem === cat) ? '' : 'none';
        });
      });
    });
  }

  if (cases.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-clipboard-list"></i></div><p>まだ事例がありません。</p></div>';
    return;
  }

  container.innerHTML = cases.map(c => {
    const service = SITE_CONFIG.services.find(s => s.id === c.service);
    return `
    <div class="case-card-wrap" data-service-item="${c.service}">
      <a href="${SITE_BASE}/case/detail/?slug=${c.slug}" class="post-card">
        <div class="post-card-thumb">
          ${c.eyecatch ? `<img src="${c.eyecatch}" alt="${c.title}" loading="lazy">` : `<span class="thumb-icon">${c.eyecatchEmoji || '<i class="fas fa-clipboard-list"></i>'}</span>`}
        </div>
        <div class="post-card-body">
          <div class="post-card-meta">
            <span class="badge ${service?.badgeClass || 'badge-primary'}">${service?.name || ''}</span>
            <span class="badge badge-outline">${c.issueCategory}</span>
          </div>
          <div class="post-card-title">${c.title}</div>
          <div class="post-card-excerpt" style="margin-bottom:0">${c.clientType}｜${c.industry}</div>
        </div>
        <div class="post-card-footer">
          <div class="post-card-service" style="font-size:14px;font-weight:700;"><i class="fas fa-chart-bar"></i> ${c.resultSummary}</div>
        </div>
      </a>
    </div>`;
  }).join('');
}

/* ============================================================
   事例詳細ページ
   ============================================================ */
function renderCaseDetail() {
  const container = document.getElementById('case-detail-container');
  if (!container) return;

  const slug = getParam('slug');
  const cs = CASE_STUDIES.find(c => c.slug === slug && c.status === 'published');

  if (!cs) {
    container.innerHTML = `<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-frown"></i></div><p>事例が見つかりませんでした。</p><a href="${SITE_BASE}/case/" class="btn btn-primary" style="margin-top:20px">事例一覧へ</a></div>`;
    return;
  }

  document.title = (cs.seoTitle || cs.title) + ' | 株式会社Salesaurus';
  document.querySelector('meta[name="description"]')?.setAttribute('content', cs.metaDescription || '');

  renderBreadcrumb([
    { label: '導入事例', url: `${SITE_BASE}/case/` },
    { label: cs.title }
  ]);

  const service = SITE_CONFIG.services.find(s => s.id === cs.service);

  const sectionStyle = `background:var(--color-bg-light);border-radius:4px;padding:28px;margin-bottom:24px;`;

  container.innerHTML = `
  <section class="section">
    <div class="container">
      <div class="detail-layout">
        <main class="detail-main">
          <div class="detail-header">
            <div class="detail-meta">
              <span class="badge ${service?.badgeClass || 'badge-primary'}">${service?.name || ''}</span>
              <span class="badge badge-outline">${cs.issueCategory}</span>
              <span class="detail-date">${cs.clientType}｜${cs.industry}</span>
            </div>
            <h1 class="detail-title">${cs.title}</h1>
            ${cs.lead ? `<div class="detail-lead">${cs.lead}</div>` : ''}
          </div>
          <div style="${sectionStyle}">
            <h2 style="font-size:20px;font-weight:700;color:var(--color-primary);margin-bottom:16px;"><i class="fas fa-thumbtack" style="color:var(--color-accent);margin-right:8px;"></i>成果サマリー</h2>
            <div style="font-size:22px;font-weight:700;color:var(--color-accent);">${cs.resultSummary}</div>
          </div>
          <div style="${sectionStyle}">
            <h2 style="font-size:18px;font-weight:700;color:var(--color-primary);margin-bottom:12px;">背景</h2>
            <p style="font-size:14px;color:#666;line-height:1.9;">${cs.background}</p>
          </div>
          <div style="${sectionStyle}">
            <h2 style="font-size:18px;font-weight:700;color:var(--color-primary);margin-bottom:12px;">課題</h2>
            <div style="font-size:14px;color:#666;line-height:1.9;white-space:pre-line;">${cs.challenge}</div>
          </div>
          <div style="${sectionStyle}">
            <h2 style="font-size:18px;font-weight:700;color:var(--color-primary);margin-bottom:12px;">支援内容</h2>
            <p style="font-size:14px;color:#666;line-height:1.9;">${cs.supportContent}</p>
          </div>
          <div style="${sectionStyle}">
            <h2 style="font-size:18px;font-weight:700;color:var(--color-primary);margin-bottom:12px;">実施施策</h2>
            <div style="font-size:14px;color:#666;line-height:1.9;white-space:pre-line;">${cs.activities}</div>
          </div>
          <div style="background:var(--color-primary);border-radius:4px;padding:28px;margin-bottom:24px;color:#fff;">
            <h2 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-chart-bar" style="color:var(--color-accent);margin-right:8px;"></i>成果</h2>
            <div style="font-size:14px;line-height:1.9;opacity:.9;white-space:pre-line;">${cs.results}</div>
          </div>
          ${cs.managerComment ? `
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:28px;margin-bottom:24px;">
            <h2 style="font-size:16px;font-weight:700;color:var(--color-primary);margin-bottom:14px;"><i class="fas fa-comment-alt" style="color:var(--color-accent);margin-right:8px;"></i>担当者コメント</h2>
            <p style="font-size:14px;color:#666;line-height:1.9;font-style:italic;">${cs.managerComment}</p>
          </div>` : ''}
          ${renderContactCTA(cs.ctaText || 'この事例と同じ課題でお悩みではありませんか？')}
        </main>
        <aside class="detail-sidebar">
          ${renderServiceSidebar()}
          <div class="sidebar-card">
            <div class="sidebar-card-title">事例情報</div>
            <div style="font-size:13px;color:#666;">
              <div style="padding:8px 0;border-bottom:1px solid #eef1f6;"><strong>対応サービス：</strong>${cs.serviceDisplay}</div>
              <div style="padding:8px 0;border-bottom:1px solid #eef1f6;"><strong>クライアント：</strong>${cs.clientType}</div>
              <div style="padding:8px 0;border-bottom:1px solid #eef1f6;"><strong>業界：</strong>${cs.industry}</div>
              <div style="padding:8px 0;"><strong>課題：</strong>${cs.issueCategory}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   お知らせ一覧ページ
   ============================================================ */
function renderNewsList() {
  const container = document.getElementById('news-list-container');
  if (!container) return;

  const items = NEWS_ITEMS.filter(n => n.status === 'published');

  if (items.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-newspaper"></i></div><p>まだお知らせがありません。</p></div>';
    return;
  }

  container.innerHTML = `
  <div class="news-list" style="max-width:800px;margin:0 auto;">
    ${items.map(n => `
    <div>
      <a href="${SITE_BASE}/news/detail/?slug=${n.slug}" style="display:block;text-decoration:none;color:inherit;">
        <div class="news-item" style="cursor:pointer;">
          <span class="news-date">${formatDate(n.date)}</span>
          <span class="news-cat"><span class="badge badge-outline">${n.type}</span></span>
          <span class="news-title">${n.title}</span>
        </div>
      </a>
    </div>`).join('')}
  </div>`;
}

/* ============================================================
   お知らせ詳細ページ
   ============================================================ */
function renderNewsDetail() {
  const container = document.getElementById('news-detail-container');
  if (!container) return;

  const slug = getParam('slug');
  const item = NEWS_ITEMS.find(n => n.slug === slug && n.status === 'published');

  if (!item) {
    container.innerHTML = `<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-frown"></i></div><p>お知らせが見つかりませんでした。</p><a href="${SITE_BASE}/news/" class="btn btn-primary" style="margin-top:20px">一覧へ戻る</a></div>`;
    return;
  }

  document.title = item.title + ' | 株式会社Salesaurus';
  renderBreadcrumb([
    { label: 'お知らせ', url: `${SITE_BASE}/news/` },
    { label: item.title }
  ]);

  container.innerHTML = `
  <section class="section">
    <div class="container" style="max-width:800px;">
      <div class="detail-header">
        <div class="detail-meta">
          <span class="detail-date">${formatDate(item.date)}</span>
          <span class="badge badge-outline">${item.type}</span>
        </div>
        <h1 class="detail-title">${item.title}</h1>
      </div>
      <div class="detail-content">
        ${item.content}
        ${item.link ? `<div style="margin-top:20px;"><a href="${item.link}" class="btn btn-primary">詳しくはこちら</a></div>` : ''}
      </div>
      <div style="margin-top:48px;padding-top:32px;border-top:1px solid var(--color-border);text-align:center;">
        <a href="${SITE_BASE}/news/" class="btn btn-secondary">← お知らせ一覧へ戻る</a>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   採用詳細ページ
   ============================================================ */
function renderJobDetail() {
  const container = document.getElementById('job-detail-container');
  if (!container) return;

  const slug = getParam('slug');
  const job = JOB_LISTINGS.find(j => j.slug === slug && j.status === 'published');

  if (!job) {
    container.innerHTML = `<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-frown"></i></div><p>求人が見つかりませんでした。</p><a href="${SITE_BASE}/recruit/" class="btn btn-primary" style="margin-top:20px">採用情報へ</a></div>`;
    return;
  }

  document.title = job.title + 'の募集要項 | 株式会社Salesaurus';
  renderBreadcrumb([
    { label: '採用情報', url: `${SITE_BASE}/recruit/` },
    { label: job.title }
  ]);

  container.innerHTML = `
  <section class="section">
    <div class="container">
      <div class="detail-layout">
        <main class="detail-main">
          <div class="detail-header">
            <div class="detail-meta">
              <span class="badge badge-accent">${job.type}</span>
            </div>
            <h1 class="detail-title">${job.title}</h1>
            <div class="tag-list" style="margin-bottom:24px;">
              ${job.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="detail-content">${job.content}</div>
          <div class="detail-cta" style="margin-top:48px;">
            <h3>この求人に応募する</h3>
            <p>まずはお気軽にお問い合わせください。カジュアル面談も歓迎しています。</p>
            <div class="detail-cta-buttons">
              <a href="${SITE_BASE}/contact/?type=recruit&job=${job.slug}" class="btn btn-primary btn-lg"><i class="fas fa-envelope"></i> 応募する</a>
              <a href="${SITE_CONFIG.lineUrl}" target="_blank" rel="noopener" class="btn btn-line btn-lg"><i class="fab fa-line"></i> LINEで質問する</a>
            </div>
          </div>
        </main>
        <aside class="detail-sidebar">
          <div class="sidebar-card">
            <div class="sidebar-card-title">募集要項</div>
            <div style="font-size:13px;">
              <div style="padding:10px 0;border-bottom:1px solid #eef1f6;"><strong>職種：</strong>${job.title}</div>
              <div style="padding:10px 0;border-bottom:1px solid #eef1f6;"><strong>雇用形態：</strong>${job.type}</div>
              <div style="padding:10px 0;"><strong>募集タグ：</strong>${job.tags.join('・')}</div>
            </div>
          </div>
          <div class="sidebar-card">
            <div class="sidebar-card-title">採用に関するお問い合わせ</div>
            <p style="font-size:13px;color:#666;margin-bottom:16px;">ご不明点はお気軽にどうぞ</p>
            <a href="${SITE_BASE}/contact/?type=recruit" class="btn btn-primary btn-block" style="margin-bottom:10px;"><i class="fas fa-envelope"></i> 問い合わせる</a>
            <a href="${SITE_CONFIG.lineUrl}" target="_blank" rel="noopener" class="btn btn-line btn-block"><i class="fab fa-line"></i> LINEで聞く</a>
          </div>
        </aside>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   トップページ用：最新ブログ・事例・お知らせ
   ============================================================ */
function renderTopBlog() {
  const container = document.getElementById('top-blog-container');
  if (!container) return;
  const posts = BLOG_POSTS.filter(p => p.status === 'published').slice(0, 3);
  container.innerHTML = posts.map(post => {
    const isExternal = !!post.externalUrl;
    const href = isExternal ? post.externalUrl : `${SITE_BASE}/blog/detail/?slug=${post.slug}`;
    const targetAttr = isExternal ? 'target="_blank" rel="noopener"' : '';
    return `
    <a href="${href}" ${targetAttr} class="blog-teaser-card">
      <div class="blog-teaser-thumb">${post.eyecatchEmoji || '<i class="fas fa-file-alt"></i>'}${isExternal ? '<span class="teaser-external-badge">note</span>' : ''}</div>
      <div class="blog-teaser-body">
        <div class="blog-teaser-meta">
          <span class="blog-teaser-cat">${post.category}</span>
          <span>${formatDate(post.date)}</span>
          ${isExternal ? '<span style="font-size:10px;color:var(--color-accent);"><i class="fas fa-external-link-alt"></i></span>' : ''}
        </div>
        <div class="blog-teaser-title">${post.title}</div>
        <div class="blog-teaser-excerpt">${post.excerpt || ''}</div>
      </div>
    </a>`;
  }).join('');
}

function renderTopCase() {
  const container = document.getElementById('top-case-container');
  if (!container) return;
  const cases = CASE_STUDIES.filter(c => c.status === 'published').slice(0, 3);
  container.innerHTML = cases.map(c => {
    const service = SITE_CONFIG.services.find(s => s.id === c.service);
    return `
    <a href="${SITE_BASE}/case/detail/?slug=${c.slug}" class="case-teaser-card">
      <div class="case-teaser-thumb">${c.eyecatch ? `<img src="${c.eyecatch}" alt="${c.title}" style="width:100%;height:100%;object-fit:cover;">` : (c.eyecatchEmoji || '<i class="fas fa-clipboard-list"></i>')}</div>
      <div class="case-teaser-body">
        <div class="case-teaser-meta">
          <span class="badge ${service?.badgeClass || 'badge-primary'}">${service?.name || ''}</span>
          <span class="badge badge-outline">${c.issueCategory}</span>
        </div>
        <div class="case-teaser-title">${c.title}</div>
        <div class="case-teaser-result"><i class="fas fa-chart-bar"></i> ${c.resultSummary}</div>
      </div>
    </a>`;
  }).join('');
}

function renderTopNews() {
  const container = document.getElementById('top-news-container');
  if (!container) return;
  const items = NEWS_ITEMS.filter(n => n.status === 'published').slice(0, 5);
  container.innerHTML = items.map(n => `
    <a href="${SITE_BASE}/news/detail/?slug=${n.slug}" style="display:block;text-decoration:none;color:inherit;">
      <div class="news-item">
        <span class="news-date">${formatDate(n.date)}</span>
        <span class="news-cat"><span class="badge badge-outline">${n.type}</span></span>
        <span class="news-title">${n.title}</span>
      </div>
    </a>`).join('');
}

/* ---- 初期化 ---- */
document.addEventListener('DOMContentLoaded', () => {
  // トップページ
  renderTopBlog();
  renderTopCase();
  renderTopNews();

  // ブログ
  renderBlogList();
  renderBlogDetail();

  // 事例
  renderCaseList();
  renderCaseDetail();

  // お知らせ
  renderNewsList();
  renderNewsDetail();

  // 採用
  renderJobDetail();
  renderRecruitList();
});

function renderRecruitList() {
  const container = document.getElementById('jobs-container');
  if (!container) return;
  const jobs = JOB_LISTINGS.filter(j => j.status === 'published');
  if (jobs.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-briefcase"></i></div><p>現在募集中のポジションはありません。</p></div>';
    return;
  }
  container.innerHTML = `<div class="jobs-grid">
    ${jobs.map(job => `
    <a href="${SITE_BASE}/recruit/detail/?slug=${job.slug}" class="job-card">
      <div class="job-type">${job.type}</div>
      <div class="job-title">${job.title}</div>
      <div class="job-tags">${job.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}</div>
      <div class="job-desc">${job.shortDesc}</div>
    </a>`).join('')}
  </div>`;
}
