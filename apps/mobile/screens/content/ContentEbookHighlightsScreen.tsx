import React, { useState } from "react";
import { Modal, StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getEbookById, getHighlightsForUser, getNotesForUser, getPrimaryUser } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PChip, PText } from "../../components";

const COLOR_MAP: Record<string, string> = {
  yellow: "#FDE68A",
  green: "#BBF7D0",
  blue: "#BAE6FD",
  pink: "#FBCFE8",
};

const ContentEbookHighlightsContent = ({
  isOffline, ebookId,
}: { isOffline?: boolean; ebookId?: string }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const ebook = getEbookById(ebookId) ?? getEbookById(undefined);
  // AC-FR-E7-05-01: ebook-specific highlights
  const allHighlights = getHighlightsForUser(user?.id);
  const highlights = allHighlights.filter((h: any) => h.source_type === "ebook" && (h.source_id === ebook?.id || !ebookId));
  const notes = getNotesForUser(user?.id);

  // AC-FR-E7-05-03: note editing state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedNoteText, setEditedNoteText] = useState("");

  // AC-FR-E7-05-04: export consent modal
  const [showExportConsent, setShowExportConsent] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  const handleExport = () => setShowExportConsent(true);
  const handleExportConfirm = () => { setShowExportConsent(false); setExportDone(true); };

  return (
    <>
      {/* AC-FR-E7-05-01: highlight list */}
      <SectionCard title={"Vurgularim (" + highlights.length + ")"}>
        {highlights.length === 0 ? (
          <View style={styles.emptyBox}>
            <PText style={styles.emptyIcon}>🖊️</PText>
            <PText style={styles.emptyTitle}>Henuz vurgu yok</PText>
            <PText style={styles.emptyBody}>Okurken metin sec ve renk uygula.</PText>
            <PButton mode="outlined" compact onPress={() => navigation.navigate("ContentEbookReader", { id: ebookId ?? "" })} disabled={isOffline}>
              Okumaya Don
            </PButton>
          </View>
        ) : (
          highlights.map((h: any) => (
            <PCard key={h.id} style={[styles.highlightCard, { borderLeftColor: COLOR_MAP[h.color] ?? "#D4D4D4" }]}>
              <PCard.Content>
                <View style={styles.highlightHeader}>
                  <View style={[styles.colorDot, { backgroundColor: COLOR_MAP[h.color] ?? "#D4D4D4" }]} />
                  <PChip compact style={{ backgroundColor: COLOR_MAP[h.color] ?? "#D4D4D4" }}>{h.color ?? "vurgu"}</PChip>
                </View>
                <PText style={styles.quoteText}>"{h.quote}"</PText>
                <View style={styles.highlightActions}>
                  {/* AC-FR-E7-05-02: tap to navigate to page */}
                  <PButton mode="text" compact disabled={isOffline}
                    onPress={() => navigation.navigate("ContentEbookReader", { id: ebookId ?? "" })}>
                    Sayfaya Git
                  </PButton>
                  {/* AC-FR-E7-04-03: add to favorites */}
                  <PButton mode="text" compact icon="heart-outline" disabled={isOffline}>
                    Favori
                  </PButton>
                </View>
              </PCard.Content>
            </PCard>
          ))
        )}
      </SectionCard>

      {/* AC-FR-E7-05-03: notes editable */}
      <SectionCard title={"Notlarim (" + notes.length + ")"}>
        {notes.length === 0 ? (
          <PText style={styles.emptyHint}>Henuz not kaydedilmedi.</PText>
        ) : (
          notes.map((n: any) => (
            <PCard key={n.id} style={styles.noteCard}>
              <PCard.Content>
                {editingNoteId === n.id ? (
                  <View>
                    <TextInput
                      style={styles.noteInput}
                      multiline
                      value={editedNoteText}
                      onChangeText={setEditedNoteText}
                      accessibilityLabel="Not duzenleme alani"
                      editable={!isOffline}
                    />
                    <View style={styles.noteEditActions}>
                      <PButton mode="text" compact onPress={() => setEditingNoteId(null)}>Iptal</PButton>
                      <PButton mode="contained" compact disabled={isOffline} onPress={() => setEditingNoteId(null)}>Kaydet</PButton>
                    </View>
                  </View>
                ) : (
                  <View>
                    <PText style={styles.noteText}>{n.content ?? n.text ?? "Not icerigi"}</PText>
                    <PButton mode="text" compact icon="pencil" onPress={() => { setEditingNoteId(n.id); setEditedNoteText(n.content ?? ""); }}>
                      Duzenle
                    </PButton>
                  </View>
                )}
              </PCard.Content>
            </PCard>
          ))
        )}
      </SectionCard>

      {/* AC-FR-E7-05-04: export with consent */}
      <SectionCard title="Disa Aktar">
        {exportDone ? (
          <PText style={styles.exportDone}>Vurgular basariyla disari aktarildi.</PText>
        ) : (
          <View style={styles.exportRow}>
            <PButton mode="outlined" icon="file-pdf-box" disabled={isOffline} onPress={handleExport}>PDF</PButton>
            <PButton mode="outlined" icon="text" disabled={isOffline} onPress={handleExport}>Metin</PButton>
          </View>
        )}
      </SectionCard>

      {/* BR-09: privacy consent modal */}
      <Modal visible={showExportConsent} transparent animationType="fade" onRequestClose={() => setShowExportConsent(false)}>
        <View style={styles.modalOverlay}>
          <PCard style={styles.modalCard}>
            <PCard.Content>
              <PText style={styles.modalTitle}>Gizlilik Onayi</PText>
              <PText style={styles.modalBody}>Vurgularini ve notlarini disari aktarmak uzeresin. Bu belgeler kisisel veriler icerebilir.</PText>
              <View style={styles.modalActions}>
                <PButton mode="text" onPress={() => setShowExportConsent(false)}>Iptal</PButton>
                <PButton mode="contained" onPress={handleExportConfirm}>Onayla ve Aktar</PButton>
              </View>
            </PCard.Content>
          </PCard>
        </View>
      </Modal>
    </>
  );
};

export const ContentEbookHighlightsScreen = ({ route }: { route?: { params?: { state?: ScreenState; id?: string } } }) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Vurgular ve Notlar" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor"><PActivityIndicator animating /><SkeletonBlock height={40} /></SectionCard>
        <SectionCard title="Vurgular"><SkeletonBlock height={80} /><SkeletonBlock height={80} /></SectionCard>
      </ScreenLayout>
    );
  }
  if (state === "empty") {
    return (
      <ScreenLayout title="Vurgular ve Notlar" subtitle="Henuz vurgu yok">
        <StateMessage title="Vurgu bulunamadi" description="Henuz kaydettigin vurgu yok. Okurken metin sec." actionLabel="Okumaya Don" icon="marker" />
      </ScreenLayout>
    );
  }
  if (state === "error") {
    return (
      <ScreenLayout title="Vurgular ve Notlar" subtitle="Bir sorun olustu">
        <StateMessage title="Vurgular yuklenemedi" description="Baglantiyi kontrol edip tekrar dene." actionLabel="Tekrar Dene" icon="alert-circle-outline" tone="error" />
      </ScreenLayout>
    );
  }
  if (state === "offline") {
    return (
      <ScreenLayout title="Vurgular ve Notlar" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentEbookHighlightsContent isOffline ebookId={ebookId} />
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout title="Vurgular ve Notlar" subtitle="Kaydettigin vurgular ve notlar">
      <ContentEbookHighlightsContent ebookId={ebookId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  emptyBox: { alignItems: "center", paddingVertical: 20, gap: 8 },
  emptyIcon: { fontSize: 36 },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937" },
  emptyBody: { fontSize: 13, color: "#737373", textAlign: "center" },
  highlightCard: { borderLeftWidth: 4, marginBottom: 10, borderRadius: 10 },
  highlightHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  colorDot: { width: 12, height: 12, borderRadius: 6 },
  quoteText: { fontSize: 14, color: "#1F2937", lineHeight: 22, fontStyle: "italic", marginBottom: 8 },
  highlightActions: { flexDirection: "row", gap: 4 },
  noteCard: { marginBottom: 10, borderRadius: 10 },
  noteInput: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 10, fontSize: 14, color: "#1F2937", minHeight: 60, textAlignVertical: "top" },
  noteEditActions: { flexDirection: "row", justifyContent: "flex-end", gap: 8, marginTop: 8 },
  noteText: { fontSize: 14, color: "#1F2937", lineHeight: 20, marginBottom: 8 },
  emptyHint: { fontSize: 13, color: "#9CA3AF" },
  exportRow: { flexDirection: "row", gap: 10 },
  exportDone: { fontSize: 13, color: "#15803D" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 24 },
  modalCard: { width: "100%", borderRadius: 16 },
  modalTitle: { fontSize: 17, fontWeight: "700", color: "#1F2937", marginBottom: 12 },
  modalBody: { fontSize: 14, color: "#525252", lineHeight: 22, marginBottom: 20 },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: 8 },
});
