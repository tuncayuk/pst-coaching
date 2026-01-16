# SCR-002 — Karşılama (Giriş/Kayıt)

**Route:** `auth/welcome`  
**Faz:** 1  
**Kaynak:** `Model2/PST_Mobile_PRD.md` → EPIC 1 → US-1.2, US-1.3  

---

## Amaç
Kullanıcıyı giriş veya kayıt akışına yönlendiren başlangıç ekranını sunmak.

## İlgili User Story’ler ve Kabul Kriterleri (PRD)
Bu ekran, **US-1.2** ve **US-1.3** akışlarının giriş noktasıdır; kabul kriterleri ilgili ekranlarda (SCR-003, SCR-004, SCR-005) karşılanır.

## UI Bileşenleri
- Logo/marka alanı
- Birincil CTA: `Giriş Yap`
- İkincil CTA: `Kayıt Ol`
- Link: `Şifremi Unuttum` (opsiyonel olarak direkt SCR-006’ya yönlendirebilir)

## Navigasyon
- `Giriş Yap` → `SCR-003` (`auth/login`)
- `Kayıt Ol` → `SCR-004` (`auth/register`)
- `Şifremi Unuttum` → `SCR-006` (`auth/forgot-password`)

## Analitik (Öneri)
- `auth_welcome_viewed`
- `auth_welcome_cta_clicked` { `cta`:(`login`|`register`|`forgot_password`) }

## Erişilebilirlik
- CTA’lar minimum 44×44 pt hedef alanı.
- Dil seçimine göre metinler yerelleşir (US-1.1 uyumlu).

