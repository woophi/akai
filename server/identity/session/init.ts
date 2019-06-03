import * as session from 'express-session';
import config from 'server/config';
import * as ConnectMongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import { SchemaNames } from 'server/models/types';

export const initExpressSession = () => {
  const MongoStore = ConnectMongo(session);
  const sessionOptions: session.SessionOptions = {
    secret: config.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: SchemaNames.APP_SESSIONS
    })
  };
  return session(sessionOptions);
}
