#!/usr/bin/env node
// write-e9-screens.js — Writes all 6 EPIC-9 screen files.
const fs = require("fs");
const path = require("path");

const LIBRARY_DIR = path.join(__dirname, "../apps/mobile/screens/library");

const files = {};

// ─────────────────────────────────────────────────────────────────────────
// LibraryFavoritesScreen  (FR-E9-01 + FR-E9-04 search/filter)
// ─────────────────────────────────────────────────────────────────────────
files["LibraryFavoritesScreen.tsx"] = `import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
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
  getJourneys,
  getModules,
  getPrimaryUser,
  getWorkshops,
} from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PChip, PDivider, PText } from "../../components";

// AC-FR-E9-01-02, AC-FR-E9-04-02: content type filter options
const FILTER_OPTIONS = ["Tumü", "Yolculuk", "Atolye", "Modul", "e-Kitap"];

// Source type → display label
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

const LibraryFavoritesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const favorites = getFavoritesForUser(user?.id);
  const journeys = getJourneys();
  const workshops = getWorkshops();
  const modules = getModules();
  const ebooks = getEbooks();

  // Build enriched favorites list
  const enriched = favorites.map((fav: any) => {
    const journey = journeys.find((j) => j.id === fav.item_id);
    const workshop = workshops.find((w) => w.id === fav.item_id);
    const module = modules.find((m) => m.id === fav.item_id);
    const ebook = ebooks.find((e) => e.id === fav.item_id);
    const item = journey ?? workshop ?? module ?? ebook;
    const type = journey ? "journey" : workshop ? "workshop" : module ? "module" : ebook ? "ebook" : "content";
    return {
      id: fav.id,
      itemId: fav.item_id,
      title: (item as any)?.title ?? "Favori",
      description: (item as any)?.description ?? "",
      type,
      createdAt: fav.created_at,
    };
  });

  // AC-FR-E9-04-01: search by title
  const [query, setQuery] = useState("");
  // AC-FR-E9-04-02: content type filter
  const [activeFilter, setActiveFilter] = useState("Tumü");

  const filtered = enriched.filter((item) => {
    const matchesQuery = !query || item.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "Tumü" || TYPE_LABEL[item.type] === activeFilter;
    return matchesQuery && matchesFilter;
  });

  // AC-FR-E9-04-03: clear filters
  const clearFilters = () => {
    setQuery("");
    setActiveFilter("Tumü");
  };
  const hasActiveFilters = query || activeFilter !== "Tumü";

  return (
    <>
      {/* AC-FR-E9-04-01: Search bar */}
      <SectionCard title="Arama">
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Baslik, not veya kaynak ara..."
            value={query}
            onChangeText={setQuery}
            editable={!isOffline}
            accessibilityLabel="Favorilerde ara"
            returnKeyType="search"
          />
          {hasActiveFilters && (
            <TouchableOpacity
              onPress={clearFilters}
              style={styles.clearBtn}
              accessibilityLabel="Filtreleri temizle"
              accessibilityRole="button"
            >
              <PText variant="labelMedium" style={styles.clearText}>Temizle</PText>
            </TouchableOpacity>
          )}
        </View>
        {/* AC-FR-E9-04-02: type filter chips */}
        <View style={styles.chipRow}>
          {FILTER_OPTIONS.map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveFilter(label)}
              accessibilityRole="button"
              accessibilityLabel={label + " filtresi"}
            >
              <PChip
                selected={activeFilter === label}
                style={styles.filterChip}
              >
                {label}
              </PChip>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E9-01-01: labeled favorites list */}
      <SectionCard title={"Favoriler (" + filtered.length + ")"}>
        {filtered.length === 0 ? (
          <PText variant="bodySmall" style={styles.emptyText}>
            {hasActiveFilters
              ? "Bu filtrelerle esleyen favori bulunamadi."
              : "Favori eklenmedi."}
          </PText>
        ) : (
          filtered.map((item, idx) => (
            <View key={item.id}>
              <View style={styles.favItem}>
                <View style={[styles.typeBar, { backgroundColor: TYPE_COLOR[item.type] ?? "#9E9E9E" }]} />
                <View style={styles.favBody}>
                  <View style={styles.favTitleRow}>
                    <PText variant="titleSmall" style={styles.favTitle}>{item.title}</PText>
                    {/* AC-FR-E9-01-01: source type label */}
                    <PChip compact style={[styles.typeChip, { borderColor: TYPE_COLOR[item.type] ?? "#9E9E9E" }]}>
                      {TYPE_LABEL[item.type] ?? "Icerik"}
                    </PChip>
                  </View>
                  {item.description ? (
                    <PText variant="bodySmall" style={styles.favDesc} numberOfLines={2}>
                      {item.description}
                    </PText>
                  ) : null}
                  <View style={styles.favActions}>
                    <PButton
                      mode="outlined"
                      compact
                      disabled={isOffline}
                      style={styles.openBtn}
                      onPress={() =>
                        navigation.navigate("LibraryFavoriteDetail", { id: item.id })
                      }
                      accessibilityLabel={"Detay: " + item.title}
                    >
                      Detay
                    </PButton>
                    <PButton
                      mode="text"
                      compact
                      disabled={isOffline}
                      style={styles.exportBtn}
                      onPress={() =>
                        navigation.navigate("LibraryShareExport", { id: item.id })
                      }
                      accessibilityLabel="Disari aktar"
                    >
                      Aktar
                    </PButton>
                  </View>
                </View>
              </View>
              {idx < filtered.length - 1 && <PDivider style={styles.divider} />}
            </View>
          ))
        )}
      </SectionCard>

      {/* Quick links */}
      <SectionCard title="Arsiv">
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.archiveBtn}
          onPress={() => navigation.navigate("LibraryCollections")}
        >
          Koleksiyonlarim
        </PButton>
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.archiveBtn}
          onPress={() => navigation.navigate("LibraryDownloads")}
        >
          Indirilenler
        </PButton>
      </SectionCard>
    </>
  );
};

export const LibraryFavoritesScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Favoriler" subtitle="Hazirlanıyor">
        <SectionCard title="Arama">
          <SkeletonBlock height={40} />
          <SkeletonBlock height={36} />
        </SectionCard>
        <SectionCard title="Favoriler">
          <PActivityIndicator animating />
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Favoriler" subtitle="Kaydedilenler burada">
        <StateMessage
          title="Favori eklenmedi"
          description="Begendiklerini favorilere ekleyerek burada gör."
          actionLabel="Icerik Kesfet"
          icon="heart-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Favoriler" subtitle="Bir sorun olustu">
        <StateMessage
          title="Favoriler yuklenemedi"
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
      <ScreenLayout title="Favoriler" subtitle="Onbellekteki icerikler">
        <OfflineNotice />
        <LibraryFavoritesContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Favoriler" subtitle="Kaydettiklerin">
      <LibraryFavoritesContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  clearBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  clearText: {
    color: "#7C4DFF",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    marginBottom: 4,
  },
  emptyText: {
    opacity: 0.6,
    textAlign: "center",
    paddingVertical: 12,
  },
  favItem: {
    flexDirection: "row",
    paddingVertical: 10,
    gap: 10,
  },
  typeBar: {
    width: 4,
    borderRadius: 2,
    minHeight: 48,
  },
  favBody: {
    flex: 1,
  },
  favTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
  },
  favTitle: {
    flex: 1,
    fontWeight: "600",
    marginRight: 6,
  },
  typeChip: {
    height: 24,
  },
  favDesc: {
    opacity: 0.65,
    marginTop: 3,
    lineHeight: 18,
  },
  favActions: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },
  openBtn: {
    flex: 0,
  },
  exportBtn: {
    flex: 0,
  },
  divider: {
    marginHorizontal: 0,
  },
  archiveBtn: {
    marginBottom: 10,
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// LibraryFavoriteDetailScreen  (FR-E9-02)
// ─────────────────────────────────────────────────────────────────────────
files["LibraryFavoriteDetailScreen.tsx"] = `import React, { useState } from "react";
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
`;

// ─────────────────────────────────────────────────────────────────────────
// LibraryCollectionsScreen  (FR-E9-03)
// ─────────────────────────────────────────────────────────────────────────
files["LibraryCollectionsScreen.tsx"] = `import React, { useState } from "react";
import { Modal, StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getCollectionItems,
  getCollectionsForUser,
  getFavoritesForUser,
  getJourneys,
  getModules,
  getPrimaryUser,
  getWorkshops,
} from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PDivider, PText } from "../../components";

type CollectionEntry = {
  id: string;
  name: string;
  itemCount: number;
};

const LibraryCollectionsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const collectionsRaw = getCollectionsForUser(user?.id);
  const collectionItems = getCollectionItems();

  // AC-FR-E9-03-01: local state for creation
  const [collections, setCollections] = useState<CollectionEntry[]>(
    collectionsRaw.map((c: any) => ({
      id: c.id,
      name: c.name,
      itemCount: collectionItems.filter((ci: any) => ci.collection_id === c.id).length,
    }))
  );

  // AC-FR-E9-03-03: undo-delete state
  const [deletedCollection, setDeletedCollection] = useState<CollectionEntry | null>(null);
  const [undoVisible, setUndoVisible] = useState(false);

  // AC-FR-E9-03-01: create modal
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");

  const handleCreate = () => {
    if (!newName.trim()) return;
    const newCollection: CollectionEntry = {
      id: "new-" + Date.now(),
      name: newName.trim(),
      itemCount: 0,
    };
    setCollections((prev) => [newCollection, ...prev]);
    setNewName("");
    setShowCreate(false);
  };

  const handleDelete = (id: string) => {
    const target = collections.find((c) => c.id === id);
    if (!target) return;
    setCollections((prev) => prev.filter((c) => c.id !== id));
    setDeletedCollection(target);
    setUndoVisible(true);
    // AC-FR-E9-03-03: 4-6 sec snackbar window
    setTimeout(() => {
      setUndoVisible(false);
      setDeletedCollection(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (!deletedCollection) return;
    setCollections((prev) => [deletedCollection, ...prev]);
    setDeletedCollection(null);
    setUndoVisible(false);
  };

  return (
    <>
      <SectionCard title="Koleksiyonlarim" actionLabel="">
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.createBtn}
          onPress={() => setShowCreate(true)}
          accessibilityLabel="Yeni koleksiyon olustur"
        >
          Koleksiyon Olustur
        </PButton>
      </SectionCard>

      {/* AC-FR-E9-03-01/02/03: collection list */}
      <SectionCard title={"Tum Koleksiyonlar (" + collections.length + ")"}>
        {collections.length === 0 ? (
          <PText variant="bodySmall" style={styles.emptyText}>
            Henuz koleksiyon olusturulmadiı. Yukaridaki buton ile baslayabilirsin.
          </PText>
        ) : (
          collections.map((col, idx) => (
            <View key={col.id}>
              <View style={styles.colRow}>
                <View style={styles.colInfo}>
                  <PText variant="titleSmall" style={styles.colName}>{col.name}</PText>
                  <PText variant="labelSmall" style={styles.colMeta}>{col.itemCount} icerik</PText>
                </View>
                <View style={styles.colActions}>
                  <PButton
                    mode="outlined"
                    compact
                    disabled={isOffline}
                    onPress={() => navigation.navigate("LibraryCollectionDetail", { id: col.id })}
                    accessibilityLabel={"Koleksiyonu ac: " + col.name}
                  >
                    Ac
                  </PButton>
                  {/* AC-FR-E9-03-03: delete triggers undo snackbar */}
                  <PButton
                    mode="text"
                    compact
                    disabled={isOffline}
                    onPress={() => handleDelete(col.id)}
                    accessibilityLabel={"Koleksiyonu sil: " + col.name}
                  >
                    Sil
                  </PButton>
                </View>
              </View>
              {idx < collections.length - 1 && <PDivider style={styles.divider} />}
            </View>
          ))
        )}
      </SectionCard>

      {/* AC-FR-E9-03-03: undo snackbar */}
      {undoVisible && deletedCollection && (
        <View style={styles.snackbar}>
          <PText variant="bodySmall" style={styles.snackbarText}>
            Koleksiyon silindi: {deletedCollection.name}
          </PText>
          <PButton
            mode="text"
            compact
            style={styles.undoBtn}
            onPress={handleUndo}
            accessibilityLabel="Silmeyi geri al"
          >
            Geri Al
          </PButton>
        </View>
      )}

      {/* AC-FR-E9-03-01: create modal */}
      <Modal
        visible={showCreate}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreate(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <PText variant="titleMedium" style={styles.modalTitle}>Yeni Koleksiyon</PText>
            <TextInput
              style={styles.nameInput}
              placeholder="Koleksiyon adi..."
              value={newName}
              onChangeText={setNewName}
              autoFocus
              accessibilityLabel="Koleksiyon adi"
            />
            <View style={styles.modalActions}>
              <PButton
                mode="contained"
                disabled={!newName.trim()}
                onPress={handleCreate}
              >
                Olustur
              </PButton>
              <PButton mode="outlined" onPress={() => setShowCreate(false)}>
                Iptal
              </PButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export const LibraryCollectionsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Koleksiyonlar" subtitle="Yukleniyor">
        <SectionCard title="Koleksiyonlar">
          <PActivityIndicator animating />
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Koleksiyonlar" subtitle="Iceriklerini duzenle">
        <StateMessage
          title="Koleksiyon yok"
          description="Favori iceriklerini bir araya getirerek koleksiyon olusturabilirsin."
          actionLabel="Koleksiyon Olustur"
          icon="folder-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Koleksiyonlar" subtitle="Bir sorun olustu">
        <StateMessage
          title="Koleksiyonlar yuklenemedi"
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
      <ScreenLayout title="Koleksiyonlar" subtitle="Onbellekteki icerikler">
        <OfflineNotice />
        <LibraryCollectionsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Koleksiyonlar" subtitle="Arsivini duzenle">
      <LibraryCollectionsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  createBtn: {
    alignSelf: "flex-start",
  },
  emptyText: {
    opacity: 0.6,
    paddingVertical: 8,
    lineHeight: 20,
  },
  colRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    gap: 10,
  },
  colInfo: {
    flex: 1,
  },
  colName: {
    fontWeight: "600",
  },
  colMeta: {
    opacity: 0.55,
    marginTop: 2,
  },
  colActions: {
    flexDirection: "row",
    gap: 4,
  },
  divider: {
    marginHorizontal: 0,
  },
  snackbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#323232",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  snackbarText: {
    color: "#FFF",
    flex: 1,
  },
  undoBtn: {
    marginLeft: 8,
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
    fontWeight: "700",
    marginBottom: 14,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  modalActions: {
    gap: 10,
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// LibraryCollectionDetailScreen  (FR-E9-03 detail + FR-E9-04 search)
// ─────────────────────────────────────────────────────────────────────────
files["LibraryCollectionDetailScreen.tsx"] = `import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getCollectionItems,
  getCollectionsForUser,
  getEbooks,
  getFavoritesForUser,
  getJourneys,
  getModules,
  getPrimaryUser,
  getWorkshops,
} from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PChip, PDivider, PText } from "../../components";

// AC-FR-E9-04-02: type filter for collection items
const FILTER_OPTIONS = ["Tumu", "Yolculuk", "Atolye", "Modul", "e-Kitap"];
const TYPE_LABEL: Record<string, string> = {
  journey: "Yolculuk", workshop: "Atolye", module: "Modul", ebook: "e-Kitap",
};
const TYPE_COLOR: Record<string, string> = {
  journey: "#7C4DFF", workshop: "#C62828", module: "#2E7D32", ebook: "#00897B",
};

const LibraryCollectionDetailContent = ({
  collectionId,
  isOffline,
}: {
  collectionId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const collection = getCollectionsForUser(user?.id).find((c: any) => c.id === collectionId);
  const favorites = getFavoritesForUser(user?.id);
  const collectionItems = getCollectionItems().filter((ci: any) => ci.collection_id === collectionId);

  const enriched = collectionItems
    .map((ci: any) => {
      const fav: any = favorites.find((f: any) => f.id === ci.favorite_id);
      if (!fav) return null;
      const j = getJourneys().find((x) => x.id === fav.item_id);
      const w = getWorkshops().find((x) => x.id === fav.item_id);
      const m = getModules().find((x) => x.id === fav.item_id);
      const e = getEbooks().find((x) => x.id === fav.item_id);
      const item: any = j ?? w ?? m ?? e;
      const type = j ? "journey" : w ? "workshop" : m ? "module" : e ? "ebook" : "content";
      return { favoriteId: fav.id, itemId: fav.item_id, title: item?.title ?? "Favori", description: item?.description ?? "", type };
    })
    .filter(Boolean) as Array<{ favoriteId: string; itemId: string; title: string; description: string; type: string }>;

  // AC-FR-E9-04-01/02/03: search + filter + clear
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tumu");
  const clearFilters = () => { setQuery(""); setActiveFilter("Tumu"); };
  const hasFilters = query || activeFilter !== "Tumu";

  const filtered = enriched.filter((item) => {
    const matchQ = !query || item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase());
    const matchF = activeFilter === "Tumu" || TYPE_LABEL[item.type] === activeFilter;
    return matchQ && matchF;
  });

  return (
    <>
      <SectionCard title={collection?.name ?? "Koleksiyon"}>
        <PText variant="bodySmall" style={styles.desc}>
          {enriched.length} icerik · Kisisel koleksiyonun
        </PText>
        <PButton mode="outlined" compact disabled={isOffline} style={styles.editBtn}>
          Koleksiyonu Duzenle
        </PButton>
      </SectionCard>

      {/* AC-FR-E9-04-01: search within collection */}
      <SectionCard title="Arama ve Filtre">
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Koleksiyonda ara..."
            value={query}
            onChangeText={setQuery}
            editable={!isOffline}
            accessibilityLabel="Koleksiyonda ara"
          />
          {hasFilters && (
            <TouchableOpacity
              onPress={clearFilters}
              accessibilityRole="button"
              accessibilityLabel="Filtreleri temizle"
            >
              <PText variant="labelMedium" style={styles.clearText}>Temizle</PText>
            </TouchableOpacity>
          )}
        </View>
        {/* AC-FR-E9-04-02: filter by type */}
        <View style={styles.chipRow}>
          {FILTER_OPTIONS.map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveFilter(label)}
              accessibilityRole="button"
              accessibilityLabel={label + " filtresi"}
            >
              <PChip selected={activeFilter === label} compact style={styles.filterChip}>
                {label}
              </PChip>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      <SectionCard title={"Icerikler (" + filtered.length + "/" + enriched.length + ")"}>
        {filtered.length === 0 ? (
          <PText variant="bodySmall" style={styles.emptyText}>
            {hasFilters ? "Bu filtrelerle esleyen icerik bulunamadi." : "Bu koleksiyon bos."}
          </PText>
        ) : (
          filtered.map((item, idx) => (
            <View key={item.favoriteId}>
              <View style={styles.itemRow}>
                <View style={[styles.typeBar, { backgroundColor: TYPE_COLOR[item.type] ?? "#9E9E9E" }]} />
                <View style={styles.itemBody}>
                  <View style={styles.itemTitleRow}>
                    <PText variant="titleSmall" style={styles.itemTitle}>{item.title}</PText>
                    <PChip compact style={[styles.typeChip, { borderColor: TYPE_COLOR[item.type] ?? "#9E9E9E" }]}>
                      {TYPE_LABEL[item.type] ?? "Icerik"}
                    </PChip>
                  </View>
                  {item.description ? (
                    <PText variant="bodySmall" style={styles.itemDesc} numberOfLines={1}>{item.description}</PText>
                  ) : null}
                  <PButton
                    mode="text"
                    compact
                    disabled={isOffline}
                    style={styles.openBtn}
                    onPress={() => navigation.navigate("LibraryFavoriteDetail", { id: item.favoriteId })}
                    accessibilityLabel={"Detay: " + item.title}
                  >
                    Favori Detay
                  </PButton>
                </View>
              </View>
              {idx < filtered.length - 1 && <PDivider style={styles.divider} />}
            </View>
          ))
        )}
      </SectionCard>

      {/* AC-FR-E9-03-02: add favorites to collection */}
      <SectionCard title="Icerik Ekle">
        <PText variant="bodySmall" style={styles.addHint}>
          Favori listenden bu koleksiyona icerik ekleyebilirsin.
        </PText>
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.addBtn}
          onPress={() => navigation.navigate("LibraryFavorites")}
        >
          Favorilerden Ekle
        </PButton>
      </SectionCard>
    </>
  );
};

export const LibraryCollectionDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const collectionId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Yukleniyor">
        <SectionCard title="Koleksiyon">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Icerikler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Koleksiyon bos"
          description="Bu koleksiyona henuz icerik eklenmedi."
          actionLabel="Favorilerden Ekle"
          icon="folder-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Bir sorun olustu">
        <StateMessage
          title="Koleksiyon yuklenemedi"
          description="Detaylari getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <LibraryCollectionDetailContent collectionId={collectionId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Koleksiyon Detay" subtitle="Koleksiyon icerikleri">
      <LibraryCollectionDetailContent collectionId={collectionId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  desc: { opacity: 0.65, marginBottom: 8 },
  editBtn: { alignSelf: "flex-start" },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  searchInput: { flex: 1, borderWidth: 1, borderColor: "#DDD", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14 },
  clearText: { color: "#7C4DFF" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  filterChip: { marginBottom: 4 },
  emptyText: { opacity: 0.6, paddingVertical: 8 },
  itemRow: { flexDirection: "row", paddingVertical: 10, gap: 10 },
  typeBar: { width: 4, borderRadius: 2, minHeight: 40 },
  itemBody: { flex: 1 },
  itemTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 },
  itemTitle: { flex: 1, fontWeight: "600", marginRight: 6 },
  typeChip: { height: 24 },
  itemDesc: { opacity: 0.6, marginTop: 3 },
  openBtn: { alignSelf: "flex-start", marginTop: 4 },
  divider: { marginHorizontal: 0 },
  addHint: { opacity: 0.65, marginBottom: 8 },
  addBtn: { alignSelf: "flex-start" },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// LibraryShareExportScreen  (FR-E9-05) — NEW SCREEN
// ─────────────────────────────────────────────────────────────────────────
files["LibraryShareExportScreen.tsx"] = `import React, { useState } from "react";
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
`;

// ─────────────────────────────────────────────────────────────────────────
// LibraryDownloadsScreen  (FR-E9-06)
// ─────────────────────────────────────────────────────────────────────────
files["LibraryDownloadsScreen.tsx"] = `import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getDownloadsForUser,
  getEbookById,
  getPrimaryUser,
  getWorkshopById,
} from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PChip, PDivider, PText } from "../../components";

const LOW_STORAGE_MB = 200;
const TOTAL_STORAGE_MB = 512; // simulated device storage

const TYPE_ICON: Record<string, string> = {
  ebook: "book-open-outline",
  workshop: "account-group-outline",
};

const LibraryDownloadsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const rawDownloads = getDownloadsForUser(user?.id);

  const [downloads, setDownloads] = useState(
    rawDownloads.map((d: any) => ({
      id: d.id,
      contentId: d.content_id,
      contentType: d.content_type,
      statusRaw: d.status,
      sizeMb: d.size_bytes ? (d.size_bytes / 1048576).toFixed(1) : "?",
    }))
  );

  // Simulate used storage
  const usedMb = downloads.reduce(
    (acc: number, d: any) => acc + parseFloat(d.sizeMb || "0"),
    0
  );
  const freeMb = TOTAL_STORAGE_MB - usedMb;

  // AC-FR-E9-06-03: storage warning
  const showStorageWarning = freeMb < LOW_STORAGE_MB;

  // AC-FR-E9-06-02: simulate sync
  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setSyncDone(true); }, 1500);
  };

  const handleDelete = (id: string) => {
    setDownloads((prev: any[]) => prev.filter((d: any) => d.id !== id));
  };

  const resolveTitle = (d: any): string => {
    if (d.contentType === "ebook") {
      return getEbookById(d.contentId)?.title ?? "e-Kitap";
    }
    if (d.contentType === "workshop") {
      return getWorkshopById(d.contentId)?.title ?? "Atolye";
    }
    return "Icerik";
  };

  return (
    <>
      {/* Storage summary */}
      <SectionCard title="Depolama Durumu">
        <View style={styles.storageRow}>
          <PText variant="labelMedium" style={styles.storageLabel}>Kullanilanlar</PText>
          <PText variant="bodySmall">{usedMb.toFixed(1)} MB / {TOTAL_STORAGE_MB} MB</PText>
        </View>
        {/* AC-FR-E9-06-03: low storage warning */}
        {showStorageWarning && (
          <View style={styles.warnBox}>
            <PText variant="labelMedium" style={styles.warnTitle}>Depolama Uyarisi</PText>
            <PText variant="bodySmall" style={styles.warnText}>
              Yalnizca {freeMb.toFixed(0)} MB bos alan kaldi. Yeni indirmeden once eski dosyalari temizle.
            </PText>
          </View>
        )}
        {/* AC-FR-E9-06-02: sync trigger */}
        <PButton
          mode="outlined"
          compact
          disabled={isOffline || syncing}
          style={styles.syncBtn}
          onPress={handleSync}
          accessibilityLabel="Indirmeleri senkronize et"
        >
          {syncing ? "Senkronize ediliyor..." : syncDone ? "Senkronize edildi" : "Senkronize Et"}
        </PButton>
        {isOffline && (
          <PText variant="labelSmall" style={styles.offlineNote}>
            Baglanti gelince otomatik senkronize edilecek.
          </PText>
        )}
      </SectionCard>

      {/* AC-FR-E9-06-01: downloaded content list */}
      <SectionCard title={"Indirilenler (" + downloads.length + ")"} actionLabel="Temizle">
        {downloads.length === 0 ? (
          <StateMessage
            title="Indirilen icerik yok"
            description="Cevrimdisi erisim icin icerikleri indirip burada saklayabilirsin."
            actionLabel="Icerik Kesfet"
            icon="download-outline"
          />
        ) : (
          downloads.map((item: any, idx: number) => {
            const title = resolveTitle(item);
            return (
              <View key={item.id}>
                <View style={styles.downloadItem}>
                  <View style={styles.downloadInfo}>
                    <PText variant="titleSmall" style={styles.downloadTitle}>{title}</PText>
                    <View style={styles.downloadMeta}>
                      <PChip compact style={styles.typeChip}>
                        {item.contentType === "ebook" ? "e-Kitap" : "Atolye"}
                      </PChip>
                      <PText variant="labelSmall" style={styles.sizeText}>{item.sizeMb} MB</PText>
                      <PChip
                        compact
                        style={[styles.statusChip, item.statusRaw === "downloaded" ? styles.doneChip : styles.pendingChip]}
                      >
                        {item.statusRaw === "downloaded" ? "Tamamlandi" : "Bekliyor"}
                      </PChip>
                    </View>
                  </View>
                  <View style={styles.downloadActions}>
                    <PButton
                      mode="outlined"
                      compact
                      disabled={isOffline && item.statusRaw !== "downloaded"}
                      onPress={() => {
                        if (item.contentType === "ebook") {
                          navigation.navigate("Content", {
                            screen: "ContentEbookDetail",
                            params: { id: item.contentId },
                          });
                        } else {
                          navigation.navigate("Content", {
                            screen: "ContentWorkshopDetail",
                            params: { id: item.contentId },
                          });
                        }
                      }}
                      accessibilityLabel={"Ac: " + title}
                    >
                      Ac
                    </PButton>
                    <PButton
                      mode="text"
                      compact
                      disabled={isOffline}
                      onPress={() => handleDelete(item.id)}
                      accessibilityLabel={"Sil: " + title}
                    >
                      Sil
                    </PButton>
                  </View>
                </View>
                {idx < downloads.length - 1 && <PDivider style={styles.divider} />}
              </View>
            );
          })
        )}
      </SectionCard>
    </>
  );
};

export const LibraryDownloadsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Indirilenler" subtitle="Yukleniyor">
        <SectionCard title="Depolama">
          <SkeletonBlock height={36} />
        </SectionCard>
        <SectionCard title="Indirilenler">
          <PActivityIndicator animating />
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Indirilenler" subtitle="Cevrimdisi erisim">
        <StateMessage
          title="Indirilen icerik yok"
          description="Cevrimdisi erisim icin icerikleri indirip burada saklayabilirsin."
          actionLabel="Icerik Indir"
          icon="download-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Indirilenler" subtitle="Bir sorun olustu">
        <StateMessage
          title="Indirilenler yuklenemedi"
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
      <ScreenLayout title="Indirilenler" subtitle="Cevrimdisi dosyalar">
        <OfflineNotice />
        <LibraryDownloadsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Indirilenler" subtitle="Dosyalarin yonet">
      <LibraryDownloadsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  storageRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  storageLabel: { opacity: 0.6 },
  warnBox: { backgroundColor: "#FFF3E0", borderRadius: 8, padding: 12, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: "#F57C00" },
  warnTitle: { color: "#E65100", fontWeight: "700", marginBottom: 4 },
  warnText: { color: "#BF360C", lineHeight: 18 },
  syncBtn: { alignSelf: "flex-start", marginTop: 4 },
  offlineNote: { opacity: 0.55, marginTop: 6, fontStyle: "italic" },
  downloadItem: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingVertical: 10, gap: 10 },
  downloadInfo: { flex: 1 },
  downloadTitle: { fontWeight: "600", marginBottom: 6 },
  downloadMeta: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 },
  typeChip: {},
  sizeText: { opacity: 0.55 },
  statusChip: {},
  doneChip: { backgroundColor: "#E8F5E9" },
  pendingChip: { backgroundColor: "#FFF9C4" },
  downloadActions: { flexDirection: "column", gap: 4 },
  divider: { marginHorizontal: 0 },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// Write files
// ─────────────────────────────────────────────────────────────────────────
let written = 0;
for (const [filename, content] of Object.entries(files)) {
  const filePath = path.join(LIBRARY_DIR, filename);
  fs.writeFileSync(filePath, content, "utf8");
  written++;
  console.log(`Wrote ${filename}`);
}
console.log(`\nScreens written: ${written}/${Object.keys(files).length}`);
