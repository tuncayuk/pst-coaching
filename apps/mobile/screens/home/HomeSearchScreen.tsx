import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PTextInput } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const QUICK_FILTERS = ['Yolculuk', 'Atolye', 'Modul', 'e-Kitap'] as const;
type QuickFilter = (typeof QUICK_FILTERS)[number] | null;

const recentSearches = ['Oz sefkat', 'Sinir koyma', 'Nefes egzersizi'];
const popularTopics = [
  { title: 'Duygusal Dayaniklilik', subtitle: '6 gun -- 4 icerik' },
  { title: 'Zor Konusmalar', subtitle: '2 bolum -- 35 dk' }
];

const HomeSearchContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<QuickFilter>(null);
  const inputRef = useRef<TextInput>(null);

  const canSearch = query.trim().length > 0 && !isOffline;

  const handleSearch = () => {
    if (!canSearch) return;
    navigation.navigate('HomeSearchResults', { query: query.trim(), activeFilter });
  };

  const handleRecentTap = (term: string) => {
    if (isOffline) return;
    setQuery(term);
    navigation.navigate('HomeSearchResults', { query: term, activeFilter });
  };

  return (
    <>
      <SectionCard title="Arama" actionLabel="Filtrele">
        <PTextInput
          ref={inputRef as any}
          label="Icerik, konu veya yazar ara"
          mode="outlined"
          placeholder="Orn: oz sefkat, stres yonetimi"
          style={styles.input}
          editable={!isOffline}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          accessibilityLabel="Arama alani"
          accessibilityHint="Aramak istediginiz kelimeyi yazin"
        />
        <View style={styles.chipRow}>
          {QUICK_FILTERS.map(label => (
            <PChip
              key={label}
              style={[styles.chip, activeFilter === label && styles.chipActive]}
              selected={activeFilter === label}
              onPress={() => !isOffline && setActiveFilter(activeFilter === label ? null : label)}
              disabled={isOffline}
              accessibilityLabel={`Filtre: ${label}${activeFilter === label ? ', secili' : ''}`}
              accessibilityRole="button"
            >
              {label}
            </PChip>
          ))}
        </View>
        <PButton
          mode="contained"
          disabled={!canSearch}
          onPress={handleSearch}
          accessibilityLabel="Ara"
          accessibilityHint="Arama sonuclarini goster"
        >
          Ara
        </PButton>
      </SectionCard>

      <SectionCard title="Son Aramalar" actionLabel="Temizle">
        <View style={styles.chipRow}>
          {recentSearches.map(term => (
            <PChip
              key={term}
              style={styles.chip}
              disabled={isOffline}
              onPress={() => handleRecentTap(term)}
              accessibilityLabel={`Son arama: ${term}`}
              accessibilityRole="button"
            >
              {term}
            </PChip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Populer Konular" actionLabel="Tumu">
        {popularTopics.map(topic => (
          <PCard key={topic.title} style={styles.card}>
            <PCard.Title title={topic.title} subtitle={topic.subtitle} />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() => handleRecentTap(topic.title)}
                accessibilityLabel={`${topic.title} konusunu kesfet`}
              >
                Incele
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const HomeSearchScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Arama" subtitle="Arama yukleniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Oneriler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Arama" subtitle="Yeni icerikler kesfe">
        <StateMessage
          title="Henuz arama yok"
          description="Ilgi alanina gore oneriler gormek icin arama yapabilirsin."
          actionLabel="Kesfe Cik"
          icon="magnify"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Arama" subtitle="Bir sorun olustu">
        <StateMessage
          title="Arama yuklenemedi"
          description="Baglantiyi kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Arama" subtitle="Cevrimdisi mod">
        <OfflineNotice />
        <HomeSearchContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Arama" subtitle="Icerikler icinde ara">
      <HomeSearchContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    input: {
      marginBottom: spacing[1.5]
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1],
      marginBottom: spacing[1.5]
    },
    chip: {
      minHeight: 36
    },
    chipActive: {
      borderWidth: 2,
      borderColor: c.primary
    },
    card: {
      marginBottom: spacing[1.5]
    }
  });
}
