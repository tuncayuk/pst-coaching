import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PText, PTextInput } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getCommentEmotionTags } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

type RouteParams = {
  state?: ScreenState;
  contentItemId?: string;
};

const ContentCommentContent = ({ isOffline, contentItemId }: { isOffline?: boolean; contentItemId?: string }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const emotionTags = getCommentEmotionTags();

  const navigation = useNavigation<any>();
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  // AC-FR-E5-04-04: Warn after 23:00
  const isLateWarning = hour >= 23;
  // AC-FR-E5-04-07: Block submit at 23:59
  const isAfterDeadline = hour === 23 && minute >= 59;

  const wordCount = [...answer1.trim().split(/\s+/), ...answer2.trim().split(/\s+/)].filter(Boolean).length;

  // AC-FR-E5-04-02: Auto-save draft indicator after 1.5s of inactivity
  const triggerAutoSave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2000);
    }, 1500);
  }, []);

  const handleAnswer1 = useCallback(
    (v: string) => {
      setAnswer1(v);
      triggerAutoSave();
    },
    [triggerAutoSave]
  );

  const handleAnswer2 = useCallback(
    (v: string) => {
      setAnswer2(v);
      triggerAutoSave();
    },
    [triggerAutoSave]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // AC-FR-E5-04-01: Both answers required before proceeding; deadline not passed
  const canProceed = answer1.trim().length > 0 && answer2.trim().length > 0 && !isAfterDeadline;

  return (
    <>
      {/* AC-FR-E5-04-04: Late warning banner at 23:00 */}
      {isLateWarning && (
        <View style={styles.warningBanner}>
          <PText style={styles.warningText}>Teslim suresi dolmak uzere! Yorumunu 23:59&apos;a kadar gonder.</PText>
        </View>
      )}

      {/* AC-FR-E5-04-02: Draft auto-save indicator */}
      {draftSaved && (
        <View style={styles.draftBanner}>
          <PText style={styles.draftText}>Taslak kaydedildi</PText>
        </View>
      )}

      <SectionCard title="Yansitma Sorulari">
        <PText variant="bodySmall">Bu bolum seni nasil etkiledi?</PText>
        <PTextInput
          mode="outlined"
          placeholder="Dusuncelerini yaz"
          style={styles.input}
          multiline
          numberOfLines={3}
          value={answer1}
          onChangeText={handleAnswer1}
          editable={!isOffline}
        />
        <PText variant="bodySmall">Gunluk hayatina nasil tasiyabilirsin?</PText>
        <PTextInput
          mode="outlined"
          placeholder="Ornekler paylas"
          style={styles.input}
          multiline
          numberOfLines={3}
          value={answer2}
          onChangeText={handleAnswer2}
          editable={!isOffline}
        />
        {/* AC-FR-E5-04-03: Word counter */}
        <View style={styles.wordCountRow}>
          <PText style={styles.wordCount}>{wordCount} kelime</PText>
        </View>
      </SectionCard>

      <SectionCard title="Duygu Sec">
        <View style={styles.chipRow}>
          {emotionTags.map(tag => (
            <PChip
              key={tag}
              selected={selectedEmotion === tag}
              style={styles.chip}
              disabled={isOffline}
              onPress={() => setSelectedEmotion(selectedEmotion === tag ? null : tag)}
            >
              {tag}
            </PChip>
          ))}
        </View>
        {/* AC-FR-E5-04-05: Navigate to preview with answers */}
        <PButton
          mode="contained"
          disabled={isOffline || !canProceed}
          onPress={() =>
            navigation.navigate('ContentCommentPreview', {
              contentItemId: contentItemId ?? '',
              answer1,
              answer2,
              emotion: selectedEmotion ?? ''
            })
          }
        >
          Onizlemeye Gec
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentCommentScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const contentItemId = route?.params?.contentItemId;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Yorum" subtitle="Yorum hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Sorular">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Yorum" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Yorum sablonu yok"
          description="Henuz yorum icin soru hazirlanmadi."
          actionLabel="Iceriye Don"
          icon="comment-text-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Yorum" subtitle="Bir sorun olustu">
        <StateMessage
          title="Yorum alani yuklenemedi"
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
      <ScreenLayout title="Yorum" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentCommentContent isOffline contentItemId={contentItemId} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yorum" subtitle="Yorumunu paylas">
      <ContentCommentContent contentItemId={contentItemId} />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    warningBanner: {
      backgroundColor: c.warningContainer,
      paddingHorizontal: spacing[2],
      paddingVertical: 10,
      borderLeftWidth: 4,
      borderLeftColor: '#CA8A04',
      marginBottom: 4
    },
    warningText: {
      fontSize: fontSizes.md,
      color: '#A16207',
      fontWeight: fontWeights.semiBold
    },
    draftBanner: {
      backgroundColor: '#DCFCE7',
      paddingHorizontal: spacing[2],
      paddingVertical: 6,
      borderLeftWidth: 4,
      borderLeftColor: c.success,
      marginBottom: 4
    },
    draftText: {
      fontSize: fontSizes.base,
      color: '#15803D',
      fontWeight: fontWeights.semiBold
    },
    input: {
      marginTop: spacing[1],
      marginBottom: 4
    },
    wordCountRow: {
      alignItems: 'flex-end',
      marginBottom: spacing[1]
    },
    wordCount: {
      fontSize: fontSizes.sm,
      color: c.textTertiary
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: spacing[1.5]
    },
    chip: {
      marginRight: 8,
      marginBottom: spacing[1]
    }
  });
}
