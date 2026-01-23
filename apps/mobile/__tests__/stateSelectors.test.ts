import { createAppStore } from "../state/store";
import { selectIsOnline } from "../state/selectors";
import { setConnectivity } from "../state/slices/connectivitySlice";

describe("connectivity selectors", () => {
  it("selects the online state", () => {
    const store = createAppStore({
      connectivity: { isOnline: true },
    });

    expect(selectIsOnline(store.getState())).toBe(true);
  });

  it("updates when connectivity changes", () => {
    const store = createAppStore({
      connectivity: { isOnline: true },
    });

    store.dispatch(setConnectivity(false));

    expect(selectIsOnline(store.getState())).toBe(false);
  });
});
