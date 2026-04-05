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
  getEbooks,
  getFavoritesForUser,
  getHighlightsForUser,
  getJourneys,
  getModules,
  getNotesForUser,
  getPrimaryUser,
  getWorkshops,
} from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PChip, PDivider, PText } from "../../components";

const TYPE_LABEL: Record<string, string> = {
  journey: "Yolculuk",
  workshop: "Atolye",
  module: "Modul",
  ebook: "e-Kitap",
};
const TYPE_COLOR: Record<string, string> = {
  journey: "#7C4DFF",
  workshop: "#C62828",
  module: "#2E7D32",
  ebook: "#00897B",
};

// Maps item type to the navigation screen name for "Go to Source"
const TYPE_SCREEN: Record<string, string> = {
  journey: "ContentJourneyDetail",
  workshop: "ContentWorkshopDetail",
  module: "ContentModuleHome",
  ebook: "ContentEbookDetail",
};

const LibraryFavoriteDetailContent = ({
  favoriteId,
  isOffline,
}: {
  favoriteId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const favorite = getFavoritesForUser(user?.id).find((item: any) => item.id === favoriteId);

  // AC-FR-E9-02-01: resolve source info
  const journey = getJourneys().find((j) => j.id === favorite?.item_id);
  const workshop = getWorkshops().find((w) => w.id === favorite?.item_id);
  const module = getModules().find((m) => m.id === favorite?.item_id);
  const ebook = getEbooks().find((e) => e.id === favorite?.item_id);
  const item: any = journey ?? workshop ?? module ?? ebook;
  const type = journey ? "journey" : workshop ? "workshop" : module ? "module" : ebook ? "ebook" : "content";

  // Related highlights/notes from the source
  const highlights = getHighlightsForUser(user?.id).filter(
    (h: any) => h.source_id === favorite?.item_id
  );
  const existingNote = getNotesForUser(user?.id).find(
    (n: any) => n.source_id === favorite?.item_id
  );

  // AC-FR-E9-02-02: editable note with auto-save
  const [noteText, setNoteText] = useState(existingNote?.text ?? "");
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSaveNote = () => {
    // Simulate auto-save (BR-12)
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  // Auto-save on blur
  const handleNoteBlur = () => {
    if (noteText !== (existingNote?.text ?? "")) {
      handleSaveNote();
    }
  };

  return (
    <>
      {/* AC-FR-E9-02-01: source info */}
      <SectionCard title="Favori Detay">
        <View style={styles.titleRow}>
          <View style={[styles.typeBar, { backgroundColor: TYPE_COLOR[type] ?? "#9E9E9E" }]} />
          <View style={styles.titleBody}>
            <PText variant="headlineSmall" style={styles.title}>
              {item?.title ?? "Favori Icerik"}
            </PText>
            <PChip compact style={[styles.typeChip, { borderColor: TYPE_COLOR[type] ?? "#9E9E9E" }]}>
              {TYPE_LABEL[type] ?? "Icerik"}
            </PChip>
          </View>
        </View>
        {item?.description ? (
          <PText variant="bodyMedium" style={styles.description}>
            {item.description}
          </PText>
        ) : null}
        <PDivider style={styles.divider} />
        {/* AC-FR-E9-02-03: "Go to source" button */}
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.sourceBtn}
          onPress={() => {
            if (TYPE_SCREEN[type] && favorite?.item_id) {
              navigation.navigate("Content", {
                screen: TYPE_SCREEN[type],
                params: { id: favorite.item_id },
              });
            }
          }}
          accessibilityLabel={"Kaynaga git: " + (item?.title ?? "Icerik")}
        >
          Kaynaga Git
        </PButton>
      </SectionCard>

      {/* Highlights from this source */}
      {highlights.length > 0 && (
        <SectionCard title={"Vurgulamalar (" + highlights.length + ")"}>
          {highlights.map((h: any, idx: number) => (
            <View key={h.id}>
              <View style={[styles.highlightBar, { borderLeftColor: h.color === "yellow" ? "#FFC107" : h.color === "blue" ? "#1E88E5" : "#4CAF50" }]}>
                <PText variant="bodySmall" style={styles.highlightText}>
                  {h.quote}
                </PText>
              </View>
              {idx < highlights.length - 1 && <PDivider style={styles.divider} />}
            </View>
          ))}
        </SectionCard>
      )}

      {/* AC-FR-E9-02-02: editable note, auto-save */}
      <SectionCard title="Notum">
        <PText variant="labelSmall" style={styles.noteHint}>
          Favori icin notunu buraya yazabilirsin. Otomatik kaydedilir.
        </PText>
        <TextInput
          style={styles.noteInput}
          multiline
          value={noteText}
          onChangeText={setNoteText}
          onBlur={handleNoteBlur}
          placeholder="Notunuzu yazin..."
          editable={!isOffline}
          accessibilityLabel="Favori notu"
        />
        {noteSaved && (
          <PText variant="labelSmall" style={styles.savedNote}>Kaydedildi</PText>
        )}
        <PButton
          mode="outlined"
          compact
          disabled={isOffline || !noteText}
          style={styles.saveNoteBtn}
          onPress={handleSaveNote}
        >
          Notu Kaydet
        </PButton>
      </SectionCard>

      {/* Export action */}
      <SectionCard title="Islemler">
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.actionBtn}
          onPress={() => navigation.navigate("LibraryShareExport", { id: favoriteId })}
        >
          Paylasim / Disa Aktar
        </PButton>
        <PButton
          mode="text"
          disabled={isOffline}
          style={styles.actionBtn}
          onPress={() => navigation.goBack()}
        >
          Favorilerden Kaldir
        </PButton>
      </SectionCard>
    </>
  );
};

export const LibraryFavoriteDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const favoriteId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Favori Detay" subtitle="Detaylar hazirlanıyor">
        <SectionCard title="Yuklenıyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={24} />
          <SkeletonBlock height={16} />
        </SectionCard>
        <SectionCard title="Vurgulamalar">
          <SkeletonBlock height={56} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Favori Detay" subtitle="Detaylar bulunamadi">
        <StateMessage
          title="Favori bulunamadi"
          description="Bu favori artik mevcut degil ya da kaldirilmis."
          actionLabel="Favorilere Dön"
          icon="heart-off-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Favori Detay" subtitle="Bir sorun olustu">
        <StateMessage
          title="Detay yuklenemedi"
          description="Verileri getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Favori Detay" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <LibraryFavoriteDetailContent favoriteId={favoriteId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Favori Detay" subtitle="Kaydedilen icerik">
      <LibraryFavoriteDetailContent favoriteId={favoriteId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  typeBar: {
    width: 4,
    borderRadius: 2,
    minHeight: 56,
  },
  titleBody: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    marginBottom: 6,
  },
  typeChip: {
    alignSelf: "flex-start",
  },
  description: {
    opacity: 0.75,
    lineHeight: 22,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  sourceBtn: {
    alignSelf: "flex-start",
  },
  highlightBar: {
    borderLeftWidth: 3,
    paddingLeft: 10,
    paddingVertical: 4,
    marginVertical: 4,
  },
  highlightText: {
    lineHeight: 20,
    fontStyle: "italic",
  },
  noteHint: {
    opacity: 0.55,
    marginBottom: 6,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    fontSize: 14,
    textAlignVertical: "top",
    marginBottom: 6,
  },
  savedNote: {
    color: "#4CAF50",
    marginBottom: 4,
  },
  saveNoteBtn: {
    alignSelf: "flex-start",
  },
  actionBtn: {
    marginBottom: 8,
  },
});
