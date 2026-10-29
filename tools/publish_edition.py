#!/usr/bin/env python3
"""Turn a reviewed edition of The 24 into a public HoopThink page and update the site source.

Usage:
  python3 -I publish_edition.py --root DEPLOY_DIR --edition EDITION.html --date 2026-10-28 --no 002 \
      --headline "Headline." --kicker "The Game · City" --plus "Plus: ..." \
      --cards CARDS_DIR --fonts FONTSOURCE_NODE_MODULES_DIR

DEPLOY_DIR holds netlify.toml and site/. CARDS_DIR holds the-24-NNN-number.png and the-24-NNN-scores.png.
Writes site/the-24/<date>/index.html (+cards, banner), updates the homepage card and site/the-24/index.html.
"""
import argparse, datetime, html, os, re, shutil, sys

ap = argparse.ArgumentParser()
for a in ["root", "edition", "date", "no", "headline", "kicker", "plus", "cards", "fonts"]:
    ap.add_argument("--" + a, required=True)
ap.add_argument("--weekend", action="store_true")
A = ap.parse_args()

site = os.path.join(A.root, "site")
d = datetime.date.fromisoformat(A.date)
mon = d.strftime("%b")
mon_dot = {1:"Jan.",2:"Feb.",3:"March",4:"April",5:"May",6:"June",7:"July",8:"Aug.",9:"Sept.",10:"Oct.",11:"Nov.",12:"Dec."}[d.month]
label_date = f"{mon_dot} {d.day}, {d.year}"            # Oct. 27, 2026
dow = d.strftime("%a")                                  # Tue
slug = A.date
out_dir = os.path.join(site, "the-24", slug)
os.makedirs(os.path.join(out_dir, "cards"), exist_ok=True)
H = html.escape

# 1. cards
for kind in ("number", "scores"):
    src = os.path.join(A.cards, f"the-24-{A.no}-{kind}.png")
    if os.path.exists(src):
        shutil.copy(src, os.path.join(out_dir, "cards", os.path.basename(src)))

# 2. banner (1600x900) for homepage card + link previews
banner = os.path.join(out_dir, "cards", f"the-24-{A.no}-banner.jpg")
F = os.path.abspath(A.fonts)
bhtml = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:BS;src:url(file://{F}/@fontsource/big-shoulders-display/files/big-shoulders-display-latin-900-normal.woff2);font-weight:900}}
@font-face{{font-family:BS;src:url(file://{F}/@fontsource/big-shoulders-display/files/big-shoulders-display-latin-800-normal.woff2);font-weight:800}}
@font-face{{font-family:NR;src:url(file://{F}/@fontsource/newsreader/files/newsreader-latin-600-normal.woff2);font-weight:600}}
@font-face{{font-family:PM;src:url(file://{F}/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2);font-weight:400}}
body{{margin:0}}
.b{{width:1600px;height:900px;background:#101214;color:#E5E7E9;box-sizing:border-box;padding:84px 96px;display:flex;flex-direction:column}}
.top{{display:flex;justify-content:space-between;align-items:center;border-bottom:3px double #E5E7E9;padding-bottom:26px}}
.mark{{display:flex;align-items:center;gap:20px;font-family:BS;font-weight:900;font-size:96px;line-height:.85;text-transform:uppercase}}
.clk{{background:#07080A;color:#FFB21C;padding:8px 16px 0;border-radius:6px;text-shadow:0 0 20px rgba(255,178,28,.5);box-shadow:inset 0 0 0 2px rgba(255,178,28,.15)}}
.d{{font-family:BS;font-weight:800;font-size:34px;letter-spacing:.14em;text-transform:uppercase;color:#B4B9BF;text-align:right;line-height:1.25}}
.k{{font-family:BS;font-weight:800;font-size:36px;letter-spacing:.18em;text-transform:uppercase;color:#F0AE35;margin-top:64px}}
h1{{font-family:NR;font-weight:600;font-size:{96 if len(A.headline) > 44 else 112}px;line-height:1.02;margin:18px 0 0;max-width:1320px}}
.s{{font-family:PM;font-size:32px;color:#B4B9BF;margin-top:auto}}
</style></head><body><div class="b" id="b">
<div class="top"><div class="mark"><span>The</span><span class="clk">24</span></div><div class="d">{dow} · {mon} {d.day}, {d.year}<br>{'HoopThink Weekend' if A.weekend else 'HoopThink Daily'}</div></div>
<div class="k">{H(A.kicker)}</div><h1>{H(A.headline)}</h1><div class="s">{H(A.plus)}</div></div></body></html>"""
tmp = os.path.join(A.root, "_banner.html")
open(tmp, "w", encoding="utf-8").write(bhtml)
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1600, "height": 900})
    pg.goto("file://" + os.path.abspath(tmp)); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(400)
    png = banner[:-4] + ".png"; pg.locator("#b").screenshot(path=png); b.close()
from PIL import Image
Image.open(png).convert("RGB").save(banner, quality=88); os.remove(png); os.remove(tmp)

# 3. public edition page
s = open(A.edition, encoding="utf-8").read()
s = re.sub(r'\s*<div class="desk" role="note">.*?</div>\n', "\n", s, count=1, flags=re.S)
s = re.sub(r'\s*<!-- SOCIAL PACK -->.*?</section>\n', "\n", s, count=1, flags=re.S)
s = re.sub(r'<a href="#social-pack">Social Pack</a>', "", s)
s = re.sub(r"<script>.*?</script>\s*", "", s, flags=re.S)
s = re.sub(r"Edition No\. (\d+) · Pilot", r"Edition No. \1", s)
s = s.replace('href="https://hoopthink.net" target="_blank" rel="noopener">hoopthink.net</a>', 'href="/#get">hoopthink.net</a>')
s = re.sub(r"<title>.*?</title>", "", s, count=1, flags=re.S)
s = s.replace('<meta name="claude:viewport-fit-sides" content="cover">', "")
links = "".join(re.findall(r"<link [^>]*>\n?", s)); s = re.sub(r"<link [^>]*>\n?", "", s)
m = re.search(r"<style>.*?</style>", s, flags=re.S); style = m.group(0); s = s.replace(style, "", 1)
# card images: point at this edition's cards folder
if "<div class=\"page\">" not in s:
    sys.exit("edition HTML has no <div class=\"page\"> wrapper; template changed")
s = s.replace('<div class="page">', '<div class="page">\n  <nav class="sitebar" aria-label="Site"><a href="/">← Hoop Think</a><a class="cta" href="/#get">Get the Briefing</a></nav>', 1)
url = f"https://hoopthink.net/the-24/{slug}/"
title_name = ("The 24 Weekend, " if A.weekend else "The 24, ") + label_date
desc = f"{A.headline} {A.plus} The 24, HoopThink's daily basketball digest from The Westview Group."
head = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{H(title_name)} | Hoop Think</title>
<meta name="description" content="{H(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article">
<meta property="og:url" content="{url}">
<meta property="og:title" content="The 24: {H(A.headline)}">
<meta property="og:description" content="{H(desc)}">
<meta property="og:image" content="https://hoopthink.net/the-24/{slug}/cards/the-24-{A.no}-banner.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="author" content="The Westview Group">
<link rel="icon" type="image/png" href="/img/favicon.png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
{links}{style}
<style>
:root{{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}
body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}
.sitebar{{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;font-family:var(--f-display);font-weight:800;font-size:15px;letter-spacing:.14em;text-transform:uppercase;padding-bottom:14px;margin-bottom:18px;border-bottom:1px solid var(--rule)}}
.sitebar a{{text-decoration:none;color:var(--ink)}}.sitebar a.cta{{color:var(--clock)}}
</style>
</head>
<body>
"""
pub = head + s.strip() + "\n</body>\n</html>\n"
for bad in ("NOT FOR PUBLICATION", "Social Pack", "data-copy"):
    if bad in pub:
        sys.exit(f"public page still contains '{bad}'; fix the edition HTML")
open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8").write(pub)

# 4. homepage card
img = f"/the-24/{slug}/cards/the-24-{A.no}-banner.jpg"
alt = H(f"{title_name}: {A.headline}")
home_card = f"""      <!-- THE24:HOME:START -->
      <a class="card" href="/the-24/{slug}/">
        <img src="{img}" alt="{alt}" width="1600" height="900" loading="lazy">
        <div>
          <p class="label">The 24 · {'Weekend' if A.weekend else 'Today'}</p>
          <h2>{H(A.headline)}</h2>
          <p>Everything that happened in basketball in the last 24 hours, read the way a scout reads it.</p>
          <span class="more">Read The 24 →</span>
        </div>
      </a>
      <!-- THE24:HOME:END -->
"""
hp = os.path.join(site, "index.html"); h = open(hp, encoding="utf-8").read()
h2, n = re.subn(r"      <!-- THE24:HOME:START -->.*?<!-- THE24:HOME:END -->\n", home_card, h, flags=re.S)
if n != 1: sys.exit("homepage markers not found")
open(hp, "w", encoding="utf-8").write(h2)

# 5. archive page
latest = f"""      <!-- THE24:LATEST:START -->
      <a class="card" href="/the-24/{slug}/">
        <img src="{img}" alt="{alt}" width="1600" height="900">
        <div>
          <p class="label">The 24 · Latest edition · {label_date}</p>
          <h2>{H(A.headline)}</h2>
          <p>Everything that happened in basketball in the last 24 hours, read the way a scout reads it. New editions every weekday morning, with a weekend edition on Mondays.</p>
          <span class="more">Read the edition →</span>
        </div>
      </a>
      <!-- THE24:LATEST:END -->"""
apath = os.path.join(site, "the-24", "index.html"); t = open(apath, encoding="utf-8").read()
t, n1 = re.subn(r"      <!-- THE24:LATEST:START -->.*?<!-- THE24:LATEST:END -->", latest, t, flags=re.S)
row = f'          <li><a href="/the-24/{slug}/"><b>No. {A.no} · {label_date}{" · Weekend" if A.weekend else ""}</b><span>{H(A.headline)}</span></a></li>\n'
if f'href="/the-24/{slug}/"><b>' in t:
    t = re.sub(rf'          <li><a href="/the-24/{slug}/">.*?</li>\n', row, t)
else:
    t = t.replace("          <!-- THE24:LIST:START -->\n", "          <!-- THE24:LIST:START -->\n" + row, 1)
if n1 != 1 or "THE24:LIST:START" not in t: sys.exit("archive markers not found")
open(apath, "w", encoding="utf-8").write(t)
print("OK", out_dir)
