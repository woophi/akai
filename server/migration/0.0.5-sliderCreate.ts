import * as async from 'async';
import mongoose from 'mongoose';
import * as models from '../models/types';

const Slider = mongoose.model(models.SchemaNames.SLIDER);
const createPhoto = (file: models.Files, done) => {
  const splitPhotoName = file.name.split('_');
  if (splitPhotoName.length && splitPhotoName[0] == 'slide') {
    return new Slider({
      slide: file._id,
      ordinal: Number(splitPhotoName[1]) - 1
    } as models.SliderSaveModel).save(done);
  } else {
    return done();
  }
};

module.exports = done => {
  const Files = mongoose.model(models.SchemaNames.FILES);

  Files.find().exec((err, files: models.Files[]) => {
    async.forEach(files, createPhoto, done);
  });
};
