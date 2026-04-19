// AC-FR-E16-01-01: past conversations + current session in one list
// AC-FR-E16-01-02: free-text question entry
// AC-FR-E16-01-03: quick-suggestion chips → single tap to chat box
// AC-FR-E16-01-04: "approved sources only" notice always visible
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  PActivityIndicator,
  PButton,
  PChip,
  PDivider,
  PIconButton,
  PText,
  PTextInput,
  PTextInputIcon
} from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getDiscoverAIAssistantHistory, getDiscoverAIAssistantQuickSuggestions } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';

// ---------------------------------------------------------------------------
// Content — shared by ready / empty / offline states
// ---------------------------------------------------------------------------
const DiscoverAIAssistantIntroContent = ({
  isOffline,
  isEmptyHistory
}: {
  isOffline?: boolean;
  isEmptyHistory?: boolean;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();
  const [question, setQuestion] = useState(''); // AC-FR-E16-01-02
  const history = getDiscoverAIAssistantHistory();
  const quickSuggestions = getDiscoverAIAssistantQuickSuggestions();

  const handleAsk = () => {
    if (isOffline || question.trim().length === 0) return;
    navigation.navigate('DiscoverAIAssistantQuestions', { question: question.trim() });
  };

  const handleSuggestion = (text: string) => {
    if (isOffline) return;
    setQuestion(text); // AC-FR-E16-01-03
  };

  const handleHistoryTap = (item: (typeof history)[number]) => {
    if (isOffline) return;
    navigation.navigate('DiscoverAIAssistantQuestions', { question: item.question });
  };

  return (
    <View>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroIconWrap} accessibilityElementsHidden>
          <PText style={styles.heroIcon}>✦</PText>
        </View>
        <PText style={styles.heroTitle} accessibilityRole="header">
          AI Asistani
        </PText>
        <PText style={styles.heroSubtitle}>Hedeflerine gore kaynaklardan derlenen kisisel cevaplar al.</PText>
      </View>

      {/* AC-FR-E16-01-04: approved-source trust badge — always visible */}
      <View
        style={styles.trustBadge}
        accessibilityLabel="Yanitlar yalnizca onaylanmis icerik kaynaklarindan olusturulur"
        accessibilityRole="text"
      >
        <PText style={styles.trustBadgeCheck} accessibilityElementsHidden>
          ✓
        </PText>
        <PText style={styles.trustBadgeText}>Yanitlar yalnizca onaylanmis kaynaklardan olusturulur</PText>
      </View>

      {/* AC-FR-E16-01-02: free-text input */}
      <PTextInput
        mode="outlined"
        placeholder="Ne sorusturmak istersin?"
        value={question}
        onChangeText={setQuestion}
        left={<PTextInputIcon icon="magnify" />}
        right={question.length > 0 ? <PTextInputIcon icon="close-circle" onPress={() => setQuestion('')} /> : undefined}
        style={styles.searchInput}
        outlineStyle={styles.searchOutline}
        editable={!isOffline}
        returnKeyType="search"
        onSubmitEditing={handleAsk}
        accessibilityLabel="Soru yaz"
        accessibilityHint="Asistana soru sormak icin yazin ve Sor butonuna basin"
        maxLength={200}
      />

      {/* AC-FR-E16-01-03: quick suggestion chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
        style={styles.chipsScroll}
        accessibilityLabel="Hizli konu onerileri"
      >
        {quickSuggestions.map(s => (
          <PChip
            key={s}
            onPress={() => handleSuggestion(s)}
            compact
            disabled={isOffline}
            accessibilityLabel={`Oneri: ${s}`}
            accessibilityHint="Bu konuyu soruya eklemek icin dokun"
            style={[styles.chip, question.trim() === s && styles.chipActive]}
          >
            {s}
          </PChip>
        ))}
      </ScrollView>

      <PButton
        mode="contained"
        disabled={isOffline || question.trim().length === 0}
        onPress={handleAsk}
        style={styles.askButton}
        accessibilityLabel="Soruyu asistana gonder"
        accessibilityHint="Girdiginiz soruya uygun icerik onerileri olusturur"
      >
        Sor
      </PButton>

      {/* AC-FR-E16-01-01: conversation history */}
      {!isEmptyHistory && history.length > 0 ? (
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <PText style={styles.historyTitle}>Son Konusmalar</PText>
          </View>
          {history.map((item, idx) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={styles.historyItem}
                onPress={() => handleHistoryTap(item)}
                disabled={isOffline}
                accessibilityRole="button"
                accessibilityLabel={`Onceki sohbet: ${item.question}`}
                accessibilityHint="Bu soruyu tekrar sormak icin dokun"
                activeOpacity={0.7}
              >
                <View style={styles.historyIconWrap}>
                  <PIconButton
                    icon="chat-processing-outline"
                    size={18}
                    style={styles.historyIconBtn}
                    accessibilityElementsHidden
                  />
                </View>
                <View style={styles.historyInfo}>
                  <PText style={styles.historyQuestion} numberOfLines={1}>
                    {item.question}
                  </PText>
                  <PText style={styles.historyPreview} numberOfLines={2}>
                    {item.preview}
                  </PText>
                  <PText style={styles.historyMeta}>
                    {item.time} · {item.sourceCount} kaynak
                  </PText>
                </View>
                <PIconButton icon="chevron-right" size={18} accessibilityLabel="" accessibilityElementsHidden />
              </TouchableOpacity>
              {idx < history.length - 1 && <PDivider />}
            </React.Fragment>
          ))}
        </View>
      ) : (
        // AC-FR-E16-01-01 empty variant — inline banner
        <View
          style={styles.emptyHistoryBanner}
          accessibilityRole="text"
          accessibilityLabel="Henuz konusma gecmisi yok. Ilk sorunuzu sorun."
        >
          <PText style={styles.emptyHistoryTitle}>Ilk sorunuzu sorun</PText>
          <PText style={styles.emptyHistoryText}>
            Konusma gecmisiniz burada gorunecek. Yukaridan bir soru yazin ya da oneri chiplerinden birini secin.
          </PText>
        </View>
      )}
    </View>
  );
};

// ---------------------------------------------------------------------------
// Screen shell — all states
// ---------------------------------------------------------------------------
export const DiscoverAIAssistantIntroScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);
  const navigation = useNavigation<any>();

  const insightsAction = (
    <PIconButton
      icon="lightbulb-outline"
      size={24}
      onPress={() => navigation.navigate('DiscoverAssistantInsights')}
      accessibilityLabel="AI Icgorulerimi Gor"
      accessibilityHint="Kisisel ilerleme icgoruleri ekranini acar"
    />
  );

  if (state === 'loading') {
    return (
      <ScreenLayout title="AI Asistani">
        <SkeletonBlock height={72} />
        <SkeletonBlock height={48} />
        <SkeletonBlock height={40} />
        <SkeletonBlock height={120} />
        <PActivityIndicator animating style={{ marginTop: spacing[2] }} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="AI Asistani" rightAction={insightsAction}>
        <DiscoverAIAssistantIntroContent isEmptyHistory />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="AI Asistani">
        <StateMessage
          title="Asistan yuklenemedi"
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
      <ScreenLayout title="AI Asistani" rightAction={insightsAction}>
        <OfflineNotice />
        <DiscoverAIAssistantIntroContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="AI Asistani" rightAction={insightsAction}>
      <DiscoverAIAssistantIntroContent />
    </ScreenLayout>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    hero: {
      alignItems: 'center',
      paddingVertical: spacing[3],
      marginBottom: spacing[2]
    },
    heroIconWrap: {
      width: 64,
      height: 64,
      borderRadius: radii.full,
      backgroundColor: c.primaryContainer,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing[1.5]
    },
    heroIcon: {
      fontSize: fontSizes['5xl'],
      color: c.primary,
      lineHeight: 48
    },
    heroTitle: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      textAlign: 'center',
      marginBottom: 6
    },
    heroSubtitle: {
      fontSize: fontSizes.xl,
      color: c.textSecondary,
      textAlign: 'center',
      maxWidth: 280
    },
    // AC-FR-E16-01-04: trust badge
    trustBadge: {
      backgroundColor: c.tertiaryContainer,
      borderRadius: radii.lg,
      paddingHorizontal: spacing[1.5],
      paddingVertical: 10,
      marginBottom: spacing[2],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    },
    trustBadgeCheck: {
      fontSize: fontSizes.md,
      color: c.onTertiaryContainer,
      fontWeight: fontWeights.bold
    },
    trustBadgeText: {
      fontSize: fontSizes.md,
      color: c.onTertiaryContainer,
      fontWeight: fontWeights.semiBold,
      textAlign: 'center',
      flexShrink: 1
    },
    searchInput: {
      backgroundColor: c.surface,
      marginBottom: spacing[1.5]
    },
    searchOutline: {
      borderRadius: radii.xl,
      borderWidth: 2,
      borderColor: c.outline
    },
    chipsScroll: {
      marginBottom: spacing[2]
    },
    chipsRow: {
      gap: spacing[1],
      paddingHorizontal: 2,
      paddingBottom: 4
    },
    chip: {
      backgroundColor: c.surfaceVariant
    },
    chipActive: {
      backgroundColor: c.primaryContainer
    },
    askButton: {
      marginBottom: spacing[3]
    },
    // History
    historySection: {
      backgroundColor: c.surface,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: c.outlineVariant,
      overflow: 'hidden'
    },
    historyHeader: {
      paddingHorizontal: spacing[2],
      paddingTop: spacing[1.5],
      paddingBottom: spacing[1]
    },
    historyTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary
    },
    historyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1.5],
      gap: spacing[1.5],
      minHeight: 56
    },
    historyIconWrap: {
      width: 40,
      height: 40,
      borderRadius: radii.full,
      backgroundColor: c.surfaceVariant,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    historyIconBtn: {
      margin: 0
    },
    historyInfo: {
      flex: 1
    },
    historyQuestion: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary,
      marginBottom: 2
    },
    historyPreview: {
      fontSize: fontSizes.base,
      color: c.textSecondary,
      marginBottom: 2,
      lineHeight: 16
    },
    historyMeta: {
      fontSize: fontSizes.sm,
      color: c.textTertiary
    },
    // Empty history inline banner
    emptyHistoryBanner: {
      backgroundColor: c.surfaceVariant,
      borderRadius: radii.xl,
      paddingHorizontal: spacing[2.5],
      paddingVertical: spacing[2.5],
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.outlineVariant
    },
    emptyHistoryTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 6,
      textAlign: 'center'
    },
    emptyHistoryText: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      textAlign: 'center',
      lineHeight: 22
    }
  });
}
