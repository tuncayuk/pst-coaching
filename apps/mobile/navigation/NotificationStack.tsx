/**
 * NotificationStack: FR-E17-01..04
 * Route: /notifications (list), /notifications/detail, /notifications/settings, /notifications/reminders
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenState } from '../screens/components/ScreenState';
import { NotificationDetailScreen } from '../screens/notifications/NotificationDetailScreen';
import { NotificationListScreen } from '../screens/notifications/NotificationListScreen';
import { NotificationSettingsScreen } from '../screens/notifications/NotificationSettingsScreen';
import { ReminderPlannerScreen } from '../screens/notifications/ReminderPlannerScreen';

type ScreenStateParam = { state?: ScreenState } | undefined;

export type NotificationStackParamList = {
  /** FR-E17-01: Notification list with unread badge + bulk actions */
  NotificationList: ScreenStateParam;
  /** FR-E17-02: Notification detail with CTA and deep link */
  NotificationDetail: { notificationId?: string; state?: ScreenState } | undefined;
  /** FR-E17-03: Notification type toggles, quiet hours, frequency, sound/vibration */
  NotificationSettings: ScreenStateParam;
  /** FR-E17-04: Reminder planner with per-type time slots */
  ReminderPlanner: ScreenStateParam;
};

const Stack = createNativeStackNavigator<NotificationStackParamList>();

export const NotificationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="NotificationList">
    <Stack.Screen name="NotificationList" component={NotificationListScreen} />
    <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
    <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
    <Stack.Screen name="ReminderPlanner" component={ReminderPlannerScreen} />
  </Stack.Navigator>
);
