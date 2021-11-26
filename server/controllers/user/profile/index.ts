import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { Hashing } from 'server/identity';
import { getSessionData, HTTPStatus } from 'server/lib/models';
import { UserTable } from 'server/models/users';
export * from './register';

export const validateProfileUpdate = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().allow(null),
});

interface ProfileUpdate extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    lastName: string;
    email: string;
    password: string | null;
  };
}

export const updateProfile = async (req: ValidatedRequest<ProfileUpdate>, res: Response) => {
  const userData = req.body;
  const userId = getSessionData(req.session).userId;

  try {
    const user = await UserTable.findById(userId).exec();
    if (!user) {
      return res.sendStatus(HTTPStatus.NotFound);
    }
    user.name = userData.name;
    user.lastName = userData.lastName;
    user.email = userData.email;
    if (userData.password) {
      const hashing = new Hashing();
      user.password = await hashing.hashPassword(userData.password);
    }
    await user.save();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
