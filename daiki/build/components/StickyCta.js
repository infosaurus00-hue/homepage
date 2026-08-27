import { stickyCta } from '../../content/daiki.js';
import Cta from './Cta.js';

/** スマホ用の固定CTA（Heroを過ぎたら表示 / Final CTA付近で自動的に隠れる） */
export const StickyCta = () => `
<div class="sticky-cta" id="sticky-cta" hidden>
  <div class="sticky-cta__inner">
    ${Cta({ label: stickyCta.label, location: 'sticky', variant: 'primary', size: 'md', block: true })}
  </div>
</div>`;

export default StickyCta;
