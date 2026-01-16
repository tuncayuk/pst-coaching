#!/usr/bin/env python3
from __future__ import annotations

import html
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parents[3]
REV3 = REPO_ROOT / "Model1" / "UserStoriesRev3.md"
OUT_DIR = REPO_ROOT / "Model1" / "Designs"


CSS = r"""
      :root {
        color-scheme: light;

        /* Palette — derived from the provided logo (approx by visual sampling). */
        --primary: #1e2a78; /* PST navy */
        --accent: #0fa3b1; /* PST teal */
        --gold: #f2c14e; /* warm highlight */
        --danger: #d92d20;
        --success: #039855;

        /* Neutrals */
        --bg: #f7f8fb;
        --surface: #ffffff;
        --surface2: #f2f4fb;
        --stroke: #e6e8f0;
        --stroke2: #d7dbeb;
        --text: #0d1226;
        --muted: #5b647a;
        --muted2: #7a849c;

        /* Effects */
        --shadow-sm: 0 6px 18px rgba(13, 18, 38, 0.08);
        --shadow-md: 0 18px 50px rgba(13, 18, 38, 0.12);
        --shadow-lg: 0 36px 120px rgba(13, 18, 38, 0.18);

        /* Radii */
        --r12: 12px;
        --r16: 16px;
        --r20: 20px;
        --r24: 24px;
        --r32: 32px;

        /* iPhone 17 Pro ref (approx) */
        --w: 393px;
        --h: 852px;
        --safeTop: 56px;
        --safeBot: 34px;

        --font:
          ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display",
          "Segoe UI", Roboto, Helvetica, Arial;
      }

      * {
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
      }
      body {
        margin: 0;
        font-family: var(--font);
        background:
          radial-gradient(900px 520px at 0% 0%, rgba(15, 163, 177, 0.12), transparent 55%),
          radial-gradient(900px 520px at 100% 10%, rgba(30, 42, 120, 0.1), transparent 55%),
          radial-gradient(900px 520px at 40% 115%, rgba(242, 193, 78, 0.12), transparent 55%),
          linear-gradient(180deg, #ffffff, var(--bg));
        color: var(--text);
      }

      code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 0.95em;
        color: rgba(13, 18, 38, 0.85);
      }
      a {
        color: inherit;
      }

      .wrap {
        display: grid;
        grid-template-columns: 360px 1fr;
        gap: 24px;
        padding: 28px;
        min-height: 100%;
      }

      .side {
        position: sticky;
        top: 28px;
        height: calc(100vh - 56px);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.82);
        border: 1px solid rgba(230, 232, 240, 0.9);
        box-shadow: var(--shadow-md);
        backdrop-filter: blur(12px);
        padding: 18px;
        overflow: auto;
      }

      .titleRow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 10px;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: 999px;
        background: rgba(15, 163, 177, 0.1);
        border: 1px solid rgba(15, 163, 177, 0.22);
        color: rgba(13, 18, 38, 0.86);
        font-size: 12px;
        white-space: nowrap;
        font-weight: 900;
      }
      h1 {
        font-size: 16px;
        margin: 0;
        letter-spacing: 0.1px;
        line-height: 1.25;
      }
      .sub {
        margin: 4px 0 0;
        color: var(--muted);
        font-size: 12px;
        line-height: 1.45;
      }

      .swatches {
        margin-top: 14px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .swatch {
        padding: 10px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid rgba(230, 232, 240, 0.92);
        box-shadow: var(--shadow-sm);
      }
      .chip {
        height: 18px;
        border-radius: 999px;
        border: 1px solid rgba(13, 18, 38, 0.08);
      }
      .k {
        margin-top: 8px;
        font-size: 11px;
        color: rgba(13, 18, 38, 0.72);
        font-weight: 900;
      }
      .v {
        font-size: 12px;
        color: rgba(13, 18, 38, 0.86);
        font-weight: 900;
      }

      .note {
        margin-top: 12px;
        padding: 12px;
        border-radius: var(--r20);
        background: rgba(242, 193, 78, 0.14);
        border: 1px solid rgba(242, 193, 78, 0.28);
        color: rgba(13, 18, 38, 0.86);
        font-size: 12px;
        line-height: 1.5;
      }
      .nav {
        margin-top: 14px;
        display: grid;
        gap: 6px;
      }
      .nav a {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 14px;
        border: 1px solid rgba(230, 232, 240, 0.92);
        background: rgba(255, 255, 255, 0.72);
        box-shadow: var(--shadow-sm);
        font-weight: 900;
        font-size: 12px;
      }
      .nav a:hover {
        border-color: rgba(15, 163, 177, 0.35);
        box-shadow: 0 10px 26px rgba(13, 18, 38, 0.11);
      }
      .homeLink {
        background: rgba(15, 163, 177, 0.08);
        border-color: rgba(15, 163, 177, 0.22);
      }

      .main {
        display: grid;
        gap: 18px;
        align-content: start;
      }
      .section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        align-items: start;
      }
      .card {
        border-radius: var(--r24);
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid rgba(230, 232, 240, 0.95);
        box-shadow: var(--shadow-md);
        padding: 16px;
      }
      .card h2 {
        margin: 0;
        font-size: 16px;
        letter-spacing: 0.1px;
      }
      .meta {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .tag {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 900;
        border: 1px solid rgba(230, 232, 240, 0.92);
        background: rgba(255, 255, 255, 0.72);
        color: rgba(13, 18, 38, 0.88);
      }
      .tag.brand {
        border-color: rgba(30, 42, 120, 0.18);
        background: rgba(30, 42, 120, 0.08);
      }
      .tag.warn {
        border-color: rgba(242, 193, 78, 0.35);
        background: rgba(242, 193, 78, 0.18);
      }
      .tag.ok {
        border-color: rgba(3, 152, 85, 0.26);
        background: rgba(3, 152, 85, 0.12);
      }
      .tag.danger {
        border-color: rgba(217, 45, 32, 0.25);
        background: rgba(217, 45, 32, 0.1);
      }

      .infoTable {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
        overflow: hidden;
        border-radius: 18px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.72);
      }
      .infoTable th,
      .infoTable td {
        padding: 10px 12px;
        text-align: left;
        font-size: 12px;
        border-bottom: 1px solid rgba(230, 232, 240, 0.95);
        vertical-align: top;
      }
      .infoTable th {
        width: 128px;
        color: rgba(13, 18, 38, 0.7);
        font-weight: 900;
      }
      .infoTable tr:last-child th,
      .infoTable tr:last-child td {
        border-bottom: none;
      }

      .card ul {
        margin: 10px 0 0;
        padding-left: 18px;
        color: rgba(13, 18, 38, 0.9);
        font-size: 12px;
        line-height: 1.6;
      }

      details {
        margin-top: 12px;
        border-radius: 18px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.72);
        overflow: hidden;
      }
      summary {
        cursor: pointer;
        list-style: none;
        padding: 12px;
        font-size: 12px;
        font-weight: 950;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
      }
      summary::-webkit-details-marker {
        display: none;
      }
      .hint {
        color: rgba(13, 18, 38, 0.68);
        font-weight: 900;
      }
      .body {
        padding: 0 12px 12px;
        border-top: 1px solid rgba(230, 232, 240, 0.95);
      }
      .ac {
        margin: 10px 0 0;
        padding-left: 18px;
        color: rgba(13, 18, 38, 0.92);
        font-size: 12px;
        line-height: 1.6;
      }

      /* Device frame */
      .device {
        display: grid;
        place-items: center;
      }
      .bezel {
        width: calc(var(--w) + 18px);
        height: calc(var(--h) + 18px);
        padding: 9px;
        border-radius: 54px;
        background: linear-gradient(180deg, #0b0e16, #141a2a);
        box-shadow: var(--shadow-lg);
        position: relative;
      }
      .status {
        position: absolute;
        top: 16px;
        left: 22px;
        right: 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgba(255, 255, 255, 0.86);
        font-size: 12px;
        font-weight: 900;
        pointer-events: none;
      }
      .right {
        display: inline-flex;
        gap: 6px;
        align-items: center;
      }
      .dot {
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.8);
      }
      .island {
        position: absolute;
        top: 14px;
        left: 50%;
        transform: translateX(-50%);
        width: 140px;
        height: 36px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.9);
        box-shadow: 0 12px 22px rgba(0, 0, 0, 0.55);
        pointer-events: none;
      }
      .screen {
        width: var(--w);
        height: var(--h);
        border-radius: 44px;
        background: linear-gradient(180deg, #ffffff, var(--bg));
        overflow: hidden;
        position: relative;
      }
      .content {
        position: absolute;
        inset: 0;
        padding: var(--safeTop) 16px calc(var(--safeBot) + 74px);
        overflow: hidden;
      }

      /* App chrome */
      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
      }
      .left {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .back {
        width: 36px;
        height: 36px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.9);
        box-shadow: var(--shadow-sm);
        font-weight: 1000;
        color: rgba(13, 18, 38, 0.86);
      }
      .title {
        font-weight: 1000;
        letter-spacing: 0.1px;
        font-size: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ghost {
        height: 36px;
        padding: 0 12px;
        border-radius: 14px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-weight: 950;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.9);
        color: rgba(13, 18, 38, 0.76);
        box-shadow: var(--shadow-sm);
      }

      .list {
        display: grid;
        gap: 10px;
      }
      .tile {
        padding: 12px;
        border-radius: 20px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        box-shadow: var(--shadow-sm);
      }
      .row {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 10px;
      }
      .t {
        font-weight: 1000;
        font-size: 13px;
        letter-spacing: 0.1px;
      }
      .m {
        margin-top: 6px;
        color: rgba(13, 18, 38, 0.68);
        font-size: 12px;
        line-height: 1.45;
      }
      .badge {
        height: 26px;
        padding: 0 10px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        font-weight: 1000;
        font-size: 11px;
        border: 1px solid rgba(15, 163, 177, 0.26);
        background: rgba(15, 163, 177, 0.1);
        color: rgba(13, 18, 38, 0.86);
        white-space: nowrap;
      }
      .badge.warn {
        border-color: rgba(242, 193, 78, 0.32);
        background: rgba(242, 193, 78, 0.18);
      }
      .badge.ok {
        border-color: rgba(3, 152, 85, 0.26);
        background: rgba(3, 152, 85, 0.12);
      }
      .badge.lock {
        border-color: rgba(217, 45, 32, 0.22);
        background: rgba(217, 45, 32, 0.08);
      }

      .ctaRow {
        margin-top: 12px;
        display: grid;
        gap: 10px;
      }
      .cta {
        height: 44px;
        border-radius: 18px;
        display: grid;
        place-items: center;
        font-weight: 1000;
        letter-spacing: 0.1px;
        color: #ffffff;
        background: linear-gradient(135deg, rgba(30, 42, 120, 0.96), rgba(15, 163, 177, 0.92));
        box-shadow: 0 18px 40px rgba(30, 42, 120, 0.22);
        border: 1px solid rgba(30, 42, 120, 0.18);
      }
      .cta.secondary {
        color: rgba(13, 18, 38, 0.9);
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(230, 232, 240, 0.95);
        box-shadow: var(--shadow-sm);
      }

      .chips {
        margin-top: 10px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .chipBtn {
        height: 32px;
        padding: 0 10px;
        border-radius: 999px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        box-shadow: var(--shadow-sm);
        font-size: 12px;
        font-weight: 950;
        color: rgba(13, 18, 38, 0.78);
        white-space: nowrap;
      }
      .chipBtn.primary {
        border-color: rgba(30, 42, 120, 0.18);
        background: rgba(30, 42, 120, 0.08);
        color: rgba(13, 18, 38, 0.92);
      }

      .tabbar {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 10px 12px calc(var(--safeBot) + 10px);
        background: rgba(255, 255, 255, 0.92);
        border-top: 1px solid rgba(230, 232, 240, 0.95);
        backdrop-filter: blur(10px);
      }
      .tabRow {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
      }
      .tabItem {
        height: 46px;
        border-radius: 18px;
        display: grid;
        place-items: center;
        color: rgba(13, 18, 38, 0.68);
        font-weight: 950;
        font-size: 11px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.86);
      }
      .tabItem.active {
        border-color: rgba(30, 42, 120, 0.2);
        background: rgba(30, 42, 120, 0.08);
        color: rgba(13, 18, 38, 0.92);
      }

      .logoWrap {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .logoImg {
        height: 22px;
        width: auto;
        object-fit: contain;
        display: block;
      }
      .logoFallback {
        display: none;
        width: 26px;
        height: 26px;
        border-radius: 12px;
        background: radial-gradient(circle at 30% 30%, rgba(15, 163, 177, 1), rgba(30, 42, 120, 1));
        border: 1px solid rgba(13, 18, 38, 0.08);
        box-shadow: var(--shadow-sm);
      }

      .muted {
        color: rgba(13, 18, 38, 0.66);
      }

      @media (max-width: 1120px) {
        .wrap {
          grid-template-columns: 1fr;
        }
        .side {
          position: relative;
          height: auto;
        }
        .section {
          grid-template-columns: 1fr;
        }
      }
"""


@dataclass(frozen=True)
class Story:
    epic: str
    phase: str
    role: str
    us_name: str
    desc: str
    ac_lines: tuple[str, ...]
    nav: str


def _parse_story_row(line: str) -> Story | None:
    parts = [p.strip() for p in line.strip().strip("|").split("|")]
    if len(parts) < 7:
        return None
    ac_lines = tuple(x.strip() for x in parts[5].replace("<br>", "\n").split("\n") if x.strip())
    return Story(
        epic=parts[0],
        phase=parts[1],
        role=parts[2],
        us_name=parts[3],
        desc=parts[4],
        ac_lines=ac_lines,
        nav=parts[6],
    )


def load_stories() -> dict[str, Story]:
    raw = REV3.read_text(encoding="utf-8").splitlines()
    out: dict[str, Story] = {}
    for line in raw:
        if not line.startswith("| EPIC "):
            continue
        story = _parse_story_row(line)
        if not story:
            continue
        m = re.search(r"\bUS-\d+\.\d+\b", story.us_name)
        if not m:
            continue
        out[m.group(0)] = story
    return out


def esc(s: str) -> str:
    return html.escape(s, quote=True)


def md_escape(s: str) -> str:
    return s.replace("`", "\\`")


def render_ac_list(items: Iterable[str]) -> str:
    li = "\n".join(f"                  <li>{esc(x)}</li>" for x in items)
    return f"""                <ul class="ac">\n{li}\n                </ul>"""


def render_device_stub(title: str, subtitle: str, tab: str, tiles: list[tuple[str, str, str]]) -> str:
    tab_map = {
        "Keşfet": ("Ana Sayfa", "Keşfet", "Yolculuklarım", "Profil"),
        "Profil": ("Ana Sayfa", "Keşfet", "Yolculuklarım", "Profil"),
        "Topluluk": ("Ana Sayfa", "Keşfet", "Topluluk", "Profil"),
        "Koç": ("Ana Sayfa", "Keşfet", "Profil", "Koç"),
    }
    tabs = tab_map.get(tab, ("Ana Sayfa", "Keşfet", "Yolculuklarım", "Profil"))

    tab_html = "\n".join(
        f'                      <div class="tabItem{" active" if t==tab else ""}">{esc(t)}</div>'
        for t in tabs
    )
    tiles_html = "\n".join(
        f"""                    <div class="tile">
                      <div class="row">
                        <div>
                          <div class="t">{esc(t)}</div>
                          <div class="m">{esc(m)}</div>
                        </div>
                        <span class="badge">{esc(b)}</span>
                      </div>
                    </div>"""
        for (t, m, b) in tiles
    )

    return f"""
          <div class="device">
            <div class="bezel">
              <div class="status"><span>07:32</span><span class="right"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span></div>
              <div class="island"></div>
              <div class="screen">
                <div class="content">
                  <div class="topbar">
                    <div class="logoWrap">
                      <img
                        class="logoImg"
                        src="assets/pst-coaching-logo.png"
                        alt="PST Coaching"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                      />
                      <div class="logoFallback" aria-hidden="true"></div>
                      <div class="title">{esc(title)}</div>
                    </div>
                    <div class="ghost">{esc(subtitle)}</div>
                  </div>

                  <div class="list">
{tiles_html}
                  </div>

                  <div class="tabbar" role="navigation" aria-label="Tab bar">
                    <div class="tabRow">
{tab_html}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>"""


@dataclass(frozen=True)
class Screen:
    id: str
    title: str
    phase: str
    role: str
    segment: str
    plan: str
    nav: str
    us: tuple[str, ...]
    bullets: tuple[str, ...]
    device_title: str
    device_sub: str
    tab: str
    device_tiles: tuple[tuple[str, str, str], ...]


def render_screen(n: int, s: Screen, stories: dict[str, Story]) -> str:
    tags = [f'<span class="tag brand">{esc(u.split("-")[0] + " " + u)}</span>' for u in s.us]
    epic_tags = []
    for u in s.us:
        st = stories.get(u)
        if st:
            m = re.match(r"(EPIC \d+)", st.epic)
            if m:
                epic_tags.append(m.group(1))
    epic_tags = sorted(set(epic_tags), key=lambda x: int(x.split()[1]))
    epic_html = "".join(f'<span class="tag brand">{esc(e)}</span>' for e in epic_tags)
    meta = f"""{epic_html}{''.join(tags)}<span class="tag">{esc(s.phase)}</span>"""
    bullets_html = "\n".join(f"              <li>{esc(b)}</li>" for b in s.bullets)

    # AC merge
    ac_items: list[str] = []
    for u in s.us:
        st = stories.get(u)
        if not st:
            continue
        for line in st.ac_lines:
            ac_items.append(line)

    # basic de-dupe while preserving order
    seen = set()
    ac_items_dedup = []
    for item in ac_items:
        key = item.strip()
        if key in seen:
            continue
        seen.add(key)
        ac_items_dedup.append(key)

    hint = " + ".join(s.us)
    return f"""
        <section id="{esc(s.id)}" class="section">
          <div class="card">
            <h2>{n:02d} — {esc(s.title)}</h2>
            <div class="meta">
              {meta}
            </div>
            <table class="infoTable" aria-label="Ekran bilgileri">
              <tr><th>Rol</th><td>{esc(s.role)}</td></tr>
              <tr><th>Segment</th><td>{esc(s.segment)}</td></tr>
              <tr><th>Plan</th><td>{esc(s.plan)}</td></tr>
              <tr><th>Navigasyon</th><td>{esc(s.nav)}</td></tr>
            </table>
            <ul>
{bullets_html}
            </ul>
            <details open>
              <summary>Acceptance Criteria <span class="hint">{esc(hint)}</span></summary>
              <div class="body">
{render_ac_list(ac_items_dedup)}
              </div>
            </details>
          </div>
{render_device_stub(s.device_title, s.device_sub, s.tab, list(s.device_tiles))}
        </section>"""


def render_pack(title: str, pill: str, screens: list[Screen], stories: dict[str, Story]) -> str:
    nav_links = "\n".join(
        f'          <a href="#{esc(s.id)}"><span class="k">{i:02d}</span> {esc(s.title)}</a>'
        for i, s in enumerate(screens, 1)
    )
    sections_html = "\n".join(render_screen(i, s, stories) for i, s in enumerate(screens, 1))
    return f"""<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{esc(title)} (Light Mode, iPhone 17 Pro)</title>
    <style>
{CSS}
    </style>
  </head>
  <body>
    <div class="wrap">
      <aside class="side">
        <div class="titleRow">
          <div>
            <h1>{esc(title)}</h1>
            <p class="sub">Light mode • iPhone 17 Pro frame • US + Acceptance Criteria gömülü</p>
          </div>
          <div class="pill">{esc(pill)}</div>
        </div>

        <div class="swatches" aria-label="Renk paleti">
          <div class="swatch">
            <div class="chip" style="background: var(--primary)"></div>
            <div class="k">Primary</div>
            <div class="v">#1E2A78</div>
          </div>
          <div class="swatch">
            <div class="chip" style="background: var(--accent)"></div>
            <div class="k">Accent</div>
            <div class="v">#0FA3B1</div>
          </div>
          <div class="swatch">
            <div class="chip" style="background: var(--gold)"></div>
            <div class="k">Gold</div>
            <div class="v">#F2C14E</div>
          </div>
          <div class="swatch">
            <div class="chip" style="background: var(--bg)"></div>
            <div class="k">Background</div>
            <div class="v">#F7F8FB</div>
          </div>
        </div>
        <div class="note">
          Palet logo bazlı <strong>yaklaşık</strong>. Logo dosyası: <code>Model1/Designs/assets/pst-coaching-logo.png</code>
        </div>

        <div class="nav" aria-label="Ekran listesi">
          <a class="homeLink" href="index.html"><span class="k">⟵</span> Home (Index)</a>
{nav_links}
        </div>
      </aside>

      <main class="main">
{sections_html}
      </main>
    </div>
  </body>
</html>
"""


def render_spec(title: str, html_file: str, epics: list[int], screens: list[Screen]) -> str:
    epic_part = ", ".join(f"EPIC {e}" for e in epics)
    screen_lines = "\n".join(
        f"{i}. **{md_escape(s.title)}** — {', '.join(s.us)} — {md_escape(s.phase)}" for i, s in enumerate(screens, 1)
    )
    return f"""# {title} — Production Ready Ekran Spesifikasyonu

Kaynak: `Model1/UserStoriesRev3.md` ({epic_part}).  
Hedef cihaz: iPhone 17 Pro (tasarım referansı: 393×852 pt, Dynamic Island, safe area üst/alt).  
Tasarım dosyası: `{html_file}`

## Notlar

- Bu paket Light Mode’dur.
- Her ekran için US + Acceptance Criteria HTML içinde gömülüdür.
- Gating (plan/add-on) ve offline/senkron durumları US’lerdeki kriterlere göre ele alınır.

## Ekran listesi (HTML ile birebir)

{screen_lines}
"""


def main() -> int:
    stories = load_stories()

    packs: list[tuple[str, str, str, list[int], list[Screen]]] = []

    # 3.6
    packs.append(
        (
            "3.6 — Favoriler & Arşiv",
            "3.6",
            "Favoriler_Arsiv_iPhone17Pro.html",
            [8],
            [
                Screen(
                    id="favorites",
                    title="Favoriler Ana Ekranı",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Keşfet → Favoriler",
                    us=("US-8.1",),
                    bullets=("Öğe tür etiketleri (Vurgu/Not/Bölüm/Ders) ile liste.", "Arama ile anlık filtre.", "Boş durumda CTA: içerikte vurgu/not ekle."),
                    device_title="Favoriler",
                    device_sub="Ara",
                    tab="Keşfet",
                    device_tiles=(
                        ("Vurgu • Bugün", "Dikkat & Odak — Gün 7", "Kaydedildi"),
                        ("Not • e‑Kitap", "Şükür Şifresi — Bölüm 2", "Not"),
                        ("Boş durum", "Henüz favori yoksa CTA görünür", "CTA"),
                    ),
                ),
                Screen(
                    id="favorite-detail",
                    title="Favori Detayı (Kaynağa Dön)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Keşfet → Favoriler → Detay",
                    us=("US-8.2",),
                    bullets=("Kaynak (yolculuk/gün/bölüm) net görünür.", "Not düzenleme autosave.", "Kaynağa Git doğru konuma götürür."),
                    device_title="Favori Detayı",
                    device_sub="Kaynağa Git",
                    tab="Keşfet",
                    device_tiles=(
                        ("Kaynak", "Yolculuk: Dikkat & Odak • Gün 7", "Aç"),
                        ("Not", "Autosave açık", "Düzenle"),
                        ("Paylaş", "Gizlilik önizlemesi ile", "Önizle"),
                    ),
                ),
                Screen(
                    id="collections",
                    title="Koleksiyonlar (Liste + Yönetim)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Keşfet → Favoriler → Koleksiyonlar",
                    us=("US-8.3",),
                    bullets=("Koleksiyon listesi + öğe sayısı.", "Koleksiyon oluştur (isim + ekle).", "Sil/yeniden adlandırma undo ile."),
                    device_title="Koleksiyonlar",
                    device_sub="Yeni",
                    tab="Keşfet",
                    device_tiles=(
                        ("Odak", "12 öğe", "Yönet"),
                        ("Şükür", "7 öğe", "Yönet"),
                        ("Yeni koleksiyon", "İsim gir → Ekle", "Ekle"),
                    ),
                ),
                Screen(
                    id="fav-search",
                    title="Ara & Filtrele",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Keşfet → Favoriler",
                    us=("US-8.4",),
                    bullets=("Başlık/not/etiket/kaynak alanlarında arama.", "Tür/dönem/gizlilik filtreleri.", "Temizle ile sıfırla."),
                    device_title="Favoriler",
                    device_sub="Filtre",
                    tab="Keşfet",
                    device_tiles=(
                        ("Arama", "“odak”", "Bul"),
                        ("Filtre", "Vurgu • Bu hafta • Özel", "Uygula"),
                        ("Temizle", "Tüm filtreleri sıfırla", "Temizle"),
                    ),
                ),
                Screen(
                    id="export",
                    title="Paylaşım / Dışa Aktarım (Gizlilik Kontrollü)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Favori Detayı → Paylaş",
                    us=("US-8.5",),
                    bullets=("Gizlilik uyarısı + kapsam seçimi.", "PDF’e aktar opsiyonu.", "İptalde içerik dışa aktarılmaz."),
                    device_title="Paylaş",
                    device_sub="Önizleme",
                    tab="Keşfet",
                    device_tiles=(
                        ("Kapsam", "Sadece vurgu / vurgu+not / link", "Seç"),
                        ("PDF", "PDF’e Aktar", "Üret"),
                        ("İptal", "Hiçbir şey dışa aktarılmaz", "İptal"),
                    ),
                ),
                Screen(
                    id="offline",
                    title="Çevrimdışı Erişim & Senkron",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Favoriler → İndirmeler",
                    us=("US-8.6",),
                    bullets=("İndirilen koleksiyon offline görüntülenir.", "Bağlantı gelince otomatik senkron.", "Depolama uyarısı + yönetim önerisi."),
                    device_title="Offline",
                    device_sub="Senkron",
                    tab="Keşfet",
                    device_tiles=(
                        ("Koleksiyon", "İndirildi • offline hazır", "Aç"),
                        ("Senkron", "Bağlantı geldi → güncelle", "Güncelle"),
                        ("Depolama", "Sınır uyarısı", "Yönet"),
                    ),
                ),
                Screen(
                    id="delete-undo",
                    title="Silme & Geri Al (Undo)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Favoriler → Yönet",
                    us=("US-8.7",),
                    bullets=("Silme öncesi açıklama (koleksiyondan da kalkar mı?).", "Silince snackbar: Geri al.", "Süre dolunca kalıcılaşır."),
                    device_title="Sil",
                    device_sub="Geri Al",
                    tab="Keşfet",
                    device_tiles=(
                        ("Sil", "Onay adımı", "Onay"),
                        ("Snackbar", "Geri al", "Undo"),
                        ("Süre", "Geri al süresi biter", "Kalıcı"),
                    ),
                ),
            ],
        )
    )

    # 3.7
    packs.append(
        (
            "3.7 — Hatırlatıcılar & Bildirimler",
            "3.7",
            "Hatirlaticilar_Bildirimler_iPhone17Pro.html",
            [11],
            [
                Screen(
                    id="perm",
                    title="Bildirim İzin Akışı (Neden + Seçenek)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Profil → Ayarlar → Hatırlatıcılar",
                    us=("US-11.1",),
                    bullets=("Neden gerekli açıklaması + örnek kullanım.", "“Bildirimleri Aç” → sistem izin penceresi.", "“Şimdilik Geç” ile akış bloklanmaz."),
                    device_title="Bildirim İzni",
                    device_sub="Neden?",
                    tab="Profil",
                    device_tiles=(
                        ("Neden?", "08:00 yeni gün, 23:59 teslim, okuma", "Bilgi"),
                        ("Bildirimleri Aç", "Sistem izni", "Aç"),
                        ("Şimdilik Geç", "Uygulama içi merkez çalışır", "Geç"),
                    ),
                ),
                Screen(
                    id="inbox",
                    title="Bildirim Merkezi (Uygulama İçi Gelen Kutusu)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Profil → Ayarlar → Hatırlatıcılar",
                    us=("US-11.2",),
                    bullets=("Okunmuş/okunmamış listesi.", "Tümü/Yolculuk/Önemli/Sistem filtreleri.", "Bildirim tıklayınca ilgili ekrana gider."),
                    device_title="Bildirimler",
                    device_sub="Filtre",
                    tab="Profil",
                    device_tiles=(
                        ("Teslim", "23:59’a 2 saat kaldı", "Aç"),
                        ("Yeni gün", "08:00’de açıldı", "Aç"),
                        ("Tümünü okundu", "Toplu işlem", "İşaretle"),
                    ),
                ),
                Screen(
                    id="reminders",
                    title="Hatırlatıcı Ayarları (Okuma/Yorum/Oyun)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Profil → Ayarlar → Hatırlatıcılar",
                    us=("US-11.3",),
                    bullets=("Varsayılan hatırlatmalar listelenir.", "Aç/Kapat + yeni hatırlatıcı ekle.", "Yorum hatırlatıcılarında 23:59 kuralı görünür."),
                    device_title="Hatırlatıcılar",
                    device_sub="Saat",
                    tab="Profil",
                    device_tiles=(
                        ("Yeni gün", "08:00", "Açık"),
                        ("Okuma", "20:00", "Açık"),
                        ("Yorum", "21:30 (23:59 kuralı)", "Açık"),
                    ),
                ),
                Screen(
                    id="streak",
                    title="Alışkanlık Zinciri (Takvim + Görevler)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Profil → Ayarlar → Hatırlatıcılar",
                    us=("US-11.4",),
                    bullets=("Haftalık takvim + seri bilgisi.", "Bugünkü görev durumu (oku/yorum/oyun).", "Görev tamamlayınca güncellenir."),
                    device_title="Zincir",
                    device_sub="Takvim",
                    tab="Profil",
                    device_tiles=(
                        ("Seri", "7 gün", "👍"),
                        ("Görev", "Bugün: Oku", "Bekliyor"),
                        ("Görev", "Bugün: Yorum", "Bekliyor"),
                    ),
                ),
                Screen(
                    id="dnd",
                    title="Sessiz Saatler & Kanallar (DND)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Profil → Ayarlar → Hatırlatıcılar",
                    us=("US-11.5",),
                    bullets=("DND aralığı seçimi.", "Kanal bazlı aç/kapat (Yolculuk/Oyun/AI/Sistem).", "İstisnalar (örn. güvenlik uyarısı)."),
                    device_title="Sessiz Saatler",
                    device_sub="DND",
                    tab="Profil",
                    device_tiles=(
                        ("Aralık", "22:00–07:00", "Aktif"),
                        ("Kanallar", "Yolculuk/Oyun/AI/Sistem", "Yönet"),
                        ("İstisna", "Önemli uyarılar", "Seç"),
                    ),
                ),
                Screen(
                    id="smart",
                    title="Akıllı Öneriler",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Profil → Ayarlar → Hatırlatıcılar",
                    us=("US-11.6",),
                    bullets=("Davranışa göre önerilen saatler.", "Kabul/ertele ve kontrol kullanıcıda.", "Rahatsız etmeyen sunum."),
                    device_title="Öneriler",
                    device_sub="Akıllı",
                    tab="Profil",
                    device_tiles=(
                        ("Öneri", "Okuma 20:30", "Uygula"),
                        ("Öneri", "Yorum 21:45", "Uygula"),
                        ("Kontrol", "Sessiz mod ile uyum", "Ayarla"),
                    ),
                ),
                Screen(
                    id="streak-save",
                    title="Seri Kurtarma",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Profil → Ayarlar → Hatırlatıcılar",
                    us=("US-11.7",),
                    bullets=("Seri bozulunca nazik kurtarma opsiyonu.", "Kural/limitler şeffaf.", "Kullanım sonrası seri güncellenir."),
                    device_title="Seri Kurtarma",
                    device_sub="Kural",
                    tab="Profil",
                    device_tiles=(
                        ("Durum", "Seri bozuldu", "⚠️"),
                        ("Kurtar", "Kural/limit", "Kullan"),
                        ("Geri bildirim", "Seri güncellendi", "✓"),
                    ),
                ),
            ],
        )
    )

    # 3.8
    packs.append(
        (
            "3.8 — Erişilebilirlik (Ayarlar)",
            "3.8",
            "Erisilebilirlik_Ayarlar_iPhone17Pro.html",
            [9, 16],
            [
                Screen(
                    id="a11y-hub",
                    title="Erişilebilirlik Merkezi (Tek Ekran)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Profil → Ayarlar → Erişilebilirlik",
                    us=("US-9.1",),
                    bullets=("Tek merkezden temel ayarlar.", "Hızlı önizleme alanı.", "Ayarlar anında uygulanır."),
                    device_title="Erişilebilirlik",
                    device_sub="Merkez",
                    tab="Profil",
                    device_tiles=(
                        ("Metin boyutu", "Önizlemeli", "Aç"),
                        ("Kontrast", "Yüksek kontrast", "Aç"),
                        ("Altyazı", "Video altyazı", "Aç"),
                    ),
                ),
                Screen(
                    id="text-size",
                    title="Metin Boyutu (Önizlemeli)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Erişilebilirlik → Metin",
                    us=("US-9.2", "US-16.2"),
                    bullets=("Text size + satır aralığı önizleme.", "Değişiklik anında uygulanır.", "Sistem ayarlarıyla uyum."),
                    device_title="Metin",
                    device_sub="Önizleme",
                    tab="Profil",
                    device_tiles=(
                        ("Boyut", "S/M/L", "Seç"),
                        ("Satır aralığı", "1.2 / 1.4 / 1.6", "Seç"),
                        ("Önizleme", "Okuyucu reflow", "Anında"),
                    ),
                ),
                Screen(
                    id="contrast",
                    title="Yüksek Kontrast & Tema",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Erişilebilirlik → Kontrast",
                    us=("US-9.3",),
                    bullets=("Yüksek kontrast modu.", "Renk körlüğü desteği (ikon/desen).", "Okunabilirlik testleri."),
                    device_title="Kontrast",
                    device_sub="Tema",
                    tab="Profil",
                    device_tiles=(
                        ("Mod", "Yüksek kontrast", "Aç"),
                        ("Renk körlüğü", "Desen/ikon", "Aç"),
                        ("Test", "Önizleme", "Gör"),
                    ),
                ),
                Screen(
                    id="captions",
                    title="Video Altyazı Ayarları",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Erişilebilirlik → Video",
                    us=("US-9.4", "US-16.5"),
                    bullets=("Altyazı aç/kapat, boyut, arka plan.", "Dil seçimi.", "Player içinde uygulanır."),
                    device_title="Altyazı",
                    device_sub="Video",
                    tab="Profil",
                    device_tiles=(
                        ("Altyazı", "Açık", "✓"),
                        ("Boyut", "Orta", "Seç"),
                        ("Arka plan", "Yarı saydam", "Seç"),
                    ),
                ),
                Screen(
                    id="transcript",
                    title="Video Transkript",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Erişilebilirlik / Video",
                    us=("US-9.5",),
                    bullets=("Transkript listesi.", "Zaman damgası ile videoya git.", "Arama."),
                    device_title="Transkript",
                    device_sub="Ara",
                    tab="Profil",
                    device_tiles=(
                        ("00:45", "Bölüm başlıyor…", "Git"),
                        ("01:30", "Örnek uygulama…", "Git"),
                        ("Ara", "Kelime ile", "Bul"),
                    ),
                ),
                Screen(
                    id="screenreader",
                    title="Screen Reader & Braille Uyumu",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Erişilebilirlik → Screen Reader",
                    us=("US-9.6", "US-16.3", "US-16.4"),
                    bullets=("VoiceOver/TalkBack etiketleri.", "Odak sırası ve alt metin.", "Braille uyumu / kısayollar."),
                    device_title="Screen Reader",
                    device_sub="Uyum",
                    tab="Profil",
                    device_tiles=(
                        ("VoiceOver", "Etiket standardı", "✓"),
                        ("Odak", "Sıra doğru", "✓"),
                        ("Braille", "Uyum", "✓"),
                    ),
                ),
                Screen(
                    id="audit",
                    title="Erişilebilirlik Denetimi (Audit/Rapor)",
                    phase="Faz-1",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Erişilebilirlik → Denetim",
                    us=("US-9.7",),
                    bullets=("Kontrol listesi + öneriler.", "Rapor paylaşımı opsiyonel.", "Anında uygulama bağlantıları."),
                    device_title="Denetim",
                    device_sub="Rapor",
                    tab="Profil",
                    device_tiles=(
                        ("Kontrast", "Uygun", "✓"),
                        ("Metin", "Öneri var", "Gör"),
                        ("Rapor", "Dışa aktar", "Paylaş"),
                    ),
                ),
                Screen(
                    id="a11y-test",
                    title="Erişilebilirlik Testi & Öneriler",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Bireysel / Aile / Grup",
                    nav="Erişilebilirlik",
                    us=("US-16.7",),
                    bullets=("Kısa test akışı.", "Sonuç + öneriler.", "Ayarları tek dokunuşla uygula."),
                    device_title="Test",
                    device_sub="Öneri",
                    tab="Profil",
                    device_tiles=(
                        ("Test", "2 dk", "Başla"),
                        ("Sonuç", "Öneriler", "Gör"),
                        ("Uygula", "Hızlı ayar", "Uygula"),
                    ),
                ),
            ],
        )
    )

    # 3.9 Videos
    packs.append(
        (
            "3.9 — Keşfet: Videolar",
            "3.9",
            "Kesfet_Videolar_iPhone17Pro.html",
            [18],
            [
                Screen(
                    id="video-lib",
                    title="Video Kütüphanesi",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan + entitlements",
                    nav="Keşfet → Videolar",
                    us=("US-18.1",),
                    bullets=("Kategori + keşfet listesi.", "Arama/filtre.", "Erişim kilidi plan/add-on ile."),
                    device_title="Videolar",
                    device_sub="Kategori",
                    tab="Keşfet",
                    device_tiles=(
                        ("Yeni", "Odak — 8 dk", "Aç"),
                        ("Popüler", "Şükür — 12 dk", "Aç"),
                        ("Kilitli", "Plan gerekir", "Kilit"),
                    ),
                ),
                Screen(
                    id="video-detail",
                    title="Video Detayı",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan + entitlements",
                    nav="Videolar → Detay",
                    us=("US-18.2",),
                    bullets=("Bölümler, kaydet, erişim durumu.", "Favoriye/sonradan izle.", "Erişim yoksa paywall ve bağlam korunur."),
                    device_title="Video Detayı",
                    device_sub="Kaydet",
                    tab="Keşfet",
                    device_tiles=(
                        ("Bölümler", "3 bölüm", "Aç"),
                        ("Sonradan İzle", "Kaydedildi", "✓"),
                        ("Paywall", "Gerekirse", "Aç"),
                    ),
                ),
                Screen(
                    id="player",
                    title="Video Oynatıcı",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan + entitlements",
                    nav="Video Detayı → Oynat",
                    us=("US-18.3",),
                    bullets=("Altyazı, hız, bölüm seçimi.", "Erişilebilir kontroller.", "Kaldığın yer kaydı."),
                    device_title="Oynatıcı",
                    device_sub="Altyazı",
                    tab="Keşfet",
                    device_tiles=(
                        ("Kontrol", "Play/Pause • 1.25×", "⋯"),
                        ("Altyazı", "Açık", "CC"),
                        ("Bölüm", "02:10", "Git"),
                    ),
                ),
                Screen(
                    id="downloads",
                    title="İndirmeler (Çevrimdışı)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan + depolama",
                    nav="Videolar → İndirmeler",
                    us=("US-18.4",),
                    bullets=("İndirilen videolar offline oynar.", "Depolama uyarısı ve yönetim.", "Senkron."),
                    device_title="İndirmeler",
                    device_sub="Offline",
                    tab="Keşfet",
                    device_tiles=(
                        ("İndirildi", "Odak — 8 dk", "Aç"),
                        ("Depolama", "Uyarı", "Yönet"),
                        ("Sil", "İndirilenleri yönet", "Sil"),
                    ),
                ),
                Screen(
                    id="video-collections",
                    title="Koleksiyonlar",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Videolar → Koleksiyonlar",
                    us=("US-18.5",),
                    bullets=("Koleksiyon listesi.", "Koleksiyona ekle/çıkar.", "Sıralama/arama."),
                    device_title="Koleksiyonlar",
                    device_sub="Video",
                    tab="Keşfet",
                    device_tiles=(
                        ("Başlangıç", "6 video", "Aç"),
                        ("Odak", "4 video", "Aç"),
                        ("Yeni", "Oluştur", "Ekle"),
                    ),
                ),
                Screen(
                    id="watchlater",
                    title="Sonradan İzle / Favoriler",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Videolar",
                    us=("US-18.6",),
                    bullets=("Kaydet/çıkar.", "Kaldığın yer ile devam.", "Liste filtreleri."),
                    device_title="Sonradan İzle",
                    device_sub="Devam",
                    tab="Keşfet",
                    device_tiles=(
                        ("Devam", "02:10 kaldı", "Devam"),
                        ("Favori", "Kaydedildi", "✓"),
                        ("Sil", "Listeden çıkar", "Sil"),
                    ),
                ),
                Screen(
                    id="video-feedback",
                    title="İçerik Geri Bildirimi / Hata Bildir",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Video Detayı → Geri bildirim",
                    us=("US-18.7",),
                    bullets=("Hata türü seçimi.", "Kısa açıklama + gönder.", "Takip numarası/teşekkür."),
                    device_title="Geri Bildirim",
                    device_sub="Gönder",
                    tab="Keşfet",
                    device_tiles=(
                        ("Tür", "Altyazı hatalı / Ses / İçerik", "Seç"),
                        ("Açıklama", "Kısa not", "Yaz"),
                        ("Gönder", "Teşekkür", "✓"),
                    ),
                ),
            ],
        )
    )

    # 3.10 Games
    packs.append(
        (
            "3.10 — Keşfet: Oyunlar",
            "3.10",
            "Kesfet_Oyunlar_iPhone17Pro.html",
            [17],
            [
                Screen(
                    id="games",
                    title="Oyunlar Ana Ekranı & Kategoriler",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup (+ Çocuk profili ops.)",
                    plan="Plan + entitlements",
                    nav="Keşfet → Oyunlar",
                    us=("US-17.1",),
                    bullets=("Kategoriler + önerilen oyunlar.", "Günlük görev ile ilişki.", "Erişim kilidi plan/add-on ile."),
                    device_title="Oyunlar",
                    device_sub="Kategori",
                    tab="Keşfet",
                    device_tiles=(
                        ("Quiz", "Odak • 3 dk", "Aç"),
                        ("Çocuk", "Veli onayı", "Kilit"),
                        ("Rozet", "Seri ödülü", "Gör"),
                    ),
                ),
                Screen(
                    id="child",
                    title="Çocuk Profili Oluşturma (Veli Onayı)",
                    phase="Faz-2",
                    role="Veli / Danışan",
                    segment="Aile / Grup",
                    plan="Aile / Grup",
                    nav="Oyunlar → Çocuk profili",
                    us=("US-17.2",),
                    bullets=("PIN/Onay adımı.", "Çocuk profili oluşturma.", "Gizlilik ve sınırlar."),
                    device_title="Çocuk Profili",
                    device_sub="PIN",
                    tab="Keşfet",
                    device_tiles=(
                        ("Onay", "Veli PIN", "Doğrula"),
                        ("Profil", "Yaş aralığı", "Kaydet"),
                        ("Sınır", "Süre limiti", "Ayarla"),
                    ),
                ),
                Screen(
                    id="game-detail",
                    title="Oyun Detayı",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Oyunlar → Detay",
                    us=("US-17.3",),
                    bullets=("Açıklama + ödüller.", "Güvenli mod.", "Başlat CTA."),
                    device_title="Oyun Detayı",
                    device_sub="Başlat",
                    tab="Keşfet",
                    device_tiles=(
                        ("Ödül", "XP + rozet", "Gör"),
                        ("Güvenli mod", "Aç/Kapat", "Ayar"),
                        ("Başlat", "Quiz", "Başla"),
                    ),
                ),
                Screen(
                    id="session",
                    title="Oyun Oturumu (Quiz)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Oyun başlat",
                    us=("US-17.4",),
                    bullets=("Soru akışı + anlık geri bildirim.", "Süre takibi.", "Çıkış/yeniden başlat."),
                    device_title="Quiz",
                    device_sub="Soru 2/10",
                    tab="Keşfet",
                    device_tiles=(
                        ("Soru", "Doğru seçenek?", "Seç"),
                        ("Süre", "00:18", "⏱"),
                        ("İleri", "Sonraki", "→"),
                    ),
                ),
                Screen(
                    id="rewards",
                    title="Seri/Rozet/Ödül",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Oyunlar",
                    us=("US-17.5",),
                    bullets=("Rozetler + seri durumu.", "Ödül geçmişi.", "Motivasyon dili."),
                    device_title="Ödüller",
                    device_sub="Rozet",
                    tab="Keşfet",
                    device_tiles=(
                        ("Rozet", "7 gün", "✓"),
                        ("Ödül", "XP +1", "+"),
                        ("Paylaş", "Özet", "↗"),
                    ),
                ),
                Screen(
                    id="parent",
                    title="Veli Paneli",
                    phase="Faz-2",
                    role="Veli",
                    segment="Aile / Grup",
                    plan="Aile / Grup",
                    nav="Oyunlar → Veli paneli",
                    us=("US-17.6",),
                    bullets=("Çocuk aktivite özeti.", "Süre sınırı yönetimi.", "Güvenli mod kontrolleri."),
                    device_title="Veli Paneli",
                    device_sub="Özet",
                    tab="Keşfet",
                    device_tiles=(
                        ("Bugün", "2 oyun", "Gör"),
                        ("Süre", "30 dk limit", "Ayarla"),
                        ("PIN", "Değiştir", "→"),
                    ),
                ),
                Screen(
                    id="limits",
                    title="Süre Sınırı & Gece Modu",
                    phase="Faz-2",
                    role="Veli / Danışan",
                    segment="Aile / Grup",
                    plan="Aile / Grup",
                    nav="Oyunlar → Ayarlar",
                    us=("US-17.7",),
                    bullets=("Süre limiti.", "Gece modu.", "İhlal durumunda nazik uyarı."),
                    device_title="Oyun Ayarları",
                    device_sub="Limit",
                    tab="Keşfet",
                    device_tiles=(
                        ("Limit", "30 dk", "Aç"),
                        ("Gece modu", "22:00–07:00", "Aç"),
                        ("Uyarı", "Süre doldu", "OK"),
                    ),
                ),
            ],
        )
    )

    # 3.11 AI
    packs.append(
        (
            "3.11 — Keşfet: AI (Add-on)",
            "3.11",
            "Kesfet_AI_AddOn_iPhone17Pro.html",
            [10],
            [
                Screen(
                    id="ai-chat",
                    title="AI Sohbet (Bağlamlı + Kaynaklı)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="AI Paketi (Add-on)",
                    nav="Keşfet → AI",
                    us=("US-10.1",),
                    bullets=("Aktif bağlam (örn. Bugünkü Not) görünür.", "Yanıt kaynak gösterir + Kaynağa Git.", "İçerik yoksa uydurmaz, yönlendirir."),
                    device_title="AI Sohbet",
                    device_sub="Kaynak",
                    tab="Keşfet",
                    device_tiles=(
                        ("Bağlam", "Gün 7: Odak", "Açık"),
                        ("Yanıt", "Kaynak: Şükür Şifresi Böl.2", "Git"),
                        ("Kilit", "AI Paketi gerekir", "Aç"),
                    ),
                ),
                Screen(
                    id="daily",
                    title="Günlük Derleme (Katalogdan)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="AI Paketi (Add-on)",
                    nav="Keşfet → AI",
                    us=("US-10.2",),
                    bullets=("Hedef/niyet seçimi.", "Derleme sistem içeriğinden seçilir.", "Her bölüm kaynak + Kaynağa Git."),
                    device_title="Günlük Derleme",
                    device_sub="300 kelime",
                    tab="Keşfet",
                    device_tiles=(
                        ("Niyet", "Odak", "Seç"),
                        ("Derleme", "Kaynaklı bölümler", "Gör"),
                        ("Kaynağa Git", "Bölüm 2", "→"),
                    ),
                ),
                Screen(
                    id="planning",
                    title="Otomatik Planlama (Sıklık + Saat + Kural)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="AI Paketi (Add-on)",
                    nav="Keşfet → AI",
                    us=("US-10.3",),
                    bullets=("Sıklık + saat seçimi.", "Kaynaklı otomatik seçim.", "08:00 / 23:59 kuralı şeffaf."),
                    device_title="Planlama",
                    device_sub="Sıklık",
                    tab="Keşfet",
                    device_tiles=(
                        ("Sıklık", "Her gün", "Seç"),
                        ("Saat", "08:10", "Seç"),
                        ("Kural", "08:00 aktif • teslim varsa 23:59", "Bilgi"),
                    ),
                ),
                Screen(
                    id="analysis",
                    title="AI Analiz & Özet",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="AI Paketi (Add-on)",
                    nav="Keşfet → AI",
                    us=("US-10.4",),
                    bullets=("Gün/hafta bazlı özet kartları.", "Tema/güçlü alan/zorlanma/öneri.", "Veri yetersizse net mesaj."),
                    device_title="AI Analiz",
                    device_sub="Özet",
                    tab="Keşfet",
                    device_tiles=(
                        ("Özet", "Son 7 gün", "Aç"),
                        ("Öneri", "Kaynaklı öneri", "Git"),
                        ("Veri", "Yetersizse mesaj", "Info"),
                    ),
                ),
                Screen(
                    id="ai-privacy",
                    title="Gizlilik & Kontrol (İndir/Sil/Devre Dışı)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="AI Paketi (Add-on)",
                    nav="Keşfet → AI",
                    us=("US-10.5",),
                    bullets=("İndir/sil/devre dışı seçenekleri.", "Silme onay + geri alınamaz.", "Devre dışı kalınca menüde pasif."),
                    device_title="AI Gizlilik",
                    device_sub="Kontrol",
                    tab="Keşfet",
                    device_tiles=(
                        ("İndir", "Kapsam şeffaf", "İndir"),
                        ("Sil", "Onay + geri alınamaz", "Sil"),
                        ("Devre dışı", "AI özellikleri pasif", "Kapat"),
                    ),
                ),
            ],
        )
    )

    # 3.12 Community
    packs.append(
        (
            "3.12 — Topluluk: Birlikte Okuma + Kitap Kulübü",
            "3.12",
            "Topluluk_BirlikteOkuma_KitapKulubu_iPhone17Pro.html",
            [12, 13],
            [
                Screen(
                    id="groups",
                    title="Birlikte Okuma Ana Ekranı (Gruplar)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Topluluk",
                    us=("US-12.1",),
                    bullets=("Grup listesi + katıl/oluştur.", "Aktif hedef/ilerleme özeti.", "Gizlilik ve rol rozetleri."),
                    device_title="Topluluk",
                    device_sub="Gruplar",
                    tab="Topluluk",
                    device_tiles=(
                        ("Grup", "Şükür — 5 kişi", "Aç"),
                        ("Katıl", "Kod/Link", "→"),
                        ("Oluştur", "Yeni grup", "+"),
                    ),
                ),
                Screen(
                    id="create-group",
                    title="Grup Oluşturma",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Topluluk → Oluştur",
                    us=("US-12.2",),
                    bullets=("Ad + tür + kişi sayısı.", "Gizlilik seçimi.", "Kurallar varsayılan."),
                    device_title="Grup Oluştur",
                    device_sub="Ayar",
                    tab="Topluluk",
                    device_tiles=(
                        ("Ad", "Şükür Grubu", "Yaz"),
                        ("Limit", "10 kişi", "Seç"),
                        ("Gizlilik", "Özel", "Seç"),
                    ),
                ),
                Screen(
                    id="invite",
                    title="Davet Et / Katıl (Kod/Link)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Topluluk",
                    us=("US-12.3",),
                    bullets=("Davet kodu/link.", "Katılım onayı.", "Spam önleme/limit."),
                    device_title="Davet",
                    device_sub="Kod",
                    tab="Topluluk",
                    device_tiles=(
                        ("Kod", "ABCD-1234", "Kopyala"),
                        ("Katıl", "Kod gir", "→"),
                        ("Onay", "Katılım onayı", "OK"),
                    ),
                ),
                Screen(
                    id="plan-rules",
                    title="Okuma Planı & Kurallar",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Grup detayı",
                    us=("US-12.4",),
                    bullets=("Tempo + hedef.", "Kurallar görünür.", "Değişiklik duyurusu."),
                    device_title="Plan",
                    device_sub="Kurallar",
                    tab="Topluluk",
                    device_tiles=(
                        ("Hedef", "Haftada 2 bölüm", "Seç"),
                        ("Kurallar", "Nazik dil", "Oku"),
                        ("Duyuru", "Değişiklik", "→"),
                    ),
                ),
                Screen(
                    id="shared-progress",
                    title="Ortak İlerleme (Harita/Tablo)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Grup detayı",
                    us=("US-12.5",),
                    bullets=("Üye bazlı ilerleme.", "Haftalık hedef karşılaştırması.", "Gizlilik seçenekleri."),
                    device_title="İlerleme",
                    device_sub="Tablo",
                    tab="Topluluk",
                    device_tiles=(
                        ("Sen", "2/2", "✓"),
                        ("Ayşe", "1/2", "→"),
                        ("Mehmet", "0/2", "→"),
                    ),
                ),
                Screen(
                    id="group-chat",
                    title="Grup Sohbeti",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Grup detayı",
                    us=("US-12.6",),
                    bullets=("Mesajlaşma + güvenli alan.", "Şikayet/rapor.", "Sessize alma."),
                    device_title="Sohbet",
                    device_sub="Güvenli",
                    tab="Topluluk",
                    device_tiles=(
                        ("Mesaj", "Gönder", "→"),
                        ("Şikayet", "Uygunsuz içerik", "!"),
                        ("Sessize al", "Bildirim durur", "🔕"),
                    ),
                ),
                Screen(
                    id="members",
                    title="Üyeler & Kurallar (Roller/Limit)",
                    phase="Faz-2",
                    role="Danışan (Moderatör/Üye)",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Grup detayı",
                    us=("US-12.7",),
                    bullets=("Üye listesi + roller.", "Limit/kurallar.", "Moderatör aksiyonları."),
                    device_title="Üyeler",
                    device_sub="Roller",
                    tab="Topluluk",
                    device_tiles=(
                        ("Moderatör", "Sen", "✓"),
                        ("Üyeler", "10 kişi", "→"),
                        ("Kurallar", "Güncelle", "→"),
                    ),
                ),
                Screen(
                    id="club-home",
                    title="Kitap Kulübü Ana Ekranı",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Topluluk → Kitap Kulübü",
                    us=("US-13.1", "US-13.2"),
                    bullets=("Kulüp listesi + katıl/oluştur.", "Materyal + tempo.", "Gizlilik."),
                    device_title="Kitap Kulübü",
                    device_sub="Kulüpler",
                    tab="Topluluk",
                    device_tiles=(
                        ("Kulüp", "Kur’an Analizleri — El Fatiha", "Aç"),
                        ("Oluştur", "Yeni kulüp", "+"),
                        ("Katıl", "Kod", "→"),
                    ),
                ),
                Screen(
                    id="club-detail",
                    title="Kulüp Detayı (Hedef + Tartışma)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Kitap Kulübü",
                    us=("US-13.3",),
                    bullets=("Bu hafta hedefi + ilerleme.", "Okumaya devam et CTA.", "Tartışma ve alıntılar kısayolu."),
                    device_title="Kulüp Detayı",
                    device_sub="Hedef",
                    tab="Topluluk",
                    device_tiles=(
                        ("Hedef", "Bu hafta: 10 sayfa", "Gör"),
                        ("Okumaya Devam", "Kaldığın yer", "Devam"),
                        ("Tartışma", "Konu", "Aç"),
                    ),
                ),
                Screen(
                    id="club-reader",
                    title="Okuyucu (Kulüp)",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Kitap Kulübü",
                    us=("US-13.4",),
                    bullets=("Metin seçimi aksiyonları: altını çiz/not/paylaş/günlüğe ekle.", "Kaydedilen vurgu Notlar & Alıntılar’a eklenir.", "Reflow + erişilebilirlik."),
                    device_title="Okuyucu",
                    device_sub="Vurgu",
                    tab="Topluluk",
                    device_tiles=(
                        ("Aksiyon", "Altını Çiz / Not / Paylaş", "⋯"),
                        ("Reflow", "Metin boyutu", "✓"),
                        ("Kaydet", "Alıntılara ekle", "✓"),
                    ),
                ),
                Screen(
                    id="quotes",
                    title="Notlar & Alıntılar",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Kitap Kulübü",
                    us=("US-13.5",),
                    bullets=("Alıntı/not listesi.", "Kulüple paylaş + günlüğe monte et (undo).", "Kaldığım yeri işaretle."),
                    device_title="Alıntılar",
                    device_sub="Paylaş",
                    tab="Topluluk",
                    device_tiles=(
                        ("Alıntı", "Bölüm 2", "Aç"),
                        ("Paylaş", "Kulüp", "Gönder"),
                        ("Günlüğe ekle", "Undo", "↩︎"),
                    ),
                ),
                Screen(
                    id="discussion",
                    title="Tartışma",
                    phase="Faz-2",
                    role="Danışan",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Kitap Kulübü",
                    us=("US-13.6",),
                    bullets=("Sabitlenmiş konu + yorumlar.", "Gönder geri bildirimi.", "Şikayet + sessize al."),
                    device_title="Tartışma",
                    device_sub="Gönder",
                    tab="Topluluk",
                    device_tiles=(
                        ("Konu", "Bu bölümde ne öğrendin?", "📌"),
                        ("Yorum", "Gönder", "→"),
                        ("Şikayet", "Uygunsuz içerik", "!"),
                    ),
                ),
                Screen(
                    id="moderation",
                    title="Kurallar & Moderasyon",
                    phase="Faz-2",
                    role="Moderatör",
                    segment="Bireysel / Aile / Grup",
                    plan="Plan",
                    nav="Kitap Kulübü",
                    us=("US-13.7",),
                    bullets=("Gizlilik, roller, kurallar.", "Üye yönetimi.", "Kulüp sonlandırma onayı."),
                    device_title="Moderasyon",
                    device_sub="Kurallar",
                    tab="Topluluk",
                    device_tiles=(
                        ("Gizlilik", "Özel/Açık", "Seç"),
                        ("Üyeler", "Yönet", "→"),
                        ("Sonlandır", "Onay", "⚠️"),
                    ),
                ),
            ],
        )
    )

    # 3.13 Coach
    packs.append(
        (
            "3.13 — Koç Ekranları",
            "3.13",
            "Koc_Ekranlari_iPhone17Pro.html",
            [7, 19],
            [
                Screen(
                    id="coach-list",
                    title="Koç Paneli: Danışan Listesi",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on / Yetki",
                    nav="Profil → Koç Paneli",
                    us=("US-7.1",),
                    bullets=("Atanan danışanlar listesi + durum.", "Arama/filtre.", "Yetki/yasal onay kontrolü."),
                    device_title="Koç Paneli",
                    device_sub="Danışanlar",
                    tab="Koç",
                    device_tiles=(
                        ("Danışan", "Aktif • risk: düşük", "Aç"),
                        ("Danışan", "Teslim yok • risk", "⚠️"),
                        ("Filtre", "Durum", "→"),
                    ),
                ),
                Screen(
                    id="coach-profile",
                    title="Danışan Profili (Hedef + Özet)",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on / Yetki",
                    nav="Koç Paneli → Danışan",
                    us=("US-7.2",),
                    bullets=("Hedefler + plan özeti.", "İzinler/gizlilik.", "Alt alanlara hızlı geçiş."),
                    device_title="Danışan",
                    device_sub="Profil",
                    tab="Koç",
                    device_tiles=(
                        ("Hedef", "Odak", "Gör"),
                        ("İlerleme", "7/21", "Gör"),
                        ("İzin", "Paylaşım", "Ayar"),
                    ),
                ),
                Screen(
                    id="coach-plan",
                    title="Plan & İçerik Takibi",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on / Yetki",
                    nav="Koç Paneli → Danışan",
                    us=("US-7.3",),
                    bullets=("İçerik/modül/test plan takibi.", "Kilitli ilerleme durumları.", "Not/teknik referansı."),
                    device_title="Plan Takibi",
                    device_sub="İçerik",
                    tab="Koç",
                    device_tiles=(
                        ("Modüller", "Kilitli/Devam", "Aç"),
                        ("Test", "Sonuç", "Gör"),
                        ("Teknik", "Notlar", "→"),
                    ),
                ),
                Screen(
                    id="coach-submissions",
                    title="Teslim Geçmişi",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on / Yetki",
                    nav="Koç Paneli → Danışan",
                    us=("US-7.4",),
                    bullets=("Teslim listesi + tarih.", "Eksik teslim uyarıları.", "Detaya gir."),
                    device_title="Teslimler",
                    device_sub="Geçmiş",
                    tab="Koç",
                    device_tiles=(
                        ("Gün 7", "Teslim: 23:41", "Aç"),
                        ("Gün 6", "Eksik", "⚠️"),
                        ("Filtre", "Hafta", "→"),
                    ),
                ),
                Screen(
                    id="coach-comment",
                    title="Koç Yorumu Yaz/Gönder",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on / Yetki",
                    nav="Koç Paneli → Danışan",
                    us=("US-7.5",),
                    bullets=("Taslak kaydet + gönder.", "Danışana bildirim.", "Gizlilik alanları ayrımı."),
                    device_title="Geri Bildirim",
                    device_sub="Gönder",
                    tab="Koç",
                    device_tiles=(
                        ("Taslak", "Kaydet", "💾"),
                        ("Gönder", "Danışana bildirim", "→"),
                        ("Gizlilik", "Sadece koça özel", "🔒"),
                    ),
                ),
                Screen(
                    id="coach-alerts",
                    title="Uyarılar (Risk / Teslim Yok)",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on / Yetki",
                    nav="Koç Paneli",
                    us=("US-7.6",),
                    bullets=("Risk sinyalleri.", "Teslim yok uyarısı.", "Nazik aksiyon önerileri."),
                    device_title="Uyarılar",
                    device_sub="Risk",
                    tab="Koç",
                    device_tiles=(
                        ("Risk", "Artış", "⚠️"),
                        ("Teslim", "2 gündür yok", "⚠️"),
                        ("Aksiyon", "Mesaj gönder", "→"),
                    ),
                ),
                Screen(
                    id="coach-consent",
                    title="Erişim & Onay Yönetimi",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on / Yetki",
                    nav="Koç Paneli",
                    us=("US-7.7",),
                    bullets=("Danışan onayları.", "Yetki sınırları.", "Audit log mantığı."),
                    device_title="Onaylar",
                    device_sub="Yetki",
                    tab="Koç",
                    device_tiles=(
                        ("Onay", "Paylaşım açık", "✓"),
                        ("Yetki", "Sınır", "→"),
                        ("Kayıt", "Audit", "→"),
                    ),
                ),
                Screen(
                    id="mentor-list",
                    title="Mentor/Koçluk: Danışan Listesi & Durum",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on",
                    nav="Profil → Koçluk",
                    us=("US-19.1",),
                    bullets=("Koçluk erişimi olan danışanlar.", "Durum/etiket.", "Yetki kontrolü."),
                    device_title="Koçluk",
                    device_sub="Liste",
                    tab="Koç",
                    device_tiles=(
                        ("Danışan", "Koçluk aktif", "Aç"),
                        ("Danışan", "Koçluk yok", "Kilit"),
                        ("Filtre", "Aktif", "→"),
                    ),
                ),
                Screen(
                    id="mentor-detail",
                    title="Mentor/Koçluk: Danışan Detayı (Hedef + İlerleme)",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on",
                    nav="Profil → Koçluk",
                    us=("US-19.2",),
                    bullets=("Hedef/plan/ilerleme.", "Mesajlaşma + görev gönderim kısayolu.", "Gizlilik izinleri."),
                    device_title="Koçluk Detay",
                    device_sub="Özet",
                    tab="Koç",
                    device_tiles=(
                        ("Mesaj", "Sohbet", "→"),
                        ("Görev", "Gönder", "→"),
                        ("Rapor", "Paylaşım izni", "→"),
                    ),
                ),
                Screen(
                    id="mentor-actions",
                    title="Mentor: Geri Bildirim / Notlar / Mesaj / Rapor (Akış Seti)",
                    phase="Faz-2",
                    role="Koç",
                    segment="PST Koçları",
                    plan="Koçluk Add-on",
                    nav="Profil → Koçluk",
                    us=("US-19.3", "US-19.4", "US-19.5", "US-19.6", "US-19.7"),
                    bullets=("Modül sonu geri bildirim + ödev.", "AI özet/sinyal şeffaf kaynaklı.", "Not/teknik/test kayıtları + güvenli mesajlaşma + rapor dışa aktarım izinleri."),
                    device_title="Koçluk Araçları",
                    device_sub="Akış",
                    tab="Koç",
                    device_tiles=(
                        ("Geri bildirim", "Taslak/Gönder", "→"),
                        ("AI özet", "Kaynaklı", "→"),
                        ("Rapor", "İzin iste", "→"),
                    ),
                ),
            ],
        )
    )

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / "tools").mkdir(parents=True, exist_ok=True)

    for title, pill, html_name, epics, screens in packs:
        html_out = OUT_DIR / html_name
        html_out.write_text(render_pack(title, pill, screens, stories), encoding="utf-8")

        spec_name = html_name.replace("_iPhone17Pro.html", "_Spec.md")
        (OUT_DIR / spec_name).write_text(render_spec(title, f"Model1/Designs/{html_name}", epics, screens), encoding="utf-8")

    print("Generated packs:", len(packs))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

