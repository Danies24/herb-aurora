// src/redux/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isCartOpen: boolean;
  isLoginOpen: boolean;
  authRedirect?: "profile" | "checkout" | null;
}

const initialState: UIState = {
  isCartOpen: false,
  isLoginOpen: false,
  authRedirect: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openLogin: (
      state,
      action: PayloadAction<"profile" | "checkout" | null>
    ) => {
      state.isLoginOpen = true;
      state.authRedirect = action.payload;
    },
    closeLogin: (state) => {
      state.isLoginOpen = false;
    },
    resetAuthRedirect: (state) => {
      state.authRedirect = null;
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  openLogin,
  closeLogin,
  resetAuthRedirect,
} = uiSlice.actions;
export default uiSlice.reducer;
