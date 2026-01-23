import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  List,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const benefits = ["Sınırsız içerik", "Offline indirme", "Aile paylaşımı"];

const ProfileSubscriptionContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Plan" actionLabel="Karşılaştır">
        <Card style={styles.card}>
          <Card.Title title="Yıllık Premium" subtitle="Sonraki yenileme 12 Ocak 2026" />
          <Card.Content>
            <View style={styles.row}>
              <Chip compact>Aktif</Chip>
              <Text variant="bodySmall">₺899,00 / yıl</Text>
            </View>
            <View style={styles.benefitList}>
              {benefits.map((benefit) => (
                <Text key={benefit} variant="bodySmall">
                  • {benefit}
                </Text>
              ))}
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Planı Yönet
            </Button>
          </Card.Actions>
        </Card>
        <Button mode="outlined" disabled={isOffline}>
          Fatura Bilgileri
        </Button>
      </SectionCard>

      <SectionCard title="Ek Özellikler" actionLabel="">
        <List.Item
          title="Add-on Yönetimi"
          description="2 aktif eklenti"
          left={(props) => <List.Icon {...props} icon="puzzle" />}
        />
        <Divider />
        <List.Item
          title="Kişi Yönetimi"
          description="2/4 koltuk kullanılıyor"
          left={(props) => <List.Icon {...props} icon="account-multiple" />}
        />
        <Divider />
        <List.Item
          title="Öğrenci İndirimi"
          description="Uygunluk kontrolü"
          left={(props) => <List.Icon {...props} icon="school-outline" />}
        />
      </SectionCard>

      <SectionCard title="Satın Alma" actionLabel="">
        <Button mode="contained-tonal" disabled={isOffline}>
          Yeni Plan Satın Al
        </Button>
        <Button mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Satın Alımları Geri Yükle
        </Button>
        <Button mode="text" disabled={isOffline}>
          Ödeme Geçmişi
        </Button>
      </SectionCard>
    </>
  );
};

export const ProfileSubscriptionScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Abonelik" subtitle="Abonelik hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Plan">
          <SkeletonBlock height={120} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Abonelik" subtitle="Plan bilgileri">
        <StateMessage
          title="Abonelik bulunamadı"
          description="Henüz aktif bir planın yok. Planları inceleyebilirsin."
          actionLabel="Planları Gör"
          icon="calendar-plus"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Abonelik" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Abonelik yüklenemedi"
          description="Plan bilgilerini getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Abonelik" subtitle="Önbellekteki plan">
        <OfflineNotice />
        <ProfileSubscriptionContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Abonelik" subtitle="Planını yönet">
      <ProfileSubscriptionContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  benefitList: {
    marginTop: 8,
  },
  secondaryButton: {
    marginTop: 8,
  },
});
