/* ============================================================
   ブログSEOビルド：記事ごとの静的HTML + sitemap.xml + robots.txt を生成
   ------------------------------------------------------------
   目的：/blog/detail/?slug= の1シェル(JS描画)では検索/LLMに載らないため、
        記事を個別URL /blog/{slug}/ の静的HTMLに焼き込む。
        本文・meta・OGP・JSON-LD(Article/Breadcrumb/FAQ)をHTMLに含める。
   使い方： node tools/build_blog.mjs
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const ORIGIN = 'https://sales-saurus.com';
const SVC_ICON = { 'apo-yoro': 'fa-phone-alt', 'sales-pilot': 'fa-compass', 'bpo-cso-rental': 'fa-handshake', 'support': 'fa-layer-group' };
// eyecatchは実在する画像だけ採用（存在しないパスの壊れ画像を防ぐ）
const hasImg = p => !!p && existsSync(ROOT + p.replace(/^\//, ''));

/* ---- data 読み込み（config.js / blogs.js を評価） ---- */
const ctx = { window: {}, document: { querySelector: () => null }, Date };
vm.createContext(ctx);
vm.runInContext(readFileSync(ROOT + 'data/config.js', 'utf8'), ctx);
vm.runInContext(readFileSync(ROOT + 'data/blogs.js', 'utf8'), ctx);
vm.runInContext('this.__CFG = SITE_CONFIG; this.__POSTS = BLOG_POSTS; this.__CATS = typeof BLOG_CATEGORIES!=="undefined"?BLOG_CATEGORIES:[];', ctx);
const CFG = ctx.__CFG, POSTS = ctx.__POSTS, CATS = ctx.__CATS;

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const abs = p => !p ? '' : (p.startsWith('http') ? p : ORIGIN + '/' + p.replace(/^\//, ''));
const fmtDate = d => { const t = new Date(d); return `${t.getFullYear()}年${t.getMonth() + 1}月${t.getDate()}日`; };

/* ---- FAQ抽出（<h3>Q. …</h3><p>A. …</p> パターン） → FAQPage schema ---- */
function extractFaq(html) {
  const re = /<h3>\s*Q[0-9]*[\.．。:：]?\s*(.*?)<\/h3>\s*<p>\s*A[0-9]*[\.．。:：]?\s*(.*?)<\/p>/gis;
  const out = []; let m;
  while ((m = re.exec(html)) !== null) {
    const q = stripTags(m[1]), a = stripTags(m[2]);
    if (q && a) out.push({ q, a });
  }
  return out;
}

/* ---- サービスサイドバー（静的） ---- */
function sidebar(relService) {
  const svc = (CFG.services || []).map(s =>
    `<a href="${s.url}" class="sidebar-service-link"><span class="sidebar-service-icon"><i class="fas ${SVC_ICON[s.id] || 'fa-circle'}"></i></span><span><span class="sidebar-service-name">${esc(s.name)}</span><span class="sidebar-service-type">${esc(s.type)}</span></span></a>`).join('');
  const cats = CATS.map(c => `<a href="/blog/?cat=${encodeURIComponent(c)}" style="display:block;padding:8px;font-size:13px;color:var(--color-text-mid);border-bottom:1px solid var(--color-border-light);">${esc(c)}</a>`).join('');
  return `<aside class="detail-sidebar">
    <div class="sidebar-card"><div class="sidebar-card-title">サービス一覧</div>${svc}</div>
    <div class="sidebar-card"><div class="sidebar-card-title">お問い合わせ</div><p style="font-size:13px;color:#666;margin-bottom:16px;">無料相談・資料請求はこちらから</p><a href="/contact/" class="btn btn-primary btn-block" style="margin-bottom:10px;">お問い合わせ</a><a data-line="corporate" class="btn btn-line btn-block"><i class="fab fa-line"></i> LINEで相談</a></div>
    <div class="sidebar-card"><div class="sidebar-card-title">カテゴリ</div>${cats}</div>
  </aside>`;
}

/* ---- CTA（静的） ---- */
function cta(post) {
  const t = esc(post.ctaText || 'まずはお気軽にご相談ください');
  return `<div class="detail-cta"><h3>${t}</h3><p>初回相談は無料です。現状の課題を整理するところからお手伝いします。</p><div class="detail-cta-buttons"><a href="/contact/" class="btn btn-primary btn-lg"><i class="fas fa-envelope"></i> お問い合わせ</a><a data-line="corporate" class="btn btn-line btn-lg"><i class="fab fa-line"></i> LINEで相談する</a></div></div>`;
}

/* ---- 1記事のHTML ---- */
function pageHtml(post) {
  const url = `${ORIGIN}/blog/${post.slug}/`;
  const rawTitle = (post.seoTitle || post.title).replace(/\s*[|｜]\s*(株式会社)?Salesaurus\s*$/i, '');
  const title = rawTitle + ' | 株式会社Salesaurus';
  const desc = post.metaDescription || post.excerpt || post.lead || CFG.description || '';
  const eyecatchOk = hasImg(post.eyecatch);
  const img = (eyecatchOk ? abs(post.eyecatch) : '') || `${ORIGIN}/images/logo.png`;
  const relService = post.relatedService ? (CFG.services || []).find(s => s.id === post.relatedService) : null;

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: post.title, description: stripTags(desc),
      image: [img], datePublished: post.date, dateModified: post.date,
      author: { '@type': 'Organization', name: '株式会社Salesaurus', url: ORIGIN + '/' },
      publisher: { '@type': 'Organization', name: '株式会社Salesaurus', logo: { '@type': 'ImageObject', url: ORIGIN + '/images/logo.png' } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      articleSection: post.category || undefined,
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: ORIGIN + '/' },
        { '@type': 'ListItem', position: 2, name: 'ブログ', item: ORIGIN + '/blog/' },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];
  const faq = extractFaq(post.content || '');
  if (faq.length >= 2) ld.push({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  });

  const eyecatchHtml = eyecatchOk
    ? `<img src="/${post.eyecatch}" alt="${esc(post.title)}" class="detail-thumb" loading="lazy" width="800" height="420">`
    : `<div class="detail-thumb-placeholder"><i class="fas fa-file-alt"></i></div>`;

  return `<!DOCTYPE html>
<html lang="ja">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-MQVRG5NZHJ"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MQVRG5NZHJ');</script>
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<base href="/">
<title>${esc(title)}</title>
<meta name="description" content="${esc(stripTags(desc)).slice(0, 160)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(rawTitle)}">
<meta property="og:description" content="${esc(stripTags(desc)).slice(0, 160)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:site_name" content="株式会社Salesaurus">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link rel="stylesheet" href="/css/style.css">
</head>
<body>
<div id="header-placeholder"></div>
<div class="breadcrumb-wrap"><div class="container"><nav class="breadcrumb" aria-label="パンくず"><a href="/">ホーム</a><span class="breadcrumb-sep">›</span><a href="/blog/">ブログ</a><span class="breadcrumb-sep">›</span><span>${esc(post.title)}</span></nav></div></div>
<main>
<section class="section"><div class="container"><div class="detail-layout">
<article class="detail-main">
<div class="detail-header">
<div class="detail-meta"><span class="detail-date">${fmtDate(post.date)}</span><span class="badge badge-primary">${esc(post.category || '')}</span>${relService ? `<span class="badge ${relService.badgeClass}">${esc(relService.name)}</span>` : ''}</div>
<h1 class="detail-title">${esc(post.title)}</h1>
${post.lead ? `<div class="detail-lead">${post.lead}</div>` : ''}
</div>
${eyecatchHtml}
<div class="detail-content">${post.content || ''}</div>
${cta(post)}
</article>
${sidebar(relService)}
</div></div></section>
</main>
<div id="footer-placeholder"></div>
<script src="/data/config.js"></script>
<script src="/data/blogs-index.js"></script>
<script src="/data/cases.js"></script>
<script src="/data/news.js"></script>
<script src="/data/jobs.js"></script>
<script src="/js/main.js"></script>
<script src="/js/dynamic.js"></script>
</body>
</html>`;
}

/* ---- 生成 ---- */
const published = POSTS.filter(p => p.status === 'published');
const internal = published.filter(p => !p.externalUrl);
let n = 0;
for (const post of internal) {
  const dir = ROOT + 'blog/' + post.slug;
  mkdirSync(dir, { recursive: true });
  writeFileSync(dir + '/index.html', pageHtml(post));
  n++;
}

/* ---- sitemap.xml ---- */
const staticPaths = ['/', '/services/', '/services/apo-yoro/', '/services/sales-pilot/', '/services/bpo-cso-rental/', '/services/support/', '/case/', '/clients/', '/blog/', '/news/', '/flow/', '/faq/', '/company/', '/message/', '/recruit/', '/contact/', '/privacy-policy/'];
const urls = [
  ...staticPaths.map(p => ({ loc: ORIGIN + p })),
  ...internal.map(p => ({ loc: `${ORIGIN}/blog/${p.slug}/`, lastmod: p.date })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`;
writeFileSync(ROOT + 'sitemap.xml', sitemap);

/* ---- robots.txt ---- */
writeFileSync(ROOT + 'robots.txt', `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

console.log(`✅ 記事静的化: ${n}本 / sitemap: ${urls.length} URL / robots.txt 生成`);

/* ---- 一覧用の軽量インデックス（本文抜き）も併せて生成 ---- */
{
  const idx = POSTS.map(({ content, ...rest }) => rest);
  writeFileSync(ROOT + 'data/blogs-index.js',
    '/* ============================================================\n' +
    '   自動生成ファイル — data/blogs.js から本文(content)を除いて生成\n' +
    '   直接編集しないこと（tools/build_blog_index.mjs と同じ出力）\n' +
    '   ============================================================ */\n' +
    'const BLOG_POSTS = ' + JSON.stringify(idx) + ';\n' +
    'const BLOG_CATEGORIES = ' + JSON.stringify(CATS) + ';\n');
  console.log(`✅ data/blogs-index.js も更新: ${idx.length}本`);
}
