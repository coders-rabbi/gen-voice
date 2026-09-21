export const isValidImageSrc = (src?: string | null): src is string => {
  if (!src) return false;
  const trimmed = src.trim();
  if (trimmed === "" || trimmed.toUpperCase() === "N/A") return false;
  return trimmed.startsWith("/") || /^https?:\/\//.test(trimmed);
};

export const getYoutubeId = (url?: string | null): string | null => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

export const getYoutubeEmbedUrl = (url?: string | null): string | null => {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
};

export const getYoutubeThumbnail = (url?: string | null): string | null => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};