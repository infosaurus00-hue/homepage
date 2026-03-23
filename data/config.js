/* ============================================================
   サイト設定ファイル
   ここを編集すると全ページに反映されます
   ============================================================ */

// GitHub Pages のサブディレクトリ対応
const SITE_BASE = location.hostname === 'infosaurus00-hue.github.io' ? '/homepage' : '';

const SITE_CONFIG = {
  companyName: '株式会社Salesaurus',
  companyNameEn: 'Salesaurus Inc.',
  tagline: '営業成果を、組織として実現する。',
  description: '営業代行・営業コンサル・BPOを通じて、課題整理から実行支援まで伴走する、営業成果の仕組みづくりパートナー。',
  address: '埼玉県さいたま市中央区下落合7丁目11番1－2号',
  email: 'contact@sales-saurus.com',
  founded: '2025年10月16日',
  mission: '挑戦する全ての人が結果を出し、自信をつけられる環境をつくる。',

  // 問い合わせ先 ★要変更
  contactFormUrl: '/contact/',
  lineUrl: 'https://lin.ee/72lTZan',    // ← 公式LINEのURLに変更してください
  lineLabel: '公式LINEで相談',

  // SNS（使用しない場合は空文字にしてください）
  twitter: '',
  facebook: '',
  instagram: '',
  youtube: '',

  // サービス一覧
  services: [
    {
      id: 'apo-yoro',
      name: 'アポヨロ！',
      type: '営業代行サービス',
      displayName: 'アポヨロ！｜営業代行サービス',
      url: '/services/apo-yoro/',
      icon: '📞',
      desc: '確実なアポイントを獲得し、御社の営業リソースを最大化します。',
      badgeClass: 'badge-service-1',
    },
    {
      id: 'sales-pilot',
      name: 'セールス航海士',
      type: '営業コンサルサービス',
      displayName: 'セールス航海士｜営業コンサルサービス',
      url: '/services/sales-pilot/',
      icon: '🧭',
      desc: '営業戦略の設計から実行まで、コンサルタントが伴走します。',
      badgeClass: 'badge-service-2',
    },
    {
      id: 'bpo-cso-rental',
      name: 'BPO・CSOレンタル',
      type: 'BPO・営業支援サービス',
      displayName: 'BPO・CSOレンタル｜BPO・営業支援サービス',
      url: '/services/bpo-cso-rental/',
      icon: '🤝',
      desc: '営業組織の構築・運営をまるごとお任せいただけます。',
      badgeClass: 'badge-service-3',
    },
  ],

  // ナビゲーション
  nav: {
    services: [
      { name: 'アポヨロ！', type: '営業代行', url: '/services/apo-yoro/', icon: '📞' },
      { name: 'セールス航海士', type: '営業コンサル', url: '/services/sales-pilot/', icon: '🧭' },
      { name: 'BPO・CSOレンタル', type: 'BPO・営業支援', url: '/services/bpo-cso-rental/', icon: '🤝' },
      { name: '補完サービス', type: '人材・AI活用', url: '/services/support/', icon: '✨' },
    ],
    company: [
      { name: '会社概要', url: '/company/' },
      { name: '代表メッセージ', url: '/message/' },
      { name: '導入の流れ', url: '/flow/' },
      { name: 'よくある質問', url: '/faq/' },
    ],
  },

  // 著作権
  copyright: `© ${new Date().getFullYear()} 株式会社Salesaurus All Rights Reserved.`,
};
