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
const optsRegister = {
  storeClient: redisClient,
  points: 1, // Number of points
  duration: 1, // Per second(s)
};
const optsOrder = {
  storeClient: redisClient,
  points: config.DEV_MODE ? 1000 : 2, // Number of points
  duration: 3600, // Per second(s)
};

const rateLimiter = new RateLimiter.RateLimiterRedis({
  ...opts,
  keyPrefix: 'bruteForce',
});
const rateLimiterRegisterC = new RateLimiter.RateLimiterRedis({
  ...optsRegister,
  keyPrefix: 'bruteForceRegister',
});
const rateLimiterOrderC = new RateLimiter.RateLimiterRedis({
  ...optsOrder,
  keyPrefix: 'bruteForceOrder',
});

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) =>
  rateLimiter
    .consume(`p_${req.path}_ip_${req.ip}_u_${req.session.id ?? 0}`)
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

export const rateLimiterRegister = (req: Request, res: Response, next: NextFunction) =>
  rateLimiterRegisterC
    .consume(`p_${req.path}_ip_${req.ip}_u_${req.session.id ?? 0}`)
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
export const rateLimiterOrder = (req: Request, res: Response, next: NextFunction) =>
  rateLimiterOrderC
    .consume(`p_${req.path}_ip_${req.ip}_u_${req.session.id ?? 0}`)
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
