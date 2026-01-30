import { setAnalyticsOptIn, setAnalyticsSink, trackEvent } from "../index";

afterEach(() => {
  setAnalyticsOptIn(true);
  setAnalyticsSink(() => {});
});

describe("analytics payloads", () => {
  it("scrubs pii keys and values", () => {
    const sink = vi.fn();
    setAnalyticsSink(sink);

    const event = trackEvent("home_dashboard_viewed", {
      screen_id: "home.dashboard",
      email: "user@example.com",
      phone: "+1 (555) 123-4567",
      profile: {
        name: "Jane Doe",
        notes: "no pii here",
      },
      message: "contact me at user@example.com",
    });

    expect(event).not.toBeNull();
    expect(event?.params).toEqual({
      screen_id: "home.dashboard",
      profile: {
        notes: "no pii here",
      },
      message: "[redacted]",
    });
    expect(sink).toHaveBeenCalledTimes(1);
  });

  it("blocks events when opt-in is false", () => {
    const sink = vi.fn();
    setAnalyticsSink(sink);
    setAnalyticsOptIn(false);

    const event = trackEvent("home_dashboard_viewed", {
      screen_id: "home.dashboard",
    });

    expect(event).toBeNull();
    expect(sink).not.toHaveBeenCalled();
  });
});
