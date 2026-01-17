# PST Mobile App - User Flows & Screen Inventory

**Versiyon:** 1.0 | **Tarih:** Ocak 2026 | **Kaynak:** PST_Mobile_PRD_v1.1.md | **Durum:** Production Ready

---

# BÖLÜM A: USER FLOWS

## UF-01: Onboarding ve Kayıt (Faz 1, EPIC 1)

```
APP LAUNCH → SCR-001 Splash → SCR-002 Dil Seçimi (TR/EN/ES)
    → SCR-003 Welcome Carousel (3 slide)
    → SCR-004 Kayıt Yöntemi (E-posta/Telefon)
    → SCR-005 Kayıt Formu (Ad/Soyad/Şifre)
    → SCR-006 OTP Doğrulama (6 haneli kod)
    → SCR-020 Plan Seçimi
    → SCR-030 İçerik Asistanı
    → SCR-100 Ana Sayfa
```

**Alternatif:** Mevcut hesap → SCR-007 Giriş | OTP 3x hatalı → Yeni kod gönder

---

## UF-02: Giriş ve Oturum (Faz 1, EPIC 1)

```
SCR-007 Giriş → E-posta+Şifre veya Telefon+OTP
    → Doğrulama (Server-side)
    → Başarılı: Abonelik Kontrolü → SCR-100 Ana Sayfa
    → Hatalı: 5 deneme sonrası 15dk kilit
```

**Şifre Sıfırlama:** SCR-007 → SCR-008 E-posta Gir → SCR-009 OTP → SCR-010 Yeni Şifre → SCR-011 Başarılı

---

## UF-03: Abonelik Satın Alma (Faz 1, EPIC 3)

```
Giriş: Onboarding / Profil / Paywall
    → SCR-020 Plan Seçimi (Bireysel/Aile/Grup)
    → [Bireysel + Öğrenci?] → SCR-021 Öğrenci Doğrulama
    → SCR-022 Ödeme Özeti + Add-on'lar
    → Platform In-App Purchase (Apple/Google)
    → SCR-023 Satın Alma Başarılı
    → SCR-030 İçerik Asistanı
```

**Add-on'lar:** AI Paketi | Koçluk Eğitimi | Ek Kişi +5/+10

---

## UF-04: İçerik Keşfi ve Başlatma (Faz 1, EPIC 4)

```
Tab Bar "Keşfet" → SCR-030 Keşfet Ana
    ├── SCR-031 İçerik Asistanı (Sorular) → SCR-032 Öneriler
    ├── Segment: Yolculuklar → SCR-033 Katalog → SCR-040 Detay
    ├── Segment: Atölyeler → SCR-034 Katalog → SCR-041 Detay
    ├── Segment: Modüller → SCR-035 Katalog → SCR-042 Detay
    ├── Segment: e-Kitaplar → SCR-036 Katalog → SCR-043 Detay
    └── SCR-038 Arama Sonuçları
    
Detay → SCR-044 Hedef Seçimi → SCR-045 Başlatma Onayı → Kütüphane
```

---

## UF-05: Yolculuk Deneyimi (Faz 1, EPIC 4, 5, 11)

```
Ana Sayfa / Kütüphane → SCR-050 Yolculuk Ana
    ├── İlerleme Özeti
    ├── Bugün Kartı → "Devam Et"
    └── Modüller Listesi → SCR-051 Modül Detay
        ├── Paket → UF-07 Modül/Paket Flow
        └── Atölye → UF-06 Atölye Flow
```

---

## UF-06: Atölye Deneyimi (Faz 1, EPIC 8)

```
SCR-060 Atölye Ana (İlerleme %, Bölüm Listesi)
    ├── ✅ Bölüm Tamamlandı
    ├── 🔄 Bölüm Devam → Açılır
    │   ├── OKUMA: SCR-061 → Metin + Vurgula/Not + Sesli
    │   └── UYGULAMA: SCR-062 → Talimat + Adımlar (☐→☑)
    │       → SCR-063 Yorum Yazma
    │       → SCR-064 Bölüm Tamamlandı
    │           ├── Sonraki Bölüm (08:00'de)
    │           └── Atölye Tamamlandı → SCR-065 + SCR-066 Sertifika
    └── 🔒 Bölüm Kilitli
```

---

## UF-07: Modül ve Paket Deneyimi (Faz 1, EPIC 11)

```
SCR-070 Modül Ana (İlerleme, Paket Listesi)
    ├── ✅ Paket Tamamlandı
    ├── 🔄 Paket Devam → SCR-071 Paket Detay
    │   ├── SCR-072 Okuma → UF-09 Okuma Flow
    │   ├── SCR-073 Uygulama → Adımlar
    │   └── SCR-074 Yorum → SCR-075 Paket Tamamlandı
    │       ├── Sonraki Paket Açıldı
    │       └── Modül Tamamlandı → SCR-076 + SCR-077 Sertifika
    └── 🔒 Paket Kilitli (SCR-078)
```

---

## UF-08: e-Kitap Okuma (Faz 1, EPIC 7)

```
SCR-043 e-Kitap Detay
    ├── "Okumaya Başla" → SCR-080 e-Kitap Okuyucu
    └── "İndir" → Offline indirme (SCR-088)

SCR-080 Okuyucu:
    ├── Sayfa Okuma (← →)
    ├── SCR-081 İçindekiler → Bölüme Atla
    ├── SCR-082 Ayarlar (Font, Arka Plan, Satır Aralığı)
    ├── Vurgula → Renk Seç → SCR-083 Not Ekle → Favorilere
    ├── SCR-084 Sesli Dinle (Hız ayarı, Senkron)
    └── SCR-085 Vurgularım/Notlarım

Son Sayfa → SCR-086 Kitap Tamamlandı → Rozet + Sonraki Öneri
```

---

## UF-09: Günlük Okuma ve Teslim (Faz 1, EPIC 5)

```
Ana Sayfa "Devam Et" → SCR-090 Günün Notu
    ├── Metin Okuma + Sesli Okuma + Vurgula/Not
    └── Okuma Tamamlandı → SCR-092 Yorum Yazma
        ├── Sorular + Kelime Sayacı
        ├── <23:00: Normal | ≥23:00: Uyarı
        └── SCR-093 Önizleme → SCR-094 Teslim Onayı
            ├── <23:59: SCR-095 Teslim Başarılı
            │   ├── AI Geri Bildirim (Add-on varsa)
            │   └── Sonraki Gün 08:00'de
            └── >23:59: Geç Teslim kuralı

08:00 Kuralı: Bugün Tamamlandı → SCR-097 Sonraki Kilitli → Geri Sayım → Kilit Açıldı
```

---

## UF-10: Favoriler ve Notlar (Faz 1, EPIC 9)

```
Kütüphane → SCR-110 Favoriler Ana
    ├── Filtre (Tür: Vurgu/Not/Bölüm | Kaynak: Yolculuk/Atölye/Modül/e-Kitap)
    ├── Arama
    ├── SCR-111 Koleksiyonlar → SCR-112 Yeni Oluştur
    └── Favori Listesi → SCR-113 Detay
        ├── Not Düzenle
        ├── Kaynağa Git
        └── SCR-114 Paylaş/Dışa Aktar (PDF/Sadece Vurgu)
```

---

## UF-11: Gelişim Takibi (Faz 1, EPIC 6)

```
Tab Bar "Gelişim" → SCR-120 Gelişim Ana
    ├── Özet Kartları (İlerleme, Teslim Oranı, Streak)
    ├── SCR-121 Duygusal Harita (14/30 gün, Legend, Disclaimer)
    ├── SCR-122 Güçlü/Gelişim Alanları → Önerilen İçerikler
    ├── SCR-123 Haftalık Özet
    └── SCR-124 Rapor İndir → Gizlilik Onayı → PDF

İçerik Tamamlandı → SCR-125 Değerlendirme Modal → SCR-126 Form → Sonraki Öneri
```

---

## UF-12: Kişi Yönetimi (Faz 1, EPIC 3)

```
Profil → Abonelik → SCR-130 Kişi Yönetimi
    ├── Doluluk (3/5)
    ├── Kişi Listesi → Kaldır Modal
    └── SCR-131 Davet Gönder (E-posta/Bağlantı Kopyala)

Limit Dolu → SCR-133 Add-on Önerisi "Ek Kişi +5" → UF-03 Satın Alma
```

---

## UF-13: Koç Paneli (Faz 2, EPIC 12)

```
Koç Paneli → SCR-140 Danışan Listesi
    ├── Filtre (Güncel/Risk/Gecikme) + Arama
    ├── SCR-141 Uyarılar Badge
    └── Danışan Kartı → SCR-142 Danışan Profili
        ├── Hedef, İçerik Takibi, İlerleme, Teslim Geçmişi
        └── SCR-143 Koç Yorumu Yaz → Bildirim
```

---

## UF-14: Birlikte Okuma (Faz 2, EPIC 13)

```
Topluluk Tab → SCR-150 Ana
    ├── Birlikte Okuma → SCR-151 Gruplarım
    │   ├── Mevcut Grup → SCR-153 Detay → SCR-154 Ortak İlerleme
    │   └── SCR-152 Grup Oluştur (Ad, Materyal, Kurallar)
    └── Kitap Kulübü → SCR-157 Ana → SCR-158 Detay → SCR-159 Tartışma
```

---

## UF-15: AI Asistan (Faz 2, EPIC 16)

```
AI Butonu → AI Paketi Aktif?
    ├── Hayır → SCR-160 Add-on Önerisi
    └── Evet → SCR-161 AI Sohbet
        ├── Soru Gir + Bağlam (Mevcut İçerik)
        ├── AI İşleniyor (RAG Query)
        └── SCR-162 AI Cevabı + Kaynak Referansı
            ├── Kaynağa Git
            └── Takip Sorusu

SCR-163 AI Analiz Raporu (İçgörüler, Öneriler, Disclaimer)
```

---

# BÖLÜM B: SCREEN INVENTORY

## Ekran ID Sistemi

| Prefix | Kategori | Prefix | Kategori |
|--------|----------|--------|----------|
| SCR-001-019 | Onboarding & Auth | SCR-100-109 | Ana Sayfa |
| SCR-020-029 | Abonelik | SCR-110-119 | Favoriler |
| SCR-030-049 | Keşfet | SCR-120-129 | Gelişim |
| SCR-050-059 | Yolculuk | SCR-130-139 | Profil/Ayarlar |
| SCR-060-069 | Atölye | SCR-140-149 | Koç Paneli (Faz 2) |
| SCR-070-079 | Modül/Paket | SCR-150-159 | Topluluk (Faz 2) |
| SCR-080-089 | e-Kitap Okuyucu | SCR-160-169 | AI Asistan (Faz 2) |
| SCR-090-099 | Okuma/Teslim | SCR-170-189 | Video/Oyunlaştırma (Faz 2) |

---

## 1. Onboarding & Auth Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-001 | Splash Screen | Logo, Progress indicator |
| SCR-002 | Dil Seçimi | Language cards (TR/EN/ES), Continue |
| SCR-003 | Welcome Carousel | 3 slides, Skip, Dots |
| SCR-004 | Kayıt Yöntemi | E-posta/Telefon cards |
| SCR-005 | Kayıt Formu | Text inputs, Password rules, Submit |
| SCR-006 | OTP Doğrulama | 6-digit input, Timer, Resend |
| SCR-007 | Giriş Ekranı | Inputs, Login, Forgot password |
| SCR-008 | Şifre Sıfırlama - E-posta | Input, Submit |
| SCR-009 | Şifre Sıfırlama - OTP | OTP input, Timer |
| SCR-010 | Yeni Şifre Belirleme | Password inputs, Rules |
| SCR-011 | Şifre Sıfırlama Başarılı | Success, Go to login |
| SCR-012 | Hesap Kilidi | Lock icon, 15min timer |
| SCR-013 | Hata - Ağ | Error icon, Retry |
| SCR-014 | Hata - Sunucu | Error icon, Contact support |

---

## 2. Abonelik Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-020 | Plan Seçimi | Plan cards, Feature table, Select CTA |
| SCR-021 | Öğrenci Doğrulama | Verification form |
| SCR-022 | Ödeme Özeti | Plan + Add-ons, Total, Pay |
| SCR-023 | Satın Alma Başarılı | Success, Features unlocked |
| SCR-024 | Add-on Yönetimi | Add-on cards, Activate/Deactivate |
| SCR-025 | Abonelik Yönetimi | Current plan, Renewal, Actions |
| SCR-026 | Plan Değiştirme | Upgrade/Downgrade options |
| SCR-027 | Ödeme Geçmişi | Transaction list, Receipts |
| SCR-028 | Abonelik İptali | Consequences, Confirm |
| SCR-029 | Paywall | Lock message, Plan options |

---

## 3. Keşfet Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-030 | Keşfet Ana | Asistan CTA, Segments, Featured |
| SCR-031 | İçerik Asistanı - Sorular | Question cards, Options |
| SCR-032 | İçerik Asistanı - Öneriler | Main + 2 alternatives |
| SCR-033 | Yolculuk Kataloğu | Filters, Sort, Journey cards |
| SCR-034 | Atölye Kataloğu | Filters, Workshop cards |
| SCR-035 | Modül Kataloğu | Filters, Module cards |
| SCR-036 | e-Kitap Kataloğu | Filters, Book cards |
| SCR-037 | Filtre Modal | Checkboxes, Sliders, Apply/Reset |
| SCR-038 | Arama Sonuçları | Categorized results |
| SCR-040 | Yolculuk Detay | Header, Description, Modules, Start |
| SCR-041 | Atölye Detay | Header, Sections, Start |
| SCR-042 | Modül Detay | Header, Packages, Start |
| SCR-043 | e-Kitap Detay | Cover, TOC, Start/Download |
| SCR-044 | Hedef Seçimi Modal | Daily goal options |
| SCR-045 | Başlatma Onayı | Summary, Rules, Start |

---

## 4. Kütüphane Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-046 | Kütüphane Ana | Segments tabs |
| SCR-047 | Aktif İçerikler | Progress cards, Continue |
| SCR-048 | e-Kitaplarım | Book grid, Download status |
| SCR-049 | Tamamlananlar | Completed cards, Certificates |

---

## 5. Ana Sayfa Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-100 | Ana Sayfa | Today card, Active content, Actions |
| SCR-101 | Bugün Kartı Expanded | Progress, Time, Continue |
| SCR-102 | Aktif İçerikler Tümü | Content cards, Filters |
| SCR-103 | Arama Ekranı | Search input, Recent |
| SCR-104 | Arama Sonuçları | Tabs by type |
| SCR-105 | Vicdandan Karaktere | Text content |
| SCR-106 | Bildirimler | Notification list |
| SCR-107 | Boş Durum | Empty state, CTA |

---

## 6. Okuma/Teslim Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-090 | Günün Notu | Header, Content, Progress |
| SCR-091 | Okuma Tamamlandı | Message, Write CTA |
| SCR-092 | Yorum Yazma | Questions, Text areas, Counter |
| SCR-093 | Yorum Önizleme | Summary, Edit/Submit |
| SCR-094 | Teslim Onay Modal | Summary, Confirm, Warning |
| SCR-095 | Teslim Başarılı | Success, AI feedback, Next |
| SCR-096 | AI Geri Bildirim | AI response, Disclaimer |
| SCR-097 | Sonraki Gün Kilitli | Lock, Countdown |
| SCR-098 | Sesli Okuma | Play/Pause, Speed, Progress |
| SCR-099 | Metin Araçları | Highlight colors, Note, Save |

---

## 7. e-Kitap Okuyucu Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-080 | e-Kitap Okuyucu | Page content, Nav, Bottom bar |
| SCR-081 | İçindekiler | Chapter list, Location |
| SCR-082 | Okuma Ayarları | Font, Background, Spacing |
| SCR-083 | Not Ekleme Modal | Note input, Save |
| SCR-084 | Sesli Dinleme | Player, Speed, Sync |
| SCR-085 | Vurgularım/Notlarım | List, Jump, Export |
| SCR-086 | Kitap Tamamlandı | Stats, Badge, Next |
| SCR-087 | Sayfa Atlama Modal | Number input, Go |
| SCR-088 | İndirme Durumu | Progress, Cancel |
| SCR-089 | Çevrimdışı Bildirim | Info banner |

---

## 8. Atölye Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-060 | Atölye Ana | Progress, Sections, Continue |
| SCR-061 | Okuma Bölümü | Content, Highlight, Audio |
| SCR-062 | Uygulama Bölümü | Instructions, Steps, Checkboxes |
| SCR-063 | Atölye Yorum | Questions, Submit |
| SCR-064 | Bölüm Tamamlandı | Success, Next info |
| SCR-065 | Atölye Tamamlandı | Stats, Certificate |
| SCR-066 | Atölye Sertifikası | Certificate, Share |
| SCR-067 | Kilitli Bölüm | Lock message |
| SCR-068 | Uygulama Adımları | Step cards |
| SCR-069 | Atölye İlerleme | Status list |

---

## 9. Modül/Paket Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-070 | Modül Ana | Progress, Package list |
| SCR-071 | Paket Detay | Description, Sections, Start |
| SCR-072 | Paket Okuma | Content, Tools |
| SCR-073 | Paket Uygulama | Instructions, Steps |
| SCR-074 | Paket Yorum | Questions, Submit |
| SCR-075 | Paket Tamamlandı | Success, Next unlock |
| SCR-076 | Modül Tamamlandı | Stats, Certificate |
| SCR-077 | Modül Sertifikası | Certificate, Share |
| SCR-078 | Kilitli Paket | Lock, Prerequisites |
| SCR-079 | Modül İlerleme | Package status |

---

## 10. Gelişim Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-120 | Gelişim Ana | Summary cards, Stats |
| SCR-121 | Duygusal Harita | Calendar, Legend, Disclaimer |
| SCR-122 | Güçlü/Gelişim Alanları | Cards, Suggestions |
| SCR-123 | Haftalık Özet | Trends, Recommendations |
| SCR-124 | Rapor Önizleme | Preview, Download/Share |
| SCR-125 | Değerlendirme Modal | Rating prompt |
| SCR-126 | Değerlendirme Formu | Stars, Questions |
| SCR-127 | İlerleme Grafikleri | Charts, Filters |
| SCR-128 | Alışkanlık Zinciri | Calendar, Streak |
| SCR-129 | Teslim Oranı Detay | On-time/Late/Missed % |

---

## 11. Profil/Ayarlar Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-130 | Profil Ana | Avatar, Name, Plan, Menu |
| SCR-131 | Hesap Bilgileri | Info, Edit options |
| SCR-132 | Hesap Düzenleme | Form, Save |
| SCR-133 | Kişi Yönetimi | Members, Invite, Capacity |
| SCR-134 | Davet Gönder | Email, Link copy |
| SCR-135 | Ayarlar Ana | Settings menu |
| SCR-136 | Dil Ayarları | Language options |
| SCR-137 | Bildirim Ayarları | Toggles, Time picker |
| SCR-138 | Erişilebilirlik | Font, Contrast, Theme |
| SCR-139 | Gizlilik Ayarları | Privacy options |

---

## 12. Favoriler Ekranları (Faz 1)

| ID | Ekran Adı | Bileşenler |
|----|-----------|------------|
| SCR-110 | Favoriler Ana | Filters, Search, List |
| SCR-111 | Koleksiyonlar | Collection list |
| SCR-112 | Koleksiyon Oluştur | Name input, Create |
| SCR-113 | Favori Detay | Content, Edit note, Go to source |
| SCR-114 | Paylaşım Seçenekleri | PDF, Scope selection |

---

## 13. Faz 2 Ekranları

### Koç Paneli (EPIC 12)
| ID | Ekran | ID | Ekran |
|----|-------|----|-------|
| SCR-140 | Danışan Listesi | SCR-144 | İçerik Takibi |
| SCR-141 | Uyarılar | SCR-145 | Teslim Geçmişi |
| SCR-142 | Danışan Profili | SCR-146 | Koç Notu |
| SCR-143 | Koç Yorumu Yaz | SCR-147 | Erişim Ayarları |

### Topluluk (EPIC 13-14)
| ID | Ekran | ID | Ekran |
|----|-------|----|-------|
| SCR-150 | Topluluk Ana | SCR-155 | Grup Notları |
| SCR-151 | Birlikte Okuma | SCR-156 | Üye Davet |
| SCR-152 | Grup Oluştur | SCR-157 | Kitap Kulübü Ana |
| SCR-153 | Grup Detayı | SCR-158 | Kulüp Detayı |
| SCR-154 | Ortak İlerleme | SCR-159 | Tartışma |

### AI Asistan (EPIC 16)
| ID | Ekran | ID | Ekran |
|----|-------|----|-------|
| SCR-160 | AI Paketi Gerekli | SCR-163 | AI Analiz |
| SCR-161 | AI Sohbet | SCR-164 | Kaynak Gösterim |
| SCR-162 | AI Cevabı | SCR-165 | Sohbet Geçmişi |

### Video & Oyunlaştırma (EPIC 15, 18)
| ID | Ekran | ID | Ekran |
|----|-------|----|-------|
| SCR-170 | Video Kütüphanesi | SCR-180 | Rozetlerim |
| SCR-171 | Video Oynatıcı | SCR-181 | Seri Durumu |
| SCR-172 | Video Detay | SCR-182 | Seviye İlerlemesi |
| SCR-173 | Video İndirme | SCR-183 | Puan Tablosu |

---

## Modal Inventory (MDL)

| ID | Modal | ID | Modal |
|----|-------|----|-------|
| MDL-001 | Onay | MDL-011 | Teslim Onayı |
| MDL-002 | Hata | MDL-012 | Kilit Bilgisi |
| MDL-003 | Başarı | MDL-013 | Add-on Önerisi |
| MDL-004 | Çıkış Onayı | MDL-014 | Limit Uyarısı |
| MDL-005 | Silme Onayı | MDL-015 | İndirme Onayı |
| MDL-006 | Paylaşım | MDL-016 | Depolama Uyarısı |
| MDL-007 | Filtre | MDL-017 | Bildirim İzni |
| MDL-008 | Sıralama | MDL-018 | Gizlilik Onayı |
| MDL-009 | Hedef Seçimi | MDL-019 | Değerlendirme |
| MDL-010 | Zaman Uyarısı | MDL-020 | Not Ekleme |

---

## Component Inventory (CMP)

### Navigation
CMP-001 Tab Bar | CMP-002 Header | CMP-003 Collapsed Header | CMP-004 Bottom Sheet | CMP-005 Drawer

### Cards
CMP-010 Journey | CMP-011 Workshop | CMP-012 Module | CMP-013 Package | CMP-014 Book | CMP-015 Today | CMP-016 Progress | CMP-017 Favorite

### Inputs
CMP-020 Text | CMP-021 Password | CMP-022 OTP | CMP-023 Search | CMP-024 TextArea | CMP-025 Checkbox | CMP-026 Radio | CMP-027 Toggle | CMP-028 Slider | CMP-029 Dropdown

### Buttons
CMP-040 Primary | CMP-041 Secondary | CMP-042 Text | CMP-043 Icon | CMP-044 FAB | CMP-045 Chip

### Feedback
CMP-050 Toast | CMP-051 Snackbar | CMP-052 Progress Bar | CMP-053 Spinner | CMP-054 Skeleton | CMP-055 Empty State | CMP-056 Error State | CMP-057 Badge

### Reader
CMP-060 Highlight | CMP-061 Note Popup | CMP-062 Audio Player | CMP-063 Reading Progress | CMP-064 Page Nav | CMP-065 TOC Drawer | CMP-066 Font Settings

### Charts
CMP-070 Line | CMP-071 Bar | CMP-072 Progress Ring | CMP-073 Calendar | CMP-074 Streak | CMP-075 Emotion Map

---

## ÖZET

| Kategori | Faz 1 | Faz 2 | Toplam |
|----------|:-----:|:-----:|:------:|
| Onboarding & Auth | 14 | - | 14 |
| Abonelik | 10 | - | 10 |
| Keşfet | 16 | - | 16 |
| Kütüphane | 4 | - | 4 |
| Ana Sayfa | 8 | - | 8 |
| Okuma/Teslim | 10 | - | 10 |
| e-Kitap Okuyucu | 10 | - | 10 |
| Atölye | 10 | - | 10 |
| Modül/Paket | 10 | - | 10 |
| Gelişim | 10 | - | 10 |
| Profil/Ayarlar | 10 | - | 10 |
| Favoriler | 5 | - | 5 |
| Koç Paneli | - | 8 | 8 |
| Topluluk | - | 10 | 10 |
| AI Asistan | - | 6 | 6 |
| Video/Oyunlaştırma | - | 8 | 8 |
| **TOPLAM EKRAN** | **117** | **32** | **149** |
| Modals | 20+ | | |
| Components | 75+ | | |

---

## Design System Gereksinimleri

- **Renk:** Primary, Secondary, Accent, Semantic (Success/Warning/Error/Info)
- **Typography:** H1-H6, Body, Caption, Button
- **Spacing:** 4px grid
- **Shadows:** 3 elevation levels
- **Border Radius:** 4/8/12/16px, Full
- **Icons:** Lucide / SF Symbols / Material

## Erişilebilirlik

- Touch target: min 44x44pt
- Contrast: WCAG 2.1 AA (4.5:1 text, 3:1 UI)
- Focus indicators
- Screen reader labels
- Reduced motion option

## Platform Farklılıkları

| | iOS | Android |
|-|-----|---------|
| Navigation | Bottom Tab | Bottom Nav |
| Back | Swipe/Header | System/Header |
| Modals | iOS sheets | Material sheets |

---

**Son Güncelleme:** Ocak 2026 - v1.0
