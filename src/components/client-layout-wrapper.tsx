"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/footer";
import CallNowButton from "@/components/call-now-button";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({
  children,
}: ClientLayoutWrapperProps) {
  const pathname = usePathname();

  // Add any routes where you don't want header/footer
  const isAdmin = pathname.startsWith("/admin");
  const isSpecialPage =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/purchase") ||
    pathname.startsWith("/info") ||
    pathname.startsWith("/price-guess") ||
    pathname.startsWith("/instant-order");

  return (
    <>
      {!isAdmin && !isSpecialPage && <Header />}
      {children}
      {!isAdmin && !isSpecialPage && <CallNowButton />}
      {!isAdmin && !isSpecialPage && <Footer />}
    </>
  );
}
