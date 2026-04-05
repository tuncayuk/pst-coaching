import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

import { PActivityIndicator, PButton, PCard, PChip, PText } from "../../components";
import {
  getContentItemsForParent,
  getJourneyDaysForJourney,
  getJourneyById,
  getJourneys,
} from "../../data/mockSelectors";

type RouteParams = { state?: ScreenState; id?: string; day?: string };

const ContentJourneyDayContent = ({
  journeyId,
  dayNumber,
  isOffline,
}: {
  journeyId?: string;
  dayNumber?: number;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const journey = getJourneyById(journeyId);
  const days = getJourneyDaysForJourney(journey?.id);
  const day = days.find((item) => item.day_number === dayNumber) ?? days[0];
  const contentItems = day ? getContentItemsForParent("journey_day", day.id) : [];

  // AC-FR-E5-05-03: Auto-unlock mock — locked when current hour < 8
  const now = new Date();
  const isLocked = now.getHours() < 8;
  // AC-FR-E5-05-01: Today completed state (toggleable for demo)
  const [isTodayCompleted, setIsTodayCompleted] = useState(false);

  const countdownHours = isLocked ? 8 - now.getHours() - 1 : 0;
  const countdownMins = isLocked ? 60 - now.getMinutes() : 0;

  return (
    <>
      <SectionCard title="Gunun Plani" actionLabel="Takvim">
        <PText variant="titleMedium">{journey?.title ?? "Yolculuk"}</PText>
        <PText variant="bodySmall" style={styles.subtleText}>
          {day ? `Gun ${day.day_number} - ${day.title}` : "Gun icerigi"}
        </PText>
        {/* AC-FR-E5-01-01: Deadline chip */}
        <View style={styles.chipRow}>
          <PChip style={styles.chip} disabled>
            08:00 kurali
          </PChip>
          <PChip style={[styles.chip, styles.chipDeadline]} disabled>
            Yorum teslimi 23:59
          </PChip>
        </View>

        {/* AC-FR-E5-05-01: Today completed banner */}
        {isTodayCompleted && (
          <View style={styles.completedBanner}>
            <PText style={styles.completedText}>Bugun tamamlandi!</PText>
          </View>
        )}

        {/* Demo toggle for completed state */}
        <PButton
          mode={isTodayCompleted ? "outlined" : "contained"}
          compact
          disabled={isOffline || isLocked}
          onPress={() => setIsTodayCompleted((v) => !v)}
          style={styles.completeBtn}
        >
          {isTodayCompleted ? "Tamamlanmadi Olarak Isaretle" : "Bugunu Tamamla"}
        </PButton>
      </SectionCard>

      {/* AC-FR-E5-05-02: Locked state with countdown */}
      {isLocked ? (
        <SectionCard title="Icerik Kilitli">
          <View style={styles.lockedBanner}>
            <PText style={styles.lockedTitle}>Yeni icerik 08:00&apos;de acilacak</PText>
            <PText style={styles.lockedCountdown}>
              Kalan: {countdownHours}s {countdownMins}d
            </PText>
            <PText variant="bodySmall" style={styles.subtleText}>
              Gunluk icerik her sabah saat 08:00&apos;de kilit acilir.
            </PText>
          </View>
        </SectionCard>
      ) : (
        <SectionCard title="Icerikler" actionLabel="Sirala">
          {contentItems.map((item) => (
            <PCard key={item.id} style={styles.card}>
              <PCard.Title title={item.title} subtitle={item.content_type} />
              <PCard.Content>
                <PText variant="bodySmall" style={styles.subtleText}>
                  {item.body}
                </PText>
              </PCard.Content>
              <PCard.Actions>
                <PButton
                  mode="outlined"
                  disabled={isOffline}
                  onPress={() => {
                    if (item.content_type === "reading") {
                      navigation.navigate("Content", {
                        screen: "ContentReading",
                        params: { id: item.id },
                      });
                      return;
                    }
                    if (item.content_type === "exercise") {
                      navigation.navigate("Content", {
                        screen: "ContentExercise",
                        params: { id: item.id },
                      });
                      return;
                    }
                    navigation.navigate("Content", {
                      screen: "ContentComment",
                      params: { contentItemId: item.id },
                    });
                  }}
                >
                  Basla
                </PButton>
              </PCard.Actions>
            </PCard>
          ))}
        </SectionCard>
      )}
    </>
  );
};

export const ContentJourneyDayScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const dayNumber = route?.params?.day ? Number(route.params.day) : undefined;
  const journeyId = route?.params?.id ?? getJourneys()[0]?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Gun Icerigi" subtitle="Gun Icerigi yukleniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={16} />
        </SectionCard>
        <SectionCard title="Icerikler">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Gun Icerigi" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Gun icerigi yok"
          description="Bu gune ait icerik henuz eklenmemis."
          actionLabel="Yolculuga Don"
          icon="calendar-blank-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Gun Icerigi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Gun icerigi yuklenemedi"
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
      <ScreenLayout title="Gun Icerigi" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentJourneyDayContent journeyId={journeyId} dayNumber={dayNumber} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Gun Icerigi" subtitle="Gun plani">
      <ContentJourneyDayContent journeyId={journeyId} dayNumber={dayNumber} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  chipDeadline: {
    backgroundColor: "#DCFCE7",
  },
  subtleText: {
    opacity: 0.7,
    marginTop: 4,
  },
  card: {
    marginBottom: 12,
  },
  completedBanner: {
    backgroundColor: "#DCFCE7",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#16A34A",
    marginTop: 8,
    marginBottom: 4,
  },
  completedText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#15803D",
    textAlign: "center",
  },
  completeBtn: {
    marginTop: 10,
  },
  lockedBanner: {
    padding: 16,
    backgroundColor: "#F5F3FF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    alignItems: "center",
  },
  lockedTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#5B21B6",
    marginBottom: 6,
    textAlign: "center",
  },
  lockedCountdown: {
    fontSize: 20,
    fontWeight: "700",
    color: "#7C3AED",
    marginBottom: 8,
  },
});

