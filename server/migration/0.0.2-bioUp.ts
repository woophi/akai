import * as mongoose from 'mongoose';
import * as models from '../models/types';

module.exports = (done) => {

	const BioModel = mongoose.model(models.SchemaNames.BIOGRAPHY);
	const FileModel = mongoose.model(models.SchemaNames.FILES);

	BioModel
		.findOne()
		.exec((err, biography: models.Biography) => {
      if (err) {
        return done(err);
      }
      if (!biography) {
        return done();
      }

      FileModel
        .findOne()
        .where('name', 'bio_pic')
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
            return done()
          })
        })
		});

}
