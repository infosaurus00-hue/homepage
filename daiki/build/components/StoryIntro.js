import { esc, hard } from '../utils.js';
import { storyIntro, photos } from '../../content/daiki.js';
import PhotoPlaceholder from './PhotoPlaceholder.js';
import reveal from './Reveal.js';

export const StoryIntro = () => `
<section class="section story-intro" aria-label="峠大輝のこれまで">
  <div class="container story-intro__inner">
    <div class="story-intro__text">
      <h2 class="story-intro__title"${reveal()}>${hard(storyIntro.headline)}</h2>
      <p class="story-intro__sub"${reveal(140)}>${esc(storyIntro.sub)}</p>
    </div>
    <div class="story-intro__media"${reveal(200)}>
      ${PhotoPlaceholder(photos[storyIntro.photo], { className: 'photo--dark' })}
    </div>
  </div>
</section>`;

export default StoryIntro;
