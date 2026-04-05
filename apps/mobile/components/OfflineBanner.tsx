import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Icon, useTheme } from "react-native-paper";

import { useAppSelector } from "../state/hooks";
import { selectIsOnline } from "../state/selectors";
import { PSurface, PText } from "./index";

export const OfflineBanner = () => {
  const theme = useTheme();
  const isOnline = useAppSelector(selectIsOnline);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-8)).current;

  useEffect(() => {
    if (!isOnline) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 18,
          stiffness: 180,
        }),
      ]).start();
    } else {
      opacity.setValue(0);
      translateY.setValue(-8);
    }
  }, [isOnline, opacity, translateY]);

  if (isOnline) return null;

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <PSurface
        elevation={0}
        style={[
          styles.banner,
          { backgroundColor: theme.colors.errorContainer, borderRadius: theme.roundness * 2 },
        ]}
        accessibilityRole="alert"
        accessibilityLabel="Çevrimdışısınız. İnternet bağlantısı yok. Önbellekteki içerikler gösteriliyor."
        accessibilityLiveRegion="assertive"
      >
        <Icon source="wifi-off" size={20} color={theme.colors.onErrorContainer} />
        <View style={styles.textGroup}>
          <PText variant="labelLarge" style={{ color: theme.colors.onErrorContainer }}>
            Çevrimdışısınız
          </PText>
          <PText variant="bodySmall" style={{ color: theme.colors.onErrorContainer }}>
            İnternet bağlantısı yok. Önbellekteki içerikler gösteriliyor.
          </PText>
        </View>
      </PSurface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  textGroup: { flex: 1, gap: 2 },
});
