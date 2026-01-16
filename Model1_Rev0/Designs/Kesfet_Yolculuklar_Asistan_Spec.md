# 3.3 Keşfet: Yolculuklar & Asistan — Production Ready Ekran Spesifikasyonu

Kaynak: `Model1/UserStoriesRev3.md` (EPIC 4: US-4.1–US-4.6, EPIC 20: US-20.1–US-20.7).  
Hedef cihaz: iPhone 17 Pro (tasarım referansı: 393×852 pt, Dynamic Island, safe area üst/alt).  
Tasarım dosyası: `Model1/Designs/Kesfet_Yolculuklar_Asistan_iPhone17Pro.html`

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

Logo dosyasını `Model1/Designs/assets/pst-coaching-logo.png` olarak eklerseniz paleti logodan daha doğru (pipet) değerlerle netleştirebilirim.

## Ortak “Production Ready” standartları (tüm ekranlar)

- Durumlar: loading/skeleton, empty (varsa), error + retry, offline bilgilendirme.
- Gating: plan pasif / AI paket kapalı senaryolarında “neden kilitli” net ve kısa; bağlam korunur (geri dönüşte aynı ekran).
- Erişilebilirlik: VoiceOver etiketleri, odak sırası, dokunma hedefleri, kontrast, Dynamic Type.
- Arama/filtre: debounce (UI tarafı), sonuç sayısı/boş durum metni, filtre reset.
- Navigasyon: Keşfet tabı altında “Yolculuklar” ve “Asistan” sekmeleri; tüm derin linkler geri stack’te doğru.

---

## Ekran listesi (HTML ile birebir)

1. **Keşfet (Hub): Yolculuklar & Asistan** — EPIC 4: **US-4.1** — Faz-1
2. **Yolculuk Kataloğu (Liste/Arama/Filtre)** — EPIC 4: **US-4.4** — Faz-1
3. **Filtre & Sıralama (Bottom Sheet)** — EPIC 4: **US-4.4** — Faz-1
4. **Yolculuk Detayı** — EPIC 4: **US-4.5** — Faz-1
5. **Yolculuğu Başlat (Hedef + Kural Özeti)** — EPIC 4: **US-4.6** — Faz-1
6. **Asistan Başlangıç (Sekme)** — EPIC 20: **US-20.1** — Faz-2
7. **Hedef/Niyet Anketi** — EPIC 20: **US-20.2** (+ opsiyonel EPIC 4: **US-4.3**) — Faz-2
8. **Duygu Kontrolü (Mini Ölçüm)** — EPIC 20: **US-20.3** — Faz-2
9. **Öneriler & Karşılaştırma** — EPIC 20: **US-20.4** — Faz-2
10. **Plan Oluşturma (Hedef + Hatırlatıcı)** — EPIC 20: **US-20.5** — Faz-2
11. **AI Gerekçe (AI Paket / Add-on)** — EPIC 20: **US-20.6** — Faz-2
12. **Plan Güncelle / Yeniden Öneri** — EPIC 20: **US-20.7** — Faz-2

## Rol / segment / plan (bu bölüm için)

- **Rol**: Danışan (Genel Kullanıcı)
- **Segment**: Bireysel / Aile / Grup
- **Plan**: Bireysel / Aile / Grup (AI gerekçe ekranı AI Paket ile gated)

