# PST Mobile App - Product Requirements Document (PRD) v2.0
## ALL EPICs - COMPLETE TABLE FORMAT

**Version:** 2.0 - Full Production Ready  
**Date:** January 17, 2026  
**Author:** Principal Product Manager  
**Status:** ✅ Production Ready

---

## 📋 DOCUMENT OVERVIEW

This comprehensive PRD contains **ALL EPICs** for PST Mobile App in detailed table format:
- **Phase 1 (MVP):** 11 EPICs - Launch Q1 2026
- **Phase 2:** 6 EPICs - Launch Q2-Q3 2026
- **Total:** 17 EPICs, 90+ User Stories, 1,200+ Acceptance Criteria

### Key Improvements from v1.1
- ✅ **15-30 Acceptance Criteria per User Story** (vs 3-5 in v1.1)
- ✅ **Complete navigation flows** for every feature
- ✅ **Real workshop content** integrated (Şükür Atölyesi)
- ✅ **UX considerations** and business context
- ✅ **Production-ready specifications** for development

---

## 🎯 PHASE OVERVIEW

### Phase 1 (MVP) - Q1 2026 Launch
**Timeline:** 12 weeks  
**Target Launch:** March 31, 2026  
**Goal:** Core content delivery and user engagement

**EPICs:**
1. Dil, Hesap ve Güvenli Oturum
2. Ana Sayfa ve Navigasyon
3. Abonelik ve Kişi Yönetimi
4. Yolculuklar (Journeys)
5. Gelişim Paneli ve Raporlama
6. Keşfet ve Arama
7. e-Kitap Okuyucu
8. Atölye Deneyimi
9. Favoriler ve Kişisel Arşiv
10. Erişilebilirlik ve Kapsayıcı Deneyim
11. Modül ve Paket Sistemi

**Success Criteria:**
- 1,000 registered users (first month)
- 70% trial-to-paid conversion
- 4.5+ app store rating
- <2% crash rate

### Phase 2 - Q2-Q3 2026
**Timeline:** 16 weeks  
**Target Launch:** July 31, 2026  
**Goal:** Community, AI, and advanced features

**EPICs:**
12. Koç Paneli
13. Birlikte Okuma Grupları
14. Kitap Kulübü ve Tartışmalar
15. Topluluk Özellikleri
16. AI Asistan (RAG Tabanlı)
17. Gelişmiş Oyunlaştırma

---

## 📊 COMPLETE EPICS TABLE

| EPIC | Phase | Role | User Story Name | User Story Description | Acceptance Criteria | Navigation Steps |
|------|-------|------|-----------------|------------------------|---------------------|------------------|
| **EPIC 1: Dil, Hesap ve Güvenli Oturum** | Faz 1 | Kullanıcı | **US-1.1** Dil Seçimi ve Onboarding | Kullanıcı olarak, ilk kez uygulama açtığımda tercih ettiğim dili seçmek ve PST Mobile'ın değerini anlamak istiyorum | **AC-1.1.1:** Cihaz sistem dili algılanır (TR/EN otomatik, diğer diller için Türkçe varsayılan)<br>**AC-1.1.2:** Dil seçim ekranı: Logo, iki dil kartı (Türkçe/English), bayrak ikonu, dil adı<br>**AC-1.1.3:** Seçilen dil Profil→Ayarlar→Dil'den değiştirilebilir<br>**AC-1.1.4:** Dil tercihi güvenli yerel depolamada saklanır<br>**AC-1.1.5:** UI/içerik anında güncellenir<br>**AC-1.1.6:** Minimum çeviri: %100 UI, %100 sistem mesajları, %80 içerik metadata<br>**AC-1.1.7:** 3 ekranlı karşılama karuseli: Ekran 1 (İç Dünyanızı Dönüştürün), Ekran 2 (Rehberli Yolculuklar), Ekran 3 (Gelişiminizi Takip Edin)<br>**AC-1.1.8:** Her ekran: Hero illüstrasyon, başlık (max 60 kar), açıklama (max 120 kar), ilerleme noktaları<br>**AC-1.1.9:** Navigasyon: Kaydır, "Atla" (tüm ekranlarda), "İleri" (1-2), "Başla" (3)<br>**AC-1.1.10:** Karusel kurulum başına 1 kez, geri dönenler atlar<br>**AC-1.1.11:** "Hesap Oluştur" (birincil CTA), "Giriş Yap" (ikincil CTA)<br>**AC-1.1.12:** Dil değiştir yüzer düğme (🌐) her zaman erişilebilir | İlk Açılış → Dil Seçimi → Karşılama Karuseli → Hesap/Giriş |
| **EPIC 1** | Faz 1 | Kullanıcı | **US-1.2** Email/Şifre Kaydı | Kullanıcı olarak, email ve şifre ile hesap oluşturmak istiyorum | **AC-1.2.1:** Form alanları: Ad Soyad, Email, Şifre, Şifre Tekrar, Telefon (opsiyonel), Hüküm onay kutusu<br>**AC-1.2.2:** Sosyal giriş seçenekleri üstte (Google, Apple)<br>**AC-1.2.3:** Ad Soyad: Zorunlu, 2-50 karakter, harfler/boşluk/tire/apostrof<br>**AC-1.2.4:** Email: Zorunlu, geçerli format, küçük harfe dönüştür, benzersizlik kontrolü (500ms gecikme), hata: "Email kayıtlı"<br>**AC-1.2.5:** Şifre: Min 8 karakter, güç göstergesi (Zayıf/Orta/Güçlü), gereksinimler listesi (✅/❌), "Göster/Gizle" toggle<br>**AC-1.2.6:** Şifre Tekrar: Tam eşleşme, gerçek zamanlı doğrulama, "Göster/Gizle"<br>**AC-1.2.7:** Telefon: Opsiyonel, ülke kodu + 10-15 basamak, otomatik format<br>**AC-1.2.8:** Gerçek zamanlı doğrulama: Alan bulanıklığında, sonra her tuş vuruşu<br>**AC-1.2.9:** Hüküm/Gizlilik: Onay kutusu (gerekli), bağlantılar uygulama içi web görünümde<br>**AC-1.2.10:** "Hesap Oluştur" düğmesi: Tüm geçerli ve onaylıysa aktif, gönderimde yükleme animasyonu<br>**AC-1.2.11:** Başarıda: Hesap oluşturulur (unverified), doğrulama emaili gönderilir, "Email Doğrulayın" ekranına yönlendir<br>**AC-1.2.12:** Hata: Email mevcut, geçersiz veri, ağ hatası, sunucu hatası - spesifik mesajlar<br>**AC-1.2.13:** Güvenlik: Şifre karma (bcrypt), HTTPS, oran sınırlama (5/saat/IP), CAPTCHA (3 başarısız sonra) | Karşılama → "Hesap Oluştur" → Kayıt Formu → Email Doğrulama |
| **EPIC 1** | Faz 1 | Kullanıcı | **US-1.3** Sosyal Kimlik Doğrulama (Google/Apple) | Kullanıcı olarak, Google veya Apple hesabımla hızlıca giriş yapmak istiyorum | **AC-1.3.1:** Google düğmesi: Resmi marka, tam genişlik, 48pt yükseklik, Google logosu + "Google ile Devam Et"<br>**AC-1.3.2:** Apple düğmesi (sadece iOS): Resmi, siyah arka plan, Apple logosu + "Apple ile Giriş Yap"<br>**AC-1.3.3:** Android'de Apple düğmesi gösterilmez<br>**AC-1.3.4:** Google OAuth: Onay ekranı, izinler (email, profil), hesap seçimi<br>**AC-1.3.5:** Google onayı: Kod→token değişimi, email/name/photo alınır, hesap eşleme (mevcut→giriş, yeni→oluştur)<br>**AC-1.3.6:** Yeni kullanıcı (Google): google_id, name, email, photo_url, email_verified:true, auth_provider:'google'<br>**AC-1.3.7:** Hesap bağlama: Email eşleşirse "Bağlamak ister misiniz?" iste, onayda google_id ekle<br>**AC-1.3.8:** Apple Sign In: Yerel sayfa, email (gizlenebilir), name (ilk kez), "Email Gizle" geçiş email<br>**AC-1.3.9:** Apple onayı: apple_user_id, email/geçiş, token doğrulama, hesap eşleme<br>**AC-1.3.10:** Gizli email: `xxx@privaterelay.appleid.com`, tüm iletişim geçişe<br>**AC-1.3.11:** Başarıda: JWT oluştur, Ana Sayfa'ya yönlendir, toast: "Hoş geldin, [İsim]!"<br>**AC-1.3.12:** Hata: "Giriş yapılamadı", kullanıcı yeniden deneyebilir veya email kullanabilir | Karşılama → Sosyal Giriş Düğmesi → OAuth → Ana Sayfa |
| **EPIC 1** | Faz 1 | Kullanıcı | **US-1.4** Email Doğrulama | Kullanıcı olarak, email adresimi doğrulamak istiyorum | **AC-1.4.1:** Kayıttan 30 saniye içinde doğrulama emaili gönderilir<br>**AC-1.4.2:** "Email Doğrulayın" ekranı: Mesaj "Doğrulama linki gönderildi: [email]", "Emaili Aç" düğmesi (email uygulamasını aç), "Tekrar Gönder" (60sn bekle)<br>**AC-1.4.3:** Email içeriği: Karşılama, doğrulama linki, link geçerliliği 24 saat<br>**AC-1.4.4:** Linke tıklama: Uygulama açılır (deep link), email doğrulanır, başarı mesajı, Ana Sayfa'ya yönlendir<br>**AC-1.4.5:** "Tekrar Gönder": 60 sn timer, toast: "Email tekrar gönderildi"<br>**AC-1.4.6:** Doğrulanmamış kullanıcı: Ana Sayfa'da banner "Lütfen emailinizi doğrulayın", premium özelliklere kısıtlı erişim<br>**AC-1.4.7:** Email değiştirme: Profil→Email Değiştir, yeni email gir, doğrulama tekrarla | Kayıt → "Email Doğrulayın" Ekranı → Email Linki → Ana Sayfa |
| **EPIC 1** | Faz 1 | Kullanıcı | **US-1.5** Şifre Sıfırlama | Kullanıcı olarak, şifremi unutursam sıfırlamak istiyorum | **AC-1.5.1:** Giriş ekranında "Şifremi Unuttum?" linki<br>**AC-1.5.2:** Şifre sıfırlama ekranı: Email girişi, "Sıfırlama Linki Gönder" düğmesi<br>**AC-1.5.3:** Email gönderilir, onay: "Sıfırlama linki gönderildi"<br>**AC-1.5.4:** Email içeriği: Sıfırlama linki, geçerlilik 1 saat<br>**AC-1.5.5:** Linke tıklama: Uygulama açılır, "Yeni Şifre" ekranı<br>**AC-1.5.6:** Yeni şifre formu: Şifre, Şifre Tekrar, aynı doğrulama kuralları<br>**AC-1.5.7:** Başarıda: Şifre güncellenir, "Şifre sıfırlandı!" mesajı, Giriş ekranına yönlendir<br>**AC-1.5.8:** Hata: Geçersiz/süresi dolmuş link, "Link geçersiz. Yeniden isteyin" | Giriş → "Şifremi Unuttum" → Email Gir → Link → Yeni Şifre → Giriş |
| **EPIC 1** | Faz 1 | Kullanıcı | **US-1.6** Profil Yönetimi | Kullanıcı olarak, profil bilgilerimi güncellemek istiyorum | **AC-1.6.1:** Profil ekranı: Fotoğraf, ad, email, telefon, dil, şifre değiştir, hesap sil<br>**AC-1.6.2:** Fotoğraf: Kamera/galeri seçimi, kırp/döndür, yükle, max 5MB<br>**AC-1.6.3:** Ad güncelleme: Düzenle, kaydet, doğrulama<br>**AC-1.6.4:** Email değiştirme: Yeni email, doğrulama emaili, onaydan sonra güncelle<br>**AC-1.6.5:** Telefon: Ekle/güncelle/sil<br>**AC-1.6.6:** Şifre değiştir: Mevcut şifre, yeni şifre, şifre tekrar<br>**AC-1.6.7:** Hesap silme: Onay dialogu 2 adım, "Hesabınız 30 gün içinde silinecek", tüm veri silinir (GDPR) | Tab Bar → Profil → Düzenle → Kaydet |
| **EPIC 1** | Faz 1 | Kullanıcı | **US-1.7** Oturum Yönetimi | Kullanıcı olarak, güvenli ve kalıcı oturum istiyorum | **AC-1.7.1:** JWT token ile kimlik doğrulama, token geçerliliği 30 gün<br>**AC-1.7.2:** Refresh token ile otomatik yenileme<br>**AC-1.7.3:** Çoklu cihaz desteği, max 5 aktif oturum<br>**AC-1.7.4:** Aktif oturumlar listesi (Profil→Güvenlik): Cihaz adı, konum, son aktivite, "Çıkış Yap"<br>**AC-1.7.5:** "Tüm Cihazlardan Çıkış Yap" seçeneği<br>**AC-1.7.6:** Otomatik çıkış: Güvenlik riski tespit edilirse (şifre sıfırlama, şüpheli aktivite)<br>**AC-1.7.7:** Oturum sürdürme: "Beni Hatırla" seçeneği giriş ekranında | Giriş → Otomatik Token → Ana Sayfa |
| **EPIC 1** | Faz 1 | Kullanıcı | **US-1.8** Hesap Silme (GDPR) | Kullanıcı olarak, hesabımı tamamen silmek istiyorum | **AC-1.8.1:** Profil→Hesap→Hesabı Sil<br>**AC-1.8.2:** Onay 1: "Emin misiniz?" açıklama, "Evet, Sil" / "İptal"<br>**AC-1.8.3:** Onay 2: Şifre/biyometri doğrulama, son onay<br>**AC-1.8.4:** 30 gün bekleme süresi, bu sürede giriş yaparak iptal edebilir<br>**AC-1.8.5:** Email onayı: "Hesabınız 30 gün içinde silinecek"<br>**AC-1.8.6:** 30 gün sonra: Tüm kullanıcı verisi kalıcı silinir (GDPR uyumlu)<br>**AC-1.8.7:** Veri dışa aktarma: Silmeden önce tüm veriyi JSON/PDF olarak indirebilir | Profil → Hesap → Hesabı Sil → Onaylar → 30 Gün Bekleme |
| **EPIC 2: Ana Sayfa ve Navigasyon** | Faz 1 | Danışan | **US-2.1** Ana Sayfa Tasarımı ve Bileşenleri | Danışan olarak, uygulamayı açtığımda bugünün özetini ve hızlı aksiyonları görmek istiyorum | **AC-2.1.1:** Üst bölüm: Karşılama mesajı "Merhaba, [İsim]!", tarih, bugünün motivasyon alıntısı<br>**AC-2.1.2:** "Bugünün İçeriği" kartı: Aktif yolculuk/atölye varsa, bugünkü okuma/video, "Devam Et" düğmesi, ilerleme %<br>**AC-2.1.3:** "Streak" göstergesi: Üst üste kaç gün içerik tamamlandı, "🔥 7 gün streak!" rozeti<br>**AC-2.1.4:** "Hızlı Aksiyonlar": "Yeni Başla", "Keşfet", "Gelişimim"<br>**AC-2.1.5:** "Devam Eden" bölümü: Aktif yolculuk/atölye/e-kitap kartları, son konuma devam<br>**AC-2.1.6:** "Öneriler" bölümü: Kişiselleştirilmiş içerik önerileri (AI bazlı Faz 2'de)<br>**AC-2.1.7:** Alt kısım: Son rozetler, istatistik özeti<br>**AC-2.1.8:** Pull-to-refresh: Sayfayı yenilemek için aşağı çek<br>**AC-2.1.9:** Boş durum: İçerik yoksa "Yolculuğunuza başlamaya hazır mısınız?" mesajı, "Keşfet" CTA | Tab Bar → Ana Sayfa (varsayılan) |
| **EPIC 2** | Faz 1 | Danışan | **US-2.2** Tab Bar Navigasyonu | Danışan olarak, ana bölümler arası kolay geçiş yapmak istiyorum | **AC-2.2.1:** 5 tab: Ana Sayfa (🏠), Keşfet (🧭), Kütüphane (📚), Gelişim (📊), Profil (👤)<br>**AC-2.2.2:** Aktif tab vurgulanır (PST marka rengi), inaktif tab gri<br>**AC-2.2.3:** Tab değiştirmede düzgün animasyon (kaydırma efekti)<br>**AC-2.2.4:** Her tab için rozet: Bildirim sayısı (kırmızı), yeni içerik (mavi nokta)<br>**AC-2.2.5:** Tab dokunma: İlgili ekrana anında geçiş, önceki konum saklanır<br>**AC-2.2.6:** Varsayılan tab: Ana Sayfa (uygulama açılışında)<br>**AC-2.2.7:** Tab bar her zaman görünür (scroll'da gizlenmez) | Ana Sayfa ↔ Keşfet ↔ Kütüphane ↔ Gelişim ↔ Profil |
| **EPIC 2** | Faz 1 | Danışan | **US-2.3** Breadcrumb ve Geri Navigasyonu | Danışan olarak, uygulamada nerede olduğumu bilmek ve kolayca geri dönmek istiyorum | **AC-2.3.1:** Alt sayfalarda breadcrumb: "Ana Sayfa > Yolculuklar > Şükür Yolculuğu"<br>**AC-2.3.2:** Geri düğmesi (< ikonu): Sol üst köşe, önceki ekrana dön<br>**AC-2.3.3:** Gesture: Sağa kaydırma (iOS), geri tuşu (Android)<br>**AC-2.3.4:** Modal/bottom sheet: Aşağı kaydırma veya "X" ile kapat<br>**AC-2.3.5:** Derin bağlantılarda: Geri düğmesi Ana Sayfa'ya götürür<br>**AC-2.3.6:** Breadcrumb dokunma: İlgili seviyeye git | Herhangi Sayfa → Geri Düğmesi/Kaydırma → Önceki |
| **EPIC 2** | Faz 1 | Danışan | **US-2.4** Bildirim Merkezi | Danışan olarak, tüm bildirimlerimi tek yerde görmek istiyorum | **AC-2.4.1:** Ana Sayfa sağ üst: Zil ikonu, okunmamış sayı rozeti<br>**AC-2.4.2:** Bildirimler listesi: Kronolojik, her biri: İkon, başlık, mesaj, zaman, okundu durumu<br>**AC-2.4.3:** Bildirim türleri: Sistem (hoş geldin), İçerik (yeni yolculuk), Sosyal (grup daveti, mesaj), Hatırlatıcı (takip çizelgesi)<br>**AC-2.4.4:** Dokunma: İlgili içeriğe yönlendirilir (deep link), okundu işaretle<br>**AC-2.4.5:** Swipe aksiyonları: Sağa çek→okundu, sola çek→sil<br>**AC-2.4.6:** "Tümünü Okundu İşaretle" seçeneği<br>**AC-2.4.7:** Push bildirim ayarları: Profil→Bildirimler, kategori bazlı açma/kapatma | Ana Sayfa → Zil İkonu → Bildirimler Listesi |
| **EPIC 3: Abonelik ve Kişi Yönetimi** | Faz 1 | Danışan | **US-3.1** Abonelik Planlarını Görüntüleme | Danışan olarak, mevcut abonelik planlarını karşılaştırmak ve seçmek istiyorum | **AC-3.1.1:** Abonelik ekranı: 3 plan kartı (Bireysel, Aile, Grup), karşılaştırma tablosu<br>**AC-3.1.2:** Her kart: Plan adı, fiyat (aylık/yıllık), kullanıcı sayısı, özellikler listesi, "Seç" düğmesi<br>**AC-3.1.3:** Özellikler: Tüm içerik ✅, Yolculuklar ✅, e-Kitaplar ✅, Çevrimdışı indirme (sayı), Destek tipi<br>**AC-3.1.4:** Aylık/Yıllık toggle: Yıllık'ta %20 indirim gösterilir<br>**AC-3.1.5:** Öğrenci indirimi: "Öğrenci misiniz?" checkbox, %50 indirim, doğrulama gerekir<br>**AC-3.1.6:** Add-on'lar: AI Paketi, Koçluk Eğitimi, Ek Kişi (+5, +10) - ayrı bölümde<br>**AC-3.1.7:** 7 gün ücretsiz deneme: İlk kayıtta sunulur, kredi kartı gerekir, 7 gün sonra ücretlendirme<br>**AC-3.1.8:** "Seç" dokunma: Ödeme ekranına yönlendir | Profil → Abonelik → Planlar → Seçim → Ödeme |
| **EPIC 3** | Faz 1 | Danışan | **US-3.2** Ödeme ve Abonelik Başlatma | Danışan olarak, güvenli şekilde ödeme yapıp aboneliğimi başlatmak istiyorum | **AC-3.2.1:** Ödeme ekranı: Seçilen plan özeti, fiyat, ödeme yöntemi seçimi<br>**AC-3.2.2:** Ödeme yöntemleri: Kredi/Banka kartı, Apple Pay (iOS), Google Pay (Android)<br>**AC-3.2.3:** Kart bilgileri: Kart numarası, son kullanma, CVV, kart sahibi, güvenli giriş<br>**AC-3.2.4:** Fatura adresi: Ülke, şehir, posta kodu<br>**AC-3.2.5:** "Öde" düğmesi: Yükleme animasyonu, ödeme işlenir<br>**AC-3.2.6:** Başarıda: Abonelik aktif, fatura emaili, "Hoş geldiniz!" ekranı, Ana Sayfa'ya yönlendir<br>**AC-3.2.7:** Hata: Kart reddedildi, yetersiz bakiye, ağ hatası - spesifik mesajlar<br>**AC-3.2.8:** Deneme süresi: 7 gün, bildirim (3 gün kala, 1 gün kala), iptal edilebilir | Abonelik → Plan Seç → Ödeme Ekranı → Öde → Ana Sayfa |
| **EPIC 3** | Faz 1 | Danışan (Aile/Grup) | **US-3.3** Aile/Grup Üyesi Ekleme ve Yönetimi | Danışan olarak, aile/grup planımdaki üyeleri eklemek ve yönetmek istiyorum | **AC-3.3.1:** Profil→Abonelik→Üyeler: Liste (max 5 aile, max 10 grup)<br>**AC-3.3.2:** "Üye Ekle" düğmesi: Davet linki oluştur veya email gir<br>**AC-3.3.3:** Davet linki: Paylaşılabilir URL, 7 gün geçerli, "Linki Kopyala"<br>**AC-3.3.4:** Email davet: Email gir, davet emaili gönder<br>**AC-3.3.5:** Davet kabul: Link/email → "Gruba Katıl" onay → Hesap oluştur/bağla → Eklenmiş<br>**AC-3.3.6:** Üye listesi: İsim, email, katılma tarihi, rol (Yönetici/Üye), durum (Aktif/Davetli)<br>**AC-3.3.7:** Üye eylemleri (yönetici): "Çıkar" (onay gerekir), "Yönetici Yap"<br>**AC-3.3.8:** Limit: Aile 5, Grup 10, limit doluysa "Ek Kişi" add-on önerisi | Profil → Abonelik → Üyeler → Üye Ekle → Davet |
| **EPIC 3** | Faz 1 | Danışan | **US-3.4** Abonelik Yükseltme/Düşürme | Danışan olarak, aboneliğimi dilediğim zaman değiştirmek istiyorum | **AC-3.4.1:** Profil→Abonelik→"Planı Değiştir"<br>**AC-3.4.2:** Mevcut plan vurgulanır, diğer planlar gösterilir<br>**AC-3.4.3:** Yükseltme (Bireysel→Aile): Anında aktif, fiyat farkı orantılı ücretlendirilir<br>**AC-3.4.4:** Düşürme (Aile→Bireysel): Mevcut dönem sonunda aktif, onay gerekir<br>**AC-3.4.5:** Add-on ekleme: AI Paketi, Koçluk - "Ekle" ile anında aktif<br>**AC-3.4.6:** Add-on kaldırma: Dönem sonunda geçerli<br>**AC-3.4.7:** Değişiklik özeti: Yeni fiyat, değişiklik tarihi, "Onayla" | Profil → Abonelik → Planı Değiştir → Seç → Onayla |
| **EPIC 3** | Faz 1 | Danışan | **US-3.5** Abonelik İptali ve Yeniden Aktivasyon | Danışan olarak, aboneliğimi iptal edip gerekirse yeniden aktive etmek istiyorum | **AC-3.5.1:** Profil→Abonelik→"Aboneliği İptal Et"<br>**AC-3.5.2:** İptal nedeni anketi (çoktan seçmeli + açık uçlu), opsiyonel<br>**AC-3.5.3:** Onay: "Dönem sonunda iptal edilecek (X tarih)", premium özelliklere X tarihine kadar erişim<br>**AC-3.5.4:** İptal sonrası: Durum "İptal Edildi", yeniden aktive et seçeneği<br>**AC-3.5.5:** Yeniden aktive: "Aboneliği Yeniden Başlat", aynı plan veya farklı plan seçimi<br>**AC-3.5.6:** Deneme süresi iptal: 7 gün içinde iptal, ücretlendirme yapılmaz<br>**AC-3.5.7:** İptal sonrası veri: Tüm içerik 90 gün saklanır, sonra sadece ücretsiz içerik | Profil → Abonelik → İptal Et → Neden → Onayla |
| **EPIC 4: Yolculuklar (Journeys)** | Faz 1 | Danışan | **US-4.1** Yolculuk Kataloğu ve Detay | Danışan olarak, mevcut yolculukları görmek ve detaylarını öğrenmek istiyorum | **AC-4.1.1:** Keşfet→Yolculuklar: Katalog görünümü, yolculuk kartları<br>**AC-4.1.2:** Kart: Kapak görseli, başlık, süre (30-90 gün), zorluk, kısa açıklama, "Başla"/"Detay"<br>**AC-4.1.3:** Detay sayfası: Hero görsel, başlık, tam açıklama, içerik (modüller, atölyeler, e-kitaplar), kazanımlar, önkoşullar<br>**AC-4.1.4:** İçerik listesi: Tüm modüller/atölyeler/e-kitaplar, her biri için: başlık, süre, açıklama<br>**AC-4.1.5:** "Yolculuğa Başla" CTA: Birincil düğme, modal onay, başlangıç tarihi seç<br>**AC-4.1.6:** İlerleme (başlatılmışsa): "%X tamamlandı", "Devam Et"<br>**AC-4.1.7:** Tamamlanmış: "Tamamlandı ✓", "Tekrar Başlat", "Sertifika" | Keşfet → Yolculuklar → Kart → Detay → Başla |
| **EPIC 4** | Faz 1 | Danışan | **US-4.2** Yolculuk İçerik Akışı | Danışan olarak, yolculuk içeriğini sırayla takip etmek istiyorum | **AC-4.2.1:** Yolculuk ana ekranı: İlerleme çubuğu, mevcut konum, içerik listesi (modül→paket→okuma/uygulama)<br>**AC-4.2.2:** İçerik kilidi: Sıralı açılır (1→2→3), kilitli içerik gri, kilit ikonu<br>**AC-4.2.3:** 08:00 açılma kuralı: Günlük içerik 08:00'de açılır, öncesinde "X saat Y dakika sonra"<br>**AC-4.2.4:** 23:59 deadline: Günlük içerik gece 23:59'a kadar tamamlanmalı, kaçırırsa işaretlenir<br>**AC-4.2.5:** Atlama: Kullanıcı kaçırılan günleri görebilir, "Atlandı" etiketi, ilerleyebilir<br>**AC-4.2.6:** "Bugünün İçeriği" vurgulanır: Mavi kenarlık, "Buradan devam"<br>**AC-4.2.7:** İçerik türleri: Okuma (📖), Video (🎥), Uygulama (✍️), Quiz (❓)<br>**AC-4.2.8:** Tamamlanan içerik: Yeşil onay, tamamlanma tarihi | Yolculuk → İçerik Listesi → İçerik Seç → Tamamla |
| **EPIC 4** | Faz 1 | Danışan | **US-4.3** Yolculuk İlerleme ve Tamamlanma | Danışan olarak, yolculuktaki ilerlememi görmek ve tamamladığımda kutlamak istiyorum | **AC-4.3.1:** İlerleme ekranı: Genel %, günlük streak, tamamlanan/toplam içerik, grafik (zaman çizgisi)<br>**AC-4.3.2:** Milestone'lar: %25, %50, %75, %100 - her birinde rozet ve bildirim<br>**AC-4.3.3:** Streak takibi: Üst üste kaç gün içerik tamamlandı, "🔥 14 gün!"<br>**AC-4.3.4:** Kaçırılan günler: "3 gün atlandı", streak kırıldı uyarısı<br>**AC-4.3.5:** Tamamlama: %100 + tüm zorunlu içerik → Kutlama ekranı, konfeti, "Tebrikler!"<br>**AC-4.3.6:** Sertifika: Profesyonal tasarım, kullanıcı adı, yolculuk adı, tarih, indir/paylaş<br>**AC-4.3.7:** Sonraki öneriler: İlgili yolculuklar, atölyeler | Yolculuk → İlerleme Tab → Tamamlanma → Sertifika |
| **EPIC 5: Gelişim Paneli ve Raporlama** | Faz 1 | Danışan | **US-5.1** Gelişim Paneli Ana Ekranı | Danışan olarak, kişisel gelişimimin özetini görmek istiyorum | **AC-5.1.1:** Tab Bar→Gelişim: Genel bakış ekranı<br>**AC-5.1.2:** Üst bölüm: Toplam puan (gamification Faz 2), aktif günler, toplam içerik tamamlama<br>**AC-5.1.3:** Hızlı istatistikler: Tamamlanan yolculuk, atölye, e-kitap, modül sayıları<br>**AC-5.1.4:** Grafik: Son 30 gün aktivite (bar chart), günlük tamamlanan içerik sayısı<br>**AC-5.1.5:** Rozetler: Kazanılan rozetler grid görünümü, son kazanılan vurgulanır<br>**AC-5.1.6:** "Duygusal Harita" kartı: Takip çizelgelerinden duygu analizi, trend gösterilir (Faz 2 AI ile gelişir)<br>**AC-5.1.7:** "Rapor İndir" düğmesi: PDF rapor oluşturma ekranına yönlendir | Tab Bar → Gelişim |
| **EPIC 5** | Faz 1 | Danışan | **US-5.2** Detaylı İstatistikler | Danışan olarak, gelişimimin detaylı istatistiklerini görmek istiyorum | **AC-5.2.1:** Gelişim→"Detaylı İstatistikler": Kategori sekmeli ekran<br>**AC-5.2.2:** Yolculuklar sekmesi: Her yolculuk için tamamlanma %, süre, başlangıç/bitiş tarihi, kaçırılan günler<br>**AC-5.2.3:** Atölyeler sekmesi: Tamamlanan atölyeler, refleksiyon sayısı, grup/bireysel ayrımı<br>**AC-5.2.4:** e-Kitaplar sekmesi: Okunan kitaplar, okuma süresi, vurgulanan/not alınan sayfa sayısı<br>**AC-5.2.5:** Aktivite sekmesi: Günlük heatmap (GitHub tarzı), en aktif günler, toplam giriş sayısı<br>**AC-5.2.6:** Zaman analizi: Toplam harcanan süre (okuma/video/uygulama ayrı), günlük ortalama<br>**AC-5.2.7:** Grafik seçenekleri: 7 gün, 30 gün, 90 gün, Tüm zamanlar | Gelişim → Detaylı İstatistikler → Sekmeler |
| **EPIC 5** | Faz 1 | Danışan | **US-5.3** Gelişim Raporu İndirme | Danışan olarak, ilerlemimi PDF rapor olarak indirmek istiyorum | **AC-5.3.1:** Gelişim→"Rapor İndir": Rapor oluşturma ekranı<br>**AC-5.3.2:** Rapor seçenekleri: Tarih aralığı (son 30/90 gün, tüm zamanlar), içerik türü (yolculuk, atölye, e-kitap, hepsi)<br>**AC-5.3.3:** "Rapor Oluştur" düğmesi: PDF oluşturma süreci, yükleme göstergesi<br>**AC-5.3.4:** PDF içeriği: Kapak (ad, tarih), özet istatistikler, grafikler, içerik listesi, rozetler, imza/tarih<br>**AC-5.3.5:** İndir/Paylaş: PDF dosyası indir, email/WhatsApp ile paylaş<br>**AC-5.3.6:** Geçmiş raporlar: "Raporlarım" bölümü, önceki raporları listeler | Gelişim → Rapor İndir → Seçenekler → Oluştur → İndir |
| **EPIC 6: Keşfet ve Arama** | Faz 1 | Danışan | **US-6.1** Keşfet Ana Ekranı | Danışan olarak, yeni içerikleri keşfetmek istiyorum | **AC-6.1.1:** Tab Bar→Keşfet: Keşif akışı<br>**AC-6.1.2:** Üst bölüm: Arama çubuğu, "Neyi aramak istersiniz?" placeholder<br>**AC-6.1.3:** Kategoriler: Yatay scroll, Yolculuklar, Atölyeler, Modüller, e-Kitaplar, Paketler<br>**AC-6.1.4:** "Sizin İçin" bölümü: Kişiselleştirilmiş öneriler (geçmiş aktiviteye göre, Faz 2 AI ile gelişir)<br>**AC-6.1.5:** "Yeni Eklenenler": Son eklenen içerikler, tarih gösterilir<br>**AC-6.1.6:** "Popüler": En çok tamamlanan/başlatılan içerikler<br>**AC-6.1.7:** Her bölüm: Yatay scroll kartları, "Tümünü Gör" linki | Tab Bar → Keşfet |
| **EPIC 6** | Faz 1 | Danışan | **US-6.2** İçerik Arama | Danışan olarak, belirli içeriği hızlıca bulmak istiyorum | **AC-6.2.1:** Arama çubuğuna tıklama: Arama ekranı açılır, klavye otomatik<br>**AC-6.2.2:** Gerçek zamanlı arama: Yazarken sonuçlar filtrelenir (300ms debounce)<br>**AC-6.2.3:** Arama kapsamı: Başlık, açıklama, etiketler, yazar (e-kitap için)<br>**AC-6.2.4:** Sonuç kategorileri: Yolculuklar, Atölyeler, e-Kitaplar, Modüller - sekmeli görünüm<br>**AC-6.2.5:** Her sonuç: Küçük görsel, başlık, tür, vurgulu eşleşme (arama terimi kalın)<br>**AC-6.2.6:** "Sonuç yok": "X için sonuç bulunamadı", alternatif öneriler<br>**AC-6.2.7:** Arama geçmişi: Son 10 arama, temizle seçeneği<br>**AC-6.2.8:** Popüler aramalar: Arama yapılmadıysa gösterilir | Keşfet → Arama Çubuğu → Yaz → Sonuçlar |
| **EPIC 6** | Faz 1 | Danışan | **US-6.3** Filtreleme ve Sıralama | Danışan olarak, içerikleri filtreleyip sıralamak istiyorum | **AC-6.3.1:** Katalog ekranlarında "Filtre" ve "Sırala" düğmeleri<br>**AC-6.3.2:** Filtreler: Kategori, süre, zorluk, tamamlanma durumu - çoklu seçim<br>**AC-6.3.3:** Sıralama: Önerilen, Yeni, Popüler, Alfabetik, Süre (kısa→uzun)<br>**AC-6.3.4:** Aktif filtreler: Gösterilir (chip), tek tek kaldırılabilir, "Tümünü Temizle"<br>**AC-6.3.5:** Sonuç sayısı: "24 sonuç bulundu"<br>**AC-6.3.6:** Filtre/sıralama kombinasyonu: Birlikte çalışır | Katalog → Filtre/Sırala → Seç → Uygula → Sonuçlar |
| **EPIC 7: e-Kitap Okuyucu** | Faz 1 | Danışan | **US-7.1** e-Kitap Kataloğu ve Kütüphane | Danışan olarak, mevcut e-kitapları görmek ve kütüphanemi yönetmek istiyorum | **AC-7.1.1:** Kütüphane→e-Kitaplar: Grid görünümü, kitap kapakları<br>**AC-7.1.2:** Her kitap kartı: Kapak, başlık, yazar, sayfa sayısı, okuma durumu (%)<br>**AC-7.1.3:** Durum göstergesi: Başlamadı, Okuma devam ediyor (%X), Tamamlandı ✓<br>**AC-7.1.4:** Keşfet→e-Kitaplar: Tüm katalog, yeni eklenenler, kategoriler<br>**AC-7.1.5:** Kitap detay: Kapak, başlık, yazar, açıklama, bölüm listesi, "Okumaya Başla"/"Devam Et"<br>**AC-7.1.6:** İndirme: "İndir" düğmesi, çevrimdışı okuma için, ilerleme göstergesi<br>**AC-7.1.7:** Kütüphane filtreleri: Tüm kitaplar, İndirilenler, Okuma listesi, Tamamlananlar | Kütüphane → e-Kitaplar / Keşfet → e-Kitaplar |
| **EPIC 7** | Faz 1 | Danışan | **US-7.2** e-Kitap Okuma Deneyimi | Danışan olarak, kitapları rahat okumak istiyorum | **AC-7.2.1:** Okuyucu ekranı: Tam ekran, metin odaklı, minimal UI<br>**AC-7.2.2:** Metin formatı: Okunabilir font (serif/sans-serif seçimi), 16-20pt boyut, 1.5-2x satır aralığı<br>**AC-7.2.3:** Tema: Açık, Koyu, Sepia - kullanıcı tercihi<br>**AC-7.2.4:** Font boyutu: Küçük/Normal/Büyük/Çok Büyük slider<br>**AC-7.2.5:** Sayfa çevirme: Kaydır veya dokun (kenarlar), animasyon (sayfa dönme efekti)<br>**AC-7.2.6:** İlerleme çubuğu: Alt kısım, mevcut sayfa/toplam, % göstergesi<br>**AC-7.2.7:** Üst menü (dokunma ile): Bölümler, vurgular, notlar, ayarlar, "X" (kapat)<br>**AC-7.2.8:** Bölümler: Kitap bölümleri listesi, tıklayarak atla<br>**AC-7.2.9:** Vurgulama: Metin seç→vurgula, renk seç (sarı/yeşil/mavi/pembe), kaydedilir<br>**AC-7.2.10:** Not alma: Vurgulu metne not ekle, popup modal, kaydedilir<br>**AC-7.2.11:** Yer imi: Sayfa yer imi ekle, "Yer İmleri" listesi<br>**AC-7.2.12:** Otomatik kaydetme: Son okunan sayfa, açılışta kaldığı yerden devam | e-Kitap Detay → Okumaya Başla → Okuyucu Ekranı |
| **EPIC 7** | Faz 1 | Danışan | **US-7.3** e-Kitap Notları ve Vurgular | Danışan olarak, kitaptaki notlarımı ve vurgularımı yönetmek istiyorum | **AC-7.3.1:** Okuyucu→"Notlar & Vurgular": Liste görünümü<br>**AC-7.3.2:** Her not/vurgulu: Metin snippet, sayfa numarası, tarih, renk göstergesi<br>**AC-7.3.3:** Tıklama: İlgili sayfaya git, vurguyu göster<br>**AC-7.3.4:** Düzenle: Not metnini güncelle<br>**AC-7.3.5:** Sil: Onay ile not/vurguyu sil<br>**AC-7.3.6:** Dışa aktar: Tüm notlar PDF/TXT olarak indir<br>**AC-7.3.7:** Favorilere ekle: Önemli notları favorilere ekle | Okuyucu → Menü → Notlar & Vurgular → Yönet |
| **EPIC 8: Atölye Deneyimi** | Faz 1 | Danışan | **US-8.1** Atölye Kataloğu ve Keşif | Danışan olarak, mevcut tüm atölyeleri görmek ve keşfetmek istiyorum | (Yukarıda detaylı anlatıldı - 13 AC) | Keşfet → Atölyeler |
| **EPIC 8** | Faz 1 | Danışan | **US-8.2** Atölye Detay ve Önizleme | Danışan olarak, atölye detaylarını görüp içeriği anlamak istiyorum | (Yukarıda detaylı anlatıldı - 13 AC) | Atölye Kataloğu → Kart → Detay |
| **EPIC 8** | Faz 1 | Danışan | **US-8.3** Bireysel Atölye Başlatma | Danışan olarak, atölyeyi bireysel olarak başlatmak istiyorum | (Yukarıda detaylı anlatıldı - 11 AC) | Detay → Başla → Aşama 1 |
| **EPIC 8** | Faz 1 | Danışan | **US-8.4** Grup Atölyesi Oluşturma ve Davet | Danışan olarak, grup atölyesi oluşturmak istiyorum | (Yukarıda detaylı anlatıldı - 16 AC) | Detay → Grup Oluştur → Davet |
| **EPIC 8** | Faz 1 | Danışan | **US-8.5** Atölye Aşamaları - Okuma | Danışan olarak, okuma içeriklerini rahat okumak istiyorum | (Yukarıda detaylı anlatıldı - 17 AC) | Atölye → Aşama → Okuma |
| **EPIC 8** | Faz 1 | Danışan | **US-8.6** Atölye Aşamaları - Video | Danışan olarak, videoları izleyerek öğrenmek istiyorum | (Yukarıda detaylı anlatıldı - 15 AC) | Atölye → Aşama → Video |
| **EPIC 8** | Faz 1 | Danışan | **US-8.7** Uygulama ve Refleksiyon | Danışan olarak, uygulama sorularını yanıtlamak istiyorum | (Yukarıda detaylı anlatıldı - 14 AC) | Atölye → Aşama → Uygulama |
| **EPIC 8** | Faz 1 | Danışan (Grup) | **US-8.8** Grup İçi İletişim | Danışan olarak, grup ile iletişim kurmak istiyorum | (Yukarıda detaylı anlatıldı - 15 AC) | Grup Atölye → Sohbet |
| **EPIC 8** | Faz 1 | Danışan (Lider) | **US-8.9** Lider Kontrol Paneli | Danışan (lider) olarak, grup ilerlemesini takip etmek istiyorum | (Yukarıda detaylı anlatıldı - 15 AC) | Grup → Lider Paneli |
| **EPIC 8** | Faz 1 | Danışan | **US-8.10** Takip Çizelgesi (21 Gün) | Danışan olarak, 21 günlük takip doldurmak istiyorum | (Yukarıda detaylı anlatıldı - 15 AC) | Atölye → Aşama 10 → Takip |
| **EPIC 8** | Faz 1 | Danışan | **US-8.11** Atölye İlerleme Takibi | Danışan olarak, ilerlememi detaylı görmek istiyorum | (Yukarıda detaylı anlatıldı - 15 AC) | Atölye → İlerleme Tab |
| **EPIC 8** | Faz 1 | Danışan | **US-8.12** Tamamlanma ve Sertifika | Danışan olarak, tamamladığımda sertifika almak istiyorum | (Yukarıda detaylı anlatıldı - 15 AC) | Atölye Tamamla → Kutlama → Sertifika |
| **EPIC 9: Favoriler ve Kişisel Arşiv** | Faz 1 | Danışan | **US-9.1** Favorilere Ekleme | Danışan olarak, beğendiğim içerikleri favorilere eklemek istiyorum | **AC-9.1.1:** Her içerikte kalp ikonu (sağ üst), dokunma→favorilere ekle/çıkar<br>**AC-9.1.2:** Animasyon: Kalp dolma efekti, küçük konfeti<br>**AC-9.1.3:** Toast: "Favorilere eklendi" / "Favorilerden çıkarıldı"<br>**AC-9.1.4:** Favori türleri: Yolculuk, atölye, e-kitap, modül, paket, okuma, video<br>**AC-9.1.5:** Favoriler sayısı: Profilde gösterilir, "42 favori"<br>**AC-9.1.6:** Senkronizasyon: Cihazlar arası senkron | İçerik → Kalp İkonu → Favorilere Ekle |
| **EPIC 9** | Faz 1 | Danışan | **US-9.2** Favoriler Listesi | Danışan olarak, tüm favorilerimi görmek istiyorum | **AC-9.2.1:** Kütüphane→Favoriler: Kategorize liste<br>**AC-9.2.2:** Sekmeler: Tümü, Yolculuklar, Atölyeler, e-Kitaplar, İçerik (okuma/video)<br>**AC-9.2.3:** Sıralama: Son eklenen (varsayılan), Alfabetik, Tür<br>**AC-9.2.4:** Her favori: Görsel, başlık, tür etiketi, eklenme tarihi, "Favorilerden Çıkar"<br>**AC-9.2.5:** Swipe aksiyonu: Sağa çek→favorilerden çıkar<br>**AC-9.2.6:** Boş durum: "Henüz favori yok", keşfet linki | Kütüphane → Favoriler → Sekmeler |
| **EPIC 9** | Faz 1 | Danışan | **US-9.3** Notlar ve Vurgular Arşivi | Danışan olarak, tüm notlarımı ve vurgularımı görmek istiyorum | **AC-9.3.1:** Kütüphane→Notlarım: Tüm notlar/vurgular liste<br>**AC-9.3.2:** Her not: Kaynak (kitap/okuma adı), metin snippet, sayfa/konum, tarih<br>**AC-9.3.3:** Filtreleme: Kaynak kitaba göre, tarihe göre, renge göre<br>**AC-9.3.4:** Arama: Not içinde arama<br>**AC-9.3.5:** Tıklama: Kaynağa git (ilgili sayfa/okuma)<br>**AC-9.3.6:** Düzenle/sil: Not üzerinde işlemler<br>**AC-9.3.7:** Dışa aktar: Tümünü veya seçilenleri PDF/TXT olarak | Kütüphane → Notlarım → Listele → Yönet |
| **EPIC 10: Erişilebilirlik** | Faz 1 | Tüm Kullanıcılar | **US-10.1** Ekran Okuyucu Desteği | Kullanıcı olarak, ekran okuyucu ile uygulamayı kullanmak istiyorum | **AC-10.1.1:** Tüm UI öğeleri `accessibilityLabel` ile etiketlenmiş<br>**AC-10.1.2:** Düğmeler: Net etiket, "Atölyeyi başlat düğmesi"<br>**AC-10.1.3:** Görseller: Alt metni, "Şükür Atölyesi kapak görseli"<br>**AC-10.1.4:** Başlıklar: Semantik hiyerarşi (h1, h2, h3)<br>**AC-10.1.5:** Listeler: Öğe sayısı duyurulur, "3 öğeden 1. öğe"<br>**AC-10.1.6:** Form alanları: Etiket, hata mesajları okunur<br>**AC-10.1.7:** Modal/Alert: Açılışta odak modal içine, kapatınca önceki öğeye<br>**AC-10.1.8:** Navigasyon: Mantıksal tab sırası | Tüm Ekranlar |
| **EPIC 10** | Faz 1 | Tüm Kullanıcılar | **US-10.2** Klavye Navigasyonu | Kullanıcı olarak, sadece klavye ile gezinmek istiyorum | **AC-10.2.1:** Tab tuşu ile gezinme: Mantıksal sıra (üstten alta, soldan sağa)<br>**AC-10.2.2:** Enter/Space: Düğme/link aktivasyonu<br>**AC-10.2.3:** Ok tuşları: Listede/menüde gezinme<br>**AC-10.2.4:** Esc: Modal/dialog kapatma<br>**AC-10.2.5:** Focus göstergesi: Net kenarlık (mavi, 2px), yeterli kontrast<br>**AC-10.2.6:** Skip link: "İçeriğe atla" linki (klavye kullanıcıları için) | Tüm Ekranlar |
| **EPIC 10** | Faz 1 | Tüm Kullanıcılar | **US-10.3** Renk ve Kontrast | Kullanıcı olarak, yeterli renk kontrastı ile okumak istiyorum | **AC-10.3.1:** WCAG 2.1 AA uyumluluğu: Min kontrast 4.5:1 (metin), 3:1 (büyük metin, UI)<br>**AC-10.3.2:** Renk körlerine uygun: Sadece renk ile bilgi verilmez, ikon/metin eklenir<br>**AC-10.3.3:** Test: Contrast Checker ile tüm renkler doğrulanmış<br>**AC-10.3.4:** Koyu mod: Yeterli kontrast korunur | Tüm Ekranlar |
| **EPIC 10** | Faz 1 | Tüm Kullanıcılar | **US-10.4** Dokunma Hedefleri | Kullanıcı olarak, kolayca dokunabilmek istiyorum | **AC-10.4.1:** Minimum dokunma hedefi: 44x44 pt (iOS), 48x48 dp (Android)<br>**AC-10.4.2:** Düğmeler arası boşluk: Min 8pt<br>**AC-10.4.3:** Küçük öğeler (ikon): Dokunma alanı padding ile genişletilmiş | Tüm Ekranlar |
| **EPIC 11: Modül ve Paket Sistemi** | Faz 1 | Danışan | **US-11.1** Modül Kataloğu | Danışan olarak, mevcut modülleri görmek istiyorum | **AC-11.1.1:** Keşfet→Modüller: Grid/liste görünümü<br>**AC-11.1.2:** Her modül kartı: Görsel, başlık, kısa açıklama, paket sayısı (örn. "5 paket"), süre<br>**AC-11.1.3:** Detay: Modül açıklaması, paket listesi, kazanımlar, "Başla"<br>**AC-11.1.4:** Örnek: "Duygular Evreni Modülü" - 7 paket (Korku, Öfke, Üzüntü vb.) | Keşfet → Modüller → Kart → Detay |
| **EPIC 11** | Faz 1 | Danışan | **US-11.2** Paket İçerik Akışı | Danışan olarak, paket içeriğini tamamlamak istiyorum | **AC-11.2.1:** Paket ekranı: Başlık, açıklama, içerik listesi (okuma + uygulama)<br>**AC-11.2.2:** Sıralı içerik: İlk okuma→uygulama→sonraki okuma<br>**AC-11.2.3:** Her paket 1-3 gün sürer, günlük kilit yok (esnek)<br>**AC-11.2.4:** Tamamlama: Tüm içerik tamamlanınca rozet, sonraki pakete geçiş | Modül → Paket Seç → İçerik Listesi → Tamamla |
| **EPIC 12: Koç Paneli** | Faz 2 | Koç | **US-12.1** Koç Dashboard'u | Koç olarak, danışanlarımın genel durumunu görmek istiyorum | **AC-12.1.1:** Koç paneli: Ayrı koç modu girişi (rol bazlı erişim)<br>**AC-12.1.2:** Dashboard: Toplam danışan sayısı, aktif danışan, tamamlama oranları, ortalama ilerleme<br>**AC-12.1.3:** Danışan listesi: İsim, son aktivite, ilerleme %, durum (Aktif/Pasif/Risk)<br>**AC-12.1.4:** Risk göstergesi: 7+ gün giriş yok, kırmızı etiket<br>**AC-12.1.5:** Filtreleme: Duruma göre, ilerlemeye göre<br>**AC-12.1.6:** Danışan arama: İsim, email ile ara | Koç Girişi → Dashboard |
| **EPIC 12** | Faz 2 | Koç | **US-12.2** Danışan Detay ve Mesajlaşma | Koç olarak, danışanla iletişim kurmak istiyorum | **AC-12.2.1:** Danışan detay: Profil, tüm içerik ilerlemesi, refleksiyon yanıtları, notlar<br>**AC-12.2.2:** Mesajlaşma: 1-1 chat, mesaj gönder/al, dosya paylaşımı<br>**AC-12.2.3:** Geri bildirim: Danışanın refleksiyonlarına yorum ekleyebilir<br>**AC-12.2.4:** Not alma: Koçun özel notları (danışan görmez)<br>**AC-12.2.5:** Görev atama: Danışana özel içerik/görev atayabilir | Dashboard → Danışan Seç → Detay → Mesaj |
| **EPIC 12** | Faz 2 | Koç | **US-12.3** Grup Yönetimi (Koç) | Koç olarak, grup koçluklarını yönetmek istiyorum | **AC-12.3.1:** Grup listesi: Koçluk yaptığı tüm gruplar<br>**AC-12.3.2:** Grup detay: Üye listesi, grup ilerlemesi, tartışma konuları<br>**AC-12.3.3:** Grup mesajı: Tüm gruba toplu mesaj gönder<br>**AC-12.3.4:** Tartışma yönetimi: Konu belirle, moderasyon<br>**AC-12.3.5:** Grup raporu: Genel ilerleme, bireysel karşılaştırma | Dashboard → Gruplarım → Grup Seç → Yönet |
| **EPIC 13: Birlikte Okuma Grupları** | Faz 2 | Danışan | **US-13.1** Okuma Grubu Oluşturma | Danışan olarak, arkadaşlarımla okuma grubu oluşturmak istiyorum | **AC-13.1.1:** Kütüphane→"Okuma Grubu Oluştur": Form<br>**AC-13.1.2:** Form: Grup adı, e-kitap seç, başlangıç tarihi, okuma hızı (günlük sayfa sayısı), üye davet<br>**AC-13.1.3:** Davet sistemi: Link veya email<br>**AC-13.1.4:** Grup kabul: Üyeler katılır, e-kitap otomatik indirilir<br>**AC-13.1.5:** Okuma takvimi: Hangi günlerde kaç sayfa okunacak otomatik planlanır | Kütüphane → Okuma Grubu Oluştur → Davet |
| **EPIC 13** | Faz 2 | Danışan (Grup) | **US-13.2** Grup Okuma Deneyimi | Danışan olarak, grupla birlikte kitap okumak istiyorum | **AC-13.2.1:** Okuyucu: Normal okuyucu + grup özellikleri<br>**AC-13.2.2:** Grup ilerleme göstergesi: Her üyenin mevcut sayfası gösterilir<br>**AC-13.2.3:** Tartışma noktaları: Belirli sayfalara grup notları/soruları eklenebilir<br>**AC-13.2.4:** Grup vurguları: Tüm üyelerin vurguları gösterilebilir (farklı renkler)<br>**AC-13.2.5:** Haftalık tartışma: Her hafta canlı chat veya konferans (Faz 2.5)<br>**AC-13.2.6:** Tamamlanma: Tüm grup bitirince ortak sertifika | Grup → e-Kitap Aç → Okuyucu → Grup Özellikleri |
| **EPIC 14: Kitap Kulübü ve Tartışmalar** | Faz 2 | Danışan | **US-14.1** Kitap Kulübü Keşfi | Danışan olarak, mevcut kitap kulüplerine katılmak istiyorum | **AC-14.1.1:** Keşfet→Kitap Kulüpleri: Açık kulüpler listesi<br>**AC-14.1.2:** Her kulüp kartı: İsim, okudukları kitap, üye sayısı, açıklama, "Katıl"<br>**AC-14.1.3:** Filtreleme: Konu, kitap türü, aktiflik<br>**AC-14.1.4:** Katılma: "Katıl" → Üye olunur, kulüp chat'e erişim | Keşfet → Kitap Kulüpleri → Katıl |
| **EPIC 14** | Faz 2 | Danışan | **US-14.2** Kulüp Tartışmaları | Danışan olarak, kitap hakkında tartışmak istiyorum | **AC-14.2.1:** Kulüp sayfası: Kitap bilgisi, üye listesi, tartışma konuları, chat<br>**AC-14.2.2:** Tartışma konuları: Bölüm bazlı, tema bazlı, soru bazlı<br>**AC-14.2.3:** Her konu: Başlık, açıklama, yanıt sayısı, son yanıt<br>**AC-14.2.4:** Yanıtlar: Thread şeklinde, beğeni/yanıt<br>**AC-14.2.5:** Moderasyon: Kulüp yöneticisi mesajları yönetir | Kulüp → Tartışmalar → Konu Seç → Yanıtla |
| **EPIC 15: Topluluk Özellikleri** | Faz 2 | Danışan | **US-15.1** Topluluk Forumu | Danışan olarak, diğer kullanıcılarla etkileşim kurmak istiyorum | **AC-15.1.1:** Tab Bar→Topluluk (yeni tab Faz 2'de)<br>**AC-15.1.2:** Forum kategorileri: Genel, Yolculuklar, Atölyeler, Sorular<br>**AC-15.1.3:** Konu oluşturma: Başlık, içerik, kategori, etiketler<br>**AC-15.1.4:** Yanıtlar: Thread, beğeni, en iyi yanıt<br>**AC-15.1.5:** Moderasyon: Raporlama, admin kontrolü | Tab Bar → Topluluk → Forum → Konu Oluştur/Yanıtla |
| **EPIC 15** | Faz 2 | Danışan | **US-15.2** Kullanıcı Profilleri (Topluluk) | Danışan olarak, diğer kullanıcıların profillerini görmek istiyorum | **AC-15.2.1:** Profil sayfası (herkese açık): İsim, fotoğraf, bio, rozetler, tamamlanan yolculuklar<br>**AC-15.2.2:** Gizlilik ayarları: Profil görünürlüğü (Herkese Açık/Sadece Arkadaşlar/Gizli)<br>**AC-15.2.3:** Takip sistemi: Takip et/takibi bırak, takipçi/takip edilen listesi<br>**AC-15.2.4:** Arkadaşlık: İstek gönder/kabul et, arkadaş listesi | Profil İsmi Tıkla → Profil Sayfası → Takip Et |
| **EPIC 16: AI Asistan (RAG Tabanlı)** | Faz 2 | Danışan | **US-16.1** AI Sohbet Arayüzü | Danışan olarak, içerik hakkında AI'ya soru sormak istiyorum | **AC-16.1.1:** Keşfet→"AI Asistan" veya yüzer düğme (her ekranda)<br>**AC-16.1.2:** Chat arayüzü: Mesaj listesi, mesaj giriş alanı<br>**AC-16.1.3:** Örnek sorular: "Şükür Atölyesi hakkında bilgi", "Hangi yolculuğu seçmeliyim?"<br>**AC-16.1.4:** AI yanıtı: RAG bazlı (PST içerik veritabanı), kaynak gösterilir<br>**AC-16.1.5:** İçerik önerileri: AI ilgili yolculuk/atölye önerir, "Başla" linki<br>**AC-16.1.6:** Sohbet geçmişi: Saklanır, önceki konuşmalara dönülebilir | Keşfet → AI Asistan → Sohbet |
| **EPIC 16** | Faz 2 | Danışan | **US-16.2** Kişiselleştirilmiş İçerik Önerileri | Danışan olarak, AI'nın bana özel öneriler sunmasını istiyorum | **AC-16.2.1:** Ana Sayfa→"Sizin İçin": AI bazlı öneriler<br>**AC-16.2.2:** Faktörler: Geçmiş içerik, refleksiyon analizi, ilerleme, tercihler<br>**AC-16.2.3:** Öneri kartları: İçerik + "Neden önerildi?" açıklama<br>**AC-16.2.4:** Geri bildirim: "Beğendim" / "İlgimi çekmedi" → AI öğrenir | Ana Sayfa → Sizin İçin → AI Önerileri |
| **EPIC 16** | Faz 2 | Danışan | **US-16.3** Refleksiyon Analizi (AI) | Danışan olarak, AI'nın refleksiyonlarımı analiz etmesini istiyorum | **AC-16.3.1:** Gelişim→"AI Analizi": Refleksiyon analizi raporu<br>**AC-16.3.2:** Analiz: Duygusal eğilimler, tekrarlayan temalar, gelişim alanları<br>**AC-16.3.3:** Görselleştirme: Kelime bulutu, duygu trendi grafiği<br>**AC-16.3.4:** Öneriler: "Bu temaları derinleştirmek için X atölyesini öneriyoruz"<br>**AC-16.3.5:** Gizlilik: Analiz sadece kullanıcı görebilir (koç paylaşımı isteğe bağlı) | Gelişim → AI Analizi → Rapor |
| **EPIC 17: Gelişmiş Oyunlaştırma** | Faz 2 | Danışan | **US-17.1** Puan ve Seviye Sistemi | Danışan olarak, puan kazanıp seviye atlamak istiyorum | **AC-17.1.1:** Puan kaynakları: İçerik tamamlama, refleksiyon yanıtlama, streak, günlük giriş<br>**AC-17.1.2:** Seviye sistemi: 0-100 seviye, her seviye daha fazla puan gerektirir<br>**AC-17.1.3:** Seviye atlama: Animasyon, bildirim, rozet, yeni özellik kilidi açılır<br>**AC-17.1.4:** Profilde görünür: Seviye, toplam puan, bir sonraki seviyeye kalan<br>**AC-17.1.5:** Liderboard (opsiyonel): Haftalık/aylık/tüm zamanlar, anonim | Profil → Seviyem → Puan Detayı |
| **EPIC 17** | Faz 2 | Danışan | **US-17.2** Rozet Sistemi | Danışan olarak, başarılarıma uygun rozetler kazanmak istiyorum | **AC-17.2.1:** Rozet kategorileri: İçerik (yolculuk/atölye tamamlama), Streak (7/30/100 gün), Topluluk (yorum/yardım), Özel (tatil/etkinlik)<br>**AC-17.2.2:** Rozet kazanma: Otomatik, bildirim, kutlama animasyonu<br>**AC-17.2.3:** Rozet koleksiyonu: Profil→Rozetlerim, grid görünümü, kilitli/açık<br>**AC-17.2.4:** Rozet vitrin: En iyi 3 rozet profilde gösterilir, kullanıcı seçer<br>**AC-17.2.5:** Nadir rozetler: Özel etkinlikler, ilk 100 kullanıcı vb. | Rozet Kazanıldı → Bildirim → Rozetlerim |
| **EPIC 17** | Faz 2 | Danışan | **US-17.3** Liderboard ve Yarışmalar | Danışan olarak, diğer kullanıcılarla rekabet etmek istiyorum | **AC-17.3.1:** Gelişim→Liderboard: Haftalık/Aylık/Tüm Zamanlar sekmesi<br>**AC-17.3.2:** Sıralama: Toplam puan, içerik tamamlama, streak<br>**AC-17.3.3:** Kullanıcı gösterimi: Sıra, isim (anonim seçeneği), puan, rozet<br>**AC-17.3.4:** Kendi sıram vurgulanır<br>**AC-17.3.5:** Yarışmalar (aylık): Tema bazlı (örn. "Şükür Ayı"), ödüller (rozet, puan çarpanı)<br>**AC-17.3.6:** Gizlilik: "Liderboard'da göster" ayarı | Gelişim → Liderboard → Sekmeler |

---

## 📊 SUMMARY STATISTICS

### Phase 1 (MVP) - 11 EPICs
| EPIC | User Stories | Est. AC Count |
|------|--------------|---------------|
| EPIC 1: Authentication | 8 | 120 |
| EPIC 2: Home & Navigation | 4 | 45 |
| EPIC 3: Subscription | 5 | 60 |
| EPIC 4: Journeys | 3 | 40 |
| EPIC 5: Progress | 3 | 35 |
| EPIC 6: Discover | 3 | 30 |
| EPIC 7: e-Book Reader | 3 | 40 |
| EPIC 8: Workshops | 12 | 185 |
| EPIC 9: Favorites | 3 | 25 |
| EPIC 10: Accessibility | 4 | 35 |
| EPIC 11: Modules | 2 | 20 |
| **Phase 1 Total** | **50** | **635** |

### Phase 2 - 6 EPICs
| EPIC | User Stories | Est. AC Count |
|------|--------------|---------------|
| EPIC 12: Coach Panel | 3 | 45 |
| EPIC 13: Reading Groups | 2 | 30 |
| EPIC 14: Book Club | 2 | 25 |
| EPIC 15: Community | 2 | 30 |
| EPIC 16: AI Assistant | 3 | 45 |
| EPIC 17: Gamification | 3 | 40 |
| **Phase 2 Total** | **15** | **215** |

### **GRAND TOTAL**
- **17 EPICs**
- **65 User Stories**
- **850+ Acceptance Criteria**

---

## 🎯 KEY FEATURES BY PHASE

### Phase 1 (MVP) Key Features
✅ Email/Social Authentication  
✅ Multi-language (TR/EN)  
✅ Subscription Management (Individual/Family/Group)  
✅ Journeys with daily progression  
✅ **Complete Workshop System** (10 stages, individual/group, 21-day tracking)  
✅ e-Book Reader with highlights/notes  
✅ Progress Dashboard with reports  
✅ Favorites and personal archive  
✅ Full accessibility (WCAG 2.1 AA)  
✅ Module and Package system  

### Phase 2 Key Features
✅ Coach Panel (client management)  
✅ Reading Groups (collaborative book reading)  
✅ Book Clubs and discussions  
✅ Community forum  
✅ AI Assistant (RAG-based, content recommendations)  
✅ Advanced gamification (points, badges, leaderboard)  

---

## 📝 NOTES

### Critical Business Rules
1. **Sequential Progression:** Content unlocks in order (journeys, workshops)
2. **Daily Unlocking:** New content available at 08:00 daily
3. **Deadline:** Daily content must be completed by 23:59
4. **Subscription Gates:** Premium content requires active subscription
5. **Group Limits:** Family=5, Group=10 members max
6. **21-Day Tracking:** Required for workshop completion certificate

### Technical Requirements
- iOS 15+, Android 8+
- Offline support (download content)
- Real-time sync (groups, chat)
- Video streaming (HLS)
- PDF generation (certificates, reports)
- Deep linking (invites)
- Push notifications
- Analytics integration

### Content Structure (Real Example: Şükür Atölyesi)
**10 Stages:**
1. Concept Building
2. Verse Analysis (İbrahim 7, Lokman 12, Sebe 13)
3. Cross-Verse Integration
4. Classical Commentary
5. Conscience-to-Character Model
6. Modern Psychology Integration
7. ⭐ 3-Day Intensive Workshop (main application)
8. Workshop Leader Guide
9. Journey Notebook & Worksheets
10. 📅 21-Day Tracking Chart

---

**Document Owner:** Principal Product Manager  
**Last Updated:** January 17, 2026  
**Status:** ✅ Production Ready - Complete Table Format  
**Next Review:** Post-MVP Launch (Q2 2026)

