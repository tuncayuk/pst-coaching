import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getEbooks,
  getJourneyById,
  getModules,
  getWorkshops,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PCard,
  PChip,
  PIconButton,
  PText,
} from "../../components";

const ContentJourneyDetailContent = ({ journeyId, isOffline }: { journeyId?: string; isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const journey = getJourneyById(journeyId);
  const modules = getModules().slice(0, 3);
  const workshops = getWorkshops().slice(0, 2);
  const ebooks = getEbooks().slice(0, 2);
  const duration = journey?.duration_days ?? 40;
  const dailyGoal = journey?.daily_target ?? "10-20 dk";

  return (
    <View>
      <View style={styles.headerRow}>
        <PIconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <PText style={styles.headerTitle}>Yolculuk Detay</PText>
      </View>

      <PCard style={styles.heroCard}>
        <PText style={styles.heroTitle}>{journey?.title ?? "Sıdk ve Integrity Yolculuğu"}</PText>
        <PText style={styles.heroDescription}>
          Kendine şefkatli bir yaklaşım geliştirirken her gün küçük adımlarla ilerleyebileceğin
          yapılandırılmış bir program.
        </PText>
        <View style={styles.metaRow}>
          <PChip style={styles.metaChip}>{duration} gün</PChip>
          <PChip style={styles.metaChip}>{dailyGoal}</PChip>
        </View>
        <View style={styles.heroActions}>
          <PButton mode="contained" disabled={isOffline}>
            Yolculuğu Başlat
          </PButton>
          <PButton mode="outlined" disabled={isOffline}>
            Favorilere Ekle
          </PButton>
        </View>
      </PCard>

      <View style={styles.section}>
        <PText style={styles.sectionTitle}>Modüller</PText>
        {modules.map((item) => (
          <PCard key={item.id} style={styles.listCard}>
            <PText style={styles.listTitle}>{item.title}</PText>
            <PText style={styles.listSubtitle}>4 ders • 45 dk</PText>
          </PCard>
        ))}
      </View>

      <View style={styles.section}>
        <PText style={styles.sectionTitle}>Atölyeler</PText>
        {workshops.map((item) => (
          <PCard key={item.id} style={styles.listCard}>
            <PText style={styles.listTitle}>{item.title}</PText>
            <PText style={styles.listSubtitle}>60 dk • Orta seviye</PText>
          </PCard>
        ))}
      </View>

      <View style={styles.section}>
        <PText style={styles.sectionTitle}>e-Kitaplar</PText>
        {ebooks.map((item) => (
          <PCard key={item.id} style={styles.listCard}>
            <PText style={styles.listTitle}>{item.title}</PText>
            <PText style={styles.listSubtitle}>180 sayfa • TR</PText>
          </PCard>
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const ContentJourneyDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const journeyId = route?.params?.id;

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={120} />
          <SkeletonBlock height={120} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Yolculuk bulunamadı"
            description="Bu yolculuk şu anda erişilebilir değil."
            actionLabel="Keşfe Dön"
            icon="map-outline"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "error") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Yolculuk yüklenemedi"
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
        <ScrollView contentContainerStyle={styles.content}>
          <OfflineNotice />
          <ContentJourneyDetailContent journeyId={journeyId} isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <ContentJourneyDetailContent journeyId={journeyId} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2B1B5D",
  },
  heroCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: "#525252",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  metaChip: {
    backgroundColor: "#E0F7FA",
  },
  heroActions: {
    gap: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 12,
  },
  listCard: {
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 4,
  },
  listSubtitle: {
    fontSize: 12,
    color: "#525252",
  },
  bottomSpacer: {
    height: 24,
  },
});
