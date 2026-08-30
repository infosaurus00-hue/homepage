# -*- coding: utf-8 -*-
"""写真をLPの枠に合わせて書き出す。

使い方:
    python3 tools/add_photo.py <元画像> <枠キー> [--top 0.0〜1.0]

    枠キー: salesEra / working / talking / germany / now / hobby
    --top : トリミングの縦位置（0=上寄せ, 0.5=中央, 1=下寄せ。既定 0.35）

例:
    python3 tools/add_photo.py ~/Downloads/IMG_6717.JPG working --top 0.3

書き出し後に  node build/build.mjs  を実行すると、プレースホルダーが写真に差し替わります。
※ 人物のAI生成画像は使わない。実写のみ。
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent

# content/daiki.js の photos と対応（ファイル名・アスペクト比）
SLOTS = {
    "salesEra": ("story-sales-era.webp", (4, 5)),
    "working":  ("story-working.webp",   (4, 3)),
    "talking":  ("session-talking.webp", (4, 3)),
    "germany":  ("story-germany.webp",   (4, 3)),
    "now":      ("story-now.webp",       (4, 3)),
    "hobby":    ("personal-hobby.webp",  (4, 3)),
}
LONG_EDGE = 1400  # 書き出しの長辺


def main():
    if len(sys.argv) < 3 or sys.argv[2] not in SLOTS:
        print(__doc__)
        print("枠キー:", ", ".join(SLOTS))
        sys.exit(1)

    src = Path(sys.argv[1]).expanduser()
    name, (rw, rh) = SLOTS[sys.argv[2]]
    top = 0.35
    if "--top" in sys.argv:
        top = float(sys.argv[sys.argv.index("--top") + 1])

    im = ImageOps.exif_transpose(Image.open(src).convert("RGB"))
    w, h = im.size
    target = rw / rh

    if w / h > target:                      # 横に広い → 左右をカット
        new_w = int(h * target)
        left = int((w - new_w) * 0.5)
        im = im.crop((left, 0, left + new_w, h))
    else:                                   # 縦に長い → 上下をカット
        new_h = int(w / target)
        offset = int((h - new_h) * top)
        im = im.crop((0, offset, w, offset + new_h))

    if im.width > LONG_EDGE:
        im = im.resize((LONG_EDGE, int(LONG_EDGE * im.height / im.width)), Image.LANCZOS)

    out = ROOT / "images" / name
    im.save(out, "WEBP", quality=82, method=6)
    print(f"✓ {out.relative_to(ROOT)}  {im.width}x{im.height}  {out.stat().st_size/1024:.0f} KB")
    print("  → node build/build.mjs を実行してください")


if __name__ == "__main__":
    main()
