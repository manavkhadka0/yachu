import { BASE_URL } from "./config";

export const getImageUrl = (imageUrl: string | null | undefined): string => {
  if (!imageUrl) return "/images/fallback.png";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return `${BASE_URL}${imageUrl}`;
};
