let analyticsOptIn = true;

export const setAnalyticsOptIn = (optIn: boolean) => {
  analyticsOptIn = optIn;
};

export const getAnalyticsOptIn = () => analyticsOptIn;
