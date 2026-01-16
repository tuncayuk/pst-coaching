# SCR-007 — Yeni Şifre

**Route:** `auth/reset-password`  
**Faz:** 1  
**Kaynak:** `Model2/PST_Mobile_PRD.md` → EPIC 1 → US-1.4  

---

## Amaç
OTP doğrulaması tamamlandıktan sonra kullanıcının yeni şifre belirleyip sıfırlama işlemini bitirmesini sağlamak.

## İlgili User Story ve Kabul Kriterleri (PRD)
**US-1.4 Şifre Sıfırlama**  
- Yeni şifre politikalarına uygunluk kontrol edilir  
- Başarılı sıfırlamada giriş ekranına yönlendirilir  

## UI Bileşenleri
- Yeni şifre alanı (+ göster/gizle)
- Yeni şifre tekrar alanı
- Şifre politika ipuçları (backend politikasına göre)
- Birincil CTA: `Şifreyi Güncelle`

## Validasyon
- Şifre politikası kontrolü (PRD’de politika detayları belirtilmiyor; UI backend’den politika/regex alacak şekilde tasarlanmalı).
- Şifre-tekrar eşleşme kontrolü.

## Başarılı Akış
- Şifre güncellenir → kullanıcıya başarı mesajı → `SCR-003` giriş ekranına yönlendirilir.

## Hata Durumları
- Politika uyumsuz: hangi kuralın sağlanmadığı net gösterilir.
- Token/OTP geçersiz: `SCR-006`’ya dönmesi önerilir.

## Analitik (Öneri)
- `reset_password_submitted`
- `reset_password_succeeded`
- `reset_password_failed`

## Erişilebilirlik
- Şifre ipuçları ekran okuyucu için liste formatında.
- Hata mesajları alan bazlı ve okunabilir.

