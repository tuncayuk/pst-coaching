import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PIconButton, PText } from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

const ContentReadingContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PIconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <View style={styles.headerCenter}>
            <PText style={styles.headerTitle}>Paket 3: Dusunce Kaliplari</PText>
            <PText style={styles.headerSubtitle}>Bölüm 1: Otomatik Dusunceler</PText>
          </View>
          <PIconButton icon="dots-vertical" />
        </View>
        <View style={styles.headerMetaRow}>
          <PText style={styles.headerChip}>📖 Okuma</PText>
          <PText style={styles.headerMeta}>~12 dakika</PText>
        </View>
      </View>

      <View style={styles.body}>
        <PText style={styles.bodyTitle}>Otomatik Dusunceler</PText>
        <PText style={styles.bodyParagraph}>
          Zihnimiz her gün binlerce düşünce üretir. Bunların çoğu otomatiktir ve farkında bile
          olmadığımız hızda akar gider. Bu{" "}
          <PText style={styles.bodyHighlight}>otomatik düşünceler</PText>, yaşadığımız deneyimleri
          yorumlamamızı sağlar.
        </PText>
        <PText style={styles.bodyParagraph}>
          Ancak bu düşüncelerin hepsi gerçeği yansıtmaz. Bazen geçmiş deneyimlerimize,
          korkularımıza ya da çevremizden aldığımız mesajlara dayanır.
        </PText>

        <PCard style={styles.calloutCard}>
          <PText style={styles.calloutTitle}>💡 Ornek Otomatik Dusunceler</PText>
          <PText style={styles.calloutItem}>• \"Basaramayacagim.\"</PText>
          <PText style={styles.calloutItem}>• \"Herkes beni yargiliyor.\"</PText>
          <PText style={styles.calloutItem}>• \"Ben yeterince iyi degilim.\"</PText>
        </PCard>

        <PText style={styles.bodyParagraph}>
          Bu düşünceleri fark ettiğimizde, onları sorgulamaya ve daha gerçekçi alternatifler
          bulmaya başlayabiliriz.
        </PText>
      </View>

      <View style={styles.footer}>
        <PButton mode="contained" disabled={isOffline} style={styles.footerButton}>
          Uygulamaya Geç
        </PButton>
      </View>
    </View>
  );
};

export const ContentReadingScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={120} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Bölüm bulunamadı"
            description="Okuma içeriği şu anda erişilebilir değil."
            actionLabel="Geri Dön"
            icon="book-open-page-variant"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "error") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Okuma yüklenemedi"
            description="Bağlantını kontrol edip tekrar dene."
            actionLabel="Tekrar Dene"
            icon="alert-circle-outline"
            tone="error"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "offline") {
    return (
      <SafeAreaView style={styles.root}>
        <OfflineNotice />
        <ScrollView contentContainerStyle={styles.page}>
          <ContentReadingContent isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentReadingContent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  page: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2B1B5D",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#737373",
    marginTop: 2,
  },
  headerMetaRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  headerChip: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  headerMeta: {
    fontSize: 11,
    color: "#737373",
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  bodyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2B1B5D",
    marginBottom: 16,
  },
  bodyParagraph: {
    fontSize: 15,
    lineHeight: 26,
    color: "#171717",
    marginBottom: 16,
    textAlign: "justify",
  },
  bodyHighlight: {
    backgroundColor: "#FDE68A",
    color: "#111827",
  },
  calloutCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    borderLeftWidth: 4,
    borderLeftColor: "#1D4ED8",
    marginVertical: 12,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 8,
  },
  calloutItem: {
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 6,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  footerButton: {
    width: "100%",
  },
});
