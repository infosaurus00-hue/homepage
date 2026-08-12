/* ============================================================
   ブログの軽量インデックス生成
   ------------------------------------------------------------
   目的：data/blogs.js は本文(content)込みで約850KB。一覧・トップ・
        関連記事の表示には本文が不要なのに全ページで読み込んでおり、
        「読み込み中...」が長く表示される原因になっていた。
        本文を除いたデータを data/blogs-index.js に出力し、
        本文が要るページ（/blog/detail/ と /admin/）以外はこちらを読む。
   使い方： node tools/build_blog_index.mjs
        （tools/build_blog.mjs の最後でも自動生成される）
   ============================================================ */
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

const ctx = { window: {}, document: { querySelector: () => null }, Date };
vm.createContext(ctx);
vm.runInContext(readFileSync(ROOT + 'data/blogs.js', 'utf8'), ctx);
vm.runInContext('this.__POSTS = BLOG_POSTS; this.__CATS = typeof BLOG_CATEGORIES!=="undefined"?BLOG_CATEGORIES:[];', ctx);

const posts = ctx.__POSTS.map(({ content, ...rest }) => rest);
const out =
  '/* ============================================================\n' +
  '   自動生成ファイル — data/blogs.js から本文(content)を除いて生成\n' +
  '   直接編集しないこと。記事の追加・修正は data/blogs.js 側で行い、\n' +
  '   node tools/build_blog_index.mjs（または build_blog.mjs）で再生成する。\n' +
  '   ============================================================ */\n' +
  'const BLOG_POSTS = ' + JSON.stringify(posts) + ';\n' +
  'const BLOG_CATEGORIES = ' + JSON.stringify(ctx.__CATS) + ';\n';

writeFileSync(ROOT + 'data/blogs-index.js', out);

const kb = p => Math.round(statSync(ROOT + p).size / 1024);
console.log(`✅ data/blogs-index.js 生成: ${posts.length}本 / ${kb('data/blogs-index.js')}KB（元 data/blogs.js は ${kb('data/blogs.js')}KB）`);
