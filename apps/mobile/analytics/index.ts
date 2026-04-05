import { trackEvent } from './client';
import { ctaTapEventName, screenViewEventName } from './events';

export type { AnalyticsEvent } from './client';
export { setAnalyticsOptIn, getAnalyticsOptIn } from './consent';
export { setAnalyticsSink, trackEvent } from './client';
export { screenViewEventName, ctaTapEventName } from './events';
export { scrubPayload } from './scrub';

export const trackScreenView = (screenId: string) => trackEvent(screenViewEventName(screenId), { screen_id: screenId });

export const trackCtaTap = (screenId: string, ctaId: string, metadata: Record<string, unknown> = {}) =>
  trackEvent(ctaTapEventName(screenId, ctaId), {
    screen_id: screenId,
    cta_id: ctaId,
    ...metadata
  });
