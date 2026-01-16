# SCR-001 — Dil Seçimi

**Route:** `onboarding/language`  
**Faz:** 1  
**Kaynak:** `Model2/PST_Mobile_PRD.md` → EPIC 1 → US-1.1  

---

## Amaç
Kullanıcının uygulamayı ilk açılışta tercih ettiği dili (TR/EN/ES) seçmesini ve bu tercihin uygulama genelinde kalıcı olarak uygulanmasını sağlamak.

## İlgili User Story ve Kabul Kriterleri (PRD)
**US-1.1 Dil Seçimi**  
- Dil listesinden seçim yapıldığında profile kaydedilir
- Tüm statik metinler seçilen dilde görüntülenir
- Ayarlar > Dil'den değiştirilebilir
- Çevrimdışı da saklanır ve senkronlanır

## Giriş/Çıkış Kriterleri
- **Giriş:** İlk açılış (onboarding) veya kullanıcı `Ayarlar > Dil` üzerinden değişiklik başlatır.
- **Çıkış:** Dil seçimi kaydedilir ve uygulama dili güncellenir.

## UI Bileşenleri
- Başlık + kısa açıklama
- Dil listesi (TR/EN/ES) + seçili durum
- Birincil CTA: `Devam Et` (ilk onboarding) / `Kaydet` (ayarlar içinden)
- İkincil: `Geri` (ayarlar içinden)

## Davranış Kuralları
- Seçim yapmadan `Devam Et/Kaydet` pasif.
- Dil değişimi sonrası:
  - Statik metinler anında yeni dilde render edilir.
  - Seçim **local** saklanır (offline) ve ilk senkron fırsatında profil ile senkronlanır.

## Hata Durumları
- Senkron başarısız: yerel seçim korunur, non-blocking uyarı gösterilir; tekrar dene.

## Analitik (Öneri)
- `language_selected` { `language`, `source`:(`onboarding`|`settings`) }

## Erişilebilirlik
- Dil seçenekleri “radio group” semantiğiyle (VoiceOver/TalkBack).
- Seçili dili ekran okuyucu açıkça ifade eder.

