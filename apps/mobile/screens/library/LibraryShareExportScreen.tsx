import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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
import { PActivityIndicator, PButton, PChip, PDivider, PProgressBar, PText } from "../../components";

// AC-FR-E9-05-02: export scope options
type ExportScope = "highlights_only" | "highlights_and_notes";

const SCOPE_OPTIONS: Array<{ key: ExportScope; label: string; desc: string }> = [
  { key: "highlights_only",    label: "Yalnizca Vurgular",    desc: "Secili vurgular PDF'e eklenir." },
  { key: "highlights_and_notes", label: "Vurgu + Notlar", desc: "Vurgular ve yazdiklariniz eklenir." },
];

const LibraryShareExportContent = ({
  favoriteId,
  isOffline,
}: {
  favoriteId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const favorite = getFavoritesForUser(user?.id).find((f: any) => f.id === favoriteId);

  const source: any =
    getJourneys().find((j) => j.id === favorite?.item_id) ??
    getWorkshops().find((w) => w.id === favorite?.item_id) ??
    getModules().find((m) => m.id === favorite?.item_id) ??
    getEbooks().find((e) => e.id === favorite?.item_id);

  const highlights = getHighlightsForUser(user?.id).filter(
    (h: any) => h.source_id === favorite?.item_id
  );
  const notes = getNotesForUser(user?.id).filter(
    (n: any) => n.source_id === favorite?.item_id
  );

  // AC-FR-E9-05-01: privacy consent
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  // AC-FR-E9-05-02: scope selection
  const [scope, setScope] = useState<ExportScope>("highlights_only");
  // Export simulation
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportDone, setExportDone] = useState(false);

  const handleExport = () => {
    if (!privacyAccepted) return;
    setExporting(true);
    setExportProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 25; setExportProgress(p);
      if (p >= 100) {
        clearInterval(iv);
        setExporting(false);
        setExportDone(true);
      }
    }, 400);
  };

  const itemCount = scope === "highlights_only" ? highlights.length : highlights.length + notes.length;

  return (
    <>
      <SectionCard title={"Paylasim ve Disa Aktarma"}>
        <PText variant="bodySmall" style={styles.sourceLabel}>Kaynak</PText>
        <PText variant="titleSmall" style={styles.sourceTitle}>
          {source?.title ?? "Favori Icerik"}
        </PText>
        <View style={styles.statsRow}>
          <PChip compact style={styles.statChip}>{highlights.length} vurgu</PChip>
          <PChip compact style={styles.statChip}>{notes.length} not</PChip>
        </View>
      </SectionCard>

      {/* AC-FR-E9-05-01: privacy notice (BR-09) */}
      <SectionCard title="Gizlilik Onayi (BR-09)">
        <PText variant="bodySmall" style={styles.privacyText}>
          Disa aktarilan icerik kisisel verilerinizi icermektedir. Paylasim oncesinde
          gizlilik politikasini okudugunuzu ve icerigi paylasmayi onayladiginizi dogrulayin.
        </PText>
        <PDivider style={styles.divider} />
        <View style={styles.consentRow}>
          <PButton
            mode={privacyAccepted ? "contained" : "outlined"}
            compact
            style={styles.consentBtn}
            onPress={() => setPrivacyAccepted(true)}
            accessibilityLabel="Gizlilik onayini ver"
          >
            {privacyAccepted ? "Onaylandi" : "Onaylıyorum"}
          </PButton>
          {privacyAccepted && (
            <PText variant="labelSmall" style={styles.consentCheck}>Onay verildi</PText>
          )}
        </View>
      </SectionCard>

      {/* AC-FR-E9-05-02: scope selection */}
      <SectionCard title="Kapsam Secimi">
        {SCOPE_OPTIONS.map((opt) => (
          <View key={opt.key}>
            <View style={styles.scopeRow}>
              <View style={styles.scopeInfo}>
                <PText variant="titleSmall">{opt.label}</PText>
                <PText variant="bodySmall" style={styles.scopeDesc}>{opt.desc}</PText>
              </View>
              <PButton
                mode={scope === opt.key ? "contained" : "outlined"}
                compact
                onPress={() => setScope(opt.key)}
                accessibilityLabel={"Kapsam: " + opt.label}
              >
                {scope === opt.key ? "Secildi" : "Sec"}
              </PButton>
            </View>
            {opt.key !== "highlights_and_notes" && <PDivider style={styles.divider} />}
          </View>
        ))}
        <PText variant="labelSmall" style={styles.itemCountText}>
          {itemCount} ogeden PDF olusturulacak
        </PText>
      </SectionCard>

      {/* AC-FR-E9-05-03: PDF export */}
      <SectionCard title="">
        {exportDone ? (
          <View style={styles.doneBlock}>
            <PText variant="titleSmall" style={styles.doneText}>PDF olusturuldu!</PText>
            <PText variant="bodySmall" style={styles.doneDesc}>
              Dosya paylasim menusu araciligiyla iletebilirsin.
            </PText>
            <PButton
              mode="contained"
              style={styles.exportBtn}
              onPress={() => navigation.goBack()}
            >
              Tamam
            </PButton>
          </View>
        ) : exporting ? (
          <View style={styles.progressBlock}>
            <PText variant="bodySmall" style={styles.exportingText}>PDF hazirlaniyor...</PText>
            <PProgressBar progress={exportProgress / 100} style={styles.progressBar} />
          </View>
        ) : (
          <PButton
            mode="contained"
            disabled={isOffline || !privacyAccepted}
            style={styles.exportBtn}
            onPress={handleExport}
            accessibilityLabel="PDF olarak disa aktar"
          >
            PDF Olarak Aktar
          </PButton>
        )}
        {!privacyAccepted && (
          <PText variant="labelSmall" style={styles.warningText}>
            Aktarmak icin gizlilik onayini verin.
          </PText>
        )}
      </SectionCard>
    </>
  );
};

export const LibraryShareExportScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const favoriteId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Paylasim ve Aktar" subtitle="Hazirlanıyor">
        <SectionCard title="Kaynak">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Kapsam">
          <SkeletonBlock height={56} />
          <SkeletonBlock height={56} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Paylasim ve Aktar" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Aktarilacak icerik yok"
          description="Bu favori icin vurgu veya not bulunamadi."
          actionLabel="Geri Don"
          icon="export-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Paylasim ve Aktar" subtitle="Bir sorun olustu">
        <StateMessage
          title="Aktarma baslatılamadi"
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
      <ScreenLayout title="Paylasim ve Aktar" subtitle="Cevrimdisi mevcut degil">
        <OfflineNotice />
        <LibraryShareExportContent favoriteId={favoriteId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Paylasim ve Aktar" subtitle="Vurgu ve notlari aktar">
      <LibraryShareExportContent favoriteId={favoriteId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  sourceLabel: { opacity: 0.55, marginBottom: 2 },
  sourceTitle: { fontWeight: "600", marginBottom: 8 },
  statsRow: { flexDirection: "row", gap: 8 },
  statChip: {},
  privacyText: { opacity: 0.75, lineHeight: 20 },
  divider: { marginVertical: 8 },
  consentRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  consentBtn: { alignSelf: "flex-start" },
  consentCheck: { color: "#4CAF50" },
  scopeRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8, gap: 10 },
  scopeInfo: { flex: 1 },
  scopeDesc: { opacity: 0.6, marginTop: 2 },
  itemCountText: { opacity: 0.55, marginTop: 8 },
  doneBlock: { alignItems: "center", paddingVertical: 12 },
  doneText: { color: "#4CAF50", fontWeight: "700", marginBottom: 6 },
  doneDesc: { opacity: 0.7, marginBottom: 12, textAlign: "center" },
  progressBlock: { paddingVertical: 8 },
  exportingText: { opacity: 0.7, marginBottom: 8 },
  progressBar: { borderRadius: 4 },
  exportBtn: {},
  warningText: { opacity: 0.55, marginTop: 8, textAlign: "center" },
});
