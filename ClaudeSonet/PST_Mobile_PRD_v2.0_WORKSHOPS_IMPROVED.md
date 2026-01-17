# PST Mobile App - PRD v2.0 
## EPIC 8: Atölye Deneyimi (Workshop System) - IMPROVED

**Version:** 2.0 - Workshop-Enhanced  
**Date:** January 17, 2026  
**Status:** Production Ready - Based on Real Workshop Content (Şükür Atölyesi)

---

## 📋 EPIC 8 OVERVIEW - ENHANCED

**Faz:** 1 (MVP)  
**Öncelik:** P0 (Zorunlu - Core Content Experience)  
**Takımlar:** Backend, Mobile, Content, Design  
**Süre:** 4 sprint (8 hafta)  
**Bağımlılıklar:** Video servisi, Gerçek zamanlı senkronizasyon, Davet sistemi

---

## Epic Hedefi (Genişletilmiş)

Kullanıcıların derinlemesine etkileşimli atölyeleri **hem bireysel hem de grup olarak** tamamlamalarını sağlamak. Atölyeler, okuma, video, uygulama, refleksiyon ve takip çizelgesi ile çok aşamalı bir öğrenme deneyimi sunar.

### Gerçek Dünya Örneği: Şükür Atölyesi

Şükür Atölyesi 10 aşamadan oluşur:
1. Kavram İnşası (Şükür nedir, ne değildir?)
2. Ayetlerin Ayrıntılı Analizi
3. Ayetler Arası Aynalama
4. Müfessirlerin Açıklamaları
5. Vicdandan Karaktere Modeli Entegrasyonu
6. Modern Psikoloji Entegrasyonu
7. Üç Günlük "Şükür & Anlam" Atölyesi (en kritik bölüm)
8. Atölye Lideri Rehberi
9. Yolculuk Defteri & Çalışma Kağıtları
10. Şükrü Hayata Uygulama & Kapanış

**Toplam süre:** 3 gün yoğun çalışma + 21 günlük takip çizelgesi

---

## İş Değeri (Genişletilmiş)

### Bireysel Kullanıcılar İçin
- **Derinlemesine öğrenme:** Sadece okuma değil, uygulama ve refleksiyon
- **Yapılandırılmış süreç:** Net aşamalar, takip sistemi
- **Kendi hızında:** Dilediği zamanda tamamlayabilir
- **Kalıcı etki:** 21 günlük takip çizelgesi ile alışkanlık oluşturma

### Grup Kullanıcıları İçin
- **Birlikte öğrenme:** Aile, arkadaş, kitap kulübü grupları
- **Lider desteği:** Bir kişi lider olup takip yapabilir
- **Etkileşimli tartışma:** Grup içi chat ve konferans
- **Motivasyon:** Grup dinamiği ile daha yüksek tamamlanma oranı

### Platform İçin
- **Elde tutma:** Çok aşamalı içerik, kullanıcıyı uygulama içinde tutar
- **Abonelik değeri:** Premium atölyeler aboneliğe değer katar
- **Sosyal özellik:** Grup atölyeleri viral büyüme sağlar
- **Veri toplama:** Kullanıcı refleksiyonları içgörü sağlar

---

## Başarı Metrikleri (Genişletilmiş)

| Metrik | Hedef | Ölçüm Yöntemi | Kritiklik |
|--------|-------|---------------|-----------|
| **Bireysel Atölye Başlatma Oranı** | >60% | Başlatılan / Görüntülenen | P0 |
| **Bireysel Atölye Tamamlama Oranı** | >40% | Tamamlanan / Başlatılan | P0 |
| **Grup Atölye Oluşturma Oranı** | >25% | Grup / Toplam Atölye | P1 |
| **Grup Katılım Oranı** | >70% | Katılan / Davet Edilen | P1 |
| **Grup Atölye Tamamlama Oranı** | >55% | Grup tamamlama / Başlatma | P1 |
| **Günlük Takip Doldurma Oranı** | >50% | Doldurulmuş günler / Toplam gün | P2 |
| **21 Günlük Takip Tamamlama** | >30% | 21 gün tamamlayan / Başlatan | P2 |
| **Atölye İçi Video İzlenme** | >80% | Video izlenenler / Toplam | P1 |
| **Refleksiyon Sorusu Yanıtlama** | >70% | Yanıtlanan / Gösterilen | P0 |
| **Atölye Tekrar Başlatma** | >15% | Tekrar başlatma / Tamamlayan | P2 |

---

## User Story'ler - TAM LİSTE

| ID | Story | Öncelik | Tahmin | Bağımlılıklar |
|----|-------|---------|--------|---------------|
| US-8.1 | Atölye Kataloğu ve Keşif | P0 | 3 puan | US-6.1 |
| US-8.2 | Atölye Detay ve Önizleme | P0 | 5 puan | Video servis |
| US-8.3 | Bireysel Atölye Başlatma | P0 | 5 puan | - |
| US-8.4 | Grup Atölyesi Oluşturma ve Davet | P0 | 8 puan | Davet sistemi |
| US-8.5 | Atölye Aşamaları - Okuma Bölümleri | P0 | 5 puan | - |
| US-8.6 | Atölye Aşamaları - Video İçerik | P0 | 5 puan | Video player |
| US-8.7 | Atölye Aşamaları - Uygulama ve Refleksiyon | P0 | 8 puan | Form sistemi |
| US-8.8 | Grup İçi İletişim (Chat/Konferans) | P1 | 13 puan | Gerçek zamanlı sync |
| US-8.9 | Lider Kontrol Paneli | P1 | 8 puan | US-8.4 |
| US-8.10 | Takip Çizelgesi (21 Gün) | P0 | 8 puan | Notification |
| US-8.11 | Atölye İlerleme Takibi | P0 | 3 puan | - |
| US-8.12 | Atölye Tamamlama ve Sertifika | P0 | 5 puan | Sertifika sistemi |

---

## US-8.1: Atölye Kataloğu ve Keşif

**Kullanıcı olarak,** mevcut tüm atölyeleri görmek ve keşfetmek istiyorum  
**Böylece** ilgi alanıma uygun atölyeleri bulup detaylarını inceleyebilirim

### Kullanıcı Değeri
- **Keşif kolaylığı:** Tüm atölyeler kategorize edilmiş ve aranabilir
- **Bilinçli seçim:** Her atölye için net açıklama ve süre bilgisi
- **Filtreleme:** Konu, süre, zorluk seviyesine göre filtre

### Kabul Kriterleri

#### Katalog Görünümü
- [ ] **AC-8.1.1:** Atölye kataloğu Keşfet → Atölyeler'den erişilebilir
- [ ] **AC-8.1.2:** Katalog görünümü şunları içerir:
  - Atölye kartları (grid veya liste görünümü)
  - Her kart: Kapak görseli, başlık, kısa açıklama, süre, zorluk
  - "Başla" veya "Detayları Gör" CTA
- [ ] **AC-8.1.3:** Atölye kartı bilgileri:
  - **Başlık:** Atölye adı (örn. "Şükür Atölyesi")
  - **Alt başlık:** Tek cümle açıklama
  - **Süre:** Tahmini tamamlanma süresi ("3 gün yoğun + 21 gün takip")
  - **Aşama sayısı:** "10 aşama"
  - **Zorluk:** "Başlangıç / Orta / İleri"
  - **İkon:** Atölye konusunu temsil eden görsel
- [ ] **AC-8.1.4:** Katalog sıralama seçenekleri:
  - Önerilen (varsayılan)
  - En Yeni
  - En Popüler
  - Alfabetik (A-Z)
  - Süreye Göre (Kısa → Uzun)
- [ ] **AC-8.1.5:** Filtreleme seçenekleri:
  - **Konu:** Şükür, Sabır, Sıdk, Vicdan, vb.
  - **Süre:** <3 gün, 3-7 gün, 7+ gün
  - **Zorluk:** Başlangıç, Orta, İleri
  - **Tamamlanma durumu:** Tamamlanmamış, Devam Eden, Tamamlanmış
- [ ] **AC-8.1.6:** Arama işlevi:
  - Atölye başlığında, açıklamasında ve etiketlerinde ara
  - Gerçek zamanlı arama (yazarken filtrele)
  - Arama geçmişi saklanır (son 5 arama)

#### Kategoriler
- [ ] **AC-8.1.7:** Atölyeler şu kategorilerde gruplanır:
  - **Duygular Evreni:** Şükür, Sabır, Korku, Öfke yönetimi
  - **Kişisel Gelişim:** Sıdk, Vicdan, İrade
  - **İlişkiler:** İletişim, Empati, Affetme
  - **Maneviyat:** Tefekkür, Dua, Kur'an Analizi
- [ ] **AC-8.1.8:** Her kategori için ayrı tab veya bölüm
- [ ] **AC-8.1.9:** Kategorilere tıklama o kategorideki atölyeleri filtreler

#### İlerleme Gösterimi
- [ ] **AC-8.1.10:** Başlatılmış atölyeler için ilerleme göster:
  - "Devam Et" düğmesi (yeşil)
  - İlerleme yüzdesi: "60% tamamlandı"
  - Son kaldığı aşama: "Aşama 6/10"
- [ ] **AC-8.1.11:** Tamamlanan atölyeler:
  - Yeşil onay işareti
  - "Tamamlandı" rozeti
  - "Tekrar Başlat" seçeneği
- [ ] **AC-8.1.12:** Henüz başlatılmamış atölyeler:
  - "Başla" düğmesi (birincil renk)
  - Tahmini süre gösterilir

#### Boş Durum
- [ ] **AC-8.1.13:** Atölye yoksa (filtre sonucu):
  - Mesaj: "Bu kriterlere uygun atölye bulunamadı"
  - Filtreleri temizle önerisi
  - Tüm atölyelere dön linki

### UX Düşünceleri

**Keşfedilebilirlik:**
- Görsel olarak çekici kartlar (kaliteli görseller)
- Net kategoriler (kullanıcı ne aradığını hemen bulur)
- İlerleme göstergesi (kullanıcı nerede kaldığını bilir)

**Bilgi Hiyerarşisi:**
- En önemli bilgi: Atölye adı ve süresi (ilk bakışta görünür)
- İkincil bilgi: Zorluk, aşama sayısı (kartın alt kısmında)
- Detay: Tam açıklama detay sayfasında

**Erişilebilirlik:**
- Atölye kartları ekran okuyucu ile okunabilir
- Yeterli renk kontrastı (WCAG AA)
- Dokunma hedefleri min 44x44 pt

### Teknik Gereksinimler

**Frontend:**
```javascript
// Atölye Modeli
{
  id: string,
  title: string,
  subtitle: string,
  description: string,
  category: enum,
  duration: string,
  difficulty: enum['beginner', 'intermediate', 'advanced'],
  stageCount: number,
  coverImage: string,
  tags: string[],
  prerequisites: string[]
}
```

**Backend:**
```typescript
// API Endpoint
GET /api/workshops
Query params: category, difficulty, duration, search, sort
Response: { workshops: Workshop[], total: number }
```

---

## US-8.2: Atölye Detay ve Önizleme

**Kullanıcı olarak,** bir atölyenin detaylarını görüp başlatmadan önce içeriğini anlamak istiyorum  
**Böylece** bu atölyenin bana uygun olup olmadığına karar verebilirim

### Kullanıcı Değeri
- **Bilinçli karar:** Atölyeyi başlatmadan önce ne bekleyeceğini bilir
- **Motivasyon:** Detaylı açıklama ve tanıtım videosu ilgi uyandırır
- **Beklenti yönetimi:** Süre, aşamalar, kazanımlar net

### Kabul Kriterleri

#### Detay Sayfası Düzeni
- [ ] **AC-8.2.1:** Atölye detay sayfası şu bölümleri içerir:
  - **Hero Bölümü:** Kapak görseli, başlık, kısa açıklama
  - **Tanıtım Videosu:** 2-3 dakikalık atölye tanıtımı
  - **Genel Bakış:** Atölye nedir, amacı ne
  - **Aşamalar:** Tüm aşamaların listesi ve kısa açıklamaları
  - **Kazanımlar:** Bu atölyeyi tamamladıktan sonra ne öğrenecek
  - **Gereksinimler:** Önkoşullar (varsa), önerilen hazırlık
  - **Süre & Zorluk:** Detaylı zaman tahmini
  - **İncelemeler:** Kullanıcı yorumları ve puanları (Faz 2)
- [ ] **AC-8.2.2:** Hero bölümü içeriği:
  - Tam genişlikte kapak görseli (en üstte)
  - Atölye başlığı (büyük, kalın)
  - Alt başlık/kısa açıklama (1-2 cümle)
  - Etiketler: Kategori, zorluk, süre
  - Birincil CTA: "Başla" (bireysel) veya "Grup Oluştur"
  - İkincil CTA: "Favorilere Ekle" (kalp ikonu)
- [ ] **AC-8.2.3:** Tanıtım videosu:
  - Otomatik oynatılmaz (kullanıcı başlatır)
  - Tam ekran izleme seçeneği
  - Video süresi gösterilir (örn. "3:24")
  - İndirme seçeneği (çevrimdışı izleme için)
  - Video yoksa: Placeholder görsel ve "Video yakında" mesajı

#### Genel Bakış Bölümü
- [ ] **AC-8.2.4:** "Atölye Nedir?" bölümü:
  - 2-3 paragraf açıklama
  - Atölyenin temeli (örn. "Şükür Şifresi kitabından uyarlanmıştır")
  - Kimlere uygun (örn. "Bireysel, aile veya arkadaş grupları")
- [ ] **AC-8.2.5:** "Bu Atölyede Neler Var?" bölümü:
  - Okuma metinleri
  - Video içerikler
  - Uygulama egzersizleri
  - Refleksiyon soruları
  - Takip çizelgesi
- [ ] **AC-8.2.6:** "Nasıl Çalışır?" bölümü:
  - Atölye akışı (aşama aşama ilerler)
  - Bireysel vs Grup modu açıklaması
  - Tahmini tamamlanma süresi (esneklik vurgusu)

#### Aşamalar Listesi
- [ ] **AC-8.2.7:** Tüm aşamalar sıralı liste olarak gösterilir
- [ ] **AC-8.2.8:** Her aşama kartı içerir:
  - Aşama numarası (1, 2, 3...)
  - Aşama başlığı (örn. "Kavram İnşası: Şükür Nedir?")
  - Kısa açıklama (1-2 cümle)
  - İçerik türü ikonları: 📖 Okuma, 🎥 Video, ✍️ Uygulama
  - Tahmini süre (örn. "30 dakika")
- [ ] **AC-8.2.9:** Aşamalar daraltılabilir (accordion)
  - Varsayılan: İlk 3 aşama açık, diğerleri kapalı
  - "Tümünü Gör" / "Tümünü Gizle" toggle
- [ ] **AC-8.2.10:** Özel aşamalar vurgulanır:
  - Aşama 7 (Üç Günlük Atölye): "⭐ Ana Uygulama Bölümü"
  - Aşama 10 (Takip Çizelgesi): "📅 21 Günlük Takip"

#### Kazanımlar
- [ ] **AC-8.2.11:** "Bu Atölyeyi Tamamladığınızda" bölümü:
  - Madde işaretli liste (3-5 kazanım)
  - Her kazanım bir cümle (açık, ölçülebilir)
  - Örnek: "Şükrün vicdandan karaktere nasıl dönüştüğünü anlayacaksınız"
- [ ] **AC-8.2.12:** Kazanımlar pozitif dilde yazılır
  - "Öğreneceksiniz" yerine "Anlayacaksınız", "Uygulayabileceksiniz"

#### CTA'lar (Call-to-Actions)
- [ ] **AC-8.2.13:** Birincil CTA: "Atölyeyi Başlat"
  - Hero bölümünde (en üstte)
  - Sayfanın altında (yapışkan düğme)
  - Dokunma → Bireysel atölye başlatma akışı (US-8.3)
- [ ] **AC-8.2.14:** İkincil CTA: "Grup Oluştur"
  - Hero bölümünde "Başla" yanında
  - Dokunma → Grup atölyesi oluşturma akışı (US-8.4)
- [ ] **AC-8.2.15:** Üçüncül CTA: "Favorilere Ekle"
  - Kalp ikonu (sağ üst köşe)
  - Dokunma → Favorilere ekle/çıkar
  - Toast onayı: "Favorilere eklendi"
- [ ] **AC-8.2.16:** Zaten başlatılmış atölyede:
  - CTA: "Devam Et" (yeşil)
  - İlerleme göster: "Aşama 4/10 - %40 tamamlandı"
- [ ] **AC-8.2.17:** Tamamlanmış atölyede:
  - CTA: "Tekrar Başlat"
  - İkincil: "Sertifikayı Gör"
  - Tamamlanma tarihi gösterilir

#### Gereksinimler
- [ ] **AC-8.2.18:** Önkoşullar (eğer varsa):
  - "Bu atölyeyi başlatmak için" bölümü
  - Gerekli kitap: Bağlantı ile (örn. "Şükür Şifresi kitabı önerilir")
  - Önceki atölyeler (eğer varsa)
- [ ] **AC-8.2.19:** Önerilen hazırlık:
  - "Atölye için hazırlık" bölümü
  - Örnek: "Sessiz bir ortam", "Defter ve kalem"
  - Grup atölyeleri için: "3-8 kişilik grup oluşturun"

### UX Düşünceleri

**Bilgi Yoğunluğu:**
- Detay sayfası çok bilgi içerir ama düzenli (bölüm bölüm)
- Daraltılabilir (accordion) kullanarak bilgi yoğunluğunu yönet
- Kullanıcı istediği bölüme atlayabilir (anchor linkler)

**Görsel Çekicilik:**
- Hero görseli yüksek kalite (duygu uyandırır)
- Tanıtım videosu kullanıcıyı heyecanlandırır
- İkonlar bilgiyi görselleştirir (📖🎥✍️)

**Motivasyon:**
- Kazanımlar net (kullanıcı ne kazanacağını bilir)
- Sosyal kanıt (ileride): Kullanıcı yorumları, puanlar
- CTA net ve görünür (kullanıcı ne yapacağını bilir)

### Teknik Gereksinimler

**Frontend:**
```javascript
// Detay Sayfası Veri Modeli
{
  workshop: {
    ...Workshop (US-8.1'den),
    fullDescription: string,
    introVideoUrl: string,
    stages: [{
      number: number,
      title: string,
      description: string,
      contentTypes: string[],
      estimatedDuration: string
    }],
    outcomes: string[],
    prerequisites: string[],
    recommendations: string[]
  },
  userProgress: {
    isStarted: boolean,
    isCompleted: boolean,
    currentStage: number,
    completionPercentage: number,
    completedAt: timestamp
  }
}
```

**Backend:**
```typescript
GET /api/workshops/:id
Response: { workshop: WorkshopDetail, userProgress: UserProgress }
```

---

## US-8.3: Bireysel Atölye Başlatma

**Kullanıcı olarak,** bir atölyeyi bireysel olarak başlatıp kendi hızımda tamamlamak istiyorum  
**Böylece** esnek bir şekilde öğrenebilirim

### Kullanıcı Değeri
- **Esneklik:** Kendi hızında, kendi zamanında
- **Bağımsızlık:** Grup koordinasyonu gerekmez
- **Gizlilik:** Refleksiyonlar sadece kendisine ait

### Kabul Kriterleri

#### Başlatma Akışı
- [ ] **AC-8.3.1:** "Atölyeyi Başlat" dokunma:
  - Onay ekranı gösterilir (modal veya yeni sayfa)
  - Onay ekranı içeriği:
    - Atölye başlığı
    - Süre tahmini
    - "Bireysel mod" açıklaması
    - "Başla" (birincil) ve "İptal" (ikincil) düğmeleri
- [ ] **AC-8.3.2:** "Başla" dokunma:
  - Atölye kullanıcının "Atölyelerim"e eklenir
  - İlk aşamaya (Aşama 1) yönlendirilir
  - Toast: "Atölye başlatıldı! Başarılar dileriz."
- [ ] **AC-8.3.3:** Atölye durumu veritabanında saklanır:
  - user_id, workshop_id, mode: 'individual'
  - started_at: timestamp
  - current_stage: 1
  - progress: {}
- [ ] **AC-8.3.4:** Kullanıcı istediği zaman atölyeyi duraklat/devam edebilir
  - Duraklat: Otomatik (kullanıcı uygulamayı kapatır)
  - Devam Et: "Atölyelerim" veya Ana Sayfa'dan

#### İlerleme Kaydetme
- [ ] **AC-8.3.5:** İlerleme otomatik kaydedilir:
  - Her aşama tamamlandığında
  - Her refleksiyon sorusu yanıtlandığında
  - Her sayfa kaydırıldığında (okuma ilerlemesi)
  - Her 30 saniyede bir (otomatik)
- [ ] **AC-8.3.6:** Çevrimdışı ilerleme senkronize edilir:
  - Çevrimdışıyken ilerleme yerel olarak saklanır
  - Bağlantı geldiğinde sunucuya senkronlanır
  - Çakışma çözümü: En son değişiklik kazanır

#### "Atölyelerim" Bölümü
- [ ] **AC-8.3.7:** Kütüphane → Atölyelerim'de gösterilir:
  - Başlatılmış tüm atölyeler listelenir
  - Her atölye için:
    - Başlık, kapak görseli
    - İlerleme yüzdesi: "%40 tamamlandı"
    - Mevcut aşama: "Aşama 4/10"
    - Son erişim: "2 saat önce"
    - "Devam Et" düğmesi
- [ ] **AC-8.3.8:** "Devam Et" dokunma:
  - Son kaldığı aşamaya yönlendirilir
  - Sayfa içi son konuma kaydırılır (eğer okuma aşamasıysa)

#### Bireysel Mod Özellikleri
- [ ] **AC-8.3.9:** Refleksiyon yanıtları sadece kullanıcı için:
  - Kimseyle paylaşılmaz (varsayılan)
  - İsteğe bağlı paylaşım (Faz 2): Koç veya mentorla
- [ ] **AC-8.3.10:** Takip çizelgesi kişisel:
  - 21 günlük günlük girişleri
  - Hatırlatıcı bildirimleri (kullanıcı ayarlarına göre)
- [ ] **AC-8.3.11:** Esnek zamanlama:
  - Günlük içerik kilidi yok (bireysel modda)
  - Kullanıcı dilediği hızda ilerler
  - Önerilen: 3 gün + 21 gün, ama zorunlu değil

### UX Düşünceleri

**Basitlik:**
- Başlatma süreci 2 adım: Detay → Başlat → Aşama 1
- Karmaşık kurulum yok

**Motivasyon:**
- İlerleme göstergesi her zaman görünür
- Küçük kutlamalar (aşama tamamlama)
- "Hemen devam et" önerileri (Ana Sayfa'da)

**Gizlilik:**
- Refleksiyonlar kullanıcıya özel
- Kimseyle paylaşılmayacağı garanti edilir

### Teknik Gereksinimler

**Frontend:**
```javascript
// Başlatma API Çağrısı
POST /api/workshops/:id/start
Request: { mode: 'individual' }
Response: { 
  workshopEnrollment: {
    id: string,
    workshopId: string,
    userId: string,
    mode: 'individual',
    startedAt: timestamp,
    currentStage: 1
  }
}
```

**Backend:**
```typescript
// Veritabanı Modeli
WorkshopEnrollment {
  id: UUID,
  user_id: UUID,
  workshop_id: UUID,
  mode: enum['individual', 'group'],
  group_id: UUID (nullable),
  started_at: timestamp,
  current_stage: number,
  progress: JSONB, // { stage_1: { completed: true, ... }, ... }
  completed_at: timestamp (nullable)
}
```

---

## US-8.4: Grup Atölyesi Oluşturma ve Davet

**Kullanıcı olarak,** arkadaşlarımı/ailem ile birlikte bir atölyeyi grup olarak yapmak istiyorum  
**Böylece** birlikte öğrenebilir ve tartışabiliriz

### Kullanıcı Değeri
- **Sosyal öğrenme:** Grup dinamiği motivasyon artırır
- **Birlikte ilerleme:** Herkes aynı aşamada, birlikte tartışma
- **Lider desteği:** Bir kişi grubu yönlendirir
- **Paylaşım:** Refleksiyonlar grup içinde paylaşılabilir

### Kabul Kriterleri

#### Grup Oluşturma Akışı
- [ ] **AC-8.4.1:** "Grup Oluştur" dokunma (atölye detayından):
  - Grup oluşturma ekranı açılır
  - Form alanları:
    - Grup adı (zorunlu, max 50 karakter)
    - Grup açıklaması (isteğe bağlı, max 200 karakter)
    - Lider seçimi: Varsayılan ben, değiştirilebilir
    - Başlangıç tarihi: Grup ne zaman başlayacak
  - "Grubu Oluştur" düğmesi
- [ ] **AC-8.4.2:** "Grubu Oluştur" dokunma:
  - Grup oluşturulur (veritabanında)
  - Kullanıcı otomatik olarak gruba lider olarak eklenir
  - Davet ekranına yönlendirilir
  - Toast: "Grup oluşturuldu! Şimdi üyeleri davet edin."

#### Davet Sistemi
- [ ] **AC-8.4.3:** Davet ekranı içeriği:
  - Grup adı ve atölye başlığı gösterilir
  - Davet linki: Paylaşılabilir URL
  - "Linki Kopyala" düğmesi
  - Paylaşım seçenekleri:
    - WhatsApp
    - Email
    - SMS
    - Diğer uygulamalar (sistem paylaşım sayfası)
  - "Manuel Davet" seçeneği: Email girişi ile davet gönder
- [ ] **AC-8.4.4:** Davet linki formatı:
  - `pstmobile://workshop-group/invite?code=XXXXX`
  - Kod: Benzersiz 8 karakterlik alfanumerik
  - Geçerlilik süresi: 7 gün (veya grup başlayana kadar)
- [ ] **AC-8.4.5:** "Linki Kopyala" dokunma:
  - Link panoya kopyalanır
  - Toast: "Davet linki kopyalandı!"
- [ ] **AC-8.4.6:** WhatsApp/Email/SMS paylaşma:
  - Önceden hazırlanmış mesaj:
    - "Merhaba! Seni [Atölye Adı] atölyesi için [Grup Adı] grubuna davet ediyorum. Katılmak için bu linke tıkla: [Link]"
  - Kullanıcı mesajı düzenleyebilir
  - Gönder → Uygulama açılır (WhatsApp, Email, SMS)
- [ ] **AC-8.4.7:** Manuel davet:
  - Email adresi giriş alanı
  - "Davet Gönder" düğmesi
  - Email gönderilir (sunucu tarafından)
  - Email içeriği: Grup bilgileri + Davet linki

#### Davet Kabul Etme (Katılımcı Perspektifi)
- [ ] **AC-8.4.8:** Davet linkine tıklama:
  - Uygulama açılır (deep link)
  - Grup önizleme ekranı gösterilir:
    - Grup adı, açıklaması
    - Atölye başlığı, süresi
    - Lider adı
    - Mevcut üye sayısı: "3/8 kişi katıldı"
    - Başlangıç tarihi
  - "Gruba Katıl" (birincil) ve "Reddet" (ikincil) düğmeleri
- [ ] **AC-8.4.9:** "Gruba Katıl" dokunma:
  - Kullanıcı gruba eklenir
  - Lider ve diğer üyelere bildirim gönderilir: "[İsim] gruba katıldı!"
  - Kullanıcı grup ekranına yönlendirilir
  - Toast: "Gruba katıldınız! Atölye [Tarih]'de başlıyor."
- [ ] **AC-8.4.10:** "Reddet" dokunma:
  - Davet reddedilir
  - Lider bilgilendirilmez (sessiz red)
  - Kullanıcı önceki ekrana döner

#### Grup Üye Yönetimi
- [ ] **AC-8.4.11:** Grup üye listesi (lider görünümü):
  - Tüm üyeler listelenir
  - Her üye için:
    - İsim, profil fotoğrafı
    - Rol: "Lider" veya "Üye"
    - Katılma tarihi
    - Lider için ek eylemler: "Üyeyi Çıkar", "Lider Yap"
- [ ] **AC-8.4.12:** "Üyeyi Çıkar" (sadece lider):
  - Onay dialogu: "Emin misiniz? [İsim] gruptan çıkarılacak."
  - Onayda: Üye gruptan çıkarılır
  - Üyeye bildirim: "Grup liderı sizi gruptan çıkardı."
  - Grup listesi güncellenir
- [ ] **AC-8.4.13:** "Lider Yap" (sadece lider):
  - Onay dialogu: "Liderlik [İsim]'e devredilecek. Devam edilsin mi?"
  - Onayda: Liderlik devreder
  - Eski lider "Üye" olur
  - Yeni lider bildirim alır: "Artık siz grup lidersiniz!"
- [ ] **AC-8.4.14:** Üye kendisi ayrılabilir:
  - "Gruptan Ayrıl" seçeneği (profil veya grup ayarlarında)
  - Onay dialogu: "Gruptan ayrılıyorsunuz. İlerlemeiniz kaybolacak."
  - Onayda: Üye ayrılır, lider bilgilendirilir

#### Grup Büyüklüğü Limitleri
- [ ] **AC-8.4.15:** Grup üye limitleri:
  - Minimum: 2 kişi (lider + 1 üye)
  - Maksimum: 10 kişi (esnek, ayarlanabilir)
- [ ] **AC-8.4.16:** Limit aşımı:
  - 10. kişiden sonra davet devre dışı
  - Yeni davet linki oluşturulamaz
  - Mesaj: "Grup dolu (10/10). Yeni üye eklenemez."
  - Lider üye çıkarabilir, sonra yeni davet gönderebilir

### UX Düşünceleri

**Kolay Davet:**
- Tek tıkla paylaşım (WhatsApp, Email)
- Önceden hazırlanmış mesaj (düzenlenebilir)
- Davet linki her zaman erişilebilir

**Şeffaflık:**
- Üyeler kimler, kaç kişi var net görünür
- Lider kim, rolleri açık
- Başlangıç tarihi herkes tarafından biliniyor

**Grup Dinamiği:**
- Lider yetkili ama demokratik (liderlik devredilebilir)
- Üyeler kendileri ayrılabilir (zoraki katılım yok)

### Teknik Gereksinimler

**Frontend:**
```javascript
// Grup Oluşturma
POST /api/workshop-groups/create
Request: {
  workshopId: string,
  name: string,
  description: string,
  startDate: timestamp
}
Response: {
  group: {
    id: string,
    inviteCode: string,
    inviteUrl: string
  }
}

// Gruba Katılma
POST /api/workshop-groups/join
Request: { inviteCode: string }
Response: { group: Group, enrollment: Enrollment }
```

**Backend:**
```typescript
WorkshopGroup {
  id: UUID,
  workshop_id: UUID,
  name: string,
  description: string,
  leader_id: UUID,
  invite_code: string (unique, 8 chars),
  start_date: timestamp,
  created_at: timestamp
}

WorkshopGroupMember {
  id: UUID,
  group_id: UUID,
  user_id: UUID,
  role: enum['leader', 'member'],
  joined_at: timestamp
}
```

---

[Doküman US-8.5'ten US-8.12'ye kadar kalan User Story'lerle devam edecektir...]

**Devam Eden Bölümler:**
- US-8.5: Atölye Aşamaları - Okuma Bölümleri
- US-8.6: Atölye Aşamaları - Video İçerik
- US-8.7: Atölye Aşamaları - Uygulama ve Refleksiyon
- US-8.8: Grup İçi İletişim (Chat/Konferans)
- US-8.9: Lider Kontrol Paneli
- US-8.10: Takip Çizelgesi (21 Gün)
- US-8.11: Atölye İlerleme Takibi
- US-8.12: Atölye Tamamlama ve Sertifika

---

**Belge Sahibi:** Principal Product Manager  
**Son Güncelleme:** 17 Ocak 2026  
**Durum:** Devam Ediyor - Epic 8 İyileştirmeleri

