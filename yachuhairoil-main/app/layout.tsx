import React from "react";
import {
  Playfair_Display,
  Inter,
  Caveat,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";

const playfair = Playfair_Display({
  variable: "--font-display-next",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body-next",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-script-next",
  subsets: ["latin"],
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari-next",
  weight: ["400", "500", "600"],
  subsets: ["devanagari"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yachu Hair Oil - Made in Nepal with 33 Ingredients",
  description:
    "Are you suffering from hair loss, dandruff, or baldness? Try Yachuhair oil, made in Nepal with 33 Ingredients for healthier, stronger hair.",
  keywords: [
    "Yachu",
    "hair oil",
    "Nepal",
    "Ingredients",
    "Natural hair care",
    "Natural hair product",
  ],
  openGraph: {
    title: "Yachu Hair Oil - Made in Nepal with 33 Ingredients",
    description:
      "Are you suffering from hair loss, dandruff, or baldness? Try Yachuhair oil, made in Nepal with 33 Ingredients for healthier, stronger hair.",
    images: [
      {
        url: "/yachu-hair-oil-bottle.png",
        width: 1200,
        height: 630,
        alt: "Yachu Hair Oil Product Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${caveat.variable} ${devanagari.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
