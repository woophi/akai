import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import * as identity from 'server/identity';
import { ROLES } from 'server/identity';
import { HTTPStatus } from 'server/lib/models';
import { UserTable } from 'server/models/users';

export const validateUserRegister = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

interface UserRegister extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  };
}

export const userRegister = async (req: ValidatedRequest<UserRegister>, res: Response) => {
  const userData = req.body;

  try {
    const userExists = await UserTable.findOne({ email: userData.email }).lean();
    if (userExists) {
      return res.sendStatus(HTTPStatus.BadRequest);
    }

    const hashing = new identity.Hashing();
    userData.password = await hashing.hashPassword(userData.password);
    const newUser = new UserTable({ ...userData, roles: [ROLES.CUSTOMER] });
    await newUser.save();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
