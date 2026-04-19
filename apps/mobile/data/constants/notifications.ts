import type { MockNotification } from '../mockSelectors';

export type NotificationType = MockNotification['type'];
export type NotificationSettingsType = Exclude<NotificationType, 'achievement'>;
export type ReminderType = Exclude<NotificationSettingsType, 'social'>;

export type NotificationFrequency = 'instant' | 'daily_summary' | 'weekly';

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  journey: 'Yolculuk',
  workshop: 'Atolye',
  reading: 'Okuma',
  social: 'Sosyal',
  achievement: 'Basari'
};

export const NOTIFICATION_CTA_LABELS: Record<NotificationType, string> = {
  journey: 'Yolculuga Git',
  workshop: 'Atolyeye Git',
  reading: 'Okumaya Devam Et',
  social: 'Yorumu Goruntule',
  achievement: 'Rozetleri Goruntule'
};

export const REMINDER_TYPE_LABELS: Record<ReminderType, string> = {
  journey: 'Yolculuk',
  workshop: 'Atolye',
  reading: 'Okuma'
};

export const NOTIFICATION_SETTINGS_TYPE_LABELS: Record<NotificationSettingsType, string> = {
  journey: 'Yolculuk Bildirimleri',
  workshop: 'Atolye Bildirimleri',
  reading: 'Okuma Bildirimleri',
  social: 'Sosyal Bildirimler'
};

export const REMINDER_PRESET_TIMES = ['07:00', '09:00', '12:00', '18:00', '20:00', '21:30'] as const;

export const NOTIFICATION_QUIET_HOURS_START = ['20:00', '21:00', '22:00', '23:00', '00:00'] as const;
export const NOTIFICATION_QUIET_HOURS_END = ['06:00', '07:00', '08:00', '09:00', '10:00'] as const;

export const NOTIFICATION_FREQUENCY_OPTIONS: { label: string; value: NotificationFrequency }[] = [
  { label: 'Aninda', value: 'instant' },
  { label: 'Gunluk Ozet', value: 'daily_summary' },
  { label: 'Haftalik Ozet', value: 'weekly' }
];
