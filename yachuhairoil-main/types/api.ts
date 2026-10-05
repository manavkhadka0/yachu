// ─── Generic API Utility Types ────────────────────────────────────────────────

/** Generic paginated response wrapper returned by the API */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** Generic API error shape */
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

/** Options accepted by the custom fetcher */
export interface FetcherOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string | undefined>;
}
