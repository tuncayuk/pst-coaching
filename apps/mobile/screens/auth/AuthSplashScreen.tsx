import React, { useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const AuthSplashScreen = () => {
  const navigation = useNavigation<any>();
  const pulseAnim1 = React.useRef(new Animated.Value(0.4)).current;
  const pulseAnim2 = React.useRef(new Animated.Value(0.4)).current;
  const pulseAnim3 = React.useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Auto-transition after 2-3 seconds
    const timer = setTimeout(() => {
      // Check if user has seen onboarding before
      // For now, always route to onboarding (first time users)
      // TODO: Check AsyncStorage for onboarding completion
      navigation.replace("OnboardingCarousel");
    }, 3000);

    // Pulse animation for loading dots
    const createPulse = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.4,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const pulse1 = createPulse(pulseAnim1, 0);
    const pulse2 = createPulse(pulseAnim2, 200);
    const pulse3 = createPulse(pulseAnim3, 400);

    pulse1.start();
    pulse2.start();
    pulse3.start();

    return () => {
      clearTimeout(timer);
      pulse1.stop();
      pulse2.stop();
      pulse3.stop();
    };
  }, [navigation, pulseAnim1, pulseAnim2, pulseAnim3]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo - using text for now, can be replaced with Image component */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>PST</Text>
          <Text style={styles.logoSubtext}>Coaching</Text>
        </View>
        <Text style={styles.tagline}>Profesyonel Coaching Yolculuğunuz</Text>
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.dot, { opacity: pulseAnim1 }]} />
          <Animated.View style={[styles.dot, { opacity: pulseAnim2 }]} />
          <Animated.View style={[styles.dot, { opacity: pulseAnim3 }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Gradient background - using primary color, can be enhanced with LinearGradient if needed
    backgroundColor: "#00B4D8", // Primary color from mockup
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  logoText: {
    fontSize: 64,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#FFFFFF",
  },
  logoSubtext: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 8,
    color: "rgba(255,255,255,0.95)",
  },
  tagline: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 28,
    marginBottom: 64,
    color: "rgba(255,255,255,0.95)",
  },
  loadingContainer: {
    flexDirection: "row",
    gap: 8,
    position: "absolute",
    bottom: 64,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});
