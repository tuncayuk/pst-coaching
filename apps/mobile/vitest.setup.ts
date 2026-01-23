import "@testing-library/jest-native/extend-expect";
import { vi } from "vitest";

vi.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

vi.mock("react-native-gesture-handler", async () => {
  const actual = await vi.importActual<typeof import("react-native-gesture-handler")>(
    "react-native-gesture-handler"
  );
  return {
    ...actual,
    GestureHandlerRootView: actual.View
  };
});

vi.mock("react-native-safe-area-context", () => {
  const React = require("react");
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 })
  };
});
