import { esc, hard, paras } from '../utils.js';
import { personal, photos } from '../../content/daiki.js';
import PhotoPlaceholder from './PhotoPlaceholder.js';
import reveal from './Reveal.js';

export const Personal = () => `
<section class="section personal" id="personal">
  <div class="container personal__inner">
    <div class="personal__text">
      <p class="eyebrow"${reveal()}>${esc(personal.eyebrow)}</p>
      <h2 class="section__title"${reveal(60)}>${hard(personal.headline)}</h2>
      <div class="personal__body rich"${reveal(120)}>${paras(personal.body)}</div>
      <ul class="hobbies"${reveal(180)}>
        ${personal.hobbies
          .map(
            (h) => `<li class="hobby"><span class="hobby__emoji" aria-hidden="true">${h.emoji}</span><span class="hobby__label">${esc(h.label)}</span></li>`
          )
          .join('\n        ')}
      </ul>
    </div>
    <div class="personal__media"${reveal(160)}>
      ${PhotoPlaceholder(photos[personal.photo], { className: 'photo--personal' })}
    </div>
  </div>
</section>`;

export default Personal;
