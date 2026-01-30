import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const onboardingScreens = [
  {
    emoji: "🎯",
    title: "Hedeflerinize Ulaşın",
    description: "Profesyonel coaching desteğiyle potansiyelinizi keşfedin ve hayallerinizi gerçekleştirin.",
  },
  {
    emoji: "📚",
    title: "Kişisel Gelişim",
    description: "Günlük içerikler ve yolculuklarla kendinizi geliştirin, yeni beceriler kazanın.",
  },
  {
    emoji: "📊",
    title: "İlerlemenizi Takip Edin",
    description: "Gelişiminizi görselleştirin, başarılarınızı kutlayın ve motivasyonunuzu koruyun.",
  },
];

export const OnboardingCarouselScreen = () => {
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
        animated: true,
      });
    } else {
      // Final screen - navigate to Login
      navigation.navigate("AuthLogin");
    }
  };

  const handleSkip = () => {
    navigation.navigate("AuthLogin");
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
              <Text style={styles.emoji}>{screen.emoji}</Text>
              <Text style={styles.title}>{screen.title}</Text>
              <Text style={styles.description}>{screen.description}</Text>
            </View>
            <View style={styles.footer}>
              <View style={styles.progressContainer}>
                {onboardingScreens.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.progressDot,
                      i === currentPage && styles.progressDotActive,
                    ]}
                  />
                ))}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  mode="outlined"
                  onPress={handleSkip}
                  style={styles.skipButton}
                >
                  Atla
                </Button>
                <Button
                  mode="contained"
                  onPress={handleNext}
                  style={styles.nextButton}
                >
                  {index === onboardingScreens.length - 1 ? "Başla" : "İleri"}
                </Button>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    flex: 1,
  },
  screen: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  emoji: {
    fontSize: 128,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "System",
  },
  description: {
    fontSize: 16,
    color: "#525252",
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 320,
  },
  footer: {
    paddingBottom: 32,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 32,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D4D4D4",
  },
  progressDotActive: {
    width: 32,
    backgroundColor: "#00B4D8",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
});
