export type ConversationTurn = {
  id: number;
  user: string;
  model: string;
};

export type OrderItem = {
  name: string;
  quantity?: number;
  notes?: string;
};

export type OrderDetails = {
  confirmationStatus: "confirmed" | "pending" | "missing";
  fullName?: string;
  location?: string;
  phoneNumber?: string;
  products?: OrderItem[];
};

export type OrderExtractionResult = {
  hasOrder: boolean;
  orderDetails?: OrderDetails;
  followUpMessage: string;
};

export type OrderAnalysisStatus =
  | "idle"
  | "pending"
  | "confirmed"
  | "needs_attention"
  | "none";
