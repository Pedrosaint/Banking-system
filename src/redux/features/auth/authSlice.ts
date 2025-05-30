// features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  role: "admin" | "user" | null;
}

const initialState: AuthState = {
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<"admin" | "user">) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.role = null;
    },
  },
});

export const { setRole, logout } = authSlice.actions;
export default authSlice.reducer;
