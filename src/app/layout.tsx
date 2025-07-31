import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { Toaster } from "sonner";
import Analytics from "@/components/google-analytics";
import QueryProvider from "@/components/providers/QueryProvider";
import TopLoader from "@/components/top-loader";
import ClientLayoutWrapper from "@/components/client-layout-wrapper";

const br = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yachu Hair Oil - Made in Nepal with 33 Jadibuti",
  description:
    "Are you suffering from hair loss, dandruff, or baldness? Try Yachuhair oil, made in Nepal with 33 Jadibuti for healthier, stronger hair.",
  keywords: [
    "Yachu",
    "hair oil",
    "Nepal",
    "jadibuti",
    "Natural hair care",
    "Natural hair product",
  ],
  openGraph: {
    title: "Yachu Hair Oil - Made in Nepal with 33 Jadibuti",
    description:
      "Are you suffering from hair loss, dandruff, or baldness? Try Yachuhair oil, made in Nepal with 33 Jadibuti for healthier, stronger hair.",
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
    <html lang="en">
      <body className={br.className}>
        <QueryProvider>
          <Suspense fallback={null}>
            <TopLoader />
          </Suspense>
          <Analytics gid="G-HB06VVN470" />
          <ClientLayoutWrapper>
            <main className="min-h-screen">{children}</main>
          </ClientLayoutWrapper>
          <Toaster position="bottom-left" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
