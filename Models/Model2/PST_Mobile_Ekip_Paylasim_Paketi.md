# PST Mobile App - Ekip Paylaşım Paketi

**Versiyon:** 1.0  
**Tarih:** Ocak 2026  
**Hazırlayan:** Principal Product Manager

---

# 📋 İÇİNDEKİLER

1. [Executive Summary (Yönetici Özeti)](#1-executive-summary)
2. [Site Map (Uygulama Haritası)](#2-site-map)
3. [Kritik User Flow Diyagramları](#3-user-flow-diyagramları)
4. [Abonelik ve Erişim Matrisi](#4-abonelik-ve-erişim-matrisi)
5. [Glossary (Terimler Sözlüğü)](#5-glossary)
6. [Faz Planlaması ve Öncelikler](#6-faz-planlaması)

---

# 1. EXECUTIVE SUMMARY

## 🎯 Vizyon

PST Mobile, bireylerin kişisel gelişim yolculuklarını yönetmelerini sağlayan kapsamlı bir mobil uygulamadır. **"Vicdandan Karaktere"** yaklaşımıyla kullanıcılar günlük okuma, yorum yazma ve ilerleme takibi yapabilir.

## 👥 Hedef Kitle

| Segment | Açıklama | Plan |
|---------|----------|------|
| Bireysel Kullanıcılar | Kendi gelişimini takip eden danışanlar | Bireysel |
| Aileler | Birlikte öğrenen aile bireyleri (5 kişi) | Aile |
| Kurumsal Gruplar | Şirket/okul grupları (10 kişi) | Grup |
| PST Koçları | Danışanları takip eden profesyoneller | Koçluk Add-on |

## 📊 Faz 1 MVP Kapsamı

| Epic | Açıklama | User Story Sayısı |
|------|----------|-------------------|
| EPIC 1 | Dil, Hesap ve Güvenli Oturum | 7 |
| EPIC 2 | Ana Sayfa ve Navigasyon | 8 |
| EPIC 3 | Abonelik ve Kişi Yönetimi | 8 |
| EPIC 4 | Yolculuk Keşfi ve Başlatma | 6 |
| EPIC 5 | Günlük Okuma ve Teslim | 7 |
| EPIC 6 | Gelişim ve Raporlama | 7 |
| EPIC 8 | Favoriler ve Arşiv | 7 |
| EPIC 9 | Erişilebilirlik | 7 |
| EPIC 20 | Modül Sistemi ve Kilitli İlerleme | 7 |
| **TOPLAM** | **9 Epic** | **~64 User Story** |

## 🎯 Başarı Metrikleri (KPI)

| Metrik | Hedef | Ölçüm Periyodu |
|--------|-------|----------------|
| Günlük Aktif Kullanıcı (DAU) | 5,000+ | İlk 3 ay |
| Günlük Teslim Oranı | %70+ | Haftalık |
| Yolculuk Tamamlama | %40+ | Aylık |
| App Store Rating | 4.5+ yıldız | Sürekli |
| Deneme → Ücretli Dönüşüm | %25+ | Aylık |
| Churn Rate | <%5 | Aylık |

## ⏱️ Tahmini Timeline

```
┌─────────────────────────────────────────────────────────────────┐
│ FAZ 1 (MVP)              │ FAZ 2                │ FAZ 3         │
│ 12-16 hafta              │ 8-12 hafta           │ Sürekli       │
├─────────────────────────────────────────────────────────────────┤
│ • Hesap/Oturum           │ • Koç Paneli         │ • A/B Test    │
│ • Ana Sayfa              │ • Topluluk           │ • Performans  │
│ • Abonelik               │ • AI Özellikleri     │ • Yeni Epic   │
│ • Yolculuk               │ • Oyunlaştırma       │               │
│ • Okuma/Teslim           │ • Video              │               │
│ • Gelişim                │                      │               │
│ • Favoriler              │                      │               │
│ • Erişilebilirlik        │                      │               │
│ • Modül Sistemi          │                      │               │
└─────────────────────────────────────────────────────────────────┘
       Production             Topluluk + AI          İyileştirme
```

## ⚠️ Kritik İş Kuralları

| Kural | Açıklama | Etki |
|-------|----------|------|
| **08:00 Kuralı** | Yeni günün içeriği saat 08:00'de aktif olur | Tüm kullanıcılar |
| **23:59 Teslim** | Günlük yorum teslimi en geç 23:59'a kadar | Tüm kullanıcılar |
| **Kilitli İlerleme** | Bir adım tamamlanmadan sonraki açılmaz | Tüm yolculuklar |
| **Server-side Doğrulama** | Satın almalar sunucuda doğrulanır | Abonelik işlemleri |

---

# 2. SITE MAP

## 📱 Tab Bar Yapısı

```
┌─────────────────────────────────────────────────────────────────┐
│  🏠          🧭          👥          📊          👤            │
│  Ana        Keşfet     Topluluk    Gelişim     Profil         │
│  Sayfa                 (Faz 2)                                 │
└─────────────────────────────────────────────────────────────────┘
```

| Tab | İkon | Açıklama | Erişim |
|-----|------|----------|--------|
| **Ana Sayfa** | 🏠 Home | Bugün özeti, hızlı aksiyonlar, yolculuk durumu | Tüm kullanıcılar |
| **Keşfet** | 🧭 Compass | Yolculuk kataloğu, asistan, arama | Tüm kullanıcılar |
| **Topluluk** | 👥 Users | Birlikte okuma, kitap kulüpleri | Aile/Grup planları |
| **Gelişim** | 📊 Chart | İlerleme grafikleri, duygusal harita, raporlar | Aktif abonelik |
| **Profil** | 👤 User | Hesap, abonelik, ayarlar, favoriler | Tüm kullanıcılar |

---

## 🗺️ Detaylı Ekran Hiyerarşisi

### 🏠 ANA SAYFA

```
Ana Sayfa
├── Bugün Kartı
│   ├── Hedef Özeti
│   ├── Kalan Süre (23:59)
│   └── [Devam Et] CTA
├── Yolculuklarım Özeti
│   ├── Aktif Yolculuk 1
│   ├── Aktif Yolculuk 2
│   └── [Tümünü Gör]
├── Abonelik Durumu Rozeti
│   ├── Plan Tipi (Aktif/Deneme/İptal)
│   └── Add-on Durumları
├── Hızlı Arama
│   └── → Arama Sonuçları
├── Alan Kartları
│   ├── Bireysel Alan
│   ├── Grup Alanı
│   └── Koçluk Okulu
└── Vicdandan Karaktere Kartı
    └── [Detayları Gör]
```

### 🧭 KEŞFET

```
Keşfet
├── Yolculuk Asistanı
│   ├── Soru-Cevap Akışı
│   │   ├── Hedef Seçimi
│   │   ├── Süre Tercihi
│   │   └── Seviye Belirleme
│   └── Öneri Listesi
│       ├── Ana Öneri
│       └── Alternatifler (2)
├── Kısa Anket
│   ├── 2-6 Soru
│   └── [Şimdilik Geç]
└── Yolculuk Kataloğu
    ├── Filtreler
    │   ├── Hedef
    │   ├── Süre
    │   └── Seviye
    ├── Sıralama
    │   ├── Önerilen
    │   ├── Popüler
    │   └── Yeni
    └── Yolculuk Kartı
        └── Yolculuk Detayı
            ├── Açıklama
            ├── Modül Listesi
            ├── Süre/Hedef Bilgisi
            ├── [Favorilere Ekle]
            └── [Yolculuğu Başlat]
                └── Hedef Seçimi Modal
                    ├── 300 kelime/gün
                    ├── 500 kelime/gün
                    └── 5 sayfa/gün
```

### 👥 TOPLULUK (Faz 2)

```
Topluluk
├── Birlikte Okuma
│   ├── Grup Listesi
│   │   ├── Arama
│   │   └── Grup Kartları
│   ├── [Grup Oluştur]
│   │   ├── Grup Adı
│   │   ├── Materyal Seçimi
│   │   └── Kurallar
│   └── Grup Detayı
│       ├── Ortak Plan
│       │   ├── Materyal
│       │   ├── Günlük Hedef
│       │   └── Teslim Saati
│       ├── Üye Durumları
│       │   ├── Güncel
│       │   └── Gecikme
│       ├── Ortak İlerleme Haritası
│       ├── Grup Notları
│       └── [Üye Davet Et]
│           ├── Bağlantı Paylaş
│           └── E-posta Gönder
└── Kitap Kulübü
    ├── Kulüp Listesi
    ├── [Kulüp Oluştur]
    └── Kulüp Detayı
        ├── Akış
        ├── Okuyucu Araçları
        └── Moderasyon
```

### 📊 GELİŞİM

```
Gelişim
├── Gelişim Paneli
│   ├── Gün/Süreç Durumu
│   ├── Teslim Oranı Grafiği
│   └── Alışkanlık Zinciri
├── Duygusal Harita
│   ├── Son 14 Gün
│   ├── Son 30 Gün
│   └── Legend (Sakin/Netlik/Gergin)
├── Güçlü/Gelişim Alanları
│   ├── Güçlü Alanlar Kartı
│   ├── Gelişim Alanları Kartı
│   └── [Önerileri Uygula]
├── Haftalık Özet
│   ├── Pozitif Trend
│   ├── Zorlayan Alan
│   ├── Öneri
│   └── [Paylaş]
└── Rapor
    ├── Özet Metrikler
    ├── Temalar
    ├── Öneriler
    ├── [PDF İndir]
    └── [Paylaş]
```

### 👤 PROFİL

```
Profil
├── Hesap Bilgileri
│   ├── Ad/Soyad
│   ├── E-posta/Telefon
│   └── [Düzenle]
├── Abonelik Yönetimi
│   ├── Mevcut Plan
│   ├── Yenileme Tarihi
│   ├── [Plan Değiştir]
│   ├── Add-on Yönetimi
│   │   ├── AI Paketi
│   │   ├── Koçluk Eğitimi
│   │   └── Ek Kişi (+5/+10)
│   ├── Kişi Yönetimi (Aile/Grup)
│   │   ├── Doluluk (3/5)
│   │   ├── [Davet Gönder]
│   │   └── [Kişi Kaldır]
│   ├── Ödeme Geçmişi
│   └── [Aboneliği İptal Et]
├── Favoriler
│   ├── Tür Filtreleri
│   │   ├── Vurgular
│   │   ├── Notlar
│   │   └── Bölümler
│   ├── Koleksiyonlar
│   │   ├── [Koleksiyon Oluştur]
│   │   └── Koleksiyon Detayı
│   ├── Arama
│   └── [Dışa Aktar]
├── Yolculuklarım
│   ├── Aktif Yolculuklar
│   ├── Tamamlanan Yolculuklar
│   └── Sertifikalar
├── Ayarlar
│   ├── Dil Seçimi
│   │   ├── Türkçe
│   │   ├── English
│   │   └── Español
│   ├── Bildirimler
│   │   ├── Hatırlatıcı Saati
│   │   └── Kanal Tercihleri
│   ├── Erişilebilirlik
│   │   ├── Metin Boyutu
│   │   ├── Yüksek Kontrast
│   │   ├── Tema (Açık/Koyu/Sistem)
│   │   └── Altyazı Ayarları
│   └── Gizlilik
│       ├── Veri Kullanımı
│       └── Çerez Tercihleri
├── Yardım & Destek
│   ├── SSS
│   ├── İletişim
│   └── Geri Bildirim
└── [Çıkış Yap]
```

### 📖 OKUMA DENEYİMİ (Modal/Full Screen)

```
Günün Notu (Okuyucu)
├── Header
│   ├── Gün Numarası
│   ├── Hedef
│   └── Son Teslim (23:59)
├── İçerik Alanı
│   ├── Metin
│   ├── Okuma İlerleme Göstergesi
│   └── Metin Seçim Araçları
│       ├── [Vurgula]
│       ├── [Not Ekle]
│       └── [Favorilere Kaydet]
├── Sesli Okuma Kontrolleri
│   ├── Play/Pause
│   ├── Hız (0.75×/1×/1.25×)
│   └── Senkron Vurgulama
└── Alt Bar
    ├── [Yorum Yaz]
    └── İlerleme %
```

### ✍️ YORUM YAZMA (Modal)

```
Yorum Yaz
├── Soru 1: "Bu modülden ne öğrendin?"
│   └── Metin Alanı
├── Soru 2: "Nasıl uygulayacaksın?"
│   └── Metin Alanı
├── Kelime Sayacı
├── Taslak Durumu (Otomatik kaydedildi)
├── 23:00 Sonrası Uyarı
└── Aksiyonlar
    ├── [Önizle]
    └── [Teslim Et]
        └── Onay Modal
            ├── Özet
            └── [Onayla]
```

---

# 3. USER FLOW DİYAGRAMLARI

## 🔐 Flow 1: Kayıt ve İlk Yolculuk

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Splash    │────▶│  Dil Seçimi │────▶│   Kayıt     │
│   Screen    │     │  TR/EN/ES   │     │  E-posta/   │
│             │     │             │     │  Telefon    │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                    ┌─────────────┐     ┌──────▼──────┐
                    │    Plan     │◀────│     OTP     │
                    │   Seçimi    │     │  Doğrulama  │
                    │             │     │             │
                    └──────┬──────┘     └─────────────┘
                           │
      ┌────────────────────┼────────────────────┐
      ▼                    ▼                    ▼
┌───────────┐        ┌───────────┐        ┌───────────┐
│  Bireysel │        │   Aile    │        │   Grup    │
│  1 Kişi   │        │  5 Kişi   │        │  10 Kişi  │
└─────┬─────┘        └─────┬─────┘        └─────┬─────┘
      │                    │                    │
      └────────────────────┼────────────────────┘
                           ▼
                    ┌─────────────┐
                    │   Ödeme     │
                    │  (In-App)   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐     ┌─────────────┐
                    │  Yolculuk   │────▶│  Yolculuk   │
                    │  Asistanı   │     │   Detayı    │
                    │             │     │             │
                    └─────────────┘     └──────┬──────┘
                                               │
                    ┌─────────────┐     ┌──────▼──────┐
                    │  Ana Sayfa  │◀────│  Yolculuğu  │
                    │  (Bugün     │     │   Başlat    │
                    │   Kartı)    │     │             │
                    └─────────────┘     └─────────────┘
```

## 📖 Flow 2: Günlük Okuma ve Teslim

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Ana Sayfa  │────▶│  Günün Notu │────▶│   Okuma     │
│  "Devam Et" │     │  (Okuyucu)  │     │  Tamamlandı │
│             │     │             │     │             │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                    ┌──────▼──────┐             │
                    │  Vurgula/   │             │
                    │  Not Al     │             │
                    └─────────────┘             │
                                               │
                    ┌─────────────┐     ┌──────▼──────┐
                    │  Taslak     │◀────│  Yorum Yaz  │
                    │  Kaydedildi │     │  (Sorular)  │
                    └─────────────┘     └──────┬──────┘
                                               │
┌─────────────┐     ┌─────────────┐     ┌──────▼──────┐
│   Teslim    │◀────│   Önizle    │◀────│  Kelime     │
│  Başarılı   │     │             │     │  Sayacı OK  │
└──────┬──────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│  AI Geri    │────▶│  Yarın için │
│  Bildirim   │     │  Bekle      │
│  (Add-on)   │     │  (08:00)    │
└─────────────┘     └─────────────┘
```

## 💳 Flow 3: Abonelik Yönetimi

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Profil    │────▶│  Abonelik   │────▶│    Plan     │
│             │     │  Yönetimi   │     │  Değiştir   │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Add-on     │     │    Kişi     │     │   Ödeme     │
│  Yönetimi   │     │  Yönetimi   │     │  Geçmişi    │
└──────┬──────┘     └──────┬──────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│ AI Paketi   │     │   Davet     │
│ Koçluk      │     │   Gönder    │
│ Ek Kişi     │     │             │
└─────────────┘     └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  E-posta/   │
                    │  Bağlantı   │
                    └─────────────┘
```

## 🔒 Flow 4: Kilitli İlerleme

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Yolculuk   │────▶│   Modül     │────▶│   Modül     │
│   Detayı    │     │   Listesi   │     │   Detayı    │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
                    ▼                          ▼                          ▼
             ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
             │ ✅ Tamamlandı│           │ 🔄 Devam    │           │ 🔒 Kilitli  │
             │             │           │             │           │             │
             └─────────────┘           └──────┬──────┘           └──────┬──────┘
                                              │                          │
                                       ┌──────▼──────┐           ┌──────▼──────┐
                                       │   Görevi    │           │   Neden     │
                                       │   Tamamla   │           │   Kilitli?  │
                                       └──────┬──────┘           └──────┬──────┘
                                              │                          │
                                       ┌──────▼──────┐           ┌──────▼──────┐
                                       │   Teslim    │           │   Eksik     │
                                       │   Et        │           │   Görev     │
                                       └──────┬──────┘           └─────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    │                                                   │
                    ▼                                                   ▼
             ┌─────────────┐                                     ┌─────────────┐
             │ 23:59       │                                     │  08:00      │
             │ ÖNCESİ      │                                     │  SONRASI    │
             │ Kilit Açıldı│                                     │ Yeni gün    │
             │ Hemen devam │                                     │ aktif olur  │
             └─────────────┘                                     └─────────────┘
```

---

# 4. ABONELİK VE ERİŞİM MATRİSİ

## 💳 Plan Karşılaştırması

| Özellik | Bireysel | Aile | Grup |
|---------|:--------:|:----:|:----:|
| **Kullanıcı Sayısı** | 1 | 5 | 10 |
| **Core Kütüphane Erişimi** | ✅ | ✅ | ✅ |
| **Yolculuk İlerleme Kilidi** | ✅ | ✅ | ✅ |
| **Gelişim Raporları** | ✅ | ✅ | ✅ |
| **Favoriler ve Arşiv** | ✅ | ✅ | ✅ |
| **Çevrimdışı Erişim** | ✅ | ✅ | ✅ |
| **Üye/Davet Yönetimi** | ❌ | ✅ | ✅ |
| **Birlikte Okuma Grupları** | ❌ | ✅ | ✅ |
| **Kitap Kulübü Erişimi** | ❌ | ✅ | ✅ |
| **Öğrenci İndirimi (%50)** | ✅ | ❌ | ❌ |

## 🧩 Add-on Detayları

| Add-on | İçerik | Uygun Planlar | Koşul |
|--------|--------|---------------|-------|
| **AI Paketi** | AI sohbet, günlük içerik üretimi, AI analiz/geri bildirim | Bireysel / Aile / Grup | Aktif abonelik |
| **Koçluk Eğitimi** | Koçluk Okulu programları, dönem/cohort dahil | Bireysel / Aile / Grup | Aktif abonelik |
| **Ek Kişi +5** | Mevcut plana +5 kişi kapasitesi | Aile / Grup | Mevcut limit dolu |
| **Ek Kişi +10** | Mevcut plana +10 kişi kapasitesi | Aile / Grup | Mevcut limit dolu |

## 🔐 Özellik-Epic-Erişim Eşleşmesi

| Özellik | İlgili Epic | Erişim Koşulu | Paywall Mesajı |
|---------|-------------|---------------|----------------|
| Hesap Yönetimi | EPIC 1 | Tüm kullanıcılar | - |
| Ana Sayfa | EPIC 2 | Tüm kullanıcılar | - |
| Abonelik İşlemleri | EPIC 3 | Plan Sahibi | "Bu işlem için plan sahibi olmalısınız" |
| Yolculuk Keşfi | EPIC 4 | Aktif abonelik | "Yolculuklara erişmek için abone olun" |
| Günlük Okuma/Teslim | EPIC 5 | Aktif abonelik | "İçeriğe erişmek için abone olun" |
| Gelişim Raporları | EPIC 6 | Aktif abonelik | "Gelişim takibi için abone olun" |
| Koç Paneli | EPIC 7 | PST Koçu rolü | "Bu alan koçlara özeldir" |
| Favoriler | EPIC 8 | Aktif abonelik | "Favoriler için abone olun" |
| Erişilebilirlik | EPIC 9 | Tüm kullanıcılar | - |
| Birlikte Okuma | EPIC 10 | Aile / Grup planı | "Grup özellikleri için Aile veya Grup planına geçin" |
| Kitap Kulübü | EPIC 11 | Aile / Grup planı | "Kulüpler için Aile veya Grup planına geçin" |
| AI Özellikleri | EPIC 15 | AI Paketi Add-on | "AI özellikleri için AI Paketi add-on'unu etkinleştirin" |
| Modül Sistemi | EPIC 20 | Aktif abonelik | "Modüllere erişmek için abone olun" |

## 👥 Rol Bazlı Yetkiler

| Yetki | Danışan | Plan Sahibi | Plan Üyesi | PST Koçu |
|-------|:-------:|:-----------:|:----------:|:--------:|
| İçerik okuma | ✅ | ✅ | ✅ | ✅ |
| Yorum yazma | ✅ | ✅ | ✅ | ❌ |
| Plan satın alma | ✅ | ✅ | ❌ | ❌ |
| Add-on yönetimi | ❌ | ✅ | ❌ | ❌ |
| Kişi davet etme | ❌ | ✅ | ❌ | ❌ |
| Kişi kaldırma | ❌ | ✅ | ❌ | ❌ |
| Danışan takibi | ❌ | ❌ | ❌ | ✅ |
| Koç yorumu yazma | ❌ | ❌ | ❌ | ✅ |
| İlerleme raporları | ✅ | ✅ | ✅ | ✅ (atanan) |

---

# 5. GLOSSARY

## 📚 Terimler Sözlüğü

| Terim | Tanım | İlgili Epic |
|-------|-------|-------------|
| **Yolculuk** | Kullanıcının takip ettiği çok günlü kişisel gelişim programı. Modüllerden oluşur. | EPIC 4, 5, 20 |
| **Modül** | Yolculuk içindeki bağımsız içerik birimi. Okuma + yorum + görevlerden oluşur. | EPIC 20 |
| **Günün Notu** | Her gün kullanıcıya sunulan okuma materyali. | EPIC 5 |
| **Teslim** | Kullanıcının günlük yorumunu göndermesi. Son teslim saati: 23:59. | EPIC 5 |
| **Kilitli İlerleme** | Bir adım tamamlanmadan sonraki adıma geçilememesi kuralı. | EPIC 20 |
| **08:00 Kuralı** | Yeni günün içeriğinin saat 08:00'de aktif olması. | EPIC 5, 20 |
| **Plan Sahibi** | Aboneliği satın alan ve yöneten kullanıcı. Kişi ekleyebilir/çıkarabilir. | EPIC 3 |
| **Plan Üyesi** | Plan Sahibi tarafından davet edilen kullanıcı. Yönetim yetkisi yoktur. | EPIC 3 |
| **Danışan** | İçerik tüketen genel kullanıcı rolü. | Tüm Epic'ler |
| **PST Koçu** | Danışanları takip eden ve geri bildirim veren profesyonel. | EPIC 7 |
| **Add-on** | Ana plana ek olarak satın alınabilen özellik paketi. | EPIC 3 |
| **Seat (Kişi)** | Plandaki kullanıcı kapasitesi. Bireysel: 1, Aile: 5, Grup: 10. | EPIC 3 |
| **Birlikte Okuma** | Aynı materyali grup olarak takip etme özelliği. | EPIC 10 |
| **Kitap Kulübü** | Sosyal okuma ve tartışma grupları. | EPIC 11 |
| **Duygusal Harita** | Yorumlardan türetilen duygu durumu görselleştirmesi. | EPIC 6 |
| **Alışkanlık Zinciri** | Kesintisiz teslim günlerinin görsel takibi. | EPIC 6 |
| **Paywall** | Ücretli içeriğe erişim kısıtlaması ve satın alma yönlendirmesi. | Tüm Epic'ler |
| **OTP** | Tek kullanımlık şifre (One-Time Password). Kayıt/giriş doğrulaması için. | EPIC 1 |
| **Entitlement** | Kullanıcının satın alma sonrası kazandığı erişim hakları. | EPIC 3 |
| **Vicdandan Karaktere** | PST'nin dayandığı kişisel gelişim yaklaşımı/felsefesi. | EPIC 2 |

## 🔤 Kısaltmalar

| Kısaltma | Açılım |
|----------|--------|
| PST | (Program adı - açılımı belirtilmeli) |
| US | User Story |
| AC | Acceptance Criteria (Kabul Kriterleri) |
| CTA | Call to Action (Aksiyon Çağrısı) |
| MVP | Minimum Viable Product |
| DAU | Daily Active Users |
| DND | Do Not Disturb (Sessiz Saatler) |
| SSS | Sıkça Sorulan Sorular |

---

# 6. FAZ PLANLAMASI

## 🎯 Faz 1: MVP (12-16 Hafta)

### Sprint Dağılımı Önerisi

| Sprint | Hafta | Epic | Odak |
|--------|-------|------|------|
| Sprint 1-2 | 1-4 | EPIC 1 | Hesap, Oturum, Güvenlik |
| Sprint 3-4 | 5-8 | EPIC 2, 3 | Ana Sayfa, Abonelik |
| Sprint 5-6 | 9-12 | EPIC 4, 5 | Yolculuk, Okuma/Teslim |
| Sprint 7-8 | 13-16 | EPIC 6, 8, 9, 20 | Gelişim, Favoriler, Erişilebilirlik, Modül |

### Faz 1 Öncelik Sıralaması

```
1. EPIC 1: Dil, Hesap ve Güvenli Oturum    ████████████ Kritik
2. EPIC 2: Ana Sayfa ve Navigasyon         ████████████ Kritik
3. EPIC 3: Abonelik ve Kişi Yönetimi       ████████████ Kritik
4. EPIC 4: Yolculuk Keşfi ve Başlatma      ██████████░░ Yüksek
5. EPIC 5: Günlük Okuma ve Teslim          ██████████░░ Yüksek
6. EPIC 20: Modül Sistemi                  ████████░░░░ Yüksek
7. EPIC 6: Gelişim ve Raporlama            ██████░░░░░░ Orta
8. EPIC 8: Favoriler ve Arşiv              ████░░░░░░░░ Orta
9. EPIC 9: Erişilebilirlik                 ████░░░░░░░░ Orta
```

## 🚀 Faz 2: Topluluk + AI (8-12 Hafta)

| Epic | Açıklama | Bağımlılık |
|------|----------|------------|
| EPIC 7 | Koç Paneli | EPIC 1, 3 |
| EPIC 10 | Birlikte Okuma | EPIC 3, 5 |
| EPIC 11 | Kitap Kulübü | EPIC 10 |
| EPIC 12 | Oyunlaştırma | EPIC 5, 6 |
| EPIC 13 | Pekiştirme Oyunları | EPIC 5 |
| EPIC 14 | Video Dersler | EPIC 4 |
| EPIC 15 | AI Özellikleri | EPIC 3 (Add-on) |
| EPIC 16 | Hatırlatıcılar | EPIC 2 |

## 🔄 Faz 3: Sürekli İyileştirme

- A/B Test sonuçlarına göre optimizasyon
- Performans iyileştirmeleri
- Yeni Epic'ler (kullanıcı geri bildirimine göre)
- Platform güncellemeleri (iOS/Android)

---

# 📎 EKLER

## Teknik Gereksinimler Özeti

| Gereksinim | Açıklama | Faz |
|------------|----------|-----|
| Çevrimdışı Destek | Cache ve senkronizasyon mekanizması | Faz 1 |
| Erişilebilirlik | WCAG 2.1 AA uyumu | Faz 1 |
| Platform Entegrasyonu | Apple App Store / Google Play In-App Purchase | Faz 1 |
| Push Bildirimler | Firebase / APNs entegrasyonu | Faz 1 |
| Audit Logging | Koç işlemleri için iz kayıtları | Faz 2 |
| AI Entegrasyonu | ChatGPT/Claude API entegrasyonu | Faz 2 |

## İletişim ve Sorumluluklar

| Rol | Sorumluluk |
|-----|------------|
| Product Manager | PRD, önceliklendirme, stakeholder yönetimi |
| UX Designer | Wireframe, UI tasarım, kullanıcı araştırması |
| Tech Lead | Mimari, teknik karar, code review |
| Backend Dev | API, veritabanı, entegrasyonlar |
| Mobile Dev | iOS/Android uygulama geliştirme |
| QA | Test senaryoları, bug tracking |

---

**Belge Sonu**

*Bu Ekip Paylaşım Paketi, PST Mobile App projesinde tüm ekip üyelerinin ortak referansı olarak kullanılacaktır.*

*Son Güncelleme: Ocak 2026*
