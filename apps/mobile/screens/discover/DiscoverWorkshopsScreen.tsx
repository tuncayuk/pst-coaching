import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getWorkshopGroups, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, shadows, spacing, themeShadow, useAppTheme } from '../../theme';

// ---------------------------------------------------------------------------
// Group colour palette — deterministic per group id
// ---------------------------------------------------------------------------
const PALETTE = [
  { bg: '#EDE9FE', fg: '#5B21B6' },
  { bg: '#D1FAE5', fg: '#065F46' },
  { bg: '#FEF3C7', fg: '#92400E' },
  { bg: '#E0F7FA', fg: '#006064' },
  { bg: '#FCE7F3', fg: '#831843' },
  { bg: '#DBEAFE', fg: '#1E3A5F' },
];

const pickColor = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return PALETTE[Math.abs(h) % PALETTE.length];
};

const toInitials = (title: string) =>
  title
    .split(' ')
    .slice(0, 2)
    .map(w => w[0] ?? '')
    .join('')
    .toUpperCase();

// ---------------------------------------------------------------------------
// GroupTile
// ---------------------------------------------------------------------------
type Group = ReturnType<typeof getWorkshopGroups>[number];

type GroupTileProps = {
  group: Group;
  styles: ReturnType<typeof makeStyles>;
  isDark: boolean;
  onPress: () => void;
};

function GroupTile({ group, styles, isDark, onPress }: GroupTileProps) {
  const { bg, fg } = pickColor(group.id);
  return (
    <TouchableOpacity
      style={[styles.tile, { backgroundColor: bg }, themeShadow(shadows.xs, isDark)]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${group.title}, ${group.catalog_count} atölye`}
    >
      <View style={styles.tileTop}>
        <View style={[styles.initials, { backgroundColor: `${fg}22` }]}>
          <PText style={[styles.initialsText, { color: fg }]}>{toInitials(group.title)}</PText>
        </View>
        <View style={[styles.countBadge, { backgroundColor: `${fg}18` }]}>
          <PText style={[styles.countText, { color: fg }]}>{group.catalog_count}</PText>
        </View>
      </View>
      <PText style={[styles.tileTitle, { color: fg }]} numberOfLines={2}>
        {group.title}
      </PText>
      {!!group.description && (
        <PText style={styles.tileDesc} numberOfLines={2}>
          {group.description}
        </PText>
      )}
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------------------------
// Catalogue content
// ---------------------------------------------------------------------------
const DiscoverWorkshopsCatalogContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c, isDark } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();

  const [query, setQuery] = useState('');

  const groups = getWorkshopGroups();
  const totalCount = getWorkshops().length;

  const filtered = useMemo(() => {
    if (!query.trim()) return groups;
    const q = query.toLowerCase();
    return groups.filter(g => g.title.toLowerCase().includes(q) || (g.description ?? '').toLowerCase().includes(q));
  }, [groups, query]);

  const navigateToGroup = (groupId: string | null, groupTitle: string) =>
    navigation.navigate('DiscoverWorkshopGroup', { groupId, groupTitle });

  // Pair groups into rows of 2 for the grid
  const rows = useMemo(() => {
    const pairs: Group[][] = [];
    for (let i = 0; i < filtered.length; i += 2) {
      pairs.push(filtered.slice(i, i + 2));
    }
    return pairs;
  }, [filtered]);

  return (
    <View>
      {/* Search bar */}
      <View style={[styles.searchBar, { borderColor: c.outline, backgroundColor: c.surface }]}>
        <PText style={styles.searchIcon}>🔍</PText>
        <TextInput
          style={[styles.searchInput, { color: c.textPrimary }]}
          placeholder="Grup ara..."
          placeholderTextColor={c.textTertiary}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
          editable={!isOffline}
          accessibilityLabel="Grup ara"
        />
      </View>

      {/* All workshops — full-width hero tile */}
      {!query.trim() && (
        <TouchableOpacity
          style={[styles.heroTile, { backgroundColor: c.secondaryContainer }, themeShadow(shadows.sm, isDark)]}
          onPress={() => navigateToGroup(null, 'Tüm Atölyeler')}
          activeOpacity={0.8}
          disabled={isOffline}
          accessibilityRole="button"
          accessibilityLabel={`Tüm Atölyeler, ${totalCount} atölye`}
        >
          <View style={styles.heroTileLeft}>
            <PText style={styles.heroTileTitle}>Tüm Atölyeler</PText>
            <PText style={styles.heroTileDesc}>Tüm gruplardan {totalCount} atölye</PText>
          </View>
          <PText style={styles.heroTileArrow}>→</PText>
        </TouchableOpacity>
      )}

      {/* Group grid */}
      {filtered.length === 0 ? (
        <StateMessage
          title="Grup bulunamadı"
          description="Farklı bir arama deneyin."
          icon="magnify"
          actionLabel="Temizle"
          onAction={() => setQuery('')}
        />
      ) : (
        rows.map((pair, rowIdx) => (
          <View key={rowIdx} style={styles.gridRow}>
            {pair.map(group => (
              <GroupTile
                key={group.id}
                group={group}
                styles={styles}
                isDark={isDark}
                onPress={() => navigateToGroup(group.id, group.title)}
              />
            ))}
            {/* Fill empty cell when odd number of groups */}
            {pair.length === 1 && <View style={styles.tilePlaceholder} />}
          </View>
        ))
      )}

      <View style={styles.bottomSpacer} />
    </View>
  );
};

// ---------------------------------------------------------------------------
// Screen shell
// ---------------------------------------------------------------------------
export const DiscoverWorkshopsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Atölyeler">
        <PActivityIndicator animating />
        <SkeletonBlock height={48} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Atölyeler">
        <StateMessage
          title="Atölye bulunamadı"
          description="Yeni atölyeler kısa süre içinde eklenecek."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Atölyeler">
        <StateMessage
          title="Atölyeler yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Atölyeler" subtitle="Canlı ve kayıtlı atölyeler">
        <OfflineNotice />
        <DiscoverWorkshopsCatalogContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atölyeler" subtitle="Canlı ve kayıtlı atölyeler">
      <DiscoverWorkshopsCatalogContent />
    </ScreenLayout>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    // Search
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: radii.xl,
      paddingHorizontal: spacing[1.5],
      paddingVertical: spacing[1],
      marginBottom: spacing[2],
      gap: spacing[1]
    },
    searchIcon: { fontSize: fontSizes.lg },
    searchInput: {
      flex: 1,
      fontSize: fontSizes.lg,
      paddingVertical: 0
    },

    // Hero tile (Tüm Atölyeler)
    heroTile: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: radii.xl,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[2],
      marginBottom: spacing[1.5]
    },
    heroTileLeft: { flex: 1 },
    heroTileTitle: {
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 2
    },
    heroTileDesc: { fontSize: fontSizes.md, color: c.textSecondary },
    heroTileArrow: { fontSize: fontSizes['4xl'], color: c.textBrand },

    // Group grid
    gridRow: {
      flexDirection: 'row',
      gap: spacing[1.5],
      marginBottom: spacing[1.5]
    },
    tile: {
      flex: 1,
      borderRadius: radii.xl,
      padding: spacing[2],
      minHeight: 140,
      justifyContent: 'space-between'
    },
    tilePlaceholder: { flex: 1 },
    tileTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing[1.5]
    },
    initials: {
      width: 44,
      height: 44,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center'
    },
    initialsText: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.black
    },
    countBadge: {
      borderRadius: radii.md,
      paddingHorizontal: spacing[1],
      paddingVertical: 3
    },
    countText: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.extraBold
    },
    tileTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      marginBottom: 4
    },
    tileDesc: {
      fontSize: fontSizes.sm,
      color: c.textSecondary,
      lineHeight: 16
    },

    bottomSpacer: { height: spacing[4] }
  });
}
