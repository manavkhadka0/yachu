import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer/Footer";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import { PopoverFranchise } from "@/components/popover/PopoverFranchise";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yachu Hair Oil",
  description: "Hair Oil Crafted with a mix of 33 Jadibuti",
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
        <Toaster richColors />
        <main className="min-h-screen"> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
