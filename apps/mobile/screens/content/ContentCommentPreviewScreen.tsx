import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PText } from "../../components";

type RouteParams = {
  state?: ScreenState;
  contentItemId?: string;
  answer1?: string;
  answer2?: string;
  emotion?: string;
};

const ContentCommentPreviewContent = ({
  isOffline,
  answer1,
  answer2,
  emotion,
  onEdit,
}: {
  isOffline?: boolean;
  answer1?: string;
  answer2?: string;
  emotion?: string;
  onEdit: () => void;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const now = new Date();
  // AC-FR-E5-04-07: Disable submit after 23:59
  const isAfterDeadline = now.getHours() === 23 && now.getMinutes() >= 59;

  // AC-FR-E5-04-06: Submitted/locked state
  if (isSubmitted) {
    return (
      <SectionCard title="Gonderildi">
        <View style={styles.successRow}>
          <PText style={styles.successTitle}>Yorumun basariyla teslim edildi!</PText>
        </View>
        <PText variant="bodySmall" style={styles.subtleText}>
          Yorumun topluluk rehberine uygun sekilde paylasilacak.
        </PText>
      </SectionCard>
    );
  }

  return (
    <>
      {/* AC-FR-E5-04-05: Show actual submitted answers in preview */}
      <SectionCard title="Onizleme">
        <PCard style={styles.card}>
          <PCard.Title title="Secilen Duygu" subtitle={emotion || "Belirtilmedi"} />
          <PCard.Content>
            <PText variant="bodySmall" style={styles.answerLabel}>
              Bu bolum seni nasil etkiledi?
            </PText>
            <PText variant="bodyMedium" style={styles.paragraph}>
              {answer1 || "(Cevap girilmedi)"}
            </PText>
            <PText variant="bodySmall" style={styles.answerLabel}>
              Gunluk hayatina nasil tasiyabilirsin?
            </PText>
            <PText variant="bodySmall">{answer2 || "(Cevap girilmedi)"}</PText>
          </PCard.Content>
          <PCard.Actions>
            <PButton mode="outlined" disabled={isOffline} onPress={onEdit}>
              Duzenle
            </PButton>
            {/* AC-FR-E5-04-06: Submit active until 23:59 */}
            <PButton
              mode="contained"
              disabled={isOffline || isAfterDeadline}
              onPress={() => setIsSubmitted(true)}
            >
              Gonder
            </PButton>
          </PCard.Actions>
        </PCard>
        {isAfterDeadline && (
          <PText style={styles.deadlineText}>
            Teslim suresi doldu (23:59). Yorum gonderilemez.
          </PText>
        )}
      </SectionCard>

      <SectionCard title="Gonderim Bilgisi">
        <PText variant="bodySmall">
          Yorumun topluluk rehberine uygun sekilde paylasilir. Dilersen daha
          sonra duzenleyebilir veya silebilirsin.
        </PText>
      </SectionCard>
    </>
  );
};

export const ContentCommentPreviewScreen = ({
  route,
  navigation,
}: {
  route?: { params?: RouteParams };
  navigation?: any;
}) => {
  const state = resolveScreenState(route);
  const { answer1, answer2, emotion, contentItemId } = route?.params ?? {};

  const handleEdit = () => {
    navigation?.goBack();
  };

  if (state === "loading") {
    return (
      <ScreenLayout title="Yorum Onizleme" subtitle="Onizleme hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Onizleme">
          <SkeletonBlock height={120} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Yorum Onizleme" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Onizleme bulunamadi"
          description="Paylasim icin icerik hazirlanmadi."
          actionLabel="Yoruma Don"
          icon="comment-text-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yorum Onizleme" subtitle="Bir sorun olustu">
        <StateMessage
          title="Onizleme yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Yorum Onizleme" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentCommentPreviewContent
          isOffline
          answer1={answer1}
          answer2={answer2}
          emotion={emotion}
          onEdit={handleEdit}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yorum Onizleme" subtitle="Gonderim oncesi kontrol">
      <ContentCommentPreviewContent
        answer1={answer1}
        answer2={answer2}
        emotion={emotion}
        onEdit={handleEdit}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 4,
  },
  paragraph: {
    marginBottom: 8,
  },
  answerLabel: {
    color: "#737373",
    marginBottom: 4,
    marginTop: 8,
  },
  successRow: {
    padding: 12,
    backgroundColor: "#DCFCE7",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#16A34A",
  },
  successTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#15803D",
    textAlign: "center",
  },
  subtleText: {
    opacity: 0.7,
  },
  deadlineText: {
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
});
