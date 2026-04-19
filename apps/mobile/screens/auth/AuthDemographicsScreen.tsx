import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PText, PTextInput } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const COUNTRIES = [
  'Turkiye',
  'Almanya',
  'Amerika Birlesik Devletleri',
  'Avustralya',
  'Avusturya',
  'Azerbaycan',
  'Belcika',
  'Birlesik Krallik',
  'Fransa',
  'Hollanda',
  'Irak',
  'Iran',
  'Ispanya',
  'Isvec',
  'Isvicre',
  'Italya',
  'Japonya',
  'Kanada',
  'Kazakistan',
  'Kirgizistan',
  'Kuzey Kibris',
  'Misir',
  'Ozbekistan',
  'Polonya',
  'Romanya',
  'Rusya',
  'Suudi Arabistan',
  'Turkmenistan',
  'Ukrayna',
  'Yunanistan'
];

const DemographicsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState<string | null>(null);
  const [country, setCountry] = React.useState('');
  const [countrySearch, setCountrySearch] = React.useState('');
  const [showCountryDropdown, setShowCountryDropdown] = React.useState(false);
  const navigation = useNavigation<any>();

  const filteredCountries = COUNTRIES.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase()));

  const ageNum = parseInt(age);
  const isFormValid = age.length > 0 && ageNum >= 13 && ageNum <= 120 && country.length > 0;
  const ageError = age.length > 0 && (isNaN(ageNum) || ageNum < 13 || ageNum > 120);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <PText style={styles.icon}>📊</PText>
        </View>
        <PText style={styles.title}>Demografi Bilgileri</PText>
        <PText style={styles.subtitle}>İçeriğe başlamadan önce lütfen bilgilerinizi tamamlayın</PText>
        <View style={styles.infoCard}>
          <PText style={styles.infoText}>
            <PText style={styles.infoBold}>💡 Neden soruluyor?</PText>
            {'\n'}Bu bilgiler size daha uygun içerik önerileri sunmamıza yardımcı olur. Verileriniz güvenli şekilde
            saklanır.
          </PText>
        </View>
        <View style={styles.inputGroup}>
          <PText style={styles.label}>Ulke *</PText>
          <TouchableOpacity
            onPress={() => setShowCountryDropdown(!showCountryDropdown)}
            disabled={isOffline}
            accessibilityRole="button"
            accessibilityLabel="Ulke secimi, zorunlu alan"
          >
            <View style={[styles.countrySelector, !country && styles.countrySelectorEmpty]}>
              <PText style={[styles.countryText, !country && styles.countryPlaceholder]}>
                {country || 'Ulke secin'}
              </PText>
              <PText style={styles.countryChevron}>{showCountryDropdown ? '\u25B4' : '\u25BE'}</PText>
            </View>
          </TouchableOpacity>
          {showCountryDropdown && (
            <View style={styles.dropdownContainer}>
              <PTextInput
                mode="outlined"
                value={countrySearch}
                onChangeText={setCountrySearch}
                placeholder="Ulke ara..."
                style={styles.searchInput}
                outlineStyle={styles.searchOutline}
                editable={!isOffline}
                accessibilityLabel="Ulke ara"
              />
              <ScrollView style={styles.dropdownList} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
                {filteredCountries.map(item => (
                  <TouchableOpacity
                    key={item}
                    style={[styles.dropdownItem, item === country && styles.dropdownItemSelected]}
                    onPress={() => {
                      setCountry(item);
                      setCountrySearch('');
                      setShowCountryDropdown(false);
                    }}
                    accessibilityRole="button"
                    accessibilityState={{ selected: item === country }}
                  >
                    <PText style={[styles.dropdownItemText, item === country && styles.dropdownItemTextSelected]}>
                      {item}
                    </PText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={styles.inputGroup}>
          <PText style={styles.label}>Yas *</PText>
          <PTextInput
            mode="outlined"
            keyboardType="number-pad"
            value={age}
            onChangeText={setAge}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineStyle={[styles.inputOutline, ageError && styles.inputOutlineError]}
            editable={!isOffline}
            placeholder="Yasinizi girin"
            accessibilityLabel="Yas girisi, zorunlu alan"
          />
          {ageError ? (
            <PText style={styles.errorText}>Yas 13-120 arasinda olmalidir</PText>
          ) : (
            <PText style={styles.helperText}>13-120 yas arasi</PText>
          )}
        </View>
        <PText style={styles.label}>Cinsiyet</PText>
        <View style={styles.genderRow}>
          <PButton
            mode={gender === 'Kadin' ? 'contained' : 'outlined'}
            onPress={() => setGender('Kadin')}
            style={styles.genderButton}
            disabled={isOffline}
            accessibilityLabel="Kadin"
            accessibilityState={{ selected: gender === 'Kadin' }}
          >
            Kadin
          </PButton>
          <PButton
            mode={gender === 'Erkek' ? 'contained' : 'outlined'}
            onPress={() => setGender('Erkek')}
            style={styles.genderButton}
            disabled={isOffline}
            accessibilityLabel="Erkek"
            accessibilityState={{ selected: gender === 'Erkek' }}
          >
            Erkek
          </PButton>
        </View>
        <PButton
          mode="outlined"
          onPress={() => setGender('Belirtmek istemiyorum')}
          style={styles.genderButtonFull}
          disabled={isOffline}
          accessibilityLabel="Belirtmek istemiyorum"
        >
          Belirtmek istemiyorum
        </PButton>
        <PButton
          mode="contained"
          disabled={isOffline || !isFormValid}
          onPress={() => {
            navigation.getParent()?.navigate('MainTabs');
          }}
          style={styles.button}
        >
          Kaydet ve Devam Et
        </PButton>
        <PText style={styles.requiredText}>* Zorunlu alanlar</PText>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthDemographicsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Demografi Bilgileri" subtitle="Yükleniyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Demografi Bilgileri" subtitle="Bilgi bulunamadı">
        <StateMessage
          title="Bilgi bulunamadı"
          description="Yeniden deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="account-details-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Demografi Bilgileri" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <>
        <OfflineNotice />
        <DemographicsContent isOffline />
      </>
    );
  }

  return <DemographicsContent />;
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background
    },
    scrollContent: {
      paddingHorizontal: spacing[3],
      paddingTop: spacing[4],
      paddingBottom: spacing[4]
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: spacing[2]
    },
    icon: {
      fontSize: fontSizes['12xl']
    },
    title: {
      fontSize: fontSizes['6xl'],
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      marginBottom: spacing[1],
      textAlign: 'center'
    },
    subtitle: {
      color: c.textTertiary,
      marginBottom: spacing[3],
      textAlign: 'center'
    },
    infoCard: {
      backgroundColor: c.primaryContainer,
      padding: spacing[2],
      borderRadius: radii.lg,
      marginBottom: spacing[3],
      borderLeftWidth: 4,
      borderLeftColor: c.primary
    },
    infoText: {
      color: c.textPrimary,
      lineHeight: 24
    },
    infoBold: {
      fontWeight: fontWeights.bold
    },
    inputGroup: {
      marginBottom: spacing[2]
    },
    input: {
      backgroundColor: c.surface
    },
    inputContent: {
      paddingVertical: spacing[2]
    },
    inputOutline: {
      borderWidth: 2,
      borderRadius: radii.lg,
      borderColor: c.outline
    },
    helperText: {
      color: c.textSecondary,
      marginTop: 6,
      fontSize: fontSizes.base
    },
    errorText: {
      color: c.error,
      marginTop: 6,
      fontSize: fontSizes.base
    },
    inputOutlineError: {
      borderColor: c.error
    },
    label: {
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary,
      marginBottom: spacing[1],
      marginTop: spacing[1]
    },
    genderRow: {
      flexDirection: 'row',
      gap: spacing[1.5],
      marginBottom: spacing[1.5]
    },
    genderButton: {
      flex: 1
    },
    genderButtonFull: {
      marginBottom: spacing[2]
    },
    countrySelector: {
      borderWidth: 2,
      borderColor: c.outline,
      borderRadius: radii.lg,
      padding: spacing[2],
      backgroundColor: c.surface,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    countrySelectorEmpty: {
      borderColor: c.outline
    },
    countryText: {
      fontSize: fontSizes['2xl'],
      color: c.textPrimary
    },
    countryPlaceholder: {
      color: c.textDisabled
    },
    countryChevron: {
      fontSize: fontSizes.lg,
      color: c.textSecondary
    },
    dropdownContainer: {
      marginTop: 4,
      borderWidth: 1,
      borderColor: c.outline,
      borderRadius: radii.lg,
      backgroundColor: c.surface,
      maxHeight: 240,
      overflow: 'hidden'
    },
    searchInput: {
      backgroundColor: c.surface,
      margin: spacing[1]
    },
    searchOutline: {
      borderWidth: 1,
      borderRadius: radii.md,
      borderColor: c.outline
    },
    dropdownList: {
      maxHeight: 180
    },
    dropdownItem: {
      paddingVertical: spacing[1.5],
      paddingHorizontal: spacing[2],
      borderBottomWidth: 1,
      borderBottomColor: c.outlineVariant
    },
    dropdownItemSelected: {
      backgroundColor: c.primaryContainer
    },
    dropdownItemText: {
      fontSize: fontSizes.xl,
      color: c.textPrimary
    },
    dropdownItemTextSelected: {
      color: c.primary,
      fontWeight: fontWeights.semiBold
    },
    button: {
      marginBottom: spacing[1.5],
      borderRadius: radii.lg
    },
    requiredText: {
      textAlign: 'center',
      color: c.textSecondary,
      marginTop: spacing[1],
      fontSize: fontSizes.base
    }
  });
}
