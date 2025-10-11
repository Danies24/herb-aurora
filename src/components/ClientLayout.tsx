"use client";

import { Provider, useDispatch } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import { store } from "@/redux/store";
import { queryClient } from "@/lib/reactQueryClient";
import { hydrateFromLocalStorage } from "@/redux/slices/authSlice";

import HamburgerMenu from "@/components/HamburgerMenu";
import LoginModal from "@/components/LoginModal";
import CartDrawer from "@/components/CartDrawer";

/**
 * This component runs once on app load.
 * It hydrates Redux auth state from localStorage.
 */
function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch(hydrateFromLocalStorage());
    setHydrated(true);
  }, [dispatch]);

  // Prevent UI flicker before hydration
  if (!hydrated) return null;

  return <>{children}</>;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppInitializer>
          <HamburgerMenu />
          {children}
          <CartDrawer />
          <LoginModal />
          <Toaster position="top-center" reverseOrder={false} />
        </AppInitializer>
      </QueryClientProvider>
    </Provider>
  );
}
