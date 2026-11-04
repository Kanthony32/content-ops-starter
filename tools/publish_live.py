#!/usr/bin/env python3
"""Publish approved HoopThink Live updates for one day and update the site source.

Usage:
  python3 -I publish_live.py --root DEPLOY_DIR --review REVIEW.html --date 2026-11-04 \
      --slots noon[,5pm] --fonts FONTSOURCE_NODE_MODULES_DIR

DEPLOY_DIR holds netlify.toml, site/ and tools/live/template.html.
REVIEW.html is the day's review artifact (any wrapper is fine; only the LIVE:ENTRIES block is used).
--slots lists every slot that is approved for today (already-posted ones included), e.g. "noon,5pm".
Writes site/live/<date>/index.html + live-banner.jpg, the homepage LIVE card (outside The 24's
markers) and site/live/index.html (archive). Refuses to write if anything looks unfinished.
"""
import argparse, datetime, html, json, os, re, sys

ap = argparse.ArgumentParser()
for a in ["root", "review", "date", "slots", "fonts"]:
    ap.add_argument("--" + a, required=True)
A = ap.parse_args()

ORDER = {"5pm": 2, "noon": 1}
TIMES = {"noon": "T12:00:00-05:00", "5pm": "T17:00:00-05:00"}
slots = [s.strip() for s in A.slots.split(",") if s.strip()]
if not slots or any(s not in ORDER for s in slots):
    sys.exit("--slots must be noon and/or 5pm")

root = os.path.abspath(A.root); site = os.path.join(root, "site")
d = datetime.date.fromisoformat(A.date); slug = A.date
mon_dot = {1:"Jan.",2:"Feb.",3:"March",4:"April",5:"May",6:"June",7:"July",8:"Aug.",9:"Sept.",10:"Oct.",11:"Nov.",12:"Dec."}[d.month]
label_date = f"{mon_dot} {d.day}, {d.year}"
long_date = d.strftime("%A, %B ") + str(d.day) + f", {d.year}"
H = html.escape

# 1. pieces from the template (CSS + font links)
tpl = open(os.path.join(root, "tools", "live", "template.html"), encoding="utf-8").read()
tpl = re.sub(r"<!--.*?-->", "", tpl, flags=re.S)
css = re.search(r'<style id="live-css">.*?</style>', tpl, re.S).group(0)
fontlinks = "".join(re.findall(r'<link rel="(?:preconnect|stylesheet)"[^>]*>\n', tpl))

# 2. approved update sections from the review copy
rv = open(A.review, encoding="utf-8").read()
m = re.search(r"<!-- LIVE:ENTRIES:START -->(.*?)<!-- LIVE:ENTRIES:END -->", rv, re.S)
if not m: sys.exit("review copy has no LIVE:ENTRIES markers")
found = {}
for sec in re.finditer(r'<section class="update" id="u-([a-z0-9]+)" data-slot="([a-z0-9]+)" data-time="([^"]+)">.*?</section>', m.group(1), re.S):
    found[sec.group(2)] = (sec.group(3), sec.group(0))
missing = [s for s in slots if s not in found]
if missing: sys.exit(f"approved slot(s) not in the review copy: {missing}")
keep = sorted(slots, key=lambda s: -ORDER[s])
feed = "\n".join(found[s][1] for s in keep)
heads = {s: re.sub(r"<[^>]+>", "", re.search(r'<div class="stamp">.*?<h2[^>]*>(.*?)</h2>', found[s][1], re.S).group(1)).strip() for s in keep}
newest = keep[0]; headline = html.unescape(heads[newest]); updated = found[newest][0]
for bad in ("NOT FOR PUBLICATION", "{{", "}}", 'class="desk"', "TODO", "TK "):
    if bad in feed: sys.exit(f"update text still contains '{bad}'; fix the review copy")

the24 = f"/the-24/{slug}/" if os.path.isdir(os.path.join(site, "the-24", slug)) else "/the-24/"
next_txt = "Live 24/5"

# 3. banner (1600x900)
out_dir = os.path.join(site, "live", slug); os.makedirs(out_dir, exist_ok=True)
banner = os.path.join(out_dir, "live-banner.jpg")
F = os.path.abspath(A.fonts)
bhtml = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:BS;src:url(file://{F}/@fontsource/big-shoulders-display/files/big-shoulders-display-latin-900-normal.woff2);font-weight:900}}
@font-face{{font-family:BS;src:url(file://{F}/@fontsource/big-shoulders-display/files/big-shoulders-display-latin-800-normal.woff2);font-weight:800}}
@font-face{{font-family:NR;src:url(file://{F}/@fontsource/newsreader/files/newsreader-latin-600-normal.woff2);font-weight:600}}
@font-face{{font-family:PM;src:url(file://{F}/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2);font-weight:400}}
body{{margin:0}}
.b{{width:1600px;height:900px;background:#101214;color:#E5E7E9;box-sizing:border-box;padding:84px 96px;display:flex;flex-direction:column}}
.top{{display:flex;justify-content:space-between;align-items:center;border-bottom:3px double #E5E7E9;padding-bottom:26px}}
.mark{{display:flex;align-items:center;gap:22px;font-family:BS;font-weight:900;font-size:92px;line-height:.85;text-transform:uppercase}}
.on{{display:flex;align-items:center;gap:14px;background:#07080A;color:#fff;font-size:62px;padding:10px 18px 4px;border-radius:6px}}
.on i{{width:22px;height:22px;border-radius:50%;background:#FF5A4A;box-shadow:0 0 20px #FF5A4A;margin-top:-6px}}
.d{{font-family:BS;font-weight:800;font-size:34px;letter-spacing:.14em;text-transform:uppercase;color:#B4B9BF;text-align:right;line-height:1.25}}
.k{{font-family:BS;font-weight:800;font-size:36px;letter-spacing:.18em;text-transform:uppercase;color:#FF5A4A;margin-top:64px}}
h1{{font-family:NR;font-weight:600;font-size:{92 if len(headline) > 44 else 108}px;line-height:1.03;margin:18px 0 0;max-width:1340px}}
.s{{font-family:PM;font-size:30px;color:#B4B9BF;margin-top:auto}}
</style></head><body><div class="b" id="b">
<div class="top"><div class="mark"><span>HoopThink</span><span class="on"><i></i>Live</span></div><div class="d">{d.strftime('%a')} · {d.strftime('%b')} {d.day}, {d.year}<br>Updated {H(updated)}</div></div>
<div class="k">Live · Updated {H(updated)}</div><h1>{H(headline)}</h1><div class="s">The whole basketball world · updated 24/5</div></div></body></html>"""
tmp = os.path.join(root, "_live_banner.html"); open(tmp, "w", encoding="utf-8").write(bhtml)
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1600, "height": 900})
    pg.goto("file://" + tmp); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(400)
    png = banner[:-4] + ".png"; pg.locator("#b").screenshot(path=png); b.close()
from PIL import Image
Image.open(png).convert("RGB").save(banner, quality=88); os.remove(png); os.remove(tmp)

# 4. public day page (court-concept design). Everything derived here comes from the approved entries only.
def _txt(x): return html.unescape(re.sub(r"<[^>]+>", "", x)).strip()
entries, used_ids, n_ent = [], set(), 0
def _entry(m):
    global n_ent
    n_ent += 1
    attrs, inner = m.group(2), m.group(3)
    kk = re.search(r'<p class="kicker">(.*?)</p>', inner, re.S); hh = re.search(r"<h3[^>]*>(.*?)</h3>", inner, re.S)
    kicker = _txt(kk.group(1)) if kk else ""; h3 = _txt(hh.group(1)) if hh else ""
    idm = re.search(r'\bid="([^"]+)"', attrs)
    if idm: eid = idm.group(1)
    elif kicker.upper().startswith("LAUNCH") and "launch" not in used_ids: eid = "launch"
    else: eid = f"e{n_ent}"
    used_ids.add(eid); entries.append((eid, kicker, h3))
    if not idm: attrs = f' id="{eid}"' + attrs
    return f'{m.group(1)}{attrs}>{inner}</article>'
feed = re.sub(r'(<article class="entry")([^>]*)>(.*?)</article>', _entry, feed, flags=re.S)
feed = re.sub(r'<ul class="slate"(?![^>]*\bid=)', '<ul class="slate" id="slate"', feed, count=1)
has_slate = 'id="slate"' in feed

ZONES = [
    ("01 / The Paint", "NBA", "The league, the moves, the results, from tip to final buzzer.", {"NBA", "G LEAGUE"}),
    ("02 / The Perimeter", "NCAA / WNBA", "College nights and the W\u2019s expanding world, outside and in.", {"NCAA", "NCAAM", "NCAAW", "WNBA", "COLLEGE"}),
    ("03 / The Baseline", "High School", "Where the next generation first learns the game\u2019s geometry.", {"HS", "HIGH SCHOOL", "GRASSROOTS", "PREP"}),
    ("04 / Half Court", "Intl / Culture", "The global game, business, economics, and what it all means.", {"INTL", "INTERNATIONAL", "CULTURE", "BUSINESS", "IN THE NEWS"}),
]
zone_html = ""
for zn, zt, zd, keys in ZONES:
    hits = [e for e in entries if e[1].split("\u00b7")[0].strip().upper() in keys]
    inner = f'<span class="n">{H(zn)}</span><h3>{H(zt)}</h3><p>{zd}</p>'
    if hits:
        st = f'{len(hits)} {"story" if len(hits) == 1 else "stories"} today \u2192'
        zone_html += f'        <li><a class="zone" href="#{hits[0][0]}">{inner}<span class="st">{st}</span></a></li>\n'
    else:
        zone_html += f'        <li><div class="zone idle">{inner}<span class="st">Nothing posted yet today</span></div></li>\n'

tick = "".join(f"<b>{H(k)}</b>{H(t)}<i>\u2022</i>" for _, k, t in entries)
tick_html = f"<span>{tick}</span>\n      <span>{tick}</span>"
cta1 = ('See the slate', '#slate') if has_slate else ('Jump to the feed', '#feed')
cta2 = ('What is Live?', '#launch') if "launch" in used_ids else ("Read this morning\u2019s The 24", the24)
hero_alt = "A hardwood basketball court seen from above, with the Hoop Think brain-and-basketball logo painted at center court and the Hoop Think wordmark in the key."

url = f"https://hoopthink.net/live/{slug}/"
desc = f"{headline.rstrip('.!?: ')}. HoopThink Live: the whole basketball world, all day, from The Westview Group."
ld = {"@context": "https://schema.org", "@type": "LiveBlogPosting", "headline": f"HoopThink Live, {label_date}",
      "url": url, "datePublished": slug + TIMES[keep[-1]], "dateModified": slug + TIMES[newest],
      "coverageStartTime": slug + "T07:00:00-05:00", "coverageEndTime": slug + "T19:00:00-05:00",
      "author": {"@type": "Organization", "name": "The Westview Group"},
      "image": f"https://hoopthink.net/live/{slug}/live-banner.jpg",
      "liveBlogUpdate": [{"@type": "BlogPosting", "headline": html.unescape(heads[s]), "datePublished": slug + TIMES[s]} for s in keep]}
page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>HoopThink Live, {H(label_date)} | Hoop Think</title>
<meta name="description" content="{H(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article">
<meta property="og:url" content="{url}">
<meta property="og:title" content="HoopThink Live: {H(headline)}">
<meta property="og:description" content="{H(desc)}">
<meta property="og:image" content="https://hoopthink.net/live/{slug}/live-banner.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="author" content="The Westview Group">
<meta name="theme-color" content="#0A0A0A">
<link rel="icon" type="image/png" href="/img/favicon.png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="preload" href="/fonts/big-shoulders-display-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
{fontlinks}{css}
<script type="application/ld+json">{json.dumps(ld)}</script>
</head>
<body>
<a class="skip" href="#feed">Skip to the feed</a>

<header class="bar">
  <div class="w">
    <a class="brand" href="/" aria-label="Hoop Think home"><span class="badge"><img src="/img/live/logo-brain.png" alt="" width="42" height="42"></span><span class="brand-t">Hoop Think <em>Live</em></span></a>
    <nav class="nav" aria-label="Site"><a href="{the24}">The 24</a><a href="/live/">All Live days</a><a class="cta" href="/#get">Get the Briefing</a></nav>
  </div>
</header>

<main>
  <section class="hero" aria-labelledby="live-title">
    <img class="hero-img" src="/img/live/court-hero-1600.jpg" srcset="/img/live/court-hero-800.jpg 800w, /img/live/court-hero-1600.jpg 1600w" sizes="100vw" alt="{hero_alt}" width="1600" height="1280" fetchpriority="high">
    <div class="w hero-in">
      <p class="meta"><span class="live-pill"><i aria-hidden="true"></i>Live</span><span>{H(label_date)}</span><span class="sep" aria-hidden="true">\u2022</span><span>{H(updated)}</span><span class="pill">Updated 24/5</span></p>
      <h1 id="live-title"><span class="sr">HoopThink Live: </span>The whole basketball <em>world,</em> all day.</h1>
      <p class="lede">HoopThink Live is the all-day companion to The 24. The 24 is the finished read on last night. Live is what is moving right now.</p>
      <p class="actions"><a class="btn" href="{cta1[1]}">{cta1[0]}</a><a class="btn ghost" href="{cta2[1]}">{cta2[0]}</a></p>
      <p class="cov">NBA \u00b7 NCAAM \u00b7 NCAAW \u00b7 WNBA \u00b7 High School \u00b7 International</p>
    </div>
  </section>

  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      {tick_html}
    </div>
  </div>

  <section class="zones" aria-labelledby="zones-t">
    <div class="w">
      <p class="eyebrow">Navigate \u00b7 By the floor</p>
      <h2 class="sect-t" id="zones-t">Four zones. One whole sport.</h2>
      <ul class="zone-grid">
{zone_html}      </ul>
    </div>
  </section>

  <section class="feed-wrap" id="feed" aria-label="Today\u2019s updates">
    <div class="w">
      <div class="feed">
{feed}
      </div>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="w">
    <div class="foot-top">
      <a class="brand" href="/" aria-label="Hoop Think home"><span class="badge"><img src="/img/live/logo-brain.png" alt="" width="42" height="42" loading="lazy"></span><span class="brand-t">Hoop Think</span></a>
      <nav class="foot-links" aria-label="Footer"><a href="/the-24/">The 24</a><a href="/live/">Live archive</a><a href="/#get">The Briefing</a></nav>
    </div>
    <p class="foot-k">Center court \u00b7 HoopThink</p>
    <p class="foot-line">Basketball intelligence. Business, culture, economics, politics, and human experience.</p>
    <p class="foot-fine">Published {H(label_date)} \u00b7 HoopThink Live \u00b7 by The Westview Group \u00b7 Editor-in-Chief: Keil Moore<br>Every morning: <a href="/the-24/">The 24</a> \u00b7 Get the <a href="/#get">HoopThink Briefing</a></p>
  </div>
</footer>
</body>
</html>
"""
open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8").write(page)

# 5. homepage card (its own markers, placed just above The 24's block; never inside it)
img = f"/live/{slug}/live-banner.jpg"
card = f"""      <!-- LIVE:HOME:START -->
      <a class="card" href="/live/{slug}/">
        <img src="{img}" alt="HoopThink Live, {H(label_date)}: {H(headline)}" width="1600" height="900" loading="lazy">
        <div>
          <p class="label">HoopThink Live · {mon_dot} {d.day} · Updated {H(updated)}</p>
          <h2>{H(headline)}</h2>
          <p>The whole basketball world, all day. Updated 24/5.</p>
          <span class="more">Follow Live →</span>
        </div>
      </a>
      <!-- LIVE:HOME:END -->
"""
hp = os.path.join(site, "index.html"); h = open(hp, encoding="utf-8").read()
if "<!-- LIVE:HOME:START -->" in h:
    h, n = re.subn(r"      <!-- LIVE:HOME:START -->.*?<!-- LIVE:HOME:END -->\n", card, h, flags=re.S)
else:
    n = h.count("      <!-- THE24:HOME:START -->")
    h = h.replace("      <!-- THE24:HOME:START -->", card + "      <!-- THE24:HOME:START -->", 1)
if n != 1: sys.exit("homepage markers not found")
if 'data-netlify="true"' not in h or 'netlify-honeypot="company"' not in h:
    sys.exit("homepage signup form attributes missing; refusing to write")
open(hp, "w", encoding="utf-8").write(h)

# 6. archive page site/live/index.html
apath = os.path.join(site, "live", "index.html")
if not os.path.exists(apath):
    open(apath, "w", encoding="utf-8").write("""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>HoopThink Live | Hoop Think</title>
<meta name="description" content="HoopThink Live: the whole basketball world, all day. Updated 24/5 from The Westview Group.">
<link rel="canonical" href="https://hoopthink.net/live/">
<meta name="theme-color" content="#15100E">
<link rel="icon" type="image/png" href="/img/favicon.png">
<link rel="stylesheet" href="/style.css">
<link rel="stylesheet" href="/article.css">
<style>
.editions h2{font-family:BSD;font-weight:800;color:var(--white);font-size:32px;margin:0 0 12px}
.editions ul{list-style:none;margin:0;padding:0}
.editions li a{display:flex;flex-wrap:wrap;gap:4px 16px;padding:14px 0;border-top:1px solid var(--line);text-decoration:none;color:inherit}
.editions li b{font-family:BST;font-weight:700;color:var(--ball-hi)}
</style>
</head>
<body>
<header class="top">
  <div class="wrap">
    <a class="brand" href="/"><img src="/img/logo.jpg" alt="" width="40" height="40"><span>HOOP THINK</span></a>
    <p class="pub">A Westview Group publication</p>
  </div>
</header>
<main>
  <section class="latest">
    <div class="wrap">
      <!-- LIVE:LATEST:START -->
      <!-- LIVE:LATEST:END -->
      <div class="editions">
        <h2>Every Live day</h2>
        <ul>
          <!-- LIVE:LIST:START -->
          <!-- LIVE:LIST:END -->
        </ul>
      </div>
    </div>
  </section>
</main>
<footer class="foot">
  <div class="wrap">
    <a class="brand" href="/"><img src="/img/logo.jpg" alt="" width="40" height="40"><span>HOOP THINK</span></a>
    <p>© 2026 The Westview Group</p>
    <p class="motto">The game. The decisions. The people in between.</p>
  </div>
</footer>
</body>
</html>
""")
t = open(apath, encoding="utf-8").read()
latest = f"""      <!-- LIVE:LATEST:START -->
      <a class="card" href="/live/{slug}/">
        <img src="{img}" alt="HoopThink Live, {H(label_date)}: {H(headline)}" width="1600" height="900">
        <div>
          <p class="label">HoopThink Live · {label_date} · Updated {H(updated)}</p>
          <h2>{H(headline)}</h2>
          <p>The whole basketball world, all day. Updated 24/5. Every morning starts with The 24.</p>
          <span class="more">Follow Live →</span>
        </div>
      </a>
      <!-- LIVE:LATEST:END -->"""
t, n1 = re.subn(r"      <!-- LIVE:LATEST:START -->.*?<!-- LIVE:LATEST:END -->", latest, t, flags=re.S)
row = f'          <li><a href="/live/{slug}/"><b>{label_date}</b><span>{H(headline)}</span></a></li>\n'
if f'href="/live/{slug}/"><b>' in t:
    t = re.sub(rf'          <li><a href="/live/{slug}/">.*?</li>\n', row, t)
else:
    t = t.replace("          <!-- LIVE:LIST:START -->\n", "          <!-- LIVE:LIST:START -->\n" + row, 1)
if n1 != 1 or "LIVE:LIST:START" not in t: sys.exit("live archive markers not found")
open(apath, "w", encoding="utf-8").write(t)
print("OK", out_dir, "slots:", ",".join(keep), "headline:", headline)
