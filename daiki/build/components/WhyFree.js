import { esc, hard, soft } from '../utils.js';
import { whyFree } from '../../content/daiki.js';
import reveal from './Reveal.js';

/** 「なんで無料なの？」に先に答えるブロック（相談ステップの下・CTAの上） */
export const WhyFree = () => `
<div class="why-free" id="why-free">
  <div class="why-free__head">
    <p class="eyebrow"${reveal()}>${esc(whyFree.eyebrow)}</p>
    <h3 class="why-free__title"${reveal(60)}>${hard(whyFree.headline)}</h3>
  </div>

  <ol class="why-free__list">
    ${whyFree.reasons
      .map(
        (r, i) => `
    <li class="reason"${reveal(i * 80)}>
      <p class="reason__no">${esc(r.no)}</p>
      <h4 class="reason__title">${esc(r.title)}</h4>
      <p class="reason__body">${soft(r.body)}</p>
    </li>`
      )
      .join('')}
  </ol>

  <p class="why-free__note"${reveal()}>
    <svg class="why-free__check" width="17" height="17" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M3.5 8.6 6.6 11.7 12.5 4.9" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>${soft(whyFree.note)}</span>
  </p>
</div>`;

export default WhyFree;
