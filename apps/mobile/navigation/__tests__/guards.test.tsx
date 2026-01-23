import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { getSubscriptionGateOutcome, hasTrialOrActiveEntitlement, withSubscriptionGate } from "../guards";

describe("subscription gate logic", () => {
  it("allows trial and active entitlements", () => {
    expect(hasTrialOrActiveEntitlement("trial")).toBe(true);
    expect(hasTrialOrActiveEntitlement("active")).toBe(true);
  });

  it("blocks none or expired entitlements", () => {
    expect(hasTrialOrActiveEntitlement("none")).toBe(false);
    expect(hasTrialOrActiveEntitlement("expired")).toBe(false);
  });

  it("returns allowed false when entitlement is missing", () => {
    const outcome = getSubscriptionGateOutcome("none", "subscription:trial_or_active");
    expect(outcome.allowed).toBe(false);
  });
});

describe("subscription gate navigation", () => {
  it("routes to paywall when entitlement is missing", async () => {
    const Screen = () => null;
    const Gated = withSubscriptionGate(Screen);
    const replace = jest.fn();

    render(
      <Gated
        navigation={{ replace }}
        route={{ params: { entitlement: "none", state: "ready" } }}
      />
    );

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith("ContentPaywall", { state: "ready" });
    });
  });
});
