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
import WhatsAppPopup from "./components/whatsapp-popup";
import DataCollectionIndicator from "./components/data-collection-indicator";
import { createBlob, decode, decodeAudioData } from "./utils/audio-utils";
import {
  ORDER_EXTRACTION_PROMPT,
  buildTranscriptSummary,
} from "./utils/prompt";
import {
  ConversationTurn,
  OrderDetails,
  OrderAnalysisStatus,
  OrderExtractionResult,
} from "./types";
import posthog from "posthog-js";

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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [showTakeOrderButton, setShowTakeOrderButton] = useState(true);
  const [hasOrderPlaced, setHasOrderPlaced] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState(false);
  const [allTranscripts, setAllTranscripts] = useState<ConversationTurn[]>([]);
  const lastActivityTimeRef = useRef<number>(Date.now());
  const conversationEndTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastExtractionTimeRef = useRef<number>(0);
  const extractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isExtractingRef = useRef<boolean>(false);
  const pendingExtractionRef = useRef<ConversationTurn[] | null>(null);

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
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });

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
              const serverContent = message.serverContent as {
                turnComplete?: { turnEnded?: boolean; interrupted?: boolean };
                modelTurn?: {
                  parts?: Array<{
                    text?: string;
                    inlineData?: { data?: string };
                  }>;
                };
                outputTranscription?: { text?: string };
                inputTranscription?: { text?: string };
                interrupted?: boolean;
              };
              const audio = serverContent?.modelTurn?.parts?.[0]?.inlineData;

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
                  decode(audio.data || ""),
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
                lastActivityTimeRef.current = Date.now();
              }

              if (serverContent?.inputTranscription?.text) {
                const newText = serverContent.inputTranscription.text;
                liveUserTranscriptRef.current += newText;
                setLiveUserTranscript((prev) => prev + newText);
                lastActivityTimeRef.current = Date.now();
              }

              if (serverContent?.turnComplete) {
                const userInput = liveUserTranscriptRef.current.trim();
                const modelOutput = liveModelTranscriptRef.current.trim();
                if (userInput || modelOutput) {
                  const newTurn = {
                    id: ++turnCounterRef.current,
                    user: userInput,
                    model: modelOutput,
                  };
                  // Save to all transcripts
                  setAllTranscripts((prev) => [...prev, newTurn]);
                  // Show only latest 2 transcripts (for display)
                  setTranscript((prev) => {
                    const updated = [...prev, newTurn];
                    return updated.slice(-2);
                  });
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
      } catch (e) {
        const error = e instanceof Error ? e.message : String(e);
        console.error("Session initialization failed:", error);
        updateError(`Failed to initialize session: ${error}`);
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

  // Stop greeting audio when user starts talking

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

        // Update last activity time
        lastActivityTimeRef.current = Date.now();

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
      setShowTakeOrderButton(false); // Hide button, show minimal status
      updateStatus("🔴 कुराकानी जारी छ...");
      setIsOrderModalOpen(false);
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      console.error("Error starting recording:", error);
      updateError(`Error: ${error}`);
      isRecordingRef.current = false;
      setIsRecording(false);
    }
  }, [updateStatus, updateError]);

  // Handle "Take Order" button click (greeting already played automatically, just start recording)
  const handleTakeOrder = useCallback(() => {
    if (!sessionRef.current) {
      updateError("Session not ready. Please wait...");
      return;
    }

    // Track AI voice order started with PostHog
    posthog.capture("ai_voice_order_started", {
      session_ready: true,
    });

    // Hide the "Take Order" button immediately
    setShowTakeOrderButton(false);

    // Start recording directly (greeting already played automatically on page load)
    if (!isRecordingRef.current) {
      startRecording();
    }
  }, [startRecording, updateError]);

  // Simple extraction function - returns JSON data using @google/genai
  const performExtraction = useCallback(
    async (
      transcripts: ConversationTurn[]
    ): Promise<OrderExtractionResult | null> => {
      if (isExtractingRef.current) {
        return null;
      }

      const transcriptText = buildTranscriptSummary(transcripts, 12, 0);
      if (!transcriptText) {
        return null;
      }

      isExtractingRef.current = true;
      lastExtractionTimeRef.current = Date.now();

      try {
        const prompt = `${ORDER_EXTRACTION_PROMPT}\n\nConversation Transcript:\n${transcriptText}`;

        // Use fetch with the extraction API key - @google/genai doesn't have a direct generateContent method
        // We'll use the REST API directly but with the extraction client's API key
        const extractionApiKey =
          process.env.NEXT_PUBLIC_GEMINI_EXTRACTION_API_KEY ||
          process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
          process.env.GEMINI_API_KEY;

        if (!extractionApiKey) {
          console.error("Extraction API key not configured");
          isExtractingRef.current = false;
          return null;
        }

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${extractionApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: prompt }],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: {
                  type: "object",
                  properties: {
                    name: { type: "string", nullable: true },
                    location: { type: "string", nullable: true },
                    phoneNumber: { type: "string", nullable: true },
                    product: { type: "string", nullable: true },
                  },
                  required: [],
                },
              },
            }),
          }
        );

        // Handle rate limiting (429 errors) - just return null, don't retry
        if (response.status === 429) {
          console.warn("Rate limit hit. Skipping extraction.");
          isExtractingRef.current = false;
          return null;
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP ${response.status}:`, errorText);
          isExtractingRef.current = false;
          return null;
        }

        const json = await response.json();
        const textResponse =
          json.candidates
            ?.flatMap(
              (candidate: { content?: { parts?: Array<{ text?: string }> } }) =>
                candidate.content?.parts
                  ?.map((part: { text?: string }) => part.text || "")
                  .filter(Boolean) || []
            )
            .join("")
            .trim() || "{}";

        const parsed: OrderExtractionResult = JSON.parse(textResponse);

        // Update state with extracted data
        setExtractedOrder({
          name: parsed.name,
          location: parsed.location,
          phoneNumber: parsed.phoneNumber,
          product: parsed.product,
        });

        // Update order status based on completeness
        if (
          parsed.name &&
          parsed.location &&
          parsed.phoneNumber &&
          parsed.product
        ) {
          setOrderAnalysisStatus("confirmed");
          setHasOrderPlaced(true);

          // Track AI voice order completed with PostHog
          posthog.capture("ai_voice_order_completed", {
            customer_name: parsed.name,
            product: parsed.product,
            has_phone: true,
            has_location: true,
          });
        } else if (
          parsed.name ||
          parsed.location ||
          parsed.phoneNumber ||
          parsed.product
        ) {
          setOrderAnalysisStatus("needs_attention");
        } else {
          setOrderAnalysisStatus("none");
        }

        isExtractingRef.current = false;
        return parsed;
      } catch (err) {
        isExtractingRef.current = false;
        const error = err instanceof Error ? err.message : String(err);
        console.error("Order extraction failed:", error);

        // Handle rate limiting (429 errors)
        if (
          error.includes("429") ||
          (err as { status?: number })?.status === 429
        ) {
          console.warn("Rate limit hit. Skipping extraction.");
        }

        return null;
      }
    },
    []
  );

  // Simple extraction function - pass in transcript, get JSON data back
  const extractOrderDetails = useCallback(
    async (
      transcripts: ConversationTurn[]
    ): Promise<OrderExtractionResult | null> => {
      if (!transcripts || transcripts.length === 0) return null;

      const transcriptText = buildTranscriptSummary(transcripts, 12, 0);
      if (!transcriptText) {
        return null;
      }

      if (isExtractingRef.current) {
        console.log("Extraction already in progress, skipping...");
        return null;
      }

      const now = Date.now();
      const MIN_DELAY_BETWEEN_CALLS = 3000;

      if (now - lastExtractionTimeRef.current < MIN_DELAY_BETWEEN_CALLS) {
        const delay =
          MIN_DELAY_BETWEEN_CALLS - (now - lastExtractionTimeRef.current);
        return new Promise((resolve) => {
          setTimeout(async () => {
            const result = await performExtraction(transcripts);
            resolve(result);
          }, delay);
        });
      }

      return await performExtraction(transcripts);
    },
    [performExtraction]
  );

  // Simplified analyzeTranscript - uses the same extraction function
  const analyzeTranscript = useCallback(
    async (startIndex = 0) => {
      if (!clientRef.current || allTranscripts.length === 0) return false;
      if (allTranscripts.length === startIndex) {
        return false;
      }

      const result = await extractOrderDetails(allTranscripts);
      if (result) {
        lastAnalyzedTurnRef.current = allTranscripts.length;
        return true;
      }
      return false;
    },
    [allTranscripts, extractOrderDetails]
  );

  const handleCallEnded = useCallback(async () => {
    if (
      allTranscripts.length === 0 ||
      allTranscripts.length === lastAnalyzedTurnRef.current
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
  }, [allTranscripts, analyzeTranscript]);

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

    updateStatus("कुराकानी समाप्त भयो।");
    liveUserTranscriptRef.current = "";
    liveModelTranscriptRef.current = "";
    setLiveUserTranscript("");
    setLiveModelTranscript("");

    // Extract order details when recording stops
    if (allTranscripts.length > 0 && extractOrderDetails) {
      extractOrderDetails(allTranscripts).then(
        (result: OrderExtractionResult | null) => {
          if (result) {
            // Data already updated in performExtraction
            console.log("Order details extracted:", result);
          }
        }
      );
    }

    // Call handleCallEnded if available (defined later)
    if (handleCallEnded) {
      handleCallEnded();
    }
  }, [updateStatus, allTranscripts, extractOrderDetails]);

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
    setAllTranscripts([]);
    liveUserTranscriptRef.current = "";
    liveModelTranscriptRef.current = "";
    setLiveUserTranscript("");
    setLiveModelTranscript("");
    setOrderAnalysisStatus("idle");
    setExtractedOrder(null);
    lastAnalyzedTurnRef.current = 0;
    setIsOrderModalOpen(false);
    turnCounterRef.current = 0;
    isRecordingRef.current = false;
    setIsRecording(false);
    setShowTakeOrderButton(true);

    // Clear extraction timeout and reset extraction state
    if (extractionTimeoutRef.current) {
      clearTimeout(extractionTimeoutRef.current);
      extractionTimeoutRef.current = null;
    }
    lastExtractionTimeRef.current = 0;
    isExtractingRef.current = false;
    pendingExtractionRef.current = null;

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
                const serverContent = message.serverContent as {
                  turnComplete?: { turnEnded?: boolean; interrupted?: boolean };
                  modelTurn?: {
                    parts?: Array<{
                      text?: string;
                      inlineData?: { data?: string };
                    }>;
                  };
                  outputTranscription?: { text?: string };
                  inputTranscription?: { text?: string };
                  interrupted?: boolean;
                };
                const audio = serverContent?.modelTurn?.parts?.[0]?.inlineData;

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
                    decode(audio.data || ""),
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
                    const newTurn = {
                      id: ++turnCounterRef.current,
                      user: userInput,
                      model: modelOutput,
                    };
                    // Save to all transcripts
                    setAllTranscripts((prev) => [...prev, newTurn]);
                    // Show only latest 2 transcripts (for display)
                    setTranscript((prev) => {
                      const updated = [...prev, newTurn];
                      return updated.slice(-2);
                    });
                  }
                  liveUserTranscriptRef.current = "";
                  liveModelTranscriptRef.current = "";
                  setLiveUserTranscript("");
                  setLiveModelTranscript("");
                }

                const interrupted =
                  serverContent?.interrupted ||
                  serverContent?.turnComplete?.interrupted;
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
        } catch (e) {
          const error = e instanceof Error ? e.message : String(e);
          console.error("Session reset failed:", error);
          updateError(`Failed to reset session: ${error}`);
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

  // Removed local buildTranscriptSummary - using the one from utils/prompt.ts
  // Note: performExtraction, extractOrderDetails, analyzeTranscript, and handleCallEnded are defined earlier

  // Detect conversation end
  useEffect(() => {
    if (isRecordingRef.current || hasOrderPlaced) {
      setConversationEnded(false);
      return;
    }

    const checkConversationEnd = () => {
      const timeSinceLastActivity = Date.now() - lastActivityTimeRef.current;
      const CONVERSATION_END_TIMEOUT = 10000; // 10 seconds of inactivity

      if (
        allTranscripts.length > 0 &&
        timeSinceLastActivity > CONVERSATION_END_TIMEOUT &&
        !isRecordingRef.current
      ) {
        setConversationEnded(true);
      } else {
        setConversationEnded(false);
      }
    };

    conversationEndTimerRef.current = setInterval(checkConversationEnd, 2000);

    return () => {
      if (conversationEndTimerRef.current) {
        clearInterval(conversationEndTimerRef.current);
      }
    };
  }, [allTranscripts.length, hasOrderPlaced]);

  // Handle navigation attempt
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasOrderPlaced && transcript.length > 0) {
        e.preventDefault();
        e.returnValue = "";
        setIsWhatsAppPopupOpen(true);
        return "";
      }
    };

    const handlePopState = () => {
      if (!hasOrderPlaced && transcript.length > 0) {
        setIsWhatsAppPopupOpen(true);
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasOrderPlaced, transcript.length]);

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
        <DataCollectionIndicator
          name={extractedOrder?.name || null}
          phoneNumber={extractedOrder?.phoneNumber || null}
          location={extractedOrder?.location || null}
          product={extractedOrder?.product || null}
        />
        <ControlPanel
          showTakeOrder={showTakeOrderButton}
          isRecording={isRecording}
          status={status}
          error={error}
          onTakeOrder={handleTakeOrder}
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
          onClose={() => setIsOrderModalOpen(false)}
        />
        <WhatsAppPopup
          isOpen={isWhatsAppPopupOpen}
          onClose={() => setIsWhatsAppPopupOpen(false)}
          onContact={() => setIsWhatsAppPopupOpen(false)}
        />
      </div>
    </main>
  );
}
