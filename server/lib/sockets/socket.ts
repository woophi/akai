import { Server } from 'http';
import * as socket from 'socket.io';
import { Logger } from 'server/logger';
import * as cl from 'server/storage/cloudinary';
import * as ig from 'server/instagram';
import { EventBus } from '../events';
import * as storageTypes from 'server/storage/types';

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

    EventBus.on(
      storageTypes.FStorageEvents.UPLOADED_FILE_SUCCESS,
      ({ fileName, fileId }: storageTypes.FileCompleteParams) => {
        socket.emit('upload_done', fileName, fileId);
      }
    );
    EventBus.on(
      storageTypes.FStorageEvents.UPLOADED_FILE_ERROR,
      ({ fileName }: storageTypes.FileCompleteParams) => {
        socket.emit('upload_done', fileName);
      }
    );
  });
}
