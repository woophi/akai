import * as mongoose from 'mongoose';
import config from '../../config';
import { Logger } from '../../logger';
mongoose.set('useCreateIndex', true);
export const databaseUri = config.PORT_MONGO + '/turbodrive';
export const connection = mongoose.connect(databaseUri, { useNewUrlParser: true });

connection
	.then(db => {
		Logger.info(
			`Successfully connected to ${databaseUri} MongoDB cluster in ${
				config.DEV_MODE ? 'dev': 'prod'
			} mode.`,
		);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			Logger.error('Attempting to re-establish database connection.');
			mongoose.connect(databaseUri);
		} else {
			Logger.error('Error while attempting to connect to database:');
			Logger.error(err);
		}
  });

export default connection;
