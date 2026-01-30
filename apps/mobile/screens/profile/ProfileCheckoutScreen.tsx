import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Divider, List } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";

const ProfileCheckoutContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Sipariş Özeti" actionLabel="">
        <PCard style={styles.card}>
          <PCard.Title title="Premium Yıllık Plan" subtitle="12 ay" />
          <PCard.Content>
            <View style={styles.priceRow}>
              <PText variant="bodyMedium">Plan Bedeli</PText>
              <PText variant="bodyMedium">₺899,00</PText>
            </View>
            <View style={styles.priceRow}>
              <PText variant="bodyMedium">Vergi</PText>
              <PText variant="bodyMedium">₺0,00</PText>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.priceRow}>
              <PText variant="titleMedium">Toplam</PText>
              <PText variant="titleMedium">₺899,00</PText>
            </View>
          </PCard.Content>
        </PCard>
        <PButton mode="contained" disabled={isOffline}>
          Satın Almayı Tamamla
        </PButton>
        <PButton mode="text" style={styles.secondaryButton} disabled={isOffline}>
          Kupon Kodu Gir
        </PButton>
      </SectionCard>

      <SectionCard title="Ödeme Yöntemi" actionLabel="Değiştir">
        <List.Item
          title="Visa •••• 4242"
          description="Son kullanım 08/26"
          left={(props) => <List.Icon {...props} icon="credit-card-outline" />}
        />
        <Divider />
        <List.Item
          title="Fatura Bilgileri"
          description="Kişisel"
          left={(props) => <List.Icon {...props} icon="file-document-outline" />}
        />
      </SectionCard>
    </>
  );
};

export const ProfileCheckoutScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Satın Alma" subtitle="Satın alma hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Özet">
          <SkeletonBlock height={120} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Satın Alma" subtitle="Satın alma detayları">
        <StateMessage
          title="Sepet boş"
          description="Bir plan seçtikten sonra satın alma ekranı açılacak."
          actionLabel="Planları Gör"
          icon="cart-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Satın Alma" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Satın alma yüklenemedi"
          description="Satın alma bilgilerini getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Satın Alma" subtitle="Önbellekteki satın alma">
        <OfflineNotice />
        <ProfileCheckoutContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Satın Alma" subtitle="Satın almayı tamamla">
      <ProfileCheckoutContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  secondaryButton: {
    marginTop: 8,
  },
});
