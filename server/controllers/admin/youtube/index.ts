import { Request, Response, NextFunction } from 'express';
import YoutubeModel from 'server/models/youtube';
import StreamModel from 'server/models/streaming';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import { HTTPStatus } from 'server/lib/models';
import { youtubePattern } from 'server/utils/helpers';


export const createNewYoutubeUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const youtubeData = {
    url: req.body.url,
    title: req.body.title
  };
  const matchedGroup = String(youtubeData.url).match(youtubePattern);
  if (!matchedGroup || !matchedGroup.length || !matchedGroup[2]) {
    Logger.error('failed to parse youtube url', JSON.stringify(matchedGroup));
    return res
      .status(HTTPStatus.BadRequest)
      .send({ error: 'failed to parse youtube url' });
  }
  const validate = new kia.Validator(req, res, next);
  async.series(
    [
      cb =>
        validate.check(
          {
            url: validate.required,
            title: validate.required
          },
          youtubeData,
          cb
        ),
      cb => {
        YoutubeModel.findOne({ videoId: matchedGroup[2] }).exec((err, video) => {
          if (err) {
            Logger.error('err to get YoutubeModel ' + err);
            return res.sendStatus(HTTPStatus.ServerError);
          }
          if (video) {
            return res
              .status(HTTPStatus.Conflict)
              .send({ error: 'Video already exists' });
          }
          return cb();
        });
      }
    ],
    async () => {
      const allYoutubes = await YoutubeModel.find().lean();
      new YoutubeModel({
        videoId: matchedGroup[2],
        title: youtubeData.title,
        ordinal: allYoutubes.length
      }).save(err => {
        if (err) {
          Logger.error('err to save new YoutubeModel ' + err);
          return res.sendStatus(HTTPStatus.ServerError);
        }
        Logger.debug('new YoutubeModel saved');
        return res.sendStatus(HTTPStatus.OK);
      });
    }
  );
};
export const getYoutubeUrls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const youtubes = await YoutubeModel.find()
    .sort({ ordinal: 1 })
    .select('videoId ordinal title -_id')
    .lean();

  return res.send(youtubes).status(HTTPStatus.OK);
};

export const updateYoutubes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);

  const youtubeData: {
    youtubes: models.YoutubeModel[];
  } = {
    youtubes: req.body.youtubes
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            youtubes: validate.notIsEmpty
          },
          youtubeData,
          cb
        ),
      cb => {
        YoutubeModel.find().exec((err, youtubes: models.Youtube[]) => {
          if (err) {
            Logger.error('err to get YoutubesModel', err);
            return res.sendStatus(HTTPStatus.ServerError);
          }
          if (!youtubes || !youtubes.length) {
            return cb();
          }
          const shouldBeDeleted = youtubes.filter(
            s => !youtubeData.youtubes.find(us => us.videoId == s.videoId)
          );

          if (shouldBeDeleted.length) {
            const deleteYoutube = (youtube: models.Youtube, callback) =>
              youtube.remove(callback);

            async.eachSeries(
              shouldBeDeleted,
              (youtube: models.Youtube, callback) =>
                deleteYoutube(youtube, callback),
              err => {
                if (err) {
                  return res.sendStatus(HTTPStatus.ServerError);
                }
                Logger.debug('all others YoutubesModel deleted');
                return cb();
              }
            );
          } else {
            return cb();
          }
        });
      }
    ],
    () => {
      const saveModel = async (yotube: models.YoutubeModel, callback) => {
        YoutubeModel.findOneAndUpdate(
          { videoId: yotube.videoId },
          { ordinal: yotube.ordinal },
          err => {
            if (err) {
              Logger.error('err to update YoutubeModel ', err, yotube.videoId);
              return callback(err);
            }
            return callback();
          }
        );
      };
      async.eachSeries(
        youtubeData.youtubes,
        (youtube: models.YoutubeModel, callback) => saveModel(youtube, callback),
        err => {
          if (err) {
            return res.sendStatus(HTTPStatus.ServerError);
          }
          Logger.debug('all YoutubeModels saved');
          return res.sendStatus(HTTPStatus.OK);
        }
      );
    }
  );
};

export const getLastChatLiveStreamId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const streaming = (await StreamModel.findOne()
    .sort({ createdAt: -1 })
    .lean()) as models.Streaming;

  Logger.info('Getting streaming id');
  return res.status(HTTPStatus.OK).send(streaming ? streaming.chatId : '');
};

export const saveChatLiveStreamId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const chatId = req.body.chatId;
  if (!chatId) {
    return res.sendStatus(HTTPStatus.BadRequest);
  }
  await new StreamModel({ chatId } as models.StreamingModel).save();
  Logger.info('Saving streaming id');

  return res.sendStatus(HTTPStatus.OK);
};
