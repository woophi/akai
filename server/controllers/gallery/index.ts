import { Request, Response, NextFunction } from 'express';
import AlbumModel from 'server/models/album';
import BlogModel from 'server/models/blog';
import { HTTPStatus } from 'server/lib/models';
import { Logger } from 'server/logger';
export * from './comments';
export * from './views';
export * from './likes';

export const getAlbums = async (req: Request, res: Response, next: NextFunction) => {
  const localeId = req.query['localeId'];
  if (!localeId) return res.send([]).status(HTTPStatus.Empty);
  const albums = await AlbumModel.find()
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
      coverPhoto: a.coverPhoto ? a.coverPhoto.thumbnail : ''
    };
  });
  return res.send(data).status(HTTPStatus.OK);
};

export const getAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const albumId = req.query['id'];
  const localeId = req.query['localeId'];
  if (!albumId || !localeId)
    return res.send({ blogs: [], albumTitle: '' }).status(HTTPStatus.Empty);

  try {
    const album = await AlbumModel.findById(albumId)
      .populate({
        path: 'blogs',
        match: { deleted: undefined },
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
        coverPhoto: b.photos[0] ? b.photos[0].thumbnail : ''
      };
    });

    return res.send({ blogs, albumTitle }).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error(error);
    return res.send({ blogs: [], albumTitle: '' }).status(HTTPStatus.Empty);
  }
};

export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.query['id'];
  const localeId = req.query['localeId'];
  if (!blogId || !localeId) return res.send({}).status(HTTPStatus.Empty);
  try {
    const blog = await BlogModel.findById(blogId)
      .where('deleted', undefined)
      .populate('photos')
      .populate('socialShare.photo')
      .select('title socialShare body creationPictureDate parameters topic')
      .lean();

    if (!blog) return res.status(HTTPStatus.NotFound).send({});

    const data = {
      id: blog._id,
      body: blog.body.find(b => b.localeId === localeId).content,
      creationPictureDate: blog.creationPictureDate,
      parameters: blog.parameters.filter(p => p.localeId === localeId),
      photos: blog.photos.map(p => ({
        id: p._id,
        name: p.name,
        url: p.url,
        thumbnail: p.thumbnail
      })),
      socialShare: blog.socialShare
        ? {
            ...blog.socialShare,
            photo: blog.socialShare.photo
              ? {
                  id: blog.socialShare.photo._id,
                  name: blog.socialShare.photo.name,
                  thumbnail: blog.socialShare.photo.thumbnail,
                  url: blog.socialShare.photo.url
                }
              : {}
          }
        : null,
      title: blog.title.find(t => t.localeId === localeId).content,
      topic: blog.topic.find(t => t.localeId === localeId).content
    };
    return res.send(data).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error(error);
    return res.send({}).status(HTTPStatus.Empty);
  }
};
