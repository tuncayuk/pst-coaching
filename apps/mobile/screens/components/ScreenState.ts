export type ScreenState = 'loading' | 'ready' | 'empty' | 'error' | 'offline';

type RouteWithState = {
  params?: {
    state?: ScreenState;
  };
};

export const resolveScreenState = (route?: RouteWithState): ScreenState => {
  if (route?.params?.state) {
    return route.params.state;
  }
  return 'ready';
};
