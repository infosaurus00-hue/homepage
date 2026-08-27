/* スクロールで fade + translateY させるための属性を返す。
   実際の発火は js/app.js の IntersectionObserver。
   prefers-reduced-motion 時は CSS 側で無効化される。 */
export const reveal = (delay = 0) => ` data-reveal${delay ? ` style="--reveal-delay:${delay}ms"` : ''}`;

export default reveal;
