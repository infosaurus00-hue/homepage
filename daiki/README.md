# 峠大輝 パーソナルLP（/daiki/）

SNS（Threads等）からの流入を「一度、峠と話してみる」（個人用公式LINE）へつなぐ個人LP。
静的HTML（コーポレートサイトと同じNetlify配信）で、`index.html` はビルドで生成します。

## 編集のしかた

| やりたいこと | 編集するファイル |
|---|---|
| 文章・数字・タグ・タイムラインの内容 | `content/daiki.js` |
| LINEのURL・外部リンク・GA4・OG画像 | `config/site.js` |
| 写真の差し替え | `images/` にファイルを置く（下記） |
| 見た目（色・余白・文字） | `css/style.css`（冒頭の `:root` が色の定義） |
| 動き | `js/app.js` |

編集したら、必ず再ビルド：

```bash
node build/build.mjs      # → index.html を生成
```

ローカル確認：

```bash
cd ..                     # homepage/ へ
python3 -m http.server 8912
# http://localhost:8912/daiki/
```

## 写真の差し替え

`content/daiki.js` の `photos` に定義された `src` のパスにファイルを置いて再ビルドするだけです。
写真がまだ無い枠は、ブランド色＋恐竜の足跡＋英字キーワードの「仮ビジュアル」を表示します
（未完成に見えないようにするためのもの。人物のAI生成画像は使いません）。
どの枠が未設定かは `node build/build.mjs` の実行ログに出ます。

| 枠 | 置くファイル | 内容 |
|---|---|---|
| PHOTO 01 | `images/daiki-hero.webp` / `.jpg` | Heroポートレート（設定済み） |
| PHOTO 02 | `images/story-sales-era.webp` | 営業時代／若い頃 |
| PHOTO 03 | `images/story-working.webp` | 仕事中の自然な写真 |
| PHOTO 04 | `images/session-talking.webp` | 人と話している写真 |
| PHOTO 05 | `images/story-germany.webp` | ドイツ時代 |
| PHOTO 06 | `images/story-now.webp` | 現在の事業活動 |
| PHOTO 07 | `images/personal-hobby.webp` | 趣味・オフ |

※ 人物写真はすべて本人の実写のみ。AI生成の人物画像は使用しない。

Heroポートレートを別の写真に差し替える場合：

```bash
python3 tools/build_images.py /path/to/新しい写真.jpg   # webp + jpg を書き出し
python3 tools/build_og.py                              # OGP画像も作り直す
```

## 計測

- GA4：`G-MQVRG5NZHJ`（コーポレートサイトと共通）
- CTAクリック：イベント名 `personal_lp_cta_click`
  - パラメータ `location` = `header` / `hero` / `use_me` / `session` / `final` / `sticky`

## ファイル構成

```
daiki/
  index.html            ← 生成物（直接編集しない）
  content/daiki.js      ← 本文・数字・写真定義
  config/site.js        ← URL・GA4・外部リンク
  build/
    build.mjs           ← ビルド実行
    layout.js           ← <head> と全体の枠
    utils.js
    components/         ← セクションごとの部品
  css/style.css
  js/app.js
  images/
  tools/
    build_images.py     ← Heroポートレート書き出し
    build_og.py         ← OGP画像生成
```
