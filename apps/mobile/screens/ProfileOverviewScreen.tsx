import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "./components/OfflineNotice";
import { ScreenLayout } from "./components/ScreenLayout";
import { SectionCard } from "./components/SectionCard";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";
import { resolveScreenState, ScreenState } from "./components/ScreenState";

import { PActivityIndicator, PAvatar, PButton, PCard, PChip, PDivider, PListIcon, PListItem, PText } from "../components";
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
          <PAvatar.Text size={56} label={(user?.email ?? "EA").slice(0, 2).toUpperCase()} />
          <View style={styles.profileInfo}>
            <PText variant="titleMedium">{user?.email ?? "Kullanıcı"}</PText>
            <PText variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {user?.email ?? "demo@pstcoaching.app"}
            </PText>
          </View>
          <PChip compact>{subscription?.status ?? "aktif"}</PChip>
        </View>
        <PButton
          mode="outlined"
          style={styles.actionButton}
          disabled={isOffline}
          onPress={() => navigation.navigate("ProfileAccount")}
        >
          Hesap Bilgileri
        </PButton>
      </SectionCard>

      <SectionCard title="Abonelik" actionLabel="Planlar">
        <PCard style={styles.card}>
          <PCard.Title title={plan?.name ?? "Plan"} subtitle={subscription?.renewal_at?.slice(0, 10)} />
          <PCard.Content>
            <PText variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {plan?.seat_limit ?? 1} koltuk · Premium içerikler açık
            </PText>
          </PCard.Content>
          <PCard.Actions>
            <PButton
              mode="contained"
              disabled={isOffline}
              onPress={() => navigation.navigate("ProfileSubscription")}
            >
              Planı Yönet
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      <SectionCard title="Hızlı Ayarlar" actionLabel="">
        <PListItem
          title="Dil"
          description={user?.language?.toUpperCase() ?? "TR"}
          left={(props) => <PListIcon {...props} icon="translate" />}
          onPress={() => navigation.navigate("ProfileLanguage")}
        />
        <PDivider />
        <PListItem
          title="Hatırlatmalar"
          description="Haftada 3 gün"
          left={(props) => <PListIcon {...props} icon="bell-outline" />}
          onPress={() => navigation.navigate("ProfileReminders")}
        />
        <PDivider />
        <PListItem
          title="Erişilebilirlik"
          description="Dinamik yazı tipi"
          left={(props) => <PListIcon {...props} icon="human-handsup" />}
          onPress={() => navigation.navigate("ProfileAccessibility")}
        />
      </SectionCard>

      <SectionCard title="Ödeme Geçmişi" actionLabel="Tümü">
        {payments.map((payment) => (
          <View key={payment.id} style={styles.paymentRow}>
            <PText variant="bodyMedium">{payment.purchased_at.slice(0, 10)}</PText>
            <PText variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {payment.amount} {payment.currency}
            </PText>
          </View>
        ))}
        <PButton mode="text" disabled={isOffline} onPress={() => navigation.navigate("ProfilePaymentHistory")}>
          Tümünü Gör
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileOverviewScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Profil" subtitle="Bilgiler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
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
