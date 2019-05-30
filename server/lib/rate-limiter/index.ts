import * as ExpressBrute from 'express-brute';
import { MongooseStore } from './bruteForceStore';
import * as moment from 'moment';
import { Logger } from 'server/logger';
import BruteForceModel from 'server/models/bruteForce';
import { Request, Response, NextFunction } from 'express';
import { HTTPStatus } from '../models';

const store = new MongooseStore(BruteForceModel);

const failCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
  nextValidRequestDate
) => {
  const error = `You've made too many failed attempts in a short period of time, please try again ${moment(
    nextValidRequestDate
  ).fromNow()}`;
  res.send({ error }).status(HTTPStatus.TooManyRequests);
};
const handleStoreError = error => {
  Logger.error(error);

  throw {
    message: error.message,
    parent: error.parent
  };
};

export const userBruteforce = new ExpressBrute(store, {
  freeRetries: 100,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failCallback,
  handleStoreError: handleStoreError,
});
