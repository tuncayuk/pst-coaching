import React from "react";
import { StyleSheet } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PText } from "../../components";


const assistantBenefits = [
  "Hedefine uygun içerik önerileri",
  "Süre ve yoğunluğa göre plan",
  "Kütüphanenden devam önerileri",
];

const DiscoverAssistantIntroContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="İçerik Asistanı">
        <PText variant="bodyMedium" style={styles.paragraph}>
          Kısa bir testle hedeflerine uygun yolculuk, atölye ve modül önerileri al.
        </PText>
        {assistantBenefits.map((benefit) => (
          <PText key={benefit} variant="bodySmall" style={styles.listItem}>
            • {benefit}
          </PText>
        ))}
        <PButton mode="contained" style={styles.primaryButton} disabled={isOffline}>
          Asistanı Başlat
        </PButton>
      </SectionCard>

      <SectionCard title="Nasıl Çalışır" actionLabel="Örnekler">
        <PCard style={styles.card}>
          <PCard.Title title="Hedefini seç" subtitle="Örn: sınır koyma" />
        </PCard>
        <PCard style={styles.card}>
          <PCard.Title title="Süreni belirle" subtitle="10-20 dk, 30-45 dk" />
        </PCard>
        <PCard style={styles.card}>
          <PCard.Title title="Önerilerini al" subtitle="1 ana + 2 alternatif" />
        </PCard>
      </SectionCard>
    </>
  );
};

export const DiscoverAssistantIntroScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="İçerik Asistanı" subtitle="Asistan hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Adımlar">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="İçerik Asistanı" subtitle="Öneri bulunamadı">
        <StateMessage
          title="Öneri yok"
          description="Yeni içerikler için daha sonra tekrar deneyebilirsin."
          actionLabel="Kataloğa Dön"
          icon="lightbulb-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="İçerik Asistanı" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Asistan yüklenemedi"
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
      <ScreenLayout title="İçerik Asistanı" subtitle="Önbellekteki öneriler">
        <OfflineNotice />
        <DiscoverAssistantIntroContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="İçerik Asistanı" subtitle="Sana uygun öneriler">
      <DiscoverAssistantIntroContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 12,
  },
  listItem: {
    marginBottom: 4,
  },
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
});
