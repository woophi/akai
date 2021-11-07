import { NextFunction, Request, Response } from 'express';
import { HTTPStatus } from 'server/lib/models';
import UserModel from 'server/models/users';
import Joi from 'joi';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.find().select('-password -refreshToken -resetId').lean();
    return res.send(users).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};

export const validateUserGet = Joi.object({
  id: Joi.string().required(),
});

interface UserGet extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  };
}

export const getUser = async (req: ValidatedRequest<UserGet>, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.params.id).select('-password -refreshToken -resetId').lean();
    return res.send(user).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
