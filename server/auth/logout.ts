import { Request, Response } from 'express';
import { HTTPStatus, SessionData } from 'server/lib/models';
import UserModel from 'server/models/users';

export const logout = async (req: Request, res: Response) => {
  if (!(req.session as unknown as SessionData).user) {
    return res.sendStatus(HTTPStatus.Empty);
  }
  try {
    const User = await UserModel.findById((req.session as unknown as SessionData).userId).exec();

    await User!
      .set({
        refreshToken: '',
      })
      .save();

    req.session.destroy(err => {
      if (err) return res.send({ error: err.message }).status(HTTPStatus.BadRequest);
      return res.sendStatus(HTTPStatus.OK);
    });
  } catch (error) {
    return res.send({ error: error.message }).status(HTTPStatus.ServerError);
  }
};
