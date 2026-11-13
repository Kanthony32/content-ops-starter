#!/usr/bin/env python3
"""HoopThink shared site chrome: theme bootstrap, header + hamburger menu, footer,
and the section index pages (Film Room, Sports Business, Recruiting).

Single source of truth: tools/nav.json (sections + article metadata).
Idempotent: safe to run any number of times. The scheduled publishers
(publish_edition.py, publish_live.py) call apply_all() after they write pages, so
new The 24 / Live pages get the same header, menu, footer and light/dark toggle.

Usage:  python3 tools/chrome.py --site site
"""
import argparse, glob, html, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
NAV = json.load(open(os.path.join(HERE, "nav.json"), encoding="utf-8"))
E = html.escape

THEME_JS = ('<script>!function(){var d=document.documentElement;try{var t=localStorage.getItem("ht-theme");'
            'if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";'
            'd.setAttribute("data-theme",t)}catch(e){d.setAttribute("data-theme","dark")}}()</script>')
HEAD = ("<!--HT:HEAD-->" + THEME_JS +
        '<link rel="stylesheet" href="/site.css"><script src="/site.js" defer></script><!--/HT:HEAD-->')

SUN = ('<svg class="ic-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" '
       'stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>')
MOON = ('<svg class="ic-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" '
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>')
BRAND = ('<a class="ht-brand" href="/" aria-label="Hoop Think home"><span class="ht-badge">'
         '<img src="/img/live/logo-brain.png" alt="" width="40" height="40"></span>'
         '<span class="ht-brand-t">HOOP <em>THINK</em></span></a>')


def _art(href):
    return NAV["articles"].get(href, {"title": href})


def header_html():
    cols = []
    for sec in NAV["sections"]:
        items = [f'<li><a href="{E(h)}">{E(_art(h)["title"])}</a></li>' for h in sec["articles"]]
        items += [f'<li><a href="{E(x["href"])}">{E(x["title"])}</a></li>' for x in sec.get("extra", [])]
        pow_ = ""
        if sec.get("powered_by"):
            pow_ = ('<p class="ht-pow"><img src="/img/westview/wmi-mark.png" alt="" width="28" height="28">'
                    f'<span>Powered by {E(sec["powered_by"])}</span></p>')
        cols.append(
            f'<div class="ht-sec"><a class="ht-sec-t" href="{E(sec["path"])}">{E(sec["name"])}</a>'
            f'<p class="ht-sec-d">{E(sec["short"])}</p>{pow_}<ul>{"".join(items)}</ul></div>')
    return ("<!--HT:HEADER-->"
            '<header class="ht-bar" id="ht-top"><div class="ht-in">' + BRAND +
            '<div class="ht-actions"><a class="ht-cta" href="/#get">Get the Briefing</a>'
            '<button class="ht-theme" type="button" aria-label="Switch color theme">' + SUN + MOON + '</button>'
            '<details class="ht-nav"><summary aria-label="Menu">'
            '<span class="ht-burger" aria-hidden="true"><i></i><i></i><i></i></span>'
            '<span class="ht-sum-t ht-open-t">Menu</span><span class="ht-sum-t ht-close-t">Close</span></summary>'
            '<nav class="ht-panel" aria-label="Site"><div class="ht-in"><div class="ht-grid">' + "".join(cols) +
            '</div><p class="ht-panel-foot"><a href="/">Home</a><a href="/#get">The HoopThink Briefing</a></p>'
            '</div></nav></details></div></div></header><!--/HT:HEADER-->')


def footer_html():
    links = "".join(f'<a href="{E(s["path"])}">{E(s["name"])}</a>' for s in NAV["sections"])
    return ("<!--HT:FOOTER-->"
            '<footer class="ht-foot"><div class="ht-in">'
            '<div class="ht-foot-top">' + BRAND +
            '<nav class="ht-foot-links" aria-label="Footer">' + links + '<a href="/#get">The Briefing</a></nav></div>'
            '<p class="ht-foot-pow"><img src="/img/westview/wmi-mark.png" alt="" width="36" height="36" loading="lazy">'
            '<span>Sports Business is powered by <a href="/sports-business/">Westview Market Intelligence</a>.</span></p>'
            '<div class="ht-foot-bot"><img class="ht-wtg" src="/img/westview/wtg-logo.jpg" alt="Westview Group" '
            'width="216" height="56" loading="lazy">'
            '<div><p>© 2026 The Westview Group</p><p class="ht-motto">The game. The decisions. The people in between.</p></div></div>'
            '</div></footer><!--/HT:FOOTER-->')


def kind_of(s):
    if 'class="sitebar"' in s or 'class="mast"' in s or "<!--HT:KIND:edition-->" in s:
        return "edition"
    if re.search(r'<header class="bar">', s) or 'class="foot-top"' in s or "<!--HT:KIND:live-->" in s:
        return "live"
    if re.search(r'<body[^>]*class="[^"]*\bhome\b', s):
        return "home"
    return "main"


def _swap(s, tag, block):
    pat = re.compile(rf"<!--HT:{tag}-->.*?<!--/HT:{tag}-->", re.S)
    if pat.search(s):
        return pat.sub(lambda m: block, s, count=1), True
    return s, False


def apply(s):
    """Return the page with shared chrome applied. Idempotent."""
    kind = kind_of(s)
    # <html data-kind>
    if re.search(r"<html[^>]*data-kind=", s):
        s = re.sub(r'(<html[^>]*?)\sdata-kind="[^"]*"', rf'\1 data-kind="{kind}"', s, count=1)
    else:
        s = re.sub(r"<html", f'<html data-kind="{kind}"', s, count=1)
    # head
    s, ok = _swap(s, "HEAD", HEAD)
    if not ok:
        s = s.replace("</head>", HEAD + "</head>", 1)
    # header
    hdr, ftr = header_html(), footer_html()
    s, ok = _swap(s, "HEADER", hdr)
    if not ok:
        n = 0
        if kind in ("main", "home"):
            s, n = re.subn(r'<header class="(?:top|hbar)">.*?</header>', lambda m: hdr, s, count=1, flags=re.S)
        elif kind == "live":
            s, n = re.subn(r'<header class="bar">.*?</header>', lambda m: hdr, s, count=1, flags=re.S)
        elif kind == "edition":
            s = re.sub(r'\s*<nav class="sitebar"[^>]*>.*?</nav>', "", s, count=1, flags=re.S)
            i = s.rfind('<div class="page">')
            if i != -1:
                s, n = s[:i] + hdr + "\n" + s[i:], 1
        if not n:  # fallback: right after the last <body ...>
            i = [m for m in re.finditer(r"<body[^>]*>", s)][-1].end()
            s = s[:i] + "\n" + hdr + s[i:]
    # footer
    s, ok = _swap(s, "FOOTER", ftr)
    if not ok:
        if kind in ("main", "home"):
            s, n = re.subn(r'<footer class="foot">.*?</footer>', lambda m: ftr, s, count=1, flags=re.S)
            if not n:
                j = s.rfind("</body>"); s = s[:j] + ftr + "\n" + s[j:]
        else:
            if kind == "live":  # the old brand + links row duplicates the shared nav
                s = re.sub(r'<div class="foot-top">.*?</nav>\s*</div>\s*', "", s, count=1, flags=re.S)
            j = s.rfind("</body>"); s = s[:j] + ftr + "\n" + s[j:]
    return s


def apply_file(path):
    s = open(path, encoding="utf-8").read()
    t = apply(s)
    if t != s:
        open(path, "w", encoding="utf-8").write(t)
        return True
    return False


# ---------- section index pages ----------
SECTION_PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{name} | Hoop Think</title>
<meta name="description" content="{dek}">
<link rel="canonical" href="https://hoopthink.net{path}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://hoopthink.net{path}">
<meta property="og:title" content="{name} | Hoop Think">
<meta property="og:description" content="{dek}">
<meta property="og:image" content="https://hoopthink.net{og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#15100E">
<link rel="icon" type="image/png" href="/img/favicon.png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="preload" href="/fonts/big-shoulders-display-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/style.css">
<link rel="stylesheet" href="/article.css">
</head>
<body>

<main>
  <section class="sec-intro">
    <div class="wrap">
      <p class="flag"><b>Section</b> {short}</p>
      <h1>{name}</h1>
      <p class="desc">{dek}</p>
{pow}    </div>
  </section>

  <section class="latest">
    <div class="wrap">
{cards}    </div>
  </section>
</main>

</body>
</html>
"""


def build_sections(site):
    for sec in NAV["sections"]:
        if sec.get("index_exists") or sec.get("hub"):
            continue
        arts = [(h, _art(h)) for h in sec["articles"]]
        cards = ""
        for i, (h, a) in enumerate(arts):
            lazy = ' loading="lazy"' if i else ""
            cards += (f'      <a class="card" href="{E(h)}">\n'
                      f'        <img src="{E(a["img"])}" alt="{E(a["alt"])}" width="1600" height="900"'
                      f'{lazy}>\n        <div>\n'
                      f'          <p class="label">{E(a["label"])}{" · Latest" if i == 0 else ""}</p>\n'
                      f'          <h2>{E(a["title"])}</h2>\n          <p>{E(a["dek"])}</p>\n'
                      f'          <span class="more">Read the piece →</span>\n        </div>\n      </a>\n')
        pow_ = ""
        if sec.get("powered_by"):
            pow_ = ('      <a class="sec-pow" href="/sports-business/"><img src="/img/westview/wmi-banner.jpg" '
                    'alt="Westview Market Intelligence. Grassroots sports. Business. Insight." width="1446" height="451">'
                    f'<span>Sports Business is powered by {E(sec["powered_by"])}.</span></a>\n')
        og = arts[0][1]["img"] if arts else "/img/og.jpg"
        page = SECTION_PAGE.format(name=E(sec["name"]), dek=E(sec["dek"]), short=E(sec["short"]),
                                   path=sec["path"], og=og, cards=cards, pow=pow_)
        d = os.path.join(site, sec["path"].strip("/"))
        os.makedirs(d, exist_ok=True)
        open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(page)


# ---------- The Playbook: every article on one page ----------
HUB_CSS = """<style>
.hub-jump{list-style:none;margin:26px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.hub-jump a{display:inline-flex;align-items:center;min-height:40px;padding:0 14px;border:1.5px solid var(--line);border-radius:3px;font-family:BST;font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;color:var(--white)}
.hub-jump a:hover{border-color:var(--ball-hi);color:var(--ball-hi)}
.hub{border-top:1px solid var(--line);padding:56px 0 72px}
.hub .wrap{display:grid;gap:64px}
.hub-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 18px;border-top:2px solid var(--smoke);padding-top:14px;margin:0 0 22px}
.hub-head h2{font-family:BSD;font-weight:900;color:var(--white);font-size:clamp(32px,4.6vw,44px);line-height:1;margin:0}
.hub-head h2 a{color:inherit;text-decoration:none}
.hub-head h2 a:hover{color:var(--maple)}
.hub-head p{margin:0;font-family:BST;font-weight:600;font-size:16px;color:var(--dim)}
.hub-grid{display:grid;gap:30px 24px;grid-template-columns:minmax(0,1fr)}
@media (min-width:720px){.hub-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.hub-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
.hub-card{display:grid;gap:10px;align-content:start;text-decoration:none;color:inherit;min-width:0}
.hub-card img{width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;box-shadow:0 0 0 1px rgba(255,255,255,.08)}
.hub-card .label{font-family:BST;font-weight:700;font-size:14px;color:var(--ball-hi);margin:0}
.hub-card h3{font-family:BSD;font-weight:800;color:var(--white);font-size:27px;line-height:1.04;margin:0;text-wrap:balance}
.hub-card p{margin:0;font-size:16px;line-height:1.5}
.hub-card:hover h3{color:var(--maple)}
.hub-rows{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.hub-rows a{display:grid;gap:2px 18px;padding:12px 0;border-bottom:1px solid var(--line);text-decoration:none;color:inherit}
@media (min-width:720px){.hub-rows a{grid-template-columns:210px minmax(0,1fr)}}
.hub-rows b{font-family:BST;font-weight:700;font-size:15px;color:var(--ball-hi)}
.hub-rows span{color:var(--white)}
.hub-rows a:hover span{color:var(--maple)}
.hub-rows .all b{color:var(--ball-hi)}
html[data-theme="light"][data-kind="main"] .hub-card img{box-shadow:0 0 0 1px rgba(0,0,0,.12)}
</style>"""

HUB_PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{name} | Hoop Think</title>
<meta name="description" content="{dek}">
<link rel="canonical" href="https://hoopthink.net{path}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://hoopthink.net{path}">
<meta property="og:title" content="{name} | Hoop Think">
<meta property="og:description" content="{dek}">
<meta property="og:image" content="https://hoopthink.net/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#15100E">
<link rel="icon" type="image/png" href="/img/favicon.png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="preload" href="/fonts/big-shoulders-display-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/style.css">
<link rel="stylesheet" href="/article.css">
{css}
</head>
<body>

<main>
  <section class="sec-intro">
    <div class="wrap">
      <p class="flag"><b>Section</b> {short}</p>
      <h1>{name}</h1>
      <p class="desc">{dek}</p>
      <ul class="hub-jump" aria-label="Jump to a section">{jump}</ul>
    </div>
  </section>

  <section class="hub">
    <div class="wrap">
{blocks}    </div>
  </section>
</main>

</body>
</html>
"""


def _archive_rows(site, rel, start, end, limit):
    """Newest rows from a publisher-owned archive list, as (href, label_html, headline_html)."""
    try:
        t = open(os.path.join(site, rel), encoding="utf-8").read()
        m = re.search(rf"<!-- {start} -->(.*?)<!-- {end} -->", t, re.S)
        rows = re.findall(r'<li><a href="([^"]+)"><b>(.*?)</b><span>(.*?)</span></a></li>', m.group(1)) if m else []
    except OSError:
        rows = []
    return rows[:limit]


def build_hub(site):
    hub = next((x for x in NAV["sections"] if x.get("hub")), None)
    if not hub:
        return
    blocks, jump = "", ""
    for sec in NAV["sections"]:
        if sec.get("hub") or sec["slug"] == "the-24" or not sec["articles"]:
            continue
        cards = ""
        for h in sec["articles"]:
            a = _art(h)
            cards += (f'        <a class="hub-card" href="{E(h)}">\n'
                      f'          <img src="{E(a["img"])}" alt="{E(a["alt"])}" width="1600" height="900" loading="lazy">\n'
                      f'          <p class="label">{E(a["label"])}</p>\n'
                      f'          <h3>{E(a["title"])}</h3>\n          <p>{E(a["dek"])}</p>\n        </a>\n')
        blocks += (f'      <div id="{E(sec["slug"])}">\n'
                   f'        <div class="hub-head"><h2><a href="{E(sec["path"])}">{E(sec["name"])}</a></h2>'
                   f'<p>{E(sec["short"])}</p></div>\n        <div class="hub-grid">\n{cards}        </div>\n      </div>\n')
        jump += f'<li><a href="#{E(sec["slug"])}">{E(sec["name"])}</a></li>'
    # The 24 + The 24 Live: newest entries, parsed from the archive pages the daily publishers maintain
    feeds = [
        ("the-24", "The 24", "/the-24/", "Our daily basketball digest. A new edition every weekday morning.",
         _archive_rows(site, "the-24/index.html", "THE24:LIST:START", "THE24:LIST:END", 6), "See every edition →"),
        ("live", "The 24 Live", "/live/", "What is moving right now, updated 24/5.",
         _archive_rows(site, "live/index.html", "LIVE:LIST:START", "LIVE:LIST:END", 6), "See every Live day →"),
    ]
    for slug, name, path, short, rows, more in feeds:
        li = "".join(f'          <li><a href="{h}"><b>{l}</b><span>{t}</span></a></li>\n' for h, l, t in rows)
        li += f'          <li><a class="all" href="{path}"><b>{E(more)}</b><span></span></a></li>\n'
        blocks += (f'      <div id="{slug}">\n'
                   f'        <div class="hub-head"><h2><a href="{path}">{E(name)}</a></h2><p>{E(short)}</p></div>\n'
                   f'        <ul class="hub-rows">\n{li}        </ul>\n      </div>\n')
        jump += f'<li><a href="#{slug}">{E(name)}</a></li>'
    page = HUB_PAGE.format(name=E(hub["name"]), dek=E(hub["dek"]), short=E(hub["short"]), path=hub["path"],
                           css=HUB_CSS, jump=jump, blocks=blocks)
    d = os.path.join(site, hub["path"].strip("/"))
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(page)


def apply_all(site):
    build_sections(site)
    try:  # the hub must never block a daily publish
        build_hub(site)
    except Exception as e:  # noqa
        print("WARNING: Playbook hub NOT rebuilt:", e, file=sys.stderr)
    changed = 0
    for p in glob.glob(os.path.join(site, "**", "*.html"), recursive=True):
        if apply_file(p):
            changed += 1
    return changed


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default="site")
    a = ap.parse_args()
    print("pages updated:", apply_all(a.site))
