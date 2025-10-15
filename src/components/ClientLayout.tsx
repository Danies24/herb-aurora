"use client";

import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { persistor, store } from "@/redux/store";
import { queryClient } from "@/lib/reactQueryClient";

import HamburgerMenu from "@/components/HamburgerMenu";
import LoginModal from "@/components/LoginModal";
import CartDrawer from "@/components/CartDrawer";
import { PersistGate } from "redux-persist/integration/react";
import { useFirebaseTokenSync } from "@/hooks/useFirebaseTokenSync";

/**
 * This component runs once on app load.
 * It hydrates Redux auth state from localStorage.
 */
function AppInitializer({ children }: { children: React.ReactNode }) {
  const firebaseReady = useFirebaseTokenSync();

  if (!firebaseReady) {
    return null;
  }
  return <>{children}</>;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppInitializer>
            <HamburgerMenu />
            {children}
            <CartDrawer />
            <LoginModal />
            <Toaster position="top-center" reverseOrder={false} />
          </AppInitializer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
