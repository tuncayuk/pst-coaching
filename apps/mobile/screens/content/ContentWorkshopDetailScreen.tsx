import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getWorkshops } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PCard,
  PChip,
  PDivider,
  PIconButton,
  PText,
} from "../../components";

const sessionItems = [
  { title: "Nefes ve Regülasyon", time: "20 dk" },
  { title: "Grup Paylaşımı", time: "35 dk" },
  { title: "Kapanış Ritüeli", time: "15 dk" },
];

const prepChecklist = ["Rahat bir alan oluştur", "Su ve not defteri hazırla", "Kulaklık kullan"];

const ContentWorkshopDetailContent = ({
  workshopId,
  isOffline,
}: {
  workshopId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const workshops = getWorkshops();
  const workshop = workshops.find((item) => item.id === workshopId) ?? workshops[0];

  return (
    <View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>🎨</PText>
        <PIconButton icon="arrow-left" style={styles.heroBack} onPress={() => navigation.goBack()} />
        <PIconButton icon="heart-outline" style={styles.heroFav} />
      </View>

      <View style={styles.content}>
        <PText style={styles.title}>{workshop?.title ?? "Duygusal Dayaniklilik Atolyesi"}</PText>
        <View style={styles.tagRow}>
          <PChip style={styles.tagChip}>Canlı</PChip>
          <PChip style={styles.tagChip}>24 Ocak · 20:00</PChip>
          <PChip style={styles.tagChip}>8 okuma • 4 uygulama</PChip>
        </View>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Atölye Hakkında</PText>
          <PText style={styles.paragraph}>
            {workshop?.description ??
              "Canli uygulamalar, paylasim ve destekleyici egzersizlerle ilerleyen bir atölye."}
          </PText>
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Eğitmen</PText>
          <PText style={styles.paragraph}>Uzm. Psk. Aylin K.</PText>
          <PText style={styles.metaText}>
            Zoom bağlantısı etkinlikten 15 dk önce paylaşılır.
          </PText>
          <PButton mode="contained" disabled={isOffline} style={styles.primaryButton}>
            Yerini Ayırt
          </PButton>
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Oturum Akışı</PText>
          {sessionItems.map((session, index) => (
            <View key={session.title} style={styles.rowItem}>
              <View style={styles.rowHeader}>
                <PText style={styles.rowTitle}>{session.title}</PText>
                <PText style={styles.rowMeta}>{session.time}</PText>
              </View>
              {index < sessionItems.length - 1 ? <PDivider style={styles.divider} /> : null}
            </View>
          ))}
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Hazırlık Listesi</PText>
          {prepChecklist.map((item) => (
            <PText key={item} style={styles.bullet}>
              • {item}
            </PText>
          ))}
          <PButton mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
            Not Al
          </PButton>
        </PCard>
      </View>
    </View>
  );
};

export const ContentWorkshopDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

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
            title="Atölye bulunamadı"
            description="Bu atölye şu anda erişilebilir değil."
            actionLabel="Keşfe Dön"
            icon="calendar-remove"
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
            title="Atölye yüklenemedi"
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
          <ContentWorkshopDetailContent workshopId={workshopId} isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentWorkshopDetailContent workshopId={workshopId} />
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
    height: 240,
    backgroundColor: "#FFE4E6",
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
    marginBottom: 12,
  },
  primaryButton: {
    alignSelf: "flex-start",
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
  bullet: {
    marginBottom: 6,
  },
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
