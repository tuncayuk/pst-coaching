import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PText } from "../../components";

const FaceIdSetupContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <PText style={styles.icon}>👤</PText>
          </View>
        </View>
        <PText style={styles.title}>FaceID ile Hızlı Giriş</PText>
        <PText style={styles.description}>
          Sonraki girişlerinizde FaceID kullanmak ister misiniz?
        </PText>
        <View style={styles.infoCard}>
          <PText style={styles.infoTitle}>✓ FaceID Avantajları</PText>
          <View style={styles.list}>
            <PText style={styles.listItem}>• Hızlı ve güvenli giriş</PText>
            <PText style={styles.listItem}>• Şifre hatırlama gereksiz</PText>
            <PText style={styles.listItem}>• Biyometrik güvenlik</PText>
            <PText style={styles.listItem}>• İstediğiniz zaman kapatabilirsiniz</PText>
          </View>
        </View>
        <PButton
          mode="contained"
          disabled={isOffline}
          onPress={() => {
            navigation.navigate("AuthDemographics");
          }}
          style={styles.button}
        >
          FaceID'yi Etkinleştir
        </PButton>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AuthDemographics");
          }}
          style={styles.skipButton}
          disabled={isOffline}
        >
          <PText style={styles.skipText}>Şimdi Değil</PText>
        </TouchableOpacity>
        <PText style={styles.hint}>
          FaceID ayarlarını dilediğiniz zaman Profil &gt; Ayarlar &gt; Güvenlik bölümünden değiştirebilirsiniz
        </PText>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthFaceIdSetupScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="FaceID Kurulumu" subtitle="Yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="FaceID Kurulumu" subtitle="Bilgi bulunamadı">
        <StateMessage
          title="Bilgi bulunamadı"
          description="Yeniden deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="face-recognition"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="FaceID Kurulumu" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yüklenemedi"
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
      <>
        <OfflineNotice />
        <FaceIdSetupContent isOffline />
      </>
    );
  }

  return <FaceIdSetupContent />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 10,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#404040",
    marginBottom: 32,
    textAlign: "center",
    maxWidth: 300,
    alignSelf: "center",
  },
  infoCard: {
    backgroundColor: "#EDE9FE",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    maxWidth: 320,
    alignSelf: "center",
  },
  infoTitle: {
    fontWeight: "700",
    color: "#8B5CF6",
    marginBottom: 12,
  },
  list: {
    gap: 8,
  },
  listItem: {
    fontSize: 14,
    color: "#171717",
    lineHeight: 24,
    marginLeft: 20,
  },
  button: {
    marginBottom: 12,
    maxWidth: 320,
    alignSelf: "center",
    borderRadius: 12,
  },
  skipButton: {
    alignItems: "center",
    marginTop: 8,
  },
  skipText: {
    color: "#525252",
    fontWeight: "600",
    fontSize: 15,
  },
  hint: {
    textAlign: "center",
    color: "#525252",
    marginTop: 24,
    maxWidth: 280,
    alignSelf: "center",
    lineHeight: 18,
    fontSize: 12,
  },
});
