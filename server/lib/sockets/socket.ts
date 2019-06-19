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

    const fileSuc = ({ fileName, fileId }: storageTypes.FileCompleteParams) => {
      socket.emit('upload_done', fileName, fileId);
    };

    const fileErr = ({ fileName }: storageTypes.FileCompleteParams) => {
      socket.emit('upload_done', fileName);
    }

    socket.on('disconnect', () => {
      Logger.info('user disconnected');
      EventBus.removeListener(
        storageTypes.FStorageEvents.UPLOADED_FILE_SUCCESS,
        fileSuc
      );
      EventBus.removeListener(
        storageTypes.FStorageEvents.UPLOADED_FILE_ERROR,
        fileErr
      );
    });
    socket.emit('welcome');

    EventBus.on(
      storageTypes.FStorageEvents.UPLOADED_FILE_SUCCESS,
      fileSuc
    );
    EventBus.on(
      storageTypes.FStorageEvents.UPLOADED_FILE_ERROR,
      fileErr
    );
  });
};
