import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PCard, PIconButton, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };
type FontSizeKey = 'small' | 'medium' | 'large';

const FONT_SIZES: Record<FontSizeKey, number> = { small: 13, medium: 15, large: 18 };
const AUDIO_SPEEDS = ['0.75x', '1x', '1.25x'];
const FONT_ORDER: FontSizeKey[] = ['small', 'medium', 'large'];

const ContentReadingContent = ({ isOffline, id }: { isOffline?: boolean; id?: string }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const [readingProgress, setReadingProgress] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [fontSizeKey, setFontSizeKey] = useState<FontSizeKey>('medium');

  const now = new Date();
  const isPastWarning = now.getHours() >= 23;
  const fontSize = FONT_SIZES[fontSizeKey];

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const scrollable = contentSize.height - layoutMeasurement.height;
    if (scrollable > 0) {
      setReadingProgress(Math.min(1, contentOffset.y / scrollable));
    }
  }, []);

  const cycleFontSize = useCallback(() => {
    setFontSizeKey(prev => {
      const i = FONT_ORDER.indexOf(prev);
      return FONT_ORDER[(i + 1) % FONT_ORDER.length];
    });
  }, []);

  const progressPct = `${Math.round(readingProgress * 100)}%` as const;

  return (
    <View style={styles.wrapper}>
      {/* AC-FR-E5-01-02: Reading progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: progressPct }]} />
      </View>

      {/* AC-FR-E5-01-01: Sticky header with day number + deadline chip */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PIconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <View style={styles.headerCenter}>
            <PText style={styles.headerTitle}>Gun 1: Otomatik Dusunceler</PText>
            <PText style={styles.headerSubtitle}>Bolum 1 - Paket 3</PText>
          </View>
          {/* AC-FR-E5-01-04: Font size accessibility toggle */}
          <PIconButton icon="format-size" onPress={cycleFontSize} />
        </View>
        <View style={styles.headerMetaRow}>
          <PText style={[styles.chip, styles.chipReading]}>Okuma</PText>
          <PText style={styles.headerMeta}>~12 dakika</PText>
          <PText style={[styles.chip, isPastWarning ? styles.chipWarning : styles.chipDeadline]}>
            {isPastWarning ? 'Son teslim: 23:59' : 'Teslim: 23:59'}
          </PText>
        </View>
      </View>

      {/* AC-FR-E5-02-01,02,03: Audio playback bar with speed selector */}
      <View style={styles.audioBar}>
        <PIconButton
          icon={audioPlaying ? 'pause-circle' : 'play-circle'}
          onPress={() => !isOffline && setAudioPlaying(p => !p)}
        />
        <PText style={styles.audioLabel}>{audioPlaying ? 'Dinleniyor...' : 'Sesli Dinle'}</PText>
        <View style={styles.speedRow}>
          {AUDIO_SPEEDS.map((s, i) => (
            <PButton
              key={s}
              mode={speedIndex === i ? 'contained' : 'outlined'}
              compact
              disabled={isOffline}
              onPress={() => setSpeedIndex(i)}
              style={styles.speedBtn}
            >
              {s}
            </PButton>
          ))}
        </View>
      </View>

      {/* AC-FR-E5-03-01,02,03: Highlight / note / favorite toolbar */}
      <View style={styles.highlightBar}>
        <PText style={styles.highlightBarLabel}>Metin:</PText>
        <PButton mode="outlined" compact disabled={isOffline} style={styles.hlBtn}>
          Vurgula
        </PButton>
        <PButton mode="outlined" compact disabled={isOffline} style={styles.hlBtn}>
          Not Ekle
        </PButton>
        <PButton mode="outlined" compact disabled={isOffline} style={styles.hlBtn}>
          Favoriye Kaydet
        </PButton>
      </View>

      {/* Scrollable reading body */}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.page}
        style={styles.scroll}
      >
        <View style={styles.body}>
          <PText style={[styles.bodyTitle, { fontSize: fontSize + 7 }]}>Otomatik Dusunceler</PText>
          <PText style={[styles.bodyParagraph, { fontSize, lineHeight: fontSize * 1.75 }]}>
            Zihnimiz her gun binlerce dusunce uretir. Bunlarin cogu otomatiktir ve farkinda bile olmadigimiz hizda akar
            gider. Bu <PText style={[styles.bodyHighlight, { fontSize }]}>otomatik dusunceler</PText>, yasadigimiz
            deneyimleri yorumlamamizi saglar.
          </PText>
          <PText style={[styles.bodyParagraph, { fontSize, lineHeight: fontSize * 1.75 }]}>
            Ancak bu dusuncelerin hepsi gercegi yansitmaz. Bazen gecmis deneyimlerimize, korkularimiza ya da cevremizden
            aldigimiz mesajlara dayanir.
          </PText>

          <PCard style={styles.calloutCard}>
            <PText style={styles.calloutTitle}>Ornek Otomatik Dusunceler</PText>
            <PText style={styles.calloutItem}>- "Basaramayacagim."</PText>
            <PText style={styles.calloutItem}>- "Herkes beni yargiluyor."</PText>
            <PText style={styles.calloutItem}>- "Ben yeterince iyi degilim."</PText>
          </PCard>

          <PText style={[styles.bodyParagraph, { fontSize, lineHeight: fontSize * 1.75 }]}>
            Bu dusunceleri fark ettigimizde, onlari sorgulamaya ve daha gercekci alternatifler bulmaya baslayabiliriz.
          </PText>
        </View>

        <View style={styles.footer}>
          <PButton
            mode="contained"
            disabled={isOffline}
            style={styles.footerButton}
            onPress={() =>
              navigation.navigate('ContentExercise', {
                id: id ?? 'c1c1c1c1-0000-0000-0000-000000000102'
              })
            }
          >
            Uygulamaya Gec
          </PButton>
        </View>
      </ScrollView>
    </View>
  );
};

export const ContentReadingScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const state = resolveScreenState(route);
  const id = route?.params?.id;

  if (state === 'loading') {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={120} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === 'empty') {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Bolum bulunamadi"
            description="Okuma icerigi su anda erisilebilir degil."
            actionLabel="Geri Don"
            icon="book-open-page-variant"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === 'error') {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Okuma yuklenemedi"
            description="Baglantini kontrol edip tekrar dene."
            actionLabel="Tekrar Dene"
            icon="alert-circle-outline"
            tone="error"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === 'offline') {
    return (
      <SafeAreaView style={styles.root}>
        <OfflineNotice />
        <ContentReadingContent isOffline id={id} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ContentReadingContent id={id} />
    </SafeAreaView>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: palette.white
    },
    wrapper: {
      flex: 1
    },
    scroll: {
      flex: 1
    },
    page: {
      paddingBottom: 32
    },
    // Progress bar
    progressTrack: {
      height: 4,
      backgroundColor: c.outlineVariant
    },
    progressFill: {
      height: 4,
      backgroundColor: '#6B46C1'
    },
    // Header
    header: {
      backgroundColor: palette.white,
      paddingHorizontal: spacing[2.5],
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: c.outlineVariant
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing[1]
    },
    headerTitle: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: c.textBrand
    },
    headerSubtitle: {
      fontSize: fontSizes.sm,
      color: c.textTertiary,
      marginTop: 2
    },
    headerMetaRow: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    chip: {
      fontSize: 10,
      fontWeight: fontWeights.semiBold,
      paddingHorizontal: spacing[1],
      paddingVertical: 3,
      borderRadius: radii.md,
      overflow: 'hidden'
    },
    chipReading: {
      backgroundColor: '#DBEAFE',
      color: '#1D4ED8'
    },
    chipDeadline: {
      backgroundColor: '#DCFCE7',
      color: '#15803D'
    },
    chipWarning: {
      backgroundColor: c.warningContainer,
      color: '#A16207'
    },
    headerMeta: {
      fontSize: fontSizes.sm,
      color: c.textTertiary
    },
    // Audio bar
    audioBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing[1.5],
      paddingVertical: 6,
      backgroundColor: '#F5F3FF',
      borderBottomWidth: 1,
      borderBottomColor: c.outlineVariant,
      gap: spacing[1]
    },
    audioLabel: {
      fontSize: fontSizes.base,
      color: c.textBrand,
      flex: 1
    },
    speedRow: {
      flexDirection: 'row',
      gap: 4
    },
    speedBtn: {
      minWidth: 44
    },
    // Highlight toolbar
    highlightBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing[1.5],
      paddingVertical: 6,
      gap: 6,
      backgroundColor: '#FFFBEB',
      borderBottomWidth: 1,
      borderBottomColor: c.outlineVariant
    },
    highlightBarLabel: {
      fontSize: fontSizes.sm,
      color: c.textTertiary
    },
    hlBtn: {
      minWidth: 60
    },
    // Body
    body: {
      paddingHorizontal: spacing[3],
      paddingTop: 20
    },
    bodyTitle: {
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      marginBottom: spacing[2]
    },
    bodyParagraph: {
      color: c.textPrimary,
      marginBottom: spacing[2],
      textAlign: 'justify'
    },
    bodyHighlight: {
      backgroundColor: '#FDE68A',
      color: '#111827'
    },
    calloutCard: {
      padding: spacing[2],
      borderRadius: radii.xl,
      backgroundColor: '#DBEAFE',
      borderLeftWidth: 4,
      borderLeftColor: '#1D4ED8',
      marginVertical: 12
    },
    calloutTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: '#1D4ED8',
      marginBottom: spacing[1]
    },
    calloutItem: {
      fontSize: fontSizes.lg,
      color: '#1F2937',
      marginBottom: 6
    },
    // Footer
    footer: {
      paddingHorizontal: spacing[3],
      paddingTop: 16
    },
    footerButton: {
      width: '100%'
    }
  });
}
