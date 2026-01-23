import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card, RadioButton, Text } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";
import { getPrimaryUser } from "../../data/mockSelectors";

const languages = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const ProfileLanguageContent = ({ isOffline }: { isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const currentLanguage = user?.language ?? "tr";

  return (
    <>
      <SectionCard title="Uygulama Dili" actionLabel="">
        <Text variant="bodySmall" style={styles.subtleText}>
          Seçimin cihazında çevrimdışı da saklanır.
        </Text>
        <RadioButton.Group value={currentLanguage} onValueChange={() => undefined}>
          {languages.map((lang) => (
            <Card key={lang.code} style={styles.card}>
              <Card.Content style={styles.row}>
                <RadioButton value={lang.code} disabled={isOffline} />
                <View>
                  <Text variant="bodyMedium">{lang.label}</Text>
                  <Text variant="bodySmall" style={styles.subtleText}>
                    {lang.code.toUpperCase()}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </RadioButton.Group>
        <Button mode="contained" disabled={isOffline}>
          Kaydet
        </Button>
      </SectionCard>
    </>
  );
};

export const ProfileLanguageScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Dil" subtitle="Dil hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Dil" subtitle="Dil seçenekleri">
        <StateMessage
          title="Dil bulunamadı"
          description="Dil seçenekleri şu anda yüklenemiyor."
          actionLabel="Tekrar Dene"
          icon="translate"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Dil" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Dil yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Dil" subtitle="Önbellekteki dil">
        <OfflineNotice />
        <ProfileLanguageContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Dil" subtitle="Dilini seç">
      <ProfileLanguageContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  subtleText: {
    opacity: 0.7,
    marginBottom: 8,
  },
  card: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
