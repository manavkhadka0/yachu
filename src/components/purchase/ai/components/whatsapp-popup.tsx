"use client";

import { X, MessageCircle, Phone } from "lucide-react";
import { yachuPhone, yachuWhatsApp } from "@/constants/constant";

interface WhatsAppPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onContact?: () => void;
}

export default function WhatsAppPopup({
  isOpen,
  onClose,
  onContact,
}: WhatsAppPopupProps) {
  if (!isOpen) return null;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${yachuWhatsApp.replace(
    "+",
    ""
  )}&text=${encodeURIComponent(
    "Hello! I'm interested in Yachu Hair Oil. Can you help me with my order?"
  )}`;
  const phoneUrl = `tel:${yachuPhone.replace(/\s/g, "")}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[22px]"
      style={{
        background: `radial-gradient(circle at top left, rgba(56, 189, 248, 0.1), transparent 55%),
          radial-gradient(circle at bottom right, rgba(45, 212, 191, 0.08), transparent 55%)`,
      }}
      onClick={onClose}
    >
      <section
        className="w-full max-w-[420px] p-6 sm:p-8 rounded-[26px] bg-[rgba(15,23,42,0.94)] border border-slate-400/30 shadow-[0_30px_80px_rgba(15,23,42,0.85)] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-sky-300 m-0">
              सम्पर्क
            </p>
            <h3 className="mt-1 mb-0 text-slate-50 text-xl">
              वास्तविक बिक्री व्यक्तिसँग सम्पर्क गर्नुहोस्
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="border-none bg-[rgba(15,23,42,0.8)] rounded-full w-9 h-9 text-slate-200 text-base cursor-pointer border border-slate-400/20 hover:text-slate-50 hover:border-sky-400/60 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex flex-col gap-3">
          <p className="text-slate-200 text-sm leading-relaxed m-0">
            तपाईंको अर्डर अझै पूरा भएको छैन। कृपया हाम्रो बिक्री टिमसँग सीधै
            सम्पर्क गर्नुहोस् र तपाईंको अर्डर पूरा गर्नुहोस्।
          </p>

          <div className="flex flex-col gap-2.5 mt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onContact}
              className="flex items-center justify-center gap-3 rounded-xl p-4 bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold transition-all hover:from-green-600 hover:to-green-700 hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp मा सम्पर्क गर्नुहोस्</span>
            </a>

            <a
              href={phoneUrl}
              onClick={onContact}
              className="flex items-center justify-center gap-3 rounded-xl p-4 bg-[rgba(15,23,42,0.8)] border border-slate-400/30 text-slate-200 font-semibold transition-all hover:bg-[rgba(15,23,42,0.9)] hover:text-slate-50 hover:border-sky-400/50"
            >
              <Phone className="w-5 h-5" />
              <span>{yachuPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
