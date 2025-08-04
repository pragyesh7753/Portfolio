/**
 * Convert Google Drive sharing URL to direct image URL
 * @param driveUrl - Google Drive sharing URL
 * @returns Direct image URL
 */
export const convertDriveUrl = (driveUrl: string): string => {
  // Extract file ID from various Google Drive URL formats
  const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return driveUrl; // Return original if no match
};

/**
 * Get thumbnail URL for Google Drive image
 * @param driveUrl - Google Drive sharing URL
 * @param size - Thumbnail size (default: 800)
 * @returns Thumbnail URL
 */
export const getDriveThumbnail = (driveUrl: string, size: number = 800): string => {
  // Handle /d/ format URLs
  let fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  
  // Handle uc?export=view&id= format URLs
  if (!fileIdMatch) {
    fileIdMatch = driveUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  }
  
  if (fileIdMatch) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
  }
  return driveUrl;
};