export type ConversationTurn = {
  id: number;
  user: string;
  model: string;
};

export type OrderDetails = {
  name: string | null;
  location: string | null;
  phoneNumber: string | null;
  product: string | null;
};

export type OrderExtractionResult = {
  name: string | null;
  location: string | null;
  phoneNumber: string | null;
  product: string | null;
};

export type OrderAnalysisStatus =
  | "idle"
  | "pending"
  | "confirmed"
  | "needs_attention"
  | "none";
