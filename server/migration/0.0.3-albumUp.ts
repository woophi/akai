import * as mongoose from 'mongoose';
import * as models from '../models/types';
import * as async from 'async';

const BlogModel = mongoose.model(models.SchemaNames.BLOG);
const updateAlbum = (album: models.Album, done) => {

  BlogModel
    .find()
    .exec((err, blogs) => {
      if (err) {
        return done(err);
      }

      album
        .set('blogs', blogs.map(b => b.id))
        .save((err) => {
          if (err)
            console.error('language save error', err);
          console.log('set sucsess');
          done(err);
        });

    });

}

module.exports = (done) => {

	const AlbumModel = mongoose.model(models.SchemaNames.ALBUM);

	AlbumModel
		.find()
		.exec((err, albums) => {
      if (err) {
        return done(err);
      }
      if (!albums.length) {
        return done();
      }



			async.forEach(albums, updateAlbum, done);

		});

}
