import React from "react";
import { StyleSheet } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getAchievements, getPrimaryUser } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PChip, PText } from "../../components";


type RouteParams = { state?: ScreenState; id?: string };

const ContentAchievementContent = ({
  achievementId,
  isOffline,
}: {
  achievementId?: string;
  isOffline?: boolean;
}) => {
  const user = getPrimaryUser();
  const achievement =
    getAchievements().find((item) => item.id === achievementId) ??
    getAchievements().find((item) => item.user_id === user?.id);

  return (
    <>
      <SectionCard title="Başarım">
        <PText variant="titleMedium">
          {achievement?.type === "certificate" ? "Sertifika" : "Rozet"}
        </PText>
        <PText variant="bodySmall" style={styles.subtleText}>
          {achievement?.source_type ?? "İçerik"} tamamlandığında verildi.
        </PText>
        <PChip style={styles.chip} disabled={isOffline}>
          {achievement?.issued_at?.slice(0, 10) ?? "2026-01-10"}
        </PChip>
      </SectionCard>

      <SectionCard title="Paylaş">
        <PCard style={styles.card}>
          <PCard.Title title="Başarımını paylaş" subtitle="PDF veya görsel olarak gönder" />
          <PCard.Actions>
            <PButton mode="contained" disabled={isOffline}>
              Paylaş
            </PButton>
            <PButton mode="outlined" disabled={isOffline}>
              İndir
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>
    </>
  );
};

export const ContentAchievementScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const achievementId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Sertifika/Rozet" subtitle="Başarım hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={14} />
        </SectionCard>
        <SectionCard title="Paylaş">
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Sertifika/Rozet" subtitle="Başarım bulunamadı">
        <StateMessage
          title="Başarım bulunamadı"
          description="Henüz bir sertifika veya rozetin yok."
          actionLabel="İçeriklere Git"
          icon="trophy-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Sertifika/Rozet" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Başarım yüklenemedi"
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
      <ScreenLayout title="Sertifika/Rozet" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentAchievementContent achievementId={achievementId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Sertifika/Rozet" subtitle="Başarımın">
      <ContentAchievementContent achievementId={achievementId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  subtleText: {
    opacity: 0.7,
    marginTop: 4,
  },
  chip: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
});
