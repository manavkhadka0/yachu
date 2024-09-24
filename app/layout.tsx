import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Footer from "@/components/layout/footer/Footer";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import { Toaster } from "sonner";

const br = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yachuhair Oil - 33 Jadibuti Hair Treatment from Nepal",
  description:
    "Discover Yachuhair oil from Nepal, crafted with 33 traditional herbs (jadibuti) for natural hair care.",
  keywords: [
    "Yachuhair",
    "hair oil",
    "Nepal",
    "jadibuti",
    "herbal hair care",
    "natural hair product",
  ],
  openGraph: {
    title: "Yachuhair Oil - 33 Jadibuti Hair Treatment from Nepal",
    description:
      "Experience the power of 33 Nepalese herbs in Yachuhair oil for healthier, stronger hair.",
    images: [
      {
        url: "/yachu-hair-oil-bottle.png",
        width: 1200,
        height: 630,
        alt: "Yachuhair Oil Product Image",
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
        <Footer />
      </body>
    </html>
  );
}
