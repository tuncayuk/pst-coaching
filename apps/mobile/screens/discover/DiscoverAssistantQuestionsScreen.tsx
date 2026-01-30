import React from "react";
import { StyleSheet, View } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PChip, PTextInput } from "../../components";


const goalOptions = ["Sınır koyma", "Öz şefkat", "Stres yönetimi", "İletişim"];
const durationOptions = ["10-20 dk", "30-45 dk", "60+ dk"];
const formatOptions = ["Yolculuk", "Atölye", "Modül", "e-Kitap"];

const DiscoverAssistantQuestionsContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Hedefini Seç">
        <View style={styles.chipRow}>
          {goalOptions.map((option) => (
            <PChip key={option} style={styles.chip} disabled={isOffline}>
              {option}
            </PChip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Süre Tercihin">
        <View style={styles.chipRow}>
          {durationOptions.map((option) => (
            <PChip key={option} style={styles.chip} disabled={isOffline}>
              {option}
            </PChip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Format Tercihi" actionLabel="Opsiyonel">
        <View style={styles.chipRow}>
          {formatOptions.map((option) => (
            <PChip key={option} style={styles.chip} disabled={isOffline}>
              {option}
            </PChip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Notun">
        <PTextInput
          label="Özel bir ihtiyaç var mı?"
          mode="outlined"
          placeholder="Örn: yoğun bir haftam var"
          editable={!isOffline}
        />
        <PButton mode="contained" style={styles.primaryButton} disabled={isOffline}>
          Önerileri Gör
        </PButton>
      </SectionCard>
    </>
  );
};

export const DiscoverAssistantQuestionsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="İçerik Asistanı Soruları" subtitle="Sorular hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Seçimler">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="İçerik Asistanı Soruları" subtitle="Soru bulunamadı">
        <StateMessage
          title="Sorular bulunamadı"
          description="Şu anda soru listesi yüklenemiyor."
          actionLabel="Tekrar Dene"
          icon="help-circle-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="İçerik Asistanı Soruları" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Sorular yüklenemedi"
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
      <ScreenLayout title="İçerik Asistanı Soruları" subtitle="Önbellekteki sorular">
        <OfflineNotice />
        <DiscoverAssistantQuestionsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="İçerik Asistanı Soruları" subtitle="Soruları yanıtla">
      <DiscoverAssistantQuestionsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
