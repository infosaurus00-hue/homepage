# -*- coding: utf-8 -*-
"""Heroポートレートの書き出し（WebP + JPEGフォールバック）

使い方:
    python3 tools/build_images.py [元画像パス]

元画像は「峠大輝本人の実写」を指定すること（AI生成画像は使用しない）。
差し替える場合は同じコマンドを再実行するだけでOK。
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / "images" / "profile-daiki.jpg"
OUT_W, OUT_H = 1200, 1600          # 3:4
JPG_W, JPG_H = 900, 1200

def main():
    im = Image.open(SRC).convert("RGB")
    im = ImageOps.exif_transpose(im)
    # 3:4 にトリミング（上寄せ：顔が切れないように）
    target_ratio = OUT_W / OUT_H
    w, h = im.size
    if w / h > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        im = im.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = min(int(h * 0.02), max(h - new_h, 0))
        im = im.crop((0, top, w, top + new_h))

    webp = im.resize((OUT_W, OUT_H), Image.LANCZOS)
    webp.save(ROOT / "images" / "daiki-hero.webp", "WEBP", quality=80, method=6)

    jpg = im.resize((JPG_W, JPG_H), Image.LANCZOS)
    jpg.save(ROOT / "images" / "daiki-hero.jpg", "JPEG", quality=80, optimize=True, progressive=True)

    for f in ("daiki-hero.webp", "daiki-hero.jpg"):
        p = ROOT / "images" / f
        print(f"✓ {f}  {p.stat().st_size/1024:.0f} KB")

if __name__ == "__main__":
    main()
