import { Request, Response, NextFunction } from 'express';
import AlbumModel from 'server/models/album';
import { HTTPStatus } from 'server/lib/models';

export const getAlbums = async (req: Request, res: Response, next: NextFunction) => {
  const localeId = req.query['localeId'];
  if (!localeId) return res.send([]).status(HTTPStatus.Empty);
  const albums = await AlbumModel
    .find()
    .populate({
      path: 'coverPhoto',
      select: 'thumbnail -_id'
    })
    .select('coverPhoto title id')
    .lean();

  const data = albums.map(a => {
    return {
      id: a._id,
      title: a.title.find(t => t.localeId === localeId).content,
      coverPhoto: a.coverPhoto.thumbnail
    }
  })
  return res.send(data).status(HTTPStatus.OK);
};
