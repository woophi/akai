import { Request, Response, NextFunction } from 'express';
import AlbumModel from 'server/models/album';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import { HTTPStatus } from 'server/lib/models';

export const createAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);
  /**
   * [{
   *  localeId: 'en',
   *  content: 'asdsddas'
   * }]
   */
  const albumData: models.AlbumSaveModel = {
    blogs: req.body.blogs,
    coverPhoto: req.body.coverPhotoId,
    createdBy: req.session.user._id,
    title: req.body.title
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            title: validate.notIsEmpty,
            coverPhoto: validate.required,
            blogs: validate.notIsEmpty
          },
          albumData,
          cb
        )
    ],
    () => {
      const newAlbum = new AlbumModel(albumData);
      return newAlbum.save((err, album) => {
        if (err) {
          Logger.error('err to save new album ' + err);
          return res.send().status(HTTPStatus.ServerError);
        }
        Logger.debug('new album saved');
        return res.send(album._id).status(HTTPStatus.OK);
      });
    }
  );
};

export const getAlbumData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const albumId = req.query['id'];
  if (!albumId) return res.sendStatus(HTTPStatus.BadRequest);
  const album = (await AlbumModel.findById(albumId)
    .select('title blogs coverPhoto')
    .lean()) as models.Album;

  const payload = {
    coverPhotoId: album.coverPhoto,
    blogs: album.blogs,
    nameEn: album.title.find(t => t.localeId === 'en').content,
    nameCs: album.title.find(t => t.localeId === 'cs').content,
    nameRu: album.title.find(t => t.localeId === 'ru').content,
    id: album.id
  };

  return res.send(payload).status(HTTPStatus.OK);
};

export const editAlbumData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const albumId = req.query['id'];
  if (!albumId) return res.sendStatus(HTTPStatus.BadRequest);
  const validate = new kia.Validator(req, res, next);
  /**
   * [{
   *  localeId: 'en',
   *  content: 'asdsddas'
   * }]
   */
  const albumData: Partial<models.AlbumSaveModel> = {
    blogs: req.body.blogs,
    coverPhoto: req.body.coverPhotoId,
    title: req.body.title
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            title: validate.notIsEmpty,
            coverPhoto: validate.required,
            blogs: validate.notIsEmpty
          },
          albumData,
          cb
        )
    ],
    async () => {
      const album = (await AlbumModel.findById(albumId).exec()) as models.Album;
      if (!album) {
        return res.sendStatus(HTTPStatus.NotFound);
      }
      return album.set(albumData).save(err => {
        if (err) {
          Logger.error('err to edit album ' + err);
          return res.send().status(HTTPStatus.ServerError);
        }
        Logger.debug('album saved');
        return res.sendStatus(HTTPStatus.OK);
      });
    }
  );
};
