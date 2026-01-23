import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  TextInput,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const quickFilters = ["Yolculuk", "Atölye", "Modül", "e-Kitap"];
const recentSearches = ["Öz şefkat", "Sınır koyma", "Nefes egzersizi"];
const popularTopics = [
  {
    title: "Duygusal Dayanıklılık",
    subtitle: "6 gün · 4 içerik",
  },
  {
    title: "Zor Konuşmalar",
    subtitle: "2 bölüm · 35 dk",
  },
];

const HomeSearchContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Arama" actionLabel="Filtrele">
        <TextInput
          label="İçerik, konu veya yazar ara"
          mode="outlined"
          placeholder="Örn: öz şefkat, stres yönetimi"
          style={styles.input}
          editable={!isOffline}
        />
        <View style={styles.chipRow}>
          {quickFilters.map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <Button mode="contained" disabled={isOffline}>
          Ara
        </Button>
      </SectionCard>

      <SectionCard title="Son Aramalar" actionLabel="Temizle">
        <View style={styles.chipRow}>
          {recentSearches.map((term) => (
            <Chip key={term} style={styles.chip} disabled={isOffline}>
              {term}
            </Chip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Popüler Konular" actionLabel="Tümü">
        {popularTopics.map((topic) => (
          <Card key={topic.title} style={styles.card}>
            <Card.Title title={topic.title} subtitle={topic.subtitle} />
            <Card.Actions>
              <Button mode="outlined" disabled={isOffline}>
                İncele
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>
    </>
  );
};

export const HomeSearchScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Arama" subtitle="Arama yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Öneriler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Arama" subtitle="Yeni içerikler keşfet">
        <StateMessage
          title="Henüz arama yok"
          description="İlgi alanına göre öneriler görmek için arama yapabilirsin."
          actionLabel="Keşfe Çık"
          icon="magnify"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Arama" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Arama yüklenemedi"
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
      <ScreenLayout title="Arama" subtitle="Önbellekteki aramalar">
        <OfflineNotice />
        <HomeSearchContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Arama" subtitle="İçeriklerde ara">
      <HomeSearchContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
});
