import { Request, Response, NextFunction } from 'express';
import YoutubeModel from 'server/models/youtube';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import { HTTPStatus } from 'server/lib/models';

export const createNewYoutubeUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);

  // TODO: parse youtube url to get videoId
  // TODO: add youtube chat id before translation
  const youtubeData: models.YoutubeModel = {
    videoId: req.body.videoId,
    title: req.body.title
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            videoId: validate.required,
            title: validate.required
          },
          youtubeData,
          cb
        )
    ],
    () => {
      new YoutubeModel(youtubeData).save(err => {
        if (err) {
          Logger.error('err to save new YoutubeModel ' + err);
          return res.sendStatus(HTTPStatus.ServerError);
        }
        Logger.debug('new YoutubeModel saved');
        return res.sendStatus(HTTPStatus.OK);
      });
    }
  );
}
export const getYoutubeUrls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const youtubes = await YoutubeModel.find().select('videoId title -_id').lean();

  return res.send(youtubes).status(HTTPStatus.OK);
}

export const deleteYoutubeUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);

  const youtubeData: Partial<models.YoutubeModel> = {
    videoId: req.body.videoId
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            url: validate.required,
          },
          youtubeData,
          cb
        )
    ],
    () => {
      YoutubeModel
        .deleteMany(youtubeData).exec((err, result) => {
          if (err) {
            Logger.error('err to delete YoutubeModel ' + err);
            return res.sendStatus(HTTPStatus.ServerError);
          }
          if (result.ok) {
            Logger.debug('YoutubeModel deleted ' + result.n);
            return res.sendStatus(HTTPStatus.OK);
          }
          return res.sendStatus(HTTPStatus.BadRequest);
        });
    }
  );
}
