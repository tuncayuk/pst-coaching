#!/usr/bin/env python3
from __future__ import annotations

import dataclasses
import html
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
MODEL1 = ROOT / "Model1"
FLOWS_MD = MODEL1 / "PST_Mobile_SiteMap_ScreenInventory.md"
REV3_MD = MODEL1 / "UserStoriesRev3.md"
OUT_DIR = MODEL1 / "DesignsByUserFlows"

LOGO_SRC = "../Designs/assets/pst-coaching-logo.png"


@dataclasses.dataclass(frozen=True)
class UserStory:
    code: str
    epic: str
    phase: str
    role: str
    title: str
    description: str
    acceptance_html: str
    navigation_steps: str


@dataclasses.dataclass(frozen=True)
class Flow:
    number: str  # "1", "22A"
    title: str
    category: str
    steps_raw: str
    rules_raw: str
    us_raw: str


@dataclasses.dataclass(frozen=True)
class Screen:
    screen_id: str
    raw: str
    title: str
    breadcrumb: str
    kind: str  # "screen" | "gate"
    flow_number: str
    flow_title: str
    category: str


def html_escape(value: str) -> str:
    return html.escape(value, quote=True)


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = (
        value.replace("ı", "i")
        .replace("ş", "s")
        .replace("ğ", "g")
        .replace("ç", "c")
        .replace("ö", "o")
        .replace("ü", "u")
    )
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-")
    return value or "x"


def read_section(text: str, start_marker: str, end_marker: str) -> str:
    start = text.find(start_marker)
    if start == -1:
        raise ValueError(f"Start marker not found: {start_marker}")
    end = text.find(end_marker, start)
    if end == -1:
        raise ValueError(f"End marker not found: {end_marker}")
    return text[start:end]


def parse_user_stories(md: str) -> dict[str, UserStory]:
    stories: dict[str, UserStory] = {}
    for line in md.splitlines():
        if not line.startswith("| EPIC "):
            continue
        parts = [p.strip() for p in line.strip().strip("|").split("|")]
        if len(parts) < 7:
            continue
        epic, phase, role, story_name, story_desc, ac_html, nav = parts[:7]
        code_match = re.search(r"\b(US-\d+\.\d+)\b", story_name)
        if not code_match:
            continue
        code = code_match.group(1)
        title = story_name.split("—", 1)[-1].strip() if "—" in story_name else story_name.strip()
        stories[code] = UserStory(
            code=code,
            epic=epic,
            phase=phase,
            role=role,
            title=title,
            description=story_desc.strip(),
            acceptance_html=ac_html.strip(),
            navigation_steps=nav.strip(),
        )
    return stories


def parse_flows(md: str) -> list[Flow]:
    section = read_section(md, "## 2.1) Tüm User Flow’lar", "\n---\n\n## 3)")
    lines = section.splitlines()
    flows: list[Flow] = []
    current_category = "User Flows"

    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if line.startswith("### "):
            current_category = line[4:].strip()
            i += 1
            continue
        m = re.match(r"^####\s+(\d{1,2}A?)\)\s+(.+)$", line)
        if not m:
            i += 1
            continue

        number, title = m.group(1), m.group(2).strip()
        steps_raw = ""
        rules_raw = ""
        us_raw = ""
        j = i + 1
        while j < len(lines):
            nxt = lines[j].rstrip()
            if nxt.startswith("#### ") or nxt.startswith("### ") or nxt.startswith("## "):
                break
            if nxt.strip().startswith("- Adımlar:"):
                steps_raw = nxt.split(":", 1)[1].strip()
            elif nxt.strip().startswith("- Kurallar:"):
                rules_raw = nxt.split(":", 1)[1].strip()
            elif nxt.strip().startswith("- US:"):
                us_raw = nxt.split(":", 1)[1].strip()
            j += 1

        flows.append(
            Flow(
                number=number,
                title=title,
                category=current_category,
                steps_raw=steps_raw,
                rules_raw=rules_raw,
                us_raw=us_raw,
            )
        )
        i = j

    if not flows:
        raise ValueError("No flows parsed from section 2.1")
    return flows


def parse_us_codes(us_raw: str) -> list[str]:
    tokens: list[str] = []
    s = us_raw.replace("–", "-").replace("—", "-")
    for m in re.finditer(r"\bUS-(\d+)\.(\d+)\s*-\s*US-(\d+)\.(\d+)\b", s):
        a_major, a_minor, b_major, b_minor = map(int, m.groups())
        if a_major != b_major:
            tokens.append(f"US-{a_major}.{a_minor}")
            tokens.append(f"US-{b_major}.{b_minor}")
            continue
        for minor in range(min(a_minor, b_minor), max(a_minor, b_minor) + 1):
            tokens.append(f"US-{a_major}.{minor}")
    for m in re.finditer(r"\bUS-(\d+\.\d+)\b", s):
        tokens.append(f"US-{m.group(1)}")
    seen: set[str] = set()
    out: list[str] = []
    for t in tokens:
        if t in seen:
            continue
        seen.add(t)
        out.append(t)
    return out


def split_steps(steps_raw: str) -> list[str]:
    if not steps_raw:
        return []
    return [p.strip() for p in steps_raw.split("→") if p.strip()]


def classify_step(raw: str) -> tuple[str, str, str]:
    s = raw.strip()
    kind = "screen"
    if s.startswith("(") and s.endswith(")"):
        kind = "gate"
        s = s[1:-1].strip()
    if "->" in s:
        parts = [p.strip() for p in s.split("->") if p.strip()]
        title = parts[-1]
        breadcrumb = " / ".join(parts[:-1])
        return title, breadcrumb, kind
    return s, "", kind


def chunk_rules(rules_raw: str) -> list[str]:
    if not rules_raw:
        return []
    parts = [p.strip() for p in re.split(r";|\u2022", rules_raw) if p.strip()]
    if len(parts) <= 1:
        parts = [p.strip() for p in re.split(r"\.\s+", rules_raw) if p.strip()]
    return [p if p.endswith(".") else f"{p}." for p in parts if p]


def ac_to_list_items(acceptance_html: str) -> list[str]:
    parts = [p.strip() for p in re.split(r"<br\s*/?>", acceptance_html) if p.strip()]
    cleaned: list[str] = []
    for p in parts:
        p = re.sub(r"^[•\-\*\s]+", "", p).strip()
        if p:
            cleaned.append(p)
    return cleaned


def choose_stories_for_screen(screen: Screen, story_by_code: dict[str, UserStory], flow_codes: list[str]) -> list[UserStory]:
    title = screen.title.lower()
    crumbs = [c.strip().lower() for c in screen.breadcrumb.split("/") if c.strip()]
    out: list[UserStory] = []
    for code in flow_codes:
        st = story_by_code.get(code)
        if not st:
            continue
        nav = st.navigation_steps.lower()
        if title and title in nav:
            out.append(st)
            continue
        if any(c and c in nav for c in crumbs):
            out.append(st)
            continue
    if out:
        return out
    return [story_by_code[c] for c in flow_codes if c in story_by_code]


def category_href(category: str) -> str:
    return f"CAT_{slugify(category)}.html"


def flow_sort_key(flow: Flow) -> tuple[int, int]:
    m = re.match(r"^(\d+)(A?)$", flow.number)
    if not m:
        return (999, 0)
    base = int(m.group(1))
    suffix = 1 if m.group(2) else 0
    return (base, suffix)


def screens_for_flow(flow: Flow) -> list[Screen]:
    steps = split_steps(flow.steps_raw)
    screens: list[Screen] = []
    for idx, raw in enumerate(steps):
        title, breadcrumb, kind = classify_step(raw)
        derived_title = title
        if kind == "gate":
            raw_l = raw.lower()
            if "gated" in raw_l or "paywall" in raw_l:
                derived_title = "Paywall"
            elif "kilit" in raw_l:
                derived_title = "Kilitli Erişim"
            else:
                derived_title = "Geçit"
        screens.append(
            Screen(
                screen_id=f"UF{flow.number}-S{idx+1}-{slugify(derived_title)[:28]}",
                raw=raw,
                title=derived_title,
                breadcrumb=breadcrumb,
                kind=kind,
                flow_number=flow.number,
                flow_title=flow.title,
                category=flow.category,
            )
        )
    if not screens:
        screens = [
            Screen(
                screen_id=f"UF{flow.number}-S1",
                raw=flow.title,
                title=flow.title,
                breadcrumb=flow.category,
                kind="screen",
                flow_number=flow.number,
                flow_title=flow.title,
                category=flow.category,
            )
        ]
    return screens


def render_app_ui(screen: Screen, next_id: str | None, prev_id: str | None) -> str:
    raise RuntimeError("render_app_ui now requires stories; call render_app_ui_from_stories()")


def render_app_ui_from_stories(
    screen: Screen,
    stories: list[UserStory],
    next_id: str | None,
    prev_id: str | None,
) -> str:
    """
    Render production-oriented UI inside the device using heuristics from US/AC.
    US/AC codes and full details must NOT appear inside the device UI.
    """
    t = screen.title.lower()
    raw_l = screen.raw.lower()
    story_titles = " ".join(st.title for st in stories).lower()
    ac_text = " ".join(" ".join(ac_to_list_items(s.acceptance_html)) for s in stories).lower()
    corpus = " ".join([t, raw_l, story_titles, ac_text])

    def btn(label: str, go: str | None, primary: bool = False) -> str:
        if not go:
            return ""
        cls = "btn primary" if primary else "btn"
        return f'<button class="{cls}" data-go="{go}">{html_escape(label)}</button>'

    back = btn("Geri", prev_id, primary=False) if prev_id else ""
    primary = btn("Devam", next_id, primary=True) if next_id else ""

    def badge(text: str, tone: str = "neutral") -> str:
        cls = "b"
        if tone == "ok":
            cls = "b ok"
        elif tone == "warn":
            cls = "b warn"
        elif tone == "info":
            cls = "b info"
        return f'<span class="{cls}">{html_escape(text)}</span>'

    def icon_svg(name: str) -> str:
        icons: dict[str, str] = {
            "chevron": '<path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
            "search": '<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none"/><path d="M20 20l-3.2-3.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
            "shield": '<path d="M12 2l8 4v6c0 5-3.4 9.2-8 10-4.6-.8-8-5-8-10V6l8-4z" fill="none" stroke="currentColor" stroke-width="2"/>',
            "bell": '<path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13.7 21a2 2 0 01-3.4 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
            "lock": '<path d="M7 11V8a5 5 0 0110 0v3" fill="none" stroke="currentColor" stroke-width="2"/><rect x="5" y="11" width="14" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="2"/>',
            "card": '<rect x="3" y="5" width="18" height="14" rx="2.4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18" stroke="currentColor" stroke-width="2"/>',
            "users": '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M22 21v-2a4 4 0 00-3-3.87" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 3.13a4 4 0 010 7.75" fill="none" stroke="currentColor" stroke-width="2"/>',
            "book": '<path d="M4 19a2 2 0 012-2h14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 17V5a2 2 0 012-2h12v16" fill="none" stroke="currentColor" stroke-width="2"/>',
            "play": '<polygon points="10,8 18,12 10,16" fill="currentColor"/>',
            "spark": '<path d="M12 2l1.5 5L19 9l-5.5 2L12 16l-1.5-5L5 9l5.5-2L12 2z" fill="currentColor"/>',
        }
        body = icons.get(name, icons["chevron"])
        return f'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">{body}</svg>'

    def pick_icon(title: str) -> str:
        s = title.lower()
        if any(k in s for k in ["paywall", "kilit", "lock"]):
            return "lock"
        if any(k in s for k in ["bildirim", "hatırlat"]):
            return "bell"
        if any(k in s for k in ["ödem", "satın", "plan"]):
            return "card"
        if any(k in s for k in ["üye", "kişi", "seat", "aile", "grup"]):
            return "users"
        if any(k in s for k in ["kitap", "okuyucu", "e‑kitap", "e-kitap"]):
            return "book"
        if any(k in s for k in ["video", "oynat"]):
            return "play"
        if any(k in s for k in ["ai", "asistan"]):
            return "spark"
        return "shield"

    def tile(title: str, meta: str = "", right: str = "›", badge_text: str = "") -> str:
        m = f'<div class="tileMeta">{html_escape(meta)}</div>' if meta else ""
        b = f'<div class="tileBadge">{badge(badge_text, "info")}</div>' if badge_text else ""
        leading = icon_svg(pick_icon(title))
        return f"""
        <div class="tile" role="button" tabindex="0" aria-label="{html_escape(title)}">
          <div class="tileLeading">{leading}</div>
          <div class="tileText">
            <div class="tileTitle">{html_escape(title)}</div>
            {m}
          </div>
          {b}
          <div class="tileRight">{icon_svg("chevron") if right == "›" else html_escape(right)}</div>
        </div>
        """.rstrip()

    def checklist(items: list[tuple[str, bool]]) -> str:
        rows = []
        for text, ok in items:
            icon = "✓" if ok else "•"
            tone = "ok" if ok else "neutral"
            rows.append(
                f'<div class="check"><div class="checkL">{badge(icon, tone)}</div><div class="checkT">{html_escape(text)}</div></div>'
            )
        return '<div class="checklist">' + "".join(rows) + "</div>"

    def search_bar(placeholder: str = "Ara") -> str:
        return f"""
        <div class="search">
          <div class="searchIcon">{icon_svg("search")}</div>
          <div class="searchText">{html_escape(placeholder)}</div>
        </div>
        """.rstrip()

    def chips(items: list[str]) -> str:
        if not items:
            return ""
        return (
            '<div class="chips">'
            + "".join(f'<span class="chip">{html_escape(x)}</span>' for x in items)
            + "</div>"
        )

    def kpis(items: list[tuple[str, str]]) -> str:
        return (
            '<div class="kpis">'
            + "".join(
                f'<div class="kpi"><div class="kpiV">{html_escape(v)}</div><div class="kpiK">{html_escape(k)}</div></div>'
                for k, v in items
            )
            + "</div>"
        )

    def status_strip() -> str:
        # Show states only when explicitly implied by US/AC. Avoid UI noise.
        parts: list[str] = []
        if "skeleton" in corpus or "yüklen" in corpus:
            parts.append(badge("Loading", "info"))
        if "offline" in corpus or "bağlantı yok" in corpus:
            parts.append(badge("Offline", "warn"))
        if "hata" in corpus or "tekrar dene" in corpus:
            parts.append(badge("Error+Retry", "warn"))
        if "boş" in corpus or "veri yok" in corpus or "empty" in corpus:
            parts.append(badge("Empty", "neutral"))
        if not parts:
            return ""
        return '<div class="stateRow">' + "".join(parts) + "</div>"

    def is_settings_screen() -> bool:
        head = " ".join([t, raw_l, (screen.breadcrumb or "").lower()])
        return any(
            k in head
            for k in [
                "ayar",
                "erişilebilir",
                "bildirim",
                "hatırlat",
                "dnd",
                "gizlilik",
                "kontrol",
                "dil",
            ]
        )

    def list_item_templates() -> list[tuple[str, str, str, str]]:
        """
        Returns list of (title, meta, chevron, badge_text) for contextual list screens.
        """
        head = " ".join([t, raw_l, (screen.breadcrumb or "").lower(), screen.flow_title.lower()])
        if "modül" in head:
            return [
                ("Modül 1", "Tamamlandı • 3/3 görev", "›", "Tamamlandı"),
                ("Modül 2", "Devam • 1/3 görev", "›", "Devam"),
                ("Modül 3", "Kilitli • Önkoşul eksik", "›", "Kilitli"),
            ]
        if "görev" in head:
            return [
                ("Görev 1", "Taslak kaydediliyor", "›", "Taslak"),
                ("Görev 2", "Bekliyor", "›", ""),
                ("Gönder ve Tamamla", "Deadline varsa şeffaf gösterilir", "›", "CTA"),
            ]
        if "sertifika" in head or "özeti" in head or "kilit geçmiş" in head:
            return [
                ("İlerleme Özeti", "19/21 gün • zincir 7", "›", ""),
                ("Kilit Geçmişi", "08:00 açılma • teslim", "›", "Şeffaf"),
                ("Sertifikayı Gör", "Koşul sağlanınca aktif", "›", "PDF"),
            ]
        if "koltuk" in head or "seat" in head or "kişi yönetimi" in head or "üye" in head:
            return [
                ("Üye: Aile Üyesi 1", "Aktif • koltuk bağlı", "›", ""),
                ("Üye: Aile Üyesi 2", "Davet bekliyor", "›", "Bekliyor"),
                ("Üye ekle", "Limit/plan kuralı", "›", "CTA"),
            ]
        if "ödeme" in head or "makbuz" in head or "işlem" in head:
            return [
                ("İşlem #2026", "Plan • ₺XXX,XX • Başarılı", "›", ""),
                ("İşlem #2025", "Add-on • ₺XX,XX • Başarılı", "›", ""),
                ("Satın alımları geri yükle", "Doğrula ve güncelle", "›", "CTA"),
            ]
        if "favori" in head or "arşiv" in head:
            return [
                ("Koleksiyon: Benim Notlarım", "12 öğe", "›", ""),
                ("Son görüntülenenler", "Kaldığın yer ile", "›", "Son"),
                ("Paylaş / Export", "Gizlilik önizlemesi", "›", "CTA"),
            ]
        if "video" in head:
            return [
                ("Video: Rehber 1", "7 dk • kaldığın yer", "›", "Devam"),
                ("Koleksiyon: İbadet Rehberi", "10 video", "›", ""),
                ("İndirilenler", "Çevrimdışı", "›", "Offline"),
            ]
        if "oyun" in head:
            return [
                ("Oyun: Quiz 1", "5 dk • seri", "›", "Başla"),
                ("Çocuk Profili", "Veli onayı/PIN", "›", ""),
                ("Veli Paneli", "Limit / gece modu", "›", "PIN"),
            ]
        if "topluluk" in head or "kulüp" in head or "grup" in head:
            return [
                ("Grup: Birlikte Okuma", "Üyeler • plan", "›", "Yeni"),
                ("Kulüp: Kitap Kulübü", "Tartışma • alıntılar", "›", ""),
                ("Davet et", "Kod/link", "›", "CTA"),
            ]
        if "asistan" in head:
            return [
                ("Hedef/Niyet", "Kısa anket", "›", ""),
                ("Duygu Check‑in", "Bugün nasıl hissediyorsun?", "›", ""),
                ("Plan Oluştur", "Sıklık + saat", "›", "CTA"),
            ]
        if "ai" in head:
            return [
                ("AI Sohbet", "Kaynak gösterimli", "›", "Add-on"),
                ("Günlük Derleme", "Katalogdan seç", "›", ""),
                ("Gizlilik & Kontrol", "İndir/sil/devre dışı", "›", ""),
            ]
        if "yolculuk" in head:
            return [
                ("Yolculuk: Örnek", "Detay • hedef", "›", ""),
                ("Başlat", "08:00 / 23:59", "›", "CTA"),
                ("Yolculuklarım", "Aktif/Pasif", "›", ""),
            ]
        base = screen.title.strip() or "İçerik"
        return [
            (f"{base} — Kart 1", "Durum etiketi • Kısa açıklama", "›", "Yeni"),
            (f"{base} — Kart 2", "Kaldığın yer • İlerleme", "›", ""),
            (f"{base} — Kart 3", "Kilitli/erişim etiketi", "›", "Kilitli"),
        ]

    if "splash" in t or "oturum kontrol" in raw_l:
        return f"""
        <div class="hero">
          <img class="heroLogo" src="{LOGO_SRC}" alt="PST Coaching" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <div class="heroLogoFallback" aria-hidden="true"></div>
          <div class="heroTitle">Hoş Geldin</div>
          <div class="heroSub">Oturum kontrol ediliyor…</div>
          {status_strip()}
          <div class="row">{primary}</div>
        </div>
        """.rstrip()

    if "dil" in t:
        return f"""
        <div class="card">
          <div class="h2">Dil Seçimi</div>
          <div class="muted">Seçimin cihazda saklanır ve profile senkronlanır.</div>
        </div>
        <div class="card">
          {tile("Türkçe", "Varsayılan")}
          {tile("English")}
          {tile("Español")}
        </div>
        {status_strip()}
        <div class="row">{back}{primary}</div>
        """.rstrip()

    if "kayıt" in t and "otp" not in t:
        return f"""
        <div class="card">
          <div class="h2">Kayıt Ol</div>
          <div class="muted">E‑posta veya telefon ile devam et.</div>
        </div>
        <div class="card">
          {status_strip()}
          <div class="field">
            <label>E‑posta / Telefon</label>
            <div class="input">ornek@pstcoaching.com</div>
          </div>
          <div class="row">{primary}</div>
        </div>
        <div class="row">{back}</div>
        """.rstrip()

    if "otp" in t:
        return f"""
        <div class="card">
          <div class="h2">OTP Doğrulama</div>
          <div class="muted">Kodu gir (retry/cooldown kuralları uygulanır).</div>
        </div>
        <div class="card">
          {status_strip()}
          <div class="otpRow">
            <div class="otp">•</div><div class="otp">•</div><div class="otp">•</div><div class="otp">•</div><div class="otp">•</div><div class="otp">•</div>
          </div>
          <div class="row">{primary}</div>
          <div class="linkRow"><a href="#" data-go="{screen.screen_id}">Kodu yeniden gönder</a></div>
        </div>
        <div class="row">{back}</div>
        """.rstrip()

    if "giriş" in t and "oturum doldu" not in raw_l:
        return f"""
        <div class="card">
          <div class="h2">Giriş Yap</div>
          <div class="muted">Güvenli giriş • Rol/plan senkronu açılışta yapılır.</div>
        </div>
        <div class="card">
          {status_strip()}
          <div class="field">
            <label>E‑posta / Telefon</label>
            <div class="input">ornek@pstcoaching.com</div>
          </div>
          <div class="field">
            <label>Şifre</label>
            <div class="input">••••••••</div>
          </div>
          <div class="row">{primary}</div>
        </div>
        <div class="row">{back}</div>
        """.rstrip()

    if "şifremi unuttum" in raw_l:
        return f"""
        <div class="card">
          <div class="h2">Şifremi Unuttum</div>
          <div class="muted">E‑posta/telefon doğrulaması ile sıfırla.</div>
        </div>
        <div class="card">
          {status_strip()}
          <div class="field">
            <label>E‑posta / Telefon</label>
            <div class="input">ornek@pstcoaching.com</div>
          </div>
          <div class="row">{primary}</div>
        </div>
        <div class="row">{back}</div>
        """.rstrip()

    if "yeni şifre" in raw_l:
        return f"""
        <div class="card">
          <div class="h2">Yeni Şifre</div>
          <div class="muted">Politikalara uygun bir şifre belirle.</div>
        </div>
        <div class="card">
          {status_strip()}
          <div class="field">
            <label>Yeni şifre</label>
            <div class="input">••••••••••</div>
          </div>
          <div class="field">
            <label>Yeni şifre (tekrar)</label>
            <div class="input">••••••••••</div>
          </div>
          <div class="row">{primary}</div>
        </div>
        <div class="row">{back}</div>
        """.rstrip()

    if "oturum doldu" in raw_l or "session expiry" in raw_l:
        return f"""
        <div class="card warn">
          <div class="h2">Oturum Süresi Doldu</div>
          <div class="muted">Devam etmek için tekrar giriş yap.</div>
          {status_strip()}
          <div class="row">{primary}</div>
        </div>
        <div class="row">{back}</div>
        """.rstrip()

    if "paywall" in t:
        reason = "Bu özellik plan gerektirir."
        if "ai" in corpus and "add-on" in corpus:
            reason = "Bu özellik AI Add‑on gerektirir."
        return f"""
        <div class="card">
          <div class="h2">Kilitli</div>
          <div class="muted">{html_escape(reason)} Neden kilitli olduğunu tek cümlede açıklarız.</div>
        </div>
        <div class="card">
          {tile("Planları karşılaştır", "Bireysel • Aile • Grup", "›", "Şeffaf")}
          {tile("Satın alımları geri yükle", "Ödedim ama açılmadı", "›")}
        </div>
        {status_strip()}
        <div class="row">{back}{btn("Plan Seç", next_id, primary=True)}</div>
        """.rstrip()

    if "plan seçimi" in raw_l:
        return f"""
        <div class="card">
          <div class="h2">Plan Seçimi</div>
          <div class="muted">Planlar ve kişi limitleri şeffaf görünür.</div>
        </div>
        <div class="card">
          {search_bar("Plan ara / karşılaştır")}
          {chips(["Bireysel", "Aile", "Grup", "Öğrenci %50"])}
          {tile("Bireysel", "1 kişi • Core içerikler", "Seç", "Popüler")}
          {tile("Aile", "5 kişi • Seat yönetimi", "Seç")}
          {tile("Grup", "10 kişi • Grup yönetimi", "Seç")}
        </div>
        {status_strip()}
        <div class="row">{back}{btn("Devam Et", next_id, primary=True)}</div>
        """.rstrip()

    if "satın alma" in raw_l or "abonelik başlatma" in raw_l:
        return f"""
        <div class="card">
          <div class="h2">Satın Alma</div>
          <div class="muted">Erişim doğrulanıyor… (gerekirse “doğrulanıyor” durumu gösterilir)</div>
        </div>
        <div class="card">
          {tile("Seçili Plan", "Aile • Aylık", "")}
          {tile("Entitlement", "Server-side doğrulama", "")}
          {tile("Toplam", "₺XXX,XX", "")}
        </div>
        {status_strip()}
        <div class="row">{back}{btn("Satın Al", next_id, primary=True)}</div>
        """.rstrip()

    if "erişim açıldı" in raw_l or "aktivasyon" in raw_l:
        return f"""
        <div class="card ok">
          <div class="h2">Erişim Aktif</div>
          <div class="muted">Planın doğrulandı. Devam edebilirsin.</div>
        </div>
        <div class="card">
          {kpis([("Durum", "Aktif"), ("Rol", "Plan Sahibi"), ("Koltuk", "—")])}
        </div>
        {status_strip()}
        <div class="row">{btn("Ana Sayfa", next_id, primary=True)}{back}</div>
        """.rstrip()

    # Generic production-ready renderer based on detected features.
    sections: list[str] = []
    header = f"""
        <div class="card">
          <div class="h2">{html_escape(screen.title)}</div>
          <div class="muted">{html_escape(screen.breadcrumb or screen.flow_title)}</div>
          {status_strip()}
        </div>
    """.rstrip()
    sections.append(header)

    if ("arama" in corpus or "search" in corpus) and not is_settings_screen():
        sections.append(f'<div class="card">{search_bar("Ara")}{chips(["Tümü", "Önemli", "Son"])}' + "</div>")

    if "filtre" in corpus or "kategori" in corpus or "sırala" in corpus:
        sections.append(f'<div class="card">{chips(["Filtre", "Kategori", "Sırala", "Seviye"])}' + "</div>")

    if is_settings_screen():
        sections.append(
            "<div class='card'>"
            + tile("Aç / Kapat", "Tercih yönetimi", "›")
            + tile("Zamanlama", "Saat / gün seçimi", "›")
            + tile("Sessiz saatler", "DND + kanallar", "›")
            + "</div>"
        )

    if "liste" in corpus or "katalog" in corpus or "kütüphane" in corpus or "geçmiş" in corpus:
        items = list_item_templates()
        sections.append(
            "<div class='card'>"
            + "".join(tile(a, b, c, d) for a, b, c, d in items)
            + "</div>"
        )

    if "yorum" in corpus or "taslak" in corpus or "gönder" in corpus or "teslim" in corpus:
        sections.append(
            "<div class='card'>"
            + kpis([("Deadline", "23:59"), ("Yeni Gün", "08:00"), ("Kelime", "120/300")])
            + "</div>"
        )
        sections.append(
            "<div class='card'>"
            + "<div class='field'><label>Yanıt</label><div class='input' style='height:90px; align-items:flex-start; padding-top:10px;'>Metin taslağı…</div></div>"
            + "</div>"
        )

    if "önkoşul" in corpus or "checklist" in corpus or "kilit" in corpus:
        sections.append(
            "<div class='card'>"
            + "<div class='h2' style='font-size:12px;'>Önkoşullar</div>"
            + checklist(
                [
                    ("Önceki görev tamamlandı", True),
                    ("Yorum teslim edildi", "teslim" in corpus),
                    ("08:00 kapısı bekleniyor", "08:00" in corpus),
                ]
            )
            + "</div>"
        )

    if "video" in corpus or "oynatıcı" in corpus or "altyaz" in corpus or "transkript" in corpus:
        sections.append(
            "<div class='card'>"
            + "<div class='player'>"
            + "<div class='playerFrame'><div class='playerPlay'>▶</div></div>"
            + "<div class='playerRow'>"
            + badge("1.0×", "neutral")
            + badge("Altyazı", "info")
            + badge("Bölümler", "neutral")
            + "</div>"
            + "</div>"
            + "</div>"
        )

    if "oyun" in corpus or "veli" in corpus or "pin" in corpus:
        sections.append(
            "<div class='card'>"
            + tile("Çocuk Profili", "Veli onayı/PIN", "›")
            + tile("Süre limiti", "15 dk / 30 dk", "›")
            + tile("Gece modu", "22:00 sonrası", "›")
            + "</div>"
        )

    if "grafik" in corpus or "harita" in corpus or "özet" in corpus or "rapor" in corpus:
        sections.append(
            "<div class='card'>"
            + kpis([("Teslim", "19/21"), ("Zincir", "7 gün"), ("Trend", "+")])
            + "<div class='chart' aria-hidden='true'></div>"
            + "</div>"
        )

    if "gizlilik" in corpus or "indir" in corpus or "sil" in corpus or "devre dış" in corpus:
        sections.append(
            "<div class='card'>"
            + tile("Verimi indir", "Kapsamı göster", "›")
            + tile("Geçmişi sil", "Onay adımı", "›")
            + tile("AI’ı devre dışı bırak", "Geri açılabilir", "›")
            + "</div>"
        )

    if len(sections) == 1:
        sections.append(
            "<div class='card'>"
            + tile("Durumlar", "loading/empty/error/offline", "›")
            + tile("Aksiyonlar", "tek CTA + geri dönüş bağlamı", "›")
            + "</div>"
        )

    return "\n".join(sections) + f"\n<div class='row'>{back}{primary}</div>"


def render_category_html(category: str, flows: list[Flow], story_by_code: dict[str, UserStory]) -> str:
    flows_sorted = sorted(flows, key=flow_sort_key)
    all_screens: list[Screen] = []
    for f in flows_sorted:
        all_screens.extend(screens_for_flow(f))

    def flow_first_screen_id(flow_number: str) -> str:
        for s in all_screens:
            if s.flow_number == flow_number:
                return s.screen_id
        return all_screens[0].screen_id

    flow_links = "\n".join(
        f'<a class="flowItem" href="#{flow_first_screen_id(f.number)}" data-jump="{flow_first_screen_id(f.number)}">'
        f'<div class="flowNo">#{html_escape(f.number)}</div>'
        f'<div class="flowText"><div class="flowTitle">{html_escape(f.title)}</div>'
        f'<div class="flowMeta">{html_escape(f.steps_raw)}</div></div>'
        f"</a>"
        for f in flows_sorted
    )

    pages: list[str] = []
    for idx, s in enumerate(all_screens):
        prev_id = all_screens[idx - 1].screen_id if idx > 0 else None
        next_id = all_screens[idx + 1].screen_id if idx < len(all_screens) - 1 else None

        flow = next((f for f in flows_sorted if f.number == s.flow_number), None)
        flow_codes = parse_us_codes(flow.us_raw if flow else "")
        stories = choose_stories_for_screen(s, story_by_code, flow_codes)

        stories_blocks: list[str] = []
        for st in stories[:10]:
            ac_items = ac_to_list_items(st.acceptance_html)
            ac_html = "\n".join(f"<li>{html_escape(x)}</li>" for x in ac_items[:10]) or "<li>—</li>"
            stories_blocks.append(
                f"""
                <div class="usCard">
                  <div class="usHead">
                    <div class="usCode">{html_escape(st.code)}</div>
                    <div class="usMeta">{html_escape(st.epic)} • {html_escape(st.phase)} • {html_escape(st.role)}</div>
                  </div>
                  <div class="usTitle">{html_escape(st.title)}</div>
                  <div class="usDesc">{html_escape(st.description)}</div>
                  <details class="usAC" open>
                    <summary>Acceptance Criteria</summary>
                    <ul>{ac_html}</ul>
                  </details>
                </div>
                """.rstrip()
            )
        stories_html = "\n".join(stories_blocks) if stories_blocks else "<div class='muted'>—</div>"

        rules_list = chunk_rules(flow.rules_raw if flow else "")
        rules_html = "\n".join(f"<li>{html_escape(r)}</li>" for r in rules_list) or "<li>—</li>"

        # Render inside-device UI from matching stories (no US/AC codes inside).
        in_device_ui = render_app_ui_from_stories(s, stories, next_id=next_id, prev_id=prev_id)

        pages.append(
            f"""
        <section class="page" id="{s.screen_id}" data-flow="{html_escape(s.flow_number)}">
          <div class="layout">
            <div class="deviceWrap">
              <div class="device">
                <div class="deviceBezel">
                  <div class="deviceTop">
                    <div class="left">
                      <img class="logo" src="{LOGO_SRC}" alt="PST Coaching" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                      <div class="logoFallback" aria-hidden="true"></div>
                      <div class="topText">
                        <div class="screenTitle">{html_escape(s.title)}</div>
                        <div class="crumb">{html_escape(s.breadcrumb or s.flow_title)}</div>
                      </div>
                    </div>
                    <div class="right"><div class="badge">Flow {html_escape(s.flow_number)}</div></div>
                  </div>

                  <div class="deviceBody">
                    {in_device_ui}
                  </div>

                  <div class="deviceBottom">
                    <a class="tab" href="index.html">Home</a>
                    <a class="tab" href="../DesignsByInventory/index.html">Inventory</a>
                    <a class="tab" href="#" data-go="{all_screens[0].screen_id}">Kategori Başı</a>
                  </div>
                </div>
              </div>
            </div>

            <aside class="info">
              <div class="infoHead">
                <div>
                  <div class="infoTitle">{html_escape(category)}</div>
                  <div class="infoSub">Flow {html_escape(s.flow_number)} — {html_escape(s.flow_title)}</div>
                </div>
                <div class="pillRow">
                  <a class="pill" href="index.html">Home</a>
                  <a class="pill" href="../DesignsByInventory/index.html">Inventory</a>
                </div>
              </div>

              <div class="infoBlock">
                <div class="secTitle">Kurallar</div>
                <ul class="ruleList">{rules_html}</ul>
              </div>

              <div class="infoBlock">
                <div class="secTitle">US & Acceptance Criteria</div>
                {stories_html}
              </div>
            </aside>
          </div>
        </section>
            """.rstrip()
        )

    pages_html = "\n".join(pages)

    return f"""<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html_escape(category)} — PST Mobile (User Flow Prototype)</title>
    <style>
      :root {{
        color-scheme: light;

        /* Brand (approx from provided logo) */
        --primary: #1e2a78;
        --accent: #0fa3b1;
        --gold: #f2c14e;
        --danger: #d92d20;
        --success: #039855;

        /* Neutrals */
        --bg: #f6f7fb;
        --surface: #ffffff;
        --surface2: rgba(255, 255, 255, 0.72);
        --stroke: rgba(230, 232, 240, 0.95);
        --stroke2: rgba(215, 219, 235, 0.95);
        --text: #0b1020;
        --muted: rgba(13, 18, 38, 0.62);

        /* Shadows (more premium / iOS-like) */
        --shadow-xs: 0 2px 10px rgba(13, 18, 38, 0.06);
        --shadow-sm: 0 8px 24px rgba(13, 18, 38, 0.10);
        --shadow-md: 0 18px 56px rgba(13, 18, 38, 0.14);
        --shadow-lg: 0 44px 140px rgba(13, 18, 38, 0.22);

        --r12: 12px;
        --r16: 16px;
        --r20: 20px;
        --r24: 24px;
        --r32: 32px;

        --w: 393px;
        --h: 852px;
        --safeTop: 56px;
        --safeBot: 34px;

        --font:
          ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display",
          "Segoe UI", Roboto, Helvetica, Arial;
      }}

      * {{ box-sizing: border-box; }}
      html, body {{ height: 100%; }}
      body {{
        margin: 0;
        font-family: var(--font);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background:
          radial-gradient(980px 540px at 0% 0%, rgba(15, 163, 177, 0.12), transparent 55%),
          radial-gradient(980px 540px at 100% 10%, rgba(30, 42, 120, 0.10), transparent 55%),
          radial-gradient(980px 540px at 40% 115%, rgba(242, 193, 78, 0.10), transparent 55%),
          linear-gradient(180deg, #ffffff, var(--bg));
        color: var(--text);
      }}
      a {{ color: inherit; }}

      .wrap {{
        max-width: 1280px;
        margin: 0 auto;
        padding: 18px;
        display: grid;
        grid-template-columns: 360px 1fr;
        gap: 14px;
      }}

      .panel {{
        border-radius: var(--r24);
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid rgba(230, 232, 240, 0.95);
        box-shadow: var(--shadow-md);
        padding: 16px;
        overflow: hidden;
      }}

      .h1 {{
        margin: 0;
        font-size: 16px;
        letter-spacing: 0.2px;
      }}
      .sub {{
        margin-top: 6px;
        color: var(--muted);
        font-size: 12px;
        line-height: 1.55;
      }}

      .pillRow {{
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }}
      .pill {{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: 999px;
        background: rgba(15, 163, 177, 0.10);
        border: 1px solid rgba(15, 163, 177, 0.22);
        color: rgba(13, 18, 38, 0.88);
        font-size: 12px;
        white-space: nowrap;
        font-weight: 900;
        text-decoration: none;
      }}

      .secTitle {{
        margin: 14px 0 8px;
        font-size: 12px;
        font-weight: 950;
        color: rgba(13, 18, 38, 0.86);
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }}

      .flowList {{
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: calc(100vh - 190px);
        overflow: auto;
        padding-right: 6px;
      }}
      .flowItem {{
        display: grid;
        grid-template-columns: 52px 1fr;
        gap: 10px;
        padding: 10px;
        border-radius: 16px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        box-shadow: var(--shadow-sm);
        text-decoration: none;
      }}
      .flowItem:hover {{ border-color: rgba(15, 163, 177, 0.35); }}
      .flowItem.active {{
        border-color: rgba(30, 42, 120, 0.40);
        background: linear-gradient(180deg, rgba(15, 163, 177, 0.10), rgba(255,255,255,0.96));
      }}
      .flowNo {{
        height: 28px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 950;
        font-size: 12px;
        background: rgba(30, 42, 120, 0.10);
        border: 1px solid rgba(30, 42, 120, 0.16);
        color: rgba(13, 18, 38, 0.92);
      }}
      .flowTitle {{ font-weight: 950; font-size: 13px; line-height: 1.25; }}
      .flowMeta {{ margin-top: 2px; color: var(--muted); font-size: 11px; line-height: 1.35; }}

      .stage {{
        border-radius: var(--r24);
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.60);
        box-shadow: var(--shadow-md);
        min-height: calc(100vh - 36px);
        padding: 12px;
        overflow: hidden;
      }}

      .page {{ display: none; }}
      .page.active {{ display: block; }}

      .layout {{
        display: grid;
        grid-template-columns: 430px 1fr;
        gap: 14px;
        align-items: start;
      }}

      /* Device */
      .deviceWrap {{ display: grid; place-items: center; }}
      .device {{ width: var(--w); }}
      .deviceBezel {{
        border-radius: 52px;
        background:
          radial-gradient(120px 120px at 20% 10%, rgba(255, 255, 255, 0.16), transparent 60%),
          radial-gradient(160px 140px at 80% 0%, rgba(255, 255, 255, 0.10), transparent 65%),
          linear-gradient(180deg, rgba(13, 18, 38, 0.96), rgba(13, 18, 38, 0.86));
        padding: 12px;
        box-shadow: var(--shadow-lg);
      }}
      .deviceTop {{
        height: var(--safeTop);
        border-radius: 38px 38px 18px 18px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.03));
        border: 1px solid rgba(255, 255, 255, 0.10);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        color: rgba(255, 255, 255, 0.92);
        gap: 10px;
      }}
      .left {{ display: flex; gap: 10px; align-items: center; min-width: 0; }}
      .logo {{ height: 18px; width: auto; object-fit: contain; display: block; }}
      .logoFallback {{
        display: none;
        width: 22px;
        height: 22px;
        border-radius: 10px;
        background: radial-gradient(circle at 30% 30%, rgba(15, 163, 177, 1), rgba(30, 42, 120, 1));
        border: 1px solid rgba(255, 255, 255, 0.18);
      }}
      .screenTitle {{
        font-size: 12px;
        font-weight: 950;
        letter-spacing: 0.2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 240px;
      }}
      .crumb {{
        margin-top: 2px;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.72);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 240px;
      }}
      .badge {{
        height: 22px;
        padding: 0 10px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 950;
        font-size: 11px;
        background: rgba(242, 193, 78, 0.18);
        border: 1px solid rgba(242, 193, 78, 0.26);
        color: rgba(255, 255, 255, 0.92);
        white-space: nowrap;
      }}

      .deviceBody {{
        height: var(--h);
        border-radius: 18px;
        background:
          radial-gradient(700px 420px at 20% 0%, rgba(15, 163, 177, 0.20), transparent 55%),
          radial-gradient(700px 420px at 80% 5%, rgba(30, 42, 120, 0.16), transparent 55%),
          linear-gradient(180deg, #ffffff, var(--bg));
        border: 1px solid rgba(255, 255, 255, 0.14);
        overflow: auto;
        padding: 16px 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        scrollbar-width: none;
      }}
      .deviceBody::-webkit-scrollbar {{ width: 0; height: 0; }}

      .deviceBottom {{
        height: var(--safeBot);
        margin-top: 10px;
        border-radius: 18px 18px 38px 38px;
        background: rgba(255, 255, 255, 0.94);
        border: 1px solid rgba(230, 232, 240, 0.95);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 8px;
        align-items: center;
        justify-items: center;
        padding: 6px 10px;
        box-shadow: var(--shadow-sm);
      }}
      .tab {{
        font-weight: 950;
        font-size: 11px;
        color: rgba(13, 18, 38, 0.86);
        padding: 6px 10px;
        border-radius: 12px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        text-decoration: none;
      }}

      /* In-device UI */
      .card {{
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid var(--stroke);
        border-radius: 20px;
        box-shadow: var(--shadow-xs);
        padding: 12px 12px;
      }}
      .card.warn {{ background: rgba(242, 193, 78, 0.14); border-color: rgba(242, 193, 78, 0.28); }}
      .card.ok {{ background: rgba(3, 152, 85, 0.10); border-color: rgba(3, 152, 85, 0.22); }}
      .h2 {{ font-weight: 950; font-size: 14px; }}
      .muted {{ color: var(--muted); font-size: 12px; line-height: 1.45; margin-top: 6px; }}
      .row {{ margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap; }}
      .btn {{
        height: 38px;
        padding: 0 12px;
        border-radius: 14px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-weight: 900;
        letter-spacing: 0.1px;
        border: 1px solid var(--stroke);
        background: rgba(255, 255, 255, 0.92);
        color: rgba(13, 18, 38, 0.92);
        box-shadow: var(--shadow-xs);
        cursor: pointer;
        transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
      }}
      .btn:active {{ transform: translateY(1px) scale(0.99); }}
      .btn.primary {{
        background: linear-gradient(135deg, rgba(30, 42, 120, 0.96), rgba(15, 163, 177, 0.92));
        border-color: rgba(30, 42, 120, 0.18);
        color: #ffffff;
        box-shadow: 0 14px 30px rgba(30, 42, 120, 0.22);
      }}
      .tile {{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 12px 12px;
        border-radius: 18px;
        border: 1px solid var(--stroke);
        background: rgba(255, 255, 255, 0.94);
        box-shadow: var(--shadow-xs);
        transition: transform 120ms ease, border-color 120ms ease;
      }}
      .tile:active {{ transform: translateY(1px) scale(0.995); }}
      .tileLeading {{
        width: 34px;
        height: 34px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        background: linear-gradient(180deg, rgba(15, 163, 177, 0.10), rgba(30, 42, 120, 0.08));
        border: 1px solid rgba(15, 163, 177, 0.18);
        color: rgba(30, 42, 120, 0.92);
        flex: 0 0 auto;
      }}
      .ic {{ width: 18px; height: 18px; display: block; }}
      .tile + .tile {{ margin-top: 8px; }}
      .tileTitle {{ font-weight: 950; font-size: 12px; }}
      .tileMeta {{ margin-top: 3px; font-size: 11px; color: var(--muted); }}
      .tileRight {{ color: rgba(13, 18, 38, 0.40); font-weight: 950; display: grid; place-items: center; }}
      .tileBadge {{ margin-left: auto; }}
      .b {{
        display: inline-flex;
        align-items: center;
        height: 22px;
        padding: 0 10px;
        border-radius: 999px;
        font-weight: 950;
        font-size: 11px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        color: rgba(13, 18, 38, 0.86);
      }}
      .b.info {{ background: rgba(15, 163, 177, 0.10); border-color: rgba(15, 163, 177, 0.22); }}
      .b.warn {{ background: rgba(242, 193, 78, 0.14); border-color: rgba(242, 193, 78, 0.28); }}
      .b.ok {{ background: rgba(3, 152, 85, 0.10); border-color: rgba(3, 152, 85, 0.22); }}
      .field {{ margin-top: 10px; }}
      .field label {{ display: block; font-size: 11px; font-weight: 900; color: rgba(13, 18, 38, 0.78); margin-bottom: 6px; }}
      .input {{
        height: 40px;
        border-radius: 14px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        display: flex;
        align-items: center;
        padding: 0 12px;
        color: rgba(13, 18, 38, 0.78);
        font-weight: 800;
      }}
      .linkRow {{ margin-top: 10px; font-size: 12px; }}
      .linkRow a {{ color: rgba(30, 42, 120, 0.92); font-weight: 900; text-decoration: none; }}
      .otpRow {{ display: flex; gap: 8px; justify-content: center; margin: 12px 0; }}
      .otp {{
        width: 38px;
        height: 44px;
        border-radius: 14px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        display: grid;
        place-items: center;
        font-weight: 950;
      }}
      .hero {{ flex: 1; display: grid; place-items: center; text-align: center; padding: 20px 10px; }}
      .heroLogo {{ height: 34px; width: auto; object-fit: contain; display: block; margin-bottom: 10px; }}
      .heroLogoFallback {{
        display: none;
        width: 56px;
        height: 56px;
        border-radius: 18px;
        background: radial-gradient(circle at 30% 30%, rgba(15, 163, 177, 1), rgba(30, 42, 120, 1));
        border: 1px solid rgba(13, 18, 38, 0.08);
        box-shadow: var(--shadow-sm);
        margin-bottom: 10px;
      }}
      .heroTitle {{ font-weight: 950; font-size: 18px; }}
      .heroSub {{ margin-top: 6px; color: var(--muted); font-size: 12px; }}
      .stateRow {{
        margin-top: 10px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: center;
      }}
      .search {{
        height: 40px;
        border-radius: 16px;
        border: 1px solid var(--stroke);
        background: rgba(255, 255, 255, 0.96);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 12px;
        box-shadow: var(--shadow-xs);
      }}
      .searchIcon {{ color: rgba(13, 18, 38, 0.42); display: grid; place-items: center; }}
      .searchText {{ color: rgba(13, 18, 38, 0.62); font-weight: 900; }}
      .chips {{
        margin-top: 10px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }}
      .chip {{
        height: 28px;
        display: inline-flex;
        align-items: center;
        padding: 0 10px;
        border-radius: 999px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        color: rgba(13, 18, 38, 0.86);
        font-size: 11px;
        font-weight: 900;
      }}
      .kpis {{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
      }}
      .kpi {{
        border-radius: 16px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        padding: 10px;
      }}
      .kpiV {{ font-weight: 950; font-size: 14px; }}
      .kpiK {{ margin-top: 3px; color: var(--muted); font-size: 11px; font-weight: 900; }}
      .chart {{
        margin-top: 10px;
        height: 110px;
        border-radius: 16px;
        border: 1px dashed rgba(30, 42, 120, 0.28);
        background: linear-gradient(90deg, rgba(30, 42, 120, 0.08), rgba(15, 163, 177, 0.08));
      }}
      .playerFrame {{
        height: 160px;
        border-radius: 18px;
        background: radial-gradient(600px 280px at 30% 0%, rgba(15, 163, 177, 0.22), transparent 55%),
          radial-gradient(600px 280px at 70% 10%, rgba(30, 42, 120, 0.18), transparent 55%),
          linear-gradient(180deg, rgba(13, 18, 38, 0.86), rgba(13, 18, 38, 0.72));
        border: 1px solid rgba(230, 232, 240, 0.18);
        display: grid;
        place-items: center;
        color: #fff;
      }}
      .playerPlay {{
        width: 56px;
        height: 56px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.18);
        font-weight: 950;
      }}
      .playerRow {{
        margin-top: 10px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }}
      .checklist {{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }}
      .check {{
        display: grid;
        grid-template-columns: 34px 1fr;
        gap: 10px;
        align-items: center;
        padding: 10px;
        border-radius: 16px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
      }}
      .checkT {{
        font-weight: 900;
        font-size: 12px;
        color: rgba(13, 18, 38, 0.86);
      }}

      /* Info panel */
      .info {{
        border-radius: var(--r24);
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid rgba(230, 232, 240, 0.95);
        box-shadow: var(--shadow-md);
        padding: 14px;
        overflow: auto;
        max-height: calc(100vh - 72px);
      }}
      .infoHead {{ display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }}
      .infoTitle {{ font-weight: 950; font-size: 14px; }}
      .infoSub {{ margin-top: 4px; color: var(--muted); font-size: 12px; line-height: 1.35; }}
      .infoBlock {{ margin-top: 12px; }}
      .ruleList {{ margin: 8px 0 0 18px; padding: 0; color: rgba(13, 18, 38, 0.86); font-size: 12px; line-height: 1.5; }}

      .usCard {{
        margin-top: 10px;
        border-radius: 16px;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.94);
        padding: 10px;
      }}
      .usHead {{ display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }}
      .usCode {{ font-weight: 950; font-size: 12px; color: rgba(13, 18, 38, 0.92); }}
      .usMeta {{ font-size: 10px; color: var(--muted); text-align: right; }}
      .usTitle {{ margin-top: 6px; font-weight: 950; font-size: 12px; }}
      .usDesc {{ margin-top: 6px; color: rgba(13, 18, 38, 0.76); font-size: 11px; line-height: 1.5; }}
      details.usAC {{
        margin-top: 8px;
        padding: 8px;
        border-radius: 12px;
        background: rgba(15, 163, 177, 0.08);
        border: 1px solid rgba(15, 163, 177, 0.14);
      }}
      details.usAC summary {{ cursor: pointer; font-weight: 950; font-size: 11px; }}
      details.usAC ul {{ margin: 8px 0 0 18px; padding: 0; font-size: 11px; line-height: 1.5; color: rgba(13, 18, 38, 0.86); }}

      @media (max-width: 1080px) {{
        .wrap {{ grid-template-columns: 1fr; }}
        .layout {{ grid-template-columns: 1fr; }}
        .info {{ max-height: none; }}
      }}
    </style>
  </head>
  <body>
    <div class="wrap">
      <aside class="panel">
        <h1 class="h1">{html_escape(category)}</h1>
        <div class="sub">Kategori bazında lineer prototype • İçerik sadece mobil ekran içinde</div>
        <div class="pillRow" style="margin-top:10px;">
          <a class="pill" href="index.html">Home</a>
          <a class="pill" href="../DesignsByInventory/index.html">Inventory</a>
        </div>

        <div class="secTitle">Flow Listesi</div>
        <div class="flowList" id="flowList">
          {flow_links}
        </div>
      </aside>

      <main class="stage" id="stage">
        {pages_html}
      </main>
    </div>

    <script>
      (function () {{
        const pages = Array.from(document.querySelectorAll('.page'));
        const flowItems = Array.from(document.querySelectorAll('.flowItem'));

        function setActive(id) {{
          const target = id || pages[0]?.id;
          if (!target) return;
          pages.forEach((p) => p.classList.toggle('active', p.id === target));

          const active = pages.find((p) => p.id === target);
          const flowNo = active ? active.getAttribute('data-flow') : null;
          flowItems.forEach((a) => {{
            const no = a.querySelector('.flowNo')?.textContent?.trim()?.replace('#', '');
            a.classList.toggle('active', !!flowNo && no === flowNo);
          }});
        }}

        function normalizeHash() {{
          return (location.hash || '').replace('#', '').trim();
        }}

        window.addEventListener('hashchange', () => setActive(normalizeHash()));

        document.addEventListener('click', (e) => {{
          const btn = e.target.closest('[data-go]');
          if (!btn) return;
          const go = btn.getAttribute('data-go');
          if (!go) return;
          e.preventDefault();
          location.hash = '#' + go.replace('#', '');
        }});

        setActive(normalizeHash());
      }})();
    </script>
  </body>
</html>
"""


def render_index_html(flows: list[Flow]) -> str:
    by_cat: dict[str, list[Flow]] = {}
    for f in flows:
        by_cat.setdefault(f.category, []).append(f)

    cards: list[str] = []
    for cat, items in sorted(by_cat.items(), key=lambda x: x[0]):
        items_sorted = sorted(items, key=flow_sort_key)
        first = items_sorted[0]
        cards.append(
            f"""
        <div class="card">
          <h2>{html_escape(cat)}</h2>
          <p>{len(items_sorted)} flow • İlk: <strong>#{html_escape(first.number)}</strong> {html_escape(first.title)}</p>
          <div class="row">
            <a class="btn primary" href="{category_href(cat)}">Başla</a>
          </div>
        </div>
            """.rstrip()
        )

    grid = "\n".join(cards)
    return f"""<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>PST Mobile — Designs By User Flows (Index)</title>
    <style>
      :root {{
        color-scheme: light;
        --primary: #1e2a78;
        --accent: #0fa3b1;
        --gold: #f2c14e;
        --bg: #f7f8fb;
        --text: #0d1226;
        --muted: #5b647a;
        --stroke: #e6e8f0;
        --shadow-sm: 0 6px 18px rgba(13, 18, 38, 0.08);
        --shadow-md: 0 18px 50px rgba(13, 18, 38, 0.12);
        --r20: 20px;
        --r24: 24px;
        --font:
          ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display",
          "Segoe UI", Roboto, Helvetica, Arial;
      }}
      * {{ box-sizing: border-box; }}
      html, body {{ height: 100%; }}
      body {{
        margin: 0;
        font-family: var(--font);
        background:
          radial-gradient(900px 520px at 0% 0%, rgba(15, 163, 177, 0.12), transparent 55%),
          radial-gradient(900px 520px at 100% 10%, rgba(30, 42, 120, 0.10), transparent 55%),
          radial-gradient(900px 520px at 40% 115%, rgba(242, 193, 78, 0.12), transparent 55%),
          linear-gradient(180deg, #ffffff, var(--bg));
        color: var(--text);
      }}
      a {{ color: inherit; text-decoration: none; }}

      .wrap {{ max-width: 1120px; margin: 0 auto; padding: 28px; }}

      .header {{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 18px;
        border-radius: var(--r24);
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid rgba(230, 232, 240, 0.95);
        box-shadow: var(--shadow-md);
        backdrop-filter: blur(12px);
      }}
      .brand {{ display: flex; align-items: center; gap: 12px; min-width: 0; }}
      .logoImg {{ height: 34px; width: auto; object-fit: contain; display: block; }}
      .logoFallback {{
        display: none;
        width: 40px;
        height: 40px;
        border-radius: 14px;
        background: radial-gradient(circle at 30% 30%, rgba(15, 163, 177, 1), rgba(30, 42, 120, 1));
        border: 1px solid rgba(13, 18, 38, 0.08);
        box-shadow: var(--shadow-sm);
      }}
      h1 {{ margin: 0; font-size: 18px; letter-spacing: 0.1px; }}
      .sub {{ margin: 4px 0 0; color: var(--muted); font-size: 12px; line-height: 1.5; }}
      .pill {{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: 999px;
        background: rgba(15, 163, 177, 0.10);
        border: 1px solid rgba(15, 163, 177, 0.22);
        color: rgba(13, 18, 38, 0.86);
        font-size: 12px;
        white-space: nowrap;
        font-weight: 900;
      }}
      .grid {{ margin-top: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }}
      .card {{
        padding: 16px;
        border-radius: var(--r24);
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid rgba(230, 232, 240, 0.95);
        box-shadow: var(--shadow-md);
      }}
      .card h2 {{ margin: 0 0 6px; font-size: 15px; }}
      .card p {{ margin: 0 0 12px; color: var(--muted); font-size: 12px; line-height: 1.55; }}
      .row {{ display: flex; gap: 10px; flex-wrap: wrap; }}
      .btn {{
        height: 40px;
        padding: 0 12px;
        border-radius: 14px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-weight: 900;
        border: 1px solid rgba(230, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.92);
        color: rgba(13, 18, 38, 0.92);
        box-shadow: var(--shadow-sm);
      }}
      .btn.primary {{
        background: linear-gradient(135deg, rgba(30, 42, 120, 0.96), rgba(15, 163, 177, 0.92));
        border-color: rgba(30, 42, 120, 0.18);
        color: #ffffff;
      }}
      .note {{
        margin-top: 14px;
        padding: 12px;
        border-radius: var(--r20);
        background: rgba(242, 193, 78, 0.14);
        border: 1px solid rgba(242, 193, 78, 0.28);
        color: rgba(13, 18, 38, 0.86);
        font-size: 12px;
        line-height: 1.5;
      }}
      @media (max-width: 900px) {{ .grid {{ grid-template-columns: 1fr; }} }}
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="header">
        <div class="brand">
          <img class="logoImg" src="{LOGO_SRC}" alt="PST Coaching" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <div class="logoFallback" aria-hidden="true"></div>
          <div>
            <h1>PST Mobile — Designs By User Flows</h1>
            <p class="sub">Home → kategori → flow içi lineer navigasyon • US/AC mobil ekran dışında</p>
          </div>
        </div>
        <div class="pill">{len(by_cat)} kategori</div>
      </div>

      <div class="grid">
        {grid}
      </div>

      <div class="note">
        Logo dosyası: <code>Model1/Designs/assets/pst-coaching-logo.png</code> (bu klasörden göreli yol: <code>{LOGO_SRC}</code>).
      </div>
    </div>
  </body>
</html>
"""


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    # Clean old generated html (keep tools)
    for p in OUT_DIR.glob("UF_*.html"):
        p.unlink(missing_ok=True)
    for p in OUT_DIR.glob("CAT_*.html"):
        p.unlink(missing_ok=True)
    (OUT_DIR / "index.html").unlink(missing_ok=True)

    flows_md = FLOWS_MD.read_text(encoding="utf-8")
    rev3_md = REV3_MD.read_text(encoding="utf-8")

    story_by_code = parse_user_stories(rev3_md)
    flows = parse_flows(flows_md)
    flows_sorted = sorted(flows, key=flow_sort_key)

    by_cat: dict[str, list[Flow]] = {}
    for f in flows_sorted:
        by_cat.setdefault(f.category, []).append(f)

    for cat, items in by_cat.items():
        (OUT_DIR / category_href(cat)).write_text(render_category_html(cat, items, story_by_code), encoding="utf-8")

    (OUT_DIR / "index.html").write_text(render_index_html(flows_sorted), encoding="utf-8")

    print(f"Generated {len(by_cat)} category prototypes + index into: {OUT_DIR}")


if __name__ == "__main__":
    main()
