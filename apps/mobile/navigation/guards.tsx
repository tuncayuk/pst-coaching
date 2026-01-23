import React from "react";
import { ScreenState } from "../screens/components/ScreenState";

export type SubscriptionStatus = "trial" | "active" | "none" | "expired";
export type SubscriptionGate = "subscription:trial_or_active";

export const hasTrialOrActiveEntitlement = (status: SubscriptionStatus) => {
  return status === "trial" || status === "active";
};

export const getSubscriptionGateOutcome = (status: SubscriptionStatus, gate: SubscriptionGate) => {
  if (gate === "subscription:trial_or_active") {
    return { allowed: hasTrialOrActiveEntitlement(status), status };
  }

  return { allowed: true, status };
};

type GateRouteParams = {
  state?: ScreenState;
  entitlement?: SubscriptionStatus;
};

type NavigationLike = {
  replace?: (route: string, params?: GateRouteParams) => void;
  navigate?: (route: string, params?: GateRouteParams) => void;
};

export const withSubscriptionGate = <P extends { navigation?: NavigationLike; route?: { params?: GateRouteParams } }>(
  ScreenComponent: React.ComponentType<P>,
  fallbackRoute: string = "ContentPaywall",
  requiredGate: SubscriptionGate = "subscription:trial_or_active",
) => {
  const GatedScreen = (props: P) => {
    const entitlement = props.route?.params?.entitlement ?? "active";
    const { allowed } = getSubscriptionGateOutcome(entitlement, requiredGate);

    React.useEffect(() => {
      if (allowed) {
        return;
      }

      const params = props.route?.params?.state ? { state: props.route.params.state } : undefined;
      if (props.navigation?.replace) {
        props.navigation.replace(fallbackRoute, params);
        return;
      }
      props.navigation?.navigate?.(fallbackRoute, params);
    }, [allowed, props.navigation, props.route?.params?.state]);

    if (!allowed) {
      return null;
    }

    return <ScreenComponent {...props} />;
  };

  GatedScreen.displayName = `SubscriptionGate(${ScreenComponent.displayName ?? ScreenComponent.name ?? "Screen"})`;

  return GatedScreen;
};
