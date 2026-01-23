import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  ProgressBar,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

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
        <Text variant="bodyMedium" style={styles.paragraph}>
          Kendine şefkatli bir yaklaşım geliştirirken her gün küçük adımlarla ilerleyebileceğin
          yapılandırılmış bir program.
        </Text>
        <Card style={styles.card}>
          <Card.Title title="İlerleme" subtitle="3/10 gün tamamlandı" />
          <Card.Content>
            <ProgressBar progress={0.3} style={styles.progress} />
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Yolculuğa Devam Et
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Gün Akışı" actionLabel="Tüm Günler">
        {journeyDays.map((day, index) => (
          <View key={day.title} style={styles.rowItem}>
            <View style={styles.rowHeader}>
              <Text variant="titleSmall">{day.title}</Text>
              <Text variant="labelMedium">{day.duration}</Text>
            </View>
            {index < journeyDays.length - 1 ? <Divider style={styles.divider} /> : null}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Kazanımlar" actionLabel="Paylaş">
        {journeyBenefits.map((benefit) => (
          <Text key={benefit} variant="bodySmall" style={styles.bullet}>
            • {benefit}
          </Text>
        ))}
        <Button mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Hatırlatıcı Kur
        </Button>
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
