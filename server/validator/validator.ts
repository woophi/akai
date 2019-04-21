
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logger';
import { isEmpty } from 'ramda';

export class Validator {
  constructor(req?: Request, res?: Response, next?: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }
  req: Request = null;
  res: Response = null;
  next: NextFunction = null;


  check = (requires: {
    [key: string]: any
  }, data: {
    [key: string]: any
  }, cb?: any) => {
    const requireKeys = Object.keys(requires);
    let errors = {};
    requireKeys.forEach(k => {
      if (k in data) {
        const invalid = requires[k](data[k]);
        if (invalid)
          errors[k] = invalid;
      }
    });
    if (!isEmpty(errors)) {
      return this.Exception(errors, 400)
    }
    return cb();
  }

  private Exception = <T>(error: T, code: number) => {
    if (error && this.res) {
      return this.res.send({ error: error }).status(code);
    }
    if (this.next && !error) {
      return this.next();
    }
    return error;
  }

  required = <T>(value: T) => {
    if (!value) {
      const err = 'required';
      return err;
    }
  }

  isEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !re.test(email.toLowerCase())) {
      const err = 'email is invalid';
      return err;
    }
  }

}
