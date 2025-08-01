// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // other slices...
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
