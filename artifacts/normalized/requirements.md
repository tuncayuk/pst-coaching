# Normalized Requirements (Rev4)

- Source: artifacts/prd/PST_Mobile_PRD_Rev4.md
- Generated At: 2026-04-04T16:02:48.151Z
- Coverage: 11 epics, 78 FR, 288 AC, 15 BR, 19 NFR

## Global Business Rules

| ID | Rule | Details |
|---|---|---|
| BR-01 | Yeni gün açılışı | Kullanıcı profil timezone'una göre **08:00**'de yeni günün içeriği açılır. |
| BR-02 | Teslim zaman penceresi | Yorum teslimi en geç **23:59**'a kadar; **23:00** itibarıyla nazik uyarı gösterilir. |
| BR-03 | Saat otoritesi | Teslim ve kilit kararlarında **sunucu saati** otoritedir; cihaz saati yalnızca UI gösterimidir. |
| BR-04 | Kilitli ilerleme | Önceki adım tamamlanmadan sonraki adım açılamaz. Kilit nedeni kullanıcıya gösterilir. |
| BR-05 | İçerik başlatma kapı sırası | Auth → Abonelik → Add-on → Demografi (FR-E1-08) → DDL Testi (yalnızca ilk yolculuk). |
| BR-06 | Demografi tek kaynak | Demografi kapısı **FR-E1-08** altında yönetilir. US-4.13/14/15/16 yalnızca giriş noktasını belirtir. |
| BR-07 | Faz 1 bildirim kapsamı | Yalnızca günlük tekil hatırlatıcı. Varsayılan saat: 20:00. |
| BR-08 | Sunucu tarafı satın alma doğrulaması | Tüm IAP işlemleri sunucu tarafında doğrulanır; client receipt tek başına yetki vermez. |
| BR-09 | Paylaşım/dışa aktarma rızası | PDF/paylaşım öncesi kapsam seçimi ve açık kullanıcı onayı zorunludur. |
| BR-10 | Analytics event formatı | Event adları `snake_case`; zorunlu alanlar: `event_name`, `screen_id`, `user_role`, `subscription_status`, `timestamp`. |
| BR-11 | Psikolojik güvenlik uyarısı | İçerik başlatma akışlarında standart bilgilendirme metni gösterilir. |
| BR-12 | Otomatik kaydetme | Yorum ve not alanlarında taslak otomatik kaydedilir; kesinti durumunda taslak korunur. |
| BR-13 | Atölye yapısal otoritesi | Atölye varlıkları aşama → oturum → içerik bloğu/çıktı/artefact düzeniyle tutulur; okuma/egzersiz çiftine indirgenmez. |
| BR-14 | Atölye zaman modeli | Atölyelerde toplam süre, oturum süresi ve takip ritmi esastır; BR-01/BR-02 yalnızca atölye bir günlük içerik döngüsüne bağlandıysa uygulanır. |
| BR-15 | Atölye artefact saklama | Katılımcı defteri girdileri, kriz kartları ve takip planları workshop, aşama ve oturum bağlamıyla sürümlenerek otomatik kaydedilir. |

## Phase 1 Functional Requirements

### EPIC-1: Dil, Hesap ve Güvenli Oturum

#### FR-E1-01 Çok dilli onboarding ve profil dili
- Story: US-1.1 — Danışan olarak, uygulamayı açtığımda TR/EN/ES dillerinden birini seçebilmek istiyorum.
- Acceptance Criteria Count: 5
- Acceptance Criteria:
  - AC-FR-E1-01-01: İlk açılışta dil seçim ekranı (TR/EN/ES) gösterilir; seçim yapılmadan ilerlenemez.
  - AC-FR-E1-01-02: Seçilen dil kullanıcı profiline kaydedilir ve oturumlar arası korunur.
  - AC-FR-E1-01-03: Tüm statik UI metinleri seçilen dilde gösterilir; eksik çeviride fallback dili (TR) kullanılır.
  - AC-FR-E1-01-04: Profil → Ayarlar → Dil'den dil değiştirildiğinde uygulama yeniden başlatmadan güncellenir.
  - AC-FR-E1-01-05: Dil tercihi çevrimdışı da cihazda saklanır ve bağlantı gelince sunucuyla senkronlanır.

#### FR-E1-02 Kayıt olma
- Story: US-1.2 — Danışan olarak, e-posta veya telefon numaram ile kayıt olabilmek istiyorum.
- Acceptance Criteria Count: 5
- Acceptance Criteria:
  - AC-FR-E1-02-01: E-posta veya telefon numarası için geçerli format kontrolü yapılır; geçersizde inline hata gösterilir.
  - AC-FR-E1-02-02: OTP doğrulaması olmadan hesap aktive edilmez.
  - AC-FR-E1-02-03: Yanlış OTP girildiğinde kalan deneme hakkı gösterilir.
  - AC-FR-E1-02-04: 5 başarısız OTP denemesi sonrası 15 dakika geçici kilit uygulanır.
  - AC-FR-E1-02-05: Mevcut hesap kontrolü yapılır; kayıtlı hesap varsa bilgi mesajı ile giriş ekranına yönlendirilir.

#### FR-E1-03 Giriş yapma
- Story: US-1.3 — Danışan olarak, e-posta/telefon ve şifrem ile giriş yapmak istiyorum.
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E1-03-01: Doğru bilgilerle giriş yapıldığında ana sayfaya yönlendirilir.
  - AC-FR-E1-03-02: Hatalı girişte güvenli hata mesajı gösterilir (hesap bilgisi sızdırmaz).
  - AC-FR-E1-03-03: 5 başarısız giriş denemesi sonrası 15 dakika geçici kilit uygulanır; kalan süre gösterilir.
  - AC-FR-E1-03-04: Başarılı girişte abonelik durumu ve kullanıcı rolü sunucudan senkronlanır.

#### FR-E1-04 Şifre sıfırlama
- Story: US-1.4 — Danışan olarak, şifremi unuttuğumda sıfırlayabilmek istiyorum.
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E1-04-01: E-posta veya telefon ile doğrulama akışı başlatılır.
  - AC-FR-E1-04-02: Yeni şifre politikalarına (minimum 8 karakter, harf + rakam) uygunluk kontrol edilir.
  - AC-FR-E1-04-03: Başarılı sıfırlama sonrası giriş ekranına yönlendirilir ve başarı mesajı gösterilir.

#### FR-E1-05 Oturum yönetimi ve güvenlik
- Story: US-1.5, US-1.6 — Oturum çıkış, süre ve güvenlik.
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E1-05-01: Çıkış yapıldığında erişim tokenları güvenli depodan (Keychain/Keystore) silinir ve oturum sonlandırılır.
  - AC-FR-E1-05-02: 30 dakika inaktif kullanım sonrası yeniden doğrulama ekranı gösterilir.
  - AC-FR-E1-05-03: Geçersiz/süresi dolmuş oturum tespit edildiğinde giriş ekranına yönlendirilir ve bilgi mesajı gösterilir.
  - AC-FR-E1-05-04: Korumalı sayfalara erişim için tekrar kimlik doğrulama zorunludur.

#### FR-E1-06 Abonelik ve rol doğrulama
- Story: US-1.7 — Giriş sonrası abonelik durumu ve rolün doğru algılanması.
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E1-06-01: Giriş sonrası abonelik durumu (aktif/deneme/iptal/yok) sunucudan güncellenir.
  - AC-FR-E1-06-02: Plan Sahibi / Üye rolü doğru atanır ve erişim kısıtlamaları uygulanır.
  - AC-FR-E1-06-03: Abonelik olmayan kullanıcıda Kütüphane ve Gelişim tablarına erişimde paywall gösterilir.

#### FR-E1-07 Biyometrik giriş (FaceID/TouchID)
- Story: US-1.8 — FaceID ile giriş yapabilmek.
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E1-07-01: Biyometrik destekli cihazlarda ilk girişte açık onay (opt-in) istenir.
  - AC-FR-E1-07-02: Biyometrik doğrulama başarısızsa şifre ile giriş ekranına fallback yapılır.
  - AC-FR-E1-07-03: Profil → Ayarlar'dan biyometrik giriş açılıp kapatılabilir.

#### FR-E1-08 Demografi bilgisi toplama (Tek Kaynak)
- Story: US-1.9 — İçerik başlatmadan önce yaş/cinsiyet/ülke bilgisi.
- Acceptance Criteria Count: 7
- Acceptance Criteria:
  - AC-FR-E1-08-01: İlk kez herhangi bir içerik (yolculuk/modül/atölye/e-kitap) başlatmadan önce demografi formu açılır.
  - AC-FR-E1-08-02: Bilgiler kaydedilmeden içerik başlatılamaz.
  - AC-FR-E1-08-03: Yaş alanı zorunlu; 13-120 aralığında doğrulanır.
  - AC-FR-E1-08-04: Cinsiyet alanı opsiyonel: Kadın / Erkek / Belirtmek istemiyorum.
  - AC-FR-E1-08-05: Ülke alanı zorunlu; arama ile seçilebilir.
  - AC-FR-E1-08-06: Demografi daha önce kaydedilmişse tekrar sorulmaz (BR-06).
  - AC-FR-E1-08-07: Bilgiler Profil → Ayarlar → Demografi'den görüntülenir ve güncellenebilir.

#### FR-E1-09 Misafir giriş (kayıtsız)
- Story: US-1.10 — Kayıt olmadan uygulamaya giriş.
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E1-09-01: Misafir oturumu başlatılır; profil oluşturulmaz.
  - AC-FR-E1-09-02: Keşfet ve detay ekranları erişilebilir olur.
  - AC-FR-E1-09-03: İçerik başlatma/okuma aksiyonlarında kayıt ekranına yönlendirilir.
  - AC-FR-E1-09-04: Kayıt sonrası misafir oturumundaki gezinme verileri kullanıcıya devredilir.

### EPIC-2: Ana Sayfa ve Navigasyon

#### FR-E2-01 Bugün özeti ve tekil devam CTA
- Story: US-2.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E2-01-01: Bugün kartında aktif içerik hedefi, kalan süre (23:59'a geri sayım) ve "Devam Et" CTA görünür.
  - AC-FR-E2-01-02: "Devam Et" aksiyonu kullanıcıyı kaldığı adım ekranına (yolculuk/atölye/modül/e-kitap) götürür.
  - AC-FR-E2-01-03: Aktif içerik yoksa keşfet yönlendirmesi yapılır.
  - AC-FR-E2-01-04: Çevrimdışı durumda son senkronize özet gösterilir.

#### FR-E2-02 Abonelik durumu rozetleri
- Story: US-2.2
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E2-02-01: Plan durumu rozet olarak gösterilir: Aktif / Deneme / İptal.
  - AC-FR-E2-02-02: Aktif add-on'lar etiketlenir.
  - AC-FR-E2-02-03: Kısıtlı içeriğe tıklandığında kısıtlama nedeni açıklanır.

#### FR-E2-03 İçerik alanları navigasyonu
- Story: US-2.3
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E2-03-01: İçerik türleri için ayrı giriş kartları gösterilir (Yolculuklar, Atölyeler, e-Kitaplar, Koçluk Okulu).
  - AC-FR-E2-03-02: Tek dokunuşla ilgili kataloğa gidilir.
  - AC-FR-E2-03-03: Erişim kısıtlıysa paywall gösterilir.

#### FR-E2-04 "Vicdandan Karaktere" bilgilendirmesi
- Story: US-2.4
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E2-04-01: Kısa özet metin kartı ana sayfada görünür.
  - AC-FR-E2-04-02: "Detayları Gör" ile detay sayfasına gidilir.
  - AC-FR-E2-04-03: Çevrimdışı durumda cache'den gösterilir.

#### FR-E2-05 Hızlı arama
- Story: US-2.5
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E2-05-01: Arama alanına dokunulunca arama ekranı açılır.
  - AC-FR-E2-05-02: Sonuçlar içerik türüne göre kategorize edilir (yolculuk/atölye/modül/e-kitap).
  - AC-FR-E2-05-03: Sonuç bulunamazsa "sonuç yok" açıklaması ve keşfet önerisi gösterilir.

#### FR-E2-06 Aktif içeriklerim özeti
- Story: US-2.6
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E2-06-01: En fazla 3 aktif içerik kartı gösterilir; her kartta ilerleme yüzdesi ve tür etiketi yer alır.
  - AC-FR-E2-06-02: "Tümünü Gör" ile Kütüphane tabına yönlendirilir.
  - AC-FR-E2-06-03: Kilitli içerikler görsel olarak etiketlenir.

#### FR-E2-07 Son görüntülenen içerikler
- Story: US-2.7
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E2-07-01: Son görüntülenen içerikler en fazla 5 kart olarak listelenir.
  - AC-FR-E2-07-02: Her kartta tür etiketi, son görüntülenme zamanı ve kaldığı bölüm görünür.
  - AC-FR-E2-07-03: Boş durumda önerilen içerikler gösterilir.
  - AC-FR-E2-07-04: Analytics: `recent_content_viewed`, `recent_content_item_clicked`

#### FR-E2-08 Günlük hatırlatıcı
- Story: US-2.8
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E2-08-01: Bildirim izni alınmadan önce açıklama metni gösterilir (neden bildirimlere ihtiyaç var).
  - AC-FR-E2-08-02: Varsayılan hatırlatma saati 20:00'de ayarlanır; kullanıcı tarafından değiştirilebilir.
  - AC-FR-E2-08-03: Gün için yorum teslim edilmişse tekrar hatırlatma yapılmaz.
  - AC-FR-E2-08-04: Faz 1'de yalnızca günlük tekil hatırlatıcı desteklenir (BR-07).

#### FR-E2-09 Ana akış performansı
- Story: US-2.9
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E2-09-01: Ana ekran ilk açılışta skeleton yükleme gösterilir.
  - AC-FR-E2-09-02: Kritik kartlar (Bugün özeti, Devam Et) önce yüklenir.
  - AC-FR-E2-09-03: Hata durumunda kart bazlı "Tekrar Dene" aksiyonu sunulur.

### EPIC-3: Abonelik ve Kişi Yönetimi

#### FR-E3-01 Plan seçimi ve karşılaştırma
- Story: US-3.1
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E3-01-01: Bireysel (1) / Aile (5) / Grup (10) planları kişi limitleriyle listelenir.
  - AC-FR-E3-01-02: Tüm planların içerik erişimi ve farklılıkları net şekilde karşılaştırılır.
  - AC-FR-E3-01-03: Seçilen plan görsel olarak vurgulanır ve "Devam Et" butonu aktif olur.

#### FR-E3-02 Satın alma ve aktivasyon
- Story: US-3.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E3-02-01: Platform (Apple/Google) yerel satın alma akışı açılır.
  - AC-FR-E3-02-02: Server-side doğrulama sonrası erişim (entitlement) hemen aktif olur (BR-08).
  - AC-FR-E3-02-03: Başka cihazda giriş yapıldığında abonelik senkronlanır.
  - AC-FR-E3-02-04: Satın alma hatası durumunda kullanıcıya açık hata mesajı gösterilir.

#### FR-E3-03 Add-on yönetimi
- Story: US-3.3
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E3-03-01: Add-on'lar fiyat ve mevcut durumla listelenir.
  - AC-FR-E3-03-02: Aktifleştirme ve kapatma işlemleri yapılabilir.
  - AC-FR-E3-03-03: Ek Kişi add-on'u yalnızca Aile/Grup planları için gösterilir.
  - AC-FR-E3-03-04: Plan Üyesi (member) add-on satın alma yapamaz; yalnızca Plan Sahibi yetkilidir.

#### FR-E3-04 Öğrenci indirimi
- Story: US-3.4
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E3-04-01: Doğrulama yöntemleri sunulur (öğrenci e-postası veya belge yükleme).
  - AC-FR-E3-04-02: Başarılı doğrulamada %50 indirim uygulanır.
  - AC-FR-E3-04-03: Gizlilik açıklaması indirim başvurusundan önce gösterilir.
  - AC-FR-E3-04-04: Yıllık yeniden doğrulama gerekir; süresi doluyorsa uyarı gösterilir.

#### FR-E3-05 Plan yönetimi (değiştir/iptal)
- Story: US-3.5, US-3.8
- Acceptance Criteria Count: 5
- Acceptance Criteria:
  - AC-FR-E3-05-01: Mevcut plan, yenileme tarihi ve doluluk gösterilir.
  - AC-FR-E3-05-02: Plan düşürmede kişi limiti aşılıyorsa kişi sayısı azaltılması istenir.
  - AC-FR-E3-05-03: İptal etkileri net listelenir (tüm içerikler, ilerleme kaydı).
  - AC-FR-E3-05-04: İptal sonrası dönem sonuna kadar erişim devam eder.
  - AC-FR-E3-05-05: Platform iptal akışına yönlendirilir.

#### FR-E3-06 Kişi (seat) yönetimi
- Story: US-3.6
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E3-06-01: Doluluk durumu gösterilir (ör. 3/5 dolu).
  - AC-FR-E3-06-02: Davet gönderme (e-posta/telefon) ve kaldırma yapılabilir.
  - AC-FR-E3-06-03: Limit doluysa Ek Kişi add-on önerilir.
  - AC-FR-E3-06-04: Plan Üyesi sadece kendi durumunu görür.

#### FR-E3-07 Ödeme geçmişi ve geri yükleme
- Story: US-3.7
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E3-07-01: Son ödemeler tarih ve tutarla listelenir.
  - AC-FR-E3-07-02: "Satın Alımları Geri Yükle" ile platform üzerinden erişim doğrulanır.
  - AC-FR-E3-07-03: Makbuz detayı görüntülenebilir.

### EPIC-4: İçerik Keşfi ve Katalog

#### FR-E4-01 Keşfet ana ekranı
- Story: US-4.1
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E4-01-01: İçerik türleri tab/segment olarak görünür: Yolculuklar / Atölyeler / Modüller / e-Kitaplar.
  - AC-FR-E4-01-02: İçerik Asistanı birincil CTA olarak görünür.
  - AC-FR-E4-01-03: Abonelik olmayan kullanıcıda kısıtlı içeriklere tıklandığında paywall gösterilir.

#### FR-E4-02 İçerik belirleme asistanı
- Story: US-4.2
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E4-02-01: Hedef, süre ve tercih sorularıyla adım adım akış başlar.
  - AC-FR-E4-02-02: 1 ana + 2 alternatif içerik önerisi listelenir.
  - AC-FR-E4-02-03: "Atla" ile doğrudan kataloğa gidilebilir.

#### FR-E4-03 Yolculuk kataloğu ve detayı
- Story: US-4.3, US-4.4
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E4-03-01: Yolculuklar kart halinde listelenir: süre, seviye, içerik sayısı.
  - AC-FR-E4-03-02: Hedef / süre / seviye filtreleri ve sıralama (Önerilen/Popüler/Yeni) uygulanabilir.
  - AC-FR-E4-03-03: Detay ekranında açıklama, süre, günlük hedef aralığı, içerdiği modüller/atölyeler/e-kitaplar görünür.
  - AC-FR-E4-03-04: "Yolculuğu Başlat" CTA ve favorilere ekleme aksiyonu vardır.

#### FR-E4-04 Atölye kataloğu ve detayı
- Story: US-4.5, US-4.6
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E4-04-01: Atölyeler kart halinde listelenir: tema, hedef kitle, toplam süre, aşama sayısı ve kamp/rehber/workbook etiketleri.
  - AC-FR-E4-04-02: Tema, hedef yaş aralığı, teslim biçimi (bireysel / grup / kamp) ve süre bazlı filtreleme yapılabilir.
  - AC-FR-E4-04-03: Detay ekranında açıklama, dönüşüm hedefi, ana ayet/hadisler, aşama listesi, kamp günleri, beklenen çıktılar ve bağlı yolculuk varsa gösterilir.
  - AC-FR-E4-04-04: Detay ekranında "Atölyeyi Başlat", "Katılımcı Defterini Önizle" ve varsa "Eğitmen Rehberini Gör" aksiyonları bulunur.

#### FR-E4-05 Modül kataloğu ve detayı
- Story: US-4.7, US-4.8
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E4-05-01: Modüller kart halinde listelenir; her modülün içerdiği paketler görünür.
  - AC-FR-E4-05-02: Konu bazlı filtreleme yapılabilir.
  - AC-FR-E4-05-03: Detay ekranında paketler sıralı listelenir; her paketin kısa açıklaması ve süresi görünür.
  - AC-FR-E4-05-04: "Modülü Başlat" CTA vardır.

#### FR-E4-06 e-Kitap kataloğu ve detayı
- Story: US-4.9, US-4.10
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E4-06-01: e-Kitaplar kapak görseli ile listelenir; kategori filtreleme yapılabilir.
  - AC-FR-E4-06-02: Sayfa sayısı ve tahmini okuma süresi görünür.
  - AC-FR-E4-06-03: Detay ekranında açıklama, yazar, kategori, içindekiler, bağlı yolculuk varsa gösterilir.
  - AC-FR-E4-06-04: "Okumaya Başla" CTA vardır.

#### FR-E4-07 İçerik başlatma (ortak akış)
- Story: US-4.11
- Acceptance Criteria Count: 5
- Acceptance Criteria:
  - AC-FR-E4-07-01: İçerik başlatmada kapı sırası uygulanır (BR-05): Auth → Abonelik → Add-on → Demografi → DDL.
  - AC-FR-E4-07-02: İçerik türüne göre planlama seçenekleri sunulur: yolculuklar için günlük hedef, atölyeler için oturum/kamp planı.
  - AC-FR-E4-07-03: İçerik türüne uygun zaman kuralları gösterilir: günlük içerikte 08:00/23:59, atölyede toplam süre, oturum süresi ve takip ritmi.
  - AC-FR-E4-07-04: Psikolojik güvenlik bilgilendirme metni gösterilir (BR-11).
  - AC-FR-E4-07-05: "Başla" ile içerik aktif olur; içerik türüne göre günlük hatırlatıcı veya atölye takip planı ayarlanabilir.

#### FR-E4-08 Misafir görüntüleme ve kayıt zorunluluğu
- Story: US-4.12
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E4-08-01: Misafir kullanıcı tüm katalog ve detay ekranlarını görebilir.
  - AC-FR-E4-08-02: Ücretsiz içerikler "Free" etiketiyle işaretlenir.
  - AC-FR-E4-08-03: "Başlat/Okumaya Başla" aksiyonunda kayıt ekranına yönlendirilir.
  - AC-FR-E4-08-04: Kayıt sonrası ücretsiz içerikler paywall olmadan açılır.

#### FR-E4-09 İçerik türüne özel demografi giriş noktaları
- Story: US-4.13, US-4.14, US-4.15, US-4.16
- Acceptance Criteria Count: 2
- Acceptance Criteria:
  - AC-FR-E4-09-01: Yolculuk/Modül/Atölye/e-Kitap başlatma giriş noktalarında demografi kapısı **FR-E1-08** referansıyla kontrol edilir.
  - AC-FR-E4-09-02: Bu giriş noktaları kendi demografi kuralı tanımlamaz; tek kaynak FR-E1-08'dir (BR-06).

#### FR-E4-10 İlk yolculukta DDL testi
- Story: US-4.17
- Acceptance Criteria Count: 5
- Acceptance Criteria:
  - AC-FR-E4-10-01: İlk kez yolculuk başlatma denemesinde DDL testi açılır.
  - AC-FR-E4-10-02: Test tamamlanmadan yolculuk başlatılamaz.
  - AC-FR-E4-10-03: Test sonuçları kullanıcı profiline kaydedilir; tamamlanma tarihi saklanır.
  - AC-FR-E4-10-04: Daha önce tamamlanmışsa tekrar istenmez.
  - AC-FR-E4-10-05: Analytics: `ddl_test_started`, `ddl_test_completed`, `ddl_test_abandoned`

### EPIC-5: Okuma Deneyimi

#### FR-E5-01 Günün içeriğini okuma
- Story: US-5.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E5-01-01: Gün/bölüm numarası, hedef ve son teslim zamanı (23:59) görünür.
  - AC-FR-E5-01-02: Okuma ilerleme göstergesi kaydırma/sayfa ilerledikçe güncellenir.
  - AC-FR-E5-01-03: Çevrimdışı durumda skeleton + "Tekrar Dene" gösterilir; cache mevcutsa içerik görüntülenir.
  - AC-FR-E5-01-04: Erişilebilirlik ayarları (metin boyutu, kontrast) uygulanır.

#### FR-E5-02 Sesli okuma
- Story: US-5.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E5-02-01: Oynatma kontrolleri (play/pause/hız) görünür.
  - AC-FR-E5-02-02: Okunan bölüm metinde vurgulanır (senkron takip).
  - AC-FR-E5-02-03: Hız ayarı: 0.75× / 1× / 1.25× anında uygulanır.
  - AC-FR-E5-02-04: Arka planda platform kurallarına (audio session) uygun davranır.

#### FR-E5-03 Altını çizme ve not alma
- Story: US-5.3
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E5-03-01: Metin seçildiğinde "Vurgula / Not Ekle / Favoriye Kaydet" araçları görünür.
  - AC-FR-E5-03-02: Not ve vurgular kalıcı olarak saklanır; otomatik kaydetme uygulanır (BR-12).
  - AC-FR-E5-03-03: Her vurgu/not içerik kaynağı ile ilişkilendirilir (kitap adı, bölüm vb.).
  - AC-FR-E5-03-04: Favorilere eklenebilir.

#### FR-E5-04 Yorum yazma ve teslim
- Story: US-5.4, US-5.5
- Acceptance Criteria Count: 7
- Acceptance Criteria:
  - AC-FR-E5-04-01: İçeriğe özel yönlendirici sorular görünür.
  - AC-FR-E5-04-02: Taslak otomatik kaydedilir (BR-12).
  - AC-FR-E5-04-03: Kelime sayacı görünür.
  - AC-FR-E5-04-04: 23:00 sonrası nazik uyarı gösterilir (BR-02).
  - AC-FR-E5-04-05: "Önizle & Teslim Et" ekranında cevaplar özet halinde gösterilir.
  - AC-FR-E5-04-06: 23:59'dan önce "Teslim Et" aktif olur; teslim sonrası yorum kilitlenir.
  - AC-FR-E5-04-07: 23:59 sonrası teslim butonu deaktif olur; zamanaşımı durumu gösterilir.

#### FR-E5-05 Kilitli ilerleme (08:00 kuralı)
- Story: US-5.6
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E5-05-01: Bugünkü içerik tamamlandığında "Bugün tamamlandı" durumu gösterilir.
  - AC-FR-E5-05-02: Yarınki içerik kilitli gösterilir; "Yeni içerik 08:00'de açılacak" mesajı ve geri sayım gösterilir.
  - AC-FR-E5-05-03: 08:00 olunca (BR-01, BR-03) içerik otomatik olarak available duruma geçer.

#### FR-E5-06 Uygulama/egzersiz tamamlama
- Story: US-5.7
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E5-06-01: Uygulama adımları sıralı gösterilir.
  - AC-FR-E5-06-02: Her adım tamamlandığında işaretlenir.
  - AC-FR-E5-06-03: Tüm adımlar tamamlanınca ilerleme kaydedilir ve "Sonraki" ile devam edilir.

### EPIC-6: Gelişim ve Raporlama

#### FR-E6-01 Gelişim paneli
- Story: US-6.1
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E6-01-01: İçerik türü bazlı ilerleme (yolculuk / atölye / modül / e-kitap) grafik ve metriklerle gösterilir.
  - AC-FR-E6-01-02: Teslim oranı ve alışkanlık zinciri (streak) görünür.
  - AC-FR-E6-01-03: Grafik özet metni ekran okuyucuya erişilebilir olarak sunulur.

#### FR-E6-02 Duygusal harita
- Story: US-6.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E6-02-01: Son 14 / 30 gün görünümü seçilebilir.
  - AC-FR-E6-02-02: Legend açıklaması (ör. Sakin/Netlik/Gergin) gösterilir.
  - AC-FR-E6-02-03: "Bu bir teşhis değildir" uyarısı her zaman görünür.
  - AC-FR-E6-02-04: Renk körlüğü için ikon/desen desteği sağlanır.

#### FR-E6-03 Güçlü ve gelişim alanları
- Story: US-6.3
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E6-03-01: Güçlü ve gelişim alanları ayrı kartlarda listelenir.
  - AC-FR-E6-03-02: Somut öneriler ve ilgili içerik referansları sunulur.
  - AC-FR-E6-03-03: "Önerileri Uygula" aksiyonu ilgili içerik detayına yönlendirir.

#### FR-E6-04 Haftalık özet
- Story: US-6.4
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E6-04-01: Pozitif trend, zorlayan alan ve öneri görünür.
  - AC-FR-E6-04-02: Tamamlanan içerikler listelenir.
  - AC-FR-E6-04-03: Yeterli veri yoksa açıklama gösterilir (empty state).

#### FR-E6-05 İçerik bitiş değerlendirmesi
- Story: US-6.5
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E6-05-01: İçerik tamamlandığında (yolculuk/atölye/modül) değerlendirme formu önerilir.
  - AC-FR-E6-05-02: "Daha Sonra" ile ertelenebilir.
  - AC-FR-E6-05-03: Yanıtlar kaydedilir ve sonraki içerik önerisi sunulur.

#### FR-E6-06 Gelişim raporu (indir/paylaş)
- Story: US-6.6
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E6-06-01: Özet metrikler, temalar ve öneriler içerir.
  - AC-FR-E6-06-02: PDF olarak indirilebilir.
  - AC-FR-E6-06-03: Paylaşım öncesi gizlilik onayı gösterilir (BR-09).

### EPIC-7: e-Kitap Okuyucu

#### FR-E7-01 e-Kitap okuyucu açılışı
- Story: US-7.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E7-01-01: Son okunan sayfa otomatik açılır.
  - AC-FR-E7-01-02: Kitap başlığı ve mevcut sayfa / toplam sayfa gösterilir.
  - AC-FR-E7-01-03: İçindekiler erişilebilir (TOC sheet/panel).
  - AC-FR-E7-01-04: Çevrimdışı okuma desteklenir (indirilen kitap için).

#### FR-E7-02 Sayfa navigasyonu
- Story: US-7.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E7-02-01: Kaydırma veya sayfa çevirme ile gezinme desteklenir.
  - AC-FR-E7-02-02: Sayfa numarasına atlama özelliği vardır.
  - AC-FR-E7-02-03: İçindekiler'den bölüme atlama desteklenir.
  - AC-FR-E7-02-04: İlerleme çubuğu görünür.

#### FR-E7-03 Okuma ayarları
- Story: US-7.3
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E7-03-01: Font boyutu ayarlanabilir (slider ile).
  - AC-FR-E7-03-02: Arka plan rengi seçilebilir: Beyaz / Sepia / Koyu.
  - AC-FR-E7-03-03: Satır aralığı ayarlanabilir.
  - AC-FR-E7-03-04: Ayarlar kitaplar arası saklanır (ReadingSettings entity).

#### FR-E7-04 Metin vurgulama ve not
- Story: US-7.4
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E7-04-01: Metin seçildiğinde renk seçenekleri görünür.
  - AC-FR-E7-04-02: Not eklenebilir ve otomatik kaydedilir (BR-12).
  - AC-FR-E7-04-03: Vurgular favorilere eklenebilir.

#### FR-E7-05 Vurgularım ve notlarım listesi
- Story: US-7.5
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E7-05-01: Kitaba özel vurgu/not listesi görünür.
  - AC-FR-E7-05-02: Dokunarak ilgili sayfaya gidilir.
  - AC-FR-E7-05-03: Not düzenlenebilir.
  - AC-FR-E7-05-04: Dışa aktarılabilir (PDF/metin).

#### FR-E7-06 Sesli kitap desteği
- Story: US-7.6
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E7-06-01: Sesli versiyon varsa Play butonu görünür; yoksa buton gizlenir.
  - AC-FR-E7-06-02: Metin ile senkron takip edilir.
  - AC-FR-E7-06-03: Hız ayarlanabilir (0.75× / 1× / 1.25×).
  - AC-FR-E7-06-04: Arka planda çalabilir (audio session).

#### FR-E7-07 Okuma ilerlemesi
- Story: US-7.7
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E7-07-01: İlerleme yüzdesi görünür.
  - AC-FR-E7-07-02: Tahmini kalan süre hesaplanır.
  - AC-FR-E7-07-03: Tamamlandığında rozet/sertifika sunulur.
  - AC-FR-E7-07-04: İlerleme Gelişim paneline yansır.

#### FR-E7-08 Çevrimdışı indirme
- Story: US-7.8
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E7-08-01: İndirme butonu e-kitap detayında görünür.
  - AC-FR-E7-08-02: İndirme durumu (ilerleme, tamamlandı, hata) gösterilir.
  - AC-FR-E7-08-03: Yetersiz depolama durumunda uyarı yapılır.
  - AC-FR-E7-08-04: İndirilen kitaplar görsel olarak işaretlenir (✓).

### EPIC-8: Atölye Deneyimi

#### FR-E8-01 Atölye landing ve yapı özeti
- Story: US-8.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E8-01-01: Atölye landing ekranında başlık, tema, dönüşüm hedefi, hedef kitle, toplam süre ve ana ayet/hadis referansları görünür.
  - AC-FR-E8-01-02: Landing ekranında aşama sayısı, kamp günleri, workbook varlığı ve eğitmen rehberi varlığı etiketlerle gösterilir.
  - AC-FR-E8-01-03: Kullanıcı rolüne göre birincil CTA değişir: katılımcı için "Başla/Devam Et", eğitmen yetkisi olan kullanıcı için "Rehberi Aç".
  - AC-FR-E8-01-04: Son kalınan aşama ve oturum özet olarak gösterilir; çevrimdışı durumda son senkronize yapı görünür.

#### FR-E8-02 Aşama navigasyonu ve ilerleme modeli
- Story: US-8.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E8-02-01: Atölye, aşama bazlı liste veya zaman çizelgesi görünümünde gösterilir; her aşama için başlık, açıklama ve durum etiketi bulunur.
  - AC-FR-E8-02-02: Aşama 1-7 referans/içgörü katmanları, Aşama 8 kamp, Aşama 9 rehber, Aşama 10 workbook, Aşama 11 kapanış olarak tip bazlı etiketlenir.
  - AC-FR-E8-02-03: Kilitli aşamalar görsel olarak işaretlenir; kilit nedeni ve açılma koşulu kullanıcıya açıklanır (BR-04, BR-13).
  - AC-FR-E8-02-04: "Devam Et" aksiyonu kullanıcıyı son kalınan aşama veya oturuma götürür.

#### FR-E8-03 Aşama içerik ekranı
- Story: US-8.3
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E8-03-01: Aşama ekranı, yapılandırılmış içerik bloklarıyla gösterilir: giriş, ayet/hadis, açıklama, psikoloji/felsefe köprüsü, uygulama ve çıktı.
  - AC-FR-E8-03-02: Uzun metinler başlık, alıntı, çağrı kutusu ve çıktı bölümleriyle ayrıştırılır; düz tek parça akışa zorlanmaz.
  - AC-FR-E8-03-03: Vurgulama, not alma ve favoriye ekleme davranışları aşama içeriğinde desteklenir; kayıtlar ilgili aşama ve blok ile ilişkilendirilir.
  - AC-FR-E8-03-04: Aşama sonunda özet, bir sonraki aşamaya geçiş ve varsa ilgili workbook görevi sunulur.

#### FR-E8-04 3 günlük kamp ve oturum planı
- Story: US-8.4
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E8-04-01: Aşama 8 altında 1. Gün / 2. Gün / 3. Gün sekmeleri görünür; her günde sabah, öğle ve akşam oturumları ayrı kartlar halinde listelenir.
  - AC-FR-E8-04-02: Her oturum kartında başlık, amaç, süre, temel akış, beklenen çıktı ve kullanılan çalışma kağıtları görünür.
  - AC-FR-E8-04-03: Oturum ekranında konuşma akışı, uygulama adımları, grup çalışması ve kapanış cümlesi ayrı bloklar halinde sunulur.
  - AC-FR-E8-04-04: Oturum tamamlandığında ilerleme işaretlenir; gün özeti ve sonraki oturum önerisi gösterilir.

#### FR-E8-05 Eğitmen rehberi ve facilitator mode
- Story: US-8.5
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E8-05-01: Aşama 9 altında dakika dakika akış, birebir cümle önerileri, muhtemel katılımcı tepkileri ve alternatif akışlar erişilebilir olur.
  - AC-FR-E8-05-02: Facilitator mode açıkken büyük tipografi, hızlı bölüm atlama ve "zor senaryo" kısayolları sunulur.
  - AC-FR-E8-05-03: Rehber içeriği çevrimdışı erişime uygundur; indirildiyse bağlantı olmadan açılabilir.
  - AC-FR-E8-05-04: Eğitmen rehberi ile katılımcı görünümü karıştırılmaz; erişim ve sunum farkı rol bazlı yönetilir.

#### FR-E8-06 Katılımcı defteri ve çalışma kağıtları
- Story: US-8.6
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E8-06-01: Aşama 10 altında çalışma kağıtları yapılandırılmış alanlarla sunulur: yük haritası, iç cümle dönüştürme tablosu, dua kartı, tevekkül dengesi ve dönüş planı.
  - AC-FR-E8-06-02: Her worksheet girdisi otomatik kaydedilir ve workshop/aşama/oturum bağlamı ile saklanır (BR-15).
  - AC-FR-E8-06-03: Yarım kalan çalışma kağıtları daha sonra devam edilebilir; tamamlanan kağıtlar tarih bilgisiyle işaretlenir.
  - AC-FR-E8-06-04: Çalışma kağıtları paylaşım veya dışa aktarma öncesi gizlilik onayı ister (BR-09).

#### FR-E8-07 Takip planı ve davranış sürekliliği
- Story: US-8.7
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E8-07-01: Aşama 11 ve atölye tamamlanma alanında 72 saatlik toparlanma, 3 haftalık takip ve 30 günlük plan ayrı bölümler halinde gösterilir.
  - AC-FR-E8-07-02: Kullanıcı takip planında kendi niyetini, günlük cümlesini ve küçük doğru adımlarını kaydedebilir.
  - AC-FR-E8-07-03: İstenirse takip planı için hatırlatıcı oluşturulabilir; bu bildirimler günlük içerik hatırlatıcısından ayrı yapılandırılır.
  - AC-FR-E8-07-04: Takip planı ilerlemesi atölye arşivinde ve ilgili gelişim özetinde görünür.

#### FR-E8-08 Atölye tamamlama ve arşivleme
- Story: US-8.8
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E8-08-01: Tüm zorunlu aşamalar tamamlandığında atölye tamamlandı durumu gösterilir.
  - AC-FR-E8-08-02: Tamamlama ekranında aşama/oturum tamamlanma özeti, üretilen artefact sayısı ve seçili takip planı görünür.
  - AC-FR-E8-08-03: Sertifika/rozet destekleniyorsa tamamlama ekranında sunulur; desteklenmiyorsa tamamlanma rozeti gösterilir.
  - AC-FR-E8-08-04: Tamamlanan atölye Kütüphane ve Favoriler/Arşiv alanında yeniden açılabilir şekilde saklanır.

### EPIC-9: Favoriler ve Kişisel Arşiv

#### FR-E9-01 Favoriler ana ekranı
- Story: US-9.1
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E9-01-01: Tüm içerik türlerinden kaydedilen öğeler kaynak türüyle etiketlenir (Yolculuk/Atölye/Modül/e-Kitap).
  - AC-FR-E9-01-02: Arama ve filtreleme yapılabilir.
  - AC-FR-E9-01-03: Boş durumda "İçerik keşfet" CTA gösterilir.

#### FR-E9-02 Favori detayı
- Story: US-9.2
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E9-02-01: Kaynak bilgisi (kitap, atölye adı vb.) net görünür.
  - AC-FR-E9-02-02: Not düzenlenebilir ve otomatik kaydedilir.
  - AC-FR-E9-02-03: "Kaynağa Git" ile ilgili içerik ekranına yönlenilir.

#### FR-E9-03 Koleksiyonlar
- Story: US-9.3
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E9-03-01: Koleksiyon oluşturulabilir ve adlandırılabilir.
  - AC-FR-E9-03-02: Favoriler koleksiyona eklenebilir.
  - AC-FR-E9-03-03: Silme geri alınabilir (undo — snackbar ile 4-6 sn).

#### FR-E9-04 Arama ve filtreleme
- Story: US-9.4
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E9-04-01: Başlık, not içeriği ve kaynakta arama çalışır.
  - AC-FR-E9-04-02: İçerik türü filtresi uygulanabilir.
  - AC-FR-E9-04-03: "Temizle" ile filtreler sıfırlanır.

#### FR-E9-05 Paylaşım ve dışa aktarma
- Story: US-9.5
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E9-05-01: Gizlilik uyarısı gösterilir (BR-09).
  - AC-FR-E9-05-02: Kapsam seçilebilir: sadece vurgu / vurgu + not.
  - AC-FR-E9-05-03: PDF olarak aktarılabilir.

#### FR-E9-06 Çevrimdışı erişim
- Story: US-9.6
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E9-06-01: İndirilen favoriler çevrimdışı görüntülenir.
  - AC-FR-E9-06-02: Bağlantı gelince otomatik senkronlanır.
  - AC-FR-E9-06-03: Yetersiz depolama durumunda uyarı yapılır.

### EPIC-10: Erişilebilirlik ve Kapsayıcı Deneyim

#### FR-E10-01 Erişilebilirlik ayarları
- Story: US-10.1
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E10-01-01: Metin boyutu, yüksek kontrast, hareket azaltma seçenekleri tek ekranda görünür.
  - AC-FR-E10-01-02: Ayarlar anında uygulanır ve kalıcı olarak kaydedilir.
  - AC-FR-E10-01-03: Çevrimdışı da cihazda saklanır.

#### FR-E10-02 Metin büyütme
- Story: US-10.2
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E10-02-01: Slider ile metin boyutu değiştirilir; önizleme anlık güncellenir.
  - AC-FR-E10-02-02: Büyütme tüm içerik türlerine uygulanır.
  - AC-FR-E10-02-03: UI kırılmadan satır kaydırma korunur.

#### FR-E10-03 Yüksek kontrast ve tema
- Story: US-10.3
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E10-03-01: Yüksek kontrast modda metin/arka plan kontrastı en az 7:1 olur.
  - AC-FR-E10-03-02: Renk körlüğü için ikon ve desen desteği sağlanır.
  - AC-FR-E10-03-03: Açık / Koyu / Sistem tema seçilebilir.

#### FR-E10-04 Ekran okuyucu uyumu
- Story: US-10.4
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E10-04-01: Tüm butonlar ve etkileşimli elemanlar anlamlı etiketle (accessibilityLabel) okunur.
  - AC-FR-E10-04-02: Odak sırası görsel sıraya uygun ilerler.
  - AC-FR-E10-04-03: Form alanlarında label ve hata mesajları ekran okuyucu tarafından okunur.
  - AC-FR-E10-04-04: Grafik ve görseller için metin alternatifleri sağlanır.

### EPIC-11: Modül ve Paket Sistemi

#### FR-E11-01 Modül ana ekranı
- Story: US-11.1
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E11-01-01: Modül adı ve ilerleme yüzdesi görünür.
  - AC-FR-E11-01-02: Paketler sıralı listelenir; her paketin durumu (tamamlandı/devam/kilitli) gösterilir.
  - AC-FR-E11-01-03: "Devam Et" CTA ile sonraki uygun pakete gidilir.

#### FR-E11-02 Paket detayı ve başlatma
- Story: US-11.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E11-02-01: Paket açıklaması ve amaçları görünür.
  - AC-FR-E11-02-02: İçerdiği bölümler (okuma + uygulama) listelenir.
  - AC-FR-E11-02-03: "Paketi Başlat" CTA vardır.
  - AC-FR-E11-02-04: Önkoşul paket tamamlanmadıysa kilitli gösterilir ve neden açıklanır (BR-04).

#### FR-E11-03 Paket içi okuma ve uygulama
- Story: US-11.3, US-11.4
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E11-03-01: Okuma metni tam ekran gösterilir; vurgulama ve not alma desteklenir.
  - AC-FR-E11-03-02: Uygulama adımları sıralı gösterilir ve tamamlandıkça işaretlenir.
  - AC-FR-E11-03-03: Tamamlandığında sonraki bölüme geçiş sunulur.

#### FR-E11-04 Kilitli ilerleme (paket seviyesi)
- Story: US-11.5
- Acceptance Criteria Count: 3
- Acceptance Criteria:
  - AC-FR-E11-04-01: Tamamlanmamış paket sonrası sonraki paket "kilitli" gösterilir.
  - AC-FR-E11-04-02: Kilit nedeni açıklanır.
  - AC-FR-E11-04-03: 08:00 kuralı uygulanıyorsa geri sayım gösterilir (BR-01).

#### FR-E11-05 Modül tamamlama ve sertifika
- Story: US-11.6
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E11-05-01: Tüm paketler tamamlanınca modül biter.
  - AC-FR-E11-05-02: Sertifika/rozet sunulur.
  - AC-FR-E11-05-03: Sonraki modül önerilir.
  - AC-FR-E11-05-04: Tamamlanma Gelişim paneline yansır.

### EPIC-12: Koc Paneli

#### FR-E12-01 Danisan listesi ve risk gostergeleri
- Story: US-12.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E12-01-01: Koca atanmis danisan listesi goruntulenir.
  - AC-FR-E12-01-02: Danisan kartlarinda risk seviyesi (dusuk/orta/yuksek) gosterilir.
  - AC-FR-E12-01-03: Her danisan icin son aktivite tarihi goruntulenir.
  - AC-FR-E12-01-04: Liste risk seviyesine gore filtrelenebilir.

#### FR-E12-02 Danisan profili ve metrikler
- Story: US-12.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E12-02-01: Danisanin aktif hedefi profil ekraninda gorunur.
  - AC-FR-E12-02-02: Icerik durumlari (baslamadi/devam/tamamlandi) ozetlenir.
  - AC-FR-E12-02-03: Etkilesim metrikleri (oturum sayisi, son 7 gun aktivitesi) gosterilir.
  - AC-FR-E12-02-04: Ilerleme trendi grafik veya ozet metinle sunulur.

#### FR-E12-03 Icerik takibi
- Story: US-12.3
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E12-03-01: Danisanin aktif yolculuk ve atolye icerikleri listelenir.
  - AC-FR-E12-03-02: Okunan e-kitaplar ve ilgili bolum durumu goruntulenir.
  - AC-FR-E12-03-03: Her icerik icin tamamlanma yuzdesi gosterilir.
  - AC-FR-E12-03-04: Icerik bazli harcanan sure metrikleri goruntulenir.

#### FR-E12-04 Koc geri bildirim akisi
- Story: US-12.4
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E12-04-01: Koc, zengin metin destekli geri bildirim formu ile yorum yazabilir.
  - AC-FR-E12-04-02: Gonderilen geri bildirim danisana bildirim olarak iletilir.
  - AC-FR-E12-04-03: Geri bildirim gecmisi kronolojik olarak goruntulenebilir.
  - AC-FR-E12-04-04: Geri bildirim taslagi otomatik kaydedilir.

### EPIC-13: Birlikte Okuma

#### FR-E13-01 Okuma gruplari listesi ve durum ozeti
- Story: US-13.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E13-01-01: Kullanici dahil oldugu okuma gruplarini listede goruntuleyebilir.
  - AC-FR-E13-01-02: Her grup kartinda uye sayisi, aktif materyal ve son aktivite bilgisi gosterilir.
  - AC-FR-E13-01-03: Grup kartinda ortalama ilerleme yuzdesi gosterilir.
  - AC-FR-E13-01-04: Gruplar gizlilik veya durum filtreleriyle daraltilabilir.

#### FR-E13-02 Grup olusturma ve uye daveti
- Story: US-13.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E13-02-01: Grup olusturma ekraninda grup adi zorunlu alandir.
  - AC-FR-E13-02-02: Okuma materyali turu ve materyal secimi yapilabilir.
  - AC-FR-E13-02-03: Grup gizlilik ayari (acik/ozel) secilebilir.
  - AC-FR-E13-02-04: Uye daveti e-posta listesi veya paylasim baglantisi ile baslatilabilir.

#### FR-E13-03 Grup detayi ve tartisma alani
- Story: US-13.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E13-03-01: Grup detayinda secili materyal, hedef bolum ve grup ozeti goruntulenir.
  - AC-FR-E13-03-02: Uye listesi rol etiketleriyle birlikte goruntulenir.
  - AC-FR-E13-03-03: Grup tartisma akisi kronolojik mesaj listesi olarak gosterilir.
  - AC-FR-E13-03-04: Grup okuma takvimi ve siradaki oturum bilgisi gosterilir.

#### FR-E13-04 Grup ilerleme ve karsilastirma
- Story: US-13.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E13-04-01: Her uye icin bireysel tamamlanma yuzdesi goruntulenir.
  - AC-FR-E13-04-02: Grup ortalama ilerlemesi ve haftalik trend ozeti sunulur.
  - AC-FR-E13-04-03: Uyelerin ilerleme degerleri tablo veya grafikle karsilastirilabilir.
  - AC-FR-E13-04-04: Geri kalan hedefler icin nudge veya hatirlatma onerisi gosterilir.

### EPIC-14: Kitap Kulubu

#### FR-E14-01 Kulup listesi ve kesif ozeti
- Story: US-14.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E14-01-01: Kullanici katildigi kitap kulubu listelerini tek ekranda goruntuleyebilir.
  - AC-FR-E14-01-02: Her kulup kartinda uye sayisi, secili kitap ve son aktivite bilgisi gosterilir.
  - AC-FR-E14-01-03: Kulup kartinda siradaki toplanti zamani veya tartisma oturumu bilgisi yer alir.
  - AC-FR-E14-01-04: Kulup listesi durum veya gizlilik filtreleriyle daraltilabilir.

#### FR-E14-02 Kulup olusturma ve kitap secimi
- Story: US-14.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E14-02-01: Kulup olusturma akisinda kulup adi alani zorunludur.
  - AC-FR-E14-02-02: Kulup icin kitap secimi veya kitap aramasi yapilabilir.
  - AC-FR-E14-02-03: Tartisma/toplanti takvimi gun ve saat olarak tanimlanabilir.
  - AC-FR-E14-02-04: Kulup gizlilik tipi (acik/ozel) secimi ve davet mekanizmasi sunulur.

#### FR-E14-03 Kulup detayi ve uye alani
- Story: US-14.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E14-03-01: Kulup detay ekraninda kitap, guncel bolum ve kulup aciklamasi gosterilir.
  - AC-FR-E14-03-02: Kulup uye listesi rol etiketleriyle goruntulenir.
  - AC-FR-E14-03-03: Kulup icerisindeki aktif tartisma basliklari listelenir.
  - AC-FR-E14-03-04: Kulup takviminde planli oturumlar ve bir sonraki etkinlik bilgisi gosterilir.

#### FR-E14-04 Tartisma basligi ve etkileşim akisi
- Story: US-14.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E14-04-01: Tartisma akisi mesajlari kronolojik sirada goruntulenir.
  - AC-FR-E14-04-02: Uyeler mesajlara yanit veya alinti ile cevap verebilir.
  - AC-FR-E14-04-03: Her mesajda gonderim zamani ve reaksiyon ozeti gosterilir.
  - AC-FR-E14-04-04: Uygunsuz icerik bildirimi veya moderasyon eylemi tetiklenebilir.

### EPIC-15: Oyunlastirma ve Basarimlar

#### FR-E15-01 Basarim panosu ve rozet listesi
- Story: US-15.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E15-01-01: Toplam XP, kazanilan rozet sayisi ve kilitli rozet sayisi ayni ekranda goruntulenir.
  - AC-FR-E15-01-02: Kilitli rozet kartlarinda acilma kosulu veya kalan hedef bilgisi gosterilir.
  - AC-FR-E15-01-03: Rozet listesi kategori filtresi (journey/workshop/ebook) ile daraltilabilir.
  - AC-FR-E15-01-04: Her rozet kartinda odul XP degeri ve kazanildi/kilitli durumu net bicimde belirtilir.

#### FR-E15-02 Rozet detayi ve kilit kosullari
- Story: US-15.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E15-02-01: Rozet detayinda rozet adi, aciklamasi ve temsil ikonu goruntulenir.
  - AC-FR-E15-02-02: Rozet acilma kosullari ve mevcut ilerleme yuzdesi ayni alanda sunulur.
  - AC-FR-E15-02-03: Rozet kazanimi ile elde edilen XP odulu ve ek avantaj bilgisi gosterilir.
  - AC-FR-E15-02-04: Rozet detayindan sonraki hedefe gecis veya geri donus eylemleri tetiklenebilir.

#### FR-E15-03 Seviye sistemi ve XP ilerlemesi
- Story: US-15.3
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E15-03-01: Mevcut seviye numarasi ve seviye etiketi kullaniciya gorunur olarak sunulur.
  - AC-FR-E15-03-02: Sonraki seviyeye kalan XP miktari ve ilerleme cubugu gosterilir.
  - AC-FR-E15-03-03: Sonraki seviyenin acilma kosullari ve odul kazanimi listelenir.
  - AC-FR-E15-03-04: Seviye avantajlari ve bonus kurallari aciklayici metinle belirtilir.

#### FR-E15-04 Liderlik tablosu ve seri takibi
- Story: US-15.4
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E15-04-01: Liderlik tablosu kullanicilari XP puanina gore sirali olarak gosterir.
  - AC-FR-E15-04-02: Mevcut kullanicinin siralamadaki yeri ayri vurgu ile belirtilir.
  - AC-FR-E15-04-03: Siralama listesi hafta/ay/tum zaman filtreleri ile degistirilebilir.
  - AC-FR-E15-04-04: Her satirda kullanicinin aktif seri (streak) veya devamlilik metrikleri gosterilir.

### EPIC-16: AI Asistan ve RAG Destegi

#### FR-E16-01 AI sohbet girisi ve mesaj akisi
- Story: US-16.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E16-01-01: AI sohbet ekraninda gecmis konusmalar ve guncel oturum ayni listede goruntulenir.
  - AC-FR-E16-01-02: Kullanici serbest metin sorusu yazip mesaj gonderebilir.
  - AC-FR-E16-01-03: Hizli soru onerileri secilerek tek dokunusla sohbet kutusuna aktarilabilir.
  - AC-FR-E16-01-04: Sohbet arayuzu yalnizca onayli icerik kaynaklarindan yanit olusturuldugunu belirtir.

#### FR-E16-02 RAG yaniti ve baglam sentezi
- Story: US-16.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E16-02-01: AI yaniti Journey, Workshop ve eBook kaynaklarindan derlenen baglamla olusturulur.
  - AC-FR-E16-02-02: Yanit icinde kullanilan kaynak tipleri ve kaynak adedi goruntulenir.
  - AC-FR-E16-02-03: AI yaniti ana ozet ve destekleyici maddeler halinde yapilandirilmis sunulur.
  - AC-FR-E16-02-04: Kullanici yanit kartindan takip sorularina gecis eylemlerini tetikleyebilir.

#### FR-E16-03 Kaynak referansi ve izlenebilirlik
- Story: US-16.3
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E16-03-01: Her kaynak kartinda kaynak tipi, basligi ve ilgili icerik yolu goruntulenir.
  - AC-FR-E16-03-02: Kaynak kartindan ilgili orijinal icerige dogrudan gecis baglantisi sunulur.
  - AC-FR-E16-03-03: Kaynak ile ilgili baglam kesiti veya alinti parcasi goruntulenir.
  - AC-FR-E16-03-04: Kaynak uygunluk puani veya iliski seviyesi yuzdesel degerle belirtilir.

#### FR-E16-04 AI icgoruleri ve kisisel oneriler
- Story: US-16.4
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E16-04-01: Kullanici ilerleme verileri temelinde AI icgoruleri kart halinde sunulur.
  - AC-FR-E16-04-02: Yorum veya gunluk girdilerinden cikarilan duygu analizi ozeti goruntulenir.
  - AC-FR-E16-04-03: Tekrarlanan davranis kaliplari veya odak alanlari AI tarafindan etiketlenir.
  - AC-FR-E16-04-04: Kullaniciya bir sonraki adim icin kisisel oneri listesi sunulur.

### EPIC-17: Hatirlaticilar ve Bildirimler

#### FR-E17-01 Bildirim listesi ve okunma yonetimi
- Story: US-17.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E17-01-01: Bildirim listesi tip bazinda gruplanmis kartlar halinde goruntulenir.
  - AC-FR-E17-01-02: Okunmamis bildirim sayisi rozet veya badge ile ayri olarak gosterilir.
  - AC-FR-E17-01-03: Kullanici tekil bildirimi okundu olarak isaretleyebilir.
  - AC-FR-E17-01-04: Kullanici tum bildirimleri toplu sekilde okunduya cekebilir veya temizleyebilir.

#### FR-E17-02 Bildirim detayi ve hedefe gecis
- Story: US-17.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E17-02-01: Bildirim detayinda baslik, aciklama ve ilgili icerik ozeti gosterilir.
  - AC-FR-E17-02-02: Bildirim detayinda baglama uygun birincil eylem butonu bulunur.
  - AC-FR-E17-02-03: Bildirim kartindan ilgili hedef icerige dogrudan gecis baglantisi sunulur.
  - AC-FR-E17-02-04: Bildirim gonderim zamani veya zaman damgasi detay ekraninda gorunur.

#### FR-E17-03 Bildirim ayarlari ve sessiz saatler
- Story: US-17.3
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E17-03-01: Bildirim tipleri (journey/workshop/reading/social) ac-kapat anahtarlariyla yonetilir.
  - AC-FR-E17-03-02: Sessiz saat araligi baslangic ve bitis zamaniyla tanimlanabilir.
  - AC-FR-E17-03-03: Bildirim sikligi anlik, gunluk ozet veya haftalik ozet olarak secilebilir.
  - AC-FR-E17-03-04: Ses ve titresim tercihleri bagimsiz ayarlarla degistirilebilir.

#### FR-E17-04 Hatirlatici planlama ve tip bazli zamanlama
- Story: US-17.4
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E17-04-01: Gunluk hatirlaticilar bir veya birden fazla saat secilerek planlanabilir.
  - AC-FR-E17-04-02: Hatirlatici tipleri (journey/workshop/reading) icin ayri zamanlama yapilabilir.
  - AC-FR-E17-04-03: Her hatirlatici tipi icin etkin/pasif durumu ayri olarak ayarlanabilir.
  - AC-FR-E17-04-04: Ozel hatirlatici saatleri ekleme, duzenleme ve silme islemleri desteklenir.

### EPIC-18: Video Icerikler

#### FR-E18-01 Video katalogu ve kesif filtreleri
- Story: US-18.1
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E18-01-01: Video katalogu kart gorunumuyle kapak, sure ve seviye bilgileriyle listelenir.
  - AC-FR-E18-01-02: Kategori, sure ve zorluk filtreleri birlikte uygulanabilir.
  - AC-FR-E18-01-03: Kartlarda izleme ilerlemesi veya yeni durumu ayri rozetle gosterilir.
  - AC-FR-E18-01-04: Kullanici video detayina gecip Izlemeye Basla eylemini tetikleyebilir.

#### FR-E18-02 Video oynatici ve temel kontroller
- Story: US-18.2
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E18-02-01: Oynaticida oynat, duraklat ve sure cubugu kontrolleri sunulur.
  - AC-FR-E18-02-02: Kullanici 10 saniye ileri ve 10 saniye geri sarma eylemlerini kullanabilir.
  - AC-FR-E18-02-03: Oynatma hizi 0.75x, 1x, 1.25x ve 1.5x secenekleriyle degistirilebilir.
  - AC-FR-E18-02-04: Video tam ekran moda alinabilir ve son izleme konumundan devam edebilir.

#### FR-E18-03 Altyazi, transkript ve erisilebilirlik
- Story: US-18.3
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E18-03-01: Altyazi ac-kapat kontrolu ve desteklenen diller arasinda secim sunulur.
  - AC-FR-E18-03-02: Zaman damgali transkript satirina dokununca ilgili saniyeye atlanir.
  - AC-FR-E18-03-03: Altyazi metin boyutu ve kontrast gorunumu kullanici tarafindan ayarlanabilir.
  - AC-FR-E18-03-04: Oynatici kontrolleri ekran okuyucu etiketleri ve odak sirasiyla erisilebilir olur.

#### FR-E18-04 Video ilerleme, tamamlama ve senkronizasyon
- Story: US-18.4
- Acceptance Criteria Count: 4
- Acceptance Criteria:
  - AC-FR-E18-04-01: Video izleme ilerlemesi yuzdesel olarak anlik goruntulenir.
  - AC-FR-E18-04-02: Izleme oraninin yuzde 90 ve uzeri tamamlanma olarak isaretlenir.
  - AC-FR-E18-04-03: Devam et listesi kullaniciya son izlenen videolari sira ve konum bilgisiyle sunar.
  - AC-FR-E18-04-04: Cevrimdisi izleme ilerlemesi baglanti gelince sunucuyla senkronize edilir.

## Non-Functional Requirements

| ID | Metric/Rule | Target |
|---|---|---|
| NFR-PERF-01 | Uygulama cold start süresi | p95 < 4.0 sn |
| NFR-PERF-02 | Ana ekran ilk anlamlı çizim (FMP) | p95 < 2.5 sn |
| NFR-PERF-03 | Tab geçiş süresi | p95 < 300 ms |
| NFR-PERF-04 | İlk skeleton gösterimi | p95 < 150 ms |
| NFR-PERF-05 | Kritik ekran hata oranı | haftalık < %1 |
| NFR-PERF-06 | JS bundle boyutu (initial) | < 2 MB |
| NFR-SEC-01 | OTP güvenliği: en fazla 5 başarısız deneme → 15 dakika kilit. | - |
| NFR-SEC-02 | Giriş güvenliği: en fazla 5 başarısız deneme → 15 dakika kilit. | - |
| NFR-SEC-03 | Oturum süresi: 30 dakika inaktif → yeniden doğrulama. | - |
| NFR-SEC-04 | Token yönetimi: tokenlar güvenli depolama (Keychain/Keystore); çıkışta temizlenir. | - |
| NFR-SEC-05 | PII yasağı: analytics event payload'ına e-posta, telefon, serbest metin ham olarak yazılamaz. | - |
| NFR-SEC-06 | Demografi verisi: amaçla sınırlı işlenir; profil ekranından güncelleme/silme desteklenir. | - |
| NFR-SEC-07 | Paylaşım rızası: PDF/dışa aktarma öncesi kapsam seçimi ve açık onay zorunludur. | - |
| NFR-SEC-08 | Şifre politikası: minimum 8 karakter, harf + rakam zorunlu. | - |
| NFR-REL-01 | Crash-free sessions oranı ≥ %99.5. | - |
| NFR-REL-02 | Çevrimdışı durumda cache'deki içerik ve ayarlar görüntülenir. | - |
| NFR-REL-03 | Yazma aksiyonları (ilerleme, yorum, vurgu, favori) offline kuyrukta saklanır; bağlantı gelince senkronlanır. | - |
| NFR-REL-04 | Offline kuyruğu: SQLite outbox tablosu, exponential backoff, 10 başarısız denemede dead-letter; 30 gün / 20K satır / 50 MB sınırı. | - |
| NFR-REL-05 | Conflict resolution: last-write-wins (LWW), sunucu timestamp reconciliation. | - |

