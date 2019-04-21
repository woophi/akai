import { join } from 'path';
import * as express from 'express';
import * as next from 'next';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { createServer } from 'http';
import config from './config';
const appNext = next({ dev: config.DEV_MODE });
const handle = appNext.getRequestHandler();
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend');
import { i18nInstance } from './lib/i18n';
import { registerSocket } from './lib/sockets';
import { router } from './router';

i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
      fallbackLng: 'en',
      preload: ['en'], // preload all langages
      ns: ['common'], // need to preload all the namespaces
      backend: {
        loadPath: join(__dirname, '../static/locales/{{lng}}/{{ns}}.json'),
        addPath: join(__dirname, '../static/locales/{{lng}}/{{ns}}.missing.json')
      }
  }, () => {
    appNext.prepare()
      .then(() => {
        const appExpress = express();
        appExpress.use(bodyParser.urlencoded({ extended: true }));
        appExpress.use(bodyParser.json());
        if (config.DEV_MODE) {
          appExpress.use(logger('dev'));
        } else {
          appExpress.use(helmet());
          appExpress.disable('x-powered-by');
          appExpress.use(logger('combined'));
          appExpress.set('trust proxy', 1);
        }
        appExpress.use(cookieParser(config.COOKIE_SECRET));
        appExpress.use(i18nextMiddleware.handle(i18nInstance));
        // serve locales for client
        appExpress.use('/locales', express.static(join(__dirname, '../static/locales')));
        import('./lib/db');

        router(appExpress, handle);

        const server = createServer(appExpress);
        registerSocket(server);

        server.listen(config.PORT_CORE, () => {
          console.log(`> Ready on http://localhost:${config.PORT_CORE}`)
        });

        server.on('listening', () => {
          const addr = server.address();
          const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

          console.log(`Listening on ${bind}`);
        });

        server.on('error', (err: any) => {
          if (err.syscall !== 'listen') throw err;

          const bind = typeof config.PORT_CORE === 'string' ? `Pipe ${config.PORT_CORE}` : `Port ${config.PORT_CORE}`;

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
  });

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
});
