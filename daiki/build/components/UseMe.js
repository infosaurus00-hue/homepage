import { esc, hard, paras } from '../utils.js';
import { useMe } from '../../content/daiki.js';
import Cta from './Cta.js';
import reveal from './Reveal.js';

export const UseMe = () => `
<section class="section use-me" id="use-me">
  <div class="container">
    <div class="use-me__head">
      <p class="eyebrow eyebrow--light"${reveal()}>${esc(useMe.eyebrow)}</p>
      <h2 class="use-me__title"${reveal(60)}>${hard(useMe.headline)}</h2>
    </div>

    <div class="use-me__body rich"${reveal(140)}>${paras(useMe.body)}</div>

    <ul class="tags"${reveal(200)}>
      ${useMe.tags.map((t) => `<li class="tag">${esc(t)}</li>`).join('\n      ')}
    </ul>

    <div class="use-me__cta"${reveal(240)}>
      ${Cta({ label: useMe.ctaLabel, location: 'use_me', variant: 'light' })}
    </div>
  </div>
</section>`;

export default UseMe;
