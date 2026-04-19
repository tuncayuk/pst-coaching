import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenState } from '../components/ScreenState';
import { ContentAchievementScreen } from '../screens/content/ContentAchievementScreen';
import { ContentCommentPreviewScreen } from '../screens/content/ContentCommentPreviewScreen';
import { ContentCommentScreen } from '../screens/content/ContentCommentScreen';
import { ContentEbookDetailScreen } from '../screens/content/ContentEbookDetailScreen';
import { ContentEbookHighlightsScreen } from '../screens/content/ContentEbookHighlightsScreen';
import { ContentEbookReaderScreen } from '../screens/content/ContentEbookReaderScreen';
import { ContentEbookSettingsScreen } from '../screens/content/ContentEbookSettingsScreen';
import { ContentEbookTocScreen } from '../screens/content/ContentEbookTocScreen';
import { ContentExerciseScreen } from '../screens/content/ContentExerciseScreen';
import { ContentJourneyDayScreen } from '../screens/content/ContentJourneyDayScreen';
import { ContentJourneyDetailScreen } from '../screens/content/ContentJourneyDetailScreen';
import { ContentJourneyHomeScreen } from '../screens/content/ContentJourneyHomeScreen';
import { ContentModuleHomeScreen } from '../screens/content/ContentModuleHomeScreen';
import { ContentPackageDetailScreen } from '../screens/content/ContentPackageDetailScreen';
import { ContentPaywallScreen } from '../screens/content/ContentPaywallScreen';
import { ContentReadingScreen } from '../screens/content/ContentReadingScreen';
import { ContentReviewPromptScreen } from '../screens/content/ContentReviewPromptScreen';
import { ContentWorkshopCampScreen } from '../screens/content/ContentWorkshopCampScreen';
import { ContentWorkshopCompletionScreen } from '../screens/content/ContentWorkshopCompletionScreen';
import { ContentWorkshopDetailScreen } from '../screens/content/ContentWorkshopDetailScreen';
import { ContentWorkshopFollowUpScreen } from '../screens/content/ContentWorkshopFollowUpScreen';
import { ContentWorkshopGuideScreen } from '../screens/content/ContentWorkshopGuideScreen';
import { ContentWorkshopHomeScreen } from '../screens/content/ContentWorkshopHomeScreen';
import { ContentWorkshopSectionScreen } from '../screens/content/ContentWorkshopSectionScreen';
import { ContentWorkshopWorkbookScreen } from '../screens/content/ContentWorkshopWorkbookScreen';

type ScreenStateParam = { state?: ScreenState } | undefined;

type ContentIdParam = { id: string; state?: ScreenState };

type ContentItemParam = { contentItemId: string; state?: ScreenState };

type ReviewPromptParam = { targetType: string; id: string; state?: ScreenState };

export type ContentStackParamList = {
  ContentJourneyHome: ContentIdParam;
  ContentJourneyDay: { id: string; day: string; state?: ScreenState };
  ContentJourneyDetail: ContentIdParam;
  ContentWorkshopHome: ContentIdParam;
  ContentWorkshopSection: { id: string; sectionId: string; state?: ScreenState };
  ContentWorkshopDetail: ContentIdParam;
  ContentWorkshopCamp: ContentIdParam;
  ContentWorkshopGuide: ContentIdParam;
  ContentWorkshopWorkbook: ContentIdParam;
  ContentWorkshopFollowUp: ContentIdParam;
  ContentWorkshopCompletion: ContentIdParam;
  ContentModuleHome: ContentIdParam;
  ContentPackageDetail: ContentIdParam;
  ContentEbookDetail: ContentIdParam;
  ContentEbookReader: { id: string; state?: ScreenState; chapterId?: string };
  ContentEbookToc: { id: string; state?: ScreenState; chapterId?: string };
  ContentEbookHighlights: ContentIdParam;
  ContentEbookSettings: ContentIdParam;
  ContentReading: ContentIdParam;
  ContentExercise: ContentIdParam;
  ContentComment: ContentItemParam;
  ContentCommentPreview: {
    contentItemId: string;
    state?: ScreenState;
    answer1?: string;
    answer2?: string;
    emotion?: string;
  };
  ContentAchievement: ContentIdParam;
  ContentReviewPrompt: ReviewPromptParam;
  ContentPaywall: ScreenStateParam;
};

export const contentSheetScreenOptions: Record<
  'ContentPaywall' | 'ContentEbookToc' | 'ContentEbookSettings' | 'ContentReviewPrompt',
  NativeStackNavigationOptions
> = {
  ContentPaywall: { presentation: 'modal' },
  ContentEbookToc: { presentation: 'modal' },
  ContentEbookSettings: { presentation: 'modal' },
  ContentReviewPrompt: { presentation: 'modal' }
};

type ContentStackScreen = {
  name: keyof ContentStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

export const contentStackScreens: ContentStackScreen[] = [
  { name: 'ContentJourneyHome', component: ContentJourneyHomeScreen },
  { name: 'ContentJourneyDay', component: ContentJourneyDayScreen },
  { name: 'ContentJourneyDetail', component: ContentJourneyDetailScreen },
  { name: 'ContentWorkshopHome', component: ContentWorkshopHomeScreen },
  { name: 'ContentWorkshopSection', component: ContentWorkshopSectionScreen },
  { name: 'ContentWorkshopDetail', component: ContentWorkshopDetailScreen },
  { name: 'ContentWorkshopCamp', component: ContentWorkshopCampScreen },
  { name: 'ContentWorkshopGuide', component: ContentWorkshopGuideScreen },
  { name: 'ContentWorkshopWorkbook', component: ContentWorkshopWorkbookScreen },
  { name: 'ContentWorkshopFollowUp', component: ContentWorkshopFollowUpScreen },
  { name: 'ContentWorkshopCompletion', component: ContentWorkshopCompletionScreen },
  { name: 'ContentModuleHome', component: ContentModuleHomeScreen },
  { name: 'ContentPackageDetail', component: ContentPackageDetailScreen },
  { name: 'ContentEbookDetail', component: ContentEbookDetailScreen },
  { name: 'ContentEbookReader', component: ContentEbookReaderScreen },
  {
    name: 'ContentEbookToc',
    component: ContentEbookTocScreen,
    options: contentSheetScreenOptions.ContentEbookToc
  },
  { name: 'ContentEbookHighlights', component: ContentEbookHighlightsScreen },
  {
    name: 'ContentEbookSettings',
    component: ContentEbookSettingsScreen,
    options: contentSheetScreenOptions.ContentEbookSettings
  },
  { name: 'ContentReading', component: ContentReadingScreen },
  { name: 'ContentExercise', component: ContentExerciseScreen },
  { name: 'ContentComment', component: ContentCommentScreen },
  { name: 'ContentCommentPreview', component: ContentCommentPreviewScreen },
  { name: 'ContentAchievement', component: ContentAchievementScreen },
  {
    name: 'ContentReviewPrompt',
    component: ContentReviewPromptScreen,
    options: contentSheetScreenOptions.ContentReviewPrompt
  },
  {
    name: 'ContentPaywall',
    component: ContentPaywallScreen,
    options: contentSheetScreenOptions.ContentPaywall
  }
];

type ContentStackProps = {
  initialRouteName?: keyof ContentStackParamList;
};

const Stack = createNativeStackNavigator<ContentStackParamList>();

export const ContentStack = ({ initialRouteName = 'ContentEbookDetail' }: ContentStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      {contentStackScreens.map(screen => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} options={screen.options} />
      ))}
    </Stack.Navigator>
  );
};
