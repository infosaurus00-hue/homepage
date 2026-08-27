import { esc, hard, paras, cx } from '../utils.js';
import { projects } from '../../content/daiki.js';
import reveal from './Reveal.js';

export const CurrentProjects = () => `
<section class="section now" id="now">
  <div class="container">
    <header class="section__head">
      <p class="eyebrow"${reveal()}>${esc(projects.eyebrow)}</p>
      <h2 class="section__title"${reveal(60)}>${hard(projects.headline)}</h2>
      <p class="section__intro"${reveal(120)}>${hard(projects.intro).replace(/<br>/g, '<br class="lb">')}</p>
    </header>

    <div class="now__grid">
      ${projects.cards
        .map(
          (card, i) => `
      <article class="${cx('project', card.next && 'project--next', card.wide && 'project--wide')}"${reveal(i % 2 === 0 ? 0 : 90)}>
        <p class="project__label">${esc(card.label)}</p>
        ${card.badge ? `<p class="project__badge">${esc(card.badge)}</p>` : ''}
        <h3 class="project__title">${esc(card.title)}</h3>
        <div class="project__body rich">${paras(card.body)}</div>
        ${card.stat ? `<p class="project__stat"><span>${esc(card.stat)}</span></p>` : ''}
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>`;

export default CurrentProjects;
