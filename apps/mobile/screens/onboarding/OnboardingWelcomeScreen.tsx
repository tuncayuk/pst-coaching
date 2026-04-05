import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";

import { PButton, PChip, PText } from "../../components";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { ScreenState, resolveScreenState } from "../components/ScreenState";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";

const WelcomeContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <SectionCard title="Hoş geldin">
        <PText variant="titleMedium" style={styles.headline}>
          Yeni bir yolculuğa hoş geldin
        </PText>
        <PText variant="bodyMedium" style={styles.bodyText}>
          PST Coaching ile kişisel gelişim yolculuğunu planla, günlük içeriklerle ilerle ve
          ilerlemeni takip et.
        </PText>
        <View style={styles.chipRow}>
          {["Kişisel plan", "Günlük içerik", "İlerleme takibi"].map((label) => (
            <PChip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </PChip>
          ))}
        </View>
        <PButton
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline}
          onPress={() => navigation.getParent()?.navigate("Auth" as never)}
        >
          Başla
        </PButton>
      </SectionCard>
      <SectionCard title="Hesabın var mı?">
        <PText variant="bodySmall" style={styles.bodyText}>
          Daha önce kayıt olduysan giriş yaparak kaldığın yerden devam edebilirsin.
        </PText>
        <View style={styles.buttonRow}>
          <PButton
            mode="outlined"
            style={styles.secondaryButton}
            disabled={isOffline}
            onPress={() => navigation.getParent()?.navigate("Auth" as never)}
          >
            Giriş Yap
          </PButton>
          <PButton
            mode="text"
            disabled={isOffline}
            onPress={() => navigation.getParent()?.navigate("Auth" as never)}
          >
            Kayıt Ol
          </PButton>
        </View>
      </SectionCard>
    </>
  );
};

export const OnboardingWelcomeScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
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
