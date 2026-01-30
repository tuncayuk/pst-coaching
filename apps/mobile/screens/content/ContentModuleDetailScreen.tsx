import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getModules, getPackages } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PCard,
  PDivider,
  PIconButton,
  PProgressBar,
  PText,
} from "../../components";

const moduleSections = [
  { title: "Giriş ve Tanımlar", duration: "8 dk" },
  { title: "Uygulama Adımları", duration: "12 dk" },
  { title: "Günlük Alıştırma", duration: "10 dk" },
];

const ContentModuleDetailContent = ({
  moduleId,
  isOffline,
}: {
  moduleId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const modules = getModules();
  const packages = getPackages();
  const module = modules.find((item) => item.id === moduleId) ?? modules[0];
  const packageCount = packages.filter((pkg) => pkg.module_id === module?.id).length || 5;

  return (
    <View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>📦</PText>
        <PIconButton icon="arrow-left" style={styles.heroBack} onPress={() => navigation.goBack()} />
        <PIconButton icon="heart-outline" style={styles.heroFav} />
      </View>

      <View style={styles.content}>
        <PText style={styles.title}>{module?.title ?? "Stres Yonetimi Modulu"}</PText>
        <View style={styles.tagRow}>
          <PText style={styles.tagChip}>📦 {packageCount} paket</PText>
          <PText style={styles.tagChip}>⏱️ 20 dk</PText>
          <PText style={styles.tagChip}>📊 Başlangıç</PText>
        </View>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Modül Özeti</PText>
          <PText style={styles.paragraph}>
            {module?.description ??
              "Modül, kısa egzersizlerle ilerleyerek günlük yaşamda uygulanabilir pratikler sunar."}
          </PText>
          <PText style={styles.metaText}>1/{packageCount} bölüm tamamlandı</PText>
          <PProgressBar progress={1 / Math.max(1, packageCount)} style={styles.progress} />
          <PButton mode="contained" disabled={isOffline}>
            Modüle Başla
          </PButton>
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Bölümler</PText>
          {moduleSections.map((section, index) => (
            <View key={section.title} style={styles.rowItem}>
              <View style={styles.rowHeader}>
                <PText style={styles.rowTitle}>{section.title}</PText>
                <PText style={styles.rowMeta}>{section.duration}</PText>
              </View>
              {index < moduleSections.length - 1 ? <PDivider style={styles.divider} /> : null}
            </View>
          ))}
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Önerilen Adımlar</PText>
          <PText style={styles.bullet}>• Her gün aynı saatte pratik yap</PText>
          <PText style={styles.bullet}>• Kısa notlar al</PText>
          <PText style={styles.bullet}>• Haftalık özetini kaydet</PText>
          <PButton mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
            Hatırlatıcı Kur
          </PButton>
        </PCard>
      </View>
    </View>
  );
};

export const ContentModuleDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const moduleId = route?.params?.id;

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
            title="Modül bulunamadı"
            description="Bu modül şu anda erişilebilir değil."
            actionLabel="Keşfe Dön"
            icon="cube-outline"
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
            title="Modül yüklenemedi"
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
          <ContentModuleDetailContent moduleId={moduleId} isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentModuleDetailContent moduleId={moduleId} />
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
    paddingBottom: 32,
  },
  hero: {
    height: 220,
    backgroundColor: "#E0F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  heroEmoji: {
    fontSize: 72,
  },
  heroBack: {
    position: "absolute",
    top: 12,
    left: 12,
  },
  heroFav: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
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
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 12,
    color: "#525252",
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
    marginBottom: 8,
  },
  metaText: {
    fontSize: 13,
    color: "#737373",
    marginBottom: 8,
  },
  progress: {
    marginTop: 4,
    marginBottom: 12,
  },
  rowItem: {
    paddingVertical: 8,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#171717",
  },
  rowMeta: {
    fontSize: 12,
    color: "#737373",
  },
  divider: {
    marginTop: 8,
  },
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  bullet: {
    fontSize: 13,
    color: "#525252",
    marginBottom: 6,
  },
});
