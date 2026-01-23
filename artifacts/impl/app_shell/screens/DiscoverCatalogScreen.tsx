import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Text,
  useTheme,
} from "react-native-paper";
import { OfflineNotice } from "./components/OfflineNotice";
import { ScreenLayout } from "./components/ScreenLayout";
import { SectionCard } from "./components/SectionCard";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";
import { resolveScreenState } from "./components/ScreenState";

const discoverSections = [
  {
    title: "Yolculuklar",
    items: ["Duygusal Dayanıklılık", "Öz Şefkat", "Sınır Koyma"],
  },
  {
    title: "Atölyeler",
    items: ["Zor Konuşmalar", "Yeniden Başlangıç", "Nefes ve Odak"],
  },
  {
    title: "Modüller",
    items: ["Stres Yönetimi", "İlişki Dinamikleri", "Güçlü Alışkanlıklar"],
  },
  {
    title: "e-Kitaplar",
    items: ["Kendini Anlama", "Duygularla Barış", "İç Sesinle Dostluk"],
  },
];

const DiscoverReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();

  return (
    <>
      <SectionCard title="Senin İçin" actionLabel="Filtrele">
        <View style={styles.chipRow}>
          {["Önerilen", "Yeni", "Kısa", "Sesli"].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
      </SectionCard>

      {discoverSections.map((section) => (
        <SectionCard key={section.title} title={section.title} actionLabel="Tümü">
          {section.items.map((item) => (
            <Card key={item} style={styles.card}>
              <Card.Title title={item} subtitle="30-60 dk · 4 bölüm" />
              <Card.Actions>
                <Button mode="outlined" disabled={isOffline}>
                  İncele
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </SectionCard>
      ))}

      <SectionCard title="Haftanın Teması" actionLabel="Paylaş">
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Bu hafta sınır koyma ve öz saygı odağında seçkiler hazırladık. Kendine uygun bir
          yolculukla başlayabilirsin.
        </Text>
        <Button mode="contained" style={styles.primaryButton} disabled={isOffline}>
          Temayı Keşfet
        </Button>
      </SectionCard>
    </>
  );
};

export const DiscoverCatalogScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Keşfet" subtitle="İçerikler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Kategoriler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Keşfet" subtitle="Yeni içerikler yolda">
        <StateMessage
          title="Henüz içerik yok"
          description="Yakında yeni yolculuklar ve atölyeler eklenecek. Bildirimleri açarak
          haberdar olabilirsin."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Keşfet" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Keşfet yüklenemedi"
          description="Sunucuya bağlanamadık. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Keşfet" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <DiscoverReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Keşfet" subtitle="Yeni içerikleri keşfet">
      <DiscoverReadyContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
