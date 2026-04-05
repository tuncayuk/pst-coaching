import React, { useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PDivider, PListIcon, PListItem, PText, PTextInput } from "../../components";

const PLATFORM_LABEL = Platform.OS === "ios" ? "Apple Uygulama Magazasi" : "Google Play Magazasi";
const PLATFORM_ICON = Platform.OS === "ios" ? "apple" : "google-play";

const ProfileCheckoutContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    // analytics: checkout_coupon_applied (stub)
    Alert.alert("Kupon", `"${couponCode}" kodu uygulanacak. (Sahte ortamda simule edildi)`);
    setCouponApplied(true);
  };

  // AC-FR-E3-02-01: platform IAP sheet; AC-FR-E3-02-04: error message on failure
  const handlePurchase = () => {
    if (isOffline) {
      setPurchaseError("Satin alma icin internet baglantisi gereklidir.");
      return;
    }
    setPurchaseError(null);
    // analytics: checkout_purchase_tapped (stub)
    Alert.alert(
      PLATFORM_LABEL + " ile Satin Al",
      "Magaza odeme akisi acilacak. (Sahte ortamda simule edildi)",
      [
        { text: "Iptal", style: "cancel" },
        {
          text: "Onayla",
          onPress: () => {
            // analytics: checkout_purchase_success (stub)
            Alert.alert("Basarili", "Aboneliginiz aktiflestirildi. (AC-FR-E3-02-02)");
          },
        },
      ]
    );
  };

  return (
    <>
      <SectionCard title="Siparis Ozeti">
        <PCard style={styles.card}>
          <PCard.Title title="Premium Yillik Plan" subtitle="12 ay" />
          <PCard.Content>
            <View style={styles.priceRow}>
              <PText variant="bodyMedium">Plan Bedeli</PText>
              <PText variant="bodyMedium">99,99 TL</PText>
            </View>
            <View style={styles.priceRow}>
              <PText variant="bodyMedium">KDV (%0)</PText>
              <PText variant="bodyMedium">0,00 TL</PText>
            </View>
            {couponApplied && (
              <View style={styles.priceRow}>
                <PText variant="bodyMedium" style={styles.discountText}>Kupon Indirimi</PText>
                <PText variant="bodyMedium" style={styles.discountText}>-9,99 TL</PText>
              </View>
            )}
            <PDivider style={styles.divider} />
            <View style={styles.priceRow}>
              <PText variant="titleMedium" style={styles.totalText}>Toplam</PText>
              <PText variant="titleMedium" style={styles.totalText}>
                {couponApplied ? "70,00 TL" : "99,99 TL"}
              </PText>
            </View>
          </PCard.Content>
        </PCard>

        {/* Coupon code */}
        <View style={styles.couponRow}>
          <PTextInput
            label="Kupon Kodu"
            value={couponCode}
            onChangeText={setCouponCode}
            style={styles.couponInput}
            autoCapitalize="characters"
            accessibilityLabel="Kupon kodu giriniz"
            editable={!isOffline}
          />
          <PButton
            mode="outlined"
            onPress={handleApplyCoupon}
            disabled={isOffline || !couponCode.trim() || couponApplied}
            style={styles.couponButton}
            accessibilityLabel="Kupon kodunu uygula"
            accessibilityRole="button"
          >
            {couponApplied ? "Uygulandi" : "Uygula"}
          </PButton>
        </View>

        {/* AC-FR-E3-02-04: purchase error message */}
        {purchaseError && (
          <View style={styles.errorBanner}>
            <PText variant="bodySmall" style={styles.errorText}>
              {purchaseError}
            </PText>
          </View>
        )}

        {/* AC-FR-E3-02-01: platform IAP button */}
        <PButton
          mode="contained"
          disabled={isOffline}
          onPress={handlePurchase}
          style={styles.purchaseButton}
          icon={PLATFORM_ICON}
          accessibilityLabel={`${PLATFORM_LABEL} uzerinden satin al`}
          accessibilityRole="button"
        >
          {PLATFORM_LABEL} ile Satin Al
        </PButton>
        <PText variant="bodySmall" style={styles.platformNote}>
          Odeme {PLATFORM_LABEL} hesabiniz uzerinden gerceklestirilir.
          AC-FR-E3-02-03: Farkli bir cihazda giris yaptiginizda abonelik senkronlanir.
        </PText>
      </SectionCard>

      <SectionCard title="Odeme Yontemi">
        <PListItem
          title="Visa 4242"
          description="Son kullanim 08/26"
          left={(props) => <PListIcon {...props} icon="credit-card-outline" />}
          accessibilityLabel="Kayitli kart: Visa 4242"
        />
        <PDivider />
        <PListItem
          title="Fatura Bilgileri"
          description="Kisisel"
          left={(props) => <PListIcon {...props} icon="file-document-outline" />}
          accessibilityLabel="Fatura bilgilerini goruntule"
        />
      </SectionCard>
    </>
  );
};

export const ProfileCheckoutScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Satin Alma" subtitle="Satin alma hazirlaniyor">
        <SectionCard title="Ozet">
          <SkeletonBlock height={140} />
        </SectionCard>
        <SectionCard title="Odeme">
          <SkeletonBlock height={56} />
          <SkeletonBlock height={56} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Satin Alma" subtitle="Sepet bos">
        <StateMessage
          title="Sepet bos"
          description="Bir plan sectikten sonra satin alma ekrani acilacak."
          actionLabel="Planlari Gor"
          icon="cart-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Satin Alma" subtitle="Bir sorun olustu">
        <StateMessage
          title="Satin alma yuklenemedi"
          description="Satin alma bilgilerini getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Satin Alma" subtitle="Cevrimdisi">
        <OfflineNotice />
        <ProfileCheckoutContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Satin Alma" subtitle="Satin almayi tamamla">
      <ProfileCheckoutContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  discountText: {
    color: "#059669",
  },
  divider: {
    marginVertical: 8,
  },
  totalText: {
    fontWeight: "700",
    color: "#2B1B5D",
  },
  couponRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
    alignItems: "flex-end",
  },
  couponInput: {
    flex: 1,
  },
  couponButton: {
    minHeight: 48,
    alignSelf: "flex-end",
  },
  errorBanner: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  errorText: {
    color: "#991B1B",
  },
  purchaseButton: {
    minHeight: 52,
    marginTop: 4,
    marginBottom: 4,
  },
  platformNote: {
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 16,
  },
});
