import { Server } from 'http';
import * as socket from 'socket.io';
import { Logger } from '../../logger';
import * as cl from '../../storage/cloudinary';
import * as ig from '../../instagram';

export const registerSocket = (server: Server) => {
  const io = socket(server);
  Logger.debug('Storage register events');
  cl.registerCloudinaryEvents();
  ig.registerInstagramEvents();
  io.on('connection', socket => {
    Logger.info('User connected');

    socket.on('disconnect', () => {
      Logger.info('user disconnected')
    });
    socket.emit('welcome');
  });
}
