import { BASE_API_URL } from "./config";
import type { FetcherOptions } from "@/types";

export {
  productsApi,
  blogApi,
  ordersApi,
  instantOrdersApi,
  contactApi,
  teamApi,
  siteSettingsApi,
  testimonialsApi,
  videoApi,
} from "../services";

export const fetcher = async <T = unknown>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // If the body is FormData, remove Content-Type so fetch sets the boundary automatically
  if (
    options.body instanceof FormData ||
    (options.headers &&
      "Content-Type" in options.headers &&
      options.headers["Content-Type"] === undefined)
  ) {
    delete headers["Content-Type"];
  }

  const res = await fetch(`${BASE_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      (errorData as { message?: string }).message ||
        `HTTP error! status: ${res.status}`
    );
  }

  // Handle 204 No Content or empty responses
  if (res.status === 204) {
    return null as T;
  }

  return res.json().catch(() => ({}) as T);
};

export const franchise = "sankhamul";
