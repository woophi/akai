import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import * as RateLimiter from 'rate-limiter-flexible';
import { ClientOpts, createClient } from 'redis';
import config from 'server/config';
import { Logger } from 'server/logger';
import { HTTPStatus } from '../models';

const redisOps: ClientOpts = {
  enable_offline_queue: false,
  url: config.REDIS_URI,
};
const redisClient = createClient(redisOps);

const opts = {
  storeClient: redisClient,
  points: 10, // Number of points
  duration: 60, // Per second(s)
};

const rateLimiter = new RateLimiter.RateLimiterRedis({
  ...opts,
  keyPrefix: 'bruteForce',
});

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) =>
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(rateLimiterRes => {
      Logger.info(rateLimiterRes);

      const error = `You've made too many failed attempts in a short period of time, please try again at ${moment()
        .add(rateLimiterRes.msBeforeNext, 'milliseconds')
        .format()}`;
      const secs = Math.round(rateLimiterRes.msBeforeNext / 1000) || 1;
      res.set('Retry-After', String(secs));
      return res.status(HTTPStatus.TooManyRequests).send({ error });
    });
