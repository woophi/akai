import config from '../../config';
import * as jwt from 'jsonwebtoken';
import { Claims } from './constants';

const oneDay = 86400;
const tenDays = 10 * 24 * 60 * 60 * 1000;
export const setAccessToken = (params: Claims = {}) => {
	return jwt.sign(params, config.ACCESS_SECRET, {
		expiresIn: oneDay
	});
}
export const setRefreshToken = (params: Claims = {}) => {
	return jwt.sign(params, config.ACCESS_SECRET, {
		expiresIn: tenDays
	});
}
