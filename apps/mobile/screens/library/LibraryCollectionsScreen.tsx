import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Modal, StyleSheet, TextInput, View } from 'react-native';

import {
  InlineSnackbar,
  PActivityIndicator,
  PButton,
  PDivider,
  PText
} from '../../components';
import {
  getCollectionItems,
  getCollectionsForUser,
  getPrimaryUser
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type CollectionEntry = { id: string; name: string; itemCount: number };

const LibraryCollectionsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const collectionsRaw = getCollectionsForUser(user?.id);
  const collectionItems = getCollectionItems();

  // AC-FR-E9-03-01: local state for creation
  const [collections, setCollections] = useState<CollectionEntry[]>(
    collectionsRaw.map((col: any) => ({
      id: col.id,
      name: col.name,
      itemCount: collectionItems.filter((ci: any) => ci.collection_id === col.id).length
    }))
  );

  // AC-FR-E9-03-03: undo-delete state
  const [deletedCollection, setDeletedCollection] = useState<CollectionEntry | null>(null);
  const [undoVisible, setUndoVisible] = useState(false);

  // AC-FR-E9-03-01: create modal
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = () => {
    if (!newName.trim()) return;
    setCollections(prev => [{ id: 'new-' + Date.now(), name: newName.trim(), itemCount: 0 }, ...prev]);
    setNewName('');
    setShowCreate(false);
  };

  const handleDelete = (id: string) => {
    const target = collections.find(col => col.id === id);
    if (!target) return;
    setCollections(prev => prev.filter(col => col.id !== id));
    setDeletedCollection(target);
    setUndoVisible(true);
    // AC-FR-E9-03-03: 4-6 sec snackbar window
    setTimeout(() => { setUndoVisible(false); setDeletedCollection(null); }, 5000);
  };

  const handleUndo = () => {
    if (!deletedCollection) return;
    setCollections(prev => [deletedCollection, ...prev]);
    setDeletedCollection(null);
    setUndoVisible(false);
  };

  return (
    <>
      <SectionCard title="Koleksiyonlarim">
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
      <SectionCard title={`Tum Koleksiyonlar (${collections.length})`}>
        {collections.length === 0 ? (
          <PText variant="bodySmall" style={styles.emptyText}>
            Henuz koleksiyon olusturulmadi. Yukaridaki buton ile baslayabilirsin.
          </PText>
        ) : (
          collections.map((col, idx) => (
            <View key={col.id}>
              <View style={styles.colRow}>
                <View style={styles.colInfo}>
                  <PText style={styles.colName}>{col.name}</PText>
                  <PText style={styles.colMeta}>{col.itemCount} icerik</PText>
                </View>
                <View style={styles.colActions}>
                  <PButton
                    mode="outlined"
                    compact
                    disabled={isOffline}
                    onPress={() => navigation.navigate('LibraryCollectionDetail', { id: col.id })}
                    accessibilityLabel={`Koleksiyonu ac: ${col.name}`}
                  >
                    Ac
                  </PButton>
                  <PButton
                    mode="text"
                    compact
                    disabled={isOffline}
                    onPress={() => handleDelete(col.id)}
                    accessibilityLabel={`Koleksiyonu sil: ${col.name}`}
                  >
                    Sil
                  </PButton>
                </View>
              </View>
              {idx < collections.length - 1 && <PDivider />}
            </View>
          ))
        )}
      </SectionCard>

      {/* AC-FR-E9-03-03: undo snackbar */}
      <InlineSnackbar
        visible={undoVisible && !!deletedCollection}
        message={`Koleksiyon silindi: ${deletedCollection?.name ?? ''}`}
        actionLabel="Geri Al"
        onAction={handleUndo}
      />

      {/* AC-FR-E9-03-01: create modal */}
      <Modal visible={showCreate} transparent animationType="slide" onRequestClose={() => setShowCreate(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <PText variant="titleMedium" style={styles.modalTitle}>
              Yeni Koleksiyon
            </PText>
            <TextInput
              style={styles.nameInput}
              placeholder="Koleksiyon adi..."
              placeholderTextColor={c.textTertiary}
              value={newName}
              onChangeText={setNewName}
              autoFocus
              accessibilityLabel="Koleksiyon adi"
            />
            <View style={styles.modalActions}>
              <PButton mode="contained" disabled={!newName.trim()} onPress={handleCreate}>
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

export const LibraryCollectionsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
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

  if (state === 'empty') {
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

  if (state === 'error') {
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

  if (state === 'offline') {
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

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    createBtn: {
      alignSelf: 'flex-start'
    },
    emptyText: {
      color: c.textTertiary,
      paddingVertical: spacing[1],
      lineHeight: 20
    },
    colRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing[1],
      gap: spacing[1]
    },
    colInfo: {
      flex: 1
    },
    colName: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary
    },
    colMeta: {
      fontSize: fontSizes.base,
      color: c.textTertiary,
      marginTop: 2
    },
    colActions: {
      flexDirection: 'row',
      gap: spacing[0.5]
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end'
    },
    modalCard: {
      backgroundColor: c.surface,
      borderTopLeftRadius: radii['3xl'],
      borderTopRightRadius: radii['3xl'],
      padding: spacing[3],
      paddingBottom: 36
    },
    modalTitle: {
      fontWeight: fontWeights.bold,
      marginBottom: spacing[1.5]
    },
    nameInput: {
      borderWidth: 1,
      borderColor: c.outline,
      borderRadius: radii.lg,
      padding: spacing[1.5],
      fontSize: fontSizes['2xl'],
      color: c.textPrimary,
      marginBottom: spacing[2]
    },
    modalActions: {
      gap: spacing[1]
    }
  });
}
