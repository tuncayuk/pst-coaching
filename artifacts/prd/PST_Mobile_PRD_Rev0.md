# PST Mobile App - Product Requirements Document (PRD)

**Versiyon:** 1.1  
**Tarih:** Ocak 2026  
**Hazırlayan:** Principal Product Manager  
**Güncelleme:** İçerik yapısı ve Kütüphane Epic'leri eklendi

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

| İçerik Türü | Açıklama | Bileşenler | Örnek |
|-------------|----------|------------|-------|
| **Hazır Yolculuk** | PST Koçları tarafından önceden oluşturulmuş kapsamlı programlar | Modüller + Atölyeler + e-Kitaplar | Sıdk ve Integrity Yolculuğu, Sabır Yolculuğu |
| **Modül** | Birden çok paketten oluşan tematik içerik grubu | Paketler | Duygular Evreni Modülü |
| **Paket** | Modülün alt birimi, odaklanmış içerik | Okumalar + Uygulamalar | Korku Duygusu Çözüm Paketi, Sıdk Paketi |
| **Atölye** | Okumalar ve pratik uygulamalar içeren etkileşimli içerik | Okumalar + Uygulamalar | Sıdk Atölyesi, Şükür Atölyesi, Vicdan Atölyesi |
| **e-Kitap** | PST Coaching kapsamında hazırlanan dijital kitaplar | Bölümler + Okuma | Şükür Şifresi, Kalbimin Beyazı, Yolcu |

### e-Kitap Kütüphanesi

| Kitap Adı | Kategori |
|-----------|----------|
| Şükür Şifresi | Şükür |
| Kur'an Analizleri Serisi - El Fatiha | Kur'an Analizi |
| Kalbimin Beyazı | Kişisel Gelişim |
| Fırtınadaki Rehber | Kişisel Gelişim |
| On Emir'in Kuran'daki Karşılığı | Kur'an Analizi |
| Farkındalığın Aynası | Farkındalık |
| Babamız İbrahim'in (a.s.) Yolu | Peygamber Kıssaları |
| Yolcu | Kişisel Gelişim |
| İçimdeki Turkuaz | Kişisel Gelişim |

---

## 📱 Mobil Uygulama Tab Bar Yapısı

| Tab | İkon | Açıklama | Erişim |
|-----|------|----------|--------|
| **Ana Sayfa** | 🏠 Home | Bugün özeti, hızlı aksiyonlar, aktif içerik durumu | Tüm kullanıcılar |
| **Keşfet** | 🧭 Compass | Yolculuk/Atölye/Modül/e-Kitap kataloğu, asistan, arama | Tüm kullanıcılar |
| **Kütüphane** | 📚 Book | e-Kitaplar, atölyeler, modüller, favoriler | Aktif abonelik |
| **Gelişim** | 📊 Chart | İlerleme grafikleri, duygusal harita, raporlar | Aktif abonelik |
| **Profil** | 👤 User | Hesap, abonelik, ayarlar | Tüm kullanıcılar |

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

### Add-on'lar

| Add-on | Açıklama | Uygun Planlar |
|--------|----------|---------------|
| **AI Paketi** | AI sohbet (içerik bazlı RAG), günlük içerik üretimi, AI analiz/geri bildirim | Bireysel / Aile / Grup |
| **Koçluk Eğitimi** | Koçluk Okulu programlarına erişim + dönem/cohort dahil | Bireysel / Aile / Grup |
| **Ek Kişi +5** | Mevcut plana +5 kişi ekler | Aile / Grup |
| **Ek Kişi +10** | Mevcut plana +10 kişi ekler | Aile / Grup |

---

## 🚀 Faz Planlaması

### Faz 1 (MVP - Production)
- EPIC 1: Dil, Hesap ve Güvenli Oturum
- EPIC 2: Ana Sayfa ve Navigasyon
- EPIC 3: Abonelik ve Kişi Yönetimi
- **EPIC 4: İçerik Keşfi ve Katalog** *(Güncellendi)*
- **EPIC 5: Okuma Deneyimi** *(Güncellendi)*
- EPIC 6: Gelişim ve Raporlama
- **EPIC 7: e-Kitap Okuyucu** *(Yeni)*
- **EPIC 8: Atölye Deneyimi** *(Yeni)*
- EPIC 9: Favoriler ve Arşiv
- EPIC 10: Erişilebilirlik
- EPIC 11: Modül ve Paket Sistemi *(Eski EPIC 20)*

### Faz 2 (Geliştirme)
- EPIC 12: Koç Paneli
- EPIC 13: Birlikte Okuma
- EPIC 14: Kitap Kulübü
- EPIC 15: Oyunlaştırma
- EPIC 16: AI Asistan (RAG Tabanlı)
- EPIC 17: Hatırlatıcılar ve Bildirimler
- EPIC 18: Video İçerikler

---

# EPIC 1: Dil, Hesap ve Güvenli Oturum

**Faz:** 1 (MVP)  
**Açıklama:** Kullanıcı hesap yönetimi, oturum güvenliği ve dil tercihleri

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.1 Dil Seçimi | Danışan olarak, uygulamayı açtığımda TR/EN/ES dillerinden birini seçebilmek istiyorum, böylece içerikleri tercih ettiğim dilde takip edebileyim. | • Dil listesinden seçim yapıldığında profile kaydedilir<br>• Tüm statik metinler seçilen dilde görüntülenir<br>• Ayarlar > Dil'den değiştirilebilir<br>• Çevrimdışı da saklanır ve senkronlanır | Onboarding → Dil Seçimi veya Profil → Ayarlar → Dil |
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.2 Kayıt Olma | Danışan olarak, e-posta veya telefon numaram ile kayıt olabilmek istiyorum, böylece hesabımı güvenli şekilde oluşturabileyim. | • Geçerli format kontrolü yapılır<br>• OTP doğrulama ile hesap oluşturulur<br>• Yanlış kod girildiğinde kalan deneme gösterilir<br>• Mevcut hesap kontrolü yapılır | Giriş Ekranı → Kayıt Ol → Doğrulama |
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.3 Giriş Yapma | Danışan olarak, e-posta/telefon ve şifrem ile giriş yapmak istiyorum, böylece hesabıma erişebileyim. | • Doğru bilgilerle ana sayfaya yönlendirilir<br>• Hatalı girişte güvenli hata mesajı gösterilir<br>• Üst üste başarısız denemede geçici kilit uygulanır<br>• Abonelik durumu ve rol senkronlanır | Giriş Ekranı → Ana Sayfa |
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.4 Şifre Sıfırlama | Danışan olarak, şifremi unuttuğumda sıfırlayabilmek istiyorum, böylece hesabıma tekrar erişebileyim. | • E-posta/telefon doğrulama akışı başlar<br>• Yeni şifre politikalarına uygunluk kontrol edilir<br>• Başarılı sıfırlamada giriş ekranına yönlendirilir | Giriş Ekranı → Şifremi Unuttum → Doğrulama → Yeni Şifre |
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.5 Oturum Yönetimi (Çıkış) | Danışan olarak, hesabımdan çıkış yapabilmek istiyorum, böylece cihazımı başkaları kullanırken hesabım güvende olsun. | • Çıkış yapıldığında oturum sonlandırılır<br>• Hassas veriler (token'lar) temizlenir<br>• Korumalı alanlar için tekrar giriş gerekir | Profil → Ayarlar → Çıkış Yap |
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.6 Oturum Süresi ve Güvenlik | Danışan olarak, oturumum güvenli şekilde yönetilsin istiyorum, böylece hesabım kötüye kullanılmasın. | • Oturum süresi dolduğunda bilgilendirme yapılır<br>• Arka planda uzun süre kalınca yeniden doğrulama istenir<br>• Geçersiz oturumda giriş ekranına yönlendirilir | Otomatik - Tüm ekranlar |
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.7 Abonelik ve Rol Doğrulama | Danışan olarak, giriş yaptıktan sonra abonelik durumum ve rolümün doğru algılanmasını istiyorum. | • Abonelik durumu güncellenir (aktif/iptal/deneme)<br>• Plan Sahibi/Üye rolü doğru atanır<br>• Erişim kısıtlamaları role göre uygulanır | Giriş → Ana Sayfa (otomatik) |
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.8 FaceID ile Giriş | Danışan olarak, FaceID ile giriş yapabilmek istiyorum, böylece hızlı ve güvenli erişim sağlayabileyim. | • FaceID destekli cihazlarda biyometrik giriş seçeneği sunulur<br>• İlk girişte açık onay alınır (opt-in)<br>• Biyometrik doğrulama başarısızsa şifre ile girişe düşer<br>• FaceID kapatma/açma ayarı Profil > Ayarlar'da bulunur | Giriş Ekranı → FaceID veya Profil → Ayarlar → FaceID |
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.9 Demografi Bilgisi Toplama | Danışan olarak, yeni bir yolculuk/modül/e-kitap/atölyeye başlamadan önce yaş, cinsiyet ve ülke bilgilerimin sorulmasını ve kaydedilmesini istiyorum, böylece profilim tamamlanmış olsun. | • İlk kez içerik başlatmadan önce yaş/cinsiyet/ülke formu açılır<br>• Bilgiler kaydedilmeden içerik başlatılamaz<br>• Yaş alanı zorunlu ve 13-120 aralığında doğrulanır<br>• Cinsiyet alanı opsiyoneldir: Kadın/Erkek/Belirtmek istemiyorum<br>• Ülke alanı zorunlu ve arama ile seçilebilir<br>• Bilgiler profilimde görüntülenir ve güncellenebilir<br>• Daha önce kaydedilmişse tekrar sorulmaz | İçerik Başlat → Demografi Formu → İçerik |
| EPIC 1 | Faz 1 | Genel Kullanıcı | US-1.10 Misafir Giriş (Kayıtsız) | Danışan olarak, kayıt olmadan uygulamaya girebilmek istiyorum, böylece içerikleri inceleyip karar verebileyim. | • Misafir oturumu başlatılır ve profil oluşturulmaz<br>• Keşfet ve detay ekranları erişilebilir olur<br>• İçerik başlatma/okuma aksiyonlarında kayıt zorunlu tutulur<br>• Kayıt sonrası misafir verileri kullanıcıya devredilir | Giriş Ekranı → Misafir Devam Et |

---

# EPIC 2: Ana Sayfa ve Navigasyon

**Faz:** 1 (MVP)  
**Açıklama:** Ana akış, günlük odak ve akıllı yönlendirme

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 2 | Faz 1 | Danışan | US-2.1 Bugün Özeti ve Ana CTA | Danışan olarak, ana ekranda bugünkü görev özetini ve tek bir "Devam Et" çağrısını görmek istiyorum; böylece kaybolmadan bir sonraki en doğru adıma gidebileyim. | • Bugün kartında hedef, kalan süre (23:59) ve Devam Et CTA görünür<br>• Devam Et ile kaldığım adıma (yolculuk/atölye/e-kitap) yönlendirilirim<br>• Çevrimdışı son bilinen özet gösterilir | Tab Bar → Ana Sayfa |
| EPIC 2 | Faz 1 | Danışan | US-2.2 Abonelik Durumu Rozetleri | Danışan olarak, ana ekranda aboneliğimin durumunu ve erişimlerimi net görmek istiyorum. | • Plan durumu rozet olarak gösterilir (Aktif/Deneme/İptal)<br>• Add-on durumları görünür<br>• Kısıtlı içeriğe tıklandığında neden açıklanır | Tab Bar → Ana Sayfa |
| EPIC 2 | Faz 1 | Danışan | US-2.3 İçerik Alanları Navigasyonu | Danışan olarak, ana sayfada farklı içerik alanlarına (Yolculuklar, Atölyeler, e-Kitaplar, Koçluk Okulu) net navigasyon görmek istiyorum. | • İçerik türleri için ayrı giriş kartları gösterilir<br>• Tek dokunuşla ilgili kataloğa gidilir<br>• Erişim kısıtlıysa paywall gösterilir | Tab Bar → Ana Sayfa → İçerik Kartları |
| EPIC 2 | Faz 1 | Danışan | US-2.4 "Vicdandan Karaktere" Bilgilendirmesi | Danışan olarak, ana sayfada programın dayandığı yaklaşımı hızlıca anlayabilmek istiyorum. | • Kısa özet metin görünür<br>• "Detayları Gör" ile detay sayfasına gidilir<br>• Çevrimdışı cache'den gösterilir | Tab Bar → Ana Sayfa → Vicdandan Karaktere Kartı |
| EPIC 2 | Faz 1 | Danışan | US-2.5 Hızlı Arama | Danışan olarak, ana sayfadan tüm içerikler (yolculuk/atölye/modül/e-kitap) içinde arama yapmak istiyorum. | • Arama alanına dokunulunca arama ekranı açılır<br>• Sonuçlar içerik türüne göre kategorize edilir<br>• Sonuç bulunamazsa öneriler gösterilir | Tab Bar → Ana Sayfa → Arama |
| EPIC 2 | Faz 1 | Danışan | US-2.6 Aktif İçeriklerim Özeti | Danışan olarak, ana ekranda aktif yolculuklarım, atölyelerim ve okuduğum e-kitapların kısa özetini görmek istiyorum. | • En fazla 3 aktif içerik kartı gösterilir<br>• "Tümünü Gör" ile Kütüphane'ye gidilir<br>• İlerleme yüzdesi ve kilitli içerikler etiketlenir | Tab Bar → Ana Sayfa → Aktif İçeriklerim |
| EPIC 2 | Faz 1 | Danışan | US-2.7 Günlük Hatırlatıcı | Danışan olarak, günlük okuma/yazma için hatırlatıcılar almak istiyorum. | • Bildirim izni alınmadan önce açıklama gösterilir<br>• Varsayılan saat 20:00'de hatırlatma gönderilir<br>• Yorum gönderildiğinde tekrar hatırlatma yapılmaz | Profil → Ayarlar → Hatırlatıcılar |
| EPIC 2 | Faz 1 | Danışan | US-2.8 Ana Akış Performansı | Danışan olarak, ana ekranın hızlı açılmasını istiyorum. | • Skeleton yükleme kullanılır<br>• Kritik kartlar önce gösterilir<br>• Hata durumunda kart bazlı tekrar dene sunulur | Tab Bar → Ana Sayfa |

---

# EPIC 3: Abonelik ve Kişi Yönetimi

**Faz:** 1 (MVP)  
**Açıklama:** Plan satın alma, Add-on yönetimi, kişi (seat) yönetimi

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 3 | Faz 1 | Danışan | US-3.1 Plan Seçimi ve Karşılaştırma | Danışan olarak, Bireysel/Aile/Grup planlarını karşılaştırıp seçmek istiyorum; böylece içeriğe erişimimi doğru planla başlatabileyim. | • Planlar kişi limitleriyle listelenir (1/5/10)<br>• Tüm içerik türlerine erişim vurgulanır<br>• Seçilen plan vurgulanır<br>• "Devam Et" butonu aktif olur | Profil → Abonelik → Plan Seç |
| EPIC 3 | Faz 1 | Danışan | US-3.2 Satın Alma ve Aktivasyon | Danışan olarak, seçtiğim planı satın alıp hemen erişimin aktif olmasını istiyorum. | • Platform (Apple/Google) satın alma akışı açılır<br>• Server-side doğrulama yapılır<br>• Erişim (entitlement) hemen aktif olur<br>• Başka cihazda giriş yapınca senkronlanır | Plan Seçimi → Ödeme → Aktivasyon |
| EPIC 3 | Faz 1 | Plan Sahibi | US-3.3 Add-on Yönetimi | Plan sahibi olarak, AI Paketi, Koçluk Eğitimi ve Ek Kişi add-on'larını yönetmek istiyorum. | • Add-on'lar fiyat ve durumla listelenir<br>• Aktifleştirme/kapatma işlemleri yapılabilir<br>• Ek kişi add-on'u sadece Aile/Grup için geçerli<br>• Plan Üyesi satın alma yapamaz | Profil → Abonelik → Add-on'lar |
| EPIC 3 | Faz 1 | Danışan | US-3.4 Öğrenci İndirimi (%50) | Danışan olarak, öğrenci olduğumu doğrulayıp %50 indirim kullanmak istiyorum. | • Doğrulama yöntemleri sunulur (e-posta/belge)<br>• Başarılı doğrulamada indirim uygulanır<br>• Gizlilik açıklaması gösterilir<br>• Yıllık yeniden doğrulama gerekir | Plan Seçimi → Öğrenciyim → Doğrulama |
| EPIC 3 | Faz 1 | Plan Sahibi | US-3.5 Planı Yönetme (Değiştir/İptal) | Plan sahibi olarak, planımı değiştirmek veya iptal etmek istiyorum. | • Mevcut plan, yenileme tarihi, doluluk görünür<br>• Düşürmede kişi sayısı azaltılması istenir<br>• Platform kurallarına uygun yönlendirme yapılır | Profil → Abonelik → Planı Yönet |
| EPIC 3 | Faz 1 | Plan Sahibi | US-3.6 Kişi Yönetimi (Aile/Grup) | Plan sahibi olarak, kişi sayısını yönetmek istiyorum; böylece erişimi kontrol edebileyim. | • Doluluk durumu gösterilir (3/5 dolu)<br>• Davet gönderme ve kaldırma yapılabilir<br>• Limit doluysa Add-on önerilir<br>• Plan Üyesi sadece kendi durumunu görür | Profil → Abonelik → Kişi Yönetimi |
| EPIC 3 | Faz 1 | Danışan | US-3.7 Ödeme Geçmişi ve Geri Yükleme | Danışan olarak, ödeme geçmişimi görmek ve satın alımlarımı geri yüklemek istiyorum. | • Son ödemeler listelenir<br>• "Satın Alımları Geri Yükle" ile erişim doğrulanır<br>• Makbuz detayı görüntülenebilir | Profil → Abonelik → Ödemeler |
| EPIC 3 | Faz 1 | Plan Sahibi | US-3.8 Abonelik İptali | Plan sahibi olarak, aboneliğimi iptal edebilmek ve etkileri görmek istiyorum. | • İptal etkileri net listelenir (tüm içeriklere erişim kaybı)<br>• Dönem sonuna kadar erişim devam eder<br>• Platform iptal akışına yönlendirilir | Profil → Abonelik → Aboneliği İptal Et |

---

# EPIC 4: İçerik Keşfi ve Katalog

**Faz:** 1 (MVP)  
**Açıklama:** Yolculuk, Atölye, Modül ve e-Kitap keşfi, asistan ve katalog

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 4 | Faz 1 | Danışan | US-4.1 Keşfet Ana Ekranı | Danışan olarak, tüm içerik türlerini keşfetmek için merkezi bir ekran görmek istiyorum. | • İçerik türleri tab/segment olarak görünür (Yolculuklar/Atölyeler/Modüller/e-Kitaplar)<br>• İçerik Asistanı birincil CTA olarak görünür<br>• Erişim kısıtlıysa paywall gösterilir | Tab Bar → Keşfet |
| EPIC 4 | Faz 1 | Danışan | US-4.2 İçerik Belirleme Asistanı | Danışan olarak, birkaç soruyla bana uygun içerik önerisi almak istiyorum; böylece doğru içerikten başlayabileyim. | • Hedef, süre ve tercih sorularıyla akış başlar<br>• İçerik türü önerisi yapılır (yolculuk/atölye/e-kitap)<br>• 1 ana + 2 alternatif öneri listelenir<br>• "Atla" ile kataloğa gidilebilir | Tab Bar → Keşfet → Asistanla Başla |
| EPIC 4 | Faz 1 | Danışan | US-4.3 Yolculuk Kataloğu | Danışan olarak, tüm hazır yolculukları filtreleyip sıralamak istiyorum. | • Yolculuklar kart halinde listelenir (süre/seviye/içerik sayısı)<br>• Hedef/süre/seviye filtreleri vardır<br>• Önerilen/Popüler/Yeni sıralaması yapılabilir<br>• İçerdiği modül/atölye/e-kitap sayısı görünür | Tab Bar → Keşfet → Yolculuklar |
| EPIC 4 | Faz 1 | Danışan | US-4.4 Yolculuk Detayı | Danışan olarak, bir yolculuğun detayını görüp başlamaya karar vermek istiyorum. | • Açıklama, süre, günlük hedef aralığı görünür<br>• İçerdiği modüller, atölyeler ve e-kitaplar listelenir<br>• "Yolculuğu Başlat" CTA'sı vardır<br>• Favorilere eklenebilir | Keşfet → Yolculuklar → Yolculuk Kartı → Detay |
| EPIC 4 | Faz 1 | Danışan | US-4.5 Atölye Kataloğu | Danışan olarak, tüm atölyeleri görmek ve filtrelemek istiyorum. | • Atölyeler kart halinde listelenir (süre/konu)<br>• Konu bazlı filtreleme yapılabilir<br>• Her atölyenin içerdiği okuma ve uygulama sayısı görünür | Tab Bar → Keşfet → Atölyeler |
| EPIC 4 | Faz 1 | Danışan | US-4.6 Atölye Detayı | Danışan olarak, bir atölyenin detayını görüp başlamaya karar vermek istiyorum. | • Atölye açıklaması ve amaçları görünür<br>• İçerdiği okumalar ve uygulamalar listelenir<br>• "Atölyeyi Başlat" CTA'sı vardır<br>• Bağlı olduğu yolculuk varsa gösterilir | Keşfet → Atölyeler → Atölye Kartı → Detay |
| EPIC 4 | Faz 1 | Danışan | US-4.7 Modül Kataloğu | Danışan olarak, tüm modülleri ve paketlerini görmek istiyorum. | • Modüller kart halinde listelenir<br>• Her modülün içerdiği paketler görünür<br>• Konu bazlı filtreleme yapılabilir | Tab Bar → Keşfet → Modüller |
| EPIC 4 | Faz 1 | Danışan | US-4.8 Modül Detayı | Danışan olarak, bir modülün detayını ve paketlerini görmek istiyorum. | • Modül açıklaması görünür<br>• Paketler sıralı listelenir<br>• Her paketin kısa açıklaması ve süresi görünür<br>• "Modülü Başlat" CTA'sı vardır | Keşfet → Modüller → Modül Kartı → Detay |
| EPIC 4 | Faz 1 | Danışan | US-4.9 e-Kitap Kataloğu | Danışan olarak, tüm e-kitapları görmek ve filtrelemek istiyorum. | • e-Kitaplar kapak görseli ile listelenir<br>• Kategori/konu bazlı filtreleme yapılabilir<br>• Sayfa sayısı ve tahmini okuma süresi görünür | Tab Bar → Keşfet → e-Kitaplar |
| EPIC 4 | Faz 1 | Danışan | US-4.10 e-Kitap Detayı | Danışan olarak, bir e-kitabın detayını görüp okumaya başlamak istiyorum. | • Kitap açıklaması, yazar ve kategori görünür<br>• İçindekiler bölümü listelenir<br>• "Okumaya Başla" CTA'sı vardır<br>• Bağlı olduğu yolculuk varsa gösterilir | Keşfet → e-Kitaplar → Kitap Kartı → Detay |
| EPIC 4 | Faz 1 | Danışan | US-4.11 İçerik Başlatma | Danışan olarak, herhangi bir içeriği (yolculuk/atölye/modül/e-kitap) başlatırken hedefimi ve kuralları görmek istiyorum. | • Günlük hedef seçenekleri sunulur<br>• Zaman kuralları gösterilir (08:00 yeni gün, 23:59 teslim)<br>• Demografi bilgisi (yaş/cinsiyet/ülke) yoksa form açılır ve kaydedilmeden içerik başlatılmaz<br>• "Başla" ile içerik aktif olur<br>• Hatırlatıcı ayarlanabilir | İçerik Detayı → Başlat → Hedef Seçimi |
| EPIC 4 | Faz 1 | Danışan | US-4.12 Misafir Görüntüleme ve Kayıt Zorunluluğu | Danışan olarak, kayıt olmadan içerikleri inceleyip okumaya başlamadan önce kayıt olmamın istenmesini istiyorum. | • Misafir kullanıcı katalog ve detay ekranlarını görebilir (yolculuk/modül/atölye/e-kitap)<br>• Ücretsiz içerikler "Free" etiketiyle işaretlenir<br>• "Başlat/Okumaya Başla" aksiyonunda kayıt ekranına yönlendirilir<br>• Kayıt sonrası ücretsiz içerikler paywall olmadan açılır | Keşfet → İçerik Detayı → Başlat |
| EPIC 4 | Faz 1 | Danışan | US-4.13 Yolculuğa Başlamadan Önce Demografi | Danışan olarak, yeni bir yolculuğa başlamadan önce yaş/cinsiyet/ülke bilgilerimin sorulmasını istiyorum. | • Yolculuğu Başlat CTA'sında demografi bilgisi yoksa form açılır<br>• Form kaydedilmeden yolculuk başlatılmaz<br>• Kaydedildikten sonra yolculuk otomatik başlar<br>• Daha önce kaydedilmişse akış atlanır | Yolculuk Detayı → Başlat → Demografi Formu → İçerik |
| EPIC 4 | Faz 1 | Danışan | US-4.14 Modüle Başlamadan Önce Demografi | Danışan olarak, yeni bir modüle başlamadan önce yaş/cinsiyet/ülke bilgilerimin sorulmasını istiyorum. | • Modülü Başlat CTA'sında demografi bilgisi yoksa form açılır<br>• Form kaydedilmeden modül başlatılmaz<br>• Kaydedildikten sonra modül otomatik başlar<br>• Daha önce kaydedilmişse akış atlanır | Modül Detayı → Başlat → Demografi Formu → İçerik |
| EPIC 4 | Faz 1 | Danışan | US-4.15 e-Kitaba Başlamadan Önce Demografi | Danışan olarak, yeni bir e-kitabı okumaya başlamadan önce yaş/cinsiyet/ülke bilgilerimin sorulmasını istiyorum. | • Okumaya Başla CTA'sında demografi bilgisi yoksa form açılır<br>• Form kaydedilmeden e-kitap okunmaya başlanmaz<br>• Kaydedildikten sonra okuyucu otomatik açılır<br>• Daha önce kaydedilmişse akış atlanır | e-Kitap Detayı → Okumaya Başla → Demografi Formu → Okuyucu |
| EPIC 4 | Faz 1 | Danışan | US-4.16 Atölyeye Başlamadan Önce Demografi | Danışan olarak, yeni bir atölyeye başlamadan önce yaş/cinsiyet/ülke bilgilerimin sorulmasını istiyorum. | • Atölyeyi Başlat CTA'sında demografi bilgisi yoksa form açılır<br>• Form kaydedilmeden atölye başlatılmaz<br>• Kaydedildikten sonra atölye otomatik başlar<br>• Daha önce kaydedilmişse akış atlanır | Atölye Detayı → Başlat → Demografi Formu → İçerik |
| EPIC 4 | Faz 1 | Danışan | US-4.17 İlk Yolculukta DDL Testi | Danışan olarak, ilk kez bir yolculuğa başlamadan önce DDL testini yapmak ve sonuçlarımın kaydedilmesini istiyorum. | • İlk yolculuk başlatma denemesinde DDL testi açılır<br>• Test tamamlanmadan yolculuk başlatılamaz<br>• Test sonuçları kullanıcı profiline kaydedilir ve güncellenebilir<br>• Test tamamlanma tarihi saklanır<br>• Analytics event'leri: ddl_test_started, ddl_test_completed, ddl_test_abandoned<br>• Daha önce tamamlandıysa tekrar istenmez | Yolculuk Detayı → Başlat → DDL Testi → İçerik |

---

# EPIC 5: Okuma Deneyimi

**Faz:** 1 (MVP)  
**Açıklama:** Yolculuk, Atölye ve Modül içindeki okuma ve yorum deneyimi

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 5 | Faz 1 | Danışan | US-5.1 Günün İçeriğini Okuma | Danışan olarak, günün metnini (yolculuk/atölye/modül) rahat okuyup ilerlememi görmek istiyorum. | • Gün/bölüm numarası, hedef ve son teslim (23:59) görünür<br>• Okuma ilerleme göstergesi güncellenir<br>• Çevrimdışı skeleton + tekrar dene gösterilir<br>• Erişilebilirlik ayarlarına uyum sağlanır | Ana Sayfa → Devam Et veya Kütüphane → Aktif İçerik → Günün Notu |
| EPIC 5 | Faz 1 | Danışan | US-5.2 Sesli Okuma | Danışan olarak, metni sesli dinleyip metinle senkron takip etmek istiyorum. | • Oynatma kontrolleri (play/pause, hız) görünür<br>• Şu an okunan bölüm vurgulanır<br>• Hız ayarı (0.75×/1×/1.25×) anında uygulanır<br>• Arka planda platform kurallarına uygun davranır | Okuma Ekranı → Sesli Okuma |
| EPIC 5 | Faz 1 | Danışan | US-5.3 Altını Çizme ve Not Alma | Danışan olarak, metinde önemli yerlerin altını çizip not almak istiyorum. | • Metin seçildiğinde "Vurgu/Not/Kaydet" araçları görünür<br>• Not kalıcı olarak saklanır<br>• Notlar otomatik kaydedilir (taslak korunur)<br>• Favorilere eklenebilir<br>• İçerik kaynağı ile ilişkilendirilir | Okuma Ekranı → Metin Seç → Araçlar |
| EPIC 5 | Faz 1 | Danışan | US-5.4 Yorum Yazma | Danışan olarak, yönlendirici sorularla yorumumu yazmak istiyorum; böylece öğrenimimi netleştirebileyim. | • İçeriğe özel yönlendirici sorular görünür<br>• Taslak otomatik kaydedilir<br>• Kelime sayacı görünür<br>• 23:00 sonrası nazik uyarı gösterilir | Okuma Ekranı → Yorum Yaz |
| EPIC 5 | Faz 1 | Danışan | US-5.5 Önizleme ve Teslim | Danışan olarak, yorumumu teslim etmeden önce önizleyip doğru şekilde teslim etmek istiyorum. | • Cevaplar özet halinde gösterilir<br>• 23:59'dan önce "Teslim Et" aktif olur<br>• Teslim sonrası yorum kilitlenir<br>• 23:59 sonrası kural davranışı gösterilir | Yorum Yaz → Önizle & Teslim Et |
| EPIC 5 | Faz 1 | Danışan | US-5.6 Kilitli İlerleme (08:00 Kuralı) | Danışan olarak, bugünü bitirdiğimde bir sonraki günün 08:00'de açılmasını istiyorum. | • "Bugün tamamlandı" durumu görünür<br>• Yarınki içerik kilitli gösterilir<br>• "Yeni içerik 08:00'de açılacak" mesajı ve geri sayım gösterilir<br>• 08:00 olunca otomatik aktif olur | Kütüphane → Aktif İçerik |
| EPIC 5 | Faz 1 | Danışan | US-5.7 Uygulama/Egzersiz Tamamlama | Danışan olarak, atölye veya modül içindeki uygulamaları/egzersizleri tamamlamak istiyorum. | • Uygulama adımları sıralı gösterilir<br>• Her adım tamamlandığında işaretlenir<br>• Tüm adımlar tamamlanınca ilerleme kaydedilir<br>• "Sonraki" ile devam edilir | Okuma Ekranı → Uygulama → Adımlar |

---

# EPIC 6: Gelişim ve Raporlama

**Faz:** 1 (MVP)  
**Açıklama:** İlerleme grafikleri, duygusal harita ve program değerlendirmesi

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 6 | Faz 1 | Danışan | US-6.1 Gelişim Paneli | Danışan olarak, tüm içerikler genelinde ilerlememi grafiklerle ve özet metriklerle görmek istiyorum. | • İçerik türü bazlı ilerleme (yolculuk/atölye/modül/e-kitap)<br>• Teslim oranı ve alışkanlık zinciri görünür<br>• Grafik özet metni ekran okuyucuya sunulur | Tab Bar → Gelişim |
| EPIC 6 | Faz 1 | Danışan | US-6.2 Duygusal Harita | Danışan olarak, yorumlarımdan türetilen duygusal haritayı görmek istiyorum. | • Son 14/30 gün görünümü seçilebilir<br>• Legend açıklaması (Sakin/Netlik/Gergin) gösterilir<br>• "Teşhis değildir" uyarısı yer alır<br>• Renk körlüğü için ikon/desen desteği sağlanır | Gelişim → Duygusal Harita |
| EPIC 6 | Faz 1 | Danışan | US-6.3 Güçlü ve Gelişim Alanları | Danışan olarak, güçlü olduğum alanları ve geliştirmem gereken alanları görmek istiyorum. | • Güçlü ve gelişim alanları ayrı kartlarda listelenir<br>• Somut öneriler sunulur (ilgili içerik önerileri)<br>• "Önerileri Uygula" aksiyonu vardır | Gelişim → Alanlarım |
| EPIC 6 | Faz 1 | Danışan | US-6.4 Haftalık Özet | Danışan olarak, haftalık özetimi ve renkli geri bildirimleri görmek istiyorum. | • Pozitif trend, zorlayan alan ve öneri görünür<br>• Tamamlanan içerikler listelenir<br>• Veri yoksa açıklama yapılır | Gelişim → Haftalık Özet |
| EPIC 6 | Faz 1 | Danışan | US-6.5 İçerik Bitiş Değerlendirmesi | Danışan olarak, herhangi bir içeriği (yolculuk/atölye/modül) bitirince kısa bir değerlendirme doldurmak istiyorum. | • İçerik kapanışında değerlendirme önerilir<br>• "Daha sonra" ile ertelenebilir<br>• Yanıtlar kaydedilir<br>• Sonraki içerik önerisi sunulur | İçerik Tamamlandı → Değerlendirme |
| EPIC 6 | Faz 1 | Danışan | US-6.6 Gelişim Raporu (İndir/Paylaş) | Danışan olarak, gelişim raporumu indirip paylaşmak istiyorum. | • Özet metrikler, temalar ve öneriler görünür<br>• PDF olarak indirilebilir<br>• Paylaşım öncesi gizlilik onayı gösterilir | Gelişim → Rapor İndir |

---

# EPIC 7: e-Kitap Okuyucu

**Faz:** 1 (MVP)  
**Açıklama:** e-Kitap okuma deneyimi, sayfa takibi ve notlar

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 7 | Faz 1 | Danışan | US-7.1 e-Kitap Okuyucu Açılışı | Danışan olarak, e-kitabı açtığımda kaldığım sayfadan devam etmek istiyorum. | • Son okunan sayfa otomatik açılır<br>• Kitap başlığı ve mevcut sayfa/toplam sayfa görünür<br>• İçindekiler erişilebilir<br>• Çevrimdışı okuma desteklenir | Kütüphane → e-Kitaplarım → Kitap → Okuyucu |
| EPIC 7 | Faz 1 | Danışan | US-7.2 Sayfa Navigasyonu | Danışan olarak, e-kitap içinde rahatça gezinmek istiyorum. | • Kaydırma/sayfa çevirme ile gezinme<br>• Sayfa numarasına atlama<br>• İçindekiler'den bölüme atlama<br>• İlerleme çubuğu görünür | Okuyucu → Navigasyon |
| EPIC 7 | Faz 1 | Danışan | US-7.3 Okuma Ayarları | Danışan olarak, e-kitap okuma deneyimimi özelleştirmek istiyorum. | • Font boyutu ayarlanabilir<br>• Arka plan rengi seçilebilir (Beyaz/Sepia/Koyu)<br>• Satır aralığı ayarlanabilir<br>• Ayarlar kitaplar arası saklanır | Okuyucu → Ayarlar |
| EPIC 7 | Faz 1 | Danışan | US-7.4 Metin Vurgulama ve Not | Danışan olarak, e-kitapta önemli yerleri vurgulamak ve not almak istiyorum. | • Metin seçildiğinde renk seçenekleri görünür<br>• Not eklenebilir<br>• Vurgular ve notlar otomatik kaydedilir (taslak korunur)<br>• Favorilere eklenebilir | Okuyucu → Metin Seç → Vurgula/Not |
| EPIC 7 | Faz 1 | Danışan | US-7.5 Vurgularım ve Notlarım | Danışan olarak, bu kitaptaki tüm vurgularımı ve notlarımı görmek istiyorum. | • Kitaba özel vurgu/not listesi görünür<br>• Dokunarak ilgili sayfaya gidilir<br>• Not düzenlenebilir<br>• Dışa aktarılabilir | Okuyucu → Vurgularım |
| EPIC 7 | Faz 1 | Danışan | US-7.6 Sesli Kitap Desteği | Danışan olarak, e-kitabı sesli dinlemek istiyorum. | • Sesli versiyon varsa Play butonu görünür<br>• Metin ile senkron takip edilir<br>• Hız ayarlanabilir<br>• Arka planda çalabilir | Okuyucu → Sesli Dinle |
| EPIC 7 | Faz 1 | Danışan | US-7.7 Okuma İlerlemesi | Danışan olarak, e-kitap okuma ilerlememi görmek istiyorum. | • İlerleme yüzdesi görünür<br>• Tahmini kalan süre hesaplanır<br>• Tamamlandığında rozet/sertifika sunulur<br>• Gelişim paneline yansır | Okuyucu → İlerleme veya Kütüphane → Kitap Kartı |
| EPIC 7 | Faz 1 | Danışan | US-7.8 Çevrimdışı İndirme | Danışan olarak, e-kitabı indirip çevrimdışı okumak istiyorum. | • İndirme butonu görünür<br>• İndirme durumu gösterilir<br>• Depolama uyarısı yapılır<br>• İndirilen kitaplar işaretlenir | e-Kitap Detayı → İndir |

---

# EPIC 8: Atölye Deneyimi

**Faz:** 1 (MVP)  
**Açıklama:** Atölye içi okuma, uygulama ve tamamlama deneyimi

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 8 | Faz 1 | Danışan | US-8.1 Atölye Ana Ekranı | Danışan olarak, aktif atölyemin genel durumunu ve bir sonraki adımı görmek istiyorum. | • Atölye adı ve ilerleme yüzdesi görünür<br>• Tamamlanan/kalan bölümler listelenir<br>• "Devam Et" CTA'sı ile sonraki adıma gidilir<br>• Kilitli bölümler işaretlenir | Kütüphane → Atölyelerim → Atölye |
| EPIC 8 | Faz 1 | Danışan | US-8.2 Atölye Okuma Bölümü | Danışan olarak, atölyenin okuma bölümlerini tamamlamak istiyorum. | • Okuma metni tam ekran gösterilir<br>• Vurgulama ve not alma desteklenir<br>• Sesli okuma seçeneği vardır<br>• Tamamlandığında bir sonraki bölüme geçiş sunulur | Atölye → Okuma Bölümü |
| EPIC 8 | Faz 1 | Danışan | US-8.3 Atölye Uygulama Bölümü | Danışan olarak, atölyenin uygulama/egzersiz bölümlerini tamamlamak istiyorum. | • Uygulama talimatları net görünür<br>• Adımlar sıralı listelenir<br>• Her adım tamamlandığında işaretlenir<br>• Yorum/cevap alanları interaktif ve otomatik kaydedilir<br>• Kesinti durumlarında taslak korunur | Atölye → Uygulama Bölümü |
| EPIC 8 | Faz 1 | Danışan | US-8.4 Atölye Yorum ve Değerlendirme | Danışan olarak, atölye bölümü sonunda yorumumu yazmak istiyorum. | • Bölüme özel yönlendirici sorular görünür<br>• Taslak otomatik kaydedilir<br>• Otomatik kaydetme kesinti durumlarında taslağı korur<br>• Teslim ile bölüm tamamlanır<br>• 23:59 kuralı uygulanır | Uygulama Bölümü → Yorum Yaz |
| EPIC 8 | Faz 1 | Danışan | US-8.5 Atölye İlerleme Takibi | Danışan olarak, atölyedeki ilerlememi detaylı görmek istiyorum. | • Tamamlanan/kalan bölümler görünür<br>• Her bölümün durumu (tamamlandı/devam/kilitli) gösterilir<br>• Tahmini tamamlanma süresi hesaplanır | Atölye → İlerleme |
| EPIC 8 | Faz 1 | Danışan | US-8.6 Atölye Tamamlama | Danışan olarak, atölyeyi tamamladığımda geri bildirim almak istiyorum. | • Tamamlanma mesajı gösterilir<br>• Özet istatistikler sunulur<br>• Sertifika/rozet verilir<br>• Sonraki içerik önerilir | Son Bölüm Tamamlandı → Tebrikler |

---

# EPIC 9: Favoriler ve Kişisel Arşiv

**Faz:** 1 (MVP)  
**Açıklama:** Kişisel arşiv, koleksiyonlar ve dışa aktarma

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 9 | Faz 1 | Danışan | US-9.1 Favoriler Ana Ekranı | Danışan olarak, tüm içerik türlerinden kaydettiklerimi tek ekranda görmek istiyorum. | • Öğeler kaynak türüyle etiketlenir (Yolculuk/Atölye/Modül/e-Kitap)<br>• Arama ve filtreleme yapılabilir<br>• Boş durum CTA'sı gösterilir | Tab Bar → Kütüphane → Favoriler |
| EPIC 9 | Faz 1 | Danışan | US-9.2 Favori Detayı | Danışan olarak, kaydettiğim vurguyu/notu detaylı görmek istiyorum. | • Kaynak bilgisi (kitap adı, atölye adı vb.) net görünür<br>• Not düzenlenebilir ve otomatik kaydedilir<br>• "Kaynağa Git" ile ilgili içeriğe yönlenilir | Favoriler → Favori Kartı → Detay |
| EPIC 9 | Faz 1 | Danışan | US-9.3 Koleksiyonlar | Danışan olarak, favorilerimi koleksiyonlara ayırmak istiyorum. | • Koleksiyon oluşturulabilir ve adlandırılabilir<br>• Favoriler koleksiyona eklenebilir<br>• Silme geri alınabilir (undo) | Favoriler → Koleksiyonlar |
| EPIC 9 | Faz 1 | Danışan | US-9.4 Arama ve Filtreleme | Danışan olarak, favoriler içinde hızlı arama yapmak istiyorum. | • Başlık, not içeriği ve kaynakta arama çalışır<br>• İçerik türü filtresi uygulanabilir<br>• "Temizle" ile filtreler sıfırlanır | Favoriler → Arama/Filtre |
| EPIC 9 | Faz 1 | Danışan | US-9.5 Paylaşım ve Dışa Aktarma | Danışan olarak, favorilerimi paylaşmadan önce kapsamı seçmek istiyorum. | • Gizlilik uyarısı gösterilir<br>• Kapsam seçilebilir (sadece vurgu/vurgu+not)<br>• PDF olarak aktarılabilir | Favoriler → Öğe → Paylaş |
| EPIC 9 | Faz 1 | Danışan | US-9.6 Çevrimdışı Erişim | Danışan olarak, favorilerimi çevrimdışı da görmek istiyorum. | • İndirilen içerikler çevrimdışı görüntülenir<br>• Bağlantı gelince otomatik senkronlanır<br>• Depolama uyarısı yapılır | Favoriler → İndir |

---

# EPIC 10: Erişilebilirlik ve Kapsayıcı Deneyim

**Faz:** 1 (MVP)  
**Açıklama:** Ekran okuyucu, metin büyütme, kontrast ve altyazı

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 10 | Faz 1 | Danışan | US-10.1 Erişilebilirlik Ayarları | Danışan olarak, erişilebilirlik ayarlarını tek ekrandan yönetmek istiyorum. | • Metin boyutu, yüksek kontrast, hareket azaltma seçenekleri görünür<br>• Ayarlar anında uygulanır ve kaydedilir<br>• Çevrimdışı da saklanır | Profil → Ayarlar → Erişilebilirlik |
| EPIC 10 | Faz 1 | Danışan | US-10.2 Metin Büyütme | Danışan olarak, metin boyutunu önizleme ile ayarlamak istiyorum. | • Kaydırıcı ile boyut değiştirilir<br>• Önizleme anlık güncellenir<br>• Tüm içerik türlerine uygulanır<br>• UI kırılmadan satır kaydırma korunur | Erişilebilirlik → Metin Boyutu |
| EPIC 10 | Faz 1 | Danışan | US-10.3 Yüksek Kontrast ve Tema | Danışan olarak, yüksek kontrast ve tema seçenekleriyle okumayı kolaylaştırmak istiyorum. | • Yüksek kontrast açıldığında metin/arka plan kontrastı artar<br>• Renk körlüğü için ikon/desen desteği sağlanır<br>• Açık/Koyu/Sistem tema seçilebilir | Erişilebilirlik → Kontrast & Tema |
| EPIC 10 | Faz 1 | Danışan | US-10.4 Ekran Okuyucu Uyumu | Danışan olarak, ekran okuyucu (VoiceOver/TalkBack) ile sorunsuz kullanmak istiyorum. | • Tüm butonlar anlamlı etiketle okunur<br>• Odak sırası doğru ilerler<br>• Form alanlarında label ve hata mesajları okunur<br>• İçerik metinleri düzgün okunur | Tüm ekranlar (otomatik) |

---

# EPIC 11: Modül ve Paket Sistemi

**Faz:** 1 (MVP)  
**Açıklama:** Modül içi paket yönetimi, kilitli ilerleme ve sertifika

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 11 | Faz 1 | Danışan | US-11.1 Modül Ana Ekranı | Danışan olarak, aktif modülümün genel durumunu ve paketlerini görmek istiyorum. | • Modül adı ve ilerleme yüzdesi görünür<br>• Paketler sıralı listelenir<br>• Her paketin durumu (tamamlandı/devam/kilitli) gösterilir | Kütüphane → Modüllerim → Modül |
| EPIC 11 | Faz 1 | Danışan | US-11.2 Paket Detayı ve Başlatma | Danışan olarak, bir paketin içeriğini görüp başlamak istiyorum. | • Paket açıklaması ve amaçları görünür<br>• İçerdiği bölümler listelenir<br>• "Paketi Başlat" CTA'sı vardır<br>• Önkoşul paket tamamlanmadıysa kilitli | Modül → Paket Kartı → Detay |
| EPIC 11 | Faz 1 | Danışan | US-11.3 Paket İçi Okuma | Danışan olarak, paket içindeki okumaları tamamlamak istiyorum. | • Okuma metni tam ekran gösterilir<br>• Vurgulama ve not alma desteklenir<br>• Tamamlandığında sonraki bölüme geçiş sunulur | Paket → Okuma Bölümü |
| EPIC 11 | Faz 1 | Danışan | US-11.4 Paket İçi Uygulama | Danışan olarak, paket içindeki uygulamaları tamamlamak istiyorum. | • Uygulama talimatları net görünür<br>• Adımlar sıralı listelenir<br>• Her adım tamamlandığında işaretlenir | Paket → Uygulama Bölümü |
| EPIC 11 | Faz 1 | Danışan | US-11.5 Kilitli İlerleme (Paket Seviyesi) | Danışan olarak, bir paketi tamamlamadan sonraki pakete geçememeyi istiyorum. | • Tamamlanmamış paket sonrası "kilitli" gösterilir<br>• Kilit nedeni açıklanır<br>• 08:00 kuralı varsa bilgi verilir | Modül → Kilitli Paket |
| EPIC 11 | Faz 1 | Danışan | US-11.6 Modül Tamamlama ve Sertifika | Danışan olarak, modülü tamamladığımda sertifika almak istiyorum. | • Tüm paketler tamamlanınca modül biter<br>• Sertifika/rozet sunulur<br>• Sonraki modül önerilir<br>• Gelişim paneline yansır | Modül Tamamlandı → Sertifika |

---

# FAZ 2 EPİC'LERİ (ÖZET)

## EPIC 12: Koç Paneli

| User Story | Açıklama | Navigasyon |
|------------|----------|------------|
| US-12.1 Danışan Listesi | Atanmış danışanları ve risk durumlarını görme | Koç Paneli → Danışanlar |
| US-12.2 Danışan Profili | Danışanın hedefi, içerik durumu ve metrikleri | Danışanlar → Profil |
| US-12.3 İçerik Takibi | Hangi yolculuk/atölye/e-kitap kullanıldığı | Danışan Profili → İçerikler |
| US-12.4 Koç Yorumu | Danışana geri bildirim gönderme | Danışan Profili → Yorum Yaz |

## EPIC 13-14: Birlikte Okuma ve Kitap Kulübü

| User Story | Açıklama | Navigasyon |
|------------|----------|------------|
| US-13.1 Birlikte Okuma Grupları | Grup oluşturma, materyal seçimi | Topluluk → Birlikte Okuma |
| US-13.2 Ortak İlerleme | Grup üyelerinin ilerlemesini görme | Grup Detayı → İlerleme |
| US-14.1 Kitap Kulübü | Kulüp oluşturma ve tartışma | Topluluk → Kitap Kulübü |

## EPIC 16: AI Asistan (RAG Tabanlı)

| User Story | Açıklama | Navigasyon |
|------------|----------|------------|
| US-16.1 AI Sohbet | **Sistem içeriklerine dayalı** AI sohbet | İçerik → AI Sohbet |
| US-16.2 İçerik Bazlı Cevaplar | AI'ın yolculuk/atölye/e-kitap içeriklerini kullanarak cevap vermesi | AI Sohbet → Cevap |
| US-16.3 Kaynak Gösterimi | AI cevaplarında kaynak içeriğin gösterilmesi | AI Cevabı → Kaynak |
| US-16.4 AI Analiz | Yorumlardan içgörü çıkarma | AI Merkezi → Analiz |

> **Önemli:** AI Asistan, cevaplarını **sadece sistem içindeki içerikleri (yolculuklar, atölyeler, modüller, e-kitaplar) kullanarak** üretmelidir. Bu RAG (Retrieval-Augmented Generation) yaklaşımı ile sağlanır.

---

## 📝 Notlar ve Gereksinimler

### Kritik İş Kuralları (Tüm Epic'lerde Geçerli)

1. **Yeni Gün Kuralı:** İçerik her gün saat 08:00'de aktif olur
2. **Teslim Kuralı:** Yorum teslimi en geç saat 23:59'a kadar yapılmalıdır
3. **Kilitli İlerleme:** Bir adım tamamlanmadan sonraki adıma geçilemez
4. **Server-side Doğrulama:** Tüm satın alma işlemleri sunucu tarafında doğrulanır
5. **Gizlilik Onayı:** Paylaşım ve dışa aktarma işlemlerinde kullanıcı onayı alınır

### İçerik Sunumu Gereksinimleri

| Gereksinim | Açıklama |
|------------|----------|
| **Tam Uygulama İçi Deneyim** | Tüm içerikler (okuma, uygulama, egzersiz) uygulama içinde sunulur. Harici dokümana gerek yoktur. |
| **Çevrimdışı Destek** | e-Kitaplar ve içerikler indirilebilir, çevrimdışı erişilebilir |
| **İçerik Türü Farkındalığı** | Sistem, kullanıcının hangi içerik türünden faydalandığını takip eder |
| **Kişiselleştirilmiş Öneri** | Doğru kişiye doğru içeriği sunmak için akıllı öneri sistemi |

### AI Gereksinimleri (Faz 2)

| Gereksinim | Açıklama |
|------------|----------|
| **RAG Tabanlı Cevaplar** | AI, cevaplarını sistem içindeki içerikleri kullanarak üretir |
| **Kaynak Referansı** | AI cevaplarında kullanılan kaynak içerik gösterilir |
| **İçerik Sınırı** | AI sadece PST içeriklerini kullanır, harici bilgi eklemez |

### Teknik Gereksinimler

- Çevrimdışı destek (cache ve senkronizasyon)
- Erişilebilirlik (WCAG 2.1 AA uyumu)
- Platform abonelik entegrasyonu (Apple/Google)
- Push bildirim altyapısı
- İçerik indirme ve depolama yönetimi
- RAG altyapısı (Faz 2 için)

---

**Belge Sonu**

*Bu PRD, PST Mobile App geliştirme sürecinde referans belgesi olarak kullanılacaktır. Tüm user story'ler ve acceptance criteria'lar, production-ready kalitede ürün geliştirmek için detaylandırılmıştır.*

**Son Güncelleme:** Ocak 2026 - v1.1 (İçerik yapısı ve Kütüphane Epic'leri eklendi)
