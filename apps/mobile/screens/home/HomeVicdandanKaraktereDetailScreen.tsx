import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PDivider, PProgressBar, PText } from "../../components";

const outlineSteps = [
  { title: "Vicdani Tanimak", duration: "12 dk" },
  { title: "Sefkatli Sinirlar", duration: "18 dk" },
  { title: "Gunluk Uygulama", duration: "10 dk" },
];

const HomeVicdandanKaraktereContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <>
      {/* AC-FR-E2-04-01: summary text card */}
      <SectionCard title="Program Ozeti">
        <PText variant="bodyMedium" style={styles.paragraph}>
          Vicdandan Karaktere programi, ic sesini guclendirek degerlerinle uyumlu kararlar
          almani destekler.
        </PText>
        {/* AC-FR-E2-04-03: offline -- served from cache */}
        {isOffline && (
          <PText style={styles.offlineCacheNote}>
            Onbellekteki icerik gosteriliyor.
          </PText>
        )}
        <PCard style={styles.card}>
          <PCard.Title
            title="Ilerleme"
            subtitle="3/8 bolum tamamlandi"
            accessibilityLabel="Ilerleme: 3 bolumden 8 i tamamlandi"
          />
          <PCard.Content>
            <PProgressBar
              progress={0.38}
              style={styles.progress}
              accessibilityLabel="Ilerleme: %38"
            />
          </PCard.Content>
          <PCard.Actions>
            <PButton
              mode="contained"
              disabled={isOffline}
              accessibilityLabel="Kaldigin yerden devam et"
              accessibilityHint="Programi son biraktigin noktadan devam eder"
              onPress={() =>
                navigation.navigate("Content", {
                  screen: "ContentJourneyHome",
                  params: { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" },
                })
              }
            >
              Kaldigin Yerden Devam Et
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      {/* AC-FR-E2-04-02: program outline steps */}
      <SectionCard title="Program Akisi" actionLabel="Tumumunu Gor">
        {outlineSteps.map((step, index) => (
          <View key={step.title} style={styles.rowItem}>
            <View
              style={styles.rowHeader}
              accessibilityLabel={`Adim ${index + 1}: ${step.title}, ${step.duration}`}
            >
              <PText variant="titleSmall">{step.title}</PText>
              <PText variant="labelMedium" style={styles.stepDuration}>{step.duration}</PText>
            </View>
            {index < outlineSteps.length - 1 ? <PDivider style={styles.divider} /> : null}
          </View>
        ))}
      </SectionCard>

      {/* Benefits + save */}
      <SectionCard title="Kazandirdiklari" actionLabel="Paylas">
        <PText variant="bodySmall" style={styles.benefitItem}>-- Gunluk kararlarda tutarlilik</PText>
        <PText variant="bodySmall" style={styles.benefitItem}>-- Oz sefkatle sinir koyma</PText>
        <PText variant="bodySmall" style={styles.benefitItem}>-- Deger odakli eylem plani</PText>
        <PButton
          mode="outlined"
          style={styles.secondaryButton}
          disabled={isOffline}
          accessibilityLabel="Programi okunacaklara ekle"
          accessibilityHint="Programi kutuphane listenize ekler"
          onPress={() => navigation.navigate("Library")}
        >
          Programi Kaydet
        </PButton>
      </SectionCard>
    </>
  );
};

export const HomeVicdandanKaraktereDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
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

  if (state === "empty") {
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

  if (state === "error") {
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

  if (state === "offline") {
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

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 12,
    lineHeight: 20,
  },
  offlineCacheNote: {
    fontSize: 11,
    color: "#F59E0B",
    fontStyle: "italic",
    marginBottom: 8,
  },
  card: {
    marginTop: 4,
  },
  progress: {
    marginTop: 8,
    marginBottom: 12,
    height: 8,
    borderRadius: 999,
  },
  rowItem: {
    paddingVertical: 8,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepDuration: {
    color: "#525252",
  },
  divider: {
    marginTop: 8,
  },
  benefitItem: {
    color: "#404040",
    marginBottom: 4,
    lineHeight: 20,
  },
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    minHeight: 48,
  },
});
