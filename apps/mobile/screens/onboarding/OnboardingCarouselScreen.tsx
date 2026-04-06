import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PButton, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const onboardingScreens = [
  {
    emoji: '🎯',
    title: 'Hedeflerinize Ulaşın',
    description: 'Profesyonel coaching desteğiyle potansiyelinizi keşfedin ve hayallerinizi gerçekleştirin.'
  },
  {
    emoji: '📚',
    title: 'Kişisel Gelişim',
    description: 'Günlük içerikler ve yolculuklarla kendinizi geliştirin, yeni beceriler kazanın.'
  },
  {
    emoji: '📊',
    title: 'İlerlemenizi Takip Edin',
    description: 'Gelişiminizi görselleştirin, başarılarınızı kutlayın ve motivasyonunuzu koruyun.'
  }
];

export const OnboardingCarouselScreen = () => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < onboardingScreens.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentPage + 1) * SCREEN_WIDTH,
        animated: true
      });
    } else {
      // Final screen - navigate to Language Select first (FR-E1-01)
      navigation.navigate('OnboardingLanguageSelect');
    }
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingLanguageSelect');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingScreens.map((screen, index) => (
          <View key={index} style={styles.screen}>
            <View style={styles.content}>
              <PText style={styles.emoji}>{screen.emoji}</PText>
              <PText style={styles.title}>{screen.title}</PText>
              <PText style={styles.description}>{screen.description}</PText>
            </View>
            <View style={styles.footer}>
              <View style={styles.progressContainer}>
                {onboardingScreens.map((_, i) => (
                  <View key={i} style={[styles.progressDot, i === currentPage && styles.progressDotActive]} />
                ))}
              </View>
              <View style={styles.buttonContainer}>
                <PButton mode="outlined" onPress={handleSkip} style={styles.skipButton}>
                  Atla
                </PButton>
                <PButton mode="contained" onPress={handleNext} style={styles.nextButton}>
                  {index === onboardingScreens.length - 1 ? 'Başla' : 'İleri'}
                </PButton>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background
    },
    scrollView: {
      flex: 1
    },
    screen: {
      width: SCREEN_WIDTH,
      flex: 1,
      paddingHorizontal: spacing[4],
      paddingTop: 48,
      paddingBottom: 32,
      justifyContent: 'space-between'
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    },
    emoji: {
      fontSize: 128,
      marginBottom: spacing[4]
    },
    title: {
      fontSize: fontSizes['9xl'],
      fontWeight: fontWeights.extraBold,
      color: c.textBrand,
      marginBottom: spacing[2],
      textAlign: 'center',
      fontFamily: 'System'
    },
    description: {
      fontSize: fontSizes['2xl'],
      color: c.textSecondary,
      lineHeight: 24,
      textAlign: 'center',
      maxWidth: 320
    },
    footer: {
      paddingBottom: 32
    },
    progressContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: spacing[1],
      marginBottom: spacing[4]
    },
    progressDot: {
      width: 8,
      height: 8,
      borderRadius: radii.sm,
      backgroundColor: c.outline
    },
    progressDotActive: {
      width: 32,
      backgroundColor: c.primary
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: spacing[2]
    },
    skipButton: {
      flex: 1
    },
    nextButton: {
      flex: 1
    }
  });
}
