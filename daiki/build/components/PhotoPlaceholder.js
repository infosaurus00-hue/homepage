import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, cx } from '../utils.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/**
 * 写真枠。
 * - images/ に実ファイルがあれば <picture> で表示
 * - 無ければ「デザインされた仮ビジュアル」（ブランド色＋キーワード）を表示
 *   ※ 人物のAI生成画像は使わない。実写が用意でき次第、ファイルを置くだけで差し替わる。
 * 画像切れ（壊れたアイコン）は絶対に出さない。
 */
export const PhotoPlaceholder = (photo, { priority = false, className = '' } = {}) => {
  const [rw, rh] = photo.ratio || [4, 3];
  const ratioStyle = `--ratio:${rw} / ${rh}`;
  const exists = (p) => p && fs.existsSync(path.join(ROOT, p));

  if (exists(photo.src)) {
    const w = rw * 400;
    const h = rh * 400;
    const fallback = exists(photo.fallback) ? photo.fallback : null;
    const img = `<img src="${esc(fallback || photo.src)}" alt="${esc(photo.alt)}" width="${w}" height="${h}"
        ${priority ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}>`;
    return `
<figure class="${cx('photo', className)}" style="${ratioStyle}">
  ${fallback ? `<picture><source srcset="${esc(photo.src)}" type="image/webp">${img}</picture>` : img}
</figure>`;
  }

  // 恐竜の足跡を小さく斜めに並べたテクスチャ（写真が入るまでの仮ビジュアル）
  const toes = `
      <path d="M0-17C3.6-9.6 5.4-5.2 5.4-1.2 5.4 3.4 3 6.2 0 6.2S-5.4 3.4-5.4-1.2C-5.4-5.2-3.6-9.6 0-17Z" transform="translate(0 -8)"/>
      <path d="M0-15C3.2-8.6 4.8-4.6 4.8-1 4.8 3 2.7 5.6 0 5.6S-4.8 3-4.8-1C-4.8-4.6-3.2-8.6 0-15Z" transform="translate(-12 0) rotate(-28)"/>
      <path d="M0-15C3.2-8.6 4.8-4.6 4.8-1 4.8 3 2.7 5.6 0 5.6S-4.8 3-4.8-1C-4.8-4.6-3.2-8.6 0-15Z" transform="translate(12 0) rotate(28)"/>
      <ellipse cx="0" cy="13" rx="8.4" ry="9.6"/>`;
  const steps = [
    [46, 356, -18, 0.52],
    [92, 288, -14, 0.52],
    [138, 220, -10, 0.52],
    [184, 152, -6, 0.52],
    [230, 84, -2, 0.52],
    [276, 16, 2, 0.52],
  ];
  const pattern = steps
    .map(([x, y, r, sc]) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${sc})">${toes}</g>`)
    .join('');

  return `
<div class="${cx('photo', 'photo--visual', className)}" style="${ratioStyle}">
  <svg class="photo__pattern" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <g fill="currentColor">${pattern}</g>
  </svg>
  <div class="photo__caption">
    <span class="photo__word">${esc(photo.keyword || '')}</span>
    <span class="photo__status"><span class="photo__dots" aria-hidden="true"><i></i><i></i><i></i></span>写真は準備中です</span>
  </div>
</div>`;
};

export default PhotoPlaceholder;
