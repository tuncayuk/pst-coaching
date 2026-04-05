import React, { useState } from "react";
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
