A. Subscription Model


Abonelik Planları (Ad-On ile birlikte)

Alan
Bireysel
Aile
Grup
Kullanici Sayisi (Seat)
1
5
10
Hedef Kullanıcı
Tek kullanıcı
Aile / hane
Ekip / topluluk
Dahil İçerik (Core Kütüphane)
✅ Ad-On olmayan tüm içeriklere erişim
✅ Ad-On olmayan tüm içeriklere erişim
✅ Ad-On olmayan tüm içeriklere erişim
Yolculuk İlerleme Kilidi
✅ Var (içerik kuralı)
✅ Var (içerik kuralı)
✅ Var (içerik kuralı)
Üye / Davet Yönetimi
❌
✅ Davet et + üye yönet
✅ Davet et + üye yönet
Öğrenci İndirimi
✅ Uygun (%50)
❌ Uygun değil
❌ Uygun değil
Öğrenci İndirimi Politikası (v1): Yalnızca Bireysel plan için %50 indirim + öğrenci doğrulaması + belirli aralıklarla yeniden doğrulama (örn. yılda 1).
 
Abonelik planları icin satin alinabilir Ad-on lar.

Ad-Ons
Bireysel
Aile
Grup
AI Paketi
✅
✅
✅
Koçluk Eğitimi
✅
✅
✅
Ek Kisi +5
❌
✅
✅
Ek Kisi +10
❌
✅
✅
Eklentiler (Ad-On’lar)

Alan
AI Paketi
Koçluk Eğitimi
Ek Koltuk +5
Ek Koltuk +10
Ne sağlar
İçerikle AI sohbet + günlük içerik üretimi/gönderimi + AI analiz/geri bildirim (tek paket)
Koçluk Okulu programlarına erişim (dönem/cohort dahil) + ilgili program akışları
Mevcut plana +5 kisi ekler
Mevcut plana +10 kisi ekler
Hangi planlarda
Bireysel / Aile / Grup
Bireysel / Aile / Grup
Aile / Grup
Aile / Grup
Fiyatlandirma
Kisi başı
Hesap başı (önerilen)
Plan bazlı eklenti
Plan bazlı eklenti
Not
Aile/Grup’ta maliyeti adil dağıtır, suistimali azaltır
“Özel/premium” algısını korur
 
 
 
 
 
 
 
 



B. PstCoaching Mobile App EPIC, User Stories and Acceptance Criterias





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





