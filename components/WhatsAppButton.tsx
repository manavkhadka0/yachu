"use client";

import React from "react";
import Link from "next/link";
const WhatsAppButton = () => {
  return (
    <Link
      href="https://api.whatsapp.com/send?phone=9779840412788&text=Hello%20yachu%20hair%20oil,%20i%20want%20to%20know%20more%20bout%20yachu%20hair%20oil%20and%20its%20benifits"
      className="group fixed bottom-3 right-14"
      target="_blank"
    >
      <button
        className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-3 shadow-lg transition-colors duration-300"
        title="Join our WhatsApp group"
      >
        <img src="/whatsapp.png" alt="whatsapp icon" className="w-10 h-10" />
      </button>
      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
        Contact us in WhatsApp
      </span>
    </Link>
  );
};

export default WhatsAppButton;
