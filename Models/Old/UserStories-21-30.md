EPIC 21 — Yolculuk Belirleme Asistanı

Danışanın uygulamaya girdiğinde “nereden başlayacağını” hızlıca belirleyebilmesi için; isteğe bağlı mini anket + tercih toplama + öneri üretme + karşılaştırma + yolculuğu başlatma akışını sağlayan asistan deneyimi.

Dürüst not: Asistan “zorunlu onboarding” olursa terk oranını artırır. Bu yüzden atla her zaman görünür olmalı ve yanıtlar kaydedilmeden de öneri üretilebilmelidir.

⸻

US-21.1 — Asistan giriş ekranı (başlat / atla)

Rol: Danışan
Danışan olarak, yolculuk asistanının ne yaptığını hızlıca anlayıp başlatmak ya da atlayıp yolculukları kendim keşfetmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Uygulamaya giriş yaptım. Ne zaman “Yolculuk Asistanı” ekranı açılırsa, o zaman “2 dk sürer”, “isteğe bağlı”, “gizlilik” bilgileri net görünür.
	•	Önkoşul: Asistanı kullanmak istemiyorum. Ne zaman “Yolculukları Keşfet” dersem, o zaman doğrudan keşif ekranına giderim.
	•	Önkoşul: Başlamak istiyorum. Ne zaman “Başla” dersem, o zaman soru akışı başlar.

⸻

US-21.2 — Hedef soruları ve kısa not (isteğe bağlı)

Rol: Danışan
Danışan olarak, hedef alanımı seçmek ve istersem kısa bir beklenti notu bırakmak istiyorum; böylece öneriler bana daha uygun olsun.

Acceptance Criteria
	•	Önkoşul: Hedef ekranındayım. Ne zaman ekran açılırsa, o zaman hedef seçenekleri (kişisel gelişim/ilişkiler/kariyer/liderlik vb.) görünür.
	•	Önkoşul: Not girmek istiyorum. Ne zaman kısa not alanına yazarsam, o zaman metin otomatik taslak olarak korunur.
	•	Önkoşul: Devam edeceğim. Ne zaman “Devam” dersem, o zaman seçimler öneri hesabına dahil edilir.
	•	Önkoşul: Yanıt vermek istemiyorum. Ne zaman “Atla” dersem, o zaman boş yanıtlarla devam edilir ve kullanıcı cezalandırılmaz.

⸻

US-21.3 — Zaman ve format tercihleri (okuma/sesli)

Rol: Danışan
Danışan olarak, günlük ayırabileceğim süreyi ve format tercihini seçmek istiyorum; böylece önerilen yolculuk temposu benim ritmime uysun.

Acceptance Criteria
	•	Önkoşul: Tercihler ekranındayım. Ne zaman ekran açılırsa, o zaman süre seçenekleri (5–7 dk / 10–15 dk / 20+ dk) görünür.
	•	Önkoşul: Format seçiyorum. Ne zaman “Okuma + yazma” veya “Sesli” seçersem, o zaman öneriler buna göre filtrelenir/önceliklenir.
	•	Önkoşul: Hatırlatıcı önerisi var. Ne zaman ekran görünürse, o zaman örnek okuma/yorum hatırlatma saatleri önerilir (kullanıcı sonra değiştirebilir).
	•	Önkoşul: Önerileri görmek istiyorum. Ne zaman “Önerileri Gör” dersem, o zaman öneri ekranına geçerim.

⸻

US-21.4 — Önerilen yolculuklar (neden önerildi + hızlı detay)

Rol: Danışan
Danışan olarak, bana önerilen yolculukları “neden önerildi” bilgisiyle görmek ve detaylarına hızlıca bakmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Öneri ekranındayım. Ne zaman ekran açılırsa, o zaman en az 3 öneri kartı (etiketli: en uygun / hızlı / popüler vb.) görünür.
	•	Önkoşul: Detay görmek istiyorum. Ne zaman bir öneride “Detay” dersem, o zaman içerik özeti + süre + kilit kuralları + örnek gün akışı gösterilir.
	•	Önkoşul: AI yönlendirme opsiyonu var. Ne zaman kullanıcı AI Paket add-on’a sahip değilse, o zaman “AI Paket’i İncele” önerisi agresif olmayan bir kartla sunulur.

⸻

US-21.5 — Yolculuk karşılaştırma (şeffaf tablo)

Rol: Danışan
Danışan olarak, iki yolculuğu süre, format, kilit kuralları ve hedef açısından karşılaştırmak istiyorum; böylece doğru seçimi yapabileyim.

Acceptance Criteria
	•	Önkoşul: Karşılaştırma ekranındayım. Ne zaman ekran açılırsa, o zaman temel farklar tek tabloda gösterilir (süre/format/kilit sistemi/hedef).
	•	Önkoşul: Seçmek istiyorum. Ne zaman “X’i Seç” dersem, o zaman seçim akışına (onay) giderim.
	•	Önkoşul: Kullanıcı yanılmasın. Ne zaman kilit kuralları farklıysa, o zaman bu fark “Not” olarak net ifade edilir.

⸻

US-21.6 — Seçimi onayla ve yolculuğu başlat (plan uyumu)

Rol: Danışan
Danışan olarak, seçtiğim yolculuğu planımın uygunluğu ve temel kurallarıyla birlikte onaylayıp başlatmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Onay ekranındayım. Ne zaman ekran açılırsa, o zaman seçilen yolculuk + planım (örn. Bireysel Paket 1 kişi) + kural özeti görünür.
	•	Önkoşul: Hatırlatıcı ayarlamak istiyorum. Ne zaman “Hatırlatıcıları ayarla” dersem, o zaman hatırlatıcı seçimi ekranı açılır.
	•	Önkoşul: Başlatacağım. Ne zaman “Yolculuğu Başlat” dersem, o zaman yolculuk “Yolculuklarım”a eklenir ve ilk açık adıma yönlendirilirim.
	•	Önkoşul: Plan erişimi yetersizse. Ne zaman kullanıcı planı içerik için uygun değilse, o zaman yükseltme akışı gösterilir (kullanıcı isterse geri döner).

⸻

US-21.7 — AI Paket add-on bilgilendirme (opsiyonel)

Rol: Danışan
Danışan olarak, AI Paket add-on’ın ne sağladığını ve gizlilik çerçevesini net görmek istiyorum; böylece güvenle karar verebileyim.

Acceptance Criteria
	•	Önkoşul: AI Paket ekranındayım. Ne zaman ekran açılırsa, o zaman faydalar (hedef önerisi/içerik önerisi/nazik takip) anlaşılır maddelerle görünür.
	•	Önkoşul: Gizlilik önemli. Ne zaman kullanıcı gizlilik bölümünü incelerse, o zaman “veri kullanım amacı” ve “geçmişi temizleme” seçenekleri net belirtilir.
	•	Önkoşul: Satın almak istiyorum. Ne zaman “AI Paket’i Ekle” dersem, o zaman add-on satın alma/etkinleştirme akışına giderim.
	•	Önkoşul: Şimdi almak istemiyorum. Ne zaman “Şimdilik geç” dersem, o zaman kullanıcı yolculuk önerilerine geri döner ve baskı görmez.

⸻




EPIC 22 — Erişilebilirlik ve Alternatif Tüketim

Görme/işitme engeli olan, az gören, okuma güçlüğü yaşayan veya okumaya vakti olmayan danışanların; içerikleri erişilebilir şekilde tüketebilmesi için metin görünümü, ekran okuyucu, braille uyumu, altyazı ve sesli okuma deneyimlerini uçtan uca sağlamak.

Dürüst not: Bu EPIC “opsiyonel” görülürse ürün kalitesi düşer. Üretimde WCAG uyumu, odak sırası, etiketleme, kontrast, altyazı kalitesi ve sesli okuma sürekliliği şart.

⸻

US-22.1 — Erişilebilirlik merkezi (hızlı ayarlar)

Rol: Danışan
Danışan olarak, erişilebilirlik ayarlarını tek bir merkezden hızlıca açıp kapatmak istiyorum; böylece kendime uygun deneyimi kolayca kurabileyim.

Acceptance Criteria
	•	Önkoşul: Uygulamaya giriş yaptım. Ne zaman Profil > Erişilebilirlik ekranını açarsam, o zaman hızlı ayarlar (kontrast, büyük metin, sesli okuma, video altyazı) görünür.
	•	Önkoşul: Hızlı ayar değiştirdim. Ne zaman bir ayarı açıp kapatırsam, o zaman değişiklik anında uygulanır ve kalıcı olarak kaydedilir.
	•	Önkoşul: Detaya girmek istiyorum. Ne zaman “Metin & görünüm / Ekran okuyucu / Test” seçeneklerine dokunursam, o zaman ilgili detaya giderim.

⸻

US-22.2 — Metin büyütme, satır aralığı ve kontrast

Rol: Danışan
Danışan olarak, metni büyütmek, satır aralığını ayarlamak ve yüksek kontrast kullanmak istiyorum; böylece okumak benim için kolaylaşsın.

Acceptance Criteria
	•	Önkoşul: Metin & görünüm ekranındayım. Ne zaman ekran açılırsa, o zaman yazı boyutu ve satır aralığı ayarları bulunur.
	•	Önkoşul: Yazı boyutunu değiştirdim. Ne zaman kaydırıcıyı değiştirirsem, o zaman önizleme metni anlık güncellenir.
	•	Önkoşul: Yüksek kontrastı açtım. Ne zaman yüksek kontrast aktif olursa, o zaman metin/arka plan kontrastı artar ve okunabilirlik yükselir.
	•	Önkoşul: Kaydetmek istiyorum. Ne zaman “Kaydet” dersem, o zaman ayarlar kalıcı olur ve tüm ekranlarda uygulanır.

⸻

US-22.3 — Ekran okuyucu uyumu (VoiceOver/TalkBack)

Rol: Danışan
Danışan olarak, ekran okuyucu ile uygulamayı sorunsuz kullanmak istiyorum; böylece tüm içeriklere bağımsız erişebileyim.

Acceptance Criteria
	•	Önkoşul: Ekran okuyucu açık. Ne zaman uygulamada gezinirsem, o zaman odak sırası mantıklı ve tutarlı ilerler.
	•	Önkoşul: Bir buton/alan var. Ne zaman odak o öğeye gelirse, o zaman anlamlı erişilebilirlik etiketi ve rolü (buton/alan/seçim vb.) okunur.
	•	Önkoşul: Önemli aksiyon yaptım. Ne zaman “Gönder/Devam Et” gibi kritik işlem olursa, o zaman sonuç (başarılı/hata) ekran okuyucu ile duyurulur.

⸻

US-22.4 — Braille ekran desteği ve kısayollar

Rol: Danışan
Danışan olarak, braille ekran kullandığımda içerikleri braille üzerinden takip etmek ve kısayollarla gezmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Braille cihaz bağlı. Ne zaman uygulama braille cihazı algılarsa, o zaman bağlantı durumu ve temel kısayollar gösterilir.
	•	Önkoşul: Metin içeriğindeyim. Ne zaman kısayol kullanırsam, o zaman paragraf/öğe atlama gibi beklenen davranış gerçekleşir.
	•	Önkoşul: Dışa aktarmak istiyorum. Ne zaman “Braille çıktısı” seçeneği açıksa, o zaman uygun içerikler braille formatında dışa aktarılabilir.

⸻

US-22.5 — Video alt yazı ayarları (işitme engelliler için)

Rol: Danışan
Danışan olarak, video derslerde altyazı kullanmak ve altyazının boyut/dil ayarlarını yönetmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Alt yazı ayarları ekranındayım. Ne zaman “Alt yazıları otomatik aç” seçeneğini aktif edersem, o zaman tüm video derslerde altyazı varsayılan açık olur.
	•	Önkoşul: Boyutu değiştirdim. Ne zaman altyazı boyutu ayarlanırsa, o zaman önizleme anlık güncellenir.
	•	Önkoşul: Dil seçtim. Ne zaman TR/EN/ES altyazı dili seçersem, o zaman desteklenen videolarda altyazı dili buna göre kullanılır; desteklenmiyorsa kullanıcıya net bilgi verilir.
	•	Önkoşul: Kaydettim. Ne zaman “Kaydet” dersem, o zaman ayarlar kalıcı olur.

⸻

US-22.6 — Sesli okuma (okuma bilmeyen / vakti olmayan)

Rol: Danışan
Danışan olarak, metin içerikleri sesli okuyarak tüketmek istiyorum; böylece okumaya vakit bulamadığımda da programa devam edebileyim.

Acceptance Criteria
	•	Önkoşul: Sesli okuma açık. Ne zaman “Oynat” dersem, o zaman içerik sesli okunur ve ilerleme süresi gösterilir.
	•	Önkoşul: Kaldığım yer var. Ne zaman tekrar açarsam, o zaman sesli okuma kaldığım yerden devam eder.
	•	Önkoşul: Hız ayarı istiyorum. Ne zaman 0.9×/1.0×/1.2×/1.5× seçersem, o zaman okuma hızı anında değişir.
	•	Önkoşul: Çevrimdışı ihtiyacım var. Ne zaman “Çevrimdışı indir” açıksa, o zaman içerikler uygun koşullarda indirilir ve internet yokken oynatılabilir.

⸻

US-22.7 — Erişilebilirlik testi ve öneriler

Rol: Danışan
Danışan olarak, kısa bir erişilebilirlik testi ile ayarlarımın uygunluğunu görmek ve öneri almak istiyorum.

Acceptance Criteria
	•	Önkoşul: Test ekranındayım. Ne zaman test çalışırsa, o zaman kritik maddeler (yazı boyutu/kontrast/etiketler/altyazı/sesli okuma) “uygun/iyileştir” şeklinde gösterilir.
	•	Önkoşul: Eksik tespit edildi. Ne zaman bir madde “iyileştir” ise, o zaman kullanıcıya tek dokunuşla düzeltme önerisi sunulur.
	•	Önkoşul: Düzeltmek istiyorum. Ne zaman “Düzelt ve Kaydet” dersem, o zaman önerilen ayarlar uygulanır ve kalıcı kaydedilir.

⸻



EPIC 23 — Pekiştirici Oyunlar (Çocuk + Yetişkin)

Danışanların (çocuk/genç/yetişkin) İslami bilgi ve kişisel gelişim içeriklerini oyunlaştırılmış pekiştirme ile öğrenebilmesi; çocuklar için güvenli mod + veli kontrolü, yetişkinler için Duolingo benzeri seri/ödül sistemi ile düzenli pratik oluşturulması.

Dürüst not: “Çocuk oyunu” alanı üretimde güvenlik (reklam yok, dış link yok, sosyal yok), veli onayı, süre sınırı, yaş içeriği uygunluğu olmadan yayınlanmamalı.

⸻

US-23.1 — Oyunlar ana ekranı ve kategoriler

Rol: Danışan
Danışan olarak, oyunları yaş grubuna ve hedefe göre kategoriler halinde görmek istiyorum; böylece hızlıca uygun oyunu seçebileyim.

Acceptance Criteria
	•	Önkoşul: Uygulamaya giriş yaptım. Ne zaman “Oyunlar” sekmesini açarsam, o zaman çocuk/genç/yetişkin kategorileri görünür.
	•	Önkoşul: Bir kategori seçtim. Ne zaman “Keşfet” dersem, o zaman kategoriye ait oyun listesine giderim.
	•	Önkoşul: Çocuk içeriği görüntüleniyor. Ne zaman çocuk kategorisi açılırsa, o zaman güvenli mod kuralları (reklam yok/sosyal yok/dış link yok) görünür.

⸻

US-23.2 — Çocuk profili oluşturma (veli onayı)

Rol: Veli (Genel Kullanıcı), Çocuk (Danışan)
Veli olarak, çocuğum için güvenli bir çocuk profili oluşturmak istiyorum; böylece içerikler yaşına uygun ve kontrollü olsun.

Acceptance Criteria
	•	Önkoşul: Aile/Grup paketinde kişi sayısı uygun. Ne zaman “Çocuk profili” oluşturmayı seçersem, o zaman çocuk profili seçeneği aktif olur.
	•	Önkoşul: Çocuk profili oluşturuyorum. Ne zaman isim + yaş aralığı seçersem, o zaman profil taslak olarak hazırlanır.
	•	Önkoşul: Veli onayı gerekli. Ne zaman “PIN ile Onayla” dersem, o zaman PIN doğrulanmadan profil oluşturulmaz.
	•	Önkoşul: Profil oluştu. Ne zaman çocuk profiline geçersem, o zaman güvenli mod otomatik aktif gelir.

⸻

US-23.3 — Oyun detayı, güvenli mod ve ödüller

Rol: Danışan
Danışan olarak, oyuna başlamadan önce hedefini, süresini, kurallarını ve ödüllerini görmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Oyun detay ekranındayım. Ne zaman ekran açılırsa, o zaman oyun hedefi, tahmini süre, seviye ve ödüller görünür.
	•	Önkoşul: Çocuk profili aktif. Ne zaman detay ekranı açılırsa, o zaman “Güvenli mod” kuralları net gösterilir.
	•	Önkoşul: Oyunu beğendim. Ne zaman “Kaydet (Favori)” dersem, o zaman oyun favorilere eklenir.
	•	Önkoşul: Başlamak istiyorum. Ne zaman “Oyna” dersem, o zaman oyun oturumu başlar.

⸻

US-23.4 — Oyun oynama (quiz) ve anlık geri bildirim

Rol: Danışan
Danışan olarak, soruları cevaplayıp doğru/yanlış geri bildirim almak istiyorum; böylece öğrenmem pekişsin.

Acceptance Criteria
	•	Önkoşul: Oyun oturumu başladı. Ne zaman soru ekranı açılırsa, o zaman soru numarası (örn. 3/8) görünür.
	•	Önkoşul: Cevap seçtim. Ne zaman bir seçenek seçersem, o zaman doğru/yanlış geri bildirimi anında gösterilir.
	•	Önkoşul: Devam etmek istiyorum. Ne zaman “Sonraki” dersem, o zaman bir sonraki soruya geçerim.
	•	Önkoşul: Çıkmak istiyorum. Ne zaman “Çık” dersem, o zaman ilerleme kaydedilir ve güvenli şekilde oyun listesine dönerim.

⸻

US-23.5 — Seri, rozetler ve ödüller (motivasyon)

Rol: Danışan
Danışan olarak, seri gün sayımı, rozetler ve XP ile ilerlememi görmek istiyorum; böylece düzenli pratik yapmaya motive olayım.

Acceptance Criteria
	•	Önkoşul: Oyunlar oynandı. Ne zaman “Seri & Ödüller” ekranına girersem, o zaman seri (örn. 6/7) ve kazanılan rozetler görünür.
	•	Önkoşul: Ödül kazandım. Ne zaman bir ödül kazanılırsa, o zaman ödül özeti (XP/rozet/seri) net gösterilir.
	•	Önkoşul: Sanal dünya entegrasyonu varsa. Ne zaman “Dünyamda Kullan” dersem, o zaman ödül sanal dünyaya yansıtılır (EPIC 19 ile uyumlu).

⸻

US-23.6 — Veli paneli (rapor ve güvenlik)

Rol: Veli (Genel Kullanıcı)
Veli olarak, çocuğumun oyun süresini, öğrenme özetini ve güvenlik durumunu görmek istiyorum; böylece sağlıklı kullanım sağlayabileyim.

Acceptance Criteria
	•	Önkoşul: Veli paneline girmek istiyorum. Ne zaman çocuk profili yönetimini açarsam, o zaman PIN doğrulaması istenir (ürün kararına göre “her seferinde” veya “oturum bazlı”).
	•	Önkoşul: Panel açıldı. Ne zaman ekran görüntülenirse, o zaman haftalık süre, öğrenme özeti ve güvenlik durumu görünür.
	•	Önkoşul: Rapor almak istiyorum. Ne zaman “Raporu İndir” dersem, o zaman indirilebilir/Paylaşılabilir özet hazırlanır.

⸻

US-23.7 — Süre sınırı ve gece modu

Rol: Veli (Genel Kullanıcı), Çocuk (Danışan)
Veli olarak, çocuğun oyun süresine günlük limit koymak ve gece modunu yönetmek istiyorum; böylece dengeli kullanım sağlansın.

Acceptance Criteria
	•	Önkoşul: Süre sınırı ekranındayım. Ne zaman 15 dk / 30 dk / sınırsız seçersem, o zaman seçim kaydedilmeye hazır hale gelir.
	•	Önkoşul: Limit doldu. Ne zaman çocuk limit süresini doldurursa, o zaman oyun durur ve “nazik mola” ekranı çıkar; PIN olmadan devam edemez.
	•	Önkoşul: Gece modu açık. Ne zaman 22:00 sonrası ise, o zaman oyun erişimi kuralına göre kısıtlanır (kapatma veya uyarı + veli PIN).
	•	Önkoşul: Kaydetmek istiyorum. Ne zaman “Kaydet” dersem, o zaman limitler kalıcı olur ve tüm cihazlarda uygulanır.

⸻


EPIC 24 — Video Dersler ve Rehber Kütüphanesi

Danışanların “nasıl yapılır” tarzı içerikleri (örn. abdest/namaż/hac, örtünme pratikleri, kısa konu anlatımları) 7/10/15 dk formatlarında; altyazı, bölümleme (chapter), hız, çevrimdışı, favori/sonradan izle ve geri bildirim mekanizmasıyla yüksek kalitede tüketebilmesi.

Dürüst not: Bu EPIC üretimde “sadece video listesi” olamaz. Kaliteli UX için bölümler, altyazı yönetimi, kaldığın yer, çevrimdışı, koleksiyonlar, geri bildirim şart.

⸻

US-24.1 — Video kütüphanesi (kategori + keşfet)

Rol: Danışan
Danışan olarak, video kütüphanesinde kategorilere göre içerikleri keşfetmek istiyorum; böylece aradığım rehber videoyu hızlı bulabileyim.

Acceptance Criteria
	•	Önkoşul: Uygulamaya giriş yaptım. Ne zaman “Videolar” sekmesini açarsam, o zaman kategoriler (İbadet Rehberi / Manevi Koçluk / Örtünme vb.) görünür.
	•	Önkoşul: Bir kategori seçtim. Ne zaman kategori filtresini uygularsam, o zaman listelenen videolar kategoriye göre güncellenir.
	•	Önkoşul: Bir video kartını gördüm. Ne zaman kart görüntülenirse, o zaman süre (7/10/15 dk), seviye/etiket ve hızlı aksiyon (İzle/Devam) görünür.

⸻

US-24.2 — Video detayı (erişim, bölümler, kaydet)

Rol: Danışan
Danışan olarak, videonun detayında içerik özetini, bölümlerini ve erişim durumunu görmek istiyorum; böylece izlemeden önce net karar verebileyim.

Acceptance Criteria
	•	Önkoşul: Video detay ekranındayım. Ne zaman ekran açılırsa, o zaman başlık, özet, süre, seviye ve dil/altyazı durumu görünür.
	•	Önkoşul: Video bölümlemeli. Ne zaman “Bölümler” alanı gösterilirse, o zaman kullanıcı bölüm adlarını görür ve bölüme atlayabileceğini anlar.
	•	Önkoşul: Plan kontrolü gerekli. Ne zaman içerik plan kısıtı taşıyorsa, o zaman “Erişim durumu” açıkça gösterilir (uygun değilse yükseltme akışı sunulur).
	•	Önkoşul: Kaydetmek istiyorum. Ne zaman “Kaydet” dersem, o zaman video Favoriler/Sonradan İzle listesine eklenir.

⸻

US-24.3 — Video oynatıcı (altyazı, hız, bölüm)

Rol: Danışan
Danışan olarak, videoyu altyazı, hız ve bölüm atlama seçenekleriyle izlemek istiyorum; böylece kendi öğrenme hızımda ilerleyebileyim.

Acceptance Criteria
	•	Önkoşul: Video oynuyor. Ne zaman oynatıcı açılırsa, o zaman süre çubuğu ve “kaldığın yer” bilgisi görünür.
	•	Önkoşul: Altyazı kullanmak istiyorum. Ne zaman altyazıyı açarsam, o zaman altyazılar ekranda görünür (destek yoksa net mesaj gösterilir).
	•	Önkoşul: Hız değiştirmek istiyorum. Ne zaman 0.9×/1.0×/1.2×/1.5× seçersem, o zaman hız anında değişir.
	•	Önkoşul: Bölüme atlamak istiyorum. Ne zaman bölüm seçersem, o zaman video ilgili zaman koduna gider.

⸻

US-24.4 — Çevrimdışı indirme ve yönetim

Rol: Danışan
Danışan olarak, videoları çevrimdışı izlemek için indirebilmek ve indirmeleri yönetebilmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Video indirilebilir. Ne zaman “Çevrimdışı indir” dersem, o zaman indirme başlar ve ilerleme yüzdesi görünür.
	•	Önkoşul: İndirilenler ekranındayım. Ne zaman ekran açılırsa, o zaman durumlar (tamamlandı/indiriliyor/kuyrukta) ayrı ayrı görünür.
	•	Önkoşul: Depolama kontrolü gerekli. Ne zaman depolama limiti aşılacaksa, o zaman kullanıcıya uyarı verilir ve yönetim seçenekleri sunulur.
	•	Önkoşul: Wi-Fi kuralı istiyorum. Ne zaman “Sadece Wi-Fi’da indir” ayarını açarsam, o zaman mobil veride indirme başlamaz.

⸻

US-24.5 — Koleksiyonlar (setler) ve keşif

Rol: Danışan
Danışan olarak, “İbadet Rehberi” gibi koleksiyonlar halinde düzenlenmiş video setlerini görmek istiyorum; böylece bir konuyu baştan sona takip edebileyim.

Acceptance Criteria
	•	Önkoşul: Koleksiyonlar ekranındayım. Ne zaman ekran açılırsa, o zaman set kartları (başlık, açıklama, içerik kapsamı) görünür.
	•	Önkoşul: Koleksiyon seçtim. Ne zaman “Aç” dersem, o zaman koleksiyon içindeki videolar sıralı listelenir.
	•	Önkoşul: Koleksiyonu kaydetmek istiyorum. Ne zaman “Favorile” dersem, o zaman koleksiyon Favoriler/Sonradan İzle listeme eklenir.

⸻

US-24.6 — Sonradan İzle / Favoriler

Rol: Danışan
Danışan olarak, kaydettiğim videoları ve koleksiyonları “Sonradan İzle” listemde görmek ve kaldığım yerden devam etmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Sonradan İzle ekranındayım. Ne zaman ekran açılırsa, o zaman kaydedilen video/koleksiyonlar ve “kaldığın yer” bilgisi görünür.
	•	Önkoşul: Bir öğeyi açmak istiyorum. Ne zaman “Aç” dersem, o zaman ilgili video oynatıcıya veya koleksiyon detayına giderim.
	•	Önkoşul: Listeyi düzenlemek istiyorum. Ne zaman sıralama/filtre uygularsam, o zaman liste anında güncellenir.

⸻

US-24.7 — İçerik geri bildirimi ve hata bildirme

Rol: Danışan
Danışan olarak, bir videoda altyazı/ses senkronu gibi bir sorun görürsem hızlıca bildirmek ve öneri bırakmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Video detayında/oynatıcıdayım. Ne zaman “Geri bildirim”i açarsam, o zaman konu seçimi (altyazı/ses senkron/öneri) görünür.
	•	Önkoşul: Açıklama gireceğim. Ne zaman metin alanına yazarsam, o zaman örnek format (örn. “00:42’de altyazı eksik”) kullanıcıya ipucu verir.
	•	Önkoşul: Göndereceğim. Ne zaman “Gönder” dersem, o zaman bildirim başarıyla alınır ve kullanıcıya onay mesajı gösterilir.
	•	Önkoşul: Anonim kalmak istiyorum. Ne zaman anonim gönderim seçiliyse, o zaman kimlik bilgisi gösterilmeden kayıt alınır (ürün kararına göre).

⸻



EPIC 25 — Koç Takibi ve Mentor Geri Bildirimi

Koçların, danışanları uygulama üzerinden etik + güvenli + ölçülebilir şekilde takip edebilmesi; danışanın hedefleri, kullandığı içerikler, modül ilerlemeleri, testler ve yazdığı yorumlar üzerinden modül sonu geri bildirim, görev/ödev ve (varsa) AI destekli özet/sinyal ile yönlendirme yapabilmesi.

Dürüst not: Koç takibi üretimde “basit bir liste + mesaj” olamaz. Gizlilik izinleri, danışan onayı, audit/log, şeffaf AI ve rol bazlı yetki şart. Koçluk özelliği en doğru şekilde “Koçluk Eğitimi / Koçluk Desteği” Add-on ile çalışmalı.

⸻

US-25.1 — Koç paneli: danışan listesi ve durum

Rol: Koç
Koç olarak, danışanlarımı durum etiketleriyle (aktif/yeni/uyarı) listelemek istiyorum; böylece kime öncelik vermem gerektiğini hızlıca görebileyim.

Acceptance Criteria
	•	Önkoşul: Koç rolü ile giriş yaptım. Ne zaman Koç Paneli açılırsa, o zaman danışan listesi ve her danışan için özet (hedef, gün X/Y, ilerleme) görünür.
	•	Önkoşul: Bir danışanın durumu değişti. Ne zaman “Uyarı” sinyali oluşursa (örn. yorum gecikmesi), o zaman listede belirgin etiketle gösterilir.
	•	Önkoşul: Danışan seçtim. Ne zaman bir danışan kartına dokunursam, o zaman danışan detayına giderim.

⸻

US-25.2 — Danışan detayı: hedef, plan ve ilerleme

Rol: Koç
Koç olarak, danışanın hedefini, planını (Bireysel/Aile/Grup) ve ilerlemesini tek ekranda görmek istiyorum; böylece geri bildirimi doğru bağlamda verebileyim.

Acceptance Criteria
	•	Önkoşul: Danışan detayı ekranındayım. Ne zaman ekran açılırsa, o zaman hedef, program süresi (gün X/Y), kilitli modül kuralı ve ilerleme yüzdesi görünür.
	•	Önkoşul: Koçluk Add-on gerekli. Ne zaman danışanın koçluk erişimi yoksa, o zaman koç özellikleri (geri bildirim/mesaj) kapalı görünür ve “izin/plan” yönlendirmesi gösterilir.
	•	Önkoşul: Bir alt alanı açmak istiyorum. Ne zaman “Duygusal harita / Modüller / Koç notları / Mesajlaşma” seçersem, o zaman ilgili ekrana giderim.

⸻

US-25.3 — Modül sonu koç geri bildirimi ve ödev

Rol: Koç
Koç olarak, danışanın modül yorumuna göre modül sonu geri bildirim ve uygulanabilir küçük ödevler göndermek istiyorum.

Acceptance Criteria
	•	Önkoşul: Danışan bir modülü tamamladı. Ne zaman modül tamamlandı olarak işaretlenirse, o zaman koç geri bildirimi ekranı açılabilir olur.
	•	Önkoşul: Geri bildirim yazıyorum. Ne zaman koç yorumu ve ödev alanlarını doldurursam, o zaman “Taslak kaydet” ve “Gönder” seçenekleri sunulur.
	•	Önkoşul: Göndermek istiyorum. Ne zaman “Geri Bildirimi Gönder” dersem, o zaman danışana bildirim gider ve kayıt geçmişte saklanır.
	•	Önkoşul: Danışan gizlilik ayarı yaptı. Ne zaman danışan koç notlarının görünürlüğünü kısıtladıysa, o zaman yalnızca danışana açık alanlar paylaşılır.

⸻

US-25.4 — AI özet ve uyarı sinyalleri (şeffaf)

Rol: Koç
Koç olarak, danışanın yazdığı yorumlardan AI destekli özet ve uyarı sinyalleri görmek istiyorum; böylece daha hızlı ve tutarlı destek verebileyim.

Acceptance Criteria
	•	Önkoşul: AI Add-on aktif. Ne zaman koç panelinde AI analiz açılırsa, o zaman “özet + sinyal + şeffaflık” blokları görünür.
	•	Önkoşul: AI öneri üretmiş. Ne zaman koç AI önerisini incelerse, o zaman “Bu bir öneridir, son karar koçtadır” ifadesi açıkça gösterilir.
	•	Önkoşul: Koç AI çıktısını yanlış buldu. Ne zaman “Düzelt/Geri bildir” dersem, o zaman düzeltme kaydı alınır ve gelecekteki kalite iyileştirmesine katkı sağlar.
	•	Önkoşul: AI Add-on yok. Ne zaman AI ekranı açılmak istenirse, o zaman erişim kısıtı net gösterilir.

⸻

US-25.5 — Notlar/teknikler/test kayıtları

Rol: Koç
Koç olarak, danışanla çalışırken kullandığım teknikleri, test sonuçlarını ve önemli notları kayıt altına almak istiyorum.

Acceptance Criteria
	•	Önkoşul: Danışan detayı içindeyim. Ne zaman “Koç kayıtları” ekranını açarsam, o zaman kayıtlar (test/teknik/modül) tarih sırasıyla listelenir.
	•	Önkoşul: Yeni kayıt ekliyorum. Ne zaman “Yeni Kayıt Ekle” dersem, o zaman kayıt türü seçimi ve içerik alanı açılır.
	•	Önkoşul: Kayıt gizli olmalı. Ne zaman kayıt “koç notu (gizli)” işaretlenirse, o zaman danışan tarafında görünmez.
	•	Önkoşul: Yetki yok. Ne zaman koç rolü dışında biri erişmeye çalışırsa, o zaman erişim engellenir.

⸻

US-25.6 — Güvenli mesajlaşma ve görev gönderimi

Rol: Koç, Danışan
Koç olarak danışanla güvenli mesajlaşmak ve küçük görev/ödev göndermek istiyorum; danışan olarak da bu görevleri görmek ve tamamlamak istiyorum.

Acceptance Criteria
	•	Önkoşul: Koçluk Add-on aktif. Ne zaman mesajlaşma ekranı açılırsa, o zaman iki yönlü sohbet görünür.
	•	Önkoşul: Hızlı görev göndereceğim. Ne zaman “Hızlı görev” seçersem, o zaman ön tanımlı görev şablonu ile tek dokunuşla gönderim yapılır.
	•	Önkoşul: Danışan görevi aldı. Ne zaman danışan görevi görürse, o zaman “tamamlandı” işaretleyebilir ve koç panelinde güncellenir.
	•	Önkoşul: Güvenlik kuralı. Ne zaman uygunsuz içerik/kişisel veri riski oluşursa, o zaman sistem uyarı verir ve gerektiğinde mesaj gönderimi kısıtlanır (ürün kararıyla).

⸻

US-25.7 — Rapor dışa aktarma ve gizlilik izinleri

Rol: Koç, Danışan
Koç olarak, danışanın onayıyla ilerleme ve geri bildirim raporu oluşturup paylaşmak istiyorum; danışan olarak da paylaşım izinlerini kontrol etmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Rapor oluşturacağım. Ne zaman rapor ekranını açarsam, o zaman rapora eklenecek bölümler (grafik/özet/koç geri bildirimi/test özeti) seçilebilir.
	•	Önkoşul: Danışan izni gerekli. Ne zaman danışanın “Paylaşım izni” yoksa, o zaman koç raporu indiremez; “Danışandan izin iste” akışı görünür.
	•	Önkoşul: Gizlilik seçeneği. Ne zaman “adı gizle/ham yorum gizle/sadece özet” seçilirse, o zaman rapor buna göre üretilir.
	•	Önkoşul: Kayıt ve denetim. Ne zaman rapor indirilirse, o zaman kim/nezaman/hangi içerik ile indirildi bilgisi loglanır.

⸻



EPIC 26 — Yolculuk Belirleme Asistanı

Danışanların uygulamaya girdiklerinde “hangi yolculuktan başlamalıyım?” sorusuna hızlı ve güvenilir şekilde yanıt alabilmesi için kısa anket + mini duygu kontrolü ile kişiselleştirilmiş 2–3 yolculuk önerisi, karşılaştırma, plan oluşturma ve (varsa) AI Paket ile gerekçe açıklaması.

Dürüst not: Bu asistan “tek ekran öneri” olursa güven kaybettirir. Üretimde şeffaflık, “neden önerdim?”, yeniden öneri, plan değişikliği etkisi ve gizlilik mutlaka olmalı.

⸻

US-26.1 — Asistanı başlatma (ilk giriş + sekme)

Rol: Danışan
Danışan olarak, uygulamaya ilk girişimde (ve dilediğimde sonradan) Yolculuk Asistanını başlatmak istiyorum; böylece nereden başlamam gerektiğini kolayca bulabileyim.

Acceptance Criteria
	•	Önkoşul: Uygulamayı ilk kez açtım. Ne zaman onboarding tamamlanırsa, o zaman “Yolculuk Asistanı” önerisi gösterilir (atlanabilir).
	•	Önkoşul: Asistanı kullanmak istiyorum. Ne zaman “Başla” dersem, o zaman hedef sorularına geçerim.
	•	Önkoşul: Daha sonra kullanacağım. Ne zaman “Daha Sonra” dersem, o zaman ana akışa giderim ve “Asistan” sekmesi her zaman erişilebilir olur.

⸻

US-26.2 — Hedef/niyet anketi

Rol: Danışan
Danışan olarak, hedefimi ve beklentimi kısa sorularla belirtmek istiyorum; böylece öneriler bana uygun olsun.

Acceptance Criteria
	•	Önkoşul: Asistan başladı. Ne zaman soru ekranı açılırsa, o zaman soru sayacı (örn. 1/3) görünür.
	•	Önkoşul: Bir seçenek seçtim. Ne zaman seçenek işaretlersem, o zaman seçimim geçici olarak kaydedilir ve geri dönersem korunur.
	•	Önkoşul: Serbest metin alanı varsa. Ne zaman beklenti metni yazarsam, o zaman kullanıcıya örnek format ipucu gösterilir ve metin güvenli şekilde kaydedilir.
	•	Önkoşul: Devam edeceğim. Ne zaman “Devam Et” dersem, o zaman bir sonraki adıma geçerim.

⸻

US-26.3 — Duygu kontrolü (mini ölçüm)

Rol: Danışan
Danışan olarak, kısa bir duygu/stres ölçümü yapmak istiyorum; böylece öneriler güncel ruh halime de uyum sağlasın.

Acceptance Criteria
	•	Önkoşul: Ölçüm ekranındayım. Ne zaman ekran açılırsa, o zaman bunun tanı koymadığı ve sadece öneriyi iyileştirdiği açıkça belirtilir.
	•	Önkoşul: Ölçüm yapıyorum. Ne zaman 0–10 aralığında seçim yaparsam, o zaman değer görsel olarak anlaşılır şekilde gösterilir.
	•	Önkoşul: Gizlilik bekliyorum. Ne zaman ölçüm tamamlanırsa, o zaman veri “kişiselleştirme” amacıyla saklanır ve Ayarlar’dan yönetilebilir.
	•	Önkoşul: Devam edeceğim. Ne zaman “Önerileri Gör” dersem, o zaman sonuç ekranına geçerim.

⸻

US-26.4 — Öneriler ve karşılaştırma

Rol: Danışan
Danışan olarak, bana önerilen 2–3 yolculuğu uyum skorlarıyla görmek ve karşılaştırmak istiyorum; böylece bilinçli seçim yapabileyim.

Acceptance Criteria
	•	Önkoşul: Öneri ekranındayım. Ne zaman ekran yüklenirse, o zaman her öneri için başlık, kısa açıklama, uyum skoru ve “Seç” aksiyonu görünür.
	•	Önkoşul: Bir öneri seçiyorum. Ne zaman “Seç” dersem, o zaman plan oluşturma ekranına giderim.
	•	Önkoşul: AI Paket bilgisi var. Ne zaman AI Paket aktif değilse, o zaman “AI ile neden?” alanı erişim kısıtı mesajı ile görünür (satış değil, net bilgilendirme).
	•	Önkoşul: Yeniden denemek istiyorum. Ne zaman soruları düzenlemeyi seçersem, o zaman anket adımına geri dönebilirim.

⸻

US-26.5 — Plan oluşturma (günlük hedef + hatırlatıcı)

Rol: Danışan
Danışan olarak, seçtiğim yolculuk için günlük hedef (300 kelime/5 sayfa/10 dk gibi) ve hatırlatıcıları belirleyip planı başlatmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Plan ekranındayım. Ne zaman ekran açılırsa, o zaman seçilen yolculuk, kilitli modül mantığı ve yorum deadline (23:59) net görünür.
	•	Önkoşul: Günlük hedef seçiyorum. Ne zaman hedef seçersem, o zaman seçim plan ayarına kaydedilir.
	•	Önkoşul: Hatırlatıcıları etkinleştirmek istiyorum. Ne zaman saatleri seçersem, o zaman bildirim izinleri kontrol edilir ve izin yoksa izin akışı gösterilir.
	•	Önkoşul: Planı başlatacağım. Ne zaman “Planı Başlat” dersem, o zaman yolculuk “Yolculuklarım”a eklenir ve gün kapısı/akışı aktif olur.

⸻

US-26.6 — AI ile öneri gerekçesi (AI Paket)

Rol: Danışan
Danışan olarak, AI Paketim varsa önerilerin neden seçildiğini sohbetle öğrenmek istiyorum; böylece öneriye güvenim artsın.

Acceptance Criteria
	•	Önkoşul: AI Paket aktif. Ne zaman “AI ile Açıkla” ekranını açarsam, o zaman sohbet alanı ve şeffaflık metni görünür.
	•	Önkoşul: Soru sordum. Ne zaman mesaj gönderirsem, o zaman AI yanıt verir ve yanıtın “tavsiye” olduğu açıkça belirtilir.
	•	Önkoşul: AI Paket aktif değil. Ne zaman AI alanına erişmeye çalışırsam, o zaman erişim kısıtı net gösterilir ve kullanıcı asistanın AI’sız devam edebileceğini görür.

⸻

US-26.7 — Planı güncelleme ve yeniden öneri

Rol: Danışan
Danışan olarak, planım zor gelirse hedefimi güncellemek veya soruları değiştirip yeniden öneri almak istiyorum; böylece sürdürülebilir ilerleyebileyim.

Acceptance Criteria
	•	Önkoşul: Aktif planım var. Ne zaman “Planı Güncelle” ekranını açarsam, o zaman mevcut plan özeti (gün X/Y, hedef) görünür.
	•	Önkoşul: Sadece hedefi değiştireceğim. Ne zaman “Sadece Hedefi Güncelle” dersem, o zaman yeni hedef geçerli olur ve geçmişe kayıt düşülür.
	•	Önkoşul: Yeniden öneri alacağım. Ne zaman “Soruları Güncelle ve Yeniden Öner” dersem, o zaman asistan anketine giderim ve yeni öneriler üretilir.
	•	Önkoşul: Değişiklik etkisi var. Ne zaman plan değişikliği yapılacaksa, o zaman kilitli ilerlemeye etkisi kullanıcıya net şekilde anlatılır.

⸻




EPIC 27 — Öğrenci İndirimi ve Doğrulama

Öğrencilerin %50 indirim ile abonelik planlarını kullanabilmesi için: indirim talebi, uygunluk kontrolü, doğrulama (okul e-postası veya belge), durum takibi, indirimli ödeme özeti, süre/yenileme ve gizlilik/veri yönetimi süreçlerinin uçtan uca yönetilmesi.

Dürüst not: Üretimde “belge topla geç” yaklaşımı kötü UX ve riskli. Veri minimizasyonu, mümkünse okul e-postası ile doğrulama, belge gerekiyorsa maskeleme + sınırlı saklama + silme kritik.

⸻

US-27.1 — Öğrenci indirimi seçimi (plan ekranı)

Rol: Danışan
Danışan olarak, plan seçerken “Öğrenciyim (%50)” seçeneğini işaretlemek istiyorum; böylece doğrulama sonrası indirimli fiyatı görebileyim.

Acceptance Criteria
	•	Önkoşul: Plan seçimi ekranındayım. Ne zaman “Öğrenciyim (%50)” seçeneğini açarsam, o zaman indirim için doğrulama gerektiği net biçimde açıklanır.
	•	Önkoşul: Öğrenci indirimi açık. Ne zaman plan seçersem, o zaman “Uygunluğu Kontrol Et” aksiyonu görünür.
	•	Önkoşul: İndirim politikası var. Ne zaman kullanıcı ödeme detayını incelerse, o zaman indirimin çekirdek plan fiyatına uygulanacağı ve Add-on’ların indirime dahil olup olmadığı açıkça belirtilir.

⸻

US-27.2 — Uygunluk kuralları ve şeffaflık

Rol: Danışan
Danışan olarak, öğrenci indirimi için uygunluk kurallarını ve hangi verilerin istendiğini görmek istiyorum; böylece güvenle doğrulamaya başlayabileyim.

Acceptance Criteria
	•	Önkoşul: Uygunluk ekranındayım. Ne zaman ekran açılırsa, o zaman kriterler (aktif öğrenci olma vb.) sade ve anlaşılır şekilde listelenir.
	•	Önkoşul: Veri şeffaflığı gerekli. Ne zaman “Ne topluyoruz?” bölümü gösterilirse, o zaman yalnızca minimum verinin istendiği belirtilir.
	•	Önkoşul: Gizlilik uyarısı gerekli. Ne zaman kullanıcı doğrulamaya geçmek isterse, o zaman hassas veri (kimlik no vb.) istenmeyeceği veya gerekiyorsa maskeleme uygulanacağı açıkça anlatılır.

⸻

US-27.3 — Doğrulama başlatma (e-posta / belge)

Rol: Danışan
Danışan olarak, okul e-postası veya öğrenci belgesi ile doğrulama yapabilmek istiyorum; böylece indirimi aktive edebileyim.

Acceptance Criteria
	•	Önkoşul: Doğrulama yöntem seçimi ekranındayım. Ne zaman ekran açılırsa, o zaman en güvenli/kolay yöntem (okul e-postası) varsayılan olarak önerilir.
	•	Önkoşul: Okul e-postası seçtim. Ne zaman “Kodu Gönder” dersem, o zaman doğrulama kodu gönderilir ve kod girişi alanı aktif olur.
	•	Önkoşul: Belge ile doğrulama seçtim. Ne zaman belge yükleme başlarsa, o zaman desteklenen formatlar (PDF/JPG) ve maskeleme yönergesi gösterilir.
	•	Önkoşul: Doğrulama tamamlandı. Ne zaman kod doğru girilirse veya belge kabul edilirse, o zaman durum ekranına yönlendirilirim.

⸻

US-27.4 — Doğrulama durumu, bildirim, itiraz

Rol: Danışan
Danışan olarak, doğrulama sürecimin durumunu (beklemede/onay/red) görmek ve gerekirse itiraz edebilmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Doğrulama başlatıldı. Ne zaman durum ekranı açılırsa, o zaman durum ve beklenen süre (örn. 0–24 saat) gösterilir.
	•	Önkoşul: Sonuç oluştu. Ne zaman doğrulama onaylanırsa, o zaman indirim otomatik aktif olur ve kullanıcıya bildirim gider.
	•	Önkoşul: Doğrulama reddedildi. Ne zaman red kararı verilirse, o zaman gerekçe gösterilir ve “İtiraz Et / Yeni Belge” aksiyonları sunulur.
	•	Önkoşul: Durumu yenilemek istiyorum. Ne zaman “Durumu Yenile” dersem, o zaman en güncel durum çekilir.

⸻

US-27.5 — İndirimli ödeme özeti (checkout)

Rol: Danışan
Danışan olarak, doğrulama sonrası ödeme özetinde indirimin uygulanmış halini şeffaf şekilde görmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Doğrulama onaylandı. Ne zaman ödeme özeti açılırsa, o zaman plan ücreti, indirim tutarı ve toplam net şekilde ayrı satırlarda görünür.
	•	Önkoşul: Add-on seçili. Ne zaman add-on’lar ödeme özetinde yer alıyorsa, o zaman add-on’ların indirime dahil olup olmadığı açıkça belirtilir.
	•	Önkoşul: Abonelik başlatacağım. Ne zaman “Abone Ol” dersem, o zaman mağaza aboneliği (Apple/Google) akışına yönlendirilirim.

⸻

US-27.6 — İndirim süresi, yenileme, hatırlatma

Rol: Danışan
Danışan olarak, öğrenci indirimimin geçerlilik süresini görmek ve süresi dolmadan yeniden doğrulayabilmek istiyorum.

Acceptance Criteria
	•	Önkoşul: İndirim aktif. Ne zaman yenileme ekranı açılırsa, o zaman geçerlilik aralığı ve bitişe kalan süre görünür.
	•	Önkoşul: Süre bitişe yaklaştı. Ne zaman bitişe 30 gün kalırsa, o zaman kullanıcıya bildirim gönderilir (bildirim izni varsa).
	•	Önkoşul: Yeniden doğrulamak istiyorum. Ne zaman “Şimdi Yeniden Doğrula” dersem, o zaman doğrulama yöntem seçimine yönlendirilirim.
	•	Önkoşul: Süre doldu. Ne zaman indirim süresi biterse, o zaman indirim pasife düşer ve fiyatlandırma buna göre güncellenir.

⸻

US-27.7 — Gizlilik ve veri yönetimi

Rol: Danışan
Danışan olarak, doğrulama için paylaştığım verileri yönetmek (görmek/silmek) istiyorum; böylece kontrol bende olsun.

Acceptance Criteria
	•	Önkoşul: Gizlilik ekranındayım. Ne zaman ekran açılırsa, o zaman saklama politikası anlaşılır şekilde gösterilir (tercihen doğrulama sonrası belge silinir).
	•	Önkoşul: Geçmişi görmek istiyorum. Ne zaman “Doğrulama geçmişi”ni açarsam, o zaman tarih ve durum bilgilerini görürüm (minimum detay).
	•	Önkoşul: Verilerimi silmek istiyorum. Ne zaman “Verilerimi Sil” dersem, o zaman silme sonucu ve indirimin pasife döneceği net biçimde belirtilir ve onay akışı çalışır.

⸻





