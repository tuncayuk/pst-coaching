import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const GuestModeContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>👻</Text>
      </View>
      <SectionCard title="">
        <Text variant="headlineMedium" style={styles.title}>
          Misafir Modunda Devam Et
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Kayıt olmadan içerikleri keşfedin
        </Text>
        <View style={styles.infoCard}>
          <Text variant="titleSmall" style={styles.infoTitle}>
            ✓ Misafir Olarak Yapabilecekleriniz
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Yolculukları keşfedin</Text>
            <Text style={styles.listItem}>• Atölyelere göz atın</Text>
            <Text style={styles.listItem}>• e-Kitap kataloğunu inceleyin</Text>
            <Text style={styles.listItem}>• Modülleri görüntüleyin</Text>
          </View>
        </View>
        <View style={styles.warningCard}>
          <Text variant="titleSmall" style={styles.warningTitle}>
            ⚠️ Sınırlamalar
          </Text>
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
          onPress={() => navigation.getParent()?.navigate("MainTabs")}
          style={styles.button}
        >
          Misafir Olarak Devam Et
        </Button>
        <Button
          mode="outlined"
          disabled={isOffline}
          onPress={() => navigation.navigate("AuthRegister")}
          style={styles.button}
        >
          Kayıt Ol
        </Button>
        <Text variant="bodySmall" style={styles.hint}>
          💡 Kayıt olduktan sonra misafir oturumunuzdaki favorileriniz hesabınıza aktarılacaktır
        </Text>
      </SectionCard>
    </>
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
      <ScreenLayout title="Misafir Modu" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <GuestModeContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Misafir Modu" subtitle="Kayıt olmadan keşfet">
      <GuestModeContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#525252",
    marginBottom: 24,
    textAlign: "center",
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
  },
  hint: {
    textAlign: "center",
    color: "#525252",
    marginTop: 16,
    lineHeight: 20,
  },
});
