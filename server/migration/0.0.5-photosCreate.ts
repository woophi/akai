import * as async from 'async';
import mongoose from 'mongoose';
import * as models from '../models/types';

const Photo = mongoose.model(models.SchemaNames.PHOTOS);
const createPhoto = (file: models.File, done: async.ErrorCallback<Error>) => {
  const splitPhotoName = file.name.split('_');
  if (splitPhotoName.length && splitPhotoName[0] == 'photo') {
    return new Photo({
      file: file._id,
      ordinal: Number(splitPhotoName[1]) - 1,
    } as models.PhotosSaveModel).save(done);
  } else {
    return done();
  }
};

module.exports = (done: async.ErrorCallback<Error>) => {
  const Files = mongoose.model<models.File>(models.SchemaNames.FILES);

  Files.find().exec((err, files) => {
    async.forEach(files, createPhoto, done);
  });
};
