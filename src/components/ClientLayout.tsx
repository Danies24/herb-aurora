"use client";

import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { store } from "@/redux/store";
import { queryClient } from "@/lib/reactQueryClient";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HamburgerMenu />
        {children}
        <Toaster position="top-center" />
      </QueryClientProvider>
    </Provider>
  );
}
