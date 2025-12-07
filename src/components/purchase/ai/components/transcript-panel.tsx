"use client";

import { ConversationTurn } from "../types";

interface TranscriptPanelProps {
  transcript: ConversationTurn[];
  liveUserTranscript: string;
  liveModelTranscript: string;
}

export default function TranscriptPanel({
  transcript,
  liveUserTranscript,
  liveModelTranscript,
}: TranscriptPanelProps) {
  // Show only latest 2 transcripts
  const latestTranscripts = transcript.slice(-2);
  const hasLiveContent =
    liveUserTranscript.trim().length > 0 ||
    liveModelTranscript.trim().length > 0;

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:top-4 w-auto sm:w-[380px] max-h-[calc(100vh-280px)] z-40 flex flex-col">
      <div className="backdrop-blur-[22px] bg-[rgba(2,6,23,0.78)] border border-white/5 rounded-2xl shadow-[0_30px_70px_rgba(2,6,23,0.45)] overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5">
          <p className="text-xs uppercase tracking-widest text-sky-300 m-0">
            कुराकानी
          </p>
        </div>

        {/* Messages - Messenger style */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {latestTranscripts.length === 0 && !hasLiveContent ? (
            <p className="text-center text-slate-400 text-sm py-8">
              कुराकानी सुरु गर्नुहोस्...
            </p>
          ) : (
            <>
              {latestTranscripts.map((turn) => (
                <div key={turn.id} className="space-y-2">
                  {/* User message - Right aligned */}
                  {turn.user && (
                    <div className="flex justify-end">
                      <div className="max-w-[75%] bg-gradient-to-br from-sky-500 to-teal-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-sm">
                        <p className="m-0 text-sm leading-relaxed whitespace-pre-wrap">
                          {turn.user}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* AI message - Left aligned */}
                  {turn.model && (
                    <div className="flex justify-start">
                      <div className="max-w-[75%] bg-[rgba(15,23,42,0.8)] border border-white/10 text-slate-100 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
                        <p className="m-0 text-sm leading-relaxed whitespace-pre-wrap">
                          {turn.model}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Live messages */}
              {hasLiveContent && (
                <>
                  {liveUserTranscript && (
                    <div className="flex justify-end">
                      <div className="max-w-[75%] bg-gradient-to-br from-sky-500 to-teal-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-sm opacity-80">
                        <p className="m-0 text-sm leading-relaxed whitespace-pre-wrap">
                          {liveUserTranscript}
                        </p>
                        <span className="text-[0.65rem] text-sky-100/70 mt-1 block">
                          Typing...
                        </span>
                      </div>
                    </div>
                  )}
                  {liveModelTranscript && (
                    <div className="flex justify-start">
                      <div className="max-w-[75%] bg-[rgba(15,23,42,0.8)] border border-white/10 text-slate-100 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm opacity-80">
                        <p className="m-0 text-sm leading-relaxed whitespace-pre-wrap">
                          {liveModelTranscript}
                        </p>
                        <span className="text-[0.65rem] text-slate-400 mt-1 block">
                          AI is typing...
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
