import { getAnalyticsOptIn } from './consent';
import { scrubPayload } from './scrub';

export type AnalyticsEvent = {
  name: string;
  timestamp: string;
  params: Record<string, unknown>;
};

type AnalyticsSink = (event: AnalyticsEvent) => void;

const noopSink: AnalyticsSink = () => {};

let sink: AnalyticsSink = noopSink;

export const setAnalyticsSink = (next: AnalyticsSink) => {
  sink = next;
};

export const trackEvent = (name: string, params: Record<string, unknown> = {}) => {
  if (!getAnalyticsOptIn()) {
    return null;
  }

  const event: AnalyticsEvent = {
    name,
    timestamp: new Date().toISOString(),
    params: scrubPayload(params)
  };

  sink(event);
  return event;
};
