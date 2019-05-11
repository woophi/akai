const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript({
  webpack(config, options) {
    config.resolve.modules.unshift(__dirname);
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./polyfills/index.js')) {
        entries['main.js'].unshift('./polyfills/index.js');
      }

      return entries;
    }

    return config;
  },
  publicRuntimeConfig: {
    SITE_URL: process.env.SITE_URI
  }
})
