// ─── FAQ Domain Types ─────────────────────────────────────────────────────────

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export type FAQs = FAQ[];
