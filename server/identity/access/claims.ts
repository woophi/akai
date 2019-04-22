import UserModel from '../../models/users';
import { User } from '../../models/types';
import { Logger } from '../../logger';
import * as options from '../../options';
import { Request, Response } from 'express';

export const getRoles = async (userId: string) => {
	let roles = [];
  const user: User = await UserModel.findById(userId).lean();
  Logger.debug('get user roles ' + user.roles.toString())
	roles = user.roles ? user.roles : [];
	return roles;
}

export const requireUser = (req: Request, res: Response) => {
	if (!req.session.user) {
		options.set('prevUrl', req.url);
		res.redirect('/signin');
		return false;
	}
	return true;
};
