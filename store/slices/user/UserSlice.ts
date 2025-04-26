interface UserState {
  id: string | null;
  firstName: string | null;
  email: string | null;
  role: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  firstName: null,
  lastName: null,
  phoneNumber: null,
  email: null,
  role: null,
  id: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.firstName = null;
      state.email = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
