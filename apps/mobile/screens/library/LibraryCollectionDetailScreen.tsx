import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PText } from '../../components';
import {
  getCollectionItems,
  getCollectionsForUser,
  getEbooks,
  getFavoritesForUser,
  getJourneys,
  getModules,
  getPrimaryUser,
  getWorkshops
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

// AC-FR-E9-04-02: type filter for collection items
const FILTER_OPTIONS = ['Tumu', 'Yolculuk', 'Atolye', 'Modul', 'e-Kitap'];
const TYPE_LABEL: Record<string, string> = {
  journey: 'Yolculuk',
  workshop: 'Atolye',
  module: 'Modul',
  ebook: 'e-Kitap'
};
const TYPE_COLOR: Record<string, string> = {
  journey: '#7C4DFF',
  workshop: '#C62828',
  module: '#2E7D32',
  ebook: '#00897B'
};

const LibraryCollectionDetailContent = ({
  collectionId,
  isOffline
}: {
  collectionId?: string;
  isOffline?: boolean;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const collection = getCollectionsForUser(user?.id).find((c: any) => c.id === collectionId);
  const favorites = getFavoritesForUser(user?.id);
  const collectionItems = getCollectionItems().filter((ci: any) => ci.collection_id === collectionId);

  const enriched = collectionItems
    .map((ci: any) => {
      const fav: any = favorites.find((f: any) => f.id === ci.favorite_id);
      if (!fav) return null;
      const j = getJourneys().find(x => x.id === fav.item_id);
      const w = getWorkshops().find(x => x.id === fav.item_id);
      const m = getModules().find(x => x.id === fav.item_id);
      const e = getEbooks().find(x => x.id === fav.item_id);
      const item: any = j ?? w ?? m ?? e;
      const type = j ? 'journey' : w ? 'workshop' : m ? 'module' : e ? 'ebook' : 'content';
      return {
        favoriteId: fav.id,
        itemId: fav.item_id,
        title: item?.title ?? 'Favori',
        description: item?.description ?? '',
        type
      };
    })
    .filter(Boolean) as Array<{
    favoriteId: string;
    itemId: string;
    title: string;
    description: string;
    type: string;
  }>;

  // AC-FR-E9-04-01/02/03: search + filter + clear
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tumu');
  const clearFilters = () => {
    setQuery('');
    setActiveFilter('Tumu');
  };
  const hasFilters = query || activeFilter !== 'Tumu';

  const filtered = enriched.filter(item => {
    const matchQ =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    const matchF = activeFilter === 'Tumu' || TYPE_LABEL[item.type] === activeFilter;
    return matchQ && matchF;
  });

  return (
    <>
      <SectionCard title={collection?.name ?? 'Koleksiyon'}>
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
            <TouchableOpacity onPress={clearFilters} accessibilityRole="button" accessibilityLabel="Filtreleri temizle">
              <PText variant="labelMedium" style={styles.clearText}>
                Temizle
              </PText>
            </TouchableOpacity>
          )}
        </View>
        {/* AC-FR-E9-04-02: filter by type */}
        <View style={styles.chipRow}>
          {FILTER_OPTIONS.map(label => (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveFilter(label)}
              accessibilityRole="button"
              accessibilityLabel={label + ' filtresi'}
            >
              <PChip selected={activeFilter === label} compact style={styles.filterChip}>
                {label}
              </PChip>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      <SectionCard title={'Icerikler (' + filtered.length + '/' + enriched.length + ')'}>
        {filtered.length === 0 ? (
          <PText variant="bodySmall" style={styles.emptyText}>
            {hasFilters ? 'Bu filtrelerle esleyen icerik bulunamadi.' : 'Bu koleksiyon bos.'}
          </PText>
        ) : (
          filtered.map((item, idx) => (
            <View key={item.favoriteId}>
              <View style={styles.itemRow}>
                <View style={[styles.typeBar, { backgroundColor: TYPE_COLOR[item.type] ?? '#9E9E9E' }]} />
                <View style={styles.itemBody}>
                  <View style={styles.itemTitleRow}>
                    <PText variant="titleSmall" style={styles.itemTitle}>
                      {item.title}
                    </PText>
                    <PChip compact style={[styles.typeChip, { borderColor: TYPE_COLOR[item.type] ?? '#9E9E9E' }]}>
                      {TYPE_LABEL[item.type] ?? 'Icerik'}
                    </PChip>
                  </View>
                  {item.description ? (
                    <PText variant="bodySmall" style={styles.itemDesc} numberOfLines={1}>
                      {item.description}
                    </PText>
                  ) : null}
                  <PButton
                    mode="text"
                    compact
                    disabled={isOffline}
                    style={styles.openBtn}
                    onPress={() => navigation.navigate('LibraryFavoriteDetail', { id: item.favoriteId })}
                    accessibilityLabel={'Detay: ' + item.title}
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
          onPress={() => navigation.navigate('LibraryFavorites')}
        >
          Favorilerden Ekle
        </PButton>
      </SectionCard>
    </>
  );
};

export const LibraryCollectionDetailScreen = ({
  route
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const collectionId = route?.params?.id;

  if (state === 'loading') {
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

  if (state === 'empty') {
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

  if (state === 'error') {
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

  if (state === 'offline') {
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

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    desc: { opacity: 0.65, marginBottom: spacing[1] },
    editBtn: { alignSelf: 'flex-start' },
    searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], marginBottom: 10 },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: radii.md,
      paddingHorizontal: spacing[1.5],
      paddingVertical: spacing[1],
      fontSize: fontSizes.lg
    },
    clearText: { color: '#7C4DFF' },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[1] },
    filterChip: { marginBottom: 4 },
    emptyText: { opacity: 0.6, paddingVertical: spacing[1] },
    itemRow: { flexDirection: 'row', paddingVertical: 10, gap: 10 },
    typeBar: { width: 4, borderRadius: radii.xs, minHeight: 40 },
    itemBody: { flex: 1 },
    itemTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 6
    },
    itemTitle: { flex: 1, fontWeight: fontWeights.semiBold, marginRight: 6 },
    typeChip: { height: 24 },
    itemDesc: { opacity: 0.6, marginTop: 3 },
    openBtn: { alignSelf: 'flex-start', marginTop: 4 },
    divider: { marginHorizontal: 0 },
    addHint: { opacity: 0.65, marginBottom: spacing[1] },
    addBtn: { alignSelf: 'flex-start' }
  });
}
