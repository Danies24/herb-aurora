import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout"; // 👈 wrapper for client-only parts

import "@/styles/globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Herb Aurora – 100% Natural Tamil Herbal Skincare",
  description:
    "Explore Herb Aurora's traditional Paatti remedies – handcrafted skincare powders for glowing, chemical-free skin.",
  metadataBase: new URL("https://herbaurora.in"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
