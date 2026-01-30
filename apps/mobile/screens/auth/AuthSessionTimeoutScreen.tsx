import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PText } from "../../components";

const SessionTimeoutContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <SectionCard title="Oturum süren doldu">
      <View style={styles.iconWrap}>
        <Avatar.Icon size={56} icon="timer-off-outline" />
      </View>
      <PText variant="bodyMedium" style={styles.bodyText}>
        Güvenliğin için oturumun sonlandırıldı. Tekrar giriş yaparak kaldığın yerden devam
        edebilirsin.
      </PText>
      <PButton
        mode="contained"
        disabled={isOffline}
        style={styles.primaryButton}
        onPress={() => navigation.navigate("AuthReauth")}
      >
        Tekrar Giriş Yap
      </PButton>
      <PButton mode="text" disabled={isOffline} onPress={() => navigation.navigate("AuthLogin")}>
        Daha Sonra
      </PButton>
    </SectionCard>
  );
};

export const AuthSessionTimeoutScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Oturum Süresi Doldu" subtitle="Oturum kontrol ediliyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Oturum Süresi Doldu" subtitle="Oturum durumu yok">
        <StateMessage
          title="Oturum durumu yok"
          description="Tekrar giriş yapmayı deneyebilirsin."
          actionLabel="Giriş Yap"
          icon="timer-sand"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Oturum Süresi Doldu" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Oturum bilgisi alınamadı"
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
      <ScreenLayout title="Oturum Süresi Doldu" subtitle="Çevrimdışı durum">
        <OfflineNotice />
        <SessionTimeoutContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Oturum Süresi Doldu" subtitle="Oturum süren doldu">
      <SessionTimeoutContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: "center",
    marginBottom: 12,
  },
  bodyText: {
    lineHeight: 20,
    marginBottom: 16,
  },
  primaryButton: {
    marginBottom: 8,
  },
});
