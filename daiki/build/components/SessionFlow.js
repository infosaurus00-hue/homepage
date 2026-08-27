import { esc, hard, paras, rich } from '../utils.js';
import { session, photos } from '../../content/daiki.js';
import PhotoPlaceholder from './PhotoPlaceholder.js';
import Cta from './Cta.js';
import WhyFree from './WhyFree.js';
import reveal from './Reveal.js';

export const SessionFlow = () => `
<section class="section session" id="session">
  <div class="container">
    <div class="session__intro">
      <div class="session__text">
        <p class="eyebrow"${reveal()}>${esc(session.eyebrow)}</p>
        <h2 class="section__title"${reveal(60)}>${hard(session.headline)}</h2>
        <div class="session__body rich"${reveal(120)}>${paras(session.body)}</div>
      </div>
      <div class="session__media"${reveal(180)}>
        ${PhotoPlaceholder(photos[session.photo], { className: 'photo--session' })}
      </div>
    </div>

    <ol class="steps">
      ${session.steps
        .map(
          (step, i) => `
      <li class="step"${reveal(i * 90)}>
        <p class="step__no">${esc(step.no)}</p>
        <h3 class="step__title">${esc(step.title)}</h3>
        <div class="step__body rich">${rich(step.body)}</div>
      </li>`
        )
        .join('')}
    </ol>

    ${WhyFree()}

    <div class="session__foot">
      <p class="microcopy session__micro"${reveal()}>${hard(session.microcopy).replace(/<br>/g, '<br class="lb">')}</p>
      <div${reveal(80)}>${Cta({ label: session.ctaLabel, location: 'session' })}</div>
    </div>
  </div>
</section>`;

export default SessionFlow;
