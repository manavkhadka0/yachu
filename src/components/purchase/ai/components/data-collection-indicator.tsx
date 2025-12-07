"use client";

import { Check, X } from "lucide-react";

interface DataCollectionIndicatorProps {
  name: string | null;
  phoneNumber: string | null;
  location: string | null;
  product: string | null;
}

export default function DataCollectionIndicator({
  name,
  phoneNumber,
  location,
  product,
}: DataCollectionIndicatorProps) {
  const items = [
    { label: "नाम", value: name, key: "name" },
    { label: "सम्पर्क नम्बर", value: phoneNumber, key: "phone" },
    { label: "Location", value: location, key: "location" },
    { label: "उत्पादन", value: product, key: "product" },
  ];

  const collectedCount = items.filter((item) => item.value).length;
  const totalCount = items.length;

  return (
    <div className="fixed bottom-32 sm:bottom-40 left-1/2 -translate-x-1/2 z-40 backdrop-blur-[22px] bg-[rgba(2,6,23,0.85)] border border-white/5 rounded-2xl p-4 shadow-[0_30px_70px_rgba(2,6,23,0.45)] min-w-[280px] sm:min-w-[320px]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wider text-sky-300 m-0">
          एकत्रित विवरण
        </p>
        <span className="text-xs text-slate-400">
          {collectedCount}/{totalCount}
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center gap-2.5 text-sm"
          >
            {item.value ? (
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-slate-500 flex-shrink-0" />
            )}
            <span className={item.value ? "text-slate-100" : "text-slate-400"}>
              {item.label}
            </span>
            {item.value && (
              <span className="text-xs text-slate-300 ml-auto truncate max-w-[140px] sm:max-w-[180px]">
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
