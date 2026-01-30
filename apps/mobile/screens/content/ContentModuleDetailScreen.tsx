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

const moduleSections = [
  { title: "Giriş ve Tanımlar", duration: "8 dk" },
  { title: "Uygulama Adımları", duration: "12 dk" },
  { title: "Günlük Alıştırma", duration: "10 dk" },
];

const ContentModuleDetailContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Modül Özeti">
        <PText variant="bodyMedium" style={styles.paragraph}>
          Modül, kısa egzersizlerle ilerleyerek günlük yaşamda uygulanabilir pratikler sunar.
        </PText>
        <PCard style={styles.card}>
          <PCard.Title title="İlerleme" subtitle="1/5 bölüm tamamlandı" />
          <PCard.Content>
            <ProgressBar progress={0.2} style={styles.progress} />
          </PCard.Content>
          <PCard.Actions>
            <PButton mode="contained" disabled={isOffline}>
              Modüle Başla
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      <SectionCard title="Bölümler" actionLabel="Tümünü Gör">
        {moduleSections.map((section, index) => (
          <View key={section.title} style={styles.rowItem}>
            <View style={styles.rowHeader}>
              <PText variant="titleSmall">{section.title}</PText>
              <PText variant="labelMedium">{section.duration}</PText>
            </View>
            {index < moduleSections.length - 1 ? <Divider style={styles.divider} /> : null}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Önerilen Adımlar">
        <PText variant="bodySmall">• Her gün aynı saatte pratik yap</PText>
        <PText variant="bodySmall">• Kısa notlar al</PText>
        <PText variant="bodySmall">• Haftalık özetini kaydet</PText>
        <PButton mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Hatırlatıcı Kur
        </PButton>
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
