import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip, Divider, ProgressBar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "./components/OfflineNotice";
import { ScreenLayout } from "./components/ScreenLayout";
import { SectionCard } from "./components/SectionCard";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";
import { resolveScreenState, ScreenState } from "./components/ScreenState";
import { PButton, PCard, PText } from "../components";
import {
  getAddOnsForSubscription,
  getContentProgressForUser,
  getEbooks,
  getJourneyById,
  getJourneyDays,
  getJourneys,
  getPackages,
  getPlanForSubscription,
  getPrimaryUser,
  getSubscriptionForUser,
  getWorkshops,
} from "../data/mockSelectors";

const HomeReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const plan = getPlanForSubscription(subscription?.plan_id);
  const addOns = getAddOnsForSubscription(subscription?.id);
  const journeys = getJourneys();
  const journeyDays = getJourneyDays();
  const workshops = getWorkshops();
  const packages = getPackages();
  const ebooks = getEbooks();
  const progressItems = getContentProgressForUser(user?.id);
  const nextStep = progressItems.find((item) => item.status === "in_progress") ?? progressItems[0];
  const nextJourneyDay = journeyDays.find((day) => day.id === nextStep?.content_id);
  const nextJourney = getJourneyById(nextJourneyDay?.journey_id);

  const recommendations = [
    {
      title: workshops[0]?.title ?? "Sınır Koyma Atölyesi",
      subtitle: "45 dk · 4 bölüm",
      target: "ContentWorkshopDetail",
      id: workshops[0]?.id,
    },
    {
      title: ebooks[0]?.title ?? "Kendine Şefkat e-Kitap",
      subtitle: `${ebooks[0]?.total_pages ?? 120} sayfa`,
      target: "ContentEbookDetail",
      id: ebooks[0]?.id,
    },
  ];

  const activeItems = progressItems.slice(0, 3).map((item, index) => {
    if (item.content_type === "journey_day") {
      const day = journeyDays.find((entry) => entry.id === item.content_id);
      const journey = getJourneyById(day?.journey_id);
      return {
        title: journey?.title ?? "Yolculuk",
        subtitle: `Gün ${day?.day_number ?? 1} · ${journey?.daily_target ?? "10 dk"}`,
        progress: 0.2 + index * 0.2,
        action: () =>
          navigation.navigate("Content", {
            screen: "ContentJourneyDay",
            params: {
              id: journey?.id,
              day: String(day?.day_number ?? 1),
            },
          }),
      };
    }
    if (item.content_type === "package") {
      const pkg = packages.find((entry) => entry.id === item.content_id);
      return {
        title: pkg?.title ?? "Paket",
        subtitle: "Paket · Uygulama",
        progress: 0.3 + index * 0.2,
        action: () =>
          navigation.navigate("Content", {
            screen: "ContentPackageDetail",
            params: { id: pkg?.id },
          }),
      };
    }
    const workshop = workshops.find((entry) => entry.id === item.content_id);
    return {
      title: workshop?.title ?? "Atölye",
      subtitle: "Atölye · Okuma",
      progress: 0.4 + index * 0.2,
      action: () =>
        navigation.navigate("Content", {
          screen: "ContentWorkshopHome",
          params: { id: workshop?.id },
        }),
    };
  });

  const requiresSubscription = subscription?.status !== "active" && subscription?.status !== "trial";

  const handleEntryNavigation = (screen: string) => {
    if (requiresSubscription) {
      navigation.navigate("Content", { screen: "ContentPaywall" });
      return;
    }
    navigation.navigate("Discover", { screen });
  };

  const handleContinue = () => {
    if (!nextStep) {
      navigation.navigate("Discover");
      return;
    }
    if (nextStep.content_type === "journey_day") {
      navigation.navigate("Content", {
        screen: "ContentJourneyDay",
        params: {
          id: nextJourney?.id,
          day: String(nextJourneyDay?.day_number ?? 1),
        },
      });
      return;
    }
    if (nextStep.content_type === "package") {
      navigation.navigate("Content", {
        screen: "ContentPackageDetail",
        params: { id: nextStep.content_id },
      });
      return;
    }
    navigation.navigate("Content", {
      screen: "ContentWorkshopHome",
      params: { id: nextStep.content_id },
    });
  };

  return (
    <>
      <SectionCard title="Bugün" actionLabel="Tümü">
        <View style={styles.rowItem}>
          <View style={styles.rowHeader}>
            <PText variant="titleSmall">{nextJourney?.title ?? "Günlük Odak"}</PText>
            <Chip compact>{subscription?.status ?? "aktif"}</Chip>
          </View>
          <PText variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {nextJourneyDay
              ? `Gün ${nextJourneyDay.day_number} · ${nextJourney?.daily_target ?? "10 dk"}`
              : "Bugünkü içeriklerini tamamla"}
          </PText>
          <ProgressBar progress={0.4} style={styles.progress} />
        </View>
        <PButton mode="contained" style={styles.primaryButton} disabled={isOffline} onPress={handleContinue}>
          Devam Et
        </PButton>
      </SectionCard>

      <SectionCard title="Abonelik Durumu" actionLabel="Planlar">
        <View style={styles.rowHeader}>
          <PText variant="titleSmall">{plan?.name ?? "Plan"}</PText>
          <Chip compact>{subscription?.status ?? "aktif"}</Chip>
        </View>
        <PText variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {addOns.length > 0 ? "Aktif eklentiler:" : "Aktif eklenti yok"}
        </PText>
        <View style={styles.chipRow}>
          {addOns.map((addon) => (
            <Chip key={addon.id} style={styles.chip} disabled={isOffline}>
              {addon.name}
            </Chip>
          ))}
        </View>
        <PButton
          mode="outlined"
          disabled={isOffline}
          onPress={() => navigation.navigate("Profile", { screen: "ProfileSubscription" })}
        >
          Planı Yönet
        </PButton>
      </SectionCard>

      <SectionCard title="Hızlı Arama" actionLabel="">
        <PText variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          Tüm içeriklerde hızlı arama yap.
        </PText>
        <PButton
          mode="contained-tonal"
          style={styles.actionButton}
          disabled={isOffline}
          onPress={() => navigation.navigate("HomeSearch")}
        >
          Aramaya Başla
        </PButton>
      </SectionCard>

      <SectionCard title="İçerik Alanları" actionLabel="">
        <View style={styles.entryRow}>
          <PButton
            mode="outlined"
            style={styles.entryButton}
            disabled={isOffline}
            onPress={() => handleEntryNavigation("DiscoverJourneys")}
          >
            Yolculuklar
          </PButton>
          <PButton
            mode="outlined"
            style={styles.entryButton}
            disabled={isOffline}
            onPress={() => handleEntryNavigation("DiscoverWorkshops")}
          >
            Atölyeler
          </PButton>
        </View>
        <View style={styles.entryRow}>
          <PButton
            mode="outlined"
            style={styles.entryButton}
            disabled={isOffline}
            onPress={() => handleEntryNavigation("DiscoverModules")}
          >
            Modüller
          </PButton>
          <PButton
            mode="outlined"
            style={styles.entryButton}
            disabled={isOffline}
            onPress={() => handleEntryNavigation("DiscoverEbooks")}
          >
            e-Kitaplar
          </PButton>
        </View>
        <PButton
          mode="text"
          disabled={isOffline}
          onPress={() => navigation.navigate("Discover", { screen: "DiscoverCatalog" })}
        >
          Koçluk Okulu (yakında)
        </PButton>
      </SectionCard>

      <SectionCard title="Vicdandan Karaktere" actionLabel="Detay">
        <PText variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          Değer temelli gelişim yaklaşımımızın kısa bir özeti.
        </PText>
        <PButton
          mode="outlined"
          style={styles.actionButton}
          disabled={isOffline}
          onPress={() => navigation.navigate("HomeVicdandanKaraktereDetail")}
        >
          Detayları Gör
        </PButton>
      </SectionCard>

      <SectionCard title="Aktif İçeriklerim" actionLabel="Tümünü Gör">
        {activeItems.map((item, index) => (
          <View key={item.title} style={styles.rowItem}>
            <View style={styles.rowHeader}>
              <PText variant="titleSmall">{item.title}</PText>
              <Chip compact>{Math.round(item.progress * 100)}%</Chip>
            </View>
            {item.progress < 0.2 ? <Chip compact>Kilitli</Chip> : null}
            <PText variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {item.subtitle}
            </PText>
            <ProgressBar progress={item.progress} style={styles.progress} />
            <PButton mode="text" disabled={isOffline} onPress={item.action}>
              Devam Et
            </PButton>
            {index < activeItems.length - 1 ? <Divider style={styles.divider} /> : null}
          </View>
        ))}
        <PButton mode="outlined" disabled={isOffline} onPress={() => navigation.navigate("HomeActiveContentList")}>
          Tümünü Gör
        </PButton>
      </SectionCard>

      <SectionCard title="Önerilenler" actionLabel="Keşfet">
        {recommendations.map((item) => (
          <PCard key={item.title} style={styles.card}>
            <PCard.Title title={item.title} subtitle={item.subtitle} />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: item.target,
                    params: { id: item.id },
                  })
                }
              >
                İncele
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>

      <SectionCard title="Hızlı Başla" actionLabel="Rehber">
        <View style={styles.chipRow}>
          {[
            "Nefes Egzersizi",
            "Günlük Hedef",
            "Kısa Okuma",
          ].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
      </SectionCard>
    </>
  );
};

export const HomeDashboardScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Ana Sayfa" subtitle="İçerikler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={14} />
          <SkeletonBlock height={14} />
        </SectionCard>
        <SectionCard title="Yakında">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Ana Sayfa" subtitle="Yeni bir başlangıç yapalım">
        <StateMessage
          title="Henüz içerik yok"
          description="İlk yolculuğunu seçerek kişisel gelişim planını oluşturabilirsin."
          actionLabel="Keşfe Çık"
          icon="compass-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Ana Sayfa" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Ana sayfa yüklenemedi"
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
      <ScreenLayout title="Ana Sayfa" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <HomeReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Ana Sayfa" subtitle="Bugün için öneriler">
      <HomeReadyContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    marginBottom: 12,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progress: {
    marginTop: 8,
  },
  divider: {
    marginTop: 12,
  },
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  actionButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  entryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  entryButton: {
    marginRight: 8,
    marginBottom: 8,
  },
});
