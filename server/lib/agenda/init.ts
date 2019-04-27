import * as Agenda from 'agenda';
import { databaseUri } from '../db';

export const agenda = new Agenda({
  db: {
    address: databaseUri,
    collection: 'jobs_queue'
  }
});
