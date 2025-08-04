// Google Drive Asset Configuration
// Replace the file IDs with your actual Google Drive file IDs

export const DRIVE_ASSETS = {
  // Profile Images
  profile: "/images/dp.png",
  
  // Certificates - Replace with actual Drive URLs
  certificates: {
    mernStack: "https://drive.google.com/file/d/1mern-stack-certificate-id/view",
    python: "https://drive.google.com/file/d/1python-certificate-id/view", 
    aincat: "https://drive.google.com/file/d/1aincat-certificate-id/view",
    innoviz: "https://drive.google.com/file/d/10BadZlGjPAen5ArSRActyX7W1jjFP4TI/view",
    merit: "https://drive.google.com/file/d/1-NElN1Nzlr7rZJ3KZMIgkEeuCU2X0gZ2/view",
    java: "https://drive.google.com/file/d/1-OQW-uE9895leHDSoU8MC_qwF9x6Eqko/view",
    bapu: "https://drive.google.com/file/d/1-llO6dL6eguwMM4dOcymZ7j3Iu9Thjsz/view",
    voter: "https://drive.google.com/file/d/1-s3ush5s-l02xGnR5EQImH-evfbcXq8n/view"
  },
  
  // Documents
  resume: "https://drive.google.com/file/d/1SWw_1mCAbpi7jnYLK1U0Su984fp_EVnU/view"
};

// Helper function to get asset URL
export const getAssetUrl = (path: string): string => {
  const keys = path.split('.');
  let current: any = DRIVE_ASSETS;
  
  for (const key of keys) {
    current = current[key];
    if (!current) return '';
  }
  
  return current;
};