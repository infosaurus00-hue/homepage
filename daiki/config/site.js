/* ============================================================
   siteConfig — 峠大輝 パーソナルLP
   URL・計測ID・CTA文言など「サイト全体の設定」はここだけを編集する。
   本文コピーは content/daiki.js 側。
   ============================================================ */

/** CTA遷移先：個人用公式LINE（ページ内のCTAはすべてこのURL） */
export const PERSONAL_LINE_URL = 'https://lin.ee/rnFXdlz';

export const siteConfig = {
  /** 公開URL（OG / canonical / 構造化データで使用） */
  siteUrl: 'https://sales-saurus.com/daiki/',

  /** GA4測定ID（コーポレートサイトと共通） */
  ga4Id: 'G-MQVRG5NZHJ',

  /** CTAクリック計測イベント名 */
  ctaEventName: 'personal_lp_cta_click',

  /** CTAの設置位置（gtagのlocationパラメータ値） */
  ctaLocations: ['hero', 'use_me', 'session', 'final', 'sticky', 'header'],

  /** 外部リンク */
  links: {
    salesaurus: 'https://sales-saurus.com/',
    note: 'https://note.com/daiki_toge',
    threads: 'https://www.threads.com/@daiki.saurus',
    // TODO: X / Instagram / YouTube を載せる場合はここにURLを追加し、
    //       content/daiki.js の footer.links に { label, key } を足す。
    //       URL未確定のものは追加しない（href="#" のリンクは作らない方針）。
  },

  /** OGP画像（tools/build_og.py で生成。差し替える場合は同じパスに上書き） */
  ogImage: 'images/og.jpg',
};

export default siteConfig;
