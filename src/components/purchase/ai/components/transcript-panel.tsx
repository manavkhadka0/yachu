"use client";

import { ConversationTurn } from "../types";

interface TranscriptPanelProps {
  transcript: ConversationTurn[];
  liveUserTranscript: string;
  liveModelTranscript: string;
}

function TranscriptBubble({
  type,
  text,
  isLive = false,
}: {
  type: "user" | "model";
  text: string;
  isLive?: boolean;
}) {
  if (!text) return null;

  const label = type === "user" ? "तपाईं" : "एआई";
  const turnClasses =
    type === "user"
      ? "border-sky-400/35 bg-[rgba(3,105,161,0.4)]"
      : "border-teal-400/35 bg-[rgba(6,78,59,0.35)]";

  return (
    <div
      className={`p-4 rounded-2xl bg-[rgba(15,23,42,0.72)] border border-white/5 ${turnClasses}`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-200/90 mb-1">
        <span>{label}</span>
        {isLive && (
          <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-cyan-400/15 text-cyan-300 animate-pulse">
            Live
          </span>
        )}
      </div>
      <p className="m-0 leading-relaxed text-slate-100 text-sm whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}

export default function TranscriptPanel({
  transcript,
  liveUserTranscript,
  liveModelTranscript,
}: TranscriptPanelProps) {
  const hasLiveContent =
    liveUserTranscript.trim().length > 0 ||
    liveModelTranscript.trim().length > 0;

  return (
    <aside className="fixed top-10 right-10 w-full max-w-[420px] z-40 p-6 flex flex-col gap-4 max-h-[calc(100vh-5rem)] backdrop-blur-[22px] bg-[rgba(2,6,23,0.78)] border border-white/5 rounded-3xl shadow-[0_30px_70px_rgba(2,6,23,0.45)] max-lg:static max-lg:w-full max-lg:max-h-none max-lg:mx-auto max-lg:my-6 max-lg:order-[-1]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-sky-300 m-0">
            कुराकानी
          </p>
          <h2 className="text-xl mt-1 mb-0 text-slate-50">याचु एआई प्रतिकृया</h2>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-slate-400/18 text-slate-200 text-sm">
          {transcript.length} turns
        </span>
      </div>
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3.5">
        {transcript.length === 0 && !hasLiveContent ? (
          <p className="text-left text-slate-200/80 leading-relaxed text-sm p-3">
            यहाँ तपाईं र याचु एआई बीचको सबैभन्दा पछिल्लो कुराकानी देखिन्छ।
            सुरु गर्न तलको माइक बटन थिच्नुहोस्।
          </p>
        ) : (
          <>
            {transcript.map((turn) => (
              <div key={turn.id}>
                <TranscriptBubble type="user" text={turn.user} />
                <TranscriptBubble type="model" text={turn.model} />
              </div>
            ))}
            {hasLiveContent && (
              <>
                <TranscriptBubble type="user" text={liveUserTranscript} isLive />
                <TranscriptBubble type="model" text={liveModelTranscript} isLive />
              </>
            )}
          </>
        )}
      </div>
    </aside>
  );
}

