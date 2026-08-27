import { esc, hard, paras } from '../utils.js';
import { finalCta } from '../../content/daiki.js';
import Cta from './Cta.js';
import reveal from './Reveal.js';

export const FinalCTA = () => `
<section class="section final" id="final">
  <div class="container final__inner">
    <p class="final__small"${reveal()}>${esc(finalCta.small)}</p>
    <h2 class="final__title"${reveal(60)}>${hard(finalCta.headline)}</h2>
    <p class="final__large"${reveal(180)}>${hard(finalCta.large)}</p>
    <div class="final__body rich"${reveal(240)}>${paras(finalCta.body)}</div>
    <div class="final__cta"${reveal(300)}>
      ${Cta({ label: finalCta.ctaLabel, location: 'final' })}
      <p class="microcopy final__micro">${esc(finalCta.microcopy)}</p>
      ${finalCta.microcopyNote ? `<p class="final__note">${esc(finalCta.microcopyNote)}</p>` : ''}
    </div>
  </div>
</section>`;

export default FinalCTA;
