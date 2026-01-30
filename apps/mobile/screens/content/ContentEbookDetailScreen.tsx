import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getEbookChaptersForEbook, getEbooks } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PCard,
  PChip,
  PIconButton,
  PText,
} from "../../components";

const ContentEbookDetailContent = ({ ebookId, isOffline }: { ebookId?: string; isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const ebooks = getEbooks();
  const ebook = ebooks.find((item) => item.id === ebookId) ?? ebooks[0];
  const chapters = getEbookChaptersForEbook(ebook.id).slice(0, 5);

  return (
    <View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>📖</PText>
        <PIconButton icon="arrow-left" style={styles.heroBack} onPress={() => navigation.goBack()} />
        <PIconButton icon="heart-outline" style={styles.heroFav} />
      </View>

      <View style={styles.content}>
        <PText style={styles.title}>{ebook?.title ?? "Şükür Şifresi"}</PText>
        <View style={styles.tagRow}>
          <PChip style={styles.tagChip}>📚 Şükür</PChip>
          <PChip style={styles.tagChip}>{ebook?.total_pages ?? 184} sayfa</PChip>
          <PChip style={styles.tagChip}>~3 saat okuma</PChip>
        </View>

        <PCard style={styles.relatedCard}>
          <PText style={styles.relatedText}>
            🎯 Yolculuk: Şükür Yolculuğu'nun parçası
          </PText>
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Kitap Hakkında</PText>
          <PText style={styles.paragraph}>
            Şükrün dönüştürücü gücünü keşfedin. Günlük hayatta şükrü nasıl yaşayacağınızı öğrenin.
          </PText>
          <View style={styles.metaBox}>
            <PText style={styles.metaText}><PText style={styles.metaLabel}>Yazar:</PText> PST Coaching Ekibi</PText>
            <PText style={styles.metaText}><PText style={styles.metaLabel}>Kategori:</PText> Kişisel Gelişim, Maneviyat</PText>
          </View>
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>İçindekiler</PText>
          {chapters.map((chapter, index) => (
            <PText key={chapter.id ?? index} style={styles.chapterItem}>
              {index + 1}. {chapter.title ?? `Bölüm ${index + 1}`}
            </PText>
          ))}
        </PCard>

        <PButton mode="contained" disabled={isOffline}>
          Okumaya Başla
        </PButton>
      </View>
    </View>
  );
};

export const ContentEbookDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
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
            title="e-Kitap bulunamadı"
            description="Bu e-Kitap şu anda erişilebilir değil."
            actionLabel="Keşfe Dön"
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
            title="e-Kitap yüklenemedi"
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
        <ScrollView contentContainerStyle={styles.page}>
          <OfflineNotice />
          <ContentEbookDetailContent ebookId={ebookId} isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentEbookDetailContent ebookId={ebookId} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  page: {
    paddingBottom: 24,
  },
  hero: {
    height: 280,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },
  heroEmoji: {
    fontSize: 80,
  },
  heroBack: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  heroFav: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tagChip: {
    backgroundColor: "#E0F7FA",
  },
  relatedCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#E0F7FA",
    borderLeftWidth: 4,
    borderLeftColor: "#00B4D8",
    marginBottom: 12,
  },
  relatedText: {
    fontSize: 13,
    color: "#404040",
  },
  sectionCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: "#525252",
    lineHeight: 20,
    marginBottom: 12,
  },
  metaBox: {
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    padding: 12,
  },
  metaText: {
    fontSize: 12,
    color: "#525252",
    marginBottom: 4,
  },
  metaLabel: {
    fontWeight: "700",
  },
  chapterItem: {
    fontSize: 13,
    color: "#404040",
    marginBottom: 6,
  },
});
