import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getContentItemsForParent,
  getContentProgressForUser,
  getPrimaryUser,
  getWorkshopById,
  getWorkshops,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PChip,
  PDivider,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-02-02: stage type labels
const STAGE_TYPE_MAP: Record<number, { label: string; color: string }> = {
  1: { label: "Referans", color: "#7C4DFF" },
  2: { label: "Icgoru",   color: "#00897B" },
  3: { label: "Referans", color: "#7C4DFF" },
  4: { label: "Icgoru",   color: "#00897B" },
  5: { label: "Referans", color: "#7C4DFF" },
  6: { label: "Icgoru",   color: "#00897B" },
  7: { label: "Entegrasyon", color: "#F57C00" },
  8: { label: "3-Gun Kamp",  color: "#C62828" },
  9: { label: "Egitmen Rehberi", color: "#283593" },
  10: { label: "Calisma Kitabi", color: "#2E7D32" },
  11: { label: "Kapanis",    color: "#6D4C41" },
};

// AC-FR-E8-02-03: lock conditions
const LOCK_REASON: Record<number, string> = {
  5:  "Asama 4 tamamlanmali",
  6:  "Asama 5 tamamlanmali",
  7:  "Asama 6 tamamlanmali",
  8:  "Abonelik ve onceki asamalar gerekli",
  9:  "Kamp tamamlanmali",
  10: "Egitmen onaylanmali",
  11: "Calisma kitabi doldurulmali",
};

const ContentWorkshopHomeContent = ({
  workshopId,
  isOffline,
}: {
  workshopId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const sections = getContentItemsForParent("workshop", workshop?.id);
  const progressList = getContentProgressForUser(user?.id);

  const completedCount = sections.filter(
    (s: any) =>
      progressList.find((p: any) => p.content_id === s.id)?.status === "completed"
  ).length;

  // AC-FR-E8-02-04: "Devam Et" goes to last stage
  const resumeSection = sections[completedCount] ?? sections[0];

  // Build 11 stage entries (pad with mock stage names if fewer sections)
  const totalStages = 11;

  const handleNavigateSection = (stageNum: number) => {
    if (stageNum === 8) {
      navigation.navigate("Content", {
        screen: "ContentWorkshopCamp",
        params: { id: workshop?.id },
      });
    } else if (stageNum === 9) {
      navigation.navigate("Content", {
        screen: "ContentWorkshopGuide",
        params: { id: workshop?.id },
      });
    } else if (stageNum === 10) {
      navigation.navigate("Content", {
        screen: "ContentWorkshopWorkbook",
        params: { id: workshop?.id },
      });
    } else if (stageNum === 11) {
      navigation.navigate("Content", {
        screen: "ContentWorkshopFollowUp",
        params: { id: workshop?.id },
      });
    } else {
      const section = sections[stageNum - 1];
      navigation.navigate("Content", {
        screen: "ContentWorkshopSection",
        params: { id: workshop?.id, sectionId: section?.id ?? workshop?.id },
      });
    }
  };

  return (
    <>
      {/* AC-FR-E8-02-04: Devam Et CTA */}
      <SectionCard title={"Kaldgin Yerden Devam Et"}>
        <PText variant="bodySmall" style={styles.resumeText}>
          {completedCount} / {totalStages} asama tamamlandi
        </PText>
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.resumeButton}
          onPress={() =>
            handleNavigateSection(completedCount + 1 <= totalStages ? completedCount + 1 : 1)
          }
          accessibilityLabel="Devam Et"
        >
          Devam Et
        </PButton>
      </SectionCard>

      {/* AC-FR-E8-02-01: stage list with title, description, status label */}
      <SectionCard title="Asama Listesi">
        {Array.from({ length: totalStages }, (_, i) => {
          const stageNum = i + 1;
          const stageInfo = STAGE_TYPE_MAP[stageNum];
          const section = sections[i];
          const isCompleted = stageNum <= completedCount;
          const stageLockedThreshold = 5;
          const isLocked = stageNum >= stageLockedThreshold && !isCompleted && stageNum > completedCount + 1;
          const lockReason = LOCK_REASON[stageNum];

          return (
            <View key={stageNum}>
              <View style={styles.stageItem}>
                <View style={[styles.stageNumBadge, { backgroundColor: isCompleted ? "#4CAF50" : isLocked ? "#9E9E9E" : stageInfo.color }]}>
                  <PText style={styles.stageNumText}>{isCompleted ? "OK" : String(stageNum)}</PText>
                </View>
                <View style={styles.stageBody}>
                  <View style={styles.stageTitleRow}>
                    <PText variant="titleSmall" style={[styles.stageTitleText, isLocked && styles.lockedText]}>
                      {section?.title ?? "Asama " + stageNum}
                    </PText>
                    {/* AC-FR-E8-02-02: type label */}
                    <PChip compact style={[styles.typeChip, { borderColor: stageInfo.color }]}>
                      {stageInfo.label}
                    </PChip>
                  </View>
                  {/* AC-FR-E8-02-03: lock reason */}
                  {isLocked && lockReason ? (
                    <PText variant="labelSmall" style={styles.lockNote}>
                      Kilit: {lockReason}
                    </PText>
                  ) : null}
                  {isCompleted ? (
                    <PText variant="labelSmall" style={styles.completedNote}>Tamamlandi</PText>
                  ) : null}
                  {!isLocked && !isCompleted && (
                    <PButton
                      mode="text"
                      compact
                      disabled={isOffline}
                      style={styles.openButton}
                      onPress={() => handleNavigateSection(stageNum)}
                    >
                      Ac
                    </PButton>
                  )}
                </View>
              </View>
              {stageNum < totalStages && <PDivider style={styles.divider} />}
            </View>
          );
        })}
      </SectionCard>
    </>
  );
};

export const ContentWorkshopHomeScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Asama Navigasyonu" subtitle="Yukleniyor">
        <SectionCard title="Devam Et">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Asama Listesi">
          {[1, 2, 3].map((i) => <SkeletonBlock key={i} height={56} />)}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Asama Navigasyonu" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Asama bulunamadi"
          description="Bu atolye icin asama bulunamadi."
          actionLabel="Geri Don"
          icon="format-list-numbered"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Asama Navigasyonu" subtitle="Bir sorun olustu">
        <StateMessage
          title="Asamalar yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Asama Navigasyonu" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopHomeContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Asama Navigasyonu" subtitle="Atolye ilerlemeni gor">
      <ContentWorkshopHomeContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  resumeText: {
    opacity: 0.7,
    marginBottom: 8,
  },
  resumeButton: {
    alignSelf: "flex-start",
  },
  stageItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  stageNumBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stageNumText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },
  stageBody: {
    flex: 1,
  },
  stageTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
  },
  stageTitleText: {
    flex: 1,
    marginRight: 6,
  },
  typeChip: {
    height: 24,
  },
  lockNote: {
    opacity: 0.5,
    marginTop: 3,
    fontStyle: "italic",
  },
  completedNote: {
    color: "#4CAF50",
    marginTop: 3,
  },
  openButton: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  lockedText: {
    opacity: 0.45,
  },
  divider: {
    marginHorizontal: 0,
  },
});
