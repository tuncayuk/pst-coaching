# PST Mobile — Tüm User Flow’lar & Screen Inventory (Faz 1–2)

> Not: Bu doküman, PRD’den türetilmiş “tek kaynak” akış ve ekran envanteridir.

**Versiyon:** 1.0  
**Tarih:** Ocak 2026  
**Kaynak:** `Model2/PST_Mobile_PRD.md` (v1.1)  
**Amaç:** Faz 1 (MVP) ve Faz 2 kapsamındaki tüm ana user flow’ları ve ekran envanterini, geliştirme/tasarım/QA için üretime hazır (production-ready) formatta tek dokümanda toplamak.

---

## 0) Kapsam, Fazlar, Roller

### Fazlar
- **Faz 1 (MVP / Production):** EPIC 1–11
- **Faz 2 (Geliştirme):** EPIC 12–14, 16 *(PRD’de özet)*  
  - Faz planında ayrıca: EPIC 15 (Oyunlaştırma), EPIC 17 (Hatırlatıcılar & Bildirimler), EPIC 18 (Video) *(detaylı user story PRD’de yok; bu dokümanda “placeholder” olarak işaretlenir).*

### Roller
- **Genel Kullanıcı / Danışan**
- **Plan Sahibi** (Aile/Grup planlarında seat yönetimi ve add-on yönetimi)
- **Plan Üyesi**
- **Koç** (Faz 2)

---

## 1) Global İş Kuralları (Tüm Akışlar)

- **08:00 Yeni Gün Kuralı:** Yeni içerik günü 08:00’de açılır.
- **23:59 Teslim Kuralı:** Günlük yorum teslimi en geç 23:59’a kadar yapılır.
- **Kilitli İlerleme:** Bir adım/bölüm/paket tamamlanmadan sonraki açılmaz.
- **Satın Alma Doğrulama:** Satın almalar **server-side** doğrulanır; entitlement server’dan gelir.
- **Gizlilik Onayı:** Paylaşım/dışa aktarma öncesi kullanıcı onayı alınır.

---

## 2) Tüm User Flow’lar (Faz 1–2)

> Not: “Ekranlar” alanında referanslar Screen Inventory’deki `SCR-xxx` kimlikleridir.

### UF-001 — Dil Seçimi
- **Faz:** 1 (US-1.1)
- **Aktör:** Genel Kullanıcı
- **Ön Koşul:** İlk açılış veya kullanıcı “Dil Ayarları”ndan değiştiriyor
- **Adımlar:**
  1. Kullanıcı dil listesini görür, seçim yapar.
  2. Seçim profil/cihaz seviyesinde kaydedilir (offline saklanır).
  3. Uygulama statik metinleri seçilen dilde render eder.
- **Hata/İstisna:** Offline senkron bekler; kullanıcıya non-blocking bilgi verilir.
- **Ekranlar:** `SCR-001`, `SCR-136`

### UF-002 — Kayıt Olma (E-posta/Telefon + OTP)
- **Faz:** 1 (US-1.2)
- **Aktör:** Genel Kullanıcı
- **Adımlar:** Kayıt formu → OTP doğrulama → hesap oluşturma → ana sayfa.
- **İstisnalar:** Yanlış OTP (kalan deneme), süre dolması, mevcut hesap tespiti.
- **Ekranlar:** `SCR-002`, `SCR-004`, `SCR-005`, `SCR-010`

### UF-003 — Giriş Yapma
- **Faz:** 1 (US-1.3)
- **Aktör:** Genel Kullanıcı
- **Adımlar:** Giriş → doğrulama → abonelik/rol senkronu → ana sayfa.
- **İstisnalar:** Hatalı giriş (güvenli hata), ardışık denemede geçici kilit.
- **Ekranlar:** `SCR-002`, `SCR-003`, `SCR-010`

### UF-004 — Şifre Sıfırlama
- **Faz:** 1 (US-1.4)
- **Aktör:** Genel Kullanıcı
- **Adımlar:** “Şifremi Unuttum” → doğrulama → yeni şifre → giriş.
- **Ekranlar:** `SCR-006`, `SCR-005`, `SCR-007`, `SCR-003`

### UF-005 — Oturum Yönetimi (Çıkış) + Oturum Güvenliği
- **Faz:** 1 (US-1.5, US-1.6)
- **Aktör:** Genel Kullanıcı
- **Adımlar:** Profil → Ayarlar → Çıkış → onay → token temizliği → giriş ekranı.
- **İstisnalar:** Oturum süresi doldu (yeniden doğrulama/girişe yönlendirme).
- **Ekranlar:** `SCR-130`, `SCR-135`, `MDL-004`, `SCR-003`

### UF-010 — Ana Sayfa “Devam Et” (Bugün Özeti)
- **Faz:** 1 (US-2.1)
- **Aktör:** Danışan
- **Ön Koşul:** En az 1 aktif içerik veya “kaldığın adım” bilgisi var
- **Adımlar:** Ana Sayfa → Bugün Kartı → Devam Et → ilgili içerik adımı.
- **Offline:** Son bilinen özet cache’den; içerik çekilemezse “tekrar dene”.
- **Ekranlar:** `SCR-010`, `SCR-062` / `SCR-070` / `SCR-080` / `SCR-090`

### UF-011 — Ana Sayfa Alan Navigasyonu + “Vicdandan Karaktere”
- **Faz:** 1 (US-2.3, US-2.4)
- **Aktör:** Danışan
- **Adımlar:** Ana Sayfa kartları → ilgili kataloğa veya bilgilendirme ekranına geçiş.
- **Ekranlar:** `SCR-010`, `SCR-030`, `SCR-013`

### UF-012 — Global Arama (İçerik Türleri Arası)
- **Faz:** 1 (US-2.5)
- **Aktör:** Danışan
- **Adımlar:** Arama alanı → sonuçlar (türlere göre gruplanır) → içerik detayı.
- **Boş Durum:** “Sonuç yok” + öneriler.
- **Ekranlar:** `SCR-011`, `SCR-012`, `SCR-035` / `SCR-037` / `SCR-039` / `SCR-041`

### UF-013 — Hatırlatıcı Ayarlama (Faz 1)
- **Faz:** 1 (US-2.7)
- **Aktör:** Danışan
- **Adımlar:** Ayarlar → Hatırlatıcılar → izin açıklaması → izin isteme → saat seçimi.
- **Kural:** Yorum teslim edildiyse aynı gün tekrar hatırlatma gönderilmez.
- **Ekranlar:** `SCR-137`, `MDL-017`

### UF-020 — Plan Seçimi → Satın Alma → Aktivasyon
- **Faz:** 1 (US-3.1, US-3.2)
- **Aktör:** Danışan
- **Adımlar:** Plan seç → ödeme → server-side doğrulama → entitlement aktif → başarı.
- **İstisnalar:** İptal/başarısız ödeme, doğrulama gecikmesi, restore gereksinimi.
- **Ekranlar:** `SCR-020`, `SCR-022`, `SCR-023`, `SCR-029`

### UF-021 — Öğrenci İndirimi (%50) Doğrulama
- **Faz:** 1 (US-3.4)
- **Aktör:** Danışan
- **Adımlar:** Plan seçimi → “Öğrenciyim” → doğrulama yöntemi → indirim uygula.
- **Ekranlar:** `SCR-020`, `SCR-021`

### UF-022 — Add-on Yönetimi (Plan Sahibi)
- **Faz:** 1 (US-3.3)
- **Aktör:** Plan Sahibi
- **Adımlar:** Abonelik → Add-on’lar → aktifleştir/kapat → entitlement güncelle.
- **Kural:** Plan Üyesi satın alma yapamaz.
- **Ekranlar:** `SCR-024`, `MDL-013`

### UF-023 — Kişi (Seat) Yönetimi + Davet
- **Faz:** 1 (US-3.6)
- **Aktör:** Plan Sahibi
- **Adımlar:** Kişi yönetimi → doluluk gör → davet gönder/kaldır → limit kontrol.
- **İstisna:** Limit dolu → add-on önerisi.
- **Ekranlar:** `SCR-133`, `SCR-134`, `MDL-014`

### UF-024 — Ödeme Geçmişi + Satın Alımları Geri Yükle
- **Faz:** 1 (US-3.7)
- **Aktör:** Danışan
- **Adımlar:** Ödemeler → işlem listesi → restore → server doğrulama → entitlement.
- **Ekranlar:** `SCR-027`

### UF-025 — Plan Yönetimi / İptal
- **Faz:** 1 (US-3.5, US-3.8)
- **Aktör:** Plan Sahibi
- **Adımlar:** Abonelik yönetimi → plan değiştir/iptal → platform yönlendirmesi → sonuç.
- **Ekranlar:** `SCR-025`, `SCR-026`, `SCR-028`

### UF-026 — Paywall (Erişim Kısıtlı İçerik)
- **Faz:** 1 (US-2.3, US-4.1)
- **Aktör:** Danışan
- **Adımlar:** Kısıtlı içerik → paywall → plan seçimi akışına yönlendirme.
- **Ekranlar:** `SCR-029`, `SCR-020`

### UF-030 — Keşfet (Merkez) + İçerik Türleri Segmenti
- **Faz:** 1 (US-4.1)
- **Aktör:** Danışan
- **Adımlar:** Keşfet → tür segmenti (Yolculuk/Atölye/Modül/e-Kitap) → liste.
- **Ekranlar:** `SCR-030`, `SCR-034`, `SCR-036`, `SCR-038`, `SCR-040`

### UF-031 — İçerik Belirleme Asistanı → Öneriler
- **Faz:** 1 (US-4.2)
- **Aktör:** Danışan
- **Adımlar:** Asistan → hedef/süre/tercih soruları → 1 ana + 2 alternatif öneri.
- **İstisna:** “Atla” → katalog.
- **Ekranlar:** `SCR-031`, `SCR-032`, `SCR-033`

### UF-032 — Katalog Filtreleme/Sıralama
- **Faz:** 1 (US-4.3, US-4.5, US-4.7, US-4.9)
- **Aktör:** Danışan
- **Adımlar:** Liste → filtre/sıralama → sonuçların güncellenmesi → detay.
- **Ekranlar:** `SCR-034`/`SCR-036`/`SCR-038`/`SCR-040`, `MDL-007`, `MDL-008`

### UF-033 — İçerik Detayı → Favoriye Ekle
- **Faz:** 1 (US-4.4, US-4.6, US-4.8, US-4.10)
- **Aktör:** Danışan
- **Adımlar:** Detay → favoriye ekle → favorilerde görünür.
- **Ekranlar:** `SCR-035`/`SCR-037`/`SCR-039`/`SCR-041`, `SCR-110`

### UF-034 — İçerik Başlatma (Hedef + Kurallar + Hatırlatıcı)
- **Faz:** 1 (US-4.11)
- **Aktör:** Danışan
- **Adımlar:** Detay → “Başlat” → hedef seçimi → kurallar (08:00/23:59) → başla.
- **Opsiyonel:** Hatırlatıcı kurma.
- **Ekranlar:** `SCR-042`, `MDL-009`

### UF-040 — Günün İçeriğini Okuma (Yolculuk/Atölye/Modül)
- **Faz:** 1 (US-5.1)
- **Aktör:** Danışan
- **Adımlar:** Devam et → okuma ekranı → ilerleme güncelle.
- **Offline:** Skeleton + tekrar dene.
- **Ekranlar:** `SCR-062`

### UF-041 — Sesli Okuma
- **Faz:** 1 (US-5.2)
- **Aktör:** Danışan
- **Adımlar:** Okuma ekranı → sesli okuma → hız ayarı → arka plan davranışı.
- **Ekranlar:** `SCR-062`, `SCR-063`

### UF-042 — Altını Çizme & Not Alma
- **Faz:** 1 (US-5.3)
- **Aktör:** Danışan
- **Adımlar:** Metin seç → vurgu/not → kaydet → favorilere ekle.
- **Ekranlar:** `SCR-062`, `MDL-020`, `SCR-110`

### UF-043 — Yorum Yazma (Taslak + 23:00 Uyarısı)
- **Faz:** 1 (US-5.4)
- **Aktör:** Danışan
- **Adımlar:** Yorum yaz → sorular → taslak autosave → kelime sayacı.
- **İstisna:** 23:00 sonrası nazik uyarı.
- **Ekranlar:** `SCR-064`, `MDL-010`

### UF-044 — Önizleme & Teslim
- **Faz:** 1 (US-5.5)
- **Aktör:** Danışan
- **Adımlar:** Önizle → teslim onayı → teslim → yorum kilitlenir.
- **Kural:** 23:59 sonrası davranış net gösterilir.
- **Ekranlar:** `SCR-065`, `MDL-011`

### UF-045 — 08:00 Kilidi (Yarın Açılacak)
- **Faz:** 1 (US-5.6)
- **Aktör:** Danışan
- **Adımlar:** Gün tamamlandı → yarın kilitli → 08:00 geri sayım → açılış.
- **Ekranlar:** `SCR-066`, `MDL-012`

### UF-046 — Uygulama/Egzersiz Tamamlama
- **Faz:** 1 (US-5.7)
- **Aktör:** Danışan
- **Adımlar:** Uygulama adımları → işaretle → kaydet → sonraki.
- **Ekranlar:** `SCR-067`

### UF-050 — Gelişim Paneli
- **Faz:** 1 (US-6.1)
- **Aktör:** Danışan
- **Adımlar:** Gelişim tab → özet metrikler → içerik türü kırılımı.
- **Ekranlar:** `SCR-120`

### UF-051 — Duygusal Harita
- **Faz:** 1 (US-6.2)
- **Aktör:** Danışan
- **Adımlar:** Gelişim → Duygusal Harita → 14/30 gün → legend + disclaimer.
- **Ekranlar:** `SCR-121`

### UF-052 — Güçlü/Gelişim Alanları + Öneri Uygula
- **Faz:** 1 (US-6.3)
- **Aktör:** Danışan
- **Adımlar:** Alanlarım → öneriler → ilgili içeriğe navigasyon.
- **Ekranlar:** `SCR-122`, `SCR-035`/`SCR-037`/`SCR-039`/`SCR-041`

### UF-053 — Haftalık Özet
- **Faz:** 1 (US-6.4)
- **Aktör:** Danışan
- **Adımlar:** Haftalık Özet → trend/öneri → paylaşım.
- **Ekranlar:** `SCR-123`, `MDL-018`

### UF-054 — Gelişim Raporu (PDF İndir/Paylaş)
- **Faz:** 1 (US-6.6)
- **Aktör:** Danışan
- **Adımlar:** Rapor → önizleme → indir/paylaş → gizlilik onayı.
- **Ekranlar:** `SCR-124`, `MDL-018`

### UF-055 — İçerik Bitiş Değerlendirmesi
- **Faz:** 1 (US-6.5)
- **Aktör:** Danışan
- **Adımlar:** İçerik tamamlandı → değerlendirme öner → gönder veya daha sonra.
- **Ekranlar:** `SCR-125`, `SCR-126`

### UF-060 — e-Kitap Okuyucu (Kaldığın Yerden)
- **Faz:** 1 (US-7.1)
- **Aktör:** Danışan
- **Adımlar:** e-Kitaplarım → kitap → okuyucu aç → son sayfa.
- **Ekranlar:** `SCR-070`

### UF-061 — e-Kitap Navigasyonu (Sayfa/İçindekiler)
- **Faz:** 1 (US-7.2)
- **Aktör:** Danışan
- **Adımlar:** TOC aç → bölüme git / sayfaya atla → ilerleme güncelle.
- **Ekranlar:** `SCR-071`, `SCR-070`

### UF-062 — e-Kitap Okuma Ayarları
- **Faz:** 1 (US-7.3)
- **Aktör:** Danışan
- **Adımlar:** Okuyucu ayarları → font/tema/satır aralığı → kaydet.
- **Ekranlar:** `SCR-072`

### UF-063 — e-Kitap Vurgularım & Notlarım
- **Faz:** 1 (US-7.4, US-7.5)
- **Aktör:** Danışan
- **Adımlar:** Metin seç → vurgu/not → listele → sayfaya git → düzenle/dışa aktar.
- **Ekranlar:** `SCR-070`, `SCR-073`, `MDL-020`

### UF-064 — Sesli Kitap (Varsa)
- **Faz:** 1 (US-7.6)
- **Aktör:** Danışan
- **Adımlar:** Sesli dinle → hız → arka plan.
- **Ekranlar:** `SCR-075`

### UF-065 — e-Kitap İlerleme
- **Faz:** 1 (US-7.7)
- **Aktör:** Danışan
- **Adımlar:** İlerleme yüzdesi → tahmini kalan süre → tamamlanınca rozet.
- **Ekranlar:** `SCR-076`

### UF-066 — e-Kitap Çevrimdışı İndirme
- **Faz:** 1 (US-7.8)
- **Aktör:** Danışan
- **Adımlar:** Detay → indir → durum → depolama uyarısı → offline okuma.
- **Ekranlar:** `SCR-041`, `MDL-015`, `MDL-016`

### UF-070 — Atölye Deneyimi (Bölüm → Uygulama → Yorum → Tamamlama)
- **Faz:** 1 (US-8.1–US-8.6)
- **Aktör:** Danışan
- **Adımlar:** Atölye ana → okuma → uygulama → yorum → ilerleme → tebrikler.
- **Kural:** 23:59 teslim, kilitli ilerleme.
- **Ekranlar:** `SCR-080`, `SCR-081`, `SCR-082`, `SCR-064`, `SCR-083`, `SCR-084`

### UF-080 — Favoriler (Listeleme/Arama/Filtre)
- **Faz:** 1 (US-9.1, US-9.4)
- **Aktör:** Danışan
- **Adımlar:** Favoriler → tür filtresi/arama → öğe detayı.
- **Ekranlar:** `SCR-110`, `SCR-112`, `MDL-007`

### UF-081 — Favori Detayı → Kaynağa Git → Not Düzenleme
- **Faz:** 1 (US-9.2)
- **Aktör:** Danışan
- **Adımlar:** Favori detayı → not düzenle (autosave) → kaynağa git.
- **Ekranlar:** `SCR-111`, `SCR-062`/`SCR-070`/`SCR-081`

### UF-082 — Koleksiyon Yönetimi
- **Faz:** 1 (US-9.3)
- **Aktör:** Danışan
- **Adımlar:** Koleksiyon oluştur → favori ekle → sil (undo).
- **Ekranlar:** `SCR-113`, `MDL-005`

### UF-083 — Paylaşım / Dışa Aktarma (Favoriler & Rapor)
- **Faz:** 1 (US-9.5)
- **Aktör:** Danışan
- **Adımlar:** Paylaş → kapsam seç → gizlilik onayı → PDF/export.
- **Ekranlar:** `MDL-006`, `MDL-018`

### UF-090 — Erişilebilirlik Ayarları
- **Faz:** 1 (US-10.1–US-10.4)
- **Aktör:** Danışan
- **Adımlar:** Erişilebilirlik → metin boyutu/kontrast/tema → anında uygula → kaydet.
- **Ekranlar:** `SCR-138`, `SCR-138A`, `SCR-138B`

### UF-100 — Modül → Paketler → Kilitli İlerleme → Sertifika
- **Faz:** 1 (US-11.1–US-11.6)
- **Aktör:** Danışan
- **Adımlar:** Modül ana → paket detayı → okuma/uygulama → kilit kontrol → tamamlama → sertifika.
- **Ekranlar:** `SCR-090`, `SCR-091`, `SCR-092`, `SCR-093`, `SCR-094`, `SCR-095`

---

### UF-200 — Koç Paneli: Danışan Listesi → Danışan Profili → İçerik Takibi → Koç Yorumu
- **Faz:** 2 (US-12.1–US-12.4)
- **Aktör:** Koç
- **Adımlar:** Danışanlar → profil → içerikler → yorum yaz → gönder.
- **Ekranlar:** `SCR-140`, `SCR-142`, `SCR-144`, `SCR-143`

### UF-201 — Koç Paneli: Uyarılar → Hızlı Aksiyon
- **Faz:** 2 (US-12.1, kapsam genişletme)
- **Aktör:** Koç
- **Adımlar:** Uyarılar → danışana git / not ekle / takip et.
- **Ekranlar:** `SCR-141`, `SCR-142`, `SCR-146`

### UF-210 — Topluluk: Birlikte Okuma Grubu Oluşturma
- **Faz:** 2 (US-13.1)
- **Aktör:** Plan Sahibi/Üye (plan kısıtlarına göre)
- **Adımlar:** Topluluk → Birlikte Okuma → grup oluştur → materyal seç → kurallar → oluştur.
- **Ekranlar:** `SCR-150`, `SCR-151`, `SCR-152`

### UF-211 — Topluluk: Grup Detayı → Ortak İlerleme → Grup Notları
- **Faz:** 2 (US-13.2)
- **Aktör:** Grup Üyesi
- **Adımlar:** Grup detayı → ilerleme haritası → notlar → not ekle.
- **Ekranlar:** `SCR-153`, `SCR-154`, `SCR-155`

### UF-212 — Topluluk: Üye Davet
- **Faz:** 2 (US-13.1 kapsamı)
- **Aktör:** Grup Yöneticisi
- **Adımlar:** Grup detayı → davet → link/e-posta.
- **Ekranlar:** `SCR-156`

### UF-220 — Kitap Kulübü: Kulüp Detayı → Tartışma Akışı
- **Faz:** 2 (US-14.1)
- **Aktör:** Kulüp Üyesi
- **Adımlar:** Kulüp listesi → kulüp detayı → tartışma.
- **Ekranlar:** `SCR-157`, `SCR-158`, `SCR-159`

### UF-230 — AI Asistan: Paywall → Sohbet → Kaynak Gösterimi
- **Faz:** 2 (US-16.1–US-16.3)
- **Aktör:** Danışan (AI add-on gerekli)
- **Adımlar:** AI erişimi → upsell → aktifse sohbet → cevap → kaynak kartı → kaynak detayı.
- **Kural:** AI cevapları **sadece sistem içi içeriklere** dayanır (RAG).
- **Ekranlar:** `SCR-160`, `SCR-161`, `SCR-162`, `SCR-164`

### UF-231 — AI Analiz (Yorumlardan İçgörü)
- **Faz:** 2 (US-16.4)
- **Aktör:** Danışan
- **Adımlar:** AI merkezi → analiz → içgörü/öneri → disclaimer.
- **Ekranlar:** `SCR-163`

### UF-250 — Video (Placeholder)
- **Faz:** 2 (EPIC 18, PRD’de detay US yok)
- **Not:** PRD’ye detay user story eklendiğinde acceptance kriterleri ve edge-case’ler netleştirilmeli.
- **Ekranlar:** `SCR-170`–`SCR-174`

### UF-260 — Oyunlaştırma (Placeholder)
- **Faz:** 2 (EPIC 15, PRD’de detay US yok)
- **Ekranlar:** `SCR-180`–`SCR-183`

---

## 3) Screen Inventory (Faz 1–2)

> **Sözleşme:** Ekran adları + `Route` değerleri, uygulama içi navigasyon ve deep link tasarımının “tek kaynak” alanıdır.

### 3.1 Onboarding & Auth

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-001 | Dil Seçimi | `onboarding/language` | 1 | US-1.1 | İlk açılış dil seçimi |
| SCR-002 | Karşılama (Giriş/Kayıt) | `auth/welcome` | 1 | US-1.2–1.3 | Giriş/kayıt başlangıcı |
| SCR-003 | Giriş | `auth/login` | 1 | US-1.3 | E-posta/telefon + şifre |
| SCR-004 | Kayıt Ol | `auth/register` | 1 | US-1.2 | E-posta/telefon |
| SCR-005 | OTP Doğrulama | `auth/otp` | 1 | US-1.2, US-1.4 | OTP doğrulama |
| SCR-006 | Şifremi Unuttum | `auth/forgot-password` | 1 | US-1.4 | Doğrulama başlatır |
| SCR-007 | Yeni Şifre | `auth/reset-password` | 1 | US-1.4 | Şifre politikaları |

### 3.2 Ana Sayfa & Arama

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-010 | Ana Sayfa | `home` | 1 | US-2.1–2.6 | Bugün kartı + alanlar |
| SCR-011 | Arama | `search` | 1 | US-2.5 | Global arama |
| SCR-012 | Arama Sonuçları | `search/results` | 1 | US-2.5 | Türlere göre gruplu |
| SCR-013 | Vicdandan Karaktere | `home/vkd` | 1 | US-2.4 | Yaklaşım bilgilendirme |

### 3.3 Keşfet (Katalog & Asistan)

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-030 | Keşfet Ana | `explore` | 1 | US-4.1 | Segment/tab merkezi |
| SCR-031 | Asistan Başlangıç | `explore/assistant` | 1 | US-4.2 | Akışa giriş |
| SCR-032 | Asistan Soru Akışı | `explore/assistant/questions` | 1 | US-4.2 | Hedef/süre/tercih |
| SCR-033 | Asistan Öneriler | `explore/assistant/recommendations` | 1 | US-4.2 | 1 ana + 2 alternatif |
| SCR-034 | Yolculuk Kataloğu | `explore/journeys` | 1 | US-4.3 | Filtre/sıralama |
| SCR-035 | Yolculuk Detayı | `explore/journeys/:id` | 1 | US-4.4 | Başlat + favori |
| SCR-036 | Atölye Kataloğu | `explore/workshops` | 1 | US-4.5 | Filtre |
| SCR-037 | Atölye Detayı | `explore/workshops/:id` | 1 | US-4.6 | Başlat + bağlı yolculuk |
| SCR-038 | Modül Kataloğu | `explore/modules` | 1 | US-4.7 | Paket görünümü |
| SCR-039 | Modül Detayı | `explore/modules/:id` | 1 | US-4.8 | Paket listesi + başlat |
| SCR-040 | e-Kitap Kataloğu | `explore/books` | 1 | US-4.9 | Filtre |
| SCR-041 | e-Kitap Detayı | `explore/books/:id` | 1 | US-4.10, US-7.8 | Okumaya başla + indir |
| SCR-042 | İçerik Başlatma (Kurallar) | `content/start` | 1 | US-4.11 | Kurallar + hedef |

### 3.4 Kütüphane & Günlük Okuma/Teslim

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-060 | Kütüphane Ana | `library` | 1 | US-2.6 | Aktif içeriklerim |
| SCR-062 | Okuma Ekranı (Günün Notu) | `content/reading` | 1 | US-5.1–5.3 | Okuma + vurgu/not |
| SCR-063 | Sesli Okuma Oynatıcı | `content/reading/audio` | 1 | US-5.2 | Hız/oynatma |
| SCR-064 | Yorum Yaz | `content/comment` | 1 | US-5.4 | Sorular + taslak |
| SCR-065 | Önizle & Teslim | `content/comment/submit` | 1 | US-5.5 | Teslim + kilit |
| SCR-066 | Yarın Kilitli (08:00) | `content/locked` | 1 | US-5.6 | Geri sayım |
| SCR-067 | Uygulama/Egzersiz | `content/exercise` | 1 | US-5.7 | Adım adım |

### 3.5 Gelişim

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-120 | Gelişim Ana | `growth` | 1 | US-6.1 | Dashboard |
| SCR-121 | Duygusal Harita | `growth/emotion-map` | 1 | US-6.2 | 14/30 gün |
| SCR-122 | Alanlarım | `growth/areas` | 1 | US-6.3 | Güçlü/Gelişim |
| SCR-123 | Haftalık Özet | `growth/weekly` | 1 | US-6.4 | Trend + öneri |
| SCR-124 | Rapor Önizleme | `growth/report` | 1 | US-6.6 | PDF indir/paylaş |
| SCR-125 | Değerlendirme Modal | `modal/rating` | 1 | US-6.5 | Kapanış önerisi |
| SCR-126 | Değerlendirme Formu | `growth/rating-form` | 1 | US-6.5 | Detaylı form |

### 3.6 e-Kitap Okuyucu

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-070 | e-Kitap Okuyucu | `reader/book/:id` | 1 | US-7.1–7.4 | Kaldığın yer + vurgu |
| SCR-071 | İçindekiler | `reader/book/:id/toc` | 1 | US-7.2 | Bölüme atlama |
| SCR-072 | Okuma Ayarları | `reader/book/:id/settings` | 1 | US-7.3 | Font/tema |
| SCR-073 | Vurgularım & Notlarım | `reader/book/:id/highlights` | 1 | US-7.5 | Liste + sayfaya git |
| SCR-075 | Sesli Kitap Oynatıcı | `reader/book/:id/audio` | 1 | US-7.6 | Hız/arka plan |
| SCR-076 | Okuma İlerlemesi | `reader/book/:id/progress` | 1 | US-7.7 | % + kalan süre |

### 3.7 Atölye

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-080 | Atölye Ana | `workshop/:id` | 1 | US-8.1 | Devam et + durum |
| SCR-081 | Atölye Okuma | `workshop/:id/reading/:sectionId` | 1 | US-8.2 | Okuma + not |
| SCR-082 | Atölye Uygulama | `workshop/:id/exercise/:sectionId` | 1 | US-8.3 | Adımlar + giriş |
| SCR-083 | Atölye İlerleme | `workshop/:id/progress` | 1 | US-8.5 | Durum + süre |
| SCR-084 | Atölye Tamamlandı | `workshop/:id/completed` | 1 | US-8.6 | Rozet/öneri |

### 3.8 Modül & Paket

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-090 | Modül Ana | `module/:id` | 1 | US-11.1 | Paket listesi |
| SCR-091 | Paket Detayı | `module/:id/package/:packageId` | 1 | US-11.2 | Başlat + önkoşul |
| SCR-092 | Paket Okuma | `module/:id/package/:packageId/reading/:sectionId` | 1 | US-11.3 | Okuma |
| SCR-093 | Paket Uygulama | `module/:id/package/:packageId/exercise/:sectionId` | 1 | US-11.4 | Adımlar |
| SCR-094 | Kilitli Paket | `module/:id/package/:packageId/locked` | 1 | US-11.5 | Kilit nedeni |
| SCR-095 | Modül Tamamlandı (Sertifika) | `module/:id/completed` | 1 | US-11.6 | Sertifika/rozet |

### 3.9 Favoriler & Arşiv

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-110 | Favoriler Ana | `favorites` | 1 | US-9.1 | Tür etiketli liste |
| SCR-111 | Favori Detayı | `favorites/:id` | 1 | US-9.2 | Kaynağa git |
| SCR-112 | Favori Arama/Filtre | `favorites/search` | 1 | US-9.4 | Arama + filtre |
| SCR-113 | Koleksiyonlar | `favorites/collections` | 1 | US-9.3 | Oluştur/düzenle |

### 3.10 Profil & Ayarlar

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-130 | Profil Ana | `profile` | 1 | US-1.5, US-2.2 | Profil + menü |
| SCR-131 | Hesap Bilgileri | `profile/account` | 1 | (PRD referans) | Kişisel bilgiler |
| SCR-132 | Hesap Düzenleme | `profile/account/edit` | 1 | (PRD referans) | Bilgi güncelleme |
| SCR-133 | Kişi Yönetimi (Seat) | `billing/seats` | 1 | US-3.6 | Aile/Grup kişi yönetimi |
| SCR-134 | Davet Gönder (Seat) | `billing/seats/invite` | 1 | US-3.6 | Üye davet etme |
| SCR-135 | Ayarlar Ana | `settings` | 1 | US-1.1, US-2.7, US-10.1 | Ayarlar hub |
| SCR-136 | Dil Ayarları | `settings/language` | 1 | US-1.1 | Dil değiştirme |
| SCR-137 | Bildirim Ayarları | `settings/notifications` | 1 | US-2.7 | Saat/izin |
| SCR-138 | Erişilebilirlik | `settings/accessibility` | 1 | US-10.1 | A11y hub |
| SCR-138A | Metin Boyutu | `settings/accessibility/text-size` | 1 | US-10.2 | Önizleme |
| SCR-138B | Kontrast & Tema | `settings/accessibility/theme` | 1 | US-10.3 | Tema |
| SCR-139 | Gizlilik Ayarları | `settings/privacy` | 1 | (PRD referans) | Veri kullanımı |

### 3.11 Abonelik

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-020 | Plan Seçimi | `billing/plans` | 1 | US-3.1 | Plan karşılaştırma |
| SCR-021 | Öğrenci Doğrulama | `billing/student` | 1 | US-3.4 | %50 indirim |
| SCR-022 | Ödeme Özeti | `billing/checkout` | 1 | US-3.2 | Satın alma özeti |
| SCR-023 | Satın Alma Başarılı | `billing/success` | 1 | US-3.2 | Başarı |
| SCR-024 | Add-on Yönetimi | `billing/addons` | 1 | US-3.3 | Add-on listesi |
| SCR-025 | Abonelik Yönetimi | `billing/manage` | 1 | US-3.5 | Plan + yenileme |
| SCR-026 | Plan Değiştirme | `billing/change-plan` | 1 | US-3.5 | Upgrade/Downgrade |
| SCR-027 | Ödeme Geçmişi | `billing/payments` | 1 | US-3.7 | Geçmiş + restore |
| SCR-028 | Abonelik İptali | `billing/cancel` | 1 | US-3.8 | İptal etkileri |
| SCR-029 | Paywall | `paywall` | 1 | US-4.1 | Erişim kısıtı |

---

### 3.12 Faz 2 — Koç Paneli

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-140 | Danışan Listesi | `coach/clients` | 2 | US-12.1 | Liste + filtre |
| SCR-141 | Uyarılar Listesi | `coach/alerts` | 2 | (PRD özet) | Risk uyarıları |
| SCR-142 | Danışan Profili | `coach/clients/:id` | 2 | US-12.2 | Hedef + metrik |
| SCR-143 | Koç Yorumu Yaz | `coach/clients/:id/comment` | 2 | US-12.4 | Geri bildirim |
| SCR-144 | İçerik Takibi | `coach/clients/:id/content` | 2 | US-12.3 | İçerik kullanımı |
| SCR-145 | Teslim Geçmişi | `coach/clients/:id/submissions` | 2 | (PRD özet) | Timeline |
| SCR-146 | Koç Notu Ekleme | `coach/clients/:id/notes` | 2 | (PRD özet) | Özel not |
| SCR-147 | Erişim Ayarları | `coach/clients/:id/permissions` | 2 | (PRD özet) | İzinler |

### 3.13 Faz 2 — Topluluk (Birlikte Okuma & Kitap Kulübü)

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-150 | Topluluk Ana | `community` | 2 | US-13.1, US-14.1 | Hub |
| SCR-151 | Birlikte Okuma Grupları | `community/groups` | 2 | US-13.1 | Grup listesi |
| SCR-152 | Grup Oluşturma | `community/groups/create` | 2 | US-13.1 | Kurallar + materyal |
| SCR-153 | Grup Detayı | `community/groups/:id` | 2 | US-13.2 | Plan + üyeler |
| SCR-154 | Ortak İlerleme Haritası | `community/groups/:id/progress` | 2 | US-13.2 | Üye ilerleme |
| SCR-155 | Grup Notları | `community/groups/:id/notes` | 2 | US-13.2 | Not feed |
| SCR-156 | Üye Davet (Grup) | `community/groups/:id/invite` | 2 | US-13.1 | Davet |
| SCR-157 | Kitap Kulübü Ana | `community/clubs` | 2 | US-14.1 | Kulüp listesi |
| SCR-158 | Kulüp Detayı | `community/clubs/:id` | 2 | US-14.1 | Kulüp bilgileri |
| SCR-159 | Kulüp Tartışma | `community/clubs/:id/discussion` | 2 | US-14.1 | Akış |

### 3.14 Faz 2 — AI Asistan (RAG)

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-160 | AI Paketi Gerekli | `ai/paywall` | 2 | US-16.1 | Upsell |
| SCR-161 | AI Sohbet | `ai/chat` | 2 | US-16.1 | Chat |
| SCR-162 | AI Cevabı (Detay) | `ai/answer/:id` | 2 | US-16.2 | Cevap + kaynak |
| SCR-163 | AI Analiz Raporu | `ai/analysis` | 2 | US-16.4 | İçgörü |
| SCR-164 | AI Kaynak Gösterim | `ai/source/:id` | 2 | US-16.3 | Kaynak preview |
| SCR-165 | AI Sohbet Geçmişi | `ai/history` | 2 | (PRD özet) | Chat listesi |

### 3.15 Faz 2 — Video (Placeholder)

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-170 | Video Kütüphanesi | `video` | 2 | (Faz planı) | Kategori + liste |
| SCR-171 | Video Oynatıcı | `video/:id/player` | 2 | (Faz planı) | Altyazı + hız |
| SCR-172 | Video Detay | `video/:id` | 2 | (Faz planı) | Açıklama |
| SCR-173 | Video İndirme | `video/:id/download` | 2 | (Faz planı) | Offline |
| SCR-174 | Video Transkript | `video/:id/transcript` | 2 | (Faz planı) | Metin + arama |

### 3.16 Faz 2 — Oyunlaştırma (Placeholder)

| ID | Ekran Adı | Route | Faz | Kaynak | Amaç / Not |
|---|---|---|---:|---|---|
| SCR-180 | Rozetlerim | `gamification/badges` | 2 | (Faz planı) | Rozet grid |
| SCR-181 | Seri Durumu | `gamification/streak` | 2 | (Faz planı) | Streak detay |
| SCR-182 | Seviye İlerlemesi | `gamification/level` | 2 | (Faz planı) | XP + seviye |
| SCR-183 | Puan Tablosu | `gamification/leaderboard` | 2 | (Faz planı) | Opt-in/out |

---

## 4) Modal/Popup Inventory (Global)

| ID | Modal Adı | Amaç |
|---|---|---|
| MDL-001 | Onay Modal | Genel onay |
| MDL-002 | Hata Modal | Genel hata |
| MDL-003 | Başarı Modal | Genel başarı |
| MDL-004 | Çıkış Onayı | Çıkış aksiyonu |
| MDL-005 | Silme Onayı | Favori/koleksiyon silme |
| MDL-006 | Paylaşım Seçenekleri | Share sheet |
| MDL-007 | Filtre Modal | Katalog/favori filtre |
| MDL-008 | Sıralama Modal | Katalog sıralama |
| MDL-009 | Hedef Seçimi | İçerik başlatma hedefi |
| MDL-010 | Zaman Uyarısı | 23:00+ uyarı |
| MDL-011 | Teslim Onayı | Teslim etmeden önce |
| MDL-012 | Kilit Bilgisi | Kilit nedeni |
| MDL-013 | Add-on Önerisi | Upsell (AI vb.) |
| MDL-014 | Limit Uyarısı | Seat limit / kapasite |
| MDL-015 | İndirme Onayı | Offline indirme onayı |
| MDL-016 | Depolama Uyarısı | Storage warning |
| MDL-017 | Bildirim İzni | Push izin modalı |
| MDL-018 | Gizlilik Onayı | Paylaşım öncesi |
| MDL-019 | Değerlendirme | İçerik bitiş anketi |
| MDL-020 | Not Ekleme | Vurguya not |

---

## 5) Açık Noktalar (PRD Netleştirme Gerektiren)

- **EPIC 15/17/18 (Faz 2):** PRD’de detaylı user story + acceptance criteria olmadığı için “placeholder” seviyesinde yer aldı; uygulamaya geçmeden önce PRD genişletilmeli.
- **Kütüphane IA:** PRD’de “Kütüphane” başlığı ekran seviyesinde detaylandırılmadığı için `SCR-060` minimal tutuldu; aktif içerik tiplerine göre alt ekranlar netleştirilmeli.
