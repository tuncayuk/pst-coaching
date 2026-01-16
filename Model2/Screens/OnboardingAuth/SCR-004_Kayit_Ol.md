# SCR-004 — Kayıt Ol

**Route:** `auth/register`  
**Faz:** 1  
**Kaynak:** `Model2/PST_Mobile_PRD.md` → EPIC 1 → US-1.2  

---

## Amaç
Kullanıcının e-posta veya telefon numarası ile kayıt başlatmasını ve OTP doğrulama adımına geçmesini sağlamak.

## İlgili User Story ve Kabul Kriterleri (PRD)
**US-1.2 Kayıt Olma**  
- Geçerli format kontrolü yapılır  
- OTP doğrulama ile hesap oluşturulur  
- Yanlış kod girildiğinde kalan deneme gösterilir  
- Mevcut hesap kontrolü yapılır  

## UI Bileşenleri
- E-posta/Telefon alanı
- Birincil CTA: `Devam Et` (OTP’ye geç)
- Link: `Zaten hesabın var mı? Giriş Yap` → `SCR-003`

## Validasyon
- E-posta/telefon format kontrolü (client-side)
- Backend “mevcut hesap” kontrolü sonucu:
  - Mevcutsa: kullanıcıyı `SCR-003`’e yönlendiren mesaj + CTA.

## Navigasyon
- `Devam Et` → `SCR-005` (`auth/otp`) *(kayıt doğrulaması)*

## Hata Durumları
- Geçersiz format: inline hata
- Ağ/servis hatası: tekrar dene

## Analitik (Öneri)
- `register_started`
- `register_identifier_submitted` { `type`:(`email`|`phone`) }

## Erişilebilirlik
- OTP’ye geçişte ekran okuyucu odağı yeni ekrana taşınır.

