

export default {
  PORT_CORE: parseInt(process.env.PORT, 10) || 3003,
  SITE_URI: process.env.SITE_URI || 'http://localhost:3003',
  PORT_MONGO: process.env.MONGO_URI || 'mongodb://localhost:27017',

  DEV_MODE: process.env.NODE_ENV !== 'production',

  COOKIE_SECRET: process.env.COOKIE_SECRET || '123',

  ACCESS_SECRET: process.env.ACCESS_SECRET || '124',

  // gmail
  GMAIL_APP_PASS: process.env.GMAIL_APP_PASS,
  GMAIL_USER: process.env.GMAIL_USER,

  //cloudinary
  FS_CLOUD_NAME: process.env.FS_CLOUD_NAME,
  FS_API_KEY: process.env.FS_API_KEY,
  FS_API_SECRET: process.env.FS_API_SECRET,

  // instagram
  IG_USERNAME: process.env.IG_USERNAME,
  IG_PASSWORD: process.env.IG_PASSWORD,

  //faceebook
  FB_APP_ID: process.env.FB_APP_ID,
  FB_APP_SECRET: process.env.FB_APP_SECRET
}
