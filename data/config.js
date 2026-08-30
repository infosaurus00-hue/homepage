/* ============================================================
   サイト設定ファイル
   ここを編集すると全ページに反映されます
   ============================================================ */

// カスタムドメイン対応（sales-saurus.com はルート配信）
const SITE_BASE = '';

const SITE_CONFIG = {
  companyName: '株式会社Salesaurus',
  companyNameEn: 'Salesaurus Inc.',
  tagline: 'もう一度頼みたい、と言われる仕事を。',
  subline: '営業の課題を、戦略から実行まで。',
  description: '営業代行・営業コンサル・BPOを通じて、課題整理から実行支援まで伴走する、営業成果の仕組みづくりパートナー。',
  address: '埼玉県さいたま市中央区下落合7丁目11番1－2号',
  email: 'contact@sales-saurus.com',
  founded: '2025年10月16日',
  mission: '挑戦する人が、結果と信頼を積み上げられる場所をつくる。',
  vision: 'Salesaurusに関わる全員が、もう一度頼まれる存在になる組織へ。',
  values: [
    { name: '自責で動く', desc: '何事も自分ごととして受け止め、学びに変える。' },
    { name: '結果にコミットする', desc: '目的を見失わず、成果でしか語らない。' },
    { name: '信頼を渡し続ける', desc: '一回の取引ではなく、続く関係で返し続ける。' },
  ],

  // 問い合わせ先
  contactFormUrl: '/contact/',
  // LINEは用途で分岐（HTMLからは data-line="corporate" / data-line="recruit" で参照）
  lineUrlCorporate: 'https://lin.ee/72lTZan', // 法人向け：営業代行の相談・問い合わせ・商談
  lineUrlRecruit:   'https://lin.ee/G8gXxYq',           // 求人向け：採用応募・働き方相談
  lineUrl: 'https://lin.ee/72lTZan',           // 既定（法人）。後方互換のため保持
  lineLabel: '公式LINEで相談',
  // 日程調整（無料相談の予約）
  timerexUrl: 'https://timerex.net/s/info_d325_4c72/779fe452',

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
