# PST Mobile — Site Map + Tüm Kritik Akışlar + Screen Inventory (Production Ready)

Bu doküman yalnızca `Model1/UserStoriesRev3.md` ve `Model1/UserStoriesRev3_Summary.md` baz alınarak güncellenmiştir.

---

## 2) Site Map (Tüm Fazlar)

### Onboarding / Hesap
- Splash / Oturum kontrolü
- Dil Seçimi
- Kayıt Ol
  - OTP Doğrulama
- Giriş Yap
- Şifremi Unuttum
  - Yeni Şifre Belirle

### Ana Sayfa (Home)
- Ana Akış (Bugün kartı + tek CTA + rozetler + 08:00/23:59 kuralları)
- Başlangıç Rehberi (“nasıl yapılır”)
- Gelişim
  - Gelişim Paneli / Duygusal Harita / Haftalık Özet / Rapor
- Dünyam (Faz-2)
  - Dünya Ana / Görev-Hedef / Ödül-İnşa / Envanter / Tema / Kurallar

### Keşfet
- Yolculuklar
  - Katalog (liste + arama/filtre/sıralama)
  - Yolculuk Detayı
  - Yolculuğu Başlat (hedef + kurallar + hatırlatıcı)
- Atölyeler
  - Atölye Kataloğu (liste + arama/filtre)
  - Atölye Detayı (okuma + uygulama adımları)
  - Atölye Oturumu (app içi okuma + uygulama)
- e‑Kitaplar
  - Kitap Kütüphanesi (liste + kategori + arama)
  - Kitap Detayı (özet + bölüm listesi + kaldığın yer + indir)
  - Kitap Okuyucu (TOC + arama + not/vurgu + kaldığın yer)
- Favoriler
  - Favoriler / Favori Detayı / Koleksiyonlar / Paylaş-Export
- Videolar (Faz-2)
  - Kütüphane / Video Detayı / Oynatıcı / İndirmeler / Koleksiyonlar / Sonradan İzle
- Oyunlar (Faz-2)
  - Oyunlar Ana / Oyun Detayı / Oyun Oturumu / Sonuç-Ödül / Çocuk Profili / Veli Paneli
- AI (Add-on) (Faz-2)
  - AI Sohbet / Günlük Derleme (katalogdan) / Planlama (otomatik seçim) / AI Analiz / Gizlilik & Kontrol
- Asistan (Faz-2)
  - Başlat / Anket / Duygu Kontrolü / Öneriler-Karşılaştırma / Plan Oluştur / Plan Güncelle

### Yolculuklarım
- Yolculuklarım (Aktif/Pasif liste)
- Yolculuk Detayı
  - Gün/Modül (okuma + not/vurgu + yorum + teslim + AI geri bildirim)
  - Modüller (önkoşul + kilit + görev + sertifika)

### Topluluk (Faz-2)
- Birlikte Okuma
  - Grup Listesi / Oluştur / Katıl / Davet / Okuma Planı / İlerleme / Sohbet / Üyeler & Kurallar
- Kitap Kulübü
  - Kulüp Listesi/Keşfet / Kulüp Detayı / Okuyucu / Notlar-Alıntılar / Tartışma / Moderasyon

### Profil
- Hesap & Güvenlik/Oturum
- Abonelik
  - Plan Seçimi & Karşılaştırma
  - Satın Alma / Erişim Aktivasyonu
  - Add-on Yönetimi
  - Kişi (Seat) Yönetimi (Aile/Grup)
  - Ödeme Geçmişi / Makbuzlar / Satın alımları geri yükle
  - İptal
  - Öğrenci İndirimi (Faz-1): uygunluk → doğrulama → durum/itiraz → indirimli checkout → yenileme
- Ayarlar
  - Hatırlatıcılar & Bildirimler (izin, merkez, DND, akıllı öneri, seri kurtarma)
  - Erişilebilirlik (Faz-1/2): merkez, metin, kontrast/tema, altyazı/transkript, screen reader/braille, audit/test
- Koç Paneli (Faz-2)
- Koçluk (Mentor) (Faz-2)

---

## 2.1) Tüm User Flow’lar (Faz-1 + Faz-2)

### Onboarding & Hesap (Faz-1)

#### 1) İlk açılış: oturum kontrolü + dil seçimi
- Adımlar: Splash/Oturum kontrolü → Onboarding -> Dil Seçimi → (gerekirse) Onboarding -> Giriş/Kayıt → Ana Sayfa
- Kurallar: dil tercihi kalıcı; offline durumda da korunur; ilk açılışta rol/plan senkronu çalışır.
- US: EPIC 1 (US-1.1, US-1.6, US-1.7)

#### 2) Kayıt olma (OTP doğrulama)
- Adımlar: Onboarding -> Kayıt Ol → OTP Doğrulama → Ana Sayfa
- Kurallar: format doğrulama, retry/cooldown, mevcut hesap yönlendirmesi.
- US: EPIC 1 (US-1.2)

#### 3) Giriş yapma + erişim/rol senkronu
- Adımlar: Onboarding -> Giriş Yap → Ana Sayfa → (arka planda) plan/rol/seat senkronu
- Kurallar: başarısız deneme limiti; abonelik/rol bilgisi yüklenmeden korumalı alanlara geçiş yok.
- US: EPIC 1 (US-1.3, US-1.7)

#### 4) Şifre sıfırlama
- Adımlar: Onboarding -> Şifremi Unuttum → doğrulama → Yeni Şifre → Onboarding -> Giriş Yap
- Kurallar: rate-limit, şifre politikası, güvenli hata mesajları.
- US: EPIC 1 (US-1.4)

#### 5) Oturum süresi doldu (session expiry) → yeniden giriş → geri dönüş
- Adımlar: (Korumalı ekrana giriş) → “Oturum doldu” → Onboarding -> Giriş Yap → geri dönüş
- Kurallar: token temizliği; kullanıcı bağlamı kaybolmadan geri dönüş.
- US: EPIC 1 (US-1.6)

#### 6) Dil değiştirme (ayarlar) → uygulama genelinde anında uygula
- Adımlar: Profil -> Ayarlar -> Dil → dil seç → uygulama metinleri güncellenir
- Kurallar: offline’da da seçim saklanır; çevrimiçi olunca profil ile senkronlanır.
- US: EPIC 1 (US-1.1)

#### 7) Çıkış yapma (onay + token temizliği)
- Adımlar: Profil -> Hesap -> Çıkış Yap → (onay) → Onboarding -> Giriş Yap
- Kurallar: cihazda token/oturum temizliği; sonraki açılışta yeniden giriş gerekir.
- US: EPIC 1 (US-1.5)

### Abonelik & Erişim (Faz-1)

#### 8) Paywall → plan seçimi → satın alma → erişim aktivasyonu
- Adımlar: (Gated CTA) → Profil -> Abonelik -> Plan Seçimi → Satın Alma → Erişim açıldı → geri dönüş (Ana Sayfa/Keşfet)
- Kurallar: “neden kilitli” açıklaması; entitlement cache + server doğrulama; gecikmede “doğrulanıyor” durumu.
- US: EPIC 3 (US-3.1–US-3.2) + EPIC 1 (US-1.7)

#### 9) Planı yönetme (değiştir/yükselt/düşür) + kişi limiti etkileri
- Adımlar: Profil -> Abonelik -> Planı Yönet → plan değiştir → (limit uygunsa) onayla → erişimler güncellenir
- Kurallar: yeni limit mevcut kişi sayısından küçükse önce kişi azaltma zorunlu; değişikliklerin etkisi (hemen/dönem sonu) net.
- US: EPIC 3 (US-3.5)

#### 10) Abonelik iptali → iptal etkileri → geri dönüş
- Adımlar: Profil -> Abonelik -> İptal → etkileri gör → (onayla / vazgeç) → plan durumu güncellenir
- Kurallar: “erişim dönem sonuna kadar” ve kişi/add-on etkileri şeffaf listelenir.
- US: EPIC 3 (US-3.8)

#### 11) Ödeme geçmişi / makbuzlar + “Satın alımları geri yükle”
- Adımlar: Profil -> Abonelik -> Ödemeler → geçmişi gör → Satın Alımları Geri Yükle → erişimler güncellenir
- Kurallar: “ödedim ama açılmadı” senaryosu için tek aksiyon; hata durumunda tekrar dene.
- US: EPIC 3 (US-3.7)

#### 12) Add-on satın alma / yönetim (AI, Koçluk vb.)
- Adımlar: Profil -> Abonelik → Add-on’lar → (satın al/pasife al) → Ana Sayfa rozetleri ve kilitler güncellenir
- Kurallar: Plan Sahibi vs Üye yetki ayrımı; add-on gerektiren ekranda kilit açıklaması + tek CTA.
- US: EPIC 3 (US-3.3) + EPIC 2 (US-2.2)

#### 13) Aile/Grup kişi (seat) yönetimi: davet / kaldır / bekleyenler
- Adımlar: Profil -> Abonelik → Kişi Yönetimi → Davet Et / Kaldır / Bekleyen Davetler
- Kurallar: Plan Sahibi vs Üye yetki ayrımı; limit aşımında (uygunsa) “Ek kişi” add-on önerisi.
- US: EPIC 3 (US-3.6) + EPIC 1 (US-1.7)

#### 14) Öğrenci indirimi: uygunluk → doğrulama → durum/itiraz → indirimli checkout → yenileme
- Adımlar: Profil -> Abonelik -> Öğrenci İndirimi → Uygunluk → Doğrulama → Durum (Onay/Red/Beklemede) → İndirimli ödeme özeti → Satın Alma → (yenileme hatırlatmaları)
- Kurallar: yalnızca Bireysel; yeniden doğrulama hatırlatmaları; gizlilik/veri yönetimi (geçmişi gör/sil).
- US: EPIC 21 (US-21.1–US-21.7) + EPIC 3 (US-3.4)

### İçerik Keşfi & Başlatma (Faz-1)

#### 15) Yolculuk keşfi → detay → başlat (hedef + zaman kuralları)
- Adımlar: Keşfet -> Yolculuklar → Katalog → Yolculuk Detayı → Yolculuğu Başlat → hedef seçimi → Yolculuklarım
- Kurallar: plan erişimi yoksa paywall; “08:00 yeni gün / 23:59 teslim” kuralı başlatmada net görünür; hatırlatıcı kurulumuna gidiş-dönüş bağlamı korunur.
- US: EPIC 4 (US-4.1–US-4.6) + EPIC 2 (US-2.6)

#### 16) Atölye keşfi → detay → oturum (app içi okuma + uygulama)
- Adımlar: Keşfet -> Atölyeler → Atölye Kataloğu → Atölye Detayı → Atölye Oturumu → Tamamla
- Kurallar: harici doküman yok; uygulama adımlarında taslak autosave (offline dahil); erişim yoksa paywall ve geri dönüşte bağlam korunur.
- US: EPIC 4 (US-4.7–US-4.8) + EPIC 5 (US-5.9) + EPIC 3 (US-3.1–US-3.2)

#### 17) e‑Kitap keşfi → kitap detayı → okuyucu (kaldığın yer + not/vurgu + offline)
- Adımlar: Keşfet -> e‑Kitaplar → Kitap Kütüphanesi → Kitap Detayı → Okuyucu → (Not/Vurgu → Favoriler)
- Kurallar: okuma tamamen app içinde; TOC/arama/kaldığın yer; offline için indir/önbellek; not/vurgu Favoriler’de bulunur.
- US: EPIC 4 (US-4.9–US-4.10) + EPIC 5 (US-5.8) + EPIC 8 (US-8.1–US-8.2)

### Günlük İlerleme & Teslim (Faz-1)

#### 18) Günlük döngü: Home “Devam Et” → okuma → not/vurgu → yorum taslağı
- Adımlar: Ana Sayfa (“Devam Et”) → Yolculuklarım -> Gün/Modül → okuma/sesli okuma → vurgu/not → yorum yazma (taslak)
- Kurallar: offline cache; erişilebilir okuma; taslak kaydı; kelime sayacı + deadline görünürlüğü.
- US: EPIC 2 (US-2.1–US-2.4) + EPIC 5 (US-5.1–US-5.4)

#### 19) Teslim: önizleme → gönderim (23:59) → sonuç
- Adımlar: Yolculuklarım -> Gün/Modül → Önizleme → Teslim Et → (başarılı/başarısız) geri bildirim
- Kurallar: 23:59 kuralı; gecikme davranışı şeffaf; tekrar dene/hata yönetimi; teslim sonrası “tamamlandı” durumu.
- US: EPIC 5 (US-5.5)

#### 20) Yeni gün kapısı: 08:00 kuralı + kilitli içerik mesajı
- Adımlar: (Bugün teslim edildi) → (yarın içeriğine giriş) → “08:00’de açılacak” → 08:00 sonrası otomatik yenile/yenile CTA
- Kurallar: saat dilimi uyumu; cihaz-sunucu saati çakışmasında sunucu saati baz.
- US: EPIC 2 (US-2.6) + EPIC 5 (US-5.6)

#### 21) Teslim sonrası AI geri bildirim (Add-on kapısı)
- Adımlar: (Teslim sonrası) → “AI Geri Bildirim” kartı → (özet) → Detaylı analiz → (gerekirse) Add-on satın almaya yönlen
- Kurallar: AI Pack yoksa net paywall; uyarı metni (teşhis değildir); içerik yalnızca sistem verilerine dayanır.
- US: EPIC 5 (US-5.7) + EPIC 3 (US-3.3)

### Modül Sistemi (Faz-1)

#### 22) Modüller: liste → önkoşul → görev → gönder → kilit açıldı
- Adımlar: Yolculuklarım -> Modüller → (Devam/Kilitli) → Modül detayı (önkoşullar) → Görev ekranı → Gönder ve Tamamla → “Kilit açıldı”
- Kurallar: taslak autosave; deadline varsa şeffaf; eksik önkoşulda hızlı yönlendirme + hatırlatıcıya gidiş.
- US: EPIC 15 (US-15.1–US-15.5)

#### 22A) Koç değerlendirmesi ile kilit (Koçluk add-on)
- Adımlar: (Modül tamamlandı) → “Koç yorumu bekleniyor” → (koç onayı gelince) kilit açılır / (opsiyonel) koçsuz devam seçeneği
- Kurallar: add-on kapısı; kilit nedeni net; “Add-on’ı Yönet” ile ilgili ekrana yönlendirme.
- US: EPIC 15 (US-15.6)

#### 23) İlerleme özeti + kilit geçmişi + sertifika → paylaşım
- Adımlar: Yolculuklarım -> Modüller → İlerleme Özeti → Kilit Geçmişi → Sertifikayı Gör → Paylaş (önizleme ile)
- Kurallar: paylaşımda gizlilik onayı; sertifika yalnızca koşul sağlanınca aktif.
- US: EPIC 15 (US-15.7)

### Kişiselleştirme & Alışkanlık (Faz-1)

#### 24) Favoriler & arşiv: kaydet → koleksiyon → sil/geri al → kaynağa dön → paylaş/export
- Adımlar: (Okuyucu/Video vb.) Kaydet/Vurgu/Not → Keşfet -> Favoriler → Koleksiyonlar/Favori Detayı → Sil (Undo) → Kaynağa Git → Paylaş/PDF
- Kurallar: gizlilik önizlemesi; undo süresi; offline senkron.
- US: EPIC 8 (US-8.1–US-8.7) + EPIC 5 (US-5.3) + EPIC 18 (US-18.2)

#### 25) Bildirimler & hatırlatıcılar: izin → merkez → hatırlatıcılar → DND → seri takibi
- Adımlar: Profil -> Ayarlar -> Hatırlatıcılar → (izin akışı) → hatırlatıcı saatleri → bildirim merkezi (deep-link) → sessiz saatler/kanallar → zincir ekranı
- Kurallar: izin reddinde alternatif; bildirimden ilgili ekrana deep-link; 23:59 ve 08:00 kuralları hatırlatıcılarda net.
- US: EPIC 11 (US-11.1–US-11.7) + EPIC 2 (US-2.3–US-2.4)

#### 26) Gelişim & kapanış: panel → haftalık özet → rapor (PDF) → program bitiş değerlendirmesi/test
- Adımlar: Ana Sayfa -> Gelişim → panel/harita → Haftalık Özet → Rapor indir/paylaş → (program sonunda) değerlendirme/test → kapanış
- Kurallar: “teşhis değildir” uyarıları; paylaşımda gizlilik onayı; veri yetersizliğinde açıklayıcı empty-state.
- US: EPIC 6 (US-6.1–US-6.7)

#### 27) Erişilebilirlik: ayar değiştir → okuyucu/video/oyun genelinde uygula
- Adımlar: Profil -> Ayarlar -> Erişilebilirlik → metin/kontrast/altyazı/transkript → (Okuyucu/Video/Oyun) ekranlarında etkisini gör
- Kurallar: ayarlar anında uygulanır; offline saklama; screen reader etiket standardı + braille uyumu.
- US: EPIC 9 (US-9.1–US-9.7) + EPIC 16 (US-16.1–US-16.7)

### Asistan, AI ve Faz-2 Alanları (Faz-2)

#### 28) Asistan: hedef belirleme → duygu check-in → öneri/karşılaştırma → plan oluştur/güncelle
- Adımlar: Keşfet -> Asistan → Başlat → Anket → Duygu Kontrolü → Öneriler → Plan Oluştur → (gerektikçe) Plan Güncelle
- Kurallar: plan/hatırlatıcı ile entegre; AI gerekçesi varsa şeffaf; öneriler sistem içeriğine dayanır.
- US: EPIC 20 (US-20.1–US-20.7) + EPIC 2 (US-2.1)

#### 29) AI (Add-on): sohbet → günlük derleme (katalogdan) → planlama → analiz → gizlilik & kontrol
- Adımlar: Keşfet -> AI → AI Sohbet / Günlük Derleme / Planlama / AI Analiz / Gizlilik
- Kurallar: add-on kapısı; AI yalnızca sistem içeriğine dayanır ve kaynak gösterir; içerik yetersizliğinde “bulunamadı” + alternatif; “indir/sil/devre dışı” kontrolleri.
- US: EPIC 10 (US-10.1–US-10.5)

#### 30) Videolar: keşfet → izle (altyazı/transkript/bölüm/hız) → indir/indirilenler → koleksiyonlar → geri bildirim
- Adımlar: Keşfet -> Videolar → Video Detayı → Oynatıcı → (Altyazı/Transkript) → Çevrimdışı indir → İndirmeler → Koleksiyonlar → Geri Bildirim
- Kurallar: erişim kilidi; Wi‑Fi indirme kuralı; depolama uyarıları; hata/geri bildirim hızlı.
- US: EPIC 18 (US-18.1–US-18.7) + EPIC 9 (US-9.4–US-9.5)

#### 31) Oyunlar: çocuk profili (veli onayı) → oyun oturumu → sonuç/ödül → seri → veli paneli (limit)
- Adımlar: Keşfet -> Oyunlar → Çocuk Profili → Oyun Detayı → Oyun Oturumu → Sonuç/Ödül → Seri/Rozet → Veli Paneli
- Kurallar: veli onayı/PIN; süre sınırı; gece modu.
- US: EPIC 17 (US-17.1–US-17.7)

#### 32) Topluluk: birlikte okuma grubu (oluştur/katıl/davet) → plan → ilerleme → sohbet → üye/kurallar → sonlandır
- Adımlar: Topluluk -> Birlikte Okuma → Grup Oluştur/Katıl → Davet → Okuma Planı → İlerleme → Sohbet → Üyeler & Kurallar → Grubu Sonlandır
- Kurallar: seat limiti + rol yönetimi; moderasyon/şikayet; gizlilik sınırı.
- US: EPIC 12 (US-12.1–US-12.7)

#### 33) Kitap Kulübü: kulüp keşfet/katıl → okuyucu → not/alinti → tartışma → kurallar & moderasyon → sonlandır
- Adımlar: Topluluk -> Kitap Kulübü → Kulüp Detayı → Okumaya Devam → Notlar/Alıntılar → Tartışma → Kurallar & Moderasyon → Kulübü Sonlandır
- Kurallar: güvenli sosyal alan; paylaşım gizliliği; moderasyon yetkileri şeffaf.
- US: EPIC 13 (US-13.1–US-13.7)

#### 34) Dünyam: görev → ödül → inşa/tema → envanter → kurallar
- Adımlar: Ana Sayfa -> Dünyam → Görev/Hedef → Ödül → İnşa Modu → Envanter → Tema → Kurallar
- Kurallar: adil ödül; anti-hile; add-on kapılı AI hedef önerisi.
- US: EPIC 14 (US-14.1–US-14.7)

#### 35) Koç Paneli (PST Koçu): danışan takibi → plan/teslim geçmişi → koç yorumu → uyarılar → erişim/onay
- Adımlar: Profil -> Koç Paneli → Danışan Listesi → Danışan Profili → Plan & İçerik → Teslim Geçmişi → Koç Yorumu → Uyarılar → Erişim/Onay
- Kurallar: danışan onayı + audit log + veri minimizasyonu; koç yorumlarında yargılayıcı olmayan dil standardı.
- US: EPIC 7 (US-7.1–US-7.7)

#### 36) Mentor/Koçluk (Add-on): danışan listesi → danışan detayı → mesaj/görev → rapor dışa aktar
- Adımlar: Profil -> Koçluk → Danışan Listesi → Danışan Detayı → Mesajlaşma/Görev → Rapor Dışa Aktar
- Kurallar: koçluk add-on erişimi; gizlilik izinleri; şeffaf AI uyarıları (varsa).
- US: EPIC 19 (US-19.1–US-19.7)

---

## 3) Screen Inventory (Tüm Fazlar — Production Ready)

### 3.0 Prod-ready standart (tüm ekranlarda)
- **Durumlar**: loading/skeleton, empty state, error + retry, (uygunsa) offline mesajı.
- **Erişilebilirlik**: dinamik yazı boyutu, ekran okuyucu etiketleri/odak sırası, kontrast, azaltılmış hareket.
- **Güvenlik & yetki**: rol/plan/seat kontrolü + net “neden kilitli” açıklaması.
- **Süreklilik**: form taslağı (yorum/koç yorumu vb.), geri dönüşte bağlamı koruma.

### 3.1 Onboarding & Oturum

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Splash / Oturum kontrolü | Faz-1 | Uygulama açılışı | EPIC 1: US-1.6–1.7 |
| Dil Seçimi | Faz-1 | Onboarding | EPIC 1: US-1.1 |
| Kayıt Ol | Faz-1 | Onboarding | EPIC 1: US-1.2 |
| OTP Doğrulama | Faz-1 | Kayıt Ol akışı | EPIC 1: US-1.2 |
| Giriş Yap | Faz-1 | Onboarding | EPIC 1: US-1.3 |
| Şifremi Unuttum | Faz-1 | Onboarding | EPIC 1: US-1.4 |
| Yeni Şifre Belirle | Faz-1 | Şifre sıfırlama akışı | EPIC 1: US-1.4 |
| “Oturum doldu” / yeniden giriş geçidi | Faz-1 | Korumalı ekran → redirect | EPIC 1: US-1.6 |
| Çıkış Yap (onay + token temizliği) | Faz-1 | Profil -> Hesap | EPIC 1: US-1.5 |

### 3.2 Ana Sayfa & Gelişim & Dünyam

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Ana Akış (Home) | Faz-1 | Tab: Ana Sayfa | EPIC 2: US-2.1–2.8 |
| Başlangıç Rehberi (nasıl yapılır) | Faz-1 | Ana Akış kartı | EPIC 2: US-2.5 |
| Gelişim Paneli | Faz-1 | Ana Sayfa -> Gelişim | EPIC 6: US-6.1 |
| Duygusal Harita | Faz-1 | Ana Sayfa -> Gelişim | EPIC 6: US-6.2 |
| Güçlü/Gelişim Alanları | Faz-1 | Ana Sayfa -> Gelişim | EPIC 6: US-6.3 |
| Haftalık Özet | Faz-1 | Ana Sayfa -> Gelişim | EPIC 6: US-6.4 |
| Program Bitiş Değerlendirmesi | Faz-1 | Ana Sayfa -> Gelişim | EPIC 6: US-6.5 |
| Bitiş Testi Sonucu | Faz-1 | Ana Sayfa -> Gelişim | EPIC 6: US-6.6 |
| Gelişim Raporu (PDF indir/paylaş) | Faz-1 | Ana Sayfa -> Gelişim | EPIC 6: US-6.7 |
| Dünyam ana ekranı | Faz-2 | Ana Sayfa -> Dünyam | EPIC 14: US-14.1 |
| Görev/Hedef seçimi | Faz-2 | Dünyam | EPIC 14: US-14.2 |
| Ödül & “İnşa et” akışı | Faz-2 | Dünyam | EPIC 14: US-14.3 |
| Dünya tema/kişiselleştirme | Faz-2 | Dünyam | EPIC 14: US-14.4 |
| Envanter & koleksiyonlar | Faz-2 | Dünyam | EPIC 14: US-14.5 |
| AI hedef önerisi (add-on kapısı) | Faz-2 | Dünyam | EPIC 14: US-14.6 |
| Dünya kuralları & şeffaflık | Faz-2 | Dünyam | EPIC 14: US-14.7 |

### 3.3 Keşfet: Yolculuklar & Asistan

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Yolculuk kataloğu (liste/arama/filtre) | Faz-1 | Keşfet -> Yolculuklar | EPIC 4: US-4.1, US-4.4 |
| Yolculuk detayı | Faz-1 | Keşfet -> Yolculuklar | EPIC 4: US-4.5 |
| Yolculuğu başlat (hedef + kural özeti) | Faz-1 | Yolculuk detayı CTA | EPIC 4: US-4.6 |
| Asistan başlangıç (sekme) | Faz-2 | Keşfet -> Asistan | EPIC 20: US-20.1 |
| Hedef/Niyet anketi | Faz-2 | Asistan | EPIC 20: US-20.2 |
| Duygu kontrolü | Faz-2 | Asistan | EPIC 20: US-20.3 |
| Öneriler & karşılaştırma | Faz-2 | Asistan | EPIC 20: US-20.4 |
| Plan oluşturma (hedef + hatırlatıcı) | Faz-2 | Asistan | EPIC 20: US-20.5 |
| AI gerekçe (AI Paket) | Faz-2 | Asistan | EPIC 20: US-20.6 |
| Plan güncelle / yeniden öneri | Faz-2 | Asistan | EPIC 20: US-20.7 |

#### 3.3A Keşfet: Atölyeler (app içi okuma + uygulama)

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Atölye kataloğu (liste/arama/filtre) | Faz-1 | Keşfet -> Atölyeler | EPIC 4: US-4.7 |
| Atölye detayı (yapı + kazanım + CTA) | Faz-1 | Keşfet -> Atölyeler | EPIC 4: US-4.8 |
| Atölye oturumu (okuma + uygulama adımları) | Faz-1 | Atölye detayı CTA | EPIC 5: US-5.9 |

#### 3.3B Keşfet: e‑Kitaplar (tamamen app içi okuyucu)

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Kitap kütüphanesi (liste/kategori/arama) | Faz-1 | Keşfet -> e‑Kitaplar | EPIC 4: US-4.9 |
| Kitap detayı (özet + TOC + kaldığın yer + indir) | Faz-1 | Keşfet -> e‑Kitaplar | EPIC 4: US-4.10 |
| e‑Kitap okuyucu (TOC + arama + not/vurgu + offline) | Faz-1 | Kitap detayı CTA | EPIC 5: US-5.8; EPIC 8: US-8.1–8.2 |

### 3.4 Yolculuklarım: Gün/Modül & Modüller (kilitli ilerleme)

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Yolculuklarım (aktif/pasif liste) | Faz-1 | Tab: Yolculuklarım | EPIC 2: US-2.7 |
| Gün/Modül okuyucu (metin) | Faz-1 | Yolculuklarım -> Gün/Modül | EPIC 5: US-5.1 |
| Sesli okuma + senkron | Faz-1 | Gün/Modül içinden | EPIC 5: US-5.2 |
| Vurgu/Not/Favori aksiyonları | Faz-1 | Gün/Modül içinden | EPIC 5: US-5.3; EPIC 8: US-8.1–8.2 |
| Yorum yazma (taslak + sorular) | Faz-1 | Gün/Modül içinden | EPIC 5: US-5.4 |
| Önizleme & teslim (23:59 kuralı) | Faz-1 | Gün/Modül içinden | EPIC 5: US-5.5 |
| Kilitli ilerleme (08:00 kapısı dahil) | Faz-1 | Gün/Modül içinden | EPIC 5: US-5.6; EPIC 2: US-2.6 |
| AI geri bildirim (add-on) | Faz-1 | Gün/Modül içinden | EPIC 5: US-5.7 |
| Modüller listesi (kilitli ilerleme) | Faz-1 | Yolculuklarım -> Modüller | EPIC 15: US-15.1 |
| Modül önkoşulları (checklist) | Faz-1 | Modül detayı | EPIC 15: US-15.2 |
| Görev tamamlama + gönderim (taslak) | Faz-1 | Modül detayı | EPIC 15: US-15.3 |
| Kilit açıldı / sonraki adım | Faz-1 | Modül detayı | EPIC 15: US-15.4 |
| Kilitli aşama (eksik görev) | Faz-1 | Modül detayı | EPIC 15: US-15.5 |
| Koç değerlendirmesi ile kilit (add-on) | Faz-1 | Modül detayı | EPIC 15: US-15.6 |
| İlerleme özeti + kilit geçmişi + sertifika | Faz-1 | Modül detayı | EPIC 15: US-15.7 |

### 3.5 Profil: Abonelik, Add-on, Seat, Öğrenci İndirimi

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Abonelik & erişim (entitlements) | Faz-1 | Profil -> Abonelik | EPIC 3: US-3.2–3.8 |
| Plan seçimi & karşılaştırma | Faz-1 | Profil -> Abonelik -> Plan Seçimi | EPIC 3: US-3.1 |
| Satın alma (abonelik başlatma) | Faz-1 | Plan seçimi → checkout | EPIC 3: US-3.2 |
| Add-on yönetimi | Faz-1 | Profil -> Abonelik | EPIC 3: US-3.3 |
| Plan yönetimi (değiştir/iptal) | Faz-1 | Profil -> Abonelik | EPIC 3: US-3.5, US-3.8 |
| Kişi (seat) yönetimi (davet/kaldır/bekleyen) | Faz-1 | Profil -> Abonelik | EPIC 3: US-3.6 |
| Ödeme geçmişi & makbuzlar | Faz-1 | Profil -> Abonelik | EPIC 3: US-3.7 |
| Satın alımları geri yükle (restore) | Faz-1 | Profil -> Abonelik | EPIC 3: US-3.7 |
| Öğrenci indirimi ana akışı | Faz-1 | Profil -> Abonelik -> Öğrenci İndirimi | EPIC 21: US-21.1–21.7 |

### 3.6 Favoriler & Arşiv

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Favoriler ana ekranı | Faz-1 | Keşfet -> Favoriler | EPIC 8: US-8.1 |
| Favori detayı (kaynağa dön) | Faz-1 | Favoriler | EPIC 8: US-8.2 |
| Koleksiyonlar (liste + yönetim) | Faz-1 | Favoriler | EPIC 8: US-8.3 |
| Ara & filtrele | Faz-1 | Favoriler | EPIC 8: US-8.4 |
| Paylaşım / dışa aktarım (gizlilik kontrollü) | Faz-1 | Favoriler | EPIC 8: US-8.5 |
| Çevrimdışı erişim & senkron | Faz-1 | Favoriler | EPIC 8: US-8.6 |
| Silme & geri al (undo) | Faz-1 | Favoriler | EPIC 8: US-8.7 |

### 3.7 Hatırlatıcılar & Bildirimler

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Bildirim izin akışı (ön ekran) | Faz-1 | Profil -> Ayarlar -> Hatırlatıcılar | EPIC 11: US-11.1 |
| Bildirim merkezi (uygulama içi gelen kutusu) | Faz-1 | Profil -> Ayarlar -> Hatırlatıcılar | EPIC 11: US-11.2 |
| Hatırlatıcı ayarları (okuma/yorum/oyun) | Faz-1 | Profil -> Ayarlar -> Hatırlatıcılar | EPIC 11: US-11.3 |
| Alışkanlık zinciri takibi | Faz-1 | Profil -> Ayarlar -> Hatırlatıcılar | EPIC 11: US-11.4 |
| Sessiz saatler & kanallar (DND) | Faz-1 | Profil -> Ayarlar -> Hatırlatıcılar | EPIC 11: US-11.5 |
| Akıllı öneriler | Faz-1 | Profil -> Ayarlar -> Hatırlatıcılar | EPIC 11: US-11.6 |
| Seri kurtarma | Faz-1 | Profil -> Ayarlar -> Hatırlatıcılar | EPIC 11: US-11.7 |

### 3.8 Erişilebilirlik (Ayarlar)

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Erişilebilirlik merkezi (tek ekran) | Faz-1 | Profil -> Ayarlar -> Erişilebilirlik | EPIC 9: US-9.1 |
| Metin boyutu (önizlemeli) | Faz-1 | Erişilebilirlik | EPIC 9: US-9.2 |
| Yüksek kontrast & tema | Faz-1 | Erişilebilirlik | EPIC 9: US-9.3 |
| Video altyazı ayarları | Faz-1 | Erişilebilirlik | EPIC 9: US-9.4; EPIC 16: US-16.5 |
| Video transkript | Faz-1 | Erişilebilirlik / Video | EPIC 9: US-9.5 |
| Screen reader & Braille uyumu | Faz-1 | Erişilebilirlik | EPIC 9: US-9.6; EPIC 16: US-16.3–16.4 |
| Erişilebilirlik denetimi (audit/rapor) | Faz-1 | Erişilebilirlik | EPIC 9: US-9.7 |
| Erişilebilirlik testi & öneriler | Faz-2 | Erişilebilirlik | EPIC 16: US-16.7 |

### 3.9 Keşfet: Videolar

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Video kütüphanesi | Faz-2 | Keşfet -> Videolar | EPIC 18: US-18.1 |
| Video detayı | Faz-2 | Videolar | EPIC 18: US-18.2 |
| Video oynatıcı | Faz-2 | Video detayı | EPIC 18: US-18.3 |
| İndirmeler (çevrimdışı) | Faz-2 | Videolar | EPIC 18: US-18.4 |
| Koleksiyonlar | Faz-2 | Videolar | EPIC 18: US-18.5 |
| Sonradan İzle / Favoriler | Faz-2 | Videolar | EPIC 18: US-18.6 |
| İçerik geri bildirimi / hata bildir | Faz-2 | Videolar | EPIC 18: US-18.7 |

### 3.10 Keşfet: Oyunlar

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Oyunlar ana ekranı & kategoriler | Faz-2 | Keşfet -> Oyunlar | EPIC 17: US-17.1 |
| Çocuk profili oluşturma (veli onayı) | Faz-2 | Oyunlar | EPIC 17: US-17.2 |
| Oyun detayı | Faz-2 | Oyunlar | EPIC 17: US-17.3 |
| Oyun oturumu (quiz) | Faz-2 | Oyun başlat | EPIC 17: US-17.4 |
| Seri/Rozet/Ödül ekranları | Faz-2 | Oyunlar | EPIC 17: US-17.5 |
| Veli paneli | Faz-2 | Oyunlar | EPIC 17: US-17.6 |
| Süre sınırı & gece modu | Faz-2 | Oyunlar | EPIC 17: US-17.7 |

### 3.11 Keşfet: AI (Add-on)

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| AI Sohbet | Faz-2 | Keşfet -> AI | EPIC 10: US-10.1 |
| Günlük derleme (katalogdan) | Faz-2 | Keşfet -> AI | EPIC 10: US-10.2 |
| Otomatik planlama | Faz-2 | Keşfet -> AI | EPIC 10: US-10.3 |
| AI Analiz & Özet | Faz-2 | Keşfet -> AI | EPIC 10: US-10.4 |
| Gizlilik & kontrol | Faz-2 | Keşfet -> AI | EPIC 10: US-10.5 |

### 3.12 Topluluk (Birlikte Okuma + Kitap Kulübü)

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Birlikte okuma ana ekranı (gruplar) | Faz-2 | Topluluk | EPIC 12: US-12.1 |
| Grup oluşturma | Faz-2 | Topluluk | EPIC 12: US-12.2 |
| Davet et / katıl (kod/link) | Faz-2 | Topluluk | EPIC 12: US-12.3 |
| Okuma planı & kurallar | Faz-2 | Grup detayı | EPIC 12: US-12.4 |
| Ortak ilerleme (harita/tablo) | Faz-2 | Grup detayı | EPIC 12: US-12.5 |
| Grup sohbeti | Faz-2 | Grup detayı | EPIC 12: US-12.6 |
| Üyeler & kurallar (roller/limit) | Faz-2 | Grup detayı | EPIC 12: US-12.7 |
| Kitap kulübü ana ekranı | Faz-2 | Topluluk -> Kitap Kulübü | EPIC 13: US-13.1–13.2 |
| Kulüp detayı (hedef + tartışma) | Faz-2 | Kitap Kulübü | EPIC 13: US-13.3 |
| Okuyucu (kulüp) | Faz-2 | Kitap Kulübü | EPIC 13: US-13.4 |
| Notlar & alıntılar | Faz-2 | Kitap Kulübü | EPIC 13: US-13.5 |
| Tartışma | Faz-2 | Kitap Kulübü | EPIC 13: US-13.6 |
| Kurallar & moderasyon | Faz-2 | Kitap Kulübü | EPIC 13: US-13.7 |

### 3.13 Koç ekranları

| Screen | Faz | Birincil erişim | US |
| --- | --- | --- | --- |
| Koç Paneli: danışan listesi | Faz-2 | Profil -> Koç Paneli | EPIC 7: US-7.1 |
| Danışan profili | Faz-2 | Koç Paneli | EPIC 7: US-7.2 |
| Plan & içerik takibi | Faz-2 | Koç Paneli | EPIC 7: US-7.3 |
| Teslim geçmişi | Faz-2 | Koç Paneli | EPIC 7: US-7.4 |
| Koç yorumu yaz/gönder | Faz-2 | Koç Paneli | EPIC 7: US-7.5 |
| Uyarılar (risk/teslim yok) | Faz-2 | Koç Paneli | EPIC 7: US-7.6 |
| Erişim & onay yönetimi | Faz-2 | Koç Paneli | EPIC 7: US-7.7 |
| Mentor/Koçluk: danışan listesi & durum | Faz-2 | Profil -> Koçluk | EPIC 19: US-19.1 |
| Mentor/Koçluk: danışan detayı | Faz-2 | Profil -> Koçluk | EPIC 19: US-19.2–19.7 |
