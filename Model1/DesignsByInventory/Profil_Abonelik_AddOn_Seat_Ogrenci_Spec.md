# 3.5 Profil: Abonelik, Add-on, Seat, Öğrenci İndirimi — Production Ready Ekran Spesifikasyonu

Kaynak: `Model1/UserStoriesRev3.md` (EPIC 3: US-3.1–US-3.8, EPIC 21: US-21.1–US-21.7).  
Hedef cihaz: iPhone 17 Pro (tasarım referansı: 393×852 pt, Dynamic Island, safe area üst/alt).  
Tasarım dosyası: `Model1/Designs/Profil_Abonelik_AddOn_Seat_Ogrenci_iPhone17Pro.html`

## Renk paleti (Light Mode)

Bu palet, paylaşılan logo görseli baz alınarak **yaklaşık** çıkarılmıştır.

- **Primary (Navy)**: `#1E2A78`
- **Accent (Teal)**: `#0FA3B1`
- **Highlight (Gold)**: `#F2C14E`
- **Background**: `#F7F8FB`
- **Surface**: `#FFFFFF`
- **Stroke**: `#E6E8F0`
- **Text**: `#0D1226`
- **Muted text**: `#5B647A`
- **Danger**: `#D92D20`
- **Success**: `#039855`

Logo dosyası: `Model1/Designs/assets/pst-coaching-logo.png`

## Ortak “Production Ready” standartları (3.5 kapsamı)

- Durumlar: loading/skeleton, error + retry, offline bilgilendirme.
- Entitlements doğrulama: satın alma sonrası **server-side doğrulama**; 3 saniye üstü gecikmede “Erişimin doğrulanıyor”; senkron sorunu için **Restore + Retry**.
- Rol/Yetki:
  - **Plan Sahibi**: plan değiştir/iptal, add-on satın alma, seat yönetimi.
  - **Plan Üyesi**: satın alma/yonetim aksiyonları kapalı; “Plan sahibine başvur” mesajı.
- Şeffaflık:
  - Paywall’da “neden kilitli” tek cümle.
  - Öğrenci indirimi ve add-on indirim kapsamı ödeme özetinde açık.
  - Seat doluluğu (örn. 3/5) ve limit etkileri net.
- Gizlilik: öğrenci doğrulama verisi için “ne topluyoruz?” + saklama politikası + silme onayı.

---

## Ekran listesi (HTML ile birebir)

1. **Abonelik & Erişim (Entitlements)** — US-3.2 + US-3.7 — Faz-1
2. **Plan Seçimi & Karşılaştırma** — US-3.1 + US-21.1 — Faz-1
3. **Satın Alma (Checkout)** — US-3.2 — Faz-1
4. **Erişim Doğrulanıyor (3s+)** — US-3.2 + US-3.7 — Faz-1
5. **Add-on Yönetimi** — US-3.3 — Faz-1
6. **Planı Yönet (Değiştir/Limit Etkileri)** — US-3.5 (+ restore senaryosu) — Faz-1
7. **Abonelik İptali (Etkiler + Geri Dönüş)** — US-3.8 — Faz-1
8. **Kişi (Seat) Yönetimi** — US-3.6 — Faz-1
9. **Ödeme Geçmişi & Restore** — US-3.7 — Faz-1
10. **Öğrenci İndirimi (Giriş)** — US-21.1 + US-3.4 — Faz-1
11. **Uygunluk & Şeffaflık** — US-21.2 — Faz-1
12. **Doğrulama Yöntemi (E-posta/Belge)** — US-21.3 — Faz-1
13. **Okul E-postası Kodu** — US-21.3 — Faz-1
14. **Belge Yükleme** — US-21.3 — Faz-1
15. **Doğrulama Durumu/İtiraz** — US-21.4 — Faz-1
16. **İndirimli Ödeme Özeti** — US-21.5 — Faz-1
17. **İndirim Süresi & Yenileme** — US-21.6 — Faz-1
18. **Gizlilik & Veri Yönetimi** — US-21.7 — Faz-1

## Rol / segment / plan (bu bölüm için)

- **Danışan (Genel Kullanıcı)**: plan seçimi, satın alma, öğrenci indirimi.
- **Plan Sahibi**: plan yönetimi, iptal, seat, add-on satın alma.
- **Plan Üyesi**: görüntüleme + kısıtlı aksiyon (satın alma kapalı).

