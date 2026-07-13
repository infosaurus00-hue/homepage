/* ============================================================
   GA4のブログ別PV → data/blogs.js の popular（人気TOP3）を自動更新
   ------------------------------------------------------------
   データ元：【Salesaurus】PDCA分析レポート の「ブログ分析」シート
     spreadsheetId: 119DVMjGPGfFeK94jk5W6oXTMyjbrISKMr297ILDkexE
     列: ページ / タイトル / PV / 平均滞在時間 / 直帰率 / 取得日
   使い方：
     1) シートの (タイトル, PV) を tools/ga4_blog_pv.json に書き出す
        例: [{ "title": "テレアポ受付突破率を…", "pv": 128 }, ...]
     2) node tools/update_blog_popular.mjs
   → タイトルで記事を突合し、PV上位3本に popular:1..3 を付与、他は削除。
   ※ 記事URLが全て /blog/detail/?slug= で GA4上はページタイトルで判別するため、
     突合はタイトル正規化マッチで行う。
   ============================================================ */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const PV_JSON = process.argv[2] || fileURLToPath(new URL('./ga4_blog_pv.json', import.meta.url));
const BLOGS = fileURLToPath(new URL('../data/blogs.js', import.meta.url));

const norm = s => (s || '')
  .replace(/\s*[|｜]\s*(株式会社)?Salesaurus.*$/i, '') // 「| Salesaurus | 株式会社Salesaurus」等の末尾を除去
  .replace(/\s+/g, '')
  .toLowerCase();

const ga4 = JSON.parse(readFileSync(PV_JSON, 'utf8'));
const src = readFileSync(BLOGS, 'utf8');

// blogs.js から BLOG_POSTS を安全に読み込む
const ctx = { module: {} };
vm.createContext(ctx);
vm.runInContext(src + '\nthis.__POSTS = BLOG_POSTS;', ctx);
const posts = ctx.__POSTS.filter(p => p.status === 'published');

// GA4タイトル → slug へ突合しPV集計
const pvBySlug = {};
for (const row of ga4) {
  const nt = norm(row.title);
  if (!nt) continue;
  const hit = posts.find(p => {
    // GA4のページタイトルは (seoTitle || title) を使うため両方で突合
    for (const cand of [p.seoTitle, p.title]) {
      const np = norm(cand);
      if (np && (np === nt || np.startsWith(nt) || nt.startsWith(np))) return true;
    }
    return false;
  });
  if (hit) pvBySlug[hit.slug] = (pvBySlug[hit.slug] || 0) + Number(row.pv || 0);
}

const ranked = Object.entries(pvBySlug).sort((a, b) => b[1] - a[1]);
const top = ranked.slice(0, 3).map(([slug]) => slug);

if (top.length < 3) {
  console.error(`⚠ データ不足：PVを突合できた記事は ${top.length} 本のみ。`);
  console.error('  アクセスが貯まってから再実行してください（現状のpopularは変更しません）。');
  process.exit(1);
}

// 既存 popular を全削除 → 上位3本に付与
let out = src.replace(/\n\s*popular:\s*\d+,/g, '');
top.forEach((slug, i) => {
  const esc = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  out = out.replace(new RegExp(`(slug: '${esc}',)`), `$1\n    popular: ${i + 1},`);
});
writeFileSync(BLOGS, out);
console.log('✅ popular を更新:', top.map((s, i) => `${i + 1}. ${s}(${pvBySlug[s]}PV)`).join(' / '));
