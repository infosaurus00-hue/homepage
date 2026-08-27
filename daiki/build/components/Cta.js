import { PERSONAL_LINE_URL } from '../../config/site.js';
import { esc, cx } from '../utils.js';

/**
 * CTAボタン（遷移先はページ内すべて個人用公式LINE）
 * @param {{label:string, location:string, variant?:'primary'|'light'|'ghost', size?:'lg'|'md', block?:boolean}} o
 */
export const Cta = ({ label, location, variant = 'primary', size = 'lg', block = false }) => `
<a class="${cx('btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block')}"
   href="${PERSONAL_LINE_URL}"
   target="_blank" rel="noopener noreferrer"
   data-cta="${esc(location)}">
  <span class="btn__label">${esc(label)}</span>
  <svg class="btn__icon" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
    <path d="M3 9h11M9.5 4.5 14 9l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span class="u-visually-hidden">（LINEが新しいタブで開きます）</span>
</a>`;

export default Cta;
