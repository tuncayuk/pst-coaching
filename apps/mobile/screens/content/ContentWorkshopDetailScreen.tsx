import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip, Divider } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";

const sessionItems = [
  { title: "Nefes ve Regülasyon", time: "20 dk" },
  { title: "Grup Paylaşımı", time: "35 dk" },
  { title: "Kapanış Ritüeli", time: "15 dk" },
];

const prepChecklist = ["Rahat bir alan oluştur", "Su ve not defteri hazırla", "Kulaklık kullan"];

const ContentWorkshopDetailContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Atölye Bilgileri">
        <View style={styles.chipRow}>
          <Chip style={styles.chip} disabled={isOffline}>
            Canlı
          </Chip>
          <Chip style={styles.chip} disabled={isOffline}>
            24 Ocak · 20:00
          </Chip>
        </View>
        <PCard style={styles.card}>
          <PCard.Title title="Eğitmen" subtitle="Uzm. Psk. Aylin K." />
          <PCard.Content>
            <PText variant="bodySmall">Zoom bağlantısı etkinlikten 15 dk önce paylaşılır.</PText>
          </PCard.Content>
          <PCard.Actions>
            <PButton mode="contained" disabled={isOffline}>
              Yerini Ayırt
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      <SectionCard title="Oturum Akışı" actionLabel="Takvime Ekle">
        {sessionItems.map((session, index) => (
          <View key={session.title} style={styles.rowItem}>
            <View style={styles.rowHeader}>
              <PText variant="titleSmall">{session.title}</PText>
              <PText variant="labelMedium">{session.time}</PText>
            </View>
            {index < sessionItems.length - 1 ? <Divider style={styles.divider} /> : null}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Hazırlık Listesi">
        {prepChecklist.map((item) => (
          <PText key={item} variant="bodySmall" style={styles.bullet}>
            • {item}
          </PText>
        ))}
        <PButton mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Not Al
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentWorkshopDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Atölye Detay" subtitle="Atölye yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Oturumlar">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Atölye Detay" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Atölye bulunamadı"
          description="Bu atölye şu anda erişilebilir değil."
          actionLabel="Keşfe Dön"
          icon="calendar-remove"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Atölye Detay" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Atölye yüklenemedi"
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
      <ScreenLayout title="Atölye Detay" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentWorkshopDetailContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atölye Detay" subtitle="Atölye programı ve içerikler">
      <ContentWorkshopDetailContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginTop: 4,
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
