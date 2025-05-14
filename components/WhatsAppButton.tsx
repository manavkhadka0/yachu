"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const WhatsAppButton = () => {
  const pathname = usePathname();
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsCheckoutPage(pathname === "/checkout");
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [pathname]);

  if (isCheckoutPage && isMobile) {
    return null;
  }

  return (
    <Link
      href="https://api.whatsapp.com/send?phone=9779709065821&text=Hello%20yachu%20hair%20oil,%20i%20want%20to%20know%20more%20about%20yachu%20hair%20oil%20and%20its%20benifits"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      target="_blank"
    >
      <div className="bg-white text-black text-sm px-4 py-2 rounded-lg shadow-md mb-2 animate-bounce">
        👋 Chat with us
      </div>

      <button
        className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-xl transition-colors duration-300"
        title="Join our WhatsApp group"
      >
        <img src="/whatsapp.png" alt="whatsapp icon" className="w-12 h-12" />
      </button>
    </Link>
  );
};

export default WhatsAppButton;