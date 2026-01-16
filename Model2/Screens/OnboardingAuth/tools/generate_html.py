#!/usr/bin/env python3
from __future__ import annotations

import datetime as _dt
import html
import re
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"


@dataclass(frozen=True)
class ScreenMeta:
    scr_id: str
    title: str
    route: str | None
    phase: str | None
    source: str | None


def _slugify(name: str) -> str:
    value = name.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "doc"


def parse_meta(md_text: str) -> ScreenMeta:
    title_line = md_text.splitlines()[0].strip()
    m = re.match(r"^#\s+(SCR-\d+)\s+—\s+(.+)$", title_line)
    if not m:
        raise ValueError("First line must be '# SCR-xxx — Title'")
    scr_id = m.group(1).strip()
    title = m.group(2).strip()

    route = None
    phase = None
    source = None
    for line in md_text.splitlines()[1:40]:
        line = line.strip()
        m_route = re.match(r"^\*\*Route:\*\*\s*(.+?)\s*$", line)
        if m_route:
            route = _extract_inline_code(m_route.group(1)) or m_route.group(1).strip()
            continue

        m_phase = re.match(r"^\*\*Faz:\*\*\s*(.+?)\s*$", line)
        if m_phase:
            phase = m_phase.group(1).strip()
            continue

        m_source = re.match(r"^\*\*Kaynak:\*\*\s*(.+?)\s*$", line)
        if m_source:
            source = m_source.group(1).replace("`", "").strip()
    return ScreenMeta(scr_id=scr_id, title=title, route=route, phase=phase, source=source)


def _extract_inline_code(line: str) -> str | None:
    m = re.search(r"`([^`]+)`", line)
    return m.group(1).strip() if m else None


def _extract_after_colon(line: str) -> str:
    return line.split(":", 1)[1].strip()


def md_to_html(md_text: str) -> str:
    lines = md_text.splitlines()

    out: list[str] = []
    in_code = False
    code_lines: list[str] = []
    in_ul = False
    in_ol = False

    def flush_lists() -> None:
        nonlocal in_ul, in_ol
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False

    def flush_code() -> None:
        nonlocal in_code, code_lines
        if in_code:
            code_html = html.escape("\n".join(code_lines))
            out.append(f"<pre><code>{code_html}</code></pre>")
            in_code = False
            code_lines = []

    def inline_format(text: str) -> str:
        escaped = html.escape(text)
        escaped = re.sub(r"`([^`]+)`", lambda m: f"<code>{html.escape(m.group(1))}</code>", escaped)
        escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
        escaped = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escaped)
        escaped = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', escaped)
        return escaped

    for raw in lines:
        line = raw.rstrip("\n")

        if line.strip().startswith("```"):
            if in_code:
                flush_code()
            else:
                flush_lists()
                in_code = True
            continue

        if in_code:
            code_lines.append(line)
            continue

        if not line.strip():
            flush_lists()
            out.append("")
            continue

        if line.startswith("> "):
            flush_lists()
            out.append(f"<blockquote>{inline_format(line[2:].strip())}</blockquote>")
            continue

        if re.match(r"^---+$", line.strip()):
            flush_lists()
            out.append("<hr />")
            continue

        m_h = re.match(r"^(#{1,6})\\s+(.*)$", line)
        if m_h:
            flush_lists()
            level = len(m_h.group(1))
            text = inline_format(m_h.group(2).strip())
            anchor = _slugify(re.sub(r"<[^>]+>", "", text))
            out.append(f'<h{level} id="{anchor}">{text}</h{level}>')
            continue

        m_ol = re.match(r"^\\s*\\d+\\.\\s+(.*)$", line)
        if m_ol:
            if in_ul:
                out.append("</ul>")
                in_ul = False
            if not in_ol:
                out.append("<ol>")
                in_ol = True
            out.append(f"<li>{inline_format(m_ol.group(1).strip())}</li>")
            continue

        m_ul = re.match(r"^\\s*[-*]\\s+(.*)$", line)
        if m_ul:
            if in_ol:
                out.append("</ol>")
                in_ol = False
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            out.append(f"<li>{inline_format(m_ul.group(1).strip())}</li>")
            continue

        flush_lists()
        out.append(f"<p>{inline_format(line.strip())}</p>")

    flush_code()
    flush_lists()
    return "\n".join(x for x in out if x != "")


def extract_ui_components(md_text: str) -> list[str]:
    lines = md_text.splitlines()
    items: list[str] = []
    in_section = False
    for line in lines:
        if re.match(r"^##\\s+UI\\s+Bileşenleri\\s*$", line.strip()):
            in_section = True
            continue
        if in_section and re.match(r"^##\\s+", line.strip()):
            break
        if in_section:
            m = re.match(r"^\\s*[-*]\\s+(.*)$", line.strip())
            if m:
                items.append(m.group(1).strip())
    return items[:8]


def render_screen_html(meta: ScreenMeta, md_text: str, nav_items: list[tuple[str, str, str]]) -> str:
    rendered = md_to_html(md_text)
    ui_items = extract_ui_components(md_text)
    ui_html = "".join(
        f'<div class="tile"><div class="t">{html.escape(x)}</div><div class="d">UI bileşeni</div></div>'
        for x in ui_items
    )
    if not ui_html:
        ui_html = (
            '<div class="tile"><div class="t">Spec Preview</div>'
            '<div class="d">Bu ekran için UI bileşenleri bölümü bulunamadı.</div></div>'
        )

    nav_html = "\n".join(
        f'<a class="{ "active" if scr_id == meta.scr_id else "" }" href="{html.escape(href)}">'
        f'<span class="k">{html.escape(scr_id)}</span> {html.escape(label)}</a>'
        for (scr_id, label, href) in nav_items
    )

    today = _dt.date.today().isoformat()
    title = f"{meta.scr_id} — {meta.title} (Spec, iPhone 17 Pro)"
    route_tag = f'<span class="tag brand">Route: <code>{html.escape(meta.route or "-")}</code></span>'
    phase_tag = f'<span class="tag">Faz: {html.escape(meta.phase or "-")}</span>'
    src_tag = f'<span class="tag warn">Kaynak: {html.escape(meta.source or "PRD")}</span>'

    return f"""<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html.escape(title)}</title>
    <link rel="stylesheet" href="assets/styles.css" />
  </head>
  <body>
    <div class="wrap">
      <aside class="side">
        <div class="brand">
          <img class="logo" src="assets/pst-coaching-logo.png" alt="PST Coaching" />
          <div style="min-width:0">
            <h1>Onboarding &amp; Auth</h1>
            <p class="sub">Spec pack • {today} • <a href="index.html">Index</a></p>
          </div>
        </div>

        <div class="meta">
          {route_tag}
          {phase_tag}
          {src_tag}
        </div>

        <div class="nav">
          {nav_html}
        </div>
      </aside>

      <main class="main">
        <div class="grid2">
          <section class="card">
            <h2>{html.escape(meta.scr_id)} — {html.escape(meta.title)}</h2>
            <div class="md">{rendered}</div>
          </section>

          <section class="card phoneWrap">
            <h2>Mock Preview</h2>
            <div class="phone">
              <div class="screen">
                <div class="statusbar">
                  <div>09:41</div>
                  <div>{html.escape(meta.scr_id)}</div>
                </div>
                <div class="content">
                  <div class="tile">
                    <div class="t">{html.escape(meta.title)}</div>
                    <div class="d">Route: <code>{html.escape(meta.route or "-")}</code></div>
                  </div>
                  {ui_html}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </body>
</html>
"""


def render_index(nav_items: list[tuple[str, str, str]]) -> str:
    today = _dt.date.today().isoformat()
    cards = []
    for scr_id, label, href in nav_items:
        cards.append(
            f'<a class="cardLink" href="{html.escape(href)}">'
            f'<div class="cid">{html.escape(scr_id)}</div>'
            f'<div class="ct">{html.escape(label)}</div>'
            f'<div class="cs">Spec HTML</div>'
            f"</a>"
        )
    cards_html = "\n".join(cards)
    return f"""<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Onboarding &amp; Auth — Spec Pack (Index)</title>
    <link rel="stylesheet" href="assets/styles.css" />
    <style>
      .wrap {{ grid-template-columns: 1fr; max-width: 1060px; margin: 0 auto; }}
      .header {{
        display:flex; align-items:center; justify-content:space-between; gap:16px;
        padding:18px; border-radius: var(--r24);
        background: rgba(255,255,255,0.86); border: 1px solid rgba(230,232,240,0.95);
        box-shadow: var(--shadow-md); backdrop-filter: blur(12px);
      }}
      .grid {{ display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-top: 16px; }}
      .cardLink {{
        text-decoration:none;
        padding:16px;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.82);
        border: 1px solid rgba(230, 232, 240, 0.95);
        box-shadow: var(--shadow-md);
        backdrop-filter: blur(12px);
      }}
      .cardLink:hover {{ border-color: var(--stroke2); box-shadow: var(--shadow-lg); }}
      .cid {{ font-weight: 900; color: var(--muted2); }}
      .ct {{ font-weight: 900; margin-top: 6px; }}
      .cs {{ color: var(--muted); font-size: 12px; margin-top: 6px; }}
      @media (max-width: 980px) {{ .grid {{ grid-template-columns: 1fr; }} }}
    </style>
  </head>
  <body>
    <div class="wrap">
      <header class="header">
        <div class="brand">
          <img class="logo" src="assets/pst-coaching-logo.png" alt="PST Coaching" />
          <div>
            <h1 style="margin:0">Onboarding &amp; Auth — Spec Pack</h1>
            <p class="sub">Generated • {today}</p>
          </div>
        </div>
        <div class="meta">
          <span class="tag brand">Faz 1</span>
          <span class="tag">Ekran: {len(nav_items)}</span>
        </div>
      </header>

      <section class="grid">
        {cards_html}
      </section>
    </div>
  </body>
</html>
"""


def main() -> None:
    md_files = sorted(ROOT.glob("SCR-*.md"))
    if not md_files:
        raise SystemExit("No SCR-*.md files found.")

    metas: list[tuple[ScreenMeta, Path, str]] = []
    for path in md_files:
        md_text = path.read_text(encoding="utf-8")
        meta = parse_meta(md_text)
        metas.append((meta, path, md_text))

    nav_items = []
    for meta, path, _ in metas:
        out_name = f"{path.stem}_iPhone17Pro.html"
        nav_items.append((meta.scr_id, meta.title, out_name))

    for meta, path, md_text in metas:
        out_name = f"{path.stem}_iPhone17Pro.html"
        html_doc = render_screen_html(meta, md_text, nav_items)
        (ROOT / out_name).write_text(html_doc, encoding="utf-8")

    (ROOT / "index.html").write_text(render_index(nav_items), encoding="utf-8")


if __name__ == "__main__":
    main()
