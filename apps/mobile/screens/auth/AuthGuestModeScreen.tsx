import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const GuestModeContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>👻</Text>
        </View>
        <Text style={styles.title}>Misafir Modunda Devam Et</Text>
        <Text style={styles.subtitle}>Kayıt olmadan içerikleri keşfedin</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>✓ Misafir Olarak Yapabilecekleriniz</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Yolculukları keşfedin</Text>
            <Text style={styles.listItem}>• Atölyelere göz atın</Text>
            <Text style={styles.listItem}>• e-Kitap kataloğunu inceleyin</Text>
            <Text style={styles.listItem}>• Modülleri görüntüleyin</Text>
          </View>
        </View>
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Sınırlamalar</Text>
          <View style={styles.list}>
            <Text style={styles.warningItem}>• İçerik başlatamazsınız</Text>
            <Text style={styles.warningItem}>• Okuma yapamazsınız</Text>
            <Text style={styles.warningItem}>• Yorum yazamazsınız</Text>
            <Text style={styles.warningItem}>• İlerleme kaydedilemez</Text>
          </View>
        </View>
        <Button
          mode="contained"
          disabled={isOffline}
          buttonColor="#00B4D8"
          textColor="#FFFFFF"
          onPress={() => navigation.getParent()?.navigate("MainTabs")}
          style={styles.button}
          contentStyle={styles.primaryButtonContent}
          labelStyle={styles.primaryButtonLabel}
        >
          Misafir Olarak Devam Et
        </Button>
        <Button
          mode="outlined"
          disabled={isOffline}
          onPress={() => navigation.navigate("AuthRegister")}
          style={styles.secondaryButton}
          contentStyle={styles.secondaryButtonContent}
          labelStyle={styles.secondaryButtonLabel}
        >
          Kayıt Ol
        </Button>
        <Text style={styles.hint}>
          💡 Kayıt olduktan sonra misafir oturumunuzdaki favorileriniz hesabınıza aktarılacaktır
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthGuestModeScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Misafir Modu" subtitle="Yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Misafir Modu" subtitle="Bilgi bulunamadı">
        <StateMessage
          title="Bilgi bulunamadı"
          description="Yeniden deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="account-off-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Misafir Modu" subtitle="Bir sorun oluştu">
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
        <GuestModeContent isOffline />
      </>
    );
  }

  return <GuestModeContent />;
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
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#525252",
    marginBottom: 24,
    textAlign: "center",
    fontSize: 15,
  },
  infoCard: {
    backgroundColor: "#D1FAE5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  infoTitle: {
    fontWeight: "700",
    color: "#065F46",
    marginBottom: 12,
  },
  warningCard: {
    backgroundColor: "#F59E0B",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  warningTitle: {
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  list: {
    gap: 8,
  },
  listItem: {
    fontSize: 14,
    color: "#171717",
    lineHeight: 24,
  },
  warningItem: {
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 24,
  },
  button: {
    marginBottom: 12,
    borderRadius: 12,
  },
  primaryButtonContent: {
    height: 56,
    justifyContent: "center",
  },
  primaryButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E5E5",
  },
  secondaryButtonContent: {
    height: 56,
    justifyContent: "center",
  },
  secondaryButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#171717",
  },
  hint: {
    textAlign: "center",
    color: "#525252",
    marginTop: 16,
    lineHeight: 20,
    fontSize: 12,
  },
});
