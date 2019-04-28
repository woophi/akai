

export default {
  PORT_CORE: parseInt(process.env.PORT, 10) || 3003,
  PORT_AUTH: parseInt(process.env.PORT_AUTH, 10) || 3001,
  PORT_MONGO: process.env.MONGO_URI || 'mongodb://localhost:27017',

  DEV_MODE: process.env.NODE_ENV !== 'production',

  COOKIE_SECRET: process.env.COOKIE_SECRET || '123',

  ACCESS_SECRET: process.env.ACCESS_SECRET || '124',

  GMAIL_APP_PASS: process.env.GMAIL_APP_PASS,
  GMAIL_USER: process.env.GMAIL_USER,

  FS_CLOUD_NAME: process.env.FS_CLOUD_NAME,
  FS_API_KEY: process.env.FS_API_KEY,
  FS_API_SECRET: process.env.FS_API_SECRET
}
