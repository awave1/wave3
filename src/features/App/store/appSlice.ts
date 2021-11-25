import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "features/App/store/types";

const initialState: AppState = {
  userAddress: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.userAddress = action.payload;
    },
  },
});

export const { login } = appSlice.actions;

export const appReducer = appSlice.reducer;
