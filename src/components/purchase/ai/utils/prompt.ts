/**
 * Prompt for extracting order information from conversation transcript
 */

export const ORDER_EXTRACTION_PROMPT = `Extract order information from the conversation transcript. Return ONLY a JSON object with these 4 fields:
- "name": customer name (string or null)
- "location": delivery location (string or null)
- "phoneNumber": contact number (string or null)
- "product": product name like "Hairfall Case Oil", "Dandruff Case Oil", or "Baldness Case Oil" (string or null)

Rules:
- Only extract information explicitly mentioned in the conversation
- If a field is not mentioned, set it to null
- Return valid JSON only, no other text`;

export const buildTranscriptSummary = (
  turns: Array<{ id: number; user: string; model: string }>,
  limit = 12,
  startIndex = 0
): string => {
  const relevantTurns = turns.slice(startIndex);
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
};
