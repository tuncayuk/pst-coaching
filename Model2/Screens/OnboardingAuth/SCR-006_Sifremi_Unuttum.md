# SCR-006 — Şifremi Unuttum

**Route:** `auth/forgot-password`  
**Faz:** 1  
**Kaynak:** `Model2/PST_Mobile_PRD.md` → EPIC 1 → US-1.4  

---

## Amaç
Kullanıcının şifre sıfırlama akışını e-posta/telefon doğrulaması ile başlatması.

## İlgili User Story ve Kabul Kriterleri (PRD)
**US-1.4 Şifre Sıfırlama**  
- E-posta/telefon doğrulama akışı başlar  
- Yeni şifre politikalarına uygunluk kontrol edilir  
- Başarılı sıfırlamada giriş ekranına yönlendirilir  

## UI Bileşenleri
- E-posta/Telefon alanı
- Birincil CTA: `Doğrulama Kodu Gönder`
- Link: `Giriş Yap` → `SCR-003`

## Navigasyon
- `Doğrulama Kodu Gönder` → `SCR-005` (`auth/otp`) *(reset context)*

## Hata Durumları
- Format hatası: inline
- Hesap bulunamadı: güvenli mesaj (hesap var/yok bilgisi sızdırmayacak şekilde)

## Analitik (Öneri)
- `forgot_password_started`
- `forgot_password_identifier_submitted`

## Erişilebilirlik
- Form label + hata mesajları screen reader uyumlu.

