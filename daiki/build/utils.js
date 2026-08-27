/* 共通ヘルパー（ビルド専用） */

/** HTMLエスケープ（属性値・テキスト用） */
export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** 見出し用：改行は常に改行する */
export const hard = (s) => String(s).replace(/\n/g, '<br>');

/** 本文用：PCでは改行、狭いスマホでは自然に流す（CSSで .lb を非表示） */
export const soft = (s) => String(s).replace(/\n/g, '<br class="lb">');

/** "\n\n" を段落、"\n" をソフト改行として扱う */
export const rich = (s) =>
  String(s)
    .split(/\n{2,}/)
    .map((p) => `<p>${soft(p)}</p>`)
    .join('');

/** 段落配列 → HTML */
export const paras = (arr) => arr.map(rich).join('');

/** 属性の組み立て（値がfalsyなら出力しない） */
export const attr = (name, value) => (value || value === 0 ? ` ${name}="${esc(value)}"` : '');

/** class配列 → class属性 */
export const cx = (...classes) => classes.filter(Boolean).join(' ');

/** インデント整形用（テンプレートの見た目を保つだけ） */
export const trim = (s) => String(s).replace(/^\n+|\s+$/g, '');
