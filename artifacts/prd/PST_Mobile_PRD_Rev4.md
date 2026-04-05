# PST Mobile App - Product Specification (SPEC / PRD Rev4)

**Belge ID:** PST_Mobile_PRD_Rev4  
**Versiyon:** 4.0.0  
**Tarih:** 4 Nisan 2026  
**Durum:** Draft — Implementation Ready  
**Sahip:** Product, UX, Engineering  
**Yerine Geçtiği Belge:** PST_Mobile_PRD_Rev3 v3.0.0

---

## Değişiklik Geçmişi

| Versiyon | Tarih        | Özet                                                                                                                                                                                                                                         |
| -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1.1    | Nisan 2026   | İlk PRD — epic tablolar, iş kuralları, güvenlik/performans notları                                                                                                                                                                           |
| 3.0.0    | 4 Nisan 2026 | Tam yeniden yazım: izlenebilir FR/AC/NFR kimlikleri, merkezi iş kuralları, roller & yetki matrisi, durum makineleri referansı, ölçülebilir NFR hedefleri, risk kaydı, çıkış kapıları, faz 2 zarfları, standardize test edilebilir AC formatı |
| 4.0.0    | 4 Nisan 2026 | Atölye alan modeli yeniden kuruldu: aşama-temelli workshop yapısı, 3 günlük kamp oturumları, eğitmen rehberi, katılımcı defteri, takip planları ve ilgili FR/analytics/glossary güncellemeleri                                               |

---

## 1. Belge Amacı

Bu doküman, PST Mobile ürününün **Faz 1 MVP** teslimatı için tekil, test edilebilir ve uygulamaya hazır ürün spesifikasyonudur. Hedefleri:

1. Her gereksinimi benzersiz bir kimlikle izlenebilir kılmak.
2. Uygulama kararlarını deterministik ve tek kaynaklı hale getirmek.
3. Kabul kriterlerini QA tarafından doğrudan doğrulanabilir formatta standardize etmek.
4. Faz 1 / Faz 2 kapsamını kesin olarak ayırmak.
5. Güvenlik, performans, erişilebilirlik ve analitik gereksinimlerini ölçülebilir eşiklerle tanımlamak.
6. Rev1'deki boşlukları (tekrarlı kurallar, belirsiz kapsam, eksik durumlar) kapatmak.

---

## 2. Rev4 Tasarım İlkeleri

| #   | İlke                                                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Tek kaynak kuralı:** Her iş kuralının bir ve yalnızca bir sahibi vardır; diğer yerler referans verir.                              |
| 2   | **Test edilebilirlik:** Her fonksiyonel gereksinim en az 2 kabul kriteri (AC) ile doğrulanır.                                        |
| 3   | **Ölçülebilirlik:** NFR hedefleri sayısal eşik (p95, yüzde, süre) içerir.                                                            |
| 4   | **Faz sınırı netliği:** Faz 1 = MVP; Faz 2 = genişleme. Her user story tek faza atanır.                                              |
| 5   | **Güvenlik varsayılanı:** PII minimizasyonu, sunucu tarafı doğrulama ve güvenli depolama zorunludur.                                 |
| 6   | **Erişilebilirlik varsayılanı:** WCAG 2.1 AA uyumu tüm ekranlarda zorunludur.                                                        |
| 7   | **Durum kapsama kuralı:** Her kritik ekranda loading, empty, error, offline durumları tanımlıdır.                                    |
| 8   | **Atölye program modeli:** Atölyeler, okuma+egzersiz çiftine indirgenmez; aşama, oturum, çıktı ve artefact katmanlarıyla modellenir. |

---

## 3. Rev4 İyileştirme Özeti (Rev3 → Rev4)

| ID     | Rev3 Boşluğu                                                          | Rev4 Kararı                                                                                                 |
| ------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| IMP-26 | Atölye modeli yalnızca okuma/uygulama çiftleriyle tanımlıydı          | Bölüm 6 ve EPIC-8 altında atölye, aşama → oturum → içerik bloğu/çıktı/artefact modeliyle yeniden tanımlandı |
| IMP-27 | Atölye detay sayfası yeni workshop belge tiplerini taşıyamıyordu      | FR-E4-04 ile tema, hedef kitle, aşama sayısı, oturum planı ve beklenen çıktılar detay ekranına eklendi      |
| IMP-28 | Eğitmen akışı ürün sözleşmesinde yoktu                                | EPIC-8 içinde eğitmen rehberi ve facilitator mode gereksinimleri eklendi                                    |
| IMP-29 | Katılımcı defteri ve çalışma kağıtları ürün varlığı olarak tanımsızdı | Workbook, worksheet ve oturum çıktıları kalıcı ürün artefact'ı olarak modellendi                            |
| IMP-30 | 3 günlük kamp yapısı uygulama modeline yansımıyordu                   | Sabah/öğle/akşam oturumlu kamp planı, süreler ve çıktı modeli FR seviyesinde tanımlandı                     |
| IMP-31 | Takip planları atölye sonrası davranışa bağlanmıyordu                 | 72 saat, 3 hafta ve 30 gün takip sistemleri ürün akışına bağlandı                                           |
| IMP-32 | Workshop zaman modeli günlük içerik kuralları ile karışıyordu         | BR-14 ile atölye zaman modeli günlük 08:00/23:59 kurallarından ayrıştırıldı                                 |
| IMP-33 | Workshop davranış analitiği yetersizdi                                | Workshop stage/session/workbook event'leri analytics sözleşmesine eklendi                                   |
| IMP-34 | Demografi tek kaynak referansı iş kuralında hatalıydı                 | BR-05 ve BR-06, doğru kaynak olan FR-E1-08'e düzeltildi                                                     |

---

## 4. Başarı Ölçütleri (KPI)

| Alan         | Ölçüt                                    | Hedef    |
| ------------ | ---------------------------------------- | -------- |
| Aktivasyon   | Kayıttan ilk içerik başlangıcına dönüşüm | ≥ %65    |
| Etkileşim    | Haftalık aktif kullanıcı oranı (WAU/MAU) | ≥ %45    |
| Tamamlama    | Günlük içerik teslim oranı               | ≥ %55    |
| Güvenilirlik | Crash-free sessions                      | ≥ %99.5  |
| Performans   | Ana ekran açılış p95                     | < 2.5 sn |
| Memnuniyet   | İçerik bitiş değerlendirmesi CSAT        | ≥ 4.2/5  |

---

## 5. Kimliklendirme ve İzlenebilirlik Standardı

| Varlık                    | Format                       | Örnek          |
| ------------------------- | ---------------------------- | -------------- |
| Epic                      | `EPIC-<no>`                  | EPIC-1         |
| User Story                | `US-<epic>.<sıra>`           | US-1.1         |
| Fonksiyonel Gereksinim    | `FR-E<epic>-<sıra>`          | FR-E1-01       |
| Kabul Kriteri             | `AC-FR-E<epic>-<sıra>-<alt>` | AC-FR-E1-01-01 |
| Non-functional Gereksinim | `NFR-<alan>-<sıra>`          | NFR-PERF-01    |
| Test Case                 | `TC-<alan>-<sıra>`           | TC-AUTH-01     |

Her AC maddesi: tek davranış → ölçülebilir → en az bir test case ile eşlenir.

---

## 6. İçerik Yapısı ve Hiyerarşisi

### 6.1 Hiyerarşi Diyagramı

```
PST İçerik Kütüphanesi
│
├── 🎯 Hazır Yolculuk (Journey)
│   ├── 📦 Modüller
│   │   └── 📋 Paketler
│   │       ├── Okumalar
│   │       └── Uygulamalar / Egzersizler
│   ├── 🎨 Atölyeler
│   │   └── Workshop Programı
│   │       ├── Aşamalar
│   │       │   ├── Oturumlar
│   │       │   │   ├── İçerik Blokları
│   │       │   │   ├── Çalışma Kağıtları
│   │       │   │   └── Oturum Çıktıları
│   │       ├── Eğitmen Rehberi
│   │       ├── Katılımcı Defteri
│   │       └── Takip Planları
│   └── 📖 e-Kitaplar
│       └── Bölümler
│
├── 📦 Bağımsız Modül
│   └── 📋 Paketler → Okumalar + Uygulamalar
│
├── 🎨 Bağımsız Atölye
│   └── Aşamalar → Oturumlar → İçerik Blokları + Artefact'lar + Takip Planları
│
└── 📖 Bağımsız e-Kitap
    └── Bölümler
```

### 6.2 İçerik Türleri Detayı

| İçerik Türü        | Açıklama                                                                                                   | Bileşenler                                                                  | Örnek                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Hazır Yolculuk** | PST koçları tarafından oluşturulmuş kapsamlı program                                                       | Modüller + Atölyeler + e-Kitaplar                                           | Sıdk ve Integrity Yolculuğu, Sabır Yolculuğu                |
| **Modül**          | Birden çok paketten oluşan tematik içerik grubu                                                            | Paketler                                                                    | Duygular Evreni Modülü                                      |
| **Paket**          | Modülün alt birimi, odaklanmış içerik                                                                      | Okumalar + Uygulamalar                                                      | Korku Duygusu Çözüm Paketi, Sıdk Paketi                     |
| **Atölye**         | Çok katmanlı dönüşüm programı; kavramsal analiz, kamp akışı, eğitmen rehberi ve katılımcı çıktıları içerir | Aşamalar + Oturumlar + Eğitmen Rehberi + Katılımcı Defteri + Takip Planları | Mutlak Muhtaçlık, İlahî Kayyûmiyyet ve Dua Bilinci Atölyesi |
| **e-Kitap**        | PST Coaching tarafından hazırlanan dijital kitap                                                           | Bölümler + Okuma                                                            | Şükür Şifresi, Kalbimin Beyazı, Yolcu                       |

### 6.3 e-Kitap Kütüphanesi

| Kitap Adı                            | Kategori            |
| ------------------------------------ | ------------------- |
| Şükür Şifresi                        | Şükür               |
| Kur'an Analizleri Serisi - El Fatiha | Kur'an Analizi      |
| Kalbimin Beyazı                      | Kişisel Gelişim     |
| Fırtınadaki Rehber                   | Kişisel Gelişim     |
| On Emir'in Kuran'daki Karşılığı      | Kur'an Analizi      |
| Farkındalığın Aynası                 | Farkındalık         |
| Babamız İbrahim'in (a.s.) Yolu       | Peygamber Kıssaları |
| Yolcu                                | Kişisel Gelişim     |
| İçimdeki Turkuaz                     | Kişisel Gelişim     |

### 6.4 Atölye Yapı Modeli

| Katman                 | Açıklama                                                                       | Mutlak Örneği                                                         |
| ---------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **Workshop Çekirdeği** | Tema, dönüşüm hedefi, ana ayetler, hedef kitle, toplam süre, beklenen çıktılar | Mutlak Muhtaçlık, İlahî Kayyûmiyyet ve Dua Bilinci                    |
| **Aşama (Stage)**      | Atölyenin ana bilgi ve deneyim bölümü                                          | Aşama 1 Kavram İnşası, Aşama 8 3 Günlük Kamp, Aşama 9 Eğitmen Rehberi |
| **Oturum (Session)**   | Zaman kutulu teslim parçası; çoğunlukla sabah/öğle/akşam akışı                 | 1. Gün Sabah Oturumu, 2. Gün Akşam Oturumu                            |
| **İçerik Bloğu**       | Ayet, açıklama, psikoloji köprüsü, uygulama, kapanış gibi alt parçalar         | Fâtır 15 çerçevesi, Adler köprüsü, umut kartı çalışması               |
| **Artefact**           | Kalıcı çıktı veya rehber materyali                                             | Yük haritası, kriz anı dua kartı, iç cümle dönüştürme tablosu         |
| **Takip Planı**        | Atölye sonrası davranış sürekliliği                                            | 72 saatlik toparlanma, 3 haftalık takip, 30 günlük plan               |

Atölyeler için operasyonel model:

1. Aşama 1-7 referans ve içgörü üretim katmanıdır.
2. Aşama 8 kamp/sunum akışını, Aşama 9 eğitmen rehberini, Aşama 10 katılımcı defterini, Aşama 11 kapanış ve hayata uygulama metnini taşır.
3. Ürün modeli, bu katmanları tek bir düz okuma listesine indirgemez; her katmanın kendi ilerleme, saklama ve sunum davranışı vardır.

---

## 7. Kapsam

### 7.1 Faz 1 (MVP — Production)

| Epic    | Başlık                       | Açıklama                                                                                                          |
| ------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| EPIC-1  | Dil, Hesap ve Güvenli Oturum | Kayıt, giriş, oturum güvenliği, dil, demografi, misafir                                                           |
| EPIC-2  | Ana Sayfa ve Navigasyon      | Bugün özeti, navigasyon, arama, hatırlatıcı, performans                                                           |
| EPIC-3  | Abonelik ve Kişi Yönetimi    | Plan satın alma, add-on, kişi (seat), öğrenci indirimi                                                            |
| EPIC-4  | İçerik Keşfi ve Katalog      | Keşfet ekranı, asistan, kataloglar, içerik başlatma                                                               |
| EPIC-5  | Okuma Deneyimi               | Günlük okuma, sesli dinleme, not/vurgu, yorum, teslim, kilitli ilerleme                                           |
| EPIC-6  | Gelişim ve Raporlama         | İlerleme paneli, duygusal harita, haftalık özet, rapor                                                            |
| EPIC-7  | e-Kitap Okuyucu              | Reader, sayfa navigasyonu, ayarlar, vurgu/not, sesli, indirme                                                     |
| EPIC-8  | Atölye Deneyimi              | Atölye landing, aşama navigasyonu, 3 günlük kamp oturumları, eğitmen rehberi, katılımcı defteri ve takip planları |
| EPIC-9  | Favoriler ve Kişisel Arşiv   | Favoriler, koleksiyonlar, arama, paylaşım, çevrimdışı                                                             |
| EPIC-10 | Erişilebilirlik              | Ayarlar, metin büyütme, kontrast/tema, ekran okuyucu                                                              |
| EPIC-11 | Modül ve Paket Sistemi       | Modül ana ekran, paket, kilitli ilerleme, sertifika                                                               |

### 7.2 Faz 2 (Genişleme)

| Epic    | Başlık                   |
| ------- | ------------------------ |
| EPIC-12 | Koç Paneli               |
| EPIC-13 | Birlikte Okuma           |
| EPIC-14 | Kitap Kulübü             |
| EPIC-15 | Oyunlaştırma             |
| EPIC-16 | AI Asistan (RAG Tabanlı) |
| EPIC-17 | Gelişmiş Bildirimler     |
| EPIC-18 | Video İçerikler          |

> **Kapsam Notu:** US-2.7 (günlük hatırlatıcı) Faz 1 kapsamındadır. EPIC-17, gelişmiş bildirim yeteneklerinin Faz 2 genişlemesidir.

### 7.3 Faz 1 Non-goals (Kapsam Dışı)

1. Segment bazlı kampanya ve öneri bildirimleri.
2. Koç paneli operasyonları.
3. Çok kullanıcılı topluluk moderasyonu.
4. AI üretken cevap altyapısı (RAG dahil).
5. Puan/rozet tabanlı tam oyunlaştırma.
6. Video içerik sunumu.
7. Koçluk Okulu tam program akışları (Faz 1'de yalnızca teaser + erişim kontrolü).

---

## 8. Global Deterministik İş Kuralları

Bu bölüm tüm epic'lerde geçerli olan iş kurallarının **tek kaynağıdır**. Epic içi AC'ler bu kurallara referans verir.

| ID    | Kural                                | Detay                                                                                                                                         |
| ----- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-01 | Yeni gün açılışı                     | Kullanıcı profil timezone'una göre **08:00**'de yeni günün içeriği açılır.                                                                    |
| BR-02 | Teslim zaman penceresi               | Yorum teslimi en geç **23:59**'a kadar; **23:00** itibarıyla nazik uyarı gösterilir.                                                          |
| BR-03 | Saat otoritesi                       | Teslim ve kilit kararlarında **sunucu saati** otoritedir; cihaz saati yalnızca UI gösterimidir.                                               |
| BR-04 | Kilitli ilerleme                     | Önceki adım tamamlanmadan sonraki adım açılamaz. Kilit nedeni kullanıcıya gösterilir.                                                         |
| BR-05 | İçerik başlatma kapı sırası          | Auth → Abonelik → Add-on → Demografi (FR-E1-08) → DDL Testi (yalnızca ilk yolculuk).                                                          |
| BR-06 | Demografi tek kaynak                 | Demografi kapısı **FR-E1-08** altında yönetilir. US-4.13/14/15/16 yalnızca giriş noktasını belirtir.                                          |
| BR-07 | Faz 1 bildirim kapsamı               | Yalnızca günlük tekil hatırlatıcı. Varsayılan saat: 20:00.                                                                                    |
| BR-08 | Sunucu tarafı satın alma doğrulaması | Tüm IAP işlemleri sunucu tarafında doğrulanır; client receipt tek başına yetki vermez.                                                        |
| BR-09 | Paylaşım/dışa aktarma rızası         | PDF/paylaşım öncesi kapsam seçimi ve açık kullanıcı onayı zorunludur.                                                                         |
| BR-10 | Analytics event formatı              | Event adları `snake_case`; zorunlu alanlar: `event_name`, `screen_id`, `user_role`, `subscription_status`, `timestamp`.                       |
| BR-11 | Psikolojik güvenlik uyarısı          | İçerik başlatma akışlarında standart bilgilendirme metni gösterilir.                                                                          |
| BR-12 | Otomatik kaydetme                    | Yorum ve not alanlarında taslak otomatik kaydedilir; kesinti durumunda taslak korunur.                                                        |
| BR-13 | Atölye yapısal otoritesi             | Atölye varlıkları aşama → oturum → içerik bloğu/çıktı/artefact düzeniyle tutulur; okuma/egzersiz çiftine indirgenmez.                         |
| BR-14 | Atölye zaman modeli                  | Atölyelerde toplam süre, oturum süresi ve takip ritmi esastır; BR-01/BR-02 yalnızca atölye bir günlük içerik döngüsüne bağlandıysa uygulanır. |
| BR-15 | Atölye artefact saklama              | Katılımcı defteri girdileri, kriz kartları ve takip planları workshop, aşama ve oturum bağlamıyla sürümlenerek otomatik kaydedilir.           |

---

## 9. Roller ve Yetki Matrisi

| Yetenek                      | Misafir            | Danışan (Üye)         | Plan Sahibi    | Koç (Faz 2) |
| ---------------------------- | ------------------ | --------------------- | -------------- | ----------- |
| Keşfet & katalog görüntüleme | ✅                 | ✅                    | ✅             | ✅          |
| İçerik detayı görüntüleme    | ✅                 | ✅                    | ✅             | ✅          |
| İçerik başlatma              | ❌ (kayıt zorunlu) | ✅ (abonelik gerekli) | ✅             | ✅          |
| Yorum yazma & teslim         | ❌                 | ✅                    | ✅             | ✅          |
| Favoriler & koleksiyonlar    | ❌                 | ✅                    | ✅             | ✅          |
| Gelişim paneli & rapor       | ❌                 | ✅                    | ✅             | ✅          |
| Abonelik satın alma          | ❌                 | ❌                    | ✅             | ❌          |
| Add-on yönetimi              | ❌                 | ❌                    | ✅             | ❌          |
| Kişi (seat) yönetimi         | ❌                 | ❌                    | ✅ (Aile/Grup) | ❌          |
| Koç paneli                   | ❌                 | ❌                    | ❌             | Faz 2       |

---

## 10. Durum Makineleri (Referans)

Detaylı tanımlar: `artifacts/domain/state_machines.json`

| Makine                            | Durumlar                                                         | Açıklama                                       |
| --------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| `content_progression`             | locked → available → in_progress → completed                     | İçerik ve alt bileşenler için kilitli ilerleme |
| `day_cycle_rules`                 | locked_until_08_00 → open → submission_closed → next_day_pending | Günlük açılış/teslim döngüsü                   |
| `subscription_entitlement_gating` | inactive → trial → active → canceled                             | Abonelik durum geçişleri ve erişim kontrolü    |

---

## 11. Tab Bar Yapısı

| Tab           | İkon       | Açıklama                                             | Erişim           |
| ------------- | ---------- | ---------------------------------------------------- | ---------------- |
| **Ana Sayfa** | 🏠 Home    | Bugün özeti, hızlı aksiyonlar, aktif içerik          | Tüm kullanıcılar |
| **Keşfet**    | 🧭 Compass | Katalog, asistan, arama                              | Tüm kullanıcılar |
| **Kütüphane** | 📚 Book    | Aktif içerikler, e-kitaplar, favoriler, indirilenler | Aktif abonelik   |
| **Gelişim**   | 📊 Chart   | İlerleme, duygusal harita, raporlar                  | Aktif abonelik   |
| **Profil**    | 👤 User    | Hesap, abonelik, ayarlar                             | Tüm kullanıcılar |

---

## 12. Abonelik Modeli

### 12.1 Planlar

| Özellik                                         | Bireysel | Aile | Grup |
| ----------------------------------------------- | -------- | ---- | ---- |
| Kullanıcı sayısı                                | 1        | 5    | 10   |
| Tüm içerik kütüphanesi                          | ✅       | ✅   | ✅   |
| Yolculuklar / Atölyeler / Modüller / e-Kitaplar | ✅       | ✅   | ✅   |
| Kilitli ilerleme                                | ✅       | ✅   | ✅   |
| Üye / davet yönetimi                            | ❌       | ✅   | ✅   |
| Öğrenci indirimi (%50)                          | ✅       | ❌   | ❌   |

### 12.2 Add-on'lar

| Add-on         | Açıklama                                          | Uygun Planlar          |
| -------------- | ------------------------------------------------- | ---------------------- |
| AI Paketi      | AI sohbet (RAG), günlük içerik üretimi, AI analiz | Bireysel / Aile / Grup |
| Koçluk Eğitimi | Koçluk Okulu programlarına erişim + dönem/cohort  | Bireysel / Aile / Grup |
| Ek Kişi +5     | Mevcut plana +5 kişi                              | Aile / Grup            |
| Ek Kişi +10    | Mevcut plana +10 kişi                             | Aile / Grup            |

---

## 13. Fonksiyonel Spesifikasyon — Faz 1

---

### EPIC-1: Dil, Hesap ve Güvenli Oturum

**FR-E1-01 Çok dilli onboarding ve profil dili**

> Story: US-1.1 — Danışan olarak, uygulamayı açtığımda TR/EN/ES dillerinden birini seçebilmek istiyorum.

| AC             | Kriter                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------- |
| AC-FR-E1-01-01 | İlk açılışta dil seçim ekranı (TR/EN/ES) gösterilir; seçim yapılmadan ilerlenemez.              |
| AC-FR-E1-01-02 | Seçilen dil kullanıcı profiline kaydedilir ve oturumlar arası korunur.                          |
| AC-FR-E1-01-03 | Tüm statik UI metinleri seçilen dilde gösterilir; eksik çeviride fallback dili (TR) kullanılır. |
| AC-FR-E1-01-04 | Profil → Ayarlar → Dil'den dil değiştirildiğinde uygulama yeniden başlatmadan güncellenir.      |
| AC-FR-E1-01-05 | Dil tercihi çevrimdışı da cihazda saklanır ve bağlantı gelince sunucuyla senkronlanır.          |

**FR-E1-02 Kayıt olma**

> Story: US-1.2 — Danışan olarak, e-posta veya telefon numaram ile kayıt olabilmek istiyorum.

| AC             | Kriter                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| AC-FR-E1-02-01 | E-posta veya telefon numarası için geçerli format kontrolü yapılır; geçersizde inline hata gösterilir. |
| AC-FR-E1-02-02 | OTP doğrulaması olmadan hesap aktive edilmez.                                                          |
| AC-FR-E1-02-03 | Yanlış OTP girildiğinde kalan deneme hakkı gösterilir.                                                 |
| AC-FR-E1-02-04 | 5 başarısız OTP denemesi sonrası 15 dakika geçici kilit uygulanır.                                     |
| AC-FR-E1-02-05 | Mevcut hesap kontrolü yapılır; kayıtlı hesap varsa bilgi mesajı ile giriş ekranına yönlendirilir.      |

**FR-E1-03 Giriş yapma**

> Story: US-1.3 — Danışan olarak, e-posta/telefon ve şifrem ile giriş yapmak istiyorum.

| AC             | Kriter                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------- |
| AC-FR-E1-03-01 | Doğru bilgilerle giriş yapıldığında ana sayfaya yönlendirilir.                              |
| AC-FR-E1-03-02 | Hatalı girişte güvenli hata mesajı gösterilir (hesap bilgisi sızdırmaz).                    |
| AC-FR-E1-03-03 | 5 başarısız giriş denemesi sonrası 15 dakika geçici kilit uygulanır; kalan süre gösterilir. |
| AC-FR-E1-03-04 | Başarılı girişte abonelik durumu ve kullanıcı rolü sunucudan senkronlanır.                  |

**FR-E1-04 Şifre sıfırlama**

> Story: US-1.4 — Danışan olarak, şifremi unuttuğumda sıfırlayabilmek istiyorum.

| AC             | Kriter                                                                                |
| -------------- | ------------------------------------------------------------------------------------- |
| AC-FR-E1-04-01 | E-posta veya telefon ile doğrulama akışı başlatılır.                                  |
| AC-FR-E1-04-02 | Yeni şifre politikalarına (minimum 8 karakter, harf + rakam) uygunluk kontrol edilir. |
| AC-FR-E1-04-03 | Başarılı sıfırlama sonrası giriş ekranına yönlendirilir ve başarı mesajı gösterilir.  |

**FR-E1-05 Oturum yönetimi ve güvenlik**

> Story: US-1.5, US-1.6 — Oturum çıkış, süre ve güvenlik.

| AC             | Kriter                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| AC-FR-E1-05-01 | Çıkış yapıldığında erişim tokenları güvenli depodan (Keychain/Keystore) silinir ve oturum sonlandırılır.  |
| AC-FR-E1-05-02 | 30 dakika inaktif kullanım sonrası yeniden doğrulama ekranı gösterilir.                                   |
| AC-FR-E1-05-03 | Geçersiz/süresi dolmuş oturum tespit edildiğinde giriş ekranına yönlendirilir ve bilgi mesajı gösterilir. |
| AC-FR-E1-05-04 | Korumalı sayfalara erişim için tekrar kimlik doğrulama zorunludur.                                        |

**FR-E1-06 Abonelik ve rol doğrulama**

> Story: US-1.7 — Giriş sonrası abonelik durumu ve rolün doğru algılanması.

| AC             | Kriter                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------- |
| AC-FR-E1-06-01 | Giriş sonrası abonelik durumu (aktif/deneme/iptal/yok) sunucudan güncellenir.            |
| AC-FR-E1-06-02 | Plan Sahibi / Üye rolü doğru atanır ve erişim kısıtlamaları uygulanır.                   |
| AC-FR-E1-06-03 | Abonelik olmayan kullanıcıda Kütüphane ve Gelişim tablarına erişimde paywall gösterilir. |

**FR-E1-07 Biyometrik giriş (FaceID/TouchID)**

> Story: US-1.8 — FaceID ile giriş yapabilmek.

| AC             | Kriter                                                                      |
| -------------- | --------------------------------------------------------------------------- |
| AC-FR-E1-07-01 | Biyometrik destekli cihazlarda ilk girişte açık onay (opt-in) istenir.      |
| AC-FR-E1-07-02 | Biyometrik doğrulama başarısızsa şifre ile giriş ekranına fallback yapılır. |
| AC-FR-E1-07-03 | Profil → Ayarlar'dan biyometrik giriş açılıp kapatılabilir.                 |

**FR-E1-08 Demografi bilgisi toplama (Tek Kaynak)**

> Story: US-1.9 — İçerik başlatmadan önce yaş/cinsiyet/ülke bilgisi.

| AC             | Kriter                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| AC-FR-E1-08-01 | İlk kez herhangi bir içerik (yolculuk/modül/atölye/e-kitap) başlatmadan önce demografi formu açılır. |
| AC-FR-E1-08-02 | Bilgiler kaydedilmeden içerik başlatılamaz.                                                          |
| AC-FR-E1-08-03 | Yaş alanı zorunlu; 13-120 aralığında doğrulanır.                                                     |
| AC-FR-E1-08-04 | Cinsiyet alanı opsiyonel: Kadın / Erkek / Belirtmek istemiyorum.                                     |
| AC-FR-E1-08-05 | Ülke alanı zorunlu; arama ile seçilebilir.                                                           |
| AC-FR-E1-08-06 | Demografi daha önce kaydedilmişse tekrar sorulmaz (BR-06).                                           |
| AC-FR-E1-08-07 | Bilgiler Profil → Ayarlar → Demografi'den görüntülenir ve güncellenebilir.                           |

**FR-E1-09 Misafir giriş (kayıtsız)**

> Story: US-1.10 — Kayıt olmadan uygulamaya giriş.

| AC             | Kriter                                                                      |
| -------------- | --------------------------------------------------------------------------- |
| AC-FR-E1-09-01 | Misafir oturumu başlatılır; profil oluşturulmaz.                            |
| AC-FR-E1-09-02 | Keşfet ve detay ekranları erişilebilir olur.                                |
| AC-FR-E1-09-03 | İçerik başlatma/okuma aksiyonlarında kayıt ekranına yönlendirilir.          |
| AC-FR-E1-09-04 | Kayıt sonrası misafir oturumundaki gezinme verileri kullanıcıya devredilir. |

---

### EPIC-2: Ana Sayfa ve Navigasyon

**FR-E2-01 Bugün özeti ve tekil devam CTA**

> Story: US-2.1

| AC             | Kriter                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------- |
| AC-FR-E2-01-01 | Bugün kartında aktif içerik hedefi, kalan süre (23:59'a geri sayım) ve "Devam Et" CTA görünür. |
| AC-FR-E2-01-02 | "Devam Et" aksiyonu kullanıcıyı kaldığı adım ekranına (yolculuk/atölye/modül/e-kitap) götürür. |
| AC-FR-E2-01-03 | Aktif içerik yoksa keşfet yönlendirmesi yapılır.                                               |
| AC-FR-E2-01-04 | Çevrimdışı durumda son senkronize özet gösterilir.                                             |

**FR-E2-02 Abonelik durumu rozetleri**

> Story: US-2.2

| AC             | Kriter                                                       |
| -------------- | ------------------------------------------------------------ |
| AC-FR-E2-02-01 | Plan durumu rozet olarak gösterilir: Aktif / Deneme / İptal. |
| AC-FR-E2-02-02 | Aktif add-on'lar etiketlenir.                                |
| AC-FR-E2-02-03 | Kısıtlı içeriğe tıklandığında kısıtlama nedeni açıklanır.    |

**FR-E2-03 İçerik alanları navigasyonu**

> Story: US-2.3

| AC             | Kriter                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| AC-FR-E2-03-01 | İçerik türleri için ayrı giriş kartları gösterilir (Yolculuklar, Atölyeler, e-Kitaplar, Koçluk Okulu). |
| AC-FR-E2-03-02 | Tek dokunuşla ilgili kataloğa gidilir.                                                                 |
| AC-FR-E2-03-03 | Erişim kısıtlıysa paywall gösterilir.                                                                  |

**FR-E2-04 "Vicdandan Karaktere" bilgilendirmesi**

> Story: US-2.4

| AC             | Kriter                                       |
| -------------- | -------------------------------------------- |
| AC-FR-E2-04-01 | Kısa özet metin kartı ana sayfada görünür.   |
| AC-FR-E2-04-02 | "Detayları Gör" ile detay sayfasına gidilir. |
| AC-FR-E2-04-03 | Çevrimdışı durumda cache'den gösterilir.     |

**FR-E2-05 Hızlı arama**

> Story: US-2.5

| AC             | Kriter                                                                         |
| -------------- | ------------------------------------------------------------------------------ |
| AC-FR-E2-05-01 | Arama alanına dokunulunca arama ekranı açılır.                                 |
| AC-FR-E2-05-02 | Sonuçlar içerik türüne göre kategorize edilir (yolculuk/atölye/modül/e-kitap). |
| AC-FR-E2-05-03 | Sonuç bulunamazsa "sonuç yok" açıklaması ve keşfet önerisi gösterilir.         |

**FR-E2-06 Aktif içeriklerim özeti**

> Story: US-2.6

| AC             | Kriter                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------- |
| AC-FR-E2-06-01 | En fazla 3 aktif içerik kartı gösterilir; her kartta ilerleme yüzdesi ve tür etiketi yer alır. |
| AC-FR-E2-06-02 | "Tümünü Gör" ile Kütüphane tabına yönlendirilir.                                               |
| AC-FR-E2-06-03 | Kilitli içerikler görsel olarak etiketlenir.                                                   |

**FR-E2-07 Son görüntülenen içerikler**

> Story: US-2.7

| AC             | Kriter                                                                    |
| -------------- | ------------------------------------------------------------------------- |
| AC-FR-E2-07-01 | Son görüntülenen içerikler en fazla 5 kart olarak listelenir.             |
| AC-FR-E2-07-02 | Her kartta tür etiketi, son görüntülenme zamanı ve kaldığı bölüm görünür. |
| AC-FR-E2-07-03 | Boş durumda önerilen içerikler gösterilir.                                |
| AC-FR-E2-07-04 | Analytics: `recent_content_viewed`, `recent_content_item_clicked`         |

**FR-E2-08 Günlük hatırlatıcı**

> Story: US-2.8

| AC             | Kriter                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------- |
| AC-FR-E2-08-01 | Bildirim izni alınmadan önce açıklama metni gösterilir (neden bildirimlere ihtiyaç var). |
| AC-FR-E2-08-02 | Varsayılan hatırlatma saati 20:00'de ayarlanır; kullanıcı tarafından değiştirilebilir.   |
| AC-FR-E2-08-03 | Gün için yorum teslim edilmişse tekrar hatırlatma yapılmaz.                              |
| AC-FR-E2-08-04 | Faz 1'de yalnızca günlük tekil hatırlatıcı desteklenir (BR-07).                          |

**FR-E2-09 Ana akış performansı**

> Story: US-2.9

| AC             | Kriter                                                    |
| -------------- | --------------------------------------------------------- |
| AC-FR-E2-09-01 | Ana ekran ilk açılışta skeleton yükleme gösterilir.       |
| AC-FR-E2-09-02 | Kritik kartlar (Bugün özeti, Devam Et) önce yüklenir.     |
| AC-FR-E2-09-03 | Hata durumunda kart bazlı "Tekrar Dene" aksiyonu sunulur. |

---

### EPIC-3: Abonelik ve Kişi Yönetimi

**FR-E3-01 Plan seçimi ve karşılaştırma**

> Story: US-3.1

| AC             | Kriter                                                                     |
| -------------- | -------------------------------------------------------------------------- |
| AC-FR-E3-01-01 | Bireysel (1) / Aile (5) / Grup (10) planları kişi limitleriyle listelenir. |
| AC-FR-E3-01-02 | Tüm planların içerik erişimi ve farklılıkları net şekilde karşılaştırılır. |
| AC-FR-E3-01-03 | Seçilen plan görsel olarak vurgulanır ve "Devam Et" butonu aktif olur.     |

**FR-E3-02 Satın alma ve aktivasyon**

> Story: US-3.2

| AC             | Kriter                                                                       |
| -------------- | ---------------------------------------------------------------------------- |
| AC-FR-E3-02-01 | Platform (Apple/Google) yerel satın alma akışı açılır.                       |
| AC-FR-E3-02-02 | Server-side doğrulama sonrası erişim (entitlement) hemen aktif olur (BR-08). |
| AC-FR-E3-02-03 | Başka cihazda giriş yapıldığında abonelik senkronlanır.                      |
| AC-FR-E3-02-04 | Satın alma hatası durumunda kullanıcıya açık hata mesajı gösterilir.         |

**FR-E3-03 Add-on yönetimi**

> Story: US-3.3

| AC             | Kriter                                                                          |
| -------------- | ------------------------------------------------------------------------------- |
| AC-FR-E3-03-01 | Add-on'lar fiyat ve mevcut durumla listelenir.                                  |
| AC-FR-E3-03-02 | Aktifleştirme ve kapatma işlemleri yapılabilir.                                 |
| AC-FR-E3-03-03 | Ek Kişi add-on'u yalnızca Aile/Grup planları için gösterilir.                   |
| AC-FR-E3-03-04 | Plan Üyesi (member) add-on satın alma yapamaz; yalnızca Plan Sahibi yetkilidir. |

**FR-E3-04 Öğrenci indirimi**

> Story: US-3.4

| AC             | Kriter                                                               |
| -------------- | -------------------------------------------------------------------- |
| AC-FR-E3-04-01 | Doğrulama yöntemleri sunulur (öğrenci e-postası veya belge yükleme). |
| AC-FR-E3-04-02 | Başarılı doğrulamada %50 indirim uygulanır.                          |
| AC-FR-E3-04-03 | Gizlilik açıklaması indirim başvurusundan önce gösterilir.           |
| AC-FR-E3-04-04 | Yıllık yeniden doğrulama gerekir; süresi doluyorsa uyarı gösterilir. |

**FR-E3-05 Plan yönetimi (değiştir/iptal)**

> Story: US-3.5, US-3.8

| AC             | Kriter                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| AC-FR-E3-05-01 | Mevcut plan, yenileme tarihi ve doluluk gösterilir.                    |
| AC-FR-E3-05-02 | Plan düşürmede kişi limiti aşılıyorsa kişi sayısı azaltılması istenir. |
| AC-FR-E3-05-03 | İptal etkileri net listelenir (tüm içerikler, ilerleme kaydı).         |
| AC-FR-E3-05-04 | İptal sonrası dönem sonuna kadar erişim devam eder.                    |
| AC-FR-E3-05-05 | Platform iptal akışına yönlendirilir.                                  |

**FR-E3-06 Kişi (seat) yönetimi**

> Story: US-3.6

| AC             | Kriter                                                    |
| -------------- | --------------------------------------------------------- |
| AC-FR-E3-06-01 | Doluluk durumu gösterilir (ör. 3/5 dolu).                 |
| AC-FR-E3-06-02 | Davet gönderme (e-posta/telefon) ve kaldırma yapılabilir. |
| AC-FR-E3-06-03 | Limit doluysa Ek Kişi add-on önerilir.                    |
| AC-FR-E3-06-04 | Plan Üyesi sadece kendi durumunu görür.                   |

**FR-E3-07 Ödeme geçmişi ve geri yükleme**

> Story: US-3.7

| AC             | Kriter                                                                |
| -------------- | --------------------------------------------------------------------- |
| AC-FR-E3-07-01 | Son ödemeler tarih ve tutarla listelenir.                             |
| AC-FR-E3-07-02 | "Satın Alımları Geri Yükle" ile platform üzerinden erişim doğrulanır. |
| AC-FR-E3-07-03 | Makbuz detayı görüntülenebilir.                                       |

---

### EPIC-4: İçerik Keşfi ve Katalog

**FR-E4-01 Keşfet ana ekranı**

> Story: US-4.1

| AC             | Kriter                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------- |
| AC-FR-E4-01-01 | İçerik türleri tab/segment olarak görünür: Yolculuklar / Atölyeler / Modüller / e-Kitaplar. |
| AC-FR-E4-01-02 | İçerik Asistanı birincil CTA olarak görünür.                                                |
| AC-FR-E4-01-03 | Abonelik olmayan kullanıcıda kısıtlı içeriklere tıklandığında paywall gösterilir.           |

**FR-E4-02 İçerik belirleme asistanı**

> Story: US-4.2

| AC             | Kriter                                                   |
| -------------- | -------------------------------------------------------- |
| AC-FR-E4-02-01 | Hedef, süre ve tercih sorularıyla adım adım akış başlar. |
| AC-FR-E4-02-02 | 1 ana + 2 alternatif içerik önerisi listelenir.          |
| AC-FR-E4-02-03 | "Atla" ile doğrudan kataloğa gidilebilir.                |

**FR-E4-03 Yolculuk kataloğu ve detayı**

> Story: US-4.3, US-4.4

| AC             | Kriter                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| AC-FR-E4-03-01 | Yolculuklar kart halinde listelenir: süre, seviye, içerik sayısı.                                     |
| AC-FR-E4-03-02 | Hedef / süre / seviye filtreleri ve sıralama (Önerilen/Popüler/Yeni) uygulanabilir.                   |
| AC-FR-E4-03-03 | Detay ekranında açıklama, süre, günlük hedef aralığı, içerdiği modüller/atölyeler/e-kitaplar görünür. |
| AC-FR-E4-03-04 | "Yolculuğu Başlat" CTA ve favorilere ekleme aksiyonu vardır.                                          |

**FR-E4-04 Atölye kataloğu ve detayı**

> Story: US-4.5, US-4.6

| AC             | Kriter                                                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-FR-E4-04-01 | Atölyeler kart halinde listelenir: tema, hedef kitle, toplam süre, aşama sayısı ve kamp/rehber/workbook etiketleri.                             |
| AC-FR-E4-04-02 | Tema, hedef yaş aralığı, teslim biçimi (bireysel / grup / kamp) ve süre bazlı filtreleme yapılabilir.                                           |
| AC-FR-E4-04-03 | Detay ekranında açıklama, dönüşüm hedefi, ana ayet/hadisler, aşama listesi, kamp günleri, beklenen çıktılar ve bağlı yolculuk varsa gösterilir. |
| AC-FR-E4-04-04 | Detay ekranında "Atölyeyi Başlat", "Katılımcı Defterini Önizle" ve varsa "Eğitmen Rehberini Gör" aksiyonları bulunur.                           |

**FR-E4-05 Modül kataloğu ve detayı**

> Story: US-4.7, US-4.8

| AC             | Kriter                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------ |
| AC-FR-E4-05-01 | Modüller kart halinde listelenir; her modülün içerdiği paketler görünür.                   |
| AC-FR-E4-05-02 | Konu bazlı filtreleme yapılabilir.                                                         |
| AC-FR-E4-05-03 | Detay ekranında paketler sıralı listelenir; her paketin kısa açıklaması ve süresi görünür. |
| AC-FR-E4-05-04 | "Modülü Başlat" CTA vardır.                                                                |

**FR-E4-06 e-Kitap kataloğu ve detayı**

> Story: US-4.9, US-4.10

| AC             | Kriter                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------- |
| AC-FR-E4-06-01 | e-Kitaplar kapak görseli ile listelenir; kategori filtreleme yapılabilir.                |
| AC-FR-E4-06-02 | Sayfa sayısı ve tahmini okuma süresi görünür.                                            |
| AC-FR-E4-06-03 | Detay ekranında açıklama, yazar, kategori, içindekiler, bağlı yolculuk varsa gösterilir. |
| AC-FR-E4-06-04 | "Okumaya Başla" CTA vardır.                                                              |

**FR-E4-07 İçerik başlatma (ortak akış)**

> Story: US-4.11

| AC             | Kriter                                                                                                                           |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| AC-FR-E4-07-01 | İçerik başlatmada kapı sırası uygulanır (BR-05): Auth → Abonelik → Add-on → Demografi → DDL.                                     |
| AC-FR-E4-07-02 | İçerik türüne göre planlama seçenekleri sunulur: yolculuklar için günlük hedef, atölyeler için oturum/kamp planı.                |
| AC-FR-E4-07-03 | İçerik türüne uygun zaman kuralları gösterilir: günlük içerikte 08:00/23:59, atölyede toplam süre, oturum süresi ve takip ritmi. |
| AC-FR-E4-07-04 | Psikolojik güvenlik bilgilendirme metni gösterilir (BR-11).                                                                      |
| AC-FR-E4-07-05 | "Başla" ile içerik aktif olur; içerik türüne göre günlük hatırlatıcı veya atölye takip planı ayarlanabilir.                      |

**FR-E4-08 Misafir görüntüleme ve kayıt zorunluluğu**

> Story: US-4.12

| AC             | Kriter                                                           |
| -------------- | ---------------------------------------------------------------- |
| AC-FR-E4-08-01 | Misafir kullanıcı tüm katalog ve detay ekranlarını görebilir.    |
| AC-FR-E4-08-02 | Ücretsiz içerikler "Free" etiketiyle işaretlenir.                |
| AC-FR-E4-08-03 | "Başlat/Okumaya Başla" aksiyonunda kayıt ekranına yönlendirilir. |
| AC-FR-E4-08-04 | Kayıt sonrası ücretsiz içerikler paywall olmadan açılır.         |

**FR-E4-09 İçerik türüne özel demografi giriş noktaları**

> Story: US-4.13, US-4.14, US-4.15, US-4.16

| AC             | Kriter                                                                                                               |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| AC-FR-E4-09-01 | Yolculuk/Modül/Atölye/e-Kitap başlatma giriş noktalarında demografi kapısı **FR-E1-08** referansıyla kontrol edilir. |
| AC-FR-E4-09-02 | Bu giriş noktaları kendi demografi kuralı tanımlamaz; tek kaynak FR-E1-08'dir (BR-06).                               |

**FR-E4-10 İlk yolculukta DDL testi**

> Story: US-4.17

| AC             | Kriter                                                                     |
| -------------- | -------------------------------------------------------------------------- |
| AC-FR-E4-10-01 | İlk kez yolculuk başlatma denemesinde DDL testi açılır.                    |
| AC-FR-E4-10-02 | Test tamamlanmadan yolculuk başlatılamaz.                                  |
| AC-FR-E4-10-03 | Test sonuçları kullanıcı profiline kaydedilir; tamamlanma tarihi saklanır. |
| AC-FR-E4-10-04 | Daha önce tamamlanmışsa tekrar istenmez.                                   |
| AC-FR-E4-10-05 | Analytics: `ddl_test_started`, `ddl_test_completed`, `ddl_test_abandoned`  |

---

### EPIC-5: Okuma Deneyimi

**FR-E5-01 Günün içeriğini okuma**

> Story: US-5.1

| AC             | Kriter                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------- |
| AC-FR-E5-01-01 | Gün/bölüm numarası, hedef ve son teslim zamanı (23:59) görünür.                             |
| AC-FR-E5-01-02 | Okuma ilerleme göstergesi kaydırma/sayfa ilerledikçe güncellenir.                           |
| AC-FR-E5-01-03 | Çevrimdışı durumda skeleton + "Tekrar Dene" gösterilir; cache mevcutsa içerik görüntülenir. |
| AC-FR-E5-01-04 | Erişilebilirlik ayarları (metin boyutu, kontrast) uygulanır.                                |

**FR-E5-02 Sesli okuma**

> Story: US-5.2

| AC             | Kriter                                                           |
| -------------- | ---------------------------------------------------------------- |
| AC-FR-E5-02-01 | Oynatma kontrolleri (play/pause/hız) görünür.                    |
| AC-FR-E5-02-02 | Okunan bölüm metinde vurgulanır (senkron takip).                 |
| AC-FR-E5-02-03 | Hız ayarı: 0.75× / 1× / 1.25× anında uygulanır.                  |
| AC-FR-E5-02-04 | Arka planda platform kurallarına (audio session) uygun davranır. |

**FR-E5-03 Altını çizme ve not alma**

> Story: US-5.3

| AC             | Kriter                                                                       |
| -------------- | ---------------------------------------------------------------------------- |
| AC-FR-E5-03-01 | Metin seçildiğinde "Vurgula / Not Ekle / Favoriye Kaydet" araçları görünür.  |
| AC-FR-E5-03-02 | Not ve vurgular kalıcı olarak saklanır; otomatik kaydetme uygulanır (BR-12). |
| AC-FR-E5-03-03 | Her vurgu/not içerik kaynağı ile ilişkilendirilir (kitap adı, bölüm vb.).    |
| AC-FR-E5-03-04 | Favorilere eklenebilir.                                                      |

**FR-E5-04 Yorum yazma ve teslim**

> Story: US-5.4, US-5.5

| AC             | Kriter                                                                  |
| -------------- | ----------------------------------------------------------------------- |
| AC-FR-E5-04-01 | İçeriğe özel yönlendirici sorular görünür.                              |
| AC-FR-E5-04-02 | Taslak otomatik kaydedilir (BR-12).                                     |
| AC-FR-E5-04-03 | Kelime sayacı görünür.                                                  |
| AC-FR-E5-04-04 | 23:00 sonrası nazik uyarı gösterilir (BR-02).                           |
| AC-FR-E5-04-05 | "Önizle & Teslim Et" ekranında cevaplar özet halinde gösterilir.        |
| AC-FR-E5-04-06 | 23:59'dan önce "Teslim Et" aktif olur; teslim sonrası yorum kilitlenir. |
| AC-FR-E5-04-07 | 23:59 sonrası teslim butonu deaktif olur; zamanaşımı durumu gösterilir. |

**FR-E5-05 Kilitli ilerleme (08:00 kuralı)**

> Story: US-5.6

| AC             | Kriter                                                                                              |
| -------------- | --------------------------------------------------------------------------------------------------- |
| AC-FR-E5-05-01 | Bugünkü içerik tamamlandığında "Bugün tamamlandı" durumu gösterilir.                                |
| AC-FR-E5-05-02 | Yarınki içerik kilitli gösterilir; "Yeni içerik 08:00'de açılacak" mesajı ve geri sayım gösterilir. |
| AC-FR-E5-05-03 | 08:00 olunca (BR-01, BR-03) içerik otomatik olarak available duruma geçer.                          |

**FR-E5-06 Uygulama/egzersiz tamamlama**

> Story: US-5.7

| AC             | Kriter                                                                      |
| -------------- | --------------------------------------------------------------------------- |
| AC-FR-E5-06-01 | Uygulama adımları sıralı gösterilir.                                        |
| AC-FR-E5-06-02 | Her adım tamamlandığında işaretlenir.                                       |
| AC-FR-E5-06-03 | Tüm adımlar tamamlanınca ilerleme kaydedilir ve "Sonraki" ile devam edilir. |

---

### EPIC-6: Gelişim ve Raporlama

**FR-E6-01 Gelişim paneli**

> Story: US-6.1

| AC             | Kriter                                                                                             |
| -------------- | -------------------------------------------------------------------------------------------------- |
| AC-FR-E6-01-01 | İçerik türü bazlı ilerleme (yolculuk / atölye / modül / e-kitap) grafik ve metriklerle gösterilir. |
| AC-FR-E6-01-02 | Teslim oranı ve alışkanlık zinciri (streak) görünür.                                               |
| AC-FR-E6-01-03 | Grafik özet metni ekran okuyucuya erişilebilir olarak sunulur.                                     |

**FR-E6-02 Duygusal harita**

> Story: US-6.2

| AC             | Kriter                                                  |
| -------------- | ------------------------------------------------------- |
| AC-FR-E6-02-01 | Son 14 / 30 gün görünümü seçilebilir.                   |
| AC-FR-E6-02-02 | Legend açıklaması (ör. Sakin/Netlik/Gergin) gösterilir. |
| AC-FR-E6-02-03 | "Bu bir teşhis değildir" uyarısı her zaman görünür.     |
| AC-FR-E6-02-04 | Renk körlüğü için ikon/desen desteği sağlanır.          |

**FR-E6-03 Güçlü ve gelişim alanları**

> Story: US-6.3

| AC             | Kriter                                                          |
| -------------- | --------------------------------------------------------------- |
| AC-FR-E6-03-01 | Güçlü ve gelişim alanları ayrı kartlarda listelenir.            |
| AC-FR-E6-03-02 | Somut öneriler ve ilgili içerik referansları sunulur.           |
| AC-FR-E6-03-03 | "Önerileri Uygula" aksiyonu ilgili içerik detayına yönlendirir. |

**FR-E6-04 Haftalık özet**

> Story: US-6.4

| AC             | Kriter                                                |
| -------------- | ----------------------------------------------------- |
| AC-FR-E6-04-01 | Pozitif trend, zorlayan alan ve öneri görünür.        |
| AC-FR-E6-04-02 | Tamamlanan içerikler listelenir.                      |
| AC-FR-E6-04-03 | Yeterli veri yoksa açıklama gösterilir (empty state). |

**FR-E6-05 İçerik bitiş değerlendirmesi**

> Story: US-6.5

| AC             | Kriter                                                                       |
| -------------- | ---------------------------------------------------------------------------- |
| AC-FR-E6-05-01 | İçerik tamamlandığında (yolculuk/atölye/modül) değerlendirme formu önerilir. |
| AC-FR-E6-05-02 | "Daha Sonra" ile ertelenebilir.                                              |
| AC-FR-E6-05-03 | Yanıtlar kaydedilir ve sonraki içerik önerisi sunulur.                       |

**FR-E6-06 Gelişim raporu (indir/paylaş)**

> Story: US-6.6

| AC             | Kriter                                             |
| -------------- | -------------------------------------------------- |
| AC-FR-E6-06-01 | Özet metrikler, temalar ve öneriler içerir.        |
| AC-FR-E6-06-02 | PDF olarak indirilebilir.                          |
| AC-FR-E6-06-03 | Paylaşım öncesi gizlilik onayı gösterilir (BR-09). |

---

### EPIC-7: e-Kitap Okuyucu

**FR-E7-01 e-Kitap okuyucu açılışı**

> Story: US-7.1

| AC             | Kriter                                                   |
| -------------- | -------------------------------------------------------- |
| AC-FR-E7-01-01 | Son okunan sayfa otomatik açılır.                        |
| AC-FR-E7-01-02 | Kitap başlığı ve mevcut sayfa / toplam sayfa gösterilir. |
| AC-FR-E7-01-03 | İçindekiler erişilebilir (TOC sheet/panel).              |
| AC-FR-E7-01-04 | Çevrimdışı okuma desteklenir (indirilen kitap için).     |

**FR-E7-02 Sayfa navigasyonu**

> Story: US-7.2

| AC             | Kriter                                               |
| -------------- | ---------------------------------------------------- |
| AC-FR-E7-02-01 | Kaydırma veya sayfa çevirme ile gezinme desteklenir. |
| AC-FR-E7-02-02 | Sayfa numarasına atlama özelliği vardır.             |
| AC-FR-E7-02-03 | İçindekiler'den bölüme atlama desteklenir.           |
| AC-FR-E7-02-04 | İlerleme çubuğu görünür.                             |

**FR-E7-03 Okuma ayarları**

> Story: US-7.3

| AC             | Kriter                                                    |
| -------------- | --------------------------------------------------------- |
| AC-FR-E7-03-01 | Font boyutu ayarlanabilir (slider ile).                   |
| AC-FR-E7-03-02 | Arka plan rengi seçilebilir: Beyaz / Sepia / Koyu.        |
| AC-FR-E7-03-03 | Satır aralığı ayarlanabilir.                              |
| AC-FR-E7-03-04 | Ayarlar kitaplar arası saklanır (ReadingSettings entity). |

**FR-E7-04 Metin vurgulama ve not**

> Story: US-7.4

| AC             | Kriter                                          |
| -------------- | ----------------------------------------------- |
| AC-FR-E7-04-01 | Metin seçildiğinde renk seçenekleri görünür.    |
| AC-FR-E7-04-02 | Not eklenebilir ve otomatik kaydedilir (BR-12). |
| AC-FR-E7-04-03 | Vurgular favorilere eklenebilir.                |

**FR-E7-05 Vurgularım ve notlarım listesi**

> Story: US-7.5

| AC             | Kriter                                 |
| -------------- | -------------------------------------- |
| AC-FR-E7-05-01 | Kitaba özel vurgu/not listesi görünür. |
| AC-FR-E7-05-02 | Dokunarak ilgili sayfaya gidilir.      |
| AC-FR-E7-05-03 | Not düzenlenebilir.                    |
| AC-FR-E7-05-04 | Dışa aktarılabilir (PDF/metin).        |

**FR-E7-06 Sesli kitap desteği**

> Story: US-7.6

| AC             | Kriter                                                          |
| -------------- | --------------------------------------------------------------- |
| AC-FR-E7-06-01 | Sesli versiyon varsa Play butonu görünür; yoksa buton gizlenir. |
| AC-FR-E7-06-02 | Metin ile senkron takip edilir.                                 |
| AC-FR-E7-06-03 | Hız ayarlanabilir (0.75× / 1× / 1.25×).                         |
| AC-FR-E7-06-04 | Arka planda çalabilir (audio session).                          |

**FR-E7-07 Okuma ilerlemesi**

> Story: US-7.7

| AC             | Kriter                                   |
| -------------- | ---------------------------------------- |
| AC-FR-E7-07-01 | İlerleme yüzdesi görünür.                |
| AC-FR-E7-07-02 | Tahmini kalan süre hesaplanır.           |
| AC-FR-E7-07-03 | Tamamlandığında rozet/sertifika sunulur. |
| AC-FR-E7-07-04 | İlerleme Gelişim paneline yansır.        |

**FR-E7-08 Çevrimdışı indirme**

> Story: US-7.8

| AC             | Kriter                                                  |
| -------------- | ------------------------------------------------------- |
| AC-FR-E7-08-01 | İndirme butonu e-kitap detayında görünür.               |
| AC-FR-E7-08-02 | İndirme durumu (ilerleme, tamamlandı, hata) gösterilir. |
| AC-FR-E7-08-03 | Yetersiz depolama durumunda uyarı yapılır.              |
| AC-FR-E7-08-04 | İndirilen kitaplar görsel olarak işaretlenir (✓).       |

---

### EPIC-8: Atölye Deneyimi

**FR-E8-01 Atölye landing ve yapı özeti**

> Story: US-8.1

| AC             | Kriter                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| AC-FR-E8-01-01 | Atölye landing ekranında başlık, tema, dönüşüm hedefi, hedef kitle, toplam süre ve ana ayet/hadis referansları görünür.        |
| AC-FR-E8-01-02 | Landing ekranında aşama sayısı, kamp günleri, workbook varlığı ve eğitmen rehberi varlığı etiketlerle gösterilir.              |
| AC-FR-E8-01-03 | Kullanıcı rolüne göre birincil CTA değişir: katılımcı için "Başla/Devam Et", eğitmen yetkisi olan kullanıcı için "Rehberi Aç". |
| AC-FR-E8-01-04 | Son kalınan aşama ve oturum özet olarak gösterilir; çevrimdışı durumda son senkronize yapı görünür.                            |

**FR-E8-02 Aşama navigasyonu ve ilerleme modeli**

> Story: US-8.2

| AC             | Kriter                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| AC-FR-E8-02-01 | Atölye, aşama bazlı liste veya zaman çizelgesi görünümünde gösterilir; her aşama için başlık, açıklama ve durum etiketi bulunur.      |
| AC-FR-E8-02-02 | Aşama 1-7 referans/içgörü katmanları, Aşama 8 kamp, Aşama 9 rehber, Aşama 10 workbook, Aşama 11 kapanış olarak tip bazlı etiketlenir. |
| AC-FR-E8-02-03 | Kilitli aşamalar görsel olarak işaretlenir; kilit nedeni ve açılma koşulu kullanıcıya açıklanır (BR-04, BR-13).                       |
| AC-FR-E8-02-04 | "Devam Et" aksiyonu kullanıcıyı son kalınan aşama veya oturuma götürür.                                                               |

**FR-E8-03 Aşama içerik ekranı**

> Story: US-8.3

| AC             | Kriter                                                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| AC-FR-E8-03-01 | Aşama ekranı, yapılandırılmış içerik bloklarıyla gösterilir: giriş, ayet/hadis, açıklama, psikoloji/felsefe köprüsü, uygulama ve çıktı. |
| AC-FR-E8-03-02 | Uzun metinler başlık, alıntı, çağrı kutusu ve çıktı bölümleriyle ayrıştırılır; düz tek parça akışa zorlanmaz.                           |
| AC-FR-E8-03-03 | Vurgulama, not alma ve favoriye ekleme davranışları aşama içeriğinde desteklenir; kayıtlar ilgili aşama ve blok ile ilişkilendirilir.   |
| AC-FR-E8-03-04 | Aşama sonunda özet, bir sonraki aşamaya geçiş ve varsa ilgili workbook görevi sunulur.                                                  |

**FR-E8-04 3 günlük kamp ve oturum planı**

> Story: US-8.4

| AC             | Kriter                                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| AC-FR-E8-04-01 | Aşama 8 altında 1. Gün / 2. Gün / 3. Gün sekmeleri görünür; her günde sabah, öğle ve akşam oturumları ayrı kartlar halinde listelenir. |
| AC-FR-E8-04-02 | Her oturum kartında başlık, amaç, süre, temel akış, beklenen çıktı ve kullanılan çalışma kağıtları görünür.                            |
| AC-FR-E8-04-03 | Oturum ekranında konuşma akışı, uygulama adımları, grup çalışması ve kapanış cümlesi ayrı bloklar halinde sunulur.                     |
| AC-FR-E8-04-04 | Oturum tamamlandığında ilerleme işaretlenir; gün özeti ve sonraki oturum önerisi gösterilir.                                           |

**FR-E8-05 Eğitmen rehberi ve facilitator mode**

> Story: US-8.5

| AC             | Kriter                                                                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| AC-FR-E8-05-01 | Aşama 9 altında dakika dakika akış, birebir cümle önerileri, muhtemel katılımcı tepkileri ve alternatif akışlar erişilebilir olur. |
| AC-FR-E8-05-02 | Facilitator mode açıkken büyük tipografi, hızlı bölüm atlama ve "zor senaryo" kısayolları sunulur.                                 |
| AC-FR-E8-05-03 | Rehber içeriği çevrimdışı erişime uygundur; indirildiyse bağlantı olmadan açılabilir.                                              |
| AC-FR-E8-05-04 | Eğitmen rehberi ile katılımcı görünümü karıştırılmaz; erişim ve sunum farkı rol bazlı yönetilir.                                   |

**FR-E8-06 Katılımcı defteri ve çalışma kağıtları**

> Story: US-8.6

| AC             | Kriter                                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-FR-E8-06-01 | Aşama 10 altında çalışma kağıtları yapılandırılmış alanlarla sunulur: yük haritası, iç cümle dönüştürme tablosu, dua kartı, tevekkül dengesi ve dönüş planı. |
| AC-FR-E8-06-02 | Her worksheet girdisi otomatik kaydedilir ve workshop/aşama/oturum bağlamı ile saklanır (BR-15).                                                             |
| AC-FR-E8-06-03 | Yarım kalan çalışma kağıtları daha sonra devam edilebilir; tamamlanan kağıtlar tarih bilgisiyle işaretlenir.                                                 |
| AC-FR-E8-06-04 | Çalışma kağıtları paylaşım veya dışa aktarma öncesi gizlilik onayı ister (BR-09).                                                                            |

**FR-E8-07 Takip planı ve davranış sürekliliği**

> Story: US-8.7

| AC             | Kriter                                                                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| AC-FR-E8-07-01 | Aşama 11 ve atölye tamamlanma alanında 72 saatlik toparlanma, 3 haftalık takip ve 30 günlük plan ayrı bölümler halinde gösterilir. |
| AC-FR-E8-07-02 | Kullanıcı takip planında kendi niyetini, günlük cümlesini ve küçük doğru adımlarını kaydedebilir.                                  |
| AC-FR-E8-07-03 | İstenirse takip planı için hatırlatıcı oluşturulabilir; bu bildirimler günlük içerik hatırlatıcısından ayrı yapılandırılır.        |
| AC-FR-E8-07-04 | Takip planı ilerlemesi atölye arşivinde ve ilgili gelişim özetinde görünür.                                                        |

**FR-E8-08 Atölye tamamlama ve arşivleme**

> Story: US-8.8

| AC             | Kriter                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| AC-FR-E8-08-01 | Tüm zorunlu aşamalar tamamlandığında atölye tamamlandı durumu gösterilir.                                   |
| AC-FR-E8-08-02 | Tamamlama ekranında aşama/oturum tamamlanma özeti, üretilen artefact sayısı ve seçili takip planı görünür.  |
| AC-FR-E8-08-03 | Sertifika/rozet destekleniyorsa tamamlama ekranında sunulur; desteklenmiyorsa tamamlanma rozeti gösterilir. |
| AC-FR-E8-08-04 | Tamamlanan atölye Kütüphane ve Favoriler/Arşiv alanında yeniden açılabilir şekilde saklanır.                |

---

### EPIC-9: Favoriler ve Kişisel Arşiv

**FR-E9-01 Favoriler ana ekranı**

> Story: US-9.1

| AC             | Kriter                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| AC-FR-E9-01-01 | Tüm içerik türlerinden kaydedilen öğeler kaynak türüyle etiketlenir (Yolculuk/Atölye/Modül/e-Kitap). |
| AC-FR-E9-01-02 | Arama ve filtreleme yapılabilir.                                                                     |
| AC-FR-E9-01-03 | Boş durumda "İçerik keşfet" CTA gösterilir.                                                          |

**FR-E9-02 Favori detayı**

> Story: US-9.2

| AC             | Kriter                                               |
| -------------- | ---------------------------------------------------- |
| AC-FR-E9-02-01 | Kaynak bilgisi (kitap, atölye adı vb.) net görünür.  |
| AC-FR-E9-02-02 | Not düzenlenebilir ve otomatik kaydedilir.           |
| AC-FR-E9-02-03 | "Kaynağa Git" ile ilgili içerik ekranına yönlenilir. |

**FR-E9-03 Koleksiyonlar**

> Story: US-9.3

| AC             | Kriter                                              |
| -------------- | --------------------------------------------------- |
| AC-FR-E9-03-01 | Koleksiyon oluşturulabilir ve adlandırılabilir.     |
| AC-FR-E9-03-02 | Favoriler koleksiyona eklenebilir.                  |
| AC-FR-E9-03-03 | Silme geri alınabilir (undo — snackbar ile 4-6 sn). |

**FR-E9-04 Arama ve filtreleme**

> Story: US-9.4

| AC             | Kriter                                         |
| -------------- | ---------------------------------------------- |
| AC-FR-E9-04-01 | Başlık, not içeriği ve kaynakta arama çalışır. |
| AC-FR-E9-04-02 | İçerik türü filtresi uygulanabilir.            |
| AC-FR-E9-04-03 | "Temizle" ile filtreler sıfırlanır.            |

**FR-E9-05 Paylaşım ve dışa aktarma**

> Story: US-9.5

| AC             | Kriter                                          |
| -------------- | ----------------------------------------------- |
| AC-FR-E9-05-01 | Gizlilik uyarısı gösterilir (BR-09).            |
| AC-FR-E9-05-02 | Kapsam seçilebilir: sadece vurgu / vurgu + not. |
| AC-FR-E9-05-03 | PDF olarak aktarılabilir.                       |

**FR-E9-06 Çevrimdışı erişim**

> Story: US-9.6

| AC             | Kriter                                       |
| -------------- | -------------------------------------------- |
| AC-FR-E9-06-01 | İndirilen favoriler çevrimdışı görüntülenir. |
| AC-FR-E9-06-02 | Bağlantı gelince otomatik senkronlanır.      |
| AC-FR-E9-06-03 | Yetersiz depolama durumunda uyarı yapılır.   |

---

### EPIC-10: Erişilebilirlik ve Kapsayıcı Deneyim

**FR-E10-01 Erişilebilirlik ayarları**

> Story: US-10.1

| AC              | Kriter                                                                          |
| --------------- | ------------------------------------------------------------------------------- |
| AC-FR-E10-01-01 | Metin boyutu, yüksek kontrast, hareket azaltma seçenekleri tek ekranda görünür. |
| AC-FR-E10-01-02 | Ayarlar anında uygulanır ve kalıcı olarak kaydedilir.                           |
| AC-FR-E10-01-03 | Çevrimdışı da cihazda saklanır.                                                 |

**FR-E10-02 Metin büyütme**

> Story: US-10.2

| AC              | Kriter                                                            |
| --------------- | ----------------------------------------------------------------- |
| AC-FR-E10-02-01 | Slider ile metin boyutu değiştirilir; önizleme anlık güncellenir. |
| AC-FR-E10-02-02 | Büyütme tüm içerik türlerine uygulanır.                           |
| AC-FR-E10-02-03 | UI kırılmadan satır kaydırma korunur.                             |

**FR-E10-03 Yüksek kontrast ve tema**

> Story: US-10.3

| AC              | Kriter                                                          |
| --------------- | --------------------------------------------------------------- |
| AC-FR-E10-03-01 | Yüksek kontrast modda metin/arka plan kontrastı en az 7:1 olur. |
| AC-FR-E10-03-02 | Renk körlüğü için ikon ve desen desteği sağlanır.               |
| AC-FR-E10-03-03 | Açık / Koyu / Sistem tema seçilebilir.                          |

**FR-E10-04 Ekran okuyucu uyumu**

> Story: US-10.4

| AC              | Kriter                                                                              |
| --------------- | ----------------------------------------------------------------------------------- |
| AC-FR-E10-04-01 | Tüm butonlar ve etkileşimli elemanlar anlamlı etiketle (accessibilityLabel) okunur. |
| AC-FR-E10-04-02 | Odak sırası görsel sıraya uygun ilerler.                                            |
| AC-FR-E10-04-03 | Form alanlarında label ve hata mesajları ekran okuyucu tarafından okunur.           |
| AC-FR-E10-04-04 | Grafik ve görseller için metin alternatifleri sağlanır.                             |

---

### EPIC-11: Modül ve Paket Sistemi

**FR-E11-01 Modül ana ekranı**

> Story: US-11.1

| AC              | Kriter                                                                                |
| --------------- | ------------------------------------------------------------------------------------- |
| AC-FR-E11-01-01 | Modül adı ve ilerleme yüzdesi görünür.                                                |
| AC-FR-E11-01-02 | Paketler sıralı listelenir; her paketin durumu (tamamlandı/devam/kilitli) gösterilir. |
| AC-FR-E11-01-03 | "Devam Et" CTA ile sonraki uygun pakete gidilir.                                      |

**FR-E11-02 Paket detayı ve başlatma**

> Story: US-11.2

| AC              | Kriter                                                                       |
| --------------- | ---------------------------------------------------------------------------- |
| AC-FR-E11-02-01 | Paket açıklaması ve amaçları görünür.                                        |
| AC-FR-E11-02-02 | İçerdiği bölümler (okuma + uygulama) listelenir.                             |
| AC-FR-E11-02-03 | "Paketi Başlat" CTA vardır.                                                  |
| AC-FR-E11-02-04 | Önkoşul paket tamamlanmadıysa kilitli gösterilir ve neden açıklanır (BR-04). |

**FR-E11-03 Paket içi okuma ve uygulama**

> Story: US-11.3, US-11.4

| AC              | Kriter                                                               |
| --------------- | -------------------------------------------------------------------- |
| AC-FR-E11-03-01 | Okuma metni tam ekran gösterilir; vurgulama ve not alma desteklenir. |
| AC-FR-E11-03-02 | Uygulama adımları sıralı gösterilir ve tamamlandıkça işaretlenir.    |
| AC-FR-E11-03-03 | Tamamlandığında sonraki bölüme geçiş sunulur.                        |

**FR-E11-04 Kilitli ilerleme (paket seviyesi)**

> Story: US-11.5

| AC              | Kriter                                                          |
| --------------- | --------------------------------------------------------------- |
| AC-FR-E11-04-01 | Tamamlanmamış paket sonrası sonraki paket "kilitli" gösterilir. |
| AC-FR-E11-04-02 | Kilit nedeni açıklanır.                                         |
| AC-FR-E11-04-03 | 08:00 kuralı uygulanıyorsa geri sayım gösterilir (BR-01).       |

**FR-E11-05 Modül tamamlama ve sertifika**

> Story: US-11.6

| AC              | Kriter                                 |
| --------------- | -------------------------------------- |
| AC-FR-E11-05-01 | Tüm paketler tamamlanınca modül biter. |
| AC-FR-E11-05-02 | Sertifika/rozet sunulur.               |
| AC-FR-E11-05-03 | Sonraki modül önerilir.                |
| AC-FR-E11-05-04 | Tamamlanma Gelişim paneline yansır.    |

---

## 14. Non-Functional Gereksinimler (NFR)

### 14.1 Performans (NFR-PERF)

| ID          | Ölçüt                             | Hedef         |
| ----------- | --------------------------------- | ------------- |
| NFR-PERF-01 | Uygulama cold start süresi        | p95 < 4.0 sn  |
| NFR-PERF-02 | Ana ekran ilk anlamlı çizim (FMP) | p95 < 2.5 sn  |
| NFR-PERF-03 | Tab geçiş süresi                  | p95 < 300 ms  |
| NFR-PERF-04 | İlk skeleton gösterimi            | p95 < 150 ms  |
| NFR-PERF-05 | Kritik ekran hata oranı           | haftalık < %1 |
| NFR-PERF-06 | JS bundle boyutu (initial)        | < 2 MB        |

### 14.2 Güvenlik (NFR-SEC)

| ID         | Kural                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------- |
| NFR-SEC-01 | OTP güvenliği: en fazla 5 başarısız deneme → 15 dakika kilit.                                 |
| NFR-SEC-02 | Giriş güvenliği: en fazla 5 başarısız deneme → 15 dakika kilit.                               |
| NFR-SEC-03 | Oturum süresi: 30 dakika inaktif → yeniden doğrulama.                                         |
| NFR-SEC-04 | Token yönetimi: tokenlar güvenli depolama (Keychain/Keystore); çıkışta temizlenir.            |
| NFR-SEC-05 | PII yasağı: analytics event payload'ına e-posta, telefon, serbest metin ham olarak yazılamaz. |
| NFR-SEC-06 | Demografi verisi: amaçla sınırlı işlenir; profil ekranından güncelleme/silme desteklenir.     |
| NFR-SEC-07 | Paylaşım rızası: PDF/dışa aktarma öncesi kapsam seçimi ve açık onay zorunludur.               |
| NFR-SEC-08 | Şifre politikası: minimum 8 karakter, harf + rakam zorunlu.                                   |

### 14.3 Güvenilirlik ve Çevrimdışı (NFR-REL)

| ID         | Kural                                                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| NFR-REL-01 | Crash-free sessions oranı ≥ %99.5.                                                                                                 |
| NFR-REL-02 | Çevrimdışı durumda cache'deki içerik ve ayarlar görüntülenir.                                                                      |
| NFR-REL-03 | Yazma aksiyonları (ilerleme, yorum, vurgu, favori) offline kuyrukta saklanır; bağlantı gelince senkronlanır.                       |
| NFR-REL-04 | Offline kuyruğu: SQLite outbox tablosu, exponential backoff, 10 başarısız denemede dead-letter; 30 gün / 20K satır / 50 MB sınırı. |
| NFR-REL-05 | Conflict resolution: last-write-wins (LWW), sunucu timestamp reconciliation.                                                       |

### 14.4 Erişilebilirlik (NFR-A11Y)

| ID          | Kural                                                                         |
| ----------- | ----------------------------------------------------------------------------- |
| NFR-A11Y-01 | WCAG 2.1 AA uyumu tüm ekranlarda zorunludur.                                  |
| NFR-A11Y-02 | Metin kontrastı: normal metin ≥ 4.5:1; büyük metin ≥ 3:1.                     |
| NFR-A11Y-03 | Dokunma hedefi minimum 48dp, arası 8dp.                                       |
| NFR-A11Y-04 | Sistem font boyutuna (Dynamic Type) uyum; büyük fontlarda UI kırılması olmaz. |
| NFR-A11Y-05 | Reduce motion ayarına uyulur; animasyonlar minimize edilir.                   |
| NFR-A11Y-06 | Yüksek kontrast modu Material 3 palette desteği ile sağlanır.                 |

### 14.5 Lokalizasyon (NFR-I18N)

| ID          | Kural                                                                         |
| ----------- | ----------------------------------------------------------------------------- |
| NFR-I18N-01 | Desteklenen diller: TR, EN, ES.                                               |
| NFR-I18N-02 | Eksik çeviri varsa fallback dili (TR) kullanılır; kullanıcıya bilgi verilmez. |
| NFR-I18N-03 | RTL desteği Faz 1'de kapsam dışıdır.                                          |
| NFR-I18N-04 | Tarih/saat formatları kullanıcı locale'ine uygun gösterilir.                  |

---

## 15. Hata Sınıfları ve Retry Kuralları

| Hata Sınıfı              | Davranış                                                  | Retry                                  |
| ------------------------ | --------------------------------------------------------- | -------------------------------------- |
| **Ağ hatası**            | Global banner: "Bağlantı yok" + cached content gösterilir | Otomatik retry (connectivity regained) |
| **Sunucu hatası (5xx)**  | Ekran/kart bazlı hata mesajı + "Tekrar Dene" butonu       | 3 retry, exponential backoff           |
| **İstemci hatası (4xx)** | İnline hata mesajı (form doğrulama, yetki vb.)            | Retry yok; kullanıcı düzeltir          |
| **Zaman aşımı**          | "İstek zaman aşımına uğradı" + "Tekrar Dene"              | 2 retry                                |
| **IAP hatası**           | Platform hata mesajı + destek yönlendirmesi               | Retry yok                              |
| **Depolama hatası**      | "Yeterli alan yok" uyarısı                                | Retry yok; kullanıcı alan açar         |

**Genel kurallar:**

- Hata mesajları kullanıcı dostu, teknik jargon içermez.
- Hata durumunda PII veya içerik gövdesi loglara yazılmaz.
- Her kritik ekranda error state tanımlıdır (screen contract'larda).

---

## 16. Faz 2 Envelope Specs

Aşağıdaki epic'ler Faz 2 kapsamındadır. Burada yalnızca kapsam özeti ve bağımlılıkları belirtilir; detaylı FR/AC'ler Faz 2 planlamasında oluşturulacaktır.

### EPIC-12: Koç Paneli

- **Kapsam:** Danışan listesi (risk göstergeleri), danışan profili (hedefler, metrikler), içerik takibi, koç tarafından geri bildirim yazma.
- **Bağımlılık:** EPIC-1 (kimlik doğrulama), EPIC-6 (gelişim metrikleri).
- **Yeni rol:** Koç — read-only erişim + yorum yazma yetkisi.

### EPIC-13: Birlikte Okuma

- **Kapsam:** Grup oluşturma, materyal seçimi, ortak ilerleme takibi.
- **Bağımlılık:** EPIC-5 (okuma deneyimi), EPIC-3 (abonelik).

### EPIC-14: Kitap Kulübü

- **Kapsam:** Kulüp oluşturma, kitap seçimi, tartışma alanı.
- **Bağımlılık:** EPIC-7 (e-kitap), EPIC-13 (grup altyapısı).

### EPIC-15: Oyunlaştırma

- **Kapsam:** Puan sistemi, rozet koleksiyonu, sıralama tablosu, streak ödülleri.
- **Bağımlılık:** EPIC-5 (teslim takibi), EPIC-6 (gelişim verileri).

### EPIC-16: AI Asistan (RAG Tabanlı)

- **Kapsam:** AI sohbet (yalnızca PST içeriklerinden cevap — RAG), kaynak referansı gösterimi, yorum analizi.
- **Bağımlılık:** EPIC-3 (AI Paketi add-on), EPIC-5 (yorum verileri), içerik embedding altyapısı.
- **Kritik kısıt:** AI harici bilgi eklemez; cevaplar yalnızca PST içerik kütüphanesinden üretilir.

### EPIC-17: Gelişmiş Bildirimler

- **Kapsam:** Segment bazlı kampanya bildirimleri, öneri bildirimleri, hatırlatma çeşitlendirme.
- **Bağımlılık:** US-2.8 (Faz 1 günlük hatırlatıcı altyapısı).

### EPIC-18: Video İçerikler

- **Kapsam:** Video içerik sunumu, altyazı, hız kontrolü, ilerleme takibi.
- **Bağımlılık:** İçerik hiyerarşisi genişletmesi.

---

## 17. Analytics Sözleşmesi

### 17.1 Event Formatı

| Kural             | Değer                                                                      |
| ----------------- | -------------------------------------------------------------------------- |
| Event adı formatı | `snake_case`                                                               |
| Zorunlu alanlar   | `event_name`, `screen_id`, `user_role`, `subscription_status`, `timestamp` |
| PII yasağı        | E-posta, telefon, serbest metin → event payload'ına ham olarak yazılamaz   |
| Platform          | Grafana Cloud (production), ClickHouse (storage), Sentry (crash/perf)      |

### 17.2 Standart Event'ler

| Event                         | Tetikleyici                                  |
| ----------------------------- | -------------------------------------------- |
| `{screen}_viewed`             | Ekran odaklandığında                         |
| `{screen}_{cta}_tapped`       | CTA butonu tıklandığında                     |
| `content_started`             | İçerik başlatıldığında                       |
| `content_completed`           | İçerik tamamlandığında                       |
| `comment_submitted`           | Yorum teslim edildiğinde                     |
| `ddl_test_started`            | DDL testi başlatıldığında                    |
| `ddl_test_completed`          | DDL testi tamamlandığında                    |
| `ddl_test_abandoned`          | DDL testi terk edildiğinde                   |
| `recent_content_viewed`       | Son görüntülenen bölüm listelendiğinde       |
| `recent_content_item_clicked` | Son görüntülenen öğeye tıklandığında         |
| `workshop_stage_viewed`       | Atölye aşaması görüntülendiğinde             |
| `workshop_session_started`    | Kamp veya oturum kartı açıldığında           |
| `workshop_session_completed`  | Oturum tamamlandı olarak işaretlendiğinde    |
| `workbook_output_saved`       | Çalışma kağıdı girdisi kaydedildiğinde       |
| `facilitator_mode_opened`     | Eğitmen rehberi/facilitator mode açıldığında |
| `subscription_purchased`      | Abonelik satın alındığında                   |
| `addon_activated`             | Add-on aktifleştirildiğinde                  |
| `favorite_added`              | Favorilere eklendiğinde                      |
| `download_started`            | İndirme başlatıldığında                      |
| `download_completed`          | İndirme tamamlandığında                      |

---

## 18. Entegrasyon Sözleşmeleri

| Entegrasyon                          | Amaç                                                   | Yön                                 |
| ------------------------------------ | ------------------------------------------------------ | ----------------------------------- |
| AWS Cognito                          | Kullanıcı kimlik doğrulama ve oturum yönetimi          | Client → Cognito                    |
| AWS AppSync                          | GraphQL API (veri sorgulama, mutasyon, senkronizasyon) | Client → AppSync → DB               |
| Apple StoreKit / Google Play Billing | In-app purchase akışı                                  | Client → Store → Server doğrulama   |
| Push Notification (APNs/FCM)         | Günlük hatırlatıcı                                     | Server → Client                     |
| Sentry                               | Crash reporting ve performance monitoring              | Client → Sentry                     |
| Grafana Cloud / ClickHouse           | Telemetri ve analytics                                 | Client → Grafana Alloy → ClickHouse |

---

## 19. Çıkış Kapıları (Release Gates)

Faz 1 MVP release öncesinde aşağıdaki kapılar karşılanmalıdır:

| #   | Kapı                     | Ölçüt                                                            |
| --- | ------------------------ | ---------------------------------------------------------------- |
| 1   | Fonksiyonel tamamlama    | Tüm FR-E*-* AC'leri test pass                                    |
| 2   | Performans SLO           | NFR-PERF-01..06 hedefleri karşılanır                             |
| 3   | Güvenlik taraması        | Kritik/yüksek güvenlik bulgusu sıfır                             |
| 4   | Erişilebilirlik denetimi | VoiceOver + TalkBack ile tam geçiş; WCAG 2.1 AA uyumu            |
| 5   | Çevrimdışı test          | Uçak modu: cache'den okuma, yazma kuyruğu, bağlantıda senkton    |
| 6   | Lokalizasyon bütünlüğü   | TR/EN/ES tüm ekranlarda eksik çeviri yok                         |
| 7   | Crash-free oranı         | ≥ %99.5 (beta sürümde)                                           |
| 8   | Analytics doğrulama      | Standart event'ler doğru payload ile tetikleniyor; PII yok       |
| 9   | Store submission         | Apple App Store & Google Play inceleme gereksinimleri karşılanır |

---

## 20. Risk Kaydı

| #    | Risk                                          | Olasılık | Etki   | Azaltım                                                                        |
| ---- | --------------------------------------------- | -------- | ------ | ------------------------------------------------------------------------------ |
| R-01 | Apple/Google IAP inceleme reddı               | Orta     | Yüksek | Sandbox test kapsamını genişlet; review guidelines'a uyum kontrol listesi      |
| R-02 | Çevrimdışı senkronizasyon çakışmaları         | Orta     | Orta   | LWW conflict resolution + sunucu timestamp; dead-letter izleme                 |
| R-03 | Büyük e-kitap indirmeleri depolama dolduruyor | Düşük    | Orta   | Depolama uyarısı; indirme öncelik yönetimi; eski indirmeleri temizleme önerisi |
| R-04 | Çoklu dil çeviri kalitesi                     | Orta     | Orta   | Profesyonel çeviri süreci; fallback dili (TR)                                  |
| R-05 | Performans SLO aşımı (cold start)             | Düşük    | Yüksek | Code splitting; lazy loading; bundle boyutu izleme                             |
| R-06 | Demografi veri gizliliği düzenlemeleri        | Düşük    | Yüksek | Amaçla sınırlı işleme; güncelleme/silme desteği; gizlilik politikası           |
| R-07 | Biyometrik doğrulama cihaz uyumsuzlukları     | Düşük    | Düşük  | Şifre ile fallback; cihaz yetenek kontrolü                                     |

---

## 21. Sözlükçe

| Terim                                   | Tanım                                                                                                                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Yolculuk (Journey)**                  | PST koçları tarafından hazırlanmış kapsamlı program; modüller, atölyeler ve e-kitapları kapsar.                                                 |
| **Modül (Module)**                      | Tematik içerik grubu; birden çok paket içerir.                                                                                                  |
| **Paket (Package)**                     | Modülün alt birimi; odaklanmış okuma ve uygulama içerir.                                                                                        |
| **Atölye (Workshop)**                   | Aşama bazlı ilerleyen, analitik içerik, kamp oturumları, eğitmen rehberi, katılımcı defteri ve takip planları içeren çok katmanlı PST programı. |
| **Aşama (Stage)**                       | Atölyenin ana yapısal bölümü; kavram inşası, analiz, kamp, rehber veya workbook gibi bir katmanı temsil eder.                                   |
| **Oturum (Session)**                    | Özellikle kamp aşamasında sabah/öğle/akşam olarak zaman kutulu teslim edilen bölüm.                                                             |
| **İçerik Bloğu (Content Block)**        | Ayet, açıklama, psikoloji köprüsü, uygulama veya çıktı gibi aşama içi alt parça.                                                                |
| **Eğitmen Rehberi (Facilitator Guide)** | Dakika dakika akış, önerilen cümleler, zor senaryo müdahaleleri ve alternatif akışları içeren atölye destek materyali.                          |
| **Katılımcı Defteri (Workbook)**        | Kullanıcının çalışma kağıtlarını, kişisel cevaplarını ve atölye çıktısını tuttuğu yapılandırılmış artefact alanı.                               |
| **Çalışma Kağıdı (Worksheet)**          | Yük haritası, kriz anı kartı, dua dili veya takip planı gibi doldurulabilir atölye formu.                                                       |
| **e-Kitap (Ebook)**                     | PST Coaching tarafından hazırlanan dijital kitap; bölümler içerir.                                                                              |
| **Okuma (Reading)**                     | Metin temelli içerik bölümü; vurgulama/not alma desteklenir.                                                                                    |
| **Uygulama / Egzersiz (Exercise)**      | Adım adım yapılacak pratik bölüm; tamamlandıkça işaretlenir.                                                                                    |
| **Günlük İçerik**                       | Gün bazlı ilerleyen içerik; yeni gün 08:00'de açılır.                                                                                           |
| **Kilitli İlerleme**                    | Ön koşul tamamlanmadan sonraki adımlar erişime kapalıdır.                                                                                       |
| **Abonelik (Subscription)**             | İçerik erişimini belirleyen plan (Bireysel/Aile/Grup) ve statü (Aktif/Deneme/İptal).                                                            |
| **Plan Sahibi (Owner)**                 | Aboneliği yöneten ve add-on/kişi yönetimi yapabilen kullanıcı.                                                                                  |
| **Plan Üyesi (Member)**                 | Plan sahibi tarafından davet edilen kullanıcı; satın alma yapamaz.                                                                              |
| **Add-on**                              | Aboneliğe eklenen özellik (AI Paketi, Koçluk Eğitimi, Ek Kişi).                                                                                 |
| **Kişi / Seat**                         | Aile/Grup planında erişim verilen kullanıcı kontenjanı.                                                                                         |
| **Entitlement**                         | Kullanıcının içerik/özelliklere erişim yetkisi.                                                                                                 |
| **Favoriler**                           | Vurgu, not veya içeriklerin kaydedilmiş listesi.                                                                                                |
| **Koleksiyon**                          | Favorilerin kullanıcı tarafından gruplandığı özel liste.                                                                                        |
| **Vurgu (Highlight)**                   | Okuma sırasında seçilen ve renklendirilen metin parçası.                                                                                        |
| **Not (Note)**                          | Vurguya veya içeriğe eklenen kişisel açıklama.                                                                                                  |
| **Yorum (Comment)**                     | Yönlendirici sorulara verilen yazılı yanıt; 23:59'a kadar teslim edilir.                                                                        |
| **Teslim (Submit)**                     | Yorumu gönderme; gönderim sonrası düzenleme kilitlenir.                                                                                         |
| **Duygusal Harita**                     | Yorumlardan türetilen duygu durumu görselleştirmesi.                                                                                            |
| **Sertifika / Rozet**                   | İçerik tamamlamada verilen başarı göstergesi.                                                                                                   |
| **İçerik Asistanı**                     | Kullanıcıya hedef/süre/tercih sorularıyla uygun içerik öneren akış.                                                                             |
| **Paywall**                             | Abonelik olmayan kullanıcılarda erişim kısıtı açıklayan ekran.                                                                                  |
| **DDL Testi**                           | İlk yolculuk başlatmadan önce uygulanan değerlendirme testi.                                                                                    |
| **Takip Planı (Follow-up Plan)**        | Atölye sonrası 72 saat, 3 hafta ve 30 gün davranış sürdürme planı.                                                                              |
| **RAG**                                 | Retrieval-Augmented Generation — AI cevaplarının yalnızca sistem içeriklerinden üretilmesi.                                                     |

---

## 22. Referans Belgeleri

| Belge                   | Konum                                   |
| ----------------------- | --------------------------------------- |
| Etki Alanı Modeli       | `artifacts/domain/domain_model.json`    |
| Durum Makineleri        | `artifacts/domain/state_machines.json`  |
| Sözlükçe (detaylı)      | `artifacts/normalized/glossary.md`      |
| Normalize Gereksinimler | `artifacts/normalized/requirements.md`  |
| Ekran Envanteri         | `artifacts/ux/screen_inventory.json`    |
| Ekran Sözleşmeleri      | `artifacts/ux/screen_contracts/*.json`  |
| Tasarım Kuralları       | `artifacts/ux/design_rules.md`          |
| Bileşen Envanteri       | `artifacts/ux/component_inventory.json` |
| Mimari Doküman          | `artifacts/arch/architecture.md`        |
| Uygulama Planı          | `artifacts/impl/plan.md`                |
| Mock Veriler            | `artifacts/mock/mock_data.json`         |
| App Blueprint           | `artifacts/prd/app_blueprint.yaml`      |
| Atölye Örnek Belgesi    | `artifacts/prd/Mutlak.docx`             |

---

**Belge Sonu**

_Bu SPEC belgesi, PST Mobile App Faz 1 MVP geliştirme ve QA sürecinde tek referans kaynağıdır. Tüm fonksiyonel gereksinimler izlenebilir AC kimlikleri ile tanımlıdır ve doğrudan test senaryolarına eşlenebilir._

**Son Güncelleme:** 4 Nisan 2026 — v4.0.0
