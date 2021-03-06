import './moduleResolver';
if (!process.env.NO_DV) {
  const dotenv = require('dotenv');
  const result = dotenv.config({ debug: true });
  if (result.error) {
    throw result.error;
  }
}
import * as fs from 'fs';
import { join } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { createServer } from 'http';
import config from './config';

const nextI18NextMiddleware = require('next-i18next/middleware');

import nextI18next from './lib/i18n';
import { registerSocket } from './lib/sockets';
import { router } from './router';
import { initExpressSession } from './identity';
import fileUpload from 'express-fileupload';
import { checkConfiguration } from './utils/helpers';
import { applyMigration } from './lib/updates';
import connection, { agenda } from './lib/db';
import next from 'next';
import cors from 'cors';
import { LocalErros } from './lib/models';

const appNext = next({ dev: config.DEV_MODE });
const handle = appNext.getRequestHandler();

checkConfiguration(config);
const whitelist = config.ALLOWED_ORIGINS.split(',');
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(LocalErros.CORS));
    }
  }
};

appNext.prepare().then(async () => {
  const appExpress = express();
  appExpress.use(bodyParser.urlencoded({ extended: true }));
  appExpress.use(bodyParser.json());
  appExpress.use(fileUpload());
  if (config.DEV_MODE) {
    appExpress.use(logger('dev'));
  } else {
    appExpress.use(cors(corsOptions));
    appExpress.use(helmet());
    appExpress.disable('x-powered-by');
    appExpress.use(logger('tiny'));
    appExpress.set('trust proxy', 1);
  }
  appExpress.use(cookieParser(config.COOKIE_SECRET));
  appExpress.use(initExpressSession());
  appExpress.use(nextI18NextMiddleware(nextI18next));
  // serve locales for client
  appExpress.use('/locales', express.static(join(__dirname, '../static/locales')));
  await connection;
  if (!fs.existsSync(join(__dirname, 'storage/temp'))) {
    fs.mkdirSync(join(__dirname, 'storage/temp'));
  }
  router(appExpress, handle, appNext);

  const server = createServer(appExpress);
  registerSocket(server);

  applyMigration();
  server.listen(config.PORT_CORE, () => {
    console.log(`> Ready on http://localhost:${config.PORT_CORE}`);
  });

  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

    console.log(`Listening on ${bind}`);
  });

  server.on('error', (err: any) => {
    if (err.syscall !== 'listen') throw err;

    const bind =
      typeof config.PORT_CORE === 'string'
        ? `Pipe ${config.PORT_CORE}`
        : `Port ${config.PORT_CORE}`;

    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
      default:
        throw err;
    }
  });
});

process.on('uncaughtException', async err => {
  console.error(err);
  await agenda.stop();
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error(err);
});
