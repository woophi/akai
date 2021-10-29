module.exports = {
  future: {
    webpack5: true,
  },
  publicRuntimeConfig: {
    SITE_URL: process.env.SITE_URI,
    CHANNEL_ID: process.env.CHANNEL_ID,
    CHAT_VIDEO_ID: process.env.CHAT_VIDEO_ID,
    CHAT_DOMAIN: process.env.CHAT_DOMAIN
  }
};
