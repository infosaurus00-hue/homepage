import { esc, soft } from '../utils.js';
import { proof } from '../../content/daiki.js';
import reveal from './Reveal.js';

/** 数字は大きく、単位は小さく、ラベルで「何の数字か」を必ず説明する */
const Value = (item) => {
  const isText = !/^[0-9,]+$/.test(item.number);
  return `
<span class="proof__value">
  ${item.prefix ? `<span class="proof__unit">${esc(item.prefix)}</span>` : ''}<span class="proof__num${isText ? ' proof__num--text' : ''}"${item.countTo ? ` data-count-to="${item.countTo}"` : ''}>${esc(item.number)}</span>${item.suffix ? `<span class="proof__unit">${esc(item.suffix)}</span>` : ''}
</span>`;
};

export const ProofStrip = () => `
<section class="proof" aria-label="峠大輝のこれまでの数字">
  <div class="container">
    <ul class="proof__list">
      ${proof
        .map(
          (item, i) => `
      <li class="proof__item"${reveal((i % 4) * 60)}>
        ${Value(item)}
        <span class="proof__label">${soft(item.label)}</span>
      </li>`
        )
        .join('')}
    </ul>
  </div>
</section>`;

export default ProofStrip;
