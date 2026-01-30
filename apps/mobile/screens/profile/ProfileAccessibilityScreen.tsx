import React from "react";
import { StyleSheet, View } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getAccessibilitySettings, getPrimaryUser } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PChip, PSwitch, PText } from "../../components";


const ProfileAccessibilityContent = ({ isOffline }: { isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const settings = getAccessibilitySettings().find((item) => item.user_id === user?.id);

  return (
    <>
      <SectionCard title="Erişilebilirlik">
        <PCard style={styles.card}>
          <PCard.Content style={styles.row}>
            <View style={styles.rowText}>
              <PText variant="bodyMedium">Yüksek Kontrast</PText>
              <PText variant="bodySmall" style={styles.subtleText}>
                Daha net metin ve arka plan
              </PText>
            </View>
            <PSwitch value={settings?.high_contrast ?? false} disabled={isOffline} />
          </PCard.Content>
        </PCard>
        <PCard style={styles.card}>
          <PCard.Content style={styles.row}>
            <View style={styles.rowText}>
              <PText variant="bodyMedium">Hareketi Azalt</PText>
              <PText variant="bodySmall" style={styles.subtleText}>
                Animasyonları minimize et
              </PText>
            </View>
            <PSwitch value={settings?.reduce_motion ?? false} disabled={isOffline} />
          </PCard.Content>
        </PCard>
      </SectionCard>

      <SectionCard title="Metin Boyutu">
        <PText variant="bodySmall" style={styles.subtleText}>
          Şu anki boyut: {settings?.text_size ?? "medium"}
        </PText>
        <View style={styles.chipRow}>
          {["small", "medium", "large"].map((size) => (
            <PChip key={size} style={styles.chip} disabled={isOffline}>
              {size}
            </PChip>
          ))}
        </View>
        <PButton mode="contained" disabled={isOffline}>
          Kaydet
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileAccessibilityScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Erişilebilirlik" subtitle="Ayarlar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Erişilebilirlik" subtitle="Ayar bulunamadı">
        <StateMessage
          title="Ayar bulunamadı"
          description="Erişilebilirlik ayarları yüklenemedi."
          actionLabel="Tekrar Dene"
          icon="accessibility"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Erişilebilirlik" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Ayarlar yüklenemedi"
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
      <ScreenLayout title="Erişilebilirlik" subtitle="Önbellekteki ayarlar">
        <OfflineNotice />
        <ProfileAccessibilityContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Erişilebilirlik" subtitle="Erişilebilirlik ayarları">
      <ProfileAccessibilityContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowText: {
    flex: 1,
    marginRight: 12,
  },
  subtleText: {
    opacity: 0.7,
    marginTop: 4,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
});
