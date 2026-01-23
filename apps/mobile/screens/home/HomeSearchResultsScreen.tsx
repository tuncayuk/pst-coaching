import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const resultGroups = [
  {
    title: "Yolculuklar",
    items: ["Öz Şefkat", "Duygusal Dayanıklılık"],
  },
  {
    title: "Atölyeler",
    items: ["Zor Konuşmalar", "Sınır Koyma"],
  },
  {
    title: "Modüller",
    items: ["Stres Yönetimi", "İletişim Becerileri"],
  },
  {
    title: "e-Kitaplar",
    items: ["İç Sesinle Dostluk", "Kendini Anlama"],
  },
];

const HomeSearchResultsContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Filtreler" actionLabel="Sıfırla">
        <View style={styles.filterRow}>
          {["Tümü", "Yeni", "Kısa", "Sesli"].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <Text variant="bodySmall">12 sonuç bulundu</Text>
      </SectionCard>

      {resultGroups.map((group) => (
        <SectionCard key={group.title} title={group.title} actionLabel="Tümü">
          {group.items.map((item) => (
            <Card key={item} style={styles.card}>
              <Card.Title title={item} subtitle="30-45 dk · 4 içerik" />
              <Card.Actions>
                <Button mode="outlined" disabled={isOffline}>
                  İncele
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </SectionCard>
      ))}
    </>
  );
};

export const HomeSearchResultsScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Arama Sonuçları" subtitle="Sonuçlar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Sonuçlar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Arama Sonuçları" subtitle="Sonuç bulunamadı">
        <StateMessage
          title="Sonuç bulunamadı"
          description="Aramanı genişletmeyi veya filtreleri temizlemeyi deneyebilirsin."
          actionLabel="Filtreleri Temizle"
          icon="magnify"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Arama Sonuçları" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Arama sonuçları yüklenemedi"
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
      <ScreenLayout title="Arama Sonuçları" subtitle="Önbellekteki sonuçlar">
        <OfflineNotice />
        <HomeSearchResultsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Arama Sonuçları" subtitle="Araman için öneriler">
      <HomeSearchResultsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
});
