import React from "react";
import { StyleSheet, View } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

import { PActivityIndicator, PButton, PCard, PText } from "../../components";
import {
  getContentItems,
  getHighlightsForUser,
  getNotesForUser,
  getPrimaryUser,
} from "../../data/mockSelectors";


type RouteParams = { state?: ScreenState; id?: string };

const ContentReadingContent = ({ contentId, isOffline }: { contentId?: string; isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const contentItem = getContentItems().find((item) => item.id === contentId);
  const highlights = getHighlightsForUser(user?.id).slice(0, 2);
  const notes = getNotesForUser(user?.id).slice(0, 2);

  return (
    <>
      <SectionCard title="Okuma">
        <PText variant="titleMedium">{contentItem?.title ?? "Okuma İçeriği"}</PText>
        <PText variant="bodyMedium" style={styles.paragraph}>
          {contentItem?.body ??
            "Bu bölümde gündelik pratiklere dair okuma içeriği sunulur. Metni tamamladıktan sonra ilerleme kaydedilir."}
        </PText>
        <PButton mode="contained" disabled={isOffline}>
          Okumayı Tamamla
        </PButton>
      </SectionCard>

      <SectionCard title="Vurgularım">
        {highlights.map((highlight) => (
          <PCard key={highlight.id} style={styles.card}>
            <PCard.Title title={highlight.quote} subtitle={`Renk: ${highlight.color}`} />
          </PCard>
        ))}
      </SectionCard>

      <SectionCard title="Notlarım">
        {notes.map((note) => (
          <PCard key={note.id} style={styles.card}>
            <PCard.Title title={note.text} subtitle="Düzenle" />
          </PCard>
        ))}
        <PButton mode="outlined" disabled={isOffline}>
          Not Ekle
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentReadingScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const contentId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Okuma" subtitle="Okuma hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Vurgular">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Okuma" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Bölüm bulunamadı"
          description="Okuma içeriği şu anda erişilebilir değil."
          actionLabel="Geri Dön"
          icon="book-open-page-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Okuma" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Okuma yüklenemedi"
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
      <ScreenLayout title="Okuma" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentReadingContent contentId={contentId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Okuma" subtitle="Okumaya devam et">
      <ContentReadingContent contentId={contentId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginTop: 8,
    marginBottom: 12,
  },
  card: {
    marginBottom: 12,
  },
});
