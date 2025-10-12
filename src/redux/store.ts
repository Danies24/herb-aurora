// src/redux/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";
import cartReducer from "./slices/cartSlice";
import UIReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";

const rootReducers = combineReducers({
  cart: cartReducer,
  ui: UIReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
