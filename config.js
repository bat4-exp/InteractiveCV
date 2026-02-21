// API endpoint: same-origin /api/chat when served from Vercel; full URL when from GitHub Pages etc.
const API_CONFIG = {
  VERCEL_API_URL: 'https://interactive-cv-eosin.vercel.app',
  getApiUrl: function () {
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
