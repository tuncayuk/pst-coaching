import React from "react";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ScreenState } from "../screens/components/ScreenState";
import { LibraryOverviewScreen } from "../screens/library/LibraryOverviewScreen";
import { LibraryJourneysScreen } from "../screens/library/LibraryJourneysScreen";
import { LibraryWorkshopsScreen } from "../screens/library/LibraryWorkshopsScreen";
import { LibraryModulesScreen } from "../screens/library/LibraryModulesScreen";
import { LibraryEbooksScreen } from "../screens/library/LibraryEbooksScreen";
import { LibraryFavoritesScreen } from "../screens/library/LibraryFavoritesScreen";
import { LibraryFavoriteDetailScreen } from "../screens/library/LibraryFavoriteDetailScreen";
import { LibraryCollectionsScreen } from "../screens/library/LibraryCollectionsScreen";
import { LibraryCollectionDetailScreen } from "../screens/library/LibraryCollectionDetailScreen";
import { LibraryDownloadsScreen } from "../screens/library/LibraryDownloadsScreen";
import { ContentPaywallScreen } from "../screens/content/ContentPaywallScreen";
import { withSubscriptionGate } from "./guards";

type ScreenStateParam = { state?: ScreenState; entitlement?: "trial" | "active" | "none" | "expired" } | undefined;

type DetailParam = { id: string; state?: ScreenState; entitlement?: "trial" | "active" | "none" | "expired" };

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
  ContentPaywall: ScreenStateParam;
};

const modalOptions: NativeStackNavigationOptions = { presentation: "modal" };

type LibraryStackScreen = {
  name: keyof LibraryStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

export const libraryStackScreens: LibraryStackScreen[] = [
  { name: "LibraryOverview", component: withSubscriptionGate(LibraryOverviewScreen) },
  { name: "LibraryJourneys", component: withSubscriptionGate(LibraryJourneysScreen) },
  { name: "LibraryWorkshops", component: withSubscriptionGate(LibraryWorkshopsScreen) },
  { name: "LibraryModules", component: withSubscriptionGate(LibraryModulesScreen) },
  { name: "LibraryEbooks", component: withSubscriptionGate(LibraryEbooksScreen) },
  { name: "LibraryFavorites", component: withSubscriptionGate(LibraryFavoritesScreen) },
  { name: "LibraryFavoriteDetail", component: withSubscriptionGate(LibraryFavoriteDetailScreen) },
  { name: "LibraryCollections", component: withSubscriptionGate(LibraryCollectionsScreen) },
  { name: "LibraryCollectionDetail", component: withSubscriptionGate(LibraryCollectionDetailScreen) },
  { name: "LibraryDownloads", component: withSubscriptionGate(LibraryDownloadsScreen) },
  { name: "ContentPaywall", component: ContentPaywallScreen, options: modalOptions },
];

type LibraryStackProps = {
  initialRouteName?: keyof LibraryStackParamList;
};

const Stack = createNativeStackNavigator<LibraryStackParamList>();

export const LibraryStack = ({ initialRouteName = "LibraryOverview" }: LibraryStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      {libraryStackScreens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};
