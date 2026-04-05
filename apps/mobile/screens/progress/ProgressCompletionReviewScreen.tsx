import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PText } from "../../components";

const STAR_COUNT = 5;

const NEXT_SUGGESTION = {
  title: "Oz Farkindalik Egzersizi",
  contentType: "journey_day",
  route: "ContentJourneyHome",
};

const ProgressCompletionReviewContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // AC-FR-E6-05-01: submitted — show confirmation + next suggestion
  if (isSubmitted) {
    return (
      <SectionCard title="Degerlendirildi">
        <View style={styles.successHero}>
          <PText style={styles.successIcon}>✓</PText>
          <PText style={styles.successTitle}>Tesekkurler!</PText>
          <PText style={styles.successBody}>
            Degerlendirmen kaydedildi. Ilerlemeye devam etmek ister misin?
          </PText>
        </View>
        {/* AC-FR-E6-05-03: next content suggestion */}
        <PCard style={styles.suggestionCard}>
          <PCard.Content>
            <PText style={styles.suggestionLabel}>Siradaki onerimiz</PText>
            <PText style={styles.suggestionTitle}>{NEXT_SUGGESTION.title}</PText>
            <PButton
              mode="contained"
              onPress={() => navigation.navigate(NEXT_SUGGESTION.route)}
              style={styles.ctaButton}
              disabled={isOffline}
            >
              Baslayalim
            </PButton>
          </PCard.Content>
        </PCard>
        <PButton
          mode="text"
          onPress={() => navigation.navigate("ProgressDashboard")}
          style={styles.dashboardLink}
        >
          Ilerleme Panosuna Don
        </PButton>
      </SectionCard>
    );
  }

  return (
    <>
      {/* AC-FR-E6-05-01: evaluation form */}
      <SectionCard title="Icerik Degerlendirmesi">
        <PText style={styles.prompt}>Bu icerigi nasil buldun?</PText>
        {/* Star rating */}
        <View style={styles.starRow} accessibilityLabel={`${rating} yildiz sec`}>
          {Array.from({ length: STAR_COUNT }, (_, i) => i + 1).map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
              style={styles.starButton}
              accessibilityLabel={`${star} yildiz`}
              accessibilityRole="button"
            >
              <PText style={[styles.star, rating >= star && styles.starFilled]}>
                {rating >= star ? "★" : "☆"}
              </PText>
            </TouchableOpacity>
          ))}
        </View>
        <PText style={styles.ratingLabel}>
          {rating === 0
            ? "Bir yildiz sec"
            : rating <= 2
            ? "Gelisitirilmeli"
            : rating === 3
            ? "Orta"
            : rating === 4
            ? "Iyiydi"
            : "Mukemmeldi!"}
        </PText>
      </SectionCard>

      <SectionCard title="Yorum (Istegle)">
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder="Dusuncelerini paylas..."
          placeholderTextColor="#A3A3A3"
          value={comment}
          onChangeText={setComment}
          accessible
          accessibilityLabel="Yorum alani"
          maxLength={500}
          editable={!isOffline}
        />
        <PText style={styles.charCount}>{comment.length}/500</PText>
      </SectionCard>

      <SectionCard title="Gonder">
        <PButton
          mode="contained"
          disabled={rating === 0 || isOffline}
          onPress={() => setIsSubmitted(true)}
          style={styles.action}
        >
          Degerlendirmeyi Gonder
        </PButton>
        {/* AC-FR-E6-05-02: "Daha Sonra" defers and goes back */}
        <PButton
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.deferButton}
        >
          Daha Sonra
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProgressCompletionReviewScreen = ({
  route,
}: {
  route?: { params?: { contentType?: string; contentId?: string; state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Degerlendirme" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Degerlendirme" subtitle="Bir sorun olustu">
        <StateMessage
          title="Degerlendirme yuklenemedi"
          description="Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Degerlendirme" subtitle="Cevrimdisi mod">
        <OfflineNotice />
        <ProgressCompletionReviewContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Degerlendirme" subtitle="Icerik bitis degerlendirmesi">
      <ProgressCompletionReviewContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  prompt: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontSize: 36,
    color: "#D4D4D4",
  },
  starFilled: {
    color: "#F59E0B",
  },
  ratingLabel: {
    textAlign: "center",
    fontSize: 13,
    color: "#737373",
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#1F2937",
    minHeight: 80,
    textAlignVertical: "top",
    backgroundColor: "#FAFAFA",
  },
  charCount: {
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "right",
    marginTop: 4,
  },
  action: { marginBottom: 8 },
  deferButton: { marginTop: 4 },
  successHero: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  successIcon: {
    fontSize: 48,
    color: "#16A34A",
    fontWeight: "800",
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
  },
  successBody: {
    fontSize: 14,
    color: "#525252",
    textAlign: "center",
    lineHeight: 20,
  },
  suggestionCard: {
    backgroundColor: "#F5F3FF",
    borderRadius: 14,
    marginTop: 12,
    marginBottom: 8,
  },
  suggestionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B46C1",
    marginBottom: 4,
  },
  suggestionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  ctaButton: { alignSelf: "flex-start" },
  dashboardLink: { alignSelf: "center", marginTop: 8 },
});
