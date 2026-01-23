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
import { resolveScreenState } from "../components/ScreenState";

const outlineSteps = [
  { title: "Vicdanı Tanımak", duration: "12 dk" },
  { title: "Şefkatli Sınırlar", duration: "18 dk" },
  { title: "Günlük Uygulama", duration: "10 dk" },
];

const HomeVicdandanKaraktereContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Program Özeti">
        <Text variant="bodyMedium" style={styles.paragraph}>
          Vicdandan Karaktere programı, iç sesini güçlendirerek değerlerinle uyumlu kararlar
          almanı destekler.
        </Text>
        <Card style={styles.card}>
          <Card.Title title="İlerlemen" subtitle="3/8 bölüm tamamlandı" />
          <Card.Content>
            <ProgressBar progress={0.38} style={styles.progress} />
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Kaldığın Yerden Devam Et
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Program Akışı" actionLabel="Tümünü Gör">
        {outlineSteps.map((step, index) => (
          <View key={step.title} style={styles.rowItem}>
            <View style={styles.rowHeader}>
              <Text variant="titleSmall">{step.title}</Text>
              <Text variant="labelMedium">{step.duration}</Text>
            </View>
            {index < outlineSteps.length - 1 ? <Divider style={styles.divider} /> : null}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Kazandırdıkları" actionLabel="Paylaş">
        <Text variant="bodySmall">• Günlük kararlarında tutarlılık</Text>
        <Text variant="bodySmall">• Öz şefkatle sınır koyma</Text>
        <Text variant="bodySmall">• Değer odaklı eylem planı</Text>
        <Button mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Programı Kaydet
        </Button>
      </SectionCard>
    </>
  );
};

export const HomeVicdandanKaraktereDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Vicdandan Karaktere" subtitle="Program hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Program Akışı">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Vicdandan Karaktere" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Program bulunamadı"
          description="Bu içerik şu anda erişilebilir değil."
          actionLabel="Keşfe Dön"
          icon="book-open-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Vicdandan Karaktere" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Program yüklenemedi"
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
      <ScreenLayout title="Vicdandan Karaktere" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <HomeVicdandanKaraktereContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Vicdandan Karaktere" subtitle="Değer odaklı bir yolculuk">
      <HomeVicdandanKaraktereContent />
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
