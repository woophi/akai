

export default {
  PORT_CORE: parseInt(process.env.PORT, 10) || 3003,
  PORT_AUTH: parseInt(process.env.PORT_AUTH, 10) || 3001,
  PORT_MONGO: process.env.MONGO_URI || 'mongodb://localhost:27017',

  DEV_MODE: process.env.NODE_ENV !== 'production',

  COOKIE_SECRET: process.env.COOKIE_SECRET || '123'

}
