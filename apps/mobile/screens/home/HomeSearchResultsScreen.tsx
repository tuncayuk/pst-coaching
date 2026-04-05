import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getEbooks, getJourneys, getModules, getWorkshops } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PChip, PText } from "../../components";

type ContentFilter = "Tumu" | "Yeni" | "Kisa" | "Sesli";
const CONTENT_FILTERS: ContentFilter[] = ["Tumu", "Yeni", "Kisa", "Sesli"];

const TYPE_CHIP_COLORS: Record<string, { bg: string; text: string }> = {
  Yolculuklar: { bg: "#E0F7FA", text: "#0096B8" },
  Atolyeler: { bg: "#EDE9FE", text: "#7C3AED" },
  Moduller: { bg: "#D1FAE5", text: "#065F46" },
  "e-Kitaplar": { bg: "#FEF3C7", text: "#92400E" },
};

const HomeSearchResultsContent = ({
  isOffline,
  query,
}: {
  isOffline?: boolean;
  query?: string;
}) => {
  const navigation = useNavigation<any>();
  const resultGroups = [
    {
      title: "Yolculuklar",
      items: getJourneys().map((item) => ({ id: item.id, title: item.title, route: "ContentJourneyDetail", meta: "30-45 dk -- 4 gun" })),
    },
    {
      title: "Atolyeler",
      items: getWorkshops().map((item) => ({ id: item.id, title: item.title, route: "ContentWorkshopDetail", meta: "60 dk -- 3 bolum" })),
    },
    {
      title: "Moduller",
      items: getModules().map((item) => ({ id: item.id, title: item.title, route: "ContentModuleHome", meta: "15 dk -- 1 modul" })),
    },
    {
      title: "e-Kitaplar",
      items: getEbooks().map((item) => ({ id: item.id, title: item.title, route: "ContentEbookDetail", meta: "120 sayfa" })),
    },
  ];
  const totalCount = resultGroups.reduce((sum, group) => sum + group.items.length, 0);

  // AC-FR-E2-07-04: analytics event on mount
  useEffect(() => {
    // analytics.track("recent_content_viewed", { query, totalCount });
  }, []);

  return (
    <>
      <SectionCard title="Filtreler" actionLabel="Sifirla">
        <View style={styles.filterRow}>
          {CONTENT_FILTERS.map((label) => (
            <PChip
              key={label}
              style={styles.chip}
              disabled={isOffline}
              accessibilityLabel={`Filtre: ${label}`}
              accessibilityRole="button"
            >
              {label}
            </PChip>
          ))}
        </View>
        <PText variant="bodySmall" style={styles.resultCount}>
          {query ? `"${query}" icin ` : ""}{totalCount} sonuc bulundu
        </PText>
      </SectionCard>

      {resultGroups.map((group) => {
        const typeColor = TYPE_CHIP_COLORS[group.title] ?? { bg: "#F5F5F5", text: "#404040" };
        return (
          <SectionCard key={group.title} title={group.title} actionLabel="Tumu">
            {group.items.map((item) => (
              <PCard key={item.id} style={styles.card}>
                <PCard.Content>
                  <View style={styles.cardHeader}>
                    <View style={[styles.typeChip, { backgroundColor: typeColor.bg }]}>
                      <PText style={[styles.typeChipText, { color: typeColor.text }]}>
                        {group.title}
                      </PText>
                    </View>
                  </View>
                  <PText style={styles.cardTitle}>{item.title}</PText>
                  <PText style={styles.cardMeta}>{item.meta}</PText>
                </PCard.Content>
                <PCard.Actions>
                  <PButton
                    mode="outlined"
                    disabled={isOffline}
                    onPress={() => {
                      // AC-FR-E2-07-04: analytics on item click
                      // analytics.track("recent_content_item_clicked", { id: item.id, type: group.title });
                      navigation.navigate("Content", {
                        screen: item.route,
                        params: { id: item.id },
                      });
                    }}
                    accessibilityLabel={`${item.title} icin Incele`}
                  >
                    Incele
                  </PButton>
                </PCard.Actions>
              </PCard>
            ))}
          </SectionCard>
        );
      })}
    </>
  );
};

export const HomeSearchResultsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; query?: string; activeFilter?: string } };
}) => {
  const state = resolveScreenState(route);
  const query = route?.params?.query;

  if (state === "loading") {
    return (
      <ScreenLayout title="Arama Sonuclari" subtitle="Sonuclar hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Sonuclar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout
        title="Arama Sonuclari"
        subtitle={query ? `"${query}" icin sonuc yok` : "Sonuc bulunamadi"}
      >
        <StateMessage
          title="Sonuc bulunamadi"
          description="Aramani genisletmeyi veya filtreleri temizlemeyi deneyebilirsin."
          actionLabel="Filtreleri Temizle"
          icon="magnify"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Arama Sonuclari" subtitle="Bir sorun olustu">
        <StateMessage
          title="Arama sonuclari yuklenemedi"
          description="Baglantiyi kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Arama Sonuclari" subtitle="Cevrimdisi desteklenmez">
        <OfflineNotice />
        <HomeSearchResultsContent isOffline query={query} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      title="Arama Sonuclari"
      subtitle={query ? `"${query}" sonuclari` : "Araman icin oneriler"}
    >
      <HomeSearchResultsContent query={query} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    minHeight: 36,
  },
  resultCount: {
    color: "#525252",
    marginTop: 4,
  },
  card: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 6,
  },
  typeChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  typeChipText: {
    fontSize: 11,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 2,
  },
  cardMeta: {
    fontSize: 12,
    color: "#525252",
  },
});
