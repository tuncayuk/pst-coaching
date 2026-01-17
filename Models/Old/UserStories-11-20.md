EPIC 11 — Kitap Kulübü ve Okuma Araçları

Danışanın tek başına veya toplulukla (kulüp) okuma yapması; altını çizme, not alma, sesli okuma, kaldığı yeri işaretleme, kulüp içinde paylaşım/tartışma ve “etkilendiği kısmı günlüğe ekleme” gibi güçlü okuma araçlarını kapsar.

Dürüst not: Kulüp özelliği çok güçlü ama production’da mutlaka gizlilik + moderasyon + raporlama/engelleme + audit gerekir; aksi halde hızla risk üretir.

⸻

US-11.1 — Kulüpler ana ekranı (liste + arama + hızlı erişim)

Rol: Danışan
Danışan olarak, üyesi olduğum ve keşfedebileceğim kulüpleri tek ekranda görmek istiyorum; böylece okumaya ve tartışmaya hızlıca katılabileyim.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman Kulüpler ekranını açarsam, o zaman üye olduğum kulüpler listelenir.
	•	Önkoşul: Kulüp kartı görüntülenir. Ne zaman bir kart görünürse, o zaman kitap/materyal, gün/ilerleme, günlük hedef ve kişi sayısı bilgileri gösterilir.
	•	Önkoşul: Arama alanı var. Ne zaman kulüp adı veya kitap adı ile ararsam, o zaman liste anında filtrelenir.
	•	Önkoşul: Boş durum. Ne zaman kulübüm yoksa, o zaman “Kulüp oluştur” ve “Kulüp keşfet” CTA’ları görünür.

⸻

US-11.2 — Kulüp oluşturma (gizlilik + kurallar)

Rol: Danışan (Kulüp Yöneticisi)
Danışan olarak, bir kitap kulübü oluşturmak istiyorum; böylece birlikte okuma ve paylaşım akışı başlatabileyim.

Acceptance Criteria
	•	Önkoşul: Kulüp oluşturma ekranındayım. Ne zaman kulüp adı ve materyal seçersem, o zaman kulüp oluşturma için gerekli bilgiler doğrulanır.
	•	Önkoşul: Gizlilik seçimi. Ne zaman “Açık / Özel / Davet ile” seçeneklerinden birini seçersem, o zaman kulübün katılım modeli buna göre ayarlanır.
	•	Önkoşul: Kurallar. Ne zaman kulüp oluşturulmadan önce kurallar görüntülenirse, o zaman saygılı dil, kişisel veri paylaşmama ve raporlama bilgisinin görünmesi zorunludur.
	•	Önkoşul: Oluşturma başarılı. Ne zaman “Kulübü Oluştur” dersem, o zaman kulüp açılır ve yönetici araçları (davet, gizlilik, moderasyon) aktif olur.

⸻

US-11.3 — Kulüp akışı (paylaşım + yanıt + hızlı aksiyon)

Rol: Danışan
Danışan olarak, kulüp içinde paylaşılan vurguları/notları/soruları görmek ve yanıtlamak istiyorum.

Acceptance Criteria
	•	Önkoşul: Kulüp içindeyim. Ne zaman kulüp akışını açarsam, o zaman paylaşımlar zaman sırasına göre listelenir.
	•	Önkoşul: Paylaşım türleri var. Ne zaman paylaşım kartı görüntülenirse, o zaman “Vurgu / Not / Soru” etiketi görünür.
	•	Önkoşul: Yanıtlamak isterim. Ne zaman “Yanıtla” dersem, o zaman yanıt alanı açılır ve gönderim sonrası akışa eklenir.
	•	Önkoşul: Hızlı aksiyon. Ne zaman “Bugünkü okumaya git” dersem, o zaman doğru okuma ekranına yönlenirim.

⸻

US-11.4 — Altını çizme & not alma (kulüpte paylaş opsiyonu)

Rol: Danışan
Danışan olarak, okuma sırasında metni işaretleyip not alabilmek ve istersem kulüpte paylaşmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Okuma ekranındayım. Ne zaman bir metin bölümünü seçersem, o zaman “Altını çiz / Not al / Paylaş / İşaretle” aksiyonları çıkar.
	•	Önkoşul: Not yazarım. Ne zaman not eklersem, o zaman not kaydedilir ve favori/arşivle tutarlı şekilde saklanır.
	•	Önkoşul: Kulüpte paylaşırım. Ne zaman “Kulüpte Paylaş” dersem, o zaman paylaşım önizlemesi + gizlilik uyarısı gösterilir ve onayla paylaşılır.
	•	Önkoşul: Geri alma. Ne zaman vurgu veya not kaldırılırsa, o zaman “Geri al” (undo) sunulur.

⸻

US-11.5 — Sesli okuma (TTS) + hız/zamanlayıcı

Rol: Danışan
Danışan olarak, okumaya vakit ayıramadığımda sesli okumayı kullanmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Sesli okuma ekranındayım. Ne zaman “Oynat” dersem, o zaman seçili içerik sesli okunur.
	•	Önkoşul: Hız ayarı. Ne zaman hız değiştirirsem, o zaman oynatma hızı anında güncellenir.
	•	Önkoşul: Zamanlayıcı. Ne zaman zamanlayıcı ayarlarsam, o zaman süre dolunca oynatma durur.
	•	Önkoşul: Arka plan. Ne zaman uygulama arka plana giderse, o zaman OS izinlerine uygun şekilde oynatma devam eder veya kullanıcıya seçenek sunulur.

⸻

US-11.6 — Kaldığım yeri işaretleme (otomatik + manuel)

Rol: Danışan
Danışan olarak, kaldığım yeri kaybetmemek için işaretleme yapmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Okuma yapıyorum. Ne zaman içerikte ilerlersem, o zaman uygulama kaldığım yeri otomatik kaydeder.
	•	Önkoşul: Manuel işaretleme. Ne zaman “İşaretle” dersem, o zaman ilgili bölüm/satır kaydedilir.
	•	Önkoşul: Tekrar açarım. Ne zaman aynı içeriği tekrar açarsam, o zaman son kaldığım yere otomatik yönlenirim.
	•	Önkoşul: Senkron. Ne zaman cihaz değiştirirsem, o zaman işaretim hesabımda senkronlanır.

⸻

US-11.7 — Günlüğe ekle (alıntı + kişisel not)

Rol: Danışan
Danışan olarak, etkilendiğim kısmı alıntı + not şeklinde günlüğüme eklemek istiyorum.

Acceptance Criteria
	•	Önkoşul: Vurgu seçiliyken. Ne zaman “Günlüğe Ekle” dersem, o zaman alıntı + kişisel not alanı açılır.
	•	Önkoşul: Kaydederim. Ne zaman “Günlüğe Kaydet” dersem, o zaman kayıt kişisel arşive eklenir (varsayılan: özel).
	•	Önkoşul: Paylaşım kontrolü. Ne zaman kullanıcı paylaşmak isterse, o zaman kapsam seçimi + gizlilik uyarısı gösterilir.
	•	Önkoşul: Düzenleme. Ne zaman günlük girdisini düzenlersem, o zaman sürüm kaydı veya geri alma akışı sağlanır.

⸻

US-11.8 — Güvenlik & moderasyon (raporla/engelle + audit)

Rol: Danışan / Kulüp Yöneticisi / Admin
Danışan olarak, uygunsuz içerikleri raporlamak ve gerekirse kullanıcıyı engellemek istiyorum.

Acceptance Criteria
	•	Önkoşul: Akışta paylaşım var. Ne zaman “Raporla” dersem, o zaman rapor nedeni seçilir ve kayıt oluşturulur.
	•	Önkoşul: Engelleme. Ne zaman “Kullanıcıyı Engelle” dersem, o zaman ilgili kullanıcının içerikleri görünmez ve etkileşim kesilir.
	•	Önkoşul: Gizlilik ayarı. Ne zaman kulübün gizliliği değiştirilirse, o zaman yeni kurallar tüm üyelere bildirilir.
	•	Önkoşul: Denetim. Ne zaman kritik işlemler yapılırsa (engelleme/gizlilik/rol), o zaman audit kaydı tutulur.

⸻




EPIC 12 — PST Sanal Dünya ve Oyunlaştırma

Danışanın günlük okuma/yansıma alışkanlığını güçlendirmek için “Minecraft benzeri ama sade” bir Sanal Dünya (bahçe/evren) sunar: okudukça XP, seviye, dekor kazanır; teslim/seri/kurallara bağlı olarak dünya gelişir. Kilitleme, 23:59 teslim, 08:00 yeni gün kurallarıyla tutarlıdır.

Dürüst not: Oyunlaştırma yanlış tasarlanırsa “şov” olur. Bu epikte kritik başarı ölçütü: alışkanlık ve teslim oranı artışı. Bu yüzden ödüller “anlamlı ama hafif” tutulmalı, manipülatif olmamalı.

⸻

US-12.1 — Sanal dünya ana ekranı (durum + hızlı aksiyon)

Rol: Danışan
Danışan olarak, sanal dünyamın durumunu tek ekranda görmek istiyorum; böylece bugün ne yapmam gerektiğini hızlıca anlayabileyim.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman “Sanal Dünya” ekranını açarsam, o zaman seviye, XP, seri (streak) ve bugünkü durum (0/1 gibi) görünür.
	•	Önkoşul: Bugünkü hedef var. Ne zaman hedef kartı görünürse, o zaman hedef tipi (sayfa/kelime), teslim saati (23:59) ve CTA (“Hedefi Tamamla”) görünür.
	•	Önkoşul: Dünya sahnesi var. Ne zaman sahne görüntülenirse, o zaman dekorlar ve ilerleme görsel olarak anlaşılır biçimde görünür.
	•	Önkoşul: Offline. Ne zaman internet yoksa, o zaman son senkron zamanı gösterilir ve temel görüntüleme devam eder.

⸻

US-12.2 — Günlük hedef belirleme (5 sayfa / 300 / 500 kelime)

Rol: Danışan
Danışan olarak, günlük hedefimi seçebilmek istiyorum; böylece günümün yoğunluğuna göre sürdürülebilir ilerleyebileyim.

Acceptance Criteria
	•	Önkoşul: Hedef seçim ekranındayım. Ne zaman hedef seçeneklerini görürsem, o zaman her seçeneğin açıklaması görünür.
	•	Önkoşul: Seçim yaparım. Ne zaman bir hedefi seçersem, o zaman seçim görsel olarak işaretlenir.
	•	Önkoşul: Kaydederim. Ne zaman “Kaydet” dersem, o zaman hedef profilime kaydedilir ve bugünkü planı etkiler.
	•	Önkoşul: Gün değişimi. Ne zaman ertesi gün 08:00’den sonra yeni gün başlarsa, o zaman hedef uygulanmaya devam eder (kullanıcı değiştirmedikçe).

⸻

US-12.3 — Görevler ve ödüller (XP + dekor)

Rol: Danışan
Danışan olarak, görevleri görüp tamamlamak istiyorum; böylece ödül ve motivasyon kazanabileyim.

Acceptance Criteria
	•	Önkoşul: Görev ekranındayım. Ne zaman görevler listelenirse, o zaman her görevin ödülü (örn. 50 XP, dekor) görünür.
	•	Önkoşul: Görev tamamlarım. Ne zaman bir görev tamamlanırsa, o zaman görev durumu güncellenir ve ödül hesabıma eklenir.
	•	Önkoşul: Çoklu görev. Ne zaman birden fazla görev tamamlanırsa, o zaman ödüller tek bir “toplu kazanım” animasyonu ile gösterilir (spam olmaz).
	•	Önkoşul: Tutarlılık. Ne zaman görev “yorum yaz” gibi bir aksiyona bağlıysa, o zaman ilgili ekrana yönlendiren CTA sunulur.

⸻

US-12.4 — Teslim sonrası ödül (sandık + kısa yansıma opsiyonu)

Rol: Danışan
Danışan olarak, teslimimi yaptıktan sonra ödül geri bildirimi almak istiyorum; böylece davranışım pekişsin.

Acceptance Criteria
	•	Önkoşul: Günlük teslim yaptım. Ne zaman teslim başarılı olursa, o zaman ödül ekranı açılır ve kazanımlar (XP/dekor) görünür.
	•	Önkoşul: Yansıma opsiyonu. Ne zaman ödül ekranında “kısa not” alanı varsa, o zaman kullanıcı isterse 1 cümle not ekleyebilir (opsiyonel).
	•	Önkoşul: Dünyaya ekle. Ne zaman “Dünyama Ekle” dersem, o zaman dekor envantere eklenir ve sahnede kullanılabilir olur.
	•	Önkoşul: Tekrar gösterim. Ne zaman kullanıcı ekranı kapatırsa, o zaman aynı ödül tekrar tekrar zorla gösterilmez (bildirim merkezine düşer).

⸻

US-12.5 — Dünyayı düzenleme (sürükle-bırak + envanter)

Rol: Danışan
Danışan olarak, kazandığım dekorları dünyama yerleştirmek istiyorum; böylece ilerlememi görsel olarak hissedebileyim.

Acceptance Criteria
	•	Önkoşul: Düzenleme modundayım. Ne zaman dekoru sürüklersem, o zaman sahnede yerleştirebilirim ve çakışma/alan sınırları net olur.
	•	Önkoşul: Envanter var. Ne zaman envanteri açarsam, o zaman tüm dekorlar kategorilere göre listelenir.
	•	Önkoşul: Otomatik kayıt. Ne zaman yerleşim değişirse, o zaman değişiklik otomatik kaydedilir ve senkronlanır.
	•	Önkoşul: Geri al. Ne zaman son hamleyi geri almak istersem, o zaman “Geri Al” aksiyonu sunulur.

⸻

US-12.6 — Kilitli öğe koşulları (şeffaf açıklama + yönlendirme)

Rol: Danışan
Danışan olarak, kilitli bir öğeyi neden açamadığımı bilmek istiyorum; böylece doğru adımları tamamlayabileyim.

Acceptance Criteria
	•	Önkoşul: Kilitli öğeye tıkladım. Ne zaman kilitli ekran açılırsa, o zaman açılma koşulu (örn. “Modül 3’ü tamamla”) net yazılır.
	•	Önkoşul: Koşul adımları var. Ne zaman koşul detayına bakarsam, o zaman yapılacaklar checklist şeklinde görünür.
	•	Önkoşul: Yönlendirme. Ne zaman “Modüle Git” dersem, o zaman ilgili modüle yönlenirim.
	•	Önkoşul: Kilitleme kuralı. Ne zaman kullanıcı sonraki aşamaya geçmek isterse, o zaman kilitleme nedeni ile engellenir ve açıklama gösterilir.

⸻

US-12.7 — Seri telafi ve hatırlatma (kaçırılan günü toparla)

Rol: Danışan
Danışan olarak, bir gün kaçırdığımda serimi tamamen kaybetmeden telafi edebilmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Dün teslim yok. Ne zaman kullanıcı uygulamayı açarsa, o zaman telafi seçeneği sunulur (kısa, sürdürülebilir).
	•	Önkoşul: Telafi başlatırım. Ne zaman “Telafiyi Başlat” dersem, o zaman telafi akışı başlar ve tamamlanınca seri korunur.
	•	Önkoşul: Bildirim ayarı. Ne zaman kullanıcı hatırlatıcıyı açarsa, o zaman seçtiği saate göre bildirim planlanır.
	•	Önkoşul: Suistimal. Ne zaman telafi hakkı sınırına gelinirse, o zaman sistem sınırlamayı açıklar (örn. haftada 1 telafi).

⸻

US-12.8 — Cihazlar arası senkron (dünya/XP/envanter)

Rol: Danışan
Danışan olarak, sanal dünyamın tüm cihazlarda aynı olmasını istiyorum.

Acceptance Criteria
	•	Önkoşul: Hesabım var. Ne zaman farklı bir cihazda giriş yaparsam, o zaman dünya düzenim, XP ve envanterim senkronlanır.
	•	Önkoşul: Son işlemler. Ne zaman senkron ekranına girersem, o zaman son kazanımlar ve zamanları listelenir.
	•	Önkoşul: Yenileme. Ne zaman “Senkronu Yenile” dersem, o zaman en güncel veriler çekilir.
	•	Önkoşul: Çakışma. Ne zaman iki cihazda çakışma olursa, o zaman en yeni kayıt önceliği uygulanır ve kullanıcı bilgilendirilir.

⸻



EPIC 13 — Pekiştirme Oyunları ve Mini Quizler

Danışanın (ve aile planında çocukların) İslami bilgileri ve manevi farkındalığı kısa, tekrar eden mini oyunlarla pekiştirmesi: Duolingo benzeri quiz, eşleştirme, kart egzersizleri, sonuçta açıklamalı geri bildirim, seri (alışkanlık zinciri) ve güvenli çocuk modu (PIN + kısıtlar).

Dürüst not: Oyunlar “eğlence” değil, öğrenme transferi için araç olmalı. Bu yüzden her oyun oturumu mutlaka açıklama + tekrar önerisi ile kapanmalı.

⸻

US-13.1 — Oyunlar ana ekranı (katalog + günlük hedef)

Rol: Danışan
Danışan olarak, oyunları tek ekranda görmek ve günlük hedefimi hızlı başlatmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman “Oyunlar” ekranını açarsam, o zaman oyun kategorileri ve önerilen oyunlar listelenir.
	•	Önkoşul: Arama alanı var. Ne zaman konu/oyun adı ararsam, o zaman sonuçlar anında filtrelenir.
	•	Önkoşul: Günlük hedef kartı var. Ne zaman ekranda hedef kartı görünürse, o zaman “Bugün 2 oyun tamamla” gibi net bir hedef ve “Hızlı Başlat” CTA’sı olur.
	•	Önkoşul: Kilitli içerik. Ne zaman kilitli bir oyun görünürse, o zaman kilit nedeni (plan/rol/çocuk modu) açıkça gösterilir.

⸻

US-13.2 — Başlangıç seviye testi (kısa değerlendirme + kişiselleştirme)

Rol: Danışan
Danışan olarak, seviyemi belirlemek için kısa bir test yapmak istiyorum; böylece oyunlar benim seviyeme uygun gelsin.

Acceptance Criteria
	•	Önkoşul: Seviye testi ekranındayım. Ne zaman testi başlatırsam, o zaman 3 dakikayı geçmeyen kısa bir test akışı başlar.
	•	Önkoşul: Mod seçimi var. Ne zaman “Yetişkin / Çocuk” modu seçilirse, o zaman soru zorluğu ve dil buna göre ayarlanır.
	•	Önkoşul: Test biter. Ne zaman test tamamlanırsa, o zaman seviyem belirlenir ve önerilen oyun planı (günlük/haftalık) sunulur.
	•	Önkoşul: Değiştirme. Ne zaman kullanıcı tekrar test yapmak isterse, o zaman Profil > Oyun Ayarları’ndan yeniden başlatabilir.

⸻

US-13.3 — Quiz oturumu (çoktan seçmeli + ilerleme + açıklama)

Rol: Danışan
Danışan olarak, kısa quiz oturumları çözmek istiyorum; böylece bilgimi pratik ederek pekiştireyim.

Acceptance Criteria
	•	Önkoşul: Quiz başlattım. Ne zaman bir soru görüntülenirse, o zaman soru numarası (4/10) ve ilerleme çubuğu görünür.
	•	Önkoşul: Cevap seçerim. Ne zaman bir seçenek seçersem, o zaman seçimim net şekilde işaretlenir ve “Devam” ile ilerlerim.
	•	Önkoşul: Yanlış cevap. Ne zaman yanlış cevap verirsem, o zaman doğru cevap ve kısa açıklama gösterilir (aşırı uzun olmaz).
	•	Önkoşul: Oturum biter. Ne zaman quiz tamamlanırsa, o zaman sonuç ekranına yönlenirim.

⸻

US-13.4 — Eşleştirme oyunu (hızlı pekiştirme + süre)

Rol: Danışan
Danışan olarak, kısa eşleştirme oyunları ile hızlı tekrar yapmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Eşleştirme modundayım. Ne zaman oyun başlarsa, o zaman süre (örn. 60 sn) ve ilerleme görünür.
	•	Önkoşul: Eşleştiririm. Ne zaman doğru eşleştirme yaparsam, o zaman anında geri bildirim ve XP artışı gösterilir.
	•	Önkoşul: Yanlış eşleştirme. Ne zaman yanlış eşleştirirsem, o zaman cezalandırıcı olmadan düzeltme ipucu sunulur.
	•	Önkoşul: Süre biter. Ne zaman süre tamamlanırsa, o zaman sonuç ve önerilen tekrar gösterilir.

⸻

US-13.5 — Sonuç ve açıklama (yanlışları çalış + opsiyonel paylaşım)

Rol: Danışan
Danışan olarak, oyun sonunda sonuç ve açıklama görmek istiyorum; böylece eksiklerimi tamamlayabileyim.

Acceptance Criteria
	•	Önkoşul: Oturum tamamlandı. Ne zaman sonuç ekranı açılırsa, o zaman doğruluk, kazanılan XP ve seri etkisi görünür.
	•	Önkoşul: Açıklama alanı var. Ne zaman kullanıcı yanlış yaptığı soruya bakarsa, o zaman kısa bir açıklama ve ilgili konu bağlantısı gösterilir.
	•	Önkoşul: Tekrar. Ne zaman “Yanlışları Çalış” dersem, o zaman yanlışlardan oluşan mini tekrar oturumu başlar.
	•	Önkoşul: Paylaşım (opsiyonel). Ne zaman kullanıcı paylaşmak isterse, o zaman “Kulüpte paylaş” opsiyoneldir ve gizlilik uyarısı gösterilir.

⸻

US-13.6 — Seri (alışkanlık zinciri) ve rozetler

Rol: Danışan
Danışan olarak, seri ve rozetlerle ilerlememi görmek istiyorum; böylece motivasyonum artsın.

Acceptance Criteria
	•	Önkoşul: Seri ekranındayım. Ne zaman ekran açılırsa, o zaman gün sayısı, günlük hedef ve rozetler görünür.
	•	Önkoşul: Günlük hedef. Ne zaman kullanıcı hedef belirlerse, o zaman hedef seriyi etkiler ve hatırlatıcı ayarlanabilir.
	•	Önkoşul: Bildirim. Ne zaman kullanıcı hatırlatıcı açarsa, o zaman seçtiği saate göre bildirim planlanır.
	•	Önkoşul: Suistimal önleme. Ne zaman aynı gün içinde seri tekrar tetiklenmek istenirse, o zaman yalnızca ilk tamamlanma seriyi ilerletir.

⸻

US-13.7 — Çocuk modu (PIN doğrulama + güvenli kısıtlar)

Rol: Ebeveyn (Aile Planı Yöneticisi) / Çocuk Kullanıcı
Ebeveyn olarak, çocuk modu açmak istiyorum; böylece çocuk güvenli, yaşa uygun içeriklerle oyun oynayabilsin.

Acceptance Criteria
	•	Önkoşul: Çocuk modu açılacak. Ne zaman çocuk profiline geçiş yapılırsa, o zaman ebeveyn PIN doğrulaması istenir.
	•	Önkoşul: Çocuk modu aktif. Ne zaman çocuk moduna girilirse, o zaman paylaşım/tartışma özellikleri kapalı olur ve yalnızca çocuk içerikleri görünür.
	•	Önkoşul: Süre limiti. Ne zaman ebeveyn günlük süre limiti belirlerse, o zaman süre dolunca oyun sonlanır ve nazik bir kapanış ekranı gösterilir.
	•	Önkoşul: Gizlilik. Ne zaman çocuk modu kullanılırsa, o zaman çocuk profili kişisel veri girişi/serbest metin paylaşımı yapamaz.

⸻



EPIC 14 — Video Dersler ve Medya Oynatıcı

Danışanın (ve uygun rol/plan kapsamındaki kullanıcıların) 7/10/15 dakikalık konu anlatımlı videolara erişebilmesi; videoları altyazı, oynatma hızı, PiP, bölümler, transkript, not alma, çevrimdışı izleme ile tüketebilmesi. Tüm deneyim yolculuk kilitleme ve abonelik erişim kurallarıyla uyumludur.

Dürüst not: Video modülü “sadece oynatıcı” değil; asıl kalite farkı transkript + not + erişilebilirlik + kilit açıklaması ile gelir. Bunlar olmazsa premium hissi düşer.

⸻

US-14.1 — Video kütüphanesi (katalog + arama + devam et)

Rol: Danışan
Danışan olarak, video kütüphanesinde konuya göre arama yapıp videoları hızlıca başlatmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman “Videolar” sekmesini açarsam, o zaman video listesi kategori/etiketlerle görüntülenir.
	•	Önkoşul: Arama alanı var. Ne zaman “abdest / namaz / hac” gibi arama yaparsam, o zaman sonuçlar anında filtrelenir.
	•	Önkoşul: Son izlenen video var. Ne zaman kütüphane açılırsa, o zaman “Devam Et” kartında son izlenen video ve kaldığım süre görünür.
	•	Önkoşul: Kilitli içerik. Ne zaman kilitli bir video listelenirse, o zaman kilit nedeni (modül kilidi/plan yetkisi) açıkça gösterilir.

⸻

US-14.2 — Video detayı ve bölümler (chapter list + hızlı aksiyon)

Rol: Danışan
Danışan olarak, videonun bölümlerini ve detaylarını görmek istiyorum; böylece istediğim kısma hızlıca geçebileyim.

Acceptance Criteria
	•	Önkoşul: Video detay ekranındayım. Ne zaman ekran açılırsa, o zaman video başlığı, süre, etiketler ve “İzlemeye Başla” CTA’sı görünür.
	•	Önkoşul: Bölümler tanımlı. Ne zaman “Bölümler” listelenirse, o zaman her bölümün zaman kodu ve başlığı görünür.
	•	Önkoşul: Bölüme tıklama. Ne zaman bir bölüme tıklarsam, o zaman oynatıcı ilgili zamandan başlar.
	•	Önkoşul: Hızlı aksiyon. Ne zaman “Çevrimdışı indir” seçersem, o zaman indirme kuralı (Wi-Fi vb.) gösterilir ve indirme başlar.

⸻

US-14.3 — Video oynatıcı (altyazı + hız + geri/ileri sarma)

Rol: Danışan
Danışan olarak, videoyu akıcı biçimde izlemek ve altyazı/hız gibi ayarları anında değiştirmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Oynatıcıdayım. Ne zaman video oynarsa, o zaman süre çubuğu, kalan süre ve temel kontroller görünür.
	•	Önkoşul: Sarma. Ne zaman 10 sn geri/ileri sarma tuşuna basarsam, o zaman video ilgili süre kadar atlar.
	•	Önkoşul: Altyazı açık. Ne zaman altyazıyı açarsam, o zaman altyazı okunabilir boyutta ve kontrastta görünür.
	•	Önkoşul: Uygulama arka plana gider. Ne zaman kullanıcı PiP’i açtıysa, o zaman PiP ile izlemeye devam eder (cihaz destekliyorsa).

⸻

US-14.4 — Altyazı, hız ve PiP ayarları (erişilebilirlik odaklı)

Rol: Danışan
Danışan olarak, altyazı dilini, oynatma hızını ve PiP kullanımını ayarlamak istiyorum.

Acceptance Criteria
	•	Önkoşul: Ayar ekranındayım. Ne zaman altyazı seçenekleri listelenirse, o zaman TR/EN/Kapalı gibi seçenekler görünür.
	•	Önkoşul: Hız seçimi. Ne zaman 0.75× / 1.0× / 1.25× / 1.5× seçersem, o zaman oynatma hızı anında değişir.
	•	Önkoşul: Erişilebilirlik. Ne zaman “Büyük altyazı / yüksek kontrast” ayarı aktif edilirse, o zaman altyazı stili erişilebilir hale gelir.
	•	Önkoşul: Uygula. Ne zaman “Uygula” dersem, o zaman ayarlar hem bu videoya hem sonraki izlemelere varsayılan olarak uygulanır.

⸻

US-14.5 — Transkript ve not alma (arama + zaman atlama)

Rol: Danışan
Danışan olarak, transkript içinde arama yapıp ilgili ana atlamak ve not almak istiyorum.

Acceptance Criteria
	•	Önkoşul: Transkript mevcut. Ne zaman transkripti açarsam, o zaman zaman kodlu satırlar listelenir.
	•	Önkoşul: Arama. Ne zaman bir kelime ararsam, o zaman eşleşmeler vurgulanır.
	•	Önkoşul: Zaman atlama. Ne zaman bir satıra tıklarsam, o zaman video ilgili saniyeye gider.
	•	Önkoşul: Not alma. Ne zaman not yazıp kaydedersem, o zaman not video + zaman kodu ile kaydedilir ve profilimde bulunur.

⸻

US-14.6 — Çevrimdışı indirme (güvenlik + depolama yönetimi)

Rol: Danışan
Danışan olarak, uygun videoları indirip çevrimdışı izlemek istiyorum.

Acceptance Criteria
	•	Önkoşul: İndirme yetkim var. Ne zaman “İndir” dersem, o zaman indirme başlar ve ilerleme yüzdesi görünür.
	•	Önkoşul: İndirme tamamlandı. Ne zaman indirme biterse, o zaman video “İndirildi” olarak işaretlenir ve çevrimdışı izlenebilir.
	•	Önkoşul: Depolama sınırı var. Ne zaman kullanıcı depolama ekranını açarsa, o zaman kullanılan alan ve limit görünür.
	•	Önkoşul: Güvenlik. Ne zaman video indirildiyse, o zaman cihazda şifreli olarak saklanır ve uygulama dışına paylaşılamaz.

⸻

US-14.7 — Erişim ve kilitleme kuralları (neden kilitli + yönlendirme)

Rol: Danışan
Danışan olarak, bir video kilitliyse nedenini net görmek ve doğru yere yönlendirilmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Video kilitli. Ne zaman kullanıcı kilitli videoyu açarsa, o zaman kilit nedeni (örn. “Modül 2 tamamlanmalı”) görünür.
	•	Önkoşul: Yolculuk kilidi. Ne zaman kilit sebebi yolculuk ilerlemesiyse, o zaman tamamlanması gereken adımlar checklist şeklinde gösterilir.
	•	Önkoşul: Plan yetkisi. Ne zaman kilit sebebi plan/add-on ise, o zaman kullanıcı uygun plana yükseltmeye yönlendirilir (opsiyonel).
	•	Önkoşul: Yönlendirme. Ne zaman “Modüle Git” dersem, o zaman ilgili yolculuk/modül ekranına giderim.

⸻




EPIC 15 — AI Destekli İçerik, Sohbet ve Analiz

Danışanın, AI Pack add-on kapsamında:
	•	okuduğu/izlediği içerik üzerinden AI ile sohbet edebilmesi,
	•	“Benim için günlük 300 kelime içerik oluştur ve gönder” isteğini yönetebilmesi,
	•	otomatik gönderim (ör. her gün 08:00) planlayabilmesi,
	•	yorum ve ilerleme verilerinden AI destekli özet/analiz alabilmesi,
	•	tüm bu özellikleri gizlilik, kontrol ve güvenlik standartlarıyla kullanabilmesi.

Dürüst not: AI özellikleri ürünün kalbinde olacağı için “kontrol ve güven” ekranları şart. Kullanıcı, AI’ı kapatamaz veya verisini yönetemezse premium hissi yerine risk hissi oluşur.

⸻

US-15.1 — İçerikle AI sohbet (bağlamlı sohbet)

Rol: Danışan
Danışan olarak, okuduğum not ya da izlediğim video bağlamında AI ile sohbet etmek istiyorum; böylece konuyu daha iyi anlayıp uygulayabileyim.

Acceptance Criteria
	•	Önkoşul: AI Pack aktif. Ne zaman “AI Sohbet” ekranını açarsam, o zaman sohbet alanı ve aktif bağlam (örn. “Bugünkü Not: Niyet”) görünür.
	•	Önkoşul: Bağlam açık. Ne zaman soru sorarsam, o zaman AI yanıtı seçili içeriğe göre bağlamlı olur.
	•	Önkoşul: Bağlamı kapatmak istiyorum. Ne zaman bağlamı kapatırsam, o zaman AI genel sohbet moduna geçer ve bunu ekranda belirtir.
	•	Önkoşul: AI Pack yok. Ne zaman kullanıcı AI sohbeti açmaya çalışırsa, o zaman “AI Pack gerekli” bilgisi ve satın alma/yükseltme CTA’sı gösterilir.

⸻

US-15.2 — Günlük 300 kelime içerik iste (prompt + üretim)

Rol: Danışan
Danışan olarak, AI’dan benim için günlük 300 kelime içerik üretmesini istemek istiyorum; böylece kişisel hedefime uygun okumayı sürdürebileyim.

Acceptance Criteria
	•	Önkoşul: AI Pack aktif. Ne zaman “Günlük İçerik” ekranını açarsam, o zaman konu girişi ve “İçeriği Oluştur” CTA’sı görünür.
	•	Önkoşul: Konu girdim. Ne zaman “İçeriği Oluştur” dersem, o zaman içerik üretilir ve özetlenmiş önizleme gösterilir.
	•	Önkoşul: İçerik hazır. Ne zaman kullanıcı “Kaydet/Planla” seçerse, o zaman içerik günlük akışa eklenir (uygun gün/saat kuralına göre).
	•	Önkoşul: Hata/limit. Ne zaman üretim başarısız olursa, o zaman kullanıcıya anlaşılır hata + tekrar dene aksiyonu gösterilir.

⸻

US-15.3 — Otomatik içerik gönderimi (sıklık + saat + kural)

Rol: Danışan
Danışan olarak, günlük içeriğin otomatik gönderilmesini planlamak istiyorum; böylece düzenli bir rutin oluşturabileyim.

Acceptance Criteria
	•	Önkoşul: AI Pack aktif. Ne zaman “Planlama” ekranını açarsam, o zaman sıklık (her gün/haftada 3) ve saat seçimi görünür.
	•	Önkoşul: Saat seçtim. Ne zaman planı aktif edersem, o zaman plan “Aktif” durumuna geçer ve bildirim/onay bilgisi gösterilir.
	•	Önkoşul: Program kuralı var. Ne zaman kullanıcı planı aktif ederse, o zaman “içerik 08:00’de aktif olur, yorum teslimi 23:59’a kadar” kuralı açıkça gösterilir.
	•	Önkoşul: Planı kapatmak istiyorum. Ne zaman planı kapatırsam, o zaman otomatik üretim durur ve kullanıcı manuel üretime devam edebilir.

⸻

US-15.4 — AI analiz ve özet (yorumlardan içgörü + öneri)

Rol: Danışan
Danışan olarak, yorumlarımdan AI destekli özet ve içgörü almak istiyorum; böylece gelişimimi net görebileyim.

Acceptance Criteria
	•	Önkoşul: AI Pack aktif ve yorum verisi mevcut. Ne zaman “AI Analiz” ekranını açarsam, o zaman gün/hafta bazlı özet kartları gösterilir.
	•	Önkoşul: Analiz görüntüleniyor. Ne zaman kullanıcı özet kartına girerse, o zaman “tema, güçlü alan, zorlanma noktası, öneri” alanları görünür.
	•	Önkoşul: Yeni öneri. Ne zaman AI yeni bir yolculuk/kur öneriyorsa, o zaman kullanıcı “Asistana Git” gibi net bir CTA ile yönlendirilir.
	•	Önkoşul: Veri yetersiz. Ne zaman analiz için yeterli veri yoksa, o zaman kullanıcıya “daha iyi analiz için şu kadar yorum gerekli” mesajı gösterilir.

⸻

US-15.5 — Gizlilik ve kontrol (indir/sil/devre dışı)

Rol: Danışan
Danışan olarak, AI özelliklerini güvenle kullanmak için sohbet verimi yönetmek ve AI’ı devre dışı bırakmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Gizlilik ekranındayım. Ne zaman ekran açılırsa, o zaman “indir, sil, devre dışı bırak” seçenekleri görünür.
	•	Önkoşul: Sohbet silme. Ne zaman kullanıcı sohbet geçmişini silerse, o zaman silme işlemi onay adımıyla tamamlanır ve geri alınamaz uyarısı gösterilir.
	•	Önkoşul: Veri indirme. Ne zaman kullanıcı “indir” seçerse, o zaman indirilecek veri kapsamı (sohbet/özetler) net açıklanır.
	•	Önkoşul: AI devre dışı. Ne zaman kullanıcı AI’ı devre dışı bırakırsa, o zaman AI özellikleri menüden pasif olur ve kullanıcı tekrar açabilmelidir.

⸻




EPIC 13 — Pekiştirme Oyunları ve Mini Quizler

Danışanın (ve aile/grup paketindeki üyelerin) kısa oyunlarla öğrendiklerini pekiştirmesi; quiz, eşleştirme, hızlı tekrar, yanlışları çalışma, seri/rozet ve çocuk modu ile sürdürülebilir alışkanlık kazanması. Deneyim, plan erişimi ve yolculuk kilitleme kurallarıyla uyumludur.

⸻

US-13.1 — Oyunlar ana ekranı (katalog + arama + günlük hedef)

Rol: Danışan
Danışan olarak, oyunlar ana ekranında önerilen oyunları görüp arama yaparak hızlıca başlatmak istiyorum; böylece gün içinde kısa sürelerle tekrar yapabileyim.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman “Oyunlar” sekmesini açarsam, o zaman oyun kategorileri ve önerilen oyun listesi görünür.
	•	Önkoşul: Günlük hedef tanımlı. Ne zaman ana ekran açılırsa, o zaman “Bugünkü hedef” kartı (örn. 2 oyun) ve ilerleme barı görünür.
	•	Önkoşul: Arama alanı var. Ne zaman arama yaparsam, o zaman liste anında filtrelenir.
	•	Önkoşul: Kilitli oyun. Ne zaman kilitli bir oyun görünürse, o zaman kilit nedeni (ilerleme/plan) açıkça gösterilir.

⸻

US-13.2 — Başlangıç seviye testi (kişiselleştirme)

Rol: Danışan
Danışan olarak, kısa bir seviye testi yapmak istiyorum; böylece oyunların zorluk seviyesi bana göre ayarlansın.

Acceptance Criteria
	•	Önkoşul: İlk kez oyunlara giriyorum. Ne zaman seviye testi önerilirse, o zaman “Teste Başla” CTA’sı gösterilir (atlanabilir).
	•	Önkoşul: Mod seçimi var. Ne zaman “Yetişkin/Çocuk” modu seçersem, o zaman soru dili ve içerik tonu buna göre ayarlanır.
	•	Önkoşul: Test devam ediyor. Ne zaman cevap verirsem, o zaman ilerleme (x/10) görünür ve bir sonraki soruya geçer.
	•	Önkoşul: Test bitti. Ne zaman testi tamamlarsam, o zaman önerilen zorluk seviyesi kaydedilir ve oyunlar buna göre sıralanır.

⸻

US-13.3 — Quiz oturumu (soru + açıklama + ilerleme)

Rol: Danışan
Danışan olarak, kısa bir quiz oturumunda soruları yanıtlamak istiyorum; böylece bilgimi hızlıca ölçebileyim.

Acceptance Criteria
	•	Önkoşul: Quiz başlattım. Ne zaman oturum açılırsa, o zaman soru numarası (örn. 4/10) ve ilerleme barı görünür.
	•	Önkoşul: Şıklar listelendi. Ne zaman bir şık seçersem, o zaman seçimim net biçimde vurgulanır ve “Devam” butonu aktif olur.
	•	Önkoşul: Sonraki soru. Ne zaman “Devam” dersem, o zaman cevap kaydedilir ve sonraki soru açılır.
	•	Önkoşul: Oturum tamamlandı. Ne zaman son soru biterse, o zaman sonuç ekranına yönlendirilirim.

⸻

US-13.4 — Eşleştirme oyunu (hızlı pekiştirme)

Rol: Danışan
Danışan olarak, kavramları anlamlarıyla eşleştirmek istiyorum; böylece kısa sürede tekrar yapabileyim.

Acceptance Criteria
	•	Önkoşul: Eşleştirme başlattım. Ne zaman oyun açılırsa, o zaman süre/ilerleme bilgisi görünür (zamanlı veya zamansız).
	•	Önkoşul: Eşleştirme yaptım. Ne zaman doğru eşleştirirsem, o zaman anlık geri bildirim (örn. +XP) gösterilir.
	•	Önkoşul: Yanlış eşleştirme. Ne zaman yanlış eşleştirirsem, o zaman kısa düzeltme geri bildirimi verilir ve denemem istenir.
	•	Önkoşul: Oyun bitti. Ne zaman süre biter veya tüm eşleşmeler tamamlanırsa, o zaman sonuç ekranına yönlendirilirim.

⸻

US-13.5 — Sonuç ve açıklama (yanlışları çalış)

Rol: Danışan
Danışan olarak, oyun sonunda sonuçlarımı ve açıklamalı geri bildirimi görmek istiyorum; böylece yanlışlarımı öğrenip tekrar edebileyim.

Acceptance Criteria
	•	Önkoşul: Oyun bitti. Ne zaman sonuç ekranı açılırsa, o zaman doğruluk oranı, kazanılan XP ve kısa özet görünür.
	•	Önkoşul: Yanlışlar var. Ne zaman “Yanlışları Çalış” dersem, o zaman yanlış sorular/konular tekrar modunda açılır.
	•	Önkoşul: Açıklamalı geri bildirim. Ne zaman kullanıcı bir sorunun detayını açarsa, o zaman doğru cevap + kısa açıklama gösterilir.
	•	Önkoşul: Devam etmek istiyorum. Ne zaman “Devam (Yeni Oyun)” dersem, o zaman bir sonraki uygun oyun önerilir.

⸻

US-13.6 — Seri ve rozetler (alışkanlık motivasyonu)

Rol: Danışan
Danışan olarak, günlük seri ve rozetlerimi görmek istiyorum; böylece motivasyonum artıp düzenli devam edebileyim.

Acceptance Criteria
	•	Önkoşul: Oyun geçmişim var. Ne zaman seri ekranını açarsam, o zaman haftalık seri görünümü ve “bugün x/y” ilerlemesi görünür.
	•	Önkoşul: Hedef mevcut. Ne zaman kullanıcı hedefe yaklaşırsa, o zaman görsel ilerleme barı güncellenir.
	•	Önkoşul: Rozet kazanımı. Ne zaman bir eşik aşarsam (örn. 7 gün seri), o zaman rozet kazanımı anlık olarak gösterilir.
	•	Önkoşul: Hatırlatıcı. Ne zaman “Hatırlatıcı Ayarla” dersem, o zaman oyun hatırlatıcı ayarlarına yönlendirilirim.

⸻

US-13.7 — Çocuk modu (PIN + güvenli içerik)

Rol: Ebeveyn / Danışan
Ebeveyn olarak, çocuklar için güvenli bir oyun deneyimi açmak istiyorum; böylece sadece çocuklara uygun içerikler görünür.

Acceptance Criteria
	•	Önkoşul: Çocuk modu kapalı. Ne zaman çocuk modunu açmak istersem, o zaman ebeveyn PIN doğrulaması istenir.
	•	Önkoşul: PIN doğru. Ne zaman PIN doğrulanırsa, o zaman çocuk moduna geçilir ve yalnızca çocuk içerikleri görünür.
	•	Önkoşul: Kısıtlar aktif. Ne zaman çocuk modu açıksa, o zaman paylaşım/sohbet gibi riskli alanlar kapalı olur ve süre limiti uygulanır.
	•	Önkoşul: Kapatma. Ne zaman çocuk modunu kapatmak istersem, o zaman tekrar PIN doğrulaması istenir.

⸻



EPIC 16 — Hatırlatıcılar ve Alışkanlık Zinciri

Danışanın; okuma/izleme, yorum teslimi ve pekiştirme aktivitelerini zamanında yapabilmesi için:
	•	bildirim izin akışı,
	•	uygulama içi bildirim merkezi,
	•	kişiselleştirilebilir hatırlatıcılar,
	•	alışkanlık zinciri (streak) takibi,
	•	sessiz saatler (DND) ve bildirim kanalları,
	•	akıllı hatırlatıcı önerileri,
	•	(kontrollü) seri kurtarma
özelliklerini güvenilir ve erişilebilir biçimde kullanması.

Dürüst not: Bildirim sistemi “spam” gibi hissettirmemeli. Bu yüzden “sessiz saatler + kanal yönetimi + nazik dil + kullanıcı kontrolü” production’da olmazsa olmaz.

⸻

US-16.1 — Bildirim izin akışı (neden + seçenekli izin)

Rol: Danışan
Danışan olarak, bildirimleri açıp açmama kararını bilinçli vermek istiyorum; böylece hatırlatmaları kaçırmam ama kontrol bende kalsın.

Acceptance Criteria
	•	Önkoşul: Uygulamayı ilk kez kullanıyorum. Ne zaman bildirim izni adımı gelirse, o zaman “neden gerekli” açıklaması ve örnek kullanım alanları gösterilir.
	•	Önkoşul: İzin vermek istiyorum. Ne zaman “Bildirimleri Aç” dersem, o zaman sistem izin penceresi açılır.
	•	Önkoşul: İzin vermek istemiyorum. Ne zaman “Şimdilik Geç” dersem, o zaman kullanıcı uygulamayı kullanmaya devam eder ve uygulama içi bildirim merkezi yine çalışır.
	•	Önkoşul: İzin reddedildi. Ne zaman kullanıcı daha sonra Ayarlar’dan izin vermek isterse, o zaman sistem ayarlarına yönlendirme sunulur.

⸻

US-16.2 — Bildirim merkezi (uygulama içi gelen kutusu)

Rol: Danışan
Danışan olarak, tüm bildirimleri uygulama içinde bir merkezden görmek istiyorum; böylece kaçırdıklarımı takip edebileyim.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman “Bildirimler” sekmesini açarsam, o zaman okunmamış/okunmuş bildirimler listelenir.
	•	Önkoşul: Filtreleme var. Ne zaman “Tümü / Yolculuk / Önemli / Sistem” filtresini seçersem, o zaman liste buna göre güncellenir.
	•	Önkoşul: Bildirime tıklama. Ne zaman bir bildirime tıklarsam, o zaman ilgili ekrana (örn. Bugünkü Not / Teslim / Oyun) giderim.
	•	Önkoşul: Toplu işlem. Ne zaman “Tümünü okundu işaretle” dersem, o zaman tüm bildirimler okundu olur.

⸻

US-16.3 — Hatırlatıcı ayarları (okuma / yorum / oyun)

Rol: Danışan
Danışan olarak, okuma ve yorum teslimi için hatırlatıcı saatlerini ayarlamak istiyorum; böylece düzenimi koruyabileyim.

Acceptance Criteria
	•	Önkoşul: Hatırlatıcılar ekranındayım. Ne zaman ekran açılırsa, o zaman varsayılan hatırlatmalar (Yeni gün 08:00, okuma, yorum teslim) listelenir.
	•	Önkoşul: Aç/Kapat. Ne zaman bir hatırlatıcıyı kapatırsam, o zaman ilgili bildirimler artık gönderilmez.
	•	Önkoşul: Kişiselleştirme. Ne zaman “Yeni Hatırlatıcı Ekle” dersem, o zaman gün seçimi + birden çok saat + sessiz bildirim seçenekleri sunulur.
	•	Önkoşul: Kural bilgilendirmesi. Ne zaman yorum hatırlatıcıları ayarlanırsa, o zaman “teslim 23:59” kuralı açıkça gösterilir.

⸻

US-16.4 — Alışkanlık zinciri takibi (günlük görevler + seri)

Rol: Danışan
Danışan olarak, alışkanlık zincirimi görüp günlük görevlerimi takip etmek istiyorum; böylece motivasyonumu kaybetmeden devam edebileyim.

Acceptance Criteria
	•	Önkoşul: Zincir ekranındayım. Ne zaman ekran açılırsa, o zaman haftalık takvim görünümü ve seri bilgisi gösterilir.
	•	Önkoşul: Günlük görevler var. Ne zaman ekran açılırsa, o zaman “Bugünkü notu oku / yorum yaz / oyun oyna” gibi görevlerin durumu görünür.
	•	Önkoşul: İlerleme güncellenmesi. Ne zaman bir görevi tamamlarsam, o zaman ilerleme barı ve seri durumu anında güncellenir.
	•	Önkoşul: Öneri. Ne zaman gün bitimine yaklaşılır ve görev eksikse, o zaman nazik bir öneri (örn. “2 dk oyunla seriyi tamamla”) gösterilir.

⸻

US-16.5 — Sessiz saatler ve bildirim kanalları (DND + istisna)

Rol: Danışan
Danışan olarak, belirli saatlerde rahatsız edilmemek ve hangi bildirimlerin nasıl geleceğini seçmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Sessiz saatler ekranındayım. Ne zaman sessiz saatleri aktif edersem, o zaman seçilen aralıkta bildirimler sessiz modda gelir (veya hiç gelmez).
	•	Önkoşul: İstisna listesi var. Ne zaman kullanıcı istisna belirlerse, o zaman (örn. güvenlik uyarısı) sessiz saatlerden muaf olabilir.
	•	Önkoşul: Kanal yönetimi. Ne zaman kanal bazında (Yolculuk/Oyun/AI/Sistem) aç-kapat yaparsam, o zaman ilgili bildirim tipi buna göre davranır.
	•	Önkoşul: Şeffaflık. Ne zaman sessiz saatler açıksa, o zaman kullanıcı bildirim merkezinde yine tüm kayıtları görür.

⸻

US-16.6 — Akıllı hatırlatıcı önerileri (davranışa göre)

Rol: Danışan
Danışan olarak, uygulamanın benim rutinime uygun saat önerisi sunmasını istiyorum; böylece hatırlatıcılar daha isabetli olur.

Acceptance Criteria
	•	Önkoşul: En az 7 günlük kullanım var. Ne zaman kullanıcı “Akıllı Öneriler” ekranını açarsa, o zaman okuma/yorum için önerilen saatler gösterilir.
	•	Önkoşul: Onay şart. Ne zaman “Öneriyi Uygula” dersem, o zaman hatırlatıcı saatlerim önerilen şekilde güncellenir.
	•	Önkoşul: Reddetme. Ne zaman kullanıcı öneriyi reddederse, o zaman mevcut ayarlar korunur ve öneri zorlanmaz.
	•	Önkoşul: Önizleme. Ne zaman öneriler gösterilirse, o zaman bildirim önizlemesi de sunulur.

⸻

US-16.7 — Seri kurtarma kuralı (kontrollü ve şeffaf)

Rol: Danışan
Danışan olarak, nadiren seri bozulduğunda belirli kurallarla serimi koruyabilmek istiyorum; böylece motivasyonum tamamen düşmez.

Acceptance Criteria
	•	Önkoşul: Seri bozuldu. Ne zaman kullanıcı seri kurtarma ekranını açarsa, o zaman bozulan kural (örn. “23:59 teslim kaçırıldı”) net gösterilir.
	•	Önkoşul: Kullanım limiti var. Ne zaman seri kurtarma sunulursa, o zaman “ayda 1 kez” gibi limit ve etkisi (gün “eksik” işaretlenir) açıkça belirtilir.
	•	Önkoşul: Onay. Ne zaman “Seriyi Koru” dersem, o zaman seri korunur ve işlem kayıt altına alınır.
	•	Önkoşul: Vazgeçme. Ne zaman vazgeçersem, o zaman seri sıfırlanır ve kullanıcıya yeni hedef önerisi sunulur.

⸻




EPIC 17 — Birlikte Okuma ve Grup Deneyimi

Danışanın; Aile Paketi veya Grup Paketi kapsamında (veya add-on ile artırılan kişi sayısı ile) bir birlikte okuma grubu oluşturup yönetebilmesi, davetle üye ekleyebilmesi, ortak okuma planı yapabilmesi ve herkesin ilerlemesini şeffaf şekilde görebilmesi.

Dürüst not: “Birlikte okuma” üretimde iyi hissettirmesi için mutlaka kural şeffaflığı (kim kaç kişilik hakka sahip, ne zaman kilit açılır, kim neyi görür) ve moderasyon/sessize alma gerekir.

⸻

US-17.1 — Birlikte okuma ana ekranı (gruplar + katıl/oluştur)

Rol: Danışan
Danışan olarak, birlikte okuma ekranında aktif gruplarımı görmek ve yeni grup oluşturmak/katılmak istiyorum; böylece ailemle veya grubumla aynı materyalde ilerleyebileyim.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman “Topluluk > Birlikte Okuma” ekranını açarsam, o zaman aktif gruplarım listelenir.
	•	Önkoşul: Aktif grup var. Ne zaman bir gruba dokunursam, o zaman grup detayına (plan/ilerleme/sohbet) giderim.
	•	Önkoşul: Yeni grup başlatmak istiyorum. Ne zaman “Birlikte Okuma Oluştur” dersem, o zaman grup oluşturma akışı açılır.
	•	Önkoşul: Davet kodum var. Ne zaman “Davet Kodu ile Katıl” dersem, o zaman kod girişi ve doğrulama ekranı açılır.

⸻

US-17.2 — Birlikte okuma oluşturma (ad + tür + kişi sayısı)

Rol: Danışan (Organizatör)
Danışan olarak, bir birlikte okuma grubu oluşturmak istiyorum; böylece davet ederek üyeleri ekleyebileyim.

Acceptance Criteria
	•	Önkoşul: Planım aktif. Ne zaman grup oluşturma ekranı açılırsa, o zaman “grup adı, grup türü (Aile/Grup), kişi sayısı (mevcut plan)” alanları görünür.
	•	Önkoşul: Plan kişi sayısı limiti var. Ne zaman limit aşılacak bir ayar seçilirse, o zaman sistem ek kişi sayısı add-on’ını önerir veya üye eklemeyi engeller.
	•	Önkoşul: Grup adı girdim. Ne zaman “Grubu Oluştur” dersem, o zaman grup oluşturulur ve davet ekranına yönlendirilirim.

⸻

US-17.3 — Davet etme ve katılma (kod/link + onay)

Rol: Danışan (Organizatör / Katılımcı)
Danışan olarak, birlikte okuma grubuna kod/link ile davet etmek veya davet kodu ile katılmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Organizatörüm. Ne zaman “Davet Et” ekranını açarsam, o zaman davet kodu görünür ve “Kopyala” aksiyonu çalışır.
	•	Önkoşul: Katılım onayı açık. Ne zaman bir kullanıcı kod ile katılmak isterse, o zaman katılım isteği organizatör onayına düşer.
	•	Önkoşul: Katılım onayı kapalı. Ne zaman kullanıcı kodu girerse, o zaman doğrulama sonrası doğrudan gruba eklenir.
	•	Önkoşul: Güvenlik ihtiyacı var. Ne zaman organizatör “Davet kodunu yenile” derse, o zaman eski kod geçersiz olur ve yeni kod üretilir.

⸻

US-17.4 — Okuma planı ve kurallar (materyal + hedef + kilit)

Rol: Danışan (Organizatör)
Danışan olarak, grup için ortak materyal ve okuma planı belirlemek istiyorum; böylece herkes aynı hedefte ilerlesin.

Acceptance Criteria
	•	Önkoşul: Organizatörüm. Ne zaman “Okuma Planı” ekranını açarsam, o zaman materyal seçimi ve günlük hedef (örn. 5 sayfa) alanları görünür.
	•	Önkoşul: Hatırlatıcı ayarı var. Ne zaman plan saati belirlersem, o zaman grup üyeleri için hatırlatma davranışı kuralı gösterilir (kullanıcı kendi cihazında sessize alabilir).
	•	Önkoşul: Kilit kuralı aktif. Ne zaman plan kaydedilirse, o zaman “yolculuk kilidi” ve “grup kilidi” seçenekleri açıkça belirtilir.
	•	Önkoşul: Plan güncellendi. Ne zaman plan değişirse, o zaman tüm üyeler uygulama içi bildirimle bilgilendirilir.

⸻

US-17.5 — Ortak ilerleme haritası ve tablo (şeffaf takip)

Rol: Danışan
Danışan olarak, gruptaki herkesin ilerlemesini harita/tablo üzerinden görmek istiyorum; böylece birlikte kalıp geride kalanlara destek olabileyim.

Acceptance Criteria
	•	Önkoşul: Bir gruptayım. Ne zaman “İlerleme” ekranını açarsam, o zaman harita görünümü ve kişi bazlı ilerleme barları gösterilir.
	•	Önkoşul: Detay görmek istiyorum. Ne zaman “Detaylı Tabloyu Aç” dersem, o zaman kişi bazlı (okunan sayfa/konu) detaylar listelenir.
	•	Önkoşul: Gizlilik sınırı var. Ne zaman üyeler gizlilik ayarı gereği yorum paylaşmıyorsa, o zaman sadece ilerleme yüzdesi gibi sınırlı metrikler gösterilir.

⸻

US-17.6 — Grup sohbeti ve yorum (güvenli iletişim)

Rol: Danışan
Danışan olarak, birlikte okuma grubunda güvenli bir sohbet alanında konuşmak ve motivasyon paylaşmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Gruba üyeyim. Ne zaman “Sohbet” ekranını açarsam, o zaman mesajlar kronolojik listelenir ve yeni mesaj gönderebilirim.
	•	Önkoşul: Rahatsız edilmek istemiyorum. Ne zaman “Sessize al” seçersem, o zaman bu grubun bildirimleri sessize alınır (uygulama içi merkezde kayıt kalır).
	•	Önkoşul: Uygunsuz içerik var. Ne zaman bir mesajı “Şikayet” edersem, o zaman şikayet kaydı alınır ve kullanıcıya süreç bilgisi gösterilir.

⸻

US-17.7 — Üyeler ve kişi sayısı yönetimi (roller + limit)

Rol: Danışan (Organizatör)
Danışan olarak, gruptaki üyeleri ve kişi sayısı limitini yönetmek istiyorum; böylece planıma uygun güvenli bir grup yapısı kurabileyim.

Acceptance Criteria
	•	Önkoşul: Organizatörüm. Ne zaman “Üyeler ve Kurallar” ekranını açarsam, o zaman üye listesi ve roller (Organizatör/Üye) görünür.
	•	Önkoşul: Kişi sayısı limitim var. Ne zaman üye ekleme yapılacaksa, o zaman “mevcut kişi sayısı / limit” gösterilir ve limit aşımı engellenir veya add-on önerilir.
	•	Önkoşul: Üye yönetimi. Ne zaman bir üyeyi kaldırırsam, o zaman üye erişimi iptal olur ve grup geçmişi gizlilik kurallarına göre korunur.
	•	Önkoşul: Grubu bitirmek istiyorum. Ne zaman “Grubu Sonlandır” dersem, o zaman onay adımı istenir ve sonlandırma sonrası grup pasife alınır.

⸻




EPIC 18 — Kitap Kulübü ve Sosyal Okuma

Danışanın; bir “Kitap Kulübü” içinde okuma temposu belirleyip, altını çizme / not alma / sesli okuma / kaldığı yeri işaretleme / alıntı paylaşma / tartışma özellikleriyle sosyal öğrenme yapabilmesi.

Dürüst not: Bu EPIC, EPIC 17 “Birlikte Okuma” ile karışmasın diye kuralı netleştiriyorum:
Birlikte Okuma = ortak plan + ortak ilerleme (aile/grup odaklı).
Kitap Kulübü = sosyal okuma + tartışma + alıntı paylaşımı (topluluk odaklı).
Kulüp üyeleri kendi üyelikleriyle katılır; bu özellik plan kişi sayısı limitini tüketmez.

⸻

US-18.1 — Kitap kulübü ana ekranı (kulüpler + katıl/oluştur)

Rol: Danışan
Danışan olarak, kitap kulüplerimi tek ekranda görüp yeni kulüp oluşturmak veya davet kodu ile katılmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman “Topluluk > Kitap Kulübü” ekranını açarsam, o zaman aktif kulüplerim listelenir.
	•	Önkoşul: Kulübüm var. Ne zaman bir kulübe dokunursam, o zaman kulüp detay ekranı açılır.
	•	Önkoşul: Yeni kulüp istiyorum. Ne zaman “Kulüp Oluştur” dersem, o zaman kulüp oluşturma akışı başlar.
	•	Önkoşul: Davet kodum var. Ne zaman “Davet Kodu ile Katıl” dersem, o zaman kod doğrulama adımı açılır.

⸻

US-18.2 — Kulüp oluşturma (materyal + tempo + gizlilik)

Rol: Danışan (Moderatör/Organizatör)
Danışan olarak, kulüp adı, materyal, tempo ve gizlilik ayarlarıyla kulüp oluşturmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Kulüp oluşturma ekranındayım. Ne zaman ekran açılırsa, o zaman “Kulüp adı, Materyal, Tempo, Gizlilik” alanları görünür.
	•	Önkoşul: Gizlilik seçtim. Ne zaman “Gizli” seçersem, o zaman kulüp sadece davetle katılıma açık olur.
	•	Önkoşul: Oluşturmak istiyorum. Ne zaman “Kulübü Oluştur” dersem, o zaman kulüp oluşturulur ve davet ekranına yönlendirilirim.
	•	Önkoşul: Kulüp kuralları gerekli. Ne zaman kulüp oluşturulursa, o zaman varsayılan davranış kuralları eklenir (moderatör düzenleyebilir).

⸻

US-18.3 — Kulüp detayı ve haftalık hedef (okuma yönlendirme)

Rol: Danışan
Danışan olarak, kulübün bu haftaki hedefini ve tartışma başlığını görüp okumaya hızlı devam etmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Kulüp içindeyim. Ne zaman kulüp detayını açarsam, o zaman “bu hafta hedefi” ve ilerleme görünür.
	•	Önkoşul: Okumaya devam edeceğim. Ne zaman “Okumaya Devam Et” dersem, o zaman okuyucu ilgili sayfadan açılır.
	•	Önkoşul: Tartışma var. Ne zaman tartışma kartına dokunursam, o zaman tartışma ekranı açılır.
	•	Önkoşul: Alıntılar var. Ne zaman “En çok vurgulanan alıntılar” alanını açarsam, o zaman popüler alıntılar listelenir.

⸻

US-18.4 — Okuyucuda altını çizme ve not alma (üretim kalitesi)

Rol: Danışan
Danışan olarak, okuyucuda metnin altını çizmek ve not eklemek istiyorum; böylece kulüp içinde paylaşabileceğim alıntılar oluşturabileyim.

Acceptance Criteria
	•	Önkoşul: Okuyucu açık. Ne zaman metin seçersem, o zaman “Altını Çiz / Not Ekle / Paylaş / Günlüğe Ekle” aksiyonları görünür.
	•	Önkoşul: Altını çizdim. Ne zaman vurguyu kaydedersem, o zaman vurgu “Notlar & Alıntılar” alanına eklenir.
	•	Önkoşul: Not ekledim. Ne zaman notu kaydedersem, o zaman not, ilgili sayfa/konum ile birlikte saklanır.
	•	Önkoşul: Erişilebilirlik. Ne zaman yazı boyutu ayarlanırsa, o zaman okuyucu anında yeniden akış (reflow) yapar.

⸻

US-18.5 — Notlar & alıntılar yönetimi (paylaş / dışa aktar / günlüğe monte)

Rol: Danışan
Danışan olarak, alıntılarımı ve notlarımı tek yerden yönetmek, kulüple paylaşmak ve günlüğüme eklemek istiyorum.

Acceptance Criteria
	•	Önkoşul: Notlar ekranındayım. Ne zaman ekran açılırsa, o zaman alıntılar ve notlar listelenir.
	•	Önkoşul: Paylaşmak istiyorum. Ne zaman “Paylaş (Kulüp)” dersem, o zaman alıntı tartışma akışında kaynak bilgisiyle paylaşılır.
	•	Önkoşul: Günlüğe eklemek istiyorum. Ne zaman “Günlüğe Monte Et” dersem, o zaman alıntı/not günlük girişine eklenir ve geri dönüş (undo) sunulur.
	•	Önkoşul: Kaldığım yeri işaretlemek istiyorum. Ne zaman “Kaldığı yeri işaretle” dersem, o zaman okuma konumu kaydedilir ve “Okumaya Devam Et” bu noktaya döner.

⸻

US-18.6 — Tartışma ve yorumlaşma (güvenli sosyal alan)

Rol: Danışan
Danışan olarak, kulüp tartışmalarına yorum yazmak ve diğer üyelerle güvenli bir ortamda fikir alışverişi yapmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Tartışma ekranındayım. Ne zaman ekran açılırsa, o zaman sabitlenmiş konu ve yorumlar sıralı görünür.
	•	Önkoşul: Mesaj yazdım. Ne zaman “Gönder” dersem, o zaman mesaj yayınlanır ve kullanıcıya iletildi geri bildirimi verilir.
	•	Önkoşul: Uygunsuz içerik var. Ne zaman “Şikayet” edersem, o zaman şikayet kaydı alınır ve mesaj görünürlüğü moderasyon kurallarına göre işlenir.
	•	Önkoşul: Sessize almak istiyorum. Ne zaman kulübü sessize alırsam, o zaman push bildirimleri durur (uygulama içi merkezde kayıt kalır).

⸻

US-18.7 — Kurallar ve moderasyon (gizlilik, roller, güvenlik)

Rol: Danışan (Moderatör)
Moderatör olarak, kulübün kurallarını, gizlilik ayarlarını ve moderasyon işlemlerini yönetmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Moderatörüm. Ne zaman “Kurallar & Moderasyon” ekranını açarsam, o zaman gizlilik, roller ve kurallar bölümleri görünür.
	•	Önkoşul: Kural güncellemesi. Ne zaman kuralları değiştirirsem, o zaman değişiklikler kaydedilir ve kulüpte duyuru olarak görünür.
	•	Önkoşul: Üye yönetimi. Ne zaman “Üyeleri Yönet” dersem, o zaman üye listesi ve moderasyon aksiyonları açılır.
	•	Önkoşul: Kulüp kapatma. Ne zaman “Kulübü Sonlandır” dersem, o zaman onay adımı istenir ve kulüp pasife alınır.

⸻




EPIC 19 — Sanal Dünya ve Oyunlaştırma

Danışanın, okuma/yazma disiplinini eğlenceli ve sürdürülebilir hale getirmek için kendi “Sanal Dünya”sını (bahçe/evren) tamamladığı görevlerle inşa edebilmesi, ödül kazanabilmesi, kişiselleştirebilmesi ve ilerlemesini şeffaf şekilde takip edebilmesi.

Dürüst not: Bu EPIC “oyun” gibi görünebilir; ama asıl hedef davranış sürdürülebilirliği. Bu nedenle üretimde adil ödül, anti-hile, sessiz/odak modu, erişilebilirlik şart.

⸻

US-19.1 — Sanal dünya ana ekranı (bugün + dünya önizleme)

Rol: Danışan
Danışan olarak, sanal dünya ekranında hem dünyamın durumunu hem de bugünkü görevlerimi tek yerden görmek istiyorum; böylece ne yapacağımı anında anlayabileyim.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman “Dünya” sekmesini açarsam, o zaman dünya önizlemesi + bugünkü görev özeti (okuma/yorum/pekiştirme) görünür.
	•	Önkoşul: Görev durumu var. Ne zaman görevler tamamlanırsa, o zaman durumlar anlık güncellenir ve “ödül” çağrısı görünür.
	•	Önkoşul: Ödülüm hazır. Ne zaman “Ödülünü Al & İnşa Et” dersem, o zaman ödül detayına ve inşa akışına yönlendirilirim.

⸻

US-19.2 — Günlük hedef ve görev seçimi (sayfa/kelime)

Rol: Danışan
Danışan olarak, günlük okuma hedefimi (örn. 5 sayfa / 500 kelime / 300 kelime) seçmek istiyorum; böylece günümün yoğunluğuna göre adil hedef belirleyebileyim.

Acceptance Criteria
	•	Önkoşul: Günlük görevler ekranındayım. Ne zaman ekran açılırsa, o zaman hedef seçenekleri ve beklenen süre aralığı görünür.
	•	Önkoşul: Hedefi seçtim. Ne zaman “Hedefi Kaydet” dersem, o zaman hedef bugüne uygulanır ve ana ekrandaki görev özeti güncellenir.
	•	Önkoşul: Yorum teslim kuralı var. Ne zaman hedef ekranındayken, o zaman “yorum teslim saati (23:59)” kuralı açıkça gösterilir.
	•	Önkoşul: Hatırlatıcı aktif. Ne zaman kullanıcı hatırlatıcı saatlerini görür/değiştirirse, o zaman değişiklikler kayıt edilir ve bildirim davranışı buna göre güncellenir.

⸻

US-19.3 — Ödül alma ve inşa etme (yerleştir + önizleme)

Rol: Danışan
Danışan olarak, tamamladığım görevlerin ödülünü alıp dünyama dekor/öğe yerleştirmek istiyorum; böylece ilerlememi somut olarak görebileyim.

Acceptance Criteria
	•	Önkoşul: Ödül hak ettim. Ne zaman ödül ekranını açarsam, o zaman kazanımlar (XP/✨/dekor) şeffaf şekilde listelenir.
	•	Önkoşul: İnşa modundayım. Ne zaman bir öğe seçersem, o zaman önizleme görünür ve “Yerleştir” aksiyonu aktif olur.
	•	Önkoşul: Yerleştirdim. Ne zaman “Yerleştir” dersem, o zaman öğe dünyaya eklenir ve envanter adetleri güncellenir.
	•	Önkoşul: Yanlış yerleştirdim. Ne zaman geri al (undo) dersem, o zaman öğe eski durumuna döner (kural/limitlerle).

⸻

US-19.4 — Dünya kişiselleştirme ve tema (erişilebilirlik dahil)

Rol: Danışan
Danışan olarak, dünyamın temasını/ambiyansını seçmek ve hareket/animasyonları azaltmak istiyorum; böylece kullanım benim için daha konforlu olur.

Acceptance Criteria
	•	Önkoşul: Kişiselleştirme ekranındayım. Ne zaman ekran açılırsa, o zaman tema seçenekleri ve kilitli öğeler (varsa maliyet/koşul) net görünür.
	•	Önkoşul: Tema seçtim. Ne zaman “Kaydet” dersem, o zaman dünya görünümü güncellenir ve kalıcı olur.
	•	Önkoşul: Erişilebilirlik ihtiyacım var. Ne zaman “Hareket azalt” seçeneğini açarsam, o zaman animasyonlar azaltılır ve performans iyileşir.

⸻

US-19.5 — Envanter ve koleksiyonlar (filtre + koleksiyon görünümü)

Rol: Danışan
Danışan olarak, kazandığım tüm öğeleri envanterimde görmek, filtrelemek ve koleksiyon ilerlemesini takip etmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Envanter ekranındayım. Ne zaman ekran açılırsa, o zaman öğeler kategori/etiket ile listelenir ve adet bilgisi gösterilir.
	•	Önkoşul: Filtreleme istiyorum. Ne zaman filtre seçersem, o zaman liste buna göre daralır.
	•	Önkoşul: Koleksiyon var. Ne zaman “Koleksiyonu Gör” dersem, o zaman setler (tamamlanan/eksik) görünür.

⸻

US-19.6 — AI ile hedef önerisi (Add-on kontrollü)

Rol: Danışan
Danışan olarak, rutinime göre AI’dan adil bir günlük hedef önerisi almak istiyorum; böylece kendimi zorlamadan sürdürebileyim.

Acceptance Criteria
	•	Önkoşul: “AI Paket” add-on yok. Ne zaman AI hedef önerisini açarsam, o zaman kilitli durum + add-on açıklaması + “Add-on’ı Gör” CTA’sı gösterilir.
	•	Önkoşul: “AI Paket” add-on var. Ne zaman ekran açılırsa, o zaman son kullanım alışkanlıklarıma dayalı öneri (hedef + saat) görünür.
	•	Önkoşul: Öneriyi kabul ettim. Ne zaman “Öneriyi Uygula” dersem, o zaman hedef ve hatırlatma saatleri güncellenir ve kullanıcıya özet gösterilir.
	•	Önkoşul: Öneriyi reddettim. Ne zaman reddedersem, o zaman mevcut hedefim korunur ve zorlayıcı tekrar gösterim yapılmaz.

⸻

US-19.7 — Dünya kuralları ve şeffaflık (adil ödül + gizlilik)

Rol: Danışan
Danışan olarak, sanal dünyanın ödül ve kayıt kurallarını net görmek istiyorum; böylece sistemin adil olduğuna güvenebileyim.

Acceptance Criteria
	•	Önkoşul: Kurallar ekranındayım. Ne zaman ekran açılırsa, o zaman ödül koşulları, eksik gün davranışı ve gizlilik ilkeleri sade dille listelenir.
	•	Önkoşul: Çocuk modu var. Ne zaman çocuk modu aktifse, o zaman sosyal paylaşımlar kapalı olduğunu sistem açıkça belirtir.
	•	Önkoşul: Veri senkronu var. Ne zaman kullanıcı senkron ayarlarını görüntülerse, o zaman cihaz/bulut davranışı ve izinler net gösterilir.

⸻



EPIC 20 — Modül Sistemi ve Kilitli İlerleme

Danışanın yolculuklarda Coursera benzeri bir modül akışı ile ilerleyebilmesi; bir modülün (veya günün) görevlerini tamamlamadan sonraki aşamaya geçememesi; kilit/önkoşul kurallarını şeffaf görmesi ve gerektiğinde koç/add-on kurallarıyla yönetebilmesi.

Dürüst not: Kilit mekanizması motivasyonu artırır ama yanlış tasarlanırsa “ceza” gibi hissettirir. Bu yüzden üretimde nazik dil, taslak kaydı, hatırlatıcı, kural açıklaması ve kısmi ilerleme görünürlüğü zorunlu.

⸻

US-20.1 — Yolculuk modül listesi (kilitli ilerleme)

Rol: Danışan
Danışan olarak, bir yolculuğun modül listesini ve hangi modüllerin kilitli olduğunu görmek istiyorum; böylece sıradaki adımı net anlayabileyim.

Acceptance Criteria
	•	Önkoşul: Yolculuğa kayıtlıyım. Ne zaman yolculuk ekranını açarsam, o zaman modül listesi durumlarıyla (Tamamlandı/Devam/Kilitli) görünür.
	•	Önkoşul: Kilitli modül var. Ne zaman kilitli bir modüle dokunursam, o zaman kilit sebebi ve önkoşullar gösterilir.
	•	Önkoşul: Devam ettiğim modül var. Ne zaman “Devam” durumundaki modüle dokunursam, o zaman modül detayına geçerim.

⸻

US-20.2 — Modül önkoşulları ve kilit kuralları (şeffaf açıklama)

Rol: Danışan
Danışan olarak, bir modülün açılma şartlarını (önkoşullarını) açıkça görmek istiyorum; böylece neyi tamamlamam gerektiğini bilebileyim.

Acceptance Criteria
	•	Önkoşul: Modül detayındayım. Ne zaman ekran açılırsa, o zaman önkoşullar checklist olarak görünür.
	•	Önkoşul: Kural var. Ne zaman “Açılma kuralı” alanına bakarsam, o zaman (örn. “Yorum teslim edilmeden sonraki gün/modül açılmaz”) net biçimde yazılır.
	•	Önkoşul: Eksik önkoşul var. Ne zaman eksik madde varsa, o zaman kullanıcı ilgili göreve hızlı aksiyonla yönlendirilir (örn. “Yorumu Tamamla”).

⸻

US-20.3 — Görev tamamlama ve gönderim (taslak + zaman kuralı)

Rol: Danışan
Danışan olarak, modül görevlerini tamamlayıp göndermek istiyorum; böylece kilit açılıp bir sonraki aşamaya geçebileyim.

Acceptance Criteria
	•	Önkoşul: Görev ekranındayım. Ne zaman sorular görüntülenirse, o zaman kullanıcı yanıt alanlarını doldurabilir.
	•	Önkoşul: Yazmaya başladım. Ne zaman uygulamadan çıkarsam veya bağlantı kesilirse, o zaman yanıtım otomatik taslak olarak kaydedilir.
	•	Önkoşul: Göndermek istiyorum. Ne zaman “Gönder ve Tamamla” dersem, o zaman gönderim doğrulanır ve görev “tamamlandı” durumuna geçer.
	•	Önkoşul: Deadline var. Ne zaman 23:59 sonrası gönderim denenirse, o zaman kural davranışı (gecikme/ertesi gün açılmama vb.) kullanıcıya net açıklama ile gösterilir (ürün kararına göre).

⸻

US-20.4 — Kilit açıldı ve sonraki adım (08:00 kuralı dahil)

Rol: Danışan
Danışan olarak, görevleri bitirdiğimde yeni aşamanın açıldığını görmek ve devam etmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Tüm önkoşullar tamam. Ne zaman son gerekli görevi tamamlayıp gönderirsem, o zaman “Kilit açıldı” geri bildirimi gösterilir.
	•	Önkoşul: Yeni gün kuralı var. Ne zaman yeni içerik 08:00’de aktive oluyorsa, o zaman kullanıcıya “Yeni not 08:00’de aktif” bilgisi gösterilir.
	•	Önkoşul: Devam edeceğim. Ne zaman “Devam Et” dersem, o zaman sıradaki açık içeriğe yönlendirilirim.

⸻

US-20.5 — Kilitli aşama (eksik görev) ve nazik yönlendirme

Rol: Danışan
Danışan olarak, bir aşama kilitliyse nedenini ve ne yapmam gerektiğini görmek istiyorum; böylece takılmadan ilerleyebileyim.

Acceptance Criteria
	•	Önkoşul: Kilitli içerik açmaya çalıştım. Ne zaman kilitli aşamaya girersem, o zaman kilit nedeni “tek cümle” + detay (kural) ile gösterilir.
	•	Önkoşul: Eksik görev var. Ne zaman “Yoruma Git” dersem, o zaman eksik görevin ekranı açılır.
	•	Önkoşul: Yardım istiyorum. Ne zaman “Hatırlatıcı ayarla” dersem, o zaman ilgili görev için bildirim ayarı açılır.

⸻

US-20.6 — Koç değerlendirmesi ile kilit (Koçluk add-on)

Rol: Danışan
Danışan olarak, “Koçluk Eğitimi” add-on’ım varsa modül sonrası koç değerlendirme sürecini görmek ve kilidin buna göre yönetilmesini istiyorum.

Acceptance Criteria
	•	Önkoşul: Koçluk add-on aktif. Ne zaman modül tamamlanırsa, o zaman “koç yorumu bekleniyor” durumu gösterilebilir (kural seçimine göre).
	•	Önkoşul: Koç onayı gerekiyorsa. Ne zaman onay gelmediyse, o zaman sonraki modül kilitli kalır ve kullanıcıya sebep açıkça gösterilir.
	•	Önkoşul: Alternatif akış var. Ne zaman ürün kuralı “koçsuz devam” izin veriyorsa, o zaman kullanıcıya bu seçenek sunulur ve seçince kilit kaldırılır.
	•	Önkoşul: Yönetmek istiyorum. Ne zaman “Add-on’ı Yönet” dersem, o zaman ilgili plan/add-on yönetim ekranına yönlenirim.

⸻

US-20.7 — İlerleme özeti, kilit geçmişi ve sertifika

Rol: Danışan
Danışan olarak, ilerlememi ve kilit açılma geçmişimi görmek ve yolculuk sonunda sertifikaya erişmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Özet ekranındayım. Ne zaman ekran açılırsa, o zaman modül tamamlama oranı + seri gün bilgisi görünür.
	•	Önkoşul: Şeffaflık önemli. Ne zaman “Kilit geçmişi” bölümüne bakarsam, o zaman önemli zaman damgaları (örn. yorum teslim / 08:00 açılma) listelenir.
	•	Önkoşul: Sertifika koşulu sağlandı. Ne zaman yolculuk tamamlanırsa, o zaman “Sertifikayı Gör” aktif olur.
	•	Önkoşul: Paylaşmak istiyorum. Ne zaman “Özeti Paylaş” dersem, o zaman paylaşım önizlemesi açılır ve kullanıcı kontrolü ile paylaşılır.

⸻



