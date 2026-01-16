# SCR-003 — Giriş

**Route:** `auth/login`  
**Faz:** 1  
**Kaynak:** `Model2/PST_Mobile_PRD.md` → EPIC 1 → US-1.3  

---

## Amaç
Kullanıcının e-posta/telefon ve şifre ile güvenli şekilde giriş yapmasını sağlamak.

## İlgili User Story ve Kabul Kriterleri (PRD)
**US-1.3 Giriş Yapma**  
- Doğru bilgilerle ana sayfaya yönlendirilir  
- Hatalı girişte güvenli hata mesajı gösterilir  
- Üst üste başarısız denemede geçici kilit uygulanır  
- Abonelik durumu ve rol senkronlanır  

## UI Bileşenleri
- E-posta/Telefon alanı
- Şifre alanı (+ göster/gizle)
- Birincil CTA: `Giriş Yap`
- Link: `Şifremi Unuttum` → `SCR-006`
- Link: `Kayıt Ol` → `SCR-004`

## Validasyon
- E-posta/telefon format kontrolü (US-1.2 ile tutarlı)
- Boş alanlarda inline hata

## Davranış Kuralları
- Başarılı giriş sonrası:
  - Session/token alınır.
  - Abonelik durumu ve rol senkronlanır (US-1.3).
  - `SCR-010` Ana Sayfa’ya yönlendirilir.
- Başarısız giriş:
  - Güvenli hata mesajı (hangi alanın yanlış olduğuna dair hassas bilgi vermeden).
  - Ardışık başarısız denemelerde geçici kilit (süre backend kuralı).

## Hata Durumları
- Ağ yok / timeout: tekrar dene, offline mod uyarısı.
- Hesap kilitli: kilit süresi bilgisi ve tekrar dene.

## Analitik (Öneri)
- `login_attempted`
- `login_succeeded`
- `login_failed` { `reason`:(`invalid_credentials`|`locked`|`network`) }

## Erişilebilirlik
- Form alanları doğru label/aria ile.
- Hata mesajları ekran okuyucuya okunur.

