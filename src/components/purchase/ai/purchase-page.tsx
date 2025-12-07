"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  GoogleGenAI,
  LiveServerMessage,
  Modality,
  Session,
  EndSensitivity,
  StartSensitivity,
} from "@google/genai";
import Visual3D from "./components/visual-3d";
import ControlPanel from "./components/control-panel";
import TranscriptPanel from "./components/transcript-panel";
import OrderSummaryModal from "./components/order-summary-modal";
import { createBlob, decode, decodeAudioData } from "./utils/audio-utils";
import {
  ConversationTurn,
  OrderDetails,
  OrderAnalysisStatus,
  OrderExtractionResult,
} from "./types";

export default function PurchasePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [systemInstruction, setSystemInstruction] = useState("");
  const selectedVoice = "Kore"; // Always use Kore voice
  const [transcript, setTranscript] = useState<ConversationTurn[]>([]);
  const [liveUserTranscript, setLiveUserTranscript] = useState("");
  const [liveModelTranscript, setLiveModelTranscript] = useState("");
  const liveUserTranscriptRef = useRef("");
  const liveModelTranscriptRef = useRef("");
  const [orderAnalysisStatus, setOrderAnalysisStatus] =
    useState<OrderAnalysisStatus>("idle");
  const [extractedOrder, setExtractedOrder] = useState<OrderDetails | null>(
    null
  );
  const [orderFollowUpMessage, setOrderFollowUpMessage] = useState("");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const clientRef = useRef<GoogleGenAI | null>(null);
  const sessionRef = useRef<Session | null>(null);
  const sessionPromiseRef = useRef<Promise<Session> | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputNodeRef = useRef<GainNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef(0);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const scriptProcessorNodeRef = useRef<ScriptProcessorNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const turnCounterRef = useRef(0);
  const lastAnalyzedTurnRef = useRef(0);
  const isRecordingRef = useRef(false);

  const updateStatus = useCallback((msg: string) => {
    setStatus(msg);
    setError("");
  }, []);

  const updateError = useCallback((msg: string) => {
    setError(msg);
    setStatus("");
  }, []);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        updateStatus("Loading instructions...");
        const response = await fetch("/metadata.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSystemInstruction(data.prompt);
      } catch (e) {
        console.error("Could not load metadata.json", e);
        updateError("Could not load system instructions.");
      }
    };

    loadMetadata();
  }, [updateStatus, updateError]);

  useEffect(() => {
    const initAudio = () => {
      const inputCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)({ sampleRate: 24000 });

      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      inputNodeRef.current = inputCtx.createGain();
      outputNodeRef.current = outputCtx.createGain();
      nextStartTimeRef.current = outputCtx.currentTime;

      outputNodeRef.current.connect(outputCtx.destination);
    };

    initAudio();

    const apiKey =
      process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      updateError(
        "API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY or GEMINI_API_KEY."
      );
      return;
    }

    clientRef.current = new GoogleGenAI({
      apiKey,
    });

    const initSession = async () => {
      if (!clientRef.current) return;

      const model = "gemini-2.5-flash-native-audio-preview-09-2025";

      try {
        updateStatus("Initializing session...");
        const sessionPromise = clientRef.current.live.connect({
          model: model,
          callbacks: {
            onopen: () => {
              updateStatus("Session opened. Ready to start.");
            },
            onmessage: async (message: LiveServerMessage) => {
              const serverContent = message.serverContent as any;
              const audio = serverContent?.modelTurn?.parts[0]?.inlineData;

              if (
                audio &&
                outputAudioContextRef.current &&
                outputNodeRef.current
              ) {
                nextStartTimeRef.current = Math.max(
                  nextStartTimeRef.current,
                  outputAudioContextRef.current.currentTime
                );

                const audioBuffer = await decodeAudioData(
                  decode(audio.data),
                  outputAudioContextRef.current,
                  24000,
                  1
                );
                const source =
                  outputAudioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNodeRef.current);
                source.addEventListener("ended", () => {
                  sourcesRef.current.delete(source);
                });

                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current =
                  nextStartTimeRef.current + audioBuffer.duration;
                sourcesRef.current.add(source);
              }

              if (serverContent?.outputTranscription?.text) {
                const newText = serverContent.outputTranscription.text;
                liveModelTranscriptRef.current += newText;
                setLiveModelTranscript((prev) => prev + newText);
              }

              if (serverContent?.inputTranscription?.text) {
                const newText = serverContent.inputTranscription.text;
                liveUserTranscriptRef.current += newText;
                setLiveUserTranscript((prev) => prev + newText);
              }

              if (serverContent?.turnComplete) {
                const userInput = liveUserTranscriptRef.current.trim();
                const modelOutput = liveModelTranscriptRef.current.trim();
                if (userInput || modelOutput) {
                  setTranscript((prev) => [
                    ...prev,
                    {
                      id: ++turnCounterRef.current,
                      user: userInput,
                      model: modelOutput,
                    },
                  ]);
                }
                liveUserTranscriptRef.current = "";
                liveModelTranscriptRef.current = "";
                setLiveUserTranscript("");
                setLiveModelTranscript("");
              }

              const interrupted = serverContent?.interrupted;
              if (interrupted) {
                for (const source of sourcesRef.current.values()) {
                  source.stop();
                  sourcesRef.current.delete(source);
                }
                nextStartTimeRef.current = 0;
                liveUserTranscriptRef.current = "";
                liveModelTranscriptRef.current = "";
                setLiveUserTranscript("");
                setLiveModelTranscript("");
              }
            },
            onerror: (e: ErrorEvent) => {
              updateError(`Error: ${e.message}`);
            },
            onclose: (e: CloseEvent) => {
              updateStatus("Session closed: " + e.reason);
            },
          },
          config: {
            responseModalities: [Modality.AUDIO],
            inputAudioTranscription: {},
            outputAudioTranscription: {},
            realtimeInputConfig: {
              automaticActivityDetection: {
                startOfSpeechSensitivity:
                  StartSensitivity.START_SENSITIVITY_LOW,
                endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
                prefixPaddingMs: 20,
                silenceDurationMs: 50,
              },
            },
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: selectedVoice },
              },
            },
            systemInstruction: systemInstruction,
          },
        });

        sessionPromiseRef.current = sessionPromise;
        sessionRef.current = await sessionPromise;
        updateStatus("Session ready. Click Record to start.");
      } catch (e: any) {
        console.error("Session initialization error:", e);
        updateError(`Failed to initialize session: ${e.message}`);
      }
    };

    if (clientRef.current && systemInstruction) {
      initSession();
    }

    return () => {
      if (sessionRef.current) {
        try {
          sessionRef.current.close();
        } catch (e) {
          console.error("Error closing session:", e);
        }
      }
    };
  }, [systemInstruction, updateStatus, updateError]);

  const startRecording = useCallback(async () => {
    if (
      isRecordingRef.current ||
      !inputAudioContextRef.current ||
      !sessionRef.current
    ) {
      return;
    }

    inputAudioContextRef.current.resume();
    updateStatus("Requesting microphone access...");

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      updateStatus("Microphone access granted. Starting capture...");

      const sourceNode =
        inputAudioContextRef.current.createMediaStreamSource(mediaStream);
      sourceNode.connect(inputNodeRef.current!);
      sourceNodeRef.current = sourceNode;

      const bufferSize = 4096;
      const scriptProcessorNode =
        inputAudioContextRef.current.createScriptProcessor(bufferSize, 1, 1);

      scriptProcessorNode.onaudioprocess = (audioProcessingEvent) => {
        if (!isRecordingRef.current || !sessionRef.current) return;

        const inputBuffer = audioProcessingEvent.inputBuffer;
        const pcmData = inputBuffer.getChannelData(0);

        try {
          sessionRef.current.sendRealtimeInput({ media: createBlob(pcmData) });
        } catch (err) {
          console.error("Error sending audio:", err);
        }
      };

      sourceNode.connect(scriptProcessorNode);
      scriptProcessorNode.connect(inputAudioContextRef.current.destination);

      mediaStreamRef.current = mediaStream;
      scriptProcessorNodeRef.current = scriptProcessorNode;
      isRecordingRef.current = true;
      setIsRecording(true);
      updateStatus("🔴 Recording...");
      setIsOrderModalOpen(false);
    } catch (err: any) {
      console.error("Error starting recording:", err);
      updateError(`Error: ${err.message}`);
      isRecordingRef.current = false;
      setIsRecording(false);
    }
  }, [updateStatus, updateError]);

  const stopRecording = useCallback(() => {
    if (!isRecordingRef.current && !mediaStreamRef.current) return;

    updateStatus("Stopping recording...");
    isRecordingRef.current = false;
    setIsRecording(false);

    if (
      scriptProcessorNodeRef.current &&
      sourceNodeRef.current &&
      inputAudioContextRef.current
    ) {
      scriptProcessorNodeRef.current.disconnect();
      sourceNodeRef.current.disconnect();
    }

    scriptProcessorNodeRef.current = null;
    sourceNodeRef.current = null;

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    updateStatus("Recording stopped. Click Start to begin again.");
    liveUserTranscriptRef.current = "";
    liveModelTranscriptRef.current = "";
    setLiveUserTranscript("");
    setLiveModelTranscript("");
    handleCallEnded();
  }, [updateStatus]);

  const reset = useCallback(() => {
    if (isRecordingRef.current) {
      stopRecording();
    }

    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {
        console.error("Error closing session on reset:", e);
      }
    }

    setTranscript([]);
    liveUserTranscriptRef.current = "";
    liveModelTranscriptRef.current = "";
    setLiveUserTranscript("");
    setLiveModelTranscript("");
    setOrderAnalysisStatus("idle");
    setExtractedOrder(null);
    setOrderFollowUpMessage("");
    lastAnalyzedTurnRef.current = 0;
    setIsOrderModalOpen(false);
    turnCounterRef.current = 0;
    isRecordingRef.current = false;
    setIsRecording(false);

    // Reinitialize session after reset
    if (clientRef.current && systemInstruction) {
      const initSession = async () => {
        const model = "gemini-2.5-flash-native-audio-preview-09-2025";
        try {
          updateStatus("Reinitializing session...");
          const sessionPromise = clientRef.current!.live.connect({
            model: model,
            callbacks: {
              onopen: () => {
                updateStatus("Session opened. Ready to start.");
              },
              onmessage: async (message: LiveServerMessage) => {
                const serverContent = message.serverContent as any;
                const audio = serverContent?.modelTurn?.parts[0]?.inlineData;

                if (
                  audio &&
                  outputAudioContextRef.current &&
                  outputNodeRef.current
                ) {
                  nextStartTimeRef.current = Math.max(
                    nextStartTimeRef.current,
                    outputAudioContextRef.current.currentTime
                  );

                  const audioBuffer = await decodeAudioData(
                    decode(audio.data),
                    outputAudioContextRef.current,
                    24000,
                    1
                  );
                  const source =
                    outputAudioContextRef.current.createBufferSource();
                  source.buffer = audioBuffer;
                  source.connect(outputNodeRef.current);
                  source.addEventListener("ended", () => {
                    sourcesRef.current.delete(source);
                  });

                  source.start(nextStartTimeRef.current);
                  nextStartTimeRef.current =
                    nextStartTimeRef.current + audioBuffer.duration;
                  sourcesRef.current.add(source);
                }

                if (serverContent?.outputTranscription?.text) {
                  const newText = serverContent.outputTranscription.text;
                  liveModelTranscriptRef.current += newText;
                  setLiveModelTranscript((prev) => prev + newText);
                }

                if (serverContent?.inputTranscription?.text) {
                  const newText = serverContent.inputTranscription.text;
                  liveUserTranscriptRef.current += newText;
                  setLiveUserTranscript((prev) => prev + newText);
                }

                if (serverContent?.turnComplete) {
                  const userInput = liveUserTranscriptRef.current.trim();
                  const modelOutput = liveModelTranscriptRef.current.trim();
                  if (userInput || modelOutput) {
                    setTranscript((prev) => [
                      ...prev,
                      {
                        id: ++turnCounterRef.current,
                        user: userInput,
                        model: modelOutput,
                      },
                    ]);
                  }
                  liveUserTranscriptRef.current = "";
                  liveModelTranscriptRef.current = "";
                  setLiveUserTranscript("");
                  setLiveModelTranscript("");
                }

                const interrupted = serverContent?.interrupted;
                if (interrupted) {
                  for (const source of sourcesRef.current.values()) {
                    source.stop();
                    sourcesRef.current.delete(source);
                  }
                  nextStartTimeRef.current = 0;
                  liveUserTranscriptRef.current = "";
                  liveModelTranscriptRef.current = "";
                  setLiveUserTranscript("");
                  setLiveModelTranscript("");
                }
              },
              onerror: (e: ErrorEvent) => {
                updateError(`Error: ${e.message}`);
              },
              onclose: (e: CloseEvent) => {
                updateStatus("Session closed: " + e.reason);
              },
            },
            config: {
              responseModalities: [Modality.AUDIO],
              inputAudioTranscription: {},
              outputAudioTranscription: {},
              realtimeInputConfig: {
                automaticActivityDetection: {
                  startOfSpeechSensitivity:
                    StartSensitivity.START_SENSITIVITY_LOW,
                  endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
                  prefixPaddingMs: 20,
                  silenceDurationMs: 50,
                },
              },
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: selectedVoice },
                },
              },
              systemInstruction: systemInstruction,
            },
          });
          sessionPromiseRef.current = sessionPromise;
          sessionRef.current = await sessionPromise;
          updateStatus("Session reset and ready.");
        } catch (e: any) {
          console.error("Error reinitializing session:", e);
          updateError(`Failed to reinitialize session: ${e.message}`);
        }
      };
      initSession();
    } else {
      updateStatus("Session reset.");
    }
  }, [
    updateStatus,
    updateError,
    systemInstruction,
    selectedVoice,
    stopRecording,
  ]);

  const buildTranscriptSummary = useCallback(
    (limit = 12, startIndex = 0) => {
      const relevantTurns = transcript.slice(startIndex);
      if (relevantTurns.length === 0) {
        return "";
      }
      const recentTurns = relevantTurns.slice(-limit);
      return recentTurns
        .map(
          (turn) =>
            `Turn ${turn.id}:
User: ${turn.user || "(silence)"}
AI: ${turn.model || "(silence)"}`
        )
        .join("\n\n")
        .trim();
    },
    [transcript]
  );

  const analyzeTranscript = useCallback(
    async (startIndex = 0) => {
      if (!clientRef.current || transcript.length === 0) return false;
      if (transcript.length === startIndex) {
        return false;
      }

      const transcriptText = buildTranscriptSummary(12, startIndex);
      if (!transcriptText) {
        return false;
      }

      const prompt = `You are an order understanding assistant for Yachu Nepal. Read the conversation transcript and decide if the customer is placing or confirming an order. Reply ONLY with JSON that matches this schema:
- "hasOrder": true when there's intent to order or confirm, otherwise false.
- "orderDetails": include only when hasOrder is true and must contain:
  • "confirmationStatus": "confirmed" | "pending" | "missing"
  • "fullName" (null if customer name not captured)
  • "location" (null if not captured)
  • "phoneNumber" (null if not captured)
  • "products": array of objects with "name" (e.g., "Hairfall Case Oil", "Dandruff Case Oil", "Baldness Case Oil") plus optional numeric "quantity" and optional "notes". Use null when no product info yet.
- "followUpMessage": short friendly Nepali sentence guiding the AI on what to say next.
If any field is missing, set it to null and mark confirmationStatus as "pending". Focus on conversational tone—don't fabricate details. Only extract name, phoneNumber, and location.`;

      try {
        const apiKey =
          process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
          console.warn("Missing API key for order analysis.");
          setOrderAnalysisStatus("none");
          setOrderFollowUpMessage(
            "API key सेट नभएकाले अर्डर विवरण निकाल्न सकिएन।"
          );
          return false;
        }

        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
            apiKey,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: prompt }],
              },
              contents: [
                {
                  role: "user",
                  parts: [{ text: transcriptText }],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: {
                  type: "object",
                  properties: {
                    hasOrder: { type: "boolean" },
                    orderDetails: {
                      type: "object",
                      nullable: true,
                      properties: {
                        confirmationStatus: {
                          type: "string",
                          enum: ["confirmed", "pending", "missing"],
                        },
                        fullName: { type: "string", nullable: true },
                        location: { type: "string", nullable: true },
                        phoneNumber: { type: "string", nullable: true },
                        products: {
                          type: "array",
                          nullable: true,
                          items: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              quantity: { type: "number", nullable: true },
                              notes: { type: "string", nullable: true },
                            },
                            required: ["name"],
                          },
                        },
                      },
                    },
                    followUpMessage: { type: "string" },
                  },
                  required: ["hasOrder", "followUpMessage"],
                },
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();
        const textResponse =
          json.candidates
            ?.flatMap(
              (candidate: any) =>
                candidate.content?.parts
                  ?.map((part: any) => part.text || "")
                  .filter(Boolean) || []
            )
            .join("")
            .trim() || "{}";
        const parsed: OrderExtractionResult = JSON.parse(textResponse);

        setExtractedOrder(parsed.orderDetails || null);
        setOrderFollowUpMessage(parsed.followUpMessage || "");

        if (parsed.hasOrder) {
          if (parsed.orderDetails?.confirmationStatus === "confirmed") {
            setOrderAnalysisStatus("confirmed");
          } else {
            setOrderAnalysisStatus("needs_attention");
          }
        } else {
          setOrderAnalysisStatus("none");
          setExtractedOrder(null);
        }
        lastAnalyzedTurnRef.current = transcript.length;
        return true;
      } catch (err) {
        console.error("Order analysis failed:", err);
        setOrderAnalysisStatus("none");
        setOrderFollowUpMessage(
          orderFollowUpMessage ||
            "अर्डर विवरण पुष्टि गर्न सकिएन। फेरि प्रयास गर्नुहोस्।"
        );
        return false;
      }
    },
    [transcript, buildTranscriptSummary]
  );

  const handleCallEnded = useCallback(async () => {
    if (
      transcript.length === 0 ||
      transcript.length === lastAnalyzedTurnRef.current
    ) {
      return;
    }

    const startIndex = lastAnalyzedTurnRef.current;
    setOrderAnalysisStatus("pending");
    setIsOrderModalOpen(false);

    const success = await analyzeTranscript(startIndex);
    if (success) {
      setIsOrderModalOpen(true);
    }
  }, [transcript, analyzeTranscript]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-['Inter','Noto_Sans_Devanagari',system-ui,sans-serif] text-slate-50">
      <div className="relative min-h-screen w-full max-lg:p-6">
        <Visual3D
          inputNode={inputNodeRef.current}
          outputNode={outputNodeRef.current}
        />
        <TranscriptPanel
          transcript={transcript}
          liveUserTranscript={liveUserTranscript}
          liveModelTranscript={liveModelTranscript}
        />
        <ControlPanel
          isRecording={isRecording}
          status={status}
          error={error}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onReset={reset}
          orderAnalysisStatus={orderAnalysisStatus}
          lastAnalyzedTurn={lastAnalyzedTurnRef.current}
          onOpenOrderSummary={() => {
            if (
              orderAnalysisStatus !== "idle" &&
              orderAnalysisStatus !== "pending"
            ) {
              setIsOrderModalOpen(true);
            }
          }}
        />
        <OrderSummaryModal
          isOpen={isOrderModalOpen}
          orderAnalysisStatus={orderAnalysisStatus}
          extractedOrder={extractedOrder}
          orderFollowUpMessage={orderFollowUpMessage}
          onClose={() => setIsOrderModalOpen(false)}
        />
      </div>
    </main>
  );
}
