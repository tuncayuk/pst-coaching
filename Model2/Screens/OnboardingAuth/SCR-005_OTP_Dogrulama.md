# SCR-005 — OTP Doğrulama

**Route:** `auth/otp`  
**Faz:** 1  
**Kaynak:** `Model2/PST_Mobile_PRD.md` → EPIC 1 → US-1.2, US-1.4  

---

## Amaç
Kayıt olma veya şifre sıfırlama sürecinde OTP kodunu doğrulamak.

## İlgili User Story’ler ve Kabul Kriterleri (PRD)
**US-1.2 Kayıt Olma (OTP kısmı)**  
- OTP doğrulama ile hesap oluşturulur  
- Yanlış kod girildiğinde kalan deneme gösterilir  

**US-1.4 Şifre Sıfırlama (doğrulama kısmı)**  
- E-posta/telefon doğrulama akışı başlar  

## UI Bileşenleri
- “Kodu gir” başlığı + hedef maskeleme (ör. `a***@mail.com` / `+90 *** ** **`)
- 6 haneli OTP input
- Birincil CTA: `Doğrula`
- İkincil: `Kodu Yeniden Gönder` (cooldown ile)

## Davranış Kuralları
- Yanlış OTP:
  - Kalan deneme sayısı kullanıcıya gösterilir (US-1.2).
- Başarılı OTP:
  - **Kayıt akışı:** hesap oluşturulur → (opsiyonel) otomatik giriş → `SCR-010`.
  - **Şifre sıfırlama akışı:** `SCR-007`’ye yönlenir.

## Hata Durumları
- Kod süresi doldu: yeniden gönder CTA’sı.
- Çok deneme: geçici kilit/ek doğrulama (backend kuralı).

## Analitik (Öneri)
- `otp_submitted` { `context`:(`register`|`reset_password`) }
- `otp_verified`
- `otp_failed` { `reason`:(`invalid`|`expired`|`locked`) }

## Erişilebilirlik
- OTP alanları tek alan gibi okunabilir olmalı (platform standardı).
- Hata/deneme sayısı değişimleri ekran okuyucuya anons edilir.

