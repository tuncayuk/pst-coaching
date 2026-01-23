import type { RootState } from "./store";

export const selectIsOnline = (state: RootState) => state.connectivity.isOnline;
