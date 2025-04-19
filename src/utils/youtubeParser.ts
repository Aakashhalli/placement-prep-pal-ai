
/**
 * Extract the YouTube video ID from a URL
 */
export const extractYoutubeId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

/**
 * Validate if a string is a valid YouTube URL
 */
export const isValidYoutubeUrl = (url: string): boolean => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
};

/**
 * Format a YouTube URL to standard format
 */
export const formatYoutubeUrl = (url: string): string => {
  const videoId = extractYoutubeId(url);
  if (!videoId) return url;
  return `https://www.youtube.com/watch?v=${videoId}`;
};

/**
 * Get YouTube video thumbnail URL
 */
export const getYoutubeThumbnail = (url: string): string => {
  const videoId = extractYoutubeId(url);
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
