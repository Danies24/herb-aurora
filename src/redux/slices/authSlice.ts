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
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
    hydrateFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
          state.user = JSON.parse(storedUser);
          state.token = storedToken;
          state.isLoggedIn = true;
        }
      }
    },
  },
});

export const { setCredentials, logout, hydrateFromLocalStorage } =
  authSlice.actions;

export default authSlice.reducer;
