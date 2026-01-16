EPIC 1 — Dil, Hesap ve Güvenli Oturum

Dürüst not: “Production-ready” seviyede EPIC 1’in en kritik noktası hesap güvenliği + oturum yönetimi + erişim/paywall ile doğru entegrasyon. Bu yüzden aşağıdaki hikâyeler sadece “login/register” değil; aynı zamanda cihaz, güvenlik ve abonelik durumuyla uyumlu olacak şekilde yazıldı.

⸻

US-1.1 — Dil seçimi

Rol: Genel Kullanıcı
Danışan olarak, uygulamayı açtığımda TR/EN/ES dillerinden birini seçebilmek istiyorum, böylece içerikleri tercih ettiğim dilde takip edebileyim.

Acceptance Criteria
	•	Önkoşul: Uygulamayı ilk kez açtım. Ne zaman dil listesinden bir dil seçersem, O zaman seçimim profilime kaydedilir.
	•	Önkoşul: Dili seçtim. Ne zaman uygulama ana ekrana geçerse, O zaman tüm statik metinler seçilen dilde görüntülenir.
	•	Önkoşul: Dilimi değiştirmek istiyorum. Ne zaman Ayarlar > Dil’den yeni bir dil seçersem, O zaman uygulama metinleri anında yeni dile geçer.
	•	Önkoşul: İnternet bağlantım zayıf veya yok. Ne zaman dili değiştirirsem, O zaman dil tercihi cihazda yerel olarak da saklanır ve bağlantı gelince profile senkronlanır.
	•	Önkoşul: Dil değiştirdim. Ne zaman tekrar giriş yaptığımda veya uygulamayı yeniden başlattığımda, O zaman seçtiğim dil otomatik uygulanır.

⸻

US-1.2 — Kayıt olma (E-posta/Telefon + doğrulama)

Rol: Genel Kullanıcı
Danışan olarak, e-posta veya telefon numaram ile kayıt olabilmek istiyorum, böylece hesabımı güvenli şekilde oluşturabileyim.

Acceptance Criteria
	•	Önkoşul: Kayıt ekranındayım. Ne zaman e-posta/telefon bilgisini geçerli formatta girersem, O zaman “Devam” butonu aktif olur.
	•	Önkoşul: Kayıt ekranındayım. Ne zaman geçersiz formatta e-posta/telefon girersem, O zaman alan altında anlaşılır hata mesajı gösterilir ve “Devam” pasif kalır.
	•	Önkoşul: Doğrulama (OTP) ekranındayım. Ne zaman doğru kodu girersem, O zaman hesabım oluşturulur ve uygulamaya giriş yapılır.
	•	Önkoşul: Doğrulama (OTP) ekranındayım. Ne zaman yanlış kod girersem, O zaman “Kod hatalı” mesajı gösterilir ve kalan deneme sayısı kullanıcıya net şekilde iletilir.
	•	Önkoşul: Kodun süresi doldu. Ne zaman kod doğrulaması yapılamazsa, O zaman “Kodun süresi doldu” mesajı ve “Kodu yeniden gönder” aksiyonu gösterilir.
	•	Önkoşul: Çok sık kod istedim. Ne zaman yeniden gönderme sınırına ulaşırsam, O zaman bekleme süresi (cooldown) gösterilir ve süre dolana kadar yeniden gönderme engellenir.
	•	Önkoşul: Girdiğim e-posta/telefon daha önce kayıtlı. Ne zaman kayıt olmaya çalışırsam, O zaman “Bu hesap zaten var” bilgilendirmesi ve “Giriş yap” yönlendirmesi gösterilir.

⸻

US-1.3 — Giriş yapma

Rol: Genel Kullanıcı
Danışan olarak, e-posta/telefon ve şifrem ile giriş yapmak istiyorum, böylece hesabıma erişebileyim.

Acceptance Criteria
	•	Önkoşul: Giriş ekranındayım. Ne zaman doğru bilgilerle giriş yaparsam, O zaman ana sayfaya yönlendirilirim.
	•	Önkoşul: Giriş ekranındayım. Ne zaman hatalı e-posta/telefon veya şifre girersem, O zaman güvenli bir genel hata mesajı gösterilir.
	•	Önkoşul: Üst üste başarısız deneme yaptım. Ne zaman güvenlik limiti aşılırsa, O zaman geçici kilit uygulanır ve kullanıcıya “Bir süre sonra tekrar deneyin veya şifre sıfırlayın” mesajı gösterilir.
	•	Önkoşul: İnternet bağlantım yok. Ne zaman giriş yapmaya çalışırsam, O zaman “Bağlantı yok” mesajı ve tekrar dene aksiyonu gösterilir.
	•	Önkoşul: Giriş yaptım. Ne zaman uygulama yüklenirse, O zaman kullanıcı profili, abonelik durumu ve seat/rol bilgisi (plan sahibi/üye) senkronlanır.

⸻

US-1.4 — Şifre sıfırlama

Rol: Genel Kullanıcı
Danışan olarak, şifremi unuttuğumda şifremi sıfırlayabilmek istiyorum, böylece hesabıma tekrar erişebileyim.

Acceptance Criteria
	•	Önkoşul: Giriş ekranındayım. Ne zaman “Şifremi Unuttum” seçersem, O zaman e-posta/telefon doğrulama akışı başlar.
	•	Önkoşul: Doğrulama ekranındayım. Ne zaman doğru doğrulama kodunu girersem, O zaman yeni şifre belirleme ekranına geçerim.
	•	Önkoşul: Yeni şifre belirleme ekranındayım. Ne zaman şifre politikalarına uygun şifre girersem, O zaman “Kaydet” butonu aktif olur.
	•	Önkoşul: Şifreyi kaydettim. Ne zaman işlem tamamlanırsa, O zaman kullanıcıya başarı mesajı gösterilir ve giriş ekranına yönlendirilir.
	•	Önkoşul: Çok sık sıfırlama talebi yapıyorum. Ne zaman rate-limit’e takılırsam, O zaman bekleme süresi mesajı gösterilir.

⸻

US-1.5 — Oturum yönetimi (Çıkış yapma)

Rol: Genel Kullanıcı
Danışan olarak, hesabımdan çıkış yapabilmek istiyorum, böylece cihazımı başkaları kullanırken hesabım güvende olsun.

Acceptance Criteria
	•	Önkoşul: Uygulamada giriş yapmış durumdayım. Ne zaman Ayarlar > “Çıkış Yap” seçersem, O zaman oturum sonlandırılır ve giriş ekranına yönlendirilirim.
	•	Önkoşul: Çıkış yaptım. Ne zaman uygulamayı tekrar açarsam, O zaman korumalı alanlara erişmek için tekrar giriş yapmam istenir.
	•	Önkoşul: Çıkış yaptım. Ne zaman uygulama yeniden açılırsa, O zaman cihazda tutulan hassas veriler (oturum token’ları) temizlenmiş olur.

⸻

US-1.6 — Oturum süresi ve güvenlik (Session expiry)

Rol: Genel Kullanıcı
Danışan olarak, oturumum güvenli şekilde yönetilsin istiyorum, böylece hesabım kötüye kullanılmasın.

Acceptance Criteria
	•	Önkoşul: Giriş yapmış durumdayım. Ne zaman oturum süresi sunucu tarafından geçersiz kılınırsa, O zaman kullanıcıya “Oturum süreniz doldu” mesajı gösterilir ve tekrar giriş istenir.
	•	Önkoşul: Oturumum geçersizleşti. Ne zaman korumalı bir ekrana gitmek istersem, O zaman otomatik olarak giriş ekranına yönlendirilirim.
	•	Önkoşul: Uygulama arka planda uzun süre kaldı. Ne zaman uygulamaya geri dönersem, O zaman gerekirse hızlı yeniden doğrulama (yeniden giriş) istenir.

⸻

US-1.7 — Abonelik ve rol durumunu oturum açılışında doğrulama

Rol: Genel Kullanıcı
Danışan olarak, giriş yaptıktan sonra abonelik durumumun ve rolümün (plan sahibi/üye) doğru algılanmasını istiyorum, böylece erişimlerim doğru çalışsın.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman ana sayfa yüklenirse, O zaman abonelik durumum (aktif/iptal/dönem sonu) güncellenir.
	•	Önkoşul: Aile/Grup planında üyeyim. Ne zaman uygulamaya girersem, O zaman “Üye” rolüyle yönetim ekranları gizlenir.
	•	Önkoşul: Aile/Grup planının sahibiyim. Ne zaman uygulamaya girersem, O zaman “Plan Sahibi” rolüyle üye/seat yönetimi ekranları görünür.
	•	Önkoşul: Aboneliğim aktif değil. Ne zaman Core içeriklere erişmeye çalışırsam, O zaman plan seçimi paywall ekranına yönlendirilirim.

⸻

EPIC 2 — Ana Sayfa, Rehberlik ve Navigasyon

Bu epik; kullanıcının uygulamayı açtığında ne olduğunu hızlıca anlaması, tek dokunuşla doğru alana gitmesi ve günlük ilerlemesini net görmesi için ana sayfa deneyimini production-ready seviyede tanımlar. (Logo zaten “PST Coaching” metnini içerdiği için UI başlıklarında tekrar edilmez.)

⸻

US-2.1 — “Vicdandan Karaktere” yaklaşımı bilgilendirmesi

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana sayfada “Vicdandan Karaktere” yaklaşımıyla ilgili kısa bir bilgilendirme görmek istiyorum, böylece programın dayandığı yaklaşımı hızlıca anlayabileyim.

Acceptance Criteria
	•	Önkoşul: Ana sayfadayım. Ne zaman ana sayfa yüklenirse, o zaman “Vicdandan Karaktere” bölümünü (başlık + 2–3 cümle özet) görürüm.
	•	Önkoşul: Ana sayfadayım ve bilgilendirme bölümünü görüyorum. Ne zaman “Detayları Gör” aksiyonuna dokunursam, o zaman detay ekranına (uygulama içi sayfa) giderim ve geri dönüşte ana sayfaya kaldığım konumdan dönerim.
	•	Önkoşul: İnternet bağlantım zayıf/yok. Ne zaman ana sayfa açılırsa, o zaman bilgilendirme metni “offline cache” üzerinden gösterilir; cache yoksa anlaşılır bir boş durum metni görüntülenir ve tekrar dene seçeneği sunulur.
	•	Önkoşul: Erişilebilirlik ayarları açık (ekran okuyucu / büyük metin). Ne zaman metin boyutu büyütülürse, o zaman içerik taşmadan/sıkışmadan yeniden akar ve “Detayları Gör” erişilebilir bir buton olarak okunur.
	•	Önkoşul: Kullanıcı dilini değiştirdi. Ne zaman dil değişikliği uygulanırsa, o zaman bu bölümün metinleri seçilen dile anında güncellenir.

⸻

US-2.2 — Ana sayfada Bireysel / Grup / Koçluk Okulu navigasyonu

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana sayfada Bireysel, Grup ve Koçluk Okulu alanlarına net bir navigasyon görmek istiyorum, böylece tek dokunuşla ihtiyacıma uygun alana gidebileyim.

Acceptance Criteria
	•	Önkoşul: Ana sayfadayım. Ne zaman ekran yüklenirse, o zaman Bireysel / Grup / Koçluk Okulu için görünür ve anlaşılır 3 ayrı giriş (kart/sekme) gösterilir.
	•	Önkoşul: Ana sayfadayım. Ne zaman “Bireysel” girişine dokunursam, o zaman Bireysel alan ana ekranına yönlendirilirim.
	•	Önkoşul: Ana sayfadayım. Ne zaman “Grup” girişine dokunursam, o zaman Grup alan ana ekranına yönlendirilirim.
	•	Önkoşul: Ana sayfadayım. Ne zaman “Koçluk Okulu” girişine dokunursam, o zaman Koçluk Okulu ana ekranına yönlendirilirim.
	•	Önkoşul: Kullanıcının aktif aboneliği yok / erişim kısıtlı. Ne zaman bir alana girmeye çalışırsam, o zaman erişim kısıtını açıkça anlatan bir bilgilendirme (paywall/plan seçimi) gösterilir ve geri dönüş kayıpsız olur.
	•	Önkoşul: Ekran okuyucu açık. Ne zaman bu 3 giriş odaklanırsa, o zaman her biri “buton” rolüyle okunur ve hedef ekran adı net şekilde anons edilir.

⸻

US-2.3 — “PST Coaching nedir?” ve “Manevi Koçluk nedir?” bilgi alanları

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana sayfada “PST Coaching nedir?” ve “Manevi Koçluk nedir?” içeriklerini görmek istiyorum, böylece uygulamanın kapsamını ve yaklaşımını daha iyi anlayabileyim.

Acceptance Criteria
	•	Önkoşul: Ana sayfadayım. Ne zaman ana sayfa yüklenirse, o zaman iki ayrı bilgi kartı (PST Coaching / Manevi Koçluk) kısa özet metinle görünür.
	•	Önkoşul: Bilgi kartlarını görüyorum. Ne zaman “Daha Fazla” aksiyonuna dokunursam, o zaman ilgili detay sayfasına giderim (uygulama içi sayfa; webview sadece zorunluysa).
	•	Önkoşul: Detay sayfasındayım. Ne zaman geri dönersem, o zaman ana sayfada önceki scroll konumum korunur.
	•	Önkoşul: Kullanıcı farklı dil seçti. Ne zaman dil değişirse, o zaman tüm bilgi kartları ve detay sayfaları seçilen dile güncellenir.
	•	Önkoşul: İçerik güncellendi. Ne zaman uygulama açılırsa, o zaman bu bilgi içerikleri sürüm kontrollü şekilde sunulur (eski cache varsa sessizce yenilenir).

⸻

US-2.4 — “Bugün ne yapmalıyım?” akıllı yönlendirme kartı

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana sayfada “Bugün ne yapmalıyım?” şeklinde tek bir yönlendirme kartı görmek istiyorum, böylece uygulamada kaybolmadan bir sonraki en doğru adımı atabileyim.

Acceptance Criteria
	•	Önkoşul: Aktif bir yolculuğum var. Ne zaman ana sayfa açılırsa, o zaman kartta “Devam Et” (kaldığım adım) gösterilir ve tek dokunuşla ilgili ekrana giderim.
	•	Önkoşul: Yolculuk adımları kilitli (bir adımı bitirmeden diğerine geçilmiyor). Ne zaman kilitli bir sonraki adıma gitmek istersem, o zaman kart kilit durumunu açıklar ve beni tamamlamam gereken adıma yönlendirir.
	•	Önkoşul: Aktif yolculuğum yok. Ne zaman ana sayfa açılırsa, o zaman kart “Yolculuk Seç” (veya “Asistanla Başla”) CTA’si gösterir.
	•	Önkoşul: Abonelik/erişim kısıtlı. Ne zaman CTA’ya dokunursam, o zaman uygun plan/erişim ekranına yönlendirilirim (kullanıcı geri dönünce ana sayfa state’i korunur).
	•	Önkoşul: Kullanıcı bildirimleri kapalı. Ne zaman kart “Günlük hatırlatıcı kur” önerisi gösterirse, o zaman izin istemeden önce açıklayıcı bir ön-bilgilendirme ekranı sunulur.

⸻

US-2.5 — Ana sayfadan hızlı arama ve keşif

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana sayfadan içerik/program/yolculuk içinde arama yapabilmek istiyorum, böylece istediğim şeye hızlıca ulaşabileyim.

Acceptance Criteria
	•	Önkoşul: Ana sayfadayım. Ne zaman arama alanına dokunursam, o zaman arama ekranı açılır ve klavye odaklanır.
	•	Önkoşul: Arama ekranındayım. Ne zaman en az 2 karakter girersem, o zaman sonuçlar kategori bazlı (Yolculuklar / Programlar / İçerikler) listelenir.
	•	Önkoşul: Sonuçlar listelendi. Ne zaman bir sonuca dokunursam, o zaman ilgili detay sayfası açılır.
	•	Önkoşul: Sonuç bulunamadı. Ne zaman arama sonuçları boşsa, o zaman “Sonuç bulunamadı” boş durumu + önerilen aksiyonlar (filtreyi temizle / popüler içerikler) gösterilir.
	•	Önkoşul: İnternet zayıf/yok. Ne zaman arama yapılırsa, o zaman en azından son görülenler/indirilenler üzerinden yerel sonuç önerisi sunulur; aksi durumda anlaşılır hata ve tekrar dene gösterilir.

⸻

US-2.6 — Ana sayfada erişilebilirlik ve okunabilirlik kontrolleri

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana sayfa ve metin içeriklerini daha rahat tüketebilmek için okunabilirlik ve erişilebilirlik ayarlarının sorunsuz çalışmasını istiyorum.

Acceptance Criteria
	•	Önkoşul: Sistem metin boyutu büyütüldü. Ne zaman ana sayfa görüntülenirse, o zaman kartlar/başlıklar taşmadan yeniden akış düzenine geçer.
	•	Önkoşul: Ekran okuyucu açık. Ne zaman ana sayfadaki ana aksiyonlar (navigasyon kartları, CTA butonları) odaklanırsa, o zaman anlamlı etiketlerle okunur (örn. “Koçluk Okulu, buton”).
	•	Önkoşul: Yüksek kontrast ihtiyacı var. Ne zaman içerik gösterilirse, o zaman metin/zemin kontrastı okunabilir olacak şekilde korunur.
	•	Önkoşul: Kullanıcı hareket azaltma tercihine sahip. Ne zaman animasyonlar çalışacaksa, o zaman “reduce motion” tercihi uygulanır (kritik olmayan animasyonlar azaltılır).

⸻

Açık konuşayım: Üyelik (subscription) modeline geçtiğiniz için “EPIC 2 = ana sayfa”yı sadece içerik tanıtımı gibi kurgulamak yetersiz kalır. Production-ready bir EPIC 2; kullanıcının abonelik durumu + rolü + aktif planı + koltuk (seat) hakkı + add-on’ları ile uyumlu, “bugün ne yapacağım” odaklı bir ana akış olmak zorunda. Aşağıdaki EPIC 2 bu yaklaşımla sıfırdan güncellendi.

⸻

EPIC 2 — Ana Akış (Home), Günlük Odak ve Akıllı Yönlendirme

Amaç: Kullanıcı uygulamayı açtığında 10 saniye içinde:
	1.	Aboneliği/erişimi net olsun,
	2.	“Bugün ne yapacağım?” tek bir güçlü CTA ile çözülsün,
	3.	İlerleme + alışkanlık zinciri + uyarılar erişilebilir ve anlaşılır olsun.

⸻

US-2.1 — Ana Akış ekranında “Bugün” özeti ve tek ana CTA

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana ekranda bugünkü görev/okuma/aktivite özetini ve tek bir “Devam Et” çağrısını görmek istiyorum; böylece kaybolmadan bir sonraki en doğru adıma gidebileyim.

Acceptance Criteria
	•	Önkoşul: Uygulamayı açtım ve oturum geçerli. Ne zaman Ana Akış yüklenirse, o zaman “Bugün” kartında (1) bugünkü hedef, (2) kalan süre/son teslim (23:59), (3) tek ana CTA (“Devam Et”) görünür.
	•	Önkoşul: Aktif bir yolculuğum var. Ne zaman “Devam Et”e dokunursam, o zaman beni doğrudan kaldığım adıma (kilitli akış kurallarına uygun olarak) götürür.
	•	Önkoşul: Aktif yolculuğum yok. Ne zaman “Devam Et”e dokunursam, o zaman “Yolculuk Seç / Asistanla Başla” akışına yönlendirilirim.
	•	Önkoşul: İnternet zayıf/yok. Ne zaman Ana Akış açılırsa, o zaman son bilinen “Bugün” özeti yerel cache’den gösterilir ve “güncelle”/“tekrar dene” sunulur.
	•	Önkoşul: Ekran okuyucu açık. Ne zaman “Devam Et” odaklanırsa, o zaman erişilebilir isim bugünkü hedefi de içerecek şekilde okunur (örn. “Devam Et, Bugün: 300 kelime okuma”).

⸻

US-2.2 — Abonelik durumu ve erişim (Plan + Add-On + Koltuk) rozetleri

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana ekranda aboneliğimin aktif olup olmadığını ve hangi plan/add-on’lara eriştiğimi net görmek istiyorum; böylece neden bazı şeylerin kilitli olduğunu anlayabileyim.

Acceptance Criteria
	•	Önkoşul: Kullanıcı giriş yaptı. Ne zaman Ana Akış yüklenirse, o zaman plan durumu “Aktif / Süresi doldu / Deneme / İptal edildi” gibi net bir rozetle görünür.
	•	Önkoşul: Kullanıcı Aile/Grup planında “koltuk” ile bağlı. Ne zaman Ana Akış yüklenirse, o zaman “Koltuk bağlı” durumu ve plan sahibi bilgisi (isim göstermeden “Plan Sahibi” / “Üye”) rozet olarak gösterilir.
	•	Önkoşul: AI Chat Add-On aktif. Ne zaman Ana Akış açılırsa, o zaman “AI Chat aktif” rozeti görünür; değilse “AI Chat ekle” önerisi rahatsız etmeyecek şekilde alt aksiyon olarak yer alır.
	•	Önkoşul: Erişim kısıtlı bir CTA’ya tıkladım. Ne zaman paywall gösterilirse, o zaman neden kısıtlı olduğu tek cümlede açıklanır (örn. “Bu özellik AI Add-On gerektirir”) ve ilgili satın alma ekranına giderim.
	•	Önkoşul: Kullanıcı öğrenci indirimi uygunsa. Ne zaman plan ekranına yönlendirilirse, o zaman öğrenci indirimi uygulanmış fiyat/etiket net görünür (gizli/sonradan sürpriz yok).

⸻

US-2.3 — Günlük hatırlatıcı ve “bugün 23:59’a kadar gönder” kuralı

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, günlük okuma/yazma için hatırlatıcılar almak istiyorum; böylece yorumumu gün sonuna kadar göndermeyi unutmayayım.

Acceptance Criteria
	•	Önkoşul: Bildirim izni henüz verilmedi. Ne zaman kullanıcı hatırlatıcıyı açmak isterse, o zaman önce “neden izin istiyoruz” ön ekranı gösterilir, sonra sistem izni istenir.
	•	Önkoşul: Hatırlatıcı açık. Ne zaman saat 20:00 (varsayılan) gelirse, o zaman “Bugünkü yorumunu 23:59’a kadar gönderebilirsin” bildirimi gelir.
	•	Önkoşul: Kullanıcı yorumu gönderdi. Ne zaman gün içinde tekrar hatırlatma zamanı gelirse, o zaman aynı gün için gereksiz bildirim gönderilmez.
	•	Önkoşul: Kullanıcı saat dilimini değiştirdi. Ne zaman cihaz saat dilimi değişirse, o zaman hatırlatıcı yeni saat dilimine göre otomatik ayarlanır.
	•	Önkoşul: Kullanıcı bildirimleri kapattı. Ne zaman Ana Akış açılırsa, o zaman “Hatırlatıcı kapalı” durumu yumuşak bir uyarı olarak gösterilir (agresif pop-up olmaz).

⸻

US-2.4 — Alışkanlık zinciri ve günlük süre/katılım göstergesi

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, kaç gündür düzenli devam ettiğimi ve günlük ne kadar vakit ayırdığımı görmek istiyorum; böylece motivasyonum artsın.

Acceptance Criteria
	•	Önkoşul: Kullanıcı en az 1 gün aktivite yaptı. Ne zaman Ana Akış açılırsa, o zaman zincir (streak) sayısı ve bugünün durumu (tamamlandı / bekliyor) görünür.
	•	Önkoşul: Kullanıcı hedefi tamamladı. Ne zaman yorum gönderimi başarılı olursa, o zaman zincir aynı anda güncellenir ve “tamamlandı” durumu yansır.
	•	Önkoşul: Kullanıcı bir günü kaçırdı. Ne zaman Ana Akış açılırsa, o zaman zincir kırılması açıkça gösterilir ve kullanıcıya “bugün yeniden başla” mesajı sunulur (suçlayıcı dil yok).
	•	Önkoşul: Gizlilik hassasiyeti var. Ne zaman süre metrikleri gösterilirse, o zaman kullanıcı Ayarlar’dan süre takibini kapatabilir (opt-out).
	•	Önkoşul: Ekran okuyucu açık. Ne zaman zincir bileşeni odaklanırsa, o zaman “7 gün zincir, bugün tamamlanmadı” gibi anlamlı okunur.

⸻

US-2.5 — Program başlangıç rehberi (kısa video + “nasıl yapılır”)

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, programa başlamadan önce kısa bir tanıtım videosu ve “nasıl okuyup yorum yazacağım” rehberini görmek istiyorum; böylece süreci doğru şekilde uygularım.

Acceptance Criteria
	•	Önkoşul: İlk kez programa başlayacağım. Ne zaman Ana Akış açılırsa, o zaman “Başlamadan önce 2 dk rehber” kartı gösterilir.
	•	Önkoşul: Rehberi açtım. Ne zaman videoyu izlerken çıkarsam, o zaman kaldığım süre hatırlanır ve geri dönünce devam eder.
	•	Önkoşul: İnternet zayıf. Ne zaman video yüklenemezse, o zaman video yerine metin rehberi açılır ve daha sonra tekrar dene sunulur.
	•	Önkoşul: Kullanıcı işitme engelli. Ne zaman video oynarsa, o zaman altyazı aç/kapat seçeneği bulunur ve varsayılan dil kullanıcı diline uyumludur.
	•	Önkoşul: Kullanıcı görme engelli. Ne zaman rehber ekranı okunursa, o zaman tüm bölümler başlık hiyerarşisiyle erişilebilir şekilde sunulur.

⸻

US-2.6 — “Yeni gün 08:00’de açılır” kuralı ve gün reseti

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, yeni gün içeriğinin sabah 08:00’den itibaren aktif olduğunu net görmek istiyorum; böylece içeriklerin neden görünmediğini anlayabileyim.

Acceptance Criteria
	•	Önkoşul: Saat 08:00’den önce. Ne zaman Ana Akış açılırsa, o zaman “Yeni gün 08:00’de açılacak” bilgisi ve geri sayım (opsiyonel) görünür.
	•	Önkoşul: Saat 08:00 oldu. Ne zaman kullanıcı Ana Akış’ta ise, o zaman içerik otomatik yenilenir veya “yenile” aksiyonu sunulur.
	•	Önkoşul: Kullanıcı farklı saat diliminde. Ne zaman 08:00 kuralı uygulanırsa, o zaman cihaz saat dilimine göre doğru hesaplanır.
	•	Önkoşul: Sunucu zamanı ile cihaz zamanı farklı. Ne zaman çakışma tespit edilirse, o zaman sunucu zamanı esas alınır ve kullanıcıya net bilgi verilir.

⸻

US-2.7 — Ana Akışta “Yolculuklarım” kısa özeti

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana ekranda yolculuklarımın kısa özetini görmek istiyorum; böylece nerede olduğumu hızlıca anlayabileyim.

Acceptance Criteria
	•	Önkoşul: En az 1 aktif yolculuğum var. Ne zaman Ana Akış açılırsa, o zaman en fazla 2 aktif yolculuk kartı (ad + ilerleme + durum) gösterilir.
	•	Önkoşul: “Tümünü Gör”e dokundum. Ne zaman bu aksiyonu seçersem, o zaman Yolculuklarım ekranına giderim.
	•	Önkoşul: Yolculuk adımı kilitli. Ne zaman kullanıcı kilitli bir kartı açarsa, o zaman kilidin nedeni (tamamlanması gereken adım) açıkça belirtilir.
	•	Önkoşul: Kullanıcının erişimi yok. Ne zaman kartlar listelenirse, o zaman kilitli içerikler “abonelik gerekir” etiketiyle gösterilir (katalog şeffaflığı).

⸻

US-2.8 — Ana Akış performansı (production)

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, ana ekranın hızlı açılmasını istiyorum; böylece uygulama “ağır” hissettirmez.

Acceptance Criteria
	•	Önkoşul: Uygulama soğuk açılış yaptı. Ne zaman Ana Akış ilk kez render olursa, o zaman iskelet yükleme (skeleton) kullanılır ve kullanıcı 1–2 saniye içinde etkileşebilir bir ekran görür.
	•	Önkoşul: Veriler parça parça geliyor. Ne zaman kritik kartlar hazır olursa, o zaman önce “Bugün” kartı ve CTA gösterilir; diğer kartlar sonradan yüklenebilir.
	•	Önkoşul: Bir servis hatası oluştu. Ne zaman Ana Akış veri çekemezse, o zaman ekran tamamen boş kalmaz; kart bazlı hata/tekrar dene sunulur.

⸻


EPIC 3 — Abonelik, Add-On ve Koltuk Yönetimi

Bu epik; plan satın alma / yükseltme / düşürme / iptal, add-on yönetimi, aile/grup koltuk (seat) yönetimi, öğrenci indirimi doğrulama ve satın alımları geri yükleme süreçlerini kapsar.

Not (dürüst görüş): Üyelik sisteminde en kritik risk “erişim/entitlement” karmaşasıdır. Bu yüzden production’da server-side receipt doğrulama + entitlement cache + restore şarttır. Aksi halde kullanıcı “ödedim ama açılmadı” yaşayabilir.

⸻

US-3.1 — Plan seçimi (Bireysel / Aile / Grup) ve plan karşılaştırması

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, abonelik planlarını karşılaştırıp bana uygun planı seçmek istiyorum; böylece içeriğe erişimimi doğru planla başlatabileyim.

Acceptance Criteria
	•	Önkoşul: Kullanıcı giriş yaptı. Ne zaman Plan Seçimi ekranı açılırsa, o zaman Bireysel/Aile/Grup planları net şekilde listelenir ve her planın kişi limiti (1/5/10) görünür.
	•	Önkoşul: Planları görüntülüyorum. Ne zaman bir planı seçersem, o zaman seçilen plan vurgulanır ve “Devam Et” aktif olur.
	•	Önkoşul: Aile/Grup planını inceliyorum. Ne zaman plan detayına bakarsam, o zaman “koltuk yönetimi ve davet” özelliği açıkça belirtilir.
	•	Önkoşul: İnternet zayıf/yok. Ne zaman plan ekranı açılırsa, o zaman kullanıcıya anlaşılır hata + “tekrar dene” gösterilir; ekran boş kalmaz.
	•	Önkoşul: Erişilebilirlik açık. Ne zaman plan kartlarına odaklanılırsa, o zaman kartlar buton rolünde okunur ve “seçili” durumu ekran okuyucuya bildirilir.

⸻

US-3.2 — Satın alma (abonelik başlatma) ve erişim aktivasyonu

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, seçtiğim planı güvenli şekilde satın alıp hemen erişimin aktif olmasını istiyorum.

Acceptance Criteria
	•	Önkoşul: Bir plan seçtim. Ne zaman “Devam Et”e dokunursam, o zaman platformun abonelik satın alma akışı açılır.
	•	Önkoşul: Satın alma başarılı. Ne zaman satın alma tamamlanırsa, o zaman uygulama server-side doğrulama yapar ve erişim (entitlement) aktiflenir.
	•	Önkoşul: Satın alma başarısız/iptal. Ne zaman kullanıcı satın almayı iptal ederse veya hata olursa, o zaman kullanıcı mevcut ekrana döner ve net hata mesajı görür (tekrar dene seçeneğiyle).
	•	Önkoşul: Doğrulama gecikti. Ne zaman erişim doğrulaması 3 saniyeyi aşarsa, o zaman “Erişimin doğrulanıyor” durumu gösterilir ve tamamlanınca otomatik güncellenir.
	•	Önkoşul: Kullanıcı başka cihazdan giriş yaptı. Ne zaman oturum açarsa, o zaman entitlements senkronize edilir ve doğru plan/rol görünür.

⸻

US-3.3 — Add-On’ları seçme ve yönetme (AI Chat, AI Günlük İçerik, Koçluk Okulu, Ek kullanıcılar)

Rol: Genel Kullanıcı (Plan Sahibi / Danışan)
Danışan olarak, ihtiyaç duyduğum add-on’ları satın alıp yönetmek istiyorum; böylece deneyimi kişiselleştirebileyim.

Acceptance Criteria
	•	Önkoşul: Planım aktif. Ne zaman Add-On ekranını açarsam, o zaman tüm add-on’lar listelenir ve her biri ayrı satırda fiyat + açıklama + durum (aktif/pasif) gösterir.
	•	Önkoşul: Add-On açmak istiyorum. Ne zaman bir add-on’u aktif edersem, o zaman satın alma/doğrulama tamamlanınca erişim aktif olur.
	•	Önkoşul: Add-On kapatmak istiyorum. Ne zaman pasife alırsam, o zaman “dönem sonu” etkisi açıkça belirtilir (platform politikasına uygun).
	•	Önkoşul: Ek kullanıcı add-on’u. Ne zaman Bireysel planda ek kullanıcı seçmeye çalışırsam, o zaman bu add-on’un yalnızca Aile/Grup için olduğu net şekilde gösterilir.
	•	Önkoşul: Kullanıcı rolü Plan Üyesi. Ne zaman add-on yönetimi ekranına girerse, o zaman satın alma/aktifleştirme aksiyonları gizlenir veya “Plan sahibine yönlendir” mesajı gösterilir.

⸻

US-3.4 — Öğrenci indirimi (%50) doğrulama ve uygulanması

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, öğrenci olduğumu doğrulayıp %50 indirimi kullanmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Kullanıcı plan ekranında. Ne zaman “Öğrenciyim (%50)” akışını açarsa, o zaman doğrulama yöntemleri (üniversite e-postası veya belge yükleme) sunulur.
	•	Önkoşul: Kullanıcı doğrulamayı gönderdi. Ne zaman doğrulama başarılı olursa, o zaman indirim etiketi plan ekranında görünür ve fiyatlar indirimli gösterilir.
	•	Önkoşul: Doğrulama reddedildi. Ne zaman reddedilirse, o zaman gerekçe ve yeniden deneme adımı gösterilir.
	•	Önkoşul: Gizlilik. Ne zaman doğrulama ekranı açılırsa, o zaman verilerin ne için kullanıldığı net şekilde açıklanır ve kullanıcı onayı alınır.
	•	Önkoşul: Doğrulama beklemede. Ne zaman sonuç gelmediyse, o zaman kullanıcı “beklemede” durumunu görür ve normal satın alma akışına geri dönebilir.

⸻

US-3.5 — Planı yönetme (yükseltme/düşürme/değiştirme) ve plan detayları

Rol: Plan Sahibi
Plan sahibi olarak, planımı değiştirmek (yükseltmek/düşürmek) istiyorum; böylece kişi limitini ve maliyeti ihtiyaçlarıma göre ayarlayabileyim.

Acceptance Criteria
	•	Önkoşul: Planım aktif. Ne zaman “Planı Yönet” ekranını açarsam, o zaman mevcut plan, yenileme tarihi, aktif add-on’lar ve koltuk doluluğu görünür.
	•	Önkoşul: Plan değiştirmek istiyorum. Ne zaman “Planı Değiştir” seçersem, o zaman yeni plan seçenekleri ve etkileri (koltuk limiti, erişim, fiyat) gösterilir.
	•	Önkoşul: Düşürme (downgrade). Ne zaman mevcut koltuk sayısı yeni limitin üstündeyse, o zaman kullanıcıdan koltuk düşürmesi istenir; tamamlanmadan işlem ilerlemez.
	•	Önkoşul: Platform kuralı. Ne zaman plan değişimi yapılırsa, o zaman platformun abonelik kurallarına uygun şekilde yönlendirme ve bilgilendirme yapılır.
	•	Önkoşul: Senkron problemi. Ne zaman uygulama planı doğrulayamazsa, o zaman “Satın alımları geri yükle” ve “tekrar dene” seçenekleri sunulur.

⸻

US-3.6 — Koltuk (seat) yönetimi: davet, çıkarma, bekleyen davetler

Rol: Plan Sahibi
Plan sahibi olarak, Aile/Grup planındaki üyeleri davet etmek ve yönetmek istiyorum; böylece erişimi kontrol edebileyim.

Acceptance Criteria
	•	Önkoşul: Aile/Grup planım aktif. Ne zaman Koltuk Yönetimi ekranını açarsam, o zaman dolu/boş koltuk sayısı ve üye listesi görünür.
	•	Önkoşul: Üye davet etmek istiyorum. Ne zaman e-posta ile davet gönderirsem, o zaman davet “bekliyor” durumuna düşer ve kullanıcı isterse daveti yenileyebilir/iptal edebilir.
	•	Önkoşul: Üye çıkarmak istiyorum. Ne zaman “Kaldır” aksiyonunu seçersem, o zaman doğrulama (confirm) alınır ve kaldırma sonrası koltuk boşalır.
	•	Önkoşul: Limit dolu. Ne zaman tüm koltuklar doluyken yeni davet atarsam, o zaman “Ek kullanıcı add-on” önerisi sunulur (Aile/Grup için).
	•	Önkoşul: Üye rolü. Ne zaman plan üyesi bu ekrana girerse, o zaman sadece kendi durumunu görür; yönetim aksiyonları kapalıdır.

⸻

US-3.7 — Ödeme geçmişi, makbuzlar ve “Satın alımları geri yükle”

Rol: Genel Kullanıcı (özellikle Plan Sahibi)
Danışan olarak, ödeme geçmişimi ve makbuzlarımı görmek ve satın alımlarımı geri yüklemek istiyorum.

Acceptance Criteria
	•	Önkoşul: Kullanıcı giriş yaptı. Ne zaman “Ödemeler” ekranı açılırsa, o zaman son ödemeler listelenir (tarih, ürün, tutar, durum).
	•	Önkoşul: Satın alma başka cihazda yapıldı. Ne zaman “Satın Alımları Geri Yükle” çalıştırılırsa, o zaman erişimler yeniden doğrulanır ve UI güncellenir.
	•	Önkoşul: Makbuz detayı. Ne zaman bir satıra dokunursam, o zaman makbuz/ürün detayı ekranı açılır (platforma uygun).
	•	Önkoşul: Veri çekilemedi. Ne zaman geçmiş alınamazsa, o zaman kullanıcıya hata + tekrar dene gösterilir.

⸻

US-3.8 — Abonelik iptali, iptal etkileri ve geri dönüş

Rol: Plan Sahibi
Plan sahibi olarak, aboneliğimi iptal edebilmek ve iptalin etkilerini net görmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Planım aktif. Ne zaman “Aboneliği İptal Et”e girersem, o zaman iptal etkileri net şekilde listelenir (erişim dönem sonuna kadar, koltuk/add-on etkileri, ilerlemenin saklanması).
	•	Önkoşul: Kullanıcı iptali onayladı. Ne zaman “İptali Onayla” seçilirse, o zaman platform iptal akışına yönlendirilir ve sonuç UI’da güncellenir.
	•	Önkoşul: Kullanıcı vazgeçti. Ne zaman “Vazgeç” derse, o zaman hiçbir değişiklik yapılmadan bir önceki ekrana döner.
	•	Önkoşul: İptal sonrası giriş. Ne zaman kullanıcı daha sonra tekrar girerse, o zaman plan durumu “iptal edildi (dönem sonuna kadar aktif)” gibi net görünür.

⸻

Tabii — “Koltuk” yerine her yerde “Kişi Sayısı / Kişi Yönetimi / Kontenjan” diline geçerek EPIC 3’ü tamamen güncelledim ve premium ekranları da aynı güncelleme ile yeniden ürettim.

⸻

EPIC 3 — Abonelik, Add-On ve Kişi Yönetimi

Bu epik; plan satın alma / plan değişimi / iptal, add-on yönetimi, Aile/Grup için kişi sayısı (kontenjan) yönetimi, öğrenci indirimi doğrulama ve satın alımları geri yükleme süreçlerini kapsar.

Dürüst not: Üyelik modelinde en büyük problem “ödedim ama açılmadı”dır. Production’da server-side doğrulama + entitlement cache + restore olmadan bu epik eksik kalır.

⸻

US-3.1 — Plan seçimi (Bireysel / Aile / Grup) ve plan karşılaştırması

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, planları karşılaştırıp uygun planı seçmek istiyorum; böylece içeriğe erişimimi doğru planla başlatabileyim.

Acceptance Criteria
	•	Önkoşul: Kullanıcı giriş yaptı. Ne zaman Plan Seçimi ekranı açılırsa, o zaman Bireysel/Aile/Grup planları listelenir ve kişi limiti (1/5/10) net görünür.
	•	Önkoşul: Planları inceliyorum. Ne zaman bir planı seçersem, o zaman seçilen plan vurgulanır ve “Devam Et” aktif olur.
	•	Önkoşul: Aile/Grup planını inceliyorum. Ne zaman plan detayına bakarsam, o zaman “Kişi Yönetimi (davet/kaldır)” özelliği açıkça belirtilir.
	•	Önkoşul: Erişilebilirlik açık. Ne zaman plan kartlarına odaklanılırsa, o zaman “seçili” durumu ekran okuyucuya bildirilir.
	•	Önkoşul: İnternet zayıf/yok. Ne zaman ekran açılırsa, o zaman anlaşılır hata + “Tekrar dene” gösterilir.

⸻

US-3.2 — Satın alma (abonelik başlatma) ve erişim aktivasyonu

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, seçtiğim planı satın alıp erişimimin hemen aktif olmasını istiyorum.

Acceptance Criteria
	•	Önkoşul: Bir plan seçtim. Ne zaman “Devam Et”e dokunursam, o zaman platformun abonelik satın alma akışı açılır.
	•	Önkoşul: Satın alma başarılı. Ne zaman satın alma tamamlanırsa, o zaman server-side doğrulama yapılır ve erişimler (entitlements) aktiflenir.
	•	Önkoşul: Doğrulama gecikti. Ne zaman doğrulama 3 saniyeyi aşarsa, o zaman “Erişimin doğrulanıyor” durumu gösterilir ve tamamlanınca otomatik güncellenir.
	•	Önkoşul: Satın alma başarısız/iptal. Ne zaman iptal/hata olursa, o zaman kullanıcıya net mesaj ve “Tekrar dene” sunulur.
	•	Önkoşul: Kullanıcı başka cihazdan giriş yaptı. Ne zaman giriş yaparsa, o zaman erişimler senkronize edilir ve doğru plan görünür.

⸻

US-3.3 — Add-On’ları seçme ve yönetme

Rol: Plan Sahibi (veya Bireysel kullanıcı)
Danışan olarak, ihtiyaç duyduğum add-on’ları eklemek/çıkarmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Planım aktif. Ne zaman Add-On ekranını açarsam, o zaman her add-on ayrı satırda (açıklama + fiyat + durum) görünür.
	•	Önkoşul: Add-On eklemek istiyorum. Ne zaman bir add-on’u aktifleştirirsem, o zaman satın alma/doğrulama sonrası erişim aktif olur.
	•	Önkoşul: Add-On kapatmak istiyorum. Ne zaman pasife alırsam, o zaman “dönem sonu etkisi” net gösterilir (platform politikasına uygun).
	•	Önkoşul: Ek kişi add-on’u seçiyorum. Ne zaman Bireysel planda “Ek 5 Kişi / Ek 10 Kişi” seçersem, o zaman bunun yalnızca Aile/Grup için geçerli olduğu açıklanır.
	•	Önkoşul: Kullanıcı Plan Üyesi. Ne zaman bu ekrana girerse, o zaman satın alma aksiyonları kapalı olur ve “Plan sahibine başvur” metni gösterilir.

⸻

US-3.4 — Öğrenci indirimi (%50) doğrulama ve uygulanması

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, öğrenci olduğumu doğrulayıp %50 indirimi kullanmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Plan ekranındayım. Ne zaman “Öğrenciyim (%50)” akışını açarsam, o zaman doğrulama yöntemi seçenekleri sunulur (e-posta / belge).
	•	Önkoşul: Doğrulama başarılı. Ne zaman doğrulama onaylanırsa, o zaman plan fiyatlarında indirim etiketi görünür ve indirimli fiyatlar uygulanır.
	•	Önkoşul: Doğrulama reddedildi. Ne zaman reddedilirse, o zaman gerekçe + yeniden deneme adımları gösterilir.
	•	Önkoşul: Gizlilik. Ne zaman ekran açılırsa, o zaman verinin kullanım amacı açıklanır ve onay alınır.
	•	Önkoşul: Doğrulama beklemede. Ne zaman sonuç bekleniyorsa, o zaman kullanıcı durumu görür ve normal satın almaya geri dönebilir.

⸻

US-3.5 — Planı yönetme (değiştir/iptal) ve kişi limiti etkileri

Rol: Plan Sahibi
Plan sahibi olarak, planımı değiştirmek veya iptal etmek istiyorum; böylece maliyeti ve kişi limitini yönetebileyim.

Acceptance Criteria
	•	Önkoşul: Planım aktif. Ne zaman “Planı Yönet” ekranını açarsam, o zaman mevcut plan, yenileme tarihi, aktif add-on’lar ve “kişi doluluğu” görünür.
	•	Önkoşul: Planı düşürmek istiyorum. Ne zaman yeni plan kişi limitim mevcut kişi sayısından düşükse, o zaman kullanıcıdan kişi sayısını azaltması istenir; azaltmadan işlem tamamlanmaz.
	•	Önkoşul: Plan yükseltme. Ne zaman yükseltme yapılırsa, o zaman yeni kişi limiti ve maliyet etkisi net gösterilir.
	•	Önkoşul: Senkron problemi. Ne zaman plan doğrulanamazsa, o zaman “Satın alımları geri yükle” ve “Tekrar dene” sunulur.

⸻

US-3.6 — Kişi Yönetimi: davet, kaldırma, bekleyen davetler (Aile/Grup)

Rol: Plan Sahibi
Plan sahibi olarak, Aile/Grup planındaki kişi sayısını yönetmek istiyorum; böylece erişimi kontrol edebileyim.

Acceptance Criteria
	•	Önkoşul: Aile/Grup planım aktif. Ne zaman Kişi Yönetimi ekranını açarsam, o zaman “3/5 dolu” gibi doluluk görünür ve kişi listesi gösterilir.
	•	Önkoşul: Davet göndermek istiyorum. Ne zaman e-posta daveti gönderirsem, o zaman durum “Davet bekliyor” olur; kullanıcı yenileyebilir/iptal edebilir.
	•	Önkoşul: Kişi kaldırmak istiyorum. Ne zaman “Kaldır” seçersem, o zaman onay ekranı gelir ve kaldırma sonrası kontenjan boşalır.
	•	Önkoşul: Limit dolu. Ne zaman yeni davet atmak istersem, o zaman “Ek 5 Kişi / Ek 10 Kişi” add-on önerisi gösterilir (uygunsa).
	•	Önkoşul: Plan Üyesi rolü. Ne zaman bu ekrana girerse, o zaman yalnızca kendi durumunu görür; yönetim aksiyonları kapalıdır.

⸻

US-3.7 — Ödeme geçmişi, makbuzlar ve “Satın alımları geri yükle”

Rol: Genel Kullanıcı (özellikle Plan Sahibi)
Danışan olarak, ödeme geçmişimi görmek ve satın alımlarımı geri yüklemek istiyorum.

Acceptance Criteria
	•	Önkoşul: Kullanıcı giriş yaptı. Ne zaman Ödemeler ekranı açılırsa, o zaman geçmiş işlemler (tarih/ürün/tutar/durum) listelenir.
	•	Önkoşul: Başka cihazdan satın aldım. Ne zaman “Satın Alımları Geri Yükle” çalıştırılırsa, o zaman erişimler yeniden doğrulanır ve UI güncellenir.
	•	Önkoşul: Veri çekilemedi. Ne zaman geçmiş alınamazsa, o zaman hata + tekrar dene gösterilir.

⸻

US-3.8 — Abonelik iptali, iptal etkileri ve geri dönüş

Rol: Plan Sahibi
Plan sahibi olarak, aboneliğimi iptal edebilmek ve iptalin etkilerini net görmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Planım aktif. Ne zaman iptal ekranını açarsam, o zaman “erişim dönem sonuna kadar”, “kişi limiti dönem sonunda pasifleşir”, “add-on’lar sonlanır” gibi etkiler net listelenir.
	•	Önkoşul: İptali onayladım. Ne zaman onay verirse, o zaman platform iptal akışı tamamlanır ve plan durumu güncellenir.
	•	Önkoşul: Vazgeçtim. Ne zaman vazgeçersem, o zaman hiçbir değişiklik yapılmadan geri dönerim.

⸻



EPIC 4 — Yolculuk Keşfi ve Başlatma

Danışanların uygulamada “nereden başlayacağım?” problemini çözmek için: keşfet alanı, yolculuk belirleme asistanı (AI’li/AI’siz), kısa anket, katalog+filtre, yolculuk detayı ve yolculuğu başlatma akışlarını kapsar.

Dürüst not: Bu epik iyi tasarlanmazsa kullanıcı “çok seçenek → karar verememe” yaşar. Bu yüzden UX’te tek güçlü öneri + alternatifler (1 ana öneri, 2 alternatif) yaklaşımı en güvenlisi.

⸻

US-4.1 — Keşfet alanına giriş ve “başlama” yönlendirmesi

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, Keşfet alanında yolculuklara hızlıca ulaşmak ve nereden başlayacağımı net görmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman Keşfet alanını açarsam, o zaman “Yolculuk Asistanı” birincil CTA olarak görünür.
	•	Önkoşul: Keşfet ekranındayım. Ne zaman “Kataloğa Göz At” seçersem, o zaman katalog ekranına geçerim.
	•	Önkoşul: Erişimim yok/plan pasif. Ne zaman yolculuk başlatma aksiyonuna basarsam, o zaman EPIC 3’teki plan/paywall akışına yönlenirim ve geri dönünce kaldığım bağlam korunur.
	•	Önkoşul: İnternet zayıf. Ne zaman ekran yüklenirken problem olursa, o zaman skeleton + “Tekrar dene” gösterilir.

⸻

US-4.2 — Yolculuk Belirleme Asistanı (AI destekli veya kurallı öneri)

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, birkaç soruyla bana uygun yolculuk önerisi almak istiyorum; böylece doğru yolculuktan başlayabileyim.

Acceptance Criteria
	•	Önkoşul: Keşfet ekranındayım. Ne zaman “Asistanla Başla” dersem, o zaman hedef ve süre gibi kısa sorularla akış başlar.
	•	Önkoşul: Soruları yanıtladım. Ne zaman “Önerileri Gör”e basarsam, o zaman en az 1 ana öneri ve en fazla 2 alternatif öneri listelenir.
	•	Önkoşul: AI Add-On aktif değil. Ne zaman kullanıcı AI’li öneri isterse, o zaman “AI ile öneri” seçeneği kilitli rozetle gösterilir ve plan/add-on akışına yönlendirilebilir.
	•	Önkoşul: AI Add-On aktif. Ne zaman kullanıcı AI’li öneriyi seçerse, o zaman öneri gerekçesi (kısa) ve “Başlat” CTA’sı görünür.
	•	Önkoşul: Erişilebilirlik açık. Ne zaman soru seçenekleri gezilirse, o zaman her seçenek radio/selection mantığıyla okunur ve seçili durum bildirilir.

⸻

US-4.3 — Kısa anket (opsiyonel) ile yolculuk önerisi

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, istersem kısa bir anketi doldurup öneri almak istiyorum.

Acceptance Criteria
	•	Önkoşul: Asistan akışındayım. Ne zaman “Kısa Anketi Aç” dersem, o zaman 2–6 soruluk kısa anket ekranı açılır.
	•	Önkoşul: Anketteyim. Ne zaman “Şimdilik Geç” dersem, o zaman anket zorlamadan kapanır ve kullanıcı asistan/kataloğa geri döner.
	•	Önkoşul: Anketi tamamladım. Ne zaman “Devam Et” dersem, o zaman yanıtlarıma göre öneri üretilir ve gösterilir.
	•	Önkoşul: Kullanıcı dilini değiştirdi. Ne zaman anket ekranı açıkken dil değişirse, o zaman tüm statik metinler seçilen dile döner (cevaplar korunur).

⸻

US-4.4 — Yolculuk kataloğu: listeleme, filtreleme ve sıralama

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, tüm yolculukları katalogda filtreleyip sıralayarak seçmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Katalog ekranındayım. Ne zaman ekran açılırsa, o zaman yolculuklar kartlar halinde listelenir (süre, günlük süre, seviye).
	•	Önkoşul: Filtrelemek istiyorum. Ne zaman filtreyi açarsam, o zaman hedef/süre/seviye gibi filtre seçenekleri sunulur ve uygulayınca liste güncellenir.
	•	Önkoşul: Sıralamak istiyorum. Ne zaman sıralama seçersem, o zaman “Önerilen / Popüler / Yeni” gibi seçeneklerle liste yeniden sıralanır.
	•	Önkoşul: Veri gecikiyor. Ne zaman liste yüklenirken bekleme olursa, o zaman skeleton gösterilir ve kaydırma sırasında UI bozulmaz.

⸻

US-4.5 — Yolculuk detayı: kazanımlar, süre, kilitli ilerleme bilgisi ve CTA

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, bir yolculuğun detayını görüp başlamaya karar vermek istiyorum.

Acceptance Criteria
	•	Önkoşul: Bir yolculuğu seçtim. Ne zaman detaya girersem, o zaman yolculuk süresi, günlük süre aralığı ve “kilitli ilerleme” bilgisi açıkça görünür.
	•	Önkoşul: Detay sayfasındayım. Ne zaman “Yolculuğu Başlat” dersem, o zaman başlatma akışına geçerim.
	•	Önkoşul: Erişim yok. Ne zaman “Yolculuğu Başlat”a basarsam, o zaman plan/paywall akışına yönlenirim ve geri döndüğümde aynı yolculuk detayında kalırım.
	•	Önkoşul: Favorilere eklemek istiyorum. Ne zaman “Favorilere Ekle” dersem, o zaman başarı durumu (toast/snackbar) gösterilir ve kalıcı olarak kaydedilir.

⸻

US-4.6 — Yolculuğu başlatma: günlük hedef seçimi ve zaman kuralları

Rol: Genel Kullanıcı (Danışan)
Danışan olarak, yolculuğu başlatırken günlük hedefimi seçmek ve zaman kurallarını bilmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Yolculuğu başlatıyorum. Ne zaman başlat ekranı açılırsa, o zaman günlük hedef seçenekleri (300/500 kelime, 5 sayfa vb.) sunulur.
	•	Önkoşul: Hedef seçtim. Ne zaman “Başla” dersem, o zaman yolculuk “Yolculuklarım”a eklenir ve ilk gün akışı aktif olur.
	•	Önkoşul: Zaman kuralları. Ne zaman ekran açılırsa, o zaman “Yeni gün 08:00 / son gönderim 23:59” bilgisi görünür.
	•	Önkoşul: Hatırlatıcı kurmak istiyorum. Ne zaman “Hatırlatıcı Kur” dersem, o zaman EPIC 2’deki hatırlatıcı ayarına yönlenirim ve geri dönüşte bağlam korunur.
	•	Önkoşul: Kullanıcı hedefi sonra değiştirmek ister. Ne zaman ayarlardan/hedef ayarından değiştirirse, o zaman yeni hedef ertesi günden itibaren geçerli olacak şekilde uygulanır (mevcut gün bozulmaz).

⸻




EPIC 5 — Günlük Okuma, Yorum ve Teslim

Danışanın yolculuk içinde günün içeriğini okuması / dinlemesi, altını çizip not alması, yönlendirici sorularla yorum yazması ve 23:59’a kadar teslim etmesi; teslim sonrası kilitli ilerleme + 08:00 kapısı ve (varsa) AI analiz/geri bildirim akışlarını kapsar.

Dürüst not: Bu epikte UX’in ana kırılma noktası “teslim baskısı”. Bu yüzden production’da taslak otomatik kaydetme, kelime sayacı, net deadline, teslim önizleme, geri dönüş zorunlu.

⸻

US-5.1 — Günün içeriğini okuma (metin görüntüleyici)

Rol: Danışan
Danışan olarak, günün metnini rahat okuyup ilerlememi görmek istiyorum; böylece günlük hedefimi tamamlayabileyim.

Acceptance Criteria
	•	Önkoşul: Aktif yolculuğum var. Ne zaman “Günün Notu” ekranını açarsam, o zaman gün numarası, hedef (örn. 300 kelime) ve son teslim (23:59) görünür.
	•	Önkoşul: İçerik açıldı. Ne zaman metni okurken kaydırırsam, o zaman okuma ilerleme göstergesi güncellenir.
	•	Önkoşul: İnternet zayıf. Ne zaman içerik yüklenemezse, o zaman skeleton + “Tekrar dene” gösterilir (boş ekran olmaz).
	•	Önkoşul: Erişilebilirlik açık. Ne zaman metin okunursa, o zaman yazı boyutu/kontrast sistem ayarlarına uyum sağlar.

⸻

US-5.2 — Sesli okuma ve metin senkron (erişilebilir okuma)

Rol: Danışan
Danışan olarak, metni sesli dinleyip metinle senkron takip etmek istiyorum; böylece okumaya vakit ayıramadığımda da ilerleyebileyim.

Acceptance Criteria
	•	Önkoşul: Günün içeriği açık. Ne zaman “Sesli Okuma”yı başlatırsam, o zaman oynatma kontrolleri (play/pause, hız) görünür.
	•	Önkoşul: Sesli okuma devam ediyor. Ne zaman metin senkron modu açıksa, o zaman “şu an okunan bölüm” vurgulanır.
	•	Önkoşul: Kullanıcı hız değiştirir. Ne zaman 0.75×/1×/1.25× gibi hız seçerse, o zaman oynatma hızı anında uygulanır.
	•	Önkoşul: Uygulama arka plana alınır. Ne zaman arka plana geçilirse, o zaman platform kurallarına uygun şekilde ses devam eder veya durdurulur ve kullanıcı bilgilendirilir.

⸻

US-5.3 — Altını çizme, not alma ve favorilere ekleme

Rol: Danışan
Danışan olarak, metinde önemli yerlerin altını çizip not almak ve sonra kolayca bulmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Metin ekranındayım. Ne zaman bir metin bölümünü seçersem, o zaman “Vurgu / Not / Kaydet” araçları görünür.
	•	Önkoşul: Not yazdım. Ne zaman “Kaydet” dersem, o zaman vurgu + not kalıcı olarak saklanır.
	•	Önkoşul: Favoriye eklemek istiyorum. Ne zaman “Favorilere ekle” seçersem, o zaman kayıt başarı mesajı gösterilir ve Favoriler’de görünür.
	•	Önkoşul: Erişilebilirlik açık. Ne zaman vurgu/not aksiyonları gezilirse, o zaman butonlar doğru rol/etiketle okunur.

⸻

US-5.4 — Yorum yazma (yönlendirici sorular + taslak)

Rol: Danışan
Danışan olarak, yönlendirici sorularla yorumumu yazmak istiyorum; böylece öğrenimimi ve uygulama niyetimi netleştirebileyim.

Acceptance Criteria
	•	Önkoşul: Günün içeriği açık. Ne zaman “Yorum Yaz” ekranına geçersem, o zaman en az iki soru görünür:
	•	“Bu modülden ne öğrendin?”
	•	“Bunu hayatında nasıl uygulayacaksın?”
	•	Önkoşul: Yazıyorum. Ne zaman metin girersem, o zaman taslak otomatik kaydedilir (uygulamadan çıksam bile kaybolmaz).
	•	Önkoşul: Deadline yaklaşıyor. Ne zaman saat 23:00 sonrası ise, o zaman “son teslim yaklaşıyor” uyarısı (nazik) gösterilir.
	•	Önkoşul: Kelime sayacı. Ne zaman yazı yazarsam, o zaman kelime sayısı görünür ve minimum gerekliyse bilgilendirme yapılır.

⸻

US-5.5 — Önizleme ve teslim etme (23:59 kuralı)

Rol: Danışan
Danışan olarak, yorumumu teslim etmeden önce önizleyip doğru şekilde teslim etmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Yorum yazdım. Ne zaman “Önizle & Teslim Et” dersem, o zaman cevaplarım özet halinde gösterilir.
	•	Önkoşul: Saat 23:59’dan önceyim. Ne zaman “Teslim Et”e basarsam, o zaman yorumum kilitlenir ve teslim durumu başarıyla gösterilir.
	•	Önkoşul: Saat 23:59 geçti. Ne zaman teslim etmeye çalışırsam, o zaman “teslim süresi doldu” mesajı + uygulanacak kural (örn. geç teslim kapalı) net gösterilir.
	•	Önkoşul: Kullanıcı vazgeçti. Ne zaman “Düzenlemeye Dön” dersem, o zaman yorum ekranına geri dönerim ve metin korunur.

⸻

US-5.6 — Kilitli ilerleme ve “08:00 yeni gün kapısı”

Rol: Danışan
Danışan olarak, bugünü bitirdiğimde bir sonraki günün 08:00’de açılmasını ve akışın kilitli olmasını istiyorum; böylece disiplinli ilerleyebileyim.

Acceptance Criteria
	•	Önkoşul: Bugünü teslim ettim. Ne zaman yolculuk ekranına dönersem, o zaman “Bugün tamamlandı” durumu görünür.
	•	Önkoşul: Yeni gün açılmadı. Ne zaman yarınki içeriğe girmeye çalışırsam, o zaman “Yeni içerik 08:00’de açılacak” mesajı ve geri sayım gösterilir.
	•	Önkoşul: Saat 08:00 oldu. Ne zaman uygulama açıkken zaman 08:00’e gelirse, o zaman yeni gün otomatik aktif olur (veya yenile ile aktifleşir).

⸻

US-5.7 — AI analiz ve geri bildirim (Add-On’a bağlı)

Rol: Danışan
Danışan olarak, yorumlarımın AI ile analiz edilip geri bildirim verilmesini istiyorum; böylece gelişimimi daha net takip edebileyim.

Acceptance Criteria
	•	Önkoşul: AI Chat Add-On aktif. Ne zaman teslim sonrası analiz hazır olursa, o zaman “AI Geri Bildirim” kartı ve kısa özet/öneri gösterilir.
	•	Önkoşul: AI Chat Add-On aktif değil. Ne zaman AI analiz alanına girersem, o zaman bu özelliğin Add-On ile açıldığı net anlatılır ve “Add-On’u Aç” CTA’sı görünür.
	•	Önkoşul: Kullanıcı detay ister. Ne zaman “Detaylı Analizi Gör” dersem, o zaman analiz detayı ekranı açılır (net, yargılayıcı olmayan dil).
	•	Önkoşul: Güvenlik. Ne zaman AI geri bildirim gösterilirse, o zaman “tıbbi/psikolojik teşhis değildir” benzeri uygun uyarı yer alır.

⸻




EPIC 6 — Gelişim ve Geri Bildirim

Danışanın yolculuk boyunca ve yolculuk sonunda gelişimini görselleştirmesi, duygusal harita + ilerleme grafikleri ile farkındalık kazanması, program bitiş değerlendirmesi + bitiş testi ile kapanış yapması ve (varsa) AI destekli rapor/öneri almasını kapsar.

Dürüst not: Bu epik “grafik koyduk oldu” değil. Production’da grafiklerin yanında mutlaka yorumlanabilir içgörü (ne anlama geliyor + ne yapmalıyım) vermek gerekiyor; yoksa kullanıcı sadece sayı görüp kopuyor.

⸻

US-6.1 — Gelişim paneli (ilerleme grafikleri + özet metrikler)

Rol: Danışan
Danışan olarak, yolculuktaki ilerlememi grafiklerle ve özet metriklerle görmek istiyorum; böylece gelişimimi takip edebileyim.

Acceptance Criteria
	•	Önkoşul: En az 1 gün teslim yaptım. Ne zaman İlerleme panelini açarsam, o zaman gün/süreç durumu (örn. 19/21), teslim oranı ve alışkanlık zinciri görünür.
	•	Önkoşul: Veri yükleniyor. Ne zaman panel açılırsa, o zaman skeleton gösterilir ve veri gelince grafikler güncellenir.
	•	Önkoşul: Veri yetersiz. Ne zaman veri < 3 gün ise, o zaman grafik yerine “veri birikince gösterilecek” açıklaması sunulur.
	•	Önkoşul: Erişilebilirlik açık. Ne zaman grafik alanına odaklanılırsa, o zaman grafik özet metni (örn. “son 7 gün yükselen trend”) ekran okuyucuya sunulur.

⸻

US-6.2 — Duygusal harita (duygu tonları ve dağılım)

Rol: Danışan
Danışan olarak, yorumlarımdan ve check-in’lerden türetilen duygusal haritayı görmek istiyorum.

Acceptance Criteria
	•	Önkoşul: En az 3 gün teslim var. Ne zaman Duygusal Harita ekranını açarsam, o zaman son 14/30 gün görünümü ve açıklayıcı legend (Sakin/Netlik/Gergin/Yorgun vb.) gösterilir.
	•	Önkoşul: Kullanıcı daha kısa/uzun dönem ister. Ne zaman dönem seçersem (7/14/30 gün), o zaman harita yeniden hesaplanıp güncellenir.
	•	Önkoşul: Kullanıcı güvenlik bilgisi ister. Ne zaman ekrana girersem, o zaman “teşhis değildir” uyarısı açıkça görünür.
	•	Önkoşul: Renk körlüğü / erişilebilirlik. Ne zaman erişilebilir mod açıksa, o zaman renklerin yanında ikon/desen desteği ile ayrım yapılır.

⸻

US-6.3 — Güçlü alanlar ve geliştirilmesi gereken alanlar (önerilerle)

Rol: Danışan
Danışan olarak, güçlü olduğum alanları ve geliştirmem gereken alanları somut önerilerle görmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Yeterli veri var. Ne zaman bu ekran açılırsa, o zaman “Güçlü Alanlar” ve “Gelişim Alanları” ayrı kartlarda listelenir.
	•	Önkoşul: Kullanıcı aksiyon ister. Ne zaman “Önerileri Uygula” dersem, o zaman öneriler görev/alışkanlık önerilerine dönüşür (EPIC 2/5 ile entegre).
	•	Önkoşul: Dil. Ne zaman uygulama dili değişirse, o zaman tüm statik metinler ve etiketler yeni dile geçer.

⸻

US-6.4 — Haftalık özet ve renkli geri bildirimler

Rol: Danışan
Danışan olarak, haftalık özetimi ve renkli geri bildirimleri görmek istiyorum; böylece haftalık gelişimi anlayabileyim.

Acceptance Criteria
	•	Önkoşul: Haftalık veri mevcut. Ne zaman Haftalık Özet ekranını açarsam, o zaman “pozitif trend”, “zorlayan alan” ve “bu hafta öneri” bölümleri görünür.
	•	Önkoşul: Paylaşmak istiyorum. Ne zaman “Raporu Paylaş” seçersem, o zaman paylaşım öncesi gizlilik uyarısı gösterilir ve kullanıcı onayı alınır.
	•	Önkoşul: Veri yoksa. Ne zaman haftalık veri oluşmadıysa, o zaman ekran “bu hafta yeterli veri yok” açıklamasıyla boş kalmaz.

⸻

US-6.5 — Program bitiş değerlendirmesi (anket + kapanış)

Rol: Danışan
Danışan olarak, program bitince kısa bir değerlendirme/anket doldurmak istiyorum; böylece eğitim sürecini tamamlayabileyim.

Acceptance Criteria
	•	Önkoşul: Program son gün tamamlandı. Ne zaman program kapanışına geldiğimde, o zaman değerlendirme akışı otomatik önerilir (kullanıcı “Daha sonra” diyebilir).
	•	Önkoşul: Değerlendirme ekranındayım. Ne zaman soruları yanıtlarsam, o zaman yanıtlar kaydedilir ve geri dönsem bile kaybolmaz.
	•	Önkoşul: Kullanıcı “Daha sonra” der. Ne zaman ertelerse, o zaman hatırlatma kuralı (nazik) uygulanır ve kullanıcı akışı bloke edilmez.
	•	Önkoşul: Veri gizliliği. Ne zaman değerlendirme başlarsa, o zaman verinin kullanım amacı açıkça belirtilir.

⸻

US-6.6 — Bitiş testi sonucu ve yeni öneri (yolculuk/kur)

Rol: Danışan
Danışan olarak, bitiş testini tamamlayıp sonucu ve önerilen yeni yolculuğu görmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Değerlendirme tamamlandı. Ne zaman bitiş testi başlarsa, o zaman test soruları tamamlanır ve sonuç ekranı gösterilir.
	•	Önkoşul: Sonuç ekranındayım. Ne zaman sonuç görüntülenirse, o zaman “başlangıç → bitiş” karşılaştırması ve kısa yorum gösterilir.
	•	Önkoşul: Öneri sunuldu. Ne zaman “Önerilen Yolculuğa Git” dersem, o zaman ilgili yolculuk detayına yönlenirim (EPIC 4).
	•	Önkoşul: Sorumluluk notu. Ne zaman sonuç gösterilirse, o zaman “teşhis değildir” ve gerekirse profesyonel destek yönlendirme notu yer alır.

⸻

US-6.7 — Gelişim raporu (indir/paylaş) ve Add-On kuralı

Rol: Danışan
Danışan olarak, gelişim raporumu indirip paylaşabilmek istiyorum; böylece çıktılarımı saklayabileyim.

Acceptance Criteria
	•	Önkoşul: Rapor üretilebilir durumda. Ne zaman rapor ekranını açarsam, o zaman özet metrikler + ana temalar + öneriler görünür.
	•	Önkoşul: Kullanıcı “PDF İndir” der. Ne zaman indir seçilirse, o zaman rapor PDF olarak üretilir ve cihazın paylaşım/indirme akışına verilir.
	•	Önkoşul: Kullanıcı “Paylaş” der. Ne zaman paylaşılırsa, o zaman paylaşım öncesi gizlilik onayı gösterilir.
	•	Önkoşul: AI rapor kapsamı Add-On’a bağlı. Ne zaman AI Chat Add-On aktif değilse, o zaman detaylı AI rapor bölümü kilitli görünür ve “Add-On’u Aç” CTA’sı gösterilir.

⸻


EPIC 7 — Koç Paneli ve Danışan Takibi

PST Koçlarının; kendilerine atanmış danışanları güvenli şekilde takip etmesi, danışanın hedef/ilerleme/teslim durumunu görmesi, kullanılan içerik-modül-teknik-test bilgisini izlemesi ve modül sonu koç yorumları ile danışana geri bildirim vermesini kapsar.

Dürüst not: Bu epik “çok güçlü” ama aynı zamanda en riskli epiklerden. Production’da danışan onayı, erişim sınırı, denetim kaydı (audit log), veri minimizasyonu şart; aksi halde güven problemi olur.

⸻

US-7.1 — Danışan listesi (atanan danışanlar + durum)

Rol: PST Koçu
Koç olarak, yalnızca bana atanmış danışanları listede görmek ve risk durumlarını hızlıca fark etmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Koç olarak giriş yaptım. Ne zaman “Danışanlar” ekranını açarsam, o zaman yalnızca atanmış danışanlar listelenir.
	•	Önkoşul: Liste ekranda. Ne zaman bir danışan kartı görüntülenirse, o zaman aktif yolculuk, gün sayısı (örn. 19/21), teslim oranı ve durum etiketi (Güncel/Risk/Gecikme) görünür.
	•	Önkoşul: Arama yapmak istiyorum. Ne zaman isim/yolculuk ile ararsam, o zaman sonuçlar anında filtrelenir.
	•	Önkoşul: Veri yükleniyor. Ne zaman liste açılırsa, o zaman skeleton + “Tekrar dene” ile hata yönetimi yapılır.

⸻

US-7.2 — Danışan profili ve hedef görünümü

Rol: PST Koçu
Koç olarak, danışanın hedefini ve mevcut yolculuk bağlamını görmek istiyorum; böylece doğru geri bildirim verebileyim.

Acceptance Criteria
	•	Önkoşul: Danışanı seçtim. Ne zaman danışan profili açılırsa, o zaman hedef cümlesi, aktif yolculuk, gün durumu ve temel metrikler (teslim oranı, zincir) görünür.
	•	Önkoşul: Koç notu alanı var. Ne zaman koç notu görüntülenirse, o zaman yalnızca koçların göreceği şekilde etiketlenir (danışana görünmez).
	•	Önkoşul: İlerleme detayına geçmek istiyorum. Ne zaman “İlerlemeyi Gör” dersem, o zaman teslim geçmişi/ilerleme ekranına yönlenirim.

⸻

US-7.3 — İçerik / modül / teknik / test plan takibi

Rol: PST Koçu
Koç olarak, danışanın hangi içerikleri/teknikleri/testleri kullandığını görmek ve planı güncelleyebilmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Danışan profiline erişimim var. Ne zaman “Plan & İçerik” ekranını açarsam, o zaman kullanılan içerikler (yolculuk, egzersiz, test) listelenir.
	•	Önkoşul: Teknikler alanı var. Ne zaman teknikler görüntülenirse, o zaman teknikler etiket/chip olarak gösterilir ve anlaşılır olur.
	•	Önkoşul: Plan güncellemek istiyorum. Ne zaman “Planı Güncelle” dersem, o zaman değişiklikler kaydedilir ve danışanın akışını bozmayacak şekilde (ertesi gün/sonraki modül) uygulanır.
	•	Önkoşul: Güvenlik. Ne zaman plan güncellenirse, o zaman değişiklik koç kimliği ile loglanır (audit).

⸻

US-7.4 — İlerleme detayı ve teslim geçmişi

Rol: PST Koçu
Koç olarak, danışanın teslim düzenini ve gecikme örüntülerini görmek istiyorum; böylece zamanında müdahale edebileyim.

Acceptance Criteria
	•	Önkoşul: Danışan seçili. Ne zaman “İlerleme” ekranını açarsam, o zaman teslim oranı ve zamanında teslim yüzdesi ayrı gösterilir.
	•	Önkoşul: Teslim geçmişi listesi var. Ne zaman geçmiş görüntülenirse, o zaman “teslim edildi / geç teslim / teslim edilmedi” durumları net etiketlenir.
	•	Önkoşul: Koç bugün yazılan yorumu görmek ister. Ne zaman “Bugünkü Yorumu Oku” derse, o zaman danışanın yorum içeriği erişim iznine göre görüntülenir.

⸻

US-7.5 — Koç yorumu gönderme (modül sonu geri bildirim)

Rol: PST Koçu
Koç olarak, danışana modül sonu geri bildirim göndermek istiyorum; böylece danışanın gelişimini destekleyebileyim.

Acceptance Criteria
	•	Önkoşul: Danışan profili açık. Ne zaman “Koç Yorumu Yaz” dersem, o zaman yorum yazma ekranı açılır.
	•	Önkoşul: Yorum yazıyorum. Ne zaman metin girersem, o zaman taslak kaydetme seçeneği bulunur ve taslak kaybolmaz.
	•	Önkoşul: Göndermek istiyorum. Ne zaman “Gönder”e basarsam, o zaman yorum danışanın görebileceği alana iletilir ve başarı mesajı gösterilir.
	•	Önkoşul: Dil/üslup standardı. Ne zaman yorum gönderilirse, o zaman yargılayıcı olmayan, somut öneri içeren yönlendirici dil kullanılmasına dair UI ipucu/şablon sunulur.

⸻

US-7.6 — Uyarılar ve otomatik kurallar (teslim gelmedi / risk)

Rol: PST Koçu
Koç olarak, teslim gecikmelerini uyarı ekranında görmek ve hızlı aksiyon almak istiyorum.

Acceptance Criteria
	•	Önkoşul: Koç panelindeyim. Ne zaman “Uyarılar” ekranını açarsam, o zaman “gecikme” ve “risk” uyarıları öncelik sırasıyla listelenir.
	•	Önkoşul: Gecikme uyarısı var. Ne zaman “Danışanı Aç” dersem, o zaman ilgili danışan profiline giderim.
	•	Önkoşul: Hatırlatma önerisi var. Ne zaman “Hatırlatma Gönder” dersem, o zaman danışanın bildirim izinleri ve tercihlerine uygun şekilde nazik hatırlatma tetiklenir.
	•	Önkoşul: Otomatik kural seti aktif. Ne zaman 1 gün gecikme olursa, o zaman danışana nazik hatırlatma; 3 gün gecikmede koça uyarı üretilir (danışan isterse kapatabilir).

⸻

US-7.7 — Erişim ve onay yönetimi (gizlilik + denetim)

Rol: PST Koçu
Koç olarak, danışan verilerine yalnızca danışanın onayıyla erişmek ve bu erişimin kayıt altına alınmasını istiyorum.

Acceptance Criteria
	•	Önkoşul: Danışan ataması var. Ne zaman koç danışan verisine erişmek isterse, o zaman danışan onayı gereklidir (aktif değilse erişim açılmaz).
	•	Önkoşul: Onay aktif. Ne zaman erişim ekranı açılırsa, o zaman “onay aktif” durumu ve kapsam (yorum/ilerleme) net görünür.
	•	Önkoşul: Denetim. Ne zaman koç danışan verisine bakarsa veya plan değiştirirse, o zaman işlem koç kimliğiyle loglanır.
	•	Önkoşul: Danışan erişimi kapatır. Ne zaman danışan onayı geri çekerse, o zaman koç erişimi anında kısıtlanır ve koça bilgilendirme yapılır.

⸻



EPIC 8 — Favoriler ve Kişisel Arşiv

Danışanın uygulama içinde kaydettiği vurgular, notlar, bölümler, dersler gibi içerikleri tek yerde toplaması; koleksiyon/etiket ile düzenlemesi; arama/filtreleme yapması; paylaşım & dışa aktarım kontrolüyle gizliliği koruması ve çevrimdışı erişim + senkron deneyimini kapsar.

Dürüst not: Favoriler alanı “nice to have” değil; retention motoru. Production’da mutlaka “geri al”, “koleksiyon”, “paylaşımda gizlilik” ve “kaynağa dön” olmalı.

⸻

US-8.1 — Favoriler ana ekranı (özet + hızlı erişim)

Rol: Danışan
Danışan olarak, kaydettiklerimi Favoriler ekranında toplu görmek istiyorum; böylece en değerli içeriklere hızlı dönebileyim.

Acceptance Criteria
	•	Önkoşul: En az 1 öğe kaydettim. Ne zaman Favoriler ekranını açarsam, o zaman öğeler “Vurgu/Not/Bölüm/Ders” gibi tür etiketiyle listelenir.
	•	Önkoşul: Arama alanı var. Ne zaman arama kutusuna yazarsam, o zaman liste anında filtrelenir.
	•	Önkoşul: Bir öğeye tıklarım. Ne zaman bir favori kartına dokunursam, o zaman favori detayı açılır.
	•	Önkoşul: Veri yok. Ne zaman favorim yoksa, o zaman boş durum ekranı + “İçerikte vurgu yap/nota ekle” CTA’sı görünür.

⸻

US-8.2 — Favori detayı (vurgu + not + kaynağa dön)

Rol: Danışan
Danışan olarak, kaydettiğim vurguyu/notu detaylı görmek ve kaynağına geri gitmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Favori detayı açıldı. Ne zaman ekran yüklenirse, o zaman kaynak (yolculuk/gün/bölüm) net görünür.
	•	Önkoşul: Not eklemek isterim. Ne zaman nota düzenleme yaparsam, o zaman değişiklik otomatik kaydedilir (taslak kaybolmaz).
	•	Önkoşul: Kaynağa dönmek isterim. Ne zaman “Kaynağa Git” dersem, o zaman ilgili içerik ekranında doğru bölüme/konuma yönlenirim.
	•	Önkoşul: Paylaşmak isterim. Ne zaman “Paylaş”a basarsam, o zaman paylaşım öncesi gizlilik adımı gösterilir (US-8.5).

⸻

US-8.3 — Koleksiyonlar (oluşturma, ekleme, yönetme)

Rol: Danışan
Danışan olarak, favorilerimi koleksiyonlara ayırmak istiyorum; böylece benzer içerikleri birlikte yönetebileyim.

Acceptance Criteria
	•	Önkoşul: Favorilerim var. Ne zaman Koleksiyonlar ekranını açarsam, o zaman koleksiyon listesi ve öğe sayıları görünür.
	•	Önkoşul: Yeni koleksiyon isterim. Ne zaman isim girip “Ekle” dersem, o zaman koleksiyon oluşturulur ve listede görünür.
	•	Önkoşul: Bir favoriyi koleksiyona eklerim. Ne zaman “Koleksiyona ekle” seçersem, o zaman favori koleksiyon altında da görünür.
	•	Önkoşul: Silme/yeniden adlandırma. Ne zaman koleksiyon yönetimi yaparsam, o zaman geri alınabilir (undo) bir akış sunulur.

⸻

US-8.4 — Ara & filtrele (tür, etiket, dönem, gizlilik)

Rol: Danışan
Danışan olarak, favoriler içinde hızlı arama ve filtreleme yapmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Favoriler ekranındayım. Ne zaman arama yaparsam, o zaman başlık, not içeriği, etiket ve kaynak alanlarında arama çalışır.
	•	Önkoşul: Filtreleri açarım. Ne zaman filtre seçersem (Vurgu/Not/Bölüm, bu hafta, özel vb.), o zaman sonuç listesi filtrelenir.
	•	Önkoşul: Filtreleri temizlerim. Ne zaman “Temizle” dersem, o zaman tüm filtreler sıfırlanır.

⸻

US-8.5 — Paylaşım ve dışa aktarım (gizlilik kontrollü)

Rol: Danışan
Danışan olarak, favorilerimi paylaşmadan önce kapsamı seçmek ve hassas bilgileri korumak istiyorum.

Acceptance Criteria
	•	Önkoşul: Paylaşım akışındayım. Ne zaman paylaşımı başlatırsam, o zaman “gizlilik uyarısı” ve paylaşım kapsamı seçenekleri gösterilir.
	•	Önkoşul: Kapsam seçerim. Ne zaman “Sadece vurgu / vurgu+not / link” seçersem, o zaman paylaşılacak içerik önizlemesi güncellenir.
	•	Önkoşul: PDF isterim. Ne zaman “PDF’e Aktar” dersem, o zaman PDF üretilir ve sistem paylaşım/indirme akışına verilir.
	•	Önkoşul: İptal ederim. Ne zaman “İptal” dersem, o zaman hiçbir içerik dışarı aktarılmaz.

⸻

US-8.6 — Çevrimdışı erişim ve senkron

Rol: Danışan
Danışan olarak, favorilerimi çevrimdışı da görüntülemek ve bağlantı gelince otomatik senkron olmasını istiyorum.

Acceptance Criteria
	•	Önkoşul: Çevrimdışı mod aktif. Ne zaman indirilen bir koleksiyonu açarsam, o zaman içerikler bağlantı olmadan görüntülenir.
	•	Önkoşul: Bağlantı geri gelir. Ne zaman internet tekrar gelirse, o zaman yeni notlar/vurgular otomatik senkronlanır.
	•	Önkoşul: Depolama sınırı. Ne zaman kullanıcı çok büyük indirme başlatırsa, o zaman depolama uyarısı ve yönetim önerisi gösterilir.

⸻

US-8.7 — Silme ve geri al (undo)

Rol: Danışan
Danışan olarak, bir favoriyi yanlışlıkla sildiğimde geri alabilmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Silme işlemi yapılacak. Ne zaman “Sil” dersem, o zaman silme öncesi net bir açıklama gösterilir (koleksiyondan da kalkacak mı?).
	•	Önkoşul: Silme gerçekleşti. Ne zaman silme tamamlanırsa, o zaman “Geri al” içeren snackbar/toast görünür.
	•	Önkoşul: Geri alırım. Ne zaman “Geri al”a basarsam, o zaman öğe eski yerine geri yüklenir.
	•	Önkoşul: Süre doldu. Ne zaman geri al süresi biterse, o zaman silme kalıcılaşır.

⸻



EPIC 9 — Erişilebilirlik ve Kapsayıcı Deneyim

Görme/işitme/okuma güçlüğü yaşayan kullanıcılar dahil herkesin uygulamayı rahat kullanabilmesi için; ekran okuyucu uyumu, metin büyütme, yüksek kontrast, altyazı + transkript, hareket azaltma ve erişilebilirlik denetimi yeteneklerini kapsar.

Dürüst not: Production’da “erişilebilirlik” ayarı tek başına yetmez; tüm epiklerde bileşenlerin etiketleri, odak sırası, kontrastı ve alternatif içerikleri standardize edilmezse bu epik kağıt üzerinde kalır.

⸻

US-9.1 — Erişilebilirlik ayarları (tek merkez)

Rol: Danışan
Danışan olarak, erişilebilirlik ayarlarını tek bir ekrandan yönetmek istiyorum; böylece uygulamayı ihtiyacıma göre kişiselleştirebileyim.

Acceptance Criteria
	•	Önkoşul: Giriş yaptım. Ne zaman Ayarlar > Erişilebilirlik ekranını açarsam, o zaman metin boyutu, yüksek kontrast, hareket azaltma ve altyazı seçenekleri görünür.
	•	Önkoşul: Bir ayarı değiştiririm. Ne zaman bir toggle değiştirirsem, o zaman ayar anında uygulanır ve profilime kaydedilir.
	•	Önkoşul: İnternet yok. Ne zaman erişilebilirlik ayarını değiştirirsem, o zaman ayar cihazda saklanır ve bağlantı gelince senkronlanır.
	•	Önkoşul: Ekran okuyucu açık. Ne zaman bu ekrana gelirsem, o zaman tüm seçenekler erişilebilir ad ve açıklama ile okunur.

⸻

US-9.2 — Metin boyutu ve büyütme (önizlemeli)

Rol: Danışan
Danışan olarak, uygulama metin boyutunu önizleme ile büyütüp küçültebilmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Erişilebilirlik > Metin Boyutu ekranındayım. Ne zaman kaydırıcıyı değiştirirsem, o zaman örnek metin önizlemesi anında güncellenir.
	•	Önkoşul: Kaydetmek isterim. Ne zaman “Kaydet” dersem, o zaman metin ölçeği tüm ekranlarda uygulanır.
	•	Önkoşul: Varsayılana dönmek isterim. Ne zaman “Varsayılan” dersem, o zaman sistem varsayılanına geri döner.
	•	Önkoşul: Çok büyük değer seçilirse. Ne zaman metin boyutu aşırı büyürse, o zaman UI kırılmadan satır kaydırma ve erişilebilir düzen korunur.

⸻

US-9.3 — Yüksek kontrast ve tema (renk körlüğü desteği dahil)

Rol: Danışan
Danışan olarak, yüksek kontrast ve tema seçenekleriyle okumayı kolaylaştırmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Kontrast ekranındayım. Ne zaman “Yüksek kontrast”ı açarsam, o zaman metin/kenarlık kontrastı artırılır.
	•	Önkoşul: Renk körlüğü desteği açık. Ne zaman grafik/etiket gösterilirse, o zaman sadece renkle değil ikon/desenle de ayrım yapılır.
	•	Önkoşul: Tema seçerim. Ne zaman Açık/Koyu/Sistem seçersem, o zaman tema tüm uygulamaya uygulanır.
	•	Önkoşul: Kaydetmeden çıkış. Ne zaman geri gidersem, o zaman kullanıcıya değişiklikleri kaydetme davranışı tutarlı şekilde sunulur (otomatik kaydet veya açıkça kaydet).

⸻

US-9.4 — Video altyazı ayarları (işitme engeli desteği)

Rol: Danışan
Danışan olarak, videolarda altyazıyı otomatik açmak ve altyazı görünümünü ayarlamak istiyorum.

Acceptance Criteria
	•	Önkoşul: Video oynatıyorum. Ne zaman altyazı açıksa, o zaman altyazı video üzerinde okunaklı görünür (gerekirse arka plan kutusu ile).
	•	Önkoşul: Altyazı dilini seçerim. Ne zaman dil seçersem, o zaman varsa o dil altyazısı kullanılır; yoksa varsayılan dil + uyarı gösterilir.
	•	Önkoşul: Boyut/arka plan ayarı. Ne zaman altyazı boyutunu büyütür veya arka plan kutusunu açarsam, o zaman oynatıcıda anında uygulanır.
	•	Önkoşul: Altyazı dosyası yok. Ne zaman içerikte altyazı yoksa, o zaman kullanıcıya “transkript” alternatifi sunulur.

⸻

US-9.5 — Video transkript (okuyarak takip + kopyala/paylaş kontrolü)

Rol: Danışan
Danışan olarak, videonun transkriptini okuyabilmek istiyorum; böylece sesi açmadan da içeriği takip edebileyim.

Acceptance Criteria
	•	Önkoşul: Video içeriğindeyim. Ne zaman “Transkripti Aç” dersem, o zaman zaman damgalı metin görüntülenir.
	•	Önkoşul: Metni kopyalamak isterim. Ne zaman “Metni kopyala” dersem, o zaman kopyalama yapılır ve gizlilik uyarısı gösterilir.
	•	Önkoşul: Paylaşmak isterim. Ne zaman “Paylaş” dersem, o zaman paylaşım kapsamı ve hassas bilgi uyarısı uygulanır (EPIC 8 ile tutarlı).
	•	Önkoşul: Kaynağa dönmek isterim. Ne zaman “Kaynağa Dön” dersem, o zaman ilgili video ekranına geri dönerim.

⸻

US-9.6 — Ekran okuyucu ve Braille uyumu (OS entegrasyon)

Rol: Danışan
Danışan olarak, ekran okuyucu (VoiceOver/TalkBack) ile uygulamayı sorunsuz kullanmak istiyorum.

Acceptance Criteria
	•	Önkoşul: Ekran okuyucu açık. Ne zaman herhangi bir butona odaklanırsam, o zaman butonun işlevi net bir adla okunur (örn. “Teslim Et”).
	•	Önkoşul: Form alanları var. Ne zaman alanlara gelirse, o zaman label + hata mesajları okunur ve odak doğru sıradadır.
	•	Önkoşul: Grafikler var. Ne zaman grafiğe odaklanılırsa, o zaman “metin özeti” sağlanır (örn. “son 7 gün yükselen trend”).
	•	Önkoşul: Braille ekran bağlı. Ne zaman OS üzerinden Braille aktifse, o zaman uygulama etiketleri Braille’e doğru yansır (uygulama tarafında doğru semantik zorunlu).

⸻

US-9.7 — Erişilebilirlik denetimi (audit/rapor)

Rol: Admin / Ürün Ekibi
Ürün ekibi olarak, erişilebilirlik eksiklerini hızlı tespit eden bir denetim çıktısı görmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Denetim çalıştırılır. Ne zaman audit çalıştırılırsa, o zaman eksik etiketler, düşük kontrastlar ve odak sorunları raporlanır.
	•	Önkoşul: Rapor görüntülenir. Ne zaman rapor ekranı açılırsa, o zaman “uyarılar” ve “iyi durumlar” ayrılmış şekilde listelenir.
	•	Önkoşul: Dışa aktarma. Ne zaman “Raporu Dışa Aktar” seçilirse, o zaman paylaşılabilir format (ör. JSON/PDF) üretilir.
	•	Önkoşul: Denetim geçmişi. Ne zaman tekrar çalıştırılırsa, o zaman önceki raporlarla karşılaştırma yapılabilir.

⸻



EPIC 10 — Birlikte Okuma ve Grup Deneyimi

Danışanların aynı materyali birlikte okuması, ortak bir planla ilerlemesi, her üyenin ilerlemesinin görünmesi, grup içi not/yorum paylaşımı ve plan + Add-On’a göre kişi sayısı limitlerinin yönetilmesini kapsar.

Dürüst not: Bu epik yüksek etki yaratır ama sadece “grup kur + davet” değil; gizlilik, onay, kötüye kullanım önleme, limit yönetimi gibi üretim kalitesi ihtiyaçları nedeniyle kapsamı ağırdır.

⸻

US-10.1 — Birlikte okuma grupları (liste + hızlı erişim)

Rol: Danışan
Danışan olarak, üyesi olduğum birlikte okuma gruplarını tek ekranda görmek istiyorum; böylece ortak okumaya hızlıca dönebileyim.

Acceptance Criteria
	•	Önkoşul: Uygulamada giriş yaptım. Ne zaman “Birlikte Okuma” ekranını açarsam, o zaman üyesi olduğum gruplar listelenir.
	•	Önkoşul: Gruplar listelendi. Ne zaman bir grup kartı görüntülenirse, o zaman materyal adı, gün/ilerleme (örn. 6/14), günlük hedef ve kişi sayısı görünür.
	•	Önkoşul: Arama alanı var. Ne zaman grup adı veya materyal ile ararsam, o zaman liste anında filtrelenir.
	•	Önkoşul: Grup seçerim. Ne zaman bir gruba dokunursam, o zaman grup detay akışına girerim.

⸻

US-10.2 — Grup oluşturma (materyal + kurallar + kilitleme)

Rol: Danışan (Grup Yöneticisi)
Danışan olarak, yeni bir birlikte okuma grubu oluşturmak istiyorum; böylece aile/grup üyeleriyle aynı materyali planlı şekilde takip edebileyim.

Acceptance Criteria
	•	Önkoşul: Planım grup oluşturmaya uygun (Aile/Grup). Ne zaman “Grup Oluştur” dersem, o zaman grup adı + materyal seçimi ekranı açılır.
	•	Önkoşul: Materyal seçtim. Ne zaman kural ekranı açılırsa, o zaman “kilitleme” (bitirmeden sonraki aşama açılmaz), “teslim 23:59” ve “yeni gün 08:00” kuralları net görünür.
	•	Önkoşul: Plan limitim var. Ne zaman grup oluşturma tamamlanacaksa, o zaman kişi sayısı limiti (plan + add-on) kontrol edilir ve uygun değilse oluşturma engellenir.
	•	Önkoşul: Oluşturma başarılı. Ne zaman “Grubu Oluştur” dersem, o zaman grup oluşur ve davet adımına yönlenirim.

⸻

US-10.3 — Üye davet etme (bağlantı/e-posta + katılım onayı)

Rol: Danışan (Grup Yöneticisi)
Danışan olarak, gruba yeni üye davet etmek istiyorum; böylece birlikte okumayı başlatabilirim.

Acceptance Criteria
	•	Önkoşul: Grup yöneticisiyim. Ne zaman “Üye Davet Et” ekranını açarsam, o zaman davet bağlantısı ve (opsiyonel) e-posta ile davet seçenekleri görünür.
	•	Önkoşul: Katılım onayı açık. Ne zaman yeni üye davet edilirse, o zaman üye katılımı yönetici onayına bağlı olur (varsayılan: açık).
	•	Önkoşul: Limit dolu. Ne zaman kişi sayısı limiti dolmuşsa, o zaman davet gönderme engellenir ve ilgili Add-On önerilir.
	•	Önkoşul: Davet gönderildi. Ne zaman davet tamamlanırsa, o zaman davetin durumu (beklemede/kabul/ret) görüntülenir.

⸻

US-10.4 — Ortak plan ve kurallar (hedef + teslim + üyeler)

Rol: Danışan (Üye)
Danışan olarak, grubun ortak planını görmek istiyorum; böylece aynı hedefe göre ilerleyebilirim.

Acceptance Criteria
	•	Önkoşul: Grup içindeyim. Ne zaman “Ortak Plan” ekranını açarsam, o zaman materyal, günlük hedef (örn. 5 sayfa / 300 kelime) ve teslim saati görünür.
	•	Önkoşul: Üye listesi var. Ne zaman üyeler görüntülenirse, o zaman her üyenin durumu (güncel/gecikme) anlaşılır etiketle gösterilir.
	•	Önkoşul: Kurallar kilitli. Ne zaman bir üye bitirmeden sonraki aşamaya geçmek isterse, o zaman sistem geçişi engeller ve nedeni açıkça gösterir.
	•	Önkoşul: Yönetici planı değiştirir. Ne zaman “Planı Düzenle” yapılırsa, o zaman değişiklikler tüm üyelerde tutarlı şekilde uygulanır ve bilgilendirme yapılır.

⸻

US-10.5 — Ortak ilerleme haritası (görselleştirme + gizlilik)

Rol: Danışan
Danışan olarak, gruptaki ilerlemeyi “harita” gibi bir görünümde görmek istiyorum; böylece motivasyonum artsın ve kim nerede görebileyim.

Acceptance Criteria
	•	Önkoşul: Grup içindeyim. Ne zaman “Ortak İlerleme” ekranını açarsam, o zaman gün/hafta ilerlemesi görsel şekilde gösterilir.
	•	Önkoşul: Üyelerin ilerlemesi var. Ne zaman harita görüntülenirse, o zaman kişi bazlı veya anonim (yüzde bazlı) görünüm tercihi sunulur.
	•	Önkoşul: Gizlilik tercihi değişir. Ne zaman bir üye “anonim görün” seçerse, o zaman diğer üyeler yalnızca toplu ilerleme görür.
	•	Önkoşul: Veri yok/eksik. Ne zaman senkron gecikirse, o zaman son güncellenme zamanı gösterilir.

⸻

US-10.6 — Grup notları (ortak not/vurgu paylaşımı)

Rol: Danışan
Danışan olarak, grupta kısa notlar paylaşmak istiyorum; böylece birbirimizi motive edebilelim.

Acceptance Criteria
	•	Önkoşul: Grup içindeyim. Ne zaman “Grup Notları” ekranını açarsam, o zaman zaman sıralı notlar görünür.
	•	Önkoşul: Not yazmak isterim. Ne zaman not girip “Gönder” dersem, o zaman not grupta görünür ve kaybolmaz.
	•	Önkoşul: Bildirimler açık. Ne zaman yeni not gelirse, o zaman kullanıcının bildirim tercihlerine göre bilgilendirme yapılır.
	•	Önkoşul: Kötüye kullanım. Ne zaman raporlama yapılırsa, o zaman içerik raporlanır ve moderasyon iş akışı tetiklenir.

⸻

US-10.7 — Kişi sayısı limitleri (plan + Add-On yönetimi)

Rol: Danışan (Grup Yöneticisi)
Danışan olarak, grubun kişi sayısı limitini planıma ve Add-On’lara göre yönetmek istiyorum.

Acceptance Criteria
	•	Önkoşul: Grup yöneticisiyim. Ne zaman “Kişi Sayısı” ekranını açarsam, o zaman mevcut kişi sayısı ve maksimum limit (plan + Add-On) net görünür.
	•	Önkoşul: Limit dolu. Ne zaman yeni kişi eklenmek istenirse, o zaman sistem engeller ve ilgili Add-On’u önerir.
	•	Önkoşul: Add-On aktif olur. Ne zaman Add-On satın alınır/aktiflenirse, o zaman maksimum kişi sayısı anında güncellenir.
	•	Önkoşul: Rol yönetimi. Ne zaman bir üyeye rol atanırsa (Yönetici/Üye), o zaman yetkiler rol bazında uygulanır.

⸻



