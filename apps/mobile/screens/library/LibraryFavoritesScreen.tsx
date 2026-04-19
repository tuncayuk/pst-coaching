import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import {
  ContentItemType,
  ContentTypeRow,
  FilterChipBar,
  PActivityIndicator,
  PButton,
  PDivider,
  PText
} from '../../components';
import {
  getEbooks,
  getFavoritesForUser,
  getJourneys,
  getModules,
  getPrimaryUser,
  getWorkshops
} from '../../data/mockSelectors';
import {
  CONTENT_TYPE_LABELS,
  LIBRARY_CONTENT_FILTER_ALL,
  LIBRARY_CONTENT_FILTER_OPTIONS
} from '../../data/constants/contentTypes';
import { ColorTokens, fontSizes, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const LibraryFavoritesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const favorites = getFavoritesForUser(user?.id);
  const journeys = getJourneys();
  const workshops = getWorkshops();
  const modules = getModules();
  const ebooks = getEbooks();

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
      type: type as ContentItemType,
      createdAt: fav.created_at
    };
  });

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>(LIBRARY_CONTENT_FILTER_ALL);

  const filtered = enriched.filter(item => {
    const matchesQuery = !query || item.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === LIBRARY_CONTENT_FILTER_ALL || CONTENT_TYPE_LABELS[item.type] === activeFilter;
    return matchesQuery && matchesFilter;
  });

  const hasActiveFilters = query || activeFilter !== LIBRARY_CONTENT_FILTER_ALL;
  const clearFilters = () => { setQuery(''); setActiveFilter(LIBRARY_CONTENT_FILTER_ALL); };

  return (
    <>
      {/* AC-FR-E9-04-01/02/03: Search + filter bar */}
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
              <PText style={styles.clearText}>Temizle</PText>
            </TouchableOpacity>
          )}
        </View>
        <FilterChipBar
          options={LIBRARY_CONTENT_FILTER_OPTIONS}
          activeOption={activeFilter}
          onOptionPress={setActiveFilter}
          disabled={isOffline}
        />
      </SectionCard>

      {/* AC-FR-E9-01-01: labeled favorites list */}
      <SectionCard title={`Favoriler (${filtered.length})`}>
        {filtered.length === 0 ? (
          <PText variant="bodySmall" style={styles.emptyText}>
            {hasActiveFilters ? 'Bu filtrelerle esleyen favori bulunamadi.' : 'Favori eklenmedi.'}
          </PText>
        ) : (
          filtered.map((item, idx) => (
            <View key={item.id}>
              <ContentTypeRow
                title={item.title}
                type={item.type}
                description={item.description}
                actions={
                  <>
                    <PButton
                      mode="outlined"
                      compact
                      disabled={isOffline}
                      onPress={() => navigation.navigate('LibraryFavoriteDetail', { id: item.id })}
                      accessibilityLabel={`Detay: ${item.title}`}
                    >
                      Detay
                    </PButton>
                    <PButton
                      mode="text"
                      compact
                      disabled={isOffline}
                      onPress={() => navigation.navigate('LibraryShareExport', { id: item.id })}
                      accessibilityLabel="Disari aktar"
                    >
                      Aktar
                    </PButton>
                  </>
                }
              />
              {idx < filtered.length - 1 && <PDivider />}
            </View>
          ))
        )}
      </SectionCard>

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
      <ScreenLayout title="Favoriler" subtitle="Hazırlanıyor">
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

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginBottom: spacing[1]
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: c.outline,
      borderRadius: radii.lg,
      paddingHorizontal: spacing[1.5],
      paddingVertical: spacing[1],
      fontSize: fontSizes.lg,
      color: c.textPrimary,
      backgroundColor: c.surface
    },
    clearBtn: {
      paddingHorizontal: spacing[1],
      paddingVertical: 6
    },
    clearText: {
      fontSize: fontSizes.base,
      color: c.primary
    },
    emptyText: {
      opacity: 0.6,
      textAlign: 'center',
      paddingVertical: spacing[1.5]
    },
    archiveBtn: {
      marginBottom: spacing[1]
    }
  });
}
