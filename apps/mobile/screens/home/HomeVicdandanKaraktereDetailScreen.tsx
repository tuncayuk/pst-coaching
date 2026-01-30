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

const outlineSteps = [
  { title: "Vicdanı Tanımak", duration: "12 dk" },
  { title: "Şefkatli Sınırlar", duration: "18 dk" },
  { title: "Günlük Uygulama", duration: "10 dk" },
];

const HomeVicdandanKaraktereContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Program Özeti">
        <PText variant="bodyMedium" style={styles.paragraph}>
          Vicdandan Karaktere programı, iç sesini güçlendirerek değerlerinle uyumlu kararlar
          almanı destekler.
        </PText>
        <PCard style={styles.card}>
          <PCard.Title title="İlerlemen" subtitle="3/8 bölüm tamamlandı" />
          <PCard.Content>
            <ProgressBar progress={0.38} style={styles.progress} />
          </PCard.Content>
          <PCard.Actions>
            <PButton mode="contained" disabled={isOffline}>
              Kaldığın Yerden Devam Et
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      <SectionCard title="Program Akışı" actionLabel="Tümünü Gör">
        {outlineSteps.map((step, index) => (
          <View key={step.title} style={styles.rowItem}>
            <View style={styles.rowHeader}>
              <PText variant="titleSmall">{step.title}</PText>
              <PText variant="labelMedium">{step.duration}</PText>
            </View>
            {index < outlineSteps.length - 1 ? <Divider style={styles.divider} /> : null}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Kazandırdıkları" actionLabel="Paylaş">
        <PText variant="bodySmall">• Günlük kararlarında tutarlılık</PText>
        <PText variant="bodySmall">• Öz şefkatle sınır koyma</PText>
        <PText variant="bodySmall">• Değer odaklı eylem planı</PText>
        <PButton mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Programı Kaydet
        </PButton>
      </SectionCard>
    </>
  );
};

export const HomeVicdandanKaraktereDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
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
