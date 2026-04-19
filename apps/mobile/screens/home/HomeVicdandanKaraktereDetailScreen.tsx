import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PDivider, PProgressBar, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getContentProgressForUser, getJourneyById, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const JOURNEY_ID = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

const HomeVicdandanKaraktereContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const journey = getJourneyById(JOURNEY_ID) as any;
  const user = getPrimaryUser();
  const progressItem = getContentProgressForUser(user?.id).find(p => p.content_item_id === JOURNEY_ID);
  const progressPct = progressItem ? ((progressItem as any).progress_percent ?? 0) : 0;
  const outlineSteps: Array<{ title: string; duration: string }> = journey?.outline_steps ?? [];
  const benefits: string[] = journey?.benefits ?? [];

  return (
    <>
      {/* AC-FR-E2-04-01: summary text card */}
      <SectionCard title="Program Ozeti">
        {journey?.description ? (
          <PText variant="bodyMedium" style={styles.paragraph}>
            {journey.description}
          </PText>
        ) : null}
        {isOffline && <PText style={styles.offlineCacheNote}>Onbellekteki icerik gosteriliyor.</PText>}
        <PCard style={styles.card}>
          <PCard.Title
            title="Ilerleme"
            subtitle={`${progressPct}% tamamlandi`}
            accessibilityLabel={`Ilerleme: %${progressPct} tamamlandi`}
          />
          <PCard.Content>
            <PProgressBar
              progress={progressPct / 100}
              style={styles.progress}
              accessibilityLabel={`Ilerleme: %${progressPct}`}
            />
          </PCard.Content>
          <PCard.Actions>
            <PButton
              mode="contained"
              disabled={isOffline}
              accessibilityLabel="Kaldigin yerden devam et"
              accessibilityHint="Programi son biraktigin noktadan devam eder"
              onPress={() =>
                navigation.navigate('Content', {
                  screen: 'ContentJourneyHome',
                  params: { id: JOURNEY_ID }
                })
              }
            >
              Kaldigin Yerden Devam Et
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      {/* AC-FR-E2-04-02: program outline steps */}
      {outlineSteps.length > 0 && (
        <SectionCard title="Program Akisi" actionLabel="Tumumunu Gor">
          {outlineSteps.map((step, index) => (
            <View key={step.title} style={styles.rowItem}>
              <View style={styles.rowHeader} accessibilityLabel={`Adim ${index + 1}: ${step.title}, ${step.duration}`}>
                <PText variant="titleSmall">{step.title}</PText>
                <PText variant="labelMedium" style={styles.stepDuration}>
                  {step.duration}
                </PText>
              </View>
              {index < outlineSteps.length - 1 ? <PDivider style={styles.divider} /> : null}
            </View>
          ))}
        </SectionCard>
      )}

      {/* Benefits + save */}
      {benefits.length > 0 && (
        <SectionCard title="Kazandirdiklari" actionLabel="Paylas">
          {benefits.map(b => (
            <PText key={b} variant="bodySmall" style={styles.benefitItem}>
              -- {b}
            </PText>
          ))}
          <PButton
            mode="outlined"
            style={styles.secondaryButton}
            disabled={isOffline}
            accessibilityLabel="Programi okunacaklara ekle"
            accessibilityHint="Programi kutuphane listenize ekler"
            onPress={() => navigation.navigate('Library')}
          >
            Programi Kaydet
          </PButton>
        </SectionCard>
      )}
    </>
  );
};

export const HomeVicdandanKaraktereDetailScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Vicdandan Karaktere" subtitle="Program hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Program Akisi">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Vicdandan Karaktere" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Program bulunamadi"
          description="Bu icerik su anda eriselebilir degil."
          actionLabel="Kesfe Don"
          icon="book-open-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Vicdandan Karaktere" subtitle="Bir sorun olustu">
        <StateMessage
          title="Program yuklenemedi"
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
      <ScreenLayout title="Vicdandan Karaktere" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <HomeVicdandanKaraktereContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Vicdandan Karaktere" subtitle="Deger odakli bir yolculuk">
      <HomeVicdandanKaraktereContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    paragraph: {
      marginBottom: spacing[1.5],
      lineHeight: 20
    },
    offlineCacheNote: {
      fontSize: fontSizes.sm,
      color: '#F59E0B',
      fontStyle: 'italic',
      marginBottom: spacing[1]
    },
    card: {
      marginTop: 4
    },
    progress: {
      marginTop: spacing[1],
      marginBottom: spacing[1.5],
      height: 8,
      borderRadius: radii.full
    },
    rowItem: {
      paddingVertical: spacing[1]
    },
    rowHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    stepDuration: {
      color: c.textSecondary
    },
    divider: {
      marginTop: spacing[1]
    },
    benefitItem: {
      color: c.textTertiary,
      marginBottom: 4,
      lineHeight: 20
    },
    secondaryButton: {
      marginTop: spacing[1.5],
      alignSelf: 'flex-start',
      minHeight: 48
    }
  });
}
