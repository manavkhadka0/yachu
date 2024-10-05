import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Footer from "@/components/layout/footer/Footer";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import { Toaster } from "sonner";
import WhatsAppButton from "@/components/WhatsAppButton";

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
    "herbal hair care",
    "natural hair product",
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
        <Header />
        <Toaster position="bottom-left" richColors />
        <main className="min-h-screen"> {children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
