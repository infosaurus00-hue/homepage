import { esc } from './utils.js';
import { seo, profile } from '../content/daiki.js';
import { siteConfig } from '../config/site.js';

const personSchema = () =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.nameJa,
    alternateName: profile.nameEn,
    url: siteConfig.siteUrl,
    image: siteConfig.siteUrl + 'images/daiki-hero.jpg',
    jobTitle: '代表取締役',
    worksFor: {
      '@type': 'Organization',
      name: profile.company,
      alternateName: profile.companyEn,
      url: siteConfig.links.salesaurus,
    },
    sameAs: [siteConfig.links.note, siteConfig.links.threads].filter(Boolean),
  });

export const layout = (body) => `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(seo.title)}</title>
<meta name="description" content="${esc(seo.description)}">
<link rel="canonical" href="${esc(siteConfig.siteUrl)}">
<meta name="theme-color" content="#F7F7F4">

<meta property="og:type" content="profile">
<meta property="og:site_name" content="${esc(profile.nameJa)}">
<meta property="og:title" content="${esc(seo.ogTitle)}">
<meta property="og:description" content="${esc(seo.ogDescription)}">
<meta property="og:url" content="${esc(siteConfig.siteUrl)}">
<meta property="og:image" content="${esc(siteConfig.siteUrl + siteConfig.ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(seo.ogTitle)}">
<meta name="twitter:description" content="${esc(seo.ogDescription)}">
<meta name="twitter:image" content="${esc(siteConfig.siteUrl + siteConfig.ogImage)}">

<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">

<link rel="preload" as="image" href="images/daiki-hero.webp" type="image/webp" fetchpriority="high">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Noto+Sans+JP:wght@400..700&display=swap">
<link rel="stylesheet" href="css/style.css">

<script>
  document.documentElement.classList.add('js');
  window.__LP_CONFIG__ = { ctaEvent: '${siteConfig.ctaEventName}' };
</script>

<script type="application/ld+json">${personSchema()}</script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${siteConfig.ga4Id}');
</script>
</head>
<body>
<a class="skip-link" href="#main">本文へスキップ</a>
${body}
<script src="js/app.js" defer></script>
</body>
</html>
`;

export default layout;
