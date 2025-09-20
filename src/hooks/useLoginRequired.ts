"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function useLoginRequired() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  return (action: () => void) => {
    if (isLoggedIn) {
      action();
    } else {
      router.push("/login");
    }
  };
}
