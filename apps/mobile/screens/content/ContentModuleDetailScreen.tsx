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

const moduleSections = [
  { title: "Giriş ve Tanımlar", duration: "8 dk" },
  { title: "Uygulama Adımları", duration: "12 dk" },
  { title: "Günlük Alıştırma", duration: "10 dk" },
];

const ContentModuleDetailContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Modül Özeti">
        <Text variant="bodyMedium" style={styles.paragraph}>
          Modül, kısa egzersizlerle ilerleyerek günlük yaşamda uygulanabilir pratikler sunar.
        </Text>
        <Card style={styles.card}>
          <Card.Title title="İlerleme" subtitle="1/5 bölüm tamamlandı" />
          <Card.Content>
            <ProgressBar progress={0.2} style={styles.progress} />
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Modüle Başla
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Bölümler" actionLabel="Tümünü Gör">
        {moduleSections.map((section, index) => (
          <View key={section.title} style={styles.rowItem}>
            <View style={styles.rowHeader}>
              <Text variant="titleSmall">{section.title}</Text>
              <Text variant="labelMedium">{section.duration}</Text>
            </View>
            {index < moduleSections.length - 1 ? <Divider style={styles.divider} /> : null}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Önerilen Adımlar">
        <Text variant="bodySmall">• Her gün aynı saatte pratik yap</Text>
        <Text variant="bodySmall">• Kısa notlar al</Text>
        <Text variant="bodySmall">• Haftalık özetini kaydet</Text>
        <Button mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Hatırlatıcı Kur
        </Button>
      </SectionCard>
    </>
  );
};

export const ContentModuleDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Modül Detay" subtitle="Modül yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Bölümler">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Modül Detay" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Modül bulunamadı"
          description="Bu modül şu anda erişilebilir değil."
          actionLabel="Keşfe Dön"
          icon="cube-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Modül Detay" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Modül yüklenemedi"
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
      <ScreenLayout title="Modül Detay" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentModuleDetailContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Modül Detay" subtitle="Modül özet ve bölümler">
      <ContentModuleDetailContent />
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
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
