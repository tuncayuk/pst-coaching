# 3.4 Yolculuklarım: Gün/Modül & Modüller — Production Ready Ekran Spesifikasyonu

Kaynak: `Model1/UserStoriesRev3.md` (EPIC 2: US-2.6–2.7, EPIC 5: US-5.1–5.7, EPIC 15: US-15.1–15.7; ayrıca vurguların Favoriler’e düşmesi için EPIC 8: US-8.1–8.2).  
Hedef cihaz: iPhone 17 Pro (tasarım referansı: 393×852 pt, Dynamic Island, safe area üst/alt).  
Tasarım dosyası: `Model1/Designs/Yolculuklarim_Gun_Modul_Moduller_iPhone17Pro.html`

## Renk paleti (Light Mode)

Bu palet, paylaşılan logo görseli baz alınarak **yaklaşık** çıkarılmıştır.

- **Primary (Navy)**: `#1E2A78`
- **Accent (Teal)**: `#0FA3B1`
- **Highlight (Gold)**: `#F2C14E`
- **Background**: `#F7F8FB`
- **Surface**: `#FFFFFF`
- **Stroke**: `#E6E8F0`
- **Text**: `#0D1226`
- **Muted text**: `#5B647A`
- **Danger**: `#D92D20`
- **Success**: `#039855`

Logo dosyası: `Model1/Designs/assets/pst-coaching-logo.png`

## Ortak “Production Ready” standartları (tüm ekranlar)

- Durumlar: loading/skeleton, error + retry, offline bilgilendirme; taslak autosave ile kayıp önleme.
- Zaman kuralları: **Teslim 23:59** ve **Yeni gün 08:00** (saat dilimi + server-time çakışması dahil).
- Kilit şeffaflığı: kilit nedeni tek cümle + detay kural; doğru yere “tek dokunuş” yönlendirme.
- Erişilebilirlik: VoiceOver etiketleri, odak sırası, dokunma hedefleri, Dynamic Type, kontrast.
- Add-on gating:
  - **AI geri bildirim**: AI Chat add-on yoksa net kilit mesajı + “Add-On’u Aç”.
  - **Koç onayı kilidi**: Koçluk add-on akışında “bekleniyor / kilitli” durumları.

---

## Ekran listesi (HTML ile birebir)

1. **Yolculuklarım (aktif/pasif liste)** — EPIC 2: US-2.7 — Faz-1
2. **Gün/Modül okuyucu (metin)** — EPIC 5: US-5.1 — Faz-1
3. **Sesli okuma + senkron** — EPIC 5: US-5.2 — Faz-1
4. **Vurgu/Not/Favori aksiyonları** — EPIC 5: US-5.3 (+ EPIC 8: US-8.1–8.2) — Faz-1
5. **Yorum yazma (taslak + sorular)** — EPIC 5: US-5.4 — Faz-1
6. **Önizleme & teslim (23:59 kuralı)** — EPIC 5: US-5.5 — Faz-1
7. **Kilitli ilerleme (08:00 kapısı)** — EPIC 5: US-5.6 (+ EPIC 2: US-2.6) — Faz-1
8. **AI geri bildirim (add-on)** — EPIC 5: US-5.7 — Faz-1
9. **Modüller listesi (kilitli ilerleme)** — EPIC 15: US-15.1 — Faz-1
10. **Modül önkoşulları (checklist)** — EPIC 15: US-15.2 — Faz-1
11. **Görev tamamlama + gönderim (taslak)** — EPIC 15: US-15.3 — Faz-1
12. **Kilit açıldı / sonraki adım** — EPIC 15: US-15.4 — Faz-1
13. **Kilitli aşama (eksik görev)** — EPIC 15: US-15.5 — Faz-1
14. **Koç değerlendirmesi ile kilit (add-on)** — EPIC 15: US-15.6 — Faz-1
15. **İlerleme özeti + kilit geçmişi + sertifika** — EPIC 15: US-15.7 — Faz-1

## Rol / segment / plan (bu bölüm için)

- **Rol**: Danışan
- **Segment**: Bireysel / Aile / Grup
- **Plan**: Bireysel / Aile / Grup (AI ve Koçluk add-on’ları opsiyonel)

