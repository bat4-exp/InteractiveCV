// GennyChat headless SDK — tenant base URL for conversation + chat API
const GENNY_CONFIG = {
  BASE_URL: 'https://interactieve-cv.admiraal-automations.com',
  getSdkUrl: function () {
    return this.BASE_URL.replace(/\/$/, '') + '/genny-chat.js';
  }
};

window.GENNY_CONFIG = GENNY_CONFIG;
