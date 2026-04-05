import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PText } from '../../components';
import {
  getEbooks,
  getFavoritesForUser,
  getJourneys,
  getModules,
  getPrimaryUser,
  getWorkshops
} from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

// AC-FR-E9-01-02, AC-FR-E9-04-02: content type filter options
const FILTER_OPTIONS = ['Tumü', 'Yolculuk', 'Atolye', 'Modul', 'e-Kitap'];

// Source type → display label
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
    const journey = journeys.find(j => j.id === fav.item_id);
    const workshop = workshops.find(w => w.id === fav.item_id);
    const module = modules.find(m => m.id === fav.item_id);
    const ebook = ebooks.find(e => e.id === fav.item_id);
    const item = journey ?? workshop ?? module ?? ebook;
    const type = journey ? 'journey' : workshop ? 'workshop' : module ? 'module' : ebook ? 'ebook' : 'content';
    return {
      id: fav.id,
      itemId: fav.item_id,
      title: (item as any)?.title ?? 'Favori',
      description: (item as any)?.description ?? '',
      type,
      createdAt: fav.created_at
    };
  });

  // AC-FR-E9-04-01: search by title
  const [query, setQuery] = useState('');
  // AC-FR-E9-04-02: content type filter
  const [activeFilter, setActiveFilter] = useState('Tumü');

  const filtered = enriched.filter(item => {
    const matchesQuery = !query || item.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === 'Tumü' || TYPE_LABEL[item.type] === activeFilter;
    return matchesQuery && matchesFilter;
  });

  // AC-FR-E9-04-03: clear filters
  const clearFilters = () => {
    setQuery('');
    setActiveFilter('Tumü');
  };
  const hasActiveFilters = query || activeFilter !== 'Tumü';

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
              <PText variant="labelMedium" style={styles.clearText}>
                Temizle
              </PText>
            </TouchableOpacity>
          )}
        </View>
        {/* AC-FR-E9-04-02: type filter chips */}
        <View style={styles.chipRow}>
          {FILTER_OPTIONS.map(label => (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveFilter(label)}
              accessibilityRole="button"
              accessibilityLabel={label + ' filtresi'}
            >
              <PChip selected={activeFilter === label} style={styles.filterChip}>
                {label}
              </PChip>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E9-01-01: labeled favorites list */}
      <SectionCard title={'Favoriler (' + filtered.length + ')'}>
        {filtered.length === 0 ? (
          <PText variant="bodySmall" style={styles.emptyText}>
            {hasActiveFilters ? 'Bu filtrelerle esleyen favori bulunamadi.' : 'Favori eklenmedi.'}
          </PText>
        ) : (
          filtered.map((item, idx) => (
            <View key={item.id}>
              <View style={styles.favItem}>
                <View style={[styles.typeBar, { backgroundColor: TYPE_COLOR[item.type] ?? '#9E9E9E' }]} />
                <View style={styles.favBody}>
                  <View style={styles.favTitleRow}>
                    <PText variant="titleSmall" style={styles.favTitle}>
                      {item.title}
                    </PText>
                    {/* AC-FR-E9-01-01: source type label */}
                    <PChip compact style={[styles.typeChip, { borderColor: TYPE_COLOR[item.type] ?? '#9E9E9E' }]}>
                      {TYPE_LABEL[item.type] ?? 'Icerik'}
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
                      onPress={() => navigation.navigate('LibraryFavoriteDetail', { id: item.id })}
                      accessibilityLabel={'Detay: ' + item.title}
                    >
                      Detay
                    </PButton>
                    <PButton
                      mode="text"
                      compact
                      disabled={isOffline}
                      style={styles.exportBtn}
                      onPress={() => navigation.navigate('LibraryShareExport', { id: item.id })}
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
          onPress={() => navigation.navigate('LibraryCollections')}
        >
          Koleksiyonlarim
        </PButton>
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.archiveBtn}
          onPress={() => navigation.navigate('LibraryDownloads')}
        >
          Indirilenler
        </PButton>
      </SectionCard>
    </>
  );
};

export const LibraryFavoritesScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
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

  if (state === 'empty') {
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

  if (state === 'error') {
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

  if (state === 'offline') {
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14
  },
  clearBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  clearText: {
    color: '#7C4DFF'
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  filterChip: {
    marginBottom: 4
  },
  emptyText: {
    opacity: 0.6,
    textAlign: 'center',
    paddingVertical: 12
  },
  favItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 10
  },
  typeBar: {
    width: 4,
    borderRadius: 2,
    minHeight: 48
  },
  favBody: {
    flex: 1
  },
  favTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6
  },
  favTitle: {
    flex: 1,
    fontWeight: '600',
    marginRight: 6
  },
  typeChip: {
    height: 24
  },
  favDesc: {
    opacity: 0.65,
    marginTop: 3,
    lineHeight: 18
  },
  favActions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8
  },
  openBtn: {
    flex: 0
  },
  exportBtn: {
    flex: 0
  },
  divider: {
    marginHorizontal: 0
  },
  archiveBtn: {
    marginBottom: 10
  }
});
