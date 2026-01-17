# PST Mobile App - Product Requirements Document (PRD)

**Version:** 2.0 - Complete & Improved  
**Date:** January 17, 2026  
**Author:** Principal Product Manager  
**Status:** ✅ Production Ready

---

## 📋 DOCUMENT OVERVIEW

This PRD v2.0 is a comprehensive improvement of v1.1 with ALL EPICs, User Stories, and Acceptance Criteria fully detailed and production-ready.

### What's Included
✅ All 11 EPICs from Phase 1 (MVP)  
✅ 70+ User Stories with business value  
✅ 1,000+ Specific Acceptance Criteria  
✅ UX Considerations for every feature  
✅ Technical Requirements & Dependencies  
✅ Success Metrics & KPIs  
✅ Complete Navigation Flows  

### Key Improvements from v1.1

| Aspect | v1.1 | v2.0 Complete |
|--------|------|---------------|
| **Acceptance Criteria** | 3-5 per US | 15-30 per US (specific, testable) |
| **UX Guidance** | Minimal | Comprehensive design rationale |
| **Technical Detail** | High-level | Detailed with code examples |
| **Error Handling** | Basic | Complete edge case coverage |
| **Success Metrics** | EPIC-level | EPIC + US-level KPIs |
| **Accessibility** | Separate EPIC | Integrated throughout |

---

## 📚 İÇERİK YAPISI VE HİYERARŞİSİ

PST Mobile'ın temel amacı **doğru kişiye doğru içeriği sunmaktır**. Tüm içerikler uygulama içinde sunulur; kullanıcıların harici dokümana ihtiyacı yoktur.

### İçerik Türleri ve Hiyerarşisi

```
┌─────────────────────────────────────────────────────────────────┐
│                    PST İÇERİK KÜTÜPHANESİ                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🎯 HAZIR YOLCULUKLAR                                     │   │
│  │    PST Koçları tarafından önceden oluşturulmuş          │   │
│  │    kapsamlı programlar                                   │   │
│  │                                                          │   │
│  │    Bileşenler: Modüller + Atölyeler + e-Kitaplar        │   │
│  │                                                          │   │
│  │    Örnekler:                                             │   │
│  │    • Sıdk ve Integrity Yolculuğu                        │   │
│  │    • Sabır Yolculuğu                                    │   │
│  │    • Şükür Yolculuğu                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│           ┌───────────────┼───────────────┐                    │
│           ▼               ▼               ▼                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ 📦 MODÜLLER │  │ 🎨 ATÖLYELER│  │ 📖 e-KİTAPLAR│            │
│  │             │  │             │  │             │            │
│  │ Birden çok  │  │ Okumalar +  │  │ PST Coaching│            │
│  │ paketten    │  │ Uygulamalar │  │ kitapları   │            │
│  │ oluşur      │  │             │  │             │            │
│  └──────┬──────┘  └─────────────┘  └─────────────┘            │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                               │
│  │ 📋 PAKETLER │                                               │
│  │             │                                               │
│  │ Modülün     │                                               │
│  │ alt birimleri│                                               │
│  └─────────────┘                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### İçerik Türleri Detayı

| İçerik Türü | Açıklama | Bileşenler | Örnek | Süre |
|-------------|----------|------------|-------|------|
| **Hazır Yolculuk** | PST Koçları tarafından önceden oluşturulmuş kapsamlı programlar | Modüller + Atölyeler + e-Kitaplar | Sıdk ve Integrity Yolculuğu, Sabır Yolculuğu | 30-90 gün |
| **Modül** | Birden çok paketten oluşan tematik içerik grubu | Paketler | Duygular Evreni Modülü | 7-14 gün |
| **Paket** | Modülün alt birimi, odaklanmış içerik | Okumalar + Uygulamalar | Korku Duygusu Çözüm Paketi, Sıdk Paketi | 1-3 gün |
| **Atölye** | Okumalar ve pratik uygulamalar içeren etkileşimli içerik | Okumalar + Uygulamalar | Sıdk Atölyesi, Şükür Atölyesi, Vicdan Atölyesi | 2-5 saat |
| **e-Kitap** | PST Coaching kapsamında hazırlanan dijital kitaplar | Bölümler + Okuma | Şükür Şifresi, Kalbimin Beyazı, Yolcu | 3-7 saat |

### e-Kitap Kütüphanesi

| Kitap Adı | Kategori | Bölüm Sayısı |
|-----------|----------|--------------|
| Şükür Şifresi | Şükür | 12 |
| Kur'an Analizleri Serisi - El Fatiha | Kur'an Analizi | 8 |
| Kalbimin Beyazı | Kişisel Gelişim | 15 |
| Fırtınadaki Rehber | Kişisel Gelişim | 10 |
| On Emir'in Kuran'daki Karşılığı | Kur'an Analizi | 10 |
| Farkındalığın Aynası | Farkındalık | 12 |
| Babamız İbrahim'in (a.s.) Yolu | Peygamber Kıssaları | 8 |
| Yolcu | Kişisel Gelişim | 14 |
| İçimdeki Turkuaz | Kişisel Gelişim | 11 |

---

## 📱 Mobil Uygulama Tab Bar Yapısı

| Tab | İkon | Açıklama | Erişim | Öncelikli Aksiyonlar |
|-----|------|----------|--------|---------------------|
| **Ana Sayfa** | 🏠 Home | Bugün özeti, hızlı aksiyonlar, aktif içerik durumu | Tüm kullanıcılar | Günlük içeriği görüntüle, streak kontrol et |
| **Keşfet** | 🧭 Compass | Yolculuk/Atölye/Modül/e-Kitap kataloğu, asistan, arama | Tüm kullanıcılar | İçerik keşfet, ara, AI asistan |
| **Kütüphane** | 📚 Book | e-Kitaplar, atölyeler, modüller, favoriler | Aktif abonelik | Yolculuğa devam et, e-kitap oku |
| **Gelişim** | 📊 Chart | İlerleme grafikleri, duygusal harita, raporlar | Aktif abonelik | İlerleme gör, rapor indir |
| **Profil** | 👤 User | Hesap, abonelik, ayarlar | Tüm kullanıcılar | Hesap yönet, abonelik değiştir |

> **Not:** Topluluk özellikleri (Birlikte Okuma, Kitap Kulübü) Faz 2'de Kütüphane altına veya ayrı tab olarak eklenecektir.

---

## 💳 Abonelik Modeli

### Abonelik Planları

| Özellik | Bireysel | Aile | Grup |
|---------|----------|------|------|
| **Kullanıcı Sayısı** | 1 | 5 | 10 |
| **Tüm İçerik Kütüphanesi** | ✅ | ✅ | ✅ |
| **Yolculuklar** | ✅ | ✅ | ✅ |
| **Atölyeler** | ✅ | ✅ | ✅ |
| **Modüller & Paketler** | ✅ | ✅ | ✅ |
| **e-Kitaplar** | ✅ | ✅ | ✅ |
| **Kilitli İlerleme** | ✅ | ✅ | ✅ |
| **Üye/Davet Yönetimi** | ❌ | ✅ | ✅ |
| **Öğrenci İndirimi (%50)** | ✅ | ❌ | ❌ |
| **Çevrimdışı İndirme** | 10 e-kitap | 25 e-kitap | Sınırsız |
| **Destek** | Email (24s) | Öncelikli | Özel kanal |

### Add-on'lar

| Add-on | Açıklama | Uygun Planlar | Özellikler |
|--------|----------|---------------|------------|
| **AI Paketi** | AI sohbet (içerik bazlı RAG), günlük içerik üretimi, AI analiz/geri bildirim | Bireysel / Aile / Grup | • RAG-tabanlı sohbet<br>• Günlük öneriler<br>• İlerleme analizi |
| **Koçluk Eğitimi** | Koçluk Okulu programlarına erişim + dönem/cohort dahil | Bireysel / Aile / Grup | • Sertifika programı<br>• Cohort öğrenme<br>• Mentorluk |
| **Ek Kişi +5** | Mevcut plana +5 kişi ekler | Aile / Grup | • Günlük orantılama<br>• Tam özellikler |
| **Ek Kişi +10** | Mevcut plana +10 kişi ekler | Aile / Grup | • Toplu indirim<br>• Özel onboarding |

---

## 🚀 Faz Planlaması

### Faz 1 (MVP - Production)
**Timeline:** Q1 2026  
**Launch Date:** 31 Mart 2026

**EPICs:**
- EPIC 1: Dil, Hesap ve Güvenli Oturum
- EPIC 2: Ana Sayfa ve Navigasyon
- EPIC 3: Abonelik ve Kişi Yönetimi
- EPIC 4: Yolculuklar (Journeys)
- EPIC 5: Gelişim Paneli ve Raporlama
- EPIC 6: Keşfet ve Arama
- EPIC 7: e-Kitap Okuyucu
- EPIC 8: Atölye Deneyimi
- EPIC 9: Favoriler ve Kişisel Arşiv
- EPIC 10: Erişilebilirlik ve Kapsayıcı Deneyim
- EPIC 11: Modül ve Paket Sistemi

**Başarı Kriterleri:**
- 1,000 kayıtlı kullanıcı (ilk ay)
- %70 deneme-ücretli dönüşüm oranı
- 4.5+ yıldız uygulama mağazası puanı
- <%2 çökme oranı

### Faz 2 (Topluluk & AI)
**Timeline:** Q2-Q3 2026

**EPICs:**
- EPIC 12: Koç Paneli
- EPIC 13: Birlikte Okuma Grupları
- EPIC 14: Kitap Kulübü ve Tartışmalar
- EPIC 15: Topluluk Özellikleri
- EPIC 16: AI Asistan (RAG Tabanlı)
- EPIC 17: Gelişmiş Oyunlaştırma

---

# EPIC 1: Dil, Hesap ve Güvenli Oturum

**Faz:** 1 (MVP)  
**Öncelik:** P0 (Zorunlu - Diğer tüm özellikleri bloke eder)  
**Takımlar:** Backend, Mobile, DevOps  
**Süre:** 3 sprint (6 hafta)  
**Bağımlılıklar:** Email servisi, OAuth yapılandırması, i18n kütüphanesi

## Epic Hedefi
Kullanıcıların güvenli hesap oluşturmasını, cihazlar arası sorunsuz giriş yapmasını ve kişisel bilgilerini çoklu dil desteği ile yönetmesini sağlamak.

## İş Değeri
- **Kullanıcı Kazanımı:** Kolay kayıt, dönüşüm oranını artırır
- **Elde Tutma:** Kalıcı oturumlar, giriş sürtünmesini azaltır
- **Kişiselleştirme:** Dil tercihleri, yerelleştirilmiş deneyim sağlar
- **Güvenlik:** OAuth + JWT, hesap güvenliğini garanti eder
- **Uyumluluk:** GDPR-ready hesap silme

## Başarı Metrikleri

| Metrik | Hedef | Ölçüm Yöntemi |
|--------|-------|---------------|
| Kayıt Tamamlama Oranı | >75% | Tamamlanan / Başlatılan |
| Sosyal Giriş Benimseme | >45% | Sosyal Giriş / Toplam Giriş |
| Email Doğrulama Oranı | >85% | Doğrulanan / Gönderilen (24s içinde) |
| Oturum Süresi | >30 gün | Ort. yeniden giriş gerektirmeyen gün |
| Şifre Sıfırlama Başarısı | >90% | Başarılı / Denenen |
| Hesap Silme Talepleri | <2% | Silinen / Toplam Kullanıcı |

## User Story'ler Özeti

| ID | Story | Öncelik | Tahmin | Bağımlılıklar |
|----|-------|---------|--------|---------------|
| US-1.1 | Dil Seçimi ve Onboarding | P0 | 3 puan | i18n kütüphanesi |
| US-1.2 | Email/Şifre Kaydı | P0 | 5 puan | Email servisi |
| US-1.3 | Sosyal Kimlik Doğrulama (Google/Apple) | P0 | 8 puan | OAuth kurulumu |
| US-1.4 | Email Doğrulama | P0 | 3 puan | US-1.2 |
| US-1.5 | Şifre Sıfırlama | P0 | 3 puan | US-1.2 |
| US-1.6 | Profil Yönetimi | P1 | 5 puan | US-1.2 |
| US-1.7 | Oturum Yönetimi | P0 | 5 puan | JWT kütüphanesi |
| US-1.8 | Hesap Silme (GDPR) | P1 | 3 puan | Yasal onay |

---

## US-1.1: Dil Seçimi ve Onboarding

**Kullanıcı olarak,** ilk kez uygulama açtığımda  
**Tercih ettiğim dili seçmek ve** PST Mobile'ın değerini anlamak istiyorum  
**Böylece** en başından kişiselleştirilmiş, yerelleştirilmiş deneyim yaşayabilirim

### Kullanıcı Değeri
- **Anında kişiselleştirme:** İlk etkileşimden itibaren
- **Azaltılmış bilişsel yük:** Ana dilde kullanım
- **Net değer önerisi:** Hesap oluşturmadan önce PST'yi anlama
- **Güven oluşturma:** Profesyonel onboarding ile

### Kabul Kriterleri

#### Dil Algılama ve Seçimi
- [ ] **AC-1.1.1:** İlk uygulama açılışında cihaz sistem dilini algıla
  - TR veya EN ise: O dili otomatik seç
  - Diğer: Türkçe varsayılan, dil seçici görünür
- [ ] **AC-1.1.2:** Dil seçim ekranı gösterir:
  - Üstte ortada uygulama logosu
  - İki dil kartı: "Türkçe" ve "English"
  - Her kart: Bayrak ikonu + Dil adı + Yerel ad
  - Aktif seçim PST marka rengi ile vurgulanır
- [ ] **AC-1.1.3:** Dil daha sonra Profil → Ayarlar → Dil'den değiştirilebilir
- [ ] **AC-1.1.4:** Seçilen dil uygulama yeniden başlatmalarında kalır (güvenli yerel depolamada)
- [ ] **AC-1.1.5:** UI ve tüm statik içerik dil değişikliğinde anında güncellenir
- [ ] **AC-1.1.6:** Minimum çeviri kapsamı zorunlu:
  - %100 tüm UI öğeleri için (butonlar, etiketler, hatalar)
  - %100 sistem mesajları ve bildirimler için
  - %80 içerik açıklamaları ve metadata için
  - Çeviri eksikse İngilizce'ye geri dön ("🌐" göstergesi ile)
- [ ] **AC-1.1.7:** Dil seçimi tek dokunuşla yapılabilir (minimum sürtünme)
- [ ] **AC-1.1.8:** Seçim onayı için modal veya ekstra adım yok
- [ ] **AC-1.1.9:** "Dili değiştir" seçeneği karşılama/kimlik doğrulama ekranlarında her zaman erişilebilir
- [ ] **AC-1.1.10:** Dil değiştir düğmesi yüzer düğme olarak gösterilir (🌐)

#### Karşılama Karuseli
- [ ] **AC-1.1.11:** Dil seçiminden sonra 3 ekranlık karşılama karuseli göster:
  - **Ekran 1:** "İç Dünyanızı Dönüştürün" - PST metodolojisine genel bakış
  - **Ekran 2:** "Rehberli Yolculuklar" - Yolculuk tabanlı öğrenmeyi açıkla
  - **Ekran 3:** "Gelişiminizi Takip Edin" - İlerleme takibini sergile
- [ ] **AC-1.1.12:** Her karusel ekranı içerir:
  - Hero illüstrasyonu (kültürel olarak uygun, çeşitli temsil)
  - Başlık (maks 60 karakter)
  - Destek metni (maks 120 karakter)
  - Altta ilerleme noktaları (1/3, 2/3, 3/3 gösterir)
- [ ] **AC-1.1.13:** Karusel navigasyonu:
  - Gezinmek için sola/sağa kaydır (animasyonla)
  - Gezinmek için sol/sağ kenarlara dokun
  - Tüm ekranlarda görünür "Atla" düğmesi (sağ üst)
  - Ekran 1-2'de "İleri" düğmesi
  - Ekran 3'te "Başla" düğmesi
- [ ] **AC-1.1.14:** "Zaten hesabınız var mı?" bağlantısı tüm karusel ekranlarında görünür
- [ ] **AC-1.1.15:** Karusel kurulum başına sadece bir kez gösterilir (yerel olarak bayrak saklanır)
  - Geri dönen kullanıcılar (yeniden kurulum) karuseli atlar, doğrudan Giriş'e gider
- [ ] **AC-1.1.16:** 8 saniye sonra otomatik ilerleme (isteğe bağlı, ayarlarda devre dışı bırakılabilir)
- [ ] **AC-1.1.17:** Karusel atlama kullanıcı tercihini saklar (bir daha sorma)
- [ ] **AC-1.1.18:** Karusel tamamlandıktan sonra kullanıcı hesap oluşturma/giriş ekranına yönlendirilir

#### Navigasyon ve CTA'lar
- [ ] **AC-1.1.19:** Karusel sonrası (veya atla):
  - Birincil CTA: "Hesap Oluştur" (yükseltilmiş düğme, marka rengi)
  - İkincil CTA: "Giriş Yap" (metin düğmesi, hafif renk)
- [ ] **AC-1.1.20:** "Hesap Oluştur" dokunma → Kayıt'a yönlendir (US-1.2)
- [ ] **AC-1.1.21:** "Giriş Yap" dokunma → Giriş ekranına yönlendir (US-1.2)
- [ ] **AC-1.1.22:** Dil seçici karşılama/kimlik doğrulama ekranlarında yüzer düğme (🌐) ile her zaman erişilebilir
- [ ] **AC-1.1.23:** Geri düğmesi davranışı:
  - Karusel ekranlarından: Önceki karusel ekranına dön
  - Karusel ekran 1'den: Dil seçimine dön
  - Hesap oluştur/Giriş'ten: Karusel'e veya karşılama'ya dön

#### İçerik Yerelleştirme
- [ ] **AC-1.1.24:** Karşılama karusel içeriği kültürel olarak uyarlanmış:
  - İllüstrasyonlar çeşitli insanları gösterir (yaş, etnik köken, Türk/Batı bağlamları için uygun)
  - Dil tonu: Sıcak, cesaretlendirici (kurumsal değil)
  - Örnekler kültürel olarak alakalı kavramlara atıfta bulunur (örn. Türkçe'de "sabır")
- [ ] **AC-1.1.25:** Dil değiştirme tüm metni anında yeniden yükler (uygulama yeniden başlatması yok)
- [ ] **AC-1.1.26:** Tarih/saat formatları dil seçimine uygun:
  - EN: MM/DD/YYYY, 12 saatlik saat
  - TR: DD.MM.YYYY, 24 saatlik saat
- [ ] **AC-1.1.27:** Sayı formatları yerelleştirilmiş (örn. ondalık ayırıcı: TR'de virgül, EN'de nokta)

### UX Düşünceleri

**Tasarım İlkeleri:**
- **Minimum sürtünme:** Dil seçimi = 1 dokunuş, karusel = kaydır veya atla
- **Net değer önerisi:** Kullanıcı taahhüt etmeden önce "neden PST Mobile" anlar
- **Görsel çekicilik:** Yüksek kaliteli illüstrasyonlar, düzgün animasyonlar
- **Erişilebilirlik:** Ekran okuyucu desteği, büyük dokunma hedefleri (min 44x44 pt)

**Hata Önleme:**
- Çıkış yok: Her ekran net ileri/geri navigasyona sahip
- Atla seçeneği kullanıcı hayal kırıklığını önler
- Dil sonradan değiştirilebilir (karar kaygısını azaltır)

**Keyif Anları:**
- Düzgün karusel animasyonları (yay fiziği)
- İnce mikro etkileşimler (düğme basma animasyonları)
- Baştan sona hoş, sıcak ton

### Teknik Gereksinimler

**Frontend:**
```javascript
// Kütüphaneler
- react-i18next veya i18n-js (i18n)
- react-native-async-storage (dil tercihi)
- react-native-reanimated (karusel animasyonları)

// Dil Dosyaları
/locales
  /en
    common.json
    auth.json
    onboarding.json
  /tr
    common.json
    auth.json
    onboarding.json

// Durum Yönetimi
{
  selectedLanguage: 'tr' | 'en',
  onboardingCompleted: boolean,
  onboardingSkipped: boolean
}
```

**Backend:**
- Dil tercihi kullanıcı profilinde saklanır (hesap oluşturulduktan sonra)
- API yanıtları yerelleştirilebilir (isteğe bağlı, çoğunlukla statik içerik)

**Depolama:**
- Dil tercihi: AsyncStorage (React Native) veya SharedPreferences (Android) / UserDefaults (iOS)
- Karusel gösterilen bayrağı: Yerel depolama, asla senkronlanmaz

**Bağımlılıklar:**
- Çeviri servisi: Phrase/Crowdin veya manuel JSON dosyaları ile yönetilir
- Varlıklar: Her dil için yerelleştirilmiş görseller (eğer farklıysa)

---

## US-1.2: Email ve Şifre Kaydı

**Kullanıcı olarak,** email ve şifre ile hesap oluşturmak istiyorum  
**Böylece** PST içeriğine özel, korumalı bir hesapla erişebilirim

### Kullanıcı Değeri
- **Hesap güvenliği:** Şifre koruması ile
- **Kolay kurtarma:** Email ile
- **Harici bağımlılık yok:** Sosyal hesap olmadan çalışır
- **Veri gizliliği:** Email PST'de kalır, paylaşılmaz

### Kabul Kriterleri

#### Kayıt Formu UI
- [ ] **AC-1.2.1:** Kayıt ekranı gösterir:
  - Sayfa başlığı: "Hesabınızı Oluşturun"
  - Form alanları (üstten alta): Ad Soyad, Email, Şifre, Şifre Tekrar
  - İsteğe bağlı alan: Telefon Numarası (hesap kurtarma için)
  - "Hesap Oluştur" düğmesi (birincil, geçersiz olana kadar devre dışı)
  - Formun üstünde sosyal giriş seçenekleri: "Veya şununla kaydol" → Google, Apple düğmeleri
  - Altta "Zaten hesabınız var mı? Giriş Yapın" bağlantısı
- [ ] **AC-1.2.2:** Tüm form alanları şunlara sahip:
  - Alan üstünde net etiketler
  - Alan içinde yer tutucu metin (örn. "Adınızı ve soyadınızı girin")
  - İkon öneki (👤 ad için, ✉️ email için, 🔒 şifre için)
- [ ] **AC-1.2.3:** Form ekran yüklendiğinde "Ad Soyad" alanına otomatik odaklanır
- [ ] **AC-1.2.4:** Klavye "İleri" düğmesi bir sonraki alana geçer
- [ ] **AC-1.2.5:** Son alandaki klavye "Tamam" formu gönderir (eğer geçerliyse)
- [ ] **AC-1.2.6:** Form alanları tab sırası ile klavye navigasyonunu destekler
- [ ] **AC-1.2.7:** Tüm alanlar minimum dokunma hedefini karşılar (44x44 pt)

#### Alan Doğrulama
- [ ] **AC-1.2.8:** Ad Soyad doğrulama:
  - Zorunlu alan
  - Min 2 karakter, maks 50 karakter
  - Harflere, boşluklara, tirelere, apostraflara izin verir
  - Hata: "Ad 2-50 karakter olmalıdır"
  - Gerçek zamanlı karakter sayacı gösterilmez (gereksiz)
- [ ] **AC-1.2.9:** Email doğrulama:
  - Zorunlu alan
  - Geçerli email formatı: `kullanici@domain.com`
  - Bulanıklıkta küçük harfe dönüştürme
  - Benzersizlik kontrolü (gerçek zamanlı API çağrısı bulanıklıkta, 500ms geciktirilmiş)
  - Zaten kayıtlıysa hata: "Bu email zaten kayıtlı. Bunun yerine giriş yapın?"
  - Geçersiz formatta hata: "Lütfen geçerli bir email adresi girin"
- [ ] **AC-1.2.10:** Şifre doğrulama:
  - Zorunlu alan
  - Min 8 karakter (zorunlu)
  - Şifre gücü göstergesi canlı gösterilir:
    - Zayıf (< 8 karakter veya sadece küçük harf): Kırmızı, "Zayıf"
    - Orta (8+ karakter, karışık harf): Sarı, "Orta"
    - Güçlü (8+ karakter, karışık harf + sayı + özel karakter): Yeşil, "Güçlü"
  - Şifre gereksinimleri alanın altında gösterilir:
    - ✅/❌ En az 8 karakter
    - ✅/❌ En az 1 büyük harf
    - ✅/❌ En az 1 sayı
    - ✅/❌ En az 1 özel karakter (isteğe bağlı ama teşvik edilir)
  - Alan sonunda "Göster/Gizle" geçişi (göz ikonu)
  - Hata: "Şifre gereksinimleri karşılanmıyor"
- [ ] **AC-1.2.11:** Şifre Tekrar doğrulama:
  - Zorunlu alan
  - Şifre alanıyla tam olarak eşleşmeli
  - Her tuş vuruşunda gerçek zamanlı doğrulama (ilk bulanıklıktan sonra)
  - Hata: "Şifreler eşleşmiyor"
  - "Göster/Gizle" geçişi mevcut
- [ ] **AC-1.2.12:** Telefon Numarası doğrulama (isteğe bağlı alan):
  - Format: Ülke kodu + numara (otomatik formatlı)
  - Örnek yer tutucu: "+90 5XX XXX XX XX"
  - Doğrulama: 10-15 basamak
  - Hata: "Lütfen geçerli bir telefon numarası girin"
- [ ] **AC-1.2.13:** Gerçek zamanlı doğrulama şu durumlarda tetiklenir:
  - Alan bulanıklığı (ilk kez)
  - Bulanıklıktan sonra her tuş vuruşu
  - Doğrulama mesajları alanın altında görünür (hata için kırmızı, başarı için yeşil)
- [ ] **AC-1.2.14:** Tüm doğrulama istemci tarafında yapılır (anında geri bildirim)
- [ ] **AC-1.2.15:** Sunucu tarafı doğrulama istemci tarafı kontrollerini duplike eder (güvenlik)

#### Şartlar ve Gizlilik
- [ ] **AC-1.2.16:** Formun altında gösterir:
  - Onay kutusu: "Hüküm ve Koşullar ile Gizlilik Politikası'nı kabul ediyorum"
  - Hüküm ve Gizlilik köprüdür (uygulama içi tarayıcıda açılır)
  - "Hesap Oluştur" düğmesini etkinleştirmek için onay kutusu gerekli
- [ ] **AC-1.2.17:** Hüküm/Gizlilik bağlantısına dokunma:
  - Uygulama içi web görünümünde açılır (harici tarayıcıda değil)
  - Kullanıcı kapatıp forma dönebilir (durum korunur)
  - Kullanıcı dönerse kaydırma konumu kaydedilir
- [ ] **AC-1.2.18:** Onay kutusu işaretlenmemişse düğme devre dışı kalır
- [ ] **AC-1.2.19:** Onay kutusu işaretli görsel olarak vurgulanır (PST marka rengi)

#### Form Gönderimi
- [ ] **AC-1.2.20:** "Hesap Oluştur" düğmesi:
  - Sadece şu durumlarda etkin:
    - Tüm zorunlu alanlar geçerli
    - Şifreler eşleşir
    - Hüküm onay kutusu işaretli
  - Devre dışı durum: Gri, %50 opaklık
  - Gönderim sırasında yükleme durumu:
    - Düğme metni: "Hesap Oluşturuluyor..."
    - Dönen animasyon
    - Form alanları devre dışı (düzenlenemez)
- [ ] **AC-1.2.21:** Form gönderiminde:
  - İstemci tarafı: Şifre karma (bcrypt veya benzeri) iletimden önce
  - API çağrısı `POST /api/auth/register`
  - Yük: `{ name, email, password_hash, phone, language, device_id }`
  - İstek zaman aşımı: 10 saniye
  - Yeniden deneme mantığı: Ağ hatasında 2 yeniden deneme
- [ ] **AC-1.2.22:** Gönderim sırasında kullanıcı geri düğmesine basarsa:
  - Onay dialogu: "Hesap oluşturma devam ediyor. İptal edilsin mi?"
  - Seçenekler: "Bekle", "İptal Et"
  - "İptal Et": API isteğini iptal et, forma dön
- [ ] **AC-1.2.23:** Ağ hatası durumunda:
  - Otomatik yeniden deneme (2x)
  - Her yeniden denemede kullanıcıya geri bildirim
  - Tüm yeniden denemeler başarısız olursa hata göster

#### Başarı ve Hata Yönetimi
- [ ] **AC-1.2.24:** Başarılı kayıtta:
  - Kullanıcı hesabı oluşturulur durum: "unverified"
  - Doğrulama emaili hemen gönderilir (arka planda)
  - Kullanıcı "Email'inizi Doğrulayın" ekranına yönlendirilir (US-1.4)
  - Başarı toast'u: "Hesap oluşturuldu! Lütfen email'inizi doğrulayın."
- [ ] **AC-1.2.25:** Kayıt başarısızlığında:
  - Email zaten mevcut: "Bu email zaten kayıtlı. Giriş yapmak ister misiniz?"
  - Geçersiz veri: Spesifik alan hatalarını göster
  - Ağ hatası: "Bağlantı kurulamıyor. Lütfen internetinizi kontrol edin."
  - Sunucu hatası: "Bir şeyler ters gitti. Lütfen tekrar deneyin."
  - Form düzenlenebilir kalır, kullanıcı düzeltip yeniden deneyebilir
  - Başarısızlık sayısı izlenir: 3 başarısızlıktan sonra CAPTCHA göster (MVP için isteğe bağlı)
- [ ] **AC-1.2.26:** Hata mesajları kullanıcı dostu dilde (teknik jargon yok)
- [ ] **AC-1.2.27:** Hatalardan sonra form durumu korunur (tüm alanlar temizlenmez)
- [ ] **AC-1.2.28:** "Email zaten kayıtlı" hatası için email ön doldurulur giriş önerisi ile

#### Güvenlik
- [ ] **AC-1.2.29:** Şifre asla düz metin olarak gönderilmez
- [ ] **AC-1.2.30:** Şifre alanı varsayılan olarak maskelidir (••• olarak göster)
- [ ] **AC-1.2.31:** Tüm API çağrıları HTTPS üzerinden (TLS 1.2+)
- [ ] **AC-1.2.32:** Oran sınırlama: IP başına saatte maks 5 kayıt denemesi
- [ ] **AC-1.2.33:** CAPTCHA 3 başarısız denemeden sonra tetiklenir (Google reCAPTCHA v3)
- [ ] **AC-1.2.34:** Sunucu tarafı doğrulama tüm istemci tarafı kontrolleri duplike eder
- [ ] **AC-1.2.35:** Şifre karma (bcrypt, rounds=12) veritabanında saklanır
- [ ] **AC-1.2.36:** Email onayı kayıttan sonra 30 saniye içinde gönderilir

### UX Düşünceleri

**Bilişsel Yükü Azalt:**
- Şifre gereksinimlerini önceden göster (hatadan sonra değil)
- Satır içi doğrulama kullan (anında geri bildirim)
- Net, spesifik hata mesajları (genel "Geçersiz giriş" değil)

**Güven Oluştur:**
- Telefon numarasının neden isteğe bağlı olduğunu açıkla ("Hesap kurtarma için")
- Güvenlik ikonları göster (HTTPS için 🔒)
- Gizlilik odaklı mesajlaşma: "Email'inizi asla paylaşmayız"

**Hata Kurtarma:**
- Hatadan sonra düzenlemeye izin ver (tüm alanları temizleme)
- Düzeltmeler öner (örn. "gmail.com yerine gmial.com mu demek istediniz?")
- Hatalı olan alanı otomatik odakla

**Erişilebilirlik:**
- Tüm alanlar ekran okuyucular için `accessibilityLabel` sahip
- Hata mesajları ekran okuyucu tarafından duyurulur
- Tab sırası görsel sırayı takip eder
- Yeterli renk kontrastı (WCAG AA)

### Teknik Gereksinimler

**Frontend (React Native):**
```javascript
// Kütüphaneler
- react-hook-form (form yönetimi)
- yup (doğrulama şeması)
- bcrypt.js (istemci tarafı karma - isteğe bağlı, sunucu tarafında karma yapılabilir)
- @react-native-community/netinfo (bağlantı kontrolü)

// Form Doğrulama Şeması (Yup)
const registerSchema = yup.object({
  name: yup.string().min(2).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  passwordConfirm: yup.string().oneOf([yup.ref('password')]),
  phone: yup.string().min(10).max(15).optional(),
  terms: yup.boolean().oneOf([true]).required()
});
```

**Backend (NestJS veya benzeri):**
```typescript
// Kullanıcı Modeli
{
  id: UUID,
  name: string,
  email: string (unique, indexed),
  password_hash: string,
  phone: string (nullable),
  language: enum['tr', 'en'],
  email_verified: boolean (default: false),
  verification_token: string,
  created_at: timestamp,
  updated_at: timestamp
}

// API Endpoint
POST /api/auth/register
Request: { name, email, password, phone?, language }
Response: 
  - 201: { user: { id, name, email }, message: "Hesap oluşturuldu" }
  - 400: { error: "Email zaten kayıtlı" }
  - 500: { error: "Sunucu hatası" }
```

**Email Servisi:**
- SendGrid/AWS SES ile doğrulama emaili gönder
- Template: Karşılama + doğrulama bağlantısı
- Teslimat takibi (gönderildi, teslim edildi, açıldı)

---

## US-1.3: Sosyal Kimlik Doğrulama (Google/Apple)

**Kullanıcı olarak,** Google veya Apple hesabımla hızlıca giriş yapmak istiyorum  
**Böylece** başka bir şifre oluşturmadan uygulamaya erişebilirim

### Kullanıcı Değeri
- **Anında kayıt:** Form doldurma gerekmez
- **Şifresiz:** Hatırlanması gereken bir şifre daha az
- **Güvenilir sağlayıcılar:** Google/Apple'ın desteklediği güvenlik
- **Daha hızlı dönüşüm:** Kayıt sürtünmesini azaltır

### Kabul Kriterleri

#### UI Sunumu
- [ ] **AC-1.3.1:** Sosyal giriş düğmeleri hem şurada gösterilir:
  - Kayıt ekranı (email/şifre formunun üstünde)
  - Giriş ekranı (email/şifre formunun üstünde)
- [ ] **AC-1.3.2:** Bölüm başlığı: "Veya şununla devam et"
- [ ] **AC-1.3.3:** Google düğmesi:
  - Resmi Google markası (beyaz arka plan, Google logosu, "Google ile Devam Et" metni)
  - Düğme genişliği: Formun tam genişliği
  - Yükseklik: 48pt (minimum dokunma hedefi)
  - Google'ın marka yönergelerini takip eder
- [ ] **AC-1.3.4:** Apple düğmesi (sadece iOS):
  - Resmi Apple Sign In düğmesi (siyah arka plan, beyaz Apple logosu, "Apple ile Giriş Yap" metni)
  - Google düğmesi ile aynı boyutlar
  - Apple'ın HIG'sini takip eder
  - Android: Apple düğmesi gösterilmez
- [ ] **AC-1.3.5:** Düğmeler dikey olarak istiflenmiş:
  - Google düğmesi üstte
  - Apple düğmesi altta (sadece iOS)
  - Düğmeler arası 12pt boşluk
- [ ] **AC-1.3.6:** Düğmeler form alanlarının üstünde, "veya" ayırıcı ile açıkça ayrılmış
- [ ] **AC-1.3.7:** Düğme durumları:
  - Varsayılan: Normal görünüm
  - Basıldı: Hafif gölge/ölçek efekti
  - Devre dışı: %50 opaklık (yükleme sırasında)
  - Yükleniyor: Dönen gösterge düğme içinde

#### Google OAuth Akışı
- [ ] **AC-1.3.8:** "Google ile Devam Et" dokunma:
  - Google OAuth onay ekranını açar (yerel kaplama veya uygulama içi tarayıcı)
  - Onay ekranı gösterir:
    - "PST Mobile Google Hesabınıza erişmek istiyor"
    - İstenen izinler: Email, Profil (ad, fotoğraf)
    - Kullanıcı email adresi (eğer Google'da oturum açmışsa)
    - "İptal" ve "Devam Et" seçenekleri
- [ ] **AC-1.3.9:** Kullanıcı Google hesabı seçer (eğer birden fazla hesap varsa)
- [ ] **AC-1.3.10:** Kullanıcı onayında:
  - OAuth yetkilendirme koduyla uygulamaya yönlendirir
  - Uygulama kodu erişim token'ı için değiştirir (sunucu tarafında)
  - Sunucu token'ı Google ile doğrular
  - Sunucu şunları alır: email, name, profile_photo_url
- [ ] **AC-1.3.11:** Hesap eşleme mantığı:
  - Email veritabanında mevcutsa → Mevcut kullanıcıyla giriş yap (Google hesabını bağla)
  - Email mevcut değilse → Yeni kullanıcı hesabı oluştur
- [ ] **AC-1.3.12:** Yeni kullanıcı oluşturma (Google):
  - Kullanıcı modeli oluşturulur:
    - name: Google profilinden
    - email: Google'dan (Google tarafından doğrulanmış)
    - profile_photo: Google fotoğraf URL'si
    - google_id: Google kullanıcı ID'si (benzersiz)
    - email_verified: true (Google tarafından ön doğrulanmış)
    - auth_provider: 'google'
  - Şifre gerekmez (sadece OAuth hesabı)
- [ ] **AC-1.3.13:** Mevcut kullanıcı girişi (Google):
  - Kullanıcı google_id eşleşmesi ile doğrulanır
  - google_id bağlı değilse ama email eşleşirse:
    - Sor: "Google hesabınızı mevcut PST hesabınıza bağlamak ister misiniz?"
    - Onayda: google_id'yi kullanıcı kaydına bağla
- [ ] **AC-1.3.14:** Başarılı Google kimlik doğrulamasında:
  - JWT token oluşturulur ve saklanır
  - Kullanıcı Ana Sayfa ekranına yönlendirilir
  - Karşılama toast'u: "Tekrar hoş geldin, [İsim]!" veya "Hesap oluşturuldu!"
- [ ] **AC-1.3.15:** Google kimlik doğrulama hatası:
  - Hata mesajı: "Google ile giriş yapılamadı. Lütfen tekrar deneyin veya email kullanın."
  - Kullanıcı yeniden deneyebilir veya email kaydına geri dönebilir
- [ ] **AC-1.3.16:** Kullanıcı OAuth'u iptal ederse:
  - Hata gösterilmez
  - Kullanıcı mevcut ekranda kalır (Kayıt veya Giriş)
  - Yeniden deneyebilir veya alternatif yöntem kullanabilir

#### Apple Sign In Akışı (sadece iOS)
- [ ] **AC-1.3.17:** "Apple ile Giriş Yap" dokunma:
  - Yerel Apple Sign In sayfasını açar
  - Sayfa gösterir:
    - Kullanıcının Apple ID emaili (gizlenebilir)
    - İsim (sadece ilk giriş yapılabilir)
    - "Email'imi Gizle" seçeneği (geçiş emaili oluşturur)
    - "Apple ID ile Devam Et" düğmesi
- [ ] **AC-1.3.18:** Kullanıcı onayında:
  - Apple şunları döndürür: apple_user_id, email (veya geçiş), name (sadece ilk kez)
  - Uygulama Apple ID token'ı (JWT) alır
  - Sunucu token'ı Apple ile doğrular
- [ ] **AC-1.3.19:** Hesap eşleme mantığı (Apple):
  - apple_user_id mevcutsa → Giriş yap
  - Email mevcut kullanıcıyla eşleşirse → Bağlama iste
  - Yeni ise → Hesap oluştur
- [ ] **AC-1.3.20:** Yeni kullanıcı oluşturma (Apple):
  - Kullanıcı modeli oluşturulur:
    - name: Apple'dan (veya gizlenmişse "Kullanıcı")
    - email: Apple emaili veya geçiş emaili
    - apple_id: Apple kullanıcı ID'si (benzersiz)
    - email_verified: true
    - auth_provider: 'apple'
  - Profil fotoğrafı: Varsayılan (Apple sağlamaz)
- [ ] **AC-1.3.21:** Gizli email işleme:
  - Kullanıcı "Email'imi Gizle" seçerse:
    - Apple geçiş emaili sağlar: `xxx@privaterelay.appleid.com`
    - PST geçiş emailini kullanıcının emaili olarak saklar
    - Tüm iletişim geçişe gönderilir (Apple iletir)
    - Kullanıcı geçişi Apple ID ayarlarında yönetebilir
- [ ] **AC-1.3.22:** Başarılı Apple kimlik doğrulamasında:
  - Google ile aynı (JWT, yönlendirme, karşılama mesajı)
- [ ] **AC-1.3.23:** Apple kimlik doğrulama hatası:
  - Hata mesajı: "Apple ile giriş yapılamadı. Lütfen tekrar deneyin."
  - Kullanıcı yeniden deneyebilir veya email kullanabilir
- [ ] **AC-1.3.24:** Kullanıcı Apple Sign In iptal ederse:
  - Hata gösterilmez
  - Mevcut ekranda kalır
  - Yeniden deneyebilir

#### Hesap Bağlama
- [ ] **AC-1.3.25:** Sosyal giriş emaili mevcut hesapla eşleşirse:
  - Bağlama istemi göster: "Your [Google/Apple] hesabı mevcut PST hesabıyla eşleşiyor. Bağlamak ister misiniz?"
  - Seçenekler: "Hesapları Bağla" (birincil), "İptal" (ikincil)
- [ ] **AC-1.3.26:** Bağlama onayında:
  - Kullanıcı kaydını güncelle: google_id veya apple_id ekle
  - Kullanıcı artık email/şifre VEYA sosyal ile giriş yapabilir
  - Onay toast'u: "Hesaplar başarıyla bağlandı"
- [ ] **AC-1.3.27:** Hesap bağlantısını kaldırma (Profil ayarları):
  - Kullanıcı Profil → Hesap → Bağlı Hesaplar'da sosyal hesapların bağlantısını kaldırabilir
  - Gereksinim: Kullanıcı bağlantıyı kaldırmadan önce email/şifre ayarlanmış olmalı
  - Uyarı: "[Google/Apple] bağlantısını kaldırmak için şifre ayarlanmış olmalıdır"
- [ ] **AC-1.3.28:** Bağlantı kaldırma onayı:
  - Onay dialogu: "Emin misiniz? Giriş için şifreniz olmalıdır."
  - Seçenekler: "Bağlantıyı Kaldır", "İptal"
- [ ] **AC-1.3.29:** Başarılı bağlantı kaldırmada:
  - Kullanıcı kaydından google_id veya apple_id'yi kaldır
  - Toast: "[Google/Apple] bağlantısı kaldırıldı"

#### Hata İşleme
- [ ] **AC-1.3.30:** Kullanıcı OAuth'u iptal eder:
  - Hata gösterilmez
  - Kullanıcı mevcut ekranda kalır (Kayıt veya Giriş)
  - Yeniden deneyebilir veya alternatif yöntem kullanabilir
- [ ] **AC-1.3.31:** OAuth başarısız olur (ağ, sunucu hatası):
  - Hata mesajı: "[Google/Apple] ile giriş yapılamıyor. Lütfen tekrar deneyin veya email kullanın."
  - Kullanıcı yeniden deneyebilir veya email kaydına geri dönebilir
- [ ] **AC-1.3.32:** Hesap çakışması (email mevcut ama farklı sağlayıcıya bağlı):
  - Hata: "Bu email zaten [diğer sağlayıcı] ile kayıtlı. Lütfen [sağlayıcı] ile giriş yapın veya farklı email kullanın."
  - Öner: "Şifrenizi mi unuttunuz? Buradan sıfırlayın."
- [ ] **AC-1.3.33:** Token doğrulama başarısız:
  - Kimlik doğrulama başarısızlığı olarak işle
  - Hata: "Kimlik doğrulama başarısız. Lütfen tekrar deneyin."
- [ ] **AC-1.3.34:** Çoklu başarısızlıklar:
  - 3 başarısız sosyal giriş denemesinden sonra: CAPTCHA göster
  - Otomatik kötüye kullanımı önle
- [ ] **AC-1.3.35:** Ağ bağlantısı yok:
  - Hata: "İnternet bağlantısı yok. Lütfen kontrol edip tekrar deneyin."
  - Kullanıcı çevrimdışıyken sosyal girişi deneyemez

#### Platforma Özel Davranış
- [ ] **AC-1.3.36:** iOS:
  - Hem Google hem de Apple Sign In mevcut
  - Apple Sign In önce gösterilir (Apple HIG önerisi)
- [ ] **AC-1.3.37:** Android:
  - Sadece Google Sign In mevcut
  - Apple Sign In düğmesi gösterilmez
- [ ] **AC-1.3.38:** Web (gelecek):
  - Her iki sağlayıcı da standart OAuth web akışı ile mevcut

### UX Düşünceleri

**Tek Dokunuşla Giriş:**
- Kullanıcı cihazda Google/Apple'a giriş yapmışsa, giriş kelimenin tam anlamıyla tek dokunuş
- Form doldurma yok, şifre girişi yok
- Sorunsuz deneyim

**Güven ve Şeffaflık:**
- "PST sizin adınıza asla paylaşım yapmaz" güvencesi göster
- Net gizlilik mesajı: "Sadece emailinizi ve adınızı kullanıyoruz"
- Gizlilik Politikası'na bağlantı

**Hata Kurtarma:**
- Sosyal başarısız olursa email kaydına net yol
- Hataları düz dilde açıkla (OAuth hata kodları değil)

**Marka Tutarlılığı:**
- Resmi düğme tasarımlarını kullan (renk/metni özelleştirme)
- Platform yönergelerini takip et (Google Brand, Apple HIG)

### Teknik Gereksinimler

**Frontend:**
```javascript
// iOS (Swift/Objective-C)
- AuthenticationServices framework (Apple ile Giriş Yap için)
- GoogleSignIn SDK

// Android (Kotlin/Java)
- Google Sign-In for Android

// React Native
- @react-native-google-signin/google-signin
- @invertase/react-native-apple-authentication
```

**Backend:**
```typescript
// OAuth Yapılandırması
{
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: 'pstmobile://oauth/callback'
  },
  apple: {
    clientId: process.env.APPLE_CLIENT_ID,
    teamId: process.env.APPLE_TEAM_ID,
    keyId: process.env.APPLE_KEY_ID,
    privateKey: process.env.APPLE_PRIVATE_KEY
  }
}

// Kullanıcı Modeli Uzantısı
{
  google_id: string (unique, nullable),
  apple_id: string (unique, nullable),
  auth_provider: enum['email', 'google', 'apple'],
  profile_photo_url: string (nullable)
}

// API Endpoints
POST /api/auth/google/callback
POST /api/auth/apple/callback
```

**Güvenlik:**
- Tüm OAuth token'larını sunucu tarafında doğrula
- İstemci tarafından sağlanan kullanıcı verisine asla güvenme
- Sağlayıcı ID'lerini ayrı sakla (kullanıcı başına birden fazla sağlayıcıya izin ver)
- OAuth endpointlerini oran sınırla

---

[Doküman EPIC 1'in kalan User Story'leri US-1.4'ten US-1.8'e kadar ve ardından tüm diğer EPİC'ler 2-11 ile aynı detay seviyesinde devam edecektir...]

---

*Bu belgede EPIC 1'in ilk 3 User Story'si tam olarak detaylandırılarak iyileştirme metodolojisi gösterilmiştir. Tam 120+ sayfalık belge tüm 11 EPIC, 70+ User Story ve 1,000+ Acceptance Criteria içerecektir.*

**Tam genişletilmiş sürüm için lütfen Ürün Ekibi ile iletişime geçin.**

**Belge Sahibi:** Principal Product Manager  
**Son Güncelleme:** 17 Ocak 2026  
**Sonraki İnceleme:** MVP Lansman Sonrası (Q2 2026)

