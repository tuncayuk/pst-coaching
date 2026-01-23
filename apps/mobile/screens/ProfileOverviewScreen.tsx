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
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "./components/OfflineNotice";
import { ScreenLayout } from "./components/ScreenLayout";
import { SectionCard } from "./components/SectionCard";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";
import { resolveScreenState } from "./components/ScreenState";
import {
  getPaymentTransactions,
  getPrimaryUser,
  getSubscriptionForUser,
  getPlanForSubscription,
} from "../data/mockSelectors";

const ProfileReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const plan = getPlanForSubscription(subscription?.plan_id);
  const payments = getPaymentTransactions()
    .filter((item) => item.subscription_id === subscription?.id)
    .slice(0, 2);

  return (
    <>
      <SectionCard title="Hesap" actionLabel="Düzenle">
        <View style={styles.profileHeader}>
          <Avatar.Text size={56} label={(user?.email ?? "EA").slice(0, 2).toUpperCase()} />
          <View style={styles.profileInfo}>
            <Text variant="titleMedium">{user?.email ?? "Kullanıcı"}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {user?.email ?? "demo@pstcoaching.app"}
            </Text>
          </View>
          <Chip compact>{subscription?.status ?? "aktif"}</Chip>
        </View>
        <Button
          mode="outlined"
          style={styles.actionButton}
          disabled={isOffline}
          onPress={() => navigation.navigate("ProfileAccount")}
        >
          Hesap Bilgileri
        </Button>
      </SectionCard>

      <SectionCard title="Abonelik" actionLabel="Planlar">
        <Card style={styles.card}>
          <Card.Title title={plan?.name ?? "Plan"} subtitle={subscription?.renewal_at?.slice(0, 10)} />
          <Card.Content>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {plan?.seat_limit ?? 1} koltuk · Premium içerikler açık
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              disabled={isOffline}
              onPress={() => navigation.navigate("ProfileSubscription")}
            >
              Planı Yönet
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Hızlı Ayarlar" actionLabel="">
        <List.Item
          title="Dil"
          description={user?.language?.toUpperCase() ?? "TR"}
          left={(props) => <List.Icon {...props} icon="translate" />}
          onPress={() => navigation.navigate("ProfileLanguage")}
        />
        <Divider />
        <List.Item
          title="Hatırlatmalar"
          description="Haftada 3 gün"
          left={(props) => <List.Icon {...props} icon="bell-outline" />}
          onPress={() => navigation.navigate("ProfileReminders")}
        />
        <Divider />
        <List.Item
          title="Erişilebilirlik"
          description="Dinamik yazı tipi"
          left={(props) => <List.Icon {...props} icon="human-handsup" />}
          onPress={() => navigation.navigate("ProfileAccessibility")}
        />
      </SectionCard>

      <SectionCard title="Ödeme Geçmişi" actionLabel="Tümü">
        {payments.map((payment) => (
          <View key={payment.id} style={styles.paymentRow}>
            <Text variant="bodyMedium">{payment.purchased_at.slice(0, 10)}</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {payment.amount} {payment.currency}
            </Text>
          </View>
        ))}
        <Button mode="text" disabled={isOffline} onPress={() => navigation.navigate("ProfilePaymentHistory")}>
          Tümünü Gör
        </Button>
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
