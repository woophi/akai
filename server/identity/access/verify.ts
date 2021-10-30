import config from 'server/config';
import * as jwt from 'jsonwebtoken';
import { Claims } from './constants';
type VerifyResult = {
  verificaitionError: jwt.VerifyErrors | null;
  claims: Claims;
};

export const verifyToken = (token: string) =>
  new Promise<VerifyResult>(res => {
    let result: VerifyResult = {
      verificaitionError: null,
      claims: {} as Claims,
    };
    jwt.verify(token, config.ACCESS_SECRET, (err, decoded) => {
      result.verificaitionError = err;
      result.claims = decoded as Claims;
      res(result);
    });
  });
