import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  line1: string;
  line2?: string;
  pincode: string;
  city?: string;
  state?: string;
  isDefault?: boolean;
}

interface User {
  firebaseUid: string;
  fullName: string;
  phone: string;
  address?: Address;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
