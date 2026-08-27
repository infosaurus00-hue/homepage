import { esc, hard, paras, cx } from '../utils.js';
import { story, photos } from '../../content/daiki.js';
import PhotoPlaceholder from './PhotoPlaceholder.js';
import reveal from './Reveal.js';

export const StoryTimeline = () => `
<section class="section story" id="story">
  <div class="container">
    <h2 class="eyebrow story__label"${reveal()}>${esc(story.eyebrow)}</h2>

    <div class="timeline" id="timeline">
      <div class="timeline__line" aria-hidden="true"><span class="timeline__progress"></span></div>
      <ol class="timeline__items">
      ${story.steps
        .map(
          (step, i) => `
      <li class="${cx('timeline__item', step.current && 'is-current')}" data-step="${i + 1}"${reveal()}>
        <span class="timeline__dot" aria-hidden="true"></span>
        <div class="timeline__meta">
          <span class="timeline__index">${String(i + 1).padStart(2, '0')}</span>
          ${step.meta.map((m) => `<span class="timeline__tag">${esc(m)}</span>`).join('')}
        </div>
        <div class="timeline__content">
          <h3 class="timeline__large">${hard(step.large)}</h3>
          <div class="timeline__body rich">${paras(step.body)}</div>
          ${step.photo ? PhotoPlaceholder(photos[step.photo], { className: 'photo--story' }) : ''}
        </div>
      </li>`
        )
        .join('')}
      </ol>
    </div>
  </div>
</section>`;

export default StoryTimeline;
