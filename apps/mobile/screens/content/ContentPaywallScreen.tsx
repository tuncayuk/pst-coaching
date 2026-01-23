import React from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const planBenefits = [
  "Sınırsız içerik erişimi",
  "Yeni içerik bildirimleri",
  "Çevrimdışı indirme",
];

const ContentPaywallContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Abonelik Gerekli">
        <Text variant="bodyMedium" style={styles.paragraph}>
          Bu içeriği görüntülemek için aktif bir abonelik gerekiyor. Sana uygun planı seçerek
          hemen devam edebilirsin.
        </Text>
      </SectionCard>

      <SectionCard title="Planlar">
        <Card style={styles.card}>
          <Card.Title title="Aylık Plan" subtitle="149 ₺ / ay" />
          <Card.Content>
            {planBenefits.map((benefit) => (
              <Text key={benefit} variant="bodySmall" style={styles.bullet}>
                • {benefit}
              </Text>
            ))}
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Aboneliği Başlat
            </Button>
          </Card.Actions>
        </Card>
        <Divider style={styles.divider} />
        <Card style={styles.card}>
          <Card.Title title="Yıllık Plan" subtitle="99 ₺ / ay" />
          <Card.Content>
            <Text variant="bodySmall">12 ay peşin ödeme ile daha avantajlı.</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" disabled={isOffline}>
              Yıllık Planı Seç
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>
    </>
  );
};

export const ContentPaywallScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Abonelik Gerekli" subtitle="Abonelik seçenekleri hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Planlar">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Abonelik Gerekli" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Plan bulunamadı"
          description="Şu anda listelenecek plan yok."
          actionLabel="Destek ile İletişim"
          icon="credit-card-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Abonelik Gerekli" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Planlar yüklenemedi"
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
      <ScreenLayout title="Abonelik Gerekli" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentPaywallContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Abonelik Gerekli" subtitle="Abonelik planını seç">
      <ContentPaywallContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 8,
  },
  card: {
    marginTop: 4,
  },
  bullet: {
    marginBottom: 6,
  },
  divider: {
    marginVertical: 12,
  },
});
