"use client";

import { OrderDetails, OrderAnalysisStatus } from "../types";

interface OrderSummaryModalProps {
  isOpen: boolean;
  orderAnalysisStatus: OrderAnalysisStatus;
  extractedOrder: OrderDetails | null;
  onClose: () => void;
}

const statusCopy: Record<
  "pending" | "confirmed" | "needs_attention" | "none",
  string
> = {
  pending: "कुराकानी विश्लेषण गर्दै...",
  confirmed: "अर्डर पक्का भयो ✅",
  needs_attention: "अझ केही विवरण चाहियो 🤝",
  none: "अर्डर भेटिएन",
};

export default function OrderSummaryModal({
  isOpen,
  orderAnalysisStatus,
  extractedOrder,
  onClose,
}: OrderSummaryModalProps) {
  if (!isOpen || orderAnalysisStatus === "idle") return null;

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
        className="w-full max-w-[520px] p-8 rounded-[26px] bg-[rgba(15,23,42,0.94)] border border-slate-400/30 shadow-[0_30px_80px_rgba(15,23,42,0.85)] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-sky-300 m-0">
              अर्डर स्थिति
            </p>
            <h3 className="mt-1 mb-0 text-slate-50 text-xl">
              {statusCopy[orderAnalysisStatus]}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close summary"
            className="border-none bg-[rgba(15,23,42,0.8)] rounded-full w-9 h-9 text-slate-200 text-base cursor-pointer border border-slate-400/20 hover:text-slate-50 hover:border-sky-400/60 transition-colors"
          >
            ✕
          </button>
        </header>

        {extractedOrder ? (
          <div className="flex flex-col gap-2 text-sm text-slate-200">
            {extractedOrder.name && (
              <p className="m-0">
                <strong>ग्राहक:</strong> {extractedOrder.name}
              </p>
            )}
            {extractedOrder.location && (
              <p className="m-0">
                <strong>Location:</strong> {extractedOrder.location}
              </p>
            )}
            {extractedOrder.phoneNumber && (
              <p className="m-0">
                <strong>सम्पर्क:</strong> {extractedOrder.phoneNumber}
              </p>
            )}
            {extractedOrder.product && (
              <p className="m-0">
                <strong>उत्पादन:</strong> {extractedOrder.product}
              </p>
            )}
          </div>
        ) : (
          <p className="m-0 text-slate-200/90 leading-relaxed">
            अहिलेसम्म अर्डर पुष्टि भएको छैन।
          </p>
        )}

        <footer className="flex justify-end mt-3">
          <button
            onClick={onClose}
            className="rounded-full px-5 py-2 border-none bg-gradient-to-br from-sky-500 to-green-500 text-slate-50 font-semibold cursor-pointer text-sm transition-all hover:opacity-90"
          >
            ठिक छ
          </button>
        </footer>
      </section>
    </div>
  );
}
