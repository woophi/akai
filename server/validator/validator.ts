import { Request, Response, NextFunction } from 'express';
import { HTTPStatus } from 'server/lib/models';
import { Types } from 'mongoose';

export class Validator {
  req?: Request;
  res?: Response;
  next?: NextFunction;
  constructor(req?: Request, res?: Response, next?: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  check = (
    requires: {
      [key: string]: any;
    },
    data: {
      [key: string]: any;
    },
    cb?: any
  ) => {
    const requireKeys = Object.keys(requires);
    let errors: Record<string, any> = {};
    requireKeys.forEach(k => {
      if (k in data) {
        const invalid = requires[k](data[k]);
        if (invalid) errors[k] = invalid;
      }
    });
    if (!this.isEmpty(errors)) {
      return this.Exception(errors, HTTPStatus.BadRequest);
    }
    return cb();
  };

  private Exception = <T>(error: T, code: HTTPStatus) => {
    if (error && this.res) {
      return this.res.status(code).send({ error: error });
    }
    if (this.next && !error) {
      return this.next();
    }
    return error;
  };

  required = <T>(value: T) => {
    if (!value) {
      const err = 'required';
      return err;
    }
  };

  isEmail = (email: string) => {
    const err = 'email is invalid';
    if (!email || !this.typeOfString(email)) {
      return err;
    }
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.toLowerCase())) {
      return err;
    }
  };

  typeOfString = <T>(value: T) => {
    return typeof value === 'string';
  };

  isEmpty = <T>(value: T) => {
    const empty = 'empty';
    if (!value) {
      return empty;
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      for (let key in value) {
        if ((value as unknown as object).hasOwnProperty(key)) {
          return;
        }
      }
      return empty;
    }
    if (Array.isArray(value) && !value.length) {
      return empty;
    }
    if (typeof value !== 'object' && !Array.isArray(value)) {
      return empty;
    }
    return;
  };

  notIsEmpty = <T>(value: T) => {
    const empty = this.isEmpty(value);
    if (empty) {
      return empty;
    }
    return;
  };

  notMongooseObject = <T>(value: T) => {
    this.required(value);
    if (!Types.ObjectId.isValid(value as any)) {
      return 'invalid';
    }
  };
}
