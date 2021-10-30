import { Request, Response, NextFunction } from 'express';
import PhotosModel from 'server/models/photos';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import { HTTPStatus } from 'server/lib/models';

type OrdinalModel = {
  id?: string;
  ordinal: number;
  fileId: string;
};

export const updatePhotos = async (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);

  const photossData: {
    photos: OrdinalModel[];
  } = {
    photos: req.body.photos,
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            photos: validate.notIsEmpty,
          },
          photossData,
          cb
        ),
      cb => {
        PhotosModel.find().exec((err, photos: models.Photos[]) => {
          if (err) {
            Logger.error('err to get PhotosModel ', err);
            return res.sendStatus(HTTPStatus.ServerError);
          }
          if (!photos || !photos.length) {
            return cb();
          }
          const shouldBeDeleted = photos.filter(
            s => !photossData.photos.find(us => (us.id ? us.id == s._id.toString() : false))
          );

          if (shouldBeDeleted.length) {
            const deletePhoto = (photo: models.Photos, callback: async.ErrorCallback<Error>) => photo.remove(callback);

            async.eachSeries(
              shouldBeDeleted,
              (photo: models.Photos, callback) => deletePhoto(photo, callback),
              err => {
                if (err) {
                  return res.sendStatus(HTTPStatus.ServerError);
                }
                Logger.debug('all others PhotosModel deleted');
                return cb();
              }
            );
          } else {
            return cb();
          }
        });
      },
    ],
    () => {
      const saveModel = async (photo: OrdinalModel, callback: async.ErrorCallback<Error>) => {
        if (photo.id) {
          PhotosModel.findByIdAndUpdate(photo.id, { ordinal: photo.ordinal, slide: photo.fileId }, err => {
            if (err) {
              Logger.error('err to update PhotosModel ', err, photo.id);
              return callback(err);
            }
            return callback();
          });
        } else {
          new PhotosModel({ file: photo.fileId, ordinal: photo.ordinal }).save(err => {
            if (err) {
              Logger.error('err to save new PhotosModel ' + err);
              return callback(err);
            }
            return callback();
          });
        }
      };
      async.eachSeries(
        photossData.photos,
        (photo: OrdinalModel, callback) => saveModel(photo, callback),
        err => {
          if (err) {
            return res.sendStatus(HTTPStatus.ServerError);
          }
          Logger.debug('all PhotosModels saved');
          return res.sendStatus(HTTPStatus.OK);
        }
      );
    }
  );
};

export const getAdminPhotos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const photos = (await PhotosModel.find().populate('file').sort({ ordinal: 1 }).lean()) as models.Photos[];
    const payload = photos.map(s => ({
      id: s._id,
      file: s.file,
      ordinal: s.ordinal,
    }));
    return res.send(payload).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error('err to get PhotosModel ', error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
