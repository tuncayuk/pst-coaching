# PST Mobile App - Product Requirements Document (PRD)

**Versiyon:** 1.0  
**Tarih:** Ocak 2026  
**Hazırlayan:** Principal Product Manager

---

## 📱 Mobil Uygulama Tab Bar Yapısı

| Tab | İkon | Açıklama | Erişim |
|-----|------|----------|--------|
| **Ana Sayfa** | 🏠 Home | Bugün özeti, hızlı aksiyonlar, yolculuk durumu | Tüm kullanıcılar |
| **Keşfet** | 🧭 Compass | Yolculuk kataloğu, asistan, arama | Tüm kullanıcılar |
| **Topluluk** | 👥 Users | Birlikte okuma, kitap kulüpleri | Aile/Grup planları |
| **Gelişim** | 📊 Chart | İlerleme grafikleri, duygusal harita, raporlar | Aktif abonelik |
| **Profil** | 👤 User | Hesap, abonelik, ayarlar, favoriler | Tüm kullanıcılar |

> **Not:** Koçlar için ayrı bir "Koç Paneli" tab'ı veya Profil altında erişim sağlanacaktır.

---

## 💳 Abonelik Modeli

### Abonelik Planları

| Özellik | Bireysel | Aile | Grup |
|---------|----------|------|------|
| **Kullanıcı Sayısı** | 1 | 5 | 10 |
| **Core Kütüphane Erişimi** | ✅ | ✅ | ✅ |
| **Yolculuk İlerleme Kilidi** | ✅ | ✅ | ✅ |
| **Üye/Davet Yönetimi** | ❌ | ✅ | ✅ |
| **Öğrenci İndirimi (%50)** | ✅ | ❌ | ❌ |

### Add-on'lar

| Add-on | Açıklama | Uygun Planlar |
|--------|----------|---------------|
| **AI Paketi** | AI sohbet + günlük içerik üretimi + AI analiz/geri bildirim | Bireysel / Aile / Grup |
| **Koçluk Eğitimi** | Koçluk Okulu programlarına erişim + dönem/cohort dahil | Bireysel / Aile / Grup |
| **Ek Kişi +5** | Mevcut plana +5 kişi ekler | Aile / Grup |
| **Ek Kişi +10** | Mevcut plana +10 kişi ekler | Aile / Grup |

---

## 🚀 Faz Planlaması

### Faz 1 (MVP - Production)
- EPIC 1: Dil, Hesap ve Güvenli Oturum
- EPIC 2: Ana Sayfa ve Navigasyon
- EPIC 3: Abonelik ve Kişi Yönetimi
- EPIC 4: Yolculuk Keşfi ve Başlatma
- EPIC 5: Günlük Okuma ve Teslim
- EPIC 6: Gelişim ve Raporlama
- EPIC 8: Favoriler ve Arşiv
- EPIC 9: Erişilebilirlik
- EPIC 20: Modül Sistemi

### Faz 2 (Geliştirme)
- EPIC 7: Koç Paneli
- EPIC 10: Birlikte Okuma
- EPIC 11-12: Kitap Kulübü ve Oyunlaştırma
- EPIC 13-14: Pekiştirme Oyunları ve Video
- EPIC 15-16: AI ve Hatırlatıcılar
- EPIC 17-19: İleri Seviye Topluluk Özellikleri

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

---

# EPIC 2: Ana Sayfa ve Navigasyon

**Faz:** 1 (MVP)  
**Açıklama:** Ana akış, günlük odak ve akıllı yönlendirme

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 2 | Faz 1 | Danışan | US-2.1 Bugün Özeti ve Ana CTA | Danışan olarak, ana ekranda bugünkü görev özetini ve tek bir "Devam Et" çağrısını görmek istiyorum; böylece kaybolmadan bir sonraki en doğru adıma gidebileyim. | • Bugün kartında hedef, kalan süre (23:59) ve Devam Et CTA görünür<br>• Devam Et ile kaldığım adıma yönlendirilirim<br>• Çevrimdışı son bilinen özet gösterilir | Tab Bar → Ana Sayfa |
| EPIC 2 | Faz 1 | Danışan | US-2.2 Abonelik Durumu Rozetleri | Danışan olarak, ana ekranda aboneliğimin durumunu ve erişimlerimi net görmek istiyorum. | • Plan durumu rozet olarak gösterilir (Aktif/Deneme/İptal)<br>• Add-on durumları görünür<br>• Kısıtlı içeriğe tıklandığında neden açıklanır | Tab Bar → Ana Sayfa |
| EPIC 2 | Faz 1 | Danışan | US-2.3 Bireysel/Grup/Koçluk Navigasyonu | Danışan olarak, ana sayfada Bireysel, Grup ve Koçluk Okulu alanlarına net navigasyon görmek istiyorum. | • 3 ayrı giriş kartı gösterilir<br>• Tek dokunuşla ilgili alana gidilir<br>• Erişim kısıtlıysa paywall gösterilir | Tab Bar → Ana Sayfa → Bireysel/Grup/Koçluk |
| EPIC 2 | Faz 1 | Danışan | US-2.4 "Vicdandan Karaktere" Bilgilendirmesi | Danışan olarak, ana sayfada programın dayandığı yaklaşımı hızlıca anlayabilmek istiyorum. | • Kısa özet metin görünür<br>• "Detayları Gör" ile detay sayfasına gidilir<br>• Çevrimdışı cache'den gösterilir | Tab Bar → Ana Sayfa → Vicdandan Karaktere Kartı |
| EPIC 2 | Faz 1 | Danışan | US-2.5 Hızlı Arama ve Keşif | Danışan olarak, ana sayfadan içerik/program/yolculuk içinde arama yapmak istiyorum. | • Arama alanına dokunulunca arama ekranı açılır<br>• Sonuçlar kategori bazlı listelenir<br>• Sonuç bulunamazsa öneriler gösterilir | Tab Bar → Ana Sayfa → Arama |
| EPIC 2 | Faz 1 | Danışan | US-2.6 Günlük Hatırlatıcı | Danışan olarak, günlük okuma/yazma için hatırlatıcılar almak istiyorum. | • Bildirim izni alınmadan önce açıklama gösterilir<br>• Varsayılan saat 20:00'de hatırlatma gönderilir<br>• Yorum gönderildiğinde tekrar hatırlatma yapılmaz | Profil → Ayarlar → Hatırlatıcılar |
| EPIC 2 | Faz 1 | Danışan | US-2.7 Yolculuklarım Özeti | Danışan olarak, ana ekranda yolculuklarımın kısa özetini görmek istiyorum. | • En fazla 2 aktif yolculuk kartı gösterilir<br>• "Tümünü Gör" ile detay ekranına gidilir<br>• Kilitli içerikler etiketlenir | Tab Bar → Ana Sayfa → Yolculuklarım |
| EPIC 2 | Faz 1 | Danışan | US-2.8 Ana Akış Performansı | Danışan olarak, ana ekranın hızlı açılmasını istiyorum. | • Skeleton yükleme kullanılır<br>• Kritik kartlar önce gösterilir<br>• Hata durumunda kart bazlı tekrar dene sunulur | Tab Bar → Ana Sayfa |

---

# EPIC 3: Abonelik ve Kişi Yönetimi

**Faz:** 1 (MVP)  
**Açıklama:** Plan satın alma, Add-on yönetimi, kişi (seat) yönetimi

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 3 | Faz 1 | Danışan | US-3.1 Plan Seçimi ve Karşılaştırma | Danışan olarak, Bireysel/Aile/Grup planlarını karşılaştırıp seçmek istiyorum; böylece içeriğe erişimimi doğru planla başlatabileyim. | • Planlar kişi limitleriyle listelenir (1/5/10)<br>• Seçilen plan vurgulanır<br>• "Devam Et" butonu aktif olur<br>• Erişilebilirlik için kart rolleri tanımlı | Profil → Abonelik → Plan Seç |
| EPIC 3 | Faz 1 | Danışan | US-3.2 Satın Alma ve Aktivasyon | Danışan olarak, seçtiğim planı satın alıp hemen erişimin aktif olmasını istiyorum. | • Platform (Apple/Google) satın alma akışı açılır<br>• Server-side doğrulama yapılır<br>• Erişim (entitlement) hemen aktif olur<br>• Başka cihazda giriş yapınca senkronlanır | Plan Seçimi → Ödeme → Aktivasyon |
| EPIC 3 | Faz 1 | Plan Sahibi | US-3.3 Add-on Yönetimi | Danışan olarak, AI Paketi, Koçluk Eğitimi ve Ek Kişi add-on'larını yönetmek istiyorum. | • Add-on'lar fiyat ve durumla listelenir<br>• Aktifleştirme/kapatma işlemleri yapılabilir<br>• Ek kişi add-on'u sadece Aile/Grup için geçerli<br>• Plan Üyesi satın alma yapamaz | Profil → Abonelik → Add-on'lar |
| EPIC 3 | Faz 1 | Danışan | US-3.4 Öğrenci İndirimi (%50) | Danışan olarak, öğrenci olduğumu doğrulayıp %50 indirim kullanmak istiyorum. | • Doğrulama yöntemleri sunulur (e-posta/belge)<br>• Başarılı doğrulamada indirim uygulanır<br>• Gizlilik açıklaması gösterilir<br>• Yıllık yeniden doğrulama gerekir | Plan Seçimi → Öğrenciyim → Doğrulama |
| EPIC 3 | Faz 1 | Plan Sahibi | US-3.5 Planı Yönetme (Değiştir/İptal) | Plan sahibi olarak, planımı değiştirmek veya iptal etmek istiyorum. | • Mevcut plan, yenileme tarihi, doluluk görünür<br>• Düşürmede kişi sayısı azaltılması istenir<br>• Platform kurallarına uygun yönlendirme yapılır | Profil → Abonelik → Planı Yönet |
| EPIC 3 | Faz 1 | Plan Sahibi | US-3.6 Kişi Yönetimi (Aile/Grup) | Plan sahibi olarak, kişi sayısını yönetmek istiyorum; böylece erişimi kontrol edebileyim. | • Doluluk durumu gösterilir (3/5 dolu)<br>• Davet gönderme ve kaldırma yapılabilir<br>• Limit doluysa Add-on önerilir<br>• Plan Üyesi sadece kendi durumunu görür | Profil → Abonelik → Kişi Yönetimi |
| EPIC 3 | Faz 1 | Danışan | US-3.7 Ödeme Geçmişi ve Geri Yükleme | Danışan olarak, ödeme geçmişimi görmek ve satın alımlarımı geri yüklemek istiyorum. | • Son ödemeler listelenir<br>• "Satın Alımları Geri Yükle" ile erişim doğrulanır<br>• Makbuz detayı görüntülenebilir | Profil → Abonelik → Ödemeler |
| EPIC 3 | Faz 1 | Plan Sahibi | US-3.8 Abonelik İptali | Plan sahibi olarak, aboneliğimi iptal edebilmek ve etkileri görmek istiyorum. | • İptal etkileri net listelenir<br>• Dönem sonuna kadar erişim devam eder<br>• Platform iptal akışına yönlendirilir | Profil → Abonelik → Aboneliği İptal Et |

---

# EPIC 4: Yolculuk Keşfi ve Başlatma

**Faz:** 1 (MVP)  
**Açıklama:** Yolculuk asistanı, katalog ve yolculuk başlatma

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 4 | Faz 1 | Danışan | US-4.1 Keşfet Ana Ekranı | Danışan olarak, yolculuklara başlamak için keşif ekranını görmek istiyorum. | • Yolculuk Asistanı birincil CTA olarak görünür<br>• "Kataloğa Göz At" seçeneği vardır<br>• Erişim kısıtlıysa paywall gösterilir | Tab Bar → Keşfet |
| EPIC 4 | Faz 1 | Danışan | US-4.2 Yolculuk Belirleme Asistanı | Danışan olarak, birkaç soruyla bana uygun yolculuk önerisi almak istiyorum; böylece doğru yolculuktan başlayabileyim. | • Hedef ve süre gibi kısa sorularla akış başlar<br>• 1 ana + 2 alternatif öneri listelenir<br>• AI Add-on aktifse AI destekli öneri sunulur<br>• "Atla" ile kataloga gidilebilir | Tab Bar → Keşfet → Asistanla Başla |
| EPIC 4 | Faz 1 | Danışan | US-4.3 Kısa Anket ile Öneri | Danışan olarak, istersem kısa bir anketi doldurup öneri almak istiyorum. | • 2-6 soruluk kısa anket açılır<br>• "Şimdilik Geç" ile atlanabilir<br>• Yanıtlara göre öneri üretilir | Asistan → Kısa Anketi Aç |
| EPIC 4 | Faz 1 | Danışan | US-4.4 Yolculuk Kataloğu | Danışan olarak, tüm yolculukları filtreleyip sıralamak istiyorum. | • Yolculuklar kart halinde listelenir (süre/seviye)<br>• Hedef/süre/seviye filtreleri vardır<br>• Önerilen/Popüler/Yeni sıralaması yapılabilir | Tab Bar → Keşfet → Katalog |
| EPIC 4 | Faz 1 | Danışan | US-4.5 Yolculuk Detayı | Danışan olarak, bir yolculuğun detayını görüp başlamaya karar vermek istiyorum. | • Süre, günlük hedef aralığı ve "kilitli ilerleme" bilgisi görünür<br>• "Yolculuğu Başlat" CTA'sı vardır<br>• Favorilere eklenebilir<br>• Erişim yoksa paywall gösterilir | Katalog → Yolculuk Kartı → Detay |
| EPIC 4 | Faz 1 | Danışan | US-4.6 Yolculuğu Başlatma | Danışan olarak, yolculuğu başlatırken günlük hedefimi seçmek ve zaman kurallarını bilmek istiyorum. | • Günlük hedef seçenekleri sunulur (300/500 kelime, 5 sayfa)<br>• Zaman kuralları gösterilir (08:00 yeni gün, 23:59 teslim)<br>• "Başla" ile yolculuk aktif olur<br>• Hatırlatıcı ayarlanabilir | Yolculuk Detayı → Başlat → Hedef Seçimi |

---

# EPIC 5: Günlük Okuma ve Teslim

**Faz:** 1 (MVP)  
**Açıklama:** İçerik okuma, yorum yazma ve teslim süreci

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 5 | Faz 1 | Danışan | US-5.1 Günün İçeriğini Okuma | Danışan olarak, günün metnini rahat okuyup ilerlememi görmek istiyorum; böylece günlük hedefimi tamamlayabileyim. | • Gün numarası, hedef ve son teslim (23:59) görünür<br>• Okuma ilerleme göstergesi güncellenir<br>• Çevrimdışı skeleton + tekrar dene gösterilir<br>• Erişilebilirlik ayarlarına uyum sağlanır | Ana Sayfa → Devam Et veya Yolculuklarım → Aktif Yolculuk → Günün Notu |
| EPIC 5 | Faz 1 | Danışan | US-5.2 Sesli Okuma | Danışan olarak, metni sesli dinleyip metinle senkron takip etmek istiyorum. | • Oynatma kontrolleri (play/pause, hız) görünür<br>• Şu an okunan bölüm vurgulanır<br>• Hız ayarı (0.75×/1×/1.25×) anında uygulanır<br>• Arka planda platform kurallarına uygun davranır | Günün Notu → Sesli Okuma |
| EPIC 5 | Faz 1 | Danışan | US-5.3 Altını Çizme ve Not Alma | Danışan olarak, metinde önemli yerlerin altını çizip not almak istiyorum. | • Metin seçildiğinde "Vurgu/Not/Kaydet" araçları görünür<br>• Not kalıcı olarak saklanır<br>• Favorilere eklenebilir<br>• Erişilebilirlik için buton rolleri tanımlı | Günün Notu → Metin Seç → Araçlar |
| EPIC 5 | Faz 1 | Danışan | US-5.4 Yorum Yazma | Danışan olarak, yönlendirici sorularla yorumumu yazmak istiyorum; böylece öğrenimimi netleştirebileyim. | • "Bu modülden ne öğrendin?" ve "Nasıl uygulayacaksın?" soruları görünür<br>• Taslak otomatik kaydedilir<br>• Kelime sayacı görünür<br>• 23:00 sonrası nazik uyarı gösterilir | Günün Notu → Yorum Yaz |
| EPIC 5 | Faz 1 | Danışan | US-5.5 Önizleme ve Teslim | Danışan olarak, yorumumu teslim etmeden önce önizleyip doğru şekilde teslim etmek istiyorum. | • Cevaplar özet halinde gösterilir<br>• 23:59'dan önce "Teslim Et" aktif olur<br>• Teslim sonrası yorum kilitlenir<br>• 23:59 sonrası kural davranışı gösterilir | Yorum Yaz → Önizle & Teslim Et |
| EPIC 5 | Faz 1 | Danışan | US-5.6 Kilitli İlerleme (08:00 Kuralı) | Danışan olarak, bugünü bitirdiğimde bir sonraki günün 08:00'de açılmasını istiyorum. | • "Bugün tamamlandı" durumu görünür<br>• Yarınki içerik kilitli gösterilir<br>• "Yeni içerik 08:00'de açılacak" mesajı ve geri sayım gösterilir<br>• 08:00 olunca otomatik aktif olur | Yolculuklarım → Aktif Yolculuk |
| EPIC 5 | Faz 1 | Danışan | US-5.7 AI Analiz ve Geri Bildirim | Danışan olarak, yorumlarımın AI ile analiz edilip geri bildirim verilmesini istiyorum. | • AI Chat Add-on aktifse analiz hazırlanır<br>• Kısa özet/öneri gösterilir<br>• "Tıbbi/psikolojik teşhis değildir" uyarısı yer alır<br>• Add-on yoksa "Add-on'u Aç" CTA'sı gösterilir | Teslim Sonrası → AI Geri Bildirim |

---

# EPIC 6: Gelişim ve Raporlama

**Faz:** 1 (MVP)  
**Açıklama:** İlerleme grafikleri, duygusal harita ve program değerlendirmesi

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 6 | Faz 1 | Danışan | US-6.1 Gelişim Paneli | Danışan olarak, yolculuktaki ilerlememi grafiklerle ve özet metriklerle görmek istiyorum. | • Gün/süreç durumu, teslim oranı ve alışkanlık zinciri görünür<br>• Veri yüklenirken skeleton gösterilir<br>• Veri < 3 gün ise açıklama sunulur<br>• Grafik özet metni ekran okuyucuya sunulur | Tab Bar → Gelişim |
| EPIC 6 | Faz 1 | Danışan | US-6.2 Duygusal Harita | Danışan olarak, yorumlarımdan türetilen duygusal haritayı görmek istiyorum. | • Son 14/30 gün görünümü seçilebilir<br>• Legend açıklaması (Sakin/Netlik/Gergin) gösterilir<br>• "Teşhis değildir" uyarısı yer alır<br>• Renk körlüğü için ikon/desen desteği sağlanır | Gelişim → Duygusal Harita |
| EPIC 6 | Faz 1 | Danışan | US-6.3 Güçlü ve Gelişim Alanları | Danışan olarak, güçlü olduğum alanları ve geliştirmem gereken alanları görmek istiyorum. | • Güçlü ve gelişim alanları ayrı kartlarda listelenir<br>• Somut öneriler sunulur<br>• "Önerileri Uygula" aksiyonu vardır | Gelişim → Alanlarım |
| EPIC 6 | Faz 1 | Danışan | US-6.4 Haftalık Özet | Danışan olarak, haftalık özetimi ve renkli geri bildirimleri görmek istiyorum. | • Pozitif trend, zorlayan alan ve öneri görünür<br>• Paylaşım öncesi gizlilik uyarısı gösterilir<br>• Veri yoksa açıklama yapılır | Gelişim → Haftalık Özet |
| EPIC 6 | Faz 1 | Danışan | US-6.5 Program Bitiş Değerlendirmesi | Danışan olarak, program bitince kısa bir değerlendirme doldurmak istiyorum. | • Program kapanışında değerlendirme önerilir<br>• "Daha sonra" ile ertelenebilir<br>• Yanıtlar kaydedilir ve kaybolmaz<br>• Veri kullanım amacı açıklanır | Yolculuk Tamamlandı → Değerlendirme |
| EPIC 6 | Faz 1 | Danışan | US-6.6 Bitiş Testi ve Öneri | Danışan olarak, bitiş testini tamamlayıp sonucu ve önerilen yeni yolculuğu görmek istiyorum. | • Başlangıç → bitiş karşılaştırması gösterilir<br>• Önerilen yolculuğa yönlendirme vardır<br>• Sorumluluk notu yer alır | Değerlendirme → Bitiş Testi → Sonuç |
| EPIC 6 | Faz 1 | Danışan | US-6.7 Gelişim Raporu (İndir/Paylaş) | Danışan olarak, gelişim raporumu indirip paylaşmak istiyorum. | • Özet metrikler, temalar ve öneriler görünür<br>• PDF olarak indirilebilir<br>• Paylaşım öncesi gizlilik onayı gösterilir<br>• AI rapor bölümü Add-on'a bağlı | Gelişim → Rapor İndir |

---

# EPIC 7: Koç Paneli ve Danışan Takibi

**Faz:** 2  
**Açıklama:** PST Koçlarının danışan takibi ve geri bildirimi

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 7 | Faz 2 | PST Koçu | US-7.1 Danışan Listesi | Koç olarak, yalnızca bana atanmış danışanları listede görmek ve risk durumlarını fark etmek istiyorum. | • Yalnızca atanmış danışanlar listelenir<br>• Durum etiketi (Güncel/Risk/Gecikme) görünür<br>• İsim/yolculuk ile arama yapılabilir | Koç Paneli → Danışanlar |
| EPIC 7 | Faz 2 | PST Koçu | US-7.2 Danışan Profili ve Hedef | Koç olarak, danışanın hedefini ve mevcut yolculuk bağlamını görmek istiyorum. | • Hedef, yolculuk, gün durumu ve metrikler görünür<br>• Koç notu alanı vardır (danışana görünmez)<br>• İlerleme detayına geçilebilir | Danışanlar → Danışan Kartı → Profil |
| EPIC 7 | Faz 2 | PST Koçu | US-7.3 İçerik/Modül/Teknik Takibi | Koç olarak, danışanın hangi içerikleri kullandığını görmek ve planı güncelleyebilmek istiyorum. | • Kullanılan içerikler (yolculuk/egzersiz/test) listelenir<br>• Teknikler etiket olarak gösterilir<br>• Değişiklikler loglanır (audit) | Danışan Profili → Plan & İçerik |
| EPIC 7 | Faz 2 | PST Koçu | US-7.4 İlerleme Detayı ve Teslim Geçmişi | Koç olarak, danışanın teslim düzenini ve gecikme örüntülerini görmek istiyorum. | • Teslim oranı ve zamanında teslim yüzdesi görünür<br>• Durum etiketleri net gösterilir<br>• Danışan yorumu erişim iznine göre görüntülenir | Danışan Profili → İlerleme |
| EPIC 7 | Faz 2 | PST Koçu | US-7.5 Koç Yorumu Gönderme | Koç olarak, danışana modül sonu geri bildirim göndermek istiyorum. | • Yorum yazma ekranı açılır<br>• Taslak kaydedilebilir<br>• Gönderimde danışana bildirim gider<br>• Yönlendirici dil şablonu sunulur | Danışan Profili → Koç Yorumu Yaz |
| EPIC 7 | Faz 2 | PST Koçu | US-7.6 Uyarılar ve Otomatik Kurallar | Koç olarak, teslim gecikmelerini uyarı ekranında görmek istiyorum. | • Gecikme ve risk uyarıları öncelik sırasıyla listelenir<br>• Hızlı aksiyonlar sunulur<br>• 1 gün gecikmede hatırlatma, 3 günde koça uyarı | Koç Paneli → Uyarılar |
| EPIC 7 | Faz 2 | PST Koçu | US-7.7 Erişim ve Onay Yönetimi | Koç olarak, danışan verilerine yalnızca onayıyla erişmek istiyorum. | • Danışan onayı gereklidir<br>• Erişim kapsamı net gösterilir<br>• Tüm işlemler koç kimliğiyle loglanır<br>• Onay geri çekilince erişim kısıtlanır | Danışan Profili → Erişim Ayarları |

---

# EPIC 8: Favoriler ve Kişisel Arşiv

**Faz:** 1 (MVP)  
**Açıklama:** Kişisel arşiv, koleksiyonlar ve dışa aktarma

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 8 | Faz 1 | Danışan | US-8.1 Favoriler Ana Ekranı | Danışan olarak, kaydettiklerimi tek ekranda görmek istiyorum. | • Öğeler tür etiketiyle listelenir (Vurgu/Not/Bölüm)<br>• Arama ve filtreleme yapılabilir<br>• Boş durum CTA'sı gösterilir | Tab Bar → Profil → Favoriler |
| EPIC 8 | Faz 1 | Danışan | US-8.2 Favori Detayı | Danışan olarak, kaydettiğim vurguyu/notu detaylı görmek istiyorum. | • Kaynak bilgisi net görünür<br>• Not düzenlenebilir ve otomatik kaydedilir<br>• "Kaynağa Git" ile ilgili içeriğe yönlenilir | Favoriler → Favori Kartı → Detay |
| EPIC 8 | Faz 1 | Danışan | US-8.3 Koleksiyonlar | Danışan olarak, favorilerimi koleksiyonlara ayırmak istiyorum. | • Koleksiyon oluşturulabilir ve adlandırılabilir<br>• Favoriler koleksiyona eklenebilir<br>• Silme geri alınabilir (undo) | Favoriler → Koleksiyonlar |
| EPIC 8 | Faz 1 | Danışan | US-8.4 Arama ve Filtreleme | Danışan olarak, favoriler içinde hızlı arama yapmak istiyorum. | • Başlık, not içeriği, etiket ve kaynakta arama çalışır<br>• Filtreler (Vurgu/Not/Bölüm, dönem) uygulanabilir<br>• "Temizle" ile filtreler sıfırlanır | Favoriler → Arama/Filtre |
| EPIC 8 | Faz 1 | Danışan | US-8.5 Paylaşım ve Dışa Aktarma | Danışan olarak, favorilerimi paylaşmadan önce kapsamı seçmek istiyorum. | • Gizlilik uyarısı gösterilir<br>• Kapsam seçilebilir (sadece vurgu/vurgu+not/link)<br>• PDF olarak aktarılabilir | Favoriler → Öğe → Paylaş |
| EPIC 8 | Faz 1 | Danışan | US-8.6 Çevrimdışı Erişim | Danışan olarak, favorilerimi çevrimdışı da görmek istiyorum. | • İndirilen içerikler çevrimdışı görüntülenir<br>• Bağlantı gelince otomatik senkronlanır<br>• Depolama uyarısı yapılır | Favoriler → İndir |
| EPIC 8 | Faz 1 | Danışan | US-8.7 Silme ve Geri Al | Danışan olarak, yanlışlıkla sildiğimde geri alabilmek istiyorum. | • Silme öncesi açıklama gösterilir<br>• "Geri al" snackbar/toast görünür<br>• Süre dolunca silme kalıcılaşır | Favoriler → Öğe → Sil → Geri Al |

---

# EPIC 9: Erişilebilirlik ve Kapsayıcı Deneyim

**Faz:** 1 (MVP)  
**Açıklama:** Ekran okuyucu, metin büyütme, kontrast ve altyazı

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 9 | Faz 1 | Danışan | US-9.1 Erişilebilirlik Ayarları | Danışan olarak, erişilebilirlik ayarlarını tek ekrandan yönetmek istiyorum. | • Metin boyutu, yüksek kontrast, hareket azaltma, altyazı seçenekleri görünür<br>• Ayarlar anında uygulanır ve kaydedilir<br>• Çevrimdışı da saklanır | Profil → Ayarlar → Erişilebilirlik |
| EPIC 9 | Faz 1 | Danışan | US-9.2 Metin Büyütme | Danışan olarak, metin boyutunu önizleme ile ayarlamak istiyorum. | • Kaydırıcı ile boyut değiştirilir<br>• Önizleme anlık güncellenir<br>• Tüm ekranlara uygulanır<br>• UI kırılmadan satır kaydırma korunur | Erişilebilirlik → Metin Boyutu |
| EPIC 9 | Faz 1 | Danışan | US-9.3 Yüksek Kontrast ve Tema | Danışan olarak, yüksek kontrast ve tema seçenekleriyle okumayı kolaylaştırmak istiyorum. | • Yüksek kontrast açıldığında metin/arka plan kontrastı artar<br>• Renk körlüğü için ikon/desen desteği sağlanır<br>• Açık/Koyu/Sistem tema seçilebilir | Erişilebilirlik → Kontrast & Tema |
| EPIC 9 | Faz 1 | Danışan | US-9.4 Video Altyazı Ayarları | Danışan olarak, videolarda altyazıyı otomatik açmak istiyorum. | • Altyazı otomatik açılabilir<br>• Boyut ve dil ayarlanabilir<br>• Altyazı yoksa transkript alternatifi sunulur | Erişilebilirlik → Altyazı |
| EPIC 9 | Faz 1 | Danışan | US-9.5 Video Transkript | Danışan olarak, videonun transkriptini okumak istiyorum. | • Zaman damgalı metin görüntülenir<br>• Kopyalama yapılabilir (gizlilik uyarısıyla)<br>• Paylaşım kontrollü | Video → Transkripti Aç |
| EPIC 9 | Faz 1 | Danışan | US-9.6 Ekran Okuyucu Uyumu | Danışan olarak, ekran okuyucu (VoiceOver/TalkBack) ile sorunsuz kullanmak istiyorum. | • Tüm butonlar anlamlı etiketle okunur<br>• Odak sırası doğru ilerler<br>• Form alanlarında label ve hata mesajları okunur<br>• Grafikler metin özeti sağlar | Tüm ekranlar (otomatik) |
| EPIC 9 | Faz 1 | Admin | US-9.7 Erişilebilirlik Denetimi | Ürün ekibi olarak, erişilebilirlik eksiklerini tespit etmek istiyorum. | • Eksik etiketler, düşük kontrastlar raporlanır<br>• Uyarılar ve iyi durumlar ayrılır<br>• Rapor dışa aktarılabilir (JSON/PDF) | Admin Panel → Erişilebilirlik Denetimi |

---

# EPIC 10: Birlikte Okuma ve Grup Deneyimi

**Faz:** 2  
**Açıklama:** Grup oluşturma, davet ve ortak ilerleme

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 10 | Faz 2 | Danışan | US-10.1 Birlikte Okuma Grupları | Danışan olarak, üyesi olduğum grupları tek ekranda görmek istiyorum. | • Gruplar listelenir<br>• Materyal, ilerleme (6/14) ve kişi sayısı görünür<br>• Arama yapılabilir | Tab Bar → Topluluk → Birlikte Okuma |
| EPIC 10 | Faz 2 | Grup Yöneticisi | US-10.2 Grup Oluşturma | Danışan olarak, birlikte okuma grubu oluşturmak istiyorum. | • Grup adı ve materyal seçilir<br>• Kilitleme ve teslim kuralları gösterilir<br>• Kişi sayısı limiti kontrol edilir | Birlikte Okuma → Grup Oluştur |
| EPIC 10 | Faz 2 | Grup Yöneticisi | US-10.3 Üye Davet Etme | Danışan olarak, gruba yeni üye davet etmek istiyorum. | • Davet bağlantısı ve e-posta seçenekleri görünür<br>• Katılım onayı ayarlanabilir<br>• Limit doluysa Add-on önerilir | Grup Detayı → Üye Davet Et |
| EPIC 10 | Faz 2 | Danışan | US-10.4 Ortak Plan ve Kurallar | Danışan olarak, grubun ortak planını görmek istiyorum. | • Materyal, günlük hedef ve teslim saati görünür<br>• Üye durumları (güncel/gecikme) gösterilir<br>• Kilitleme kuralları uygulanır | Grup Detayı → Ortak Plan |
| EPIC 10 | Faz 2 | Danışan | US-10.5 Ortak İlerleme Haritası | Danışan olarak, gruptaki ilerlemeyi görsel haritada görmek istiyorum. | • Gün/hafta ilerlemesi gösterilir<br>• Kişi bazlı veya anonim görünüm seçilebilir<br>• Gizlilik tercihi uygulanır | Grup Detayı → Ortak İlerleme |
| EPIC 10 | Faz 2 | Danışan | US-10.6 Grup Notları | Danışan olarak, grupta kısa notlar paylaşmak istiyorum. | • Notlar zaman sıralı listelenir<br>• Bildirimler tercihlere göre gönderilir<br>• Raporlama ve moderasyon mevcuttur | Grup Detayı → Grup Notları |
| EPIC 10 | Faz 2 | Grup Yöneticisi | US-10.7 Kişi Sayısı Limitleri | Danışan olarak, grubun kişi sayısı limitini yönetmek istiyorum. | • Mevcut/maksimum limit net görünür<br>• Limit doluysa Add-on önerilir<br>• Rol ataması (Yönetici/Üye) yapılabilir | Grup Detayı → Kişi Sayısı |

---

# EPIC 20: Modül Sistemi ve Kilitli İlerleme

**Faz:** 1 (MVP)  
**Açıklama:** Kilitli ilerleme, önkoşullar ve sertifika

| Epic | Faz | Rol | User Story Adı | User Story Açıklaması | Kabul Kriterleri | Navigasyon Adımları |
|------|-----|-----|----------------|----------------------|------------------|---------------------|
| EPIC 20 | Faz 1 | Danışan | US-20.1 Yolculuk Modül Listesi | Danışan olarak, yolculuğun modül listesini ve kilit durumunu görmek istiyorum. | • Modüller durumlarıyla listelenir (Tamamlandı/Devam/Kilitli)<br>• Kilitli modüle dokunulunca sebep gösterilir<br>• Devam modülüne geçilebilir | Yolculuklarım → Yolculuk → Modüller |
| EPIC 20 | Faz 1 | Danışan | US-20.2 Modül Önkoşulları | Danışan olarak, modül açılma şartlarını görmek istiyorum. | • Önkoşullar checklist olarak görünür<br>• Açılma kuralı net yazılır<br>• Eksik maddeye hızlı aksiyon sunulur | Modül Detayı → Önkoşullar |
| EPIC 20 | Faz 1 | Danışan | US-20.3 Görev Tamamlama ve Gönderim | Danışan olarak, modül görevlerini tamamlayıp göndermek istiyorum. | • Yanıtlar otomatik taslak olarak kaydedilir<br>• "Gönder ve Tamamla" ile kilit açılır<br>• 23:59 sonrası kural davranışı açıklanır | Modül → Görev → Gönder |
| EPIC 20 | Faz 1 | Danışan | US-20.4 Kilit Açıldı ve Sonraki Adım | Danışan olarak, görevleri bitirdiğimde yeni aşamanın açıldığını görmek istiyorum. | • "Kilit açıldı" geri bildirimi gösterilir<br>• 08:00 kuralı varsa bilgi verilir<br>• "Devam Et" ile sonraki içeriğe yönlenilir | Görev Tamamlandı → Devam |
| EPIC 20 | Faz 1 | Danışan | US-20.5 Kilitli Aşama ve Yönlendirme | Danışan olarak, aşama kilitliyse nedenini ve ne yapmam gerektiğini görmek istiyorum. | • Kilit nedeni tek cümle + detayla gösterilir<br>• Eksik göreve hızlı aksiyon sunulur<br>• Hatırlatıcı ayarlanabilir | Kilitli İçerik → Neden Kilitli |
| EPIC 20 | Faz 1 | Danışan | US-20.6 Koç Değerlendirmesi ile Kilit | Danışan olarak, Koçluk add-on'um varsa modül sonrası koç değerlendirme sürecini görmek istiyorum. | • Koçluk add-on aktifse "koç yorumu bekleniyor" gösterilebilir<br>• Onay gelmediyse kilit kalır ve sebep açıklanır<br>• "Koçsuz devam" seçeneği sunulabilir | Modül Tamamlandı → Koç Bekleniyor |
| EPIC 20 | Faz 1 | Danışan | US-20.7 İlerleme Özeti ve Sertifika | Danışan olarak, ilerlememi ve sertifikayı görmek istiyorum. | • Modül tamamlama oranı ve seri gün bilgisi görünür<br>• Kilit geçmişi (zaman damgaları) listelenir<br>• Yolculuk tamamlanınca "Sertifikayı Gör" aktif olur | Yolculuk → İlerleme Özeti → Sertifika |

---

# FAZ 2 EPİC'LERİ (ÖZET)

## EPIC 11-12: Kitap Kulübü ve Oyunlaştırma

| User Story | Açıklama | Navigasyon |
|------------|----------|------------|
| US-11.1 Kitap Kulüpleri | Kulüpleri listeleme, arama, oluşturma/katılma | Topluluk → Kitap Kulübü |
| US-11.2 Kulüp Oluşturma | Gizlilik, kurallar ve moderasyon ayarları | Kitap Kulübü → Kulüp Oluştur |
| US-11.3 Kulüp Akışı | Paylaşım, yanıt ve hızlı aksiyonlar | Kulüp Detayı → Akış |
| US-11.4 Okuyucu Araçları | Altını çizme, not alma, kulüpte paylaşma | Okuyucu → Metin Seç |
| US-12.1 Sanal Dünya | Seviye, XP, seri ve bugünkü durum | Tab Bar → Dünya |
| US-12.2 Günlük Hedef | Sayfa/kelime hedef seçimi | Dünya → Hedef Seç |
| US-12.3 Görevler ve Ödüller | XP, dekor ve teslim sonrası ödül | Dünya → Görevler |
| US-12.5 Dünyayı Düzenleme | Sürükle-bırak ve envanter | Dünya → Düzenle |

## EPIC 13-14: Pekiştirme Oyunları ve Video

| User Story | Açıklama | Navigasyon |
|------------|----------|------------|
| US-13.1 Oyunlar Ana Ekranı | Kategoriler, günlük hedef, kilitli içerik | Tab Bar → Oyunlar |
| US-13.2 Seviye Testi | Kişiselleştirme için başlangıç değerlendirmesi | Oyunlar → Seviye Testi |
| US-13.3 Quiz Oturumu | Sorular, açıklama ve ilerleme | Oyunlar → Quiz Başlat |
| US-13.6 Seri ve Rozetler | Alışkanlık motivasyonu | Oyunlar → Seri ve Rozetler |
| US-13.7 Çocuk Modu | PIN ve güvenli içerik | Profil → Çocuk Modu |
| US-14.1 Video Kütüphanesi | Kategoriler, etiketler, kilitli içerik | Tab Bar → Videolar |
| US-14.3 Video Oynatıcı | Altyazı, hız, bölüm atlama | Video → Oynat |
| US-14.6 Çevrimdışı İndirme | Güvenlik ve depolama yönetimi | Video → İndir |

## EPIC 15-16: AI ve Hatırlatıcılar

| User Story | Açıklama | Navigasyon |
|------------|----------|------------|
| US-15.1 AI Sohbet | Bağlamlı içerik sohbeti (Add-on) | İçerik → AI Sohbet |
| US-15.2 Günlük İçerik Üretimi | AI ile 300 kelime içerik oluşturma | AI Merkezi → Günlük İçerik |
| US-15.3 Otomatik Gönderim | Sıklık, saat ve program kuralları | AI Merkezi → Planlama |
| US-15.4 AI Analiz | Yorumlardan içgörü ve öneri | AI Merkezi → AI Analiz |
| US-16.1 Bildirim İzin Akışı | Neden ve seçenekli izin | Onboarding veya Ayarlar |
| US-16.2 Bildirim Merkezi | Uygulama içi gelen kutusu | Tab Bar → Bildirimler |
| US-16.3 Hatırlatıcı Ayarları | Okuma, yorum ve oyun hatırlatıcıları | Ayarlar → Hatırlatıcılar |
| US-16.5 Sessiz Saatler | DND ve kanal yönetimi | Ayarlar → Sessiz Saatler |
| US-16.7 Seri Kurtarma | Kontrollü ve şeffaf kural | Seri Bozuldu → Kurtarma |

---

## 📝 Notlar ve Öneriler

### Kritik Kurallar (Tüm Epic'lerde Geçerli)

1. **Yeni Gün Kuralı:** İçerik her gün saat 08:00'de aktif olur
2. **Teslim Kuralı:** Yorum teslimi en geç saat 23:59'a kadar yapılmalıdır
3. **Kilitli İlerleme:** Bir adım tamamlanmadan sonraki adıma geçilemez
4. **Server-side Doğrulama:** Tüm satın alma işlemleri sunucu tarafında doğrulanır
5. **Gizlilik Onayı:** Paylaşım ve dışa aktarma işlemlerinde kullanıcı onayı alınır

### Teknik Gereksinimler

- Çevrimdışı destek (cache ve senkronizasyon)
- Erişilebilirlik (WCAG 2.1 AA uyumu)
- Platform abonelik entegrasyonu (Apple/Google)
- Push bildirim altyapısı
- Audit logging (koç işlemleri için)

### Öncelik Sıralaması (Faz 1 MVP)

1. Hesap ve Oturum (EPIC 1)
2. Ana Sayfa (EPIC 2)
3. Abonelik (EPIC 3)
4. Yolculuk Başlatma (EPIC 4)
5. Günlük Okuma ve Teslim (EPIC 5)
6. Modül Sistemi (EPIC 20)
7. Gelişim (EPIC 6)
8. Favoriler (EPIC 8)
9. Erişilebilirlik (EPIC 9)

---

**Belge Sonu**

*Bu PRD, PST Mobile App geliştirme sürecinde referans belgesi olarak kullanılacaktır. Tüm user story'ler ve acceptance criteria'lar, production-ready kalitede ürün geliştirmek için detaylandırılmıştır.*
