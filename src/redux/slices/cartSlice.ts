// src/redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const findIndex = (items: CartItem[], id: string, size?: string) =>
  items.findIndex((i) => i.id === id && (size ? i.size === size : true));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const payload = action.payload;
      const idx = findIndex(state.items, payload.id, payload.size);
      if (idx >= 0) {
        state.items[idx].quantity += payload.quantity;
      } else {
        state.items.push(payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; size?: string; quantity: number }>
    ) => {
      const { id, size, quantity } = action.payload;
      const idx = findIndex(state.items, id, size);
      if (idx >= 0) {
        state.items[idx].quantity = Math.max(1, quantity);
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; size?: string }>
    ) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (i) => !(i.id === id && (size ? i.size === size : true))
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
