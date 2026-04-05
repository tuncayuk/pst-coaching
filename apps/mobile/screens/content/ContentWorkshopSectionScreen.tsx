import React, { useState } from "react";
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
  { type: "verse",       label: "Ayet / Hadis",              text: "'Elbette zorlukla birlikte kolaylik vardir.' (94:6)" },
  { type: "explanation", label: "Aciklama",                  text: "Zorluk anlarindaki dayaniklilik, iman kavramiyla derinlesir." },
  { type: "bridge",      label: "Psikoloji / Felsefe Koprusu", text: "Bilissel yeniden cerceveleme teknigi ile olumsuz dusunce donusturulebilir." },
  { type: "practice",    label: "Uygulama",                  text: "Suanda yasadigin bir zorlugu yaz ve 3 farkli bakis acisi gelistir." },
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
          {workshop?.title ?? "Atolye"} * Asama {currentIdx + 1}
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
      <ScreenLayout title="Asama Icerigi" subtitle="Hazirlaniyor">
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
