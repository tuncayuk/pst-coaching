# 3.1 Onboarding & Oturum — Production Ready Ekran Spesifikasyonu

Kaynak: `Model1/UserStoriesRev3.md` (EPIC 1: US-1.1–US-1.7).  
Hedef cihaz: iPhone 17 Pro (tasarım referansı: 393×852 pt, Dynamic Island, safe area üst/alt).  

## Renk paleti (Light Mode)

Bu palet, paylaşılan logo görseli baz alınarak **yaklaşık** çıkarılmıştır (workspace içinde logo dosyası olmadığı için piksellerden kesin örnekleme yapamadım).

- **Primary (Navy)**: `#1E2A78` (başlıklar, primary CTA metin/ikon)
- **Accent (Teal)**: `#0FA3B1` (vurgular, link, focus ring)
- **Highlight (Gold)**: `#F2C14E` (kısa rozet/uyarı vurgusu)
- **Background**: `#F7F8FB`
- **Surface**: `#FFFFFF`
- **Stroke**: `#E6E8F0`
- **Text**: `#0D1226`
- **Muted text**: `#5B647A`
- **Danger**: `#D92D20`
- **Success**: `#039855`

Logo dosyasını `Model1/Designs/assets/pst-coaching-logo.png` olarak eklerseniz, bu paleti logodan daha doğru (pipet) değerlerle güncelleyebilirim.

## Ortak “Production Ready” standartları (tüm ekranlar)

- Durumlar: loading/skeleton, empty (varsa), error + retry, offline bilgilendirme.
- Güvenlik: hata mesajları hesap var/yok detayını sızdırmaz (genel mesaj), rate-limit ve geçici kilit şeffaf ama güvenli.
- Erişilebilirlik: Dynamic Type, VoiceOver etiketleri, odak sırası, kontrast, azaltılmış hareket.
- Klavye: input odaklandığında içerik safe area içinde kaydırılır; “Devam/Giriş/Kaydet” klavye üstü aksiyon barı opsiyonel.
- Analitik (öneri): `onboarding_language_selected`, `auth_signup_started`, `auth_otp_requested`, `auth_otp_verified`, `auth_login_success`, `auth_login_failed`, `auth_password_reset_started`, `auth_password_reset_completed`, `session_expired_shown`.

---

## Ekran 01 — Splash / Oturum kontrolü

**Bağlı US:** US-1.6, US-1.7  
**Amaç:** Açılışta güvenli oturum doğrulama + plan/rol/seat senkronu.  

**Bileşenler**
- Logo + kısa durum metni (“Oturum doğrulanıyor…”)
- Progress (indeterminate)
- Offline banner: “Bağlantı yok…”
- CTA: “Tekrar Dene”

**Durumlar**
- `Loading`: token doğrulama + profile/entitlements fetch
- `Session invalid`: “Oturum süreniz doldu” → Giriş ekranına yönlendirme (US-1.6)
- `Offline`: offline banner + retry (US-1.3 offline kuralı ile uyum)

---

## Ekran 02 — Dil seçimi

**Bağlı US:** US-1.1  
**Amaç:** TR/EN/ES dil seçimi; profile kaydetme; offline yerel saklama.  

**Bileşenler**
- Başlık + açıklama
- Dil listesi (TR/EN/ES) + seçili durumu
- CTA: “Devam”
- Helper: “Profil → Ayarlar → Dil’den değiştirilebilir”

**Acceptance Criteria eşlemesi**
- Seçim profile kaydedilir; offline ise yerelde saklanır ve sonra senkronlanır.
- Uygulama açılışlarında seçili dil otomatik uygulanır.

---

## Ekran 03 — Karşılama (Giriş / Kayıt)

**Bağlı US:** US-1.2, US-1.3  
**Amaç:** Kullanıcıyı net şekilde “Giriş” veya “Kayıt” akışına sokmak.  

**Bileşenler**
- Başlık + kısa güvenlik metni
- CTA: “Giriş Yap”
- CTA: “Kayıt Ol”
- Link/CTA: “Gizlilik & Kullanım”

---

## Ekran 04 — Kayıt (E‑posta / Telefon)

**Bağlı US:** US-1.2  
**Amaç:** E‑posta/telefon doğrulama başlangıcı; format validasyonu.  

**Bileşenler**
- Segment: “Telefon / E‑posta”
- Input
- Inline error (format hatası)
- CTA: “Devam” (yalnızca geçerli formatta aktif)
- Mevcut hesap banner: “Bu hesap zaten var” + “Giriş yap”

**Acceptance Criteria eşlemesi**
- Geçerli format → CTA aktif
- Geçersiz format → hata + CTA pasif
- Daha önce kayıtlıysa → bilgilendirme + giriş yönlendirmesi

---

## Ekran 05 — OTP doğrulama

**Bağlı US:** US-1.2  
**Amaç:** OTP ile doğrulama; yanlış/expired/rate-limit yönetimi.  

**Bileşenler**
- 6 haneli OTP input
- “Kodu yeniden gönder” + cooldown (countdown)
- “Numarayı/e‑postayı değiştir”
- Hata bannerları:
  - “Kod hatalı (kalan deneme: N)”
  - “Kodun süresi doldu” + resend

**Acceptance Criteria eşlemesi**
- Doğru kod → hesap oluşturulur ve giriş yapılır
- Yanlış kod → hata + kalan deneme
- Expired → mesaj + resend
- Rate-limit → cooldown ve resend engeli

---

## Ekran 06 — Giriş Yap

**Bağlı US:** US-1.3, US-1.7  
**Amaç:** E‑posta/telefon + şifre ile giriş; offline/kilit yönetimi; giriş sonrası senkron.  

**Bileşenler**
- Input: e‑posta/telefon
- Input: şifre (+ göster/gizle)
- Genel hata mesajı (kimlik doğrulama başarısız)
- Offline banner: “Bağlantı yok”
- Geçici kilit banner + süre + “şifre sıfırla” önerisi
- CTA: “Giriş Yap”
- Link: “Şifremi Unuttum”

**Acceptance Criteria eşlemesi**
- Doğru bilgiler → Ana Sayfa
- Hatalı bilgiler → genel hata
- Çok deneme → geçici kilit + bilgilendirme
- Offline → bağlantı yok + tekrar dene
- Giriş sonrası → profil/abonelik/seat/rol senkronu

---

## Ekran 07 — Şifre sıfırlama (başlat)

**Bağlı US:** US-1.4  
**Amaç:** Doğrulama (OTP) akışını başlatmak.  

**Bileşenler**
- Input: e‑posta/telefon
- CTA: “Kodu Gönder”
- Rate-limit banner: “01:20 sonra tekrar deneyin”

---

## Ekran 08 — Yeni şifre belirle

**Bağlı US:** US-1.4  
**Amaç:** Şifre politikası uyumlu yeni şifreyi kaydetmek; başarı sonrası girişe dönmek.  

**Bileşenler**
- Input: yeni şifre
- Input: yeni şifre tekrar
- Şifre gücü/politika metni
- CTA: “Kaydet” (yalnızca politika uygunsa aktif)
- Başarı mesajı + “Giriş ekranına yönlendiriliyorsunuz”

---

## Ekran 09 — Oturum süresi doldu

**Bağlı US:** US-1.6  
**Amaç:** Sunucu tarafından geçersiz kılınan oturumda kullanıcıyı güvenli şekilde yeniden girişe yönlendirmek.  

**Bileşenler**
- Başlık: “Oturum süreniz doldu”
- Açıklama
- CTA: “Tekrar Giriş Yap”
- İkincil: “Daha sonra”

---

## Ekran 10 — Çıkış onayı (Bottom Sheet)

**Bağlı US:** US-1.5  
**Amaç:** Çıkış işlemini bilinçli onaylatmak; token temizliği garantisi.  

**Bileşenler**
- Sheet başlığı + kısa açıklama
- CTA: “Çıkış Yap”
- CTA: “Vazgeç”
