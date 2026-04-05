import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PText } from '../../components';
import { getWorkshops } from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const SORT_OPTIONS = ['Tumu', 'Onerilen', 'Populer', 'Yeni'];
const TYPE_OPTIONS = [
  { key: 'tumu', label: 'Tumu' },
  { key: 'kamp', label: 'Kamp' },
  { key: 'rehber', label: 'Rehber' },
  { key: 'calisma_kitabi', label: 'Calisma Kitabi' }
];
const WORKSHOP_TYPES = ['kamp', 'rehber', 'calisma_kitabi'];
const TYPE_LABELS: Record<string, string> = {
  kamp: 'Kamp',
  rehber: 'Rehber',
  calisma_kitabi: 'Calisma Kitabi'
};
const TYPE_BG: Record<string, string> = {
  kamp: '#FEE2E2',
  rehber: '#D1FAE5',
  calisma_kitabi: '#EDE7F6'
};
const TYPE_FG: Record<string, string> = {
  kamp: '#B91C1C',
  rehber: '#065F46',
  calisma_kitabi: '#4C1D95'
};
const CARD_EMOJIS = ['🎨', '🧠', '🗣️', '🕊️'];
const CARD_COLORS = ['#FFE4E6', '#D1FAE5', '#E0F2FE', '#FDE68A'];
const SESSION_COUNTS = [3, 5, 4, 6, 3, 5];
const DURATIONS = ['90 dk', '120 dk', '60 dk', '150 dk', '90 dk', '120 dk'];
const AGE_TARGETS = ['14-18', '18+', 'Yetiskin', 'Aile', '14+', '18-35'];

const DiscoverWorkshopsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const workshops = getWorkshops();
  const [selectedSort, setSelectedSort] = React.useState('Tumu');
  const [selectedType, setSelectedType] = React.useState('tumu');

  const workshopType = (index: number) => WORKSHOP_TYPES[index % WORKSHOP_TYPES.length];

  const filtered = workshops.filter((_w, i) => (selectedType === 'tumu' ? true : workshopType(i) === selectedType));

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === 'Populer') return b.id.localeCompare(a.id);
    if (selectedSort === 'Yeni') return a.id.localeCompare(b.id);
    return 0;
  });

  return (
    <View>
      {/* Sort chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {SORT_OPTIONS.map(label => (
          <PButton
            key={label}
            mode="contained"
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedSort === label ? '#2B1B5D' : '#F5F5F5'}
            textColor={selectedSort === label ? '#FFFFFF' : '#525252'}
            onPress={() => setSelectedSort(label)}
          >
            {label}
          </PButton>
        ))}
      </ScrollView>

      {/* Type filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {TYPE_OPTIONS.map(opt => (
          <PButton
            key={opt.key}
            mode={selectedType === opt.key ? 'contained' : 'outlined'}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedType === opt.key ? '#00B4D8' : 'transparent'}
            textColor={selectedType === opt.key ? '#FFFFFF' : '#2B1B5D'}
            onPress={() => setSelectedType(opt.key)}
          >
            {opt.label}
          </PButton>
        ))}
      </ScrollView>

      {sorted.length === 0 ? (
        <StateMessage
          title="Sonuc bulunamadi"
          description="Baska bir tur filtresi deneyin."
          actionLabel="Tumu Goster"
          icon="filter-remove-outline"
        />
      ) : (
        sorted.map(item => {
          const origIndex = workshops.findIndex(w => w.id === item.id);
          const wType = workshopType(origIndex);
          const sessions = SESSION_COUNTS[origIndex % SESSION_COUNTS.length];
          const duration = DURATIONS[origIndex % DURATIONS.length];
          const ageTarget = AGE_TARGETS[origIndex % AGE_TARGETS.length];
          const color = CARD_COLORS[origIndex % CARD_COLORS.length];
          const emoji = CARD_EMOJIS[origIndex % CARD_EMOJIS.length];

          return (
            <PCard
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('Content', {
                  screen: 'ContentWorkshopDetail',
                  params: { id: item.id }
                })
              }
              accessibilityLabel={item.title}
              accessibilityHint="Atolye detaylarini acmak icin dokun"
              accessibilityRole="button"
            >
              <View style={styles.cardInner}>
                <View style={styles.cardTop}>
                  <View style={[styles.cardIcon, { backgroundColor: color }]}>
                    <PText style={styles.cardEmoji}>{emoji}</PText>
                  </View>
                  <View style={styles.cardInfo}>
                    <PText style={styles.cardTitle}>{item.title}</PText>
                    <View style={styles.cardMetaRow}>
                      <PText style={styles.cardMeta}>⏱ {duration}</PText>
                      <PText style={styles.cardMetaSep}>·</PText>
                      <PText style={styles.cardMeta}>👥 {ageTarget}</PText>
                      <PText style={styles.cardMetaSep}>·</PText>
                      <PText style={styles.cardMeta}>📋 {sessions} oturum</PText>
                    </View>
                    <View style={styles.typeChipRow}>
                      <View style={[styles.typeChip, { backgroundColor: TYPE_BG[wType] }]}>
                        <PText style={[styles.typeChipText, { color: TYPE_FG[wType] }]}>{TYPE_LABELS[wType]}</PText>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <PButton
                    mode="outlined"
                    compact
                    disabled={isOffline}
                    style={styles.detailButton}
                    contentStyle={styles.detailButtonContent}
                    labelStyle={styles.detailButtonLabel}
                    onPress={() =>
                      navigation.navigate('Content', {
                        screen: 'ContentWorkshopDetail',
                        params: { id: item.id }
                      })
                    }
                  >
                    Detaylari Gor
                  </PButton>
                </View>
              </View>
            </PCard>
          );
        })
      )}
      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const DiscoverWorkshopsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Atolyeler">
        <PActivityIndicator animating />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={36} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Atolyeler">
        <StateMessage
          title="Atolye bulunamadi"
          description="Yeni atolyeler kisa sure icinde eklenecek."
          actionLabel="Bildirimleri Ac"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Atolyeler">
        <StateMessage
          title="Atolyeler yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Atolyeler">
        <OfflineNotice />
        <DiscoverWorkshopsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atolyeler">
      <DiscoverWorkshopsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipsRow: { gap: 8, paddingBottom: 4, marginBottom: 12 },
  chip: { borderRadius: 20, elevation: 0 },
  chipContent: { height: 34, paddingHorizontal: 4 },
  chipLabel: { fontSize: 12, fontWeight: '600' },
  card: { borderRadius: 16, marginBottom: 16 },
  cardInner: { borderRadius: 16, overflow: 'hidden' },
  cardTop: { flexDirection: 'row', gap: 12, padding: 16 },
  cardIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  cardEmoji: { fontSize: 28 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#171717', marginBottom: 4 },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
    marginBottom: 6
  },
  cardMeta: { fontSize: 12, color: '#737373' },
  cardMetaSep: { fontSize: 12, color: '#D4D4D4' },
  typeChipRow: { flexDirection: 'row', gap: 4 },
  typeChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typeChipText: { fontSize: 11, fontWeight: '700' },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'flex-start'
  },
  detailButton: { borderRadius: 8 },
  detailButtonContent: { height: 36, paddingHorizontal: 12 },
  detailButtonLabel: { fontSize: 13, fontWeight: '700' },
  bottomSpacer: { height: 24 }
});
