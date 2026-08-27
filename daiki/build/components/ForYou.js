import { esc, hard, rich } from '../utils.js';
import { forYou } from '../../content/daiki.js';
import reveal from './Reveal.js';

const Check = () => `
<svg class="check__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
  <path d="M3.5 8.6 6.6 11.7 12.5 4.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const ForYou = () => `
<section class="section for-you" id="for-you">
  <div class="container">
    <header class="section__head">
      <p class="eyebrow"${reveal()}>${esc(forYou.eyebrow)}</p>
      <h2 class="section__title"${reveal(60)}>${hard(forYou.headline)}</h2>
    </header>

    <ul class="checklist">
      ${forYou.items
        .map(
          (item, i) => `
      <li class="check"${reveal((i % 2) * 60)}>${Check()}<span>${esc(item)}</span></li>`
        )
        .join('')}
    </ul>

    <div class="for-you__note rich"${reveal()}>${rich(forYou.note)}</div>
  </div>
</section>`;

export default ForYou;
