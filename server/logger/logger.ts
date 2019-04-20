import * as fs from 'fs';
import { resolve } from 'path';
import config from '../config';

type Logger = {
  info: (msg: any) => void;
  debug: (msg: any) => void;
  error: (msg: any) => void;
};

const getDir = (file: string, dir: string = 'log') => {
  const rDir = resolve(__dirname, dir);
  const newDate = new Date();
  const pathLike = resolve(
    rDir,
    newDate.getFullYear() +
      '-' +
      (newDate.getMonth() + 1) +
      '-' +
      newDate.getDate() +
      '-' +
      file
  );
  try {
    if (!fs.existsSync(rDir)) {
      fs.mkdirSync(rDir);
      fs.appendFileSync(pathLike, '');
    }
  } catch (err) {
    console.error(err);
  }
  return fs.createWriteStream(pathLike);
};

const infoStream = getDir('info.txt');
const errorStream = getDir('error.txt');
const debugStream = getDir('debug.txt');

export const Logger: Logger = {
  info: msg => {
    var message = new Date().toLocaleString() + ' : ' + msg + '\n';
    if (config.DEV_MODE) {
      infoStream.write(message);
    } else {
      console.debug(msg);
    }
  },
  debug: msg => {
    var message = new Date().toLocaleString() + ' : ' + msg + '\n';
    if (config.DEV_MODE) {
      debugStream.write(message);
    } else {
      console.debug(msg);
    }
  },
  error: msg => {
    var message = new Date().toLocaleString() + ' : ' + msg + '\n';
    if (config.DEV_MODE) {
      errorStream.write(message);
    } else {
      console.debug('ERROR ', msg);
    }
  }
};
