const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

/**
 * Get the full URL for an image.
 * Handles both relative URLs (from our server) and absolute URLs.
 */
export function getImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;

  // If it's already an absolute URL, return as-is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // If it's a relative URL from our server, prepend the server URL
  return `${SERVER_URL}${imageUrl}`;
}
