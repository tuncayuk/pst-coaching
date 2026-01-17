A. Request 

Sen Principal Urun yoneticisisin. PST Mobile app icin EPIC, User Stories, Acceptance Criterias icerigini asagida paylasiyorum. Bu nedenle asadaki her bir EPIC, User Stories, Acceptance Criterias icerigini dogru sekilde yeniden yapilandir lutfen ve yeni yapida tum icerigi tekrar paylas. 

Ama paylasirken asagidaki kurallara uymani istiyorum. Ama senin onerdigin baska iyilestirmeleri de yapabilirsin.


a. Paylasacagin icerigi bir inline tablo olarak paylas. Her epic icin ayri tablo olmali. Tabloda Epic, Phase, Role, User Story Name, User Story Description, Acceptance Criteria, Navigation Steps kolonlari olmali. Tum icerigi turkce olarak paylasmalisin. 

b. Bazi iceriklerde tekrar olabilir ve bunlari duzeltmelisin. 

c. Sen Principal Product Manager'sin cok gelismis kullanici dostu bir urun gelistirme amacin var. 

d.  Tum iceriler (moduller, atolyeler, e-kitaplar v.s.) yine mobil uygulamamiz ile kullaniciya sunulacak. Bunu dikkate mutlaka almalisin.

e. Epikler 2 fazdan olussur. Ilk fazda uygulama icin cok onemli olan ozellikleri tamamlayip Production'a gecmek istiyoruz. Daha sonra adim adim diger ozellikler eklenecek ve uygulamay gelismeye devam edecek.

f. Mobil Uygulamada tab barda nelerin olacagini belirlemelisin.

g. Ekranlara nasil erisilecegini belirlemelisin. Navigation Steps sutununda ( Ana Sayfa -> XX -> YY ) gibi erisim adimlari olmali. Bu sayede her bir ekrana nasil erisilecegini anlamis olalim.

h. Acceptance Criteria formati  asagida paylastigima benzer olmali.
	

i. User Story Description aciklayici olmali.

j. Sonucu PSTCoachingSpec.md olarak uretmelisin.


Lutfen yaptigin paylasimlarda ve iyilestirmelerde durust ol herzaman!





B. Model

1. Subscription Model


Abonelik Planları (Ad-On ile birlikte)

| Alan | Bireysel | Aile | Grup |
| --- | --- | --- | --- |
| Kullanici Sayisi (Seat) | 1 | 5 | 10 |
| Hedef Kullanıcı | Tek kullanıcı | Aile / hane | Ekip / topluluk |
| Dahil İçerik (Core Kütüphane) | ✅ Ad-On olmayan tüm içeriklere erişim | ✅ Ad-On olmayan tüm içeriklere erişim | ✅ Ad-On olmayan tüm içeriklere erişim |
| Yolculuk İlerleme Kilidi | ✅ Var (içerik kuralı) | ✅ Var (içerik kuralı) | ✅ Var (içerik kuralı) |
| Üye / Davet Yönetimi | ❌ | ✅ Davet et + üye yönet | ✅ Davet et + üye yönet |
| Öğrenci İndirimi | ✅ Uygun (%50) | ❌ Uygun değil | ❌ Uygun değil |
Öğrenci İndirimi Politikası (v1): Yalnızca Bireysel plan için %50 indirim + öğrenci doğrulaması + belirli aralıklarla yeniden doğrulama (örn. yılda 1).
 
2. Abonelik planları icin satin alinabilir Ad-on lar.

| Ad-Ons | Bireysel | Aile | Grup |
| --- | --- | --- | --- |
| AI Paketi | ✅ | ✅ | ✅ |
| Koçluk Eğitimi | ✅ | ✅ | ✅ |
| Ek Kisi +5 | ❌ | ✅ | ✅ |
| Ek Kisi +10 | ❌ | ✅ | ✅ |
Eklentiler (Ad-On’lar)

| Alan | AI Paketi | Koçluk Eğitimi | Ek Koltuk +5 | Ek Koltuk +10 |
| --- | --- | --- | --- | --- |
| Ne sağlar | İçerikle AI sohbet + günlük içerik üretimi/gönderimi + AI analiz/geri bildirim (tek paket) | Koçluk Okulu programlarına erişim (dönem/cohort dahil) + ilgili program akışları | Mevcut plana +5 kisi ekler | Mevcut plana +10 kisi ekler |
| Hangi planlarda | Bireysel / Aile / Grup | Bireysel / Aile / Grup | Aile / Grup | Aile / Grup |
| Fiyatlandirma | Kisi başı | Hesap başı (önerilen) | Plan bazlı eklenti | Plan bazlı eklenti |
| Not | Aile/Grup’ta maliyeti adil dağıtır, suistimali azaltır | “Özel/premium” algısını korur |  |  |
 
 
 
 
 
 
 
 

