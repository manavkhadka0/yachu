export const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL_DEV + "/api"
    : process.env.NEXT_PUBLIC_BASE_URL_DEV + "/api";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL_DEV
    : process.env.NEXT_PUBLIC_BASE_URL_DEV;
