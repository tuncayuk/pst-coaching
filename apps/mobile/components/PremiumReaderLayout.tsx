import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { PButton, PIconButton, PText } from '.';
import { fontSizes, fontWeights, spacing, useAppTheme } from '../theme';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type PremiumReaderFooterAction = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  mode?: 'contained' | 'outlined';
};

export type PremiumReaderLayoutProps = {
  /** Main title shown in header (1 line, bold) */
  title: string;
  /** Secondary line below title — chapter, stage, day number, etc. */
  subtitle?: string;
  /** Progress 0–1. Pass `onScrollProgress` for scroll-driven; derive externally for page-driven. */
  progress: number;
  /** Center label in floating toolbar — e.g. "Bölüm 2 / 8" or "Aşama 3 / 11" */
  pageLabel: string;
  /** Accent color for progress bar, % label, next icon, bookmarked state. Defaults to theme primary. */
  accentColor?: string;
  canGoPrev?: boolean;
  canGoNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  isBookmarked?: boolean;
  onBookmark?: () => void;
  /** Fires when highlight toolbar button is tapped — show inline picker in children */
  onHighlight?: () => void;
  /** Fires when note toolbar button is tapped — focus note input in children */
  onNote?: () => void;
  /** Current body font size (px); rendered in header as accessibility hint */
  fontSize: number;
  /** Cycles through small → medium → large font sizes */
  onFontSizeCycle: () => void;
  /** All reading body content — blocks, callouts, note inputs, etc. */
  children: React.ReactNode;
  /** When provided the progress bar follows scroll position */
  onScrollProgress?: (progress: number) => void;
  /** Sticky CTA button rendered at the bottom of the scroll area */
  footerAction?: PremiumReaderFooterAction;
  /** Optional audio bar slot rendered between header and scroll body */
  audioBarSlot?: React.ReactNode;
  isOffline?: boolean;
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const PremiumReaderLayout = ({
  title,
  subtitle,
  progress,
  pageLabel,
  accentColor,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  isBookmarked,
  onBookmark,
  onHighlight,
  onNote,
  fontSize: _fontSize,
  onFontSizeCycle,
  children,
  onScrollProgress,
  footerAction,
  audioBarSlot,
  isOffline
}: PremiumReaderLayoutProps) => {
  const { colors: c } = useAppTheme();
  const navigation = useNavigation<any>();
  const accent = accentColor ?? c.primary;
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!onScrollProgress) return;
      const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
      const scrollable = contentSize.height - layoutMeasurement.height;
      if (scrollable > 0) onScrollProgress(Math.min(1, contentOffset.y / scrollable));
    },
    [onScrollProgress]
  );

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.surface }]}>
      {/* ── Progress bar ── */}
      <View style={[styles.progressTrack, { backgroundColor: c.outlineVariant }]}>
        <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: accent }]} />
      </View>

      {/* ── Header ── */}
      <View style={[styles.header, { borderBottomColor: c.outlineVariant, backgroundColor: c.surface }]}>
        <PIconButton
          icon="arrow-left"
          size={22}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Geri"
          style={styles.headerBtn}
        />
        <View style={styles.headerCenter}>
          <PText style={[styles.headerTitle, { color: c.textPrimary }]} numberOfLines={1}>
            {title}
          </PText>
          {!!subtitle && (
            <PText style={[styles.headerSubtitle, { color: c.textTertiary }]} numberOfLines={1}>
              {subtitle}
            </PText>
          )}
        </View>
        <View style={styles.headerRight}>
          <PText style={[styles.headerPct, { color: accent }]}>{pct}%</PText>
          <PIconButton
            icon="format-size"
            size={20}
            onPress={onFontSizeCycle}
            accessibilityLabel="Yazı boyutu değiştir"
            style={styles.headerBtn}
          />
        </View>
      </View>

      {/* ── Offline banner ── */}
      {isOffline && (
        <View style={[styles.offlineBanner, { backgroundColor: c.warningContainer }]}>
          <PText style={[styles.offlineBannerText, { color: c.onWarningContainer }]}>
            Çevrimdışı · Önbellek gösteriliyor
          </PText>
        </View>
      )}

      {/* ── Audio bar (optional) ── */}
      {audioBarSlot}

      {/* ── Scrollable body ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.page}
        onScroll={onScrollProgress ? handleScroll : undefined}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}

        {footerAction && (
          <View style={styles.footerCta}>
            <PButton
              mode={footerAction.mode ?? 'contained'}
              onPress={footerAction.onPress}
              disabled={footerAction.disabled}
              style={styles.footerCtaBtn}
            >
              {footerAction.label}
            </PButton>
          </View>
        )}

        {/* Spacer clears floating toolbar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* ── Floating bottom toolbar ── */}
      <View style={[styles.toolbar, { backgroundColor: c.surface, borderTopColor: c.outlineVariant }]}>
        {/* Left — annotation actions */}
        <View style={styles.toolbarGroup}>
          <PIconButton
            icon="marker"
            size={20}
            onPress={onHighlight}
            disabled={isOffline || !onHighlight}
            accessibilityLabel="Vurgula"
          />
          <PIconButton
            icon="note-edit-outline"
            size={20}
            onPress={onNote}
            disabled={isOffline || !onNote}
            accessibilityLabel="Not ekle"
          />
          <PIconButton
            icon={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            onPress={isOffline ? undefined : onBookmark}
            disabled={isOffline || !onBookmark}
            iconColor={isBookmarked ? accent : undefined}
            accessibilityLabel={isBookmarked ? 'Yer işaretini kaldır' : 'Yer işareti ekle'}
          />
        </View>

        {/* Center — page / stage label */}
        <PText style={[styles.pageLabel, { color: c.textTertiary }]}>{pageLabel}</PText>

        {/* Right — prev / next */}
        <View style={styles.toolbarGroup}>
          <PIconButton
            icon="chevron-left"
            size={22}
            onPress={canGoPrev ? onPrev : undefined}
            disabled={!canGoPrev}
            accessibilityLabel="Önceki"
          />
          <PIconButton
            icon="chevron-right"
            size={22}
            onPress={canGoNext ? onNext : undefined}
            disabled={!canGoNext}
            iconColor={canGoNext ? accent : undefined}
            accessibilityLabel="Sonraki"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1 },
  // Progress bar
  progressTrack: { height: 3 },
  progressFill: { height: 3 },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[0.5],
    paddingVertical: 4,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  headerBtn: {},
  headerCenter: { flex: 1, alignItems: 'center', paddingHorizontal: spacing[0.5] },
  headerTitle: { fontSize: fontSizes.md, fontWeight: fontWeights.bold },
  headerSubtitle: { fontSize: fontSizes.xs, marginTop: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', flexShrink: 0 },
  headerPct: { fontSize: fontSizes.sm, fontWeight: fontWeights.bold, minWidth: 30, textAlign: 'right' },
  // Offline
  offlineBanner: { paddingHorizontal: spacing[2], paddingVertical: 5, alignItems: 'center' },
  offlineBannerText: { fontSize: fontSizes.xs, fontWeight: fontWeights.semiBold },
  // Scroll
  scroll: { flex: 1 },
  page: { paddingHorizontal: spacing[3], paddingTop: spacing[2.5], paddingBottom: 16 },
  footerCta: { marginTop: spacing[3] },
  footerCtaBtn: { width: '100%' },
  bottomSpacer: { height: 72 },
  // Floating toolbar
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[1],
    paddingVertical: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.07,
    shadowRadius: 8
  },
  toolbarGroup: { flexDirection: 'row', alignItems: 'center' },
  pageLabel: { fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold }
});
