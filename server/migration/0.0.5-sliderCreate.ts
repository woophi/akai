import * as async from 'async';
import mongoose from 'mongoose';
import * as models from '../models/types';

const Slider = mongoose.model(models.SchemaNames.SLIDER);
const createPhoto = (file: models.File, done: async.ErrorCallback<Error>) => {
  const splitPhotoName = file.name.split('_');
  if (splitPhotoName.length && splitPhotoName[0] == 'slide') {
    return new Slider({
      slide: file._id,
      ordinal: Number(splitPhotoName[1]) - 1,
    } as models.SliderSaveModel).save(done);
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
