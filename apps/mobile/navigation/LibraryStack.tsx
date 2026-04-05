import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenState } from '../screens/components/ScreenState';
import { ContentPaywallScreen } from '../screens/content/ContentPaywallScreen';
import { LibraryCollectionDetailScreen } from '../screens/library/LibraryCollectionDetailScreen';
import { LibraryCollectionsScreen } from '../screens/library/LibraryCollectionsScreen';
import { LibraryDownloadsScreen } from '../screens/library/LibraryDownloadsScreen';
import { LibraryEbooksScreen } from '../screens/library/LibraryEbooksScreen';
import { LibraryFavoriteDetailScreen } from '../screens/library/LibraryFavoriteDetailScreen';
import { LibraryFavoritesScreen } from '../screens/library/LibraryFavoritesScreen';
import { LibraryJourneysScreen } from '../screens/library/LibraryJourneysScreen';
import { LibraryModulesScreen } from '../screens/library/LibraryModulesScreen';
import { LibraryOverviewScreen } from '../screens/library/LibraryOverviewScreen';
import { LibraryShareExportScreen } from '../screens/library/LibraryShareExportScreen';
import { LibraryWorkshopsScreen } from '../screens/library/LibraryWorkshopsScreen';
import { withSubscriptionGate } from './guards';

type ScreenStateParam = { state?: ScreenState; entitlement?: 'trial' | 'active' | 'none' | 'expired' } | undefined;

type DetailParam = {
  id: string;
  state?: ScreenState;
  entitlement?: 'trial' | 'active' | 'none' | 'expired';
};

export type LibraryStackParamList = {
  LibraryOverview: ScreenStateParam;
  LibraryJourneys: ScreenStateParam;
  LibraryWorkshops: ScreenStateParam;
  LibraryModules: ScreenStateParam;
  LibraryEbooks: ScreenStateParam;
  LibraryFavorites: ScreenStateParam;
  LibraryFavoriteDetail: DetailParam;
  LibraryCollections: ScreenStateParam;
  LibraryCollectionDetail: DetailParam;
  LibraryDownloads: ScreenStateParam;
  LibraryShareExport: DetailParam;
  ContentPaywall: ScreenStateParam;
};

const modalOptions: NativeStackNavigationOptions = { presentation: 'modal' };

type LibraryStackScreen = {
  name: keyof LibraryStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

export const libraryStackScreens: LibraryStackScreen[] = [
  { name: 'LibraryOverview', component: withSubscriptionGate(LibraryOverviewScreen) },
  { name: 'LibraryJourneys', component: withSubscriptionGate(LibraryJourneysScreen) },
  { name: 'LibraryWorkshops', component: withSubscriptionGate(LibraryWorkshopsScreen) },
  { name: 'LibraryModules', component: withSubscriptionGate(LibraryModulesScreen) },
  { name: 'LibraryEbooks', component: withSubscriptionGate(LibraryEbooksScreen) },
  { name: 'LibraryFavorites', component: withSubscriptionGate(LibraryFavoritesScreen) },
  { name: 'LibraryFavoriteDetail', component: withSubscriptionGate(LibraryFavoriteDetailScreen) },
  { name: 'LibraryCollections', component: withSubscriptionGate(LibraryCollectionsScreen) },
  {
    name: 'LibraryCollectionDetail',
    component: withSubscriptionGate(LibraryCollectionDetailScreen)
  },
  { name: 'LibraryDownloads', component: withSubscriptionGate(LibraryDownloadsScreen) },
  {
    name: 'LibraryShareExport',
    component: withSubscriptionGate(LibraryShareExportScreen),
    options: modalOptions
  },
  { name: 'ContentPaywall', component: ContentPaywallScreen, options: modalOptions }
];

type LibraryStackProps = {
  initialRouteName?: keyof LibraryStackParamList;
};

const Stack = createNativeStackNavigator<LibraryStackParamList>();

export const LibraryStack = ({ initialRouteName = 'LibraryOverview' }: LibraryStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      {libraryStackScreens.map(screen => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} options={screen.options} />
      ))}
    </Stack.Navigator>
  );
};
