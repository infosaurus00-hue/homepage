# -*- coding: utf-8 -*-
"""OGP画像（1200x630）を「写真＋名前＋短いコピー」から生成するテンプレート。

使い方:
    python3 tools/build_og.py

コピーを変えたいときは下の TEXT を編集して再実行。
写真を変えたいときは PHOTO のパスを差し替える（AI生成画像は使用しない）。
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PHOTO = ROOT / "images" / "daiki-hero.jpg"
OUT = ROOT / "images" / "og.jpg"

W, H = 1200, 630
BG = "#F7F7F4"
TEXT_COLOR = "#121416"
SUB_COLOR = "#62676D"
BRAND = "#5F7284"
BORDER = "#E3E5E5"

TEXT = {
    "copy": ["遠回りした分、", "使えるものが増えた。"],
    "name_ja": "峠 大輝",
    "name_en": "DAIKI TOGE",
    "role": "Entrepreneur / Salesaurus Inc.",
    "sub": "26歳。営業会社、不動産、コールセンター、そして次の事業へ。",
}

FONT_BOLD = "/System/Library/Fonts/ヒラギノ角ゴシック W7.ttc"
FONT_HEAVY = "/System/Library/Fonts/ヒラギノ角ゴシック W8.ttc"
FONT_MED = "/System/Library/Fonts/ヒラギノ角ゴシック W4.ttc"


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def main():
    canvas = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(canvas)

    # 右側：写真（縦長を右カラムにトリミング配置）
    photo_w = 430
    if PHOTO.exists():
        im = ImageOps.exif_transpose(Image.open(PHOTO).convert("RGB"))
        ratio = max(photo_w / im.width, H / im.height)
        im = im.resize((int(im.width * ratio), int(im.height * ratio)), Image.LANCZOS)
        left = (im.width - photo_w) // 2
        im = im.crop((left, 0, left + photo_w, H))
        canvas.paste(im, (W - photo_w, 0))
    else:
        draw.rectangle([W - photo_w, 0, W, H], fill="#EFF3F5")

    # 左側：テキスト
    x = 72
    draw.text((x, 78), TEXT["name_en"], font=font(FONT_MED, 26), fill=BRAND)
    y = 140
    f_copy = font(FONT_HEAVY, 66)
    for line in TEXT["copy"]:
        draw.text((x, y), line, font=f_copy, fill=TEXT_COLOR)
        y += 84
    y += 26
    draw.line([(x, y), (x + 56, y)], fill=BRAND, width=3)
    y += 34
    draw.text((x, y), TEXT["sub"], font=font(FONT_MED, 23), fill=SUB_COLOR)
    y += 62
    draw.text((x, y), TEXT["name_ja"], font=font(FONT_BOLD, 34), fill=TEXT_COLOR)
    draw.text((x + 130, y + 12), TEXT["role"], font=font(FONT_MED, 20), fill=SUB_COLOR)

    canvas.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"✓ {OUT.relative_to(ROOT)}  {OUT.stat().st_size/1024:.0f} KB")


if __name__ == "__main__":
    main()
