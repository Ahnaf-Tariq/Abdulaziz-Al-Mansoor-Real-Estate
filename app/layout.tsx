import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/lenis-scroll";
import CustomCursor from "@/components/ui/custom-cursor";
import GrainOverlay from "@/components/ui/grain-overlay";
import LoadingScreen from "@/components/ui/loading-screen";
import { PropsWithChildren } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Abdulaziz Al-Mansoor Real Estate | مجموعة عبد العزيز المنصور لإدارة الأملاك",
  description:
    "Dammam's most trusted property management group since 1984 — managing residential, commercial, and industrial real estate across the Eastern Province.",
  keywords:
    "real estate Dammam, property management Saudi Arabia, Al-Mansoor real estate, عبد العزيز المنصور",
  icons: {
    icon: "https://almansoor.info/wp-content/uploads/2024/09/cropped-logo-32x32.png",
    shortcut:
      "https://almansoor.info/wp-content/uploads/2024/09/cropped-logo-32x32.png",
    apple:
      "https://almansoor.info/wp-content/uploads/2024/09/cropped-logo-32x32.png",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${playfair.variable} ${inter.variable} bg-bg text-text-primary antialiased`}
      >
        <LoadingScreen />
        <LenisProvider>
          <CustomCursor />
          <GrainOverlay />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
