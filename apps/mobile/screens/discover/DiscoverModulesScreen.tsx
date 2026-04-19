import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import {
  getDiscoverModuleCardColors,
  getDiscoverModuleCardEmojis,
  getDiscoverModuleSortOptions,
  getDiscoverModuleTopicOptions,
  getDiscoverModuleTopics,
  getModules,
  getPackagesForModule
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const DiscoverModulesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const modules = getModules();
  const sortOptions = getDiscoverModuleSortOptions();
  const topicOptions = getDiscoverModuleTopicOptions();
  const cardEmojis = getDiscoverModuleCardEmojis();
  const cardColors = getDiscoverModuleCardColors();
  const topics = getDiscoverModuleTopics();
  const [selectedSort, setSelectedSort] = React.useState(sortOptions[0] ?? 'Tumu');
  const [selectedTopic, setSelectedTopic] = React.useState(topicOptions[0]?.key ?? 'tumu');

  const moduleTopic = (index: number) => (topics.length > 0 ? topics[index % topics.length] : 'gelisim');

  const filtered = modules.filter((_m, i) => (selectedTopic === 'tumu' ? true : moduleTopic(i) === selectedTopic));

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === 'Populer') return b.id.localeCompare(a.id);
    if (selectedSort === 'Yeni') return a.id.localeCompare(b.id);
    return 0;
  });

  return (
    <View>
      {/* Sort chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {sortOptions.map(label => (
          <PButton
            key={label}
            mode="contained"
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedSort === label ? c.secondary : c.surfaceVariant}
            textColor={selectedSort === label ? c.onSecondary : c.textSecondary}
            onPress={() => setSelectedSort(label)}
          >
            {label}
          </PButton>
        ))}
      </ScrollView>

      {/* Topic filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {topicOptions.map(topic => (
          <PButton
            key={topic.key}
            mode={selectedTopic === topic.key ? 'contained' : 'outlined'}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedTopic === topic.key ? c.primary : 'transparent'}
            textColor={selectedTopic === topic.key ? c.onPrimary : c.textBrand}
            onPress={() => setSelectedTopic(topic.key)}
          >
            {topic.label}
          </PButton>
        ))}
      </ScrollView>

      {sorted.length === 0 ? (
        <StateMessage
          title="Sonuc bulunamadi"
          description="Baska bir konu filtresi deneyin."
          actionLabel="Tumu Goster"
          icon="filter-remove-outline"
        />
      ) : (
        sorted.map(item => {
          const origIndex = modules.findIndex(m => m.id === item.id);
          const packages = getPackagesForModule(item.id);
          const pkgCount = packages.length || 3 + (origIndex % 2);
          const color = cardColors.length > 0 ? cardColors[origIndex % cardColors.length] : c.surfaceVariant;
          const emoji = cardEmojis.length > 0 ? cardEmojis[origIndex % cardEmojis.length] : '📦';
          const previewPkgs = packages.slice(0, 2);

          return (
            <PCard
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('Content', {
                  screen: 'ContentModuleHome',
                  params: { id: item.id }
                })
              }
              accessibilityLabel={item.title}
              accessibilityHint="Modul detaylarini acmak icin dokun"
              accessibilityRole="button"
            >
              <View style={styles.cardInner}>
                <View style={styles.cardTop}>
                  <View style={[styles.cardIcon, { backgroundColor: color }]}>
                    <PText style={styles.cardEmoji}>{emoji}</PText>
                  </View>
                  <View style={styles.cardInfo}>
                    <PText style={styles.cardTitle}>{item.title}</PText>
                    <PText style={styles.cardDescription} numberOfLines={2}>
                      {item.description ?? 'Bu modul icin icerik mevcut.'}
                    </PText>
                    <View style={styles.pkgCountRow}>
                      <PText style={styles.pkgCountChip}>📦 {pkgCount} paket</PText>
                    </View>
                  </View>
                </View>
                {previewPkgs.length > 0 && (
                  <View style={styles.pkgPreview}>
                    {previewPkgs.map((pkg, pi) => (
                      <View key={pkg.id} style={styles.pkgRow}>
                        <PText style={styles.pkgIndex}>{pi + 1}</PText>
                        <View style={styles.pkgInfo}>
                          <PText style={styles.pkgTitle}>{pkg.title}</PText>
                          {pkg.description ? (
                            <PText style={styles.pkgDesc} numberOfLines={1}>
                              {pkg.description}
                            </PText>
                          ) : null}
                        </View>
                      </View>
                    ))}
                    {pkgCount > 2 && <PText style={styles.moreText}>+{pkgCount - 2} daha</PText>}
                  </View>
                )}
                <View style={styles.cardFooter}>
                  <PButton
                    mode="contained"
                    compact
                    disabled={isOffline}
                    style={styles.startButton}
                    contentStyle={styles.startButtonContent}
                    labelStyle={styles.startButtonLabel}
                    buttonColor={c.secondary}
                    onPress={() =>
                      navigation.navigate('Content', {
                        screen: 'ContentModuleHome',
                        params: { id: item.id }
                      })
                    }
                  >
                    Modulu Baslat
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

export const DiscoverModulesScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Moduller">
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
      <ScreenLayout title="Moduller">
        <StateMessage
          title="Modul bulunamadi"
          description="Yeni moduller kisa sure icinde eklenecek."
          actionLabel="Bildirimleri Ac"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Moduller">
        <StateMessage
          title="Moduller yuklenemedi"
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
      <ScreenLayout title="Moduller">
        <OfflineNotice />
        <DiscoverModulesContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Moduller">
      <DiscoverModulesContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    chipsRow: { gap: spacing[1], paddingBottom: 4, marginBottom: spacing[1.5] },
    chip: { borderRadius: radii['2xl'], elevation: 0 },
    chipContent: { height: 34, paddingHorizontal: 4 },
    chipLabel: { fontSize: fontSizes.base, fontWeight: fontWeights.semiBold },
    card: { borderRadius: radii.xl, marginBottom: spacing[2] },
    cardInner: { borderRadius: radii.xl, overflow: 'hidden' },
    cardTop: { flexDirection: 'row', gap: spacing[1.5], padding: spacing[2] },
    cardIcon: {
      width: 64,
      height: 64,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    cardEmoji: { fontSize: fontSizes['8xl'] },
    cardInfo: { flex: 1 },
    cardTitle: { fontSize: fontSizes['2xl'], fontWeight: fontWeights.bold, color: c.textPrimary, marginBottom: 4 },
    cardDescription: { fontSize: fontSizes.base, color: c.textTertiary, marginBottom: 6, lineHeight: 16 },
    pkgCountRow: { flexDirection: 'row' },
    pkgCountChip: {
      backgroundColor: c.primaryContainer,
      color: '#00758C',
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold,
      paddingHorizontal: spacing[1],
      paddingVertical: 2,
      borderRadius: radii.sm
    },
    pkgPreview: {
      borderTopWidth: 1,
      borderTopColor: c.surfaceVariant,
      paddingHorizontal: spacing[2],
      paddingTop: 10,
      paddingBottom: 4
    },
    pkgRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[1], marginBottom: 6 },
    pkgIndex: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold,
      color: palette.white,
      backgroundColor: c.textBrand,
      width: 18,
      height: 18,
      borderRadius: 9,
      textAlign: 'center',
      lineHeight: 18,
      flexShrink: 0
    },
    pkgInfo: { flex: 1 },
    pkgTitle: { fontSize: fontSizes.md, fontWeight: fontWeights.semiBold, color: c.textPrimary },
    pkgDesc: { fontSize: fontSizes.sm, color: c.textTertiary, marginTop: 1 },
    moreText: { fontSize: fontSizes.sm, color: '#9CA3AF', marginBottom: 4 },
    cardFooter: {
      borderTopWidth: 1,
      borderTopColor: c.surfaceVariant,
      paddingHorizontal: spacing[2],
      paddingVertical: 10,
      alignItems: 'flex-start'
    },
    startButton: { borderRadius: radii.md, elevation: 0 },
    startButtonContent: { height: 36, paddingHorizontal: spacing[2] },
    startButtonLabel: { fontSize: fontSizes.md, fontWeight: fontWeights.bold },
    bottomSpacer: { height: 24 }
  });
}
