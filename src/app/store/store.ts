import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "features/App/store/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
