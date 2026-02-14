/**
 * Get the full URL for an image.
 * Handles local public assets (e.g. /assets/...) and absolute URLs.
 */
export function getImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;

  // Absolute URLs and local public paths (starting with /) work as-is
  return imageUrl;
}

/**
 * Get full URLs for an array of images.
 * Handles both relative URLs (from our server) and absolute URLs.
 */
export function getImageUrls(images: string[] | undefined | null): string[] {
  if (!images || images.length === 0) return [];
  return images
    .map((img) => getImageUrl(img))
    .filter((url): url is string => url !== null);
}
