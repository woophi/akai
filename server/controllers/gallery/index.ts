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

export const getAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const albumId = req.query['id'];
  const localeId = req.query['localeId'];
  if (!albumId || !localeId) return res.send({ blogs: [], albumTitle: '' }).status(HTTPStatus.Empty);
  const album = await AlbumModel
    .findById(albumId)
    .populate({
      path: 'blogs',
      populate: {
        path: 'photos',
        select: 'thumbnail -_id'
      },
      select: 'title photos'
    })
    .select('title blogs')
    .lean();

  const albumTitleData = album.title.find(t => t.localeId === localeId);
  const albumTitle = albumTitleData ? albumTitleData.content : '';
  const blogs = album.blogs.map(b => {
    return {
      id: b._id,
      title: b.title.find(t => t.localeId === localeId).content,
      coverPhoto: b.photos[0].thumbnail
    }
  });

  return res.send({ blogs, albumTitle }).status(HTTPStatus.OK);
};
