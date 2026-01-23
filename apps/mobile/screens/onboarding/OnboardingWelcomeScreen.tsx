import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const WelcomeContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <SectionCard title="Hoş geldin">
        <Text variant="titleMedium" style={styles.headline}>
          Yeni bir yolculuğa hoş geldin
        </Text>
        <Text variant="bodyMedium" style={styles.bodyText}>
          PST Coaching ile kişisel gelişim yolculuğunu planla, günlük içeriklerle ilerle ve
          ilerlemeni takip et.
        </Text>
        <View style={styles.chipRow}>
          {["Kişisel plan", "Günlük içerik", "İlerleme takibi"].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <Button
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline}
          onPress={() => navigation.navigate("OnboardingLanguageSelect")}
        >
          Başla
        </Button>
      </SectionCard>
      <SectionCard title="Hesabın var mı?">
        <Text variant="bodySmall" style={styles.bodyText}>
          Daha önce kayıt olduysan giriş yaparak kaldığın yerden devam edebilirsin.
        </Text>
        <View style={styles.buttonRow}>
          <Button
            mode="outlined"
            style={styles.secondaryButton}
            disabled={isOffline}
            onPress={() => navigation.navigate("AuthLogin")}
          >
            Giriş Yap
          </Button>
          <Button mode="text" disabled={isOffline} onPress={() => navigation.navigate("AuthRegister")}>
            Kayıt Ol
          </Button>
        </View>
      </SectionCard>
    </>
  );
};

export const OnboardingWelcomeScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Hoş Geldiniz" subtitle="Karşılama hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <SkeletonBlock height={24} />
          <SkeletonBlock height={16} />
          <SkeletonBlock height={16} />
          <SkeletonBlock height={36} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Hoş Geldiniz" subtitle="Karşılama içeriği bulunamadı">
        <StateMessage
          title="Karşılama içeriği bulunamadı"
          description="Yeniden yükleyerek devam edebilirsin."
          actionLabel="Tekrar Dene"
          icon="hand-wave-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Hoş Geldiniz" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Hoş geldiniz yüklenemedi"
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
      <ScreenLayout title="Hoş Geldiniz" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <WelcomeContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Hoş Geldiniz" subtitle="Yeni bir yolculuğa hoş geldin">
      <WelcomeContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  headline: {
    marginBottom: 8,
  },
  bodyText: {
    lineHeight: 20,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  primaryButton: {
    alignSelf: "flex-start",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondaryButton: {
    marginRight: 12,
  },
});
