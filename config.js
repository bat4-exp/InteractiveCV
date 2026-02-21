// API Configuration
// This file determines which API endpoint to use based on the environment
// For GitHub Pages: Use your Vercel Function URL
// For local development: Use localhost

const API_CONFIG = {
  // Set this to your Vercel Function URL when deploying to GitHub Pages
  // Example: 'https://your-project.vercel.app'
  // Leave empty string for local development (uses relative /api/chat)
  VERCEL_API_URL: 'https://interactive-cv-eosin.vercel.app', // Set this in your GitHub Pages environment or build process
  
  // When the page is on the same origin as the API (e.g. live on Vercel), use relative path.
  // When the page is elsewhere (e.g. GitHub Pages or local dashboard), use full VERCEL_API_URL.
  getApiUrl: function() {
    const base = this.VERCEL_API_URL || '';
    if (typeof window !== 'undefined' && window.location?.origin && base) {
      try {
        const apiOrigin = new URL(base).origin;
        if (window.location.origin === apiOrigin) return '/api/chat';
      } catch (_) {}
    }
    if (base) return base.replace(/\/$/, '') + '/api/chat';
    return '/api/chat';
  }
};

// Make it available globally
window.API_CONFIG = API_CONFIG;
