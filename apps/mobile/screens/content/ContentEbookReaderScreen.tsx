import React from "react";
import { StyleSheet } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PProgressBar, PText } from "../../components";


const readerParagraphs = [
  "Kendine karşı nazik olmak, zorlayıcı anlarda iç sesini yumuşatmanın ilk adımıdır. Bu bölümde küçük nefes molalarıyla bedenini sakinleştirmeyi deneyeceğiz.",
  "Nefesini sayarken omuzlarının gevşediğini fark et. Zihin başka yerlere gittiğinde yargılamadan geri getir ve bu anı bir pratik alanı olarak gör.",
  "Okuma sonrası düşüncelerini not etmek için birkaç dakika ayır. Bu kısa refleksiyon, öğrenmeyi kalıcı hale getirir.",
];

const ContentEbookReaderContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Okuma İlerlemesi">
        <PText variant="bodySmall">Bölüm 4 · %32 tamamlandı</PText>
        <PProgressBar progress={0.32} style={styles.progress} />
        <PButton mode="contained" disabled={isOffline}>
          Sonraki Bölüm
        </PButton>
      </SectionCard>

      <SectionCard title="Bölüm 4: İçsel Diyalog">
        {readerParagraphs.map((paragraph) => (
          <PText key={paragraph} variant="bodyLarge" style={styles.paragraph}>
            {paragraph}
          </PText>
        ))}
      </SectionCard>

      <SectionCard title="Okuma Araçları">
        <PText variant="bodySmall">• Yazı boyutunu artır</PText>
        <PText variant="bodySmall">• Satır aralığını ayarla</PText>
        <PText variant="bodySmall">• Vurgu ekle</PText>
        <PButton mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Okuma Ayarları
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentEbookReaderScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Okuyucu hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="İçerik">
          <SkeletonBlock height={120} />
          <SkeletonBlock height={120} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Bölüm bulunamadı"
          description="Bu bölüm şu anda erişilebilir değil."
          actionLabel="İçindekilere Dön"
          icon="book-open-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Okuyucu yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentEbookReaderContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitap Okuyucu" subtitle="Okumaya devam et">
      <ContentEbookReaderContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  progress: {
    marginTop: 8,
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 24,
  },
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
