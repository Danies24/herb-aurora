// src/redux/slices/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isCartOpen: boolean;
  isLoginOpen: boolean;
}

const initialState: UIState = {
  isCartOpen: false,
  isLoginOpen: false,
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
    openLogin: (state) => {
      state.isLoginOpen = true;
    },
    closeLogin: (state) => {
      state.isLoginOpen = false;
    },
  },
});

export const { openCart, closeCart, toggleCart, openLogin, closeLogin } =
  uiSlice.actions;
export default uiSlice.reducer;
