import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxeShop — Boutique Premium",
  description: "Découvrez notre collection de produits premium. Livraison rapide, retours gratuits.",
  keywords: ["boutique", "ecommerce", "mode", "accessoires", "premium"],
  openGraph: {
    title: "LuxeShop — Boutique Premium",
    description: "Découvrez notre collection de produits premium.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={geist.className}>        
        <GoogleAnalytics />
        <ThemeProvider>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}