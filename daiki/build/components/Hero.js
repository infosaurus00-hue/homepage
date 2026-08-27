import { hard, paras, esc } from '../utils.js';
import { hero, photos } from '../../content/daiki.js';
import PhotoPlaceholder from './PhotoPlaceholder.js';
import Cta from './Cta.js';
import reveal from './Reveal.js';

/* 恐竜の足跡（Salesaurusとの繋がり／極めて控えめに・余白の中だけに置く） */
const TOE_A = 'M0-17C3.6-9.6 5.4-5.2 5.4-1.2 5.4 3.4 3 6.2 0 6.2S-5.4 3.4-5.4-1.2C-5.4-5.2-3.6-9.6 0-17Z';
const TOE_B = 'M0-15C3.2-8.6 4.8-4.6 4.8-1 4.8 3 2.7 5.6 0 5.6S-4.8 3-4.8-1C-4.8-4.6-3.2-8.6 0-15Z';

const Tracks = () => `
<div class="hero__tracks" aria-hidden="true">
  <svg viewBox="0 0 200 120" width="200" height="120" focusable="false">
    <defs>
      <g id="dino-track">
        <path d="${TOE_A}" transform="translate(22 20)"/>
        <path d="${TOE_B}" transform="translate(10 28) rotate(-28)"/>
        <path d="${TOE_B}" transform="translate(34 28) rotate(28)"/>
        <ellipse cx="22" cy="41" rx="8.4" ry="9.6"/>
      </g>
    </defs>
    <use href="#dino-track" transform="translate(-4 66) rotate(84 22 28) scale(0.86)"/>
    <use href="#dino-track" transform="translate(58 36) rotate(79 22 28) scale(0.86)"/>
    <use href="#dino-track" transform="translate(122 6) rotate(74 22 28) scale(0.86)"/>
  </svg>
</div>`;

export const Hero = () => `
<section class="hero" id="top">
  ${Tracks()}
  <div class="container hero__inner">
    <div class="hero__head">
      <p class="eyebrow"${reveal()}>${esc(hero.eyebrow)}</p>
      <h1 class="hero__title"${reveal(60)}>${hard(hero.headline)}</h1>
      <p class="hero__sub"${reveal(140)}>${hard(hero.sub).replace(/<br>/g, '<br class="lb">')}</p>
    </div>

    <div class="hero__media"${reveal(160)}>
      ${PhotoPlaceholder(photos.hero, { priority: true, className: 'photo--hero' })}
    </div>

    <div class="hero__rest">
      <div class="hero__body rich"${reveal(200)}>${paras(hero.body)}</div>
      <div class="hero__actions"${reveal(260)}>
        ${Cta({ label: hero.ctaLabel, location: 'hero' })}
        <p class="hero__note">${esc(hero.ctaSecondary)}</p>
      </div>
      <p class="microcopy hero__micro"${reveal(320)}>${esc(hero.microcopy)}</p>
    </div>
  </div>
</section>`;

export default Hero;
