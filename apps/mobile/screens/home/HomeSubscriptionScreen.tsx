import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PChip, PDivider, PText } from "../../components";

/** AC-FR-E2-02-01: Subscription status types */
type SubscriptionStatus = "active" | "trial" | "cancelled";

const STATUS_CONFIG: Record<
  SubscriptionStatus,
  { label: string; bg: string; text: string; borderColor: string }
> = {
  active: { label: "Aktif", bg: "#D1FAE5", text: "#065F46", borderColor: "#34D399" },
  trial: { label: "Deneme", bg: "#FEF3C7", text: "#92400E", borderColor: "#FCD34D" },
  cancelled: { label: "Iptal", bg: "#FEE2E2", text: "#991B1B", borderColor: "#FCA5A5" },
};

/** Mock add-ons - will come from subscription entity in real integration */
const MOCK_ADDONS = [
  { id: "1", name: "Kocluk Okulu Erisimi", active: true },
  { id: "2", name: "Sonsuz e-Kitap Erisimi", active: true },
  { id: "3", name: "Grup Atolyesi", active: false },
];

const HomeSubscriptionContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  // Mock: in real app this comes from auth/subscription state
  const status: SubscriptionStatus = "active";
  const config = STATUS_CONFIG[status];
  const renewalDate = "15 Mayis 2026";
  const planName = "PST Premium";

  return (
    <>
      {/* AC-FR-E2-02-01: Plan status badge + details */}
      <SectionCard title="Plan Bilgisi">
        <View style={styles.planHeader}>
          <View
            style={[styles.statusBadge, { backgroundColor: config.bg, borderColor: config.borderColor }]}
            accessibilityLabel={`Plan durumu: ${config.label}`}
            accessibilityRole="text"
          >
            <PText style={[styles.statusBadgeText, { color: config.text }]}>
              {config.label}
            </PText>
          </View>
          <View style={styles.planInfo}>
            <PText style={styles.planName}>{planName}</PText>
            <PText style={styles.planRenewal}>Yenileme: {renewalDate}</PText>
          </View>
        </View>
        <PDivider style={styles.divider} />
        <PButton
          mode="outlined"
          style={styles.manageButton}
          disabled={isOffline}
          onPress={() =>
            navigation.navigate("Subscription", { screen: "SubscriptionPlanSelect" })
          }
          accessibilityLabel="Plani yonet veya yukselt"
          accessibilityHint="Abonelik ekranina gider"
        >
          Plani Yonet
        </PButton>
      </SectionCard>

      {/* AC-FR-E2-02-02: Active add-ons list */}
      <SectionCard title="Aktif Ek Paketler">
        {MOCK_ADDONS.map((addon) => (
          <PCard key={addon.id} style={styles.addonCard}>
            <View style={styles.addonRow}>
              <PText style={styles.addonName}>{addon.name}</PText>
              <PChip
                compact
                style={addon.active ? styles.addonActiveChip : styles.addonInactiveChip}
                accessibilityLabel={`${addon.name}: ${addon.active ? "aktif" : "pasif"}`}
              >
                {addon.active ? "Aktif" : "Pasif"}
              </PChip>
            </View>
          </PCard>
        ))}
        {!isOffline && (
          <PButton
            mode="text"
            style={styles.upgradeButton}
            onPress={() =>
              navigation.navigate("Subscription", { screen: "SubscriptionPlanSelect" })
            }
            accessibilityLabel="Yeni paket ekle"
          >
            + Paket Ekle
          </PButton>
        )}
      </SectionCard>

      {/* AC-FR-E2-02-03: Paywall explanation hint */}
      <SectionCard title="Kisitli Icerik Hakkinda">
        <PCard style={styles.paywallInfoCard}>
          <PText style={styles.paywallInfoText}>
            Kilitli iceriklere tikladiginizda neden erisemediginiz ve nasil erisebileceginiz
            aciklanir. Hicbir icerik gizlice kilitlenmez.
          </PText>
        </PCard>
      </SectionCard>
    </>
  );
};

export const HomeSubscriptionScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Abonelik" subtitle="Plan bilgisi yukleniyor">
        <SectionCard title="Plan">
          <PActivityIndicator animating />
          <SkeletonBlock height={56} />
        </SectionCard>
        <SectionCard title="Ek Paketler">
          <SkeletonBlock height={48} />
          <SkeletonBlock height={48} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Abonelik" subtitle="Plan bulunamadi">
        <StateMessage
          title="Aktif abonelik yok"
          description="Hemen bir plana katilarak tum iceriklere erisebilirsin."
          actionLabel="Planlara Bak"
          icon="crown-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Abonelik" subtitle="Bir sorun olustu">
        <StateMessage
          title="Abonelik bilgisi yuklenemedi"
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
      <ScreenLayout title="Abonelik" subtitle="Onbellekteki plan bilgisi">
        <OfflineNotice />
        <HomeSubscriptionContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Abonelik" subtitle="Plan ve ek paketlerin">
      <HomeSubscriptionContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1.5,
    alignSelf: "flex-start",
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 2,
  },
  planRenewal: {
    fontSize: 12,
    color: "#525252",
  },
  divider: {
    marginBottom: 12,
  },
  manageButton: {
    alignSelf: "flex-start",
    minHeight: 48,
  },
  addonCard: {
    marginBottom: 8,
    padding: 12,
  },
  addonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addonName: {
    fontSize: 14,
    color: "#171717",
    flex: 1,
    marginRight: 8,
  },
  addonActiveChip: {
    backgroundColor: "#D1FAE5",
  },
  addonInactiveChip: {
    backgroundColor: "#F5F5F5",
  },
  upgradeButton: {
    marginTop: 4,
    alignSelf: "flex-start",
    minHeight: 48,
  },
  paywallInfoCard: {
    backgroundColor: "#F0F9FF",
    borderLeftWidth: 4,
    borderLeftColor: "#00B4D8",
    padding: 14,
  },
  paywallInfoText: {
    fontSize: 13,
    color: "#0C4A6E",
    lineHeight: 20,
  },
});
