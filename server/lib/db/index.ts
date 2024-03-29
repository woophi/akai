import mongoose from 'mongoose';
import config from 'server/config';
import { Logger } from 'server/logger';
import Agenda from 'agenda';
import { SchemaNames } from 'server/models/types';

export const databaseUri = config.MONGO;
export const connection = mongoose.connect(databaseUri);

export let agenda: Agenda;

connection
  .then(db => {
    Logger.info(`Successfully connected to ${databaseUri} MongoDB cluster in ${config.DEV_MODE ? 'dev' : 'prod'} mode.`);
    agenda = new Agenda(
      {
        db: {
          address: databaseUri,
          collection: SchemaNames.JOBS,
        },
      },
      () => agenda.start()
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
