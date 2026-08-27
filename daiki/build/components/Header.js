import { esc } from '../utils.js';
import { profile, nav } from '../../content/daiki.js';
import Cta from './Cta.js';

export const Header = () => `
<header class="site-header" id="site-header">
  <div class="site-header__inner">
    <a class="brand" href="#top">
      <span class="brand__name">${esc(profile.nameEn)}</span>
      <span class="brand__role">${esc(profile.roleEn)}</span>
    </a>

    <nav class="site-nav" aria-label="ページ内リンク">
      <ul>
        ${nav.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('\n        ')}
      </ul>
    </nav>

    <div class="site-header__cta">
      ${Cta({ label: nav.ctaLabel, location: 'header', variant: 'primary', size: 'md' })}
    </div>
  </div>
</header>`;

export default Header;
