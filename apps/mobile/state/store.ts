import { combineReducers, configureStore, type PreloadedState } from "@reduxjs/toolkit";
import { connectivityReducer } from "./slices/connectivitySlice";

const rootReducer = combineReducers({
  connectivity: connectivityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createAppStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const appStore = createAppStore();

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore["dispatch"];
