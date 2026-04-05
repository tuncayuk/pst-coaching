import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ConnectivityState = {
  isOnline: boolean;
};

const initialState: ConnectivityState = {
  isOnline: true
};

const connectivitySlice = createSlice({
  name: 'connectivity',
  initialState,
  reducers: {
    setConnectivity(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    }
  }
});

export const { setConnectivity } = connectivitySlice.actions;
export const connectivityReducer = connectivitySlice.reducer;
