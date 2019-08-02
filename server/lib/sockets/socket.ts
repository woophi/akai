import { Server } from 'http';
import * as socket from 'socket.io';
import { Logger } from 'server/logger';
import * as cl from 'server/storage/cloudinary';
import * as ig from 'server/instagram';
import { EventBus, BusEvents } from '../events';
import * as storageTypes from 'server/storage/types';

export const registerSocket = (server: Server) => {
  const IO = socket(server);
  Logger.debug('Storage register events');
  cl.registerCloudinaryEvents();
  ig.registerInstagramEvents();

  const newComment = (commentId: string, blogId: string) => {
    Logger.debug('emit comment', commentId, blogId);
    IO.to(blogId).emit('new_comment', commentId, blogId);
  };

  EventBus.on(BusEvents.NEW_COMMENT, newComment);

  IO.on('connection', socket => {
    Logger.info('User connected');

    socket.on('joinRoom', blogId => {
      socket.join(blogId);
      Logger.info('joined room ' + blogId);
    })

    socket.on('leaveRoom', blogId => {
      socket.leave(blogId);
      Logger.info('left room ' + blogId);
    })

    socket.on('disconnect', () => {
      Logger.info('user disconnected');
      socket.leaveAll();
    });
  });


  const nspUniqGuest = IO.of('/uniq-guest');
  nspUniqGuest.on('connection', socket => {
    Logger.info('uniq-guest connected');
    socket.emit('welcome');
    socket.on('disconnect', () => {
      Logger.info('uniq-guest disconnected');
    });
  })

  const nspAdmin = IO.of('/admin');
  nspAdmin.on('connection', socket => {
    Logger.debug('admin connected ' + socket.id);
    const fileSuc = ({ fileName, fileId, url }: storageTypes.FileCompleteParams) => {
      socket.emit('upload_done', fileName, fileId, url);
    };

    const fileErr = ({ fileName }: storageTypes.FileCompleteParams) => {
      socket.emit('upload_done', fileName);
    };

    socket.on('disconnect', () => {
      Logger.info('admin disconnected');
      EventBus.removeListener(
        storageTypes.FStorageEvents.UPLOADED_FILE_SUCCESS,
        fileSuc
      );
      EventBus.removeListener(
        storageTypes.FStorageEvents.UPLOADED_FILE_ERROR,
        fileErr
      );
    });

    EventBus.on(storageTypes.FStorageEvents.UPLOADED_FILE_SUCCESS, fileSuc);
    EventBus.on(storageTypes.FStorageEvents.UPLOADED_FILE_ERROR, fileErr);

  });
};
