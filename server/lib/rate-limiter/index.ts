import * as RateLimiter from 'rate-limiter-flexible';
import { databaseUri } from '../db';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'server/logger';
import mongoose from 'mongoose';
import { HTTPStatus } from '../models';
import moment from 'moment';

const mongoOpts = {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 100 // Reconnect every 100ms
};

const connectStore = mongoose.createConnection(databaseUri, mongoOpts);
const opts = {
  storeClient: connectStore,
  points: 10, // Number of points
  duration: 60 // Per second(s)
};

const rateLimiterMongo = new RateLimiter.RateLimiterMongo({
  ...opts,
  keyPrefix: 'bruteForce'
});

export const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  rateLimiterMongo
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(rateLimiterRes => {
      Logger.info(rateLimiterRes);

      const error = `You've made too many failed attempts in a short period of time, please try again at ${moment()
        .add(rateLimiterRes.msBeforeNext, 'milliseconds')
        .format()}`;
      return res.status(HTTPStatus.TooManyRequests).send({ error });
    });
