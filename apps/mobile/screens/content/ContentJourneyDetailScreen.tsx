import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Divider, ProgressBar } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";

const journeyDays = [
  { title: "1. Gün: Niyet", duration: "12 dk" },
  { title: "2. Gün: Öz şefkat", duration: "14 dk" },
  { title: "3. Gün: Sınırlar", duration: "16 dk" },
];

const journeyBenefits = [
  "Günlük farkındalık pratiği",
  "Kendinle şefkatli iletişim",
  "Sürdürülebilir rutinler",
];

const ContentJourneyDetailContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Yolculuk Özeti">
        <PText variant="bodyMedium" style={styles.paragraph}>
          Kendine şefkatli bir yaklaşım geliştirirken her gün küçük adımlarla ilerleyebileceğin
          yapılandırılmış bir program.
        </PText>
        <PCard style={styles.card}>
          <PCard.Title title="İlerleme" subtitle="3/10 gün tamamlandı" />
          <PCard.Content>
            <ProgressBar progress={0.3} style={styles.progress} />
          </PCard.Content>
          <PCard.Actions>
            <PButton mode="contained" disabled={isOffline}>
              Yolculuğa Devam Et
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      <SectionCard title="Gün Akışı" actionLabel="Tüm Günler">
        {journeyDays.map((day, index) => (
          <View key={day.title} style={styles.rowItem}>
            <View style={styles.rowHeader}>
              <PText variant="titleSmall">{day.title}</PText>
              <PText variant="labelMedium">{day.duration}</PText>
            </View>
            {index < journeyDays.length - 1 ? <Divider style={styles.divider} /> : null}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Kazanımlar" actionLabel="Paylaş">
        {journeyBenefits.map((benefit) => (
          <PText key={benefit} variant="bodySmall" style={styles.bullet}>
            • {benefit}
          </PText>
        ))}
        <PButton mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Hatırlatıcı Kur
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentJourneyDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Yolculuk Detay" subtitle="Yolculuk yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Günler">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Yolculuk Detay" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Yolculuk bulunamadı"
          description="Bu yolculuk şu anda erişilebilir değil."
          actionLabel="Keşfe Dön"
          icon="map-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yolculuk Detay" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yolculuk yüklenemedi"
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
      <ScreenLayout title="Yolculuk Detay" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentJourneyDetailContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yolculuk Detay" subtitle="Yolculuğa genel bakış">
      <ContentJourneyDetailContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 12,
  },
  card: {
    marginTop: 4,
  },
  progress: {
    marginTop: 8,
    marginBottom: 12,
  },
  rowItem: {
    paddingVertical: 8,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    marginTop: 8,
  },
  bullet: {
    marginBottom: 6,
  },
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
