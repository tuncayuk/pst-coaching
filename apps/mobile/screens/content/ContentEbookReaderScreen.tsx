import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getEbookChaptersForEbook } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PProgressBar, PText } from "../../components";

const readerParagraphs = [
  "Kendine karsi nazik olmak, zorlayici anlarda ic sesini yumuşatmanin ilk adimidir. Bu bolumde kucuk nefes molalariyla bedenini sakinlestirmeyi deneyecegiz.",
  "Nefesini sayarken omuzlarinin gevşedigini fark et. Zihin baska yerlere gittiginde yargilamadan geri getir ve bu ani bir pratik alani olarak gor.",
  "Okuma sonrasi dusuncelerini not etmek icin birkaç dakika ayir. Bu kisa refleksiyon, ogrenmeyi kalici hale getirir.",
];

const ContentEbookReaderContent = ({
  isOffline,
  ebookId,
  chapterId,
}: {
  isOffline?: boolean;
  ebookId?: string;
  chapterId?: string;
}) => {
  const navigation = useNavigation<any>();
  const chapters = getEbookChaptersForEbook(ebookId);
  const currentIndex = chapterId
    ? chapters.findIndex((c) => c.id === chapterId)
    : 0;
  const current = chapters[currentIndex] ?? chapters[0];
  const next = chapters[currentIndex + 1];
  const progress = chapters.length > 0 ? (currentIndex + 1) / chapters.length : 0.32;

  return (
    <>
      <SectionCard title="Okuma Ilerlemesi">
        <PText variant="bodySmall">
          {current ? `Bolum ${current.order_index}: ${current.title}` : "Bolum 4"} ·{" "}
          {Math.round(progress * 100)}% tamamlandi
        </PText>
        <PProgressBar progress={progress} style={styles.progress} />
        <PButton
          mode="contained"
          disabled={isOffline || !next}
          onPress={() =>
            next &&
            navigation.navigate("ContentEbookReader", {
              id: ebookId ?? "",
              chapterId: next.id,
            })
          }
        >
          Sonraki Bolum
        </PButton>
      </SectionCard>

      <SectionCard title={current ? `Bolum ${current.order_index}: ${current.title}` : "Bolum 4"}>
        {readerParagraphs.map((paragraph) => (
          <PText key={paragraph} variant="bodyLarge" style={styles.paragraph}>
            {paragraph}
          </PText>
        ))}
      </SectionCard>

      <SectionCard title="Okuma Araclari">
        <PText variant="bodySmall">- Yazi boyutunu artir</PText>
        <PText variant="bodySmall">- Satir araligini ayarla</PText>
        <PText variant="bodySmall">- Vurgu ekle</PText>
        <PButton
          mode="outlined"
          style={styles.secondaryButton}
          disabled={isOffline}
          onPress={() =>
            navigation.navigate("ContentEbookToc", { id: ebookId ?? "" })
          }
        >
          Icerik Tablosu
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentEbookReaderScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string; chapterId?: string } };
}) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;
  const chapterId = route?.params?.chapterId;

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Okuyucu hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="İçerik">
          <SkeletonBlock height={120} />
          <SkeletonBlock height={120} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Bölüm bulunamadı"
          description="Bu bölüm şu anda erişilebilir değil."
          actionLabel="İçindekilere Dön"
          icon="book-open-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Okuyucu yüklenemedi"
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
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentEbookReaderContent isOffline ebookId={ebookId} chapterId={chapterId} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitap Okuyucu" subtitle="Okumaya devam et">
      <ContentEbookReaderContent ebookId={ebookId} chapterId={chapterId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  progress: {
    marginTop: 8,
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 24,
  },
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
