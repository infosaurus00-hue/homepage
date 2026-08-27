import { esc } from '../utils.js';
import { footer, profile } from '../../content/daiki.js';
import { siteConfig } from '../../config/site.js';

export const Footer = () => {
  const links = footer.links
    .map((l) => {
      const href = siteConfig.links[l.key];
      // URL未設定のリンクは出力しない（href="#" は作らない）
      if (!href) return '';
      return `<li><a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a></li>`;
    })
    .filter(Boolean)
    .join('\n        ');

  return `
<footer class="site-footer">
  <div class="container site-footer__inner">
    <div class="site-footer__id">
      <p class="site-footer__name">${esc(profile.nameEn)}<span class="site-footer__dino" aria-hidden="true">🦖</span></p>
      ${profile.footerRoles.map((r) => `<p class="site-footer__role">${esc(r)}</p>`).join('\n      ')}
    </div>
    <nav class="site-footer__nav" aria-label="外部リンク">
      <ul>
        ${links}
      </ul>
    </nav>
    <p class="site-footer__copy">${esc(footer.copyright)}</p>
  </div>
</footer>`;
};

export default Footer;
