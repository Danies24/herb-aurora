"use client";

import { useAppSelector } from "@/redux/hooks";

export default function GlobalLoader() {
  const { isLoading, loadingMessage } = useAppSelector((s) => s.cart);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/70">
      {/* Spinner */}
      <div className="mb-4 animate-spin">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="100"
            strokeDashoffset="60"
          />
        </svg>
      </div>

      {loadingMessage && (
        <div className="text-white text-lg font-bold">
          HERB AURORA – {loadingMessage}
        </div>
      )}
    </div>
  );
}
