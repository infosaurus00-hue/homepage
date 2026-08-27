/* ============================================================
   峠大輝 パーソナルLP ─ コンテンツ定義
   ------------------------------------------------------------
   このファイルだけを編集すれば、コピー・数字・写真・タグを変更できます。
   編集後は  node build/build.mjs  を実行して index.html を再生成してください。

   記法メモ
   - 文中の "\n"（改行）は、PCでは改行、スマホでは自然に流れる改行になります
   - 見出し（headline / large）の "\n" は、どの画面でも必ず改行されます
   - 写真は photos の src にファイルを置くだけで、プレースホルダーから自動で差し替わります
   ============================================================ */

/** ---------- プロフィール（ヘッダー / フッター / 構造化データ） ---------- */
export const profile = {
  nameJa: '峠 大輝',
  nameEn: 'DAIKI TOGE',
  age: 26,
  roleEn: 'Entrepreneur / Salesaurus',
  footerRoles: ['Founder / Entrepreneur', 'Representative Director, Salesaurus Inc.'],
  company: '株式会社Salesaurus',
  companyEn: 'Salesaurus Inc.',
};

/** ---------- 写真スロット ----------
 *  src にファイルを置く（images/ 配下）だけで写真が表示されます。
 *  ファイルが無い場合は「デザインされたプレースホルダー」が出ます（画像切れは出ません）。
 *  ratio: [横, 縦]。CLS防止のため必ず指定してください。
 *  ※ AI生成の人物画像は使用しないこと。
 */
export const photos = {
  hero: {
    no: 'PHOTO 01',
    src: 'images/daiki-hero.webp',
    fallback: 'images/daiki-hero.jpg',
    alt: '峠大輝のポートレート',
    keyword: 'PORTRAIT',
    ratio: [3, 4],
    hint: '峠大輝の自然なポートレート推奨',
  },
  salesEra: {
    no: 'PHOTO 02',
    src: 'images/story-sales-era.webp',
    alt: '営業時代の峠大輝',
    keyword: 'SALES DAYS',
    ratio: [4, 5],
    hint: '営業時代／若い頃の写真',
  },
  working: {
    no: 'PHOTO 03',
    src: 'images/story-working.webp',
    alt: '仕事をしている峠大輝',
    keyword: 'ON SITE',
    ratio: [4, 3],
    hint: '仕事中の自然な写真',
  },
  talking: {
    no: 'PHOTO 04',
    src: 'images/session-talking.webp',
    alt: '人と話している峠大輝',
    keyword: '1 ON 1',
    ratio: [4, 3],
    hint: '人と話している写真',
  },
  germany: {
    no: 'PHOTO 05',
    src: 'images/story-germany.webp',
    alt: 'ドイツ時代の峠大輝',
    keyword: 'GERMANY',
    ratio: [4, 3],
    hint: 'ドイツ時代の写真',
  },
  now: {
    no: 'PHOTO 06',
    src: 'images/story-now.webp',
    alt: '現在の事業活動の様子',
    keyword: 'BUILDING',
    ratio: [4, 3],
    hint: '現在の事業活動の写真',
  },
  hobby: {
    no: 'PHOTO 07',
    src: 'images/personal-hobby.webp',
    alt: 'オフの時間の様子',
    keyword: 'OFF THE CLOCK',
    ratio: [4, 3],
    hint: '趣味・オフの写真',
  },
};

/** ---------- ヘッダー ---------- */
export const nav = {
  ctaLabel: '一度話してみる',
  links: [
    { label: 'NOW', href: '#now' },
    { label: 'STORY', href: '#story' },
    { label: 'TALK', href: '#session' },
  ],
};

/** ---------- HERO ---------- */
export const hero = {
  eyebrow: 'DAIKI TOGE / 26',
  headline: '遠回りした分、\n<em>使えるものが増えた。</em>',
  sub: '営業会社、不動産、コールセンター、そして複数の新規事業。\n26歳の今、事業で生まれたものを次の事業へ再投資しています。',
  body: [
    '1年0契約だった営業マンから、\n7つ以上の現場で営業1位、独立、法人化へ。',
    '僕の経験、仕事、人脈の中に、\nあなたの目標に使えるものがあれば使ってください。',
  ],
  ctaLabel: '一度、作戦会議する',
  ctaSecondary: '起業するか決めていなくても大丈夫です。',
  microcopy: '20代中心 / 無料 / オンライン',
};

/** ---------- HERO PROOF（実績数字） ----------
 *  number は数字、prefix / suffix は「約」「件」などの単位。
 *  数字が無いもの（上場企業・0→1）は number だけに文字を入れる。
 *  label は「その数字が何なのか」を、専門用語を使わずに説明する。
 */
export const proof = [
  {
    number: '7',
    countTo: 7,
    suffix: '現場で1位',
    label: '東京電力、ソフトバンクなど、\n大手の営業現場で売上1位をとった数。',
  },
  {
    number: '25',
    countTo: 25,
    suffix: '歳で起業',
    label: '会社員をやめて独立し、\n同じ年に株式会社Salesaurusを設立。',
  },
  {
    number: '上場企業',
    label: '東証プライム上場企業や\nその関連会社とも取引しています。',
  },
  {
    number: '80',
    countTo: 80,
    suffix: '名+',
    label: 'これまで一緒に働いてもらった人の数。\n今いるメンバーは、ほぼ全員が誰かからの紹介です。',
  },
  {
    number: '50',
    countTo: 50,
    suffix: '社+',
    label: 'これまで営業を手伝ってきた会社の数。',
  },
  {
    prefix: '約',
    number: '500',
    countTo: 500,
    suffix: '件/月',
    label: '今、会社として毎月つくっている\n商談アポイントの数。',
  },
  {
    prefix: '約',
    number: '200',
    countTo: 200,
    suffix: '件',
    label: '独立してすぐ、10日間でとった\n商談アポイントの数。',
  },
  {
    number: '10,000',
    countTo: 10000,
    suffix: '回超',
    label: '大東建託で6,000回超、東京電力で4,000回超。\n飛び込みで回った会社の数。\n最初の1年は、契約0件でした。',
  },
  {
    number: '500',
    countTo: 500,
    suffix: '件',
    label: '営業の電話で、1日にかけた最多の数。',
  },
  {
    number: '0→1',
    label: 'SNS（X）の運用コンサルで、\n看護師の方の広告収入をゼロから支援。',
  },
];

/** ---------- NOW（今つくっているもの） ---------- */
export const projects = {
  eyebrow: "WHAT I'M BUILDING",
  headline: '今、こんなことを\nつくっています。',
  intro: '営業支援の事業から始まり、不動産、コールセンターへ。\n今は一つの会社だけに閉じず、複数の事業を仲間とつくっています。',
  cards: [
    {
      label: '01 / SALES',
      title: '株式会社Salesaurus',
      body: [
        '営業代行・営業コンサル・BPOを中心に、\n企業の「売上をつくる」を実行まで支援。',
        '10日間で約200アポを創出した案件をはじめ、\n現在は毎月約500件のアポイント創出を支援しています。',
      ],
      stat: '50社+ 取引実績',
    },
    {
      label: '02 / REAL ESTATE',
      title: '不動産売買',
      body: [
        '尊敬できる事業家との出会いをきっかけにスタート。',
        '営業とは別の事業の柱として取り組み、\n現在は次の展開をつくっています。',
        'ここが軌道に乗ったことで、\n次の事業に回せるお金と時間ができました。',
      ],
    },
    {
      label: '03 / CALL CENTER',
      title: 'コールセンター事業',
      body: [
        '事業売却を経験した事業家と共同で、\nコールセンター事業の拠点を全国に持っています。',
        '拠点勤務だけでなく、\n在宅を中心に働くメンバーもいる体制をつくっています。',
      ],
    },
    {
      label: '04 / MARKETING',
      title: 'SNS・マーケティング支援',
      body: [
        '自分のSNSでマネタイズしてきた経験をもとに、\n発信や集客の相談にも乗っています。',
        'Xの運用コンサルでは、\n看護師の方の広告収益化を支援。\n今も別商材での収益化に伴走しています。',
      ],
    },
    {
      label: '05 / NEW VENTURES',
      title: '次の事業',
      body: [
        '今ある事業で生まれたキャッシュや経験を、\n次の事業へ。',
        '現在も数名の事業家・パートナーと、\n複数の新規事業を準備しています。',
      ],
      badge: 'COMING NEXT',
      next: true,
      wide: true,
    },
  ],
};

/** ---------- STORY TRANSITION（ダーク切り替え） ---------- */
export const storyIntro = {
  headline: 'でも、\n最初からこんな感じ\nだったわけじゃない。',
  sub: 'むしろ、かなり遠回りしています。',
  photo: 'salesEra',
};

/** ---------- STORY（タイムライン） ---------- */
export const story = {
  eyebrow: 'STORY',
  steps: [
    {
      meta: ['新卒', '大東建託'],
      large: '6,000回飛び込んで、\n契約は0件。',
      body: [
        '不動産営業として社会人をスタート。\n約1年間、飛び込み営業を続けましたが契約は0。',
        '今振り返ると、努力以前に、\n努力の仕方が分かっていませんでした。',
      ],
    },
    {
      meta: ['転職', '東京電力'],
      large: 'やり方を変えたら、\n結果が変わった。',
      body: [
        '大東建託で身につけた基礎に加え、\n上司のやり方を徹底的に真似し、\n人の2倍動くことを意識。',
        '飛び込みはここでも続けて、4,000回超。\n大東建託の6,000回超と合わせて、1万回を超えました。',
        '初月47人中2位。\nその後、新サービスで1位を獲得しました。',
      ],
    },
    {
      meta: ['SOFTBANK'],
      large: '1日500件、\n電話した日もある。',
      body: [
        '初めてのテレアポでは、\n最初の3日間は0件。',
        '自分と上位メンバーの録音を何度も聞き、\n話し方まで徹底的にコピー。',
        '2ヶ月目には約40人中1位になりました。',
      ],
      photo: 'working',
    },
    {
      meta: ['DOWN'],
      large: 'うまくいかない時期も、\nちゃんとあった。',
      body: [
        '環境を変えて挑戦したものの、\n2024年の年収は約150万円。',
        '仕事も人のマネジメントも、\n思うようにいかない時期が続きました。',
      ],
    },
    {
      meta: ['RESTART'],
      large: '結局、\n得意な営業からやり直した。',
      body: [
        '様々な業界で約30商材を経験。',
        '改善を繰り返しながら、\n合計7つ以上の現場で営業1位や\nトップクラスの成果を残しました。',
      ],
    },
    {
      meta: ['GERMANY'],
      large: '次は、\nドイツに行った。',
      body: [
        '日本企業の仕事を続けながらドイツへ。',
        '営業だけでなく、\n採用、経理、業務設計、マネジメントなど、\n会社を動かすための仕事を幅広く経験しました。',
      ],
      photo: 'germany',
    },
    {
      meta: ['2025', 'INDEPENDENT'],
      large: 'もう会社員じゃなくていい。',
      body: [
        '2025年4月、Salesaurusとして開業。',
        '同年10月、\n株式会社Salesaurusとして法人化しました。',
      ],
    },
    {
      meta: ['NOW'],
      large: '営業マンから、\n事業をつくる側へ。',
      body: [
        '営業支援だけではなく、\n不動産、コールセンター、\nそして複数の新規事業へ。',
        'まだ完成したとは全く思っていません。\nむしろ、ここからです。',
      ],
      photo: 'now',
      current: true,
    },
  ],
};

/** ---------- PHILOSOPHY ---------- */
export const philosophy = {
  eyebrow: 'HOW I THINK',
  headline: '結果は、\n行動のあとについてくる。',
  statements: [
    {
      no: '01',
      title: 'まず、型を借りる。',
      body: ['最初から我流でやるより、\nできている人を徹底的に真似する。\n結果が出てから、自分なりに変えればいい。'],
    },
    {
      no: '02',
      title: '信用を先に積む。',
      body: ['能力だけで仕事は続かない。\n「またこの人とやりたい」と思ってもらえる仕事を残す。'],
    },
    {
      no: '03',
      title: '考えたら、動く。',
      body: [
        '完璧な準備を待つより、\n動いて、失敗して、直す。',
        '僕自身、それを繰り返してここまで来ました。',
      ],
    },
  ],
};

/** ---------- USE ME（このLPの中心） ---------- */
export const useMe = {
  eyebrow: 'USE WHAT I HAVE',
  headline: '僕が持っているものは、\n使ってください。',
  body: [
    '営業の経験。\n事業の現場。\n仕事や案件。\n経営者との繋がり。\nそして、うまくいかなかった経験。',
    'あなたの目標に使えそうなものがあれば、\n出し惜しみするつもりはありません。',
    '逆に、\n「これ、一緒にやったら面白そう」\nと思ったら僕から声をかけるかもしれません。',
    '正直、今は営業支援や人材の会社をやっているというより、\n仲の良い人から「この人に合う仕事を見つけてあげたい」と\n声をかけてもらって、その人に合う仕事を渡している感覚です。',
    '今いるメンバーも、ほとんどが誰かからの紹介です。',
    '先生と生徒ではなく、\nお互いに前に進める関係が理想です。',
  ],
  tags: ['独立の作戦', '副業の入口', '営業・集客', '仕事・働き方', '人の紹介', '協業', '新規事業'],
  ctaLabel: '一度、作戦会議する',
};

/** ---------- FOR YOU ---------- */
export const forYou = {
  eyebrow: 'MAYBE FOR YOU',
  headline: 'こんなことを考えているなら、\n一度話しましょう。',
  items: [
    'いつか起業・独立したい',
    'まずは副業から始めたい',
    'もっと実力をつけたい',
    '収入の柱を増やしたい',
    '営業や集客を強くしたい',
    '働き方を変えたい',
    '自分の事業を伸ばしたい',
    '経営者や事業家と繋がりたい',
    '何をしたらいいか分からない',
    '何か一緒につくってみたい',
  ],
  note: '全部当てはまらなくても大丈夫です。\n\n「今のままではなんとなく嫌」\nくらいからでも話せます。',
};

/** ---------- SESSION（話す流れ） ---------- */
export const session = {
  eyebrow: '30 MIN? 60 MIN? JUST TALK.',
  headline: '起業するか、\nまだ決めてなくていい。',
  body: [
    'いきなり会社を辞める必要も、\nすぐに事業を始める必要もありません。',
    'まずは今どこにいて、\nどこへ行きたいのかを整理する。',
    'そこから、\n次にやることを一緒に考えます。',
  ],
  photo: 'talking',
  steps: [
    {
      no: 'STEP 01',
      title: 'いまを知る',
      body: '仕事、収入、得意なこと、\n困っていることを聞きます。',
    },
    {
      no: 'STEP 02',
      title: '行き先を決める',
      body: '1〜3年後、\nどうなっていたいかを一緒に整理します。',
    },
    {
      no: 'STEP 03',
      title: '次の一手を決める',
      body: '副業、営業、転職、独立、事業、人脈。\n\n選択肢の中から、\n今やることを一つ決めます。',
    },
  ],
  microcopy: '僕の周りに使える選択肢があれば紹介します。\n合うものがなければ、無理に何かを勧めることはありません。',
  ctaLabel: '一度、作戦会議する',
};

/** ---------- WHY IT'S FREE（無料の理由） ---------- */
export const whyFree = {
  eyebrow: "WHY IT'S FREE",
  headline: 'なんで無料でやるのか。',
  reasons: [
    {
      no: '01',
      title: '一緒にやる人を探しているから',
      body: '話してみて「この人と組みたい」と思ったら、\n仕事や案件を一緒にやることがあります。\n僕にとっては、仲間を探す時間でもあります。',
    },
    {
      no: '02',
      title: '自分が遠回りしたから',
      body: '20代前半、相談できる人がいませんでした。\nその分、無駄にした時間があります。',
    },
    {
      no: '03',
      title: '今すぐお金にならなくていいから',
      body: '信用が残れば、それでいいと思っています。\n先に渡しておくほうが、結局うまくいく。',
    },
  ],
  note: 'その場で何かを売り込むことはありません。\n個人向けの有料講座やコミュニティもやっていません。',
};

/** ---------- PERSONAL（仕事以外） ---------- */
export const personal = {
  eyebrow: 'OFF THE CLOCK',
  headline: '仕事の話じゃなくても、\n全然大丈夫です。',
  body: [
    '人と話したり、\n一緒に遊んだりするのも好きです。',
    '仕事の相談からじゃなく、\n趣味から仲良くなるのも大歓迎です。',
  ],
  hobbies: [
    { emoji: '🏓', label: '卓球' },
    { emoji: '🎯', label: 'ダーツ' },
    { emoji: '🎱', label: 'ビリヤード' },
    { emoji: '🎳', label: 'ボウリング' },
    { emoji: '🎮', label: 'ゲーム' },
  ],
  photo: 'hobby',
};

/** ---------- FINAL CTA ---------- */
export const finalCta = {
  small: "THAT'S ENOUGH ABOUT ME.",
  headline: '僕の話は、\nこのくらいで。',
  large: '次は、\nあなたの話を\n聞かせてください。',
  body: [
    'まだ目標が決まっていなくても大丈夫です。',
    '話してみて、\n一緒に何かできそうならその時考えましょう。',
  ],
  ctaLabel: '峠と話してみる',
  microcopy: '無料 / オンライン / LINEで一言送るだけ',
  microcopyNote: '合う合わないもあると思うので、まずは話せたら嬉しいです。',
};

/** ---------- スマホ固定CTA ---------- */
export const stickyCta = {
  label: '峠と話してみる',
};

/** ---------- フッター ---------- */
export const footer = {
  links: [
    { label: 'Salesaurus', key: 'salesaurus' },
    { label: 'note', key: 'note' },
    { label: 'Threads', key: 'threads' },
  ],
  copyright: '© DAIKI TOGE',
};

/** ---------- SEO / OGP ---------- */
export const seo = {
  title: '峠大輝｜26歳、事業をつくる。',
  description:
    '株式会社Salesaurus代表・峠大輝。飛び込み営業1万回、7つ以上の営業現場で1位を経験し、25歳で独立・法人化。現在は営業支援、不動産、コールセンター、新規事業に取り組んでいます。起業・独立・仕事・事業について、20代を中心に無料で壁打ちしています。',
  ogTitle: '遠回りした分、使えるものが増えた。｜峠大輝',
  ogDescription: '26歳。営業会社、不動産、コールセンター、そして次の事業へ。',
};
