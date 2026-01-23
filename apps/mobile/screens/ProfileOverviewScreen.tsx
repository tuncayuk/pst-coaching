import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { OfflineNotice } from "./components/OfflineNotice";
import { ScreenLayout } from "./components/ScreenLayout";
import { SectionCard } from "./components/SectionCard";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";
import { resolveScreenState } from "./components/ScreenState";

const ProfileReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();

  return (
    <>
      <SectionCard title="Hesap" actionLabel="Düzenle">
        <View style={styles.profileHeader}>
          <Avatar.Text size={56} label="EA" />
          <View style={styles.profileInfo}>
            <Text variant="titleMedium">Elif A.</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              elif@example.com
            </Text>
          </View>
          <Chip compact>Aktif</Chip>
        </View>
        <Button mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Hesap Bilgileri
        </Button>
      </SectionCard>

      <SectionCard title="Abonelik" actionLabel="Planlar">
        <Card style={styles.card}>
          <Card.Title title="Yıllık Plan" subtitle="12 Ocak 2026'ya kadar" />
          <Card.Content>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              2 koltuk kullanılıyor · Premium içerikler açık
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Planı Yönet
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Hızlı Ayarlar" actionLabel="">
        <List.Item
          title="Dil"
          description="Türkçe"
          left={(props) => <List.Icon {...props} icon="translate" />}
        />
        <Divider />
        <List.Item
          title="Hatırlatmalar"
          description="Haftada 3 gün"
          left={(props) => <List.Icon {...props} icon="bell-outline" />}
        />
        <Divider />
        <List.Item
          title="Erişilebilirlik"
          description="Dinamik yazı tipi"
          left={(props) => <List.Icon {...props} icon="human-handsup" />}
        />
      </SectionCard>

      <SectionCard title="Ödeme Geçmişi" actionLabel="Tümü">
        <View style={styles.paymentRow}>
          <Text variant="bodyMedium">12 Ocak 2025</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            ₺899,00
          </Text>
        </View>
        <View style={styles.paymentRow}>
          <Text variant="bodyMedium">12 Ocak 2024</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            ₺699,00
          </Text>
        </View>
      </SectionCard>
    </>
  );
};

export const ProfileOverviewScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Profil" subtitle="Bilgiler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Ayarlar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Profil" subtitle="Kişisel bilgilerin">
        <StateMessage
          title="Profil bilgileri eksik"
          description="Hesabını tamamlamak için bilgilerini ekleyebilirsin."
          actionLabel="Profilini Tamamla"
          icon="account-edit-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Profil" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Profil yüklenemedi"
          description="Bilgileri getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Profil" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <ProfileReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Profil" subtitle="Hesabını yönet">
      <ProfileReadyContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  actionButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 8,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
