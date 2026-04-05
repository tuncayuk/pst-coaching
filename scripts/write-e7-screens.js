#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const BASE = "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/content";

const detailScreen = `import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getDownloadsForUser, getEbookById, getEbookChaptersForEbook, getEbookProgressForUser, getPrimaryUser } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PChip, PProgressBar, PText } from "../../components";

const LOW_STORAGE_MB = 200;
const AVG_MIN_PER_PAGE = 2.5;

const ContentEbookDetailContent = ({ ebookId, isOffline }: { ebookId?: string; isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const ebook = getEbookById(ebookId) ?? getEbookById(undefined);
  const chapters = getEbookChaptersForEbook(ebook?.id);
  const ebookProgress = getEbookProgressForUser(user?.id);
  const downloads = getDownloadsForUser(user?.id);

  const progressEntry = ebookProgress.find((p: any) => p.ebook_id === ebook?.id);
  const progressPercent: number = progressEntry?.percent_complete ?? 0;
  const chaptersRead = Math.round((progressPercent / 100) * (chapters.length || 1));
  const totalPages = ebook?.total_pages ?? 100;
  const pagesLeft = Math.round(((100 - progressPercent) / 100) * totalPages);
  const estimatedMinutes = Math.round(pagesLeft * AVG_MIN_PER_PAGE);
  const hoursLeft = Math.floor(estimatedMinutes / 60);
  const minsLeft = estimatedMinutes % 60;
  // AC-FR-E7-07-02: estimated remaining time
  const timeLeftLabel = hoursLeft > 0
    ? hoursLeft + " saat " + minsLeft + " dk"
    : minsLeft + " dk";
  const download = downloads.find((d: any) => d.content_id === ebook?.id);
  const isDownloaded = download?.status === "completed";
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  // AC-FR-E7-08-04: downloaded ebooks show checkmark
  const [downloadDone, setDownloadDone] = useState(isDownloaded);
  const [showStorageWarn, setShowStorageWarn] = useState(false);
  const isCompleted = progressPercent >= 100;

  const handleDownload = () => {
    // AC-FR-E7-08-03: low storage warning
    const simulatedFreeMB = 150;
    if (simulatedFreeMB < LOW_STORAGE_MB) { setShowStorageWarn(true); return; }
    setIsSimulating(true);
    let prog = 0;
    const iv = setInterval(() => {
      prog += 25; setSimProgress(prog);
      if (prog >= 100) { clearInterval(iv); setIsSimulating(false); setDownloadDone(true); }
    }, 500);
  };

  return (
    <>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>{downloadDone ? "📖 ✓" : "📖"}</PText>
        <PText style={styles.heroTitle}>{ebook?.title ?? "e-Kitap"}</PText>
        <View style={styles.tagRow}>
          <PChip compact style={styles.tagChip}>{ebook?.category ?? "Kisisel Gelisim"}</PChip>
          <PChip compact style={styles.tagChip}>{totalPages} sayfa</PChip>
          {ebook?.has_audio && <PChip compact style={styles.audioChip}>Sesli</PChip>}
          {downloadDone && <PChip compact style={styles.downloadedChip}>Indirildi</PChip>}
        </View>
      </View>

      <SectionCard title="Okuma Ilerlemesi">
        <View style={styles.progressHeader}>
          <PText style={styles.progressPct}>{Math.round(progressPercent)}%</PText>
          <PText style={styles.progressSub}>{chaptersRead}/{chapters.length} bolum</PText>
        </View>
        <PProgressBar progress={progressPercent / 100} style={styles.progressBar} accessibilityLabel={"Okuma ilerlemesi yuzde " + Math.round(progressPercent)} />
        <View style={styles.metaRow}>
          <PText style={styles.metaItem}>Sayfa {Math.round((progressPercent / 100) * totalPages)}/{totalPages}</PText>
          <PText style={styles.metaItem}>Kalan: {timeLeftLabel}</PText>
        </View>
        {isCompleted && (
          <View style={styles.completionBadge}>
            <PText style={styles.completionIcon}>🏆</PText>
            <PText style={styles.completionText}>Tebrikler! Bu kitabi tamamladin.</PText>
            <PButton mode="contained" compact onPress={() => navigation.navigate("ContentAchievement", { id: ebookId ?? "" })} style={styles.badgeCta}>
              Sertifikani Al
            </PButton>
          </View>
        )}
      </SectionCard>

      <SectionCard title="Cevrimdisi Erisim">
        {isSimulating ? (
          <View>
            <PText style={styles.downloadLabel}>Indiriliyor... {simProgress}%</PText>
            <PProgressBar progress={simProgress / 100} style={styles.progressBar} accessibilityLabel={"Indirme ilerlemesi yuzde " + simProgress} />
          </View>
        ) : downloadDone ? (
          <View style={styles.downloadedRow}>
            <PText style={styles.downloadedText}>Kitap indirildi. Cevrimdisiyken okuyabilirsin.</PText>
            <PButton mode="text" compact textColor="#DC2626">Sil</PButton>
          </View>
        ) : (
          <PButton mode="outlined" icon="download" disabled={isOffline} onPress={handleDownload}>
            Cevrimdisi Indir
          </PButton>
        )}
      </SectionCard>

      <SectionCard title="Kitap Hakkinda">
        <PText style={styles.paragraph}>Sükrün donusturucu gücünü kesfet. Günlük hayatta sükrü nasil yasayacagini ögren.</PText>
        <View style={styles.metaBox}>
          <PText style={styles.metaText}>Yazar: PST Coaching Ekibi</PText>
          <PText style={styles.metaText}>Kategori: Kisisel Gelisim</PText>
          <PText style={styles.metaText}>Toplam: {totalPages} sayfa</PText>
        </View>
      </SectionCard>

      <SectionCard title="Icindekiler">
        {chapters.slice(0, 5).map((ch: any, i: number) => (
          <View key={ch.id} style={styles.chapRow}>
            <PText style={styles.chapIndex}>{ch.order_index ?? i + 1}</PText>
            <View style={styles.chapInfo}>
              <PText style={styles.chapTitle}>{ch.title}</PText>
              {ch.page_start != null && <PText style={styles.chapPages}>Sayfa {ch.page_start}-{ch.page_end}</PText>}
            </View>
          </View>
        ))}
        {chapters.length > 5 && (
          <PButton mode="text" compact onPress={() => navigation.navigate("ContentEbookToc", { id: ebookId ?? "" })}>
            Tum Bolumleri Gor (+{chapters.length - 5})
          </PButton>
        )}
      </SectionCard>

      <SectionCard title="Araclar">
        <View style={styles.toolRow}>
          <PButton mode="outlined" icon="marker" compact style={styles.toolBtn}
            onPress={() => navigation.navigate("ContentEbookHighlights", { id: ebookId ?? "" })}>
            Vurgularim
          </PButton>
          <PButton mode="outlined" icon="cog" compact style={styles.toolBtn}
            onPress={() => navigation.navigate("ContentEbookSettings", { id: ebookId ?? "" })}>
            Okuma Ayarlari
          </PButton>
        </View>
      </SectionCard>

      <PButton mode="contained" disabled={isOffline}
        onPress={() => navigation.navigate("ContentEbookReader", { id: ebook?.id ?? "" })}
        style={styles.primaryCta}>
        {progressPercent > 0 ? "Okumaya Devam Et" : "Okumaya Basla"}
      </PButton>

      <Modal visible={showStorageWarn} transparent animationType="fade" onRequestClose={() => setShowStorageWarn(false)}>
        <View style={styles.modalOverlay}>
          <PCard style={styles.modalCard}>
            <PCard.Content>
              <PText style={styles.modalTitle}>Yetersiz Depolama</PText>
              <PText style={styles.modalBody}>Cihazinda yeterli alan yok. Bazi dosyalari silip tekrar dene.</PText>
              <PButton mode="contained" onPress={() => setShowStorageWarn(false)}>Anladim</PButton>
            </PCard.Content>
          </PCard>
        </View>
      </Modal>
    </>
  );
};

export const ContentEbookDetailScreen = ({ route }: { route?: { params?: { state?: ScreenState; id?: string } } }) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor"><PActivityIndicator animating /><SkeletonBlock height={80} /></SectionCard>
        <SectionCard title="Ilerleme"><SkeletonBlock height={60} /></SectionCard>
        <SectionCard title="Icindekiler"><SkeletonBlock height={120} /></SectionCard>
      </ScreenLayout>
    );
  }
  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="Icerik bulunamadi">
        <StateMessage title="e-Kitap bulunamadi" description="Bu e-Kitap su anda erisebilir degil." actionLabel="Kesfe Don" icon="book-open-page-variant" />
      </ScreenLayout>
    );
  }
  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="Bir sorun olustu">
        <StateMessage title="e-Kitap yuklenemedi" description="Baglantiyi kontrol edip tekrar dene." actionLabel="Tekrar Dene" icon="alert-circle-outline" tone="error" />
      </ScreenLayout>
    );
  }
  if (state === "offline") {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentEbookDetailContent ebookId={ebookId} isOffline />
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout title="e-Kitap Detay" subtitle="Kitap bilgileri ve ilerleme">
      <ContentEbookDetailContent ebookId={ebookId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  hero: { alignItems: "center", paddingVertical: 24, paddingHorizontal: 16, backgroundColor: "#F0FDF4", borderRadius: 20, marginBottom: 16 },
  heroEmoji: { fontSize: 64, marginBottom: 12 },
  heroTitle: { fontSize: 24, fontWeight: "800", color: "#1F2937", textAlign: "center", marginBottom: 12 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" },
  tagChip: { backgroundColor: "#E0F7FA" },
  audioChip: { backgroundColor: "#FEF3C7" },
  downloadedChip: { backgroundColor: "#DCFCE7" },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 },
  progressPct: { fontSize: 28, fontWeight: "800", color: "#6B46C1" },
  progressSub: { fontSize: 12, color: "#737373" },
  progressBar: { marginBottom: 8 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  metaItem: { fontSize: 12, color: "#737373" },
  completionBadge: { marginTop: 16, padding: 16, backgroundColor: "#FEF9C3", borderRadius: 12, alignItems: "center", gap: 8 },
  completionIcon: { fontSize: 32 },
  completionText: { fontSize: 14, fontWeight: "600", color: "#1F2937", textAlign: "center" },
  badgeCta: { marginTop: 8 },
  downloadLabel: { fontSize: 13, color: "#525252", marginBottom: 8 },
  downloadedRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  downloadedText: { flex: 1, fontSize: 13, color: "#15803D", marginRight: 8 },
  paragraph: { fontSize: 14, color: "#525252", lineHeight: 22, marginBottom: 12 },
  metaBox: { backgroundColor: "#F9FAFB", borderRadius: 10, padding: 12, gap: 4 },
  metaText: { fontSize: 12, color: "#525252" },
  chapRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#E5E7EB" },
  chapIndex: { fontSize: 14, fontWeight: "700", color: "#6B46C1", width: 20, textAlign: "center" },
  chapInfo: { flex: 1 },
  chapTitle: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  chapPages: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  toolRow: { flexDirection: "row", gap: 10 },
  toolBtn: { flex: 1 },
  primaryCta: { marginBottom: 8 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 24 },
  modalCard: { width: "100%", borderRadius: 16 },
  modalTitle: { fontSize: 17, fontWeight: "700", color: "#1F2937", marginBottom: 12 },
  modalBody: { fontSize: 14, color: "#525252", lineHeight: 22, marginBottom: 20 },
});
`;

const readerScreen = `import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getEbookById, getEbookChaptersForEbook, getPrimaryUser, getHighlightsForUser } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PChip, PProgressBar, PText } from "../../components";

const READING_PARAGRAPHS = [
  "Kendine karsi nazik olmak, zorlayici anlarda ic sesini yumusatmanin ilk adimidir.",
  "Nefesini sayarken omuzlarinin gevsettigini fark et. Zihin baska yerlere gittiginde yargilamadan geri getir.",
  "Okuma sonrasi dusuncelerini not etmek icin birkaç dakika ayir. Bu kisa refleksiyon, ogrenmeyi kalici hale getirir.",
  "Her sayfada kendi hikayeni gor. Sükür hem bir eylem hem de bir baki açisidir.",
];

const HIGHLIGHT_COLORS = [
  { key: "yellow", label: "Sari", color: "#FDE68A" },
  { key: "green", label: "Yesil", color: "#BBF7D0" },
  { key: "blue", label: "Mavi", color: "#BAE6FD" },
  { key: "pink", label: "Pembe", color: "#FBCFE8" },
];

const AUDIO_SPEEDS = ["0.75x", "1x", "1.25x"] as const;
type AudioSpeed = typeof AUDIO_SPEEDS[number];

const ContentEbookReaderContent = ({
  isOffline, ebookId, chapterId,
}: { isOffline?: boolean; ebookId?: string; chapterId?: string }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const ebook = getEbookById(ebookId) ?? getEbookById(undefined);
  const chapters = getEbookChaptersForEbook(ebook?.id ?? ebookId);
  const userHighlights = getHighlightsForUser(user?.id);

  const currentIndex = chapterId ? chapters.findIndex((c: any) => c.id === chapterId) : 0;
  const safeIndex = currentIndex < 0 ? 0 : currentIndex;
  const current = chapters[safeIndex] ?? chapters[0];
  const prev = chapters[safeIndex - 1];
  const next = chapters[safeIndex + 1];
  // AC-FR-E7-02-04: progress bar
  const progress = chapters.length > 0 ? (safeIndex + 1) / chapters.length : 0;

  // AC-FR-E7-04-01: highlight color picker state
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [addedHighlight, setAddedHighlight] = useState(false);
  // AC-FR-E7-04-02: note auto-save state
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  // AC-FR-E7-06-01/03/04: audio state
  const hasAudio = ebook?.has_audio ?? false;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<AudioSpeed>("1x");

  const handleAddHighlight = (colorKey: string) => {
    setSelectedColor(colorKey);
    setAddedHighlight(true);
    setShowHighlightPicker(false);
  };

  const handleSaveNote = () => {
    // AC-FR-E7-04-02 BR-12: auto-save
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <>
      {/* AC-FR-E7-01-02: Book + chapter title + page range */}
      <SectionCard title={ebook?.title ?? "e-Kitap"}>
        <PText style={styles.chapterTitle}>
          {current ? "Bolum " + (current.order_index ?? safeIndex + 1) + ": " + current.title : "Bolum " + (safeIndex + 1)}
        </PText>
        {current?.page_start != null && (
          <PText style={styles.pageRange}>
            Sayfa {current.page_start}-{current.page_end}
          </PText>
        )}
        {/* AC-FR-E7-02-04: progress bar */}
        <PProgressBar
          progress={progress}
          style={styles.progressBar}
          accessibilityLabel={"Okuma ilerlemesi yuzde " + Math.round(progress * 100)}
        />
        <PText style={styles.progressLabel}>
          {safeIndex + 1} / {chapters.length} bolum ({Math.round(progress * 100)}% tamamlandi)
        </PText>
      </SectionCard>

      {/* Reading content */}
      <SectionCard title="Icerik">
        {READING_PARAGRAPHS.map((para, i) => (
          <View key={i} style={[styles.paraBlock, selectedColor ? { backgroundColor: HIGHLIGHT_COLORS.find(h => h.key === selectedColor)?.color ?? "transparent", borderRadius: 6 } : {}]}>
            <PText style={styles.paragraph}>{para}</PText>
          </View>
        ))}
        {/* AC-FR-E7-04-01: simulated text selection highlight picker */}
        {!showHighlightPicker && !addedHighlight && (
          <PButton mode="text" compact onPress={() => setShowHighlightPicker(true)} style={styles.highlightBtn}>
            Metin Sec ve Vurgula
          </PButton>
        )}
        {showHighlightPicker && (
          <View style={styles.colorPickerRow}>
            <PText style={styles.colorPickerLabel}>Renk sec:</PText>
            {HIGHLIGHT_COLORS.map((hc) => (
              <TouchableOpacity key={hc.key} onPress={() => handleAddHighlight(hc.key)} style={[styles.colorSwatch, { backgroundColor: hc.color }]} accessibilityLabel={hc.label} />
            ))}
          </View>
        )}
        {addedHighlight && (
          <PText style={styles.highlightSaved}>Vurgu eklendi! Vurgularim ekraninda gorülebilir.</PText>
        )}
      </SectionCard>

      {/* AC-FR-E7-04-02: note adding with auto-save (BR-12) */}
      <SectionCard title="Not Ekle">
        <View style={styles.noteRow}>
          <TouchableOpacity
            style={styles.noteArea}
            onPress={() => setNote(note.length ? note : "Not yazin...")}
            accessibilityLabel="Not alani"
          >
            <PText style={[styles.notePlaceholder, note && styles.noteText]}>
              {note || "Okuma notunuzu buraya yazin..."}
            </PText>
          </TouchableOpacity>
        </View>
        <View style={styles.noteActions}>
          {noteSaved && <PText style={styles.noteSavedLabel}>Kaydedildi</PText>}
          <PButton mode="text" compact onPress={handleSaveNote} disabled={isOffline}>
            Kaydet
          </PButton>
        </View>
      </SectionCard>

      {/* AC-FR-E7-06-01/02/03/04: audio player panel — shown only if has_audio */}
      {hasAudio ? (
        <SectionCard title="Sesli Kitap">
          <View style={styles.audioRow}>
            <PButton
              mode={isPlaying ? "contained" : "outlined"}
              icon={isPlaying ? "pause" : "play"}
              onPress={() => setIsPlaying(!isPlaying)}
              disabled={isOffline}
              style={styles.audioPlayBtn}
            >
              {isPlaying ? "Duraklat" : "Dinle"}
            </PButton>
            <PText style={styles.audioSync}>{isPlaying ? "Metin takip ediliyor..." : "Baslatmak icin tiklayin"}</PText>
          </View>
          {/* AC-FR-E7-06-03: speed selector */}
          <View style={styles.speedRow}>
            <PText style={styles.speedLabel}>Hiz:</PText>
            {AUDIO_SPEEDS.map((spd) => (
              <PChip
                key={spd}
                compact
                selected={audioSpeed === spd}
                onPress={() => setAudioSpeed(spd)}
                style={styles.speedChip}
              >
                {spd}
              </PChip>
            ))}
          </View>
          {/* AC-FR-E7-06-04: background play hint */}
          {isPlaying && (
            <PText style={styles.bgPlayHint}>Uygulamadan ciksan da ses arka planda devam eder.</PText>
          )}
        </SectionCard>
      ) : (
        <SectionCard title="Sesli Kitap">
          <PText style={styles.audioUnavailable}>Bu kitabin sesli versiyonu mevcut degil.</PText>
        </SectionCard>
      )}

      {/* Chapter navigation + quick tools */}
      <SectionCard title="Navigasyon">
        <View style={styles.navRow}>
          <PButton
            mode="outlined"
            icon="chevron-left"
            compact
            style={styles.navBtn}
            disabled={!prev || isOffline}
            onPress={() => prev && navigation.navigate("ContentEbookReader", { id: ebookId ?? "", chapterId: prev.id })}
          >
            Onceki
          </PButton>
          <PButton
            mode="contained"
            icon="chevron-right"
            compact
            style={styles.navBtn}
            disabled={!next || isOffline}
            onPress={() => next && navigation.navigate("ContentEbookReader", { id: ebookId ?? "", chapterId: next.id })}
          >
            Sonraki
          </PButton>
        </View>
        <View style={styles.toolbarRow}>
          <PButton mode="text" compact icon="format-list-bulleted" onPress={() => navigation.navigate("ContentEbookToc", { id: ebookId ?? "" })}>
            Icindekiler
          </PButton>
          <PButton mode="text" compact icon="marker" onPress={() => navigation.navigate("ContentEbookHighlights", { id: ebookId ?? "" })}>
            Vurgularim
          </PButton>
          <PButton mode="text" compact icon="cog" onPress={() => navigation.navigate("ContentEbookSettings", { id: ebookId ?? "" })}>
            Ayarlar
          </PButton>
        </View>
      </SectionCard>
    </>
  );
};

export const ContentEbookReaderScreen = ({ route }: { route?: { params?: { state?: ScreenState; id?: string; chapterId?: string } } }) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;
  const chapterId = route?.params?.chapterId;

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor"><PActivityIndicator animating /><SkeletonBlock height={40} /></SectionCard>
        <SectionCard title="Icerik"><SkeletonBlock height={120} /><SkeletonBlock height={80} /></SectionCard>
      </ScreenLayout>
    );
  }
  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Icerik bulunamadi">
        <StateMessage title="Bolum bulunamadi" description="Bu bolum su anda erisebilir degil." actionLabel="Icindekiler" icon="book-open-variant" />
      </ScreenLayout>
    );
  }
  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Bir sorun olustu">
        <StateMessage title="Okuyucu yuklenemedi" description="Baglantiyi kontrol edip tekrar dene." actionLabel="Tekrar Dene" icon="alert-circle-outline" tone="error" />
      </ScreenLayout>
    );
  }
  if (state === "offline") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentEbookReaderContent isOffline ebookId={ebookId} chapterId={chapterId} />
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout title="e-Kitap Okuyucu" subtitle="Okumaya devam et">
      <ContentEbookReaderContent ebookId={ebookId} chapterId={chapterId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chapterTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937", marginBottom: 4 },
  pageRange: { fontSize: 12, color: "#9CA3AF", marginBottom: 8 },
  progressBar: { marginBottom: 4 },
  progressLabel: { fontSize: 11, color: "#737373", textAlign: "right" },
  paraBlock: { padding: 4, marginBottom: 2 },
  paragraph: { fontSize: 15, color: "#1F2937", lineHeight: 26, marginBottom: 14 },
  highlightBtn: { alignSelf: "flex-start", marginTop: 4 },
  colorPickerRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8, marginBottom: 8 },
  colorPickerLabel: { fontSize: 13, color: "#525252" },
  colorSwatch: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: "#E5E7EB" },
  highlightSaved: { fontSize: 12, color: "#15803D", marginTop: 4 },
  noteRow: { marginBottom: 8 },
  noteArea: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 12, minHeight: 60, backgroundColor: "#FAFAFA" },
  notePlaceholder: { fontSize: 14, color: "#9CA3AF" },
  noteText: { color: "#1F2937" },
  noteActions: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center" },
  noteSavedLabel: { fontSize: 12, color: "#15803D", marginRight: 8 },
  audioRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  audioPlayBtn: { flex: 0 },
  audioSync: { flex: 1, fontSize: 13, color: "#525252", fontStyle: "italic" },
  speedRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  speedLabel: { fontSize: 13, color: "#525252" },
  speedChip: {},
  bgPlayHint: { fontSize: 12, color: "#6B46C1", fontStyle: "italic" },
  audioUnavailable: { fontSize: 13, color: "#9CA3AF" },
  navRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  navBtn: { flex: 1 },
  toolbarRow: { flexDirection: "row", justifyContent: "space-between" },
});
`;

const tocScreen = `import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getEbookChaptersForEbook, getEbookById } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PDivider, PText } from "../../components";

const ContentEbookTocContent = ({
  isOffline, ebookId, currentChapterId,
}: { isOffline?: boolean; ebookId?: string; currentChapterId?: string }) => {
  const navigation = useNavigation<any>();
  const ebook = getEbookById(ebookId) ?? getEbookById(undefined);
  const chapters = getEbookChaptersForEbook(ebook?.id ?? ebookId);
  // AC-FR-E7-02-02: jump to page
  const [jumpPage, setJumpPage] = useState("");
  const [jumpError, setJumpError] = useState("");

  const handleJump = () => {
    const pageNum = parseInt(jumpPage, 10);
    if (isNaN(pageNum) || pageNum < 1) { setJumpError("Gecerli bir sayfa numarasi girin."); return; }
    const targetChapter = chapters.find((c: any) => c.page_start <= pageNum && c.page_end >= pageNum);
    if (!targetChapter) { setJumpError("Sayfa bulunamadi."); return; }
    setJumpError("");
    navigation.navigate("ContentEbookReader", { id: ebookId ?? "", chapterId: targetChapter.id });
  };

  return (
    <>
      {/* AC-FR-E7-02-02: jump to page input */}
      <SectionCard title="Sayfaya Atla">
        <View style={styles.jumpRow}>
          <TextInput
            style={styles.jumpInput}
            keyboardType="numeric"
            placeholder="Sayfa numarasi"
            placeholderTextColor="#9CA3AF"
            value={jumpPage}
            onChangeText={(t) => { setJumpPage(t); setJumpError(""); }}
            accessibilityLabel="Sayfa numarasi girisi"
            maxLength={4}
            editable={!isOffline}
          />
          <PButton mode="outlined" compact disabled={isOffline || !jumpPage} onPress={handleJump}>
            Git
          </PButton>
        </View>
        {jumpError ? <PText style={styles.jumpError}>{jumpError}</PText> : null}
      </SectionCard>

      {/* AC-FR-E7-02-03: TOC chapters navigable */}
      <SectionCard title={"Bolumler (" + chapters.length + ")"}>
        {chapters.length === 0 ? (
          <PText style={styles.emptyHint}>Bolum bulunamadi.</PText>
        ) : (
          chapters.map((ch: any, i: number) => (
            <View key={ch.id}>
              <View style={[styles.chapRow, currentChapterId === ch.id && styles.chapRowActive]}>
                <View style={styles.chapMeta}>
                  <PText style={[styles.chapTitle, currentChapterId === ch.id && styles.chapTitleActive]}>
                    {ch.order_index ?? i + 1}. {ch.title}
                  </PText>
                  {ch.page_start != null && (
                    <PText style={styles.chapPages}>Sayfa {ch.page_start}-{ch.page_end}</PText>
                  )}
                </View>
                <PButton
                  mode="text"
                  compact
                  disabled={isOffline}
                  onPress={() => navigation.navigate("ContentEbookReader", { id: ebookId ?? "", chapterId: ch.id })}
                >
                  Oku
                </PButton>
              </View>
              {i < chapters.length - 1 && <PDivider />}
            </View>
          ))
        )}
      </SectionCard>
    </>
  );
};

export const ContentEbookTocScreen = ({ route }: { route?: { params?: { state?: ScreenState; id?: string; chapterId?: string } } }) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;
  const currentChapterId = route?.params?.chapterId;

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitap Icindekiler" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor"><PActivityIndicator animating /><SkeletonBlock height={40} /></SectionCard>
        <SectionCard title="Bolumler"><SkeletonBlock height={60} /><SkeletonBlock height={60} /></SectionCard>
      </ScreenLayout>
    );
  }
  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitap Icindekiler" subtitle="Icerik bulunamadi">
        <StateMessage title="Bolum bulunamadi" description="Henüz listelenecek bolum yok." actionLabel="Kutüphaneye Don" icon="book-open-outline" />
      </ScreenLayout>
    );
  }
  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitap Icindekiler" subtitle="Bir sorun olustu">
        <StateMessage title="Icindekiler yuklenemedi" description="Baglantiyi kontrol edip tekrar dene." actionLabel="Tekrar Dene" icon="alert-circle-outline" tone="error" />
      </ScreenLayout>
    );
  }
  if (state === "offline") {
    return (
      <ScreenLayout title="e-Kitap Icindekiler" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentEbookTocContent isOffline ebookId={ebookId} currentChapterId={currentChapterId} />
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout title="e-Kitap Icindekiler" subtitle="Bolum listesi">
      <ContentEbookTocContent ebookId={ebookId} currentChapterId={currentChapterId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  jumpRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  jumpInput: { flex: 1, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 10, fontSize: 14, color: "#1F2937", backgroundColor: "#FAFAFA" },
  jumpError: { fontSize: 12, color: "#DC2626", marginTop: 6 },
  chapRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 4 },
  chapRowActive: { backgroundColor: "#EDE7F6", borderRadius: 8 },
  chapMeta: { flex: 1, marginRight: 8 },
  chapTitle: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  chapTitleActive: { color: "#6B46C1" },
  chapPages: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  emptyHint: { fontSize: 13, color: "#9CA3AF" },
});
`;

const highlightsScreen = `import React, { useState } from "react";
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
              <PText style={styles.modalBody}>Vurgularini ve notlarini disari aktarmak üzeresin. Bu belgeler kisisel veriler icerebilir.</PText>
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
        <StateMessage title="Vurgu bulunamadi" description="Henüz kaydettigin vurgu yok. Okurken metin sec." actionLabel="Okumaya Don" icon="marker" />
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
`;

const settingsScreen = `import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getPrimaryUser, getReadingSettings } from "../../data/mockSelectors";
import { PButton, PChip, PText } from "../../components";

type Background = "Beyaz" | "Sepia" | "Koyu";
type LineHeight = "Normal" | "Genis" | "Cok Genis";

const BG_OPTIONS: { key: Background; bg: string; text: string }[] = [
  { key: "Beyaz", bg: "#FFFFFF", text: "#1F2937" },
  { key: "Sepia", bg: "#FDF6E3", text: "#3B2F2F" },
  { key: "Koyu", bg: "#1A1A2E", text: "#E2E8F0" },
];

const LINE_HEIGHT_MAP: Record<LineHeight, number> = {
  Normal: 22,
  Genis: 30,
  "Cok Genis": 38,
};

const ContentEbookSettingsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const readingSettings = getReadingSettings();
  const savedSettings = readingSettings.find((s: any) => s.user_id === user?.id);

  // AC-FR-E7-03-04: persisted settings as starting values
  const [fontSize, setFontSize] = useState<number>(savedSettings?.font_size ?? 16);
  const [background, setBackground] = useState<Background>(savedSettings?.background === "sepia" ? "Sepia" : savedSettings?.background === "dark" ? "Koyu" : "Beyaz");
  const [lineHeight, setLineHeight] = useState<LineHeight>(
    savedSettings?.line_height === "2.0" ? "Cok Genis" : savedSettings?.line_height === "1.75" ? "Genis" : "Normal"
  );
  const [saved, setSaved] = useState(false);

  const activeBg = BG_OPTIONS.find((b) => b.key === background) ?? BG_OPTIONS[0];
  const previewLineHeight = LINE_HEIGHT_MAP[lineHeight];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* AC-FR-E7-03-01: font size slider */}
      <SectionCard title="Yazi Boyutu">
        <View style={styles.sliderRow}>
          <PText style={styles.sliderLabel}>A</PText>
          <View style={styles.sliderTrack}>
            <Slider
              value={fontSize}
              onValueChange={(val) => setFontSize(Array.isArray(val) ? val[0] : val)}
              minimumValue={12}
              maximumValue={24}
              step={1}
              minimumTrackTintColor="#6B46C1"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#6B46C1"
            />
          </View>
          <PText style={[styles.sliderLabel, { fontSize: 20 }]}>A</PText>
        </View>
        <PText style={styles.sliderValue}>{fontSize}px</PText>
      </SectionCard>

      {/* AC-FR-E7-03-02: background color selection */}
      <SectionCard title="Arka Plan">
        <View style={styles.bgRow}>
          {BG_OPTIONS.map((opt) => (
            <PChip
              key={opt.key}
              selected={background === opt.key}
              onPress={() => setBackground(opt.key)}
              style={[styles.bgChip, { backgroundColor: opt.bg, borderWidth: background === opt.key ? 2 : 1, borderColor: background === opt.key ? "#6B46C1" : "#E5E7EB" }]}
              textStyle={{ color: opt.text }}
            >
              {opt.key}
            </PChip>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E7-03-03: line height selector */}
      <SectionCard title="Satir Araligi">
        <View style={styles.lineHeightRow}>
          {(["Normal", "Genis", "Cok Genis"] as LineHeight[]).map((lh) => (
            <PChip
              key={lh}
              selected={lineHeight === lh}
              onPress={() => setLineHeight(lh)}
              style={styles.lineHChip}
            >
              {lh}
            </PChip>
          ))}
        </View>
      </SectionCard>

      {/* Live preview */}
      <SectionCard title="Onizleme">
        <View style={[styles.preview, { backgroundColor: activeBg.bg }]}>
          <PText style={[styles.previewText, { fontSize, lineHeight: previewLineHeight, color: activeBg.text }]}>
            Sükür, küçük aniların farkinda olmaktir. Bu satirlar okuma ayarlarinin nasil göründügünü gösterir.
          </PText>
        </View>
      </SectionCard>

      {/* AC-FR-E7-03-04: save settings */}
      <SectionCard title="Kaydet">
        {saved && <PText style={styles.savedLabel}>Ayarlar kaydedildi.</PText>}
        <PButton mode="contained" disabled={isOffline} onPress={handleSave}>
          Ayarlari Kaydet
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentEbookSettingsScreen = ({ route }: { route?: { params?: { state?: ScreenState; id?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Okuma Ayarlari" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor"><SkeletonBlock height={60} /></SectionCard>
        <SectionCard title="Onizleme"><SkeletonBlock height={80} /></SectionCard>
      </ScreenLayout>
    );
  }
  if (state === "error") {
    return (
      <ScreenLayout title="Okuma Ayarlari" subtitle="Bir sorun olustu">
        <StateMessage title="Ayarlar yuklenemedi" description="Varsayilan ayarlar uygulanacak." actionLabel="Tekrar Dene" icon="alert-circle-outline" tone="error" />
      </ScreenLayout>
    );
  }
  if (state === "offline") {
    return (
      <ScreenLayout title="Okuma Ayarlari" subtitle="Onbellekteki ayarlar">
        <OfflineNotice />
        <ContentEbookSettingsContent isOffline />
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout title="Okuma Ayarlari" subtitle="Okuma deneyimini ozellestir">
      <ContentEbookSettingsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  sliderRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  sliderLabel: { fontSize: 14, color: "#737373" },
  sliderTrack: { flex: 1 },
  sliderValue: { textAlign: "center", fontSize: 13, color: "#6B46C1", marginTop: 4 },
  bgRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  bgChip: { borderRadius: 10 },
  lineHeightRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  lineHChip: {},
  preview: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" },
  previewText: { lineHeight: 26 },
  savedLabel: { fontSize: 13, color: "#15803D", marginBottom: 8 },
});
`;

fs.writeFileSync(path.join(BASE, "ContentEbookDetailScreen.tsx"), detailScreen, "utf8");
fs.writeFileSync(path.join(BASE, "ContentEbookReaderScreen.tsx"), readerScreen, "utf8");
fs.writeFileSync(path.join(BASE, "ContentEbookTocScreen.tsx"), tocScreen, "utf8");
fs.writeFileSync(path.join(BASE, "ContentEbookHighlightsScreen.tsx"), highlightsScreen, "utf8");
fs.writeFileSync(path.join(BASE, "ContentEbookSettingsScreen.tsx"), settingsScreen, "utf8");

console.log("detail:", fs.readFileSync(path.join(BASE, "ContentEbookDetailScreen.tsx"), "utf8").split("\n").length, "lines");
console.log("reader:", fs.readFileSync(path.join(BASE, "ContentEbookReaderScreen.tsx"), "utf8").split("\n").length, "lines");
console.log("toc:", fs.readFileSync(path.join(BASE, "ContentEbookTocScreen.tsx"), "utf8").split("\n").length, "lines");
console.log("highlights:", fs.readFileSync(path.join(BASE, "ContentEbookHighlightsScreen.tsx"), "utf8").split("\n").length, "lines");
console.log("settings:", fs.readFileSync(path.join(BASE, "ContentEbookSettingsScreen.tsx"), "utf8").split("\n").length, "lines");
console.log("All screens written.");
