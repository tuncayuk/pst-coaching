#!/usr/bin/env node
// write-e8-screens.js — Writes all 8 EPIC-8 screen files.
const fs = require('fs');
const path = require('path');

const SCREENS_DIR = path.join(__dirname, '../apps/mobile/screens/content');

const files = {};

// ─────────────────────────────────────────────────────────────────────────
// ContentWorkshopDetailScreen  (FR-E8-01)
// ─────────────────────────────────────────────────────────────────────────
files['ContentWorkshopDetailScreen.tsx'] = `import React from "react";
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

const STAGE_COUNT = 11;
const CAMP_DAYS = 3;

// Simulated stage type labels for display (AC-FR-E8-02-02)
const STAGE_LABELS: Record<number, string> = {
  1: "Referans", 2: "Icgoru", 3: "Referans", 4: "Icgoru",
  5: "Referans", 6: "Icgoru", 7: "Entegrasyon",
  8: "Kamp", 9: "Rehber", 10: "Calisma Kitabi", 11: "Kapanis",
};

const ContentWorkshopDetailContent = ({
  workshopId,
  isOffline,
}: {
  workshopId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  // AC-FR-E8-01-03: role-based CTA — "facilitator" role triggers guide CTA
  const isFacilitator = user?.role === "facilitator";
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const sections = getContentItemsForParent("workshop", workshop?.id);
  const progressList = getContentProgressForUser(user?.id);
  // AC-FR-E8-01-04: show last synced stage/session
  const workshopProgress = progressList.find(
    (p: any) => p.content_id === workshop?.id
  );
  const isStarted = !!workshopProgress?.started_at;
  const isCompleted = !!workshopProgress?.completed_at;
  const completedCount = sections.filter(
    (s: any) =>
      progressList.find((p: any) => p.content_id === s.id)?.status === "completed"
  ).length;
  const lastSection =
    completedCount > 0 ? sections[completedCount - 1] : null;

  const handlePrimary = () => {
    if (isFacilitator) {
      // AC-FR-E8-01-03: facilitator opens guide
      navigation.navigate("Content", {
        screen: "ContentWorkshopGuide",
        params: { id: workshop?.id },
      });
    } else {
      navigation.navigate("Content", {
        screen: "ContentWorkshopHome",
        params: { id: workshop?.id },
      });
    }
  };

  return (
    <>
      {/* AC-FR-E8-01-01: title, theme, conversion goal, target audience, duration, references */}
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>{"\\uD83C\\uDFDB"}</PText>
        <PText variant="headlineMedium" style={styles.heroTitle}>
          {workshop?.title ?? "Atolye"}
        </PText>
        <PText variant="bodyMedium" style={styles.heroDesc}>
          {workshop?.description ?? "Canli uygulamalar, paylasim ve destekleyici egzersizlerle ilerleyen bir atolye."}
        </PText>
      </View>

      {/* AC-FR-E8-01-02: stage count, camp days, workbook, guide labels */}
      <SectionCard title="Yapi Ozeti">
        <View style={styles.chipRow}>
          <PChip style={styles.chip}>{STAGE_COUNT} asama</PChip>
          <PChip style={styles.chip}>{CAMP_DAYS} gun kamp</PChip>
          <PChip style={styles.chip}>Calisma kitabi var</PChip>
          <PChip style={styles.chip}>Egitmen rehberi var</PChip>
        </View>
        <PDivider style={styles.divider} />
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Hedef kitle</PText>
          <PText variant="bodySmall">Kisisel gelisim arayanlar</PText>
        </View>
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Toplam sure</PText>
          <PText variant="bodySmall">3 gun + 7 oncesi asama</PText>
        </View>
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Referans</PText>
          <PText variant="bodySmall">Kuran ve sunnet destekli icerik</PText>
        </View>
      </SectionCard>

      {/* AC-FR-E8-01-04: last visited stage summary */}
      {isStarted && lastSection ? (
        <SectionCard title="Kaldığın Yer">
          <PText variant="bodySmall" style={styles.subtleText}>
            Son asama: {lastSection.title ?? "Asama " + completedCount}
          </PText>
          <PText variant="bodySmall" style={styles.subtleText}>
            {completedCount}/{sections.length} bolum tamamlandi
          </PText>
          {isOffline && (
            <PText variant="labelSmall" style={styles.offlineNote}>
              Son senkronize edilmis veri gosteriliyor.
            </PText>
          )}
        </SectionCard>
      ) : null}

      {/* Stage type preview */}
      <SectionCard title="Asama Plani">
        {Object.entries(STAGE_LABELS).map(([num, label]) => (
          <View key={num} style={styles.stageRow}>
            <PText variant="labelMedium" style={styles.stageNum}>
              {num}.
            </PText>
            <PText variant="bodySmall" style={styles.stageLabel}>
              {label}
            </PText>
          </View>
        ))}
      </SectionCard>

      {/* AC-FR-E8-01-03: role-based primary CTA */}
      <SectionCard title="">
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.primaryButton}
          onPress={handlePrimary}
          accessibilityLabel={
            isFacilitator ? "Rehberi Ac" : isStarted ? "Devam Et" : "Basla"
          }
        >
          {isFacilitator ? "Rehberi Ac" : isStarted ? "Devam Et" : "Basla"}
        </PButton>
        {!isFacilitator && (
          <PButton
            mode="outlined"
            disabled={isOffline}
            style={styles.secondaryButton}
            onPress={() =>
              navigation.navigate("Content", {
                screen: "ContentWorkshopCompletion",
                params: { id: workshop?.id },
              })
            }
          >
            {isCompleted ? "Arsivi Gor" : "Tamamlama Ekrani"}
          </PButton>
        )}
      </SectionCard>
    </>
  );
};

export const ContentWorkshopDetailScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Atolye" subtitle="Yukleniyor">
        <SectionCard title="Atolye Bilgisi">
          <PActivityIndicator animating />
          <SkeletonBlock height={24} />
          <SkeletonBlock height={16} />
        </SectionCard>
        <SectionCard title="Yapi Ozeti">
          <SkeletonBlock height={36} />
          <SkeletonBlock height={20} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Atolye" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Atolye bulunamadi"
          description="Bu atolye su anda erisebilir degil."
          actionLabel="Kesfet"
          icon="account-group-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Atolye" subtitle="Bir sorun olustu">
        <StateMessage
          title="Atolye yuklenemedi"
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
      <ScreenLayout title="Atolye" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopDetailContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atolye" subtitle="Atolye detayi">
      <ContentWorkshopDetailContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  heroTitle: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 8,
  },
  heroDesc: {
    textAlign: "center",
    opacity: 0.75,
    lineHeight: 22,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    marginBottom: 4,
  },
  divider: {
    marginVertical: 10,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  metaLabel: {
    opacity: 0.6,
  },
  subtleText: {
    opacity: 0.7,
    marginTop: 4,
  },
  offlineNote: {
    marginTop: 8,
    opacity: 0.55,
    fontStyle: "italic",
  },
  stageRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  stageNum: {
    width: 28,
    opacity: 0.5,
  },
  stageLabel: {
    flex: 1,
  },
  primaryButton: {
    marginTop: 8,
  },
  secondaryButton: {
    marginTop: 10,
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentWorkshopHomeScreen  (FR-E8-02)
// ─────────────────────────────────────────────────────────────────────────
files['ContentWorkshopHomeScreen.tsx'] = `import React from "react";
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
                  <PText style={styles.stageNumText}>{isCompleted ? "✓" : String(stageNum)}</PText>
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
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentWorkshopSectionScreen  (FR-E8-03)
// ─────────────────────────────────────────────────────────────────────────
files['ContentWorkshopSectionScreen.tsx'] = `import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getContentItems,
  getFavoritesForUser,
  getHighlightsForUser,
  getNotesForUser,
  getPrimaryUser,
  getWorkshopById,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PChip,
  PDivider,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string; sectionId?: string };

// AC-FR-E8-03-01: structured content blocks
const MOCK_BLOCKS = [
  { type: "intro",       label: "Giris",                     text: "Bu asamada icesel donusum sureci ele alinmaktadir." },
  { type: "verse",       label: "Ayet / Hadis",              text: "\"Elbette zorlukla birlikte kolaylik vardir.\" (94:6)" },
  { type: "explanation", label: "Aciklama",                  text: "Zorluk anlarindaki dayaniklilik, iman kavramiyla derinlesir." },
  { type: "bridge",      label: "Psikoloji / Felsefe Koprusu", text: "Bilissel yeniden cerceveleme teknigi ile olumsuz dusunce donusturulebilir." },
  { type: "practice",    label: "Uygulama",                  text: "Suanda yasadigin bir zorluğu yaz ve 3 farkli bakis acisi gelistir." },
  { type: "output",      label: "Cikti / Kazanim",           text: "Bu bolum sonunda kisisel bir donusum cumlesi olusturmus olacaksin." },
];

const ContentWorkshopSectionContent = ({
  workshopId,
  sectionId,
  isOffline,
}: {
  workshopId?: string;
  sectionId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const workshop = getWorkshopById(workshopId);
  const section = getContentItems().find((item) => item.id === sectionId);

  // AC-FR-E8-03-03: highlight, note, favourite support
  const highlights = getHighlightsForUser(user?.id).filter(
    (h: any) => h.source_id === sectionId
  );
  const notes = getNotesForUser(user?.id).filter(
    (n: any) => n.source_id === sectionId
  );
  const isFav = getFavoritesForUser(user?.id).some(
    (f: any) => f.content_id === sectionId
  );
  const [favActive, setFavActive] = useState(isFav);
  const [noteText, setNoteText] = useState(
    notes[0]?.text ?? ""
  );
  const [noteSaved, setNoteSaved] = useState(false);
  const [sectionDone, setSectionDone] = useState(false);

  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  // Derive next section index for navigation (AC-FR-E8-03-04)
  const allSections = require("../../data/mockSelectors").getContentItemsForParent(
    "workshop", workshopId
  );
  const currentIdx = allSections.findIndex((s: any) => s.id === sectionId);
  const nextSection = allSections[currentIdx + 1] ?? null;

  return (
    <>
      <SectionCard title={section?.title ?? "Bolum"}>
        <PText variant="bodySmall" style={styles.subtleText}>
          {workshop?.title ?? "Atolye"} · Asama {currentIdx + 1}
        </PText>
        <View style={styles.actionRow}>
          <PChip
            selected={favActive}
            onPress={() => !isOffline && setFavActive((v) => !v)}
            style={styles.favChip}
            accessibilityLabel="Favoriye ekle"
          >
            {favActive ? "Favori" : "Favori Ekle"}
          </PChip>
          <PText variant="labelSmall" style={styles.highlightCount}>
            {highlights.length} vurgulama
          </PText>
        </View>
      </SectionCard>

      {/* AC-FR-E8-03-01/02: structured content blocks */}
      {MOCK_BLOCKS.map((block, idx) => (
        <SectionCard key={block.type} title={block.label}>
          <PText
            variant={block.type === "verse" ? "titleSmall" : "bodyMedium"}
            style={[
              styles.blockText,
              block.type === "verse" && styles.verseText,
              block.type === "output" && styles.outputText,
            ]}
          >
            {block.text}
          </PText>
          {block.type === "practice" && (
            <PButton
              mode="outlined"
              compact
              style={styles.practiceBtn}
              disabled={isOffline}
              onPress={() =>
                navigation.navigate("Content", {
                  screen: "ContentWorkshopWorkbook",
                  params: { id: workshopId },
                })
              }
            >
              Calisma Kitabini Ac
            </PButton>
          )}
          {idx < MOCK_BLOCKS.length - 1 && <PDivider style={styles.divider} />}
        </SectionCard>
      ))}

      {/* AC-FR-E8-03-03: note taking */}
      <SectionCard title="Notlarim">
        <TextInput
          style={styles.noteInput}
          multiline
          value={noteText}
          onChangeText={setNoteText}
          placeholder="Asama hakkinda notunuzu buraya yazin..."
          editable={!isOffline}
          accessibilityLabel="Not alani"
        />
        {noteSaved && (
          <PText variant="labelSmall" style={styles.savedNote}>Kaydedildi</PText>
        )}
        <PButton
          mode="outlined"
          compact
          disabled={isOffline || !noteText}
          style={styles.saveBtn}
          onPress={handleSaveNote}
        >
          Notu Kaydet
        </PButton>
      </SectionCard>

      {/* AC-FR-E8-03-04: section summary + next stage + workbook task */}
      <SectionCard title="Bolum Ozeti">
        <PText variant="bodySmall" style={styles.summaryText}>
          Bu bolumde: giris, ayet, aciklama, psikoloji koprusu, uygulama ve ciktiyi tamamladin.
        </PText>
        <PDivider style={styles.divider} />
        {!sectionDone ? (
          <PButton
            mode="contained"
            disabled={isOffline}
            style={styles.completeBtn}
            onPress={() => setSectionDone(true)}
          >
            Bolumu Tamamla
          </PButton>
        ) : (
          <PText variant="labelMedium" style={styles.completedText}>
            Tamamlandi!
          </PText>
        )}
        {nextSection ? (
          <PButton
            mode="outlined"
            disabled={isOffline}
            style={styles.nextBtn}
            onPress={() =>
              navigation.navigate("Content", {
                screen: "ContentWorkshopSection",
                params: { id: workshopId, sectionId: nextSection.id },
              })
            }
          >
            Sonraki Asama
          </PButton>
        ) : (
          <PButton
            mode="outlined"
            disabled={isOffline}
            style={styles.nextBtn}
            onPress={() =>
              navigation.navigate("Content", {
                screen: "ContentWorkshopWorkbook",
                params: { id: workshopId },
              })
            }
          >
            Calisma Kitabina Gec
          </PButton>
        )}
      </SectionCard>
    </>
  );
};

export const ContentWorkshopSectionScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;
  const sectionId = route?.params?.sectionId;

  if (state === "loading") {
    return (
      <ScreenLayout title="Asama Icerigi" subtitle="Hazirlanıyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        {[1, 2, 3].map((i) => (
          <SectionCard key={i} title="">
            <SkeletonBlock height={60} />
          </SectionCard>
        ))}
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Asama Icerigi" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Bolum bulunamadi"
          description="Bu bolum su anda erisebilir degil."
          actionLabel="Atolyeye Don"
          icon="file-document-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Asama Icerigi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Bolum yuklenemedi"
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
      <ScreenLayout title="Asama Icerigi" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopSectionContent
          workshopId={workshopId}
          sectionId={sectionId}
          isOffline
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Asama Icerigi" subtitle="Bolum akisi">
      <ContentWorkshopSectionContent
        workshopId={workshopId}
        sectionId={sectionId}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  subtleText: {
    opacity: 0.65,
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 6,
  },
  favChip: {
    alignSelf: "flex-start",
  },
  highlightCount: {
    opacity: 0.6,
  },
  blockText: {
    lineHeight: 22,
  },
  verseText: {
    fontStyle: "italic",
    lineHeight: 24,
  },
  outputText: {
    fontWeight: "600",
  },
  practiceBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  divider: {
    marginVertical: 10,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    fontSize: 14,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  savedNote: {
    color: "#4CAF50",
    marginBottom: 4,
  },
  saveBtn: {
    alignSelf: "flex-start",
  },
  summaryText: {
    lineHeight: 20,
    opacity: 0.75,
  },
  completeBtn: {
    marginTop: 12,
  },
  completedText: {
    color: "#4CAF50",
    marginTop: 12,
    fontWeight: "700",
  },
  nextBtn: {
    marginTop: 10,
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentWorkshopCampScreen  (FR-E8-04)
// ─────────────────────────────────────────────────────────────────────────
files['ContentWorkshopCampScreen.tsx'] = `import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getPrimaryUser, getWorkshopById, getWorkshops } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PChip,
  PDivider,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-04-01/02: Camp day + session structure
const CAMP_DAYS = [
  {
    day: 1,
    label: "1. Gun",
    sessions: [
      {
        id: "d1-sabah",
        slot: "Sabah",     title: "Acilis ve Niyet",
        purpose: "Katilimcilari hazirlamak ve niyet belirlemek",
        duration: "60 dk",
        flow: "Karsilama, tanisma, kural belirleme, niyet yazimi",
        output: "Kisisel niyet karti",
        worksheets: ["Niyet Formu"],
        completed: false,
      },
      {
        id: "d1-ogle",
        slot: "Ogle",      title: "Referans Okuma ve Tartisma",
        purpose: "Kuransal referanslari hayata tasimak",
        duration: "90 dk",
        flow: "Okuma, kucuk grup tartismasi, paylasim",
        output: "Ayet cikti notu",
        worksheets: ["Ayet Yansima Sayfasi"],
        completed: false,
      },
      {
        id: "d1-aksam",
        slot: "Aksam",     title: "Butunleme ve Kapalis",
        purpose: "Gunun kazanimlarini butunlestirmek",
        duration: "45 dk",
        flow: "Ozet, gunluk yazmak, kapalis duasi",
        output: "Gun ozeti",
        worksheets: [],
        completed: false,
      },
    ],
  },
  {
    day: 2,
    label: "2. Gun",
    sessions: [
      {
        id: "d2-sabah",
        slot: "Sabah",     title: "Derin Ic Calisma",
        purpose: "Psikoloji koprulerini pratikte uygulamak",
        duration: "75 dk",
        flow: "Meditasyon, kisisel yansima, ikili paylasim",
        output: "Ic calisma notu",
        worksheets: ["Burden Haritasi"],
        completed: false,
      },
      {
        id: "d2-ogle",
        slot: "Ogle",      title: "Grup Uygulamasi",
        purpose: "Toplulukla pratik yapmak",
        duration: "90 dk",
        flow: "Egzersiz, rol calismalari, geri bildirim",
        output: "Grup uygulama ozeti",
        worksheets: ["Ic Cumle Donusum Tablosu"],
        completed: false,
      },
      {
        id: "d2-aksam",
        slot: "Aksam",     title: "Duygusal Isleme",
        purpose: "Gunun duygusal yoğunluğunu islemek",
        duration: "60 dk",
        flow: "Duygu paylasimi, tevekkul egzersizi, sessizlik",
        output: "Duygu notu",
        worksheets: ["Tevekkul Dengesi"],
        completed: false,
      },
    ],
  },
  {
    day: 3,
    label: "3. Gun",
    sessions: [
      {
        id: "d3-sabah",
        slot: "Sabah",     title: "Entegrasyon",
        purpose: "Tum gunlerin kazanimlarini birlestirir",
        duration: "90 dk",
        flow: "Kisisel ozet, icerik haritalama, paylasim",
        output: "Kisisel entegrasyon haritasi",
        worksheets: ["Bütünleme Formu"],
        completed: false,
      },
      {
        id: "d3-ogle",
        slot: "Ogle",      title: "Taahhu ve Niyet",
        purpose: "30 gunluk plan için taahhut",
        duration: "75 dk",
        flow: "Kucuk adimlar yazimi, partner check-in, imza",
        output: "30 Gunluk niyet plani",
        worksheets: ["Donus Plani"],
        completed: false,
      },
      {
        id: "d3-aksam",
        slot: "Aksam",     title: "Kapanis ve Sertifika",
        purpose: "Kutlama ve anlam pekistirme",
        duration: "60 dk",
        flow: "Paylasim, dua, sertifika seremonisi",
        output: "Katilim belgesi",
        worksheets: [],
        completed: false,
      },
    ],
  },
];

type SessionCardProps = {
  session: (typeof CAMP_DAYS)[0]["sessions"][0];
  isOffline: boolean;
  onComplete: (id: string) => void;
  isCompleted: boolean;
};

const SessionCard = ({ session, isOffline, onComplete, isCompleted }: SessionCardProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.sessionCard}>
      <TouchableOpacity
        onPress={() => setExpanded((v) => !v)}
        style={styles.sessionHeader}
        accessibilityRole="button"
        accessibilityLabel={session.slot + " oturumu " + session.title}
      >
        <PChip style={styles.slotChip} compact>{session.slot}</PChip>
        <PText variant="titleSmall" style={styles.sessionTitle}>{session.title}</PText>
        <PText variant="labelSmall" style={styles.duration}>{session.duration}</PText>
        {isCompleted && <PText style={styles.doneCheck}>✓</PText>}
      </TouchableOpacity>

      {expanded && (
        <View style={styles.sessionDetail}>
          <PDivider style={styles.divider} />
          {/* AC-FR-E8-04-02: purpose, flow, output, worksheets */}
          <View style={styles.detailRow}>
            <PText variant="labelSmall" style={styles.detailLabel}>Amac</PText>
            <PText variant="bodySmall" style={styles.detailText}>{session.purpose}</PText>
          </View>
          <View style={styles.detailRow}>
            <PText variant="labelSmall" style={styles.detailLabel}>Temel Akis</PText>
            <PText variant="bodySmall" style={styles.detailText}>{session.flow}</PText>
          </View>
          <View style={styles.detailRow}>
            <PText variant="labelSmall" style={styles.detailLabel}>Beklenen Cikti</PText>
            <PText variant="bodySmall" style={styles.detailText}>{session.output}</PText>
          </View>
          {session.worksheets.length > 0 && (
            <View style={styles.detailRow}>
              <PText variant="labelSmall" style={styles.detailLabel}>Calisma Kagidi</PText>
              <PText variant="bodySmall" style={styles.detailText}>{session.worksheets.join(", ")}</PText>
            </View>
          )}
          {/* AC-FR-E8-04-04: mark completed */}
          {!isCompleted && (
            <PButton
              mode="contained"
              compact
              disabled={isOffline}
              style={styles.completeBtn}
              onPress={() => onComplete(session.id)}
            >
              Oturumu Tamamla
            </PButton>
          )}
        </View>
      )}
    </View>
  );
};

const ContentWorkshopCampContent = ({
  workshopId,
  isOffline,
}: {
  workshopId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const [activeDay, setActiveDay] = useState(0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const handleComplete = (sessionId: string) => {
    setCompleted((prev) => ({ ...prev, [sessionId]: true }));
  };

  const dayData = CAMP_DAYS[activeDay];
  const dayCompletedCount = dayData.sessions.filter((s) => completed[s.id]).length;
  const isDayDone = dayCompletedCount === dayData.sessions.length;

  return (
    <>
      <SectionCard title={"3 Gunluk Kamp — " + (workshop?.title ?? "Atolye")}>
        <PText variant="bodySmall" style={styles.campDesc}>
          3 gunde her gun sabah, ogle ve aksam oturumlarini tamamla.
        </PText>
      </SectionCard>

      {/* AC-FR-E8-04-01: Day tabs */}
      <View style={styles.tabRow}>
        {CAMP_DAYS.map((d, i) => (
          <TouchableOpacity
            key={d.day}
            style={[styles.tab, activeDay === i && styles.tabActive]}
            onPress={() => setActiveDay(i)}
            accessibilityRole="tab"
            accessibilityLabel={d.label}
          >
            <PText
              variant="labelMedium"
              style={[styles.tabLabel, activeDay === i && styles.tabLabelActive]}
            >
              {d.label}
            </PText>
          </TouchableOpacity>
        ))}
      </View>

      {/* AC-FR-E8-04-01/02/03: sessions for selected day */}
      <SectionCard title={dayData.label + " Oturumlari"}>
        <PText variant="labelSmall" style={styles.dayProgress}>
          {dayCompletedCount}/{dayData.sessions.length} oturum tamamlandi
        </PText>
        {dayData.sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            isOffline={!!isOffline}
            onComplete={handleComplete}
            isCompleted={!!completed[session.id]}
          />
        ))}
        {/* AC-FR-E8-04-04: day summary when done */}
        {isDayDone && (
          <View style={styles.daySummary}>
            <PDivider style={styles.divider} />
            <PText variant="titleSmall" style={styles.daySummaryTitle}>
              Gun Tamamlandi!
            </PText>
            <PText variant="bodySmall" style={styles.daySummaryText}>
              {activeDay < 2
                ? "Yarin devam et."
                : "Tum kamp gunleri tamamlandi. Tamamlama ekranini goruntule."}
            </PText>
            {activeDay < 2 ? (
              <PButton
                mode="outlined"
                style={styles.nextDayBtn}
                disabled={isOffline}
                onPress={() => setActiveDay(activeDay + 1)}
              >
                Sonraki Gun
              </PButton>
            ) : (
              <PButton
                mode="contained"
                style={styles.nextDayBtn}
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentWorkshopCompletion",
                    params: { id: workshopId },
                  })
                }
              >
                Tamamlama Ekrani
              </PButton>
            )}
          </View>
        )}
      </SectionCard>

      <SectionCard title="Hizli Erisim">
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.quickLink}
          onPress={() =>
            navigation.navigate("Content", {
              screen: "ContentWorkshopGuide",
              params: { id: workshopId },
            })
          }
        >
          Egitmen Rehberi
        </PButton>
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.quickLink}
          onPress={() =>
            navigation.navigate("Content", {
              screen: "ContentWorkshopWorkbook",
              params: { id: workshopId },
            })
          }
        >
          Calisma Kitabi
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentWorkshopCampScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="3 Gunluk Kamp" subtitle="Yukleniyor">
        <SectionCard title="Kamp Plani">
          <PActivityIndicator animating />
          <SkeletonBlock height={36} />
        </SectionCard>
        <SectionCard title="Oturumlar">
          {[1, 2, 3].map((i) => <SkeletonBlock key={i} height={56} />)}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="3 Gunluk Kamp" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Kamp icerigi bulunamadi"
          description="Bu atolye icin kamp programi henuz erisebilir degil."
          actionLabel="Asama Listesine Don"
          icon="campfire"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="3 Gunluk Kamp" subtitle="Bir sorun olustu">
        <StateMessage
          title="Kamp yuklenemedi"
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
      <ScreenLayout title="3 Gunluk Kamp" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopCampContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="3 Gunluk Kamp" subtitle="Kamp oturum plani">
      <ContentWorkshopCampContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  campDesc: {
    opacity: 0.7,
    lineHeight: 20,
  },
  tabRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 0,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  tabActive: {
    backgroundColor: "#7C4DFF",
  },
  tabLabel: {
    color: "#555",
  },
  tabLabelActive: {
    color: "#FFF",
    fontWeight: "700",
  },
  dayProgress: {
    opacity: 0.6,
    marginBottom: 10,
  },
  sessionCard: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  sessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
    flexWrap: "wrap",
  },
  slotChip: {
    height: 24,
    marginRight: 4,
  },
  sessionTitle: {
    flex: 1,
  },
  duration: {
    opacity: 0.55,
  },
  doneCheck: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "700",
  },
  sessionDetail: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  divider: {
    marginVertical: 8,
  },
  detailRow: {
    marginBottom: 6,
  },
  detailLabel: {
    opacity: 0.55,
    marginBottom: 2,
  },
  detailText: {
    lineHeight: 20,
  },
  completeBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  daySummary: {
    marginTop: 4,
  },
  daySummaryTitle: {
    color: "#4CAF50",
    fontWeight: "700",
    marginBottom: 4,
  },
  daySummaryText: {
    opacity: 0.7,
    marginBottom: 8,
  },
  nextDayBtn: {
    alignSelf: "flex-start",
  },
  quickLink: {
    marginBottom: 10,
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentWorkshopGuideScreen  (FR-E8-05)
// ─────────────────────────────────────────────────────────────────────────
files['ContentWorkshopGuideScreen.tsx'] = `import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getDownloadsForUser,
  getPrimaryUser,
  getWorkshopById,
  getWorkshops,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PChip,
  PDivider,
  PSwitch,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-05-01: guide sections with minute-by-minute flow + phrases
const GUIDE_SECTIONS = [
  {
    time: "0-5 dk",   title: "Acilis",
    script: "Herkese hosgeldiniz. Bu deneyim icin buradayiz...",
    responses: ["Katilimci gergin gorunuyorsa: 'Nefes alalim, bu alan guvenli.'"],
    alt: "Kucuk grup ise: Cember formatina gec",
  },
  {
    time: "5-20 dk",  title: "Niyet Oturumu",
    script: "Simdi herkes bir kagit aliyor ve bu deneyimden ne istedigini yaziyor...",
    responses: ["'Ne yazacagimi bilmiyorum': 'Ilk aklına gelen her sey tamam.'"],
    alt: "Zaman kiisiyse niyeti sozlu al",
  },
  {
    time: "20-50 dk", title: "Ana Icerik Blogu",
    script: "Simdi birlikte okuyacagiz... Her cumlenin ardindan dur ve soluk al.",
    responses: ["Duygusal tepki: 'Hissettiklerini gormek cesaretli.'"],
    alt: "Cok az katilimci varsa: Bireysel okumaya gec",
  },
  {
    time: "50-60 dk", title: "Kapanis Ritueli",
    script: "Bu oturumu kapatmadan once, kazanimlarinizi uc kelimeyle paylasin...",
    responses: ["Sessizlik: 'Sessizlik de bir cevaptir.'"],
    alt: "Zaman azsa sadece tek kelime al",
  },
];

// AC-FR-E8-05-02: hard scenario shortcuts
const HARD_SCENARIOS = [
  { label: "Duygusal kriz",       action: "Oturumu durdur, bireysel alan ac" },
  { label: "Katilimci cikiyor",   action: "Sessizce izin ver, kapali grup tutum" },
  { label: "Tartisma cikiyor",    action: "Kural hatirlatmasi yap, sohbeti yonlendir" },
  { label: "Teknik sorun",        action: "5 dk mola ver, alternatif cihaza gec" },
];

const ContentWorkshopGuideContent = ({
  workshopId,
  isOffline,
}: {
  workshopId?: string;
  isOffline?: boolean;
}) => {
  // AC-FR-E8-05-02: facilitator mode toggle
  const [facilitatorMode, setFacilitatorMode] = useState(false);
  const user = getPrimaryUser();
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const downloads = getDownloadsForUser(user?.id);
  // AC-FR-E8-05-03: offline availability — check if downloaded
  const isDownloaded = downloads.some(
    (d: any) => d.content_id === workshopId && d.status === "completed"
  );

  const navRef = React.useRef<ScrollView>(null);

  return (
    <>
      {/* AC-FR-E8-05-04: guide vs participant separation */}
      <SectionCard title="Egitmen Rehberi">
        <View style={styles.roleTag}>
          <PChip style={styles.guideChip}>Egitmen Gorünümü</PChip>
          {isDownloaded && <PChip style={styles.offlineChip}>Cevrimdisi Erisim</PChip>}
        </View>
        <PText variant="bodySmall" style={styles.desc}>
          Bu rehber yalnizca egitmen yetkisine sahip kullanicilara erisebilirdir.
          Katilimci gorünümü ayri bir akis izler.
        </PText>
      </SectionCard>

      {/* AC-FR-E8-05-02: facilitator mode toggle */}
      <SectionCard title="Facilitator Mode">
        <View style={styles.toggleRow}>
          <View style={styles.toggleLabel}>
            <PText variant="titleSmall">Buyuk Tipografi Modu</PText>
            <PText variant="bodySmall" style={styles.toggleDesc}>
              Sahne sunumu için optimum tipografi
            </PText>
          </View>
          <PSwitch
            value={facilitatorMode}
            onValueChange={(v) => setFacilitatorMode(v)}
            accessibilityLabel="Facilitator mode"
          />
        </View>
        {facilitatorMode && (
          <PText variant="labelMedium" style={styles.modeActive}>
            Buyuk tipografi aktif — cihazi katilimcilara goster
          </PText>
        )}
      </SectionCard>

      {/* AC-FR-E8-05-01: minute-by-minute flow */}
      {GUIDE_SECTIONS.map((sec, idx) => (
        <SectionCard key={sec.time} title={sec.time + " — " + sec.title}>
          <PText
            variant="bodyMedium"
            style={[styles.scriptText, facilitatorMode && styles.scriptTextLarge]}
          >
            {sec.script}
          </PText>
          <PDivider style={styles.divider} />
          <PText variant="labelSmall" style={styles.sectionLabel}>Olasi Katilimci Tepkileri</PText>
          {sec.responses.map((r, ri) => (
            <PText key={ri} variant="bodySmall" style={styles.responseText}>• {r}</PText>
          ))}
          <PDivider style={styles.divider} />
          <PText variant="labelSmall" style={styles.sectionLabel}>Alternatif Akis</PText>
          <PText variant="bodySmall" style={styles.altText}>{sec.alt}</PText>
          {facilitatorMode && idx < GUIDE_SECTIONS.length - 1 && (
            <PButton
              mode="outlined"
              compact
              style={styles.jumpBtn}
              onPress={() => {}}
              accessibilityLabel={"Sonraki boluma gec: " + GUIDE_SECTIONS[idx + 1].title}
            >
              Sonraki Bolum
            </PButton>
          )}
        </SectionCard>
      ))}

      {/* AC-FR-E8-05-02: hard scenario shortcuts */}
      <SectionCard title="Zor Senaryo Kisayollari">
        {HARD_SCENARIOS.map((sc) => (
          <View key={sc.label} style={styles.scenarioRow}>
            <PText variant="titleSmall" style={styles.scenarioLabel}>{sc.label}</PText>
            <PText variant="bodySmall" style={styles.scenarioAction}>{sc.action}</PText>
            <PDivider style={styles.divider} />
          </View>
        ))}
      </SectionCard>

      {/* AC-FR-E8-05-03: offline download */}
      {!isDownloaded && (
        <SectionCard title="Cevrimdisi Erisim">
          <PText variant="bodySmall" style={styles.desc}>
            Rehberi indirerek internet baglantisi olmadan erisebilirsin.
          </PText>
          <PButton
            mode="outlined"
            disabled={isOffline}
            style={styles.downloadBtn}
            onPress={() => {}}
          >
            Rehberi Indir
          </PButton>
        </SectionCard>
      )}
    </>
  );
};

export const ContentWorkshopGuideScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Egitmen Rehberi" subtitle="Yukleniyor">
        <SectionCard title="Rehber Icerigi">
          <PActivityIndicator animating />
          {[1, 2, 3].map((i) => <SkeletonBlock key={i} height={20} />)}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Egitmen Rehberi" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Rehber bulunamadi"
          description="Bu atolye icin egitmen rehberi mevcut degil."
          actionLabel="Geri Don"
          icon="book-education-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Egitmen Rehberi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Rehber yuklenemedi"
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
      <ScreenLayout title="Egitmen Rehberi" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopGuideContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Egitmen Rehberi" subtitle="Facilitation rehberi">
      <ContentWorkshopGuideContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  roleTag: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  guideChip: {
    backgroundColor: "#283593",
  },
  offlineChip: {
    backgroundColor: "#2E7D32",
  },
  desc: {
    opacity: 0.7,
    lineHeight: 20,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLabel: {
    flex: 1,
    marginRight: 12,
  },
  toggleDesc: {
    opacity: 0.6,
    marginTop: 2,
  },
  modeActive: {
    marginTop: 8,
    color: "#F57C00",
  },
  scriptText: {
    lineHeight: 22,
    fontStyle: "italic",
  },
  scriptTextLarge: {
    fontSize: 18,
    lineHeight: 28,
  },
  divider: {
    marginVertical: 8,
  },
  sectionLabel: {
    opacity: 0.55,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  responseText: {
    lineHeight: 20,
    marginBottom: 4,
  },
  altText: {
    opacity: 0.75,
    lineHeight: 20,
  },
  jumpBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  scenarioRow: {
    marginBottom: 4,
  },
  scenarioLabel: {
    fontWeight: "700",
    color: "#C62828",
    marginBottom: 2,
  },
  scenarioAction: {
    opacity: 0.75,
    lineHeight: 20,
  },
  downloadBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentWorkshopWorkbookScreen  (FR-E8-06)
// ─────────────────────────────────────────────────────────────────────────
files['ContentWorkshopWorkbookScreen.tsx'] = `import React, { useState } from "react";
import { Modal, StyleSheet, TextInput, View } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getWorkshopById, getWorkshops } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PChip,
  PDivider,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-06-01: worksheet types
type WorksheetEntry = {
  id: string;
  title: string;
  description: string;
  fields: Array<{ key: string; label: string; placeholder: string; multiline?: boolean }>;
};

const WORKSHEETS: WorksheetEntry[] = [
  {
    id: "burden-map",
    title: "Yuk Haritasi",
    description: "Simdi tasidigin duygusal, zihinsel ve fiziksel yukleri haritalandir.",
    fields: [
      { key: "emotional", label: "Duygusal Yukler", placeholder: "Kaygı, korku, kizginlik...", multiline: true },
      { key: "mental",    label: "Zihinsel Yukler",  placeholder: "Dusunceler, kararlar, gelecek...", multiline: true },
      { key: "physical",  label: "Fiziksel Yukler",  placeholder: "Yorgunluk, agri, enerji...", multiline: true },
    ],
  },
  {
    id: "inner-sentence",
    title: "Ic Cumle Donusum Tablosu",
    description: "Olumsuz ic cumlelerini donusturmek icin her satirı doldur.",
    fields: [
      { key: "negative",   label: "Olumsuz ic cumle",   placeholder: "Ornek: 'Asla yeterim yok'", multiline: false },
      { key: "reality",    label: "Gerceklik kontrolu",  placeholder: "Bu cumle gercekten dogru mu?", multiline: false },
      { key: "positive",   label: "Donusturulmus cumle", placeholder: "Ornek: 'Adim adim buyuyorum'", multiline: false },
    ],
  },
  {
    id: "prayer-card",
    title: "Dua Karti",
    description: "Bu deneyimden sonra kalp sesini dua olarak yaz.",
    fields: [
      { key: "dua", label: "Duan", placeholder: "Rabbim, bu deneyimden...", multiline: true },
    ],
  },
  {
    id: "tawakkul",
    title: "Tevekkul Dengesi",
    description: "Kontrolunde olan ve olmayanlar: kabul ve hareket dengesi.",
    fields: [
      { key: "in_control",  label: "Kontrol edebildiklerim", placeholder: "Tepkilerimi, niyetimi...", multiline: true },
      { key: "surrender",   label: "Birakabileceklerim",      placeholder: "Sonucu, zamanlamamı...", multiline: true },
    ],
  },
  {
    id: "return-plan",
    title: "Donus Plani",
    description: "Atolyeden sonra hayatina geri donusunu planla.",
    fields: [
      { key: "week1", label: "1. Hafta Hedefi",   placeholder: "Kucuk, somut bir adım...", multiline: false },
      { key: "week2", label: "2. Hafta Hedefi",   placeholder: "...", multiline: false },
      { key: "week3", label: "3. Hafta Hedefi",   placeholder: "...", multiline: false },
      { key: "day30", label: "30. Gun Hedefi",     placeholder: "30 gunde ulasacagim nokta...", multiline: true },
    ],
  },
];

const WorksheetForm = ({
  worksheet,
  isOffline,
  savedValues: initialValues,
  onSave,
}: {
  worksheet: WorksheetEntry;
  isOffline: boolean;
  savedValues: Record<string, string>;
  onSave: (id: string, values: Record<string, string>, completedAt?: string) => void;
}) => {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // AC-FR-E8-06-02: auto-save with context
    onSave(worksheet.id, values, new Date().toISOString().split("T")[0]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <View style={styles.worksheetForm}>
      <PText variant="bodySmall" style={styles.wsDesc}>{worksheet.description}</PText>
      <PDivider style={styles.divider} />
      {worksheet.fields.map((field) => (
        <View key={field.key} style={styles.fieldBlock}>
          <PText variant="labelMedium" style={styles.fieldLabel}>{field.label}</PText>
          <TextInput
            style={[styles.textInput, field.multiline && styles.textInputMulti]}
            multiline={field.multiline}
            value={values[field.key] ?? ""}
            onChangeText={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
            placeholder={field.placeholder}
            editable={!isOffline}
            accessibilityLabel={field.label}
          />
        </View>
      ))}
      {saved && (
        <PText variant="labelSmall" style={styles.savedNote}>Kaydedildi</PText>
      )}
      <PButton
        mode="contained"
        compact
        disabled={isOffline}
        style={styles.saveBtn}
        onPress={handleSave}
      >
        Kaydet
      </PButton>
    </View>
  );
};

const ContentWorkshopWorkbookContent = ({
  workshopId,
  isOffline,
}: {
  workshopId?: string;
  isOffline?: boolean;
}) => {
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];

  // AC-FR-E8-06-02/03: track saved worksheets
  const [savedData, setSavedData] = useState<Record<string, { values: Record<string, string>; completedAt?: string }>>({});
  const [activeSheet, setActiveSheet] = useState<string | null>(WORKSHEETS[0].id);
  // AC-FR-E8-06-04: privacy consent modal
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSave = (id: string, values: Record<string, string>, completedAt?: string) => {
    setSavedData((prev) => ({ ...prev, [id]: { values, completedAt } }));
  };

  const handleExport = () => {
    // AC-FR-E8-06-04: privacy consent (BR-09)
    if (!privacyAccepted) {
      setShowPrivacy(true);
    }
  };

  return (
    <>
      <SectionCard title={"Calisma Kitabi — " + (workshop?.title ?? "Atolye")}>
        <PText variant="bodySmall" style={styles.desc}>
          Her calisma kagidini doldurarak atolye deneyimini derinlestir.
          Girdiler otomatik kaydedilir ve bu atolye/asama baglaminla saklanir.
        </PText>
        <PButton
          mode="outlined"
          compact
          style={styles.exportBtn}
          onPress={handleExport}
          disabled={isOffline}
        >
          Disari Aktar
        </PButton>
      </SectionCard>

      {/* AC-FR-E8-06-01/03: worksheet list with status */}
      <SectionCard title="Calisma Kagitlari">
        {WORKSHEETS.map((ws) => {
          const saved = savedData[ws.id];
          const isCompleted = !!saved?.completedAt;
          return (
            <View key={ws.id}>
              <View style={styles.wsRow}>
                <View style={styles.wsInfo}>
                  <PText variant="titleSmall">{ws.title}</PText>
                  {isCompleted ? (
                    <PText variant="labelSmall" style={styles.completedText}>
                      Tamamlandi: {saved.completedAt}
                    </PText>
                  ) : (
                    <PText variant="labelSmall" style={styles.incompleteText}>
                      {saved ? "Yarida birakıldı" : "Baslanmadı"}
                    </PText>
                  )}
                </View>
                <PButton
                  mode={activeSheet === ws.id ? "contained" : "outlined"}
                  compact
                  onPress={() => setActiveSheet(activeSheet === ws.id ? null : ws.id)}
                >
                  {activeSheet === ws.id ? "Kapat" : saved ? "Devam Et" : "Ac"}
                </PButton>
              </View>

              {activeSheet === ws.id && (
                <WorksheetForm
                  worksheet={ws}
                  isOffline={!!isOffline}
                  savedValues={saved?.values ?? {}}
                  onSave={handleSave}
                />
              )}
              <PDivider style={styles.divider} />
            </View>
          );
        })}
      </SectionCard>

      {/* AC-FR-E8-06-04: privacy consent modal */}
      <Modal
        visible={showPrivacy}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPrivacy(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <PText variant="titleMedium" style={styles.modalTitle}>
              Gizlilik Onayi (BR-09)
            </PText>
            <PText variant="bodySmall" style={styles.modalText}>
              Calisma kagidi icerikleriniz kisiye ozel bilgiler icermektedir.
              Disari aktarmadan once gizlilik politikasini okuduğunuzu onaylayin.
            </PText>
            <View style={styles.modalActions}>
              <PButton
                mode="contained"
                onPress={() => {
                  setPrivacyAccepted(true);
                  setShowPrivacy(false);
                }}
              >
                Onayliyorum, Aktar
              </PButton>
              <PButton mode="outlined" onPress={() => setShowPrivacy(false)}>
                Iptal
              </PButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export const ContentWorkshopWorkbookScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Calisma Kitabi" subtitle="Yukleniyor">
        <SectionCard title="Calisma Kagitlari">
          <PActivityIndicator animating />
          {[1, 2, 3].map((i) => <SkeletonBlock key={i} height={56} />)}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Calisma Kitabi" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Calisma kagidi bulunamadi"
          description="Bu atolye icin calisma kagidi mevcut degil."
          actionLabel="Geri Don"
          icon="notebook-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Calisma Kitabi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Calisma kitabi yuklenemedi"
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
      <ScreenLayout title="Calisma Kitabi" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopWorkbookContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Calisma Kitabi" subtitle="Kisisel calisma kagitlarin">
      <ContentWorkshopWorkbookContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  desc: {
    opacity: 0.7,
    lineHeight: 20,
    marginBottom: 8,
  },
  exportBtn: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  wsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    gap: 10,
  },
  wsInfo: {
    flex: 1,
  },
  completedText: {
    color: "#4CAF50",
    marginTop: 2,
  },
  incompleteText: {
    opacity: 0.55,
    marginTop: 2,
  },
  divider: {
    marginVertical: 6,
  },
  worksheetForm: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  wsDesc: {
    opacity: 0.7,
    lineHeight: 20,
  },
  fieldBlock: {
    marginBottom: 12,
  },
  fieldLabel: {
    marginBottom: 4,
    opacity: 0.7,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  textInputMulti: {
    minHeight: 72,
    textAlignVertical: "top",
  },
  savedNote: {
    color: "#4CAF50",
    marginBottom: 4,
  },
  saveBtn: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 36,
  },
  modalTitle: {
    marginBottom: 12,
    fontWeight: "700",
  },
  modalText: {
    opacity: 0.75,
    lineHeight: 20,
    marginBottom: 16,
  },
  modalActions: {
    gap: 10,
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentWorkshopFollowUpScreen  (FR-E8-07)
// ─────────────────────────────────────────────────────────────────────────
files['ContentWorkshopFollowUpScreen.tsx'] = `import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getWorkshopById, getWorkshops } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PChip,
  PDivider,
  PSwitch,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-07-01: 3-phase follow-up plan
const FOLLOW_UP_PHASES = [
  {
    id: "phase-72h",
    label: "72 Saat Toparlanma",
    desc: "Ilk uc gunde enerji yonetimi ve duygusal yerlesme.",
    steps: [
      "Ekran suresini azalt",
      "Once icin hafif beslenme",
      "Gunluk yaz / ses kaydı al",
      "Paylasim listeni belirle",
    ],
  },
  {
    id: "phase-3w",
    label: "3 Haftalik Takip",
    desc: "Her hafta kucuk bir adim ve pekistirme egzersizi.",
    steps: [
      "Hafta 1: Niyet cumleni gunluk tekrarla",
      "Hafta 2: Bir kisi ile paylasim yap",
      "Hafta 3: Ortam duzenlemesi yap",
    ],
  },
  {
    id: "phase-30d",
    label: "30 Gunluk Plan",
    desc: "Atolyeden 30 gun sonra hedeflerin ile geri bakilacak yer.",
    steps: [
      "30. gunde calisma kitabini yeniden ac",
      "Hangi cumlelerin degistigini gozlemle",
      "Hangi adimi attığını belgele",
      "Yeni bir niyet belirle",
    ],
  },
];

const ContentWorkshopFollowUpContent = ({
  workshopId,
  isOffline,
}: {
  workshopId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];

  // AC-FR-E8-07-02: user records intention, daily sentence, small steps
  const [intention, setIntention] = useState("");
  const [dailySentence, setDailySentence] = useState("");
  const [steps, setSteps] = useState(["", "", ""]);
  const [planSaved, setPlanSaved] = useState(false);

  // AC-FR-E8-07-03: reminder toggle
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderSaved, setReminderSaved] = useState(false);

  const handleSavePlan = () => {
    setPlanSaved(true);
  };

  const handleSaveReminder = () => {
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 2000);
  };

  return (
    <>
      <SectionCard title={"Takip Plani — " + (workshop?.title ?? "Atolye")}>
        <PText variant="bodySmall" style={styles.desc}>
          Atolye sonrasi davranis surekliligi icin 72 saatlik, 3 haftalik ve
          30 gunluk yapilandirilmis takip plani.
        </PText>
      </SectionCard>

      {/* AC-FR-E8-07-01: 3 phases */}
      {FOLLOW_UP_PHASES.map((phase) => (
        <SectionCard key={phase.id} title={phase.label}>
          <PText variant="bodySmall" style={styles.phaseDesc}>{phase.desc}</PText>
          <PDivider style={styles.divider} />
          {phase.steps.map((step, si) => (
            <View key={si} style={styles.stepRow}>
              <PText style={styles.bullet}>•</PText>
              <PText variant="bodySmall" style={styles.stepText}>{step}</PText>
            </View>
          ))}
        </SectionCard>
      ))}

      {/* AC-FR-E8-07-02: personal intention + daily sentence + small steps */}
      <SectionCard title="Kisisel Niyet ve Adimlar">
        <PText variant="labelMedium" style={styles.fieldLabel}>Niyetim</PText>
        <TextInput
          style={styles.textInput}
          multiline
          value={intention}
          onChangeText={setIntention}
          placeholder="Atolyeyi tamamladiktan sonra hayatima tasimak istedigim sey..."
          editable={!isOffline}
          accessibilityLabel="Niyet alani"
        />
        <PText variant="labelMedium" style={[styles.fieldLabel, styles.fieldSpacing]}>Gunluk Cumlemi</PText>
        <TextInput
          style={styles.textInput}
          value={dailySentence}
          onChangeText={setDailySentence}
          placeholder="Her sabah tekrar edecegim cumle..."
          editable={!isOffline}
          accessibilityLabel="Gunluk cumle"
        />
        <PText variant="labelMedium" style={[styles.fieldLabel, styles.fieldSpacing]}>3 Kucuk Adim</PText>
        {steps.map((step, si) => (
          <TextInput
            key={si}
            style={[styles.textInput, styles.stepInput]}
            value={step}
            onChangeText={(v) => setSteps((prev) => { const n = [...prev]; n[si] = v; return n; })}
            placeholder={"Adim " + (si + 1) + "..."}
            editable={!isOffline}
            accessibilityLabel={"Adim " + (si + 1)}
          />
        ))}
        {planSaved && (
          <PText variant="labelSmall" style={styles.savedNote}>Plan kaydedildi</PText>
        )}
        <PButton
          mode="contained"
          disabled={isOffline || (!intention && !dailySentence)}
          style={styles.saveBtn}
          onPress={handleSavePlan}
        >
          Plani Kaydet
        </PButton>
      </SectionCard>

      {/* AC-FR-E8-07-03: reminder — separate from daily content reminders */}
      <SectionCard title="Takip Hatirlaticisi">
        <PText variant="bodySmall" style={styles.desc}>
          Gunluk icerik hatirlaticisından bagimsız olarak bir takip hatirlaticisi kur.
        </PText>
        <View style={styles.toggleRow}>
          <PText variant="titleSmall">Hatirlatici Aktif</PText>
          <PSwitch
            value={reminderEnabled}
            onValueChange={(v) => { setReminderEnabled(v); if (v) handleSaveReminder(); }}
            disabled={isOffline}
            accessibilityLabel="Hatirlatici aktif et"
          />
        </View>
        {reminderSaved && (
          <PText variant="labelSmall" style={styles.savedNote}>Hatirlatici kaydedildi</PText>
        )}
        {reminderEnabled && (
          <View style={styles.chipRow}>
            {["Sabah 08:00", "Ogle 12:00", "Aksam 21:00"].map((t) => (
              <PChip key={t} compact style={styles.timeChip}>{t}</PChip>
            ))}
          </View>
        )}
      </SectionCard>

      {/* AC-FR-E8-07-04: view in archive */}
      <SectionCard title="">
        <PButton
          mode="outlined"
          disabled={isOffline}
          onPress={() =>
            navigation.navigate("Content", {
              screen: "ContentWorkshopCompletion",
              params: { id: workshopId },
            })
          }
        >
          Arsivde Gor
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentWorkshopFollowUpScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Takip Plani" subtitle="Yukleniyor">
        <SectionCard title="Takip Fazlari">
          <PActivityIndicator animating />
          {[1, 2, 3].map((i) => <SkeletonBlock key={i} height={40} />)}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Takip Plani" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Takip plani bulunamadi"
          description="Atolyeyi tamamladiktan sonra takip plani olusturalim."
          actionLabel="Geri Don"
          icon="calendar-check-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Takip Plani" subtitle="Bir sorun olustu">
        <StateMessage
          title="Takip plani yuklenemedi"
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
      <ScreenLayout title="Takip Plani" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopFollowUpContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Takip Plani" subtitle="Davranis surekliligi plani">
      <ContentWorkshopFollowUpContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  desc: {
    opacity: 0.7,
    lineHeight: 20,
  },
  phaseDesc: {
    opacity: 0.7,
    lineHeight: 20,
    marginBottom: 6,
  },
  divider: {
    marginVertical: 8,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    gap: 6,
  },
  bullet: {
    color: "#7C4DFF",
    fontWeight: "700",
  },
  stepText: {
    flex: 1,
    lineHeight: 20,
  },
  fieldLabel: {
    opacity: 0.65,
    marginBottom: 4,
  },
  fieldSpacing: {
    marginTop: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  stepInput: {
    marginBottom: 8,
  },
  savedNote: {
    color: "#4CAF50",
    marginTop: 4,
  },
  saveBtn: {
    marginTop: 10,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  timeChip: {
    alignSelf: "flex-start",
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentWorkshopCompletionScreen  (FR-E8-08)
// ─────────────────────────────────────────────────────────────────────────
files['ContentWorkshopCompletionScreen.tsx'] = `import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getAchievements,
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
  PProgressBar,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

const STAGE_LABELS: Record<number, string> = {
  1: "Referans", 2: "Icgoru", 3: "Referans", 4: "Icgoru",
  5: "Referans", 6: "Icgoru", 7: "Entegrasyon",
  8: "3-Gun Kamp", 9: "Egitmen Rehberi", 10: "Calisma Kitabi", 11: "Kapanis",
};

const ContentWorkshopCompletionContent = ({
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
  const achievements = getAchievements().filter(
    (a: any) => a.user_id === user?.id
  );

  const completedSections = sections.filter(
    (s: any) =>
      progressList.find((p: any) => p.content_id === s.id)?.status === "completed"
  ).length;
  const totalSections = sections.length;
  const progressRatio = totalSections > 0 ? completedSections / totalSections : 0;

  // AC-FR-E8-08-01: workshop is done when all mandatory stages completed
  const workshopCompleted = progressRatio >= 1.0;
  const artifactCount = 5; // simulated — workbook sheets + notes
  const hasFollowUpPlan = true; // simulated

  return (
    <>
      {/* Celebration header */}
      <View style={styles.celebrationBlock}>
        <PText style={styles.celebrationEmoji}>
          {workshopCompleted ? "🏆" : "🌱"}
        </PText>
        <PText variant="headlineMedium" style={styles.celebrationTitle}>
          {workshopCompleted
            ? "Atolye Tamamlandi!"
            : "Atolye Devam Ediyor"}
        </PText>
        <PText variant="bodyMedium" style={styles.celebrationDesc}>
          {workshopCompleted
            ? "Mukemmel bir yolculugu tamamladin. Arsivinde her zaman erisebilirsin."
            : "Kalan asamalari tamamlaman otalye sertifikanı aciklayacak."}
        </PText>
      </View>

      {/* AC-FR-E8-08-02: stage/session completion summary */}
      <SectionCard title="Tamamlanma Ozeti">
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Tamamlanan Asama</PText>
          <PText variant="bodyMedium">{completedSections} / {totalSections}</PText>
        </View>
        <PProgressBar progress={progressRatio} style={styles.progressBar} />
        <PDivider style={styles.divider} />
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Uretilen Artefact</PText>
          <PText variant="bodyMedium">{artifactCount} belge</PText>
        </View>
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Secili Takip Plani</PText>
          <PText variant="bodyMedium">{hasFollowUpPlan ? "Oluşturuldu" : "Henuz olusturulmadi"}</PText>
        </View>
        {!hasFollowUpPlan && (
          <PButton
            mode="text"
            compact
            style={styles.createPlanBtn}
            onPress={() =>
              navigation.navigate("Content", {
                screen: "ContentWorkshopFollowUp",
                params: { id: workshopId },
              })
            }
          >
            Takip Plani Olustur
          </PButton>
        )}
      </SectionCard>

      {/* Stage completion detail */}
      <SectionCard title="Asama Detayi">
        {Object.entries(STAGE_LABELS).map(([num, label]) => {
          const stageNum = parseInt(num, 10);
          const section = sections[stageNum - 1];
          const isDone =
            stageNum <= completedSections ||
            progressList.some(
              (p: any) => p.content_id === section?.id && p.status === "completed"
            );
          return (
            <View key={num} style={styles.stageRow}>
              <PText style={[styles.stageNum, isDone && styles.stageNumDone]}>
                {isDone ? "✓" : String(num)}
              </PText>
              <PText variant="bodySmall" style={[styles.stageLabel, !isDone && styles.stagePending]}>
                {label}
              </PText>
            </View>
          );
        })}
      </SectionCard>

      {/* AC-FR-E8-08-03: certificate / badge */}
      {workshopCompleted ? (
        <SectionCard title="Sertifika ve Rozet">
          <View style={styles.badgeRow}>
            <PText style={styles.badgeEmoji}>🥇</PText>
            <View style={styles.badgeInfo}>
              <PText variant="titleSmall">Atolye Tamamlama Rozeti</PText>
              <PText variant="bodySmall" style={styles.badgeDesc}>
                {workshop?.title ?? "Atolye"} basariyla tamamlandi.
              </PText>
            </View>
          </View>
          <PChip style={styles.certChip}>Ucretsiz Sertifika</PChip>
          <PButton
            mode="outlined"
            style={styles.shareBtn}
            disabled={isOffline}
            onPress={() => {}}
          >
            Sertifikayi Paylas
          </PButton>
        </SectionCard>
      ) : (
        <SectionCard title="Tamamlama Rozeti">
          <PText variant="bodySmall" style={styles.pendingBadge}>
            Tum zorunlu asamalari tamamladiğinda rozet kazanilacak.
          </PText>
        </SectionCard>
      )}

      {/* AC-FR-E8-08-04: re-openable from Library / Archive */}
      <SectionCard title="Arsive Erisim">
        <PText variant="bodySmall" style={styles.archiveDesc}>
          Bu atolye Kutuphane ve Favoriler/Arsiv bolumlerinden yeniden acilabilir.
        </PText>
        <View style={styles.archiveButtons}>
          <PButton
            mode="contained"
            disabled={isOffline}
            style={styles.archiveBtn}
            onPress={() =>
              navigation.navigate("Library", { screen: "LibraryWorkshops" })
            }
          >
            Kutuphanede Gor
          </PButton>
          <PButton
            mode="outlined"
            disabled={isOffline}
            style={styles.archiveBtn}
            onPress={() =>
              navigation.navigate("Content", {
                screen: "ContentWorkshopHome",
                params: { id: workshopId },
              })
            }
          >
            Asamalara Don
          </PButton>
        </View>
      </SectionCard>
    </>
  );
};

export const ContentWorkshopCompletionScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Atolye Tamamlama" subtitle="Yukleniyor">
        <SectionCard title="Ozet">
          <PActivityIndicator animating />
          <SkeletonBlock height={24} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Atolye Tamamlama" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Tamamlama bilgisi bulunamadi"
          description="Henuz tamamlanmis bir atolye yok."
          actionLabel="Asamalara Don"
          icon="trophy-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Atolye Tamamlama" subtitle="Bir sorun olustu">
        <StateMessage
          title="Tamamlama ekrani yuklenemedi"
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
      <ScreenLayout title="Atolye Tamamlama" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopCompletionContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atolye Tamamlama" subtitle="Ozet ve arsiv">
      <ContentWorkshopCompletionContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  celebrationBlock: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  celebrationEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  celebrationTitle: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 8,
  },
  celebrationDesc: {
    textAlign: "center",
    opacity: 0.75,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  metaLabel: {
    opacity: 0.6,
  },
  progressBar: {
    marginVertical: 6,
    borderRadius: 4,
  },
  divider: {
    marginVertical: 8,
  },
  createPlanBtn: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  stageRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    gap: 10,
  },
  stageNum: {
    width: 24,
    textAlign: "center",
    opacity: 0.4,
    fontWeight: "700",
  },
  stageNumDone: {
    color: "#4CAF50",
    opacity: 1,
  },
  stageLabel: {
    flex: 1,
  },
  stagePending: {
    opacity: 0.45,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  badgeEmoji: {
    fontSize: 36,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeDesc: {
    opacity: 0.65,
    marginTop: 2,
  },
  certChip: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  shareBtn: {
    alignSelf: "flex-start",
  },
  pendingBadge: {
    opacity: 0.6,
    lineHeight: 20,
  },
  archiveDesc: {
    opacity: 0.7,
    lineHeight: 20,
    marginBottom: 12,
  },
  archiveButtons: {
    gap: 10,
  },
  archiveBtn: {
    width: "100%",
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// Write all files
// ─────────────────────────────────────────────────────────────────────────
let written = 0;
for (const [filename, content] of Object.entries(files)) {
  const filePath = path.join(SCREENS_DIR, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  written++;
  console.log(`Wrote ${filename}`);
}

console.log(`\nScreens written: ${written}/${Object.keys(files).length}`);
