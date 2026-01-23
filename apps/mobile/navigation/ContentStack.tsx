import React from "react";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ScreenState } from "../screens/components/ScreenState";
import { ContentJourneyDetailScreen } from "../screens/content/ContentJourneyDetailScreen";
import { ContentWorkshopDetailScreen } from "../screens/content/ContentWorkshopDetailScreen";
import { ContentModuleDetailScreen } from "../screens/content/ContentModuleDetailScreen";
import { ContentPackageDetailScreen } from "../screens/content/ContentPackageDetailScreen";
import { ContentEbookDetailScreen } from "../screens/content/ContentEbookDetailScreen";
import { ContentEbookReaderScreen } from "../screens/content/ContentEbookReaderScreen";
import { ContentEbookTocScreen } from "../screens/content/ContentEbookTocScreen";
import { ContentEbookHighlightsScreen } from "../screens/content/ContentEbookHighlightsScreen";
import { ContentCommentScreen } from "../screens/content/ContentCommentScreen";
import { ContentCommentPreviewScreen } from "../screens/content/ContentCommentPreviewScreen";
import { ContentReviewPromptScreen } from "../screens/content/ContentReviewPromptScreen";
import { ContentPaywallScreen } from "../screens/content/ContentPaywallScreen";

type ScreenStateParam = { state?: ScreenState } | undefined;

type ContentIdParam = { id: string; state?: ScreenState };

type ContentItemParam = { contentItemId: string; state?: ScreenState };

type ReviewPromptParam = { targetType: string; id: string; state?: ScreenState };

export type ContentStackParamList = {
  ContentJourneyDetail: ContentIdParam;
  ContentWorkshopDetail: ContentIdParam;
  ContentModuleDetail: ContentIdParam;
  ContentPackageDetail: ContentIdParam;
  ContentEbookDetail: ContentIdParam;
  ContentEbookReader: ContentIdParam;
  ContentEbookToc: ContentIdParam;
  ContentEbookHighlights: ContentIdParam;
  ContentComment: ContentItemParam;
  ContentCommentPreview: ContentItemParam;
  ContentReviewPrompt: ReviewPromptParam;
  ContentPaywall: ScreenStateParam;
};

export const contentSheetScreenOptions: Record<
  "ContentPaywall" | "ContentEbookToc" | "ContentReviewPrompt",
  NativeStackNavigationOptions
> = {
  ContentPaywall: { presentation: "modal" },
  ContentEbookToc: { presentation: "modal" },
  ContentReviewPrompt: { presentation: "modal" },
};

type ContentStackScreen = {
  name: keyof ContentStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

export const contentStackScreens: ContentStackScreen[] = [
  { name: "ContentJourneyDetail", component: ContentJourneyDetailScreen },
  { name: "ContentWorkshopDetail", component: ContentWorkshopDetailScreen },
  { name: "ContentModuleDetail", component: ContentModuleDetailScreen },
  { name: "ContentPackageDetail", component: ContentPackageDetailScreen },
  { name: "ContentEbookDetail", component: ContentEbookDetailScreen },
  { name: "ContentEbookReader", component: ContentEbookReaderScreen },
  {
    name: "ContentEbookToc",
    component: ContentEbookTocScreen,
    options: contentSheetScreenOptions.ContentEbookToc,
  },
  { name: "ContentEbookHighlights", component: ContentEbookHighlightsScreen },
  { name: "ContentComment", component: ContentCommentScreen },
  { name: "ContentCommentPreview", component: ContentCommentPreviewScreen },
  {
    name: "ContentReviewPrompt",
    component: ContentReviewPromptScreen,
    options: contentSheetScreenOptions.ContentReviewPrompt,
  },
  {
    name: "ContentPaywall",
    component: ContentPaywallScreen,
    options: contentSheetScreenOptions.ContentPaywall,
  },
];

type ContentStackProps = {
  initialRouteName?: keyof ContentStackParamList;
};

const Stack = createNativeStackNavigator<ContentStackParamList>();

export const ContentStack = ({ initialRouteName = "ContentEbookDetail" }: ContentStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      {contentStackScreens.map((screen) => (
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
