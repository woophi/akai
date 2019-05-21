import config from '../../config';
import * as jwt from 'jsonwebtoken';
import { Claims } from './constants';
import { verifyToken } from './verify';

const oneDay = 86400;
const tenDays = '10d';
export const setAccessToken = (params: Claims = {}) => {
	return jwt.sign(params, config.ACCESS_SECRET, {
		expiresIn: oneDay
	});
}
export const setRefreshToken = async (params: Claims = {}, token?: string) => {
  if (token) {
    const { verificaitionError } = await verifyToken(token);
    if (!verificaitionError) {
      return token;
    }
  }
	return jwt.sign(params, config.ACCESS_SECRET, {
		expiresIn: tenDays
	});
}
