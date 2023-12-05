import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer/Footer";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header/Header";
import { PopoverFranchise } from "@/components/popover/PopoverFranchise";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yachu",
  description: "Hair Oil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <PopoverFranchise />

        <Toaster />
        <main className="min-h-screen"> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
