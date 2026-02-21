// API Configuration
// This file determines which API endpoint to use based on the environment
// For GitHub Pages: Use your Vercel Function URL
// For local development: Use localhost

const API_CONFIG = {
  // Set this to your Vercel Function URL when deploying to GitHub Pages
  // Example: 'https://your-project.vercel.app'
  // Leave empty string for local development (uses relative /api/chat)
  VERCEL_API_URL: 'https://interactive-cv-eosin.vercel.app', // Set this in your GitHub Pages environment or build process
  
  // For local development, this will use relative path
  // For production, this will use the VERCEL_API_URL
  getApiUrl: function() {
    // If VERCEL_API_URL is set, use it
    if (this.VERCEL_API_URL) {
      return `${this.VERCEL_API_URL}/api/chat`;
    }
    // Otherwise use relative path (works for local dev or if API is on same domain)
    return '/api/chat';
  }
};

// Make it available globally
window.API_CONFIG = API_CONFIG;
