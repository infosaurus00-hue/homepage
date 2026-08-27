import { esc, hard, paras } from '../utils.js';
import { philosophy } from '../../content/daiki.js';
import reveal from './Reveal.js';

export const Philosophy = () => `
<section class="section philosophy" id="philosophy">
  <div class="container">
    <header class="section__head">
      <p class="eyebrow"${reveal()}>${esc(philosophy.eyebrow)}</p>
      <h2 class="section__title"${reveal(60)}>${hard(philosophy.headline)}</h2>
    </header>

    <div class="philosophy__grid">
      ${philosophy.statements
        .map(
          (s, i) => `
      <article class="statement"${reveal(i * 90)}>
        <p class="statement__no" aria-hidden="true">${esc(s.no)}</p>
        <h3 class="statement__title">${esc(s.title)}</h3>
        <div class="statement__body rich">${paras(s.body)}</div>
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>`;

export default Philosophy;
