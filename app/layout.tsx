import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SBS Cosmétique — Beauté Naturelle & Bio",
  description: "Découvrez notre gamme de cosmétiques naturels et biologiques. Livraison gratuite dès 50€, retours gratuits sous 30 jours.",
  keywords: ["cosmétique", "bio", "naturel", "beauté", "soin", "cruelty-free"],
  openGraph: {
    title: "SBS Cosmétique — Beauté Naturelle & Bio",
    description: "Découvrez notre gamme de cosmétiques naturels et biologiques.",
    type: "website",
    url: "https://sbs-cosmestique.vercel.app",
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