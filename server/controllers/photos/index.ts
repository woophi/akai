import { Request, Response, NextFunction } from 'express';
import PhotosModel from 'server/models/photos';
import { HTTPStatus } from 'server/lib/models';

export const getPhotos = async (req: Request, res: Response, next: NextFunction) => {
  const photos = await PhotosModel
    .find()
    .populate({
      path: 'file',
      select: 'name url thumbnail -_id'
    })
    .sort({ ordinal: 1 })
    .select('file -_id')
    .lean();

  let savedOdd = 1;
  let savedEven = 0;
  const mapedPhotos = photos.map((p, i) => {
    const ordinal = i + 1;
    if (ordinal === 1) {
      return {
        ...p,
        wild: true
      }
    }
    if (ordinal % 2 === 0 && ordinal - savedEven === 4) {
      savedEven = ordinal;
      return {
        ...p,
        wild: true
      }
    }
    if (ordinal % 2 !== 0 && ordinal - savedOdd === 4) {
      savedOdd = ordinal;
      return {
        ...p,
        wild: true
      }
    }

    return p
  })

  return res.send(mapedPhotos).status(HTTPStatus.OK);
};
