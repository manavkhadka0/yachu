"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import CallNowButton from "@/components/layout/CallNow";
import { QuickOrder } from "@/components/layout/QuickOrder";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      {/* Add bottom padding on mobile so the fixed bottom bar doesn't overlap content */}
      {!isAdmin ? (
        <div className="pb-24 md:pb-0">{children}</div>
      ) : (
        children
      )}

      {/* Mobile bottom action bar */}
      {!isAdmin && (
        <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden flex items-center gap-3">
          <div className="flex-1">
            <QuickOrder isMobileBar={true} />
          </div>
          <CallNowButton isMobileBar={true} />
        </div>
      )}

      {/* Desktop call now button */}
      {!isAdmin && <CallNowButton isMobileBar={false} />}

      {!isAdmin && <Footer />}
    </>
  );
}
