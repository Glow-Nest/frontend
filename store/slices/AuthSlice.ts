interface AuthState {
  firstName: string | null;
  email: string | null;
  role: string | null;
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  firstName: null,
  email: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.firstName = action.payload.firstName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.firstName = null;
      state.email = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
