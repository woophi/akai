const AbstractClientStore = require('express-brute/lib/AbstractClientStore');
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import { BruteForce, BruteForceModel } from 'server/models/types';
import { Logger } from 'server/logger';

export class MongooseStore extends AbstractClientStore {
  model: mongoose.Model<BruteForce, {}>;
  constructor(modelOrCallback) {
    super(modelOrCallback);
    if (modelOrCallback.updateOne && modelOrCallback.findOne) {
      this.model = modelOrCallback;
    } else {
      modelOrCallback(model => {
        this.model = model;
      });
    }
  }

  set(requestId: string, value: BruteForceModel['data'], lifetime, callback) {
    const expires = lifetime
      ? moment()
          .add(lifetime, 'seconds')
          .toDate()
      : undefined;

    const ret = this.model
      .updateOne(
        {
          requestId
        },
        {
          data: value,
          expires
        },
        {
          upsert: true
        }
      )
      .exec();

    if (callback && typeof callback === 'function') {
      ret.then(data => callback(null, data), err => callback(err, null));
    }

    return ret;
  }

  async get(
    requestId: string,
    callback: (err?: mongoose.NativeError, data?: BruteForce) => void
  ) {
    let promise = Promise.resolve(null);

    try {
      const bruteForceObject = await this.model.findOne({ requestId }).exec();

      if (bruteForceObject && bruteForceObject.expires < new Date()) {
        await this.model.deleteMany({ requestId }).exec();
      } else if (bruteForceObject) {
        const { data } = bruteForceObject;
        data.lastRequest = new Date(data.lastRequest);
        data.firstRequest = new Date(data.firstRequest);
        promise = Promise.resolve(data);
      }
    } catch (error) {
      Logger.error(error);
      return Promise.reject(error);
    }

    if (callback && typeof callback === 'function') {
      promise.then(data => callback(null, data), err => callback(err, null));
    }

    return promise;
  }

  reset(
    requestId: string,
    callback: (
      err?: mongoose.NativeError,
      data?: { ok?: number; n?: number }
    ) => void
  ) {
    const ret = this.model.deleteMany({ requestId }).exec();

    if (callback && typeof callback === 'function') {
      ret.then(data => callback(null, data), err => callback(err, null));
    }

    return ret;
  }
}
