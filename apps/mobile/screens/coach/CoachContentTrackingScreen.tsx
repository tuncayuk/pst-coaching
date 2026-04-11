import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PAvatar, PDivider, PProgressBar, PText } from '../../components';
import {
  getContentProgressForUser,
  getEbookProgressForUser,
  getEbooks,
  getJourneys,
  getUsers,
  getWorkshops
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { clientId?: string; state?: ScreenState };

function getDisplayName(email?: string): string {
  if (!email) return 'Danisan';
  return email
    .split('@')[0]
    .replace(/[._]/g, ' ')
    .replace(/w/g, c => c.toUpperCase());
}

function getLastActivityLabel(dateStr?: string | null): string {
  if (!dateStr) return 'Bilinmiyor';
  const daysSince = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (daysSince === 0) return 'Bugun';
  if (daysSince === 1) return 'Dun';
  return daysSince + ' gun once';
}

// Estimated minutes per content progress item
const EST_MINS_PER_ITEM = 15;

const CoachContentTrackingContent = ({ clientId, isOffline }: { clientId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const client = getUsers().find(u => u.id === clientId) ?? getUsers()[1];
  const progress = getContentProgressForUser(client?.id);
  const ebookProgress = getEbookProgressForUser(client?.id);
  const journeys = getJourneys();
  const workshops = getWorkshops();
  const ebooks = getEbooks();

  // Group progress by content_type (target_type aliased as content_type in selector)
  const journeyProgress = progress.filter(p => p.content_type === 'journey');
  const workshopProgress = progress.filter(p => p.content_type === 'workshop');
  const completedIds = new Set(progress.filter(p => p.status === 'completed').map(p => p.content_item_id));

  // AC-FR-E12-03-03: compute completion % per journey
  const journeyStats = journeys.map(j => {
    const days = progress.filter(p => p.content_type === 'journey' && p.content_item_id === j.id);
    const done = days.filter(p => p.status === 'completed').length;
    const total = Math.max(days.length, 1);
    const pct = total > 0 ? done / total : 0;
    const lastP = days
      .sort((a, b) => new Date(b.started_at ?? 0).getTime() - new Date(a.started_at ?? 0).getTime())[0];
    // AC-FR-E12-03-04: time spent estimate
    const estMins = done * EST_MINS_PER_ITEM;
    return {
      journey: j,
      pct,
      done,
      total: progress.length,
      lastActivity: lastP?.started_at,
      estMins
    };
  });

  const workshopStats = workshops.map(w => {
    const done = 0;
    const total = 3; // estimate
    const pct = done / total;
    const estMins = 0;
    return { workshop: w, pct, done, total, estMins };
  });

  return (
    <>
      {/* AC-FR-E12-03-01: journeys */}
      <SectionCard title="Aktif Yolculuklar">
        {journeyStats.length === 0 ? (
          <View style={styles.emptySection}>
            <PText style={styles.emptyText}>Aktif yolculuk bulunamadi.</PText>
          </View>
        ) : (
          journeyStats.map((item, idx) => (
            <View key={item.journey.id}>
              <View
                style={styles.contentRow}
                accessible
                accessibilityLabel={
                  item.journey.title +
                  '. Tamamlanma: yuzde ' +
                  Math.round(item.pct * 100) +
                  '. Son aktivite: ' +
                  getLastActivityLabel(item.lastActivity) +
                  '. Tahmini sure: ' +
                  item.estMins +
                  ' dakika.'
                }
              >
                <PAvatar.Icon
                  size={36}
                  icon="map-marker-path"
                  color="#7C4DFF"
                  style={styles.contentIcon}
                  accessible={false}
                />
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle} numberOfLines={1}>
                    {item.journey.title}
                  </PText>
                  {/* AC-FR-E12-03-03: completion % */}
                  <View style={styles.pctRow}>
                    <PProgressBar progress={item.pct} color="#7C4DFF" style={styles.contentBar} accessible={false} />
                    <PText style={styles.pctText}>{Math.round(item.pct * 100)}%</PText>
                  </View>
                  <View style={styles.metaRow}>
                    <PText style={styles.metaText}>Son aktivite: {getLastActivityLabel(item.lastActivity)}</PText>
                    {/* AC-FR-E12-03-04: time spent */}
                    <PText style={styles.metaText}>{item.estMins > 0 ? '~' + item.estMins + 'dk' : 'Baslamamis'}</PText>
                  </View>
                </View>
              </View>
              {idx < journeyStats.length - 1 && <PDivider style={styles.rowDivider} />}
            </View>
          ))
        )}
      </SectionCard>

      {/* AC-FR-E12-03-01: workshops */}
      <SectionCard title="Atolyeler">
        {workshopStats.length === 0 ? (
          <View style={styles.emptySection}>
            <PText style={styles.emptyText}>Aktif atolye bulunamadi.</PText>
          </View>
        ) : (
          workshopStats.map((item, idx) => (
            <View key={item.workshop.id}>
              <View
                style={styles.contentRow}
                accessible
                accessibilityLabel={
                  item.workshop.title +
                  '. Tamamlanma: yuzde ' +
                  Math.round(item.pct * 100) +
                  '. Tahmini sure: ' +
                  item.estMins +
                  ' dakika.'
                }
              >
                <PAvatar.Icon
                  size={36}
                  icon="school-outline"
                  color="#0EA5E9"
                  style={styles.contentIconBlue}
                  accessible={false}
                />
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle} numberOfLines={1}>
                    {item.workshop.title}
                  </PText>
                  <View style={styles.pctRow}>
                    <PProgressBar progress={item.pct} color="#0EA5E9" style={styles.contentBar} accessible={false} />
                    <PText style={styles.pctText}>{Math.round(item.pct * 100)}%</PText>
                  </View>
                  <View style={styles.metaRow}>
                    <PText style={styles.metaText}>
                      {item.done}/{item.total} bolum
                    </PText>
                    <PText style={styles.metaText}>{item.estMins > 0 ? '~' + item.estMins + 'dk' : 'Baslamamis'}</PText>
                  </View>
                </View>
              </View>
              {idx < workshopStats.length - 1 && <PDivider style={styles.rowDivider} />}
            </View>
          ))
        )}
      </SectionCard>

      {/* AC-FR-E12-03-02: ebooks and chapter status */}
      <SectionCard title="E-Kitaplar">
        {ebooks.length === 0 ? (
          <View style={styles.emptySection}>
            <PText style={styles.emptyText}>E-kitap bulunamadi.</PText>
          </View>
        ) : (
          ebooks.map((ebook, idx) => {
            const ep = ebookProgress.find((p: any) => p.ebook_id === ebook.id);
            const pct = ep ? ((ep as any).percent_complete ?? 0) : 0;
            const estMins = Math.round((pct * 200) / 100); // estimate 200 mins for full book
            const lastRead = ep ? ((ep as any).updated_at ?? null) : null;
            return (
              <View key={ebook.id}>
                <View
                  style={styles.contentRow}
                  accessible
                  accessibilityLabel={
                    ebook.title +
                    '. Tamamlanma: yuzde ' +
                    Math.round(pct) +
                    (lastRead ? '. Son okuma: ' + getLastActivityLabel(lastRead) : '')
                  }
                >
                  <PAvatar.Icon
                    size={36}
                    icon="book-open-outline"
                    color="#10B981"
                    style={styles.contentIconGreen}
                    accessible={false}
                  />
                  <View style={styles.contentInfo}>
                    <PText style={styles.contentTitle} numberOfLines={1}>
                      {ebook.title}
                    </PText>
                    <View style={styles.pctRow}>
                      <PProgressBar progress={pct / 100} color="#10B981" style={styles.contentBar} accessible={false} />
                      <PText style={styles.pctText}>{Math.round(pct)}%</PText>
                    </View>
                    <View style={styles.metaRow}>
                      {/* AC-FR-E12-03-02: chapter status */}
                      <PText style={styles.metaText}>
                        {lastRead ? 'Son okuma: ' + getLastActivityLabel(lastRead) : 'Henuz baslanmamis'}
                      </PText>
                      {/* AC-FR-E12-03-04: time spent */}
                      <PText style={styles.metaText}>{estMins > 0 ? '~' + estMins + 'dk' : '0dk'}</PText>
                    </View>
                  </View>
                </View>
                {idx < ebooks.length - 1 && <PDivider style={styles.rowDivider} />}
              </View>
            );
          })
        )}
      </SectionCard>
    </>
  );
};

export const CoachContentTrackingScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const clientId = route?.params?.clientId;
  const client = getUsers().find(u => u.id === clientId);
  const title = client ? getDisplayName(client.email) : 'Danisan';

  if (state === 'loading') {
    return (
      <ScreenLayout title="Icerik Takibi" subtitle={title}>
        <PActivityIndicator animating accessibilityLabel="Icerik takibi yukleniyor" />
        <SkeletonBlock height={100} />
        <SkeletonBlock height={100} />
        <SkeletonBlock height={100} />
      </ScreenLayout>
    );
  }

  if (state === 'empty' || !clientId) {
    return (
      <ScreenLayout title="Icerik Takibi" subtitle="">
        <StateMessage
          title="Icerik bulunamadi"
          description="Bu danisana ait icerik verisi bulunamadi."
          icon="book-open-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Icerik Takibi" subtitle={title}>
        <StateMessage
          title="Veriler yuklenemedi"
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
      <ScreenLayout title="Icerik Takibi" subtitle={title + ' - Cevrimdisi mod'}>
        <OfflineNotice />
        <CoachContentTrackingContent clientId={clientId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Icerik Takibi" subtitle={title + ' - Detayli ilerleme'}>
      <CoachContentTrackingContent clientId={clientId} />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    contentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[1.5], paddingVertical: spacing[1] },
    contentIcon: { backgroundColor: '#F5F3FF', borderRadius: 18 },
    contentIconBlue: { backgroundColor: '#E0F2FE', borderRadius: 18 },
    contentIconGreen: { backgroundColor: c.tertiaryContainer, borderRadius: 18 },
    contentInfo: { flex: 1 },
    contentTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.semiBold, color: '#1E293B', marginBottom: 6 },
    pctRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
    contentBar: { flex: 1, height: 6, borderRadius: radii.sm },
    pctText: { fontSize: fontSizes.base, fontWeight: fontWeights.bold, color: c.textSecondary, minWidth: 32 },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
    metaText: { fontSize: fontSizes.sm, color: '#9CA3AF' },
    rowDivider: { marginVertical: 4 },
    emptySection: { paddingVertical: spacing[2], alignItems: 'center' },
    emptyText: { fontSize: fontSizes.md, color: '#9CA3AF' }
  });
}
