# PST Coaching Mobile App — Paylaşım Özeti (1–2 Sayfa)

**Tek kaynak (source of truth):** `Model1/UserStoriesRev3.md`  
**Bu özetin amacı:** Ekibin 10–15 dakikada kapsamı, fazları, ana akışları ve kritik ürün kurallarını aynı şekilde anlamasını sağlamak.

---

## 1) Ürün Kapsamı (Özet)

`Model1/UserStoriesRev3.md`; mobil uygulama için **EPIC 1–21** backlog’unu fazlara ayırır ve her user story için **Role, Description, Acceptance Criteria, Navigation Steps** tanımlar.

---

## 2) Bilgi Mimarisi (Tab Bar — MVP)

`Model1/UserStoriesRev3.md` içindeki MVP tab bar yapısı:

- **Ana Sayfa**: Bugün kartı, aktif yolculuk özeti, hızlı devam, öneriler
- **Keşfet**: Yolculuklar, Videolar, Oyunlar, Favoriler, Asistan (AI/Gated)
- **Yolculuklarım**: Aktif/Pasif yolculuklar, modüller, kilitli ilerleme, teslim & yorum
- **Topluluk**: Birlikte Okuma, Kitap Kulübü, Grup akışları (Faz-2’de genişler)
- **Profil**: Hesap, Abonelik & Add-on’lar, Kişi Yönetimi (Aile/Grup), Ayarlar, Erişilebilirlik

Not: Topluluk alanı Faz-2’de genişlese de tab bar’daki yeri bu dokümanda “MVP” altında tanımlı; erişim/visibility kuralı Faz planına göre yönetilmeli.

---

## 3) Abonelik Modeli (Kısa Özet)

`Model1/UserStoriesRev3.md` içeriğine göre:

- **Planlar**: Bireysel (1), Aile (5), Grup (10) — Core kütüphane erişimi + yolculuk ilerleme kilidi her planda var.
- **Öğrenci indirimi**: Yalnızca Bireysel plan için %50 + doğrulama + yılda 1 yeniden doğrulama.
- **Add-on’lar**: AI Paketi, Koçluk Eğitimi (tümü planlarda), Ek Kişi +5 / +10 (Aile/Grup).

---

## 4) Faz Planı (MVP vs Genişleme)

### Faz-1 (MVP / Production hedefi)
Faz-1 olarak işaretlenmiş EPIC’ler:

- **EPIC 1** — Dil, Hesap ve Güvenli Oturum
- **EPIC 2** — Ana Akış (Home), Günlük Odak ve Akıllı Yönlendirme
- **EPIC 3** — Abonelik, Add-On ve Kişi Yönetimi
- **EPIC 4** — Yolculuk Keşfi ve Başlatma
- **EPIC 5** — Günlük Okuma, Yorum ve Teslim
- **EPIC 6** — Gelişim ve Geri Bildirim
- **EPIC 8** — Favoriler ve Kişisel Arşiv
- **EPIC 9** — Erişilebilirlik ve Kapsayıcı Deneyim
- **EPIC 11** — Hatırlatıcılar ve Alışkanlık Zinciri
- **EPIC 15** — Modül Sistemi ve Kilitli İlerleme
- **EPIC 21** — Öğrenci İndirimi ve Doğrulama

### Faz-2 (Kademeli geliştirme)
Faz-2 olarak işaretlenmiş EPIC’ler:

- **EPIC 7** — Koç Paneli ve Danışan Takibi
- **EPIC 10** — AI Destekli İçerik, Sohbet ve Analiz
- **EPIC 12** — Birlikte Okuma ve Grup Deneyimi
- **EPIC 13** — Kitap Kulübü ve Sosyal Okuma
- **EPIC 14** — Sanal Dünya ve Oyunlaştırma
- **EPIC 16** — Erişilebilirlik ve Alternatif Tüketim
- **EPIC 17** — Pekiştirici Oyunlar (Çocuk + Yetişkin)
- **EPIC 18** — Video Dersler ve Rehber Kütüphanesi
- **EPIC 19** — Koç Takibi ve Mentor Geri Bildirimi
- **EPIC 20** — Yolculuk Belirleme Asistanı

---

## 5) “Kritik Ürün Kuralları” (Ekibin aynı anlaması gerekenler)

Bu kurallar dokümanda birçok EPIC/US içinde tekrar eden, deneyimi tanımlayan “omurga” kararlarıdır:

- **Erişim & paywall**: Abonelik aktif değilse core içeriğe erişimde plan seçimi/paywall akışı tetiklenir (rol: Plan Sahibi/Üye davranış farkı dahil).
- **Kilitli ilerleme**: Yolculuk/modül akışı “önkoşul tamamlanmadan sonraki adım açılmaz” mantığı ile çalışır; kullanıcıya kilit nedeni şeffaf gösterilir.
- **Zaman kuralları**:
  - **Yeni gün**: İçerik “08:00’de açılır” kuralı görünür şekilde anlatılır.
  - **Teslim**: Günlük yorum/teslim için “23:59’a kadar” kuralı ana akış ve ilgili ekranlarda net görünür.
- **Seat/rol yönetimi**: Aile/Grup planında plan sahibi ile üye yetkileri ayrışır (üyelerde yönetim ekranları gizlenir).
- **Erişilebilirlik**: Faz-1’de erişilebilirlik temelleri (metin boyutu, ekran okuyucu uyumu vb.) “sonradan ek” değil; kabul kriterlerine gömülü.

---

## 6) MVP’de “Bitmiş” saymak için kontrol listesi (önerilen)

Bu liste; Faz-1 EPIC’lerini “uçtan uca çalışıyor” seviyesinde doğrulamak için pratik bir çerçevedir:

- Onboarding/Login akışları tamam; oturum güvenliği + abonelik/rol senkronu tutarlı.
- Abonelik/paywall entegre; erişim kısıtı açıklaması net; “ödedim ama açılmadı” tipi riskler için geri yükleme/entitlement mantığı net.
- Keşfet → Yolculuk detayı → başlat → Yolculuklarım → gün/modül → okuma + yorum/teslim akışı uçtan uca çalışıyor.
- Kilitli ilerleme davranışı (önkoşul/08:00/23:59) tüm ekranlarda tutarlı; kullanıcıya sürpriz yok.
- Hatırlatıcılar + alışkanlık zinciri temel işlevleri çalışıyor; bildirim izinleri doğru yönetiliyor.
- Favoriler/Arşiv ve Erişilebilirlik temel beklentileri karşılıyor.

---

## 7) Açık Noktalar (toplantıda netleştirilecek)

Bu doküman içinde “ürün kararına göre” olarak işaretlenen veya kuralı netleştirilmesi gereken başlıklar:

- 23:59 sonrası gönderim davranışı: “gecikme kabul / ertesi gün kilit / telafi” politikası netleştirme
- Koçluk add-on’ında kilit: “koç onayı olmadan devam” opsiyonu var mı?
- Topluluk tab’ının Faz-1’de görünürlüğü: gizli/disabled mı, yoksa erişime göre mi gösterilecek?

---

## 8) Ekiple Paylaşım Önerisi (pratik)

- Paylaşılacak dosyalar:
  - `Model1/UserStoriesRev3.md` (tek kaynak)
  - `Model1/UserStoriesRev3_Summary.md` (bu özet)
- Toplantı formatı (öneri): 45 dk okuma + 30 dk soru/karar (Açık Noktalar üzerinden), ardından kararları dokümana işleme.

