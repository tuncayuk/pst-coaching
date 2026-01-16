# PST Mobile — Site Map + Kritik Akışlar + Screen Inventory

Bu doküman yalnızca `Model1/UserStoriesRev3.md` ve `Model1/UserStoriesRev3_Summary.md` baz alınarak üretilmiştir.

## 2) Site Map
### Onboarding
- Dil Seçimi
- Giriş Yap
- Kayıt Ol
- Şifremi Unuttum

### Ana Sayfa
- Ana Akış (Home)
- Dünyam
- Gelişim

### Keşfet
- AI (Add-on)
- Asistan
- Favoriler
- Oyunlar
- Videolar
- Yolculuklar

### Yolculuklarım
- Yolculuk Detayı -> Gün/Modül
- Yolculuk Detayı -> Modüller

### Topluluk
- Birlikte Okuma
- Kitap Kulübü

### Profil
- Abonelik
- Abonelik -> Plan Seçimi
- Abonelik -> Öğrenci İndirimi
- Ayarlar -> Erişilebilirlik
- Ayarlar -> Hatırlatıcılar
- Hesap
- Koç Paneli
- Koçluk

## 2.1) Kritik User Flow’lar
### 1. İlk açılış + dil seçimi + giriş/kayıt
- Adımlar: Onboarding -> Dil Seçimi → Onboarding -> Kayıt Ol / Giriş Yap → Ana Sayfa
- Kapsayan US’ler: EPIC 1: US-1.1–1.7

### 2. Paywall / plan seçimi (gated erişim)
- Adımlar: (Herhangi bir gated CTA) → Profil -> Abonelik -> Plan Seçimi → Ana Sayfa / Keşfet (geri dönüş)
- Kapsayan US’ler: EPIC 3: US-3.1–3.8; EPIC 1: US-1.7

### 3. Yolculuk keşfi ve başlatma
- Adımlar: Keşfet -> Yolculuklar → Yolculuk detayı (liste içinde) → Yolculuğu Başlat → Yolculuklarım -> Yolculuk Detayı -> Modüller
- Kapsayan US’ler: EPIC 4: US-4.1–4.6

### 4. Günlük döngü: okuma → yorum/teslim (23:59) → kilit açılma (08:00)
- Adımlar: Ana Sayfa → Yolculuklarım -> Yolculuk Detayı -> Gün/Modül → Yorum/Teslim → Yolculuklarım -> Yolculuk Detayı -> Modüller
- Kapsayan US’ler: EPIC 5: US-5.1–5.7; EPIC 15: US-15.1–15.7; EPIC 2: US-2.6

### 5. Hatırlatıcılar ve alışkanlık zinciri
- Adımlar: Profil -> Ayarlar -> Hatırlatıcılar → Ana Sayfa (bildirim/alışkanlık yüzeyleri)
- Kapsayan US’ler: EPIC 11: US-11.1–11.7

### 6. Erişilebilirlik ayarları ve alternatif tüketim
- Adımlar: Profil -> Ayarlar -> Erişilebilirlik → Yolculuklarım -> Yolculuk Detayı -> Gün/Modül (uygulama)
- Kapsayan US’ler: EPIC 9: US-9.1–9.7; EPIC 16: US-16.1–16.7

### 7. Topluluk: birlikte okuma grubu (oluştur/katıl/davet)
- Adımlar: Topluluk → Grup detayı (liste içinde) → Davet/Katıl → İlerleme/Sohbet
- Kapsayan US’ler: EPIC 12: US-12.1–12.7; EPIC 13: US-13.1–13.7

### 8. Koç paneli: danışan takibi ve geri bildirim
- Adımlar: Profil -> Koç Paneli → Danışan detayı (liste içinde) → Koç yorumu / uyarılar
- Kapsayan US’ler: EPIC 7: US-7.1–7.7; EPIC 19: US-19.1–19.7

## 3) Screen Inventory (US ↔ Ekran Eşlemesi)

| Screen (Navigation Steps) | Faz | Amaç | US Kapsamı (EPIC bazında) |
| --- | --- | --- | --- |
| Ana Sayfa | Faz-1 | Ana akış: Bugün özeti, CTA, durum rozetleri, yönlendirmeler | EPIC 2: US-2.1–2.8 |
| Ana Sayfa -> Dünyam | Faz-2 | Sanal dünya: dekor/ödül, kişiselleştirme | EPIC 14: US-14.1–14.7 |
| Ana Sayfa -> Gelişim | Faz-1 | İlerleme, geri bildirim, raporlar ve değerlendirmeler | EPIC 6: US-6.1–6.7 |
| Keşfet -> AI (Add-on) | Faz-2 | AI özellikleri (sohbet, analiz) ve add-on kapısı | EPIC 10: US-10.1–10.5 |
| Keşfet -> Asistan | Faz-2 | Yolculuk belirleme asistanı (anket, öneri, plan) | EPIC 20: US-20.1–20.7 |
| Keşfet -> Favoriler | Faz-1 | Favoriler listesi (içerik/video/oyun vb.) | EPIC 8: US-8.1–8.7 |
| Keşfet -> Oyunlar | Faz-2 | Oyun/quiz kataloğu ve oyunlaştırılmış pekiştirme | EPIC 17: US-17.1–17.7 |
| Keşfet -> Videolar | Faz-2 | Video kütüphanesi (rehber içerikler) | EPIC 18: US-18.1–18.7 |
| Keşfet -> Yolculuklar | Faz-1 | Yolculuk kataloğu: listeleme, arama, filtre, detay CTA | EPIC 4: US-4.1–4.6 |
| Onboarding -> Dil Seçimi | Faz-1 | Uygulama dili seçimi ve kalıcı tercih | EPIC 1: US-1.1 |
| Onboarding -> Giriş Yap | Faz-1 | Hesaba giriş (email/telefon + şifre) | EPIC 1: US-1.3 |
| Onboarding -> Kayıt Ol | Faz-1 | Kayıt + doğrulama (OTP) | EPIC 1: US-1.2 |
| Onboarding -> Şifremi Unuttum | Faz-1 | Şifre sıfırlama akışı | EPIC 1: US-1.4 |
| Profil -> Abonelik | Faz-1 | Abonelik & add-on yönetimi (plan, eklenti, seat) | EPIC 3: US-3.2–3.8 |
| Profil -> Abonelik -> Plan Seçimi | Faz-1 | Paywall / plan seçimi ve satın alma başlangıcı | EPIC 3: US-3.1 |
| Profil -> Abonelik -> Öğrenci İndirimi | Faz-1 | Öğrenci indirimi doğrulama ve yönetim | EPIC 21: US-21.1–21.7 |
| Profil -> Ayarlar -> Erişilebilirlik | Faz-1/2 | Erişilebilirlik ayarları (metin/kontrast/sesli) | EPIC 9: US-9.1–9.7; EPIC 16: US-16.1–16.7 |
| Profil -> Ayarlar -> Hatırlatıcılar | Faz-1 | Hatırlatıcı ayarları ve bildirim tercihleri | EPIC 11: US-11.1–11.7 |
| Profil -> Hesap | Faz-1 | Profil/hesap: rol & abonelik senkronu, temel hesap bilgileri | EPIC 1: US-1.5–1.7 |
| Profil -> Koç Paneli | Faz-2 | Koç paneli: danışan listesi, takip, geri bildirim | EPIC 7: US-7.1–7.7 |
| Profil -> Koçluk | Faz-2 | Koçluk/Mentor: danışan detayı ve geri bildirim akışları | EPIC 19: US-19.1–19.7 |
| Topluluk | Faz-2 | Birlikte okuma grupları: oluştur/katıl/davet/ilerleme | EPIC 12: US-12.1–12.7 |
| Topluluk -> Kitap Kulübü | Faz-2 | Kitap kulübü: sosyal okuma ve tartışma | EPIC 13: US-13.1–13.7 |
| Yolculuklarım -> Yolculuk Detayı -> Gün/Modül | Faz-1 | Günün içeriği: okuma/sesli okuma, not/yorum, teslim | EPIC 5: US-5.1–5.7 |
| Yolculuklarım -> Yolculuk Detayı -> Modüller | Faz-1 | Modül listesi ve kilitli ilerleme yönetimi | EPIC 15: US-15.1–15.7 |
