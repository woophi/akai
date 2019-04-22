import * as session from 'express-session';
import config from '../../config';
import * as ConnectMongo from 'connect-mongo';
import * as mongoose from 'mongoose';

export const initExpressSession = () => {
  const MongoStore = ConnectMongo(session);
  const sessionOptions: session.SessionOptions = {
    secret: config.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'app_sessions'
    })
  };
  return session(sessionOptions);
}
