import mongoose from 'mongoose';
import * as models from '../models/types';

module.exports = (done: async.ErrorCallback<Error>) => {
  const BioModel = mongoose.model<models.Biography>(models.SchemaNames.BIOGRAPHY);
  const FileModel = mongoose.model(models.SchemaNames.FILES);

  BioModel.findOne().exec((err, biography) => {
    if (err) {
      return done(err);
    }
    if (!biography) {
      return done();
    }

    FileModel.findOne()
      .where('name', 'foto_bio')
      .exec((err, file) => {
        if (err) {
          return done(err);
        }
        if (!file) {
          return done();
        }
        biography.coverPhoto = file.id;
        biography.save(err => {
          if (err) {
            return done(err);
          }
          return done();
        });
      });
  });
};
