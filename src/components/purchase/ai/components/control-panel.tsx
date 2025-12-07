"use client";

import { OrderAnalysisStatus } from "../types";

interface ControlPanelProps {
  isRecording: boolean;
  status: string;
  error: string;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onReset: () => void;
  orderAnalysisStatus: OrderAnalysisStatus;
  lastAnalyzedTurn: number;
  onOpenOrderSummary: () => void;
}

export default function ControlPanel({
  isRecording,
  status,
  error,
  onStartRecording,
  onStopRecording,
  onReset,
  orderAnalysisStatus,
  lastAnalyzedTurn,
  onOpenOrderSummary,
}: ControlPanelProps) {
  const statusRowClasses = `flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-200 ${
    isRecording ? "recording" : ""
  } ${error ? "error" : ""}`;

  return (
    <section className="fixed bottom-0 left-0 right-0 sm:bottom-12 sm:left-1/2 sm:-translate-x-1/2 w-full sm:max-w-[620px] px-3 py-3 sm:px-7 sm:py-6 z-30 flex flex-col gap-3 sm:gap-5 backdrop-blur-[22px] bg-[rgba(2,6,23,0.78)] border-t sm:border border-white/5 rounded-t-3xl sm:rounded-3xl shadow-[0_30px_70px_rgba(2,6,23,0.45)]">
      <div className={statusRowClasses}>
        <span
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all flex-shrink-0 ${
            isRecording
              ? "bg-red-400 shadow-[0_0_16px_rgba(248,113,113,0.9)]"
              : error
              ? "bg-pink-400 shadow-[0_0_16px_rgba(251,113,133,0.9)]"
              : "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          }`}
        />
        <span className="truncate">
          {error || status || "माइक सुरु गर्न तयार छ।"}
        </span>
      </div>

      {lastAnalyzedTurn > 0 &&
        orderAnalysisStatus !== "idle" &&
        !isRecording && (
          <button
            type="button"
            onClick={onOpenOrderSummary}
            className="self-start ml-1 -mt-1 border border-slate-400/30 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 bg-[rgba(15,23,42,0.65)] text-slate-200 text-xs sm:text-sm tracking-wide cursor-pointer transition-all hover:border-sky-400/90 hover:text-slate-50"
          >
            अर्डर विवरण हेर्नुहोस्
          </button>
        )}

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <button
          onClick={onReset}
          disabled={isRecording}
          className="flex items-center justify-center gap-1.5 sm:gap-3 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-xs sm:text-base font-semibold text-slate-50 transition-all bg-[rgba(15,23,42,0.7)] border border-white/5 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(2,6,23,0.45)] disabled:opacity-40 disabled:cursor-not-allowed"
          title="Reset Session"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
            className="w-4 h-4 sm:w-7 sm:h-7"
          >
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
          </svg>
          <span className="hidden sm:inline">Reset</span>
        </button>
        <button
          onClick={onStartRecording}
          disabled={isRecording}
          className="flex items-center justify-center gap-1.5 sm:gap-3 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-xs sm:text-base font-semibold text-slate-50 transition-all bg-gradient-to-br from-sky-500 to-teal-500 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(2,6,23,0.45)] disabled:opacity-40 disabled:cursor-not-allowed"
          title="Start Recording"
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-4 h-4 sm:w-7 sm:h-7"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <span className="hidden sm:inline">Record</span>
        </button>
        <button
          onClick={onStopRecording}
          disabled={!isRecording}
          className="flex items-center justify-center gap-1.5 sm:gap-3 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-xs sm:text-base font-semibold text-slate-50 transition-all bg-gradient-to-br from-red-400 to-pink-500 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(2,6,23,0.45)] disabled:opacity-40 disabled:cursor-not-allowed"
          title="Stop Recording"
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-4 h-4 sm:w-7 sm:h-7"
          >
            <rect x="15" y="15" width="70" height="70" rx="10" />
          </svg>
          <span className="hidden sm:inline">Stop</span>
        </button>
      </div>
    </section>
  );
}
